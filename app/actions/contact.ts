"use server"

import { prisma } from "@/lib/db"

export type ContactFormState = {
  success: boolean
  error?: string
}

export async function submitContactForm(
  _prev: ContactFormState,
  formData: FormData,
): Promise<ContactFormState> {
  const firstName = formData.get("first-name")?.toString().trim()
  const lastName = formData.get("last-name")?.toString().trim()
  const email = formData.get("email")?.toString().trim()
  const message = formData.get("message")?.toString().trim()
  const company = formData.get("company")?.toString().trim() || null
  const phone = formData.get("phone-number")?.toString().trim() || null
  const region = formData.get("country")?.toString().trim() || null

  if (!firstName || !lastName || !email || !message) {
    return { success: false, error: "Please fill in all required fields." }
  }

  if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) {
    return { success: false, error: "Please enter a valid email address." }
  }

  try {
    await prisma.contactMessage.create({
      data: { firstName, lastName, email, message, company, phone, region },
    })
    return { success: true }
  } catch {
    return {
      success: false,
      error: "Something went wrong. Please try again later.",
    }
  }
}
