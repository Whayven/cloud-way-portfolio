# Cloud Way Portfolio — Design Specification

**Status:** Draft for review  
**Project path:** `/Users/june/Documents/WebDev/cloud-way-portfolio`  
**Last updated:** 2026-04-05

## 1. Purpose and success criteria

Build a new marketing-style portfolio site that **visually and tonally matches** the current [cloud-way.dev](https://cloud-way.dev) experience: clear hero, strong typography, section-based layout (About, Services, selected work, blog discovery, contact), and project cards with tech tags and outbound links.

**Success looks like:**

- Visitors immediately recognize the same brand personality as the live site (not a generic template).
- Blog posts and portfolio case studies are **stored in PostgreSQL** and rendered on the site without redeploying for every text tweak (once publishing workflow exists).
- The codebase stays maintainable: App Router Next.js, TypeScript, Tailwind, and a **single agreed UI layer** (Catalyst) for interactive primitives.
- Lighthouse and accessibility are treated as requirements, not afterthoughts (semantic HTML, focus states, contrast).

## 2. Scope (v1)

**In scope**

- Public pages: Home (hero + highlights), Work listing + detail, Blog listing + post, About/Services-style sections (can mirror current site structure), Contact (form with server action or API route).
- PostgreSQL-backed models for **blog posts** and **portfolio items** (CRUD via a minimal internal workflow; see §6).
- SEO basics: metadata per route, Open Graph, `sitemap.xml`, `robots.txt`.
- Deployment story documented (hosting for app + managed Postgres).

**Explicitly out of scope for v1 (YAGNI)**

- Full-featured CMS UI with roles, media library, and WYSIWYG (can be a later phase).
- Comments, newsletters, and analytics beyond a simple embed or env-based snippet if you want them later.
- Multi-language i18n unless you request it before build.

## 3. Visual and UX alignment (cloud-way.dev)

Translate the live site’s patterns into this repo:

| Area | Direction |
|------|-----------|
| **Layout** | Vertical sections with generous spacing; clear “Work →” / “Blog →” style wayfinding where it fits your content. |
| **Hero** | Short headline + supporting line + primary/secondary actions (e.g. view work, read blog). |
| **Work grid** | Cards: title, short description, tech chips, link to case study or external product. |
| **About / Services** | Repeatable blocks (heading + short copy); can start as structured content in DB or as static TSX constants—decision in §6. |
| **Contact** | Form fields aligned with current site (name, company, email, phone, region, message) unless you simplify for v1. |
| **Blog** | Listing with title + excerpt + date; post page with readable typography and code styling if you use fenced code blocks. |

**Brand tokens:** Extract colors, font families, and radii from the existing site during implementation (DevTools / computed styles) and encode them as Tailwind theme extensions so Catalyst components inherit the same look after customization.

## 4. Technical stack

| Layer | Choice |
|-------|--------|
| Framework | **Next.js** (App Router), **TypeScript** |
| Styling | **Tailwind CSS** |
| UI kit | **Catalyst** (Tailwind Plus UI kit) — see §5 |
| Database | **PostgreSQL** |
| ORM / migrations | **Prisma** (recommended) or Drizzle; spec assumes **Prisma** unless you prefer otherwise before implementation. |
| Validation | **Zod** for form payloads and any public APIs |
| Content format | **Markdown** (or MDX later) stored in DB for long body fields; rendered with a hardened pipeline (e.g. `remark` + `rehype-sanitize`) |

## 5. Catalyst integration (mandatory phase order)

Catalyst is **not** installed as a typical npm “design system” package. It is delivered as a **Tailwind Plus download** (ZIP) of copy-paste React components. The agreed workflow:

1. **Initialize** the Next.js project with TypeScript and Tailwind (official `create-next-app` or equivalent).
2. **Before any feature UI build:** integrate Catalyst:
   - Copy the TypeScript Catalyst components into the repo (e.g. `components/catalyst/` or project convention).
   - Install documented dependencies (e.g. `@headlessui/react`, `motion`, `clsx`, `@heroicons/react` — exact versions per Catalyst docs at time of integration).
   - Wire **Next.js `Link`** into Catalyst’s `Link` pattern per [Catalyst docs](https://catalyst.tailwindui.com/docs).
   - Configure **Inter** (or your chosen brand font) and ensure Tailwind theme tokens match cloud-way.dev.
3. **Only then** build page sections and layouts using Catalyst primitives (buttons, inputs, navbar, etc.) plus custom layout components.

This phase is a **hard gate**: no bespoke page sections except minimal shell (layout, providers) until Catalyst is in place.

## 6. Content architecture and PostgreSQL

### 6.1 Recommended approach (option A — adopted in this spec)

**Prisma + PostgreSQL** as source of truth for dynamic content. **No** heavy CMS in v1.

- **Publishing:** Seed scripts + optional protected admin routes later, or direct DB updates via Prisma Studio in early days.
- **Rendering:** Server Components fetch by slug; use `revalidatePath` / time-based revalidation for updates.

**Why:** Fits your stack request, keeps ownership in-repo, and avoids vendor lock-in for v1.

### 6.2 Alternatives (not default)

- **Option B — Headless CMS (Sanity, Contentful, etc.):** Faster editorial UX, less SQL work; adds cost and external dependency.
- **Option C — File-based only (MDX in git):** Simplest deploy story; does **not** meet the PostgreSQL requirement for blogs/portfolio items.

### 6.3 Entity sketch (v1)

**`BlogPost`**

- `id` (uuid), `slug` (unique), `title`, `excerpt`, `body` (markdown), `publishedAt` (nullable), `createdAt`, `updatedAt`, `status` (`draft` | `published`)

**`PortfolioItem`**

- `id`, `slug` (unique), `title`, `summary`, `body` (markdown, optional for short entries), `externalUrl` (optional), `imageUrl` (optional), `techStack` (string array or JSON), `sortOrder`, `publishedAt`, timestamps, `status`

**`ContactMessage`** (optional v1)

- If you want persistence: store submissions with fields matching the form + `createdAt`; add spam/abuse considerations (rate limit, honeypot).

**About / Services copy**

- **v1 default:** static in TSX or a single `SiteContent` JSON row—avoids over-modeling until you need inline editing.

## 7. Application structure (high level)

- `app/(marketing)/` — public routes: `/`, `/work`, `/work/[slug]`, `/blog`, `/blog/[slug]`, contact.
- `app/api/` or Server Actions — contact submission, future webhooks.
- `lib/db` — Prisma client singleton.
- `lib/markdown` — parse/sanitize/render pipeline.
- `components/catalyst/` — Catalyst components (post-integration).
- `components/site/` — composed sections (hero, work grid, footer).

## 8. Security and quality

- Sanitize all untrusted markdown HTML output.
- Rate-limit or cap contact submissions; never log secrets.
- Environment variables for `DATABASE_URL` and any SMTP/API keys.
- Typecheck in CI; run ESLint; add a minimal smoke test or Playwright later if you want regression safety.

## 9. Deployment assumptions

- **App:** Vercel or similar Node host compatible with Next.js App Router.
- **Database:** Managed PostgreSQL (Neon, Supabase, RDS, etc.).
- Migrations run via Prisma in deploy pipeline or documented manual step.

## 10. Implementation sequencing (summary)

1. Finalize and approve this spec (you are here).
2. Write implementation plan (task breakdown: init, Catalyst, schema, pages, contact, polish).
3. Scaffold Next.js + TS + Tailwind in `cloud-way-portfolio`.
4. Integrate Catalyst (§5) and theme tokens from cloud-way.dev.
5. Add Prisma schema, migrations, seed data.
6. Build public routes and server-side data fetching.
7. Hardening: SEO, a11y pass, performance, deployment docs.

---

## Open decisions (resolve before or during implementation plan)

1. **Portfolio site audience:** personal freelancer portfolio vs same “CloudWay team” positioning as today (copy and hero depend on this).
2. **Contact delivery:** email via provider (Resend, Postmark, etc.) vs store-only vs both.
3. **Admin in v1:** Prisma Studio only vs a minimal password-protected `/admin` for drafts.

Please comment directly in this file or in chat; once approved, we proceed to the implementation plan and project initialization.
