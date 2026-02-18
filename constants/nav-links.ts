import {
  Award,
  BookOpen,
  Calendar,
  ClipboardList,
  CreditCard,
  FileText,
  LayoutDashboard,
  Settings,
  User,
} from "lucide-react";
import { SideBarItemType } from "@/types/navigation";
import { ROUTES } from "./routes";

export const studentSideBarData: Record<string, SideBarItemType[]> = {
  platform: [
    {
      title: "Dashboard",
      url: ROUTES.STUDENT.DASHBOARD,
      icon: LayoutDashboard,
    },
    {
      title: "My Courses",
      icon: BookOpen,
      url: ROUTES.STUDENT.COURSES,
    },
    { title: "Schedule", url: ROUTES.STUDENT.SCHEDULE, icon: Calendar },
    {
      title: "Assignments",
      icon: ClipboardList,
      url: ROUTES.STUDENT.ASSIGNMENTS,
    },
    {
      title: "My Certificates",
      icon: Award,
      url: ROUTES.STUDENT.CERTIFICATES,
    },
    {
      title: "Academic Transcripts",
      icon: FileText,
      url: ROUTES.STUDENT.TRANSCRIPTS,
    },
  ],
  personal: [
    { title: "Profile", url: ROUTES.STUDENT.PROFILE, icon: User },
    { title: "Payments", url: ROUTES.STUDENT.INSTALLMENTS, icon: CreditCard },
    { title: "Settings", url: ROUTES.STUDENT.SETTINGS, icon: Settings },
  ],
};
