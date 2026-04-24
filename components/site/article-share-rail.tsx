"use client"

import { useState } from "react"

const btnCls =
  "group relative flex h-10 w-10 items-center justify-center rounded-full border border-white/10 bg-cw-dark/70 text-white/60 backdrop-blur-md transition-all hover:border-purple-400/40 hover:bg-white/5 hover:text-white"

export function ArticleShareRail({ title }: { title: string }) {
  const [copied, setCopied] = useState(false)

  const currentUrl = () =>
    typeof window === "undefined" ? "" : window.location.href

  const copy = async () => {
    const url = currentUrl()
    try {
      await navigator.clipboard.writeText(url)
    } catch {
      // swallow — still show confirmation so the user isn't left hanging
    }
    setCopied(true)
    setTimeout(() => setCopied(false), 1800)
  }

  const openShare = (builder: (url: string) => string) => () => {
    const url = currentUrl()
    if (!url) return
    window.open(builder(url), "_blank", "noopener,noreferrer")
  }

  const shareX = openShare(
    (url) =>
      `https://twitter.com/intent/tweet?text=${encodeURIComponent(title)}&url=${encodeURIComponent(url)}`,
  )
  const shareLinkedIn = openShare(
    (url) => `https://www.linkedin.com/sharing/share-offsite/?url=${encodeURIComponent(url)}`,
  )

  return (
    <aside className="hidden lg:block">
      <div className="sticky top-32 flex flex-col items-center gap-3">
        <p className="mb-1 whitespace-nowrap text-[9px] font-medium uppercase tracking-[0.3em] text-white/40">
          Share
        </p>
        <button type="button" onClick={copy} className={btnCls} aria-label="Copy link">
          {copied ? (
            <svg className="h-4 w-4 text-emerald-400" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5">
              <path strokeLinecap="round" strokeLinejoin="round" d="M4.5 12.75l6 6 9-13.5" />
            </svg>
          ) : (
            <svg className="h-4 w-4" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8">
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                d="M13.19 8.688a4.5 4.5 0 0 1 1.242 7.244l-4.5 4.5a4.5 4.5 0 0 1-6.364-6.364l1.757-1.757m13.35-.622 1.757-1.757a4.5 4.5 0 0 0-6.364-6.364l-4.5 4.5a4.5 4.5 0 0 0 1.242 7.244"
              />
            </svg>
          )}
        </button>
        <button
          type="button"
          onClick={shareX}
          className={btnCls}
          aria-label="Share on X"
        >
          <svg className="h-[14px] w-[14px]" viewBox="0 0 24 24" fill="currentColor">
            <path d="M18.244 2.25h3.308l-7.227 8.26 8.502 11.24H16.17l-5.214-6.817L4.99 21.75H1.68l7.73-8.835L1.254 2.25H8.08l4.713 6.231zm-1.161 17.52h1.833L7.084 4.126H5.117z" />
          </svg>
        </button>
        <button
          type="button"
          onClick={shareLinkedIn}
          className={btnCls}
          aria-label="Share on LinkedIn"
        >
          <svg className="h-[14px] w-[14px]" viewBox="0 0 24 24" fill="currentColor">
            <path d="M20.447 20.452h-3.554v-5.569c0-1.328-.027-3.037-1.852-3.037-1.853 0-2.136 1.445-2.136 2.939v5.667H9.351V9h3.414v1.561h.046c.477-.9 1.637-1.85 3.37-1.85 3.601 0 4.268 2.37 4.268 5.455v6.286zM5.337 7.433a2.062 2.062 0 0 1-2.063-2.065 2.063 2.063 0 1 1 2.063 2.065zm1.782 13.019H3.555V9h3.564v11.452zM22.225 0H1.771C.792 0 0 .774 0 1.729v20.542C0 23.227.792 24 1.771 24h20.451C23.2 24 24 23.227 24 22.271V1.729C24 .774 23.2 0 22.222 0z" />
          </svg>
        </button>
        <span className="mt-2 h-8 w-px bg-white/10" />
      </div>
    </aside>
  )
}
