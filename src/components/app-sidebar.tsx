import * as React from "react"
import { GalleryVerticalEnd, SquareTerminal } from "lucide-react"
import { NavMain } from "@/components/nav-main"
import { NavUser } from "@/components/nav-user"
import { Sidebar, SidebarContent, SidebarFooter, SidebarHeader, SidebarMenu, SidebarMenuButton, SidebarMenuItem, SidebarRail } from "@/components/ui/sidebar"

// This is sample data.
const data = {
  user: {
    name: "Support",
    email: "",
    avatar: "/avatars/shadcn.jpg",
  },
  teams: [
    {
      name: "Acme Inc",
      logo: GalleryVerticalEnd,
      plan: "Enterprise",
    }
  ],
  navMain: [
    {
      title: "Dashboard",
      url: "/dashboard",
      icon: SquareTerminal,
    },
    {
      title: "Users",
      url: "#",
      icon: SquareTerminal,
      isActive: true,
      items: [
        {
          title: "User List Add/Edit",
          url: "#",
        },
        {
          title: "User Role & Permission",
          url: "#",
        },
        {
          title: "User Package & Commission",
          url: "#",
        },
        {
          title: "User Wallet TXN-Add/Pull",
          url: "#",
        },
        {
          title: "PackComm-OpWise",
          url: "#",
        },

        {
          title: "Add Notification",
          url: "#",
        },
      ],
    },
    {
      title: "Vendors",
      url: "#",
      icon: SquareTerminal,
      isActive: true,
      items: [
        {
          title: "Vendor List-Add/Edit/Settings",
          url: "#",
        },
        {
          title: "Vendor TXN-Add/Pull",
          url: "#",
        },
        {
          title: "Request/Response",
          url: "#",
        },
        {
          title: "Due Amount",
          url: "#",
        },
        {
          title: "PackComm-OpWise",
          url: "#",
        },
        {
          title: "Vendor Balance",
          url: "#",
        }
      ],
    },
  ],
}

export function AppSidebar({ ...props }: React.ComponentProps<typeof Sidebar>) {
  return (
    <Sidebar collapsible="icon" {...props} className="bg-white">
       <SidebarHeader>
        <SidebarMenu>
          <SidebarMenuItem>
            <SidebarMenuButton
              asChild
              className="data-[slot=sidebar-menu-button]:!p-1.5"
            >
              {/* <a href="#">
                <IconInnerShadowTop className="!size-5" /> */}
                <span className="text-base font-semibold">DNS Link Portal</span>
              {/* </a> */}
            </SidebarMenuButton>
          </SidebarMenuItem>
        </SidebarMenu>
      </SidebarHeader>
      <SidebarContent>
        <NavMain items={data.navMain} />
      </SidebarContent>
      <SidebarFooter>
        <NavUser user={data.user} />
      </SidebarFooter>
      <SidebarRail />
    </Sidebar>
  )
}
