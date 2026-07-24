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

    // Check project ownership
    const { data: project, error: projError } = await supabaseAdmin
      .from('projetos')
      .select('id')
      .eq('id', id)
      .eq('administrador_id', user.id)
      .single()

    if (projError || !project) {
      return NextResponse.json({ success: false, error: { message: 'Projeto não encontrado ou acesso negado' } }, { status: 404 })
    }

    const { data: payments, error } = await supabaseAdmin
      .from('pagamentos')
      .select('*')
      .eq('projeto_id', id)
      .order('criado_em', { ascending: false })

    if (error) {
      return NextResponse.json({ success: false, error: { message: error.message } }, { status: 500 })
    }

    return NextResponse.json({ success: true, data: payments })

  } catch (err: any) {
    return NextResponse.json({ success: false, error: { message: err.message } }, { status: 500 })
  }
}

export async function POST(request: Request, { params }: { params: Promise<{ id: string }> }) {
  try {
    const { id } = await params
    const supabase = await createClient()

    // Auth Check
    const { data: { user }, error: authError } = await supabase.auth.getUser()
    if (authError || !user) {
      return NextResponse.json({ success: false, error: { message: 'Não autenticado' } }, { status: 401 })
    }

    const body = await request.json()
    const { valor, metodo, observacao } = body

    if (!valor || valor <= 0 || !metodo) {
      return NextResponse.json({ success: false, error: { message: 'Dados inválidos' } }, { status: 400 })
    }

    const allowedMethods = ['PIX', 'DEPOSITO', 'CARTAO_CREDITO']
    const normalizedMethod = String(metodo).toUpperCase()
    
    if (!allowedMethods.includes(normalizedMethod)) {
      return NextResponse.json({ success: false, error: { message: 'Método inválido' } }, { status: 400 })
    }

    // Check project ownership and fetch value
    const { data: project, error: projError } = await supabaseAdmin
      .from('projetos')
      .select('id, valor_total')
      .eq('id', id)
      .eq('administrador_id', user.id)
      .single()

    if (projError || !project) {
      return NextResponse.json({ success: false, error: { message: 'Projeto não encontrado' } }, { status: 404 })
    }

    // Calculate current paid value to validate new payment
    const { data: payments, error: payError } = await supabaseAdmin
      .from('pagamentos')
      .select('valor')
      .eq('projeto_id', project.id)

    let valor_pago = 0
    if (!payError && payments) {
      valor_pago = payments.reduce((acc, curr) => acc + Number(curr.valor), 0)
    }

    const saldo_restante = Number(project.valor_total) - valor_pago

    if (Number(valor) > saldo_restante) {
      return NextResponse.json({ success: false, error: { message: 'Valor ultrapassa o saldo restante' } }, { status: 400 })
    }

    // Insert payment
    const { data: payment, error } = await supabaseAdmin
      .from('pagamentos')
      .insert({
        projeto_id: project.id,
        valor: Number(valor),
        metodo: normalizedMethod,
        observacao: observacao || null
      })
      .select()
      .single()

    if (error) {
      return NextResponse.json({ success: false, error: { message: error.message } }, { status: 500 })
    }

    return NextResponse.json({
      success: true,
      payment: {
        id: payment.id,
        valor: payment.valor
      }
    })

  } catch (err: any) {
    return NextResponse.json({ success: false, error: { message: err.message } }, { status: 500 })
  }
}
