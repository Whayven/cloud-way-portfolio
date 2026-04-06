"use client"

import { deletePost } from "@/app/actions/blog"
import { Button } from "@/app/_components/catalyst/button"
import { TrashIcon } from "@heroicons/react/20/solid"
import { DeleteDialog } from "./delete-dialog"

export function DeletePostButton({
  id,
  title,
}: {
  id: string
  title: string
}) {
  return (
    <DeleteDialog
      title="Delete blog post"
      description={`Are you sure you want to delete "${title}"? This action cannot be undone.`}
      id={id}
      action={deletePost}
    >
      {(open) => (
        <Button color="red" type="button" onClick={open}>
          <TrashIcon />
          Delete
        </Button>
      )}
    </DeleteDialog>
  )
}
