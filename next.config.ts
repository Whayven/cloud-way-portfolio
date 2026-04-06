import type { NextConfig } from "next"

const nextConfig: NextConfig = {
  experimental: {
    authInterrupts: true,
  },
  serverExternalPackages: ["@prisma/adapter-pg", "pg"],
}

export default nextConfig
