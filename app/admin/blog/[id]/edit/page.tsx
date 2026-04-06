import { notFound } from "next/navigation"
import { prisma } from "@/lib/db"
import { BlogForm } from "../../../_components/blog-form"

export default async function EditBlogPostPage({
  params,
}: {
  params: Promise<{ id: string }>
}) {
  const { id } = await params

  const item = await prisma.blogPost.findUnique({ where: { id } })
  if (!item) notFound()

  return <BlogForm item={item} />
}
