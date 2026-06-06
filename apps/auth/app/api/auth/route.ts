import { NextRequest, NextResponse } from 'next/server'
import { authService } from '../../../src/auth/service'
import { z } from 'zod'

const loginSchema = z.object({
  email: z.string().email('Correo inválido'),
  password: z.string().min(6, 'Contraseña muy corta'),
})

const registerSchema = z.object({
  full_name: z.string().min(3, 'Nombre muy corto'),
  email: z.string().email('Correo inválido'),
  password: z.string().min(8, 'Contraseña muy corta'),
  role: z.enum(['super_admin', 'admin', 'coordinador', 'tecnico', 'cliente']),
})

const resetRequestSchema = z.object({
  email: z.string().email('Correo inválido'),
  redirectTo: z.string().url().optional(),
})

const resetConfirmSchema = z.object({
  access_token: z.string().min(10, 'Token inválido'),
  password: z.string().min(8, 'Contraseña muy corta'),
})

// Extrae el JWT del header `Authorization: Bearer <token>`.
function getBearerToken(request: NextRequest): string | null {
  const header = request.headers.get('authorization') ?? ''
  return header.startsWith('Bearer ') ? header.slice(7) : null
}

// GET /api/auth → "me": valida el Bearer token y devuelve el perfil.
export async function GET(request: NextRequest) {
  try {
    const token = getBearerToken(request)
    if (!token) {
      return NextResponse.json({ error: 'No autorizado' }, { status: 401 })
    }
    const profile = await authService.getMe(token)
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
        return NextResponse.json({ error: validation.error.issues[0]?.message }, { status: 400 })
      }
      const result = await authService.login(validation.data)
      if (result.error || !result.access_token) {
        return NextResponse.json({ error: result.error ?? 'Credenciales inválidas' }, { status: 401 })
      }
      return NextResponse.json(
        {
          user: result.user,
          access_token: result.access_token,
          refresh_token: result.refresh_token,
        },
        { status: 200 }
      )
    }

    if (action === 'register') {
      const validation = registerSchema.safeParse(body)
      if (!validation.success) {
        return NextResponse.json({ error: validation.error.issues[0]?.message }, { status: 400 })
      }
      const result = await authService.register(validation.data)
      if (result.error) {
        return NextResponse.json({ error: result.error }, { status: 400 })
      }
      return NextResponse.json({ user: result.user }, { status: 201 })
    }

    if (action === 'reset-request') {
      const validation = resetRequestSchema.safeParse(body)
      if (!validation.success) {
        return NextResponse.json({ error: validation.error.issues[0]?.message }, { status: 400 })
      }
      const redirectTo =
        validation.data.redirectTo ??
        `${process.env.DASHBOARD_URL ?? ''}/reset-password`
      const result = await authService.requestPasswordReset(validation.data.email, redirectTo)
      if (result.error) {
        return NextResponse.json({ error: result.error }, { status: 400 })
      }
      return NextResponse.json({ message: 'Correo enviado' }, { status: 200 })
    }

    if (action === 'reset-confirm') {
      const validation = resetConfirmSchema.safeParse(body)
      if (!validation.success) {
        return NextResponse.json({ error: validation.error.issues[0]?.message }, { status: 400 })
      }
      const result = await authService.confirmPasswordReset(
        validation.data.access_token,
        validation.data.password
      )
      if (result.error) {
        return NextResponse.json({ error: result.error }, { status: 400 })
      }
      return NextResponse.json({ message: 'Contraseña actualizada' }, { status: 200 })
    }

    // El logout es stateless: el frontend descarta el token. Se mantiene la
    // acción por compatibilidad con el cliente.
    if (action === 'logout') {
      return NextResponse.json({ message: 'Sesión cerrada' }, { status: 200 })
    }

    return NextResponse.json({ error: 'Acción no válida' }, { status: 400 })
  } catch {
    return NextResponse.json({ error: 'Error interno' }, { status: 500 })
  }
}
