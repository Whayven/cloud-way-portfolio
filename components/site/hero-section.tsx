import Image from "next/image"
import Link from "next/link"
import { GradientText } from "@/components/site/gradient-text"

import heroStill from "@/app/_assets/Wayne_vast_cosmic_scene_deep_space_filled_with_vibrant_nebula_b67866de-9c2e-426e-b3db-eb0ecc682486_2.png"

export function HeroSection() {
  return (
    <section className="relative flex min-h-[min(90vh,920px)] items-center justify-center overflow-hidden">
      <video
        className="absolute inset-0 h-full w-full object-cover opacity-45 dark:opacity-35"
        autoPlay
        muted
        loop
        playsInline
        aria-hidden
      >
        <source src="/assets/hero-nebula.mp4" type="video/mp4" />
      </video>
      <div
        className="absolute inset-0 bg-gradient-to-b from-cw-light/90 via-cw-light/40 to-cw-light dark:from-cw-dark/95 dark:via-cw-dark/50 dark:to-cw-dark"
        aria-hidden
      />
      <div className="relative z-10 mx-auto max-w-4xl px-4 py-16 text-center">
        <h1 className="mb-4 text-4xl font-bold leading-tight tracking-tight sm:text-5xl">
          We are <GradientText>CloudWay</GradientText>
        </h1>
        <p className="mx-auto mb-10 max-w-2xl text-xl text-gray-700 dark:text-gray-300 sm:text-2xl">
          Elevate your business with our cutting-edge software solutions.
        </p>
        <div className="mx-auto mb-10 flex justify-center">
          <Image
            src={heroStill}
            alt=""
            width={320}
            height={320}
            className="h-44 w-44 rounded-full object-cover shadow-lg ring-2 ring-white/20 dark:ring-white/10 sm:h-52 sm:w-52"
            priority
          />
        </div>
        <ul className="mx-auto grid max-w-3xl grid-cols-1 gap-6 p-0 sm:grid-cols-2">
          <li>
            <Link
              href="/work"
              className="block rounded-lg bg-cw-card p-6 opacity-90 shadow-sm transition-all duration-500 hover:opacity-100 dark:bg-cw-card-dark dark:text-white"
            >
              <h2 className="mb-2 text-xl font-semibold">
                Work <span aria-hidden>&rarr;</span>
              </h2>
              <p className="text-left text-base text-gray-700 dark:text-gray-300">
                Check out our latest projects and apps.
              </p>
            </Link>
          </li>
          <li>
            <a
              href="https://blog.cloud-way.dev"
              target="_blank"
              rel="noopener noreferrer"
              className="block rounded-lg bg-cw-card p-6 opacity-90 shadow-sm transition-all duration-500 hover:opacity-100 dark:bg-cw-card-dark dark:text-white"
            >
              <h2 className="mb-2 text-xl font-semibold">
                Blog <span aria-hidden>&rarr;</span>
              </h2>
              <p className="text-left text-base text-gray-700 dark:text-gray-300">
                Read more about our thoughts on tech.
              </p>
            </a>
          </li>
        </ul>
      </div>
    </section>
  )
}
