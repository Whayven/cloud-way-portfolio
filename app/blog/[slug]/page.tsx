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

      <main className="mx-auto w-full max-w-3xl px-6 pb-24 pt-20 sm:px-8 lg:px-10">
        {/* Back link */}
        <Link
          href="/blog"
          className="group inline-flex items-center gap-2 text-sm text-gray-500 transition-colors hover:text-white"
        >
          <span className="inline-block transition-transform duration-200 group-hover:-translate-x-0.5">&larr;</span>
          Back to blog
        </Link>

        <article className="mt-10">
          {/* Header */}
          <header>
            {post.publishedAt && (
              <time className="text-xs font-medium uppercase tracking-widest text-gray-500">
                {formatDate(post.publishedAt)}
              </time>
            )}
            <h1 className="mt-3 text-3xl font-bold leading-tight tracking-tight text-white sm:text-4xl lg:text-[2.75rem] lg:leading-tight">
              {post.title}
            </h1>
            <p className="mt-4 text-lg leading-relaxed text-gray-400">
              {post.excerpt}
            </p>
            <div className="mt-8 h-px bg-linear-to-r from-purple-400/30 via-white/10 to-transparent" />
          </header>

          {/* Cover image */}
          {post.coverImage && (
            <div className="relative mt-10 aspect-video overflow-hidden rounded-2xl border border-white/10">
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

          {/* Body */}
          <div className="mt-12">
            <BlogBody content={post.body} />
          </div>

          {/* Footer divider + back */}
          <div className="mt-16 h-px bg-linear-to-r from-purple-400/30 via-white/10 to-transparent" />
          <div className="mt-8">
            <Link
              href="/blog"
              className="group inline-flex items-center gap-2 text-sm font-medium text-purple-400 transition-colors hover:text-purple-300"
            >
              <span className="inline-block transition-transform duration-200 group-hover:-translate-x-0.5">&larr;</span>
              All articles
            </Link>
          </div>
        </article>
      </main>
      <SiteFooter />
    </div>
  )
}
