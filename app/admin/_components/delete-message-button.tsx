"use client"

import { deleteMessage } from "@/app/actions/messages"
import { Button } from "@/app/_components/catalyst/button"
import { DeleteDialog } from "./delete-dialog"

export function DeleteMessageButton({ id }: { id: string }) {
  return (
    <DeleteDialog
      title="Delete message"
      description="Are you sure you want to delete this message? This action cannot be undone."
      id={id}
      action={deleteMessage}
    >
      {(open) => (
        <Button color="red" type="button" onClick={open}>
          Delete
        </Button>
      )}
    </DeleteDialog>
  )
}
