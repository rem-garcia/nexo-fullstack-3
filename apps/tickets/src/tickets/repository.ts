import { prisma } from '../../lib/prisma'
import { CreateTicketDto } from './model'

export const ticketRepository = {
  findAll: async () => {
    return prisma.reclamo.findMany({
      orderBy: { creado_en: 'desc' }
    })
  },

  findById: async (id: string) => {
    return prisma.reclamo.findUnique({
      where: { id }
    })
  },

  create: async (data: CreateTicketDto) => {
    return prisma.reclamo.create({
      data: {
        nombre_cliente: data.nombre_cliente,
        email_cliente: data.email_cliente,
        telefono: data.telefono,
        tipo_propiedad: data.tipo_propiedad,
        nro_dpto: data.nro_dpto,
        tipo_falla: data.tipo_falla,
        ubicacion_falla: data.ubicacion_falla,
        descripcion_falla: data.descripcion_falla ?? null,
      }
    })
  }
}