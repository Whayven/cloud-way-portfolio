export function PageEyebrow({
  children,
  align = "center",
  className = "mb-6",
}: {
  children: React.ReactNode
  /** "start" drops the trailing hairline for left-aligned headings. */
  align?: "center" | "start"
  className?: string
}) {
  return (
    <div className={`inline-flex flex-nowrap items-center gap-2.5 whitespace-nowrap ${className}`}>
      <span className="h-px w-8 shrink-0 bg-linear-to-r from-transparent to-purple-400/60" />
      <span className="whitespace-nowrap text-[10px] font-medium uppercase tracking-[0.3em] text-purple-300/85">
        {children}
      </span>
      {align === "center" && (
        <span className="h-px w-8 shrink-0 bg-linear-to-l from-transparent to-purple-400/60" />
      )}
    </div>
  )
}
