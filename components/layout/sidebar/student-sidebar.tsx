"use client";

import {
  Sidebar,
  SidebarContent,
  SidebarFooter,
  SidebarHeader,
  SidebarMenu,
  SidebarMenuButton,
  SidebarMenuItem,
  SidebarRail,
} from "@/components/ui/sidebar";
import { NavMain } from "./nav-main";
import { ActiveCourses } from "./active-courses";
import { isCurrentPage, matchRoute } from "@/lib/utils/navigation";
import { usePathname } from "next/navigation";
import Link from "next/link";
import { GraduationCap } from "lucide-react";
import { studentSideBarData } from "@/constants/nav-links";
import { SideBarUser } from "./side-bar-user";

const noneSideBar = [
  { pattern: "/dashboard/cms/[type]/edit" },
  { pattern: "/dashboard/cms/[type]/preview" },
];

export function StudentSidebar({
  ...props
}: React.ComponentProps<typeof Sidebar>) {
  const pathname = usePathname();
  const isCmsPage = matchRoute(noneSideBar, pathname);
  const labels = Object.keys(studentSideBarData);
  if (isCmsPage) return null;

  return (
    <Sidebar collapsible="icon" {...props}>
      <SidebarHeader>
        <SidebarMenu>
          <SidebarMenuItem>
            <SidebarMenuButton size="lg" asChild>
              <Link href="/student/dashboard">
                <div className="bg-sidebar-primary text-sidebar-primary-foreground flex aspect-square size-8 items-center justify-center rounded-lg">
                  <GraduationCap className="size-4" />
                </div>
                <div className="flex flex-col gap-0.5 leading-none min-w-32">
                  <span className="font-medium">IMETS Academy</span>
                  <span className="">Student Portal</span>
                </div>
              </Link>
            </SidebarMenuButton>
          </SidebarMenuItem>
        </SidebarMenu>
      </SidebarHeader>
      <SidebarContent>
        {/* We create a SidebarGroup for each parent. */}
        {labels.map((label) => (
          <NavMain
            key={label}
            label={label}
            items={studentSideBarData[label].map((item) => ({
              ...item,
              isActive: isCurrentPage(pathname, item.url),
            }))}
          />
        ))}
        <ActiveCourses />
      </SidebarContent>
      <SidebarFooter>
        <SideBarUser />
      </SidebarFooter>
      <SidebarRail />
    </Sidebar>
  );
}
