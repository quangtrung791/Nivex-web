import { PrismaClient } from "@prisma/client";

const globalForPrisma = globalThis;

export const prisma = globalForPrisma.prisma ?? new PrismaClient({
  log: ['query', 'info', 'warn', 'error'],
  datasourceUrl: process.env.DATABASE_URL,
  // Thêm connection pooling settings
  datasources: {
    db: {
      url: process.env.DATABASE_URL
    }
  }
});

if (process.env.NODE_ENV !== "production") {
  globalForPrisma.prisma = prisma;
}

// Cleanup connections on process exit
process.on('beforeExit', async () => {
  await prisma.$disconnect();
});