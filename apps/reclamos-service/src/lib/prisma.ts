import { PrismaClient } from '../generated/prisma/client';
import { PrismaPg } from '@prisma/adapter-pg';

declare global {
    var __prisma: PrismaClient | undefined;
}

const adapter = new PrismaPg({
    connectionString: process.env.DATABASE_URL!,
})

export const prisma = global.__prisma ?? new PrismaClient({ adapter });

//declare global {
//    var __prisma: PrismaClient | undefined;
//}
//
//export const prisma = global.prisma ?? new PrismaClient();

//if (process.env.NODE_ENV !== 'production') {
//    global.prisma = prisma;
//}
