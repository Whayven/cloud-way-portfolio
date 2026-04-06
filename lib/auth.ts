import "server-only"

import { SignJWT, jwtVerify } from "jose"
import { cookies } from "next/headers"

const secretKey = process.env.JWT_SECRET
if (!secretKey) throw new Error("JWT_SECRET environment variable is not set")
const encodedKey = new TextEncoder().encode(secretKey)

export async function createSession() {
  const expiresAt = new Date(Date.now() + 7 * 24 * 60 * 60 * 1000)
  const session = await new SignJWT({ role: "admin" })
    .setProtectedHeader({ alg: "HS256" })
    .setIssuedAt()
    .setExpirationTime("7d")
    .sign(encodedKey)

  const cookieStore = await cookies()
  cookieStore.set("session", session, {
    httpOnly: true,
    secure: process.env.NODE_ENV === "production",
    sameSite: "lax",
    path: "/admin",
    expires: expiresAt,
  })
}

export async function verifySession() {
  const cookieStore = await cookies()
  const session = cookieStore.get("session")?.value
  if (!session) return null

  try {
    const { payload } = await jwtVerify(session, encodedKey, {
      algorithms: ["HS256"],
    })
    return payload
  } catch {
    return null
  }
}

export async function deleteSession() {
  const cookieStore = await cookies()
  cookieStore.delete("session")
}
