"use client"

import { useEffect, useRef } from "react"

export type ProcessStep = { step: string; title: string; body: string; glow: string }

/**
 * Process steps on a timeline whose gradient fill (ending in a comet head)
 * grows with scroll. Each step's node lights up once the fill reaches it.
 */
export function ProcessTimeline({ steps }: { steps: ProcessStep[] }) {
  const rootRef = useRef<HTMLDivElement>(null)
  const fillRef = useRef<HTMLDivElement>(null)

  useEffect(() => {
    const root = rootRef.current
    if (!root) return
    const nodes = Array.from(root.querySelectorAll<HTMLElement>("[data-node]"))
    const glows = Array.from(root.querySelectorAll<HTMLElement>("[data-glow]"))

    let raf = 0
    const update = () => {
      raf = 0
      const r = root.getBoundingClientRect()
      const p = Math.max(0, Math.min(1, (window.innerHeight * 0.7 - r.top) / (r.height * 0.9)))
      if (fillRef.current) fillRef.current.style.width = `${p * 100}%`
      nodes.forEach((nd, i) => {
        const on = p >= i * 0.25 + 0.02
        nd.style.color = on ? "#fff" : "rgba(255,255,255,0.45)"
        nd.style.borderColor = on ? "rgba(255,255,255,0.35)" : "rgba(255,255,255,0.12)"
        nd.style.transform = on ? "scale(1.06)" : "scale(1)"
        const gl = glows[i]
        if (gl) {
          gl.style.opacity = on ? "0.9" : "0"
          gl.style.transform = on ? "scale(1.15)" : "scale(.6)"
        }
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
    <div ref={rootRef} className="mx-auto mt-[72px] max-w-6xl px-2">
      <div className="relative grid grid-cols-1 gap-8 sm:grid-cols-2 lg:grid-cols-4">
        <div className="pointer-events-none absolute inset-x-0 top-10 hidden h-px bg-white/[0.08] lg:block" />
        <div
          ref={fillRef}
          className="pointer-events-none absolute left-0 top-10 hidden h-px w-0 lg:block"
          style={{ background: "linear-gradient(90deg, rgba(168,85,247,0.2), #a855f7, #38bdf8, #ec4899)" }}
        >
          <span className="absolute -right-1 -top-1 h-[9px] w-[9px] rounded-full bg-white shadow-[0_0_10px_#fff,0_0_24px_#a855f7,0_0_48px_rgba(168,85,247,0.8)]" />
        </div>
        {steps.map((s) => (
          <div key={s.step} className="relative">
            <div className="relative z-10 flex h-20 w-20 items-center justify-center">
              <span
                data-glow
                className="absolute inset-0 rounded-full blur-[16px] transition-all duration-700 ease-(--ease-spring)"
                style={{
                  opacity: 0,
                  transform: "scale(.6)",
                  background: `radial-gradient(circle, ${s.glow}, transparent 70%)`,
                }}
              />
              <span
                data-node
                className="relative flex h-16 w-16 items-center justify-center rounded-full border border-white/[0.12] bg-cw-dark/85 text-lg font-semibold tracking-[-0.025em] text-white/45 backdrop-blur-md transition-all duration-600 ease-(--ease-spring)"
              >
                {s.step}
              </span>
            </div>
            <h3 className="mt-[22px] text-[19px] font-semibold tracking-[-0.025em] text-white">{s.title}</h3>
            <p className="mt-2 text-sm leading-[1.65] text-gray-400">{s.body}</p>
          </div>
        ))}
      </div>
    </div>
  )
}
