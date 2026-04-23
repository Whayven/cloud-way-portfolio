import Link from "next/link"

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

export function SiteFooter() {
  return (
    <footer className="relative border-t border-white/10 py-14">
      <div className="mx-auto grid max-w-6xl grid-cols-1 gap-10 px-6 sm:grid-cols-2 lg:grid-cols-4 lg:px-2">
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
                <li key={item.label}>
                  <Link
                    href={item.href}
                    target={external ? "_blank" : undefined}
                    rel={external ? "noopener noreferrer" : undefined}
                    className="text-sm text-gray-300 transition-colors hover:text-white"
                  >
                    {item.label}
                  </Link>
                </li>
                )
              })}
            </ul>
          </div>
        ))}
      </div>

      <div className="mx-auto mt-12 flex max-w-6xl flex-col items-center justify-between gap-4 border-t border-white/5 px-6 pt-8 sm:flex-row lg:px-2">
        <p className="text-xs text-gray-500">
          &copy; {new Date().getFullYear()} CloudWay. All rights reserved.
        </p>
        <p className="flex items-center text-xs text-gray-500">
          <span className="relative mr-2 inline-flex h-2 w-2">
            <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-emerald-400 opacity-75" />
            <span className="relative inline-flex h-2 w-2 rounded-full bg-emerald-400" />
          </span>
          All systems operational
        </p>
      </div>
    </footer>
  )
}
