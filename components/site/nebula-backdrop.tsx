"use client"

import Image from "next/image"
import { useEffect, useMemo, useState } from "react"

type Star = {
  x: number
  y: number
  size: number
  delay: number
  duration: number
  baseOpacity: number
}

type StarLayer = {
  count: number
  seed: number
  depth: number
  size: [number, number]
  opacity: number
}

function mulberry32(seed: number) {
  return () => {
    let t = (seed += 0x6d2b79f5)
    t = Math.imul(t ^ (t >>> 15), t | 1)
    t ^= t + Math.imul(t ^ (t >>> 7), t | 61)
    return ((t ^ (t >>> 14)) >>> 0) / 4294967296
  }
}

function makeStars(count: number, seed: number, minSize: number, maxSize: number): Star[] {
  const rand = mulberry32(seed)
  return Array.from({ length: count }, () => ({
    x: rand() * 100,
    y: rand() * 100,
    size: minSize + rand() * (maxSize - minSize),
    delay: rand() * 6,
    duration: 2.5 + rand() * 5,
    baseOpacity: 0.3 + rand() * 0.7,
  }))
}

const STAR_LAYERS: StarLayer[] = [
  { count: 80, seed: 11, depth: 0.02, size: [0.5, 1.2], opacity: 0.5 },
  { count: 45, seed: 42, depth: 0.05, size: [1, 2], opacity: 0.75 },
  { count: 18, seed: 99, depth: 0.1, size: [1.8, 3.2], opacity: 1 },
]

const AURORA_BLOBS = [
  { color: "rgba(139,92,246,0.55)", size: 680, x: 15, y: 30, dur: 22, delay: 0, depth: 0.015 },
  { color: "rgba(56,189,248,0.45)", size: 560, x: 75, y: 65, dur: 28, delay: 3, depth: 0.025 },
  { color: "rgba(236,72,153,0.35)", size: 420, x: 55, y: 20, dur: 26, delay: 6, depth: 0.018 },
  { color: "rgba(99,102,241,0.4)", size: 500, x: 85, y: 15, dur: 32, delay: 2, depth: 0.022 },
]

const COMETS = [
  { left: "-5%", top: "15%", w: 180, delay: 0, dur: 9, angle: 205 },
  { left: "20%", top: "5%", w: 220, delay: 4.2, dur: 11, angle: 200 },
  { left: "55%", top: "10%", w: 160, delay: 7.8, dur: 13, angle: 215 },
  { left: "80%", top: "25%", w: 140, delay: 12.3, dur: 10, angle: 198 },
]

export type NebulaBackdropProps = {
  /** Image opacity (0–1). Home hero uses 0.55; interior pages use 0.35. */
  opacity?: number
  /** Enable parallax + cursor glow. Disabled on interior pages for focus. */
  interactive?: boolean
  /** Show aurora blobs. */
  aurora?: boolean
  /** Show comet streaks. */
  comets?: boolean
  /** Show constellation lines between bright stars. */
  constellations?: boolean
}

export function NebulaBackdrop({
  opacity = 0.55,
  interactive = true,
  aurora = true,
  comets = true,
  constellations = true,
}: NebulaBackdropProps) {
  const [mouse, setMouse] = useState({ x: 0, y: 0 })

  useEffect(() => {
    if (!interactive) return
    const onMove = (e: MouseEvent) => {
      const w = window.innerWidth
      const h = window.innerHeight
      setMouse({
        x: (e.clientX - w / 2) / (w / 2),
        y: (e.clientY - h / 2) / (h / 2),
      })
    }
    window.addEventListener("mousemove", onMove, { passive: true })
    return () => window.removeEventListener("mousemove", onMove)
  }, [interactive])

  const layers = useMemo(
    () =>
      STAR_LAYERS.map((L) => ({
        ...L,
        stars: makeStars(L.count, L.seed, L.size[0], L.size[1]),
      })),
    [],
  )

  const constellation = useMemo(() => {
    const bright = layers[2].stars
    const pairs: [Star, Star][] = []
    for (let i = 0; i < bright.length - 1; i++) {
      const a = bright[i]
      const b = bright[i + 1]
      const dist = Math.hypot(a.x - b.x, a.y - b.y)
      if (dist < 22) pairs.push([a, b])
    }
    return pairs
  }, [layers])

  return (
    <div className="pointer-events-none fixed inset-0 z-0 overflow-hidden" aria-hidden>
      {/* Nebula image */}
      <div
        className="absolute inset-0"
        style={{
          opacity,
          transform: `scale(1.15) translate3d(${mouse.x * -12}px, ${mouse.y * -12}px, 0)`,
          transition: "transform 0.8s var(--ease-spring)",
          animation: "nebulaDrift 60s ease-in-out infinite, hueShift 30s ease-in-out infinite",
          filter: "saturate(1.1) contrast(1.05)",
        }}
      >
        <Image
          src="/assets/hero-nebula.png"
          alt=""
          fill
          sizes="100vw"
          priority
          className="object-cover"
        />
      </div>

      {/* Vignette + dark fade */}
      <div
        className="absolute inset-0"
        style={{
          background:
            "radial-gradient(ellipse at center, transparent 40%, rgba(19,21,26,0.55) 80%, rgba(19,21,26,0.95) 100%), linear-gradient(180deg, rgba(19,21,26,0.2) 0%, rgba(19,21,26,0.5) 60%, rgba(19,21,26,0.95) 100%)",
        }}
      />

      {/* Aurora blobs */}
      {aurora && (
        <div className="absolute inset-0">
          {AURORA_BLOBS.map((b, i) => (
            <div
              key={i}
              className="absolute rounded-full"
              style={{
                width: `${b.size}px`,
                height: `${b.size}px`,
                left: `${b.x}%`,
                top: `${b.y}%`,
                marginLeft: `-${b.size / 2}px`,
                marginTop: `-${b.size / 2}px`,
                background: `radial-gradient(circle, ${b.color} 0%, transparent 65%)`,
                filter: `blur(${40 + i * 6}px)`,
                opacity: 0.9,
                mixBlendMode: "screen",
                animation: `aurora ${b.dur}s ease-in-out ${b.delay}s infinite`,
                transform: `translate3d(${mouse.x * b.depth * 60}px, ${mouse.y * b.depth * 60}px, 0)`,
                transition: "transform 0.6s var(--ease-spring)",
              }}
            />
          ))}
        </div>
      )}

      {/* Star layers */}
      {layers.map((layer, li) => (
        <div
          key={li}
          className="absolute inset-0"
          style={{
            transform: `translate3d(${mouse.x * layer.depth * 40}px, ${mouse.y * layer.depth * 40}px, 0)`,
            transition: "transform 0.4s var(--ease-spring)",
          }}
        >
          {layer.stars.map((s, i) => (
            <span
              key={i}
              className="absolute rounded-full bg-white"
              style={{
                left: `${s.x}%`,
                top: `${s.y}%`,
                width: `${s.size}px`,
                height: `${s.size}px`,
                opacity: s.baseOpacity * layer.opacity,
                boxShadow:
                  li === 2
                    ? `0 0 ${s.size * 4}px rgba(255,255,255,0.9), 0 0 ${s.size * 10}px rgba(168,85,247,0.4)`
                    : li === 1
                      ? `0 0 ${s.size * 2}px rgba(255,255,255,0.7)`
                      : "none",
                animation: `twinkle ${s.duration}s ease-in-out ${s.delay}s infinite`,
              }}
            />
          ))}
        </div>
      ))}

      {/* Constellation lines */}
      {constellations && (
        <svg
          className="absolute inset-0 h-full w-full"
          style={{
            transform: `translate3d(${mouse.x * 4}px, ${mouse.y * 4}px, 0)`,
            transition: "transform 0.4s var(--ease-spring)",
          }}
        >
          <defs>
            <linearGradient id="cwConstLine" x1="0%" y1="0%" x2="100%" y2="0%">
              <stop offset="0%" stopColor="#a855f7" />
              <stop offset="50%" stopColor="#ffffff" />
              <stop offset="100%" stopColor="#38bdf8" />
            </linearGradient>
          </defs>
          {constellation.map(([a, b], i) => (
            <line
              key={i}
              x1={`${a.x}%`}
              y1={`${a.y}%`}
              x2={`${b.x}%`}
              y2={`${b.y}%`}
              stroke="url(#cwConstLine)"
              strokeWidth="0.5"
              opacity="0.35"
              style={{ animation: `constPulse 6s ease-in-out ${i * 0.4}s infinite` }}
            />
          ))}
        </svg>
      )}

      {/* Comets */}
      {comets && (
        <div className="absolute inset-0">
          {COMETS.map((c, i) => (
            <span
              key={i}
              className="absolute block origin-right"
              style={{
                left: c.left,
                top: c.top,
                width: `${c.w}px`,
                height: "1.5px",
                background:
                  "linear-gradient(90deg, rgba(168,85,247,1) 0%, rgba(255,255,255,0.85) 15%, rgba(255,255,255,0.05) 60%, transparent 100%)",
                filter: "drop-shadow(0 0 6px rgba(168,85,247,0.8))",
                opacity: 0,
                animation: `comet ${c.dur}s ease-in ${c.delay}s infinite`,
                ["--comet-angle" as string]: `${c.angle}deg`,
              }}
            />
          ))}
        </div>
      )}

      {/* Cursor glow */}
      {interactive && (
        <div
          className="absolute h-[500px] w-[500px] rounded-full opacity-60 mix-blend-screen"
          style={{
            background: "radial-gradient(circle, rgba(168,85,247,0.22) 0%, transparent 60%)",
            left: `calc(50% + ${mouse.x * 280}px - 250px)`,
            top: `calc(50% + ${mouse.y * 200}px - 250px)`,
            filter: "blur(20px)",
            transition: "left 0.3s var(--ease-spring), top 0.3s var(--ease-spring)",
          }}
        />
      )}
    </div>
  )
}
