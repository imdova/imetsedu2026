"use server";

import { User } from "@/types/auth";
import { getCookie } from "./utils/cookieUtils";
import { USER_COOKIE_KEY } from "@/constants/auth";

export async function getUser() {
  try {
    return await getCookie<User>(USER_COOKIE_KEY);
  } catch {
    return null;
  }
}
