export function SiteFooter() {
  return (
    <footer className="border-t border-gray-200 bg-white py-4 dark:border-gray-700 dark:bg-gray-800">
      <div className="mx-auto flex w-full max-w-[85rem] flex-col items-center justify-between gap-4 px-4 sm:flex-row">
        <svg
          className="h-10 w-20"
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
        <p className="text-center text-sm text-gray-600 dark:text-gray-500">
          © {new Date().getFullYear()} CloudWay. All Rights Reserved.
        </p>
      </div>
    </footer>
  )
}
