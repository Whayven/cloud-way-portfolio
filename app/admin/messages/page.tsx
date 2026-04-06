import { prisma } from "@/lib/db"
import { formatDate } from "@/lib/utils"
import { Heading } from "@/app/_components/catalyst/heading"
import { Text } from "@/app/_components/catalyst/text"
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/app/_components/catalyst/table"

export default async function MessagesPage() {
  const messages = await prisma.contactMessage.findMany({
    select: {
      id: true,
      firstName: true,
      lastName: true,
      email: true,
      company: true,
      message: true,
      createdAt: true,
    },
    orderBy: { createdAt: "desc" },
  })

  return (
    <>
      <Heading>Messages</Heading>
      <Text className="mt-2">Contact form submissions.</Text>
      <Table className="mt-8">
        <TableHead>
          <TableRow>
            <TableHeader>Name</TableHeader>
            <TableHeader>Email</TableHeader>
            <TableHeader>Company</TableHeader>
            <TableHeader>Date</TableHeader>
            <TableHeader>Message</TableHeader>
          </TableRow>
        </TableHead>
        <TableBody>
          {messages.map((msg) => (
            <TableRow key={msg.id} href={`/admin/messages/${msg.id}`}>
              <TableCell className="font-medium">
                {msg.firstName} {msg.lastName}
              </TableCell>
              <TableCell>{msg.email}</TableCell>
              <TableCell>{msg.company ?? "—"}</TableCell>
              <TableCell>
                {formatDate(msg.createdAt)}
              </TableCell>
              <TableCell className="max-w-xs truncate">
                {msg.message}
              </TableCell>
            </TableRow>
          ))}
          {messages.length === 0 && (
            <TableRow>
              <TableCell colSpan={5} className="text-center text-zinc-500">
                No messages yet.
              </TableCell>
            </TableRow>
          )}
        </TableBody>
      </Table>
    </>
  )
}
