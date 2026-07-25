import { supabaseAdmin } from '@/lib/supabase-admin'
import { formatCurrency } from '@/utils/format'
import { CreditCard, Landmark, QrCode, FileText, Calendar, MessageCircle } from 'lucide-react'
import { MercadoPagoCheckout } from './MercadoPagoCheckout'
import { CopyButton } from './CopyButton'

export const dynamic = 'force-dynamic'

export default async function PublicProjectPage({ params }: { params: Promise<{ public_id: string }> }) {
  const { public_id } = await params

  // Buscar projeto público sem autenticação
  const { data: project, error } = await supabaseAdmin
    .from('projetos')
    .select('id, nome, valor_total, administrador_id, cliente_nome')
    .eq('token_publico', public_id)
    .single()

  if (error || !project) {
    return (
      <div className="min-h-screen bg-gray-50 flex items-center justify-center p-4">
        <div className="bg-white p-8 rounded-2xl shadow-sm text-center max-w-md w-full border border-gray-100">
          <h2 className="text-xl font-bold text-gray-900 mb-2">Projeto não encontrado</h2>
          <p className="text-gray-500 text-sm">Verifique o link informado. É possível que o projeto tenha sido removido.</p>
        </div>
      </div>
    )
  }

  // Buscar pagamentos
  const { data: payments } = await supabaseAdmin
    .from('pagamentos')
    .select('*')
    .eq('projeto_id', project.id)
    .order('criado_em', { ascending: false })

  const valorPago = payments?.reduce((acc, curr) => acc + Number(curr.valor), 0) || 0
  const valorTotal = Number(project.valor_total)
  const saldoRestante = valorTotal - valorPago
  const progresso = valorTotal > 0 ? Math.min(100, Math.round((valorPago / valorTotal) * 100)) : 0

  // Buscar configurações de pagamento do administrador
  const { data: config } = await supabaseAdmin
    .from('config_pagamentos')
    .select('*')
    .eq('administrador_id', project.administrador_id)
    .single()

  const isPago = saldoRestante <= 0

  return (
    <div className="min-h-screen bg-gray-50 py-10 px-4 sm:px-6">
      <div className="max-w-2xl mx-auto space-y-6">
        
        {/* Cabeçalho */}
        <div className="text-center mb-8">
          <h1 className="text-lg font-medium text-gray-500 tracking-wide uppercase">Payment Progress</h1>
          <h2 className="text-3xl font-bold text-gray-900 mt-2">{project.nome}</h2>
          <p className="text-gray-600 mt-1">Cliente: {project.cliente_nome}</p>
        </div>

        {/* Card Principal Financeiro */}
        <div className="bg-white rounded-2xl shadow-sm border border-gray-100 overflow-hidden">
          <div className="p-6 sm:p-8 text-center bg-gray-900 text-white">
            <p className="text-sm font-medium text-gray-300 mb-2 uppercase tracking-wider">
              {isPago ? 'Pagamento Concluído' : 'Ainda Falta'}
            </p>
            <h3 className="text-4xl sm:text-5xl font-bold tracking-tight">
              {formatCurrency(isPago ? 0 : saldoRestante)}
            </h3>
          </div>
          
          <div className="p-6 sm:p-8 space-y-8">
            {/* Barra de Progresso */}
            <div>
              <div className="flex justify-between items-end mb-3">
                <span className="text-sm font-medium text-gray-500">Progresso Geral</span>
                <span className="text-2xl font-bold text-gray-900">{progresso}%</span>
              </div>
              <div className="w-full bg-gray-100 rounded-full h-4 overflow-hidden">
                <div 
                  className="bg-emerald-500 h-4 rounded-full transition-all duration-1000 ease-out" 
                  style={{ width: `${progresso}%` }}
                ></div>
              </div>
            </div>

            {/* Resumo */}
            <div className="grid grid-cols-2 gap-6 pt-6 border-t border-gray-100">
              <div>
                <span className="block text-sm text-gray-500 mb-1">Valor Total</span>
                <span className="text-xl font-semibold text-gray-900">{formatCurrency(valorTotal)}</span>
              </div>
              <div>
                <span className="block text-sm text-gray-500 mb-1">Valor Pago</span>
                <span className="text-xl font-semibold text-emerald-600">{formatCurrency(valorPago)}</span>
              </div>
            </div>
          </div>
        </div>

        {/* Formas de Pagamento */}
        {!isPago && (
          <div className="space-y-4">
            <h3 className="text-xl font-bold text-gray-900 px-2 pt-4">Como deseja pagar?</h3>
            
            {/* Pix */}
            <div className="bg-white p-6 rounded-2xl border border-gray-200 hover:border-gray-300 transition-colors shadow-sm">
              <div className="flex items-center gap-4 mb-4">
                <div className="p-3 bg-emerald-50 text-emerald-600 rounded-xl">
                  <QrCode className="w-6 h-6" />
                </div>
                <div>
                  <h4 className="font-bold text-gray-900">Pix</h4>
                  <p className="text-sm text-gray-500">Pagamento instantâneo via chave Pix</p>
                </div>
              </div>
              <div className="bg-gray-50 p-4 rounded-lg flex flex-col sm:flex-row sm:items-center justify-between gap-4">
                <div>
                  <p className="text-sm text-gray-600 mb-1">Chave Pix:</p>
                  <p className="font-mono font-medium text-gray-900 break-all select-all">
                    {config?.chave_pix || 'Chave não configurada pelo administrador'}
                  </p>
                </div>
                {config?.chave_pix && (
                  <CopyButton textToCopy={config.chave_pix} label="Copiar Chave" />
                )}
              </div>
            </div>

            {/* Depósito */}
            <div className="bg-white p-6 rounded-2xl border border-gray-200 hover:border-gray-300 transition-colors shadow-sm">
              <div className="flex items-center gap-4 mb-4">
                <div className="p-3 bg-blue-50 text-blue-600 rounded-xl">
                  <Landmark className="w-6 h-6" />
                </div>
                <div>
                  <h4 className="font-bold text-gray-900">Transferência Bancária</h4>
                  <p className="text-sm text-gray-500">Depósito direto na conta</p>
                </div>
              </div>
              <div className="bg-gray-50 p-4 rounded-lg flex flex-col sm:flex-row justify-between gap-4 items-start sm:items-center">
                <p className="font-medium text-gray-900 whitespace-pre-wrap flex-1">
                  {config?.dados_deposito || 'Dados bancários não configurados'}
                </p>
                {config?.dados_deposito && (
                  <CopyButton textToCopy={config.dados_deposito} label="Copiar Dados" />
                )}
              </div>
            </div>

            {/* Cartão de Crédito via Mercado Pago */}
            <MercadoPagoCheckout publicId={public_id} maxAmount={saldoRestante} />
          </div>
        )}

        {/* Histórico de Pagamentos */}
        <div className="pt-6">
          <h3 className="text-xl font-bold text-gray-900 px-2 mb-4">Histórico de Pagamentos</h3>
          {payments?.length === 0 ? (
            <div className="bg-white p-8 rounded-2xl border border-gray-100 shadow-sm text-center">
              <p className="text-gray-500">Nenhum pagamento registrado no momento.</p>
            </div>
          ) : (
            <div className="bg-white rounded-2xl border border-gray-100 shadow-sm overflow-hidden">
              <div className="divide-y divide-gray-50">
                {payments?.map((pagamento) => (
                  <div key={pagamento.id} className="p-4 sm:p-6 flex flex-col sm:flex-row justify-between sm:items-center gap-4 hover:bg-gray-50 transition-colors">
                    <div className="flex items-start gap-4">
                      <div className="p-2 bg-emerald-50 text-emerald-600 rounded-lg shrink-0">
                        <CreditCard className="w-5 h-5" />
                      </div>
                      <div>
                        <p className="font-bold text-gray-900 text-lg">{formatCurrency(Number(pagamento.valor))}</p>
                        <p className="text-sm font-medium text-gray-500 uppercase tracking-wider">{pagamento.metodo}</p>
                        {pagamento.observacao && (
                          <p className="text-sm text-gray-600 mt-2 flex items-center gap-1.5">
                            <FileText className="w-4 h-4 text-gray-400" />
                            {pagamento.observacao}
                          </p>
                        )}
                      </div>
                    </div>
                    <div className="text-sm text-gray-500 flex items-center gap-1.5 sm:self-start">
                      <Calendar className="w-4 h-4" />
                      {new Date(pagamento.criado_em).toLocaleDateString('pt-BR')}
                    </div>
                  </div>
                ))}
              </div>
            </div>
          )}
        </div>

        {/* Contato Whatsapp */}
        {config?.whatsapp && (
          <div className="pt-8 flex justify-center">
            <a 
              href={`https://wa.me/${config.whatsapp.replace(/\D/g, '')}`} 
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-2 text-emerald-600 bg-emerald-50 px-6 py-3 rounded-full font-medium hover:bg-emerald-100 transition-colors cursor-pointer"
            >
              <MessageCircle className="w-5 h-5" />
              Falar com o responsável
            </a>
          </div>
        )}
      </div>
    </div>
  )
}
