"use client"

import { useState } from "react"
import { PageEyebrow } from "@/components/site/page-eyebrow"

export function BlogNewsletter() {
  const [email, setEmail] = useState("")

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
            The dispatch list is coming soon.
          </h2>
          <p
            className="mt-3 text-base leading-relaxed text-gray-400"
            style={{ textWrap: "pretty" }}
          >
            Short, practical writing on software craft. For now, the latest essays live right here.
          </p>
        </div>
        <form onSubmit={(e) => e.preventDefault()} className="flex w-full flex-col gap-3 sm:flex-row">
          <div className="flex-1">
            <label htmlFor="newsletter-email" className="sr-only">
              Email address
            </label>
            <input
              id="newsletter-email"
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              placeholder="you@company.com"
              className="w-full rounded-xl border-0 bg-white/5 px-4 py-3 text-sm text-white shadow-sm ring-1 ring-white/15 transition placeholder:text-gray-500 focus:ring-2 focus:ring-purple-500/60"
            />
          </div>
          <button
            type="submit"
            disabled
            className="whitespace-nowrap rounded-xl bg-white/10 px-6 py-3 text-sm font-semibold text-white/70 shadow-md ring-1 ring-white/15"
          >
            Coming soon
          </button>
        </form>
      </div>
    </div>
  )
}
