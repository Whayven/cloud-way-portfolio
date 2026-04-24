import {
  AboutSection,
  CtaSection,
  FaqSection,
  ProcessSection,
  ServicesSection,
  WorkSection,
} from "@/components/site/content-sections"
import { ContactSection } from "@/components/site/contact-section"
import { HeroSection } from "@/components/site/hero-section"
import { NebulaBackdrop } from "@/components/site/nebula-backdrop"
import { SiteFooter } from "@/components/site/site-footer"
import { SiteHeader } from "@/components/site/site-header"
import { prisma } from "@/lib/db"
import { ContentStatus } from "@/lib/generated/prisma/client"

export default async function Home() {
  const announcements = await prisma.announcement.findMany({
    where: {
      status: ContentStatus.published,
      OR: [{ expiresAt: null }, { expiresAt: { gt: new Date() } }],
    },
    orderBy: { publishedAt: "desc" },
    select: { id: true, title: true, body: true, type: true },
  })

  return (
    <div className="relative min-h-screen bg-cw-dark text-white">
      <NebulaBackdrop opacity={0.55} />
      <div className="relative z-10">
        <SiteHeader />
        <HeroSection announcements={announcements} />
        <main
          id="content"
          className="relative mx-auto w-full max-w-[85rem] px-6 sm:px-10"
        >
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
