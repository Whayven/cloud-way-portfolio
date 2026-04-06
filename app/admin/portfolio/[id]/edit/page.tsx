import { notFound } from "next/navigation"
import { prisma } from "@/lib/db"
import { PortfolioForm } from "../../../_components/portfolio-form"

export default async function EditPortfolioPage({
  params,
}: {
  params: Promise<{ id: string }>
}) {
  const { id } = await params

  const item = await prisma.portfolioItem.findUnique({ where: { id } })
  if (!item) notFound()

  return <PortfolioForm item={item} />
}
