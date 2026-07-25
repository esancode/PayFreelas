'use client'

import { useState } from 'react'
import { CreditCard, ArrowRight, X } from 'lucide-react'

export function MercadoPagoCheckout({ publicId, maxAmount }: { publicId: string, maxAmount: number }) {
  const [isOpen, setIsOpen] = useState(false)
  const [valor, setValor] = useState<string>('')
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState('')

  const handleCheckout = async (e: React.FormEvent) => {
    e.preventDefault()
    setLoading(true)
    setError('')

    const numericValor = parseFloat(valor.replace(',', '.'))

    if (isNaN(numericValor) || numericValor <= 0) {
      setError('Valor inválido')
      setLoading(false)
      return
    }

    if (numericValor > maxAmount) {
      setError('O valor não pode ser maior que o saldo restante')
      setLoading(false)
      return
    }

    try {
      const res = await fetch('/api/payment/create-checkout', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ public_id: publicId, valor: numericValor })
      })

      const json = await res.json()

      if (json.success && json.checkout_url) {
        window.location.href = json.checkout_url
      } else {
        setError(json.error?.message || 'Erro ao gerar link de pagamento')
        setLoading(false)
      }
    } catch {
      setError('Erro de conexão')
      setLoading(false)
    }
  }

  return (
    <>
      <button 
        onClick={() => setIsOpen(true)}
        className="w-full text-left bg-white p-6 rounded-2xl border border-gray-200 hover:border-gray-900 transition-colors shadow-sm relative overflow-hidden group cursor-pointer"
      >
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-4">
            <div className="p-3 bg-gray-50 text-gray-900 rounded-xl group-hover:bg-gray-900 group-hover:text-white transition-colors">
              <CreditCard className="w-6 h-6" />
            </div>
            <div>
              <h4 className="font-bold text-gray-900">Cartão de Crédito</h4>
              <p className="text-sm text-gray-500">Pague com segurança pelo Mercado Pago</p>
            </div>
          </div>
          <ArrowRight className="w-5 h-5 text-gray-400 group-hover:text-gray-900 transition-colors" />
        </div>
      </button>

      {isOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/50 p-4">
          <div className="bg-white rounded-2xl shadow-xl w-full max-w-md overflow-hidden animate-in fade-in zoom-in duration-200">
            <div className="flex justify-between items-center p-6 border-b border-gray-100">
              <h3 className="font-bold text-gray-900 text-lg">Pagar com Cartão</h3>
              <button onClick={() => setIsOpen(false)} className="text-gray-400 hover:text-gray-600">
                <X className="w-5 h-5" />
              </button>
            </div>
            
            <form onSubmit={handleCheckout} className="p-6 space-y-6">
              {error && (
                <div className="bg-red-50 text-red-600 p-3 rounded-lg text-sm font-medium">
                  {error}
                </div>
              )}
              
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Quanto deseja pagar?
                </label>
                <div className="relative">
                  <div className="pointer-events-none absolute inset-y-0 left-0 flex items-center pl-4">
                    <span className="text-gray-500 font-medium">R$</span>
                  </div>
                  <input
                    type="number"
                    step="0.01"
                    min="1"
                    max={maxAmount}
                    required
                    value={valor}
                    onChange={(e) => setValor(e.target.value)}
                    placeholder="0.00"
                    className="block w-full rounded-xl border-0 py-4 pl-12 pr-4 text-gray-900 ring-1 ring-inset ring-gray-200 focus:ring-2 focus:ring-gray-900 text-lg font-medium shadow-sm transition-all"
                  />
                </div>
                <p className="text-sm text-gray-500 mt-2">
                  Você pode pagar até {new Intl.NumberFormat('pt-BR', { style: 'currency', currency: 'BRL' }).format(maxAmount)}
                </p>
              </div>

              <button
                type="submit"
                disabled={loading}
                className="w-full flex items-center justify-center gap-2 py-4 px-4 border border-transparent rounded-xl shadow-sm text-base font-bold text-white bg-[#009EE3] hover:bg-[#008CDB] focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-[#009EE3] disabled:opacity-50 disabled:cursor-not-allowed transition-colors"
              >
                {loading ? 'Redirecionando...' : 'Ir para o Mercado Pago'}
              </button>
              
              <p className="text-xs text-center text-gray-400 font-medium flex items-center justify-center gap-1">
                <CreditCard className="w-3 h-3" />
                Ambiente 100% seguro pelo Mercado Pago
              </p>
            </form>
          </div>
        </div>
      )}
    </>
  )
}
