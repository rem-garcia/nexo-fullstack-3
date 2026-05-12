import z from "zod";

// Esquema de Zod para validacion de formulario de reclamos de postventa
export const ReclamoSchema = z.object({
    nombreCliente: z.string().nonempty({ error: "Campo obligatorio" }),
    emailCliente: z.email({
        error: (iss) => iss.input === undefined || iss.input === "" ? "Campo obligatorio" : "Correo inválido"
    }),
    numTelefono: z.string().regex(
        /^\+56(?:9\d{8}|[2-7]\d{7}|1\d\d{7})$/,
        {
            error: iss => iss.input === undefined || iss.input === "" ? "Campo obligatorio" : "Número de teléfono inválido"
        }
    ),
    tipoPropiedad: z.string().nonempty({ error: "Campo obligatorio" }),
    nroDpto: z.string().nonempty({ error: "Campo obligatorio" }),
    tipoFalla: z.string().nonempty({ error: "Campo obligatorio "}),
    ubicacionFalla: z.string().nonempty({ error: "Campo obligatorio" }),
    descripcionFalla: z.string().max(400, {error: "Has alcanzado el máximo de caracteres (400)"}).optional()
});

// Se hace una inferencia del tipo del esquema de Zod
// y se almacena como 'type' para usarlo como tipo de dato
export type ReclamoType = z.infer<typeof ReclamoSchema>;
