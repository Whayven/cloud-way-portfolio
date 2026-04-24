"use client"

import { useActionState, useEffect, useRef } from "react"
import { FadeIn } from "@/components/site/animated-section"
import { PageEyebrow } from "@/components/site/page-eyebrow"
import { submitContactForm, type ContactFormState } from "@/app/actions/contact"

const initial: ContactFormState = { success: false }

const labelCls =
  "block text-[10px] font-semibold uppercase tracking-[0.25em] text-gray-400"
const inputCls =
  "mt-2 block w-full rounded-xl border-0 bg-white/5 px-3.5 py-2.5 text-sm text-white shadow-sm ring-1 ring-white/15 transition placeholder:text-gray-500 focus:ring-2 focus:ring-purple-500/60"

const details = [
  {
    label: "Email",
    value: "hello@cloud-way.dev",
    href: "mailto:hello@cloud-way.dev",
  },
  {
    label: "Response",
    value: "Within one business day",
  },
  {
    label: "Based",
    value: "Remote-first · PST / EST hours",
  },
] as const

export function ContactSection() {
  const [state, action, pending] = useActionState(submitContactForm, initial)
  const formRef = useRef<HTMLFormElement>(null)

  useEffect(() => {
    if (state.success) formRef.current?.reset()
  }, [state.success])

  return (
    <section id="contact" className="relative border-t border-white/10 py-24 sm:py-32">
      <div className="mx-auto max-w-6xl px-2">
        <div className="grid grid-cols-1 gap-12 lg:grid-cols-[1.1fr_1fr]">
          <FadeIn>
            <div>
              <PageEyebrow>Start a project</PageEyebrow>
              <h2
                className="text-4xl font-semibold leading-[1.05] tracking-tight text-white sm:text-5xl"
                style={{ textWrap: "balance" }}
              >
                Tell us what you&apos;re
                <br />
                building.
              </h2>
              <p className="mt-5 max-w-lg text-base leading-relaxed text-gray-400 sm:text-lg">
                We read every message. Typical response within one business day.
              </p>

              <dl className="mt-10 space-y-5">
                {details.map((row) => (
                  <div
                    key={row.label}
                    className="flex items-start gap-4 border-b border-white/5 pb-5"
                  >
                    <dt className="w-24 shrink-0 text-[10px] font-medium uppercase tracking-[0.3em] text-white/40">
                      {row.label}
                    </dt>
                    <dd className="text-base text-white">
                      {"href" in row && row.href ? (
                        <a className="hover:text-purple-300" href={row.href}>
                          {row.value}
                        </a>
                      ) : (
                        row.value
                      )}
                    </dd>
                  </div>
                ))}
              </dl>
            </div>
          </FadeIn>

          <FadeIn index={1}>
            <form
              ref={formRef}
              action={action}
              className="relative overflow-hidden rounded-3xl border border-white/10 bg-white/[0.03] p-8 backdrop-blur-xl sm:p-10"
            >
              <div
                className="pointer-events-none absolute -right-20 -top-20 h-60 w-60 rounded-full opacity-60 blur-3xl"
                style={{ background: "radial-gradient(circle, rgba(168,85,247,0.4), transparent 70%)" }}
              />
              {state.success ? (
                <div className="relative py-12 text-center">
                  <div className="mx-auto flex h-14 w-14 items-center justify-center rounded-full border border-emerald-400/40 bg-emerald-500/10">
                    <svg
                      className="h-6 w-6 text-emerald-400"
                      viewBox="0 0 24 24"
                      fill="none"
                      stroke="currentColor"
                      strokeWidth="2.5"
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        d="M4.5 12.75l6 6 9-13.5"
                      />
                    </svg>
                  </div>
                  <p className="mt-5 text-lg font-semibold text-white">Message sent</p>
                  <p className="mt-2 text-sm text-gray-400">
                    Thanks for reaching out. We&apos;ll be in touch shortly.
                  </p>
                </div>
              ) : (
                <div className="relative grid grid-cols-1 gap-5 sm:grid-cols-2">
                  {state.error && (
                    <p className="rounded-lg bg-red-500/10 px-4 py-2.5 text-sm text-red-400 ring-1 ring-red-500/20 sm:col-span-2">
                      {state.error}
                    </p>
                  )}
                  <div>
                    <label htmlFor="first-name" className={labelCls}>
                      First name
                    </label>
                    <input
                      id="first-name"
                      name="first-name"
                      type="text"
                      required
                      autoComplete="given-name"
                      className={inputCls}
                    />
                  </div>
                  <div>
                    <label htmlFor="last-name" className={labelCls}>
                      Last name
                    </label>
                    <input
                      id="last-name"
                      name="last-name"
                      type="text"
                      required
                      autoComplete="family-name"
                      className={inputCls}
                    />
                  </div>
                  <div className="sm:col-span-2">
                    <label htmlFor="email" className={labelCls}>
                      Work email
                    </label>
                    <input
                      id="email"
                      name="email"
                      type="email"
                      required
                      autoComplete="email"
                      className={inputCls}
                    />
                  </div>
                  <div className="sm:col-span-2">
                    <label htmlFor="company" className={labelCls}>
                      Company
                    </label>
                    <input
                      id="company"
                      name="company"
                      type="text"
                      autoComplete="organization"
                      className={inputCls}
                    />
                  </div>
                  <div className="sm:col-span-2">
                    <label htmlFor="message" className={labelCls}>
                      What are you looking to build?
                    </label>
                    <textarea
                      id="message"
                      name="message"
                      required
                      rows={4}
                      placeholder="A few sentences is plenty."
                      className={inputCls}
                    />
                  </div>
                  <div className="mt-2 sm:col-span-2">
                    <button
                      type="submit"
                      disabled={pending}
                      className="relative w-full overflow-hidden rounded-xl bg-linear-to-r from-purple-600 to-fuchsia-500 px-4 py-3 text-sm font-semibold text-white shadow-md transition hover:brightness-110 disabled:opacity-60"
                    >
                      <span className="relative z-10">
                        {pending ? "Sending…" : "Let's talk →"}
                      </span>
                    </button>
                  </div>
                </div>
              )}
            </form>
          </FadeIn>
        </div>
      </div>
    </section>
  )
}
