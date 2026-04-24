import { FadeIn } from "@/components/site/animated-section";
import { NebulaBackdrop } from "@/components/site/nebula-backdrop";
import { PageEyebrow } from "@/components/site/page-eyebrow";
import { SiteFooter } from "@/components/site/site-footer";
import { SiteHeader } from "@/components/site/site-header";
import { StarButton } from "@/components/ui/star-button";
import { WorkFilter } from "@/components/site/work-filter";
import { prisma } from "@/lib/db";

export const metadata = {
  title: "Work",
  description: "Explore our portfolio of projects and case studies.",
};

const STATS = [
  { n: "6+ years", l: "Shipping production software" },
  { n: "Full-stack", l: "From UI to database" },
  { n: "< 24h", l: "Response time" },
  { n: "2+", l: "Open client slots" },
];

export default async function WorkPage() {
  const items = await prisma.portfolioItem.findMany({
    where: { status: "published" },
    orderBy: { sortOrder: "asc" },
  });

  const gridItems = items.map((item) => ({
    slug: item.slug,
    title: item.title,
    summary: item.summary,
    imageUrl: item.imageUrl,
    techStack: item.techStack,
  }));

  return (
    <div className="relative min-h-screen bg-cw-dark text-white">
      <NebulaBackdrop
        opacity={0.35}
        interactive={false}
        aurora={false}
        comets={false}
        constellations={false}
      />
      <div className="relative z-10">
        <SiteHeader />

        <main className="relative mx-auto w-full max-w-wide px-6 sm:px-10">
          <section className="relative py-20 sm:py-28">
            <FadeIn>
              <PageEyebrow>Selected work</PageEyebrow>
            </FadeIn>
            <FadeIn index={1}>
              <h1
                className="max-w-4xl text-5xl font-semibold leading-[1.03] tracking-tight text-white sm:text-6xl md:text-7xl"
                style={{ textWrap: "balance" }}
              >
                Products that did the{" "}
                <span
                  className="inline-block bg-clip-text pb-2 text-transparent"
                  style={{
                    backgroundImage:
                      "linear-gradient(90deg, #38bdf8 0%, #a855f7 50%, #ec4899 100%)",
                  }}
                >
                  thing they were built
                </span>{" "}
                to do.
              </h1>
            </FadeIn>
            <FadeIn index={2}>
              <p
                className="mt-6 max-w-xl text-base leading-relaxed text-gray-400 sm:text-lg"
                style={{ textWrap: "pretty" }}
              >
                A selection of engagements from the last few years. Quiet craft,
                measurable outcomes.
              </p>
            </FadeIn>

            <FadeIn index={3}>
              <div className="mt-12 grid grid-cols-2 gap-4 sm:grid-cols-4">
                {STATS.map((s) => (
                  <div
                    key={s.l}
                    className="rounded-2xl border border-white/10 bg-white/3 p-5 backdrop-blur-xl"
                  >
                    <p className="text-3xl font-semibold tracking-tight text-white">
                      {s.n}
                    </p>
                    <p className="mt-1 text-xs text-gray-400">{s.l}</p>
                  </div>
                ))}
              </div>
            </FadeIn>
          </section>

          <WorkFilter items={gridItems} />

          <section className="pb-24 pt-16">
            <FadeIn>
              <div className="relative overflow-hidden rounded-3xl border border-white/10 bg-white/2 p-12 sm:p-16">
                <div
                  className="pointer-events-none absolute inset-0"
                  style={{
                    background:
                      "radial-gradient(circle at 20% 20%, rgba(168,85,247,0.2), transparent 50%), radial-gradient(circle at 80% 80%, rgba(56,189,248,0.18), transparent 50%)",
                  }}
                />
                <div className="relative flex flex-col items-start justify-between gap-6 sm:flex-row sm:items-center">
                  <div>
                    <PageEyebrow>Have a project?</PageEyebrow>
                    <h2
                      className="text-3xl font-semibold tracking-tight text-white sm:text-4xl"
                      style={{ textWrap: "balance" }}
                    >
                      Let&apos;s make the next one.
                    </h2>
                  </div>
                  <StarButton href="/#contact">Start a project</StarButton>
                </div>
              </div>
            </FadeIn>
          </section>
        </main>

        <SiteFooter />
      </div>
    </div>
  );
}
