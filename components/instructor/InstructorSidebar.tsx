'use client';

import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { useState } from 'react';

interface SidebarItem {
  name: string;
  href: string;
  icon: string;
  children?: { name: string; href: string }[];
}

const sidebarItems: SidebarItem[] = [
  { name: 'Dashboard', href: '/instructor/dashboard', icon: '📊' },
  {
    name: 'My Courses',
    href: '/instructor/courses',
    icon: '📚',
    children: [
      { name: 'All Courses', href: '/instructor/courses' },
      { name: 'Create Course', href: '/instructor/courses/new' },
    ],
  },
  {
    name: 'Quizzes',
    href: '/instructor/quizzes',
    icon: '📝',
    children: [
      { name: 'All Quizzes', href: '/instructor/quizzes' },
      { name: 'Create Quiz', href: '/instructor/quizzes/new' },
    ],
  },
  {
    name: 'Events',
    href: '/instructor/events',
    icon: '📅',
    children: [
      { name: 'Events Overview', href: '/instructor/events' },
      { name: 'Manage Events', href: '/instructor/events/manage' },
      { name: 'Create Event', href: '/instructor/events/new' },
    ],
  },
  { name: 'Analytics', href: '/instructor/analytics', icon: '📈' },
  { name: 'Earnings', href: '/instructor/earnings', icon: '💰' },
];

export default function InstructorSidebar() {
  const pathname = usePathname();
  const [openMenus, setOpenMenus] = useState<Set<string>>(new Set());
  const [hoveredMenu, setHoveredMenu] = useState<string | null>(null);

  const toggleMenu = (itemName: string) => {
    const newOpenMenus = new Set(openMenus);
    if (newOpenMenus.has(itemName)) {
      newOpenMenus.delete(itemName);
    } else {
      newOpenMenus.add(itemName);
    }
    setOpenMenus(newOpenMenus);
  };

  const isMenuOpen = (itemName: string) => {
    return openMenus.has(itemName) || hoveredMenu === itemName;
  };

  const isActive = (href: string, children?: { name: string; href: string }[]) => {
    if (pathname === href) return true;
    if (children) {
      return children.some((child) => pathname === child.href || pathname.startsWith(child.href + '/'));
    }
    return pathname.startsWith(href + '/');
  };

  return (
    <div className="w-64 bg-white border-r border-gray-200 min-h-screen flex flex-col">
      {/* Logo */}
      <div className="p-6 border-b border-gray-200">
        <Link href="/" className="flex items-center space-x-3">
          <img src="/images/logo.png" alt="IMETS school of business" className="h-10 w-auto" />
          <div>
            <h2 className="font-bold text-gray-900">IMETS</h2>
            <p className="text-xs text-gray-500">Educator Account</p>
          </div>
        </Link>
      </div>

      {/* Navigation */}
      <nav className="flex-1 p-4 overflow-y-auto">
        <ul className="space-y-2">
          {sidebarItems.map((item) => {
            const hasChildren = item.children && item.children.length > 0;
            const menuIsOpen = isMenuOpen(item.name);
            const itemIsActive = isActive(item.href, item.children);

            return (
              <li
                key={item.name}
                className="relative"
                onMouseEnter={() => hasChildren && setHoveredMenu(item.name)}
                onMouseLeave={() => setHoveredMenu(null)}
              >
                <div className="relative">
                  <Link
                    href={item.href}
                    className={`flex items-center justify-between px-4 py-3 rounded-lg transition-colors ${
                      itemIsActive
                        ? 'bg-[#e8e8f5] text-[#030256] font-semibold'
                        : 'text-gray-700 hover:bg-gray-50'
                    }`}
                  >
                    <div className="flex items-center space-x-3 flex-1">
                      <span className="text-xl">{item.icon}</span>
                      <span>{item.name}</span>
                    </div>
                    {hasChildren && (
                      <span
                        className={`transform transition-transform text-xs ${
                          menuIsOpen ? 'rotate-180' : ''
                        }`}
                      >
                        ▼
                      </span>
                    )}
                  </Link>
                </div>

                {/* Dropdown Menu */}
                {hasChildren && menuIsOpen && item.children && (
                  <ul
                    className="mt-1 ml-4 space-y-1 border-l-2 border-gray-200 pl-4"
                    onMouseEnter={() => setHoveredMenu(item.name)}
                    onMouseLeave={() => setHoveredMenu(null)}
                  >
                    {item.children.map((child) => {
                      const childIsActive = pathname === child.href || pathname.startsWith(child.href + '/');
                      return (
                        <li key={child.name}>
                          <Link
                            href={child.href}
                            className={`block px-4 py-2 rounded-lg text-sm transition-colors ${
                              childIsActive
                                ? 'bg-[#e8e8f5] text-[#030256] font-semibold'
                                : 'text-gray-600 hover:bg-gray-50 hover:text-gray-900'
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

      {/* Settings & Profile */}
      <div className="p-4 border-t border-gray-200">
        <Link
          href="/instructor/profile"
          className={`flex items-center space-x-3 px-4 py-3 rounded-lg transition-colors mb-2 ${
            pathname === '/instructor/profile'
              ? 'bg-[#e8e8f5] text-[#030256] font-semibold'
              : 'text-gray-700 hover:bg-gray-50'
          }`}
        >
          <span className="text-xl">👤</span>
          <span>Profile</span>
        </Link>
        <Link
          href="/instructor/settings"
          className={`flex items-center space-x-3 px-4 py-3 rounded-lg transition-colors ${
            pathname === '/instructor/settings'
              ? 'bg-[#e8e8f5] text-[#030256] font-semibold'
              : 'text-gray-700 hover:bg-gray-50'
          }`}
        >
          <span className="text-xl">⚙️</span>
          <span>Settings</span>
        </Link>
        
        <div className="mt-4 pt-4 border-t border-gray-200">
          <div className="flex items-center space-x-3">
            <div className="w-10 h-10 bg-gray-300 rounded-full flex items-center justify-center">
              <span className="text-gray-600">👤</span>
            </div>
            <div>
              <p className="font-semibold text-sm text-gray-900">Alex Rivera</p>
              <p className="text-xs text-gray-500">Pro Creator</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
