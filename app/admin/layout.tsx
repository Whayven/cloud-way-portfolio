import { verifySession } from "@/lib/auth"
import { unauthorized } from "next/navigation"
import { AdminShell } from "./_components/admin-shell"

export default async function AdminLayout({
  children,
}: {
  children: React.ReactNode
}) {
  const session = await verifySession()
  if (!session) unauthorized()

  return <AdminShell>{children}</AdminShell>
}
