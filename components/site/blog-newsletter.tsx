"use client"

import { useState } from "react"
import { PageEyebrow } from "@/components/site/page-eyebrow"

export function BlogNewsletter() {
  const [email, setEmail] = useState("")

  return (
    <div className="relative overflow-hidden rounded-[28px] border border-white/10 bg-white/[0.02] p-8 sm:p-14">
      <div
        className="pointer-events-none absolute inset-0"
        style={{
          background:
            "radial-gradient(circle at 20% 20%, rgba(168,85,247,0.22), transparent 50%), radial-gradient(circle at 80% 80%, rgba(56,189,248,0.2), transparent 50%)",
        }}
      />
      <div className="relative grid grid-cols-[repeat(auto-fit,minmax(min(100%,340px),1fr))] items-center gap-8">
        <div>
          <PageEyebrow align="start" className="mb-[18px]">
            Dispatch
          </PageEyebrow>
          <h2
            className="font-semibold tracking-[-0.035em] text-white"
            style={{ fontSize: "clamp(28px, 3vw, 38px)", textWrap: "balance" }}
          >
            The dispatch list is coming soon.
          </h2>
          <p className="mt-3 text-base leading-[1.65] text-gray-400" style={{ textWrap: "pretty" }}>
            Short, practical writing on software craft. For now, the latest essays live right here.
          </p>
        </div>
        <form onSubmit={(e) => e.preventDefault()} className="flex flex-wrap gap-3">
          <label htmlFor="newsletter-email" className="sr-only">
            Email address
          </label>
          <input
            id="newsletter-email"
            type="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            placeholder="you@company.com"
            className="min-w-[200px] flex-1 rounded-xl border-0 bg-white/5 px-4 py-[13px] text-sm text-white shadow-[inset_0_0_0_1px_rgba(255,255,255,0.15)] outline-none transition-shadow duration-200 placeholder:text-white/40 focus:shadow-[inset_0_0_0_1.5px_rgba(192,132,252,0.8),0_0_0_4px_rgba(168,85,247,0.15)]"
          />
          <button
            type="submit"
            disabled
            className="whitespace-nowrap rounded-xl bg-white/10 px-6 py-[13px] text-sm font-semibold text-white/70 shadow-[inset_0_0_0_1px_rgba(255,255,255,0.15)]"
          >
            Coming soon
          </button>
        </form>
      </div>
    </div>
  )
}
