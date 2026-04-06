import Image from "next/image"
import Link from "next/link"
import { prisma } from "@/lib/db"
import { ContentStatus } from "@/lib/generated/prisma/client"
import { formatDate } from "@/lib/utils"
import { SiteHeader } from "@/components/site/site-header"
import { SiteFooter } from "@/components/site/site-footer"
import { GradientText } from "@/components/site/gradient-text"

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

  const [featured, ...rest] = posts

  return (
    <div className="min-h-screen bg-cw-dark">
      <SiteHeader />

      <main className="mx-auto w-full max-w-5xl px-6 pb-24 pt-20 sm:px-8 lg:px-10">
        {/* Page header */}
        <div className="mb-16">
          <h1 className="text-4xl font-bold tracking-tight sm:text-5xl">
            <GradientText subtle>Blog</GradientText>
          </h1>
          <div className="mt-4 flex items-center gap-4">
            <div className="h-px flex-1 bg-linear-to-r from-purple-400/40 to-transparent" />
          </div>
          <p className="mt-4 max-w-lg text-base leading-relaxed text-gray-400">
            Thoughts on software development, cloud architecture, and the tools
            we use to build modern web experiences.
          </p>
        </div>

        {posts.length === 0 ? (
          <div className="flex flex-col items-center justify-center py-32">
            <div className="h-px w-16 bg-purple-400/30" />
            <p className="mt-6 text-gray-500">No posts yet. Check back soon.</p>
          </div>
        ) : (
          <div className="space-y-16">
            {/* Featured post — full width with cover */}
            {featured && (
              <article>
                <Link
                  href={`/blog/${featured.slug}`}
                  className="group block"
                >
                  {featured.coverImage && (
                    <div className="relative aspect-[2.2/1] overflow-hidden rounded-2xl border border-white/10">
                      <Image
                        src={featured.coverImage}
                        alt={featured.title}
                        fill
                        className="object-cover transition-transform duration-700 ease-out group-hover:scale-[1.03]"
                        sizes="(max-width: 768px) 100vw, 960px"
                        priority
                      />
                      <div className="absolute inset-0 bg-linear-to-t from-cw-dark via-cw-dark/40 to-transparent" />
                      <div className="absolute inset-x-0 bottom-0 p-8 sm:p-10">
                        {featured.publishedAt && (
                          <time className="text-xs font-medium uppercase tracking-widest text-gray-400">
                            {formatDate(featured.publishedAt)}
                          </time>
                        )}
                        <h2 className="mt-2 text-2xl font-bold tracking-tight text-white transition-colors group-hover:text-purple-300 sm:text-3xl">
                          {featured.title}
                        </h2>
                        <p className="mt-3 max-w-2xl text-sm leading-relaxed text-gray-300">
                          {featured.excerpt}
                        </p>
                      </div>
                    </div>
                  )}
                  {!featured.coverImage && (
                    <div className="rounded-2xl border border-white/10 bg-white/[0.03] p-8 transition-colors duration-300 group-hover:border-purple-400/20 group-hover:bg-white/[0.06] sm:p-10">
                      {featured.publishedAt && (
                        <time className="text-xs font-medium uppercase tracking-widest text-gray-500">
                          {formatDate(featured.publishedAt)}
                        </time>
                      )}
                      <h2 className="mt-3 text-2xl font-bold tracking-tight text-white transition-colors group-hover:text-purple-300 sm:text-3xl">
                        {featured.title}
                      </h2>
                      <p className="mt-3 max-w-2xl text-base leading-relaxed text-gray-400">
                        {featured.excerpt}
                      </p>
                      <span className="mt-6 inline-flex items-center gap-2 text-sm font-medium text-purple-400 transition-colors group-hover:text-purple-300">
                        Read article
                        <span className="inline-block transition-transform duration-300 group-hover:translate-x-1">&rarr;</span>
                      </span>
                    </div>
                  )}
                </Link>
              </article>
            )}

            {/* Remaining posts — clean list */}
            {rest.length > 0 && (
              <div>
                <div className="mb-8 flex items-center gap-4">
                  <span className="text-xs font-medium uppercase tracking-widest text-gray-500">
                    More articles
                  </span>
                  <div className="h-px flex-1 bg-white/10" />
                </div>
                <div className="grid gap-6 sm:grid-cols-2">
                  {rest.map((post) => (
                    <article key={post.slug}>
                      <Link
                        href={`/blog/${post.slug}`}
                        className="group flex h-full flex-col rounded-xl border border-white/[0.07] bg-white/[0.02] p-6 transition-all duration-300 hover:border-purple-400/20 hover:bg-white/[0.05]"
                      >
                        {post.coverImage && (
                          <div className="relative -mx-6 -mt-6 mb-5 aspect-[2/1] overflow-hidden rounded-t-xl">
                            <Image
                              src={post.coverImage}
                              alt={post.title}
                              fill
                              className="object-cover transition-transform duration-500 group-hover:scale-105"
                              sizes="(max-width: 640px) 100vw, 480px"
                            />
                          </div>
                        )}
                        {post.publishedAt && (
                          <time className="text-xs font-medium uppercase tracking-widest text-gray-500">
                            {formatDate(post.publishedAt)}
                          </time>
                        )}
                        <h2 className="mt-2 text-lg font-semibold leading-snug text-white transition-colors group-hover:text-purple-300">
                          {post.title}
                        </h2>
                        <p className="mt-2 flex-1 text-sm leading-relaxed text-gray-400">
                          {post.excerpt}
                        </p>
                        <span className="mt-4 inline-flex items-center gap-2 text-sm font-medium text-purple-400 transition-colors group-hover:text-purple-300">
                          Read
                          <span className="inline-block transition-transform duration-300 group-hover:translate-x-1">&rarr;</span>
                        </span>
                      </Link>
                    </article>
                  ))}
                </div>
              </div>
            )}
          </div>
        )}
      </main>
      <SiteFooter />
    </div>
  )
}
