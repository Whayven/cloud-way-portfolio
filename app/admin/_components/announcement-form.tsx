"use client"

import { useActionState } from "react"
import {
  createAnnouncement,
  updateAnnouncement,
  type AnnouncementFormState,
} from "@/app/actions/announcements"
import type { Announcement } from "@/lib/generated/prisma/client"
import { Heading } from "@/app/_components/catalyst/heading"
import {
  Field,
  FieldGroup,
  Fieldset,
  Label,
  Description,
  ErrorMessage,
} from "@/app/_components/catalyst/fieldset"
import { Input } from "@/app/_components/catalyst/input"
import { Textarea } from "@/app/_components/catalyst/textarea"
import { Select } from "@/app/_components/catalyst/select"
import { Button } from "@/app/_components/catalyst/button"
import { Text } from "@/app/_components/catalyst/text"

const initialState: AnnouncementFormState = { success: false }

function toDatetimeLocal(date: Date | null | undefined): string {
  if (!date) return ""
  const d = new Date(date)
  d.setMinutes(d.getMinutes() - d.getTimezoneOffset())
  return d.toISOString().slice(0, 16)
}

export function AnnouncementForm({ item }: { item?: Announcement }) {
  const isEdit = !!item
  const action = isEdit ? updateAnnouncement : createAnnouncement
  const [state, formAction, pending] = useActionState(action, initialState)

  return (
    <>
      <Heading>
        {isEdit ? "Edit Announcement" : "New Announcement"}
      </Heading>
      {state.error && (
        <Text className="mt-4 !text-red-500">{state.error}</Text>
      )}
      <form action={formAction} className="mt-8">
        {isEdit && <input type="hidden" name="id" value={item.id} />}
        <Fieldset>
          <FieldGroup>
            <Field>
              <Label>Title</Label>
              <Input name="title" defaultValue={item?.title} required />
              {state.fieldErrors?.title && (
                <ErrorMessage>{state.fieldErrors.title}</ErrorMessage>
              )}
            </Field>
            <Field>
              <Label>Body</Label>
              <Textarea
                name="body"
                defaultValue={item?.body}
                rows={4}
                required
              />
              {state.fieldErrors?.body && (
                <ErrorMessage>{state.fieldErrors.body}</ErrorMessage>
              )}
            </Field>
            <div className="grid gap-6 sm:grid-cols-3">
              <Field>
                <Label>Type</Label>
                <Select name="type" defaultValue={item?.type ?? "info"}>
                  <option value="info">Info</option>
                  <option value="warning">Warning</option>
                  <option value="success">Success</option>
                </Select>
              </Field>
              <Field>
                <Label>Status</Label>
                <Select name="status" defaultValue={item?.status ?? "draft"}>
                  <option value="draft">Draft</option>
                  <option value="published">Published</option>
                </Select>
              </Field>
              <Field>
                <Label>Expires At</Label>
                <Input
                  name="expiresAt"
                  type="datetime-local"
                  defaultValue={toDatetimeLocal(item?.expiresAt)}
                />
                <Description>Optional. Leave empty for no expiry.</Description>
              </Field>
            </div>
          </FieldGroup>
        </Fieldset>
        <div className="mt-8 flex gap-4">
          <Button type="submit" disabled={pending}>
            {pending
              ? "Saving..."
              : isEdit
                ? "Update Announcement"
                : "Create Announcement"}
          </Button>
          <Button href="/admin/announcements" plain>
            Cancel
          </Button>
        </div>
      </form>
    </>
  )
}
