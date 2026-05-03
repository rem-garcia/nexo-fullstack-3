import { NextRequest, NextResponse } from 'next/server'
import { createClient } from '@nexo/supabase/src/server'
import { z } from 'zod'

const resetSchema = z.object({
  email: z.string().email('El correo electrónico no es válido')
})

export async function POST(request: NextRequest) {

  const body = await request.json()

  const validation = resetSchema.safeParse(body)

  if (!validation.success) {
    const firstError = validation.error.issues[0]?.message ?? 'Error de validación'
    return NextResponse.json(
      { error: firstError },
      { status: 400 }
    )
  }

  const supabase = await createClient()

  const { error } = await supabase.auth.resetPasswordForEmail(
    validation.data.email,
    {
      redirectTo: `${process.env.NEXT_PUBLIC_SUPABASE_URL}/auth/callback`
    }
  )

  if (error) {
    return NextResponse.json(
      { error: error.message },
      { status: 400 }
    )
  }

  return NextResponse.json(
    { message: 'Correo de restablecimiento enviado exitosamente' },
    { status: 200 }
  )
}