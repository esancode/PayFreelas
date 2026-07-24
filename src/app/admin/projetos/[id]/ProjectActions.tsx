'use client'

import { useState } from 'react'
import { useRouter } from 'next/navigation'
import { Copy, Plus, Trash2 } from 'lucide-react'

export function ProjectActions({ project }: { project: any }) {
  const router = useRouter()
  const [copied, setCopied] = useState(false)
  const [showModal, setShowModal] = useState(false)
  const [loading, setLoading] = useState(false)

  const publicUrl = typeof window !== 'undefined' ? `${window.location.origin}/p/${project.public_id || project.token_publico}` : ''

  const handleCopy = () => {
    if (publicUrl) {
      navigator.clipboard.writeText(publicUrl)
      setCopied(true)
      setTimeout(() => setCopied(false), 2000)
    }
  }

  const handleDelete = async () => {
    if (confirm('Deseja realmente excluir este projeto?')) {
      setLoading(true)
      try {
        await fetch(`/api/projects/${project.id}`, { method: 'DELETE' })
        router.push('/admin')
        router.refresh()
      } catch {
        setLoading(false)
      }
    }
  }

  const handleRegisterPayment = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault()
    setLoading(true)

    const formData = new FormData(e.currentTarget)
    const valorStr = formData.get('valor') as string
    const valor = parseFloat(valorStr.replace(',', '.'))
    const metodo = formData.get('metodo') as string
    const observacao = formData.get('observacao') as string

    try {
      const res = await fetch(`/api/projects/${project.id}/payments`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ valor, metodo, observacao })
      })

      if (res.ok) {
        setShowModal(false)
        router.refresh()
      } else {
        alert('Erro ao registrar pagamento. Verifique se o valor não ultrapassa o saldo.')
      }
    } catch {
      alert('Erro de conexão')
    } finally {
      setLoading(false)
    }
  }

  return (
    <>
      <div className="flex flex-wrap items-center gap-3">
        <button
          onClick={handleCopy}
          className="inline-flex items-center gap-2 bg-white border border-gray-200 text-gray-700 px-4 py-2 rounded-lg font-medium hover:bg-gray-50 transition-colors shadow-sm text-sm"
        >
          <Copy className="w-4 h-4" />
          {copied ? 'Copiado!' : 'Copiar Link'}
        </button>
        <button
          onClick={() => setShowModal(true)}
          className="inline-flex items-center gap-2 bg-gray-900 text-white px-4 py-2 rounded-lg font-medium hover:bg-gray-800 transition-colors shadow-sm text-sm"
        >
          <Plus className="w-4 h-4" />
          Registrar Pagamento
        </button>
        <button
          onClick={handleDelete}
          disabled={loading}
          className="inline-flex items-center gap-2 bg-white border border-red-200 text-red-600 px-4 py-2 rounded-lg font-medium hover:bg-red-50 transition-colors shadow-sm text-sm disabled:opacity-50"
        >
          <Trash2 className="w-4 h-4" />
          Excluir
        </button>
      </div>

      {showModal && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/50 p-4">
          <div className="bg-white rounded-xl shadow-lg w-full max-w-md overflow-hidden">
            <div className="p-6 border-b border-gray-100">
              <h2 className="text-xl font-bold text-gray-900">Registrar Pagamento</h2>
              <p className="text-sm text-gray-500 mt-1">Insira os dados do recebimento.</p>
            </div>
            <form onSubmit={handleRegisterPayment} className="p-6 space-y-4">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">Valor (R$)</label>
                <input
                  name="valor"
                  type="number"
                  step="0.01"
                  min="0.01"
                  required
                  placeholder="Ex: 500.00"
                  className="w-full rounded-md border-0 py-2 px-3 text-gray-900 ring-1 ring-inset ring-gray-300 focus:ring-2 focus:ring-gray-900 sm:text-sm"
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">Método</label>
                <select
                  name="metodo"
                  required
                  className="w-full rounded-md border-0 py-2 px-3 text-gray-900 ring-1 ring-inset ring-gray-300 focus:ring-2 focus:ring-gray-900 sm:text-sm bg-white"
                >
                  <option value="">Selecione...</option>
                  <option value="PIX">Pix</option>
                  <option value="DEPOSITO">Depósito</option>
                  <option value="CARTAO_CREDITO">Cartão de Crédito</option>
                </select>
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">Observação (Opcional)</label>
                <input
                  name="observacao"
                  type="text"
                  placeholder="Ex: Pagamento da primeira etapa"
                  className="w-full rounded-md border-0 py-2 px-3 text-gray-900 ring-1 ring-inset ring-gray-300 focus:ring-2 focus:ring-gray-900 sm:text-sm"
                />
              </div>
              <div className="pt-4 flex gap-3">
                <button
                  type="button"
                  onClick={() => setShowModal(false)}
                  className="flex-1 bg-white border border-gray-300 text-gray-700 py-2 rounded-md font-medium text-sm hover:bg-gray-50"
                >
                  Cancelar
                </button>
                <button
                  type="submit"
                  disabled={loading}
                  className="flex-1 bg-gray-900 text-white py-2 rounded-md font-medium text-sm hover:bg-gray-800 disabled:opacity-50"
                >
                  {loading ? 'Salvando...' : 'Registrar'}
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </>
  )
}
