export function GradientText({
  children,
  className = "",
  subtle = false,
}: {
  children: React.ReactNode
  className?: string
  subtle?: boolean
}) {
  const gradient = subtle
    ? "from-white to-purple-400"
    : "from-sky-400 via-purple-500 to-fuchsia-500"

  return (
    <span
      className={`bg-linear-to-r ${gradient} bg-clip-text text-transparent ${className}`.trim()}
    >
      {children}
    </span>
  )
}
