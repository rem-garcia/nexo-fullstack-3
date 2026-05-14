export type UserRole =
  | 'super_admin'
  | 'admin'
  | 'coordinador'
  | 'tecnico'
  | 'cliente'

export interface Profile {
  id: string
  full_name: string
  email: string
  phone: string | null
  role: UserRole
  is_active: boolean
  created_at: Date
  updated_at: Date
}

export interface LoginDto {
  email: string
  password: string
}

export interface RegisterDto {
  full_name: string
  email: string
  password: string
  role: UserRole
}

export interface AuthResponse {
  user: Profile | null
  error: string | null
}