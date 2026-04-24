"use client"

import Image from "next/image"
import Link from "next/link"
import { motion } from "motion/react"

export type WorkGridItem = {
  slug: string
  title: string
  summary: string
  imageUrl: string | null
  techStack: string[]
  featured?: boolean
}

const GRADIENTS = [
  "radial-gradient(circle at 20% 20%, rgba(168,85,247,0.55), transparent 55%), radial-gradient(circle at 80% 70%, rgba(56,189,248,0.45), transparent 55%)",
  "radial-gradient(circle at 70% 30%, rgba(236,72,153,0.5), transparent 55%), radial-gradient(circle at 20% 80%, rgba(99,102,241,0.5), transparent 55%)",
  "radial-gradient(circle at 50% 20%, rgba(52,211,153,0.5), transparent 55%), radial-gradient(circle at 50% 90%, rgba(168,85,247,0.45), transparent 55%)",
  "radial-gradient(circle at 30% 70%, rgba(251,191,36,0.45), transparent 55%), radial-gradient(circle at 80% 20%, rgba(236,72,153,0.4), transparent 55%)",
  "radial-gradient(circle at 60% 40%, rgba(56,189,248,0.55), transparent 55%), radial-gradient(circle at 20% 70%, rgba(52,211,153,0.5), transparent 55%)",
]

function gradientFor(slug: string) {
  let h = 0
  for (let i = 0; i < slug.length; i++) h = (h * 31 + slug.charCodeAt(i)) | 0
  return GRADIENTS[Math.abs(h) % GRADIENTS.length]
}

const cardVariants = {
  hidden: { opacity: 0, y: 24 },
  visible: (i: number) => ({
    opacity: 1,
    y: 0,
    transition: {
      delay: i * 0.08,
      duration: 0.6,
      ease: [0.2, 0.8, 0.2, 1] as [number, number, number, number],
    },
  }),
}

const BAR_HEIGHTS = [40, 70, 55, 85, 60, 90, 75, 95, 80]

function ProductMock({
  gradient,
  metric,
  imageUrl,
  title,
}: {
  gradient: string
  metric: string
  imageUrl: string | null
  title: string
}) {
  return (
    <div className="relative h-full w-full overflow-hidden">
      {imageUrl ? (
        <Image
          src={imageUrl}
          alt={title}
          fill
          sizes="(max-width: 768px) 100vw, 50vw"
          className="object-cover transition-transform duration-[1200ms] ease-out group-hover:scale-110"
        />
      ) : (
        <div
          className="absolute inset-0 transition-transform duration-[1200ms] ease-out group-hover:scale-110"
          style={{ background: gradient }}
        />
      )}
      <div
        className="pointer-events-none absolute inset-0 opacity-40"
        style={{
          backgroundImage:
            "linear-gradient(rgba(255,255,255,0.06) 1px, transparent 1px), linear-gradient(90deg, rgba(255,255,255,0.06) 1px, transparent 1px)",
          backgroundSize: "36px 36px",
        }}
      />
      <div className="absolute left-6 top-6 rounded-xl border border-white/20 bg-cw-dark/60 px-3 py-2 backdrop-blur-md">
        <div className="flex items-center gap-2">
          <span className="h-2 w-2 rounded-full bg-emerald-400" />
          <span className="whitespace-nowrap text-[10px] font-medium uppercase tracking-widest text-white/70">
            Live
          </span>
        </div>
      </div>
      {metric && (
        <div className="absolute right-6 top-6 whitespace-nowrap rounded-xl border border-white/20 bg-cw-dark/60 px-3 py-2 font-mono text-[10px] text-white/80 backdrop-blur-md">
          {metric}
        </div>
      )}
      <div className="absolute inset-x-6 bottom-6 flex h-16 items-end gap-2">
        {BAR_HEIGHTS.map((h, j) => (
          <span
            key={j}
            className="flex-1 rounded-t bg-white/80 transition-all duration-500 group-hover:bg-white"
            style={{ height: `${h}%`, opacity: 0.25 + (j / 9) * 0.6 }}
          />
        ))}
      </div>
      <div className="absolute inset-0 bg-linear-to-t from-cw-dark/60 via-transparent to-transparent" />
    </div>
  )
}

export function WorkGrid({ items }: { items: WorkGridItem[] }) {
  if (items.length === 0) {
    return (
      <div className="mx-auto mt-14 max-w-3xl rounded-3xl border border-white/10 bg-white/[0.02] p-16 text-center">
        <p className="text-gray-400">No projects published yet.</p>
      </div>
    )
  }

  return (
    <div className="mt-14 grid grid-cols-1 gap-5 md:grid-cols-2">
      {items.map((item, i) => {
        const gradient = gradientFor(item.slug)
        const metric = item.techStack[0] ?? "Case study"
        const isFeatured = item.featured === true
        return (
          <motion.div
            key={item.slug}
            custom={i}
            variants={cardVariants}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, margin: "-50px" }}
            className={isFeatured ? "md:col-span-2" : undefined}
          >
            <Link
              href={`/work/${item.slug}`}
              className="group relative block h-full overflow-hidden rounded-3xl border border-white/10 bg-white/[0.03] transition-all duration-500 hover:border-white/25"
            >
              <div className={isFeatured ? "aspect-[21/10]" : "aspect-[16/10]"}>
                <ProductMock
                  gradient={gradient}
                  metric={metric}
                  imageUrl={item.imageUrl}
                  title={item.title}
                />
              </div>
              <div className="relative p-6 sm:p-7">
                <div className="flex items-start justify-between gap-4">
                  <div className="min-w-0">
                    <p className="text-[10px] font-medium uppercase tracking-[0.3em] text-white/40">
                      Case study
                    </p>
                    <h3
                      className={`mt-1.5 font-semibold tracking-tight text-white ${
                        isFeatured ? "text-3xl" : "text-2xl"
                      }`}
                    >
                      {item.title}
                    </h3>
                  </div>
                  <span className="mt-1 flex h-10 w-10 shrink-0 items-center justify-center rounded-full border border-white/10 bg-white/[0.04] text-white/70 transition-all duration-300 group-hover:border-purple-400/50 group-hover:bg-purple-500/20 group-hover:text-white">
                    <svg
                      className="h-4 w-4 transition-transform duration-300 group-hover:-translate-y-0.5 group-hover:translate-x-0.5"
                      viewBox="0 0 24 24"
                      fill="none"
                      stroke="currentColor"
                      strokeWidth="2"
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        d="M7 17L17 7M7 7h10v10"
                      />
                    </svg>
                  </span>
                </div>
                <p className="mt-3 max-w-xl text-sm leading-relaxed text-gray-400">
                  {item.summary}
                </p>
                {item.techStack.length > 0 && (
                  <ul className="mt-5 flex flex-wrap gap-1.5">
                    {item.techStack.map((t) => (
                      <li
                        key={t}
                        className="whitespace-nowrap rounded-full border border-white/10 bg-white/[0.04] px-2.5 py-1 text-[10px] font-medium tracking-wide text-gray-300"
                      >
                        {t}
                      </li>
                    ))}
                  </ul>
                )}
              </div>
            </Link>
          </motion.div>
        )
      })}
    </div>
  )
}
