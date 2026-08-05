import { PrismaClient } from "../generated/prisma";
import { PrismaD1 } from "@prisma/adapter-d1";

const globalForPrisma = globalThis as unknown as {
  prisma: PrismaClient | undefined;
};

/**
 * Returns a PrismaClient instance.
 * In Cloudflare Workers production, uses @prisma/adapter-d1 with Cloudflare D1 database.
 * In local dev (npm run dev), uses standard PrismaClient with SQLite file:./dev.db.
 */
export function getPrismaClient(): PrismaClient {
  try {
    const isWorkerRuntime =
      typeof (globalThis as any).WebSocketPair !== "undefined" ||
      process.env.NODE_ENV === "production";

    if (isWorkerRuntime) {
      const { getCloudflareContext } = require("@opennextjs/cloudflare");
      const ctx = getCloudflareContext();
      if (ctx?.env?.DB) {
        const adapter = new PrismaD1(ctx.env.DB as D1Database);
        return new PrismaClient({ adapter } as any);
      }
    }
  } catch (_e) {
    // getCloudflareContext is not available
  }

  if (globalForPrisma.prisma) {
    return globalForPrisma.prisma;
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
