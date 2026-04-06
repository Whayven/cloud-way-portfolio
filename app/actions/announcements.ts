"use server"

import { prisma } from "@/lib/db"
import { verifySession } from "@/lib/auth"
import { ContentStatus, AnnouncementType } from "@/lib/generated/prisma/client"
import { redirect } from "next/navigation"
import { revalidatePath } from "next/cache"

export type AnnouncementFormState = {
  success: boolean
  error?: string
  fieldErrors?: Record<string, string>
}

const validTypes = new Set(Object.values(AnnouncementType))

function parseFormData(formData: FormData) {
  const title = formData.get("title")?.toString().trim() ?? ""
  const body = formData.get("body")?.toString().trim() ?? ""
  const rawType = formData.get("type")?.toString() ?? "info"
  const type = validTypes.has(rawType as AnnouncementType)
    ? (rawType as AnnouncementType)
    : AnnouncementType.info
  const status =
    formData.get("status")?.toString() === "published"
      ? ContentStatus.published
      : ContentStatus.draft
  const expiresAtRaw = formData.get("expiresAt")?.toString().trim()
  const expiresAt = expiresAtRaw ? new Date(expiresAtRaw) : null
  const publishedAt = status === ContentStatus.published ? new Date() : null

  return { title, body, type, status, expiresAt, publishedAt }
}

function validate(data: ReturnType<typeof parseFormData>) {
  const errors: Record<string, string> = {}
  if (!data.title) errors.title = "Title is required."
  if (!data.body) errors.body = "Body is required."
  return Object.keys(errors).length > 0 ? errors : null
}

export async function createAnnouncement(
  _prev: AnnouncementFormState,
  formData: FormData,
): Promise<AnnouncementFormState> {
  const session = await verifySession()
  if (!session) return { success: false, error: "Unauthorized." }

  const data = parseFormData(formData)
  const fieldErrors = validate(data)
  if (fieldErrors) return { success: false, fieldErrors }

  await prisma.announcement.create({ data })

  revalidatePath("/admin/announcements")
  revalidatePath("/")
  redirect("/admin/announcements")
}

export async function updateAnnouncement(
  _prev: AnnouncementFormState,
  formData: FormData,
): Promise<AnnouncementFormState> {
  const session = await verifySession()
  if (!session) return { success: false, error: "Unauthorized." }

  const id = formData.get("id")?.toString()
  if (!id) return { success: false, error: "Missing announcement ID." }

  const data = parseFormData(formData)
  const fieldErrors = validate(data)
  if (fieldErrors) return { success: false, fieldErrors }

  const existing = await prisma.announcement.findUnique({
    where: { id },
    select: { publishedAt: true },
  })
  if (data.status === ContentStatus.published && existing?.publishedAt) {
    data.publishedAt = existing.publishedAt
  }

  await prisma.announcement.update({ where: { id }, data })

  revalidatePath("/admin/announcements")
  revalidatePath("/")
  redirect("/admin/announcements")
}

export async function deleteAnnouncement(formData: FormData) {
  const session = await verifySession()
  if (!session) return

  const id = formData.get("id")?.toString()
  if (!id) return

  await prisma.announcement.delete({ where: { id } })
  revalidatePath("/admin/announcements")
  revalidatePath("/")
  redirect("/admin/announcements")
}
