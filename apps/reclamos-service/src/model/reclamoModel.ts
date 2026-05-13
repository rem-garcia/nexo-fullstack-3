import { ReclamoType } from "@nexo/schemas";

// Metodo para transformar una propiedad de un tipo que esta escrita en camelCase a snake_case
type CamelToSnake<S extends string> =
  S extends `${infer T}${infer U}`
    ? U extends Uncapitalize<U>
      ? `${Lowercase<T>}${CamelToSnake<U>}`
      : `${Lowercase<T>}_${CamelToSnake<Uncapitalize<U>>}`
    : S;

// Mapped type que aplica la transformación a todas las propiedades
type SnakeCaseKeys<T> = {
  [K in keyof T as CamelToSnake<Extract<K, string>>]: T[K];
};

// Se crea un tipo para la tabla 'reclamo' de la base de datos
// donde las propiedades tienen el nombre de sus columnas.
export type ReclamoModel = SnakeCaseKeys<ReclamoType>;

/*
// 'ReclamoModel' viene a tener esta estructura que se uso antes en el cliente:

const reclamoInsertData = {
    nombre_cliente: dataReclamo.nombreCliente,
    email_cliente: dataReclamo.emailCliente,
    telefono: dataReclamo.numTelefono,
    tipo_propiedad: dataReclamo.tipoPropiedad,
    nro_dpto: dataReclamo.nroDpto,
    tipo_falla: dataReclamo.tipoFalla,
    ubicacion_falla: dataReclamo.ubicacionFalla,
    descripcion_falla: dataReclamo.descripcionFalla ?? null,
    creado_en: new Date().toISOString()
}
*/
