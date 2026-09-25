import {
  AboutSection,
  CtaSection,
  FaqSection,
  ProcessSection,
  ServicesSection,
  TechMarquee,
  WorkSection,
} from "@/components/site/content-sections"
import { ContactSection } from "@/components/site/contact-section"
import { HeroSection } from "@/components/site/hero-section"
import { NebulaBackdrop } from "@/components/site/nebula-backdrop"
import { SiteFooter } from "@/components/site/site-footer"
import { SiteHeader } from "@/components/site/site-header"

export default function Home() {
  return (
    <div className="relative min-h-screen overflow-x-clip bg-cw-dark text-white">
      <NebulaBackdrop />
      <div className="relative z-10">
        <SiteHeader intro />
        <HeroSection />
        <TechMarquee />
        <main id="content" className="relative mx-auto w-full max-w-[85rem] px-6 sm:px-10">
          <AboutSection />
          <ServicesSection />
          <ProcessSection />
          <WorkSection />
          <FaqSection />
          <CtaSection />
          <ContactSection />
        </main>
        <SiteFooter />
      </div>
    </div>
  )
}
