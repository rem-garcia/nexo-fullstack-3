import { NextRequest, NextResponse } from "next/server";
import * as reclamoService from "../../../../src/service/reclamoService";

// GET por ID del reclamo
export const GET = async(req: NextRequest, { params }: { params: Promise<{ id: string }> })  => {
    const id = (await params).id;

    try {
        const reclamo = await reclamoService.obtenerReclamoPorId(id);

        return NextResponse.json(reclamo, { status: 200 });
    } catch(err: any) {
        const errorMsg = err?.message ?? "Error al buscar el reclamo"; 

        if(errorMsg.includes("no existe")) {
            return NextResponse.json({error: errorMsg }, { status: 404 });
        }

        return NextResponse.json({error: errorMsg }, { status: 400 });
    }
}

// DELETE reclamo por su ID
export const DELETE = async (req: NextRequest, { params }: { params: Promise<{ id: string }> }) => {
   const id = (await params).id;

    try {
        await reclamoService.eliminarReclamo(id);

        return NextResponse.json(null, { status: 204 });
    } catch(err: any) {
        const errorMsg = err?.message ?? "Error al eliminar el reclamo"; 

        if(errorMsg.includes("no existe")) {
            return NextResponse.json({error: errorMsg }, { status: 404 });
        }

        return NextResponse.json({error: errorMsg }, { status: 400 });
    }
};
