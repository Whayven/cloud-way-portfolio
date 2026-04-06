# Our Work Section Rework

## Summary

Rework the "Our Work" section on the home page with vertical image cards in a 2-column grid and staggered scroll-in animations.

## Current State

- `components/site/content-sections.tsx` — `WorkSection` server component fetches published portfolio items from DB
- Current layout: full-width horizontal cards (title panel left, details right), no images, no animation
- `motion` (v12) already installed

## Design

### Layout

- 2-column grid on `md:+`, single column on mobile
- `max-w-6xl` centered, consistent with current section width
- `gap-6` between cards

### Card Structure

Each card is a `<Link>` to `/work/[slug]` wrapping:

1. **Image area** (conditional): if `item.imageUrl` exists, render `next/image` with `aspect-[2/1]`, `object-cover`, rounded top corners. If no image, this area is omitted entirely (card collapses to text-only).
2. **Content area** (`p-6`):
   - Tech stack pills: `bg-purple-600/80 text-white text-xs font-semibold rounded-md px-2.5 py-1`
   - Title: `text-lg font-semibold text-white`, with `GradientText subtle` on hover via group
   - Summary: `text-sm text-gray-400`

### Card Styling

- `rounded-2xl border border-white/10 bg-white/[0.03]`
- Hover: `border-purple-400/20 bg-white/[0.06]`, transition 300ms
- Image hover: subtle scale (`group-hover:scale-105`, 500ms ease)

### Animation

- Client component wrapper receives portfolio items as props
- Uses `motion/react` for staggered scroll entrance
- Each card: `opacity 0→1`, `translateY 24px→0`, duration ~500ms, ease out
- Stagger: ~100ms between cards
- Triggered when section enters viewport (`whileInView` with `once: true`)

### Architecture

- `WorkSection` (server component) stays in `content-sections.tsx` — fetches data, renders heading/lead text
- New `WorkGrid` client component in `components/site/work-grid.tsx` — receives items as props, handles animation and card rendering
- Data shape passed to client: `{ slug, title, summary, imageUrl, techStack }[]`

## Out of Scope

- Hover reveal overlays
- Horizontal scroll carousel
- Badge/CVA dependencies
