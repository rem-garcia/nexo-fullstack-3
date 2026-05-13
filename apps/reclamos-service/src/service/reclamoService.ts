import { ReclamoSchema } from "@nexo/schemas";
import * as reclamoRepository from "../repository/reclamoRepository";

export const crearReclamo = (payload: unknown) => {
    // Siguiendo la logica del patron Controller-Service-Repository, aca se implementa
    // la logica de negocio de la app. Por ejemplo, aca se aplican las validaciones del
    // esquema Zod que tambien son aplicadas en el frontend
    const dataValid = ReclamoSchema.safeParse(payload);


    // Si se validan correctamente los datos a enviar, se aplica el metodo para insertar datos en
    // la tabla 'reclamo' que esta en Supabase
    reclamoRepository.createReclamo(dataValid.data!);
};
