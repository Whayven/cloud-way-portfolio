"use client"

export function ContactSection() {
  return (
    <section className="border-t border-gray-200/80 py-20 dark:border-white/10 sm:py-24">
      <div className="mx-auto max-w-xl rounded-2xl border border-gray-200/90 bg-cw-card/70 p-8 shadow-sm backdrop-blur-sm dark:border-white/10 dark:bg-cw-card-dark/45 sm:p-10">
        <div className="text-center">
          <h2 className="text-3xl font-semibold tracking-tight text-cw-dark sm:text-4xl dark:text-white">
            <span className="bg-linear-to-r from-accent-sky to-accent-purple bg-clip-text text-transparent dark:bg-linear-to-l dark:from-accent-sky dark:to-white">
              Contact Us
            </span>
          </h2>
          <p className="mt-3 text-sm leading-relaxed text-gray-600 dark:text-gray-400">
            We&apos;d love to hear from you. Send a message and we&apos;ll get
            back to you as soon as possible.
          </p>
        </div>
        <form
          className="mt-10"
          onSubmit={(e) => {
            e.preventDefault()
          }}
        >
          <div className="grid grid-cols-1 gap-x-6 gap-y-5 sm:grid-cols-2">
            <div>
              <label
                htmlFor="first-name"
                className="block text-xs font-semibold uppercase tracking-wide text-gray-500 dark:text-gray-400"
              >
                First name
              </label>
              <div className="mt-2">
                <input
                  type="text"
                  name="first-name"
                  id="first-name"
                  autoComplete="given-name"
                  className="block w-full rounded-xl border-0 bg-white/80 px-3.5 py-2.5 text-cw-dark shadow-sm ring-1 ring-gray-200 transition placeholder:text-gray-400 focus:ring-2 focus:ring-blue-400/80 dark:bg-cw-dark/50 dark:text-white dark:ring-white/15 dark:focus:ring-blue-400/60 sm:text-sm"
                />
              </div>
            </div>
            <div>
              <label
                htmlFor="last-name"
                className="block text-xs font-semibold uppercase tracking-wide text-gray-500 dark:text-gray-400"
              >
                Last name
              </label>
              <div className="mt-2">
                <input
                  type="text"
                  name="last-name"
                  id="last-name"
                  autoComplete="family-name"
                  className="block w-full rounded-xl border-0 bg-white/80 px-3.5 py-2.5 text-cw-dark shadow-sm ring-1 ring-gray-200 transition placeholder:text-gray-400 focus:ring-2 focus:ring-blue-400/80 dark:bg-cw-dark/50 dark:text-white dark:ring-white/15 dark:focus:ring-blue-400/60 sm:text-sm"
                />
              </div>
            </div>
            <div className="sm:col-span-2">
              <label
                htmlFor="company"
                className="block text-xs font-semibold uppercase tracking-wide text-gray-500 dark:text-gray-400"
              >
                Company
              </label>
              <div className="mt-2">
                <input
                  type="text"
                  name="company"
                  id="company"
                  autoComplete="organization"
                  className="block w-full rounded-xl border-0 bg-white/80 px-3.5 py-2.5 text-cw-dark shadow-sm ring-1 ring-gray-200 transition placeholder:text-gray-400 focus:ring-2 focus:ring-blue-400/80 dark:bg-cw-dark/50 dark:text-white dark:ring-white/15 dark:focus:ring-blue-400/60 sm:text-sm"
                />
              </div>
            </div>
            <div className="sm:col-span-2">
              <label
                htmlFor="email"
                className="block text-xs font-semibold uppercase tracking-wide text-gray-500 dark:text-gray-400"
              >
                Email
              </label>
              <div className="mt-2">
                <input
                  type="email"
                  name="email"
                  id="email"
                  autoComplete="email"
                  className="block w-full rounded-xl border-0 bg-white/80 px-3.5 py-2.5 text-cw-dark shadow-sm ring-1 ring-gray-200 transition placeholder:text-gray-400 focus:ring-2 focus:ring-blue-400/80 dark:bg-cw-dark/50 dark:text-white dark:ring-white/15 dark:focus:ring-blue-400/60 sm:text-sm"
                />
              </div>
            </div>
            <div className="sm:col-span-2">
              <label
                htmlFor="phone-number"
                className="block text-xs font-semibold uppercase tracking-wide text-gray-500 dark:text-gray-400"
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
                    className="h-full rounded-lg border-0 bg-transparent py-0 text-sm text-gray-500 focus:ring-0 dark:text-gray-400"
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
                  className="block w-full rounded-xl border-0 bg-white/80 py-2.5 pl-24 pr-3.5 text-cw-dark shadow-sm ring-1 ring-gray-200 transition focus:ring-2 focus:ring-blue-400/80 dark:bg-cw-dark/50 dark:text-white dark:ring-white/15 dark:focus:ring-blue-400/60 sm:text-sm"
                />
              </div>
            </div>
            <div className="sm:col-span-2">
              <label
                htmlFor="message"
                className="block text-xs font-semibold uppercase tracking-wide text-gray-500 dark:text-gray-400"
              >
                Message
              </label>
              <div className="mt-2">
                <textarea
                  name="message"
                  id="message"
                  rows={4}
                  className="block w-full rounded-xl border-0 bg-white/80 px-3.5 py-2.5 text-cw-dark shadow-sm ring-1 ring-gray-200 transition placeholder:text-gray-400 focus:ring-2 focus:ring-blue-400/80 dark:bg-cw-dark/50 dark:text-white dark:ring-white/15 dark:focus:ring-blue-400/60 sm:text-sm"
                />
              </div>
            </div>
          </div>
          <div className="mt-10">
            <button
              type="submit"
              className="w-full rounded-xl bg-linear-to-r from-accent-purple to-accent-purple/90 px-4 py-3 text-sm font-semibold text-white shadow-md transition hover:brightness-110 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-blue-400"
            >
              Let&apos;s talk
            </button>
          </div>
        </form>
      </div>
    </section>
  )
}
