export default function PropiedadesPage() {
  const propiedades = [
    {
      id: 1,
      codigo: "TORRE-A-501",
      tipo: "Departamento",
      direccion: "Av. Providencia 1234",
      sector: "Providencia, Santiago",
      piso: 5,
      unidad: "501",
      torre: "Torre A",
      m2: 65,
      garantia: "Activa",
      garantiaColor: "bg-emerald-100 text-emerald-700",
    },
    {
      id: 2,
      codigo: "OFICINA-B-302",
      tipo: "Oficina",
      direccion: "Av. Apoquindo 456",
      sector: "Las Condes, Santiago",
      piso: 3,
      unidad: "302",
      torre: "Torre B",
      m2: 48,
      garantia: "Por vencer",
      garantiaColor: "bg-amber-100 text-amber-700",
    },
    {
      id: 3,
      codigo: "TORRE-C-101",
      tipo: "Departamento",
      direccion: "Calle Los Leones 789",
      sector: "Ñuñoa, Santiago",
      piso: 1,
      unidad: "101",
      torre: "Torre C",
      m2: 72,
      garantia: "Vencida",
      garantiaColor: "bg-red-100 text-red-700",
    },
    {
      id: 4,
      codigo: "OFICINA-D-210",
      tipo: "Oficina",
      direccion: "Av. Libertador 321",
      sector: "Vitacura, Santiago",
      piso: 2,
      unidad: "210",
      torre: "Torre D",
      m2: 55,
      garantia: "Activa",
      garantiaColor: "bg-emerald-100 text-emerald-700",
    },
  ]

  return (
    <div>
      <div className="mb-8 flex justify-between items-center">
        <div>
          <h1 className="text-2xl font-bold text-gray-900">Propiedades</h1>
          <p className="text-gray-500 mt-1">{propiedades.length} propiedades registradas</p>
        </div>
        <button className="bg-green-600 text-white px-4 py-2 rounded-lg text-sm font-medium hover:bg-green-500 transition-colors">
          + Nueva propiedad
        </button>
      </div>

      <div className="flex gap-3 mb-6">
        <button className="bg-gray-900 text-white px-4 py-1.5 rounded-full text-sm font-medium">Todas</button>
        <button className="bg-white text-gray-600 border border-gray-200 px-4 py-1.5 rounded-full text-sm hover:bg-gray-50">Departamentos</button>
        <button className="bg-white text-gray-600 border border-gray-200 px-4 py-1.5 rounded-full text-sm hover:bg-gray-50">Oficinas</button>
        <button className="bg-white text-gray-600 border border-gray-200 px-4 py-1.5 rounded-full text-sm hover:bg-gray-50">Garantía activa</button>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {propiedades.map((p) => (
          <div key={p.id} className="bg-white rounded-xl p-6 shadow-sm border border-gray-100 hover:shadow-md transition">
            <div className="flex justify-between items-start mb-4">
              <div className="w-12 h-12 bg-green-100 rounded-lg flex items-center justify-center">
                <i className="fa-solid fa-building text-green-600 text-xl"></i>
              </div>
              <span className={`text-xs font-medium px-2 py-1 rounded-full ${p.garantiaColor}`}>
                {p.garantia}
              </span>
            </div>
            <p className="text-xs text-gray-400 font-mono mb-1">{p.codigo}</p>
            <h3 className="font-semibold text-gray-900 mb-1">{p.tipo} · Unidad {p.unidad}</h3>
            <p className="text-gray-500 text-sm mb-1">{p.direccion}</p>
            <p className="text-gray-400 text-xs mb-4">📍 {p.sector}</p>
            <div className="flex gap-4 text-xs text-gray-500 border-t border-gray-100 pt-4 mb-4">
              <span>🏢 Piso {p.piso}</span>
              <span>📐 {p.m2} m²</span>
              <span>🏗️ {p.torre}</span>
            </div>
            
             <a  href={`/dashboard/admin/propiedades/${p.id}`}
              className="text-green-600 text-sm font-medium hover:text-green-500 transition-colors"
            >
              Ver detalles →
            </a>
          </div>
        ))}
      </div>
    </div>
  )
}