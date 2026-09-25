"use client"

/**
 * A div that exposes the cursor position to descendants as `--mx` / `--my`,
 * for spotlight and glowing-border effects. Pair with Tailwind `group` hovers.
 */
export function PointerSurface({
  className,
  style,
  children,
}: {
  className?: string
  style?: React.CSSProperties
  children: React.ReactNode
}) {
  return (
    <div
      className={className}
      style={style}
      onMouseMove={(e) => {
        const el = e.currentTarget
        const r = el.getBoundingClientRect()
        el.style.setProperty("--mx", `${e.clientX - r.left}px`)
        el.style.setProperty("--my", `${e.clientY - r.top}px`)
      }}
    >
      {children}
    </div>
  )
}
