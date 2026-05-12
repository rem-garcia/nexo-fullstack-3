import { NextRequest, NextResponse } from 'next/server'
import { createClient } from '@nexo/supabase/src/server'
import { z } from 'zod'

const registerSchema = z.object({
  full_name: z.string().min(3, 'El nombre debe tener al menos 3 caracteres'),
  email: z.string().email('El correo electrónico no es válido'),
  password: z.string()
    .min(8, 'La contraseña debe tener al menos 8 caracteres')
    .regex(/[A-Z]/, 'Debe contener al menos una mayúscula')
    .regex(/[0-9]/, 'Debe contener al menos un número'),
  role: z.enum(['cliente', 'coordinador', 'tecnico', 'admin'])
})

export async function POST(request: NextRequest) {

  const body = await request.json()

  const validation = registerSchema.safeParse(body)

  if (!validation.success) {
    const firstError = validation.error.issues[0]?.message ?? 'Error de validación'
    return NextResponse.json(
      { error: firstError },
      { status: 400 }
    )
  }

  const supabase = await createClient()

  const { data, error } = await supabase.auth.signUp({
    email: validation.data.email,
    password: validation.data.password,
    options: {
      data: {
        full_name: validation.data.full_name,
        role: validation.data.role
      }
    }
  })

  if (error) {
    return NextResponse.json(
      { error: error.message },
      { status: 400 }
    )
  }

  return NextResponse.json(
    {
      user: data.user,
      message: 'Usuario registrado exitosamente. Revisa tu correo para verificar tu cuenta.'
    },
    { status: 201 }
  )
}