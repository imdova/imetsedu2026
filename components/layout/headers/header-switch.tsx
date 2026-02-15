"use client";
import { HeaderType } from "@/types/navigation";
import React, { createContext, useContext } from "react";

type HeaderSwitchContextValue = {
  value: HeaderType;
};

const HeaderSwitchContext = createContext<HeaderSwitchContextValue | null>(
  null,
);

type RootProps = {
  value: HeaderType;
  children: React.ReactNode;
};

export const Root = ({ value, children }: RootProps) => {
  return (
    <HeaderSwitchContext.Provider value={{ value }}>
      {children}
    </HeaderSwitchContext.Provider>
  );
};

type ContentProps = {
  value: HeaderType;
  children: React.ReactNode;
};

export const Content = ({ value, children }: ContentProps) => {
  const ctx = useContext(HeaderSwitchContext);

  if (!ctx) {
    throw new Error("Content must be used inside Root");
  }

  if (ctx.value !== value) return null;

  return <>{children}</>;
};
