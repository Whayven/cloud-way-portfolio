"use client"

import { useActionState, useCallback, useMemo, useState } from "react"
import {
  createPost,
  updatePost,
  type BlogFormState,
} from "@/app/actions/blog"
import { slugify } from "@/lib/utils"
import type { BlogPost } from "@/lib/generated/prisma/client"
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
import { ImageUpload } from "./image-upload"

const initialState: BlogFormState = { success: false }

export function BlogForm({ item }: { item?: BlogPost }) {
  const isEdit = !!item
  const action = isEdit ? updatePost : createPost
  const [state, formAction, pending] = useActionState(action, initialState)
  const [slug, setSlug] = useState(item?.slug ?? "")
  const [coverImage, setCoverImage] = useState<string | null>(
    item?.coverImage ?? null,
  )
  const stableSetCoverImage = useMemo(() => setCoverImage, [])

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
      <Heading>{isEdit ? "Edit Blog Post" : "New Blog Post"}</Heading>
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
              <Label>Excerpt</Label>
              <Textarea
                name="excerpt"
                defaultValue={item?.excerpt}
                rows={2}
                required
              />
              <Description>Short summary shown on the blog index.</Description>
              {state.fieldErrors?.excerpt && (
                <ErrorMessage>{state.fieldErrors.excerpt}</ErrorMessage>
              )}
            </Field>
            <Field>
              <Label>Cover Image</Label>
              <ImageUpload
                prefix="blog"
                defaultValue={item?.coverImage}
                onChange={stableSetCoverImage}
              />
              <Description>Optional image shown on the blog index and post page.</Description>
              <input type="hidden" name="coverImage" value={coverImage ?? ""} />
            </Field>
            <Field>
              <Label>Body</Label>
              <Textarea
                name="body"
                defaultValue={item?.body}
                rows={16}
                required
              />
              <Description>Supports Markdown formatting.</Description>
              {state.fieldErrors?.body && (
                <ErrorMessage>{state.fieldErrors.body}</ErrorMessage>
              )}
            </Field>
            <Field>
              <Label>Status</Label>
              <Select name="status" defaultValue={item?.status ?? "draft"}>
                <option value="draft">Draft</option>
                <option value="published">Published</option>
              </Select>
            </Field>
          </FieldGroup>
        </Fieldset>
        <div className="mt-8 flex gap-4">
          <Button type="submit" disabled={pending}>
            {pending
              ? "Saving..."
              : isEdit
                ? "Update Post"
                : "Create Post"}
          </Button>
          <Button href="/admin/blog" plain>
            Cancel
          </Button>
        </div>
      </form>
    </>
  )
}
