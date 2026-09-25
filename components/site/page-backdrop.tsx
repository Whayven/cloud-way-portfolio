import Image from "next/image"
import { Starfield } from "@/components/site/starfield"

/**
 * Calm backdrop for interior pages (Work, Case study, Blog, Article):
 * the nebula at low opacity, a vignette, and a slow canvas starfield.
 * No aurora, warp or cursor effects.
 */
export function PageBackdrop() {
  return (
    <div className="pointer-events-none fixed inset-0 z-0 overflow-hidden" aria-hidden>
      <div
        className="absolute inset-0 opacity-35"
        style={{ animation: "nebula-drift 60s ease-in-out infinite" }}
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
      <div
        className="absolute inset-0"
        style={{
          background:
            "radial-gradient(ellipse at center, transparent 35%, rgba(19,21,26,0.6) 80%, rgba(19,21,26,0.96) 100%), linear-gradient(180deg, rgba(19,21,26,0.25) 0%, rgba(19,21,26,0.6) 60%, rgba(19,21,26,0.96) 100%)",
        }}
      />
      <Starfield variant="calm" />
    </div>
  )
}
