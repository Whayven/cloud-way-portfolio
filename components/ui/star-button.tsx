import React from "react"
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

export function StarButton({
  href,
  children,
}: {
  href: string
  children: React.ReactNode
}) {
  return (
    <Link
      href={href}
      className="group relative inline-flex items-center gap-2 rounded-md border-2 border-purple-500 bg-purple-500/90 px-7 py-3 text-sm font-semibold text-white shadow-[0_0_0_rgba(168,85,247,0.7)] transition-all duration-300 hover:bg-transparent hover:text-purple-400 hover:shadow-[0_0_25px_rgba(168,85,247,0.7)] active:scale-95"
    >
      {children}

      {/* Star 1 */}
      <div className="absolute left-[20%] top-[20%] z-[-5] opacity-0 w-[25px] drop-shadow-[0_0_0_rgba(168,85,247,0.7)] transition-all duration-1000 ease-[cubic-bezier(0.05,0.83,0.43,0.96)] group-hover:left-[-30%] group-hover:top-[-80%] group-hover:z-[2] group-hover:opacity-100 group-hover:drop-shadow-[0_0_10px_rgba(168,85,247,0.7)]">
        <Star />
      </div>

      {/* Star 2 */}
      <div className="absolute left-[45%] top-[45%] z-[-5] opacity-0 w-[15px] drop-shadow-[0_0_0_rgba(168,85,247,0.7)] transition-all duration-1000 ease-[cubic-bezier(0,0.4,0,1.01)] group-hover:left-[10%] group-hover:top-[-25%] group-hover:z-[2] group-hover:opacity-100 group-hover:drop-shadow-[0_0_10px_rgba(168,85,247,0.7)]">
        <Star />
      </div>

      {/* Star 3 */}
      <div className="absolute left-[40%] top-[40%] z-[-5] opacity-0 w-[5px] drop-shadow-[0_0_0_rgba(168,85,247,0.7)] transition-all duration-1000 ease-[cubic-bezier(0,0.4,0,1.01)] group-hover:left-[25%] group-hover:top-[55%] group-hover:z-[2] group-hover:opacity-100 group-hover:drop-shadow-[0_0_10px_rgba(168,85,247,0.7)]">
        <Star />
      </div>

      {/* Star 4 */}
      <div className="absolute left-[40%] top-[20%] z-[-5] opacity-0 w-[8px] drop-shadow-[0_0_0_rgba(168,85,247,0.7)] transition-all duration-[800ms] ease-[cubic-bezier(0,0.4,0,1.01)] group-hover:left-[80%] group-hover:top-[30%] group-hover:z-[2] group-hover:opacity-100 group-hover:drop-shadow-[0_0_10px_rgba(168,85,247,0.7)]">
        <Star />
      </div>

      {/* Star 5 */}
      <div className="absolute left-[45%] top-[25%] z-[-5] opacity-0 w-[15px] drop-shadow-[0_0_0_rgba(168,85,247,0.7)] transition-all duration-[600ms] ease-[cubic-bezier(0,0.4,0,1.01)] group-hover:left-[115%] group-hover:top-[25%] group-hover:z-[2] group-hover:opacity-100 group-hover:drop-shadow-[0_0_10px_rgba(168,85,247,0.7)]">
        <Star />
      </div>

      {/* Star 6 */}
      <div className="absolute left-[50%] top-[5%] z-[-5] opacity-0 w-[5px] drop-shadow-[0_0_0_rgba(168,85,247,0.7)] transition-all duration-[800ms] ease-in-out group-hover:left-[60%] group-hover:top-[5%] group-hover:z-[2] group-hover:opacity-100 group-hover:drop-shadow-[0_0_10px_rgba(168,85,247,0.7)]">
        <Star />
      </div>
    </Link>
  )
}
