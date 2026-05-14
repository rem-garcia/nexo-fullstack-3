'use client'

interface NavItem {
  id: number
  name: string
  iconClass: string
  path: string
}

interface DashboardLayoutProps {
  children: React.ReactNode
  navItems: NavItem[]
  fullName: string | null
}

export function DashboardLayout({ children, navItems, fullName }: DashboardLayoutProps) {
  const fechaFooter = new Date()

  return (
    <div className="flex min-h-screen">

      {/* Sidebar desktop */}
      <aside
        className="hidden lg:flex flex-col justify-between w-64 min-h-screen text-white"
        style={{ backgroundColor: '#0f172a' }}
      >
        <div>
          <h2
            className="py-6 text-center text-xl font-bold border-b"
            style={{ borderColor: '#1e3a5f' }}
          >
            Nexo
          </h2>
          <nav className="mt-4">
            <ul>
              {navItems.map((item) => (
                <li key={item.id}>
                  <a
                    href={item.path}
                    className="flex items-center gap-3 px-4 py-3 mx-3 my-1 rounded-lg transition-colors hover:bg-[#0f4070] text-sm text-slate-300"
                  >
                    <i className={`${item.iconClass} w-5 text-center text-blue-400`}></i>
                    <span>{item.name}</span>
                  </a>
                </li>
              ))}
            </ul>
          </nav>
        </div>

        <div className="border-t py-4 px-4" style={{ borderColor: '#1e3a5f' }}>
          <p className="text-slate-400 text-xs text-center mb-3">{fullName}</p>
          <a
            href="/api/auth/logout"
            className="flex items-center justify-center gap-2 w-full py-2 rounded-lg text-sm text-slate-300 hover:bg-[#0f4070] transition-colors"
          >
            <i className="fa-solid fa-right-from-bracket"></i>
            Cerrar sesión
          </a>
          <p className="text-slate-600 text-xs text-center mt-3">
            Nexo © {fechaFooter.getFullYear()}
          </p>
        </div>
      </aside>

      {/* Contenido principal */}
      <div className="flex-1 flex flex-col">

        {/* Navbar móvil top */}
        <header
          className="lg:hidden flex items-center justify-between px-4 py-3 text-white"
          style={{ backgroundColor: '#0f172a' }}
        >
          <span className="font-bold text-lg">Nexo</span>
          <div className="flex items-center gap-4">
            <span className="text-slate-400 text-sm">{fullName}</span>
            <a
              href="/api/auth/logout"
              className="text-sm text-red-400 flex items-center gap-1"
            >
              <i className="fa-solid fa-right-from-bracket"></i>
              Salir
            </a>
          </div>
        </header>

        {/* Navbar móvil items */}
        <nav
          className="lg:hidden flex overflow-x-auto px-2 py-2 gap-1 text-white"
          style={{ backgroundColor: '#0f172a' }}
        >
          {navItems.map((item) => (
            <a
              key={item.id}
              href={item.path}
              className="flex flex-col items-center gap-1 px-3 py-2 rounded-lg text-slate-300 hover:bg-[#0f4070] transition-colors shrink-0"
            >
              <i className={`${item.iconClass} text-blue-400 text-sm`}></i>
              <span className="text-xs">{item.name}</span>
            </a>
          ))}
        </nav>

        <main className="flex-1 p-4 lg:p-8 bg-gray-50">
          {children}
        </main>

      </div>
    </div>
  )
}