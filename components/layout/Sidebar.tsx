"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { useState } from "react";
import type { SidebarProps } from "@/types/navigation";

function isPathActive(
  pathname: string,
  href: string,
  children?: { href: string }[]
): boolean {
  if (pathname === href) return true;
  if (children?.length) {
    return children.some(
      (c) => pathname === c.href || pathname.startsWith(c.href + "/")
    );
  }
  return pathname.startsWith(href + "/");
}

export default function Sidebar({
  items,
  logoHref = "/",
  logoSrc = "/images/logo.png",
  logoAlt = "IMETS",
  subtitle,
  footerLinks,
  footerProfile,
  variant = "admin",
}: SidebarProps) {
  const pathname = usePathname();
  const [openMenus, setOpenMenus] = useState<Set<string>>(new Set());
  const [hoveredMenu, setHoveredMenu] = useState<string | null>(null);

  const toggleMenu = (name: string) => {
    setOpenMenus((prev) => {
      const next = new Set(prev);
      if (next.has(name)) next.delete(name);
      else next.add(name);
      return next;
    });
  };

  const isMenuOpen = (name: string) =>
    openMenus.has(name) || hoveredMenu === name;
  const bgNav = variant === "admin" ? "bg-gray-50" : "bg-white";
  const activeItemClass =
    variant === "admin"
      ? "bg-primary text-white font-semibold"
      : "bg-primary/70 text-primary font-semibold";
  const inactiveItemClass = "text-gray-700 hover:bg-gray-100";
  const inactiveItemClassAlt = "text-gray-700 hover:bg-gray-50";

  return (
    <div
      className={`w-64 min-h-screen flex flex-col border-r border-gray-200 ${bgNav}`}
    >
      <div className="p-6 border-b border-gray-200 bg-white">
        <Link href={logoHref} className="flex items-center space-x-3">
          <img src={logoSrc} alt={logoAlt} className="h-10 w-auto" />
          <div>
            <h2 className="font-bold text-gray-900">IMETS</h2>
            <p className="text-xs text-gray-500">{subtitle}</p>
          </div>
        </Link>
      </div>

      <nav className="flex-1 p-4 overflow-y-auto">
        <ul className="space-y-2">
          {items.map((item) => {
            const hasChildren = item.children && item.children.length > 0;
            const menuOpen = isMenuOpen(item.name);
            const active = isPathActive(pathname, item.href, item.children);

            return (
              <li
                key={item.name}
                className="relative"
                onMouseEnter={() => hasChildren && setHoveredMenu(item.name)}
                onMouseLeave={() => setHoveredMenu(null)}
              >
                <Link
                  href={item.href}
                  onClick={() => hasChildren && toggleMenu(item.name)}
                  className={`flex items-center justify-between px-4 py-3 rounded-lg transition-colors ${
                    active ? activeItemClass : inactiveItemClass
                  }`}
                >
                  <div className="flex items-center space-x-3 flex-1">
                    <span className="text-xl">{item.icon}</span>
                    <span>{item.name}</span>
                  </div>
                  {hasChildren && (
                    <span
                      className={`text-xs transition-transform ${
                        menuOpen ? "rotate-180" : ""
                      }`}
                    >
                      ▼
                    </span>
                  )}
                </Link>
                {hasChildren && menuOpen && item.children && (
                  <ul
                    className="mt-1 ml-4 space-y-1 border-l-2 border-gray-200 pl-4"
                    onMouseEnter={() => setHoveredMenu(item.name)}
                    onMouseLeave={() => setHoveredMenu(null)}
                  >
                    {item.children.map((child) => {
                      const childActive =
                        pathname === child.href ||
                        pathname.startsWith(child.href + "/");
                      return (
                        <li key={child.name}>
                          <Link
                            href={child.href}
                            className={`block px-4 py-2 rounded-lg text-sm transition-colors ${
                              childActive
                                ? "bg-primary/70 text-primary font-semibold"
                                : "text-gray-600 hover:bg-gray-50 hover:text-gray-900"
                            }`}
                          >
                            {child.name}
                          </Link>
                        </li>
                      );
                    })}
                  </ul>
                )}
              </li>
            );
          })}
        </ul>
      </nav>

      <div className="p-4 border-t border-gray-200 bg-white">
        {footerLinks.map((link) => {
          const isActive =
            pathname === link.href ||
            (link.href !== "/" && pathname.startsWith(link.href));
          return (
            <Link
              key={link.href}
              href={link.href}
              className={`flex items-center space-x-3 px-4 py-3 rounded-lg transition-colors mb-1 ${
                isActive
                  ? "bg-primary/70 text-primary font-semibold"
                  : inactiveItemClassAlt
              }`}
            >
              <span className="text-xl">{link.icon}</span>
              <span>{link.label}</span>
            </Link>
          );
        })}
        {footerProfile && (
          <div className="mt-4 pt-4 border-t border-gray-200 flex items-center space-x-3">
            <div className="w-10 h-10 bg-primary rounded-full flex items-center justify-center text-white font-semibold text-sm">
              {footerProfile.initial.length === 1
                ? footerProfile.initial
                : "👤"}
            </div>
            <div>
              <p className="font-semibold text-sm text-gray-900">
                {footerProfile.name}
              </p>
              <p className="text-xs text-gray-500">{footerProfile.role}</p>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
