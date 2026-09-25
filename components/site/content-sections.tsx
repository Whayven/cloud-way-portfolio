import Link from "next/link"
import { FaqAccordion } from "@/components/site/faq-accordion"
import { PageEyebrow } from "@/components/site/page-eyebrow"
import { PointerSurface } from "@/components/site/pointer-surface"
import { ProcessTimeline, type ProcessStep } from "@/components/site/process-timeline"
import { Reveal } from "@/components/site/reveal"
import { ScrollLitText } from "@/components/site/scroll-lit-text"
import { ServiceCard, type ServiceAccent } from "@/components/site/service-card"
import { WorkCard } from "@/components/site/work-card"
import { StarButton } from "@/components/ui/star-button"
import { prisma } from "@/lib/db"

const H2 = "font-semibold leading-[1.02] tracking-[-0.035em] text-white"
const H2_SIZE = { fontSize: "clamp(40px, 4.5vw, 60px)" }

const STAR_PATH =
  "M392.05 0c-20.9,210.08-184.06,378.41-392.05,407.78 207.96,29.37 371.12,197.68 392.05,407.74 20.93-210.06 184.09-378.37 392.05-407.74-207.98-29.38-371.16-197.69-392.06-407.78z"

/* ---------- Tech marquee ---------- */

const TECH = [
  "TypeScript",
  "Next.js",
  "React Native",
  "Postgres",
  "Prisma",
  "AWS",
  "Azure",
  "Salesforce",
  "Terraform",
  "Docker",
  "Python",
  "AI / LLM",
  "Vercel",
  "Tailwind",
]

export function TechMarquee() {
  return (
    <div
      className="relative overflow-hidden border-b border-white/[0.06] py-[22px]"
      style={{
        maskImage: "linear-gradient(90deg, transparent, #000 12%, #000 88%, transparent)",
        WebkitMaskImage: "linear-gradient(90deg, transparent, #000 12%, #000 88%, transparent)",
      }}
    >
      <div className="flex w-max motion-safe:animate-[marquee_45s_linear_infinite]">
        {[...TECH, ...TECH].map((t, i) => (
          <div
            key={i}
            aria-hidden={i >= TECH.length}
            className="flex items-center gap-7 whitespace-nowrap pr-7 text-[13px] font-medium uppercase tracking-[0.18em] text-white/45"
          >
            <span>{t}</span>
            <svg className="h-2.5 w-2.5 opacity-70" viewBox="0 0 784.11 815.53" aria-hidden>
              <path fill="#c084fc" d={STAR_PATH} />
            </svg>
          </div>
        ))}
      </div>
    </div>
  )
}

/* ---------- About ---------- */

const PILLARS = [
  {
    title: "End-to-end, built right",
    body: "From database design and APIs to responsive UIs, we own the full stack so nothing slips through the cracks.",
    bg: "radial-gradient(circle at 20% 20%, rgba(168,85,247,0.3), transparent 60%)",
  },
  {
    title: "Built to scale",
    body: "Architectures that grow with you — performant, observable, maintainable.",
    bg: "radial-gradient(circle at 80% 30%, rgba(56,189,248,0.28), transparent 60%)",
  },
  {
    title: "Effortless for everyone",
    body: "Intuitive flows and accessible components, on every device.",
    bg: "radial-gradient(circle at 50% 80%, rgba(236,72,153,0.26), transparent 60%)",
  },
]

export function AboutSection() {
  return (
    <section id="about" className="relative scroll-mt-24 pb-32 pt-28 sm:pt-40">
      <div className="mx-auto max-w-5xl px-2">
        <Reveal>
          <PageEyebrow align="start" className="mb-9">
            About us — Quiet craft, loud results
          </PageEyebrow>
        </Reveal>
        <ScrollLitText
          text="We're a small team of full-stack engineers who ship complete applications — polished frontends, robust backends, and everything between."
          highlight={["complete", "applications", "polished", "robust", "everything", "between."]}
          className="font-medium leading-[1.28] tracking-[-0.025em]"
          style={{ fontSize: "clamp(28px, 3.6vw, 48px)", textWrap: "pretty" }}
        />
      </div>

      <div className="mx-auto mt-[88px] grid max-w-6xl grid-cols-[repeat(auto-fit,minmax(min(100%,280px),1fr))] gap-4 px-2">
        {PILLARS.map((p, i) => (
          <Reveal key={p.title} index={i + 1} className="h-full">
            {/* 1px gradient-border card: the outer glow shows through the padding near the cursor */}
            <PointerSurface className="group relative h-full min-h-60 overflow-hidden rounded-3xl bg-white/[0.08] p-px">
              <div
                className="pointer-events-none absolute inset-0 opacity-0 transition-opacity duration-400 group-hover:opacity-100"
                style={{
                  background:
                    "radial-gradient(260px circle at var(--mx, 50%) var(--my, 50%), rgba(216,180,254,0.9), transparent 60%)",
                }}
              />
              <div className="relative h-full overflow-hidden rounded-[23px] bg-[rgba(22,24,30,0.88)] p-8">
                <div className="pointer-events-none absolute inset-0" style={{ background: p.bg }} />
                <div className="relative flex h-full flex-col gap-6">
                  <div className="flex items-center gap-2 text-[10px] font-medium uppercase tracking-[0.3em] text-white/40">
                    <span>0{i + 1}</span>
                    <span className="h-px w-6 bg-white/20" />
                  </div>
                  <h3 className="text-[26px] font-semibold leading-[1.2] tracking-[-0.025em] text-white">
                    {p.title}
                  </h3>
                  <p className="text-sm leading-[1.65] text-gray-400">{p.body}</p>
                </div>
              </div>
            </PointerSurface>
          </Reveal>
        ))}
      </div>
    </section>
  )
}

/* ---------- Services ---------- */

const SERVICES: { title: string; body: string; bullets: string[]; accent: ServiceAccent; iconPath: string }[] = [
  {
    title: "Product design",
    body: "Modern, accessible interfaces that feel intuitive across every device and hand off cleanly to engineering.",
    bullets: ["UX research", "Design systems", "Prototyping"],
    accent: "purple",
    iconPath: "M16.862 4.487 18.549 2.8a2.12 2.12 0 1 1 3 3L7.5 19.85 3 21l1.15-4.5 12.712-12.013Z",
  },
  {
    title: "Full-stack engineering",
    body: "From databases and APIs to polished frontends — complete applications in modern stacks with proper tests and CI.",
    bullets: ["TypeScript · Next.js", "Postgres · Prisma", "AWS · Vercel"],
    accent: "sky",
    iconPath:
      "M20.25 6.375c0 2.278-3.694 4.125-8.25 4.125S3.75 8.653 3.75 6.375m16.5 0c0-2.278-3.694-4.125-8.25-4.125S3.75 4.097 3.75 6.375m16.5 0v11.25c0 2.278-3.694 4.125-8.25 4.125s-8.25-1.847-8.25-4.125V6.375m16.5 0v3.75m-16.5-3.75v3.75m16.5 0v3.75C20.25 16.153 16.556 18 12 18s-8.25-1.847-8.25-4.125v-3.75m16.5 0c0 2.278-3.694 4.125-8.25 4.125s-8.25-1.847-8.25-4.125",
  },
  {
    title: "Mobile applications",
    body: "Cross-platform apps that extend your business to iOS and Android with a truly native feel.",
    bullets: ["React Native", "Expo · EAS", "Push & offline"],
    accent: "fuchsia",
    iconPath:
      "M10.5 1.5H8.25A2.25 2.25 0 0 0 6 3.75v16.5a2.25 2.25 0 0 0 2.25 2.25h7.5A2.25 2.25 0 0 0 18 20.25V3.75a2.25 2.25 0 0 0-2.25-2.25H13.5m-3 0V3h3V1.5m-3 0h3m-3 18.75h3",
  },
  {
    title: "Cloud & DevOps",
    body: "Production-grade infrastructure, CI/CD pipelines, and observability — so your team ships fearlessly.",
    bullets: ["Docker · k8s", "Terraform", "Monitoring"],
    accent: "emerald",
    iconPath:
      "M2.25 15a4.5 4.5 0 0 0 4.5 4.5H18a3.75 3.75 0 0 0 1.332-7.257 3 3 0 0 0-3.758-3.848 5.25 5.25 0 0 0-10.233 2.33A4.502 4.502 0 0 0 2.25 15Z",
  },
]

export function ServicesSection() {
  return (
    <section id="services" className="relative scroll-mt-24 border-t border-white/[0.08] py-24 sm:py-32">
      <div className="mx-auto flex max-w-6xl flex-wrap items-end justify-between gap-6 px-2">
        <Reveal>
          <PageEyebrow align="start">What we do</PageEyebrow>
          <h2 className={H2} style={H2_SIZE}>
            Services that <span className="text-white/40">ship.</span>
          </h2>
        </Reveal>
        <Reveal index={1}>
          <p className="max-w-[26rem] text-base leading-[1.65] text-gray-400" style={{ textWrap: "pretty" }}>
            End-to-end engagements — or plug us in where you need us most. Either way, you get senior
            craftspeople from day one.
          </p>
        </Reveal>
      </div>
      <div className="mx-auto mt-16 grid max-w-6xl grid-cols-[repeat(auto-fit,minmax(min(100%,420px),1fr))] gap-4 px-2">
        {SERVICES.map((s, i) => (
          <Reveal key={s.title} index={(i % 2) + 1} className="h-full">
            <ServiceCard index={i + 1} {...s} />
          </Reveal>
        ))}
      </div>
    </section>
  )
}

/* ---------- Process ---------- */

const PROCESS: ProcessStep[] = [
  {
    step: "01",
    title: "Discover",
    body: "We dig into your goals, users, and constraints — then pressure-test the plan before a line of code is written.",
    glow: "rgba(168,85,247,0.7)",
  },
  {
    step: "02",
    title: "Design",
    body: "Rapid prototypes in the browser. We iterate on real interactions, not static mockups.",
    glow: "rgba(56,189,248,0.6)",
  },
  {
    step: "03",
    title: "Build",
    body: "Weekly ships, CI-first. You see progress continuously and can steer at any time.",
    glow: "rgba(236,72,153,0.6)",
  },
  {
    step: "04",
    title: "Launch & evolve",
    body: "We don't disappear at go-live. We monitor, measure, and keep shipping improvements.",
    glow: "rgba(52,211,153,0.6)",
  },
]

export function ProcessSection() {
  return (
    <section id="process" className="relative scroll-mt-24 border-t border-white/[0.08] py-24 sm:py-32">
      <Reveal className="mx-auto flex max-w-3xl flex-col items-center text-center">
        <PageEyebrow>How we work</PageEyebrow>
        <h2 className={H2} style={{ ...H2_SIZE, textWrap: "balance" }}>
          A calm, predictable cadence
        </h2>
        <p className="mt-5 max-w-xl text-[17px] leading-[1.65] text-gray-400" style={{ textWrap: "pretty" }}>
          No discovery deserts, no big-bang launches. Small, compounding ships you can actually feel.
        </p>
      </Reveal>
      <ProcessTimeline steps={PROCESS} />
    </section>
  )
}

/* ---------- Work (DB-backed) ---------- */

export async function WorkSection() {
  const items = await prisma.portfolioItem.findMany({
    where: { status: "published" },
    orderBy: { sortOrder: "asc" },
    take: 3,
    select: { slug: true, title: true, summary: true, imageUrl: true, techStack: true },
  })

  return (
    <section id="work" className="relative scroll-mt-24 border-t border-white/[0.08] py-24 sm:py-32">
      <div className="mx-auto max-w-6xl px-2">
        <div className="flex flex-wrap items-end justify-between gap-6">
          <Reveal>
            <PageEyebrow align="start">Selected work</PageEyebrow>
            <h2 className={H2} style={H2_SIZE}>
              Built with teams you&apos;d <br className="hidden sm:block" />
              <span className="text-white/40">recognize.</span>
            </h2>
          </Reveal>
          <Reveal index={1}>
            <Link
              href="/work"
              className="inline-flex items-center gap-2 rounded-full border border-white/15 bg-white/[0.04] px-5 py-2.5 text-sm font-medium text-white transition-all duration-300 hover:border-purple-400/40 hover:bg-white/[0.08]"
            >
              View all case studies
              <svg className="h-4 w-4" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" aria-hidden>
                <path strokeLinecap="round" strokeLinejoin="round" d="M13.5 4.5 21 12m0 0-7.5 7.5M21 12H3" />
              </svg>
            </Link>
          </Reveal>
        </div>

        {items.length === 0 ? (
          <div className="mx-auto mt-14 max-w-3xl rounded-3xl border border-white/10 bg-white/[0.02] p-16 text-center">
            <p className="text-gray-400">No projects published yet.</p>
          </div>
        ) : (
          <div className="mt-14 grid grid-cols-1 gap-5 md:grid-cols-2">
            {items.map((item, i) => (
              <Reveal key={item.slug} index={i} className={i === 0 ? "md:col-span-2" : undefined}>
                <WorkCard item={item} featured={i === 0} />
              </Reveal>
            ))}
          </div>
        )}
      </div>
    </section>
  )
}

/* ---------- FAQ ---------- */

const FAQS = [
  {
    q: "How do you price projects?",
    a: "Fixed scope, fixed price for well-defined work. Weekly retainer when the scope is still moving. I don't bill hourly — it rewards the wrong thing.",
  },
  {
    q: "What does a typical engagement look like?",
    a: "A short discovery call, a written scope, and a working slice inside the first week. From there: weekly deploys and a short async update so you see progress without meetings.",
  },
  {
    q: "Do you handle design too?",
    a: "Yes. Most of the site you're on was designed and built by the same person — me. For larger visual systems I'll partner with a designer, but I can ship polished UI on my own.",
  },
  {
    q: "Will you work with my existing team?",
    a: "Often. I slot in as an extra senior pair of hands — reviewing PRs, pairing on hard bits, or owning a feature end-to-end. Tell me the shape and I'll meet it.",
  },
  {
    q: "What if the project doesn't go well?",
    a: "We catch it early. Week-one prototype exists so we can kill bad assumptions before they compound. If we're not a fit after that first slice, we part ways cleanly — no retainer trap.",
  },
]

export function FaqSection() {
  return (
    <section className="relative border-t border-white/[0.08] py-24 sm:py-32">
      <div className="mx-auto grid max-w-6xl grid-cols-1 items-start gap-12 px-2 md:grid-cols-2">
        <Reveal className="md:sticky md:top-[120px]">
          <PageEyebrow align="start">Common questions</PageEyebrow>
          <h2 className={H2} style={{ fontSize: "clamp(40px, 4.5vw, 56px)", textWrap: "balance" }}>
            The stuff people <span className="text-white/40">always ask.</span>
          </h2>
        </Reveal>
        <Reveal index={1}>
          <FaqAccordion items={FAQS} />
        </Reveal>
      </div>
    </section>
  )
}

/* ---------- CTA: eclipse ---------- */

export function CtaSection() {
  return (
    <section className="relative pb-20 pt-10">
      <Reveal>
        <div className="relative mx-auto min-h-[560px] max-w-6xl overflow-hidden rounded-[32px] border border-white/10 bg-[rgba(10,11,15,0.6)] px-6 pb-[360px] pt-24 text-center sm:px-12">
          {/* Spinning brand-gradient corona behind the planet */}
          <div
            aria-hidden
            className="pointer-events-none absolute -bottom-[980px] left-1/2 -ml-[650px] h-[1300px] w-[1300px] rounded-full opacity-75 blur-[50px] motion-safe:animate-[spin_24s_linear_infinite]"
            style={{ background: "conic-gradient(from 0deg, #38bdf8, #a855f7, #ec4899, #6366f1, #38bdf8)" }}
          />
          {/* Dark planet with a lit rim */}
          <div
            aria-hidden
            className="pointer-events-none absolute -bottom-[1000px] left-1/2 -ml-[650px] h-[1300px] w-[1300px] rounded-full"
            style={{
              background: "radial-gradient(circle at 50% 0%, #1b1d25, #0b0c10 40%)",
              boxShadow: "inset 0 2px 0 rgba(255,255,255,0.7), inset 0 18px 40px -20px rgba(216,180,254,0.6)",
            }}
          />
          <div className="relative">
            <PageEyebrow>Let&apos;s build</PageEyebrow>
            <h2
              className="mx-auto max-w-[52rem] font-semibold leading-[1.02] tracking-[-0.04em] text-white"
              style={{ fontSize: "clamp(40px, 5.5vw, 72px)", textWrap: "balance" }}
            >
              Ship the product your team has been trying to ship.
            </h2>
            <p className="mx-auto mt-[22px] max-w-[34rem] text-[17px] leading-[1.65] text-gray-400">
              A short call is usually enough to tell if we&apos;re a fit. No pitch decks.
            </p>
            <div className="mt-10 flex flex-wrap items-center justify-center gap-3">
              <StarButton href="/#contact" pill>
                Start a project
              </StarButton>
              <Link
                href="/work"
                className="inline-flex items-center gap-2 rounded-full border-2 border-white/15 bg-white/[0.04] px-[30px] py-[13px] text-sm font-semibold text-white transition-all duration-300 hover:border-white/30 hover:bg-white/10"
              >
                See the work
              </Link>
            </div>
          </div>
        </div>
      </Reveal>
    </section>
  )
}
