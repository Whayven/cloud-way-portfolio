import { NextRequest, NextResponse } from "next/server"
import { verifySession } from "@/lib/auth"
import { uploadToR2 } from "@/lib/upload"

export async function POST(request: NextRequest) {
  const session = await verifySession()
  if (!session) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 })
  }

  const formData = await request.formData()
  const file = formData.get("file")
  const prefix = formData.get("prefix")?.toString()

  if (!(file instanceof File)) {
    return NextResponse.json({ error: "No file provided." }, { status: 400 })
  }
  if (prefix !== "portfolio" && prefix !== "blog") {
    return NextResponse.json({ error: "Invalid prefix." }, { status: 400 })
  }

  try {
    const url = await uploadToR2(file, prefix)
    return NextResponse.json({ url })
  } catch (e) {
    const message = e instanceof Error ? e.message : "Upload failed."
    return NextResponse.json({ error: message }, { status: 400 })
  }
}
