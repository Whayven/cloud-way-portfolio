import "server-only"

import { PutObjectCommand, DeleteObjectCommand } from "@aws-sdk/client-s3"
import { getR2, getR2Bucket, getR2PublicUrl } from "./r2"

export const ALLOWED_IMAGE_TYPES = [
  "image/jpeg",
  "image/png",
  "image/webp",
  "image/avif",
]
export const MAX_IMAGE_SIZE = 5 * 1024 * 1024 // 5 MB

const EXTENSION_MAP: Record<string, string> = {
  "image/jpeg": "jpg",
  "image/png": "png",
  "image/webp": "webp",
  "image/avif": "avif",
}

export async function uploadToR2(
  file: File,
  prefix: "portfolio" | "blog",
): Promise<string> {
  if (!ALLOWED_IMAGE_TYPES.includes(file.type)) {
    throw new Error("File type not allowed. Use JPEG, PNG, WebP, or AVIF.")
  }
  if (file.size > MAX_IMAGE_SIZE) {
    throw new Error("File too large. Maximum size is 5 MB.")
  }

  const ext = EXTENSION_MAP[file.type] ?? "bin"
  const key = `${prefix}/${crypto.randomUUID()}.${ext}`
  const publicUrl = getR2PublicUrl()

  await getR2().send(
    new PutObjectCommand({
      Bucket: getR2Bucket(),
      Key: key,
      Body: Buffer.from(await file.arrayBuffer()),
      ContentType: file.type,
    }),
  )

  return `${publicUrl}/${key}`
}

export async function deleteFromR2(url: string): Promise<void> {
  const publicUrl = getR2PublicUrl()
  if (!url.startsWith(publicUrl)) return

  const key = url.slice(publicUrl.length + 1)
  try {
    await getR2().send(
      new DeleteObjectCommand({
        Bucket: getR2Bucket(),
        Key: key,
      }),
    )
  } catch (e) {
    console.error("Failed to delete from R2:", key, e)
  }
}
