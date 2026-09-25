import { PointerSurface } from "@/components/site/pointer-surface"

export type ServiceAccent = "purple" | "sky" | "fuchsia" | "emerald"

const ACCENTS: Record<ServiceAccent, { text: string; moon: string; rgb: string }> = {
  purple: { text: "text-purple-300", moon: "#d8b4fe", rgb: "168,85,247" },
  sky: { text: "text-sky-300", moon: "#7dd3fc", rgb: "56,189,248" },
  fuchsia: { text: "text-fuchsia-300", moon: "#f0abfc", rgb: "236,72,153" },
  emerald: { text: "text-emerald-300", moon: "#6ee7b7", rgb: "52,211,153" },
}

export function ServiceCard({
  index,
  title,
  body,
  bullets,
  iconPath,
  accent,
}: {
  index: number
  title: string
  body: string
  bullets: string[]
  /** Heroicons outline path. */
  iconPath: string
  accent: ServiceAccent
}) {
  const a = ACCENTS[accent]
  return (
    <PointerSurface className="group relative h-full overflow-hidden rounded-3xl border border-white/10 bg-white/[0.03] p-7 backdrop-blur-2xl transition-[border-color,background-color,translate] duration-500 ease-(--ease-spring) hover:-translate-y-1 hover:border-white/[0.22] hover:bg-white/5 sm:p-9">
      <div
        className="pointer-events-none absolute inset-0 opacity-0 transition-opacity duration-500 group-hover:opacity-100"
        style={{
          background: `radial-gradient(420px circle at var(--mx, 50%) var(--my, 50%), rgba(${a.rgb},0.35), transparent 60%)`,
        }}
      />
      <div className="relative flex h-full flex-col gap-[22px]">
        <div className="flex items-center justify-between gap-4">
          <span className={`relative flex h-14 w-14 items-center justify-center ${a.text}`}>
            {/* Orbit ring with a moon */}
            <span
              className="absolute inset-0 rounded-full border border-white/[0.12]"
              style={{ animation: `spin ${10 + (index - 1) * 3}s linear infinite` }}
            >
              <span
                className="absolute -top-[3px] left-1/2 -ml-[2.5px] h-[5px] w-[5px] rounded-full"
                style={{ background: a.moon, boxShadow: `0 0 8px ${a.moon}` }}
              />
            </span>
            <span className="absolute inset-2 rounded-full bg-white/[0.06]" />
            <span
              className="absolute inset-2 rounded-full opacity-60 blur-[10px]"
              style={{ background: `radial-gradient(circle, rgba(${a.rgb},0.5), transparent 70%)` }}
            />
            <svg className="relative h-[22px] w-[22px]" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" aria-hidden>
              <path strokeLinecap="round" strokeLinejoin="round" d={iconPath} />
            </svg>
          </span>
          <span className="text-[11px] font-medium tracking-[0.3em] text-white/30">
            {String(index).padStart(2, "0")}
          </span>
        </div>
        <h3 className="text-[26px] font-semibold tracking-[-0.025em] text-white">{title}</h3>
        <p className="max-w-[30rem] text-sm leading-[1.65] text-gray-400">{body}</p>
        <ul className="mt-auto flex flex-wrap gap-1.5 pt-2">
          {bullets.map((b) => (
            <li
              key={b}
              className="whitespace-nowrap rounded-full border border-white/10 bg-white/[0.04] px-3 py-1 text-[11px] font-medium text-gray-300"
            >
              {b}
            </li>
          ))}
        </ul>
      </div>
    </PointerSurface>
  )
}
