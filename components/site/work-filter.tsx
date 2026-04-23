"use client"

import { useMemo, useState } from "react"
import { WorkGrid, type WorkGridItem } from "@/components/site/work-grid"

const CATEGORIES = ["All", "Web app", "Analytics", "Mobile", "Ops"] as const
type Category = (typeof CATEGORIES)[number]

function categorize(techStack: string[]): Category {
  const haystack = techStack.join(" ").toLowerCase()
  if (/(react native|expo|ios|android|swift|kotlin|mobile)/.test(haystack)) return "Mobile"
  if (/(clickhouse|d3|dashboard|chart|snowflake|duckdb|analytics|bigquery)/.test(haystack))
    return "Analytics"
  if (
    /(airflow|temporal|queue|cron|pipeline|zapier|ops|devops|docker|k8s|kubernetes|terraform|helm|monitoring|prometheus|grafana|ci\/cd|ci-cd|github actions|aws|gcp|azure|cloudflare|infra|infrastructure)/.test(
      haystack,
    )
  )
    return "Ops"
  return "Web app"
}

export function WorkFilter({ items }: { items: WorkGridItem[] }) {
  const [active, setActive] = useState<Category>("All")

  const enriched = useMemo(
    () => items.map((it) => ({ ...it, category: categorize(it.techStack) })),
    [items],
  )

  const counts = useMemo(() => {
    const c: Record<Category, number> = { All: enriched.length, "Web app": 0, Analytics: 0, Mobile: 0, Ops: 0 }
    for (const it of enriched) c[it.category]++
    return c
  }, [enriched])

  const visible = active === "All" ? enriched : enriched.filter((it) => it.category === active)

  return (
    <>
      <div className="pb-6">
        <div className="sticky top-20 z-30 flex flex-wrap items-center gap-2 rounded-full border border-white/10 bg-cw-dark/70 p-1.5 backdrop-blur-md sm:w-fit">
          {CATEGORIES.map((c) => (
            <button
              key={c}
              onClick={() => setActive(c)}
              aria-pressed={active === c}
              className={`whitespace-nowrap rounded-full px-4 py-1.5 text-xs font-medium transition-all duration-300 ${
                active === c
                  ? "bg-linear-to-r from-purple-500 to-fuchsia-500 text-white shadow-[0_0_20px_-5px_rgba(168,85,247,0.6)]"
                  : "text-gray-400 hover:bg-white/5 hover:text-white"
              }`}
            >
              {c}
              <span className="ml-2 text-[10px] opacity-70">{counts[c]}</span>
            </button>
          ))}
        </div>
      </div>
      <WorkGrid
        items={visible.map((it, i) => ({ ...it, featured: active === "All" && i === 0 }))}
      />
    </>
  )
}
