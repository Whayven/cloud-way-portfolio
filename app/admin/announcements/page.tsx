import { prisma } from "@/lib/db"
import { formatDate } from "@/lib/utils"
import { Heading } from "@/app/_components/catalyst/heading"
import { Button } from "@/app/_components/catalyst/button"
import { Badge } from "@/app/_components/catalyst/badge"
import { PencilSquareIcon } from "@heroicons/react/20/solid"
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/app/_components/catalyst/table"
import { DeleteAnnouncementButton } from "../_components/delete-announcement-button"

const typeBadgeColor = {
  info: "sky" as const,
  warning: "amber" as const,
  success: "green" as const,
}

export default async function AnnouncementsListPage() {
  const items = await prisma.announcement.findMany({
    select: {
      id: true,
      title: true,
      type: true,
      status: true,
      expiresAt: true,
      updatedAt: true,
    },
    orderBy: { createdAt: "desc" },
  })

  return (
    <>
      <div className="flex items-center justify-between">
        <Heading>Announcements</Heading>
        <Button href="/admin/announcements/new">New Announcement</Button>
      </div>
      <Table className="mt-8">
        <TableHead>
          <TableRow>
            <TableHeader>Title</TableHeader>
            <TableHeader>Type</TableHeader>
            <TableHeader>Status</TableHeader>
            <TableHeader>Expires</TableHeader>
            <TableHeader>Updated</TableHeader>
            <TableHeader className="text-right">Actions</TableHeader>
          </TableRow>
        </TableHead>
        <TableBody>
          {items.map((item) => (
            <TableRow key={item.id}>
              <TableCell className="font-medium">{item.title}</TableCell>
              <TableCell>
                <Badge color={typeBadgeColor[item.type]}>{item.type}</Badge>
              </TableCell>
              <TableCell>
                <Badge color={item.status === "published" ? "green" : "zinc"}>
                  {item.status}
                </Badge>
              </TableCell>
              <TableCell>
                {item.expiresAt ? formatDate(item.expiresAt) : "—"}
              </TableCell>
              <TableCell>{formatDate(item.updatedAt)}</TableCell>
              <TableCell className="text-right">
                <div className="flex justify-end gap-2">
                  <Button
                    href={`/admin/announcements/${item.id}/edit`}
                    outline
                  >
                    <PencilSquareIcon />
                    Edit
                  </Button>
                  <DeleteAnnouncementButton id={item.id} title={item.title} />
                </div>
              </TableCell>
            </TableRow>
          ))}
          {items.length === 0 && (
            <TableRow>
              <TableCell colSpan={6} className="text-center text-zinc-500">
                No announcements yet. Create your first one!
              </TableCell>
            </TableRow>
          )}
        </TableBody>
      </Table>
    </>
  )
}
