---
name: Site Roadmap
description: Phased implementation plan for CloudWay portfolio — admin, announcements, blog, and polish
type: project
---

Agreed-upon roadmap for the CloudWay portfolio site (2026-04-05):

**Phase 1 — Ship what's broken**
- Wire contact form server action → save ContactMessage to DB
- Add sitemap.ts, robots.ts, proper metadata on all pages
- Render portfolio imageUrl on work cards

**Phase 2 — Admin foundation**
- /admin routes with auth gate
- Portfolio CRUD (PortfolioItem)
- Contact inbox (read/archive ContactMessages)
- Use Catalyst UI kit for admin

**Phase 3 — Announcements**
- New Announcement model (title, body, type, publishedAt, expiresAt, status)
- Admin CRUD for announcements
- Banner/toast on marketing site for active announcements

**Phase 4 — Blog**
- Admin CRUD for BlogPost (model already exists in schema)
- In-app /blog and /blog/[slug] routes (replace external link)
- Markdown rendering for rich content

**Phase 5 — Polish**
- Rich text/markdown editor in admin
- Image uploads (S3/R2 or Vercel Blob)
- Email integration for contact submissions
- Analytics dashboard in admin

**Why:** User wants a self-service admin for content updates (work items, blog, announcements) so the site can grow without code deploys.
**How to apply:** Follow this sequence when prioritizing work. Phase 1 items are prerequisites.
