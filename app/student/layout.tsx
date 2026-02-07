"use client";

import "./student-layout.css";
import "./student-dashboard-sidebar.css";
import Link from "next/link";
import { usePathname } from "next/navigation";
import {
  Search,
  Bell,
  MessageCircle,
  LayoutDashboard,
  BookOpen,
  Calendar,
  Award,
  Heart,
  User,
  Settings,
  HelpCircle,
  CreditCard,
  GraduationCap,
  ChevronRight,
} from "lucide-react";
import { ROUTES } from "@/constants";

export default function StudentLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const pathname = usePathname();
  const isCoursesPage = pathname === ROUTES.STUDENT.COURSES;
  const isLessonPage =
    typeof pathname === "string" &&
    /^\/student\/courses\/[^/]+\/lesson\/.+/.test(pathname);
  const isQuizPage =
    typeof pathname === "string" &&
    /^\/student\/courses\/[^/]+\/quiz\/.+/.test(pathname);

  const mainNav = [
    {
      label: "Dashboard",
      href: ROUTES.STUDENT.DASHBOARD,
      icon: LayoutDashboard,
    },
    { label: "My Courses", href: ROUTES.STUDENT.COURSES, icon: BookOpen },
    { label: "Schedule", href: ROUTES.STUDENT.SCHEDULE, icon: Calendar },
    { label: "Certificates", href: ROUTES.STUDENT.CERTIFICATES, icon: Award },
  ];

  const personalNav = [
    { label: "Profile", href: ROUTES.STUDENT.PROFILE, icon: User },
    { label: "Billing", href: ROUTES.STUDENT.BILLING, icon: CreditCard },
    { label: "Settings", href: ROUTES.STUDENT.SETTINGS, icon: Settings },
  ];

  if (isLessonPage || isQuizPage) {
    return <div className="student-theme min-h-screen">{children}</div>;
  }

  return (
    <div className="student-theme min-h-screen bg-[#f3f4f6] flex flex-col">
      <div className="student-portal-layout flex-1 min-h-0">
        <aside className="student-portal-sidebar">
          <div className="student-portal-logo">
            <div className="student-portal-logo-icon">
              <GraduationCap className="w-5 h-5" strokeWidth={2} />
            </div>
            <div>
              <span className="student-portal-logo-text">IMETS Academy</span>
              <span className="student-portal-subtitle">Student Portal</span>
            </div>
          </div>
          <nav className="student-portal-nav">
            {mainNav.map((link) => {
              const Icon = link.icon;
              const active = pathname === link.href;
              return (
                <Link
                  key={link.href}
                  href={link.href}
                  className={active ? "active" : ""}
                >
                  <Icon className="w-5 h-5 shrink-0" strokeWidth={2} />
                  {link.label}
                </Link>
              );
            })}
            <div className="student-portal-nav-label">PERSONAL</div>
            {personalNav.map((link) => {
              const Icon = link.icon;
              const active = pathname === link.href;
              return (
                <Link
                  key={link.href}
                  href={link.href}
                  className={active ? "active" : ""}
                >
                  <Icon className="w-5 h-5 shrink-0" strokeWidth={2} />
                  {link.label}
                </Link>
              );
            })}
          </nav>
          <div className="student-portal-user">
            <Link
              href={ROUTES.STUDENT.PROFILE}
              className="student-portal-user-inner block"
            >
              <div className="student-portal-user-avatar">JR</div>
              <div className="flex-1 min-w-0">
                <div className="student-portal-user-name">Julian Reed</div>
                <div className="student-portal-user-level">
                  Computer Science Stu...
                </div>
              </div>
              <ChevronRight
                className="w-5 h-5 text-gray-400 shrink-0"
                strokeWidth={2}
              />
            </Link>
          </div>
        </aside>
        <main className="student-portal-main">
          {!isCoursesPage && (
            <header className="student-portal-main-header">
              <div className="relative flex-1 max-w-md">
                <Search
                  className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-500"
                  strokeWidth={2}
                />
                <input
                  type="search"
                  className="student-portal-search w-full"
                  placeholder="Search courses, lessons..."
                />
              </div>
              <div className="flex items-center gap-2">
                <button
                  type="button"
                  className="relative p-2.5 rounded-lg text-gray-600 hover:bg-gray-100 transition-colors"
                  aria-label="Notifications"
                >
                  <Bell className="w-5 h-5" strokeWidth={2} />
                  <span className="absolute top-1.5 right-1.5 w-2 h-2 bg-red-500 rounded-full" />
                </button>
                <button
                  type="button"
                  className="p-2.5 rounded-lg text-gray-600 hover:bg-gray-100 transition-colors"
                  aria-label="Messages"
                >
                  <MessageCircle className="w-5 h-5" strokeWidth={2} />
                </button>
              </div>
            </header>
          )}
          <div
            className={`student-portal-main-content${
              isCoursesPage ? " student-portal-main-content-full" : ""
            }`}
          >
            {children}
          </div>
        </main>
      </div>
    </div>
  );
}
