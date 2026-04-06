# Our Work Section Rework — Implementation Plan

> **For agentic workers:** REQUIRED SUB-SKILL: Use superpowers:subagent-driven-development (recommended) or superpowers:executing-plans to implement this plan task-by-task. Steps use checkbox (`- [ ]`) syntax for tracking.

**Goal:** Replace the Our Work section's horizontal card list with animated vertical image cards in a 2-column grid.

**Architecture:** Server component `WorkSection` keeps data-fetching and heading markup. A new `WorkGrid` client component receives portfolio items as props and renders the animated 2-column card grid using `motion/react`.

**Tech Stack:** Next.js 16, React 19, Tailwind v4, motion/react (already installed)

---

### Task 1: Create WorkGrid client component

**Files:**
- Create: `components/site/work-grid.tsx`

- [ ] **Step 1: Create the WorkGrid component file**

Create `components/site/work-grid.tsx` with the following content:

```tsx
"use client"

import Image from "next/image"
import Link from "next/link"
import { motion } from "motion/react"
import { GradientText } from "@/components/site/gradient-text"

interface WorkItem {
  slug: string
  title: string
  summary: string
  imageUrl: string | null
  techStack: string[]
}

const cardVariants = {
  hidden: { opacity: 0, y: 24 },
  visible: (i: number) => ({
    opacity: 1,
    y: 0,
    transition: {
      delay: i * 0.1,
      duration: 0.5,
      ease: [0.25, 0.1, 0.25, 1],
    },
  }),
}

export function WorkGrid({ items }: { items: WorkItem[] }) {
  return (
    <div className="mx-auto mt-14 grid max-w-6xl gap-6 md:grid-cols-2">
      {items.map((item, i) => (
        <motion.div
          key={item.slug}
          custom={i}
          variants={cardVariants}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: "-50px" }}
        >
          <Link
            href={`/work/${item.slug}`}
            className="group flex h-full flex-col overflow-hidden rounded-2xl border border-white/10 bg-white/[0.03] transition-all duration-300 hover:border-purple-400/20 hover:bg-white/[0.06]"
          >
            {item.imageUrl && (
              <div className="relative aspect-[2/1] overflow-hidden">
                <Image
                  src={item.imageUrl}
                  alt={item.title}
                  fill
                  className="object-cover transition-transform duration-500 group-hover:scale-105"
                  sizes="(max-width: 768px) 100vw, 50vw"
                />
              </div>
            )}
            <div className="flex flex-1 flex-col p-6">
              <h3 className="text-lg font-semibold text-white transition-colors group-hover:text-purple-300">
                {item.title}
              </h3>
              <p className="mt-2 flex-1 text-sm text-gray-400">
                {item.summary}
              </p>
              {item.techStack.length > 0 && (
                <div className="mt-4 flex flex-wrap gap-2">
                  {item.techStack.map((tag) => (
                    <span
                      key={tag}
                      className="rounded-md bg-purple-600/80 px-2.5 py-1 text-xs font-semibold text-white"
                    >
                      {tag}
                    </span>
                  ))}
                </div>
              )}
            </div>
          </Link>
        </motion.div>
      ))}
    </div>
  )
}
```

- [ ] **Step 2: Verify no TypeScript errors**

Run: `npx tsc --noEmit --pretty 2>&1 | head -20`
Expected: no errors

- [ ] **Step 3: Commit**

```bash
git add components/site/work-grid.tsx
git commit -m "feat: add WorkGrid client component with scroll animations"
```

---

### Task 2: Wire WorkGrid into WorkSection

**Files:**
- Modify: `components/site/content-sections.tsx:1-8` (imports)
- Modify: `components/site/content-sections.tsx:127-159` (replace card markup)

- [ ] **Step 1: Add WorkGrid import to content-sections.tsx**

In `components/site/content-sections.tsx`, add the import after the existing imports (line 8):

```tsx
import { WorkGrid } from "@/components/site/work-grid"
```

- [ ] **Step 2: Replace the card list with WorkGrid**

In `components/site/content-sections.tsx`, replace the entire `<div>` block at lines 127–159 (the `mx-auto mt-14 flex max-w-6xl flex-col gap-6` div and all its children) with:

```tsx
      <WorkGrid
        items={items.map((item) => ({
          slug: item.slug,
          title: item.title,
          summary: item.summary,
          imageUrl: item.imageUrl,
          techStack: item.techStack,
        }))}
      />
```

- [ ] **Step 3: Remove unused Link import if no longer needed**

Check if `Link` is used elsewhere in `content-sections.tsx`. If not, remove the `import Link from "next/link"` line (line 6).

- [ ] **Step 4: Verify no TypeScript errors**

Run: `npx tsc --noEmit --pretty 2>&1 | head -20`
Expected: no errors

- [ ] **Step 5: Visual check**

Open `http://localhost:3000` and scroll to the Our Work section. Verify:
- Cards display in a 2-column grid on desktop, single column on mobile
- Cards with images show cover image on top, content below
- Cards without images collapse (no image area, just text content)
- Cards fade/slide in as you scroll to the section, staggered ~100ms apart
- Hover brightens border and lifts background
- Image scales subtly on hover
- Clicking a card navigates to `/work/[slug]`

- [ ] **Step 6: Commit**

```bash
git add components/site/content-sections.tsx
git commit -m "feat: replace Our Work card list with animated WorkGrid"
```
