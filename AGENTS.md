<!-- BEGIN:nextjs-agent-rules -->

# This is NOT the Next.js you know

This version has breaking changes — APIs, conventions, and file structure may all differ from your training data. Read the relevant guide in `node_modules/next/dist/docs/` before writing any code. Heed deprecation notices.

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
- **Cloudflare R2** for image uploads via `@aws-sdk/client-s3`
- **jose** for JWT-based admin auth

## Project layout

```
app/
  layout.tsx               # Root layout (Poppins, body colors)
  page.tsx                 # Home page (fetches announcements for hero carousel)
  globals.css              # Tailwind config + CW color tokens
  unauthorized.tsx         # Login form (rendered by authInterrupts)
  sitemap.ts               # Dynamic sitemap (force-dynamic)
  robots.ts                # Robots.txt
  _assets/                 # User media (*.mp4 gitignored)
  _components/catalyst/    # Catalyst UI kit (copy-paste from Tailwind Plus)
  actions/                 # Server actions (auth, portfolio, blog, announcements, messages, contact)
  admin/
    layout.tsx             # Auth gate — verifySession() or unauthorized()
    page.tsx               # Dashboard with content counts
    _components/           # AdminShell, forms, delete buttons, ImageUpload
    api/upload/route.ts    # R2 image upload route handler
    portfolio/             # CRUD pages (list, new, [id]/edit)
    blog/                  # CRUD pages (list, new, [id]/edit)
    announcements/         # CRUD pages (list, new, [id]/edit)
    messages/              # List + [id] detail
  blog/
    page.tsx               # Public blog index
    [slug]/page.tsx        # Blog post detail (markdown via react-markdown)
  work/
    page.tsx               # Public portfolio index
    [slug]/page.tsx        # Portfolio item detail
components/site/           # Marketing components: header, hero, sections, footer, contact
lib/
  auth.ts                  # JWT session management (jose). Cookie scoped to path: "/admin"
  db.ts                    # PrismaClient singleton (PrismaPg adapter)
  r2.ts                    # S3Client singleton for Cloudflare R2 (lazy init)
  upload.ts                # uploadToR2() and deleteFromR2() helpers (server-only)
  utils.ts                 # slugify(), formatDate()
  generated/prisma/        # Generated Prisma client (gitignored)
prisma/
  schema.prisma            # BlogPost, PortfolioItem, Announcement, ContactMessage
  migrations/
```

## Prisma 7 — critical differences

1. Config is in **`prisma.config.ts`** (`defineConfig` + `env("DATABASE_URL")`) — not in `schema.prisma`.
2. Generated client output: **`lib/generated/prisma/`** — import from `@/lib/generated/prisma/client`, NOT `@prisma/client`.
3. Runtime uses adapter pattern: `new PrismaClient({ adapter: new PrismaPg({ connectionString }) })` in `lib/db.ts`.
4. `next.config.ts` has `serverExternalPackages: ["@prisma/adapter-pg", "pg"]`.

## Database models

- **BlogPost** — slug, title, excerpt, body (markdown), coverImage?, status, publishedAt
- **PortfolioItem** — slug, title, summary, body?, externalUrl?, imageUrl?, techStack[], sortOrder, status, publishedAt
- **Announcement** — title, body, type (info/warning/success), expiresAt?, status, publishedAt
- **ContactMessage** — firstName, lastName, company?, email, phone?, region?, message

Enums: `ContentStatus` (draft/published), `AnnouncementType` (info/warning/success).

## Auth

Single-admin JWT auth via `jose`. No user table — password checked against `ADMIN_PASSWORD` env var with `timingSafeEqual`. Session cookie scoped to `path: "/admin"` (important: upload route lives at `/admin/api/upload` to receive the cookie). `app/admin/layout.tsx` calls `verifySession()` → `unauthorized()` (Next.js authInterrupts). All server actions also call `verifySession()` for defense-in-depth.

## Image uploads (Cloudflare R2)

- R2 client in `lib/r2.ts` — lazy singleton (doesn't throw at import time if env vars missing)
- Upload/delete helpers in `lib/upload.ts` (server-only)
- Route handler at `app/admin/api/upload/route.ts` — POST, auth-gated, returns `{ url }`
- Client component `app/admin/_components/image-upload.tsx` — drag-and-drop, preview, progress bar
- R2 objects cleaned up on record delete and image replacement (in server actions)
- Key structure: `portfolio/{uuid}.{ext}`, `blog/{uuid}.{ext}`
- Validation: 5 MB max, JPEG/PNG/WebP/AVIF only

## Admin patterns

- Forms use `useActionState` (React 19) with server actions
- Auto-slug generation on title blur via `slugify()` from `lib/utils.ts`
- Delete confirmation via `DeleteDialog` component (render-prop pattern for the trigger button)
- Dedicated client wrapper components (e.g., `DeletePostButton`) to avoid passing functions across server/client boundary
- Admin shell uses Catalyst `SidebarLayout` with `usePathname()` for active state

## Common commands

```bash
npm run dev              # Dev server (Turbopack)
npm run build            # prisma generate + next build
npm run db:up            # Start Docker Postgres
npm run db:down          # Stop Docker Postgres
npm run db:migrate       # prisma migrate dev + generate
npm run db:studio        # Prisma Studio
```

## Environment variables

```bash
DATABASE_URL             # PostgreSQL connection string
ADMIN_PASSWORD           # Single admin password
JWT_SECRET               # HS256 signing key for session JWTs
R2_ACCOUNT_ID            # Cloudflare account ID
R2_ACCESS_KEY_ID         # R2 API token key
R2_SECRET_ACCESS_KEY     # R2 API token secret
R2_BUCKET_NAME           # R2 bucket name
R2_PUBLIC_URL            # Public URL for R2 bucket (e.g., https://images.cloud-way.dev)
```

**Note:** `next build` loads `.env.production` which points to Neon. For local builds, override with `DATABASE_URL=... npm run build` or ensure Neon has migrations deployed.

## Tailwind / theming

Color tokens are defined in `app/globals.css` under `@theme inline`. Key tokens:

- `cw-light` (#f1f5f9), `cw-dark` (#13151a) — surface colors
- Accent gradient: sky (#38bdf8) to purple (#a855f7)
- Card backgrounds, muted surfaces, etc.

Use these tokens (`bg-cw-dark`, `text-cw-light`, etc.) — do not hardcode hex values.

Gradient conventions:
- **Hero / primary accent**: `from-sky-400 via-purple-500 to-fuchsia-500` (vibrant)
- **Section titles / subtle**: `from-white to-purple-400` (used via `<GradientText subtle>`)
- **Header/footer logo**: white → purple (both SVG icon and text)

## Catalyst components

Located in `app/_components/catalyst/`. These are copy-pasted from Tailwind Plus — edit sparingly. `link.tsx` is already wired to Next.js `Link` (DataInteractive removed for Next.js 16 compatibility). Import from `@/app/_components/catalyst/...`.

## Assets

- Hero video: `public/assets/hero-nebula.mp4` (served at `/assets/hero-nebula.mp4`)
- Hero still: imported from `app/_assets/` via `next/image`

## Lint notes

`app/_components/catalyst/` may have ESLint warnings (upstream patterns). Marketing code in `components/site/` should stay clean.

<!-- END:nextjs-agent-rules -->
