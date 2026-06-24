import { usersService } from './service'
import { usersRepository } from './repository'

// Mockeamos el repository: no queremos tocar Supabase real en un test unitario.
// Probamos que el service delega correctamente a la capa de datos.
jest.mock('./repository', () => ({
  usersRepository: {
    findAll: jest.fn(),
    create: jest.fn(),
  },
}))

describe('usersService', () => {
  it('list() devuelve los usuarios del repositorio', async () => {
    const fakeUsers = [
      { id: '1', full_name: 'Ada Lovelace', email: 'ada@test.cl', role: 'admin' },
      { id: '2', full_name: 'Alan Turing', email: 'alan@test.cl', role: 'tecnico' },
    ]
    ;(usersRepository.findAll as jest.Mock).mockResolvedValue(fakeUsers)

    const result = await usersService.list()

    expect(result).toEqual(fakeUsers)
    expect(usersRepository.findAll).toHaveBeenCalledTimes(1)
  })

  it('create() delega el DTO al repositorio y devuelve el usuario creado', async () => {
    const dto = {
      full_name: 'Grace Hopper',
      email: 'grace@test.cl',
      password: 'secret123',
      role: 'coordinador' as const,
    }
    const created = { id: '3', ...dto }
    ;(usersRepository.create as jest.Mock).mockResolvedValue(created)

    const result = await usersService.create(dto)

    expect(result).toEqual(created)
    expect(usersRepository.create).toHaveBeenCalledWith(dto)
  })
})