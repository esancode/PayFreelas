import { NextResponse } from 'next/server'
import { createClient } from '@/utils/supabase/server'
import { supabaseAdmin } from '@/lib/supabase-admin'

export async function GET(request: Request, { params }: { params: Promise<{ public_id: string }> }) {
  try {
    const { public_id } = await params
    const supabase = await createClient()

    // Buscar projeto público sem autenticação
    const { data: project, error } = await supabaseAdmin
      .from('projetos')
      .select('id, nome, valor_total, administrador_id')
      .eq('token_publico', public_id)
      .single()

    if (error || !project) {
      return NextResponse.json({ success: false, error: { message: 'Projeto não encontrado' } }, { status: 404 })
    }

    // Buscar pagamentos vinculados ao projeto
    const { data: payments, error: payError } = await supabaseAdmin
      .from('pagamentos')
      .select('id, valor, metodo, data:criado_em, observacao')
      .eq('projeto_id', project.id)
      .order('criado_em', { ascending: false })

    let valor_pago = 0
    let historico: any[] = []
    
    if (!payError && payments) {
      valor_pago = payments.reduce((acc, curr) => acc + Number(curr.valor), 0)
      historico = payments
    }

    const valor_total = Number(project.valor_total)
    const saldo_restante = valor_total - valor_pago
    const progresso = valor_total > 0 ? (valor_pago / valor_total) * 100 : 0

    // Buscar configurações de pagamento do administrador
    const { data: config } = await supabaseAdmin
      .from('config_pagamentos')
      .select('chave_pix, banco_deposito, dados_deposito, whatsapp')
      .eq('administrador_id', project.administrador_id)
      .single()

    return NextResponse.json({
      success: true,
      data: {
        nome: project.nome,
        valor_total,
        valor_pago,
        saldo_restante,
        progresso,
        historico,
        formas_pagamento: config || null
      }
    })

  } catch (err: any) {
    return NextResponse.json({ success: false, error: { message: err.message } }, { status: 500 })
  }
}
