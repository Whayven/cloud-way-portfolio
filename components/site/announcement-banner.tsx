import { prisma } from "@/lib/db"
import { ContentStatus } from "@/lib/generated/prisma/client"
import { DismissibleBanner } from "./dismissible-banner"

export async function AnnouncementBanner() {
  const announcement = await prisma.announcement.findFirst({
    where: {
      status: ContentStatus.published,
      OR: [{ expiresAt: null }, { expiresAt: { gt: new Date() } }],
    },
    orderBy: { publishedAt: "desc" },
    select: { id: true, title: true, body: true, type: true },
  })

  if (!announcement) return null

  return (
    <DismissibleBanner
      id={announcement.id}
      title={announcement.title}
      body={announcement.body}
      type={announcement.type}
    />
  )
}
