import Prisma from "@prisma/client";
const { PrismaClient } = Prisma;

export const prisma = global.prisma || new PrismaClient();

if (process.env.NODE_ENV !== "production") global.prisma = prisma;
