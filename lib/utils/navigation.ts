import { ReadonlyURLSearchParams } from "next/navigation";

export const baseUrl = process.env.VERCEL_PROJECT_PRODUCTION_URL
  ? `https://${process.env.VERCEL_PROJECT_PRODUCTION_URL}`
  : "http://localhost:3000";

export const isCurrentPage = (pathname?: string, pattern?: string): boolean => {
  if (!pathname || !pattern) return false;
  const escapedPattern = pattern.replace(/[.+?^${}()|\\]/g, "\\$&");
  const regexPattern = escapedPattern
    .replace(/\/\*$/, "(\\/.*)?")
    .replace(/\/\\\*$/, "(\\/.*)?")
    .replace(/\[([^\]]+)\]/g, "[^\\/]+");
  const regex = new RegExp(`^${regexPattern}$`);
  return regex.test(pathname);
};


export const currentPage = (pathname: string): string => {
  const parts = pathname.split("/");
  const lastPart = parts[parts.length - 1];
  return lastPart || "home"; // Return the last part or 'home' if it's empty (e.g., for '/')
};

export const matchRoute = <T extends { pattern: string }>(
  routeConfigs: T[],
  pathname: string,
): T | null => {
  return routeConfigs.find((route) =>
    isCurrentPage(pathname, route.pattern),
  ) || null;
};

export const createUrl = (
  pathname: string,
  params: URLSearchParams | ReadonlyURLSearchParams,
) => {
  const paramsString = params.toString();
  const queryString = `${paramsString.length ? "?" : ""}${paramsString}`;

  return `${pathname}${queryString}`;
};