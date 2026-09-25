import { HashLink } from "@/components/site/hash-link"

const columns = [
  {
    heading: "Studio",
    items: [
      { label: "Work", href: "/work" },
      { label: "Services", href: "/#services" },
      { label: "Process", href: "/#process" },
      { label: "About", href: "/#about" },
    ],
  },
  {
    heading: "Resources",
    items: [
      { label: "Blog", href: "/blog" },
      { label: "Case studies", href: "/work" },
    ],
  },
  {
    heading: "Contact",
    items: [
      { label: "hello@cloud-way.dev", href: "mailto:hello@cloud-way.dev" },
      { label: "Start a project", href: "/#contact" },
      { label: "X / Twitter", href: "https://x.com/Whayyven" },
      { label: "LinkedIn", href: "https://www.linkedin.com/in/wayne-foster-jr" },
    ],
  },
] as const

const socials = [
  {
    label: "X / Twitter",
    href: "https://x.com/Whayyven",
    d: "M18.244 2.25h3.308l-7.227 8.26 8.502 11.24H16.17l-5.214-6.817L4.99 21.75H1.68l7.73-8.835L1.254 2.25H8.08l4.713 6.231zm-1.161 17.52h1.833L7.084 4.126H5.117z",
  },
  {
    label: "LinkedIn",
    href: "https://www.linkedin.com/in/wayne-foster-jr",
    d: "M20.447 20.452h-3.554v-5.569c0-1.328-.027-3.037-1.852-3.037-1.853 0-2.136 1.445-2.136 2.939v5.667H9.351V9h3.414v1.561h.046c.477-.9 1.637-1.85 3.37-1.85 3.601 0 4.267 2.37 4.267 5.455v6.286zM5.337 7.433a2.062 2.062 0 0 1-2.063-2.065 2.064 2.064 0 1 1 2.063 2.065zm1.782 13.019H3.555V9h3.564v11.452zM22.225 0H1.771C.792 0 0 .774 0 1.729v20.542C0 23.227.792 24 1.771 24h20.451C23.2 24 24 23.227 24 22.271V1.729C24 .774 23.2 0 22.222 0h.003z",
  },
  {
    label: "GitHub",
    href: "https://github.com/Whayven",
    d: "M12 2C6.477 2 2 6.484 2 12.017c0 4.425 2.865 8.18 6.839 9.504.5.092.682-.217.682-.483 0-.237-.008-.868-.013-1.703-2.782.605-3.369-1.343-3.369-1.343-.454-1.158-1.11-1.466-1.11-1.466-.908-.62.069-.608.069-.608 1.003.07 1.531 1.032 1.531 1.032.892 1.53 2.341 1.088 2.91.832.092-.647.35-1.088.636-1.338-2.22-.253-4.555-1.113-4.555-4.951 0-1.093.39-1.988 1.029-2.688-.103-.253-.446-1.272.098-2.65 0 0 .84-.27 2.75 1.026A9.564 9.564 0 0 1 12 6.844a9.59 9.59 0 0 1 2.504.337c1.909-1.296 2.747-1.027 2.747-1.027.546 1.379.202 2.398.1 2.651.64.7 1.028 1.595 1.028 2.688 0 3.848-2.339 4.695-4.566 4.943.359.309.678.92.678 1.855 0 1.338-.012 2.419-.012 2.747 0 .268.18.58.688.482A10.019 10.019 0 0 0 22 12.017C22 6.484 17.522 2 12 2z",
  },
]

export function SiteFooter() {
  return (
    <footer className="relative overflow-hidden border-t border-white/[0.08] pt-16">
      <div className="mx-auto grid max-w-6xl grid-cols-1 gap-10 px-6 sm:grid-cols-2 sm:px-12 lg:grid-cols-4">
        <div>
          <div className="flex items-center gap-2.5">
            <svg className="h-7 w-7" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
              <defs>
                <linearGradient id="cwFooterGradient" x1="0%" y1="0%" x2="100%" y2="100%">
                  <stop offset="0%" stopColor="#ffffff" />
                  <stop offset="100%" stopColor="#a855f7" />
                </linearGradient>
              </defs>
              <path
                fill="url(#cwFooterGradient)"
                d="M19.35 10.04A7.49 7.49 0 0 0 12 4C9.11 4 6.6 5.64 5.35 8.04A5.994 5.994 0 0 0 0 14c0 3.31 2.69 6 6 6h13c2.76 0 5-2.24 5-5 0-2.64-2.05-4.78-4.65-4.96z"
              />
            </svg>
            <span
              className="bg-clip-text text-lg font-semibold tracking-tight text-transparent"
              style={{ backgroundImage: "linear-gradient(90deg, #ffffff, #c4a7f7)" }}
            >
              CloudWay
            </span>
          </div>
          <p className="mt-4 max-w-xs text-sm leading-relaxed text-gray-400">
            Full-stack applications that help businesses scale, streamline, and stand out online.
          </p>
          <div className="mt-5 flex gap-4">
            {socials.map((s) => (
              <a
                key={s.label}
                href={s.href}
                target="_blank"
                rel="noopener noreferrer"
                aria-label={s.label}
                className="text-gray-500 transition-[color,transform] duration-300 hover:-translate-y-0.5 hover:text-white"
              >
                <svg className="block h-[18px] w-[18px]" fill="currentColor" viewBox="0 0 24 24" aria-hidden>
                  <path d={s.d} />
                </svg>
              </a>
            ))}
          </div>
        </div>

        {columns.map((col) => (
          <div key={col.heading}>
            <h4 className="text-[10px] font-semibold uppercase tracking-[0.3em] text-white/40">
              {col.heading}
            </h4>
            <ul className="mt-4 space-y-2.5">
              {col.items.map((item) => {
                const external = /^https?:\/\//.test(item.href)
                return (
                <li key={`${item.label}-${item.href}`}>
                  <HashLink
                    href={item.href}
                    target={external ? "_blank" : undefined}
                    rel={external ? "noopener noreferrer" : undefined}
                    className="text-sm text-gray-300 transition-colors hover:text-white"
                  >
                    {item.label}
                  </HashLink>
                </li>
                )
              })}
            </ul>
          </div>
        ))}
      </div>

      <div className="mx-auto mt-12 flex max-w-6xl flex-col items-center justify-between gap-4 border-t border-white/5 px-6 pt-7 sm:flex-row sm:px-12">
        <p className="text-xs text-gray-500">
          &copy; {new Date().getFullYear()} CloudWay. All rights reserved.
        </p>
        <p className="flex items-center text-xs text-gray-500">
          <span className="relative mr-2 inline-flex h-2 w-2">
            <span className="absolute inline-flex h-full w-full rounded-full bg-emerald-400 opacity-75 motion-safe:animate-ping motion-reduce:animate-none" />
            <span className="relative inline-flex h-2 w-2 rounded-full bg-emerald-400" />
          </span>
          All systems operational
        </p>
      </div>

      {/* Wordmark */}
      <div
        aria-hidden
        className="relative mt-6 select-none whitespace-nowrap text-center font-bold leading-[0.8] tracking-[-0.06em] opacity-[0.16]"
        style={{
          fontSize: "clamp(80px, 19vw, 300px)",
          backgroundImage: "linear-gradient(90deg, #38bdf8, #a855f7, #ec4899, #38bdf8)",
          backgroundSize: "200% 100%",
          WebkitBackgroundClip: "text",
          backgroundClip: "text",
          color: "transparent",
          animation: "text-shimmer 14s linear infinite",
          WebkitMaskImage: "linear-gradient(180deg, #000 30%, transparent 95%)",
          maskImage: "linear-gradient(180deg, #000 30%, transparent 95%)",
        }}
      >
        CloudWay
      </div>
    </footer>
  )
}
