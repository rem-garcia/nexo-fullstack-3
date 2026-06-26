import { propiedadService } from '../src/service'
import { propiedadRepository } from '../src/repository'

jest.mock('../src/repository')

const mockPropiedades = [
  {
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
]

describe('propiedadService', () => {
  beforeEach(() => {
    jest.clearAllMocks()
  })

  test('getAll retorna lista de propiedades', async () => {
    ;(propiedadRepository.findAll as jest.Mock).mockResolvedValue(mockPropiedades)
    const result = await propiedadService.getAll()
    expect(result).toEqual(mockPropiedades)
    expect(propiedadRepository.findAll).toHaveBeenCalledTimes(1)
  })

  test('getById retorna una propiedad por id', async () => {
    ;(propiedadRepository.findById as jest.Mock).mockResolvedValue(mockPropiedades[0])
    const result = await propiedadService.getById('1')
    expect(result).toEqual(mockPropiedades[0])
    expect(propiedadRepository.findById).toHaveBeenCalledWith('1')
  })

  test('getById retorna null si no existe', async () => {
    ;(propiedadRepository.findById as jest.Mock).mockResolvedValue(null)
    const result = await propiedadService.getById('999')
    expect(result).toBeNull()
  })

  test('create crea una nueva propiedad', async () => {
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
    const propiedadCreada = { id: '2', ...nuevaPropiedad, creado_en: new Date() }
    ;(propiedadRepository.create as jest.Mock).mockResolvedValue(propiedadCreada)
    const result = await propiedadService.create(nuevaPropiedad)
    expect(result).toEqual(propiedadCreada)
    expect(propiedadRepository.create).toHaveBeenCalledWith(nuevaPropiedad)
  })
})
