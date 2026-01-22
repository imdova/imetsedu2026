'use client';

import Link from 'next/link';
import { usePathname } from 'next/navigation';

interface SidebarItem {
  name: string;
  href: string;
  icon: string;
}

const sidebarItems: SidebarItem[] = [
  { name: 'Dashboard', href: '/instructor/dashboard', icon: '📊' },
  { name: 'My Courses', href: '/instructor/courses', icon: '📚' },
  { name: 'Quizzes', href: '/instructor/quizzes', icon: '📝' },
  { name: 'Analytics', href: '/instructor/analytics', icon: '📈' },
  { name: 'Earnings', href: '/instructor/earnings', icon: '💰' },
];

export default function InstructorSidebar() {
  const pathname = usePathname();

  return (
    <div className="w-64 bg-white border-r border-gray-200 min-h-screen flex flex-col">
      {/* Logo */}
      <div className="p-6 border-b border-gray-200">
        <div className="flex items-center space-x-3">
          <div className="w-10 h-10 bg-blue-600 rounded-lg flex items-center justify-center">
            <span className="text-white text-xl">🎓</span>
          </div>
          <div>
            <h2 className="font-bold text-gray-900">Creator Hub</h2>
            <p className="text-xs text-gray-500">Educator Account</p>
          </div>
        </div>
      </div>

      {/* Navigation */}
      <nav className="flex-1 p-4">
        <ul className="space-y-2">
          {sidebarItems.map((item) => {
            const isActive = pathname === item.href || pathname.startsWith(item.href + '/');
            return (
              <li key={item.name}>
                <Link
                  href={item.href}
                  className={`flex items-center space-x-3 px-4 py-3 rounded-lg transition-colors ${
                    isActive
                      ? 'bg-blue-50 text-blue-600 font-semibold'
                      : 'text-gray-700 hover:bg-gray-50'
                  }`}
                >
                  <span className="text-xl">{item.icon}</span>
                  <span>{item.name}</span>
                </Link>
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
              ? 'bg-blue-50 text-blue-600 font-semibold'
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
              ? 'bg-blue-50 text-blue-600 font-semibold'
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
