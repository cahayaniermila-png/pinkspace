import { PrismaClient } from "@prisma/client";
import { PrismaD1 } from "@prisma/adapter-d1";
import { getCloudflareContext } from "@opennextjs/cloudflare";

const globalForPrisma = globalThis as unknown as {
  prisma: PrismaClient | undefined;
};

/**
 * Dynamically instantiates PrismaClient with Cloudflare D1 driver adapter
 * when running inside Cloudflare Workers via OpenNext, or falls back to local SQLite.
 */
export function getPrismaClient(): PrismaClient {
  try {
    const cfContext = getCloudflareContext();
    if (cfContext?.env?.DB) {
      const adapter = new PrismaD1(cfContext.env.DB as D1Database);
      return new PrismaClient({ adapter } as any);
    }
  } catch (_e) {
    // Fallback if executed outside of Cloudflare Workers request context
  }

  if (!globalForPrisma.prisma) {
    globalForPrisma.prisma = new PrismaClient({
      datasources: {
        db: {
          url: process.env.DATABASE_URL || "file:./dev.db",
        },
      },
    });
  }
  return globalForPrisma.prisma;
}

export const prisma = new Proxy({} as PrismaClient, {
  get(_target, prop) {
    const client = getPrismaClient();
    const value = (client as any)[prop];
    if (typeof value === "function") {
      return value.bind(client);
    }
    return value;
  },
});

if (process.env.NODE_ENV !== "production") globalForPrisma.prisma = prisma;
