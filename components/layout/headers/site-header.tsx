"use client";
import { Button } from "@/components/ui/button";
import {
  Breadcrumb,
  BreadcrumbItem,
  BreadcrumbLink,
  BreadcrumbList,
  BreadcrumbPage,
  BreadcrumbSeparator,
} from "@/components/ui/breadcrumb";
import { Separator } from "@/components/ui/separator";
import { SidebarTrigger } from "@/components/ui/sidebar";
import { Bell, MessageCircle, Search } from "lucide-react";
import React from "react";
import { Input } from "@/components/ui/input";

interface ServicePathProps {
  path?: {
    name: string;
    href: string;
  }[];
  current?: string;
}

const SiteHeader: React.FC<ServicePathProps> = ({ path, current }) => {
  return (
    <header className="bg-background sticky top-0 z-50 flex h-(--header-height) shrink-0 items-center gap-2 rounded-t-lg border-b transition-[width,height] ease-linear group-has-data-[collapsible=icon]/sidebar-wrapper:h-(--header-height)">
      <div className="flex w-full items-center gap-1 px-4 lg:gap-2 lg:px-6">
        <SidebarTrigger className="-ml-1" />

        {current && (
          <>
            <Separator
              orientation="vertical"
              className="mr-2 data-[orientation=vertical]:h-4"
            />
            <Breadcrumb>
              <BreadcrumbList>
                {path?.map((item, index) => (
                  <React.Fragment key={index}>
                    <BreadcrumbItem className="hidden md:inline-flex">
                      <BreadcrumbLink href={item.href}>
                        {item.name}
                      </BreadcrumbLink>
                    </BreadcrumbItem>
                    <BreadcrumbSeparator className="hidden md:block" />
                  </React.Fragment>
                ))}
                <BreadcrumbItem>
                  <BreadcrumbPage className="line-clamp-1">
                    {current}
                  </BreadcrumbPage>
                </BreadcrumbItem>
              </BreadcrumbList>
            </Breadcrumb>
          </>
        )}
        <Separator
          orientation="vertical"
          className="mr-2 data-[orientation=vertical]:h-4"
        />
        <div className="relative">
          <div className="text-muted-foreground pointer-events-none absolute inset-y-0 left-0 flex items-center justify-center pl-3 peer-disabled:opacity-50">
            <Search className="size-4" />
            <span className="sr-only">Search</span>
          </div>
          <Input
            type="text"
            placeholder="Search Courses, lessons..."
            className="peer pl-9 border-none bg-muted"
          />
        </div>
        <div className="ml-auto flex items-center gap-2">
          <Button variant="ghost" size="icon">
            <Bell />
          </Button>
          <Button variant="ghost" size="icon">
            <MessageCircle />
          </Button>
        </div>
      </div>
    </header>
  );
};

export default SiteHeader;
