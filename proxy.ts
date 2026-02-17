import { NextRequest, NextResponse } from "next/server";
import { User } from "./types/auth";
import { isCurrentPage } from "./lib/utils/navigation";
import { redirectMap, roleAccessMap } from "./constants/auth";

export function proxy(request: NextRequest) {
  const { pathname } = request.nextUrl;
  const user = getUser(request);
  const isInAuth = pathname.startsWith("/auth");

  // Redirect to login page if there is no accessible token
  if (!user) {
    if (isInAuth) {
      return NextResponse.next();
    }
    return NextResponse.redirect(new URL("/auth/login", request.url));
  }

  if (isInAuth && user?.role) {
    const url = redirectMap[user.role];
    return NextResponse.redirect(new URL(url, request.url));
  }

  const haveAccess = hasAccessToURL(user, pathname);

  if (!haveAccess) {
    // Redirect to login page if user has no access to that particular page
    return NextResponse.rewrite(new URL("/403", request.url));
  }
  // Allow
  return NextResponse.next();
}

export const config = {
  matcher: [
    "/auth/:path*",
    "/admin/:path*",
    "/instructor/:path*",
    "/student/:path*",
  ],
};

function getUser(request: NextRequest): User | null {
  try {
    const cookie = request.cookies.get("user")?.value;
    if (!cookie) return null;
    return JSON.parse(cookie);
  } catch {
    return null;
  }
}


function hasAccessToURL(user: User | null, url: string): boolean {
  const role = user?.role;
  const rolePatterns = role ? roleAccessMap[role] : [];
  const hasRoleAccess = rolePatterns.some((pattern) =>
    isCurrentPage(url, pattern),
  );
  if (!hasRoleAccess) return false;
  return true;
}
