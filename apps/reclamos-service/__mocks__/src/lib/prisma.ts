// Mocks de prisma
export const prisma = {
    reclamo: {
        create: jest.fn(),
        findMany: jest.fn(),
        findUnique: jest.fn(),
        delete: jest.fn(),
    },
}