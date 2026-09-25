"use client"

import { useState } from "react"
import { WorkCard, type WorkCardItem } from "@/components/site/work-card"

export function WorkFilter({ items }: { items: WorkCardItem[] }) {
  const [query, setQuery] = useState("")
  const q = query.trim().toLowerCase()

  const visible = q
    ? items.filter((it) =>
        [it.title, it.summary, ...it.techStack].join(" ").toLowerCase().includes(q),
      )
    : items

  if (items.length === 0) {
    return (
      <div className="mx-auto mt-14 max-w-3xl rounded-3xl border border-white/10 bg-white/[0.02] p-16 text-center">
        <p className="text-gray-400">No projects published yet.</p>
      </div>
    )
  }

  return (
    <>
      <div className="pb-2">
        <label className="flex max-w-[30rem] items-center gap-3 rounded-full border border-white/10 bg-cw-dark/[0.72] px-[18px] py-2.5 backdrop-blur-[14px] transition-[border-color,box-shadow] duration-300 focus-within:border-purple-400/40 focus-within:shadow-[0_0_0_4px_rgba(168,85,247,0.12)]">
          <svg
            className="h-4 w-4 shrink-0 text-white/50"
            viewBox="0 0 24 24"
            fill="none"
            stroke="currentColor"
            strokeWidth="2"
            aria-hidden
          >
            <circle cx="11" cy="11" r="7" />
            <path strokeLinecap="round" d="m20 20-3.5-3.5" />
          </svg>
          <span className="sr-only">Search projects</span>
          <input
            type="search"
            value={query}
            onChange={(e) => setQuery(e.target.value)}
            placeholder="Search projects, tech, keywords…"
            className="min-w-0 flex-1 border-0 bg-transparent p-0 text-sm text-white outline-none placeholder:text-white/40 focus:ring-0"
          />
          <span
            className="shrink-0 text-[10px] font-medium uppercase tracking-widest text-white/40"
            aria-live="polite"
          >
            {visible.length} {visible.length === 1 ? "result" : "results"}
          </span>
        </label>
      </div>

      {visible.length === 0 ? (
        <div className="mx-auto mt-14 max-w-3xl rounded-3xl border border-white/10 bg-white/[0.02] p-16 text-center motion-safe:animate-[fade-up_0.5s_var(--ease-spring)]">
          <p className="text-gray-400">No projects match &ldquo;{query.trim()}&rdquo;.</p>
        </div>
      ) : (
        <div className="mt-10 grid grid-cols-1 gap-5 md:grid-cols-2">
          {visible.map((item, i) => {
            const featured = !q && i === 0
            return (
              <div
                key={item.slug}
                className={featured ? "md:col-span-2" : undefined}
                style={{ animation: `fade-up .7s var(--ease-spring) ${0.1 + i * 0.08}s both` }}
              >
                <WorkCard item={item} featured={featured} highlight={q} />
              </div>
            )
          })}
        </div>
      )}
    </>
  )
}
