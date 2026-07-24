import { NextResponse } from 'next/server'
import { createClient } from '@/utils/supabase/server'
import { supabaseAdmin } from '@/lib/supabase-admin'

export async function GET(request: Request, { params }: { params: Promise<{ id: string }> }) {
  try {
    const { id } = await params
    const supabase = await createClient()
    
    // Auth Check
    const { data: { user }, error: authError } = await supabase.auth.getUser()
    if (authError || !user) {
      return NextResponse.json({ success: false, error: { message: 'Não autenticado' } }, { status: 401 })
    }

    const { data: project, error } = await supabaseAdmin
      .from('projetos')
      .select('*')
      .eq('id', id)
      .eq('administrador_id', user.id)
      .single()

    if (error || !project) {
      return NextResponse.json({ success: false, error: { message: 'Projeto não encontrado' } }, { status: 404 })
    }

    // Calcular valores dos pagamentos
    const { data: payments, error: payError } = await supabaseAdmin
      .from('pagamentos')
      .select('valor')
      .eq('projeto_id', project.id)

    let valor_pago = 0
    if (!payError && payments) {
      valor_pago = payments.reduce((acc, curr) => acc + Number(curr.valor), 0)
    }

    const saldo_restante = Number(project.valor_total) - valor_pago

    return NextResponse.json({
      success: true,
      data: {
        id: project.id,
        nome: project.nome,
        cliente: project.cliente_nome,
        valor_total: Number(project.valor_total),
        valor_pago,
        saldo_restante
      }
    })

  } catch (err: any) {
    return NextResponse.json({ success: false, error: { message: err.message } }, { status: 500 })
  }
}

export async function DELETE(request: Request, { params }: { params: Promise<{ id: string }> }) {
  try {
    const { id } = await params
    const supabase = await createClient()
    
    // Auth Check
    const { data: { user }, error: authError } = await supabase.auth.getUser()
    if (authError || !user) {
      return NextResponse.json({ success: false, error: { message: 'Não autenticado' } }, { status: 401 })
    }

    // Exclusão
    const { error } = await supabaseAdmin
      .from('projetos')
      .delete()
      .eq('id', id)
      .eq('administrador_id', user.id)

    if (error) {
      return NextResponse.json({ success: false, error: { message: error.message } }, { status: 500 })
    }

    return NextResponse.json({ success: true, data: {} })
  } catch (err: any) {
    return NextResponse.json({ success: false, error: { message: err.message } }, { status: 500 })
  }
}
