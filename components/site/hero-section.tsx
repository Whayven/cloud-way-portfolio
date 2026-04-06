import Image from "next/image"
import Link from "next/link"
import { GradientText } from "@/components/site/gradient-text"

import heroStill from "@/app/_assets/Wayne_vast_cosmic_scene_deep_space_filled_with_vibrant_nebula_b67866de-9c2e-426e-b3db-eb0ecc682486_2.png"

export function HeroSection() {
  return (
    <section className="relative isolate w-full min-h-[min(92vh,56rem)] overflow-hidden">
      {/* Full-bleed cover: center + min dimensions so video always fills width */}
      <video
        className="absolute left-1/2 top-1/2 z-0 min-h-full min-w-full -translate-x-1/2 -translate-y-1/2 object-cover opacity-[0.42] dark:opacity-[0.32]"
        autoPlay
        muted
        loop
        playsInline
        aria-hidden
      >
        <source src="/assets/hero-nebula.mp4" type="video/mp4" />
      </video>

      {/* Vignette + readable wash */}
      <div
        className="pointer-events-none absolute inset-0 z-[1] bg-linear-to-b from-cw-light/95 via-cw-light/55 to-cw-light dark:from-cw-dark/95 dark:via-cw-dark/60 dark:to-cw-dark"
        aria-hidden
      />
      <div
        className="pointer-events-none absolute inset-0 z-[1] bg-[radial-gradient(ellipse_90%_70%_at_50%_-10%,rgba(135,206,235,0.18),transparent_55%)] dark:bg-[radial-gradient(ellipse_90%_70%_at_50%_-10%,rgba(135,206,235,0.12),transparent_55%)]"
        aria-hidden
      />

      <div className="relative z-10 mx-auto flex w-full max-w-5xl flex-col items-center px-6 pb-20 pt-16 text-center sm:px-10 sm:pb-24 sm:pt-20 lg:pt-24">
        <p className="mb-5 text-xs font-semibold uppercase tracking-[0.28em] text-accent-purple/90 dark:text-accent-sky/90">
          Software &amp; design
        </p>
        <h1 className="mb-5 max-w-4xl text-balance text-4xl font-bold leading-[1.08] tracking-tight text-cw-dark sm:text-5xl md:text-6xl lg:text-7xl dark:text-white">
          We are <GradientText className="inline">CloudWay</GradientText>
        </h1>
        <p className="mx-auto mb-12 max-w-2xl text-pretty text-lg text-gray-600 sm:text-xl md:text-2xl dark:text-gray-300">
          Elevate your business with our cutting-edge software solutions.
        </p>

        <div className="mb-14">
          <Image
            src={heroStill}
            alt=""
            width={360}
            height={360}
            className="h-40 w-40 rounded-full object-cover shadow-[0_20px_60px_-15px_rgba(128,0,128,0.45)] ring-[3px] ring-white/50 ring-offset-4 ring-offset-cw-light dark:shadow-[0_24px_70px_-12px_rgba(135,206,235,0.25)] dark:ring-white/20 dark:ring-offset-cw-dark sm:h-48 sm:w-48"
            priority
          />
        </div>

        <ul className="grid w-full max-w-3xl grid-cols-1 gap-5 sm:grid-cols-2 sm:gap-6">
          <li>
            <Link
              href="/work"
              className="group flex h-full flex-col rounded-2xl border border-gray-200/90 bg-white/75 p-7 text-left shadow-[0_4px_24px_-8px_rgba(19,21,26,0.12)] backdrop-blur-xl transition duration-300 hover:border-accent-sky/40 hover:shadow-[0_12px_40px_-12px_rgba(128,0,128,0.2)] dark:border-white/10 dark:bg-cw-card-dark/75 dark:shadow-[0_4px_32px_-8px_rgba(0,0,0,0.45)] dark:hover:border-accent-sky/35"
            >
              <h2 className="mb-2 flex items-center gap-2 text-lg font-semibold text-cw-dark dark:text-white">
                Work
                <span
                  className="inline-block transition-transform duration-300 group-hover:translate-x-1"
                  aria-hidden
                >
                  →
                </span>
              </h2>
              <p className="text-sm leading-relaxed text-gray-600 dark:text-gray-400">
                Check out our latest projects and apps.
              </p>
            </Link>
          </li>
          <li>
            <a
              href="https://blog.cloud-way.dev"
              target="_blank"
              rel="noopener noreferrer"
              className="group flex h-full flex-col rounded-2xl border border-gray-200/90 bg-white/75 p-7 text-left shadow-[0_4px_24px_-8px_rgba(19,21,26,0.12)] backdrop-blur-xl transition duration-300 hover:border-accent-sky/40 hover:shadow-[0_12px_40px_-12px_rgba(128,0,128,0.2)] dark:border-white/10 dark:bg-cw-card-dark/75 dark:shadow-[0_4px_32px_-8px_rgba(0,0,0,0.45)] dark:hover:border-accent-sky/35"
            >
              <h2 className="mb-2 flex items-center gap-2 text-lg font-semibold text-cw-dark dark:text-white">
                Blog
                <span
                  className="inline-block transition-transform duration-300 group-hover:translate-x-1"
                  aria-hidden
                >
                  →
                </span>
              </h2>
              <p className="text-sm leading-relaxed text-gray-600 dark:text-gray-400">
                Read more about our thoughts on tech.
              </p>
            </a>
          </li>
        </ul>
      </div>
    </section>
  )
}
