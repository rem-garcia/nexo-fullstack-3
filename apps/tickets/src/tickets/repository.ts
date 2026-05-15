import { prisma } from '../../lib/prisma'
import { CreateTicketDto, UpdateTicketDto, CreateReclamoDto } from './model'

export const ticketRepository = {
  // Reclamos
  findAllReclamos: async () => {
    return prisma.reclamo.findMany({
      orderBy: { creado_en: 'desc' }
    })
  },

  findReclamoById: async (id: string) => {
    return prisma.reclamo.findUnique({ where: { id } })
  },

  createReclamo: async (data: CreateReclamoDto) => {
    return prisma.reclamo.create({ data })
  },

  // Tickets
  findAllTickets: async () => {
    return prisma.tickets.findMany({
      orderBy: { created_at: 'desc' },
      include: { reclamo: true }
    })
  },

  findTicketById: async (id: string) => {
    return prisma.tickets.findUnique({
      where: { id },
      include: { reclamo: true }
    })
  },

  findTicketsByTecnico: async (tecnico_id: string) => {
    return prisma.tickets.findMany({
      where: { tecnico_id },
      orderBy: { created_at: 'desc' },
      include: { reclamo: true }
    })
  },

  createTicket: async (data: CreateTicketDto) => {
    return prisma.tickets.create({ data })
  },

  updateTicket: async (id: string, data: UpdateTicketDto) => {
    return prisma.tickets.update({
      where: { id },
      data
    })
  }
}