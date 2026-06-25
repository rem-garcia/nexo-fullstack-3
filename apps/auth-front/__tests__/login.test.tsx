import LoginPage from '../app/login/page'
import { fireEvent, render, screen, waitFor } from '@testing-library/react'

global.fetch = jest.fn()

// Variables de entorno que usa el login
process.env.NEXT_PUBLIC_AUTH_API_URL = 'http://localhost:3003/api/auth'
process.env.NEXT_PUBLIC_DASHBOARD_URL = 'http://localhost:3004'

describe('LoginPage', () => {
  beforeEach(() => {
    ;(fetch as jest.Mock).mockReset()
  })

  it('renderiza el formulario de inicio de sesión', () => {
    render(<LoginPage />)
    expect(screen.getByText('Iniciar sesión')).toBeInTheDocument()
    expect(screen.getByText('Ingresa tus credenciales para continuar')).toBeInTheDocument()
  })

  it('cambia a la vista de recuperar contraseña al hacer clic en "¿Olvidaste tu contraseña?"', () => {
    render(<LoginPage />)
    fireEvent.click(screen.getByText('¿Olvidaste tu contraseña?'))
    expect(screen.getByText('Restablecer contraseña')).toBeInTheDocument()
  })

  it('muestra error cuando las credenciales son inválidas', async () => {
    ;(fetch as jest.Mock).mockResolvedValue({
      ok: false,
      status: 401,
      json: async () => ({ error: 'Credenciales inválidas' }),
    })

    const { container } = render(<LoginPage />)

    // Hay dos formularios (login y reset ocultos); tomamos los del primero
    const emailInput = container.querySelector('input[name="email"]') as HTMLInputElement
    const passwordInput = container.querySelector('input[name="password"]') as HTMLInputElement

    fireEvent.change(emailInput, { target: { value: 'mal@test.cl' } })
    fireEvent.change(passwordInput, { target: { value: 'wrongpass' } })
    fireEvent.click(screen.getByRole('button', { name: 'Ingresar' }))

    await waitFor(() => expect(fetch).toHaveBeenCalledTimes(1))
    await waitFor(() =>
      expect(screen.getByText('Credenciales inválidas')).toBeInTheDocument()
    )
  })

  it('llama al backend con el endpoint y body correctos al iniciar sesión', async () => {
    ;(fetch as jest.Mock).mockResolvedValue({
      ok: true,
      status: 200,
      json: async () => ({
        user: { id: 'u1', role: 'admin' },
        access_token: 'tok-abc',
        refresh_token: 'ref-xyz',
      }),
    })

    const { container } = render(<LoginPage />)

    const emailInput = container.querySelector('input[name="email"]') as HTMLInputElement
    const passwordInput = container.querySelector('input[name="password"]') as HTMLInputElement

    fireEvent.change(emailInput, { target: { value: 'ada@test.cl' } })
    fireEvent.change(passwordInput, { target: { value: 'secret123' } })
    fireEvent.click(screen.getByRole('button', { name: 'Ingresar' }))

    await waitFor(() => expect(fetch).toHaveBeenCalledTimes(1))

    const [, options] = (fetch as jest.Mock).mock.calls[0]
    expect(options).toEqual(
      expect.objectContaining({
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: expect.any(String),
      })
    )

    const payload = JSON.parse(options.body)
    expect(payload).toEqual(
      expect.objectContaining({
        action: 'login',
        email: 'ada@test.cl',
        password: 'secret123',
      })
    )
  })
})