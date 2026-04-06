"use server"

import { prisma } from "@/lib/db"
import { verifySession } from "@/lib/auth"
import { ContentStatus } from "@/lib/generated/prisma/client"
import { slugify } from "@/lib/utils"
import { redirect } from "next/navigation"
import { revalidatePath } from "next/cache"
import { deleteFromR2 } from "@/lib/upload"

export type BlogFormState = {
  success: boolean
  error?: string
  fieldErrors?: Record<string, string>
}

function parseFormData(formData: FormData) {
  const title = formData.get("title")?.toString().trim() ?? ""
  const slug = formData.get("slug")?.toString().trim() || slugify(title)
  const excerpt = formData.get("excerpt")?.toString().trim() ?? ""
  const body = formData.get("body")?.toString().trim() ?? ""
  const coverImage = formData.get("coverImage")?.toString().trim() || null
  const status =
    formData.get("status")?.toString() === "published"
      ? ContentStatus.published
      : ContentStatus.draft
  const publishedAt = status === ContentStatus.published ? new Date() : null

  return { title, slug, excerpt, body, coverImage, status, publishedAt }
}

function validate(data: ReturnType<typeof parseFormData>) {
  const errors: Record<string, string> = {}
  if (!data.title) errors.title = "Title is required."
  if (!data.slug) errors.slug = "Slug is required."
  if (!data.excerpt) errors.excerpt = "Excerpt is required."
  if (!data.body) errors.body = "Body is required."
  return Object.keys(errors).length > 0 ? errors : null
}

export async function createPost(
  _prev: BlogFormState,
  formData: FormData,
): Promise<BlogFormState> {
  const session = await verifySession()
  if (!session) return { success: false, error: "Unauthorized." }

  const data = parseFormData(formData)
  const fieldErrors = validate(data)
  if (fieldErrors) return { success: false, fieldErrors }

  try {
    await prisma.blogPost.create({ data })
  } catch (e) {
    const message =
      e instanceof Error && e.message.includes("Unique constraint")
        ? "A blog post with this slug already exists."
        : "Failed to create blog post."
    return { success: false, error: message }
  }

  revalidatePath("/admin/blog")
  revalidatePath("/blog")
  redirect("/admin/blog")
}

export async function updatePost(
  _prev: BlogFormState,
  formData: FormData,
): Promise<BlogFormState> {
  const session = await verifySession()
  if (!session) return { success: false, error: "Unauthorized." }

  const id = formData.get("id")?.toString()
  if (!id) return { success: false, error: "Missing post ID." }

  const data = parseFormData(formData)
  const fieldErrors = validate(data)
  if (fieldErrors) return { success: false, fieldErrors }

  const existing = await prisma.blogPost.findUnique({
    where: { id },
    select: { publishedAt: true, coverImage: true },
  })
  if (data.status === ContentStatus.published && existing?.publishedAt) {
    data.publishedAt = existing.publishedAt
  }

  try {
    await prisma.blogPost.update({ where: { id }, data })
    if (existing?.coverImage && existing.coverImage !== data.coverImage) {
      deleteFromR2(existing.coverImage)
    }
  } catch (e) {
    const message =
      e instanceof Error && e.message.includes("Unique constraint")
        ? "A blog post with this slug already exists."
        : "Failed to update blog post."
    return { success: false, error: message }
  }

  revalidatePath("/admin/blog")
  revalidatePath("/blog")
  redirect("/admin/blog")
}

export async function deletePost(formData: FormData) {
  const session = await verifySession()
  if (!session) return

  const id = formData.get("id")?.toString()
  if (!id) return

  const post = await prisma.blogPost.delete({ where: { id } })
  if (post.coverImage) deleteFromR2(post.coverImage)
  revalidatePath("/admin/blog")
  revalidatePath("/blog")
  redirect("/admin/blog")
}
