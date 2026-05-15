import { prisma } from "../lib/prisma";
import { reclamoCreateInput } from "../generated/prisma/models";

export const createReclamo = (data: reclamoCreateInput) => {
    return prisma.reclamo.create({ data });
};

export const getReclamoById = (id: string) => {
    return prisma.reclamo.findUnique({ where: { id } });
}

export const deleteReclamo = (id: string) => {
    return prisma.reclamo.delete({ where: { id } });
}