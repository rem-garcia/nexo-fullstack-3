import { ReclamoSchema } from "@nexo/schemas";
import * as reclamoRepository from "../repository/reclamoRepository";

export const crearReclamo = async (payload: unknown) => {
    const payloadParsed = ReclamoSchema.safeParse(payload);

    if(!payloadParsed.success) {
        throw payloadParsed.error.issues?.[0]?.message;
        //throw payloadParsed.error;
    }

    return reclamoRepository.createReclamo(payloadParsed.data);
};

export const obtenerReclamos = async () => {
    return reclamoRepository.getReclamos();
};

export const obtenerReclamoPorId = async (id: string) => {
    const reclamo = await reclamoRepository.getReclamoById(id);

    if(!reclamo) {
        const error = new Error(`Reclamo con id "${id}" no existe.`);

        throw error;
    }

    return reclamo;
};

export const eliminarReclamo = async (id: string) => {
    const reclamo = await reclamoRepository.getReclamoById(id);

    if(!reclamo) {
        const error = new Error(`Reclamo con id "${id}" no existe.`);

        throw error;
    }

    await reclamoRepository.deleteReclamo(id);
};
