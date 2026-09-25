import Image from "next/image"
import Link from "next/link"
import { notFound } from "next/navigation"
import { ArticleShareRail } from "@/components/site/article-share-rail"
import { ArticleToc } from "@/components/site/article-toc"
import { AUTHOR, AuthorAvatar } from "@/components/site/author"
import { BackLink } from "@/components/site/back-link"
import { PageBackdrop } from "@/components/site/page-backdrop"
import { Reveal } from "@/components/site/reveal"
import { SiteFooter } from "@/components/site/site-footer"
import { SiteHeader } from "@/components/site/site-header"
import { prisma } from "@/lib/db"
import { ContentStatus } from "@/lib/generated/prisma/client"
import { formatDate, readingMinutes } from "@/lib/utils"
import { BlogBody } from "./blog-body"

const ARTICLE_ID = "article-body"

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

  const url = `https://cloud-way.dev/blog/${post.slug}`
  const minutes = readingMinutes(post.body)

  return (
    <div className="relative min-h-screen overflow-x-clip bg-cw-dark text-white">
      <PageBackdrop />
      <div className="relative z-10">
        <SiteHeader />

        <main className="relative mx-auto w-full max-w-[85rem] px-6 sm:px-10">
          <div className="pt-10">
            <BackLink href="/blog">All articles</BackLink>
          </div>

          <header className="mx-auto max-w-[48rem] pt-16">
            <div className="flex flex-wrap items-center gap-3 text-[10px] font-medium uppercase tracking-[0.3em] text-white/40 animate-[fade-up_0.9s_var(--ease-spring)_0.05s_both]">
              <span className="rounded-full bg-purple-500/15 px-2.5 py-1 text-purple-300">Article</span>
              {post.publishedAt && (
                <>
                  <time dateTime={post.publishedAt.toISOString()}>{formatDate(post.publishedAt)}</time>
                  <span className="h-px w-5 bg-white/20" />
                </>
              )}
              <span>{minutes} min read</span>
            </div>
            <h1
              className="mt-5 font-semibold leading-[1.08] tracking-[-0.035em] animate-[fade-up_1.1s_var(--ease-spring)_0.15s_both]"
              style={{ fontSize: "clamp(38px, 4.6vw, 58px)", textWrap: "balance" }}
            >
              {post.title}
            </h1>
            <p
              className="mt-5 text-lg leading-[1.65] text-gray-400 animate-[fade-up_1s_var(--ease-spring)_0.3s_both]"
              style={{ textWrap: "pretty" }}
            >
              {post.excerpt}
            </p>
            <div className="mt-8 flex items-center gap-3 border-t border-white/10 pt-6 animate-[fade-up_1s_var(--ease-spring)_0.45s_both]">
              <AuthorAvatar className="h-10 w-10 text-xs" />
              <div>
                <p className="text-sm font-semibold">{AUTHOR.name}</p>
                <p className="text-xs text-white/50">{AUTHOR.role}</p>
              </div>
            </div>
          </header>

          <Reveal className="mx-auto mt-12 max-w-[60rem]">
            <figure className="relative overflow-hidden rounded-[28px] border border-white/10">
              <div className="relative aspect-[16/10] sm:aspect-[21/10]">
                {post.coverImage ? (
                  <Image
                    src={post.coverImage}
                    alt=""
                    fill
                    priority
                    sizes="(max-width: 768px) 100vw, 60rem"
                    className="object-cover"
                  />
                ) : (
                  <>
                    <div
                      className="absolute inset-0"
                      style={{
                        background:
                          "radial-gradient(circle at 25% 25%, rgba(168,85,247,0.65), transparent 55%), radial-gradient(circle at 75% 75%, rgba(56,189,248,0.6), transparent 55%), radial-gradient(circle at 50% 100%, rgba(236,72,153,0.4), transparent 60%)",
                      }}
                    />
                    <div
                      className="pointer-events-none absolute inset-0 opacity-40"
                      style={{
                        backgroundImage: "radial-gradient(rgba(255,255,255,0.25) 1px, transparent 1px)",
                        backgroundSize: "28px 28px",
                      }}
                    />
                    <div className="pointer-events-none absolute left-1/2 top-1/2 -ml-[150px] -mt-[150px] h-[300px] w-[300px] rounded-full border border-white/15 motion-safe:animate-[spin_36s_linear_infinite]">
                      <span className="absolute -top-1 left-1/2 -ml-1 h-2 w-2 rounded-full bg-white shadow-[0_0_14px_#fff,0_0_30px_#a855f7]" />
                    </div>
                  </>
                )}
                <div className="absolute inset-0 bg-linear-to-t from-cw-dark/70 to-transparent to-55%" />
              </div>
            </figure>
          </Reveal>

          <div className="mx-auto mt-16 grid max-w-[78rem] grid-cols-[minmax(0,42rem)] justify-center gap-14 xl:grid-cols-[64px_minmax(0,42rem)_220px]">
            <aside className="hidden xl:block">
              <div className="sticky top-32">
                <ArticleShareRail url={url} title={post.title} />
              </div>
            </aside>

            <article id={ARTICLE_ID} className="min-w-0">
              <BlogBody content={post.body} />

              <div className="mt-12 xl:hidden">
                <ArticleShareRail url={url} title={post.title} layout="inline" />
              </div>

              <Reveal className="mt-16">
                <section className="flex items-start gap-4 rounded-[20px] border border-white/10 bg-white/[0.02] p-6">
                  <AuthorAvatar className="h-14 w-14 text-sm" />
                  <div>
                    <p className="text-sm font-semibold">{AUTHOR.name}</p>
                    <p className="text-xs text-white/50">{AUTHOR.role}</p>
                    <p className="mt-3 text-sm leading-[1.65] text-gray-400">{AUTHOR.bio}</p>
                  </div>
                </section>
              </Reveal>

              <div className="mb-6 mt-12 text-center">
                <Link
                  href="/blog"
                  className="inline-flex items-center gap-2 text-sm font-medium text-purple-300 transition-colors hover:text-white"
                >
                  <svg className="h-4 w-4" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" aria-hidden>
                    <path strokeLinecap="round" strokeLinejoin="round" d="M10.5 19.5 3 12m0 0 7.5-7.5M3 12h18" />
                  </svg>
                  All articles
                </Link>
              </div>
            </article>

            <aside className="hidden xl:block">
              <div className="sticky top-28">
                <ArticleToc articleId={ARTICLE_ID} />
              </div>
            </aside>
          </div>
        </main>

        <div className="mt-24">
          <SiteFooter />
        </div>
      </div>
    </div>
  )
}
