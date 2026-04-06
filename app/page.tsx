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
      <div className="flex-1 py-8">
        <main className="mx-auto w-full max-w-[calc(100%-2rem)] text-lg leading-relaxed text-cw-dark dark:text-white sm:max-w-none sm:px-12 md:px-8 lg:w-3/5 lg:px-0">
          <HeroSection />
          <section className="mt-8">
            <AboutSection />
            <ServicesSection />
            <WorkSection />
            <ContactSection />
          </section>
        </main>
      </div>
      <SiteFooter />
    </>
  )
}
