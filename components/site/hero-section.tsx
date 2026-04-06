"use client"

import Link from "next/link"
import { GradientText } from "@/components/site/gradient-text"

const stats = [
  {
    icon: (
      <svg className="h-5 w-5" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5">
        <path strokeLinecap="round" strokeLinejoin="round" d="M12 21a9.004 9.004 0 0 0 8.716-6.747M12 21a9.004 9.004 0 0 1-8.716-6.747M12 21c2.485 0 4.5-4.03 4.5-9S14.485 3 12 3m0 18c-2.485 0-4.5-4.03-4.5-9S9.515 3 12 3m0 0a8.997 8.997 0 0 1 7.843 4.582M12 3a8.997 8.997 0 0 0-7.843 4.582m15.686 0A11.953 11.953 0 0 1 12 10.5c-2.998 0-5.74-1.1-7.843-2.918m15.686 0A8.959 8.959 0 0 1 21 12c0 .778-.099 1.533-.284 2.253m0 0A17.919 17.919 0 0 1 12 16.5a17.92 17.92 0 0 1-8.716-2.247m0 0A8.966 8.966 0 0 1 3 12c0-1.264.26-2.466.732-3.558" />
      </svg>
    ),
    title: "100+ Projects",
    description: "Engagements in executing over 100+ projects.",
  },
  {
    icon: (
      <svg className="h-5 w-5" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5">
        <path strokeLinecap="round" strokeLinejoin="round" d="M9.813 15.904 9 18.75l-.813-2.846a4.5 4.5 0 0 0-3.09-3.09L2.25 12l2.846-.813a4.5 4.5 0 0 0 3.09-3.09L9 5.25l.813 2.846a4.5 4.5 0 0 0 3.09 3.09L15.75 12l-2.846.813a4.5 4.5 0 0 0-3.09 3.09ZM18.259 8.715 18 9.75l-.259-1.035a3.375 3.375 0 0 0-2.455-2.456L14.25 6l1.036-.259a3.375 3.375 0 0 0 2.455-2.456L18 2.25l.259 1.035a3.375 3.375 0 0 0 2.455 2.456L21.75 6l-1.036.259a3.375 3.375 0 0 0-2.455 2.456ZM16.894 20.567 16.5 21.75l-.394-1.183a2.25 2.25 0 0 0-1.423-1.423L13.5 18.75l1.183-.394a2.25 2.25 0 0 0 1.423-1.423l.394-1.183.394 1.183a2.25 2.25 0 0 0 1.423 1.423l1.183.394-1.183.394a2.25 2.25 0 0 0-1.423 1.423Z" />
      </svg>
    ),
    title: "AI-Driven",
    description: "Elevate more edge software solutions and experiences.",
  },
  {
    icon: (
      <svg className="h-5 w-5" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5">
        <path strokeLinecap="round" strokeLinejoin="round" d="M12 21a9.004 9.004 0 0 0 8.716-6.747M12 21a9.004 9.004 0 0 1-8.716-6.747M12 21c2.485 0 4.5-4.03 4.5-9S14.485 3 12 3m0 18c-2.485 0-4.5-4.03-4.5-9S9.515 3 12 3m0 0a8.997 8.997 0 0 1 7.843 4.582M12 3a8.997 8.997 0 0 0-7.843 4.582" />
      </svg>
    ),
    title: "Global Reach",
    description: "Global reach is for your excellent business.",
  },
]

/* Deterministic star positions — generated once at build time */
const stars = [
  { x: 5, y: 8, size: 1, delay: 0, duration: 3 },
  { x: 12, y: 15, size: 1.5, delay: 1.2, duration: 4 },
  { x: 25, y: 5, size: 1, delay: 0.5, duration: 3.5 },
  { x: 30, y: 22, size: 2, delay: 2, duration: 5 },
  { x: 35, y: 70, size: 1, delay: 0.8, duration: 3 },
  { x: 40, y: 45, size: 1.5, delay: 1.5, duration: 4.5 },
  { x: 48, y: 12, size: 1, delay: 0.3, duration: 3.2 },
  { x: 55, y: 80, size: 2, delay: 2.5, duration: 5 },
  { x: 60, y: 30, size: 1, delay: 1, duration: 3.8 },
  { x: 65, y: 55, size: 1.5, delay: 0.7, duration: 4.2 },
  { x: 72, y: 18, size: 1, delay: 1.8, duration: 3 },
  { x: 78, y: 65, size: 2, delay: 0.2, duration: 4.8 },
  { x: 82, y: 40, size: 1, delay: 2.2, duration: 3.5 },
  { x: 88, y: 8, size: 1.5, delay: 1.3, duration: 4 },
  { x: 92, y: 75, size: 1, delay: 0.6, duration: 3.3 },
  { x: 15, y: 88, size: 1.5, delay: 1.9, duration: 4.5 },
  { x: 45, y: 92, size: 1, delay: 0.4, duration: 3.7 },
  { x: 70, y: 85, size: 2, delay: 2.8, duration: 5 },
  { x: 95, y: 50, size: 1, delay: 1.1, duration: 3.1 },
  { x: 8, y: 42, size: 1.5, delay: 2.3, duration: 4.3 },
  { x: 20, y: 60, size: 1, delay: 0.9, duration: 3.6 },
  { x: 50, y: 35, size: 2, delay: 1.6, duration: 4.8 },
  { x: 85, y: 25, size: 1, delay: 2.1, duration: 3.4 },
  { x: 3, y: 72, size: 1.5, delay: 0.1, duration: 4.1 },
  { x: 58, y: 58, size: 1, delay: 1.4, duration: 3.9 },
]

export function HeroSection() {
  return (
    <section className="relative isolate flex min-h-screen w-full items-center overflow-hidden">

      {/* ── Star field ── */}
      <div className="pointer-events-none absolute inset-0 z-[2]" aria-hidden>
        {stars.map((star, i) => (
          <span
            key={i}
            className="absolute rounded-full bg-white animate-[twinkle_var(--tw-duration)_ease-in-out_var(--tw-delay)_infinite]"
            style={{
              left: `${star.x}%`,
              top: `${star.y}%`,
              width: `${star.size}px`,
              height: `${star.size}px`,
              "--tw-delay": `${star.delay}s`,
              "--tw-duration": `${star.duration}s`,
            } as React.CSSProperties}
          />
        ))}
      </div>

      {/* ── Shooting stars ── */}
      <div className="pointer-events-none absolute inset-0 z-[2]" aria-hidden>
        <span className="absolute left-[15%] top-[10%] h-px w-20 rotate-[215deg] animate-[shoot_6s_ease-in_2s_infinite] rounded bg-linear-to-r from-white/80 to-transparent opacity-0" />
        <span className="absolute left-[60%] top-[5%] h-px w-28 rotate-[220deg] animate-[shoot_8s_ease-in_5s_infinite] rounded bg-linear-to-r from-white/70 to-transparent opacity-0" />
        <span className="absolute left-[40%] top-[15%] h-px w-16 rotate-[210deg] animate-[shoot_7s_ease-in_8s_infinite] rounded bg-linear-to-r from-white/60 to-transparent opacity-0" />
      </div>

      {/* ── Content ── */}
      <div className="relative z-10 mx-auto flex w-full max-w-[85rem] items-center justify-between px-6 py-32 sm:px-10">
        {/* Left: headline + CTA */}
        <div className="max-w-2xl">
          <h1 className="mb-6 text-4xl font-bold leading-[1.1] tracking-tight text-white opacity-0 animate-[fadeSlideUp_0.8s_ease-out_0.2s_forwards] sm:text-5xl md:text-6xl lg:text-7xl">
            We are <GradientText className="inline">CloudWay</GradientText>.
          </h1>
          <p className="mb-10 max-w-lg text-lg text-gray-400 opacity-0 animate-[fadeSlideUp_0.8s_ease-out_0.5s_forwards] sm:text-xl">
            Elevate your business with our cutting-edge software
            solutions and space-age design.
          </p>
          <div className="opacity-0 animate-[fadeSlideUp_0.8s_ease-out_0.8s_forwards]">
            <Link
              href="/work"
              className="group inline-flex items-center gap-2 rounded-full border border-white/15 bg-white/5 px-7 py-3 text-sm font-medium text-white backdrop-blur-md transition-all duration-300 hover:border-white/30 hover:bg-white/10 hover:shadow-[0_0_20px_rgba(56,189,248,0.15)]"
            >
              View Work
              <span className="inline-block transition-transform duration-300 group-hover:translate-x-1" aria-hidden>
                &rsaquo;
              </span>
            </Link>
          </div>
        </div>

        {/* Right: glassmorphism stat cards */}
        <div className="hidden flex-col gap-4 lg:flex">
          {stats.map((stat, i) => (
            <div
              key={stat.title}
              className="w-56 rounded-2xl border border-white/10 bg-white/5 p-5 opacity-0 backdrop-blur-xl animate-[fadeSlideLeft_0.6s_ease-out_forwards] hover:border-white/20 hover:bg-white/10 transition-all duration-300"
              style={{
                animationDelay: `${0.6 + i * 0.2}s`,
              }}
            >
              <div className="mb-2 flex items-center gap-2.5 text-purple-400">
                {stat.icon}
                <h3 className="text-sm font-semibold text-white">{stat.title}</h3>
              </div>
              <p className="text-xs leading-relaxed text-gray-400">
                {stat.description}
              </p>
            </div>
          ))}
        </div>
      </div>

      {/* ── Ambient glow ── */}
      <div className="pointer-events-none absolute left-1/4 top-1/3 z-[1] h-96 w-96 rounded-full bg-purple-600/10 blur-[120px] animate-[pulse_8s_ease-in-out_infinite]" aria-hidden />
      <div className="pointer-events-none absolute right-1/4 bottom-1/4 z-[1] h-80 w-80 rounded-full bg-sky-500/10 blur-[100px] animate-[pulse_10s_ease-in-out_2s_infinite]" aria-hidden />

      {/* ── Scroll indicator ── */}
      <button
        className="absolute bottom-8 left-1/2 z-10 -translate-x-1/2 opacity-0 animate-[fadeSlideUp_0.6s_ease-out_1.4s_forwards]"
        onClick={() =>
          document.getElementById("content")?.scrollIntoView({ behavior: "smooth" })
        }
        aria-label="Scroll to content"
      >
        <span className="flex flex-col items-center gap-2 text-gray-400 transition-colors hover:text-white">
          <span className="text-xs font-medium uppercase tracking-widest">Scroll</span>
          <svg className="h-5 w-5 animate-bounce" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="2">
            <path strokeLinecap="round" strokeLinejoin="round" d="M19 9l-7 7-7-7" />
          </svg>
        </span>
      </button>

      {/* Social icons — bottom left */}
      <div className="absolute bottom-8 left-6 z-10 flex items-center gap-4 opacity-0 animate-[fadeSlideUp_0.6s_ease-out_1.2s_forwards] sm:left-10">
        <a
          href="https://twitter.com"
          target="_blank"
          rel="noopener noreferrer"
          className="text-gray-500 transition-colors hover:text-white"
          aria-label="Twitter"
        >
          <svg className="h-5 w-5" fill="currentColor" viewBox="0 0 24 24">
            <path d="M18.244 2.25h3.308l-7.227 8.26 8.502 11.24H16.17l-5.214-6.817L4.99 21.75H1.68l7.73-8.835L1.254 2.25H8.08l4.713 6.231zm-1.161 17.52h1.833L7.084 4.126H5.117z" />
          </svg>
        </a>
        <a
          href="https://linkedin.com"
          target="_blank"
          rel="noopener noreferrer"
          className="text-gray-500 transition-colors hover:text-white"
          aria-label="LinkedIn"
        >
          <svg className="h-5 w-5" fill="currentColor" viewBox="0 0 24 24">
            <path d="M20.447 20.452h-3.554v-5.569c0-1.328-.027-3.037-1.852-3.037-1.853 0-2.136 1.445-2.136 2.939v5.667H9.351V9h3.414v1.561h.046c.477-.9 1.637-1.85 3.37-1.85 3.601 0 4.267 2.37 4.267 5.455v6.286zM5.337 7.433a2.062 2.062 0 0 1-2.063-2.065 2.064 2.064 0 1 1 2.063 2.065zm1.782 13.019H3.555V9h3.564v11.452zM22.225 0H1.771C.792 0 0 .774 0 1.729v20.542C0 23.227.792 24 1.771 24h20.451C23.2 24 24 23.227 24 22.271V1.729C24 .774 23.2 0 22.222 0h.003z" />
          </svg>
        </a>
        <a
          href="https://github.com"
          target="_blank"
          rel="noopener noreferrer"
          className="text-gray-500 transition-colors hover:text-white"
          aria-label="GitHub"
        >
          <svg className="h-5 w-5" fill="currentColor" viewBox="0 0 24 24">
            <path fillRule="evenodd" clipRule="evenodd" d="M12 2C6.477 2 2 6.484 2 12.017c0 4.425 2.865 8.18 6.839 9.504.5.092.682-.217.682-.483 0-.237-.008-.868-.013-1.703-2.782.605-3.369-1.343-3.369-1.343-.454-1.158-1.11-1.466-1.11-1.466-.908-.62.069-.608.069-.608 1.003.07 1.531 1.032 1.531 1.032.892 1.53 2.341 1.088 2.91.832.092-.647.35-1.088.636-1.338-2.22-.253-4.555-1.113-4.555-4.951 0-1.093.39-1.988 1.029-2.688-.103-.253-.446-1.272.098-2.65 0 0 .84-.27 2.75 1.026A9.564 9.564 0 0 1 12 6.844a9.59 9.59 0 0 1 2.504.337c1.909-1.296 2.747-1.027 2.747-1.027.546 1.379.202 2.398.1 2.651.64.7 1.028 1.595 1.028 2.688 0 3.848-2.339 4.695-4.566 4.943.359.309.678.92.678 1.855 0 1.338-.012 2.419-.012 2.747 0 .268.18.58.688.482A10.019 10.019 0 0 0 22 12.017C22 6.484 17.522 2 12 2z" />
          </svg>
        </a>
      </div>
    </section>
  )
}
