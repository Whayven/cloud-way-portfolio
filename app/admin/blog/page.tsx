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
import { DeletePostButton } from "../_components/delete-post-button"

export default async function BlogListPage() {
  const posts = await prisma.blogPost.findMany({
    select: {
      id: true,
      title: true,
      status: true,
      publishedAt: true,
      updatedAt: true,
    },
    orderBy: { createdAt: "desc" },
  })

  return (
    <>
      <div className="flex items-center justify-between">
        <Heading>Blog</Heading>
        <Button href="/admin/blog/new">New Post</Button>
      </div>
      <Table className="mt-8">
        <TableHead>
          <TableRow>
            <TableHeader>Title</TableHeader>
            <TableHeader>Status</TableHeader>
            <TableHeader>Published</TableHeader>
            <TableHeader>Updated</TableHeader>
            <TableHeader className="text-right">Actions</TableHeader>
          </TableRow>
        </TableHead>
        <TableBody>
          {posts.map((post) => (
            <TableRow key={post.id}>
              <TableCell className="font-medium">{post.title}</TableCell>
              <TableCell>
                <Badge color={post.status === "published" ? "green" : "zinc"}>
                  {post.status}
                </Badge>
              </TableCell>
              <TableCell>
                {post.publishedAt ? formatDate(post.publishedAt) : "—"}
              </TableCell>
              <TableCell>{formatDate(post.updatedAt)}</TableCell>
              <TableCell className="text-right">
                <div className="flex justify-end gap-2">
                  <Button href={`/admin/blog/${post.id}/edit`} outline>
                    <PencilSquareIcon />
                    Edit
                  </Button>
                  <DeletePostButton id={post.id} title={post.title} />
                </div>
              </TableCell>
            </TableRow>
          ))}
          {posts.length === 0 && (
            <TableRow>
              <TableCell colSpan={5} className="text-center text-zinc-500">
                No blog posts yet. Create your first one!
              </TableCell>
            </TableRow>
          )}
        </TableBody>
      </Table>
    </>
  )
}
