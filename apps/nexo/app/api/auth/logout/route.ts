import { NextResponse } from 'next/server'
import { AuthService } from '@nexo/auth'

export async function POST() {

  // 1. llamar al servicio de autenticación
  const { error } = await AuthService.logout()

  if (error) {
    return NextResponse.json(
      { error },
      { status: 500 }
    )
  }

  // 2. retornar respuesta exitosa
  return NextResponse.json(
    { message: 'Sesión cerrada exitosamente' },
    { status: 200 }
  )
}