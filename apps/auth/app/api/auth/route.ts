import { NextRequest, NextResponse } from 'next/server'
import { authService } from '../../../src/auth/service'
import { z } from 'zod'

const loginSchema = z.object({
  email: z.string().email('Correo inválido'),
  password: z.string().min(6, 'Contraseña muy corta')
})

const registerSchema = z.object({
  full_name: z.string().min(3, 'Nombre muy corto'),
  email: z.string().email('Correo inválido'),
  password: z.string().min(8, 'Contraseña muy corta'),
  role: z.enum(['super_admin', 'admin', 'coordinador', 'tecnico', 'cliente'])
})

export async function GET() {
  try {
    const profile = await authService.getMe()
    if (!profile) {
      return NextResponse.json({ error: 'No autorizado' }, { status: 401 })
    }
    return NextResponse.json({ user: profile }, { status: 200 })
  } catch {
    return NextResponse.json({ error: 'Error interno' }, { status: 500 })
  }
}

export async function POST(request: NextRequest) {
  try {
    const body = await request.json()
    const { action } = body

    if (action === 'login') {
      const validation = loginSchema.safeParse(body)
      if (!validation.success) {
        return NextResponse.json(
          { error: validation.error.issues[0]?.message },
          { status: 400 }
        )
      }
      const result = await authService.login(validation.data)
      if (result.error) {
        return NextResponse.json({ error: result.error }, { status: 401 })
      }
      return NextResponse.json({ user: result.user }, { status: 200 })
    }

    if (action === 'register') {
      const validation = registerSchema.safeParse(body)
      if (!validation.success) {
        return NextResponse.json(
          { error: validation.error.issues[0]?.message },
          { status: 400 }
        )
      }
      const result = await authService.register(validation.data)
      if (result.error) {
        return NextResponse.json({ error: result.error }, { status: 400 })
      }
      return NextResponse.json({ user: result.user }, { status: 201 })
    }

    if (action === 'logout') {
      const result = await authService.logout()
      if (result.error) {
        return NextResponse.json({ error: result.error }, { status: 500 })
      }
      return NextResponse.json({ message: 'Sesión cerrada' }, { status: 200 })
    }

    return NextResponse.json({ error: 'Acción no válida' }, { status: 400 })

  } catch {
    return NextResponse.json({ error: 'Error interno' }, { status: 500 })
  }
}