import { RouteConfig } from "@/types";

export const routeConfigs: RouteConfig[] = [
  {
    pattern: "/login",
    headerType: "none",
  },
  {
    pattern: "/signup",
    headerType: "none",
  },
  {
    pattern: "/instructor",
    headerType: "none",
  },
  {
    pattern: "/instructor",
    headerType: "none",
  },
  {
    pattern: "/admin",
    headerType: "none",
  },
  {
    pattern: "/dashboard/*",
    headerType: "none",
  },
  // Default
  {
    pattern: "/*",
    headerType: "full",
  },
];
