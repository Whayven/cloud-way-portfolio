import Link from "next/link"

const Star = () => (
  <svg
    xmlns="http://www.w3.org/2000/svg"
    viewBox="0 0 784.11 815.53"
    className="h-auto w-full fill-purple-400"
  >
    <path d="M392.05 0c-20.9,210.08-184.06,378.41-392.05,407.78 207.96,29.37 371.12,197.68 392.05,407.74 20.93-210.06 184.09-378.37 392.05-407.74-207.98-29.38-371.16-197.69-392.06-407.78z" />
  </svg>
)

type Variant = "primary" | "ghost"

const variantClasses: Record<Variant, string> = {
  primary:
    "border-purple-500 bg-purple-500/90 text-white hover:bg-transparent hover:text-purple-300",
  ghost:
    "border-white/15 bg-white/[0.04] text-white backdrop-blur-sm hover:border-white/30 hover:bg-white/10",
}

export function StarButton({
  href,
  children,
  variant = "primary",
}: {
  href: string
  children: React.ReactNode
  variant?: Variant
}) {
  return (
    <Link
      href={href}
      className={`group relative inline-flex items-center gap-2 rounded-lg border-2 px-7 py-3 text-sm font-semibold shadow-[0_0_0_rgba(168,85,247,0.7)] transition-all duration-300 hover:shadow-[0_0_30px_rgba(168,85,247,0.6)] active:scale-[0.97] ${variantClasses[variant]}`}
    >
      <span className="relative z-[3]">{children}</span>
      <svg
        className="relative z-[3] h-4 w-4 transition-transform duration-300 group-hover:translate-x-1"
        viewBox="0 0 24 24"
        fill="none"
        stroke="currentColor"
        strokeWidth="2"
      >
        <path
          strokeLinecap="round"
          strokeLinejoin="round"
          d="M13.5 4.5 21 12m0 0-7.5 7.5M21 12H3"
        />
      </svg>

      {/* Star 1 */}
      <div className="absolute left-[20%] top-[20%] z-[-5] w-[25px] opacity-0 drop-shadow-[0_0_0_rgba(168,85,247,0.7)] transition-all duration-1000 ease-[cubic-bezier(0.05,0.83,0.43,0.96)] group-hover:left-[-30%] group-hover:top-[-80%] group-hover:z-[2] group-hover:opacity-100 group-hover:drop-shadow-[0_0_10px_rgba(168,85,247,0.7)]">
        <Star />
      </div>
      {/* Star 2 */}
      <div className="absolute left-[45%] top-[45%] z-[-5] w-[15px] opacity-0 drop-shadow-[0_0_0_rgba(168,85,247,0.7)] transition-all duration-1000 ease-[cubic-bezier(0,0.4,0,1.01)] group-hover:left-[10%] group-hover:top-[-25%] group-hover:z-[2] group-hover:opacity-100 group-hover:drop-shadow-[0_0_10px_rgba(168,85,247,0.7)]">
        <Star />
      </div>
      {/* Star 3 */}
      <div className="absolute left-[40%] top-[40%] z-[-5] w-[5px] opacity-0 drop-shadow-[0_0_0_rgba(168,85,247,0.7)] transition-all duration-1000 ease-[cubic-bezier(0,0.4,0,1.01)] group-hover:left-[25%] group-hover:top-[55%] group-hover:z-[2] group-hover:opacity-100 group-hover:drop-shadow-[0_0_10px_rgba(168,85,247,0.7)]">
        <Star />
      </div>
      {/* Star 4 */}
      <div className="absolute left-[40%] top-[20%] z-[-5] w-[8px] opacity-0 drop-shadow-[0_0_0_rgba(168,85,247,0.7)] transition-all duration-[800ms] ease-[cubic-bezier(0,0.4,0,1.01)] group-hover:left-[80%] group-hover:top-[30%] group-hover:z-[2] group-hover:opacity-100 group-hover:drop-shadow-[0_0_10px_rgba(168,85,247,0.7)]">
        <Star />
      </div>
      {/* Star 5 */}
      <div className="absolute left-[45%] top-[25%] z-[-5] w-[15px] opacity-0 drop-shadow-[0_0_0_rgba(168,85,247,0.7)] transition-all duration-[600ms] ease-[cubic-bezier(0,0.4,0,1.01)] group-hover:left-[115%] group-hover:top-[25%] group-hover:z-[2] group-hover:opacity-100 group-hover:drop-shadow-[0_0_10px_rgba(168,85,247,0.7)]">
        <Star />
      </div>
      {/* Star 6 */}
      <div className="absolute left-[50%] top-[5%] z-[-5] w-[5px] opacity-0 drop-shadow-[0_0_0_rgba(168,85,247,0.7)] transition-all duration-[800ms] ease-in-out group-hover:left-[60%] group-hover:top-[5%] group-hover:z-[2] group-hover:opacity-100 group-hover:drop-shadow-[0_0_10px_rgba(168,85,247,0.7)]">
        <Star />
      </div>
    </Link>
  )
}
