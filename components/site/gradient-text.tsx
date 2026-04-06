export function GradientText({
  children,
  className = "",
}: {
  children: React.ReactNode
  className?: string
}) {
  return (
    <span
      className={`bg-linear-to-r from-sky-400 via-purple-500 to-fuchsia-500 bg-clip-text text-transparent ${className}`.trim()}
    >
      {children}
    </span>
  )
}
