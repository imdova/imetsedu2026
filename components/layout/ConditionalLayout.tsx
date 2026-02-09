"use client";

import { usePathname } from "next/navigation";
import Header from "@/components/Header";
import Footer from "@/components/Footer";

interface ConditionalLayoutProps {
  children: React.ReactNode;
}

export default function ConditionalLayout({
  children,
}: ConditionalLayoutProps) {
  const pathname = usePathname();
  const isDashboard =
    pathname?.startsWith("/instructor") || pathname?.startsWith("/admin");
  const isAuthPage =
    pathname === "/login" || pathname === "/signup";

  if (isDashboard) {
    return <>{children}</>;
  }

  return (
    <>
      <Header />
      <main className="flex-grow">{children}</main>
      {!isAuthPage && <Footer />}
    </>
  );
}
