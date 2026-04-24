import Image from "next/image";
import Link from "next/link";
import { notFound } from "next/navigation";
import {
  BoltIcon,
  CircleStackIcon,
  CloudIcon,
  CodeBracketIcon,
  CommandLineIcon,
  CpuChipIcon,
  CubeIcon,
  PaintBrushIcon,
  ServerIcon,
  SparklesIcon,
} from "@heroicons/react/24/outline";
import { FadeIn } from "@/components/site/animated-section";
import { NebulaBackdrop } from "@/components/site/nebula-backdrop";
import { PageEyebrow } from "@/components/site/page-eyebrow";
import { SiteFooter } from "@/components/site/site-footer";
import { SiteHeader } from "@/components/site/site-header";
import { StarButton } from "@/components/ui/star-button";
import { prisma } from "@/lib/db";
import { ContentStatus } from "@/lib/generated/prisma/client";

function techIcon(name: string) {
  const n = name.toLowerCase();
  if (/(postgres|mysql|mongo|sqlite|sql|redis|supabase|neon|prisma|clickhouse|snowflake|duckdb|bigquery)/.test(n))
    return CircleStackIcon;
  if (/(aws|gcp|azure|vercel|cloudflare|netlify|fly\.io|railway|render|heroku|r2|s3|cloud)/.test(n))
    return CloudIcon;
  if (/(tailwind|css|sass|scss|radix|shadcn|styled|chakra|bootstrap)/.test(n))
    return PaintBrushIcon;
  if (/(docker|kubernetes|k8s|terraform|helm|nginx|cli|bash|shell|github actions|ci\/cd)/.test(n))
    return CommandLineIcon;
  if (/(kafka|temporal|liveblocks|websocket|ws|pusher|ably|sse|stream|queue)/.test(n))
    return BoltIcon;
  if (/(framer|motion|gsap|lottie|three|webgl|d3)/.test(n)) return SparklesIcon;
  if (/(node|deno|bun|express|fastapi|hono|nest|trpc|graphql|rest|api)/.test(n))
    return ServerIcon;
  if (/(typescript|javascript|python|go\b|rust|java\b|ruby|php|swift|kotlin|dart|elixir|\.net|c\+\+|c#)/.test(n))
    return CodeBracketIcon;
  if (/(react|vue|svelte|next|nuxt|solid|angular|remix|astro|expo|native|ios|android|flutter)/.test(n))
    return CubeIcon;
  return CpuChipIcon;
}

type TechCategory = "frontend" | "backend" | "platform";

function techCategory(name: string): TechCategory {
  const n = name.toLowerCase();
  if (
    /(aws|gcp|azure|vercel|cloudflare|netlify|fly\.io|railway|render|heroku|r2|s3|docker|kubernetes|k8s|terraform|helm|nginx|github actions|ci\/cd|bash|shell|cli)/.test(
      n,
    )
  )
    return "platform";
  if (
    /(postgres|mysql|mongo|sqlite|redis|supabase|neon|prisma|clickhouse|snowflake|duckdb|bigquery|kafka|temporal|liveblocks|websocket|ws|pusher|ably|sse|queue|node|deno|bun|express|fastapi|hono|nest|trpc|graphql|rest|api|python|go\b|rust|java\b|ruby|php|\.net)/.test(
      n,
    )
  )
    return "backend";
  return "frontend";
}

const TECH_CATEGORIES: { key: TechCategory; label: string }[] = [
  { key: "frontend", label: "Frontend" },
  { key: "backend", label: "Backend" },
  { key: "platform", label: "Platform / Infra" },
];

export async function generateMetadata({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;
  const item = await prisma.portfolioItem.findUnique({
    where: { slug, status: ContentStatus.published },
    select: { title: true, summary: true },
  });
  if (!item) return { title: "Not Found" };
  return { title: item.title, description: item.summary };
}

const HERO_GRADIENT =
  "radial-gradient(circle at 20% 20%, rgba(168,85,247,0.65), transparent 55%), radial-gradient(circle at 80% 70%, rgba(56,189,248,0.55), transparent 55%), radial-gradient(circle at 50% 100%, rgba(236,72,153,0.35), transparent 60%)";

function MockGrid() {
  return (
    <div className="absolute inset-10 rounded-xl border border-white/15 bg-cw-dark/50 backdrop-blur-sm">
      <div className="flex items-center gap-1.5 border-b border-white/10 px-3 py-2">
        <span className="h-2 w-2 rounded-full bg-red-400/70" />
        <span className="h-2 w-2 rounded-full bg-yellow-400/70" />
        <span className="h-2 w-2 rounded-full bg-green-400/70" />
      </div>
      <div className="grid grid-cols-4 gap-2 p-3">
        {Array.from({ length: 12 }).map((_, i) => (
          <div key={i} className="rounded-md bg-white/10 p-2">
            <div className="h-1.5 w-1/2 rounded bg-white/30" />
            <div className="mt-1.5 h-3 w-full rounded bg-white/20" />
          </div>
        ))}
      </div>
    </div>
  );
}

export default async function WorkDetailPage({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;
  const item = await prisma.portfolioItem.findUnique({
    where: { slug, status: ContentStatus.published },
  });
  if (!item) notFound();

  const year = item.publishedAt
    ? String(item.publishedAt.getFullYear())
    : "Recent";
  const primaryTech = item.techStack[0] ?? "Full-stack";
  const bodyParagraphs = item.body
    ? item.body.split(/\n{2,}/).filter(Boolean)
    : [];

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
          {/* Back */}
          <div className="pt-10">
            <Link
              href="/work"
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
              All work
            </Link>
          </div>

          {/* Hero */}
          <section className="relative py-16 sm:py-20">
            <FadeIn>
              <div className="flex flex-wrap items-center gap-3 text-[10px] font-medium uppercase tracking-[0.3em] text-white/40">
                <span className="whitespace-nowrap">Case study</span>
                <span className="h-px w-5 bg-white/20" />
                <span className="whitespace-nowrap">{year}</span>
                <span className="h-px w-5 bg-white/20" />
                <span className="whitespace-nowrap">{primaryTech}</span>
              </div>
            </FadeIn>
            <FadeIn index={1}>
              <h1
                className="mt-5 max-w-5xl text-5xl font-semibold leading-[1.03] tracking-tight sm:text-6xl md:text-7xl"
                style={{ textWrap: "balance" }}
              >
                {item.title}
              </h1>
            </FadeIn>
            <FadeIn index={2}>
              <p
                className="mt-6 max-w-2xl text-lg leading-relaxed text-gray-400"
                style={{ textWrap: "pretty" }}
              >
                {item.summary}
              </p>
            </FadeIn>

            {/* Meta row */}
            <FadeIn index={3}>
              <dl className="mt-12 grid grid-cols-2 gap-px overflow-hidden rounded-2xl border border-white/10 bg-white/4 sm:grid-cols-4">
                <div className="bg-cw-dark/90 p-5">
                  <dt className="text-[10px] font-medium uppercase tracking-[0.25em] text-white/40">
                    Shipped
                  </dt>
                  <dd className="mt-2 text-sm font-medium text-white">
                    {year}
                  </dd>
                </div>
                <div className="bg-cw-dark/90 p-5">
                  <dt className="text-[10px] font-medium uppercase tracking-[0.25em] text-white/40">
                    Stack
                  </dt>
                  <dd className="mt-2 line-clamp-2 text-sm font-medium text-white">
                    {item.techStack.slice(0, 3).join(" · ") || "—"}
                  </dd>
                </div>
                <div className="bg-cw-dark/90 p-5">
                  <dt className="text-[10px] font-medium uppercase tracking-[0.25em] text-white/40">
                    Role
                  </dt>
                  <dd className="mt-2 text-sm font-medium text-white">
                    Design &amp; engineering
                  </dd>
                </div>
                <div className="bg-cw-dark/90 p-5">
                  <dt className="text-[10px] font-medium uppercase tracking-[0.25em] text-white/40">
                    {item.externalUrl ? "Live" : "Status"}
                  </dt>
                  <dd className="mt-2 text-sm font-medium text-white">
                    {item.externalUrl ? (
                      <a
                        href={item.externalUrl}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="inline-flex items-center gap-1 text-purple-300 transition-colors hover:text-white"
                      >
                        Visit site
                        <svg
                          className="h-3.5 w-3.5"
                          viewBox="0 0 24 24"
                          fill="none"
                          stroke="currentColor"
                          strokeWidth="2"
                        >
                          <path
                            strokeLinecap="round"
                            strokeLinejoin="round"
                            d="M7 17L17 7M7 7h10v10"
                          />
                        </svg>
                      </a>
                    ) : (
                      "Shipped"
                    )}
                  </dd>
                </div>
              </dl>
            </FadeIn>
          </section>

          {/* Hero visual */}
          <FadeIn>
            <figure className="relative overflow-hidden rounded-3xl border border-white/10 bg-white/2">
              <div className="relative aspect-21/10">
                {item.imageUrl ? (
                  <Image
                    src={item.imageUrl}
                    alt={item.title}
                    fill
                    sizes="(max-width: 1280px) 100vw, 1280px"
                    priority
                    className="object-cover"
                  />
                ) : (
                  <>
                    <div
                      className="absolute inset-0"
                      style={{ background: HERO_GRADIENT }}
                    />
                    <div
                      className="pointer-events-none absolute inset-0 opacity-40"
                      style={{
                        backgroundImage:
                          "linear-gradient(rgba(255,255,255,0.06) 1px, transparent 1px), linear-gradient(90deg, rgba(255,255,255,0.06) 1px, transparent 1px)",
                        backgroundSize: "48px 48px",
                      }}
                    />
                    <MockGrid />
                  </>
                )}
                <div className="absolute inset-0 bg-linear-to-t from-cw-dark/50 via-transparent to-transparent" />
              </div>
            </figure>
          </FadeIn>

          {/* Narrative */}
          {bodyParagraphs.length > 0 && (
            <section className="py-20">
              <div className="grid grid-cols-1 gap-10 md:grid-cols-[1fr_2fr]">
                <FadeIn>
                  <PageEyebrow>The brief</PageEyebrow>
                </FadeIn>
                <FadeIn index={1}>
                  <div
                    className="space-y-6 text-lg leading-relaxed text-gray-300"
                    style={{ textWrap: "pretty" }}
                  >
                    {bodyParagraphs.map((p, i) => (
                      <p key={i}>{p}</p>
                    ))}
                  </div>
                </FadeIn>
              </div>
            </section>
          )}

          {/* Tech stack */}
          {item.techStack.length > 0 && (
            <section className="py-20">
              <FadeIn>
                <div className="mb-10">
                  <PageEyebrow>Under the hood</PageEyebrow>
                  <h2
                    className="mt-3 text-3xl font-semibold tracking-tight sm:text-4xl"
                    style={{ textWrap: "balance" }}
                  >
                    The stack.
                  </h2>
                </div>
              </FadeIn>
              <div className="space-y-8 rounded-2xl border border-white/10 bg-white/2 p-7">
                {TECH_CATEGORIES.map(({ key, label }) => {
                  const group = item.techStack.filter(
                    (t) => techCategory(t) === key,
                  );
                  if (group.length === 0) return null;
                  return (
                    <div key={key}>
                      <p className="text-[10px] font-medium uppercase tracking-[0.3em] text-white/40">
                        {label}
                      </p>
                      <ul className="mt-4 grid grid-cols-2 gap-x-6 gap-y-4 sm:grid-cols-3 lg:grid-cols-4">
                        {group.map((tech) => {
                          const Icon = techIcon(tech);
                          return (
                            <li
                              key={tech}
                              className="flex items-center gap-3 border-t border-white/5 pt-4"
                            >
                              <span className="flex h-9 w-9 shrink-0 items-center justify-center rounded-lg border border-white/10 bg-white/4 text-purple-300/80">
                                <Icon className="h-4 w-4" strokeWidth={1.75} />
                              </span>
                              <span className="text-sm font-medium text-white">
                                {tech}
                              </span>
                            </li>
                          );
                        })}
                      </ul>
                    </div>
                  );
                })}
              </div>
            </section>
          )}

          {/* Next + CTA */}
          <section className="py-16">
            <FadeIn>
              <div className="relative overflow-hidden rounded-3xl border border-white/10 bg-white/2 p-12 sm:p-16">
                <div
                  className="pointer-events-none absolute inset-0"
                  style={{
                    background:
                      "radial-gradient(circle at 80% 20%, rgba(168,85,247,0.2), transparent 50%), radial-gradient(circle at 20% 80%, rgba(56,189,248,0.18), transparent 50%)",
                  }}
                />
                <div className="relative flex flex-col items-start justify-between gap-6 sm:flex-row sm:items-center">
                  <div>
                    <PageEyebrow>Similar engagement?</PageEyebrow>
                    <h2
                      className="text-3xl font-semibold tracking-tight sm:text-4xl"
                      style={{ textWrap: "balance" }}
                    >
                      Let&apos;s talk about yours.
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
