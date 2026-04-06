import Image from "next/image"
import Link from "next/link"
import { prisma } from "@/lib/db"
import { ContentStatus } from "@/lib/generated/prisma/client"
import { formatDate } from "@/lib/utils"
import { SiteHeader } from "@/components/site/site-header"
import { SiteFooter } from "@/components/site/site-footer"

export const metadata = {
  title: "Blog | CloudWay",
  description: "Insights on software development, AI, and cloud solutions.",
}

export default async function BlogPage() {
  const posts = await prisma.blogPost.findMany({
    where: { status: ContentStatus.published },
    orderBy: { publishedAt: "desc" },
    select: {
      slug: true,
      title: true,
      excerpt: true,
      coverImage: true,
      publishedAt: true,
    },
  })

  return (
    <div className="min-h-screen bg-cw-dark">
      <SiteHeader />
      <main className="mx-auto w-full max-w-4xl px-6 pb-24 pt-16 sm:px-8 lg:px-10">
        <h1 className="text-4xl font-bold tracking-tight text-white sm:text-5xl">
          Blog
        </h1>
        <p className="mt-4 text-lg text-gray-400">
          Insights on software development, AI, and cloud solutions.
        </p>

        <div className="mt-12 space-y-10">
          {posts.map((post) => (
            <article key={post.slug}>
              <Link
                href={`/blog/${post.slug}`}
                className="group block overflow-hidden rounded-2xl border border-white/10 bg-white/5 backdrop-blur-xl transition-all duration-300 hover:border-white/20 hover:bg-white/10"
              >
                {post.coverImage && (
                  <div className="relative aspect-[2.4/1] overflow-hidden">
                    <Image
                      src={post.coverImage}
                      alt={post.title}
                      fill
                      className="object-cover transition-transform duration-500 group-hover:scale-105"
                      sizes="(max-width: 768px) 100vw, 768px"
                    />
                  </div>
                )}
                <div className="p-6">
                {post.publishedAt && (
                  <time className="text-sm text-gray-500">
                    {formatDate(post.publishedAt)}
                  </time>
                )}
                <h2 className="mt-2 text-xl font-semibold text-white transition-colors group-hover:text-sky-400">
                  {post.title}
                </h2>
                <p className="mt-2 text-gray-400">{post.excerpt}</p>
                <span className="mt-4 inline-block text-sm font-medium text-sky-400">
                  Read more &rarr;
                </span>
                </div>
              </Link>
            </article>
          ))}
          {posts.length === 0 && (
            <p className="text-center text-gray-500">
              No posts yet. Check back soon!
            </p>
          )}
        </div>
      </main>
      <SiteFooter />
    </div>
  )
}
