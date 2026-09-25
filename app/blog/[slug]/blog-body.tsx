import { Children, isValidElement, type ReactNode } from "react"
import ReactMarkdown, { type Components } from "react-markdown"
import { slugify } from "@/lib/utils"

function textOf(node: ReactNode): string {
  if (typeof node === "string" || typeof node === "number") return String(node)
  if (isValidElement<{ children?: ReactNode }>(node)) return textOf(node.props.children)
  return Children.toArray(node).map(textOf).join("")
}

type HastCode = {
  properties?: { className?: unknown }
  data?: { meta?: string | null }
}

/** Label for a fenced block's window chrome: `title="…"`, a bare filename, or the language. */
function codeLabel(pre: { children?: unknown[] } | undefined): string {
  const code = pre?.children?.[0] as HastCode | undefined
  const meta = code?.data?.meta?.trim()
  const title = meta?.match(/title="([^"]+)"/)?.[1] ?? meta?.split(/\s+/)[0]
  const classes = Array.isArray(code?.properties?.className) ? code.properties.className : []
  const lang = classes
    .map(String)
    .find((c) => c.startsWith("language-"))
    ?.slice("language-".length)
  return title || lang || "code"
}

/**
 * H2 renderer that gives every heading a unique, text-derived id: repeats get
 * `-1`, `-2`… suffixes and empty headings fall back to `section`. Create one
 * per render so the counts start fresh for each article.
 */
function makeH2(): Components["h2"] {
  const seen = new Map<string, number>()
  return function H2({ children }) {
    const base = slugify(textOf(children)) || "section"
    const n = seen.get(base) ?? 0
    seen.set(base, n + 1)
    return (
      <h2
        id={n ? `${base}-${n}` : base}
        data-h2
        className="mt-16 scroll-mt-28 text-[30px] font-semibold leading-tight tracking-[-0.03em] text-white"
      >
        {children}
      </h2>
    )
  }
}

const components: Components = {
  h3: ({ children }) => (
    <h3 className="mt-10 text-[22px] font-semibold tracking-[-0.02em] text-white">{children}</h3>
  ),
  p: ({ children }) => (
    <p className="mt-6 text-[17px] leading-[1.75] text-gray-300" style={{ textWrap: "pretty" }}>
      {children}
    </p>
  ),
  ul: ({ children }) => (
    <ul className="mt-6 list-disc space-y-2 pl-6 text-[17px] leading-[1.75] text-gray-300 marker:text-purple-400 [&_p]:mt-0">
      {children}
    </ul>
  ),
  ol: ({ children }) => (
    <ol className="mt-6 list-decimal space-y-2 pl-6 text-[17px] leading-[1.75] text-gray-300 marker:text-purple-400 [&_p]:mt-0">
      {children}
    </ol>
  ),
  a: ({ href, children }) => {
    const external = href ? /^https?:\/\//.test(href) : false
    return (
      <a
        href={href}
        target={external ? "_blank" : undefined}
        rel={external ? "noopener noreferrer" : undefined}
        className="text-sky-400 underline-offset-4 hover:underline"
      >
        {children}
      </a>
    )
  },
  strong: ({ children }) => <strong className="font-semibold text-white">{children}</strong>,
  em: ({ children }) => <em className="text-gray-200">{children}</em>,
  blockquote: ({ children }) => (
    <blockquote className="relative mt-10 border-l-2 border-purple-400/60 py-1 pl-6 text-[22px] font-medium leading-[1.4] tracking-[-0.015em] text-white [&_p]:mt-0 [&_p]:text-[22px] [&_p]:leading-[1.4] [&_p]:text-white">
      {children}
    </blockquote>
  ),
  hr: () => <hr className="my-12 border-white/10" />,
  code: ({ children }) => (
    <code className="rounded-md bg-white/10 px-1.5 py-0.5 font-mono text-[0.875em] text-sky-300 [overflow-wrap:anywhere]">
      {children}
    </code>
  ),
  pre: ({ node, children }) => (
    <div className="mt-8 overflow-hidden rounded-[18px] border border-white/10 bg-cw-dark shadow-[0_30px_60px_-30px_rgba(168,85,247,0.35)]">
      <div className="flex items-center justify-between border-b border-white/5 px-4 py-2.5">
        <div className="flex gap-1.5" aria-hidden>
          <span className="h-2 w-2 rounded-full bg-red-400/60" />
          <span className="h-2 w-2 rounded-full bg-yellow-400/60" />
          <span className="h-2 w-2 rounded-full bg-green-400/60" />
        </div>
        <span className="font-mono text-[11px] text-white/35">{codeLabel(node)}</span>
      </div>
      <pre className="m-0 overflow-x-auto p-5 font-mono text-[13px] leading-[1.7] text-white/85 [&_code]:rounded-none [&_code]:bg-transparent [&_code]:p-0 [&_code]:text-[length:inherit] [&_code]:text-inherit">
        {children}
      </pre>
    </div>
  ),
}

export function BlogBody({ content }: { content: string }) {
  return (
    <div className="[&>:first-child]:mt-0 [&_img]:mt-8 [&_img]:rounded-xl">
      <ReactMarkdown components={{ ...components, h2: makeH2() }}>{content}</ReactMarkdown>
    </div>
  )
}
