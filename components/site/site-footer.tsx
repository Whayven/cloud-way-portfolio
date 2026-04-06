export function SiteFooter() {
  return (
    <footer className="border-t border-white/10 py-8">
      <div className="mx-auto flex w-full max-w-6xl flex-col items-center justify-between gap-6 px-6 sm:flex-row sm:px-8">
        <span className="text-lg font-semibold tracking-tight text-white/80">
          Cloud<span className="text-accent-sky-light">Way</span>
        </span>
        <p className="text-center text-sm text-gray-500">
          &copy; {new Date().getFullYear()} CloudWay. All rights reserved.
        </p>
      </div>
    </footer>
  )
}
