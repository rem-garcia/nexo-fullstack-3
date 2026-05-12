import { NextRequest, NextResponse } from 'next/server'
import { prisma } from '@/lib/prisma'
import { z } from 'zod'

const ticketSchema = z.object({
  nombre_cliente: z.string().min(3, 'El nombre debe tener al menos 3 caracteres'),
  email_cliente: z.string().email('El correo electrónico no es válido'),
  telefono: z.string().min(9, 'El teléfono debe tener al menos 9 caracteres'),
  tipo_propiedad: z.string().min(1, 'Seleccione un tipo de propiedad'),
  nro_dpto: z.string().min(1, 'Ingrese el número de departamento'),
  tipo_falla: z.string().min(1, 'Seleccione un tipo de falla'),
  ubicacion_falla: z.string().min(1, 'Seleccione la ubicación de la falla'),
  descripcion_falla: z.string().optional(),
})

// ── GET /api/tickets ──────────────────────────────────
export async function GET(request: NextRequest) {
  try {
    const tickets = await prisma.reclamo.findMany({
      orderBy: { creado_en: 'desc' }
    })

    return NextResponse.json(
      { tickets },
      { status: 200 }
    )

  } catch (error) {
    return NextResponse.json(
      { error: 'Error al obtener los tickets' },
      { status: 500 }
    )
  }
}

// ── POST /api/tickets ─────────────────────────────────
export async function POST(request: NextRequest) {
  try {
    const body = await request.json()

    const validation = ticketSchema.safeParse(body)

    if (!validation.success) {
      const firstError = validation.error.issues[0]?.message ?? 'Error de validación'
      return NextResponse.json(
        { error: firstError },
        { status: 400 }
      )
    }

    const ticket = await prisma.reclamo.create({
      data: {
        nombre_cliente: validation.data.nombre_cliente,
        email_cliente: validation.data.email_cliente,
        telefono: validation.data.telefono,
        tipo_propiedad: validation.data.tipo_propiedad,
        nro_dpto: validation.data.nro_dpto,
        tipo_falla: validation.data.tipo_falla,
        ubicacion_falla: validation.data.ubicacion_falla,
        descripcion_falla: validation.data.descripcion_falla ?? null,
      }
    })

    return NextResponse.json(
      { ticket, message: 'Ticket creado exitosamente' },
      { status: 201 }
    )

  } catch (error) {
    return NextResponse.json(
      { error: 'Error al crear el ticket' },
      { status: 500 }
    )
  }
}
