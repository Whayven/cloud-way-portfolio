export const AUTHOR = {
  name: "Wayne Foster Jr",
  initials: "WF",
  role: "Full-stack developer",
  bio: "Full-stack applications, AI features, and cloud architecture — my notes on the software I build day to day, and my journey as a developer.",
}

export function AuthorAvatar({ className }: { className: string }) {
  return (
    <span
      aria-hidden
      className={`flex shrink-0 items-center justify-center rounded-full bg-linear-135 from-purple-500 to-pink-500 font-semibold text-white ${className}`}
    >
      {AUTHOR.initials}
    </span>
  )
}
