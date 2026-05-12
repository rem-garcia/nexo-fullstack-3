import { z } from 'zod'

export const loginSchema = z.object({
  email: z
    .string()
    .email('El correo electrónico no es válido'),
  password: z
    .string()
    .min(8, 'La contraseña debe tener al menos 6 caracteres')
})

export const registerSchema = z.object({
  full_name: z
    .string()
    .min(3, 'El nombre debe tener al menos 3 caracteres'),
  email: z
    .string()
    .email('El correo electrónico no es válido'),
  password: z
    .string()
    .min(8, 'La contraseña debe tener al menos 8 caracteres')
    .regex(/[A-Z]/, 'Debe contener al menos una mayúscula')
    .regex(/[0-9]/, 'Debe contener al menos un número'),
  role: z.enum([
    'super_admin',
    'admin', 
    'coordinador', 
    'tecnico', 
    'cliente'
  ])
})

export type LoginInput = z.infer<typeof loginSchema>
export type RegisterInput = z.infer<typeof registerSchema>