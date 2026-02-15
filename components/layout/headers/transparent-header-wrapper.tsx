"use client";

import useScrollDetection from "@/hooks/use-scroll";


const TransparentHeaderWrapper: React.FC<{ children: React.ReactNode }> = ({
  children,
}) => {
  const isScrolled = useScrollDetection();

  return (
    <header
      className={`fixed top-0 right-0 left-0 z-50 border-white/10 transition-all duration-300 ${
        isScrolled
          ? "text-foreground bg-background [&_.search-input]:bg-accent border-b shadow-sm backdrop-blur-sm dark:bg-black/80"
          : "bg-transparent text-white [&_.search-input]:bg-white/5"
      }`}
    >
      {children}
    </header>
  );
};

export default TransparentHeaderWrapper;
