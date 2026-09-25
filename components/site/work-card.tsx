"use client"

import Image from "next/image"
import Link from "next/link"
import { workGradient } from "@/lib/cover-art"

export type WorkCardItem = {
  slug: string
  title: string
  summary: string
  imageUrl: string | null
  techStack: string[]
}

const TILT = 7

function prefersReducedMotion() {
  return window.matchMedia("(prefers-reduced-motion: reduce)").matches
}

/**
 * Case-study card with a cursor-following 3D tilt and shine. Pointer
 * position is written to CSS vars/transform directly — no React state.
 */
export function WorkCard({
  item,
  featured = false,
  highlight = "",
}: {
  item: WorkCardItem
  /** Full-width, wider media. */
  featured?: boolean
  /** Lower-cased search query; matching tech chips are highlighted. */
  highlight?: string
}) {
  const onMove = (e: React.MouseEvent<HTMLAnchorElement>) => {
    const el = e.currentTarget
    const r = el.getBoundingClientRect()
    const px = e.clientX - r.left
    const py = e.clientY - r.top
    el.style.setProperty("--mx", `${px}px`)
    el.style.setProperty("--my", `${py}px`)
    if (prefersReducedMotion()) return
    const x = px / r.width - 0.5
    const y = py / r.height - 0.5
    el.style.transform = `perspective(1600px) rotateY(${x * TILT}deg) rotateX(${-y * TILT}deg)`
  }

  const onLeave = (e: React.MouseEvent<HTMLAnchorElement>) => {
    e.currentTarget.style.transform = ""
  }

  return (
    <Link
      href={`/work/${item.slug}`}
      onMouseMove={onMove}
      onMouseLeave={onLeave}
      className="group relative block h-full overflow-hidden rounded-3xl border border-white/10 bg-white/[0.03] transition-[transform,border-color] duration-500 ease-(--ease-spring) hover:border-white/25"
    >
      <div className={`relative overflow-hidden ${featured ? "aspect-[21/9]" : "aspect-[16/10]"}`}>
        <div className="absolute inset-0 transition-transform duration-[1400ms] ease-(--ease-spring) group-hover:scale-[1.12]">
          {item.imageUrl ? (
            <Image
              src={item.imageUrl}
              alt={item.title}
              fill
              sizes={featured ? "(max-width: 768px) 100vw, 85rem" : "(max-width: 768px) 100vw, 50vw"}
              className="object-cover"
            />
          ) : (
            <div className="absolute inset-0" style={{ background: workGradient(item.slug) }} />
          )}
        </div>
        <div
          className="pointer-events-none absolute inset-0 opacity-40"
          style={{
            backgroundImage:
              "linear-gradient(rgba(255,255,255,0.06) 1px, transparent 1px), linear-gradient(90deg, rgba(255,255,255,0.06) 1px, transparent 1px)",
            backgroundSize: "36px 36px",
          }}
        />
        <div className="absolute left-6 top-6 flex items-center gap-2 rounded-xl border border-white/20 bg-cw-dark/60 px-3 py-2 backdrop-blur-md">
          <span className="h-2 w-2 rounded-full bg-emerald-400 motion-safe:animate-[breathe_2.4s_ease-in-out_infinite]" />
          <span className="text-[10px] font-medium uppercase tracking-widest text-white/75">Live</span>
        </div>
        {item.techStack[0] && (
          <div className="absolute right-6 top-6 whitespace-nowrap rounded-xl border border-white/20 bg-cw-dark/60 px-3 py-2 font-mono text-[10px] text-white/80 backdrop-blur-md">
            {item.techStack[0]}
          </div>
        )}
        <div className="absolute inset-0 bg-linear-to-t from-cw-dark/65 to-transparent to-55%" />
        <div
          className="pointer-events-none absolute inset-0 opacity-0 transition-opacity duration-400 group-hover:opacity-100"
          style={{
            background:
              "radial-gradient(500px circle at var(--mx, 50%) var(--my, 50%), rgba(255,255,255,0.14), transparent 50%)",
          }}
        />
      </div>

      <div className="relative p-7">
        <div className="flex items-start justify-between gap-4">
          <div className="min-w-0">
            <p className="text-[10px] font-medium uppercase tracking-[0.3em] text-white/40">
              Case study
            </p>
            <h3
              className={`mt-1.5 font-semibold tracking-[-0.03em] text-white ${
                featured ? "text-[32px]" : "text-2xl"
              }`}
            >
              {item.title}
            </h3>
          </div>
          <span className="mt-1 flex h-10 w-10 shrink-0 items-center justify-center rounded-full border border-white/10 text-white transition-[transform,background-color] duration-300 ease-(--ease-spring) group-hover:rotate-45 group-hover:bg-purple-500/25">
            <svg className="h-4 w-4" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
              <path strokeLinecap="round" strokeLinejoin="round" d="M7 17L17 7M7 7h10v10" />
            </svg>
          </span>
        </div>
        <p className="mt-3 max-w-xl text-sm leading-relaxed text-gray-400">{item.summary}</p>
        {item.techStack.length > 0 && (
          <ul className="mt-5 flex flex-wrap gap-1.5">
            {item.techStack.map((t) => {
              const hit = highlight !== "" && t.toLowerCase().includes(highlight)
              return (
                <li
                  key={t}
                  className={`whitespace-nowrap rounded-full border px-2.5 py-1 text-[10px] font-medium tracking-wide transition-all duration-300 ${
                    hit
                      ? "border-purple-400/60 bg-purple-500/[0.18] text-white"
                      : "border-white/10 bg-white/[0.04] text-gray-300"
                  }`}
                >
                  {t}
                </li>
              )
            })}
          </ul>
        )}
      </div>
    </Link>
  )
}
