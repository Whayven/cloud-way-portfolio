export function slugify(text: string): string {
  return text
    .toLowerCase()
    .replace(/[^\w\s-]/g, "")
    .replace(/\s+/g, "-")
    .replace(/-+/g, "-")
    .trim()
}

export function formatDate(date: Date): string {
  return date.toLocaleDateString("en-US", {
    month: "short",
    day: "numeric",
    year: "numeric",
  })
}

/** Estimate reading time in whole minutes from a body of prose. */
export function readingTime(text: string): number {
  const words = text.trim().split(/\s+/).filter(Boolean).length
  return Math.max(1, Math.round(words / 220))
}

/**
 * Extract level-2 markdown headings as {id, label} pairs for a table of
 * contents. Ignores headings inside fenced code blocks.
 */
export function extractH2Headings(markdown: string): Array<{ id: string; label: string }> {
  const entries: Array<{ id: string; label: string }> = []
  const taken = new Set<string>()
  let inFence = false
  for (const raw of markdown.split("\n")) {
    const line = raw.trimEnd()
    if (/^```/.test(line)) {
      inFence = !inFence
      continue
    }
    if (inFence) continue
    const m = /^##\s+(.+?)\s*#*$/.exec(line)
    if (!m) continue
    const label = m[1].trim()
    const base = slugify(label) || "section"
    let id = base
    let n = 2
    while (taken.has(id)) id = `${base}-${n++}`
    taken.add(id)
    entries.push({ id, label })
  }
  return entries
}
