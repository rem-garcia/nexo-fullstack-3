'use client'

import { useForm } from 'react-hook-form'
import { zodResolver } from '@hookform/resolvers/zod'
import { z } from 'zod'
import { useState } from 'react'
import Image from 'next/image'

const loginSchema = z.object({
  email: z.string().email('El correo electrónico no es válido'),
  password: z.string().min(6, 'La contraseña debe tener al menos 6 caracteres')
})

const resetSchema = z.object({
  email: z.string().email('El correo electrónico no es válido')
})

type LoginInput = z.infer<typeof loginSchema>
type ResetInput = z.infer<typeof resetSchema>

export default function LoginPage() {
  const [showReset, setShowReset] = useState(false)
  const [isLoading, setIsLoading] = useState(false)
  const [error, setError] = useState<string | null>(null)
  const [resetSuccess, setResetSuccess] = useState(false)

  const {
    register,
    handleSubmit,
    formState: { errors }
  } = useForm<LoginInput>({
    resolver: zodResolver(loginSchema)
  })

  const {
    register: registerReset,
    handleSubmit: handleSubmitReset,
    formState: { errors: errorsReset }
  } = useForm<ResetInput>({
    resolver: zodResolver(resetSchema)
  })

  async function onSubmitLogin(data: LoginInput) {
    setIsLoading(true)
    setError(null)
    try {
      const response = await fetch('/api/auth/login', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(data)
      })
      const result = await response.json()
      if (!response.ok) {
        setError(result.error)
        return
      }
      window.location.href = '/dashboard'
    } catch {
      setError('Error de conexión. Intenta nuevamente.')
    } finally {
      setIsLoading(false)
    }
  }

  async function onSubmitReset(data: ResetInput) {
    setIsLoading(true)
    setError(null)
    try {
      const response = await fetch('/api/auth/reset-password', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(data)
      })
      if (!response.ok) {
        setError('No se pudo enviar el correo. Intenta nuevamente.')
        return
      }
      setResetSuccess(true)
      setTimeout(() => {
        setShowReset(false)
        setResetSuccess(false)
      }, 3000)
    } catch {
      setError('Error de conexión. Intenta nuevamente.')
    } finally {
      setIsLoading(false)
    }
  }

  return (
    <main className="min-h-screen flex overflow-hidden">
      <div className="relative w-full flex">

        {/* ── Formulario login ── */}
        <div className={`
          absolute inset-y-0 w-full md:w-3/5
          flex items-center justify-center
          bg-[#0f172a] p-8 z-10
          transition-transform duration-700 ease-in-out
          ${showReset
            ? 'md:-translate-x-full -translate-y-full md:translate-y-0'
            : 'translate-x-0 translate-y-0'
          }
        `}>
          <div className="w-full max-w-md">
            <div className="mb-10">
              <span className="text-3xl font-bold text-white">Nexo</span>
              <p className="text-slate-400 mt-1 text-sm">
                Sistema de Gestión de Visitas Postventa
              </p>
            </div>
            <h1 className="text-2xl font-bold text-white mb-2">
              Iniciar sesión
            </h1>
            <p className="text-slate-400 text-sm mb-8">
              Ingresa tus credenciales para continuar
            </p>
            {error && !showReset && (
              <div className="bg-red-500/10 border border-red-500/30
                              rounded-lg p-3 mb-6">
                <p className="text-red-400 text-sm">{error}</p>
              </div>
            )}
            <form onSubmit={handleSubmit(onSubmitLogin)} className="space-y-5">
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
              <div>
                <div className="flex justify-between items-center mb-2">
                  <label className="block text-sm font-medium text-slate-300">
                    Contraseña
                  </label>
                  <button
                    type="button"
                    onClick={() => { setShowReset(true); setError(null) }}
                    className="text-xs text-blue-400
                               hover:text-blue-300 transition-colors"
                  >
                    ¿Olvidaste tu contraseña?
                  </button>
                </div>
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
              </div>
              <button
                type="submit"
                disabled={isLoading}
                className="w-full py-3 px-4 rounded-lg font-medium
                           bg-blue-600 hover:bg-blue-500
                           disabled:bg-blue-600/50 disabled:cursor-not-allowed
                           text-white transition-colors mt-2"
              >
                {isLoading ? 'Ingresando...' : 'Ingresar'}
              </button>
            </form>
            <p className="text-slate-500 text-xs text-center mt-8">
              © 2026 Nexo. Todos los derechos reservados.
            </p>
          </div>
        </div>

        {/* ── Imagen ── */}
        <div className={`
          absolute inset-y-0 right-0 w-full md:w-2/5
          transition-transform duration-700 ease-in-out
          hidden md:block overflow-hidden
          ${showReset
            ? 'md:-translate-x-[150%]'
            : 'md:translate-x-0'
          }
        `}>
          <div className="relative w-full h-full">
            <Image
              src="/login-bg.png"
              alt="Nexo background"
              fill
              className="object-cover object-center"
              priority
            />
            <div className="absolute inset-0 bg-black/40
                            flex flex-col items-center justify-center">
              <h2 className="text-white text-6xl font-bold
                             tracking-widest drop-shadow-lg">   
              </h2>
              <p className="text-white/70 text-sm mt-2
                            tracking-widest uppercase">
              </p>
            </div>
          </div>
        </div>

        {/* ── Formulario reset ── */}
        <div className={`
          absolute inset-y-0 right-0 w-full md:w-3/5
          flex items-center justify-center
          bg-[#0f172a] p-8 z-10
          transition-transform duration-700 ease-in-out
          ${showReset
            ? 'translate-x-0 translate-y-0'
            : 'md:translate-x-full translate-y-full md:translate-y-0'
          }
        `}>
          <div className="w-full max-w-md">
            <div className="mb-10">
              <span className="text-3xl font-bold text-white">Nexo</span>
              <p className="text-slate-400 mt-1 text-sm">
                Sistema de Gestión de Visitas Postventa
              </p>
            </div>
            {resetSuccess ? (
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
                  Correo enviado
                </h2>
                <p className="text-slate-400 text-sm">
                  Revisa tu bandeja de entrada. Volviendo al login...
                </p>
              </div>
            ) : (
              <>
                <h2 className="text-2xl font-bold text-white mb-2">
                  Restablecer contraseña
                </h2>
                <p className="text-slate-400 text-sm mb-8">
                  Ingresa tu correo y te enviaremos un enlace
                  para restablecer tu contraseña.
                </p>
                {error && showReset && (
                  <div className="bg-red-500/10 border border-red-500/30
                                  rounded-lg p-3 mb-6">
                    <p className="text-red-400 text-sm">{error}</p>
                  </div>
                )}
                <form
                  onSubmit={handleSubmitReset(onSubmitReset)}
                  className="space-y-5"
                >
                  <div>
                    <label className="block text-sm font-medium
                                      text-slate-300 mb-2">
                      Correo electrónico
                    </label>
                    <input
                      {...registerReset('email')}
                      type="email"
                      placeholder="correo@ejemplo.com"
                      className="w-full px-4 py-3 rounded-lg
                                 bg-slate-800 border border-slate-700
                                 text-white placeholder-slate-500
                                 focus:outline-none focus:border-blue-500
                                 focus:ring-1 focus:ring-blue-500
                                 transition-colors"
                    />
                    {errorsReset.email && (
                      <p className="text-red-400 text-xs mt-1">
                        {errorsReset.email.message}
                      </p>
                    )}
                  </div>
                  <button
                    type="submit"
                    disabled={isLoading}
                    className="w-full py-3 px-4 rounded-lg font-medium
                               bg-blue-600 hover:bg-blue-500
                               disabled:bg-blue-600/50 disabled:cursor-not-allowed
                               text-white transition-colors"
                  >
                    {isLoading ? 'Enviando...' : 'Enviar enlace'}
                  </button>
                  <button
                    type="button"
                    onClick={() => { setShowReset(false); setError(null) }}
                    className="w-full py-3 px-4 rounded-lg font-medium
                               border border-slate-700 text-slate-400
                               hover:border-slate-500 hover:text-slate-300
                               transition-colors"
                  >
                    Volver al login
                  </button>
                </form>
              </>
            )}
            <p className="text-slate-500 text-xs text-center mt-8">
              © 2026 Nexo. Todos los derechos reservados.
            </p>
          </div>
        </div>

      </div>
    </main>
  )
}