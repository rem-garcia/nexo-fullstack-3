import type { ReactNode } from 'react'

export default function SwaggerLayout({ children }: { children: ReactNode }) {
  return (
    <html lang="es">
      <body>{children}</body>
    </html>
  )
}
