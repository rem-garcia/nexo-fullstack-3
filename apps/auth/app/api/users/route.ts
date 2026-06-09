import { NextRequest, NextResponse } from 'next/server'
import { authService } from '../../../src/auth/service'
import { usersService } from '../../../src/users/service'
import { z } from 'zod'

const createUserSchema = z.object({
  full_name: z.string().min(3, 'Nombre muy corto'),
  email: z.string().email('Correo inválido'),
  password: z.string().min(8, 'Contraseña muy corta'),
  role: z.enum(['super_admin', 'admin', 'coordinador', 'tecnico', 'cliente']),
  phone: z.string().optional().nullable(),
})

function getBearerToken(request: NextRequest): string | null {
  const header = request.headers.get('authorization') ?? ''
  return header.startsWith('Bearer ') ? header.slice(7) : null
}

// Valida el Bearer token y exige rol administrativo. Devuelve el perfil o null.
async function requireAdmin(request: NextRequest) {
  const token = getBearerToken(request)
  if (!token) return null
  const profile = await authService.getMe(token)
  if (!profile || !['admin', 'super_admin'].includes(profile.role)) return null
  return profile
}

// GET /api/users → lista de usuarios (solo admin).
export async function GET(request: NextRequest) {
  const admin = await requireAdmin(request)
  if (!admin) {
    return NextResponse.json({ error: 'No autorizado' }, { status: 401 })
  }
  try {
    const users = await usersService.list()
    return NextResponse.json({ users }, { status: 200 })
  } catch {
    return NextResponse.json({ error: 'Error al obtener usuarios' }, { status: 500 })
  }
}

// POST /api/users → crea un usuario (solo admin).
export async function POST(request: NextRequest) {
  const admin = await requireAdmin(request)
  if (!admin) {
    return NextResponse.json({ error: 'No autorizado' }, { status: 401 })
  }
  try {
    const body = await request.json()
    const validation = createUserSchema.safeParse(body)
    if (!validation.success) {
      return NextResponse.json({ error: validation.error.issues[0]?.message }, { status: 400 })
    }
    const user = await usersService.create(validation.data)
    return NextResponse.json({ user }, { status: 201 })
  } catch (error) {
    const message = error instanceof Error ? error.message : 'Error al crear usuario'
    return NextResponse.json({ error: message }, { status: 400 })
  }
}
