import Image from "next/image"
import Link from "next/link"
import { notFound } from "next/navigation"
import { prisma } from "@/lib/db"
import { GradientText } from "@/components/site/gradient-text"
import { SiteHeader } from "@/components/site/site-header"
import { SiteFooter } from "@/components/site/site-footer"
import { NebulaBackground } from "@/components/site/nebula-background"

export async function generateMetadata({
  params,
}: {
  params: Promise<{ slug: string }>
}) {
  const { slug } = await params
  const item = await prisma.portfolioItem.findUnique({
    where: { slug, status: "published" },
    select: { title: true, summary: true },
  })
  if (!item) return { title: "Not Found" }
  return {
    title: item.title,
    description: item.summary,
  }
}

export default async function WorkDetailPage({
  params,
}: {
  params: Promise<{ slug: string }>
}) {
  const { slug } = await params
  const item = await prisma.portfolioItem.findUnique({
    where: { slug, status: "published" },
  })
  if (!item) notFound()

  return (
    <div className="relative min-h-screen bg-cw-dark">
      <NebulaBackground />

      {/* Scrolling content */}
      <div className="relative z-10">
        <SiteHeader />

        <main className="mx-auto w-full max-w-3xl px-6 pb-24 pt-32 sm:px-8">
          <Link
            href="/work"
            className="mb-8 inline-flex items-center gap-1.5 text-sm font-medium text-gray-400 transition-colors hover:text-white"
          >
            <span aria-hidden>&larr;</span>
            Back to work
          </Link>

          <article className="rounded-2xl border border-white/10 bg-white/5 p-8 backdrop-blur-xl sm:p-10">
            <h1 className="text-3xl font-bold tracking-tight text-white sm:text-4xl">
              <GradientText subtle>{item.title}</GradientText>
            </h1>
            <p className="mt-4 text-lg leading-relaxed text-gray-400">
              {item.summary}
            </p>

            {item.imageUrl && (
              <div className="relative mt-8 aspect-video overflow-hidden rounded-xl">
                <Image
                  src={item.imageUrl}
                  alt={item.title}
                  fill
                  className="object-cover"
                  sizes="(max-width: 768px) 100vw, 768px"
                  priority
                />
              </div>
            )}

            <div className="mt-6 flex flex-wrap gap-2">
              {item.techStack.map((tag) => (
                <span
                  key={tag}
                  className="rounded-md bg-purple-600/80 px-2.5 py-1 text-xs font-semibold text-white"
                >
                  {tag}
                </span>
              ))}
            </div>

            {item.body && (
              <div className="mt-10 border-t border-white/10 pt-8 text-base leading-relaxed text-gray-300">
                {item.body.split("\n").map((paragraph, i) => (
                  <p key={i} className={i > 0 ? "mt-4" : ""}>
                    {paragraph}
                  </p>
                ))}
              </div>
            )}

            {item.externalUrl && (
              <div className="mt-10 border-t border-white/10 pt-8">
                <a
                  href={item.externalUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="group inline-flex items-center gap-2 rounded-full border border-white/15 bg-white/5 px-7 py-3 text-sm font-medium text-white backdrop-blur-md transition-all duration-300 hover:border-white/30 hover:bg-white/10"
                >
                  Visit site
                  <span className="inline-block transition-transform duration-300 group-hover:translate-x-1" aria-hidden>
                    &rsaquo;
                  </span>
                </a>
              </div>
            )}
          </article>
        </main>

        <SiteFooter />
      </div>
    </div>
  )
}
