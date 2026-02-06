import { redirect } from "next/navigation";
import { ROUTES } from "@/constants";

export default function StudentPortalPage() {
  redirect(ROUTES.STUDENT.DASHBOARD);
}
