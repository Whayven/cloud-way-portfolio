// Classifies free-form tech-stack labels ("NextJS", "PostgreSQL", "AWS") for
// case-study stack cards.

export type TechCategory = "frontend" | "backend" | "platform"

export type TechKind = "framework" | "styling" | "language" | "data" | "cloud" | "other"

export const TECH_CATEGORIES: { key: TechCategory; label: string }[] = [
  { key: "frontend", label: "Frontend" },
  { key: "backend", label: "Backend" },
  { key: "platform", label: "Platform / Infra" },
]

export function techCategory(name: string): TechCategory {
  const n = name.toLowerCase()
  if (/(aws|gcp|azure|vercel|cloudflare|netlify|docker|kubernetes|terraform)/.test(n)) return "platform"
  if (
    /(postgres|mysql|mongo|sqlite|redis|supabase|prisma|node|express|fastapi|graphql|api|python|go\b|rust|java\b|microservice|\bai\b|llm)/.test(
      n,
    )
  )
    return "backend"
  return "frontend"
}

export function techKind(name: string): TechKind {
  const n = name.toLowerCase()
  if (/(postgres|mysql|mongo|sqlite|sql|redis|supabase|prisma)/.test(n)) return "data"
  if (/(aws|gcp|azure|vercel|cloudflare|netlify|cloud)/.test(n)) return "cloud"
  if (/(tailwind|css|sass)/.test(n)) return "styling"
  if (/(typescript|javascript|python|go\b|rust|java\b)/.test(n)) return "language"
  if (/(react|vue|svelte|next|nuxt|expo|native)/.test(n)) return "framework"
  return "other"
}
