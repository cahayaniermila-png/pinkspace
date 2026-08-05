import { PrismaClient } from "@prisma/client";
import { PrismaD1 } from "@prisma/adapter-d1";
import { getCloudflareContext } from "@opennextjs/cloudflare";

const globalForPrisma = globalThis as unknown as {
  prisma: PrismaClient | undefined;
};

/**
 * Returns a PrismaClient instance configured for Cloudflare D1 (in Cloudflare Workers)
 * or standard PrismaClient singleton (in local dev / build).
 */
export function getPrismaClient(): PrismaClient {
  try {
    const cfContext = getCloudflareContext();
    if (cfContext?.env?.DB) {
      const adapter = new PrismaD1(cfContext.env.DB as D1Database);
      return new PrismaClient({ adapter } as any);
    }
  } catch (_e) {
    // Fallback when running outside of Cloudflare Workers request context (local dev / build)
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

export const prisma = getPrismaClient();

if (process.env.NODE_ENV !== "production") {
  globalForPrisma.prisma = prisma;
}
