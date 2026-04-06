import { notFound } from "next/navigation"
import { prisma } from "@/lib/db"
import { AnnouncementForm } from "../../../_components/announcement-form"

export default async function EditAnnouncementPage({
  params,
}: {
  params: Promise<{ id: string }>
}) {
  const { id } = await params

  const item = await prisma.announcement.findUnique({ where: { id } })
  if (!item) notFound()

  return <AnnouncementForm item={item} />
}
