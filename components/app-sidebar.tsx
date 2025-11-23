"use client"

import * as React from "react"
import {
  GalleryVerticalEnd,
  SquareTerminal,
} from "lucide-react"

import { NavMain } from "@/components/nav-main"
import { NavUser } from "@/components/nav-user"
import { TeamSwitcher } from "@/components/team-switcher"
import {
  Sidebar,
  SidebarContent,
  SidebarFooter,
  SidebarHeader,
  SidebarRail,
} from "@/components/ui/sidebar"

// This is sample data.
const data = {
  user: {
    name: "shadcn",
    email: "m@example.com",
    avatar: "/avatars/shadcn.jpg",
  },
  teams: [
    {
      name: "Check-Upp",
      logo: GalleryVerticalEnd,
      plan: "Enterprise",
    },
  ],
  navAdmin: [
    {
      title: "Clinic Staff",
      url: "#",
      icon: SquareTerminal, 
    },
   
  ],
  navStaff: [
    {
      title: "Students",
      url: "#",
      icon: SquareTerminal, 
    },
    {
      title: "Schedule",
      url: "#",
      icon: SquareTerminal, 
    },
   
  ],
    navStudent: [
    {
      title: "Summary",
      url: "#",
      icon: SquareTerminal, 
    },
    {
      title: "Appointment",
      url: "#",
      icon: SquareTerminal, 
    },
    {
      title: "Timeline",
      url: "#",
      icon: SquareTerminal, 
    },
   
  ],
}

export function AppSidebar({ ...props }: React.ComponentProps<typeof Sidebar>) {
  return (
    <Sidebar collapsible="icon" {...props}>
      <SidebarHeader>
        <TeamSwitcher teams={data.teams} />
      </SidebarHeader>
      <SidebarContent>
        <NavMain adminItems={data.navAdmin} />
        <NavMain staffItems={data.navStaff} />
        <NavMain studentItems={data.navStudent} />
      </SidebarContent>
      <SidebarFooter>
        <NavUser user={data.user} />
      </SidebarFooter>
      <SidebarRail />
    </Sidebar>
  )
}
