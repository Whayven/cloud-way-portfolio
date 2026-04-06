"use server"

import { createSession, deleteSession } from "@/lib/auth"
import { redirect } from "next/navigation"
import { timingSafeEqual } from "node:crypto"

export type LoginState = {
  error?: string
}

export async function login(
  _prev: LoginState,
  formData: FormData,
): Promise<LoginState> {
  const password = formData.get("password")?.toString() ?? ""
  const adminPassword = process.env.ADMIN_PASSWORD ?? ""

  if (!adminPassword) {
    return { error: "Admin password not configured." }
  }

  const passwordBuffer = Buffer.from(password)
  const adminBuffer = Buffer.from(adminPassword)

  if (
    passwordBuffer.length !== adminBuffer.length ||
    !timingSafeEqual(passwordBuffer, adminBuffer)
  ) {
    return { error: "Invalid password." }
  }

  await createSession()
  redirect("/admin")
}

export async function logout() {
  await deleteSession()
  redirect("/admin")
}
