import { NextRequest, NextResponse } from 'next/server'
import { getSupabaseClient } from '../../../lib/supabase'

export async function POST(request: NextRequest) {
  try {
    const body = await request.json()
    const { action, email, password } = body

    const supabase = await getSupabaseClient()

    if (action === 'login') {
      const { data, error } = await supabase.auth.signInWithPassword({
        email,
        password
      })
      if (error) return NextResponse.json({ error: error.message }, { status: 401 })
      return NextResponse.json({ user: data.user }, { status: 200 })
    }

    if (action === 'logout') {
      await supabase.auth.signOut()
      return NextResponse.json({ message: 'Sesión cerrada' }, { status: 200 })
    }
    if (action === 'reset-password') {
  const { error } = await supabase.auth.resetPasswordForEmail(email, {
    redirectTo: `${process.env.NEXT_PUBLIC_DASHBOARD_URL}/reset-password`
  })
  if (error) return NextResponse.json({ error: error.message }, { status: 400 })
  return NextResponse.json({ message: 'Correo enviado' }, { status: 200 })
}

    return NextResponse.json({ error: 'Acción no válida' }, { status: 400 })
  } catch {
    return NextResponse.json({ error: 'Error interno' }, { status: 500 })
  }
}