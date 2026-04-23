"use client"

export type ServiceAccent = "purple" | "sky" | "fuchsia" | "emerald"

const accentColor: Record<ServiceAccent, { text: string; ring: string }> = {
  purple: { text: "text-purple-300", ring: "rgba(168,85,247,0.5)" },
  sky: { text: "text-sky-300", ring: "rgba(56,189,248,0.5)" },
  fuchsia: { text: "text-fuchsia-300", ring: "rgba(236,72,153,0.5)" },
  emerald: { text: "text-emerald-300", ring: "rgba(52,211,153,0.5)" },
}

export function ServiceCard({
  title,
  body,
  bullets,
  icon,
  accent,
}: {
  title: string
  body: string
  bullets: string[]
  icon: React.ReactNode
  accent: ServiceAccent
}) {
  const { text, ring } = accentColor[accent]
  return (
    <article
      className="group relative h-full overflow-hidden rounded-3xl border border-white/10 bg-white/[0.03] p-8 backdrop-blur-xl transition-all duration-500 hover:-translate-y-1 hover:border-white/25 hover:bg-white/[0.06]"
      onMouseMove={(e) => {
        const el = e.currentTarget
        const r = el.getBoundingClientRect()
        el.style.setProperty("--mx", `${e.clientX - r.left}px`)
        el.style.setProperty("--my", `${e.clientY - r.top}px`)
      }}
    >
      <div
        className="pointer-events-none absolute inset-0 opacity-0 transition-opacity duration-500 group-hover:opacity-100"
        style={{
          background: `radial-gradient(400px circle at var(--mx, 50%) var(--my, 50%), ${ring}, transparent 60%)`,
        }}
      />
      <div className="relative flex h-full flex-col gap-5">
        <div className="flex items-center gap-4">
          <span
            className={`relative flex h-12 w-12 items-center justify-center rounded-2xl bg-white/[0.06] ${text}`}
          >
            <span
              className="absolute inset-0 rounded-2xl opacity-60 blur-[10px]"
              style={{ background: ring }}
            />
            <span className="relative">{icon}</span>
          </span>
          <h3 className="text-xl font-semibold tracking-tight text-white sm:text-2xl">{title}</h3>
        </div>
        <p className="text-sm leading-relaxed text-gray-400">{body}</p>
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
    </article>
  )
}
