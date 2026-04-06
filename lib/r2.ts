import { S3Client } from "@aws-sdk/client-s3"

const globalForR2 = globalThis as unknown as { r2: S3Client | undefined }

function createR2Client() {
  const accountId = process.env.R2_ACCOUNT_ID
  const accessKeyId = process.env.R2_ACCESS_KEY_ID
  const secretAccessKey = process.env.R2_SECRET_ACCESS_KEY

  if (!accountId || !accessKeyId || !secretAccessKey) {
    throw new Error("R2 environment variables are not set")
  }

  return new S3Client({
    region: "auto",
    endpoint: `https://${accountId}.r2.cloudflarestorage.com`,
    credentials: { accessKeyId, secretAccessKey },
  })
}

export function getR2() {
  if (!globalForR2.r2) {
    globalForR2.r2 = createR2Client()
  }
  return globalForR2.r2
}

export function getR2Bucket() {
  const bucket = process.env.R2_BUCKET_NAME
  if (!bucket) throw new Error("R2_BUCKET_NAME is not set")
  return bucket
}

export function getR2PublicUrl() {
  const url = process.env.R2_PUBLIC_URL
  if (!url) throw new Error("R2_PUBLIC_URL is not set")
  return url
}
