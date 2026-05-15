import { ReclamoSchema } from "@nexo/schemas";
import * as reclamoRepository from "../repository/reclamoRepositoryV2";

export const crearReclamo = async (payload: unknown) => {
    const payloadParsed = ReclamoSchema.safeParse(payload);

    if(!payloadParsed.success) {
        throw payloadParsed.error.issues?.[0]?.message;
        //throw payloadParsed.error;
    }

    return reclamoRepository.createReclamo(payloadParsed.data);
};
