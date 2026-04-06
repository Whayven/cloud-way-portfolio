import {
  ComputerDesktopIcon,
  MagnifyingGlassIcon,
  PencilSquareIcon,
} from "@heroicons/react/24/outline"
import { GradientText } from "@/components/site/gradient-text"
import { WorkGrid } from "@/components/site/work-grid"
import { prisma } from "@/lib/db"

const services = [
  {
    title: "Design",
    body: "We design websites and web applications that are modern, accessible, and user-friendly.",
    Icon: PencilSquareIcon,
  },
  {
    title: "Development",
    body: "We develop websites and web applications using modern technologies and best practices.",
    Icon: ComputerDesktopIcon,
  },
  {
    title: "SEO",
    body: "We optimize websites and web applications for search engines to improve visibility and ranking.",
    Icon: MagnifyingGlassIcon,
  },
] as const

const sectionTitle =
  "text-center text-3xl font-semibold tracking-tight text-white sm:text-4xl"

const sectionLead =
  "max-w-2xl text-center text-base text-gray-400 sm:text-lg"

export function AboutSection() {
  return (
    <section className="border-t border-white/10 py-20 sm:py-24">
      <div className="mx-auto max-w-3xl text-center">
        <h2 className={sectionTitle}>
          <GradientText subtle>About Us</GradientText>
        </h2>
        <p className={`mx-auto mt-5 ${sectionLead}`}>
          We are a team of full-stack developers who build end-to-end
          applications — from polished frontends to robust backends — that
          help businesses grow and operate more efficiently.
        </p>
      </div>
      <ul className="mx-auto mt-14 max-w-3xl space-y-10">
        {[
          {
            title: "End-to-End, Built Right.",
            body: "From database design and APIs to responsive UIs, we own the entire stack so nothing falls through the cracks.",
          },
          {
            title: "Built to Scale Your Business.",
            body: "We architect applications that grow with you — performant, maintainable, and ready for what comes next.",
          },
          {
            title: "Effortless Experiences for All.",
            body: "Intuitive interfaces and seamless navigation make your application a joy to use, regardless of a visitor's abilities.",
          },
        ].map((block) => (
          <li
            key={block.title}
            className="border-l-2 border-accent-sky-light/40 pl-6"
          >
            <h3 className="text-lg font-semibold text-white">
              <GradientText subtle>{block.title}</GradientText>
            </h3>
            <p className="mt-2 text-gray-400">{block.body}</p>
          </li>
        ))}
      </ul>
    </section>
  )
}

export function ServicesSection() {
  return (
    <section className="border-t border-white/10 py-20 sm:py-24">
      <div className="mx-auto max-w-3xl text-center">
        <h2 className={sectionTitle}>
          <GradientText subtle>Our Services</GradientText>
        </h2>
        <p className={`mx-auto mt-5 ${sectionLead}`}>
          We offer a variety of services to help you build and grow your online
          presence.
        </p>
      </div>
      <div className="mx-auto mt-14 grid max-w-6xl grid-cols-1 gap-6 lg:grid-cols-3">
        {services.map(({ title, body, Icon }) => (
          <div
            key={title}
            className="rounded-2xl border border-white/10 bg-white/5 p-8 backdrop-blur-xl"
          >
            <div className="mb-5 flex h-11 w-11 items-center justify-center rounded-xl bg-white/10">
              <Icon className="h-5 w-5 text-purple-400" />
            </div>
            <h3 className="text-lg font-semibold text-white">
              <GradientText subtle>{title}</GradientText>
            </h3>
            <p className="mt-3 text-sm leading-relaxed text-gray-400">
              {body}
            </p>
          </div>
        ))}
      </div>
    </section>
  )
}

export async function WorkSection() {
  const items = await prisma.portfolioItem.findMany({
    where: { status: "published" },
    orderBy: { sortOrder: "asc" },
  })

  return (
    <section className="border-t border-white/10 py-20 sm:py-24">
      <div className="mx-auto max-w-3xl text-center">
        <h2 className={sectionTitle}>
          <GradientText subtle>Our Work</GradientText>
        </h2>
        <p className={`mx-auto mt-5 ${sectionLead}`}>
          We have worked on a variety of projects, from small websites to large
          web applications.
        </p>
      </div>
      <WorkGrid
        items={items.map((item) => ({
          slug: item.slug,
          title: item.title,
          summary: item.summary,
          imageUrl: item.imageUrl,
          techStack: item.techStack,
        }))}
      />
    </section>
  )
}
