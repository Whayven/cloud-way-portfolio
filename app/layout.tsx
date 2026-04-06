import type { Metadata } from "next"
import { Poppins } from "next/font/google"
import "./globals.css"

const poppins = Poppins({
  subsets: ["latin"],
  weight: ["400", "500", "600", "700"],
  variable: "--font-poppins",
})

export const metadata: Metadata = {
  title: {
    default: "CloudWay — Software Solutions",
    template: "%s — CloudWay",
  },
  description:
    "Elevate your business with cutting-edge software solutions. Design, development, and SEO from CloudWay.",
  metadataBase: new URL("https://cloud-way.dev"),
  openGraph: {
    type: "website",
    locale: "en_US",
    siteName: "CloudWay",
  },
}

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode
}>) {
  return (
    <html lang="en" className={`${poppins.variable} h-full`}>
      <body className="flex min-h-full flex-col bg-cw-light text-cw-dark antialiased dark:bg-cw-dark dark:text-white">
        {children}
      </body>
    </html>
  )
}
