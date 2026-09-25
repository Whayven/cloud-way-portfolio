"use client"

import { useEffect, useRef, useState } from "react"

const X_PATH =
  "M18.244 2.25h3.308l-7.227 8.26 8.502 11.24H16.17l-5.214-6.817L4.99 21.75H1.68l7.73-8.835L1.254 2.25H8.08l4.713 6.231zm-1.161 17.52h1.833L7.084 4.126H5.117z"
const LINKEDIN_PATH =
  "M20.447 20.452h-3.554v-5.569c0-1.328-.027-3.037-1.852-3.037-1.853 0-2.136 1.445-2.136 2.939v5.667H9.351V9h3.414v1.561h.046c.477-.9 1.637-1.85 3.37-1.85 3.601 0 4.268 2.37 4.268 5.455v6.286zM5.337 7.433a2.062 2.062 0 0 1-2.063-2.065 2.063 2.063 0 1 1 2.063 2.065zm1.782 13.019H3.555V9h3.564v11.452zM22.225 0H1.771C.792 0 0 .774 0 1.729v20.542C0 23.227.792 24 1.771 24h20.451C23.2 24 24 23.227 24 22.271V1.729C24 .774 23.2 0 22.222 0z"

const BUTTON =
  "flex h-10 w-10 items-center justify-center rounded-full border border-white/10 bg-cw-dark/70 text-white/60 transition-all duration-300 hover:border-purple-400/40 hover:text-white hover:shadow-[0_0_18px_rgba(168,85,247,0.3)]"

/**
 * Copy-link / X / LinkedIn share buttons. "rail" is the sticky vertical
 * column beside the article on wide screens; "inline" is a row for small ones.
 */
export function ArticleShareRail({
  url,
  title,
  layout = "rail",
}: {
  url: string
  title: string
  layout?: "rail" | "inline"
}) {
  const [copied, setCopied] = useState(false)
  const timer = useRef<ReturnType<typeof setTimeout>>(undefined)

  useEffect(() => () => clearTimeout(timer.current), [])

  const copy = async () => {
    try {
      await navigator.clipboard.writeText(url)
    } catch {
      return
    }
    setCopied(true)
    clearTimeout(timer.current)
    timer.current = setTimeout(() => setCopied(false), 1800)
  }

  const shares = [
    {
      label: "Share on X",
      href: `https://twitter.com/intent/tweet?text=${encodeURIComponent(title)}&url=${encodeURIComponent(url)}`,
      d: X_PATH,
    },
    {
      label: "Share on LinkedIn",
      href: `https://www.linkedin.com/sharing/share-offsite/?url=${encodeURIComponent(url)}`,
      d: LINKEDIN_PATH,
    },
  ]

  const rail = layout === "rail"

  return (
    <div className={rail ? "flex flex-col items-center gap-3" : "flex items-center gap-3"}>
      <p
        className={`text-[9px] font-medium uppercase tracking-[0.3em] text-white/40 ${rail ? "mb-1" : "mr-1"}`}
      >
        Share
      </p>
      <button
        type="button"
        onClick={copy}
        aria-label={copied ? "Link copied" : "Copy link"}
        className={`${BUTTON} cursor-pointer`}
      >
        {copied ? (
          <svg className="h-4 w-4 text-emerald-400" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" aria-hidden>
            <path strokeLinecap="round" strokeLinejoin="round" d="M4.5 12.75l6 6 9-13.5" />
          </svg>
        ) : (
          <svg className="h-4 w-4" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" aria-hidden>
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              d="M13.19 8.688a4.5 4.5 0 0 1 1.242 7.244l-4.5 4.5a4.5 4.5 0 0 1-6.364-6.364l1.757-1.757m13.35-.622 1.757-1.757a4.5 4.5 0 0 0-6.364-6.364l-4.5 4.5a4.5 4.5 0 0 0 1.242 7.244"
            />
          </svg>
        )}
      </button>
      {shares.map((s) => (
        <a
          key={s.label}
          href={s.href}
          target="_blank"
          rel="noopener noreferrer"
          aria-label={s.label}
          className={BUTTON}
        >
          <svg className="h-3.5 w-3.5" viewBox="0 0 24 24" fill="currentColor" aria-hidden>
            <path d={s.d} />
          </svg>
        </a>
      ))}
      {rail && <span aria-hidden className="mt-2 h-8 w-px bg-white/10" />}
    </div>
  )
}
