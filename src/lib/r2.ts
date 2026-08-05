/**
 * Helper utilities for Cloudflare R2 Storage interactions.
 * Supports file upload, download, and URL generation.
 */

export interface UploadResult {
  key: string;
  url: string;
  size: number;
}

export async function uploadToR2(
  bucket: R2Bucket,
  key: string,
  body: ReadableStream | ArrayBuffer | string,
  contentType: string = "application/octet-stream"
): Promise<UploadResult> {
  const object = await bucket.put(key, body, {
    httpMetadata: { contentType },
  });

  return {
    key: object.key,
    url: `/api/assets/${encodeURIComponent(object.key)}`,
    size: object.size,
  };
}

export async function getFromR2(bucket: R2Bucket, key: string): Promise<R2ObjectBody | null> {
  return await bucket.get(key);
}

export async function deleteFromR2(bucket: R2Bucket, key: string): Promise<void> {
  await bucket.delete(key);
}
