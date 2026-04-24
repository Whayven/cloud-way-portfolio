import Link from "next/link"
import { FadeIn } from "@/components/site/animated-section"
import { PageEyebrow } from "@/components/site/page-eyebrow"
import { ServiceCard, type ServiceAccent } from "@/components/site/service-card"
import { StarButton } from "@/components/ui/star-button"
import { WorkGrid } from "@/components/site/work-grid"
import { prisma } from "@/lib/db"

function SectionHeading({
  eyebrow,
  title,
  lead,
}: {
  eyebrow: string
  title: React.ReactNode
  lead?: string
}) {
  return (
    <FadeIn>
      <div className="mx-auto flex max-w-3xl flex-col items-center text-center">
        <PageEyebrow>{eyebrow}</PageEyebrow>
        <h2
          className="text-4xl font-semibold leading-[1.05] tracking-tight text-white sm:text-5xl"
          style={{ textWrap: "balance" }}
        >
          {title}
        </h2>
        {lead && (
          <p
            className="mt-5 max-w-2xl text-base leading-relaxed text-gray-400 sm:text-lg"
            style={{ textWrap: "pretty" }}
          >
            {lead}
          </p>
        )}
      </div>
    </FadeIn>
  )
}

/* ---------- About ---------- */

const pillars = [
  {
    title: "End-to-end, built right",
    body: "From database design and APIs to responsive UIs, we own the full stack so nothing slips through the cracks.",
    accent: "purple" as const,
  },
  {
    title: "Built to scale",
    body: "Architectures that grow with you — performant, observable, maintainable.",
    accent: "sky" as const,
  },
  {
    title: "Effortless for everyone",
    body: "Intuitive flows and accessible components, on every device.",
    accent: "fuchsia" as const,
  },
]

const accentBg: Record<"purple" | "sky" | "fuchsia", string> = {
  purple: "radial-gradient(circle at 20% 20%, rgba(168,85,247,0.35), transparent 60%)",
  sky: "radial-gradient(circle at 80% 30%, rgba(56,189,248,0.32), transparent 60%)",
  fuchsia: "radial-gradient(circle at 50% 80%, rgba(236,72,153,0.3), transparent 60%)",
}

export function AboutSection() {
  return (
    <section id="about" className="relative border-t border-white/10 py-24 sm:py-32">
      <SectionHeading
        eyebrow="About us"
        title={
          <>
            Quiet craft. <span className="text-white/40">Loud results.</span>
          </>
        }
        lead="We're a small team of full-stack engineers who ship complete applications — polished frontends, robust backends, and everything between."
      />

      <div className="mx-auto mt-16 grid max-w-6xl grid-cols-1 gap-4 px-2 sm:grid-cols-2 lg:grid-cols-3">
        {pillars.map((p, i) => (
          <FadeIn key={p.title} index={i + 1}>
            <div
              className="group relative h-full overflow-hidden rounded-3xl border border-white/10 bg-white/[0.03] p-8 backdrop-blur-xl transition-all duration-500 hover:border-white/25 hover:bg-white/[0.06]"
              style={{ minHeight: 240 }}
            >
              <div
                className="pointer-events-none absolute inset-0 opacity-60 transition-opacity duration-500 group-hover:opacity-100"
                style={{ background: accentBg[p.accent] }}
              />
              <div className="relative flex h-full flex-col gap-6">
                <div className="flex items-center gap-2 text-[10px] font-medium uppercase tracking-[0.3em] text-white/40">
                  <span>0{i + 1}</span>
                  <span className="h-px w-6 bg-white/20" />
                </div>
                <h3 className="text-2xl font-semibold leading-tight tracking-tight text-white sm:text-[26px]">
                  {p.title}
                </h3>
                <p className="text-sm leading-relaxed text-gray-400">{p.body}</p>
              </div>
            </div>
          </FadeIn>
        ))}
      </div>
    </section>
  )
}

/* ---------- Services ---------- */

const SERVICES: Array<{
  title: string
  body: string
  bullets: string[]
  icon: React.ReactNode
  accent: ServiceAccent
}> = [
  {
    title: "Product design",
    body: "Modern, accessible interfaces that feel intuitive across every device and hand off cleanly to engineering.",
    bullets: ["UX research", "Design systems", "Prototyping"],
    accent: "purple",
    icon: (
      <svg viewBox="0 0 24 24" className="h-6 w-6" fill="none" stroke="currentColor" strokeWidth="1.5">
        <path
          strokeLinecap="round"
          strokeLinejoin="round"
          d="M16.862 4.487 18.549 2.8a2.12 2.12 0 1 1 3 3L7.5 19.85 3 21l1.15-4.5 12.712-12.013Z"
        />
      </svg>
    ),
  },
  {
    title: "Full-stack engineering",
    body: "From databases and APIs to polished frontends — complete applications in modern stacks with proper tests and CI.",
    bullets: ["TypeScript · Next.js", "Postgres · Prisma", "AWS · Vercel"],
    accent: "sky",
    icon: (
      <svg viewBox="0 0 24 24" className="h-6 w-6" fill="none" stroke="currentColor" strokeWidth="1.5">
        <path
          strokeLinecap="round"
          strokeLinejoin="round"
          d="M20.25 6.375c0 2.278-3.694 4.125-8.25 4.125S3.75 8.653 3.75 6.375m16.5 0c0-2.278-3.694-4.125-8.25-4.125S3.75 4.097 3.75 6.375m16.5 0v11.25c0 2.278-3.694 4.125-8.25 4.125s-8.25-1.847-8.25-4.125V6.375m16.5 0v3.75m-16.5-3.75v3.75m16.5 0v3.75C20.25 16.153 16.556 18 12 18s-8.25-1.847-8.25-4.125v-3.75m16.5 0c0 2.278-3.694 4.125-8.25 4.125s-8.25-1.847-8.25-4.125"
        />
      </svg>
    ),
  },
  {
    title: "Mobile applications",
    body: "Cross-platform apps that extend your business to iOS and Android with a truly native feel.",
    bullets: ["React Native", "Expo · EAS", "Push & offline"],
    accent: "fuchsia",
    icon: (
      <svg viewBox="0 0 24 24" className="h-6 w-6" fill="none" stroke="currentColor" strokeWidth="1.5">
        <path
          strokeLinecap="round"
          strokeLinejoin="round"
          d="M10.5 1.5H8.25A2.25 2.25 0 0 0 6 3.75v16.5a2.25 2.25 0 0 0 2.25 2.25h7.5A2.25 2.25 0 0 0 18 20.25V3.75a2.25 2.25 0 0 0-2.25-2.25H13.5m-3 0V3h3V1.5m-3 0h3m-3 18.75h3"
        />
      </svg>
    ),
  },
  {
    title: "Cloud & DevOps",
    body: "Production-grade infrastructure, CI/CD pipelines, and observability — so your team ships fearlessly.",
    bullets: ["Docker · k8s", "Terraform", "Monitoring"],
    accent: "emerald",
    icon: (
      <svg viewBox="0 0 24 24" className="h-6 w-6" fill="none" stroke="currentColor" strokeWidth="1.5">
        <path
          strokeLinecap="round"
          strokeLinejoin="round"
          d="M2.25 15a4.5 4.5 0 0 0 4.5 4.5H18a3.75 3.75 0 0 0 1.332-7.257 3 3 0 0 0-3.758-3.848 5.25 5.25 0 0 0-10.233 2.33A4.502 4.502 0 0 0 2.25 15Z"
        />
      </svg>
    ),
  },
]

export function ServicesSection() {
  return (
    <section id="services" className="relative border-t border-white/10 py-24 sm:py-32">
      <SectionHeading
        eyebrow="What we do"
        title="Services that ship"
        lead="End-to-end engagements — or plug us in where you need us most. Either way, you get senior craftspeople from day one."
      />
      <div className="mx-auto mt-16 grid max-w-6xl grid-cols-1 gap-4 px-2 sm:grid-cols-2">
        {SERVICES.map((s, i) => (
          <FadeIn key={s.title} index={i + 1}>
            <ServiceCard {...s} />
          </FadeIn>
        ))}
      </div>
    </section>
  )
}

/* ---------- Process ---------- */

const PROCESS = [
  {
    step: "01",
    title: "Discover",
    body: "We dig into your goals, users, and constraints — then pressure-test the plan before a line of code is written.",
    ring: "rgba(168,85,247,0.6)",
  },
  {
    step: "02",
    title: "Design",
    body: "Rapid prototypes in the browser. We iterate on real interactions, not static mockups.",
    ring: "rgba(56,189,248,0.5)",
  },
  {
    step: "03",
    title: "Build",
    body: "Weekly ships, CI-first. You see progress continuously and can steer at any time.",
    ring: "rgba(236,72,153,0.5)",
  },
  {
    step: "04",
    title: "Launch & evolve",
    body: "We don't disappear at go-live. We monitor, measure, and keep shipping improvements.",
    ring: "rgba(52,211,153,0.5)",
  },
]

export function ProcessSection() {
  return (
    <section id="process" className="relative border-t border-white/10 py-24 sm:py-32">
      <SectionHeading
        eyebrow="How we work"
        title="A calm, predictable cadence"
        lead="No discovery deserts, no big-bang launches. Small, compounding ships you can actually feel."
      />
      <div className="mx-auto mt-16 max-w-6xl px-2">
        <div className="relative grid grid-cols-1 gap-8 md:grid-cols-4">
          <div
            className="pointer-events-none absolute left-0 top-10 hidden h-px w-full md:block"
            style={{
              background:
                "linear-gradient(90deg, transparent, rgba(168,85,247,0.4), rgba(56,189,248,0.4), rgba(236,72,153,0.4), transparent)",
            }}
          />
          {PROCESS.map((p, i) => (
            <FadeIn key={p.step} index={i + 1}>
              <div className="relative">
                <div className="relative z-10 flex h-20 w-20 items-center justify-center">
                  <span
                    className="absolute inset-0 rounded-full opacity-70 blur-lg"
                    style={{ background: `radial-gradient(circle, ${p.ring}, transparent 70%)` }}
                  />
                  <span className="relative flex h-16 w-16 items-center justify-center rounded-full border border-white/15 bg-cw-dark/80 text-lg font-semibold tracking-tight text-white backdrop-blur-md">
                    {p.step}
                  </span>
                </div>
                <h3 className="mt-5 text-lg font-semibold tracking-tight text-white">{p.title}</h3>
                <p className="mt-2 text-sm leading-relaxed text-gray-400">{p.body}</p>
              </div>
            </FadeIn>
          ))}
        </div>
      </div>
    </section>
  )
}

/* ---------- Work (DB-backed) ---------- */

export async function WorkSection() {
  const items = await prisma.portfolioItem.findMany({
    where: { status: "published" },
    orderBy: { sortOrder: "asc" },
  })

  return (
    <section id="work" className="relative border-t border-white/10 py-24 sm:py-32">
      <div className="mx-auto max-w-6xl px-2">
        <div className="flex flex-col items-start justify-between gap-6 sm:flex-row sm:items-end">
          <FadeIn>
            <div>
              <PageEyebrow>Selected work</PageEyebrow>
              <h2
                className="text-4xl font-semibold leading-[1.05] tracking-tight text-white sm:text-5xl"
                style={{ textWrap: "balance" }}
              >
                Built with teams you&apos;d <br className="hidden sm:block" />
                <span className="text-white/40">recognize.</span>
              </h2>
            </div>
          </FadeIn>
          <FadeIn index={1}>
            <Link
              href="/work"
              className="group inline-flex items-center gap-2 rounded-full border border-white/15 bg-white/[0.04] px-5 py-2.5 text-sm font-medium text-white transition hover:border-purple-400/40 hover:bg-white/[0.08]"
            >
              View all case studies
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
            </Link>
          </FadeIn>
        </div>

        <WorkGrid
          items={items.slice(0, 4).map((item, idx) => ({
            slug: item.slug,
            title: item.title,
            summary: item.summary,
            imageUrl: item.imageUrl,
            techStack: item.techStack,
            featured: idx === 0,
          }))}
        />
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
    <section className="relative border-t border-white/10 py-24 sm:py-32">
      <SectionHeading
        eyebrow="Common questions"
        title={
          <>
            The stuff people <span className="text-white/40">always ask.</span>
          </>
        }
      />
      <div className="mx-auto mt-14 max-w-3xl px-2">
        <ul className="divide-y divide-white/10 overflow-hidden rounded-3xl border border-white/10 bg-white/[0.03] backdrop-blur-xl">
          {FAQS.map((item, i) => (
            <FadeIn key={item.q} index={i + 1}>
              <li className="p-7 sm:p-8">
                <h3 className="text-lg font-semibold tracking-tight text-white">
                  {item.q}
                </h3>
                <p
                  className="mt-3 text-sm leading-relaxed text-gray-400 sm:text-base"
                  style={{ textWrap: "pretty" }}
                >
                  {item.a}
                </p>
              </li>
            </FadeIn>
          ))}
        </ul>
      </div>
    </section>
  )
}

/* ---------- CTA ---------- */

export function CtaSection() {
  return (
    <section className="relative border-t border-white/10 py-20">
      <FadeIn>
        <div className="relative mx-auto max-w-5xl overflow-hidden rounded-3xl border border-white/10 bg-white/[0.02] p-12 text-center sm:p-16">
          <div
            className="pointer-events-none absolute inset-0"
            style={{
              background:
                "radial-gradient(circle at 20% 20%, rgba(168,85,247,0.25), transparent 50%), radial-gradient(circle at 80% 80%, rgba(56,189,248,0.22), transparent 50%), radial-gradient(circle at 50% 100%, rgba(236,72,153,0.18), transparent 60%)",
            }}
          />
          <div className="relative">
            <PageEyebrow>Let&apos;s build</PageEyebrow>
            <h2
              className="mx-auto max-w-3xl text-4xl font-semibold leading-[1.05] tracking-tight text-white sm:text-5xl md:text-6xl"
              style={{ textWrap: "balance" }}
            >
              Ship the product your team <br className="hidden sm:block" />
              has been trying to ship.
            </h2>
            <p className="mx-auto mt-5 max-w-xl text-base leading-relaxed text-gray-400 sm:text-lg">
              A short call is usually enough to tell if we&apos;re a fit. No pitch decks.
            </p>
            <div className="mt-10 flex flex-wrap items-center justify-center gap-3">
              <StarButton href="/#contact">Start a project</StarButton>
              <StarButton href="/work" variant="ghost">
                See the work
              </StarButton>
            </div>
          </div>
        </div>
      </FadeIn>
    </section>
  )
}
