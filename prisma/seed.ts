import "dotenv/config"
import { PrismaPg } from "@prisma/adapter-pg"
import { PrismaClient } from "../lib/generated/prisma/client"

const connectionString = process.env.DATABASE_URL
if (!connectionString) throw new Error("DATABASE_URL is not set")

const adapter = new PrismaPg({ connectionString })
const prisma = new PrismaClient({ adapter })

const portfolioItems = [
  {
    slug: "waytech",
    title: "Waytech",
    summary: "Take your business to the next level with Waytech.",
    body: "Waytech is a modern business platform built with Next.js and Tailwind CSS, deployed on Netlify. The project focused on delivering a fast, responsive experience that helps businesses establish a strong online presence.",
    externalUrl: "https://wayytech.com",
    techStack: ["NextJS", "Tailwind", "Netlify"],
    sortOrder: 1,
    status: "published" as const,
    publishedAt: new Date(),
  },
  {
    slug: "ascend-hiring",
    title: "Ascend Hiring",
    summary:
      "Hire the best talent with the next generation of ATS technology.",
    body: "Ascend Hiring is a full-stack applicant tracking system powered by AI. Built with a microservices architecture, it combines a Next.js frontend with Python-based AI services to deliver intelligent candidate matching, automated screening, and a seamless hiring workflow.",
    externalUrl: "https://ascendhiring.com",
    techStack: [
      "NextJS",
      "Tailwind",
      "Prisma",
      "PostgreSQL",
      "Python",
      "Microservices",
      "TypeScript",
      "AI/LLM",
    ],
    sortOrder: 2,
    status: "published" as const,
    publishedAt: new Date(),
  },
]

async function main() {
  console.log("Seeding portfolio items...")

  for (const item of portfolioItems) {
    await prisma.portfolioItem.upsert({
      where: { slug: item.slug },
      update: item,
      create: item,
    })
    console.log(`  ✓ ${item.title}`)
  }

  console.log("Done.")
}

main()
  .catch((e) => {
    console.error(e)
    process.exit(1)
  })
  .finally(() => prisma.$disconnect())
