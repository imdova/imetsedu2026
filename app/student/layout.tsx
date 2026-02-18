import { StudentSidebar } from "@/components/layout/sidebar/student-sidebar";
import { SIDEBAR_COOKIE_NAME, SidebarInset, SidebarProvider } from "@/components/ui/sidebar";
import { getCookie } from "@/lib/utils/cookieUtils";

export default async function Page({
  children,
}: {
  children: React.ReactNode;
}) {
  const sidebarCookie = await getCookie<boolean>(SIDEBAR_COOKIE_NAME);
  return (
    <SidebarProvider
      defaultOpen={sidebarCookie ?? true}
      style={
        {
          "--sidebar-width": "calc(var(--spacing) * 62)",
          "--header-height": "calc(var(--spacing) * 12)",
        } as React.CSSProperties
      }
    >
      <StudentSidebar variant="inset" />
      <SidebarInset>{children}</SidebarInset>
    </SidebarProvider>
  );
}
