export type EstadoTicket = 'pendiente' | 'en_proceso' | 'cerrado'

export interface Reclamo {
  id: string
  nombre_cliente: string
  email_cliente: string
  num_telefono: string
  tipo_propiedad: string
  nro_dpto: string
  tipo_falla: string
  ubicacion_falla: string
  descripcion_falla?: string | null
  creado_en: Date
}

export interface Ticket {
  id: string
  reclamo_id: string
  tecnico_id: string | null
  coordinador_id: string | null
  estado: EstadoTicket
  notas: string | null
  created_at: Date
  updated_at: Date
  reclamo?: Reclamo
}

export interface CreateTicketDto {
  reclamo_id: string
  tecnico_id?: string
  coordinador_id?: string
  notas?: string
}

export interface UpdateTicketDto {
  tecnico_id?: string
  estado?: EstadoTicket
  notas?: string
}

export interface CreateReclamoDto {
  nombre_cliente: string
  email_cliente: string
  num_telefono: string
  tipo_propiedad: string
  nro_dpto: string
  tipo_falla: string
  ubicacion_falla: string
  descripcion_falla?: string
}