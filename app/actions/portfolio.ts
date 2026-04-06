"use server"

import { prisma } from "@/lib/db"
import { verifySession } from "@/lib/auth"
import { slugify } from "@/lib/utils"
import { ContentStatus } from "@/lib/generated/prisma/client"
import { redirect } from "next/navigation"
import { revalidatePath } from "next/cache"

export type PortfolioFormState = {
  success: boolean
  error?: string
  fieldErrors?: Record<string, string>
}

function parseFormData(formData: FormData) {
  const title = formData.get("title")?.toString().trim() ?? ""
  const slug =
    formData.get("slug")?.toString().trim() || slugify(title)
  const summary = formData.get("summary")?.toString().trim() ?? ""
  const body = formData.get("body")?.toString().trim() || null
  const externalUrl =
    formData.get("externalUrl")?.toString().trim() || null
  const imageUrl = formData.get("imageUrl")?.toString().trim() || null
  const techStack = (formData.get("techStack")?.toString() ?? "")
    .split(",")
    .map((s) => s.trim())
    .filter(Boolean)
  const sortOrder = parseInt(formData.get("sortOrder")?.toString() ?? "0", 10)
  const status =
    formData.get("status")?.toString() === "published"
      ? ContentStatus.published
      : ContentStatus.draft
  const publishedAt =
    status === "published" ? new Date() : null

  return {
    title,
    slug,
    summary,
    body,
    externalUrl,
    imageUrl,
    techStack,
    sortOrder: isNaN(sortOrder) ? 0 : sortOrder,
    status,
    publishedAt,
  }
}

function validate(data: ReturnType<typeof parseFormData>) {
  const errors: Record<string, string> = {}
  if (!data.title) errors.title = "Title is required."
  if (!data.slug) errors.slug = "Slug is required."
  if (!data.summary) errors.summary = "Summary is required."
  return Object.keys(errors).length > 0 ? errors : null
}

export async function createPortfolio(
  _prev: PortfolioFormState,
  formData: FormData,
): Promise<PortfolioFormState> {
  const session = await verifySession()
  if (!session) return { success: false, error: "Unauthorized." }

  const data = parseFormData(formData)
  const fieldErrors = validate(data)
  if (fieldErrors) return { success: false, fieldErrors }

  try {
    await prisma.portfolioItem.create({ data })
  } catch (e) {
    const message =
      e instanceof Error && e.message.includes("Unique constraint")
        ? "A portfolio item with this slug already exists."
        : "Failed to create portfolio item."
    return { success: false, error: message }
  }

  revalidatePath("/admin/portfolio")
  revalidatePath("/work")
  redirect("/admin/portfolio")
}

export async function updatePortfolio(
  _prev: PortfolioFormState,
  formData: FormData,
): Promise<PortfolioFormState> {
  const session = await verifySession()
  if (!session) return { success: false, error: "Unauthorized." }

  const id = formData.get("id")?.toString()
  if (!id) return { success: false, error: "Missing item ID." }

  const data = parseFormData(formData)
  const fieldErrors = validate(data)
  if (fieldErrors) return { success: false, fieldErrors }

  // Preserve original publishedAt if already published
  const existing = await prisma.portfolioItem.findUnique({
    where: { id },
    select: { publishedAt: true },
  })
  if (data.status === ContentStatus.published && existing?.publishedAt) {
    data.publishedAt = existing.publishedAt
  }

  try {
    await prisma.portfolioItem.update({ where: { id }, data })
  } catch (e) {
    const message =
      e instanceof Error && e.message.includes("Unique constraint")
        ? "A portfolio item with this slug already exists."
        : "Failed to update portfolio item."
    return { success: false, error: message }
  }

  revalidatePath("/admin/portfolio")
  revalidatePath("/work")
  redirect("/admin/portfolio")
}

export async function deletePortfolio(formData: FormData) {
  const session = await verifySession()
  if (!session) return

  const id = formData.get("id")?.toString()
  if (!id) return

  await prisma.portfolioItem.delete({ where: { id } })
  revalidatePath("/admin/portfolio")
  revalidatePath("/work")
  redirect("/admin/portfolio")
}
