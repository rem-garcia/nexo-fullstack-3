import { usersRepository } from './repository'
import { CreateUserDto } from './model'

export const usersService = {
  list: () => usersRepository.findAll(),
  create: (dto: CreateUserDto) => usersRepository.create(dto),
}
