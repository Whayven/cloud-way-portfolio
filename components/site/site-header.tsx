"use client"

import Link from "next/link"
import { usePathname } from "next/navigation"
import { useEffect, useState } from "react"

const nav = [
  { href: "/", label: "Home" },
  { href: "/work", label: "Work" },
  { href: "/blog", label: "Blog" },
] as const

function isActive(pathname: string, href: string) {
  if (href === "/") return pathname === "/"
  return pathname === href || pathname.startsWith(`${href}/`)
}

export function SiteHeader() {
  const pathname = usePathname()
  const [scrolled, setScrolled] = useState(false)

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 30)
    onScroll()
    window.addEventListener("scroll", onScroll, { passive: true })
    return () => window.removeEventListener("scroll", onScroll)
  }, [])

  return (
    <header
      className={`sticky top-0 z-50 w-full transition-all duration-500 ${
        scrolled
          ? "border-b border-white/10 bg-cw-dark/70 backdrop-blur-md"
          : "border-b border-transparent"
      }`}
    >
      <nav
        className="mx-auto flex w-full max-w-[85rem] items-center justify-between px-6 py-5 sm:px-10"
        aria-label="Global"
      >
        <Link href="/" className="group flex shrink-0 items-center gap-2.5">
          <span className="relative">
            <svg
              className="h-8 w-8 transition-transform duration-500 group-hover:rotate-[10deg]"
              viewBox="0 0 24 24"
              xmlns="http://www.w3.org/2000/svg"
            >
              <defs>
                <linearGradient id="cwNavGradient" x1="0%" y1="0%" x2="100%" y2="100%">
                  <stop offset="0%" stopColor="#ffffff" />
                  <stop offset="100%" stopColor="#a855f7" />
                </linearGradient>
              </defs>
              <path
                fill="url(#cwNavGradient)"
                d="M19.35 10.04A7.49 7.49 0 0 0 12 4C9.11 4 6.6 5.64 5.35 8.04A5.994 5.994 0 0 0 0 14c0 3.31 2.69 6 6 6h13c2.76 0 5-2.24 5-5 0-2.64-2.05-4.78-4.65-4.96z"
              />
            </svg>
            <span className="absolute -inset-2 -z-10 rounded-full bg-purple-500/30 opacity-0 blur-md transition-opacity duration-500 group-hover:opacity-100" />
          </span>
          <span
            className="bg-clip-text text-lg font-semibold tracking-tight text-transparent"
            style={{ backgroundImage: "linear-gradient(90deg, #ffffff, #c4a7f7)" }}
          >
            CloudWay
          </span>
        </Link>

        <ul className="flex items-center gap-1 sm:gap-2">
          {nav.map((item) => {
            const active = isActive(pathname, item.href)
            return (
              <li key={item.href}>
                <Link
                  href={item.href}
                  className={`relative rounded-lg px-4 py-2 text-sm font-medium transition-colors ${
                    active ? "text-white" : "text-gray-300 hover:text-white"
                  }`}
                  aria-current={active ? "page" : undefined}
                >
                  {item.label}
                  {active && (
                    <span className="absolute bottom-1 left-1/2 h-px w-[60%] -translate-x-1/2 bg-linear-to-r from-transparent via-purple-400 to-transparent" />
                  )}
                </Link>
              </li>
            )
          })}
          <li className="ml-2">
            <Link
              href="/#contact"
              className="rounded-lg border border-white/15 bg-white/5 px-4 py-2 text-sm font-medium text-white transition-all duration-300 hover:border-purple-400/50 hover:bg-purple-500/10"
            >
              Contact
            </Link>
          </li>
        </ul>
      </nav>
    </header>
  )
}
