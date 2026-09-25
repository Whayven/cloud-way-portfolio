"use client"

import Link from "next/link"

/**
 * A Link that exposes the cursor position to descendants as `--mx` / `--my`,
 * for radial "spotlight" overlays. Pair with Tailwind `group` hover classes.
 */
export function SpotlightLink({
  href,
  className,
  children,
}: {
  href: string
  className?: string
  children: React.ReactNode
}) {
  return (
    <Link
      href={href}
      className={className}
      onMouseMove={(e) => {
        const el = e.currentTarget
        const r = el.getBoundingClientRect()
        el.style.setProperty("--mx", `${e.clientX - r.left}px`)
        el.style.setProperty("--my", `${e.clientY - r.top}px`)
      }}
    >
      {children}
    </Link>
  )
}
