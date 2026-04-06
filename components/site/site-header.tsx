import Link from "next/link"

const nav = [
  { href: "/", label: "Home", variant: "primary" as const },
  { href: "/work", label: "Work", variant: "default" as const },
  {
    href: "https://blog.cloud-way.dev",
    label: "Blog",
    variant: "default" as const,
    external: true,
  },
] as const

const linkClass = {
  primary:
    "font-medium text-blue-500 transition-colors hover:text-blue-600 dark:text-blue-400 dark:hover:text-blue-300",
  default:
    "font-medium text-gray-600 transition-colors hover:text-cw-dark dark:text-gray-400 dark:hover:text-white",
} as const

export function SiteHeader() {
  return (
    <header className="sticky top-0 z-50 w-full border-b border-gray-200/70 bg-cw-light/85 backdrop-blur-md dark:border-white/10 dark:bg-cw-dark/80">
      <nav
        className="mx-auto flex w-full max-w-[85rem] flex-wrap items-center justify-between gap-4 px-5 py-3.5 sm:flex-nowrap sm:px-8"
        aria-label="Global"
      >
        <Link href="/" className="flex shrink-0 items-center gap-2">
          <span className="relative h-11 w-[11.5rem] sm:h-12 sm:w-[12.5rem]">
            <span
              className="absolute inset-0 flex items-center font-bold tracking-tight"
              aria-hidden
            >
              <svg
                viewBox="0 0 200 50"
                className="h-full w-full"
                fill="none"
                xmlns="http://www.w3.org/2000/svg"
              >
                <defs>
                  <linearGradient
                    id="cwLogo"
                    x1="0%"
                    y1="0%"
                    x2="100%"
                    y2="100%"
                  >
                    <stop offset="0%" stopColor="#87ceeb" />
                    <stop offset="100%" stopColor="#800080" />
                  </linearGradient>
                </defs>
                <text
                  x="4"
                  y="36"
                  fontFamily="var(--font-poppins), sans-serif"
                  fontSize="28"
                  fill="none"
                  stroke="url(#cwLogo)"
                  strokeWidth="2"
                >
                  CloudWay
                </text>
              </svg>
            </span>
            <span className="sr-only">CloudWay</span>
          </span>
        </Link>
        <ul className="flex flex-wrap items-center gap-1 sm:gap-2">
          {nav.map((item) => {
            const className = `${linkClass[item.variant]} rounded-lg px-3 py-2 text-sm`
            if ("external" in item && item.external) {
              return (
                <li key={item.href}>
                  <a
                    href={item.href}
                    target="_blank"
                    rel="noopener noreferrer"
                    className={className}
                  >
                    {item.label}
                  </a>
                </li>
              )
            }
            return (
              <li key={item.href}>
                <Link href={item.href} className={className}>
                  {item.label}
                </Link>
              </li>
            )
          })}
        </ul>
      </nav>
    </header>
  )
}
