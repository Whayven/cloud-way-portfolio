export function GradientText({
  children,
  className = "",
}: {
  children: React.ReactNode
  className?: string
}) {
  return (
    <span
      className={`bg-linear-to-r from-accent-sky to-accent-purple bg-clip-text text-transparent dark:bg-linear-to-l dark:from-accent-sky dark:to-white ${className}`.trim()}
    >
      {children}
    </span>
  )
}
