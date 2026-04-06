export function SiteFooter() {
  return (
    <footer className="border-t border-white/10 py-8">
      <div className="mx-auto flex w-full max-w-6xl flex-col items-center justify-between gap-6 px-6 sm:flex-row sm:px-8">
        <div className="flex items-center gap-2.5">
          <svg
            className="h-6 w-6"
            viewBox="0 0 24 24"
            fill="url(#cwFooterGradient)"
            xmlns="http://www.w3.org/2000/svg"
          >
            <defs>
              <linearGradient
                id="cwFooterGradient"
                x1="0%"
                y1="0%"
                x2="100%"
                y2="100%"
              >
                <stop offset="0%" stopColor="#ffffff" />
                <stop offset="100%" stopColor="#a855f7" />
              </linearGradient>
            </defs>
            <path d="M19.35 10.04A7.49 7.49 0 0 0 12 4C9.11 4 6.6 5.64 5.35 8.04A5.994 5.994 0 0 0 0 14c0 3.31 2.69 6 6 6h13c2.76 0 5-2.24 5-5 0-2.64-2.05-4.78-4.65-4.96z" />
          </svg>
          <span className="bg-linear-to-r from-white to-purple-400 bg-clip-text text-lg font-semibold tracking-tight text-transparent">
            CloudWay
          </span>
        </div>
        <p className="text-center text-sm text-gray-500">
          &copy; {new Date().getFullYear()} CloudWay. All rights reserved.
        </p>
      </div>
    </footer>
  );
}
