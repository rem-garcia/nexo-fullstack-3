import { propiedadRepository } from './repository'
import { CreatePropiedadDto } from './models'

export const propiedadService = {
  getAll: async () => {
    return propiedadRepository.findAll()
  },

  getById: async (id: string) => {
    return propiedadRepository.findById(id)
  },

  create: async (data: CreatePropiedadDto) => {
    return propiedadRepository.create(data)
  }
}