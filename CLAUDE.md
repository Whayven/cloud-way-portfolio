@AGENTS.md

# Cloud Way Portfolio

Marketing/portfolio site for [cloud-way.dev](https://cloud-way.dev). Next.js 16 + TypeScript + Tailwind v4 + PostgreSQL + Prisma 7.

## Stack quick ref

- **Next.js 16.2.2** — App Router, Turbopack dev
- **React 19**, **TypeScript 5**
- **Tailwind CSS v4** — `@import "tailwindcss"`, `@theme inline` in `app/globals.css`
- **Dark mode** — `prefers-color-scheme` via `@custom-variant` (not class-based)
- **Font** — Poppins (`next/font/google`)
- **Prisma 7** with `@prisma/adapter-pg` + `pg` driver
- **Catalyst** (Tailwind Plus) UI kit lives in `app/_components/catalyst/`

## Project layout

```
app/
  layout.tsx             # Root layout (Poppins, body colors)
  page.tsx               # Home page
  globals.css            # Tailwind config + CW color tokens
  _assets/               # User media (*.mp4 gitignored)
  _components/catalyst/  # Catalyst UI kit (copy-paste from Tailwind Plus)
components/site/         # Marketing components: header, hero, sections, footer, contact
lib/
  db.ts                  # PrismaClient singleton (PrismaPg adapter)
  generated/prisma/      # Generated Prisma client (gitignored)
prisma/
  schema.prisma          # BlogPost, PortfolioItem, ContactMessage
  migrations/
docs/superpowers/specs/  # Design spec
```

## Prisma 7 — critical differences

1. Config is in **`prisma.config.ts`** (`defineConfig` + `env("DATABASE_URL")`) — not in `schema.prisma`.
2. Generated client output: **`lib/generated/prisma/`** — import from `@/lib/generated/prisma/client`, NOT `@prisma/client`.
3. Runtime uses adapter pattern: `new PrismaClient({ adapter: new PrismaPg({ connectionString }) })` in `lib/db.ts`.
4. `next.config.ts` has `serverExternalPackages: ["@prisma/adapter-pg", "pg"]`.

## Common commands

```bash
npm run dev              # Dev server (Turbopack)
npm run build            # prisma generate + next build
npm run db:up            # Start Docker Postgres
npm run db:down          # Stop Docker Postgres
npm run db:migrate       # prisma migrate dev + generate
npm run db:studio        # Prisma Studio
```

## Tailwind / theming

Color tokens are defined in `app/globals.css` under `@theme inline`. Key tokens:
- `cw-light` (#f1f5f9), `cw-dark` (#13151a) — surface colors
- Accent gradient: sky (#38bdf8) to purple (#a855f7)
- Card backgrounds, muted surfaces, etc.

Use these tokens (`bg-cw-dark`, `text-cw-light`, etc.) — do not hardcode hex values.

## Catalyst components

Located in `app/_components/catalyst/`. These are copy-pasted from Tailwind Plus — edit sparingly. `link.tsx` is already wired to Next.js `Link`. Import from `@/app/_components/catalyst/...`.

## Assets

- Hero video: `public/assets/hero-nebula.mp4` (served at `/assets/hero-nebula.mp4`)
- Hero still: imported from `app/_assets/` via `next/image`

## Environment setup

```bash
cp .env.example .env     # DATABASE_URL
npm install
npm run db:up
npm run db:migrate
```

## Lint notes

`app/_components/catalyst/` may have ESLint warnings (upstream patterns). Marketing code in `components/site/` should stay clean.
