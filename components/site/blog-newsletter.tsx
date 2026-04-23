"use client"

import { useState } from "react"
import { PageEyebrow } from "@/components/site/page-eyebrow"

export function BlogNewsletter() {
  const [email, setEmail] = useState("")
  const [subscribed, setSubscribed] = useState(false)

  return (
    <div className="relative overflow-hidden rounded-3xl border border-white/10 bg-white/[0.02] p-10 sm:p-14">
      <div
        className="pointer-events-none absolute inset-0"
        style={{
          background:
            "radial-gradient(circle at 20% 20%, rgba(168,85,247,0.22), transparent 50%), radial-gradient(circle at 80% 80%, rgba(56,189,248,0.2), transparent 50%)",
        }}
      />
      <div className="relative grid grid-cols-1 items-center gap-8 md:grid-cols-[1.2fr_1fr]">
        <div>
          <PageEyebrow>Dispatch</PageEyebrow>
          <h2
            className="text-3xl font-semibold tracking-tight text-white sm:text-4xl"
            style={{ textWrap: "balance" }}
          >
            One essay a week. No noise.
          </h2>
          <p
            className="mt-3 text-base leading-relaxed text-gray-400"
            style={{ textWrap: "pretty" }}
          >
            Short, practical writing on software craft. Unsubscribe in one click.
          </p>
        </div>
        {subscribed ? (
          <div className="flex items-center gap-3 rounded-2xl border border-emerald-400/30 bg-emerald-500/5 p-5">
            <div className="flex h-10 w-10 items-center justify-center rounded-full border border-emerald-400/40 bg-emerald-500/10">
              <svg
                className="h-5 w-5 text-emerald-400"
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                strokeWidth="2.5"
              >
                <path strokeLinecap="round" strokeLinejoin="round" d="M4.5 12.75l6 6 9-13.5" />
              </svg>
            </div>
            <div>
              <p className="text-sm font-semibold text-white">You&apos;re in.</p>
              <p className="text-xs text-gray-400">Next dispatch goes out Monday.</p>
            </div>
          </div>
        ) : (
          <form
            onSubmit={(e) => {
              e.preventDefault()
              if (email) setSubscribed(true)
            }}
            className="flex w-full flex-col gap-3 sm:flex-row"
          >
            <input
              type="email"
              required
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              placeholder="you@company.com"
              className="flex-1 rounded-xl border-0 bg-white/5 px-4 py-3 text-sm text-white shadow-sm ring-1 ring-white/15 transition placeholder:text-gray-500 focus:ring-2 focus:ring-purple-500/60"
            />
            <button
              type="submit"
              className="whitespace-nowrap rounded-xl bg-linear-to-r from-purple-600 to-fuchsia-500 px-6 py-3 text-sm font-semibold text-white shadow-md transition hover:brightness-110"
            >
              Subscribe
            </button>
          </form>
        )}
      </div>
    </div>
  )
}
