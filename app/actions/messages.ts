"use server"

import { prisma } from "@/lib/db"
import { verifySession } from "@/lib/auth"
import { redirect } from "next/navigation"
import { revalidatePath } from "next/cache"

export async function deleteMessage(formData: FormData) {
  const session = await verifySession()
  if (!session) return

  const id = formData.get("id")?.toString()
  if (!id) return

  await prisma.contactMessage.delete({ where: { id } })
  revalidatePath("/admin/messages")
  redirect("/admin/messages")
}
