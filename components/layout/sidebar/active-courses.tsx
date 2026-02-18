"use client";

import { Eye, ImageIcon, MoreHorizontal, Pencil, Ticket } from "lucide-react";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import {
  SidebarGroup,
  SidebarGroupLabel,
  SidebarMenu,
  SidebarMenuAction,
  SidebarMenuButton,
  SidebarMenuItem,
  useSidebar,
} from "@/components/ui/sidebar";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import Link from "next/link";
import { courses } from "@/lib/courses";

export function ActiveCourses() {
  const { isMobile } = useSidebar();

  return (
    <SidebarGroup className="group-data-[collapsible=icon]:hidden">
      <SidebarGroupLabel>Active Courses</SidebarGroupLabel>
      <SidebarMenu>
        {courses.slice(0, 3).map((event) => (
          <SidebarMenuItem key={event.id}>
            <SidebarMenuButton asChild>
              <Link href={`/dashboard/events/${event.id}`}>
                <Avatar className="size-6 rounded-sm">
                  <AvatarImage src={event.image} alt={event.title} />
                  <AvatarFallback>
                    <ImageIcon />
                  </AvatarFallback>
                </Avatar>
                <span>{event.title}</span>
              </Link>
            </SidebarMenuButton>
            <DropdownMenu>
              <DropdownMenuTrigger asChild>
                <SidebarMenuAction showOnHover>
                  <MoreHorizontal />
                  <span className="sr-only">More</span>
                </SidebarMenuAction>
              </DropdownMenuTrigger>
              <DropdownMenuContent
                className="w-48 rounded-lg"
                side={isMobile ? "bottom" : "right"}
                align={isMobile ? "end" : "start"}
              >
                <DropdownMenuItem asChild>
                  <Link href={`/dashboard/events/${event.id}`}>
                    <Eye className="text-muted-foreground" />
                    <span>View</span>
                  </Link>
                </DropdownMenuItem>
                <DropdownMenuItem asChild>
                  <Link href={`/dashboard/events/${event.id}/edit`}>
                    <Pencil className="text-muted-foreground" />
                    <span>Edit</span>
                  </Link>
                </DropdownMenuItem>
                <DropdownMenuItem asChild>
                  <Link href={`/dashboard/events/${event.id}?tab=tickets`}>
                    <Ticket className="text-muted-foreground" />
                    <span>Orders</span>
                  </Link>
                </DropdownMenuItem>
              </DropdownMenuContent>
            </DropdownMenu>
          </SidebarMenuItem>
        ))}
      </SidebarMenu>
    </SidebarGroup>
  );
}
