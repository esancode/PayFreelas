import Link from 'next/link'
import { Plus, Folder, DollarSign, Wallet, ArrowRight } from 'lucide-react'
import { createClient } from '@/utils/supabase/server'
import { supabaseAdmin } from '@/lib/supabase-admin'
import { formatCurrency } from '@/utils/format'

export const dynamic = 'force-dynamic'

export default async function AdminDashboardPage() {
  const supabase = await createClient()
  const { data: { user } } = await supabase.auth.getUser()
  
  if (!user) return null

  // Buscar todos os projetos
  const { data: projetos } = await supabaseAdmin
    .from('projetos')
    .select('*')
    .eq('administrador_id', user.id)
    .order('criado_em', { ascending: false })

  // Buscar todos os pagamentos
  const { data: pagamentos } = await supabaseAdmin
    .from('pagamentos')
    .select('valor')

  const totalProjetos = projetos?.length || 0
  const valorTotal = projetos?.reduce((acc, curr) => acc + Number(curr.valor_total), 0) || 0
  const valorRecebido = pagamentos?.reduce((acc, curr) => acc + Number(curr.valor), 0) || 0
  const valorPendente = valorTotal - valorRecebido

  return (
    <div className="space-y-8">
      <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
        <div>
          <h1 className="text-3xl font-bold text-gray-900 tracking-tight">Dashboard</h1>
          <p className="text-gray-500 mt-1">Visão geral dos seus projetos e pagamentos.</p>
        </div>
        <Link 
          href="/admin/projetos/novo" 
          className="inline-flex items-center gap-2 bg-gray-900 text-white px-4 py-2.5 rounded-lg font-medium hover:bg-gray-800 transition-colors shadow-sm"
        >
          <Plus className="w-5 h-5" />
          Novo Projeto
        </Link>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
        {/* Card: Projetos */}
        <div className="bg-white p-6 rounded-xl border border-gray-100 shadow-sm">
          <div className="flex items-center gap-3 text-gray-500 mb-3">
            <Folder className="w-5 h-5" />
            <h3 className="font-medium text-sm">Projetos</h3>
          </div>
          <p className="text-3xl font-semibold text-gray-900">{totalProjetos}</p>
        </div>

        {/* Card: Valor Total */}
        <div className="bg-white p-6 rounded-xl border border-gray-100 shadow-sm">
          <div className="flex items-center gap-3 text-gray-500 mb-3">
            <DollarSign className="w-5 h-5" />
            <h3 className="font-medium text-sm">Valor Total</h3>
          </div>
          <p className="text-3xl font-semibold text-gray-900">{formatCurrency(valorTotal)}</p>
        </div>

        {/* Card: Recebido */}
        <div className="bg-white p-6 rounded-xl border border-gray-100 shadow-sm">
          <div className="flex items-center gap-3 text-emerald-500 mb-3">
            <Wallet className="w-5 h-5" />
            <h3 className="font-medium text-sm">Recebido</h3>
          </div>
          <p className="text-3xl font-semibold text-gray-900">{formatCurrency(valorRecebido)}</p>
        </div>

        {/* Card: Pendente */}
        <div className="bg-white p-6 rounded-xl border border-gray-100 shadow-sm">
          <div className="flex items-center gap-3 text-amber-500 mb-3">
            <Wallet className="w-5 h-5" />
            <h3 className="font-medium text-sm">Pendente</h3>
          </div>
          <p className="text-3xl font-semibold text-gray-900">{formatCurrency(valorPendente)}</p>
        </div>
      </div>

      <div className="space-y-4">
        <h2 className="text-xl font-bold text-gray-900">Seus Projetos</h2>
        
        {projetos?.length === 0 ? (
          <div className="bg-white p-12 rounded-xl border border-gray-100 shadow-sm text-center">
            <h3 className="text-lg font-medium text-gray-900 mb-1">Nenhum projeto</h3>
            <p className="text-gray-500 mb-4">Você ainda não criou nenhum projeto financeiro.</p>
            <Link 
              href="/admin/projetos/novo" 
              className="inline-flex items-center gap-2 text-gray-900 font-medium hover:underline"
            >
              Criar o primeiro projeto <ArrowRight className="w-4 h-4" />
            </Link>
          </div>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
            {projetos?.map((projeto) => (
              <Link key={projeto.id} href={`/admin/projetos/${projeto.id}`} className="group block bg-white p-5 rounded-xl border border-gray-100 shadow-sm hover:border-gray-300 transition-colors">
                <div className="flex justify-between items-start mb-4">
                  <div>
                    <h3 className="font-semibold text-gray-900 group-hover:text-blue-600 transition-colors">{projeto.nome}</h3>
                    <p className="text-sm text-gray-500 line-clamp-1">Cliente: {projeto.cliente_nome}</p>
                  </div>
                  {/* We will add an API call inside individual card or pass down values to calculate progress per project later. For MVP dashboard, minimal data. */}
                </div>
                <div className="mt-4 pt-4 border-t border-gray-50 flex justify-between items-center">
                  <span className="text-gray-900 font-medium">{formatCurrency(Number(projeto.valor_total))}</span>
                  <span className="text-sm text-blue-600 font-medium flex items-center gap-1">
                    Gerenciar <ArrowRight className="w-4 h-4" />
                  </span>
                </div>
              </Link>
            ))}
          </div>
        )}
      </div>
    </div>
  )
}
