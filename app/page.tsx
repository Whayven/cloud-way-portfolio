import {
  AboutSection,
  ServicesSection,
  WorkSection,
} from "@/components/site/content-sections"
import { ContactSection } from "@/components/site/contact-section"
import { HeroSection } from "@/components/site/hero-section"
import { SiteFooter } from "@/components/site/site-footer"
import { SiteHeader } from "@/components/site/site-header"

export default function Home() {
  return (
    <>
      <SiteHeader />
      <HeroSection />
      <main className="relative z-0 mx-auto w-full max-w-6xl px-6 pb-24 pt-16 text-base leading-relaxed text-cw-dark sm:px-8 lg:px-10 dark:text-white">
        <AboutSection />
        <ServicesSection />
        <WorkSection />
        <ContactSection />
      </main>
      <SiteFooter />
    </>
  )
}
