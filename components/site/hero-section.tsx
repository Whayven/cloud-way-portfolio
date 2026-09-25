import { StarButton } from "@/components/ui/star-button"

/** Entrance delay relative to the end of the warp intro (`--intro`, see globals.css). */
function at(offset: number) {
  return `calc(var(--intro) + ${offset}s)`
}

const STATS = [
  {
    title: "6+ Years",
    description: "Full-stack engineering across web, cloud, and enterprise.",
    accent: "text-purple-300",
    glow: "rgba(168,85,247,0.5)",
    d: "M17.25 6.75 22.5 12l-5.25 5.25m-10.5 0L1.5 12l5.25-5.25m7.5-3-4.5 16.5",
  },
  {
    title: "Cloud Native",
    description: "Hands-on with AWS, Azure, and the Salesforce ecosystem.",
    accent: "text-sky-300",
    glow: "rgba(56,189,248,0.5)",
    d: "M2.25 15a4.5 4.5 0 0 0 4.5 4.5H18a3.75 3.75 0 0 0 1.332-7.257 3 3 0 0 0-3.758-3.848 5.25 5.25 0 0 0-10.233 2.33A4.502 4.502 0 0 0 2.25 15Z",
  },
  {
    title: "AI-Driven",
    description: "Modern solutions powered by AI and intelligent automation.",
    accent: "text-fuchsia-300",
    glow: "rgba(236,72,153,0.5)",
    d: "M9.813 15.904 9 18.75l-.813-2.846a4.5 4.5 0 0 0-3.09-3.09L2.25 12l2.846-.813a4.5 4.5 0 0 0 3.09-3.09L9 5.25l.813 2.846a4.5 4.5 0 0 0 3.09 3.09L15.75 12l-2.846.813a4.5 4.5 0 0 0-3.09 3.09Z",
  },
]

function OrbitRings() {
  return (
    <div
      aria-hidden
      className="pointer-events-none absolute left-1/2 top-1/2 h-0 w-0 -rotate-[14deg] [perspective:1400px]"
      style={{ animation: `orbit-in 2.4s var(--ease-spring) ${at(0)} both` }}
    >
      <div className="absolute -left-[380px] -top-[380px] h-[760px] w-[760px] rounded-full border border-white/[0.09] [animation:orbit_40s_linear_infinite]">
        <span className="absolute -top-1 left-1/2 -ml-1 h-2 w-2 rounded-full bg-sky-300 shadow-[0_0_12px_#38bdf8,0_0_30px_rgba(56,189,248,0.6)]" />
      </div>
      <div className="absolute -left-[560px] -top-[560px] h-[1120px] w-[1120px] rounded-full border border-white/[0.06] [animation:orbit_70s_linear_infinite_reverse]">
        <span className="absolute -bottom-[5px] left-1/2 -ml-[5px] h-2.5 w-2.5 rounded-full bg-purple-300 shadow-[0_0_14px_#a855f7,0_0_40px_rgba(168,85,247,0.6)]" />
        <span className="absolute -right-[3px] top-1/2 -mt-[3px] h-[5px] w-[5px] rounded-full bg-white shadow-[0_0_10px_#fff]" />
      </div>
      <div className="absolute -left-[760px] -top-[760px] h-[1520px] w-[1520px] rounded-full border border-dashed border-white/5 [animation:orbit_110s_linear_infinite]">
        <span className="absolute -left-1 top-1/2 -mt-1 h-[7px] w-[7px] rounded-full bg-fuchsia-300 shadow-[0_0_12px_#ec4899,0_0_34px_rgba(236,72,153,0.6)]" />
      </div>
    </div>
  )
}

export function HeroSection() {
  return (
    <section className="relative isolate flex min-h-[calc(100vh-4.5rem)] w-full flex-col justify-center overflow-hidden">
      <OrbitRings />

      <div className="relative z-10 mx-auto flex w-full max-w-[85rem] flex-col items-center px-6 pb-16 pt-24 text-center sm:px-10 md:pb-[140px]">
        <div
          className="mb-8 inline-flex items-center gap-2 whitespace-nowrap rounded-full border border-white/10 bg-white/[0.04] px-3.5 py-1.5 text-xs font-medium text-gray-300 backdrop-blur-md"
          style={{ animation: `fade-up .9s var(--ease-spring) ${at(0.1)} both` }}
        >
          <span className="relative flex h-2 w-2">
            <span className="absolute inline-flex h-full w-full rounded-full bg-emerald-400 opacity-75 motion-safe:animate-[ping_1.4s_cubic-bezier(0,0,0.2,1)_infinite]" />
            <span className="relative inline-flex h-2 w-2 rounded-full bg-emerald-400" />
          </span>
          <span>Available for new engagements</span>
          <span className="text-white/30">·</span>
          <span className="text-white/50">Q3 2026</span>
        </div>

        <h1
          className="mb-7 font-semibold leading-[0.98] tracking-[-0.045em] text-white"
          style={{ fontSize: "clamp(56px, 9.5vw, 136px)" }}
        >
          <span className="block overflow-hidden px-[0.04em]">
            <span
              className="block font-light text-white/85"
              style={{ animation: `line-up 1.1s var(--ease-spring) ${at(0.25)} both` }}
            >
              We are
            </span>
          </span>
          <span className="block overflow-hidden px-[0.06em] pb-[0.08em]">
            <span className="block" style={{ animation: `line-up 1.2s var(--ease-spring) ${at(0.4)} both` }}>
              <span className="text-shimmer inline-block">CloudWay.</span>
            </span>
          </span>
        </h1>

        <p
          className="mb-11 max-w-[34rem] text-[19px] leading-[1.65] text-gray-300/90"
          style={{ animation: `fade-up 1s var(--ease-spring) ${at(0.7)} both`, textWrap: "pretty" }}
        >
          We build full-stack applications that help businesses scale, streamline operations, and stand out
          online.
        </p>

        <div
          className="flex flex-wrap items-center justify-center gap-3"
          style={{ animation: `fade-up 1s var(--ease-spring) ${at(0.9)} both` }}
        >
          <StarButton href="/work" pill>
            View Work
          </StarButton>
          <StarButton href="/#contact" variant="ghost" pill arrow={false}>
            Start a project
          </StarButton>
        </div>
      </div>

      {/* Stat strip — pinned to the hero's bottom edge on wider screens */}
      <div className="relative z-10 border-t border-white/[0.08] bg-linear-to-b from-cw-dark/0 to-cw-dark/50 backdrop-blur-[6px] md:absolute md:inset-x-0 md:bottom-0">
        <div className="mx-auto grid max-w-[85rem] grid-cols-1 px-6 sm:px-10 md:grid-cols-3">
          {STATS.map((s, i) => (
            <div
              key={s.title}
              className={`flex items-center gap-3.5 px-0 py-[22px] md:px-6 ${
                i > 0 ? "border-t border-white/[0.08] md:border-l md:border-t-0" : ""
              }`}
              style={{ animation: `fade-up .9s var(--ease-spring) ${at(1.1 + i * 0.12)} both` }}
            >
              <span
                className={`relative flex h-9 w-9 shrink-0 items-center justify-center rounded-[10px] bg-white/5 ${s.accent}`}
              >
                <span
                  className="absolute inset-0 rounded-[10px] opacity-60 blur-[6px]"
                  style={{ background: `radial-gradient(circle, ${s.glow}, transparent 70%)` }}
                />
                <svg className="relative h-[18px] w-[18px]" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" aria-hidden>
                  <path strokeLinecap="round" strokeLinejoin="round" d={s.d} />
                </svg>
              </span>
              <div className="text-left">
                <div className="text-sm font-semibold tracking-[-0.01em]">{s.title}</div>
                <div className="mt-0.5 text-xs leading-normal text-gray-400">{s.description}</div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}
