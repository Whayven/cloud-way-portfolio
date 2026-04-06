"use client"

import { useCallback, useEffect, useRef, useState } from "react"
import Image from "next/image"
import { PhotoIcon, XMarkIcon } from "@heroicons/react/24/outline"

const ALLOWED_TYPES = ["image/jpeg", "image/png", "image/webp", "image/avif"]
const MAX_SIZE = 5 * 1024 * 1024 // 5 MB

export function ImageUpload({
  prefix,
  defaultValue,
  onChange,
}: {
  prefix: "portfolio" | "blog"
  defaultValue?: string | null
  onChange: (url: string | null) => void
}) {
  const [preview, setPreview] = useState<string | null>(defaultValue ?? null)
  const [uploading, setUploading] = useState(false)
  const [progress, setProgress] = useState(0)
  const [error, setError] = useState<string | null>(null)
  const [dragOver, setDragOver] = useState(false)
  const inputRef = useRef<HTMLInputElement>(null)

  // Clean up object URLs on unmount
  const objectUrlRef = useRef<string | null>(null)
  useEffect(() => {
    return () => {
      if (objectUrlRef.current) URL.revokeObjectURL(objectUrlRef.current)
    }
  }, [])

  const upload = useCallback(
    (file: File) => {
      setError(null)

      if (!ALLOWED_TYPES.includes(file.type)) {
        setError("File type not allowed. Use JPEG, PNG, WebP, or AVIF.")
        return
      }
      if (file.size > MAX_SIZE) {
        setError("File too large. Maximum size is 5 MB.")
        return
      }

      // Show local preview immediately
      if (objectUrlRef.current) URL.revokeObjectURL(objectUrlRef.current)
      const objectUrl = URL.createObjectURL(file)
      objectUrlRef.current = objectUrl
      setPreview(objectUrl)
      setUploading(true)
      setProgress(0)

      const formData = new FormData()
      formData.append("file", file)
      formData.append("prefix", prefix)

      const xhr = new XMLHttpRequest()
      xhr.upload.addEventListener("progress", (e) => {
        if (e.lengthComputable) {
          setProgress(Math.round((e.loaded / e.total) * 100))
        }
      })
      xhr.addEventListener("load", () => {
        setUploading(false)
        if (xhr.status >= 200 && xhr.status < 300) {
          const { url } = JSON.parse(xhr.responseText)
          setPreview(url)
          onChange(url)
        } else {
          const res = JSON.parse(xhr.responseText)
          setError(res.error ?? "Upload failed.")
          setPreview(null)
          onChange(null)
        }
      })
      xhr.addEventListener("error", () => {
        setUploading(false)
        setError("Upload failed. Check your connection.")
        setPreview(null)
        onChange(null)
      })
      xhr.open("POST", "/admin/api/upload")
      xhr.send(formData)
    },
    [prefix, onChange],
  )

  const handleFileSelect = useCallback(
    (e: React.ChangeEvent<HTMLInputElement>) => {
      const file = e.target.files?.[0]
      if (file) upload(file)
      // Reset input so re-selecting the same file triggers onChange
      e.target.value = ""
    },
    [upload],
  )

  const handleDrop = useCallback(
    (e: React.DragEvent) => {
      e.preventDefault()
      setDragOver(false)
      const file = e.dataTransfer.files[0]
      if (file) upload(file)
    },
    [upload],
  )

  const handleRemove = useCallback(() => {
    if (objectUrlRef.current) URL.revokeObjectURL(objectUrlRef.current)
    objectUrlRef.current = null
    setPreview(null)
    setError(null)
    onChange(null)
  }, [onChange])

  if (preview) {
    return (
      <div className="relative">
        <div className="relative aspect-video overflow-hidden rounded-lg border border-white/10">
          <Image
            src={preview}
            alt="Upload preview"
            fill
            className="object-cover"
            sizes="(max-width: 768px) 100vw, 600px"
            unoptimized={preview.startsWith("blob:")}
          />
          {uploading && (
            <div className="absolute inset-0 flex items-center justify-center bg-black/60">
              <div className="w-48">
                <div className="h-2 overflow-hidden rounded-full bg-white/20">
                  <div
                    className="h-full rounded-full bg-sky-400 transition-all duration-300"
                    style={{ width: `${progress}%` }}
                  />
                </div>
                <p className="mt-2 text-center text-sm text-white">
                  {progress}%
                </p>
              </div>
            </div>
          )}
        </div>
        {!uploading && (
          <button
            type="button"
            onClick={handleRemove}
            className="absolute -right-2 -top-2 rounded-full bg-zinc-800 p-1 text-zinc-400 ring-1 ring-white/10 transition-colors hover:bg-red-600 hover:text-white"
          >
            <XMarkIcon className="h-4 w-4" />
          </button>
        )}
        {error && (
          <p className="mt-2 text-sm text-red-400">{error}</p>
        )}
      </div>
    )
  }

  return (
    <div>
      <label
        onDragOver={(e) => {
          e.preventDefault()
          setDragOver(true)
        }}
        onDragLeave={() => setDragOver(false)}
        onDrop={handleDrop}
        className={`flex cursor-pointer flex-col items-center justify-center rounded-lg border-2 border-dashed p-8 transition-colors ${
          dragOver
            ? "border-sky-400 bg-sky-400/5"
            : "border-white/15 hover:border-white/30 hover:bg-white/5"
        }`}
      >
        <PhotoIcon className="h-10 w-10 text-gray-500" />
        <span className="mt-2 text-sm font-medium text-gray-400">
          Drag & drop or click to upload
        </span>
        <span className="mt-1 text-xs text-gray-500">
          JPEG, PNG, WebP, AVIF — max 5 MB
        </span>
        <input
          ref={inputRef}
          type="file"
          accept="image/jpeg,image/png,image/webp,image/avif"
          className="hidden"
          onChange={handleFileSelect}
        />
      </label>
      {error && (
        <p className="mt-2 text-sm text-red-400">{error}</p>
      )}
    </div>
  )
}
