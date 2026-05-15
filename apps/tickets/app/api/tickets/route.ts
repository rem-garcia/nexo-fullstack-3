import { NextRequest, NextResponse } from 'next/server'
import { ticketService } from '../../../src/tickets/service'
import { z } from 'zod'

const ticketSchema = z.object({
  nombre_cliente: z.string().min(3, 'El nombre debe tener al menos 3 caracteres'),
  email_cliente: z.string().email('El correo electrónico no es válido'),
  num_telefono: z.string().min(9, 'El teléfono debe tener al menos 9 caracteres'),
  tipo_propiedad: z.string().min(1, 'Seleccione un tipo de propiedad'),
  nro_dpto: z.string().min(1, 'Ingrese el número de departamento'),
  tipo_falla: z.string().min(1, 'Seleccione un tipo de falla'),
  ubicacion_falla: z.string().min(1, 'Seleccione la ubicación de la falla'),
  descripcion_falla: z.string().optional(),
})

export async function GET() {
  try {
    const tickets = await ticketService.getAll()
    return NextResponse.json({ tickets }, { status: 200 })
  } catch (error) {
    console.error('Error al obtener tickets:', error)
    return NextResponse.json(
      { error: 'Error al obtener los tickets' },
      { status: 500 }
    )
  }
}

export async function POST(request: NextRequest) {
  try {
    const body = await request.json()
    const validation = ticketSchema.safeParse(body)

    if (!validation.success) {
      const firstError = validation.error.issues[0]?.message ?? 'Error de validación'
      return NextResponse.json({ error: firstError }, { status: 400 })
    }

    const ticket = await ticketService.create(validation.data)
    return NextResponse.json(
      { ticket, message: 'Ticket creado exitosamente' },
      { status: 201 }
    )
  } catch (error) {
    console.error('Error al crear ticket:', error)
    return NextResponse.json(
      { error: 'Error al crear el ticket' },
      { status: 500 }
    )
  }
}