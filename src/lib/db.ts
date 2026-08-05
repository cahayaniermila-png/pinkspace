import { PrismaClient } from "@prisma/client";
import { PrismaD1 } from "@prisma/adapter-d1";

const globalForPrisma = globalThis as unknown as {
  prisma: PrismaClient | undefined;
};

/**
 * Returns a PrismaClient instance.
 * In Cloudflare Workers production, uses @prisma/adapter-d1 with Cloudflare D1 database.
 * In local dev or build environment, uses standard PrismaClient singleton with SQLite fallback.
 */
export function getPrismaClient(): PrismaClient {
  if (globalForPrisma.prisma) {
    return globalForPrisma.prisma;
  }

  if (process.env.NODE_ENV === "production") {
    try {
      const { getCloudflareContext } = require("@opennextjs/cloudflare");
      const ctx = getCloudflareContext();
      if (ctx?.env?.DB) {
        const adapter = new PrismaD1(ctx.env.DB as D1Database);
        const client = new PrismaClient({ adapter } as any);
        return client;
      }
    } catch (_e) {
      // Fallback if getCloudflareContext is not available
    }
  }

  const client = new PrismaClient({
    datasources: {
      db: {
        url: process.env.DATABASE_URL || "file:./dev.db",
      },
    },
  });

  if (process.env.NODE_ENV !== "production") {
    globalForPrisma.prisma = client;
  }

  return client;
}

export const prisma = getPrismaClient();
