'use client'

import { useState } from 'react'
import { Save, CheckCircle2 } from 'lucide-react'

type Config = {
  chave_pix?: string
  banco_deposito?: string
  dados_deposito?: string
  whatsapp?: string
}

export function ConfigForm({ initialData }: { initialData: Config }) {
  const [loading, setLoading] = useState(false)
  const [success, setSuccess] = useState(false)
  const [error, setError] = useState('')

  async function onSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault()
    setLoading(true)
    setError('')
    setSuccess(false)

    const formData = new FormData(e.currentTarget)
    const data = {
      chave_pix: formData.get('chave_pix') as string,
      banco_deposito: formData.get('banco_deposito') as string,
      dados_deposito: formData.get('dados_deposito') as string,
      whatsapp: formData.get('whatsapp') as string,
    }

    try {
      const res = await fetch('/api/admin/config', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(data)
      })

      const json = await res.json()

      if (json.success) {
        setSuccess(true)
        setTimeout(() => setSuccess(false), 3000)
      } else {
        setError(json.error?.message || 'Erro ao salvar configurações')
      }
    } catch (err) {
      setError('Erro de conexão')
    } finally {
      setLoading(false)
    }
  }

  return (
    <form onSubmit={onSubmit} className="space-y-6 max-w-2xl bg-white p-6 rounded-2xl shadow-sm border border-gray-100">
      
      {error && (
        <div className="bg-red-50 text-red-600 p-4 rounded-xl text-sm font-medium">
          {error}
        </div>
      )}

      {success && (
        <div className="bg-emerald-50 text-emerald-600 p-4 rounded-xl text-sm font-medium flex items-center gap-2">
          <CheckCircle2 className="w-5 h-5" />
          Configurações salvas com sucesso!
        </div>
      )}

      <div className="space-y-4">
        <h3 className="text-lg font-bold text-gray-900 border-b border-gray-100 pb-2">Opção 1: Pix</h3>
        
        <div>
          <label htmlFor="chave_pix" className="block text-sm font-medium text-gray-700 mb-1">
            Chave Pix
          </label>
          <input
            type="text"
            id="chave_pix"
            name="chave_pix"
            defaultValue={initialData.chave_pix}
            placeholder="Ex: seuemail@email.com, celular, CPF..."
            className="block w-full rounded-lg border-0 py-2.5 px-3 text-gray-900 ring-1 ring-inset ring-gray-200 focus:ring-2 focus:ring-gray-900 sm:text-sm sm:leading-6 transition-all"
          />
        </div>
      </div>

      <div className="space-y-4 pt-4">
        <h3 className="text-lg font-bold text-gray-900 border-b border-gray-100 pb-2">Opção 2: Transferência Bancária</h3>
        
        <div className="grid grid-cols-1 gap-4">
          <div>
            <label htmlFor="banco_deposito" className="block text-sm font-medium text-gray-700 mb-1">
              Nome do Banco
            </label>
            <input
              type="text"
              id="banco_deposito"
              name="banco_deposito"
              defaultValue={initialData.banco_deposito}
              placeholder="Ex: Banco Itaú, Nubank..."
              className="block w-full rounded-lg border-0 py-2.5 px-3 text-gray-900 ring-1 ring-inset ring-gray-200 focus:ring-2 focus:ring-gray-900 sm:text-sm sm:leading-6 transition-all"
            />
          </div>

          <div>
            <label htmlFor="dados_deposito" className="block text-sm font-medium text-gray-700 mb-1">
              Dados da Conta (Agência, Conta, Nome)
            </label>
            <textarea
              id="dados_deposito"
              name="dados_deposito"
              rows={4}
              defaultValue={initialData.dados_deposito}
              placeholder="Agência: 0000&#10;Conta: 00000-0&#10;Nome: Seu Nome Completo"
              className="block w-full rounded-lg border-0 py-2.5 px-3 text-gray-900 ring-1 ring-inset ring-gray-200 focus:ring-2 focus:ring-gray-900 sm:text-sm sm:leading-6 transition-all"
            />
          </div>
        </div>
      </div>

      <div className="space-y-4 pt-4">
        <h3 className="text-lg font-bold text-gray-900 border-b border-gray-100 pb-2">Contato</h3>
        
        <div>
          <label htmlFor="whatsapp" className="block text-sm font-medium text-gray-700 mb-1">
            WhatsApp para Dúvidas
          </label>
          <input
            type="text"
            id="whatsapp"
            name="whatsapp"
            defaultValue={initialData.whatsapp}
            placeholder="Ex: 11999999999"
            className="block w-full rounded-lg border-0 py-2.5 px-3 text-gray-900 ring-1 ring-inset ring-gray-200 focus:ring-2 focus:ring-gray-900 sm:text-sm sm:leading-6 transition-all"
          />
          <p className="mt-1 text-xs text-gray-500">
            Apenas números, inclua DDD. Opcional.
          </p>
        </div>
      </div>

      <div className="pt-6">
        <button
          type="submit"
          disabled={loading}
          className="flex w-full items-center justify-center gap-2 rounded-lg bg-gray-900 px-4 py-3 text-sm font-semibold text-white shadow-sm hover:bg-gray-800 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-gray-900 disabled:opacity-70 transition-all"
        >
          {loading ? (
            <span className="w-5 h-5 border-2 border-white/20 border-t-white rounded-full animate-spin"></span>
          ) : (
            <>
              <Save className="w-5 h-5" />
              Salvar Configurações
            </>
          )}
        </button>
      </div>

    </form>
  )
}
