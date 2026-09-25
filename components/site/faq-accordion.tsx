"use client"

import { useId, useState } from "react"

/** Single-open accordion; the first item starts open. */
export function FaqAccordion({ items }: { items: { q: string; a: string }[] }) {
  const [open, setOpen] = useState(0)
  const baseId = useId()

  return (
    <ul className="border-t border-white/10">
      {items.map((f, i) => {
        const isOpen = open === i
        const panelId = `${baseId}-panel-${i}`
        const buttonId = `${baseId}-button-${i}`
        return (
          <li key={f.q} className="border-b border-white/10">
            <button
              id={buttonId}
              type="button"
              onClick={() => setOpen(isOpen ? -1 : i)}
              aria-expanded={isOpen}
              aria-controls={panelId}
              className="flex w-full cursor-pointer items-center justify-between gap-6 py-[26px] text-left text-white"
            >
              <span className="text-lg font-medium tracking-[-0.02em]">{f.q}</span>
              <span
                aria-hidden
                className={`relative flex h-8 w-8 shrink-0 items-center justify-center rounded-full border transition-all duration-400 ${
                  isOpen
                    ? "border-purple-400/50 bg-purple-500/15 text-purple-300"
                    : "border-white/15 bg-transparent text-white"
                }`}
              >
                <span className="absolute h-[1.5px] w-3 bg-current" />
                <span
                  className={`absolute h-3 w-[1.5px] bg-current transition-transform duration-400 ease-(--ease-spring) ${
                    isOpen ? "rotate-90" : ""
                  }`}
                />
              </span>
            </button>
            <div
              id={panelId}
              role="region"
              aria-labelledby={buttonId}
              // Collapsed answers are only visually hidden; inert keeps them out of
              // the accessibility tree and tab order.
              inert={!isOpen}
              className="grid transition-[grid-template-rows,opacity] duration-500 ease-(--ease-spring)"
              style={{ gridTemplateRows: isOpen ? "1fr" : "0fr", opacity: isOpen ? 1 : 0 }}
            >
              <div className="overflow-hidden">
                <p
                  className="pb-7 pr-12 text-[15px] leading-[1.7] text-gray-400"
                  style={{ textWrap: "pretty" }}
                >
                  {f.a}
                </p>
              </div>
            </div>
          </li>
        )
      })}
    </ul>
  )
}
