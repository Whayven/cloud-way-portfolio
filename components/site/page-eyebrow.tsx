export function PageEyebrow({ children }: { children: React.ReactNode }) {
  return (
    <div className="mb-6 inline-flex flex-nowrap items-center gap-2.5 whitespace-nowrap">
      <span className="h-px w-8 shrink-0 bg-linear-to-r from-transparent to-purple-400/60" />
      <span className="whitespace-nowrap text-[10px] font-medium uppercase tracking-[0.3em] text-purple-300/80">
        {children}
      </span>
      <span className="h-px w-8 shrink-0 bg-linear-to-l from-transparent to-purple-400/60" />
    </div>
  )
}
