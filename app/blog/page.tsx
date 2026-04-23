import Image from "next/image"
import Link from "next/link"
import { BlogNewsletter } from "@/components/site/blog-newsletter"
import { FadeIn } from "@/components/site/animated-section"
import { NebulaBackdrop } from "@/components/site/nebula-backdrop"
import { PageEyebrow } from "@/components/site/page-eyebrow"
import { SiteFooter } from "@/components/site/site-footer"
import { SiteHeader } from "@/components/site/site-header"
import { prisma } from "@/lib/db"
import { ContentStatus } from "@/lib/generated/prisma/client"
import { formatDate } from "@/lib/utils"

export const metadata = {
  title: "Blog",
  description: "Field notes from CloudWay — practical essays on software, cloud, and AI.",
}

const GRADIENTS = [
  "radial-gradient(circle at 25% 25%, rgba(168,85,247,0.6), transparent 55%), radial-gradient(circle at 75% 75%, rgba(56,189,248,0.55), transparent 55%)",
  "radial-gradient(circle at 50% 30%, rgba(236,72,153,0.55), transparent 55%), radial-gradient(circle at 50% 80%, rgba(99,102,241,0.55), transparent 55%)",
  "radial-gradient(circle at 30% 70%, rgba(52,211,153,0.55), transparent 55%), radial-gradient(circle at 70% 20%, rgba(168,85,247,0.5), transparent 55%)",
  "radial-gradient(circle at 70% 30%, rgba(56,189,248,0.55), transparent 55%), radial-gradient(circle at 30% 80%, rgba(236,72,153,0.5), transparent 55%)",
  "radial-gradient(circle at 20% 60%, rgba(251,191,36,0.5), transparent 55%), radial-gradient(circle at 80% 40%, rgba(168,85,247,0.5), transparent 55%)",
]

function gradientFor(slug: string) {
  let h = 0
  for (let i = 0; i < slug.length; i++) h = (h * 31 + slug.charCodeAt(i)) | 0
  return GRADIENTS[Math.abs(h) % GRADIENTS.length]
}

type PostSummary = {
  slug: string
  title: string
  excerpt: string
  coverImage: string | null
  publishedAt: Date | null
}

function CoverArt({ post, priority = false }: { post: PostSummary; priority?: boolean }) {
  return (
    <div className="relative h-full w-full overflow-hidden">
      {post.coverImage ? (
        <Image
          src={post.coverImage}
          alt={post.title}
          fill
          sizes="(max-width: 768px) 100vw, 50vw"
          priority={priority}
          className="object-cover transition-transform duration-[1200ms] ease-out group-hover:scale-110"
        />
      ) : (
        <div
          className="absolute inset-0 transition-transform duration-[1200ms] ease-out group-hover:scale-110"
          style={{ background: gradientFor(post.slug) }}
        />
      )}
      <div
        className="pointer-events-none absolute inset-0 opacity-30"
        style={{
          backgroundImage: "radial-gradient(rgba(255,255,255,0.25) 1px, transparent 1px)",
          backgroundSize: "24px 24px",
        }}
      />
      <div className="absolute inset-0 bg-linear-to-t from-cw-dark/70 via-transparent to-transparent" />
    </div>
  )
}

function FeaturedPost({ post }: { post: PostSummary }) {
  return (
    <Link
      href={`/blog/${post.slug}`}
      className="group relative block overflow-hidden rounded-3xl border border-white/10 bg-white/[0.03] transition-all duration-500 hover:border-white/25"
    >
      <div className="grid grid-cols-1 md:grid-cols-[1.2fr_1fr]">
        <div className="relative aspect-[16/10] md:aspect-auto">
          <CoverArt post={post} priority />
        </div>
        <div className="flex flex-col justify-center p-8 sm:p-10 md:p-12">
          <div className="flex flex-wrap items-center gap-3 text-[10px] font-medium uppercase tracking-[0.3em] text-white/40">
            <span className="inline-flex items-center gap-1.5 whitespace-nowrap rounded-full bg-purple-500/15 px-2.5 py-1 text-purple-300">
              ★ Featured
            </span>
            {post.publishedAt && (
              <span className="whitespace-nowrap">{formatDate(post.publishedAt)}</span>
            )}
          </div>
          <h2
            className="mt-4 text-3xl font-semibold leading-tight tracking-tight text-white sm:text-4xl"
            style={{ textWrap: "balance" }}
          >
            {post.title}
          </h2>
          <p
            className="mt-4 text-base leading-relaxed text-gray-400"
            style={{ textWrap: "pretty" }}
          >
            {post.excerpt}
          </p>
          <div className="mt-6 flex items-center justify-between gap-4">
            <div className="flex items-center gap-3">
              <span
                className="h-8 w-8 rounded-full"
                style={{ background: "linear-gradient(135deg, #a855f7, #ec4899)" }}
              />
              <div>
                <p className="text-xs font-semibold text-white">CloudWay Studio</p>
                <p className="text-[10px] text-gray-500">Field notes</p>
              </div>
            </div>
            <span className="inline-flex items-center gap-1.5 whitespace-nowrap text-sm font-medium text-purple-300 transition-colors group-hover:text-white">
              Read article
              <svg
                className="h-4 w-4 transition-transform group-hover:translate-x-0.5"
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                strokeWidth="2"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  d="M13.5 4.5 21 12m0 0-7.5 7.5M21 12H3"
                />
              </svg>
            </span>
          </div>
        </div>
      </div>
    </Link>
  )
}

function PostCard({ post }: { post: PostSummary }) {
  return (
    <Link
      href={`/blog/${post.slug}`}
      className="group relative flex h-full flex-col overflow-hidden rounded-2xl border border-white/10 bg-white/[0.03] transition-all duration-500 hover:border-white/25"
    >
      <div className="relative aspect-[16/9]">
        <CoverArt post={post} />
      </div>
      <div className="flex flex-1 flex-col p-6">
        {post.publishedAt && (
          <time className="text-[10px] font-medium uppercase tracking-[0.3em] text-white/40">
            {formatDate(post.publishedAt)}
          </time>
        )}
        <h3
          className="mt-3 text-lg font-semibold leading-snug tracking-tight text-white transition-colors group-hover:text-purple-200"
          style={{ textWrap: "balance" }}
        >
          {post.title}
        </h3>
        <p
          className="mt-2 flex-1 text-sm leading-relaxed text-gray-400"
          style={{ textWrap: "pretty" }}
        >
          {post.excerpt}
        </p>
        <span className="mt-5 inline-flex items-center gap-1 whitespace-nowrap text-xs font-medium text-purple-300 opacity-0 transition-opacity group-hover:opacity-100">
          Read
          <svg className="h-3 w-3" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              d="M13.5 4.5 21 12m0 0-7.5 7.5M21 12H3"
            />
          </svg>
        </span>
      </div>
    </Link>
  )
}

export default async function BlogPage() {
  const posts = await prisma.blogPost.findMany({
    where: {
      status: ContentStatus.published,
      publishedAt: { not: null },
    },
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
    <div className="relative min-h-screen bg-cw-dark text-white">
      <NebulaBackdrop opacity={0.35} interactive={false} />
      <div className="relative z-10">
        <SiteHeader />

        <main className="relative mx-auto w-full max-w-[85rem] px-6 sm:px-10">
          <section className="py-20 sm:py-28">
            <FadeIn>
              <PageEyebrow>Field notes</PageEyebrow>
            </FadeIn>
            <FadeIn index={1}>
              <div className="flex flex-col items-start justify-between gap-8 md:flex-row md:items-end">
                <h1
                  className="max-w-3xl text-5xl font-semibold leading-[1.03] tracking-tight text-white sm:text-6xl md:text-7xl"
                  style={{ textWrap: "balance" }}
                >
                  Notes from the{" "}
                  <span
                    className="inline-block bg-clip-text text-transparent"
                    style={{
                      backgroundImage:
                        "linear-gradient(90deg, #38bdf8 0%, #a855f7 50%, #ec4899 100%)",
                    }}
                  >
                    working
                  </span>{" "}
                  studio.
                </h1>
                <p
                  className="max-w-sm text-base leading-relaxed text-gray-400"
                  style={{ textWrap: "pretty" }}
                >
                  Practical essays on software, cloud, AI, and the tools we actually use. Short.
                  Opinionated.
                </p>
              </div>
            </FadeIn>
          </section>

          {posts.length === 0 ? (
            <section className="pb-24">
              <div className="rounded-3xl border border-white/10 bg-white/[0.02] p-16 text-center">
                <p className="text-gray-400">No posts yet. Check back soon.</p>
              </div>
            </section>
          ) : (
            <>
              {featured && (
                <section className="pb-10">
                  <FadeIn>
                    <FeaturedPost post={featured} />
                  </FadeIn>
                </section>
              )}

              {rest.length > 0 && (
                <section className="pb-24">
                  <div className="grid grid-cols-1 gap-5 sm:grid-cols-2 lg:grid-cols-3">
                    {rest.map((post, i) => (
                      <FadeIn key={post.slug} index={i + 1}>
                        <PostCard post={post} />
                      </FadeIn>
                    ))}
                  </div>
                </section>
              )}
            </>
          )}

          <section className="pb-24">
            <FadeIn>
              <BlogNewsletter />
            </FadeIn>
          </section>
        </main>

        <SiteFooter />
      </div>
    </div>
  )
}
