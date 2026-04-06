"use client"

import { useState } from "react"
import {
  Dialog,
  DialogActions,
  DialogDescription,
  DialogTitle,
} from "@/app/_components/catalyst/dialog"
import { Button } from "@/app/_components/catalyst/button"

export function DeleteDialog({
  title,
  description,
  id,
  action,
  children,
}: {
  title: string
  description: string
  id: string
  action: (formData: FormData) => void
  children: (handleOpen: () => void) => React.ReactNode
}) {
  const [isOpen, setIsOpen] = useState(false)

  return (
    <>
      {children(() => setIsOpen(true))}
      <Dialog open={isOpen} onClose={() => setIsOpen(false)}>
        <DialogTitle>{title}</DialogTitle>
        <DialogDescription>{description}</DialogDescription>
        <DialogActions>
          <Button plain onClick={() => setIsOpen(false)}>
            Cancel
          </Button>
          <form action={action} onSubmit={() => setIsOpen(false)}>
            <input type="hidden" name="id" value={id} />
            <Button type="submit" color="red">
              Delete
            </Button>
          </form>
        </DialogActions>
      </Dialog>
    </>
  )
}
