"use client"

import { Children, isValidElement, type ComponentPropsWithoutRef } from "react"
import ReactMarkdown, { type Components } from "react-markdown"
import { slugify } from "@/lib/utils"

function nodeText(children: React.ReactNode): string {
  let out = ""
  Children.forEach(children, (child) => {
    if (typeof child === "string" || typeof child === "number") {
      out += String(child)
    } else if (isValidElement<{ children?: React.ReactNode }>(child)) {
      out += nodeText(child.props.children)
    }
  })
  return out
}

/**
 * Custom `h2` renderer that slugifies the heading text so it matches the
 * TOC entry ids produced by `extractH2Headings`. Duplicate headings are
 * disambiguated in the same order as the TOC helper.
 */
function makeH2Renderer() {
  const taken = new Set<string>()
  return function H2({ children, ...rest }: ComponentPropsWithoutRef<"h2">) {
    const label = nodeText(children)
    const base = slugify(label) || "section"
    let id = base
    let n = 2
    while (taken.has(id)) id = `${base}-${n++}`
    taken.add(id)
    return (
      <h2 id={id} className="scroll-mt-28" {...rest}>
        {children}
      </h2>
    )
  }
}

function Pre({ children }: ComponentPropsWithoutRef<"pre">) {
  // Window-chrome wrapper around fenced code blocks for the design's look.
  return (
    <div className="my-8 overflow-hidden rounded-2xl border border-white/10 bg-cw-dark not-prose">
      <div className="flex items-center justify-between border-b border-white/5 px-4 py-2.5">
        <div className="flex items-center gap-1.5">
          <span className="h-2 w-2 rounded-full bg-red-400/60" />
          <span className="h-2 w-2 rounded-full bg-yellow-400/60" />
          <span className="h-2 w-2 rounded-full bg-green-400/60" />
        </div>
      </div>
      <pre className="overflow-x-auto p-5 font-mono text-[13px] leading-relaxed text-white/85">
        {children}
      </pre>
    </div>
  )
}

export function BlogBody({ content }: { content: string }) {
  const components: Components = {
    h2: makeH2Renderer(),
    pre: Pre,
  }
  return (
    <div
      className={[
        "blog-md prose prose-invert prose-lg max-w-none",
        // Headings
        "prose-headings:font-semibold prose-headings:tracking-tight prose-headings:text-white",
        "prose-h2:mt-16 prose-h2:text-2xl sm:prose-h2:text-3xl prose-h3:mt-8 prose-h3:text-xl",
        // Paragraphs & lists
        "prose-p:text-[17px] prose-p:leading-[1.75] prose-p:text-gray-300",
        "prose-li:text-gray-300 prose-li:marker:text-purple-400",
        // Links
        "prose-a:text-sky-400 prose-a:no-underline hover:prose-a:underline",
        // Bold & emphasis
        "prose-strong:text-white prose-em:text-gray-200",
        // Inline `code` only — see globals.css `.blog-md` (prose-code:* also hits pre>code otherwise)
        "prose-code:text-sky-300 prose-code:text-sm prose-code:font-normal prose-code:before:content-none prose-code:after:content-none",
        // Fenced blocks handled by the custom <Pre /> above; the prose-pre overrides just
        // keep residual prose styling from clobbering our window chrome.
        "prose-pre:bg-transparent prose-pre:border-0 prose-pre:p-0",
        // Blockquotes → pull quote feel
        "prose-blockquote:border-l-2 prose-blockquote:border-purple-400/60 prose-blockquote:pl-6 prose-blockquote:text-xl prose-blockquote:font-medium prose-blockquote:leading-snug prose-blockquote:text-white prose-blockquote:not-italic",
        // Horizontal rules
        "prose-hr:border-white/10",
        // Images
        "prose-img:rounded-xl",
      ].join(" ")}
    >
      <ReactMarkdown components={components}>{content}</ReactMarkdown>
    </div>
  )
}
