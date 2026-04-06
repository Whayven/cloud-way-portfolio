"use client"

import ReactMarkdown from "react-markdown"

export function BlogBody({ content }: { content: string }) {
  return (
    <div className="prose prose-invert prose-lg max-w-none prose-headings:text-white prose-p:text-gray-300 prose-a:text-sky-400 prose-a:no-underline hover:prose-a:underline prose-strong:text-white prose-code:text-sky-300 prose-code:bg-white/10 prose-code:rounded prose-code:px-1.5 prose-code:py-0.5 prose-pre:bg-white/5 prose-pre:border prose-pre:border-white/10 prose-blockquote:border-sky-400/50 prose-blockquote:text-gray-400">
      <ReactMarkdown>{content}</ReactMarkdown>
    </div>
  )
}
