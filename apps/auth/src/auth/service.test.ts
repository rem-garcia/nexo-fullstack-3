import { authService } from './service'
import { authRepository } from './repository'
import { getSupabaseAnon, getSupabaseAdmin } from '../../lib/supabase'

// Mockeamos las dependencias externas: el cliente de Supabase y el repositorio.
// Así probamos SOLO la lógica del service, sin tocar la base de datos real.
jest.mock('../../lib/supabase')
jest.mock('./repository', () => ({
  authRepository: {
    findProfileById: jest.fn(),
  },
}))

const mockedGetAnon = getSupabaseAnon as jest.Mock
const mockedGetAdmin = getSupabaseAdmin as jest.Mock

describe('authService.login', () => {
  it('devuelve user y tokens cuando las credenciales son válidas', async () => {
    // Simulamos que Supabase autentica correctamente
    mockedGetAnon.mockReturnValue({
      auth: {
        signInWithPassword: jest.fn().mockResolvedValue({
          data: {
            user: { id: 'u1' },
            session: { access_token: 'tok-abc', refresh_token: 'ref-xyz' },
          },
          error: null,
        }),
      },
    })
    const fakeProfile = { id: 'u1', full_name: 'Ada', email: 'ada@test.cl', role: 'admin' }
    ;(authRepository.findProfileById as jest.Mock).mockResolvedValue(fakeProfile)

    const result = await authService.login({ email: 'ada@test.cl', password: '123456' })

    expect(result.error).toBeNull()
    expect(result.access_token).toBe('tok-abc')
    expect(result.refresh_token).toBe('ref-xyz')
    expect(result.user).toEqual(fakeProfile)
  })

  it('devuelve error y tokens nulos cuando las credenciales son inválidas', async () => {
    mockedGetAnon.mockReturnValue({
      auth: {
        signInWithPassword: jest.fn().mockResolvedValue({
          data: { user: null, session: null },
          error: { message: 'Invalid login credentials' },
        }),
      },
    })

    const result = await authService.login({ email: 'mal@test.cl', password: 'wrong' })

    expect(result.user).toBeNull()
    expect(result.access_token).toBeNull()
    expect(result.error).toBe('Invalid login credentials')
  })
})

describe('authService.getMe', () => {
  it('devuelve el perfil cuando el token es válido', async () => {
    mockedGetAnon.mockReturnValue({
      auth: {
        getUser: jest.fn().mockResolvedValue({
          data: { user: { id: 'u1' } },
          error: null,
        }),
      },
    })
    const fakeProfile = { id: 'u1', full_name: 'Ada', role: 'admin' }
    ;(authRepository.findProfileById as jest.Mock).mockResolvedValue(fakeProfile)

    const result = await authService.getMe('tok-valido')

    expect(result).toEqual(fakeProfile)
    expect(authRepository.findProfileById).toHaveBeenCalledWith('u1')
  })

  it('devuelve null cuando el token es inválido', async () => {
    mockedGetAnon.mockReturnValue({
      auth: {
        getUser: jest.fn().mockResolvedValue({
          data: { user: null },
          error: { message: 'invalid token' },
        }),
      },
    })

    const result = await authService.getMe('tok-malo')

    expect(result).toBeNull()
  })
})

describe('authService.confirmPasswordReset', () => {
  it('rechaza un enlace inválido o expirado', async () => {
    mockedGetAnon.mockReturnValue({
      auth: {
        getUser: jest.fn().mockResolvedValue({
          data: { user: null },
          error: { message: 'expired' },
        }),
      },
    })

    const result = await authService.confirmPasswordReset('tok-malo', 'nueva-clave')

    expect(result.error).toBe('Enlace inválido o expirado')
  })

  it('actualiza la contraseña cuando el token es válido', async () => {
    mockedGetAnon.mockReturnValue({
      auth: {
        getUser: jest.fn().mockResolvedValue({
          data: { user: { id: 'u1' } },
          error: null,
        }),
      },
    })
    mockedGetAdmin.mockReturnValue({
      auth: {
        admin: {
          updateUserById: jest.fn().mockResolvedValue({ error: null }),
        },
      },
    })

    const result = await authService.confirmPasswordReset('tok-ok', 'nueva-clave')

    expect(result.error).toBeNull()
  })
})
describe('authService.register', () => {
  it('registra un usuario nuevo correctamente', async () => {
    mockedGetAnon.mockReturnValue({
      auth: {
        signUp: jest.fn().mockResolvedValue({
          data: { user: { id: 'u9', email: 'nuevo@test.cl' } },
          error: null,
        }),
      },
    })

    const result = await authService.register({
      email: 'nuevo@test.cl',
      password: 'secret123',
      full_name: 'Nuevo Usuario',
      role: 'cliente',
    })

    expect(result.error).toBeNull()
    expect(result.user).toEqual({ id: 'u9', email: 'nuevo@test.cl' })
  })

  it('devuelve error cuando el registro falla', async () => {
    mockedGetAnon.mockReturnValue({
      auth: {
        signUp: jest.fn().mockResolvedValue({
          data: { user: null },
          error: { message: 'User already registered' },
        }),
      },
    })

    const result = await authService.register({
      email: 'repetido@test.cl',
      password: 'secret123',
      full_name: 'Repetido',
      role: 'cliente',
    })

    expect(result.user).toBeNull()
    expect(result.error).toBe('User already registered')
  })
})

describe('authService.requestPasswordReset', () => {
  it('envía el correo de recuperación sin error', async () => {
    mockedGetAnon.mockReturnValue({
      auth: {
        resetPasswordForEmail: jest.fn().mockResolvedValue({ error: null }),
      },
    })

    const result = await authService.requestPasswordReset(
      'ada@test.cl',
      'http://localhost:3005/reset-password'
    )

    expect(result.error).toBeNull()
  })

  it('devuelve error cuando Supabase falla al enviar el correo', async () => {
    mockedGetAnon.mockReturnValue({
      auth: {
        resetPasswordForEmail: jest.fn().mockResolvedValue({
          error: { message: 'rate limit exceeded' },
        }),
      },
    })

    const result = await authService.requestPasswordReset(
      'ada@test.cl',
      'http://localhost:3005/reset-password'
    )

    expect(result.error).toBe('rate limit exceeded')
  })
})