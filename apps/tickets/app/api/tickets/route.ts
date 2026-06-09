import { NextRequest, NextResponse } from 'next/server'
import { ticketService } from '../../../src/tickets/service'
import { z } from 'zod'

const reclamoSchema = z.object({
  nombre_cliente: z.string().min(3),
  email_cliente: z.string().email(),
  num_telefono: z.string().min(9),
  tipo_propiedad: z.string().min(1),
  nro_dpto: z.string().min(1),
  tipo_falla: z.string().min(1),
  ubicacion_falla: z.string().min(1),
  descripcion_falla: z.string().optional(),
})

// GET /api/tickets → retorna reclamos (para compatibilidad)
export async function GET() {
  try {
    const reclamos = await ticketService.getAllReclamos()
    return NextResponse.json({ tickets: reclamos }, { status: 200 })
  } catch (error) {
    console.error('Error:', error)
    return NextResponse.json({ error: 'Error al obtener los tickets' }, { status: 500 })
  }
}

// POST /api/tickets → crear reclamo
export async function POST(request: NextRequest) {
  try {
    const body = await request.json()
    const validation = reclamoSchema.safeParse(body)

    if (!validation.success) {
      return NextResponse.json(
        { error: validation.error.issues[0]?.message },
        { status: 400 }
      )
    }

    const reclamo = await ticketService.createReclamo(validation.data)
    return NextResponse.json({ ticket: reclamo }, { status: 201 })
  } catch (error) {
    console.error('Error:', error)
    return NextResponse.json({ error: 'Error al crear el ticket' }, { status: 500 })
  }
}