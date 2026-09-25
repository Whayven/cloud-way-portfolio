"use client"

import { useEffect, useRef } from "react"

/**
 * A statement whose words light up (opacity 0.14 → 1) in reading order as the
 * paragraph scrolls through the viewport. Opacity is written straight to the
 * word spans from a scroll listener — no React state.
 */
export function ScrollLitText({
  text,
  highlight = [],
  className,
  style,
}: {
  text: string
  /** Words (matched exactly, punctuation included) tinted lavender. */
  highlight?: string[]
  className?: string
  style?: React.CSSProperties
}) {
  const ref = useRef<HTMLParagraphElement>(null)
  const words = text.split(" ")

  useEffect(() => {
    const el = ref.current
    if (!el) return
    const spans = Array.from(el.querySelectorAll<HTMLSpanElement>("[data-word]"))
    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) {
      spans.forEach((s) => (s.style.opacity = "1"))
      return
    }

    let raf = 0
    const update = () => {
      raf = 0
      const r = el.getBoundingClientRect()
      const vh = window.innerHeight
      const p = Math.max(0, Math.min(1, (vh * 0.85 - r.top) / (r.height + vh * 0.35)))
      const n = spans.length
      spans.forEach((s, i) => {
        const k = Math.max(0, Math.min(1, p * n * 1.15 - i))
        s.style.opacity = (0.14 + 0.86 * k).toFixed(3)
      })
    }
    const onScroll = () => {
      if (!raf) raf = requestAnimationFrame(update)
    }
    update()
    window.addEventListener("scroll", onScroll, { passive: true })
    window.addEventListener("resize", onScroll)
    return () => {
      cancelAnimationFrame(raf)
      window.removeEventListener("scroll", onScroll)
      window.removeEventListener("resize", onScroll)
    }
  }, [])

  return (
    <p ref={ref} className={className} style={style}>
      {words.map((w, i) => (
        <span
          key={i}
          data-word
          className={`transition-opacity duration-[250ms] ease-linear ${highlight.includes(w) ? "text-purple-200" : "text-white"}`}
          style={{ opacity: 0.14 }}
        >
          {w}{" "}
        </span>
      ))}
    </p>
  )
}
