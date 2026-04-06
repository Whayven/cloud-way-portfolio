import {
  ComputerDesktopIcon,
  MagnifyingGlassIcon,
  PencilSquareIcon,
} from "@heroicons/react/24/outline"
import Link from "next/link"
import { GradientText } from "@/components/site/gradient-text"
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
          <GradientText>About Us</GradientText>
        </h2>
        <p className={`mx-auto mt-5 ${sectionLead}`}>
          We are a team of developers who are passionate about creating
          beautiful, modern, and accessible websites and web applications.
        </p>
      </div>
      <ul className="mx-auto mt-14 max-w-3xl space-y-10">
        {[
          {
            title: "Your Vision, Crafted with Passion.",
            body: "We pour heart and expertise into building beautiful, modern web experiences that resonate with your users.",
          },
          {
            title: "Innovation First.",
            body: "We harness cutting-edge tools and techniques to ensure your web presence stays ahead of the curve.",
          },
          {
            title: "Effortless Experiences for All.",
            body: "Intuitive interfaces and seamless navigation make your website a joy to use, regardless of a visitor's abilities.",
          },
        ].map((block) => (
          <li
            key={block.title}
            className="border-l-2 border-accent-sky-light/40 pl-6"
          >
            <h3 className="text-lg font-semibold text-white">
              <GradientText>{block.title}</GradientText>
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
          <GradientText>Our Services</GradientText>
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
              <Icon className="h-5 w-5 text-accent-sky-light" />
            </div>
            <h3 className="text-lg font-semibold text-white">
              <GradientText>{title}</GradientText>
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
          <GradientText>Our Work</GradientText>
        </h2>
        <p className={`mx-auto mt-5 ${sectionLead}`}>
          We have worked on a variety of projects, from small websites to large
          web applications.
        </p>
      </div>
      <div className="mx-auto mt-14 flex max-w-6xl flex-col gap-6">
        {items.map((item) => (
          <Link
            key={item.id}
            href={`/work/${item.slug}`}
            className="group flex flex-col overflow-hidden rounded-2xl border border-white/10 bg-white/5 backdrop-blur-xl transition duration-300 hover:border-accent-sky-light/30 hover:bg-white/10 md:flex-row"
          >
            <div className="flex min-h-40 shrink-0 items-center justify-center bg-white/5 px-8 md:w-56">
              <span className="text-center text-lg font-bold tracking-tight text-white/95">
                {item.title}
              </span>
            </div>
            <div className="flex min-w-0 flex-1 flex-col justify-center p-6 md:p-8">
              <h3 className="text-lg font-semibold text-white">
                <GradientText>{item.title}</GradientText>
              </h3>
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
            </div>
          </Link>
        ))}
      </div>
    </section>
  )
}
