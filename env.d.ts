/// <reference types="@cloudflare/workers-types" />

interface CloudflareEnv {
  DB: D1Database;
  R2_BUCKET: R2Bucket;
}

declare namespace NodeJS {
  interface ProcessEnv {
    DATABASE_URL?: string;
  }
}
