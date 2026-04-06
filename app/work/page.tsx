import Image from "next/image"
import Link from "next/link"
import { prisma } from "@/lib/db"
import { GradientText } from "@/components/site/gradient-text"
import { SiteHeader } from "@/components/site/site-header"
import { SiteFooter } from "@/components/site/site-footer"
import { NebulaBackground } from "@/components/site/nebula-background"

export const metadata = {
  title: "Work",
  description: "Explore our portfolio of projects and case studies.",
}

export default async function WorkPage() {
  const items = await prisma.portfolioItem.findMany({
    where: { status: "published" },
    orderBy: { sortOrder: "asc" },
  })

  return (
    <div className="relative min-h-screen bg-cw-dark">
      <NebulaBackground />

      {/* Scrolling content */}
      <div className="relative z-10">
        <SiteHeader />

        <main className="mx-auto w-full max-w-6xl px-6 pb-24 pt-32 sm:px-8 lg:px-10">
          <div className="mb-16 text-center">
            <h1 className="text-4xl font-bold tracking-tight text-white sm:text-5xl">
              <GradientText>Our Work</GradientText>
            </h1>
            <p className="mx-auto mt-4 max-w-2xl text-lg text-gray-400">
              A selection of projects we&apos;ve built for clients and ourselves.
            </p>
          </div>

          {items.length === 0 ? (
            <p className="text-center text-gray-500">No projects yet.</p>
          ) : (
            <div className="flex flex-col gap-8">
              {items.map((item) => (
                <Link
                  key={item.id}
                  href={`/work/${item.slug}`}
                  className="group flex flex-col overflow-hidden rounded-2xl border border-white/10 bg-white/5 backdrop-blur-xl transition duration-300 hover:border-accent-sky-light/30 hover:bg-white/10 md:flex-row"
                >
                  <div className="relative flex min-h-44 shrink-0 items-center justify-center overflow-hidden bg-white/5 md:w-64">
                    {item.imageUrl ? (
                      <Image
                        src={item.imageUrl}
                        alt={item.title}
                        fill
                        className="object-cover transition-transform duration-500 group-hover:scale-105"
                        sizes="(max-width: 768px) 100vw, 256px"
                      />
                    ) : (
                      <span className="px-8 text-center text-xl font-bold tracking-tight text-white/95">
                        {item.title}
                      </span>
                    )}
                  </div>
                  <div className="flex min-w-0 flex-1 flex-col justify-center p-6 md:p-8">
                    <h2 className="text-xl font-semibold text-white">
                      <GradientText>{item.title}</GradientText>
                    </h2>
                    <p className="mt-2 text-sm text-gray-400">
                      {item.summary}
                    </p>
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
                    <span className="mt-4 inline-flex items-center gap-1 text-sm font-medium text-gray-400 transition-colors group-hover:text-white">
                      View details
                      <span className="inline-block transition-transform duration-300 group-hover:translate-x-1" aria-hidden>
                        &rarr;
                      </span>
                    </span>
                  </div>
                </Link>
              ))}
            </div>
          )}
        </main>

        <SiteFooter />
      </div>
    </div>
  )
}
