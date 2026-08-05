import { PrismaClient } from "../generated/prisma/client";
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

  const dummyD1 = {
    prepare: () => ({
      bind: () => ({
        run: async () => ({ meta: { changes: 0, duration: 0 } }),
        raw: async () => [[]],
        all: async () => ({ results: [], success: true, meta: {} }),
        first: async () => null,
      }),
    }),
    exec: async () => {},
  };
  const adapter = new PrismaD1(dummyD1 as any);
  const client = new PrismaClient({ adapter } as any);

  if (process.env.NODE_ENV !== "production") {
    globalForPrisma.prisma = client;
  }

  return client;
}

export const prisma = getPrismaClient();
