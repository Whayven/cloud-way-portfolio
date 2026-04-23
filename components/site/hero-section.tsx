"use client"

import { useCallback, useEffect, useState } from "react"
import { ChevronLeftIcon, ChevronRightIcon, MegaphoneIcon } from "@heroicons/react/20/solid"
import { StarButton } from "@/components/ui/star-button"

type Announcement = {
  id: string
  title: string
  body: string
  type: "info" | "warning" | "success"
}

const typeAccent = {
  info: {
    text: "text-sky-300",
    border: "border-sky-400/30",
    glow: "shadow-[0_0_40px_-10px_rgba(56,189,248,0.5)]",
  },
  warning: {
    text: "text-amber-300",
    border: "border-amber-400/30",
    glow: "shadow-[0_0_40px_-10px_rgba(251,191,36,0.5)]",
  },
  success: {
    text: "text-emerald-300",
    border: "border-emerald-400/30",
    glow: "shadow-[0_0_40px_-10px_rgba(52,211,153,0.5)]",
  },
}

type StatCard = {
  title: string
  description: string
  accent: string
  ring: string
  icon: React.ReactNode
}

const STATS: StatCard[] = [
  {
    title: "5+ Years",
    description: "Full-stack engineering across web, cloud, and enterprise platforms.",
    accent: "text-purple-300",
    ring: "rgba(168,85,247,0.4)",
    icon: (
      <svg className="h-5 w-5" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5">
        <path
          strokeLinecap="round"
          strokeLinejoin="round"
          d="M17.25 6.75 22.5 12l-5.25 5.25m-10.5 0L1.5 12l5.25-5.25m7.5-3-4.5 16.5"
        />
      </svg>
    ),
  },
  {
    title: "Cloud Native",
    description: "Hands-on with AWS, Azure, and the Salesforce ecosystem.",
    accent: "text-sky-300",
    ring: "rgba(56,189,248,0.4)",
    icon: (
      <svg className="h-5 w-5" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5">
        <path
          strokeLinecap="round"
          strokeLinejoin="round"
          d="M2.25 15a4.5 4.5 0 0 0 4.5 4.5H18a3.75 3.75 0 0 0 1.332-7.257 3 3 0 0 0-3.758-3.848 5.25 5.25 0 0 0-10.233 2.33A4.502 4.502 0 0 0 2.25 15Z"
        />
      </svg>
    ),
  },
  {
    title: "AI-Driven",
    description: "Modern solutions powered by AI and intelligent automation.",
    accent: "text-fuchsia-300",
    ring: "rgba(236,72,153,0.4)",
    icon: (
      <svg className="h-5 w-5" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5">
        <path
          strokeLinecap="round"
          strokeLinejoin="round"
          d="M9.813 15.904 9 18.75l-.813-2.846a4.5 4.5 0 0 0-3.09-3.09L2.25 12l2.846-.813a4.5 4.5 0 0 0 3.09-3.09L9 5.25l.813 2.846a4.5 4.5 0 0 0 3.09 3.09L15.75 12l-2.846.813a4.5 4.5 0 0 0-3.09 3.09Z"
        />
      </svg>
    ),
  },
]

type Slide =
  | { kind: "announcement"; data: Announcement }
  | { kind: "stat"; data: StatCard }

function CardShell({
  children,
  extraClass = "",
  index,
}: {
  children: React.ReactNode
  extraClass?: string
  index: number
}) {
  return (
    <div
      className={`group relative w-64 overflow-hidden rounded-2xl border border-white/10 bg-white/[0.04] p-5 opacity-0 backdrop-blur-xl transition-all duration-500 hover:border-white/25 hover:bg-white/[0.07] ${extraClass}`}
      style={{
        animation: `fadeSlideLeft 0.6s var(--ease-spring) ${0.15 * index + 0.9}s forwards`,
      }}
      onMouseMove={(e) => {
        const el = e.currentTarget
        const r = el.getBoundingClientRect()
        el.style.setProperty("--mx", `${e.clientX - r.left}px`)
        el.style.setProperty("--my", `${e.clientY - r.top}px`)
      }}
    >
      <div
        className="pointer-events-none absolute -inset-px rounded-2xl opacity-0 transition-opacity duration-300 group-hover:opacity-100"
        style={{
          background:
            "radial-gradient(300px circle at var(--mx, 50%) var(--my, 50%), rgba(168,85,247,0.25), transparent 60%)",
        }}
      />
      <div className="relative">{children}</div>
    </div>
  )
}

function AnnouncementCard({ a, index }: { a: Announcement; index: number }) {
  const t = typeAccent[a.type]
  return (
    <CardShell index={index} extraClass={`${t.border} ${t.glow}`}>
      <div className={`mb-2 flex items-center gap-2.5 ${t.text}`}>
        <span className="flex h-9 w-9 items-center justify-center rounded-lg bg-white/[0.06]">
          <MegaphoneIcon className="h-5 w-5" />
        </span>
        <h3 className="text-sm font-semibold tracking-tight text-white">{a.title}</h3>
      </div>
      <p className="text-xs leading-relaxed text-gray-400">{a.body}</p>
    </CardShell>
  )
}

function StatCardView({ item, index }: { item: StatCard; index: number }) {
  return (
    <CardShell index={index}>
      <div className={`mb-2 flex items-center gap-2.5 ${item.accent}`}>
        <span className="relative flex h-9 w-9 items-center justify-center rounded-lg bg-white/[0.06]">
          <span
            className="absolute inset-0 rounded-lg opacity-70 blur-[6px]"
            style={{ background: `radial-gradient(circle, ${item.ring}, transparent 65%)` }}
          />
          <span className="relative">{item.icon}</span>
        </span>
        <h3 className="text-sm font-semibold tracking-tight text-white">{item.title}</h3>
      </div>
      <p className="text-xs leading-relaxed text-gray-400">{item.description}</p>
    </CardShell>
  )
}

const AVATAR_COLORS = ["#a855f7", "#38bdf8", "#ec4899", "#22d3ee"]

export function HeroSection({ announcements = [] }: { announcements?: Announcement[] }) {
  const slides: Slide[] = [
    ...announcements.map((a) => ({ kind: "announcement" as const, data: a })),
    ...STATS.map((s) => ({ kind: "stat" as const, data: s })),
  ]
  const pageSize = 3
  const totalPages = Math.max(1, Math.ceil(slides.length / pageSize))
  const [page, setPage] = useState(0)

  const next = useCallback(() => setPage((p) => (p + 1) % totalPages), [totalPages])
  const prev = useCallback(
    () => setPage((p) => (p - 1 + totalPages) % totalPages),
    [totalPages],
  )

  useEffect(() => {
    if (totalPages <= 1) return
    const id = setInterval(next, 6000)
    return () => clearInterval(id)
  }, [next, totalPages])

  const visible = slides.slice(page * pageSize, page * pageSize + pageSize)

  return (
    <section className="relative isolate flex min-h-[calc(100vh-4.5rem)] w-full items-center overflow-hidden">
      <div className="relative z-10 mx-auto flex w-full max-w-[85rem] items-center justify-between gap-12 px-6 py-24 sm:px-10">
        <div className="max-w-2xl">
          {/* Eyebrow pill */}
          <div
            className="mb-6 inline-flex flex-nowrap items-center gap-2 whitespace-nowrap rounded-full border border-white/10 bg-white/[0.04] px-3.5 py-1.5 text-xs font-medium text-gray-300 opacity-0 backdrop-blur-md"
            style={{ animation: "fadeSlideUp 0.8s var(--ease-spring) 0.1s forwards" }}
          >
            <span className="relative flex h-2 w-2 shrink-0">
              <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-emerald-400 opacity-75" />
              <span className="relative inline-flex h-2 w-2 rounded-full bg-emerald-400" />
            </span>
            <span>Available for new engagements</span>
            <span className="text-white/30">·</span>
            <span className="text-white/50">Q3 2026</span>
          </div>

          <h1
            className="mb-6 text-5xl font-bold leading-[1.02] tracking-tight text-white opacity-0 sm:text-6xl md:text-7xl lg:text-[88px]"
            style={{ animation: "fadeSlideUp 0.9s var(--ease-spring) 0.3s forwards" }}
          >
            <span className="block">We are</span>
            <span className="relative block">
              <span
                className="inline-block bg-clip-text text-transparent"
                style={{
                  backgroundImage:
                    "linear-gradient(90deg, #38bdf8 0%, #a855f7 35%, #ec4899 70%, #38bdf8 100%)",
                  backgroundSize: "200% 100%",
                  animation: "textShimmer 6s linear infinite",
                }}
              >
                CloudWay.
              </span>
              <span
                aria-hidden
                className="absolute -inset-x-4 -inset-y-2 -z-10 block opacity-60 blur-2xl"
                style={{
                  background:
                    "linear-gradient(90deg, rgba(56,189,248,0.4) 0%, rgba(168,85,247,0.4) 50%, rgba(236,72,153,0.4) 100%)",
                }}
              />
            </span>
          </h1>

          <p
            className="mb-10 max-w-xl text-lg leading-relaxed text-gray-300/90 opacity-0 sm:text-xl"
            style={{
              animation: "fadeSlideUp 0.8s var(--ease-spring) 0.6s forwards",
              textWrap: "pretty",
            }}
          >
            We build full-stack applications that help businesses scale, streamline operations, and
            stand out online.
          </p>

          <div
            className="flex flex-wrap items-center gap-3 opacity-0"
            style={{ animation: "fadeSlideUp 0.8s var(--ease-spring) 0.85s forwards" }}
          >
            <StarButton href="/work">View Work</StarButton>
            <StarButton href="/#contact" variant="ghost">
              Start a project
            </StarButton>
          </div>

          {/* Trust row */}
          <div
            className="mt-12 flex flex-wrap items-center gap-x-6 gap-y-3 opacity-0"
            style={{ animation: "fadeSlideUp 0.8s var(--ease-spring) 1.1s forwards" }}
          >
            <div className="flex items-center gap-2">
              <div className="flex -space-x-2">
                {AVATAR_COLORS.map((c, i) => (
                  <span
                    key={i}
                    className="h-7 w-7 rounded-full border-2 border-cw-dark"
                    style={{ background: `linear-gradient(135deg, ${c}, ${c}88)` }}
                  />
                ))}
              </div>
              <span className="text-xs text-gray-400">
                <span className="font-semibold text-white">40+ teams</span> shipped with us
              </span>
            </div>
            <div className="hidden h-4 w-px bg-white/15 sm:block" />
            <div className="flex items-center gap-1.5 text-xs text-gray-400">
              <span className="text-amber-300">★★★★★</span>
              <span>4.9 avg on project retros</span>
            </div>
          </div>
        </div>

        {/* Right: carousel */}
        <div className="hidden shrink-0 flex-col items-center gap-5 lg:flex">
          <div className="flex flex-col gap-4">
            {visible.map((slide, i) =>
              slide.kind === "announcement" ? (
                <AnnouncementCard
                  key={`${slide.data.id}-${page}`}
                  a={slide.data}
                  index={i}
                />
              ) : (
                <StatCardView
                  key={`${slide.data.title}-${page}`}
                  item={slide.data}
                  index={i}
                />
              ),
            )}
          </div>

          {totalPages > 1 && (
            <div
              className="flex items-center gap-3 opacity-0"
              style={{ animation: "fadeSlideUp 0.6s var(--ease-spring) 1.3s forwards" }}
            >
              <button
                onClick={prev}
                className="rounded-full border border-white/10 bg-white/5 p-1.5 text-gray-400 backdrop-blur-md transition-all hover:border-white/25 hover:bg-white/10 hover:text-white"
                aria-label="Previous"
              >
                <ChevronLeftIcon className="h-4 w-4" />
              </button>
              <div className="flex items-center gap-1.5">
                {Array.from({ length: totalPages }, (_, i) => (
                  <button
                    key={i}
                    onClick={() => setPage(i)}
                    className={`h-1.5 rounded-full transition-all duration-500 ${
                      i === page
                        ? "w-6 bg-linear-to-r from-sky-400 to-purple-400"
                        : "w-1.5 bg-white/25 hover:bg-white/50"
                    }`}
                    aria-label={`Page ${i + 1}`}
                  />
                ))}
              </div>
              <button
                onClick={next}
                className="rounded-full border border-white/10 bg-white/5 p-1.5 text-gray-400 backdrop-blur-md transition-all hover:border-white/25 hover:bg-white/10 hover:text-white"
                aria-label="Next"
              >
                <ChevronRightIcon className="h-4 w-4" />
              </button>
            </div>
          )}
        </div>
      </div>

      {/* Scroll indicator */}
      <button
        onClick={() => document.getElementById("content")?.scrollIntoView({ behavior: "smooth" })}
        className="absolute bottom-8 left-1/2 z-10 -translate-x-1/2 opacity-0"
        style={{ animation: "fadeSlideUp 0.8s var(--ease-spring) 1.5s forwards" }}
        aria-label="Scroll to content"
      >
        <span className="flex flex-col items-center gap-2.5 text-gray-400 transition-colors hover:text-white">
          <span className="text-[10px] font-medium uppercase tracking-[0.3em]">Scroll</span>
          <span className="relative flex h-10 w-6 items-start justify-center rounded-full border border-white/20 p-1.5">
            <span
              className="h-2 w-1 rounded-full bg-linear-to-b from-white to-purple-400"
              style={{ animation: "scrollDot 2s ease-in-out infinite" }}
            />
          </span>
        </span>
      </button>

      {/* Socials */}
      <div
        className="absolute bottom-8 left-6 z-10 flex items-center gap-4 opacity-0 sm:left-10"
        style={{ animation: "fadeSlideUp 0.8s var(--ease-spring) 1.4s forwards" }}
      >
        {[
          {
            label: "Twitter",
            href: "https://x.com/Whayyven",
            d: "M18.244 2.25h3.308l-7.227 8.26 8.502 11.24H16.17l-5.214-6.817L4.99 21.75H1.68l7.73-8.835L1.254 2.25H8.08l4.713 6.231zm-1.161 17.52h1.833L7.084 4.126H5.117z",
          },
          {
            label: "LinkedIn",
            href: "https://www.linkedin.com/in/wayne-foster-jr",
            d: "M20.447 20.452h-3.554v-5.569c0-1.328-.027-3.037-1.852-3.037-1.853 0-2.136 1.445-2.136 2.939v5.667H9.351V9h3.414v1.561h.046c.477-.9 1.637-1.85 3.37-1.85 3.601 0 4.267 2.37 4.267 5.455v6.286zM5.337 7.433a2.062 2.062 0 0 1-2.063-2.065 2.064 2.064 0 1 1 2.063 2.065zm1.782 13.019H3.555V9h3.564v11.452zM22.225 0H1.771C.792 0 0 .774 0 1.729v20.542C0 23.227.792 24 1.771 24h20.451C23.2 24 24 23.227 24 22.271V1.729C24 .774 23.2 0 22.222 0h.003z",
          },
          {
            label: "GitHub",
            href: "https://github.com/Whayven",
            d: "M12 2C6.477 2 2 6.484 2 12.017c0 4.425 2.865 8.18 6.839 9.504.5.092.682-.217.682-.483 0-.237-.008-.868-.013-1.703-2.782.605-3.369-1.343-3.369-1.343-.454-1.158-1.11-1.466-1.11-1.466-.908-.62.069-.608.069-.608 1.003.07 1.531 1.032 1.531 1.032.892 1.53 2.341 1.088 2.91.832.092-.647.35-1.088.636-1.338-2.22-.253-4.555-1.113-4.555-4.951 0-1.093.39-1.988 1.029-2.688-.103-.253-.446-1.272.098-2.65 0 0 .84-.27 2.75 1.026A9.564 9.564 0 0 1 12 6.844a9.59 9.59 0 0 1 2.504.337c1.909-1.296 2.747-1.027 2.747-1.027.546 1.379.202 2.398.1 2.651.64.7 1.028 1.595 1.028 2.688 0 3.848-2.339 4.695-4.566 4.943.359.309.678.92.678 1.855 0 1.338-.012 2.419-.012 2.747 0 .268.18.58.688.482A10.019 10.019 0 0 0 22 12.017C22 6.484 17.522 2 12 2z",
          },
        ].map((s) => (
          <a
            key={s.label}
            href={s.href}
            target="_blank"
            rel="noopener noreferrer"
            aria-label={s.label}
            className="group relative text-gray-500 transition-colors hover:text-white"
          >
            <svg
              className="h-5 w-5 transition-transform duration-300 group-hover:-translate-y-0.5"
              fill="currentColor"
              viewBox="0 0 24 24"
            >
              <path d={s.d} />
            </svg>
            <span className="absolute -inset-2 -z-10 rounded-full bg-purple-500/30 opacity-0 blur-sm transition-opacity duration-300 group-hover:opacity-100" />
          </a>
        ))}
      </div>
    </section>
  )
}
