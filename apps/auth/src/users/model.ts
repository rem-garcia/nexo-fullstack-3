import { UserRole } from '../auth/model'

export interface CreateUserDto {
  full_name: string
  email: string
  password: string
  role: UserRole
  phone?: string | null
}
