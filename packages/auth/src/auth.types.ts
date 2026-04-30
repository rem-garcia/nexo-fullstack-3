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
  created_at: string
  updated_at: string
}

export interface AuthResponse {
  user: Profile | null
  error: string | null
}

export interface LoginCredentials {
  email: string
  password: string
}

export interface RegisterCredentials {
  full_name: string
  email: string
  password: string
  role: UserRole
}