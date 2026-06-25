import { prismaMock } from '../../__mocks__/src/lib/prismaMock'

jest.mock('../../lib/prisma', () => ({
  prisma: prismaMock
}))

import { ticketRepository } from '../../src/tickets/repository'
import { CreateReclamoDto, CreateTicketDto, UpdateTicketDto } from '../../src/tickets/model'

// ── Datos de prueba ──────────────────────────────────────────────────────────

const mockReclamo = {
  id: 'reclamo-1',
  nombre_cliente: 'Juan Pérez',
  email_cliente: 'juan@test.com',
  num_telefono: '+56912345678',
  tipo_propiedad: 'departamento',
  nro_dpto: '101',
  tipo_falla: 'eléctrica',
  ubicacion_falla: 'cocina',
  descripcion_falla: 'Sin luz',
  creado_en: new Date('2025-01-01')
}

const mockTicket = {
  id: 'ticket-1',
  reclamo_id: 'reclamo-1',
  tecnico_id: 'tecnico-1',
  coordinador_id: null,
  estado: 'pendiente' as const,
  notas: null,
  created_at: new Date('2025-01-01'),
  updated_at: new Date('2025-01-01'),
  reclamo: mockReclamo
}

// ── Reclamos ─────────────────────────────────────────────────────────────────

describe('ticketRepository — reclamos', () => {
  test('findAllReclamos retorna lista ordenada por creado_en desc', async () => {
    prismaMock.reclamo.findMany.mockResolvedValue([mockReclamo])

    const result = await ticketRepository.findAllReclamos()

    expect(prismaMock.reclamo.findMany).toHaveBeenCalledWith({
      orderBy: { creado_en: 'desc' }
    })
    expect(result).toEqual([mockReclamo])
  })

  test('findReclamoById retorna reclamo por id', async () => {
    prismaMock.reclamo.findUnique.mockResolvedValue(mockReclamo)

    const result = await ticketRepository.findReclamoById('reclamo-1')

    expect(prismaMock.reclamo.findUnique).toHaveBeenCalledWith({
      where: { id: 'reclamo-1' }
    })
    expect(result).toEqual(mockReclamo)
  })

  test('findReclamoById retorna null si no existe', async () => {
    prismaMock.reclamo.findUnique.mockResolvedValue(null)

    const result = await ticketRepository.findReclamoById('no-existe')

    expect(result).toBeNull()
  })

  test('createReclamo crea y retorna el reclamo', async () => {
    const dto: CreateReclamoDto = {
      nombre_cliente: 'Juan Pérez',
      email_cliente: 'juan@test.com',
      num_telefono: '+56912345678',
      tipo_propiedad: 'departamento',
      nro_dpto: '101',
      tipo_falla: 'eléctrica',
      ubicacion_falla: 'cocina',
      descripcion_falla: 'Sin luz'
    }
    prismaMock.reclamo.create.mockResolvedValue(mockReclamo)

    const result = await ticketRepository.createReclamo(dto)

    expect(prismaMock.reclamo.create).toHaveBeenCalledWith({ data: dto })
    expect(result).toEqual(mockReclamo)
  })
})

// ── Tickets ──────────────────────────────────────────────────────────────────

describe('ticketRepository — tickets', () => {
  test('findAllTickets retorna lista con reclamo incluido', async () => {
    prismaMock.tickets.findMany.mockResolvedValue([mockTicket])

    const result = await ticketRepository.findAllTickets()

    expect(prismaMock.tickets.findMany).toHaveBeenCalledWith({
      orderBy: { created_at: 'desc' },
      include: { reclamo: true }
    })
    expect(result).toEqual([mockTicket])
  })

  test('findTicketById retorna ticket con reclamo incluido', async () => {
    prismaMock.tickets.findUnique.mockResolvedValue(mockTicket)

    const result = await ticketRepository.findTicketById('ticket-1')

    expect(prismaMock.tickets.findUnique).toHaveBeenCalledWith({
      where: { id: 'ticket-1' },
      include: { reclamo: true }
    })
    expect(result).toEqual(mockTicket)
  })

  test('findTicketById retorna null si no existe', async () => {
    prismaMock.tickets.findUnique.mockResolvedValue(null)

    const result = await ticketRepository.findTicketById('no-existe')

    expect(result).toBeNull()
  })

  test('findTicketsByTecnico filtra por tecnico_id', async () => {
    prismaMock.tickets.findMany.mockResolvedValue([mockTicket])

    const result = await ticketRepository.findTicketsByTecnico('tecnico-1')

    expect(prismaMock.tickets.findMany).toHaveBeenCalledWith({
      where: { tecnico_id: 'tecnico-1' },
      orderBy: { created_at: 'desc' },
      include: { reclamo: true }
    })
    expect(result).toEqual([mockTicket])
  })

  test('createTicket crea y retorna el ticket', async () => {
    const dto: CreateTicketDto = {
      reclamo_id: 'reclamo-1',
      tecnico_id: 'tecnico-1'
    }
    prismaMock.tickets.create.mockResolvedValue(mockTicket)

    const result = await ticketRepository.createTicket(dto)

    expect(prismaMock.tickets.create).toHaveBeenCalledWith({ data: dto })
    expect(result).toEqual(mockTicket)
  })

  test('updateTicket actualiza y retorna el ticket', async () => {
    const dto: UpdateTicketDto = { estado: 'en_proceso', notas: 'En revisión' }
    const updated = { ...mockTicket, estado: 'en_proceso' as const, notas: 'En revisión' }
    prismaMock.tickets.update.mockResolvedValue(updated)

    const result = await ticketRepository.updateTicket('ticket-1', dto)

    expect(prismaMock.tickets.update).toHaveBeenCalledWith({
      where: { id: 'ticket-1' },
      data: dto
    })
    expect(result).toEqual(updated)
  })
})