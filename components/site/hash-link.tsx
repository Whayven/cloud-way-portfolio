"use client"

import Link from "next/link"
import { usePathname } from "next/navigation"
import type { ComponentProps } from "react"

/**
 * A Link that always scrolls to its `#anchor` when the target is on the
 * current page. Next's Link treats a click on the URL you're already at
 * (e.g. `/#services` after scrolling away) as a no-op, so we scroll ourselves.
 */
export function HashLink({ href, onClick, ...props }: ComponentProps<typeof Link> & { href: string }) {
  const pathname = usePathname()

  return (
    <Link
      href={href}
      {...props}
      onClick={(e) => {
        onClick?.(e)
        if (e.defaultPrevented || e.button !== 0 || e.metaKey || e.ctrlKey || e.shiftKey || e.altKey) return
        const [path, id] = href.split("#")
        if (!id || (path || pathname) !== pathname) return
        const target = document.getElementById(id)
        if (!target) return
        e.preventDefault()
        const smooth = !window.matchMedia("(prefers-reduced-motion: reduce)").matches
        target.scrollIntoView({ behavior: smooth ? "smooth" : "auto" })
        // Native fragment navigation would move the focus start point to the
        // target; do the same so keyboard users continue from the section.
        if (!target.hasAttribute("tabindex")) {
          target.setAttribute("tabindex", "-1")
          target.style.outline = "none"
        }
        target.focus({ preventScroll: true })
        if (window.location.hash !== `#${id}`) window.history.pushState(null, "", `#${id}`)
      }}
    />
  )
}
