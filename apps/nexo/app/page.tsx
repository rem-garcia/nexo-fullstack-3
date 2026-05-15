import Image from 'next/image'
import { ContactForm } from './components/ContactForm'

export default function LandingPage() {
  return (
    <main className="min-h-screen bg-[#0f172a] text-white">

      {/* Navbar */}
      <nav className="flex items-center justify-between px-8 py-4 border-b border-slate-800">
        <div className="flex items-center gap-3">
          <Image
            src="/nexo-logo.png"
            alt="Logo Nexo"
            width={130}
            height={130}
            className="rounded-lg"
          />
          
        </div>
        <a
          href="https://nexo-dashboard-six.vercel.app/login"
          className="px-5 py-2 bg-blue-600 hover:bg-blue-500 text-white text-sm font-medium rounded-lg transition-colors"
        >
          Iniciar sesión
        </a>
      </nav>

      {/* Hero */}
      <section className="flex flex-col items-center justify-center text-center px-8 py-24">
        <h1 className="text-5xl font-black mb-6 leading-tight">
          Gestión de Visitas<br />
          <span style={{
            background: 'linear-gradient(135deg, #60a5fa, #818cf8)',
            WebkitBackgroundClip: 'text',
            WebkitTextFillColor: 'transparent',
            backgroundClip: 'text'
          }}>
            Postventa
          </span>
        </h1>
        <p className="text-slate-400 text-lg max-w-xl mb-10">
          Plataforma digital para gestionar reclamos, visitas técnicas y garantías
          de propiedades en arriendo de manera eficiente y trazable.
        </p>
        <a
          href="https://nexo-dashboard-six.vercel.app/login"
          className="px-8 py-3 bg-blue-600 hover:bg-blue-500 text-white font-medium rounded-lg transition-colors text-lg"
        >
          Comenzar ahora
        </a>
      </section>

      {/* Características */}
      <section className="px-8 py-16 border-t border-slate-800">
        <h2 className="text-3xl font-bold text-center mb-12">¿Qué hace Nexo?</h2>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 max-w-5xl mx-auto">
          <div className="bg-slate-800/50 rounded-xl p-6 border border-slate-700">
            <div className="w-12 h-12 bg-blue-500/20 rounded-lg flex items-center justify-center mb-4">
              <span className="text-2xl">📋</span>
            </div>
            <h3 className="font-semibold text-white mb-2">Gestión de Reclamos</h3>
            <p className="text-slate-400 text-sm">
              Digitaliza el proceso de reclamos postventa eliminando el uso de correos y hojas de cálculo.
            </p>
          </div>

          <div className="bg-slate-800/50 rounded-xl p-6 border border-slate-700">
            <div className="w-12 h-12 bg-indigo-500/20 rounded-lg flex items-center justify-center mb-4">
              <span className="text-2xl">🔧</span>
            </div>
            <h3 className="font-semibold text-white mb-2">Seguimiento Técnico</h3>
            <p className="text-slate-400 text-sm">
              Asigna técnicos, programa visitas y monitorea el estado de cada reclamo en tiempo real.
            </p>
          </div>

          <div className="bg-slate-800/50 rounded-xl p-6 border border-slate-700">
            <div className="w-12 h-12 bg-purple-500/20 rounded-lg flex items-center justify-center mb-4">
              <span className="text-2xl">🛡️</span>
            </div>
            <h3 className="font-semibold text-white mb-2">Control de Garantías</h3>
            <p className="text-slate-400 text-sm">
              Monitorea el semáforo de garantías y evita vencimientos con alertas automáticas.
            </p>
          </div>
        </div>
      </section>

      {/* Quiénes somos */}
      <section className="px-8 py-16 border-t border-slate-800">
        <div className="max-w-3xl mx-auto text-center">
          <h2 className="text-3xl font-bold mb-6">¿Quiénes somos?</h2>
          <p className="text-slate-400 text-lg leading-relaxed">
            Nexo es una plataforma desarrollada para inmobiliarias que gestionan arriendos de
            oficinas y departamentos. Nuestro objetivo es digitalizar y simplificar el proceso
            postventa, dando trazabilidad completa a cada reclamo desde su registro hasta su
            resolución confirmada.
          </p>
        </div>
      </section>

      {/* Contacto */}
      <section className="px-8 py-16 border-t border-slate-800">
        <div className="max-w-xl mx-auto text-center">
          <h2 className="text-3xl font-bold mb-4">Contáctanos</h2>
          <p className="text-slate-400 mb-8">
            ¿Tienes preguntas? Escríbenos y te responderemos a la brevedad.
          </p>
          <ContactForm />
        </div>
      </section>

      {/* Footer */}
      <footer className="px-8 py-6 border-t border-slate-800 text-center">
        <p className="text-slate-500 text-sm">© 2026 Nexo. Todos los derechos reservados.</p>
      </footer>

    </main>
  )
}
            