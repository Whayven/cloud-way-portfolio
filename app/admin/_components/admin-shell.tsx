"use client"

import { usePathname } from "next/navigation"
import { logout } from "@/app/actions/auth"
import { SidebarLayout } from "@/app/_components/catalyst/sidebar-layout"
import {
  Sidebar,
  SidebarBody,
  SidebarFooter,
  SidebarHeader,
  SidebarItem,
  SidebarLabel,
  SidebarSection,
} from "@/app/_components/catalyst/sidebar"
import { Navbar, NavbarSpacer } from "@/app/_components/catalyst/navbar"
import {
  HomeIcon,
  FolderIcon,
  DocumentTextIcon,
  EnvelopeIcon,
  MegaphoneIcon,
  ArrowRightStartOnRectangleIcon,
} from "@heroicons/react/20/solid"

export function AdminShell({ children }: { children: React.ReactNode }) {
  const pathname = usePathname()

  return (
    <SidebarLayout
      navbar={
        <Navbar>
          <NavbarSpacer />
        </Navbar>
      }
      sidebar={
        <Sidebar>
          <SidebarHeader>
            <SidebarSection>
              <SidebarItem href="/admin" current={pathname === "/admin"}>
                <HomeIcon />
                <SidebarLabel>Dashboard</SidebarLabel>
              </SidebarItem>
            </SidebarSection>
          </SidebarHeader>
          <SidebarBody>
            <SidebarSection>
              <SidebarItem
                href="/admin/portfolio"
                current={pathname.startsWith("/admin/portfolio")}
              >
                <FolderIcon />
                <SidebarLabel>Portfolio</SidebarLabel>
              </SidebarItem>
              <SidebarItem
                href="/admin/blog"
                current={pathname.startsWith("/admin/blog")}
              >
                <DocumentTextIcon />
                <SidebarLabel>Blog</SidebarLabel>
              </SidebarItem>
              <SidebarItem
                href="/admin/announcements"
                current={pathname.startsWith("/admin/announcements")}
              >
                <MegaphoneIcon />
                <SidebarLabel>Announcements</SidebarLabel>
              </SidebarItem>
              <SidebarItem
                href="/admin/messages"
                current={pathname.startsWith("/admin/messages")}
              >
                <EnvelopeIcon />
                <SidebarLabel>Messages</SidebarLabel>
              </SidebarItem>
            </SidebarSection>
          </SidebarBody>
          <SidebarFooter>
            <SidebarSection>
              <form action={logout}>
                <SidebarItem type="submit">
                  <ArrowRightStartOnRectangleIcon />
                  <SidebarLabel>Logout</SidebarLabel>
                </SidebarItem>
              </form>
            </SidebarSection>
          </SidebarFooter>
        </Sidebar>
      }
    >
      {children}
    </SidebarLayout>
  )
}
