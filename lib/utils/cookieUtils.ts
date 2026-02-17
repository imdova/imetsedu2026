"use server";
import { cookies } from "next/headers";

export async function setCookie(
  name: string,
  value: unknown,
  options?: {
    path?: string;
    httpOnly?: boolean;
    secure?: boolean;
    sameSite?: "strict" | "lax" | "none";
    maxAge?: number;
  },
) {
  const cookieStore = await cookies();
  const valueString = JSON.stringify(value);
  cookieStore.set(name, valueString, {
    path: "/",
    httpOnly: true,
    secure: process.env.NODE_ENV === "production",
    sameSite: "lax",
    ...options,
  });
}

export async function getCookie<T>(name: string): Promise<T | undefined> {
  const cookieStore = await cookies();
  return cookieStore.get(name)?.value
    ? JSON.parse(cookieStore.get(name)?.value || "{}")
    : undefined;
}

export async function deleteCookie(name: string) {
  const cookieStore = await cookies();
  cookieStore.delete(name);
}
