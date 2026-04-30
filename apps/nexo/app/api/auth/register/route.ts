import { NextRequest, NextResponse } from 'next/server'
import { AuthService } from '@nexo/auth'
import { registerSchema } from '@nexo/auth'

export async function POST(request: NextRequest) {

  // 1. leer los datos del body
  const body = await request.json()

  // 2. validar los datos con Zod
  const validation = registerSchema.safeParse(body)

  if (!validation.success) {
    return NextResponse.json(
      { error: validation.error.errors[0].message },
      { status: 400 }
    )
  }

  // 3. llamar al servicio de autenticación
  const { user, error } = await AuthService.register(validation.data)

  if (error) {
    return NextResponse.json(
      { error },
      { status: 401 }
    )
  }

  // 4. retornar respuesta exitosa
  return NextResponse.json(
    { user, message: 'Usuario registrado exitosamente' },
    { status: 201 }
  )
}