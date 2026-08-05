import { PrismaClient } from "@prisma/client";
import { PrismaD1 } from "@prisma/adapter-d1";

const globalForPrisma = globalThis as unknown as {
  prisma: PrismaClient | undefined;
};

/**
 * Returns a PrismaClient instance configured for Cloudflare D1 (if d1Binding is supplied)
 * or standard PrismaClient (for local SQLite dev / fallback).
 */
export function getPrismaClient(d1Binding?: D1Database): PrismaClient {
  if (d1Binding) {
    const adapter = new PrismaD1(d1Binding);
    return new PrismaClient({ adapter } as any);
  }

  if (!globalForPrisma.prisma) {
    globalForPrisma.prisma = new PrismaClient();
  }
  return globalForPrisma.prisma;
}

export const prisma = globalForPrisma.prisma ?? new PrismaClient();

if (process.env.NODE_ENV !== "production") globalForPrisma.prisma = prisma;
