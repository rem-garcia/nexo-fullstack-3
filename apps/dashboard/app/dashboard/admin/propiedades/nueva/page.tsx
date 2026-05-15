'use client'

import { useState } from 'react'
import { useRouter } from 'next/navigation'
import { createClient } from '@supabase/supabase-js'

const supabase = createClient(
  process.env.NEXT_PUBLIC_SUPABASE_URL!,
  process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!
)

export default function NuevaPropiedadPage() {
  const router = useRouter()
  const [loading, setLoading] = useState(false)
  const [form, setForm] = useState({
    codigo: '',
    tipo: 'Departamento',
    direccion: '',
    sector: '',
    piso: '',
    unidad: '',
    torre: '',
    m2: '',
    garantia: 'Activa',
  })

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
    setForm({ ...form, [e.target.name]: e.target.value })
  }

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setLoading(true)

    const { error } = await supabase.from('propiedades').insert([{
      ...form,
      piso: parseInt(form.piso),
      m2: parseInt(form.m2),
    }])

    if (error) {
      alert('Error al guardar: ' + error.message)
    } else {
      router.push('/dashboard/admin/propiedades')
    }

    setLoading(false)
  }

  return (
    <div>
      <div className="mb-8">
        <h1 className="text-2xl font-bold text-gray-900">Nueva Propiedad</h1>
        <p className="text-gray-500 mt-1">Ingresa los datos de la propiedad</p>
      </div>

      <div className="bg-white rounded-xl p-6 shadow-sm border border-gray-100 max-w-2xl">
        <form onSubmit={handleSubmit} className="space-y-4">
          <div className="grid grid-cols-2 gap-4">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">Código</label>
              <input name="codigo" value={form.codigo} onChange={handleChange} required
                className="w-full border border-gray-200 rounded-lg px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-green-500"
                placeholder="TORRE-A-501" />
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">Tipo</label>
              <select name="tipo" value={form.tipo} onChange={handleChange}
                className="w-full border border-gray-200 rounded-lg px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-green-500">
                <option>Departamento</option>
                <option>Oficina</option>
              </select>
            </div>
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">Dirección</label>
            <input name="direccion" value={form.direccion} onChange={handleChange} required
              className="w-full border border-gray-200 rounded-lg px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-green-500"
              placeholder="Av. Providencia 1234" />
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">Sector</label>
            <input name="sector" value={form.sector} onChange={handleChange} required
              className="w-full border border-gray-200 rounded-lg px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-green-500"
              placeholder="Providencia, Santiago" />
          </div>

          <div className="grid grid-cols-3 gap-4">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">Piso</label>
              <input name="piso" value={form.piso} onChange={handleChange} required type="number"
                className="w-full border border-gray-200 rounded-lg px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-green-500"
                placeholder="5" />
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">Unidad</label>
              <input name="unidad" value={form.unidad} onChange={handleChange} required
                className="w-full border border-gray-200 rounded-lg px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-green-500"
                placeholder="501" />
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">m²</label>
              <input name="m2" value={form.m2} onChange={handleChange} required type="number"
                className="w-full border border-gray-200 rounded-lg px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-green-500"
                placeholder="65" />
            </div>
          </div>

          <div className="grid grid-cols-2 gap-4">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">Torre</label>
              <input name="torre" value={form.torre} onChange={handleChange} required
                className="w-full border border-gray-200 rounded-lg px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-green-500"
                placeholder="Torre A" />
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">Garantía</label>
              <select name="garantia" value={form.garantia} onChange={handleChange}
                className="w-full border border-gray-200 rounded-lg px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-green-500">
                <option>Activa</option>
                <option>Por vencer</option>
                <option>Vencida</option>
              </select>
            </div>
          </div>

          <div className="flex gap-3 pt-4">
            <button type="submit" disabled={loading}
              className="bg-green-600 text-white px-6 py-2 rounded-lg text-sm font-medium hover:bg-green-500 transition-colors disabled:opacity-50">
              {loading ? 'Guardando...' : 'Guardar propiedad'}
            </button>
            <button type="button" onClick={() => router.back()}
              className="border border-gray-200 text-gray-600 px-6 py-2 rounded-lg text-sm font-medium hover:bg-gray-50 transition-colors">
              Cancelar
            </button>
          </div>
        </form>
      </div>
    </div>
  )
}