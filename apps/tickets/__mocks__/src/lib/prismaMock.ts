import { mockDeep, DeepMockProxy } from 'jest-mock-extended'
import { PrismaClient } from '../../../generated/prisma'

export const prismaMock = mockDeep<PrismaClient>() as DeepMockProxy<PrismaClient>