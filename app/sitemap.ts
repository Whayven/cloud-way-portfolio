import type { MetadataRoute } from "next"
import { prisma } from "@/lib/db"

export const dynamic = "force-dynamic"

export default async function sitemap(): Promise<MetadataRoute.Sitemap> {
  const items = await prisma.portfolioItem.findMany({
    where: { status: "published" },
    select: { slug: true, updatedAt: true },
  })

  const workEntries = items.map((item) => ({
    url: `https://cloud-way.dev/work/${item.slug}`,
    lastModified: item.updatedAt,
  }))

  return [
    { url: "https://cloud-way.dev", lastModified: new Date() },
    { url: "https://cloud-way.dev/work", lastModified: new Date() },
    ...workEntries,
  ]
}
