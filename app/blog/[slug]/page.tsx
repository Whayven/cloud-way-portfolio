import Image from "next/image";
import Link from "next/link";
import { notFound } from "next/navigation";
import { ArticleShareRail } from "@/components/site/article-share-rail";
import { ArticleToc } from "@/components/site/article-toc";
import { FadeIn } from "@/components/site/animated-section";
import { NebulaBackdrop } from "@/components/site/nebula-backdrop";
import { ReadingProgress } from "@/components/site/reading-progress";
import { SiteFooter } from "@/components/site/site-footer";
import { SiteHeader } from "@/components/site/site-header";
import { prisma } from "@/lib/db";
import { ContentStatus } from "@/lib/generated/prisma/client";
import { extractH2Headings, formatDate, readingTime } from "@/lib/utils";
import { BlogBody } from "./blog-body";

export async function generateMetadata({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;
  const post = await prisma.blogPost.findUnique({
    where: { slug, status: ContentStatus.published },
    select: { title: true, excerpt: true },
  });
  if (!post) return { title: "Post Not Found" };
  return {
    title: post.title,
    description: post.excerpt,
  };
}

export default async function BlogPostPage({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;
  const post = await prisma.blogPost.findUnique({
    where: { slug, status: ContentStatus.published },
  });
  if (!post) notFound();

  const toc = extractH2Headings(post.body);
  const readMinutes = readingTime(post.body);

  return (
    <div className="relative min-h-screen bg-cw-dark text-white">
      <ReadingProgress />
      <NebulaBackdrop
        opacity={0.3}
        interactive={false}
        aurora={false}
        comets={false}
        constellations={false}
      />
      <div className="relative z-10">
        <SiteHeader />

        <main className="relative mx-auto w-full max-w-wide px-6 sm:px-10">
          {/* Back */}
          <div className="pt-10">
            <Link
              href="/blog"
              className="group inline-flex items-center gap-2 text-xs font-medium uppercase tracking-[0.25em] text-white/50 transition-colors hover:text-white"
            >
              <svg
                className="h-3.5 w-3.5 transition-transform group-hover:-translate-x-0.5"
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                strokeWidth="2"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  d="M10.5 19.5 3 12m0 0 7.5-7.5M3 12h18"
                />
              </svg>
              All articles
            </Link>
          </div>

          {/* Header */}
          <header className="mx-auto max-w-3xl pt-16">
            <FadeIn>
              <div className="flex flex-wrap items-center gap-3 text-[10px] font-medium uppercase tracking-[0.3em] text-white/40">
                <span className="whitespace-nowrap rounded-full bg-purple-500/15 px-2.5 py-1 text-purple-300">
                  Article
                </span>
                {post.publishedAt && (
                  <span className="whitespace-nowrap">
                    {formatDate(post.publishedAt)}
                  </span>
                )}
                <span className="h-px w-5 bg-white/20" />
                <span className="whitespace-nowrap">
                  {readMinutes} min read
                </span>
              </div>
            </FadeIn>
            <FadeIn index={1}>
              <h1
                className="mt-5 text-4xl font-semibold leading-[1.1] tracking-tight sm:text-5xl md:text-[3.5rem]"
                style={{ textWrap: "balance" }}
              >
                {post.title}
              </h1>
            </FadeIn>
            <FadeIn index={2}>
              <p
                className="mt-5 text-lg leading-relaxed text-gray-400"
                style={{ textWrap: "pretty" }}
              >
                {post.excerpt}
              </p>
            </FadeIn>
            <FadeIn index={3}>
              <div className="mt-8 flex items-center gap-3 border-t border-white/10 pt-6">
                <span
                  className="flex h-10 w-10 items-center justify-center rounded-full text-xs font-semibold"
                  style={{
                    background: "linear-gradient(135deg, #a855f7, #ec4899)",
                  }}
                >
                  WF
                </span>
                <div>
                  <p className="text-sm font-semibold text-white">
                    Wayne Foster Jr
                  </p>
                  <p className="text-xs text-white/50">Full-stack developer</p>
                </div>
              </div>
            </FadeIn>
          </header>

          {/* Cover */}
          <div className="mx-auto mt-12 max-w-4xl">
            <FadeIn>
              <figure className="relative overflow-hidden rounded-3xl border border-white/10 bg-white/2">
                <div className="relative aspect-21/10">
                  {post.coverImage ? (
                    <Image
                      src={post.coverImage}
                      alt={post.title}
                      fill
                      sizes="(max-width: 768px) 100vw, 960px"
                      priority
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
                          backgroundImage:
                            "radial-gradient(rgba(255,255,255,0.25) 1px, transparent 1px)",
                          backgroundSize: "28px 28px",
                        }}
                      />
                    </>
                  )}
                  <div className="absolute inset-0 bg-linear-to-t from-cw-dark/70 via-transparent to-transparent" />
                </div>
              </figure>
            </FadeIn>
          </div>

          {/* Article body + rails */}
          <div className="mx-auto mt-16 grid max-w-312 grid-cols-1 gap-10 lg:grid-cols-[auto_minmax(0,42rem)_auto] lg:gap-14">
            <ArticleShareRail title={post.title} />

            <article className="mx-auto w-full max-w-2xl">
              <BlogBody content={post.body} />

              {/* Author card */}
              <section className="mt-16 rounded-2xl border border-white/10 bg-white/2 p-6">
                <div className="flex items-start gap-4">
                  <span
                    className="flex h-14 w-14 shrink-0 items-center justify-center rounded-full text-sm font-semibold"
                    style={{
                      background: "linear-gradient(135deg, #a855f7, #ec4899)",
                    }}
                  >
                    WF
                  </span>
                  <div>
                    <p className="text-sm font-semibold text-white">
                      Wayne Foster Jr
                    </p>
                    <p className="text-xs text-white/50">
                      Full-stack developer
                    </p>
                    <p className="mt-3 text-sm leading-relaxed text-gray-400">
                      Full-stack applications, AI features, and cloud
                      architecture — my notes on the software I build day to
                      day, and my journey as a developer.
                    </p>
                  </div>
                </div>
              </section>

              {/* All articles */}
              <div className="mt-12 mb-6 text-center">
                <Link
                  href="/blog"
                  className="inline-flex items-center gap-2 text-sm font-medium text-purple-300 transition-colors hover:text-white"
                >
                  <svg
                    className="h-4 w-4"
                    viewBox="0 0 24 24"
                    fill="none"
                    stroke="currentColor"
                    strokeWidth="2"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      d="M10.5 19.5 3 12m0 0 7.5-7.5M3 12h18"
                    />
                  </svg>
                  All articles
                </Link>
              </div>
            </article>

            <ArticleToc entries={toc} />
          </div>
        </main>

        <SiteFooter />
      </div>
    </div>
  );
}
