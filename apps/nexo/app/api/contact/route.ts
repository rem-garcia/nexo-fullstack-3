/**import { NextRequest, NextResponse } from 'next/server'
import { Resend } from 'resend'
import { createClient } from '@supabase/supabase-js'

const resend = new Resend(process.env.RESEND_API_KEY)

const supabaseAdmin = createClient(
  process.env.NEXT_PUBLIC_SUPABASE_URL!,
  process.env.SUPABASE_SERVICE_ROLE_KEY!
)

export async function POST(request: NextRequest) {
  try {
    const { nombre, email, mensaje } = await request.json()

    if (!nombre || !email || !mensaje) {
      return NextResponse.json(
        { error: 'Todos los campos son requeridos' },
        { status: 400 }
      )
    }

    // Obtener todos los admins
    const { data: admins, error: adminError } = await supabaseAdmin
      .from('profiles')
      .select('email')
      .in('role', ['admin', 'super_admin'])
      .eq('is_active', true)

    if (adminError || !admins || admins.length === 0) {
      return NextResponse.json(
        { error: 'No se encontraron administradores' },
        { status: 500 }
      )
    }

    const adminEmails = admins.map(a => a.email)

    const { error } = await resend.emails.send({
      from: 'Nexo <onboarding@resend.dev>',
      to: adminEmails,
      subject: `Nuevo mensaje de contacto de ${nombre}`,
      html: `
        <h2>Nuevo mensaje de contacto</h2>
        <p><strong>Nombre:</strong> ${nombre}</p>
        <p><strong>Email:</strong> ${email}</p>
        <p><strong>Mensaje:</strong></p>
        <p>${mensaje}</p>
      `
    })

    if (error) return NextResponse.json({ error: error.message }, { status: 400 })

    return NextResponse.json({ message: 'Mensaje enviado correctamente' }, { status: 200 })

  } catch {
    return NextResponse.json({ error: 'Error interno' }, { status: 500 })
  }
}
*/
import { NextRequest, NextResponse } from 'next/server'
import { Resend } from 'resend'
import { createClient } from '@supabase/supabase-js'

const resend = new Resend(process.env.RESEND_API_KEY)

const supabaseAdmin = createClient(
  process.env.NEXT_PUBLIC_SUPABASE_URL!,
  process.env.SUPABASE_SERVICE_ROLE_KEY!
)

export async function POST(request: NextRequest) {
  try {
    const { nombre, email, mensaje } = await request.json()

    if (!nombre || !email || !mensaje) {
      return NextResponse.json(
        { error: 'Todos los campos son requeridos' },
        { status: 400 }
      )
    }

    const { data: admins } = await supabaseAdmin
      .from('profiles')
      .select('email')
      .in('role', ['admin', 'super_admin'])
      .eq('is_active', true)

    const adminEmails = admins?.map(a => a.email).join(', ') ?? 'rem.garcia@duocuc.cl'

    const { error } = await resend.emails.send({
      from: 'Nexo <onboarding@resend.dev>',
      to: 'rem.garcia@duocuc.cl',
      subject: `Nuevo mensaje de contacto de ${nombre}`,
      html: `
        <h2>Nuevo mensaje de contacto</h2>
        <p><strong>Nombre:</strong> ${nombre}</p>
        <p><strong>Email:</strong> ${email}</p>
        <p><strong>Mensaje:</strong></p>
        <p>${mensaje}</p>
        <hr/>
        <p><small>Administradores a notificar: ${adminEmails}</small></p>
      `
    })

    if (error) return NextResponse.json({ error: error.message }, { status: 400 })
    return NextResponse.json({ message: 'Mensaje enviado correctamente' }, { status: 200 })

  } catch {
    return NextResponse.json({ error: 'Error interno' }, { status: 500 })
  }
}