import { User } from "@/types/auth";
import { ROUTES } from "./routes";

export const USER_COOKIE_KEY = "user";

export const redirectMap: Record<User["role"], string> = {
  admin: ROUTES.ADMIN.DASHBOARD,
  user: ROUTES.STUDENT.DASHBOARD,
};

export const roleAccessMap: Record<User["role"], string[]> = {
  admin: ["/*"],
  user: ["/student/*"],
};
