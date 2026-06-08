import { prisma } from "../lib/prisma";
import { reclamoCreateInput } from "../generated/prisma/models";

export const createReclamo = async (data: reclamoCreateInput) => {
    return await prisma.reclamo.create({ data });
};

export const getReclamos = async () => {
    return await prisma.reclamo.findMany();
};

export const getReclamoById = async (id: string) => {
    return await prisma.reclamo.findUnique({ where: { id } });
}

export const deleteReclamo = async (id: string) => {
    return await prisma.reclamo.delete({ where: { id } });
}