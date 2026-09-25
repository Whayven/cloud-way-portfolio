"use client"

import Image from "next/image"
import { useEffect, useRef } from "react"

const TILES = Array.from({ length: 12 }, (_, i) => i)

/**
 * Case-study hero visual: a gradient field with a browser-window mock that
 * tilts and drifts as it scrolls through the viewport. Shows the project's
 * screenshot when one exists, otherwise a grid of shimmering placeholder tiles.
 */
export function CaseHeroMock({ imageUrl, title }: { imageUrl: string | null; title: string }) {
  const mockRef = useRef<HTMLDivElement>(null)

  useEffect(() => {
    const mock = mockRef.current
    const frame = mock?.parentElement
    if (!mock || !frame) return
    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) return

    let raf = 0
    const apply = () => {
      raf = 0
      const r = frame.getBoundingClientRect()
      const k = (r.top + r.height / 2 - window.innerHeight / 2) / window.innerHeight
      mock.style.transform = `perspective(1200px) translateY(${k * -40}px) rotateX(${k * 6}deg)`
    }
    const onScroll = () => {
      if (!raf) raf = requestAnimationFrame(apply)
    }
    apply()
    window.addEventListener("scroll", onScroll, { passive: true })
    window.addEventListener("resize", onScroll)
    return () => {
      cancelAnimationFrame(raf)
      window.removeEventListener("scroll", onScroll)
      window.removeEventListener("resize", onScroll)
    }
  }, [])

  return (
    <figure className="relative overflow-hidden rounded-[28px] border border-white/10 bg-white/[0.02]">
      <div className="relative aspect-[4/3] sm:aspect-[21/10]">
        <div
          className="absolute inset-0"
          style={{
            background:
              "radial-gradient(circle at 20% 20%, rgba(168,85,247,0.65), transparent 55%), radial-gradient(circle at 80% 70%, rgba(56,189,248,0.55), transparent 55%), radial-gradient(circle at 50% 100%, rgba(236,72,153,0.35), transparent 60%)",
          }}
        />
        <div
          className="pointer-events-none absolute inset-0 opacity-40"
          style={{
            backgroundImage:
              "linear-gradient(rgba(255,255,255,0.06) 1px, transparent 1px), linear-gradient(90deg, rgba(255,255,255,0.06) 1px, transparent 1px)",
            backgroundSize: "48px 48px",
          }}
        />
        <div
          ref={mockRef}
          className="absolute inset-5 flex flex-col overflow-hidden rounded-[14px] border border-white/15 bg-cw-dark/50 shadow-[0_40px_80px_-20px_rgba(0,0,0,0.6)] backdrop-blur-[6px] will-change-transform sm:inset-10"
        >
          <div className="flex items-center gap-1.5 border-b border-white/10 px-3.5 py-2.5">
            <span className="h-2 w-2 rounded-full bg-red-400/70" />
            <span className="h-2 w-2 rounded-full bg-yellow-400/70" />
            <span className="h-2 w-2 rounded-full bg-green-400/70" />
            <span className="ml-3.5 h-[18px] max-w-[280px] flex-1 rounded-full bg-white/[0.06]" />
          </div>
          {imageUrl ? (
            <div className="relative flex-1">
              <Image
                src={imageUrl}
                alt={title}
                fill
                priority
                sizes="(max-width: 768px) 100vw, 80rem"
                className="object-cover object-top"
              />
            </div>
          ) : (
            <div className="grid grid-cols-4 gap-2.5 p-3.5">
              {TILES.map((i) => (
                <div
                  key={i}
                  className="rounded-lg bg-white/[0.08] p-2.5"
                  style={{ animation: `tile-in .6s var(--ease-spring) ${0.6 + i * 0.06}s both` }}
                >
                  <div className="h-1.5 w-1/2 rounded bg-white/30" />
                  <div
                    className="mt-2 h-3.5 rounded"
                    style={{
                      background:
                        "linear-gradient(90deg, rgba(255,255,255,0.12), rgba(255,255,255,0.3), rgba(255,255,255,0.12))",
                      backgroundSize: "200% 100%",
                      animation: `shimmer-bar ${2.4 + (i % 4) * 0.4}s linear ${i * 0.1}s infinite`,
                    }}
                  />
                </div>
              ))}
            </div>
          )}
        </div>
        <div className="pointer-events-none absolute inset-0 bg-linear-to-t from-cw-dark/50 to-transparent to-50%" />
      </div>
    </figure>
  )
}
