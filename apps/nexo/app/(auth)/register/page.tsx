'use client'

import { useForm } from 'react-hook-form'
import { zodResolver } from '@hookform/resolvers/zod'
import { z } from 'zod'
import { useState } from 'react'
import Image from 'next/image'
import Link from 'next/link'
import { AuthImage } from '@/components/AuthImage'

const registerSchema = z.object({
  full_name: z.string().min(3, 'El nombre debe tener al menos 3 caracteres'),
  email: z.string().email('El correo electrónico no es válido'),
  password: z.string()
    .min(8, 'La contraseña debe tener al menos 8 caracteres')
    .regex(/[A-Z]/, 'Debe contener al menos una mayúscula')
    .regex(/[0-9]/, 'Debe contener al menos un número'),
  role: z.enum(['cliente', 'coordinador', 'tecnico', 'admin'])
})

type RegisterInput = z.infer<typeof registerSchema>

export default function RegisterPage() {
  const [isLoading, setIsLoading] = useState(false)
  const [error, setError] = useState<string | null>(null)
  const [success, setSuccess] = useState(false)

  const {
    register,
    handleSubmit,
    formState: { errors }
  } = useForm<RegisterInput>({
    resolver: zodResolver(registerSchema)
  })

  async function onSubmit(data: RegisterInput) {
    setIsLoading(true)
    setError(null)

    try {
      const response = await fetch('/api/auth/register', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(data)
      })

      const result = await response.json()

      if (!response.ok) {
        setError(result.error)
        return
      }

      setSuccess(true)

    } catch {
      setError('Error de conexión. Intenta nuevamente.')
    } finally {
      setIsLoading(false)
    }
  }

  return (
    <main className="min-h-screen flex overflow-hidden">
      <div className="relative w-full flex">

        {/* ── Imagen ── */}
        <AuthImage position="left" />

        {/* ── Formulario register ── */}
        <div className="absolute inset-y-0 right-0 w-full md:w-3/5
                        flex items-center justify-center
                        bg-[#0f172a] p-8">
          <div className="w-full max-w-md">

            {/* Logo */}
            <div className="mb-8">
              <span className="text-3xl font-bold text-white">Nexo</span>
              <p className="text-slate-400 mt-1 text-sm">
                Sistema de Gestión de Visitas Postventa
              </p>
            </div>

            {success ? (
              // ── Mensaje de éxito ──
              <div className="text-center">
                <div className="w-16 h-16 bg-green-500/20 rounded-full
                                flex items-center justify-center mx-auto mb-6">
                  <svg className="w-8 h-8 text-green-400"
                    fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round"
                      strokeWidth={2} d="M5 13l4 4L19 7" />
                  </svg>
                </div>
                <h2 className="text-2xl font-bold text-white mb-2">
                  ¡Cuenta creada!
                </h2>
                <p className="text-slate-400 text-sm mb-6">
                  Revisa tu correo electrónico para verificar
                  tu cuenta antes de ingresar.
                </p>
                <Link
                  href="/login"
                  className="w-full block py-3 px-4 rounded-lg
                             font-medium bg-blue-600 hover:bg-blue-500
                             text-white transition-colors text-center"
                >
                  Ir al login
                </Link>
              </div>
            ) : (
              // ── Formulario ──
              <>
                <h1 className="text-2xl font-bold text-white mb-2">
                  Crear cuenta
                </h1>
                <p className="text-slate-400 text-sm mb-6">
                  Completa los datos para registrarte en Nexo
                </p>

                {error && (
                  <div className="bg-red-500/10 border border-red-500/30
                                  rounded-lg p-3 mb-6">
                    <p className="text-red-400 text-sm">{error}</p>
                  </div>
                )}

                <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">

                  {/* Nombre completo */}
                  <div>
                    <label className="block text-sm font-medium
                                      text-slate-300 mb-2">
                      Nombre completo
                    </label>
                    <input
                      {...register('full_name')}
                      type="text"
                      placeholder="Juan Pérez"
                      className="w-full px-4 py-3 rounded-lg
                                 bg-slate-800 border border-slate-700
                                 text-white placeholder-slate-500
                                 focus:outline-none focus:border-blue-500
                                 focus:ring-1 focus:ring-blue-500
                                 transition-colors"
                    />
                    {errors.full_name && (
                      <p className="text-red-400 text-xs mt-1">
                        {errors.full_name.message}
                      </p>
                    )}
                  </div>

                  {/* Email */}
                  <div>
                    <label className="block text-sm font-medium
                                      text-slate-300 mb-2">
                      Correo electrónico
                    </label>
                    <input
                      {...register('email')}
                      type="email"
                      placeholder="correo@ejemplo.com"
                      className="w-full px-4 py-3 rounded-lg
                                 bg-slate-800 border border-slate-700
                                 text-white placeholder-slate-500
                                 focus:outline-none focus:border-blue-500
                                 focus:ring-1 focus:ring-blue-500
                                 transition-colors"
                    />
                    {errors.email && (
                      <p className="text-red-400 text-xs mt-1">
                        {errors.email.message}
                      </p>
                    )}
                  </div>

                  {/* Contraseña */}
                  <div>
                    <label className="block text-sm font-medium
                                      text-slate-300 mb-2">
                      Contraseña
                    </label>
                    <input
                      {...register('password')}
                      type="password"
                      placeholder="••••••••"
                      className="w-full px-4 py-3 rounded-lg
                                 bg-slate-800 border border-slate-700
                                 text-white placeholder-slate-500
                                 focus:outline-none focus:border-blue-500
                                 focus:ring-1 focus:ring-blue-500
                                 transition-colors"
                    />
                    {errors.password && (
                      <p className="text-red-400 text-xs mt-1">
                        {errors.password.message}
                      </p>
                    )}
                    <p className="text-slate-500 text-xs mt-1">
                      Mínimo 8 caracteres, una mayúscula y un número
                    </p>
                  </div>

                  {/* Rol */}
                  <div>
                    <label className="block text-sm font-medium
                                      text-slate-300 mb-2">
                      Rol
                    </label>
                    <select
                      {...register('role')}
                      className="w-full px-4 py-3 rounded-lg
                                 bg-slate-800 border border-slate-700
                                 text-white
                                 focus:outline-none focus:border-blue-500
                                 focus:ring-1 focus:ring-blue-500
                                 transition-colors"
                    >
                      <option value="">Selecciona un rol</option>
                      <option value="cliente">Cliente</option>
                      <option value="coordinador">Coordinador</option>
                      <option value="tecnico">Técnico</option>
                      <option value="admin">Administrador</option>
                    </select>
                    {errors.role && (
                      <p className="text-red-400 text-xs mt-1">
                        {errors.role.message}
                      </p>
                    )}
                  </div>

                  {/* Botón */}
                  <button
                    type="submit"
                    disabled={isLoading}
                    className="w-full py-3 px-4 rounded-lg font-medium
                               bg-blue-600 hover:bg-blue-500
                               disabled:bg-blue-600/50 disabled:cursor-not-allowed
                               text-white transition-colors mt-2"
                  >
                    {isLoading ? 'Creando cuenta...' : 'Crear cuenta'}
                  </button>

                  {/* Link al login */}
                  <p className="text-center text-slate-400 text-sm">
                    ¿Ya tienes cuenta?{' '}
                    <Link
                      href="/login"
                      className="text-blue-400 hover:text-blue-300
                                 transition-colors"
                    >
                      Inicia sesión
                    </Link>
                  </p>

                </form>
              </>
            )}

            <p className="text-slate-500 text-xs text-center mt-6">
              © 2026 Nexo. Todos los derechos reservados.
            </p>
          </div>
        </div>

      </div>
    </main>
  )
}