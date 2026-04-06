import Link from "next/link"

const nav = [
  { href: "/", label: "Home" },
  { href: "/work", label: "Work" },
  {
    href: "https://blog.cloud-way.dev",
    label: "Blog",
    external: true,
  },
] as const

export function SiteHeader() {
  return (
    <header className="absolute top-0 z-50 w-full">
      <nav
        className="mx-auto flex w-full max-w-[85rem] items-center justify-between px-6 py-5 sm:px-10"
        aria-label="Global"
      >
        <Link href="/" className="flex shrink-0 items-center gap-2.5">
          {/* Cloud icon */}
          <svg
            className="h-8 w-8 text-accent-sky-light"
            viewBox="0 0 24 24"
            fill="currentColor"
            xmlns="http://www.w3.org/2000/svg"
          >
            <path d="M19.35 10.04A7.49 7.49 0 0 0 12 4C9.11 4 6.6 5.64 5.35 8.04A5.994 5.994 0 0 0 0 14c0 3.31 2.69 6 6 6h13c2.76 0 5-2.24 5-5 0-2.64-2.05-4.78-4.65-4.96z" />
          </svg>
          <span className="text-lg font-semibold tracking-tight text-white">
            Cloud<span className="text-accent-sky-light">Way</span>
          </span>
        </Link>

        <ul className="flex items-center gap-1 sm:gap-2">
          {nav.map((item) => {
            const className =
              "rounded-lg px-4 py-2 text-sm font-medium text-gray-300 transition-colors hover:text-white"
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
