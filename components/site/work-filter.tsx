"use client"

import { useMemo, useState } from "react"
import { WorkGrid, type WorkGridItem } from "@/components/site/work-grid"

export function WorkFilter({ items }: { items: WorkGridItem[] }) {
  const [query, setQuery] = useState("")

  const trimmed = query.trim().toLowerCase()

  const visible = useMemo(() => {
    if (!trimmed) return items
    return items.filter((it) => {
      const haystack = [it.title, it.summary, ...it.techStack]
        .join(" ")
        .toLowerCase()
      return haystack.includes(trimmed)
    })
  }, [items, trimmed])

  return (
    <>
      <div className="pb-6">
        <div className="sticky top-20 z-30 flex items-center gap-3 rounded-full border border-white/10 bg-cw-dark/70 px-4 py-2 backdrop-blur-md sm:max-w-md">
          <svg
            className="h-4 w-4 shrink-0 text-white/50"
            viewBox="0 0 24 24"
            fill="none"
            stroke="currentColor"
            strokeWidth="2"
            aria-hidden="true"
          >
            <circle cx="11" cy="11" r="7" />
            <path strokeLinecap="round" d="m20 20-3.5-3.5" />
          </svg>
          <input
            type="search"
            value={query}
            onChange={(e) => setQuery(e.target.value)}
            placeholder="Search projects, tech, keywords…"
            aria-label="Search projects"
            className="min-w-0 flex-1 bg-transparent text-sm text-white placeholder:text-white/40 focus:outline-none"
          />
          <span className="shrink-0 text-[10px] font-medium uppercase tracking-widest text-white/40">
            {visible.length}
            <span className="ml-1 normal-case tracking-normal text-white/30">
              {visible.length === 1 ? "result" : "results"}
            </span>
          </span>
        </div>
      </div>
      {visible.length === 0 ? (
        <div className="mx-auto mt-14 max-w-3xl rounded-3xl border border-white/10 bg-white/2 p-16 text-center">
          <p className="text-gray-400">
            No projects match &ldquo;{query.trim()}&rdquo;.
          </p>
        </div>
      ) : (
        <WorkGrid
          items={visible.map((it, i) => ({
            ...it,
            featured: !trimmed && i === 0,
          }))}
        />
      )}
    </>
  )
}
