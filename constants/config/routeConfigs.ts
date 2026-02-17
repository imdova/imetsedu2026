import { RouteConfig } from "@/types";

export const routeConfigs: RouteConfig[] = [
  {
    pattern: "/auth/*",
    headerType: "none",
  },
  {
    pattern: "/instructor/*",
    headerType: "none",
  },
  {
    pattern: "/admin/*",
    headerType: "none",
  },
  // Default
  {
    pattern: "/*",
    headerType: "full",
  },
];
