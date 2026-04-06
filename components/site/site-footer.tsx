export function SiteFooter() {
  return (
    <footer className="border-t border-gray-200/80 bg-cw-light/90 py-8 dark:border-white/10 dark:bg-cw-dark/90">
      <div className="mx-auto flex w-full max-w-6xl flex-col items-center justify-between gap-6 px-6 sm:flex-row sm:px-8">
        <svg
          className="h-10 w-20 shrink-0 opacity-90"
          viewBox="0 0 100 50"
          fill="none"
          xmlns="http://www.w3.org/2000/svg"
          aria-hidden
        >
          <defs>
            <linearGradient
              id="nebulaGradientFooter"
              x1="0%"
              y1="0%"
              x2="100%"
              y2="100%"
            >
              <stop offset="0%" stopColor="white" />
              <stop offset="50%" stopColor="skyblue" />
              <stop offset="100%" stopColor="purple" />
            </linearGradient>
          </defs>
          <text
            x="5"
            y="30"
            fontFamily="Arial, sans-serif"
            fontSize="30"
            fill="none"
            stroke="url(#nebulaGradientFooter)"
            strokeWidth="2"
          >
            CW
          </text>
        </svg>
        <p className="text-center text-sm text-gray-500 dark:text-gray-500">
          © {new Date().getFullYear()} CloudWay. All rights reserved.
        </p>
      </div>
    </footer>
  )
}
