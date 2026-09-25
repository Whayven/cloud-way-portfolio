"use client"

import { useEffect, useRef, useState } from "react"

type Heading = { id: string; label: string }

/**
 * "On this page" rail for an article. Headings are read from the rendered
 * article (`[data-h2]` inside `#${articleId}`) so ids always match the body.
 * The active heading is the last one whose top has passed 35% of the viewport.
 */
export function ArticleToc({ articleId }: { articleId: string }) {
  const [headings, setHeadings] = useState<Heading[]>([])
  const [active, setActive] = useState("")
  const listRef = useRef<HTMLUListElement>(null)
  const barRef = useRef<HTMLSpanElement>(null)
  const readBarRef = useRef<HTMLDivElement>(null)
  const readLabelRef = useRef<HTMLParagraphElement>(null)

  useEffect(() => {
    const article = document.getElementById(articleId)
    if (!article) return
    const els = Array.from(article.querySelectorAll<HTMLElement>("[data-h2]"))

    let raf = 0
    const update = () => {
      raf = 0
      const r = article.getBoundingClientRect()
      const vh = window.innerHeight
      const read = Math.max(0, Math.min(1, (vh * 0.3 - r.top) / (r.height - vh * 0.5)))
      if (readBarRef.current) readBarRef.current.style.width = `${read * 100}%`
      if (readLabelRef.current) readLabelRef.current.textContent = `${Math.round(read * 100)}% read`

      let current = els[0]?.id ?? ""
      for (const el of els) if (el.getBoundingClientRect().top < vh * 0.35) current = el.id
      setActive(current)
    }
    const onScroll = () => {
      if (!raf) raf = requestAnimationFrame(update)
    }
    raf = requestAnimationFrame(() => {
      setHeadings(els.map((el) => ({ id: el.id, label: el.textContent ?? "" })))
      update()
    })
    window.addEventListener("scroll", onScroll, { passive: true })
    window.addEventListener("resize", onScroll)
    return () => {
      cancelAnimationFrame(raf)
      window.removeEventListener("scroll", onScroll)
      window.removeEventListener("resize", onScroll)
    }
  }, [articleId])

  // Slide the indicator to the active item (measured, so wrapped labels work).
  useEffect(() => {
    const item = listRef.current?.querySelector<HTMLElement>(`[data-toc="${CSS.escape(active)}"]`)
    const bar = barRef.current
    if (!item || !bar) return
    bar.style.top = `${item.offsetTop}px`
    bar.style.height = `${item.offsetHeight}px`
    bar.style.opacity = "1"
  }, [active, headings])

  const go = (e: React.MouseEvent<HTMLAnchorElement>, id: string) => {
    const el = document.getElementById(id)
    if (!el) return
    e.preventDefault()
    const smooth = !window.matchMedia("(prefers-reduced-motion: reduce)").matches
    window.scrollTo({
      top: el.getBoundingClientRect().top + window.scrollY - 100,
      behavior: smooth ? "smooth" : "auto",
    })
    history.replaceState(null, "", `#${id}`)
  }

  return (
    <nav aria-label="On this page">
      {headings.length > 0 && (
        <>
          <p className="text-[10px] font-medium uppercase tracking-[0.3em] text-white/40">On this page</p>
          <div className="relative mt-4">
            <span
              ref={barRef}
              aria-hidden
              className="absolute -left-px top-0 w-px bg-purple-400 opacity-0 shadow-[0_0_8px_#a855f7] transition-[top,height] duration-[450ms] ease-(--ease-spring)"
            />
            <ul ref={listRef} className="flex flex-col gap-3 border-l border-white/10 pl-4">
              {headings.map((h) => (
                <li key={h.id} data-toc={h.id}>
                  <a
                    href={`#${h.id}`}
                    onClick={(e) => go(e, h.id)}
                    aria-current={h.id === active ? "location" : undefined}
                    className={`block text-xs leading-[1.6] transition-colors duration-300 ${
                      h.id === active ? "text-white" : "text-white/45 hover:text-white/80"
                    }`}
                  >
                    {h.label}
                  </a>
                </li>
              ))}
            </ul>
          </div>
        </>
      )}
      <div className="mt-7 h-0.5 overflow-hidden rounded-sm bg-white/[0.06]">
        <div ref={readBarRef} className="h-full w-0 bg-linear-to-r from-sky-400 via-purple-500 to-pink-500" />
      </div>
      <p ref={readLabelRef} className="mt-2 text-[10px] tracking-widest text-white/35">
        0% read
      </p>
    </nav>
  )
}
