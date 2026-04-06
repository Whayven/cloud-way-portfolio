"use client"

import { useState } from "react"
import { XMarkIcon } from "@heroicons/react/20/solid"

const typeStyles = {
  info: "bg-sky-500/90 text-white",
  warning: "bg-amber-500/90 text-amber-950",
  success: "bg-emerald-500/90 text-white",
}

export function DismissibleBanner({
  id,
  title,
  body,
  type,
}: {
  id: string
  title: string
  body: string
  type: "info" | "warning" | "success"
}) {
  const [dismissed, setDismissed] = useState(false)

  if (dismissed) return null

  return (
    <div className={`${typeStyles[type]} backdrop-blur-sm`}>
      <div className="mx-auto flex max-w-6xl items-center gap-4 px-6 py-3 sm:px-8 lg:px-10">
        <div className="min-w-0 flex-1">
          <p className="text-sm font-semibold">{title}</p>
          <p className="mt-0.5 text-sm opacity-90">{body}</p>
        </div>
        <button
          type="button"
          onClick={() => setDismissed(true)}
          className="shrink-0 rounded-md p-1 opacity-70 transition-opacity hover:opacity-100"
          aria-label="Dismiss announcement"
        >
          <XMarkIcon className="size-5" />
        </button>
      </div>
    </div>
  )
}
