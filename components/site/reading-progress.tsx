"use client"

import { useEffect, useRef, useState } from "react"

export function ReadingProgress() {
  const [progress, setProgress] = useState(0)
  const rafRef = useRef(0)

  useEffect(() => {
    const compute = () => {
      rafRef.current = 0
      const doc = document.documentElement
      const total = doc.scrollHeight - doc.clientHeight
      setProgress(total > 0 ? Math.min(100, Math.max(0, (doc.scrollTop / total) * 100)) : 0)
    }
    const onScroll = () => {
      if (!rafRef.current) rafRef.current = requestAnimationFrame(compute)
    }
    compute()
    window.addEventListener("scroll", onScroll, { passive: true })
    window.addEventListener("resize", onScroll, { passive: true })
    return () => {
      window.removeEventListener("scroll", onScroll)
      window.removeEventListener("resize", onScroll)
      if (rafRef.current) cancelAnimationFrame(rafRef.current)
    }
  }, [])

  return (
    <div
      className="fixed inset-x-0 top-0 z-[60] h-[2px] bg-white/5"
      role="progressbar"
      aria-label="Reading progress"
      aria-valuenow={Math.round(progress)}
      aria-valuemin={0}
      aria-valuemax={100}
    >
      <div
        className="h-full"
        style={{
          width: `${progress}%`,
          background: "linear-gradient(90deg, #38bdf8 0%, #a855f7 50%, #ec4899 100%)",
          transition: "width 80ms linear",
        }}
      />
    </div>
  )
}
