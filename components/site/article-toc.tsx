"use client"

import { useEffect, useState } from "react"

export type TocEntry = { id: string; label: string }

export function ArticleToc({ entries }: { entries: TocEntry[] }) {
  const [active, setActive] = useState(entries[0]?.id ?? "")

  useEffect(() => {
    if (entries.length === 0) return
    const obs = new IntersectionObserver(
      (observed) => {
        observed.forEach((e) => {
          if (e.isIntersecting) setActive(e.target.id)
        })
      },
      { rootMargin: "-30% 0px -60% 0px", threshold: 0 },
    )
    entries.forEach((t) => {
      const el = document.getElementById(t.id)
      if (el) obs.observe(el)
    })
    return () => obs.disconnect()
  }, [entries])

  if (entries.length === 0) return null

  return (
    <aside className="hidden xl:block">
      <div className="sticky top-24">
        <p className="text-[10px] font-medium uppercase tracking-[0.3em] text-white/40">
          On this page
        </p>
        <ul className="mt-4 space-y-2.5 border-l border-white/10 pl-4">
          {entries.map((t) => (
            <li key={t.id}>
              <a
                href={`#${t.id}`}
                className={`relative block text-xs leading-relaxed transition-colors ${
                  active === t.id ? "text-white" : "text-white/45 hover:text-white/70"
                }`}
              >
                {active === t.id && (
                  <span className="absolute -left-[17px] top-1/2 h-4 w-px -translate-y-1/2 bg-purple-400" />
                )}
                {t.label}
              </a>
            </li>
          ))}
        </ul>
      </div>
    </aside>
  )
}
