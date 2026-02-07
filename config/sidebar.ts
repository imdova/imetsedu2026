import { ROUTES } from "@/constants";
import type {
  SidebarNavItem,
  SidebarFooterLink,
  SidebarFooterProfile,
  SidebarProps,
} from "@/types/navigation";

const LOGO = { src: "/images/logo.png", alt: "IMETS school of business" };

export const adminNavItems: SidebarNavItem[] = [
  { name: "Dashboard", href: ROUTES.ADMIN.DASHBOARD, icon: "📊" },
  {
    name: "CRM",
    href: ROUTES.ADMIN.CRM_LEADS,
    icon: "🤝",
    children: [
      { name: "Leads", href: ROUTES.ADMIN.CRM_LEADS },
      { name: "Lead Pipeline", href: ROUTES.ADMIN.CRM_PIPELINE },
      { name: "Active Pipeline", href: ROUTES.ADMIN.CRM_ACTIVE_PIPELINE },
      { name: "Payments", href: ROUTES.ADMIN.CRM_PAYMENTS },
      { name: "CRM Reports", href: ROUTES.ADMIN.CRM_REPORTS },
    ],
  },
  {
    name: "Courses",
    href: ROUTES.ADMIN.COURSES,
    icon: "📚",
    children: [
      { name: "All Courses", href: ROUTES.ADMIN.COURSES },
      { name: "New Course", href: ROUTES.ADMIN.COURSES + "/new" },
      { name: "Course Settings", href: ROUTES.ADMIN.COURSES + "/settings" },
    ],
  },
  {
    name: "LMS Management",
    href: ROUTES.ADMIN.LMS_MANAGEMENT,
    icon: "⚙️",
  },
  { name: "Groups", href: ROUTES.ADMIN.GROUPS, icon: "👥" },
  { name: "Quizzes", href: ROUTES.ADMIN.QUIZZES, icon: "📝" },
  { name: "Certificates", href: "/admin/certificates", icon: "🏆" },
  { name: "Assignments", href: ROUTES.ADMIN.ASSIGNMENTS, icon: "📋" },
  {
    name: "Users Management",
    href: ROUTES.ADMIN.USERS,
    icon: "👥",
    children: [
      { name: "Roles and Permissions", href: ROUTES.ADMIN.USERS_ROLES },
    ],
  },
  { name: "Students", href: ROUTES.ADMIN.STUDENTS, icon: "🎓" },
  { name: "Instructors", href: ROUTES.ADMIN.INSTRUCTORS, icon: "👨‍🏫" },
];

export const instructorNavItems: SidebarNavItem[] = [
  { name: "Dashboard", href: ROUTES.INSTRUCTOR.DASHBOARD, icon: "📊" },
  {
    name: "My Courses",
    href: ROUTES.INSTRUCTOR.COURSES,
    icon: "📚",
    children: [
      { name: "All Courses", href: ROUTES.INSTRUCTOR.COURSES },
      { name: "Create Course", href: ROUTES.INSTRUCTOR.COURSE_NEW },
    ],
  },
  {
    name: "Quizzes",
    href: ROUTES.INSTRUCTOR.QUIZZES,
    icon: "📝",
    children: [
      { name: "All Quizzes", href: ROUTES.INSTRUCTOR.QUIZZES },
      { name: "Create Quiz", href: ROUTES.INSTRUCTOR.QUIZ_NEW },
    ],
  },
  {
    name: "Events",
    href: ROUTES.INSTRUCTOR.EVENTS,
    icon: "📅",
    children: [
      { name: "Events Overview", href: ROUTES.INSTRUCTOR.EVENTS },
      { name: "Manage Events", href: ROUTES.INSTRUCTOR.EVENTS_MANAGE },
      { name: "Create Event", href: ROUTES.INSTRUCTOR.EVENT_NEW },
    ],
  },
  { name: "Analytics", href: ROUTES.INSTRUCTOR.ANALYTICS, icon: "📈" },
  { name: "Earnings", href: ROUTES.INSTRUCTOR.EARNINGS, icon: "💰" },
];

export const adminFooterLinks: SidebarFooterLink[] = [
  { href: ROUTES.ADMIN.SETTINGS, label: "Settings", icon: "⚙️" },
];

const instructorFooterLinks: SidebarFooterLink[] = [
  { href: ROUTES.INSTRUCTOR.PROFILE, label: "Profile", icon: "👤" },
  { href: ROUTES.INSTRUCTOR.SETTINGS, label: "Settings", icon: "⚙️" },
];

export function getAdminSidebarProps(): SidebarProps {
  return {
    items: adminNavItems,
    logoHref: ROUTES.HOME,
    logoSrc: LOGO.src,
    logoAlt: LOGO.alt,
    subtitle: "Admin Panel",
    footerLinks: adminFooterLinks,
    footerProfile: { initial: "A", name: "Admin User", role: "Super Admin" },
    variant: "admin",
  };
}

export function getInstructorSidebarProps(): SidebarProps {
  return {
    items: instructorNavItems,
    logoHref: ROUTES.HOME,
    logoSrc: LOGO.src,
    logoAlt: LOGO.alt,
    subtitle: "Educator Account",
    footerLinks: instructorFooterLinks,
    footerProfile: { initial: "👤", name: "Alex Rivera", role: "Pro Creator" },
    variant: "instructor",
  };
}

export const studentNavItems: SidebarNavItem[] = [
  { name: "Dashboard", href: ROUTES.STUDENT.DASHBOARD, icon: "📊" },
  { name: "My Courses", href: ROUTES.STUDENT.COURSES, icon: "📚" },
  { name: "Certificates", href: "/student/certificates", icon: "🏆" },
];

const studentFooterLinks: SidebarFooterLink[] = [
  { href: ROUTES.STUDENT.PROFILE, label: "Profile", icon: "👤" },
  { href: ROUTES.STUDENT.SETTINGS, label: "Settings", icon: "⚙️" },
];

export function getStudentSidebarProps(): SidebarProps {
  return {
    items: studentNavItems,
    logoHref: ROUTES.HOME,
    logoSrc: LOGO.src,
    logoAlt: LOGO.alt,
    subtitle: "Student Portal",
    footerLinks: studentFooterLinks,
    footerProfile: { initial: "A", name: "Alexander P.", role: "Student" },
    variant: "instructor",
  };
}
