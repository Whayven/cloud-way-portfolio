"use client"

import { useActionState, useRef } from "react"
import {
  Disclosure,
  DisclosureButton,
  DisclosurePanel,
} from "@headlessui/react"
import { ChevronDownIcon } from "@heroicons/react/24/outline"
import {
  submitContactForm,
  type ContactFormState,
} from "@/app/actions/contact"

const initial: ContactFormState = { success: false }

export function ContactSection() {
  const [state, action, pending] = useActionState(submitContactForm, initial)
  const formRef = useRef<HTMLFormElement>(null)

  if (state.success) {
    formRef.current?.reset()
  }

  return (
    <section className="border-t border-white/10 py-20 sm:py-24">
      <div className="mx-auto max-w-xl rounded-2xl border border-white/10 bg-white/5 backdrop-blur-xl">
        <Disclosure>
          {({ open }) => (
            <>
              <DisclosureButton className="flex w-full items-center justify-between px-8 py-8 sm:px-10 sm:py-10">
                <div className="text-left">
                  <h2 className="text-3xl font-semibold tracking-tight sm:text-4xl">
                    <span className="bg-linear-to-r from-sky-400 via-purple-500 to-fuchsia-500 bg-clip-text text-transparent">
                      Contact Us
                    </span>
                  </h2>
                  <p className="mt-3 text-sm leading-relaxed text-gray-400">
                    We&apos;d love to hear from you. Send a message and
                    we&apos;ll get back to you as soon as possible.
                  </p>
                </div>
                <ChevronDownIcon
                  className={`h-6 w-6 shrink-0 text-gray-400 transition-transform duration-300 ${open ? "rotate-180" : ""}`}
                />
              </DisclosureButton>

              <DisclosurePanel
                transition
                className="origin-top transition duration-300 ease-out data-[closed]:-translate-y-2 data-[closed]:opacity-0"
              >
                {state.success ? (
                  <div className="border-t border-white/10 px-8 py-12 text-center sm:px-10">
                    <p className="text-lg font-semibold text-white">
                      Message sent!
                    </p>
                    <p className="mt-2 text-sm text-gray-400">
                      Thanks for reaching out. We&apos;ll get back to you soon.
                    </p>
                  </div>
                ) : (
                  <form
                    ref={formRef}
                    action={action}
                    className="border-t border-white/10 px-8 pb-8 pt-8 sm:px-10 sm:pb-10"
                  >
                    {state.error && (
                      <p className="mb-5 rounded-lg bg-red-500/10 px-4 py-2.5 text-sm text-red-400 ring-1 ring-red-500/20">
                        {state.error}
                      </p>
                    )}
                    <div className="grid grid-cols-1 gap-x-6 gap-y-5 sm:grid-cols-2">
                      <div>
                        <label
                          htmlFor="first-name"
                          className="block text-xs font-semibold uppercase tracking-wide text-gray-400"
                        >
                          First name
                        </label>
                        <div className="mt-2">
                          <input
                            type="text"
                            name="first-name"
                            id="first-name"
                            required
                            autoComplete="given-name"
                            className="block w-full rounded-xl border-0 bg-white/5 px-3.5 py-2.5 text-white shadow-sm ring-1 ring-white/15 transition placeholder:text-gray-500 focus:ring-2 focus:ring-purple-500/60 sm:text-sm"
                          />
                        </div>
                      </div>
                      <div>
                        <label
                          htmlFor="last-name"
                          className="block text-xs font-semibold uppercase tracking-wide text-gray-400"
                        >
                          Last name
                        </label>
                        <div className="mt-2">
                          <input
                            type="text"
                            name="last-name"
                            id="last-name"
                            required
                            autoComplete="family-name"
                            className="block w-full rounded-xl border-0 bg-white/5 px-3.5 py-2.5 text-white shadow-sm ring-1 ring-white/15 transition placeholder:text-gray-500 focus:ring-2 focus:ring-purple-500/60 sm:text-sm"
                          />
                        </div>
                      </div>
                      <div className="sm:col-span-2">
                        <label
                          htmlFor="company"
                          className="block text-xs font-semibold uppercase tracking-wide text-gray-400"
                        >
                          Company
                        </label>
                        <div className="mt-2">
                          <input
                            type="text"
                            name="company"
                            id="company"
                            autoComplete="organization"
                            className="block w-full rounded-xl border-0 bg-white/5 px-3.5 py-2.5 text-white shadow-sm ring-1 ring-white/15 transition placeholder:text-gray-500 focus:ring-2 focus:ring-purple-500/60 sm:text-sm"
                          />
                        </div>
                      </div>
                      <div className="sm:col-span-2">
                        <label
                          htmlFor="email"
                          className="block text-xs font-semibold uppercase tracking-wide text-gray-400"
                        >
                          Email
                        </label>
                        <div className="mt-2">
                          <input
                            type="email"
                            name="email"
                            id="email"
                            required
                            autoComplete="email"
                            className="block w-full rounded-xl border-0 bg-white/5 px-3.5 py-2.5 text-white shadow-sm ring-1 ring-white/15 transition placeholder:text-gray-500 focus:ring-2 focus:ring-purple-500/60 sm:text-sm"
                          />
                        </div>
                      </div>
                      <div className="sm:col-span-2">
                        <label
                          htmlFor="phone-number"
                          className="block text-xs font-semibold uppercase tracking-wide text-gray-400"
                        >
                          Phone number
                        </label>
                        <div className="relative mt-2">
                          <div className="absolute inset-y-0 left-0 flex items-center pl-3">
                            <label htmlFor="country" className="sr-only">
                              Country
                            </label>
                            <select
                              id="country"
                              name="country"
                              className="h-full rounded-lg border-0 bg-transparent py-0 text-sm text-gray-400 focus:ring-0"
                              defaultValue="US"
                            >
                              <option>US</option>
                              <option>CA</option>
                              <option>EU</option>
                            </select>
                          </div>
                          <input
                            type="tel"
                            name="phone-number"
                            id="phone-number"
                            autoComplete="tel"
                            className="block w-full rounded-xl border-0 bg-white/5 py-2.5 pl-24 pr-3.5 text-white shadow-sm ring-1 ring-white/15 transition focus:ring-2 focus:ring-purple-500/60 sm:text-sm"
                          />
                        </div>
                      </div>
                      <div className="sm:col-span-2">
                        <label
                          htmlFor="message"
                          className="block text-xs font-semibold uppercase tracking-wide text-gray-400"
                        >
                          Message
                        </label>
                        <div className="mt-2">
                          <textarea
                            name="message"
                            id="message"
                            required
                            rows={4}
                            className="block w-full rounded-xl border-0 bg-white/5 px-3.5 py-2.5 text-white shadow-sm ring-1 ring-white/15 transition placeholder:text-gray-500 focus:ring-2 focus:ring-purple-500/60 sm:text-sm"
                          />
                        </div>
                      </div>
                    </div>
                    <div className="mt-10">
                      <button
                        type="submit"
                        disabled={pending}
                        className="w-full rounded-xl bg-linear-to-r from-purple-600 to-fuchsia-500 px-4 py-3 text-sm font-semibold text-white shadow-md transition hover:brightness-110 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-blue-400 disabled:opacity-50"
                      >
                        {pending ? "Sending\u2026" : "Let\u2019s talk"}
                      </button>
                    </div>
                  </form>
                )}
              </DisclosurePanel>
            </>
          )}
        </Disclosure>
      </div>
    </section>
  )
}
