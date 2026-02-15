"use client";

import { routeConfigs } from "@/constants/config/routeConfigs";
import { matchRoute } from "@/lib/utils/navigation";
import { usePathname } from "next/navigation";
import React from "react";
import { Root } from "./header-switch";

const HeaderWrapper: React.FC<{ children: React.ReactNode }> = ({
  children,
}) => {
  const pathname = usePathname() || "/";
  const headerConfig = matchRoute(routeConfigs, pathname) || {
    headerType: "minimal",
  };
  const headerType = headerConfig.headerType || "minimal";
  return (
    <Root data-slot="tabs" value={headerType}>
      {children}
    </Root>
  );
};

export default HeaderWrapper;
