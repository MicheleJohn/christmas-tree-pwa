import { PrismaClient } from '@prisma/client'

const globalForPrisma = globalThis as unknown as {
  prisma: PrismaClient | undefined
}

export const prisma =
  globalForPrisma.prisma ??
  new PrismaClient({
    log: process.env.NODE_ENV === 'development' ? ['query', 'error', 'warn'] : ['error'],
    // Prisma 7: Pass adapter URL directly to client
    adapter: process.env.DATABASE_URL!,
  })

if (process.env.NODE_ENV !== 'production') globalForPrisma.prisma = prisma
