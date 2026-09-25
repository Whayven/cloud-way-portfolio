"use client"

import Image from "next/image"
import { useEffect, useRef } from "react"
import { Starfield } from "@/components/site/starfield"

const AURORA_BLOBS = [
  { color: "rgba(139,92,246,0.5)", size: 680, x: 15, y: 30, blur: 40, dur: 22, delay: 0 },
  { color: "rgba(56,189,248,0.4)", size: 560, x: 78, y: 65, blur: 46, dur: 28, delay: 3 },
  { color: "rgba(236,72,153,0.3)", size: 420, x: 58, y: 18, blur: 52, dur: 26, delay: 6 },
]

/**
 * Home backdrop: drifting nebula (parallaxes ±12px with the cursor), vignette,
 * aurora blobs and the warp-intro canvas starfield.
 */
export function NebulaBackdrop() {
  const nebulaRef = useRef<HTMLDivElement>(null)

  useEffect(() => {
    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) return
    let raf = 0
    let x = 0
    let y = 0
    const apply = () => {
      raf = 0
      if (nebulaRef.current) nebulaRef.current.style.transform = `translate3d(${x * -12}px, ${y * -12}px, 0)`
    }
    const onMove = (e: MouseEvent) => {
      x = (e.clientX / window.innerWidth - 0.5) * 2
      y = (e.clientY / window.innerHeight - 0.5) * 2
      if (!raf) raf = requestAnimationFrame(apply)
    }
    window.addEventListener("mousemove", onMove, { passive: true })
    return () => {
      window.removeEventListener("mousemove", onMove)
      cancelAnimationFrame(raf)
    }
  }, [])

  return (
    <div className="pointer-events-none fixed inset-0 z-0 overflow-hidden" aria-hidden>
      <div ref={nebulaRef} className="absolute inset-0 transition-transform duration-800 ease-(--ease-spring)">
        <div
          className="absolute inset-0 opacity-50"
          style={{ animation: "nebula-drift 60s ease-in-out infinite, hue-shift 30s ease-in-out infinite" }}
        >
          <Image src="/assets/hero-nebula.png" alt="" fill sizes="100vw" priority className="object-cover" />
        </div>
      </div>

      <div
        className="absolute inset-0"
        style={{
          background:
            "radial-gradient(ellipse at center, transparent 35%, rgba(19,21,26,0.6) 80%, rgba(19,21,26,0.96) 100%), linear-gradient(180deg, rgba(19,21,26,0.15) 0%, rgba(19,21,26,0.55) 60%, rgba(19,21,26,0.95) 100%)",
        }}
      />

      {AURORA_BLOBS.map((b) => (
        <div
          key={b.color}
          className="absolute rounded-full mix-blend-screen"
          style={{
            left: `${b.x}%`,
            top: `${b.y}%`,
            width: b.size,
            height: b.size,
            margin: `-${b.size / 2}px 0 0 -${b.size / 2}px`,
            background: `radial-gradient(circle, ${b.color} 0%, transparent 65%)`,
            filter: `blur(${b.blur}px)`,
            animation: `aurora ${b.dur}s ease-in-out ${b.delay}s infinite`,
          }}
        />
      ))}

      <Starfield variant="hero" />
    </div>
  )
}
