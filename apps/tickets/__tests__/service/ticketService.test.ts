import { CreateReclamoDto, CreateTicketDto, UpdateTicketDto } from '../../src/tickets/model'

// Mock del repository completo
const mockRepository = {
  findAllReclamos: jest.fn(),
  findReclamoById: jest.fn(),
  createReclamo: jest.fn(),
  findAllTickets: jest.fn(),
  findTicketById: jest.fn(),
  findTicketsByTecnico: jest.fn(),
  createTicket: jest.fn(),
  updateTicket: jest.fn()
}

jest.mock('../../src/tickets/repository', () => ({
  ticketRepository: mockRepository
}))

import { ticketService } from '../../src/tickets/service'

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

describe('ticketService — reclamos', () => {
  test('getAllReclamos delega a repository.findAllReclamos', async () => {
    mockRepository.findAllReclamos.mockResolvedValue([mockReclamo])

    const result = await ticketService.getAllReclamos()

    expect(mockRepository.findAllReclamos).toHaveBeenCalledTimes(1)
    expect(result).toEqual([mockReclamo])
  })

  test('getReclamoById delega a repository.findReclamoById con el id', async () => {
    mockRepository.findReclamoById.mockResolvedValue(mockReclamo)

    const result = await ticketService.getReclamoById('reclamo-1')

    expect(mockRepository.findReclamoById).toHaveBeenCalledWith('reclamo-1')
    expect(result).toEqual(mockReclamo)
  })

  test('getReclamoById retorna null si no existe', async () => {
    mockRepository.findReclamoById.mockResolvedValue(null)

    const result = await ticketService.getReclamoById('no-existe')

    expect(result).toBeNull()
  })

  test('createReclamo delega a repository.createReclamo con el dto', async () => {
    const dto: CreateReclamoDto = {
      nombre_cliente: 'Juan Pérez',
      email_cliente: 'juan@test.com',
      num_telefono: '+56912345678',
      tipo_propiedad: 'departamento',
      nro_dpto: '101',
      tipo_falla: 'eléctrica',
      ubicacion_falla: 'cocina'
    }
    mockRepository.createReclamo.mockResolvedValue(mockReclamo)

    const result = await ticketService.createReclamo(dto)

    expect(mockRepository.createReclamo).toHaveBeenCalledWith(dto)
    expect(result).toEqual(mockReclamo)
  })
})

// ── Tickets ──────────────────────────────────────────────────────────────────

describe('ticketService — tickets', () => {
  test('getAllTickets delega a repository.findAllTickets', async () => {
    mockRepository.findAllTickets.mockResolvedValue([mockTicket])

    const result = await ticketService.getAllTickets()

    expect(mockRepository.findAllTickets).toHaveBeenCalledTimes(1)
    expect(result).toEqual([mockTicket])
  })

  test('getTicketById delega a repository.findTicketById con el id', async () => {
    mockRepository.findTicketById.mockResolvedValue(mockTicket)

    const result = await ticketService.getTicketById('ticket-1')

    expect(mockRepository.findTicketById).toHaveBeenCalledWith('ticket-1')
    expect(result).toEqual(mockTicket)
  })

  test('getTicketById retorna null si no existe', async () => {
    mockRepository.findTicketById.mockResolvedValue(null)

    const result = await ticketService.getTicketById('no-existe')

    expect(result).toBeNull()
  })

  test('getTicketsByTecnico delega a repository.findTicketsByTecnico con el id', async () => {
    mockRepository.findTicketsByTecnico.mockResolvedValue([mockTicket])

    const result = await ticketService.getTicketsByTecnico('tecnico-1')

    expect(mockRepository.findTicketsByTecnico).toHaveBeenCalledWith('tecnico-1')
    expect(result).toEqual([mockTicket])
  })

  test('createTicket delega a repository.createTicket con el dto', async () => {
    const dto: CreateTicketDto = {
      reclamo_id: 'reclamo-1',
      tecnico_id: 'tecnico-1'
    }
    mockRepository.createTicket.mockResolvedValue(mockTicket)

    const result = await ticketService.createTicket(dto)

    expect(mockRepository.createTicket).toHaveBeenCalledWith(dto)
    expect(result).toEqual(mockTicket)
  })

  test('updateTicket delega a repository.updateTicket con id y dto', async () => {
    const dto: UpdateTicketDto = { estado: 'cerrado' }
    const updated = { ...mockTicket, estado: 'cerrado' as const }
    mockRepository.updateTicket.mockResolvedValue(updated)

    const result = await ticketService.updateTicket('ticket-1', dto)

    expect(mockRepository.updateTicket).toHaveBeenCalledWith('ticket-1', dto)
    expect(result).toEqual(updated)
  })
})