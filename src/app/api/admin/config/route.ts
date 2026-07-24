import { NextResponse } from 'next/server'
import { createClient } from '@/utils/supabase/server'
import { supabaseAdmin } from '@/lib/supabase-admin'

export async function GET(request: Request) {
  try {
    const supabase = await createClient()
    
    // Auth Check
    const { data: { user }, error: authError } = await supabase.auth.getUser()
    if (authError || !user) {
      return NextResponse.json({ success: false, error: { message: 'Não autenticado' } }, { status: 401 })
    }

    const { data: config, error } = await supabaseAdmin
      .from('config_pagamentos')
      .select('*')
      .eq('administrador_id', user.id)
      .single()

    // If config doesn't exist, we just return empty object, it's fine
    return NextResponse.json({
      success: true,
      config: config || {}
    })
  } catch (err: any) {
    return NextResponse.json({ success: false, error: { message: err.message } }, { status: 500 })
  }
}

export async function POST(request: Request) {
  try {
    const supabase = await createClient()
    
    // Auth Check
    const { data: { user }, error: authError } = await supabase.auth.getUser()
    if (authError || !user) {
      return NextResponse.json({ success: false, error: { message: 'Não autenticado' } }, { status: 401 })
    }

    const body = await request.json()
    const { chave_pix, banco_deposito, dados_deposito, whatsapp } = body

    // Check if exists
    const { data: existingConfig } = await supabaseAdmin
      .from('config_pagamentos')
      .select('id')
      .eq('administrador_id', user.id)
      .single()

    if (existingConfig) {
      // Update
      const { error } = await supabaseAdmin
        .from('config_pagamentos')
        .update({
          chave_pix,
          banco_deposito,
          dados_deposito,
          whatsapp,
          atualizado_em: new Date().toISOString()
        })
        .eq('administrador_id', user.id)

      if (error) throw error
    } else {
      // Insert
      const { error } = await supabaseAdmin
        .from('config_pagamentos')
        .insert({
          administrador_id: user.id,
          chave_pix,
          banco_deposito,
          dados_deposito,
          whatsapp
        })

      if (error) throw error
    }

    return NextResponse.json({ success: true })
  } catch (err: any) {
    return NextResponse.json({ success: false, error: { message: err.message } }, { status: 500 })
  }
}
