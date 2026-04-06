import Image from "next/image"
import { notFound } from "next/navigation"
import { prisma } from "@/lib/db"
import { ContentStatus } from "@/lib/generated/prisma/client"
import { formatDate } from "@/lib/utils"
import { SiteHeader } from "@/components/site/site-header"
import { SiteFooter } from "@/components/site/site-footer"
import { BlogBody } from "./blog-body"
import Link from "next/link"

export async function generateMetadata({
  params,
}: {
  params: Promise<{ slug: string }>
}) {
  const { slug } = await params
  const post = await prisma.blogPost.findUnique({
    where: { slug },
    select: { title: true, excerpt: true },
  })
  if (!post) return { title: "Post Not Found" }
  return {
    title: `${post.title} | CloudWay Blog`,
    description: post.excerpt,
  }
}

export default async function BlogPostPage({
  params,
}: {
  params: Promise<{ slug: string }>
}) {
  const { slug } = await params

  const post = await prisma.blogPost.findUnique({
    where: { slug, status: ContentStatus.published },
  })
  if (!post) notFound()

  return (
    <div className="min-h-screen bg-cw-dark">
      <SiteHeader />
      <main className="mx-auto w-full max-w-3xl px-6 pb-24 pt-16 sm:px-8 lg:px-10">
        <Link
          href="/blog"
          className="text-sm text-gray-500 transition-colors hover:text-white"
        >
          &larr; Back to blog
        </Link>
        <article className="mt-8">
          {post.publishedAt && (
            <time className="text-sm text-gray-500">
              {formatDate(post.publishedAt)}
            </time>
          )}
          <h1 className="mt-2 text-3xl font-bold tracking-tight text-white sm:text-4xl">
            {post.title}
          </h1>
          <p className="mt-4 text-lg text-gray-400">{post.excerpt}</p>
          {post.coverImage && (
            <div className="relative mt-8 aspect-video overflow-hidden rounded-xl">
              <Image
                src={post.coverImage}
                alt={post.title}
                fill
                className="object-cover"
                sizes="(max-width: 768px) 100vw, 768px"
                priority
              />
            </div>
          )}
          <div className="mt-10">
            <BlogBody content={post.body} />
          </div>
        </article>
      </main>
      <SiteFooter />
    </div>
  )
}
