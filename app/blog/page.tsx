import Image from "next/image"
import Link from "next/link"
import { AUTHOR, AuthorAvatar } from "@/components/site/author"
import { BlogNewsletter } from "@/components/site/blog-newsletter"
import { PageBackdrop } from "@/components/site/page-backdrop"
import { PageEyebrow } from "@/components/site/page-eyebrow"
import { Reveal } from "@/components/site/reveal"
import { SiteFooter } from "@/components/site/site-footer"
import { SiteHeader } from "@/components/site/site-header"
import { SpotlightLink } from "@/components/site/spotlight-link"
import { postGradient } from "@/lib/cover-art"
import { prisma } from "@/lib/db"
import { ContentStatus } from "@/lib/generated/prisma/client"
import { formatDate, readingMinutes } from "@/lib/utils"

export const metadata = {
  title: "Blog",
  description: "Field notes from CloudWay — practical essays on software, cloud, and AI.",
}

type PostSummary = {
  slug: string
  title: string
  excerpt: string
  coverImage: string | null
  publishedAt: Date | null
  minutes: number
}

function ArrowIcon({ className }: { className: string }) {
  return (
    <svg className={className} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" aria-hidden>
      <path strokeLinecap="round" strokeLinejoin="round" d="M13.5 4.5 21 12m0 0-7.5 7.5M21 12H3" />
    </svg>
  )
}

function CoverArt({ post, priority = false }: { post: PostSummary; priority?: boolean }) {
  return (
    <>
      <div className="absolute inset-0 transition-transform duration-[1200ms] ease-out group-hover:scale-110">
        {post.coverImage ? (
          <Image
            src={post.coverImage}
            alt=""
            fill
            sizes="(max-width: 768px) 100vw, 50vw"
            priority={priority}
            className="object-cover"
          />
        ) : (
          <div className="absolute inset-0" style={{ background: postGradient(post.slug) }} />
        )}
      </div>
      <div
        className="pointer-events-none absolute inset-0 opacity-30"
        style={{
          backgroundImage: "radial-gradient(rgba(255,255,255,0.25) 1px, transparent 1px)",
          backgroundSize: "24px 24px",
        }}
      />
    </>
  )
}

function FeaturedPost({ post }: { post: PostSummary }) {
  return (
    <SpotlightLink
      href={`/blog/${post.slug}`}
      className="group relative grid grid-cols-[repeat(auto-fit,minmax(min(100%,420px),1fr))] overflow-hidden rounded-[28px] border border-white/10 bg-white/[0.03] transition-colors duration-500 hover:border-white/25"
    >
      <div className="relative min-h-[340px] overflow-hidden">
        <CoverArt post={post} priority />
        <div className="pointer-events-none absolute left-1/2 top-1/2 -ml-[110px] -mt-[110px] h-[220px] w-[220px] rounded-full border border-white/[0.18] motion-safe:animate-[spin_30s_linear_infinite]">
          <span className="absolute -top-1 left-1/2 -ml-1 h-2 w-2 rounded-full bg-white shadow-[0_0_14px_#fff,0_0_30px_#a855f7]" />
        </div>
        <div
          className="pointer-events-none absolute inset-0 opacity-0 transition-opacity duration-400 group-hover:opacity-100"
          style={{
            background:
              "radial-gradient(400px circle at var(--mx, 50%) var(--my, 50%), rgba(255,255,255,0.16), transparent 50%)",
          }}
        />
      </div>
      <div className="flex flex-col justify-center p-8 sm:p-12">
        <div className="flex flex-wrap items-center gap-3 text-[10px] font-medium uppercase tracking-[0.3em] text-white/40">
          <span className="inline-flex items-center gap-1.5 whitespace-nowrap rounded-full bg-purple-500/15 px-2.5 py-1 text-purple-300">
            ★ Featured
          </span>
          {post.publishedAt && <time className="whitespace-nowrap">{formatDate(post.publishedAt)}</time>}
          <span className="h-px w-4 bg-white/20" />
          <span className="whitespace-nowrap">{post.minutes} min read</span>
        </div>
        <h2
          className="mt-[18px] font-semibold leading-[1.12] tracking-[-0.035em] text-white"
          style={{ fontSize: "clamp(28px, 3vw, 40px)", textWrap: "balance" }}
        >
          {post.title}
        </h2>
        <p className="mt-4 text-base leading-[1.65] text-gray-400" style={{ textWrap: "pretty" }}>
          {post.excerpt}
        </p>
        <div className="mt-7 flex items-center justify-between gap-4">
          <div className="flex items-center gap-3">
            <AuthorAvatar className="h-[34px] w-[34px] text-[11px]" />
            <div>
              <p className="text-xs font-semibold text-white">{AUTHOR.name}</p>
              <p className="text-[10px] text-gray-500">{AUTHOR.role}</p>
            </div>
          </div>
          <span className="inline-flex items-center gap-1.5 whitespace-nowrap text-sm font-medium text-purple-300">
            Read article
            <ArrowIcon className="h-4 w-4 transition-transform duration-300 group-hover:translate-x-1" />
          </span>
        </div>
      </div>
    </SpotlightLink>
  )
}

function PostCard({ post }: { post: PostSummary }) {
  return (
    <Link
      href={`/blog/${post.slug}`}
      className="group relative flex h-full flex-col overflow-hidden rounded-[22px] border border-white/10 bg-white/[0.03] transition-[border-color,translate] duration-500 ease-(--ease-spring) hover:-translate-y-1 hover:border-white/25"
    >
      <div className="relative aspect-video overflow-hidden">
        <CoverArt post={post} />
        <div className="absolute inset-0 bg-linear-to-t from-cw-dark/70 to-transparent to-60%" />
      </div>
      <div className="flex flex-1 flex-col p-6">
        <p className="text-[10px] font-medium uppercase tracking-[0.3em] text-white/40">
          {post.publishedAt && <time>{formatDate(post.publishedAt)}</time>}
          {post.publishedAt && " · "}
          {post.minutes} min
        </p>
        <h3
          className="mt-3 text-[19px] font-semibold leading-[1.3] tracking-[-0.02em] text-white"
          style={{ textWrap: "balance" }}
        >
          {post.title}
        </h3>
        <p
          className="mt-2 flex-1 text-sm leading-[1.65] text-gray-400"
          style={{ textWrap: "pretty" }}
        >
          {post.excerpt}
        </p>
        <span className="mt-5 inline-flex items-center gap-1 text-xs font-medium text-purple-300 opacity-40 transition-opacity duration-300 group-hover:opacity-100">
          Read
          <ArrowIcon className="h-3 w-3 transition-transform duration-300 group-hover:translate-x-1" />
        </span>
      </div>
    </Link>
  )
}

export default async function BlogPage() {
  const rows = await prisma.blogPost.findMany({
    where: {
      status: ContentStatus.published,
      publishedAt: { not: null },
    },
    orderBy: { publishedAt: "desc" },
    select: {
      slug: true,
      title: true,
      excerpt: true,
      body: true,
      coverImage: true,
      publishedAt: true,
    },
  })

  const posts: PostSummary[] = rows.map(({ body, ...p }) => ({ ...p, minutes: readingMinutes(body) }))
  const [featured, ...rest] = posts

  return (
    <div className="relative min-h-screen overflow-x-clip bg-cw-dark text-white">
      <PageBackdrop />
      <div className="relative z-10">
        <SiteHeader />

        <main className="relative mx-auto w-full max-w-[85rem] px-6 sm:px-10">
          <section className="pb-16 pt-20 sm:pt-28">
            <div className="animate-[fade-up_0.9s_var(--ease-spring)_0.05s_both]">
              <PageEyebrow align="start" className="mb-7">
                Field notes
              </PageEyebrow>
            </div>
            <div className="flex flex-wrap items-end justify-between gap-8">
              <h1
                className="min-w-0 max-w-[52rem] flex-[1_1_32rem] font-semibold leading-none tracking-[-0.045em]"
                style={{ fontSize: "clamp(48px, 7vw, 96px)" }}
              >
                <span className="block pb-[0.04em]">
                  <span className="block animate-[line-up_1.1s_var(--ease-spring)_0.15s_both]">
                    Notes from the
                  </span>
                </span>
                <span className="block pb-[0.1em]">
                  <span className="block animate-[line-up_1.1s_var(--ease-spring)_0.28s_both]">
                    <span className="text-shimmer">working</span> studio.
                  </span>
                </span>
              </h1>
              <p
                className="max-w-[22rem] text-base leading-[1.65] text-gray-400 animate-[fade-up_1s_var(--ease-spring)_0.5s_both]"
                style={{ textWrap: "pretty" }}
              >
                Practical essays on software, cloud, AI, and the tools we actually use. Short.
                Opinionated.
              </p>
            </div>
          </section>

          {posts.length === 0 ? (
            <section className="pb-24">
              <div className="rounded-[28px] border border-white/10 bg-white/[0.02] p-16 text-center">
                <p className="text-gray-400">No posts yet. Check back soon.</p>
              </div>
            </section>
          ) : (
            <>
              <section className="pb-10">
                <Reveal>
                  <FeaturedPost post={featured} />
                </Reveal>
              </section>

              {rest.length > 0 && (
                <section className="pb-24">
                  <div className="grid grid-cols-[repeat(auto-fill,minmax(min(100%,300px),1fr))] gap-5">
                    {rest.map((post, i) => (
                      <Reveal key={post.slug} index={i + 1} className="h-full">
                        <PostCard post={post} />
                      </Reveal>
                    ))}
                  </div>
                </section>
              )}
            </>
          )}

          <section className="pb-28">
            <Reveal>
              <BlogNewsletter />
            </Reveal>
          </section>
        </main>

        <SiteFooter />
      </div>
    </div>
  )
}
