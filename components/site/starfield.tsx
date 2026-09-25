"use client"

import { useEffect, useRef } from "react"

type Variant = {
  count: number
  /** Base z-velocity per frame. */
  speed: number
  tints: string[]
  /** Star radius at full depth (plus a 0.2 floor). */
  radius: number
  /** Twinkle: alpha = base + (1 - base) · sin(t · rate + phase). */
  twinkleBase: number
  twinkleRate: number
  /** Soft 4× halo behind stars larger than 1.5px. */
  halo: boolean
  /** Scroll velocity → extra speed (per px), capped. */
  boostPerPx: number
  boostCap: number
  /** Seconds of hyperspace warp on load (0 = none). */
  warp: number
  /** Projection centre shifts `mouse · -px` (0 = fixed). */
  mouseShift: number
}

const WHITE = "255,255,255"

const VARIANTS = {
  /** Home: denser, faster, warp intro, reacts to the cursor. */
  hero: {
    count: 380,
    speed: 0.0006,
    tints: [WHITE, WHITE, WHITE, "216,180,254", "125,211,252", "240,171,252"],
    radius: 1.9,
    twinkleBase: 0.55,
    twinkleRate: 1.6,
    halo: true,
    boostPerPx: 0.00004,
    boostCap: 0.02,
    warp: 2.6,
    mouseShift: 24,
  },
  /** Interior pages: calm drift. */
  calm: {
    count: 240,
    speed: 0.00025,
    tints: [WHITE, WHITE, WHITE, "216,180,254", "125,211,252"],
    radius: 1.6,
    twinkleBase: 0.5,
    twinkleRate: 1.4,
    halo: false,
    boostPerPx: 0.00002,
    boostCap: 0.01,
    warp: 0,
    mouseShift: 0,
  },
} satisfies Record<string, Variant>

type Star = { x: number; y: number; z: number; pz: number; tint: string; phase: number }

/**
 * Full-screen canvas starfield. Stars sit in 3D (x, y ∈ [-1, 1], z ∈ (0, 1])
 * and drift toward the viewer; scrolling briefly speeds them up. The "hero"
 * variant opens with a warp — stars streak past for the first seconds.
 * Everything runs in a rAF loop off the React render path.
 */
export function Starfield({ variant = "calm" }: { variant?: keyof typeof VARIANTS }) {
  const canvasRef = useRef<HTMLCanvasElement>(null)

  useEffect(() => {
    const canvas = canvasRef.current
    const ctx = canvas?.getContext("2d")
    if (!canvas || !ctx) return
    const v: Variant = VARIANTS[variant]

    const spawn = (z: number): Star => ({
      x: Math.random() * 2 - 1,
      y: Math.random() * 2 - 1,
      z,
      pz: z,
      tint: v.tints[(Math.random() * v.tints.length) | 0],
      phase: Math.random() * Math.PI * 2,
    })

    const reduced = window.matchMedia("(prefers-reduced-motion: reduce)").matches
    const stars = Array.from({ length: v.count }, () => spawn(Math.random()))
    const mouse = { x: 0, y: 0 }
    let boost = 0
    let lastY = window.scrollY
    let raf = 0
    const t0 = performance.now()

    const resize = () => {
      const dpr = Math.min(2, window.devicePixelRatio || 1)
      canvas.width = window.innerWidth * dpr
      canvas.height = window.innerHeight * dpr
      ctx.setTransform(dpr, 0, 0, dpr, 0, 0)
    }

    const draw = (now: number, step: number) => {
      const w = window.innerWidth
      const h = window.innerHeight
      const t = (now - t0) / 1000
      const f = Math.max(w, h) * 0.5
      const cx = w / 2 + mouse.x * -v.mouseShift
      const cy = h / 2 + mouse.y * -v.mouseShift
      const streak = step > 0.003
      ctx.clearRect(0, 0, w, h)
      for (const s of stars) {
        s.pz = s.z
        s.z -= step
        const sx = cx + (s.x / s.z) * f
        const sy = cy + (s.y / s.z) * f
        if (s.z <= 0.02 || sx < -50 || sx > w + 50 || sy < -50 || sy > h + 50) {
          Object.assign(s, spawn(1))
          continue
        }
        const depth = 1 - s.z
        const alpha =
          Math.min(1, depth * 1.3) *
          (v.twinkleBase + (1 - v.twinkleBase) * Math.sin(t * v.twinkleRate + s.phase))
        const r = depth * v.radius + 0.2
        if (streak) {
          ctx.strokeStyle = `rgba(${s.tint},${alpha})`
          ctx.lineWidth = r
          ctx.beginPath()
          ctx.moveTo(cx + (s.x / s.pz) * f, cy + (s.y / s.pz) * f)
          ctx.lineTo(sx, sy)
          ctx.stroke()
        } else {
          ctx.fillStyle = `rgba(${s.tint},${alpha})`
          ctx.beginPath()
          ctx.arc(sx, sy, r, 0, Math.PI * 2)
          ctx.fill()
          if (v.halo && r > 1.5) {
            ctx.fillStyle = `rgba(${s.tint},${alpha * 0.12})`
            ctx.beginPath()
            ctx.arc(sx, sy, r * 4, 0, Math.PI * 2)
            ctx.fill()
          }
        }
      }
    }

    const frame = (now: number) => {
      const t = (now - t0) / 1000
      let step = v.speed + boost
      if (v.warp && t < v.warp) step += 0.045 * (1 - t / v.warp) ** 3
      boost *= 0.92
      draw(now, step)
      raf = requestAnimationFrame(frame)
    }

    const onScroll = () => {
      const y = window.scrollY
      boost = Math.min(v.boostCap, boost + Math.abs(y - lastY) * v.boostPerPx)
      lastY = y
    }
    const onMove = (e: MouseEvent) => {
      mouse.x = (e.clientX / window.innerWidth - 0.5) * 2
      mouse.y = (e.clientY / window.innerHeight - 0.5) * 2
    }

    resize()
    if (reduced) {
      // Static sky: one frame, no warp, no drift, no twinkle loop.
      const still = () => {
        resize()
        draw(t0 + 400, 0)
      }
      still()
      window.addEventListener("resize", still)
      return () => window.removeEventListener("resize", still)
    }

    window.addEventListener("resize", resize)
    window.addEventListener("scroll", onScroll, { passive: true })
    if (v.mouseShift) window.addEventListener("mousemove", onMove, { passive: true })
    raf = requestAnimationFrame(frame)
    return () => {
      cancelAnimationFrame(raf)
      window.removeEventListener("resize", resize)
      window.removeEventListener("scroll", onScroll)
      window.removeEventListener("mousemove", onMove)
    }
  }, [variant])

  return <canvas ref={canvasRef} className="absolute inset-0 h-full w-full" aria-hidden />
}
