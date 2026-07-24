'use client'

import { useState } from "react"
import { useRouter } from "next/navigation"
import { ArrowLeft } from "lucide-react"
import Link from "next/link"

export default function NovoProjetoPage() {
  const router = useRouter()
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState("")

  async function onSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault()
    setLoading(true)
    setError("")

    const formData = new FormData(e.currentTarget)
    const nome = formData.get("nome") as string
    const cliente = formData.get("cliente") as string
    const valor_total_str = formData.get("valor_total") as string
    
    // Parse value replacing comma to dot if any
    const valor_total = parseFloat(valor_total_str.replace(',', '.'))

    try {
      const res = await fetch("/api/projects", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ nome, cliente, valor_total }),
      })

      const json = await res.json()

      if (!res.ok || !json.success) {
        setError(json.error?.message || "Ocorreu um erro ao criar o projeto.")
        setLoading(false)
        return
      }

      router.push(`/admin/projetos/${json.data.id}`)
      router.refresh()
    } catch (err) {
      setError("Erro de conexão.")
      setLoading(false)
    }
  }

  return (
    <div className="max-w-2xl mx-auto space-y-6">
      <div className="flex items-center gap-4">
        <Link href="/admin" className="p-2 hover:bg-gray-100 rounded-full transition-colors text-gray-500">
          <ArrowLeft className="w-5 h-5" />
        </Link>
        <div>
          <h1 className="text-2xl font-bold text-gray-900">Novo Projeto</h1>
          <p className="text-sm text-gray-500">Preencha os dados do projeto financeiro.</p>
        </div>
      </div>

      <div className="bg-white p-6 sm:p-8 rounded-xl border border-gray-100 shadow-sm">
        <form onSubmit={onSubmit} className="space-y-6">
          {error && (
            <div className="bg-red-50 text-red-600 p-3 rounded-lg text-sm font-medium">
              {error}
            </div>
          )}
          
          <div className="space-y-4">
            <div>
              <label htmlFor="nome" className="block text-sm font-medium text-gray-700 mb-1">
                Nome do Projeto
              </label>
              <input
                id="nome"
                name="nome"
                type="text"
                required
                placeholder="Ex: Website Empresa X"
                className="w-full rounded-md border-0 py-2.5 px-3 text-gray-900 ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-gray-900 sm:text-sm sm:leading-6"
              />
            </div>

            <div>
              <label htmlFor="cliente" className="block text-sm font-medium text-gray-700 mb-1">
                Nome do Cliente
              </label>
              <input
                id="cliente"
                name="cliente"
                type="text"
                required
                placeholder="Ex: João Silva"
                className="w-full rounded-md border-0 py-2.5 px-3 text-gray-900 ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-gray-900 sm:text-sm sm:leading-6"
              />
            </div>

            <div>
              <label htmlFor="valor_total" className="block text-sm font-medium text-gray-700 mb-1">
                Valor Total (R$)
              </label>
              <input
                id="valor_total"
                name="valor_total"
                type="number"
                step="0.01"
                min="1"
                required
                placeholder="Ex: 1000.00"
                className="w-full rounded-md border-0 py-2.5 px-3 text-gray-900 ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-gray-900 sm:text-sm sm:leading-6"
              />
            </div>
          </div>

          <div className="pt-2">
            <button
              type="submit"
              disabled={loading}
              className="w-full flex justify-center py-2.5 px-4 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-gray-900 hover:bg-gray-800 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-gray-900 disabled:opacity-50 disabled:cursor-not-allowed transition-colors"
            >
              {loading ? "Criando..." : "Criar projeto"}
            </button>
          </div>
        </form>
      </div>
    </div>
  )
}
