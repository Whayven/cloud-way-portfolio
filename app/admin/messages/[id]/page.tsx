import { notFound } from "next/navigation"
import { prisma } from "@/lib/db"
import { Heading } from "@/app/_components/catalyst/heading"
import { Button } from "@/app/_components/catalyst/button"
import { Divider } from "@/app/_components/catalyst/divider"
import { Text } from "@/app/_components/catalyst/text"
import {
  DescriptionDetails,
  DescriptionList,
  DescriptionTerm,
} from "@/app/_components/catalyst/description-list"
import { DeleteMessageButton } from "../../_components/delete-message-button"

export default async function MessageDetailPage({
  params,
}: {
  params: Promise<{ id: string }>
}) {
  const { id } = await params

  const message = await prisma.contactMessage.findUnique({ where: { id } })
  if (!message) notFound()

  return (
    <>
      <div className="flex items-center justify-between">
        <Heading>
          {message.firstName} {message.lastName}
        </Heading>
        <div className="flex gap-2">
          <Button href="/admin/messages" plain>
            Back
          </Button>
          <DeleteMessageButton id={message.id} />
        </div>
      </div>
      <Divider className="mt-6" />
      <DescriptionList className="mt-8">
        <DescriptionTerm>Email</DescriptionTerm>
        <DescriptionDetails>{message.email}</DescriptionDetails>
        {message.phone && (
          <>
            <DescriptionTerm>Phone</DescriptionTerm>
            <DescriptionDetails>{message.phone}</DescriptionDetails>
          </>
        )}
        {message.company && (
          <>
            <DescriptionTerm>Company</DescriptionTerm>
            <DescriptionDetails>{message.company}</DescriptionDetails>
          </>
        )}
        {message.region && (
          <>
            <DescriptionTerm>Region</DescriptionTerm>
            <DescriptionDetails>{message.region}</DescriptionDetails>
          </>
        )}
        <DescriptionTerm>Received</DescriptionTerm>
        <DescriptionDetails>
          {message.createdAt.toLocaleString("en-US", {
            dateStyle: "medium",
            timeStyle: "short",
          })}
        </DescriptionDetails>
      </DescriptionList>
      <Divider className="mt-8" />
      <div className="mt-8">
        <Text className="whitespace-pre-wrap">{message.message}</Text>
      </div>
    </>
  )
}
