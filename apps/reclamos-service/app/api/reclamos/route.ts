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

export const GET = async () => {
    const reclamos = await reclamoService.obtenerReclamos();

    if(!reclamos || reclamos.length === 0) {
        return NextResponse.json(null, { status: 204 });
    }

    return NextResponse.json(reclamos, { status: 200 });
};

