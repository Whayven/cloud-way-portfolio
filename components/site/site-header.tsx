"use client"

import Link from "next/link"
import { HashLink } from "@/components/site/hash-link"
import { usePathname } from "next/navigation"
import { useEffect, useRef, useState } from "react"

// Order matches the order of sections on the home page.
const nav = [
  { href: "/", label: "Home" },
  { href: "/#services", label: "Services" },
  { href: "/work", label: "Work" },
  { href: "/blog", label: "Blog" },
] as const

// Sections that have their own nav item, as [path, element id].
const sectionLinks = nav.flatMap((item) => {
  const [path, id] = item.href.split("#")
  return id ? [[path, id] as const] : []
})

/** `section` is the id of the nav-linked section currently in view, if any. */
function isActive(pathname: string, href: string, section: string | null) {
  const [path, id] = href.split("#")
  if (id) return pathname === path && section === id
  if (href === "/") return pathname === "/" && section === null
  return pathname === href || pathname.startsWith(`${href}/`)
}

function PingDot({ size }: { size: string }) {
  return (
    <span className={`relative inline-flex ${size}`}>
      <span className="absolute inline-flex h-full w-full rounded-full bg-emerald-400 opacity-75 motion-safe:animate-[ping_1.4s_cubic-bezier(0,0,0.2,1)_infinite]" />
      <span className={`relative inline-flex rounded-full bg-emerald-400 ${size}`} />
    </span>
  )
}

export function SiteHeader({ intro = false }: { intro?: boolean }) {
  const pathname = usePathname()
  const [scrolled, setScrolled] = useState(false)
  const [open, setOpen] = useState(false)
  const [section, setSection] = useState<string | null>(null)
  const progressRef = useRef<HTMLDivElement>(null)
  // Articles get a slightly heavier bar — it doubles as reading progress.
  const isArticle = /^\/blog\/[^/]+/.test(pathname)

  useEffect(() => {
    const onScroll = () => {
      const y = window.scrollY
      setScrolled(y > 30)
      const max = document.documentElement.scrollHeight - window.innerHeight
      if (progressRef.current) {
        progressRef.current.style.width = `${max > 0 ? Math.min(1, y / max) * 100 : 0}%`
      }
      // Scroll-spy: a section counts as current while it spans a line 35% down the viewport.
      const line = window.innerHeight * 0.35
      let current: string | null = null
      for (const [path, id] of sectionLinks) {
        const r = path === pathname ? document.getElementById(id)?.getBoundingClientRect() : undefined
        if (r && r.top <= line && r.bottom > line) current = id
      }
      setSection(current)
    }
    onScroll()
    window.addEventListener("scroll", onScroll, { passive: true })
    window.addEventListener("resize", onScroll)
    return () => {
      window.removeEventListener("scroll", onScroll)
      window.removeEventListener("resize", onScroll)
    }
  }, [pathname])

  // Close the mobile panel when the route changes.
  const [openedOn, setOpenedOn] = useState(pathname)
  if (openedOn !== pathname) {
    setOpenedOn(pathname)
    setOpen(false)
  }

  // Close on Escape and lock body scroll while open.
  useEffect(() => {
    if (!open) return
    const onKey = (e: KeyboardEvent) => {
      if (e.key === "Escape") setOpen(false)
    }
    document.addEventListener("keydown", onKey)
    const prevOverflow = document.body.style.overflow
    document.body.style.overflow = "hidden"
    return () => {
      document.removeEventListener("keydown", onKey)
      document.body.style.overflow = prevOverflow
    }
  }, [open])

  return (
    <header
      className={`sticky top-0 z-50 w-full border-b transition-[background-color,border-color] duration-500 ${
        scrolled || open
          ? "border-white/[0.08] bg-cw-dark/[0.72] backdrop-blur-[14px]"
          : "border-transparent"
      }`}
    >
      <nav
        className="mx-auto flex w-full max-w-[85rem] items-center justify-between gap-4 px-6 py-4 sm:px-10 sm:py-5"
        aria-label="Global"
        // On the home page the nav fades in once the warp intro settles.
        style={intro ? { animation: "fade-up .9s var(--ease-spring) calc(var(--intro) + 0.2s) both" } : undefined}
      >
        <Link
          href="/"
          onClick={() => setOpen(false)}
          className="group flex shrink-0 items-center gap-2.5"
        >
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

        {/* Desktop nav */}
        <ul className="hidden items-center gap-1 rounded-full border border-white/[0.08] bg-white/[0.03] p-1 backdrop-blur-md md:flex">
          {nav.map((item) => {
            const active = isActive(pathname, item.href, section)
            return (
              <li key={item.href}>
                <HashLink
                  href={item.href}
                  className={`block rounded-full px-4 py-[7px] text-[13px] font-medium transition-all duration-300 ${
                    active ? "bg-white/[0.08] text-white" : "text-gray-300 hover:text-white"
                  }`}
                  aria-current={active ? (item.href.includes("#") ? "location" : "page") : undefined}
                >
                  {item.label}
                </HashLink>
              </li>
            )
          })}
        </ul>

        <HashLink
          href="/#contact"
          className="hidden items-center gap-2 rounded-full border border-white/15 bg-white/5 px-[18px] py-2 text-[13px] font-medium text-white transition-all duration-300 hover:border-purple-400/50 hover:bg-purple-500/[0.12] hover:shadow-[0_0_24px_rgba(168,85,247,0.35)] md:inline-flex"
        >
          <PingDot size="h-1.5 w-1.5" />
          Contact
        </HashLink>

        {/* Mobile menu toggle */}
        <button
          type="button"
          onClick={() => setOpen((v) => !v)}
          aria-expanded={open}
          aria-controls="mobile-nav"
          aria-label={open ? "Close menu" : "Open menu"}
          className="inline-flex h-10 w-10 items-center justify-center rounded-lg border border-white/15 bg-white/5 text-white transition-colors hover:border-purple-400/40 hover:bg-purple-500/10 md:hidden"
        >
          <svg className="h-5 w-5" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8">
            {open ? (
              <path strokeLinecap="round" strokeLinejoin="round" d="M6 6l12 12M18 6L6 18" />
            ) : (
              <path strokeLinecap="round" strokeLinejoin="round" d="M4 7h16M4 12h16M4 17h16" />
            )}
          </svg>
        </button>
      </nav>

      {/* Mobile panel */}
      <div
        id="mobile-nav"
        // Overlays the page (out of flow) so opening/closing it never shifts the
        // document — otherwise a section link would land off by the panel height.
        className={`absolute inset-x-0 top-full overflow-hidden border-t border-white/10 bg-cw-dark/95 backdrop-blur-md transition-[max-height,opacity] duration-300 ease-out md:hidden ${
          open ? "max-h-96 opacity-100" : "max-h-0 opacity-0"
        }`}
      >
        <ul className="mx-auto flex w-full max-w-[85rem] flex-col gap-1 px-6 py-4 sm:px-10">
          {nav.map((item) => {
            const active = isActive(pathname, item.href, section)
            return (
              <li key={item.href}>
                <HashLink
                  href={item.href}
                  onClick={() => setOpen(false)}
                  className={`flex items-center justify-between rounded-lg px-3 py-3 text-base font-medium transition-colors ${
                    active
                      ? "bg-white/5 text-white"
                      : "text-gray-300 hover:bg-white/5 hover:text-white"
                  }`}
                  aria-current={active ? (item.href.includes("#") ? "location" : "page") : undefined}
                >
                  <span>{item.label}</span>
                  {active && <span className="h-1.5 w-1.5 rounded-full bg-purple-400" />}
                </HashLink>
              </li>
            )
          })}
          <li className="mt-2">
            <HashLink
              href="/#contact"
              onClick={() => setOpen(false)}
              className="flex items-center justify-center gap-2 rounded-full border border-white/15 bg-white/5 px-4 py-3 text-sm font-semibold text-white transition-all duration-300 hover:border-purple-400/50 hover:bg-purple-500/10"
            >
              <PingDot size="h-1.5 w-1.5" />
              Contact
            </HashLink>
          </li>
        </ul>
      </div>

      {/* Scroll progress */}
      <div
        ref={progressRef}
        className={`absolute -bottom-px left-0 w-0 bg-linear-to-r from-sky-400 via-purple-500 to-pink-500 shadow-[0_0_12px_rgba(168,85,247,0.8)] ${
          isArticle ? "h-0.5" : "h-px"
        }`}
        aria-hidden
      />
    </header>
  )
}
