# Cloud Way Portfolio — Project status

**As of:** 2026-04-23
**Repository path:** `cloud-way-portfolio` (e.g. `~/Documents/WebDev/cloud-way-portfolio`)
**Reference site / brand:** [cloud-way.dev](https://cloud-way.dev)

This document summarizes what exists today so another agent can continue without re-deriving context.

---

## Product intent

Marketing/portfolio site for CloudWay. **Next.js 16**, **React 19**, **TypeScript**, **Tailwind v4**, **PostgreSQL**, **Prisma 7**. DB-backed blog, portfolio (Work), and announcements. Single-admin CRUD at `/admin` with JWT auth and Cloudflare R2 image uploads.

Authoritative product/technical notes and agent rules live in:

- `AGENTS.md` (and `CLAUDE.md`, which includes it)
- `docs/superpowers/specs/2026-04-05-cloud-way-portfolio-design.md` (original design spec)

---

## Shipped (Phases 1–5 complete)

**Phase 1 — foundations.** Contact form persists to `ContactMessage` via server action; `sitemap.ts` + `robots.ts`; portfolio image rendering on Work cards.

**Phase 2 — admin.** `/admin` routes auth-gated by JWT session cookie scoped to `/admin`. Portfolio CRUD. Contact inbox. Catalyst `SidebarLayout` shell.

**Phase 3 — announcements.** `Announcement` model with `AnnouncementType` enum. Admin CRUD. Hero carousel renders active announcements on `/`.

**Phase 4 — blog.** Admin CRUD for `BlogPost`. In-app `/blog` and `/blog/[slug]` (replaced the external Hashnode link). Markdown rendering via `react-markdown`.

**Phase 5 — image uploads.** Cloudflare R2 via `@aws-sdk/client-s3` + `lib/r2.ts` + `lib/upload.ts`. Drag-and-drop `ImageUpload` on Portfolio + Blog forms. R2 cleanup on delete/update. Lazy R2 client (no build-time env errors).

**Post-roadmap polish (2026-04 weeks 2–3).**
- `components/site/work-grid.tsx` (`motion/react` staggered scroll-in) replaced the old flex list on the home Work section.
- Animated About/Services sections via `FadeIn` wrapper.
- Copy refresh: "SEO" → full-stack + mobile messaging.
- Hero star button; hero + header/footer style passes.

Design plan for the Our Work rework is at `docs/superpowers/plans/2026-04-06-our-work-rework.md` (fully shipped; kept for reference).

---

## Redesign — in progress (2026-04-23)

The user brought in a Claude Design handoff bundle (nebula-themed polish pass) to be applied across the full public marketing surface. Intent is **visual uplift and section expansion**, not a data-model change. All server behavior (Prisma queries, contact server action, admin routes, R2 uploads) is preserved.

**Source of truth**
- Design handoff summary: `docs/design/cloudway/README.md`
- Applied implementation files: `components/site/hero-section.tsx`, `components/site/nebula-backdrop.tsx`, `components/site/content-sections.tsx`, `components/site/work-grid.tsx`, `components/site/blog-newsletter.tsx`, `components/site/site-header.tsx`, `components/site/site-footer.tsx`
- Hero nebula asset: `public/assets/hero-nebula.png`
- Implementation plan: `docs/superpowers/plans/synthetic-whistling-pearl.md`

**What changes**
- Shared chrome: new `NebulaBackdrop` (parallax nebula + 3-layer starfield + aurora blobs + constellation lines + comet streaks + cursor-reactive glow), upgraded `SiteHeader` with active-route underline, `SiteFooter` expanded to 4 columns + "all systems operational" ping.
- Home (`/`): hero gains `text-shimmer` wordmark, trust row, scroll indicator, socials. New sections added: **Process** (4-step orbital timeline), **Testimonials** (3 cards + logo strip), **CTA** slab. About becomes a 3-pillar bento; Services becomes a 2×2 icon grid with tech-pill bullets. Selected Work on the home page gets product-mock cards (gradient + grid overlay + animated bar chart + live pill + metric chip).
- `/work`: eyebrow + gradient headline + 4-stat row hero, sticky filter chips, 2-col grid, featured item spans 2 cols on md+. Filter buckets derived client-side from `PortfolioItem.techStack` (no schema change).
- `/blog`: eyebrow "Field notes" hero, featured article split layout with ★ Featured badge, 3-up grid, newsletter card with coming-soon copy until a mailing-list backend exists.
- Design tokens + keyframes land in `app/globals.css` under the existing `@theme inline` and a new animations block, gated by `prefers-reduced-motion`.

**Explicitly out of scope for this pass**
- Tweaks panel (prototype-only dev UI).
- New DB fields (portfolio category, blog tags, testimonials, stats).
- Newsletter mailing-list integration.
- `/work/[slug]` and `/blog/[slug]` detail-page redesign (optional backdrop swap only).
- Analytics / event instrumentation.

**Next follow-ups (after this redesign lands)**
- Email notifications for contact form submissions (Resend/SES).
- Rich-text editor for blog body (Tiptap or similar) on admin forms.
- Add `category` to `PortfolioItem` and `tags` to `BlogPost` so filter chips become data-driven.
- Small analytics panel on `/admin` (contact volume, post views).

---

## Stack

| Area | Choice |
|------|--------|
| Framework | Next.js 16.2.2 (App Router, Turbopack dev) |
| UI | React 19.2.x, TypeScript 5 |
| Styling | Tailwind v4 (`@import "tailwindcss"`, `@theme inline`) |
| Dark mode | `prefers-color-scheme` via `@custom-variant` (not class-based) |
| Font | Poppins (`next/font/google`) |
| Database | PostgreSQL 16 (Docker for local, Neon for prod) |
| ORM | Prisma 7 (`prisma-client` generator + `@prisma/adapter-pg` + `pg`) |
| Auth | JWT via `jose`, env password, cookie scoped to `/admin` |
| Storage | Cloudflare R2 via `@aws-sdk/client-s3` |
| Animation | `motion/react` (v12+) |
| UI kit | Catalyst (Tailwind Plus) under `app/_components/catalyst/` — used in admin, not marketing |
| Icons | `@heroicons/react` |

---

## Repository layout

```text
app/
  layout.tsx          # Root (Poppins, body surface colors)
  page.tsx            # Home — fetches Announcement[], composes marketing sections
  globals.css         # Tailwind config + CW tokens + animation keyframes
  unauthorized.tsx    # /admin interrupt login
  sitemap.ts, robots.ts
  _assets/            # Originals (mp4 gitignored)
  _components/catalyst/ # Admin UI kit
  actions/            # Server actions (auth, portfolio, blog, announcements, messages, contact)
  admin/              # Auth-gated CRUD + upload route
  blog/               # Public /blog, /blog/[slug]
  work/               # Public /work, /work/[slug]
components/site/      # Public marketing components
components/ui/        # Shared UI (StarButton, etc.)
lib/
  auth.ts, db.ts, r2.ts, upload.ts, utils.ts
  generated/prisma/   # Generated client (gitignored)
prisma/
  schema.prisma       # BlogPost, PortfolioItem, Announcement, ContactMessage
  migrations/
public/
  assets/hero-nebula.mp4, hero-nebula.png
docs/
  superpowers/specs/, superpowers/plans/
docker-compose.yml    # Local Postgres
prisma.config.ts      # Prisma CLI config (dotenv + DATABASE_URL)
```

---

## Database models

- `BlogPost` — slug, title, excerpt, body (markdown), coverImage?, status, publishedAt
- `PortfolioItem` — slug, title, summary, body?, externalUrl?, imageUrl?, techStack[], sortOrder, status, publishedAt
- `Announcement` — title, body, type (info/warning/success), expiresAt?, status, publishedAt
- `ContactMessage` — firstName, lastName, company?, email, phone?, region?, message

Enums: `ContentStatus` (draft | published), `AnnouncementType` (info | warning | success).

---

## Environment

```bash
DATABASE_URL         ADMIN_PASSWORD       JWT_SECRET
R2_ACCOUNT_ID        R2_ACCESS_KEY_ID     R2_SECRET_ACCESS_KEY
R2_BUCKET_NAME       R2_PUBLIC_URL
```

`next build` loads `.env.production` (Neon). For local builds: `DATABASE_URL=... npm run build`.

---

## Common commands

```bash
npm run dev          # Dev server (Turbopack)
npm run build        # prisma generate + next build
npm run db:up        # Docker Postgres
npm run db:down
npm run db:migrate   # prisma migrate dev + generate
npm run db:studio    # Prisma Studio
```

---

## Prisma 7 specifics

1. Connection URL is in `prisma.config.ts` (`defineConfig` + `env("DATABASE_URL")`), not in `schema.prisma`. Uses `import "dotenv/config"` for CLI.
2. Client is generated to `lib/generated/prisma/`. Import from `@/lib/generated/prisma/client`, not `@prisma/client`.
3. Runtime: `new PrismaClient({ adapter: new PrismaPg({ connectionString }) })` in `lib/db.ts`.
4. `next.config.ts` has `serverExternalPackages: ["@prisma/adapter-pg", "pg"]`.

---

## Quick verification

```bash
npm install
cp .env.example .env
npm run db:up
npx prisma migrate status
npm run build
npm run dev
```

Open `http://localhost:3000` — `/`, `/work`, `/blog` render from DB; `/admin` requires login.
