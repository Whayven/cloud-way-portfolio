"use client"

import ReactMarkdown from "react-markdown"

export function BlogBody({ content }: { content: string }) {
  return (
    <div
      className={[
        "blog-md prose prose-invert prose-lg max-w-none",
        // Headings
        "prose-headings:font-semibold prose-headings:tracking-tight prose-headings:text-white",
        "prose-h2:mt-10 prose-h2:text-2xl prose-h3:mt-8 prose-h3:text-xl",
        // Paragraphs & lists
        "prose-p:text-gray-300 prose-p:leading-relaxed",
        "prose-li:text-gray-300 prose-li:marker:text-purple-400",
        // Links
        "prose-a:text-sky-400 prose-a:no-underline hover:prose-a:underline",
        // Bold & emphasis
        "prose-strong:text-white prose-em:text-gray-200",
        // Inline `code` only — see globals.css `.blog-md` (prose-code:* also hits pre>code otherwise)
        "prose-code:text-sky-300 prose-code:text-sm prose-code:font-normal prose-code:before:content-none prose-code:after:content-none",
        // Fenced blocks: uniform <pre> surface; inner <code> must not use inline-code pill styles
        "prose-pre:bg-white/5 prose-pre:border prose-pre:border-white/10 prose-pre:rounded-xl prose-pre:text-sm prose-pre:text-gray-200",
        // Blockquotes
        "prose-blockquote:border-purple-400/50 prose-blockquote:text-gray-400 prose-blockquote:font-normal prose-blockquote:not-italic",
        // Horizontal rules
        "prose-hr:border-white/10",
        // Images
        "prose-img:rounded-xl",
      ].join(" ")}
    >
      <ReactMarkdown>{content}</ReactMarkdown>
    </div>
  )
}
