import Link from "next/link"
import { notFound } from "next/navigation"
import {
  CircleStackIcon,
  CloudIcon,
  CodeBracketIcon,
  CpuChipIcon,
  CubeIcon,
  PaintBrushIcon,
} from "@heroicons/react/24/outline"
import { BackLink } from "@/components/site/back-link"
import { CaseHeroMock } from "@/components/site/case-hero-mock"
import { PageBackdrop } from "@/components/site/page-backdrop"
import { PageEyebrow } from "@/components/site/page-eyebrow"
import { Reveal } from "@/components/site/reveal"
import { SiteFooter } from "@/components/site/site-footer"
import { SiteHeader } from "@/components/site/site-header"
import { StarButton } from "@/components/ui/star-button"
import { workGradient } from "@/lib/cover-art"
import { prisma } from "@/lib/db"
import { TECH_CATEGORIES, techCategory, techKind, type TechKind } from "@/lib/tech"

const TECH_ICONS: Record<TechKind, typeof CubeIcon> = {
  framework: CubeIcon,
  styling: PaintBrushIcon,
  language: CodeBracketIcon,
  data: CircleStackIcon,
  cloud: CloudIcon,
  other: CpuChipIcon,
}

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
  const [item, siblings] = await Promise.all([
    prisma.portfolioItem.findUnique({
      where: { slug, status: "published" },
    }),
    prisma.portfolioItem.findMany({
      where: { status: "published" },
      orderBy: { sortOrder: "asc" },
      select: { slug: true, title: true },
    }),
  ])
  if (!item) notFound()

  const idx = siblings.findIndex((s) => s.slug === item.slug)
  const next = siblings.length > 1 ? siblings[(idx + 1) % siblings.length] : null

  const year = String((item.publishedAt ?? item.createdAt).getFullYear())
  const paragraphs = (item.body ?? item.summary).split("\n").filter((p) => p.trim())
  const groups = TECH_CATEGORIES.map((c) => ({
    ...c,
    items: item.techStack.filter((t) => techCategory(t) === c.key),
  })).filter((g) => g.items.length > 0)

  const meta: { k: string; v: React.ReactNode }[] = [
    { k: "Shipped", v: year },
    { k: "Stack", v: item.techStack.slice(0, 3).join(" · ") || "—" },
    { k: "Role", v: "Design & engineering" },
  ]
  if (item.externalUrl) {
    meta.push({
      k: "Live",
      v: (
        <a
          href={item.externalUrl}
          target="_blank"
          rel="noopener noreferrer"
          className="text-purple-300 transition-colors hover:text-white"
        >
          Visit site ↗
        </a>
      ),
    })
  }

  return (
    <div className="relative min-h-screen overflow-x-clip bg-cw-dark text-white">
      <PageBackdrop />
      <div className="relative z-10">
        <SiteHeader />

        <main className="relative mx-auto w-full max-w-[85rem] px-6 sm:px-10">
          <div className="pt-10">
            <BackLink href="/work">All work</BackLink>
          </div>

          <section className="relative pb-14 pt-16">
            <div className="flex flex-wrap items-center gap-3 text-[10px] font-medium uppercase tracking-[0.3em] text-white/40 animate-[fade-up_0.9s_var(--ease-spring)_0.05s_both]">
              <span>Case study</span>
              <span className="h-px w-5 bg-white/20" />
              <span>{year}</span>
              {item.techStack[0] && (
                <>
                  <span className="h-px w-5 bg-white/20" />
                  <span>{item.techStack[0]}</span>
                </>
              )}
            </div>
            <h1
              className="mt-5 pb-[0.08em] font-semibold leading-none tracking-[-0.05em]"
              style={{ fontSize: "clamp(56px, 9vw, 128px)", overflowWrap: "anywhere" }}
            >
              <span className="block animate-[line-up_1.1s_var(--ease-spring)_0.15s_both]">
                {item.title}
              </span>
            </h1>
            <p
              className="mt-5 max-w-[40rem] text-[19px] leading-[1.65] text-gray-400 animate-[fade-up_1s_var(--ease-spring)_0.4s_both]"
              style={{ textWrap: "pretty" }}
            >
              {item.summary}
            </p>
            <dl className="mt-12 grid grid-cols-[repeat(auto-fit,minmax(180px,1fr))] gap-px overflow-hidden rounded-[18px] border border-white/10 bg-white/[0.06]">
              {meta.map((m, i) => (
                <div
                  key={m.k}
                  className="bg-cw-dark/90 p-5 animate-[fade-up_0.8s_var(--ease-spring)_both]"
                  style={{ animationDelay: `${0.55 + i * 0.08}s` }}
                >
                  <dt className="text-[10px] font-medium uppercase tracking-[0.25em] text-white/40">
                    {m.k}
                  </dt>
                  <dd className="mt-2 text-sm font-medium text-white">{m.v}</dd>
                </div>
              ))}
            </dl>
          </section>

          <Reveal>
            <CaseHeroMock imageUrl={item.imageUrl} title={item.title} />
          </Reveal>

          <section className="pb-20 pt-28">
            <div className="grid grid-cols-1 gap-10 md:grid-cols-3">
              <Reveal>
                <PageEyebrow align="start" className="mb-0">
                  The brief
                </PageEyebrow>
              </Reveal>
              <Reveal index={1} className="flex flex-col gap-6 md:col-span-2">
                {paragraphs.map((p, i) => (
                  <p
                    key={i}
                    className="leading-[1.55] tracking-[-0.015em] text-gray-200"
                    style={{ fontSize: "clamp(20px, 2vw, 26px)", textWrap: "pretty" }}
                  >
                    {p}
                  </p>
                ))}
              </Reveal>
            </div>
          </section>

          {groups.length > 0 && (
            <section className="pb-20 pt-10">
              <Reveal className="mb-10">
                <PageEyebrow align="start" className="mb-[18px]">
                  Under the hood
                </PageEyebrow>
                <h2
                  className="font-semibold tracking-[-0.035em]"
                  style={{ fontSize: "clamp(34px, 3.6vw, 48px)" }}
                >
                  The stack.
                </h2>
              </Reveal>
              <div className="grid grid-cols-[repeat(auto-fit,minmax(min(100%,300px),1fr))] gap-4">
                {groups.map((g, i) => (
                  <Reveal key={g.key} index={i + 1}>
                    <div className="h-full rounded-[22px] border border-white/10 bg-white/[0.025] p-7">
                      <p className="text-[10px] font-medium uppercase tracking-[0.3em] text-white/40">
                        {g.label}
                      </p>
                      <ul className="mt-[18px] flex flex-col">
                        {g.items.map((t) => {
                          const Icon = TECH_ICONS[techKind(t)]
                          return (
                            <li
                              key={t}
                              className="flex items-center gap-3 border-t border-white/5 py-3 transition-transform duration-300 hover:translate-x-1"
                            >
                              <span className="flex h-9 w-9 shrink-0 items-center justify-center rounded-[10px] border border-white/10 bg-white/[0.04] text-purple-300/85">
                                <Icon className="h-4 w-4" strokeWidth={1.75} aria-hidden />
                              </span>
                              <span className="text-sm font-medium">{t}</span>
                            </li>
                          )
                        })}
                      </ul>
                    </div>
                  </Reveal>
                ))}
              </div>
            </section>
          )}

          <section className="pb-28 pt-6">
            <div className="grid grid-cols-[repeat(auto-fit,minmax(min(100%,380px),1fr))] gap-4">
              {next && (
                <Reveal>
                  <Link
                    href={`/work/${next.slug}`}
                    className="group relative block h-full min-h-[220px] overflow-hidden rounded-[28px] border border-white/10 p-10 transition-colors duration-400 hover:border-white/25"
                  >
                    <div
                      className="absolute inset-0 transition-transform duration-[1400ms] ease-(--ease-spring) group-hover:scale-110"
                      style={{ background: workGradient(next.slug) }}
                    />
                    <div className="absolute inset-0 bg-linear-to-r from-cw-dark/85 to-cw-dark/30" />
                    <div className="relative flex h-full flex-col justify-between gap-10">
                      <p className="text-[10px] font-medium uppercase tracking-[0.3em] text-white/50">
                        Next case study
                      </p>
                      <div className="flex items-end justify-between gap-4">
                        <h3
                          className="font-semibold tracking-[-0.035em]"
                          style={{ fontSize: "clamp(32px, 3.4vw, 44px)" }}
                        >
                          {next.title}
                        </h3>
                        <svg
                          className="h-7 w-7 shrink-0 transition-transform duration-400 ease-(--ease-spring) group-hover:translate-x-1.5"
                          viewBox="0 0 24 24"
                          fill="none"
                          stroke="currentColor"
                          strokeWidth="1.75"
                          aria-hidden
                        >
                          <path strokeLinecap="round" strokeLinejoin="round" d="M13.5 4.5 21 12m0 0-7.5 7.5M21 12H3" />
                        </svg>
                      </div>
                    </div>
                  </Link>
                </Reveal>
              )}
              <Reveal index={next ? 1 : 0}>
                <div className="relative flex h-full flex-col justify-between gap-8 overflow-hidden rounded-[28px] border border-white/10 bg-white/[0.02] p-10">
                  <div
                    className="pointer-events-none absolute inset-0"
                    style={{
                      background:
                        "radial-gradient(circle at 80% 20%, rgba(168,85,247,0.2), transparent 50%), radial-gradient(circle at 20% 80%, rgba(56,189,248,0.18), transparent 50%)",
                    }}
                  />
                  <div className="relative">
                    <PageEyebrow align="start" className="mb-4">
                      Similar engagement?
                    </PageEyebrow>
                    <h2
                      className="font-semibold tracking-[-0.035em]"
                      style={{ fontSize: "clamp(28px, 3vw, 38px)" }}
                    >
                      Let&apos;s talk about yours.
                    </h2>
                  </div>
                  <div className="relative">
                    <StarButton href="/#contact" pill arrow={false}>
                      Start a project
                    </StarButton>
                  </div>
                </div>
              </Reveal>
            </div>
          </section>
        </main>

        <SiteFooter />
      </div>
    </div>
  )
}
