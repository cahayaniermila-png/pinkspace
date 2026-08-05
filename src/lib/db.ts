import { PrismaClient } from "../generated/prisma";
import { PrismaD1 } from "@prisma/adapter-d1";

const globalForPrisma = globalThis as unknown as {
  prisma: PrismaClient | undefined;
};

/**
 * Returns a PrismaClient instance.
 * In Cloudflare Workers production, uses @prisma/adapter-d1 with Cloudflare D1 database from request context.
 * In local dev or build environment, falls back cleanly.
 */
export function getPrismaClient(): PrismaClient {
  try {
    const { getCloudflareContext } = require("@opennextjs/cloudflare");
    const ctx = getCloudflareContext();
    if (ctx?.env?.DB) {
      const adapter = new PrismaD1(ctx.env.DB as D1Database);
      return new PrismaClient({ adapter } as any);
    }
  } catch (_e) {
    // Fallback if getCloudflareContext is not available
  }

  if (globalForPrisma.prisma) {
    return globalForPrisma.prisma;
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

/**
 * Dynamic Proxy ensuring getPrismaClient() is evaluated per property/query call inside Cloudflare Worker requests.
 */
export const prisma = new Proxy({} as PrismaClient, {
  get(_target, prop) {
    const client = getPrismaClient() as any;
    const value = client[prop];
    if (typeof value === "function") {
      return value.bind(client);
    }
    return value;
  },
});
