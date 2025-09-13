import { PrismaClient } from "../../node_modules/@prisma/client";

const g = globalThis;

export const prisma =
  g.prisma ??
  new PrismaClient({
    log: ["warn", "error"],
  });

if (process.env.NODE_ENV !== "production") g.prisma = prisma;