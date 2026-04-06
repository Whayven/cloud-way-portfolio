import {
  ComputerDesktopIcon,
  MagnifyingGlassIcon,
  PencilSquareIcon,
} from "@heroicons/react/24/outline"
import Link from "next/link"
import { GradientText } from "@/components/site/gradient-text"

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

const work = [
  {
    href: "https://wayytech.com",
    title: "Waytech",
    description: "Take your business to the next level with Waytech.",
    tags: ["NextJS", "Tailwind", "Netlify"],
  },
  {
    href: "https://ascendhiring.com",
    title: "Ascend Hiring",
    description:
      "Hire the best talent with the next generation of ATS technology.",
    tags: [
      "NextJS",
      "Tailwind",
      "Prisma",
      "PostgreSQL",
      "Python",
      "Microservices",
      "TypeScript",
      "AI/LLM",
    ],
  },
] as const

export function AboutSection() {
  return (
    <section className="py-20">
      <div className="container mx-auto max-w-6xl px-4">
        <div className="flex flex-col items-center gap-8">
          <h2 className="text-center text-4xl font-semibold text-gray-900 dark:text-gray-100">
            <GradientText>About Us</GradientText>
          </h2>
          <p className="max-w-3xl text-center text-lg text-gray-700 dark:text-gray-300">
            We are a team of developers who are passionate about creating
            beautiful, modern, and accessible websites and web applications.
          </p>
        </div>
        <div className="mt-16 flex flex-col gap-8">
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
            <div key={block.title} className="flex gap-4">
              <div>
                <h3 className="text-lg font-semibold text-gray-900 dark:text-gray-100">
                  <GradientText>{block.title}</GradientText>
                </h3>
                <p className="text-gray-700 dark:text-gray-300">{block.body}</p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}

export function ServicesSection() {
  return (
    <section className="py-20">
      <div className="container mx-auto max-w-6xl px-4">
        <div className="flex flex-col items-center gap-8">
          <h2 className="text-center text-4xl font-semibold text-gray-900 dark:text-gray-100">
            <GradientText>Our Services</GradientText>
          </h2>
          <p className="max-w-3xl text-center text-lg text-gray-700 dark:text-gray-300">
            We offer a variety of services to help you build and grow your
            online presence.
          </p>
        </div>
        <div className="mt-16 grid grid-cols-1 gap-8 lg:grid-cols-3">
          {services.map(({ title, body, Icon }) => (
            <div key={title} className="flex gap-4">
              <div className="flex flex-col gap-2">
                <div className="flex items-center gap-4">
                  <div className="rounded-full border-2 border-gray-300 p-2 dark:border-gray-600">
                    <Icon className="h-6 w-6 text-gray-800 dark:text-gray-200" />
                  </div>
                  <h3 className="text-xl font-semibold text-gray-900 dark:text-gray-100">
                    <GradientText>{title}</GradientText>
                  </h3>
                </div>
                <p className="text-gray-700 dark:text-gray-300">{body}</p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}

export function WorkSection() {
  return (
    <section className="py-20">
      <div className="container mx-auto max-w-6xl px-4">
        <div className="flex flex-col items-center gap-8">
          <h2 className="text-center text-4xl font-semibold text-gray-900 dark:text-gray-100">
            <GradientText>Our Work</GradientText>
          </h2>
          <p className="max-w-3xl text-center text-lg text-gray-700 dark:text-gray-300">
            We have worked on a variety of projects, from small websites to large
            web applications.
          </p>
        </div>
        <div className="mt-16 flex flex-col gap-8">
          {work.map((item) => (
            <Link
              key={item.href}
              href={item.href}
              target="_blank"
              rel="noopener noreferrer"
              className="flex flex-col items-center gap-4 rounded-lg p-4 transition duration-300 hover:bg-gray-950/5 dark:hover:bg-white/5 md:flex-row"
            >
              <div className="flex h-36 w-full shrink-0 items-center justify-center rounded-lg bg-gradient-to-br from-accent-sky/40 to-accent-purple/50 md:h-32 md:w-52">
                <span className="text-lg font-bold text-cw-dark/80 dark:text-white/90">
                  {item.title}
                </span>
              </div>
              <div className="min-w-0 flex-1">
                <h3 className="text-lg font-semibold text-gray-900 dark:text-gray-100">
                  <GradientText>{item.title}</GradientText>
                </h3>
                <p className="text-gray-700 dark:text-gray-300">
                  {item.description}
                </p>
                <div className="mt-2 flex flex-wrap gap-2">
                  {item.tags.map((tag) => (
                    <span
                      key={tag}
                      className="inline-block rounded-md bg-accent-purple px-2 py-1 text-sm font-semibold text-white"
                    >
                      {tag}
                    </span>
                  ))}
                </div>
              </div>
            </Link>
          ))}
        </div>
      </div>
    </section>
  )
}
