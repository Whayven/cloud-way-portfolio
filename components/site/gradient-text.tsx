export function GradientText({
  children,
  className = "",
}: {
  children: React.ReactNode
  className?: string
}) {
  return (
    <span
      className={`bg-gradient-to-r from-accent-sky to-accent-purple bg-clip-text text-transparent dark:bg-gradient-to-l dark:from-accent-sky dark:to-white ${className}`}
    >
      {children}
    </span>
  )
}
