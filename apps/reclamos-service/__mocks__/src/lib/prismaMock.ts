import {mockDeep, DeepMockProxy } from "jest-mock-extended";
import { PrismaClient } from "../../../src/generated/prisma/client";

export const prismaMock = mockDeep<PrismaClient>() as DeepMockProxy<PrismaClient>;
