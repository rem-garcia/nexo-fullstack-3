export interface Ticket {
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

export interface CreateTicketDto {
  nombre_cliente: string
  email_cliente: string
  num_telefono: string
  tipo_propiedad: string
  nro_dpto: string
  tipo_falla: string
  ubicacion_falla: string
  descripcion_falla?: string
}