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
import { DeletePortfolioButton } from "../_components/delete-portfolio-button"

export default async function PortfolioListPage() {
  const items = await prisma.portfolioItem.findMany({
    select: {
      id: true,
      title: true,
      status: true,
      sortOrder: true,
      updatedAt: true,
    },
    orderBy: { sortOrder: "asc" },
  })

  return (
    <>
      <div className="flex items-center justify-between">
        <Heading>Portfolio</Heading>
        <Button href="/admin/portfolio/new">New Item</Button>
      </div>
      <Table className="mt-8">
        <TableHead>
          <TableRow>
            <TableHeader>Title</TableHeader>
            <TableHeader>Status</TableHeader>
            <TableHeader>Sort</TableHeader>
            <TableHeader>Updated</TableHeader>
            <TableHeader className="text-right">Actions</TableHeader>
          </TableRow>
        </TableHead>
        <TableBody>
          {items.map((item) => (
            <TableRow key={item.id}>
              <TableCell className="font-medium">{item.title}</TableCell>
              <TableCell>
                <Badge color={item.status === "published" ? "green" : "zinc"}>
                  {item.status}
                </Badge>
              </TableCell>
              <TableCell>{item.sortOrder}</TableCell>
              <TableCell>
                {formatDate(item.updatedAt)}
              </TableCell>
              <TableCell className="text-right">
                <div className="flex justify-end gap-2">
                  <Button href={`/admin/portfolio/${item.id}/edit`} outline>
                    <PencilSquareIcon />
                    Edit
                  </Button>
                  <DeletePortfolioButton id={item.id} title={item.title} />
                </div>
              </TableCell>
            </TableRow>
          ))}
          {items.length === 0 && (
            <TableRow>
              <TableCell colSpan={5} className="text-center text-zinc-500">
                No portfolio items yet. Create your first one!
              </TableCell>
            </TableRow>
          )}
        </TableBody>
      </Table>
    </>
  )
}
