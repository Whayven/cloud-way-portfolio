"use client";

import Link from "next/link";
import { useEffect, useState } from "react";

const nav = [
  { href: "/", label: "Home" },
  { href: "/work", label: "Work" },
  { href: "/blog", label: "Blog" },
] as const;

export function SiteHeader() {
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 50);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  return (
    <header
      className={`sticky top-0 z-50 w-full transition-all duration-300 ${
        scrolled
          ? "border-b border-white/10 bg-cw-dark/70 backdrop-blur-md"
          : "border-b border-transparent bg-transparent"
      }`}
    >
      <nav
        className="mx-auto flex w-full max-w-[85rem] items-center justify-between px-6 py-5 sm:px-10"
        aria-label="Global"
      >
        <Link href="/" className="flex shrink-0 items-center gap-2.5">
          {/* Cloud icon */}
          <svg
            className="h-8 w-8"
            viewBox="0 0 24 24"
            fill="url(#cwNavGradient)"
            xmlns="http://www.w3.org/2000/svg"
          >
            <defs>
              <linearGradient
                id="cwNavGradient"
                x1="0%"
                y1="0%"
                x2="100%"
                y2="100%"
              >
                <stop offset="0%" stopColor="#38bdf8" />
                <stop offset="100%" stopColor="#d946ef" />
              </linearGradient>
            </defs>
            <path d="M19.35 10.04A7.49 7.49 0 0 0 12 4C9.11 4 6.6 5.64 5.35 8.04A5.994 5.994 0 0 0 0 14c0 3.31 2.69 6 6 6h13c2.76 0 5-2.24 5-5 0-2.64-2.05-4.78-4.65-4.96z" />
          </svg>
          <span className="bg-clip-text text-lg font-semibold tracking-tight text-cw-light">
            CloudWay
          </span>
        </Link>

        <ul className="flex items-center gap-1 sm:gap-2">
          {nav.map((item) => (
            <li key={item.href}>
              <Link
                href={item.href}
                className="rounded-lg px-4 py-2 text-sm font-medium text-gray-300 transition-colors hover:text-white"
              >
                {item.label}
              </Link>
            </li>
          ))}
        </ul>
      </nav>
    </header>
  );
}
