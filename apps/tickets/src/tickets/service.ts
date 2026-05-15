import { ticketRepository } from './repository'
import { CreateTicketDto } from './model'

export const ticketService = {
  getAll: async () => {
    return ticketRepository.findAll()
  },

  getById: async (id: string) => {
    return ticketRepository.findById(id)
  },

  create: async (data: CreateTicketDto) => {
    return ticketRepository.create(data)
  }
}