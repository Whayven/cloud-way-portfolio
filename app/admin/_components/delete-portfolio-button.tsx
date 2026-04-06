"use client"

import { deletePortfolio } from "@/app/actions/portfolio"
import { Button } from "@/app/_components/catalyst/button"
import { TrashIcon } from "@heroicons/react/20/solid"
import { DeleteDialog } from "./delete-dialog"

export function DeletePortfolioButton({
  id,
  title,
}: {
  id: string
  title: string
}) {
  return (
    <DeleteDialog
      title="Delete portfolio item"
      description={`Are you sure you want to delete "${title}"? This action cannot be undone.`}
      id={id}
      action={deletePortfolio}
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
