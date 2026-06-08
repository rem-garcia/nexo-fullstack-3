import { propiedadRepository } from '../src/repository'
import { prisma } from '../lib/prisma'

jest.mock('../lib/prisma', () => ({
  prisma: {
    propiedades: {
      findMany: jest.fn(),
      findUnique: jest.fn(),
      create: jest.fn(),
    }
  }
}))

const mockPropiedad = {
  id: '1',
  codigo: 'TORRE-A-501',
  tipo: 'Departamento',
  direccion: 'Av. Providencia 1234',
  sector: 'Providencia',
  piso: 5,
  unidad: '501',
  torre: 'Torre A',
  m2: 65,
  garantia: 'Activa',
  creado_en: new Date()
}

describe('propiedadRepository', () => {
  beforeEach(() => {
    jest.clearAllMocks()
  })

  test('findAll retorna lista de propiedades', async () => {
    ;(prisma.propiedades.findMany as jest.Mock).mockResolvedValue([mockPropiedad])
    const result = await propiedadRepository.findAll()
    expect(result).toEqual([mockPropiedad])
    expect(prisma.propiedades.findMany).toHaveBeenCalledTimes(1)
  })

  test('findById retorna una propiedad', async () => {
    ;(prisma.propiedades.findUnique as jest.Mock).mockResolvedValue(mockPropiedad)
    const result = await propiedadRepository.findById('1')
    expect(result).toEqual(mockPropiedad)
    expect(prisma.propiedades.findUnique).toHaveBeenCalledWith({ where: { id: '1' } })
  })

  test('findById retorna null si no existe', async () => {
    ;(prisma.propiedades.findUnique as jest.Mock).mockResolvedValue(null)
    const result = await propiedadRepository.findById('999')
    expect(result).toBeNull()
  })

  test('create crea una propiedad', async () => {
    const nuevaPropiedad = {
      codigo: 'TORRE-B-302',
      tipo: 'Oficina',
      direccion: 'Av. Apoquindo 456',
      sector: 'Las Condes',
      piso: 3,
      unidad: '302',
      torre: 'Torre B',
      m2: 48,
      garantia: 'Activa'
    }
    ;(prisma.propiedades.create as jest.Mock).mockResolvedValue({ id: '2', ...nuevaPropiedad, creado_en: new Date() })
    const result = await propiedadRepository.create(nuevaPropiedad)
    expect(prisma.propiedades.create).toHaveBeenCalledTimes(1)
    expect(result).toHaveProperty('id')
  })
})
