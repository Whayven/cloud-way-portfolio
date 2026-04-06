"use client"

import { useActionState, useCallback, useState } from "react"
import {
  createPortfolio,
  updatePortfolio,
  type PortfolioFormState,
} from "@/app/actions/portfolio"
import { slugify } from "@/lib/utils"
import type { PortfolioItem } from "@/lib/generated/prisma/client"
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

const initialState: PortfolioFormState = { success: false }

export function PortfolioForm({ item }: { item?: PortfolioItem }) {
  const isEdit = !!item
  const action = isEdit ? updatePortfolio : createPortfolio
  const [state, formAction, pending] = useActionState(action, initialState)
  const [slug, setSlug] = useState(item?.slug ?? "")

  const handleTitleBlur = useCallback(
    (e: React.FocusEvent<HTMLInputElement>) => {
      if (!slug) {
        setSlug(slugify(e.target.value))
      }
    },
    [slug],
  )

  return (
    <>
      <Heading>{isEdit ? "Edit Portfolio Item" : "New Portfolio Item"}</Heading>
      {state.error && (
        <Text className="mt-4 !text-red-500">{state.error}</Text>
      )}
      <form action={formAction} className="mt-8">
        {isEdit && <input type="hidden" name="id" value={item.id} />}
        <Fieldset>
          <FieldGroup>
            <div className="grid gap-6 sm:grid-cols-2">
              <Field>
                <Label>Title</Label>
                <Input
                  name="title"
                  defaultValue={item?.title}
                  onBlur={handleTitleBlur}
                  required
                />
                {state.fieldErrors?.title && (
                  <ErrorMessage>{state.fieldErrors.title}</ErrorMessage>
                )}
              </Field>
              <Field>
                <Label>Slug</Label>
                <Input
                  name="slug"
                  value={slug}
                  onChange={(e) => setSlug(e.target.value)}
                />
                <Description>Auto-generated from title if empty.</Description>
                {state.fieldErrors?.slug && (
                  <ErrorMessage>{state.fieldErrors.slug}</ErrorMessage>
                )}
              </Field>
            </div>
            <Field>
              <Label>Summary</Label>
              <Textarea
                name="summary"
                defaultValue={item?.summary}
                rows={2}
                required
              />
              {state.fieldErrors?.summary && (
                <ErrorMessage>{state.fieldErrors.summary}</ErrorMessage>
              )}
            </Field>
            <Field>
              <Label>Body</Label>
              <Textarea
                name="body"
                defaultValue={item?.body ?? ""}
                rows={8}
              />
              <Description>Optional detailed description.</Description>
            </Field>
            <div className="grid gap-6 sm:grid-cols-2">
              <Field>
                <Label>External URL</Label>
                <Input
                  name="externalUrl"
                  type="url"
                  defaultValue={item?.externalUrl ?? ""}
                  placeholder="https://..."
                />
              </Field>
              <Field>
                <Label>Image URL</Label>
                <Input
                  name="imageUrl"
                  type="url"
                  defaultValue={item?.imageUrl ?? ""}
                  placeholder="https://..."
                />
              </Field>
            </div>
            <div className="grid gap-6 sm:grid-cols-3">
              <Field>
                <Label>Tech Stack</Label>
                <Input
                  name="techStack"
                  defaultValue={item?.techStack.join(", ")}
                  placeholder="React, TypeScript, ..."
                />
                <Description>Comma-separated.</Description>
              </Field>
              <Field>
                <Label>Sort Order</Label>
                <Input
                  name="sortOrder"
                  type="number"
                  defaultValue={item?.sortOrder ?? 0}
                />
              </Field>
              <Field>
                <Label>Status</Label>
                <Select name="status" defaultValue={item?.status ?? "draft"}>
                  <option value="draft">Draft</option>
                  <option value="published">Published</option>
                </Select>
              </Field>
            </div>
          </FieldGroup>
        </Fieldset>
        <div className="mt-8 flex gap-4">
          <Button type="submit" disabled={pending}>
            {pending
              ? "Saving..."
              : isEdit
                ? "Update Item"
                : "Create Item"}
          </Button>
          <Button href="/admin/portfolio" plain>
            Cancel
          </Button>
        </div>
      </form>
    </>
  )
}
