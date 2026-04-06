"use client"

import Image from "next/image"
import Link from "next/link"
import { motion } from "motion/react"

interface WorkItem {
  slug: string
  title: string
  summary: string
  imageUrl: string | null
  techStack: string[]
}

const cardVariants = {
  hidden: { opacity: 0, y: 24 },
  visible: (i: number) => ({
    opacity: 1,
    y: 0,
    transition: {
      delay: i * 0.1,
      duration: 0.5,
      ease: [0.25, 0.1, 0.25, 1] as [number, number, number, number],
    },
  }),
}

export function WorkGrid({ items }: { items: WorkItem[] }) {
  return (
    <div className="mx-auto mt-14 grid max-w-6xl gap-6 md:grid-cols-2">
      {items.map((item, i) => (
        <motion.div
          key={item.slug}
          custom={i}
          variants={cardVariants}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: "-50px" }}
        >
          <Link
            href={`/work/${item.slug}`}
            className="group flex h-full flex-col overflow-hidden rounded-2xl border border-white/10 bg-white/[0.03] transition-all duration-300 hover:border-purple-400/20 hover:bg-white/[0.06]"
          >
            {item.imageUrl && (
              <div className="relative aspect-[2/1] overflow-hidden">
                <Image
                  src={item.imageUrl}
                  alt={item.title}
                  fill
                  className="object-cover transition-transform duration-500 group-hover:scale-105"
                  sizes="(max-width: 768px) 100vw, 50vw"
                />
              </div>
            )}
            <div className="flex flex-1 flex-col p-6">
              <h3 className="text-lg font-semibold text-white transition-colors group-hover:text-purple-300">
                {item.title}
              </h3>
              <p className="mt-2 flex-1 text-sm text-gray-400">
                {item.summary}
              </p>
              {item.techStack.length > 0 && (
                <div className="mt-4 flex flex-wrap gap-2">
                  {item.techStack.map((tag) => (
                    <span
                      key={tag}
                      className="rounded-md bg-purple-600/80 px-2.5 py-1 text-xs font-semibold text-white"
                    >
                      {tag}
                    </span>
                  ))}
                </div>
              )}
            </div>
          </Link>
        </motion.div>
      ))}
    </div>
  )
}
