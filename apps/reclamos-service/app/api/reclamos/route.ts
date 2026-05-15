import { NextResponse } from "next/server";
import * as reclamoService from "../../../src/service/reclamoService";

export const POST = async (req: Request) => {
    const body = await req.json();

    try {
        const reclamo = await reclamoService.crearReclamo(body);

        return NextResponse.json(reclamo, { status: 201 });
    } catch(err: any) {
        return NextResponse.json({ error: err.message ?? 'Datos inválidos'}, { status: 400  });
    }
};
/*import { NextResponse } from "next/server";
import * as reclamoService from "../../../src/service/reclamoService";

export const POST = async (req: Request) => {
    try {
        const body = await req.json();

        reclamoService.crearReclamo(body);

        return NextResponse.json({ status: '201' }); // Registro creado
    } catch(err) {
        return NextResponse.json({ error: (err as Error).message }, { status: 500 });
    }
};
*/
