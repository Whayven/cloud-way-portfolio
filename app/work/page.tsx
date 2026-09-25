import { PageBackdrop } from "@/components/site/page-backdrop"
import { PageEyebrow } from "@/components/site/page-eyebrow"
import { Reveal } from "@/components/site/reveal"
import { SiteFooter } from "@/components/site/site-footer"
import { SiteHeader } from "@/components/site/site-header"
import { WorkFilter } from "@/components/site/work-filter"
import { StarButton } from "@/components/ui/star-button"
import { prisma } from "@/lib/db"

export const metadata = {
  title: "Work",
  description: "Explore our portfolio of projects and case studies.",
}

const STATS = [
  { n: "6+ years", l: "Shipping production software" },
  { n: "Full-stack", l: "From UI to database" },
  { n: "< 24h", l: "Response time" },
  { n: "2+", l: "Open client slots" },
]

/** Divider rules for the stat strip: 2 columns on mobile, 4 on desktop. */
function statCellClass(i: number) {
  const mobile = i % 2 === 0 ? "pl-0" : "border-l border-white/[0.08] pl-6"
  const desktop = i === 0 ? "" : "lg:border-l lg:border-white/[0.08] lg:pl-6"
  const row = i >= 2 ? "max-lg:border-t max-lg:border-white/[0.08]" : ""
  return `${mobile} ${desktop} ${row}`
}

export default async function WorkPage() {
  const items = await prisma.portfolioItem.findMany({
    where: { status: "published" },
    orderBy: { sortOrder: "asc" },
    select: { slug: true, title: true, summary: true, imageUrl: true, techStack: true },
  })

  return (
    <div className="relative min-h-screen overflow-x-clip bg-cw-dark text-white">
      <PageBackdrop />
      <div className="relative z-10">
        <SiteHeader />

        <main className="relative mx-auto w-full max-w-[85rem] px-6 sm:px-10">
          <section className="relative pb-16 pt-20 sm:pt-28">
            <div className="animate-[fade-up_0.9s_var(--ease-spring)_0.05s_both]">
              <PageEyebrow align="start" className="mb-7">
                Selected work
              </PageEyebrow>
            </div>
            <h1
              className="m-0 max-w-[62rem] font-semibold leading-none tracking-[-0.045em]"
              style={{ fontSize: "clamp(48px, 7vw, 96px)" }}
            >
              <span className="block pb-[0.04em]">
                <span className="block animate-[line-up_1.1s_var(--ease-spring)_0.15s_both]">
                  Products that did the
                </span>
              </span>
              <span className="block pb-[0.1em]">
                <span className="block animate-[line-up_1.1s_var(--ease-spring)_0.28s_both]">
                  <span className="text-shimmer">thing they were built</span> to do.
                </span>
              </span>
            </h1>
            <p
              className="mt-7 max-w-[34rem] text-lg leading-[1.65] text-gray-400 animate-[fade-up_1s_var(--ease-spring)_0.5s_both]"
              style={{ textWrap: "pretty" }}
            >
              A selection of engagements from the last few years. Quiet craft, measurable outcomes.
            </p>

            <div className="mt-14 grid grid-cols-2 border-y border-white/[0.08] lg:grid-cols-4">
              {STATS.map((s, i) => (
                <div
                  key={s.l}
                  className={`py-6 pr-6 animate-[fade-up_0.9s_var(--ease-spring)_both] ${statCellClass(i)}`}
                  style={{ animationDelay: `${0.65 + i * 0.1}s` }}
                >
                  <p className="text-[32px] font-semibold tracking-[-0.03em]">{s.n}</p>
                  <p className="mt-1 text-xs text-gray-400">{s.l}</p>
                </div>
              ))}
            </div>
          </section>

          <WorkFilter items={items} />

          <section className="pb-28 pt-24">
            <Reveal>
              <div className="relative overflow-hidden rounded-[28px] border border-white/10 bg-white/[0.02] px-8 py-12 sm:px-16 sm:py-14">
                <div className="pointer-events-none absolute -right-[120px] top-1/2 -mt-[210px] h-[420px] w-[420px] rounded-full border border-white/[0.08] motion-safe:animate-[spin_40s_linear_infinite]">
                  <span className="absolute -top-1 left-1/2 -ml-1 h-2 w-2 rounded-full bg-purple-300 shadow-[0_0_14px_#a855f7]" />
                </div>
                <div
                  className="pointer-events-none absolute inset-0"
                  style={{
                    background:
                      "radial-gradient(circle at 20% 20%, rgba(168,85,247,0.2), transparent 50%), radial-gradient(circle at 80% 80%, rgba(56,189,248,0.18), transparent 50%)",
                  }}
                />
                <div className="relative flex flex-wrap items-center justify-between gap-6">
                  <div>
                    <PageEyebrow align="start" className="mb-[18px]">
                      Have a project?
                    </PageEyebrow>
                    <h2
                      className="font-semibold tracking-[-0.035em] text-white"
                      style={{ fontSize: "clamp(30px, 3.4vw, 44px)" }}
                    >
                      Let&apos;s make the next one.
                    </h2>
                  </div>
                  <StarButton href="/#contact" pill>
                    Start a project
                  </StarButton>
                </div>
              </div>
            </Reveal>
          </section>
        </main>

        <SiteFooter />
      </div>
    </div>
  )
}
