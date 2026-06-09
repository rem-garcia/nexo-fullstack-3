import { ticketRepository } from './repository'
import { CreateTicketDto, UpdateTicketDto, CreateReclamoDto } from './model'

export const ticketService = {
  // Reclamos
  getAllReclamos: async () => {
    return ticketRepository.findAllReclamos()
  },

  getReclamoById: async (id: string) => {
    return ticketRepository.findReclamoById(id)
  },

  createReclamo: async (data: CreateReclamoDto) => {
    return ticketRepository.createReclamo(data)
  },

  // Tickets
  getAllTickets: async () => {
    return ticketRepository.findAllTickets()
  },

  getTicketById: async (id: string) => {
    return ticketRepository.findTicketById(id)
  },

  getTicketsByTecnico: async (tecnico_id: string) => {
    return ticketRepository.findTicketsByTecnico(tecnico_id)
  },

  createTicket: async (data: CreateTicketDto) => {
    return ticketRepository.createTicket(data)
  },

  updateTicket: async (id: string, data: UpdateTicketDto) => {
    return ticketRepository.updateTicket(id, data)
  }
}