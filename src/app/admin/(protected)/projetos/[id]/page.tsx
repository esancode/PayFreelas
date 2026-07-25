import Link from 'next/link'
import { ArrowLeft, Calendar, FileText, CreditCard } from 'lucide-react'
import { createClient } from '@/utils/supabase/server'
import { supabaseAdmin } from '@/lib/supabase-admin'
import { formatCurrency } from '@/utils/format'
import { ProjectActions } from './ProjectActions'

export const dynamic = 'force-dynamic'

export default async function ProjetoDetailsPage({ params }: { params: Promise<{ id: string }> }) {
  const { id } = await params
  
  const supabase = await createClient()
  const { data: { user } } = await supabase.auth.getUser()

  if (!user) return null

  // Busca projeto
  const { data: projeto } = await supabaseAdmin
    .from('projetos')
    .select('*')
    .eq('id', id)
    .eq('administrador_id', user.id)
    .single()

  if (!projeto) {
    return (
      <div className="text-center py-12">
        <h2 className="text-xl font-bold text-gray-900">Projeto não encontrado</h2>
        <Link href="/admin" className="text-blue-600 hover:underline mt-4 inline-block">Voltar ao dashboard</Link>
      </div>
    )
  }

  // Busca pagamentos
  const { data: pagamentos } = await supabaseAdmin
    .from('pagamentos')
    .select('*')
    .eq('projeto_id', projeto.id)
    .order('criado_em', { ascending: false })

  const valorPago = pagamentos?.reduce((acc, curr) => acc + Number(curr.valor), 0) || 0
  const valorTotal = Number(projeto.valor_total)
  const saldoRestante = valorTotal - valorPago
  const progresso = valorTotal > 0 ? Math.min(100, Math.round((valorPago / valorTotal) * 100)) : 0

  return (
    <div className="max-w-4xl mx-auto space-y-6">
      <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
        <div className="flex items-center gap-4">
          <Link href="/admin" className="p-2 hover:bg-gray-100 rounded-full transition-colors text-gray-500">
            <ArrowLeft className="w-5 h-5" />
          </Link>
          <div>
            <h1 className="text-2xl font-bold text-gray-900">{projeto.nome}</h1>
            <p className="text-sm text-gray-500">Cliente: {projeto.cliente_nome}</p>
          </div>
        </div>
        
        <ProjectActions project={projeto} />
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        {/* Painel Financeiro */}
        <div className="md:col-span-2 space-y-6">
          <div className="bg-white p-6 rounded-xl border border-gray-100 shadow-sm">
            <h2 className="text-lg font-bold text-gray-900 mb-6">Resumo Financeiro</h2>
            
            <div className="space-y-6">
              <div>
                <div className="flex justify-between items-end mb-2">
                  <span className="text-sm font-medium text-gray-500">Progresso do Pagamento</span>
                  <span className="text-xl font-bold text-gray-900">{progresso}%</span>
                </div>
                <div className="w-full bg-gray-100 rounded-full h-3 overflow-hidden">
                  <div 
                    className="bg-gray-900 h-3 rounded-full transition-all duration-500 ease-out" 
                    style={{ width: `${progresso}%` }}
                  ></div>
                </div>
              </div>

              <div className="grid grid-cols-2 gap-4 pt-4 border-t border-gray-50">
                <div>
                  <span className="block text-sm text-gray-500 mb-1">Valor Total</span>
                  <span className="text-lg font-semibold text-gray-900">{formatCurrency(valorTotal)}</span>
                </div>
                <div>
                  <span className="block text-sm text-gray-500 mb-1">Valor Pago</span>
                  <span className="text-lg font-semibold text-emerald-600">{formatCurrency(valorPago)}</span>
                </div>
              </div>
              
              <div className="bg-gray-50 p-4 rounded-lg flex justify-between items-center">
                <span className="font-medium text-gray-700">Saldo Restante</span>
                <span className="text-xl font-bold text-gray-900">{formatCurrency(saldoRestante)}</span>
              </div>
            </div>
          </div>

          <div className="bg-white p-6 rounded-xl border border-gray-100 shadow-sm">
            <h2 className="text-lg font-bold text-gray-900 mb-4">Histórico de Pagamentos</h2>
            
            {pagamentos?.length === 0 ? (
              <div className="text-center py-8 text-gray-500 text-sm border-2 border-dashed border-gray-100 rounded-lg">
                Nenhum pagamento registrado ainda.
              </div>
            ) : (
              <div className="space-y-4">
                {pagamentos?.map((pagamento) => (
                  <div key={pagamento.id} className="flex flex-col sm:flex-row sm:justify-between sm:items-center p-4 border border-gray-100 rounded-lg bg-gray-50 hover:bg-white transition-colors">
                    <div className="flex items-start gap-3 mb-2 sm:mb-0">
                      <div className="mt-1">
                        <CreditCard className="w-4 h-4 text-gray-400" />
                      </div>
                      <div>
                        <p className="font-medium text-gray-900">{formatCurrency(Number(pagamento.valor))}</p>
                        <p className="text-sm text-gray-500">{pagamento.metodo}</p>
                        {pagamento.observacao && (
                          <p className="text-xs text-gray-400 mt-1 flex items-center gap-1">
                            <FileText className="w-3 h-3" />
                            {pagamento.observacao}
                          </p>
                        )}
                      </div>
                    </div>
                    <div className="text-left sm:text-right text-sm text-gray-500 flex items-center gap-1">
                      <Calendar className="w-3 h-3" />
                      {new Date(pagamento.criado_em).toLocaleDateString('pt-BR')}
                    </div>
                  </div>
                ))}
              </div>
            )}
          </div>
        </div>

        {/* Informações Adicionais */}
        <div className="space-y-6">
          <div className="bg-white p-6 rounded-xl border border-gray-100 shadow-sm">
            <h2 className="text-lg font-bold text-gray-900 mb-4">Detalhes</h2>
            <div className="space-y-4 text-sm">
              <div>
                <span className="block text-gray-500">Link Público</span>
                <a 
                  href={`/p/${projeto.token_publico}`}
                  target="_blank"
                  className="text-blue-600 hover:underline break-all mt-1 inline-block"
                >
                  {projeto.token_publico}
                </a>
              </div>
              <div>
                <span className="block text-gray-500">Data de Criação</span>
                <span className="text-gray-900 mt-1 block">
                  {new Date(projeto.criado_em).toLocaleDateString('pt-BR')}
                </span>
              </div>
              <div>
                <span className="block text-gray-500">Status</span>
                <span className="inline-flex items-center rounded-md bg-blue-50 px-2 py-1 text-xs font-medium text-blue-700 ring-1 ring-inset ring-blue-700/10 mt-1">
                  {saldoRestante <= 0 ? 'Pago' : 'Em andamento'}
                </span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}
