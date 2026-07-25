import { createClient } from '@/utils/supabase/server'
import { supabaseAdmin } from '@/lib/supabase-admin'
import { ConfigForm } from './ConfigForm'

export const dynamic = 'force-dynamic'

export default async function ConfiguracoesPage() {
  const supabase = await createClient()
  const { data: { user } } = await supabase.auth.getUser()

  if (!user) return null

  const { data: config } = await supabaseAdmin
    .from('config_pagamentos')
    .select('*')
    .eq('administrador_id', user.id)
    .single()

  const initialData = config || {
    chave_pix: '',
    banco_deposito: '',
    dados_deposito: '',
    whatsapp: ''
  }

  return (
    <div className="space-y-6">
      <div className="border-b border-gray-200 pb-5">
        <h2 className="text-2xl font-bold leading-7 text-gray-900 sm:truncate sm:tracking-tight">
          Configurações de Pagamento
        </h2>
        <p className="mt-1 text-sm text-gray-500">
          Gerencie suas chaves e dados bancários para que o cliente possa realizar pagamentos manuais. A integração com Mercado Pago é configurada no servidor.
        </p>
      </div>

      <ConfigForm initialData={initialData} />
    </div>
  )
}
