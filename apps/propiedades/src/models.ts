export interface Propiedad {
  id: string
  codigo: string
  tipo: string
  direccion: string
  sector: string
  piso: number
  unidad: string
  torre: string
  m2: number
  garantia: string
  creado_en: Date
}

export interface CreatePropiedadDto {
  codigo: string
  tipo: string
  direccion: string
  sector: string
  piso: number
  unidad: string
  torre: string
  m2: number
  garantia: string
}