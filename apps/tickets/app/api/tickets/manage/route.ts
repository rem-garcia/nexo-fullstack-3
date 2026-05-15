import { NextRequest, NextResponse } from 'next/server'
import { ticketService } from '../../../../src/tickets/service'
import { z } from 'zod'

const createTicketSchema = z.object({
  reclamo_id: z.string().uuid(),
  tecnico_id: z.string().uuid().optional(),
  coordinador_id: z.string().uuid().optional(),
  notas: z.string().optional(),
})

const updateTicketSchema = z.object({
  id: z.string().uuid(),
  tecnico_id: z.string().uuid().optional(),
  estado: z.enum(['pendiente', 'en_proceso', 'cerrado']).optional(),
  notas: z.string().optional(),
})

// GET /api/tickets/manage → todos los tickets formales
export async function GET() {
  try {
    const tickets = await ticketService.getAllTickets()
    return NextResponse.json({ tickets }, { status: 200 })
  } catch (error) {
    return NextResponse.json({ error: 'Error al obtener tickets' }, { status: 500 })
  }
}

// POST /api/tickets/manage → crear ticket formal desde reclamo
export async function POST(request: NextRequest) {
  try {
    const body = await request.json()
    const validation = createTicketSchema.safeParse(body)

    if (!validation.success) {
      return NextResponse.json(
        { error: validation.error.issues[0]?.message },
        { status: 400 }
      )
    }

    const ticket = await ticketService.createTicket(validation.data)
    return NextResponse.json({ ticket }, { status: 201 })
  } catch (error) {
    return NextResponse.json({ error: 'Error al crear ticket' }, { status: 500 })
  }
}

// PATCH /api/tickets/manage → actualizar ticket
export async function PATCH(request: NextRequest) {
  try {
    const body = await request.json()
    const validation = updateTicketSchema.safeParse(body)

    if (!validation.success) {
      return NextResponse.json(
        { error: validation.error.issues[0]?.message },
        { status: 400 }
      )
    }

    const { id, ...data } = validation.data
    const ticket = await ticketService.updateTicket(id, data)
    return NextResponse.json({ ticket }, { status: 200 })
  } catch (error) {
    return NextResponse.json({ error: 'Error al actualizar ticket' }, { status: 500 })
  }
}