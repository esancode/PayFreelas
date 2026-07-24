import { NextResponse } from 'next/server'
import { MercadoPagoConfig, Preference } from 'mercadopago'
import { supabaseAdmin } from '@/lib/supabase-admin'

export async function POST(request: Request) {
  try {
    const body = await request.json()
    const { public_id, valor } = body

    if (!public_id || !valor || valor <= 0) {
      return NextResponse.json({ success: false, error: { message: 'Dados inválidos' } }, { status: 400 })
    }

    // Buscar projeto público sem autenticação
    const { data: project, error: projError } = await supabaseAdmin
      .from('projetos')
      .select('id, nome, valor_total')
      .eq('token_publico', public_id)
      .single()

    if (projError || !project) {
      return NextResponse.json({ success: false, error: { message: 'Projeto não encontrado' } }, { status: 404 })
    }

    // Calcular valores dos pagamentos já realizados
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
      return NextResponse.json({ success: false, error: { message: 'O valor informado ultrapassa o saldo restante.' } }, { status: 400 })
    }

    // Integrar com Mercado Pago
    const client = new MercadoPagoConfig({ accessToken: process.env.MERCADOPAGO_ACCESS_TOKEN || '' })
    const preference = new Preference(client)

    // A URL atual de onde a requisição originou para definir back_urls (opcional)
    let host = request.headers.get('origin')
    if (!host || host === 'null' || !host.startsWith('http')) {
      host = process.env.NEXT_PUBLIC_SITE_URL || 'http://localhost:3000'
    }

    let mpBody: any = {};
    try {
      mpBody = {
        items: [
          {
            id: project.id,
            title: `Pagamento: ${project.nome}`,
            quantity: 1,
            unit_price: Number(valor),
            currency_id: 'BRL',
          }
        ],
        back_urls: {
          success: `${host}/p/${public_id}?status=success`,
          failure: `${host}/p/${public_id}?status=failure`,
          pending: `${host}/p/${public_id}?status=pending`
        },
        ...(host.includes('localhost') ? {} : { auto_return: 'approved' }),
        external_reference: project.id,
      };

      const result = await preference.create({
        body: mpBody
      })

      if (!result.init_point) {
        throw new Error('Não foi possível gerar o link de pagamento')
      }

      return NextResponse.json({
        success: true,
        checkout_url: result.init_point
      })
    } catch (mpError: any) {
      return NextResponse.json({ success: false, error: { message: mpError.message, sentBody: mpBody } }, { status: 400 })
    }

  } catch (err: any) {
    return NextResponse.json({ success: false, error: { message: err.message } }, { status: 500 })
  }
}
