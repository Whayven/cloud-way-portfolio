# Cloud Way Portfolio — Project status (agent handoff)

**As of:** 2026-04-06  
**Repository path:** `cloud-way-portfolio` (e.g. `~/Documents/WebDev/cloud-way-portfolio`)  
**Reference site / brand:** [cloud-way.dev](https://cloud-way.dev)

This document summarizes what exists today so another agent can continue without re-deriving context.

---

## Product intent

Rebuild the CloudWay marketing/portfolio experience in a new codebase: same visual language (colors, gradients, structure), with **Next.js**, **TypeScript**, **Tailwind**, **PostgreSQL**, and **Prisma**. Longer-term: blog and portfolio content from the database; Catalyst (Tailwind Plus) as the UI kit for interactive components.

Authoritative product/technical notes live in:

- `docs/superpowers/specs/2026-04-05-cloud-way-portfolio-design.md`

---

## Stack (installed)

| Area | Choice |
|------|--------|
| Framework | Next.js **16.2.2** (App Router, Turbopack dev) |
| UI | React **19.2.x**, TypeScript **5** |
| Styling | Tailwind CSS **v4** (`@import "tailwindcss"`, `@theme inline`) |
| Dark mode | `prefers-color-scheme` via `@custom-variant dark (@media …)` in `app/globals.css` |
| Font | **Poppins** (`next/font/google`) |
| Database | **PostgreSQL 16** (Docker) |
| ORM | **Prisma 7** with **`prisma-client`** generator + **`@prisma/adapter-pg`** + **`pg`** |
| Icons | `@heroicons/react` (marketing sections) |
| Catalyst deps | `@headlessui/react`, `motion`, `clsx` (for Catalyst components) |

---

## Repository layout (high level)

```
app/
  layout.tsx          # Root layout, Poppins, body surface colors
  page.tsx            # Home only (composes site components)
  globals.css         # Tailwind + CW color tokens (cw-light, cw-dark, accents)
  _assets/            # User media; PNGs tracked, *.mp4 gitignored (see below)
  _components/catalyst/   # Catalyst UI kit (copy-paste; Next Link wired in link.tsx)
components/
  site/               # Marketing UI: header, hero, sections, footer, contact shell
lib/
  db.ts               # Prisma singleton (adapter pattern; see Prisma section)
prisma/
  schema.prisma       # BlogPost, PortfolioItem, ContactMessage
  migrations/         # Initial migration applied
public/
  assets/hero-nebula.mp4   # Hero background video (served at /assets/…)
docs/superpowers/specs/    # Written design spec
prisma.config.ts      # Prisma CLI: schema path, migrations path, DATABASE_URL (dotenv)
docker-compose.yml    # Local Postgres
.env.example          # DATABASE_URL template
```

**Note:** There is **no** `components/catalyst/` at the repo root anymore; Catalyst lives under **`app/_components/catalyst/`**. The home page currently uses **`components/site/*`**, not Catalyst, except shared dependencies are available for future screens.

---

## Implemented today

### Application UI

- **Home (`/`)** — Full-bleed hero (video + nebula still), eyebrow, headline, Work/Blog cards, About, Services, Work (static case study links), Contact **form UI only** (submit handler is `preventDefault`; no API/DB yet).
- **Header** — Sticky, backdrop blur, gradient “CloudWay” wordmark, nav: Home, Work (`/work`), Blog (external).
- **Footer** — CW mark + copyright.
- **Theming** — Colors aligned with live site tokens (e.g. `cw-light` `#f1f5f9`, `cw-dark` `#13151a`, accent sky → purple gradient).

### Data layer

- **Prisma schema** — `BlogPost`, `PortfolioItem`, `ContactMessage` (+ `ContentStatus` enum). Matches the design spec’s entity sketch.
- **Docker Compose** — Postgres on port **5432** (user/password/db: see `docker-compose.yml`).
- **`lib/db.ts`** — `PrismaClient` with `PrismaPg` adapter; requires `DATABASE_URL` at runtime.

### Tooling scripts (`package.json`)

| Script | Purpose |
|--------|---------|
| `npm run dev` | Next dev server |
| `npm run build` | `prisma generate` then `next build` |
| `npm run db:up` / `db:down` | Docker Postgres |
| `npm run db:migrate` | `prisma migrate dev` + `prisma generate` |
| `npm run db:deploy` | Production migrations + generate |
| `npm run db:studio` | Prisma Studio |
| `postinstall` | `prisma generate` |

---

## Not implemented yet (from spec / obvious gaps)

- **`/work` and `/work/[slug]`** — Linked from nav/hero but **no routes** (will 404 until added).
- **Blog inside this app** — Blog card points to **external** `blog.cloud-way.dev`; no `/blog` or DB-backed posts in-app.
- **Contact persistence** — No server action, API route, or `ContactMessage` writes; no email provider.
- **Content from DB** — No pages reading `BlogPost` / `PortfolioItem` yet; no seed script.
- **SEO deliverables** — No dedicated sitemap/robots polish beyond defaults.
- **Catalyst on marketing pages** — Form could be refactored to Catalyst `Input` / `Button` etc. when desired.
- **Markdown pipeline** — Not added (spec mentioned remark/rehype-sanitize for post body).

---

## Assets

- **Hero video:** `public/assets/hero-nebula.mp4` → used as `<video src="/assets/hero-nebula.mp4">`.
- **Hero still (round image):** imported from `app/_assets/…_2.png` via `next/image`.
- **`app/_assets/.gitignore`** — Ignores `*.mp4` under `_assets` to avoid duplicating large binaries; keep the canonical clip under `public/assets/` for deployment.

If CI clones without local MP4, ensure `public/assets/hero-nebula.mp4` exists or adjust the hero.

---

## Prisma 7 specifics (important for agents)

1. **Connection URL** is **not** in `schema.prisma` — it lives in **`prisma.config.ts`** (`defineConfig` + `env("DATABASE_URL")`), with **`import "dotenv/config"`** for CLI.
2. **Client output** is **generated** to **`lib/generated/prisma/`** (gitignored). Imports use `@/lib/generated/prisma/client`, not `@prisma/client` from node_modules for the client class.
3. **Runtime:** `new PrismaClient({ adapter: new PrismaPg({ connectionString }) })` in `lib/db.ts`.
4. **`next.config.ts`** includes `serverExternalPackages: ["@prisma/adapter-pg", "pg"]`.

---

## Environment

Copy `.env.example` → `.env` and run `npm run db:up` before `db:migrate` or app code that touches the DB.

---

## Lint / hygiene

- **`npm run lint`** may still flag issues under **`app/_components/catalyst/`** (upstream Catalyst patterns vs ESLint `prefer-const`, etc.). Marketing code under `components/site/` is intended to stay clean.
- **`lib/generated`** is ignored by git; fresh clones need `npm install` / `prisma generate` (or `npm run build`).

---

## Suggested next steps (priority-ordered)

1. Add **`/work`** listing + **`/work/[slug]`** (static first, then wire to `PortfolioItem`).
2. Implement **contact** submission (Zod + server action or route handler → `ContactMessage` and/or email).
3. Add **blog** routes and Prisma queries for published `BlogPost` rows; optional seed.
4. Unify **Catalyst** location/imports if both `app/_components/catalyst` and any duplicate paths appear; wire **Next `Link`** everywhere Catalyst expects it (already done in `app/_components/catalyst/link.tsx`).
5. **SEO:** metadata API per route, `sitemap.ts`, `robots.ts`.
6. **Markdown** rendering for post/portfolio bodies when pulling from DB.

---

## Quick verification

```bash
npm install
cp .env.example .env   # if needed
npm run db:up
npx prisma migrate status
npm run build
npm run dev
```

Open `http://localhost:3000` — home should render; `/work` 404 until implemented.
