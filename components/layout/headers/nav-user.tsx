"use client";
import { BadgeCheck, Bell, CreditCard, LogOut } from "lucide-react";
import { Avatar, AvatarFallback } from "@/components/ui/avatar";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuGroup,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { useAuth } from "@/contexts/auth-context";
import Link from "next/link";
import { ROUTES } from "@/constants";
import { Button } from "@/components/ui/button";
import { Skeleton } from "@/components/ui/skeleton";

export function NavUser() {
  const { user, logout, status } = useAuth();

  if (status === "idle" || status === "loading") return <Skeleton className="h-8 w-8 rounded-lg" />;

  if (!user)
    return (
      <>
        <Link
          href={ROUTES.LOGIN}
          className="px-4 py-2 hover:bg-gray-100 rounded transition-colors"
        >
          Log in
        </Link>
        <Link
          href={ROUTES.SIGNUP}
          className="px-4 py-2 bg-primary hover:bg-primary/90 text-white rounded transition-colors font-semibold"
        >
          Sign up
        </Link>
      </>
    );

  return (
    <DropdownMenu>
      <DropdownMenuTrigger asChild>
        <Button variant="ghost" size="icon">
          <Avatar className="h-8 w-8 rounded-lg">
            {/* <AvatarImage src={user.avatar} alt={user.name} /> */}
            <AvatarFallback className="rounded-lg">
              {user.name[0]}
            </AvatarFallback>
          </Avatar>
        </Button>
      </DropdownMenuTrigger>
      <DropdownMenuContent
        className="w-(--radix-dropdown-menu-trigger-width) min-w-56 rounded-lg"
        side="bottom"
        align="start"
        sideOffset={4}
      >
        <DropdownMenuLabel className="p-0 font-normal">
          <div className="flex items-center gap-2 px-1 py-1.5 text-left text-sm">
            <Avatar className="h-8 w-8 rounded-lg">
              {/* <AvatarImage src={user.avatar} alt={user.name} /> */}
              <AvatarFallback className="rounded-lg">CN</AvatarFallback>
            </Avatar>
            <div className="grid flex-1 text-left text-sm leading-tight">
              <span className="truncate font-medium">{user.name}</span>
              <span className="truncate text-xs">{user.email}</span>
            </div>
          </div>
        </DropdownMenuLabel>
        <DropdownMenuSeparator />
        <DropdownMenuGroup>
          <DropdownMenuItem>
            <BadgeCheck />
            Account
          </DropdownMenuItem>
          <DropdownMenuItem>
            <CreditCard />
            Billing
          </DropdownMenuItem>
          <DropdownMenuItem>
            <Bell />
            Notifications
          </DropdownMenuItem>
        </DropdownMenuGroup>
        <DropdownMenuSeparator />
        <DropdownMenuItem onClick={logout}>
          <LogOut />
          Log out
        </DropdownMenuItem>
      </DropdownMenuContent>
    </DropdownMenu>
  );
}
