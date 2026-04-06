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
    <div className="relative min-h-screen bg-cw-dark">
      {/* Fixed parallax nebula background */}
      <div className="fixed inset-0 z-0">
        <video
          className="h-full w-full object-cover opacity-40"
          autoPlay
          muted
          loop
          playsInline
          aria-hidden
        >
          <source src="/assets/hero-nebula.mp4" type="video/mp4" />
        </video>
        <div
          className="absolute inset-0 bg-linear-to-b from-cw-dark/30 via-cw-dark/60 to-cw-dark/90"
          aria-hidden
        />
      </div>

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
