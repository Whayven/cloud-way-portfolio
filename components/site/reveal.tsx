"use client"

import { useEffect, useRef } from "react"

const EASE = "cubic-bezier(.2,.8,.2,1)"

/**
 * Scroll reveal: fades up from 32px with an 8px blur the first time it
 * enters the viewport. Styles are written directly to the node so the
 * reveal never re-renders React.
 */
export function Reveal({
  children,
  index = 0,
  className,
}: {
  children: React.ReactNode
  /** Stagger position — delays the reveal by `index * 0.09s`. */
  index?: number
  className?: string
}) {
  const ref = useRef<HTMLDivElement>(null)

  useEffect(() => {
    const el = ref.current
    if (!el) return
    const show = () => {
      el.style.opacity = "1"
      el.style.transform = "none"
      el.style.filter = "none"
    }
    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) {
      show()
      return
    }
    const io = new IntersectionObserver(
      (entries) => {
        if (!entries.some((e) => e.isIntersecting)) return
        const delay = index * 0.09
        el.style.transition = ["opacity", "transform", "filter"]
          .map((p) => `${p} .9s ${EASE} ${delay}s`)
          .join(", ")
        show()
        io.disconnect()
      },
      { rootMargin: "0px 0px -60px 0px" },
    )
    io.observe(el)
    return () => io.disconnect()
  }, [index])

  return (
    <div
      ref={ref}
      className={className}
      style={{ opacity: 0, transform: "translateY(32px)", filter: "blur(8px)" }}
    >
      {children}
    </div>
  )
}
