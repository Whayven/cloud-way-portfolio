import { prisma } from "@/lib/db"
import { ContentStatus } from "@/lib/generated/prisma/client"
import { Heading, Subheading } from "@/app/_components/catalyst/heading"
import { Text } from "@/app/_components/catalyst/text"
import { Divider } from "@/app/_components/catalyst/divider"
import {
  DescriptionDetails,
  DescriptionList,
  DescriptionTerm,
} from "@/app/_components/catalyst/description-list"

export default async function AdminDashboard() {
  const [
    portfolioCount,
    publishedCount,
    messageCount,
    announcementCount,
    activeAnnouncementCount,
    blogCount,
    publishedBlogCount,
  ] = await Promise.all([
    prisma.portfolioItem.count(),
    prisma.portfolioItem.count({ where: { status: ContentStatus.published } }),
    prisma.contactMessage.count(),
    prisma.announcement.count(),
    prisma.announcement.count({
      where: {
        status: ContentStatus.published,
        OR: [{ expiresAt: null }, { expiresAt: { gt: new Date() } }],
      },
    }),
    prisma.blogPost.count(),
    prisma.blogPost.count({ where: { status: ContentStatus.published } }),
  ])

  return (
    <>
      <Heading>Dashboard</Heading>
      <Text className="mt-2">Overview of your portfolio site content.</Text>
      <Divider className="mt-6" />

      <div className="mt-8 grid gap-8 sm:grid-cols-2">
        <div>
          <Subheading>Portfolio</Subheading>
          <DescriptionList className="mt-4">
            <DescriptionTerm>Total items</DescriptionTerm>
            <DescriptionDetails>{portfolioCount}</DescriptionDetails>
            <DescriptionTerm>Published</DescriptionTerm>
            <DescriptionDetails>{publishedCount}</DescriptionDetails>
            <DescriptionTerm>Drafts</DescriptionTerm>
            <DescriptionDetails>
              {portfolioCount - publishedCount}
            </DescriptionDetails>
          </DescriptionList>
        </div>

        <div>
          <Subheading>Blog</Subheading>
          <DescriptionList className="mt-4">
            <DescriptionTerm>Total posts</DescriptionTerm>
            <DescriptionDetails>{blogCount}</DescriptionDetails>
            <DescriptionTerm>Published</DescriptionTerm>
            <DescriptionDetails>{publishedBlogCount}</DescriptionDetails>
          </DescriptionList>
        </div>

        <div>
          <Subheading>Announcements</Subheading>
          <DescriptionList className="mt-4">
            <DescriptionTerm>Total</DescriptionTerm>
            <DescriptionDetails>{announcementCount}</DescriptionDetails>
            <DescriptionTerm>Active</DescriptionTerm>
            <DescriptionDetails>{activeAnnouncementCount}</DescriptionDetails>
          </DescriptionList>
        </div>

        <div>
          <Subheading>Messages</Subheading>
          <DescriptionList className="mt-4">
            <DescriptionTerm>Total messages</DescriptionTerm>
            <DescriptionDetails>{messageCount}</DescriptionDetails>
          </DescriptionList>
        </div>
      </div>
    </>
  )
}
