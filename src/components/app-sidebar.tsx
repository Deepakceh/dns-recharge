import * as React from "react"
import { GalleryVerticalEnd, UserRoundPlus, Users, LayoutGrid, Landmark } from "lucide-react"
import { NavMain } from "@/components/nav-main"
import { NavUser } from "@/components/nav-user"
import { Sidebar, SidebarContent, SidebarFooter, SidebarHeader, SidebarMenu, SidebarMenuButton, SidebarMenuItem, SidebarRail } from "@/components/ui/sidebar"
import sidebar_logo from '../assets/images/dns/sidebar_logo.svg'
// This is sample data.
const data = {
  user: {
    name: "Deepak Kumar",
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
      icon: LayoutGrid,
    },
    {
      title: "Users",
      url: "#",
      icon: UserRoundPlus,
      isActive: false,
      items: [
        {
          title: "User List Add/Edit",
          url: "/users/list",
        },
        {
          title: "User Role & Permission",
          url: "/users/role",
        },
        {
          title: "User Package & Commission",
          url: "/users/package-list",
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
          url: "/users/notification",
        },
      ],
    },
    {
      title: "Vendors",
      url: "#",
      icon: Users,
      isActive: false,
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
    {
      title: "Bank",
      url: "#",
      icon: Landmark,
      isActive: false,
      items: [
        {
          title: "Bank Account",
          url: "/bank/account-list",
        },
        {
          title: "Bank Statement",
          url: "/bank/statement-list",
        },
        {
          title: "Deposit / Withdrow",
          url: "#",
        }
      ],
    },
      {
      title: "Configuration",
      url: "#",
      icon: UserRoundPlus,
      isActive: false,
      items: [
        {
          title: "IP Address",
          url: "/configuration/ip-address",
        },
        {
          title: "Callback",
          url: "/configuration/callback",
        },
        
      ],
    },
  ]
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
              <a href="#">
                <img src={sidebar_logo} alt="logo" className="!size-5" />
                {/* <IconInnerShadowTop className="!size-5" /> */}
                <span className="text-base font-semibold">DNS Link Portal</span>
              </a>
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
