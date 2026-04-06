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
    "font-medium text-blue-400 transition-colors hover:text-blue-500 dark:text-blue-500 dark:hover:text-blue-400",
  default:
    "font-medium text-gray-700 transition-colors hover:text-gray-900 dark:text-gray-400 dark:hover:text-white",
} as const

export function SiteHeader() {
  return (
    <header className="z-50 w-full bg-cw-light py-4 text-sm dark:bg-transparent">
      <nav
        className="mx-auto flex w-full max-w-[85rem] flex-wrap items-center justify-between px-4 sm:flex-nowrap"
        aria-label="Global"
      >
        <Link href="/" className="flex items-center gap-2">
          <span className="relative h-[50px] w-[180px]">
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
        <ul className="mt-4 flex flex-wrap items-center gap-4 sm:mt-0 sm:ml-auto sm:gap-6">
          {nav.map((item) => {
            const className = linkClass[item.variant]
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
