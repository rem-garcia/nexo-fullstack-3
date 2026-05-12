import { ReclamoSchema } from "@nexo/schemas";
import { createClientV2 } from "@nexo/supabase";
import { NextRequest, NextResponse } from "next/server";

// Archivo donde se definen las funciones para gestionar las peticiones HTTP
// Mas info en: https://nextjs.org/docs/app/api-reference/file-conventions/route
export const POST = async(request: NextRequest): Promise<Response> => {
    try {
        const body = await request.json();

        // Validacion del body enviado al servidor usando esquema Zod
        const validationResult = ReclamoSchema.safeParse(body);

        if(!validationResult.success) {
            const firstError = validationResult.error.issues[0].message ?? "Error en la validacion de los datos enviados";

            return NextResponse.json(
                { error: firstError },
                { status: 400 }
            );
        }

        // Se genera el payload (reclamoInsertData) que va al servidor y luego a la BBDD
        const dataReclamo = validationResult.data;

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
        };

        // Codigo de Supabase: Se inicializa el cliente, luego se insertan los datos a la tabla 'reclamo'
        // y, posteriormente, se obtiene el 'id' del ultimo reclamo registrado
        const supabase = createClientV2();

        const { data, error } = await supabase
            .from("reclamo")
            .insert(reclamoInsertData)
            .select("id")
            .limit(1);

        // Los errores en el envio, son tratados como errores de servidor (500)
        if(error) {
            return NextResponse.json({ error: error.message }, { status: 500 });
        }

        // Si el envio del reclamo es exitoso, se devuelve el JSON con el id del reclamo
        // y el codigo de estado 201 (CREATED)
        const reclamoId = data?.[0].id ?? null;

        return NextResponse.json({ id: reclamoId }, { status: 201 }); 

    } catch(err: any) {
        return NextResponse.json(
            { error: err.message ?? "Error no manejado por el sistema" },
            { status: 500 }
        );
    }
};