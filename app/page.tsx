import {
  AboutSection,
  ServicesSection,
  WorkSection,
} from "@/components/site/content-sections"
import { ContactSection } from "@/components/site/contact-section"
import { HeroSection } from "@/components/site/hero-section"
import { SiteFooter } from "@/components/site/site-footer"
import { SiteHeader } from "@/components/site/site-header"
import { NebulaBackground } from "@/components/site/nebula-background"

export default function Home() {
  return (
    <div className="relative min-h-screen bg-cw-dark">
      <NebulaBackground />

      {/* Scrolling content */}
      <div className="relative z-10">
        <SiteHeader />
        <HeroSection />
        <main id="content" className="relative mx-auto w-full max-w-6xl px-6 pb-24 pt-16 text-base leading-relaxed text-white sm:px-8 lg:px-10">
          <AboutSection />
          <ServicesSection />
          <WorkSection />
          <ContactSection />
        </main>
        <SiteFooter />
      </div>
    </div>
  )
}
