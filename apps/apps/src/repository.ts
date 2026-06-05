import { prisma } from '../lib/prisma'
import { CreatePropiedadDto } from './models'

export const propiedadRepository = {
  findAll: async () => {
    return prisma.propiedades.findMany({
      orderBy: { creado_en: 'desc' }
    })
  },

  findById: async (id: string) => {
    return prisma.propiedades.findUnique({
      where: { id }
    })
  },

  create: async (data: CreatePropiedadDto) => {
    return prisma.propiedades.create({
      data: {
        codigo: data.codigo,
        tipo: data.tipo,
        direccion: data.direccion,
        sector: data.sector,
        piso: data.piso,
        unidad: data.unidad,
        torre: data.torre,
        m2: data.m2,
        garantia: data.garantia,
      }
    })
  }
}