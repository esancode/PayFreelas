import { NextResponse } from 'next/server'
import { createClient } from '@/utils/supabase/server'
import { supabaseAdmin } from '@/lib/supabase-admin'
import { generatePublicId } from '@/utils/generatePublicId'

export async function POST(request: Request) {
  try {
    const supabase = await createClient()
    
    // Auth Check
    const { data: { user }, error: authError } = await supabase.auth.getUser()
    if (authError || !user) {
      return NextResponse.json({ success: false, error: { message: 'Não autenticado' } }, { status: 401 })
    }

    const body = await request.json()
    const { nome, cliente, valor_total } = body

    if (!nome || !cliente || !valor_total || valor_total <= 0) {
      return NextResponse.json({ success: false, error: { message: 'Dados inválidos' } }, { status: 400 })
    }

    const publicId = generatePublicId()

    // Assuming user.id exists in administradores table as per standard auth integration
    // If not, we might need to create it. For MVP, we assume the user.id matches administradores.id
    const { data: adminData, error: adminError } = await supabaseAdmin
      .from('administradores')
      .select('id')
      .eq('id', user.id)
      .single()

    if (adminError || !adminData) {
        // Just in case the administrator profile wasn't created yet, we create it.
        const { error: insertAdminError } = await supabaseAdmin
            .from('administradores')
            .insert({ id: user.id, email: user.email, nome: user.email?.split('@')[0] || 'Admin' })
        
        if (insertAdminError) {
             return NextResponse.json({ success: false, error: { message: 'Erro ao criar perfil de administrador' } }, { status: 500 })
        }
    }

    const { data: project, error } = await supabaseAdmin
      .from('projetos')
      .insert({
        administrador_id: user.id,
        nome,
        cliente_nome: cliente,
        valor_total,
        token_publico: publicId
      })
      .select()
      .single()

    if (error) {
      return NextResponse.json({ success: false, error: { message: error.message } }, { status: 500 })
    }

    return NextResponse.json({
      success: true,
      data: {
        id: project.id,
        public_id: project.token_publico,
        link: `/p/${project.token_publico}`
      }
    })

  } catch (err: any) {
    return NextResponse.json({ success: false, error: { message: err.message } }, { status: 500 })
  }
}
