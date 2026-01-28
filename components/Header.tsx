'use client';

import Link from 'next/link';
import { useState } from 'react';
import CategoryMegaMenu from './CategoryMegaMenu';

export default function Header() {
  const [searchQuery, setSearchQuery] = useState('');
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [mobileSearchOpen, setMobileSearchOpen] = useState(false);

  return (
    <header className="bg-white text-gray-900 sticky top-0 z-50 shadow-md border-b border-gray-200">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center h-16">
          <div className="flex items-center space-x-4 sm:space-x-6">
            <Link href="/" className="flex items-center">
              <img
                src="/images/logo.png"
                alt="IMETS school of business"
                className="h-8 sm:h-10 w-auto"
              />
            </Link>
            <nav className="hidden md:flex items-center space-x-1">
              <CategoryMegaMenu />
              <Link href="/about" className="px-3 py-2 hover:bg-gray-100 rounded transition-colors">
                About Us
              </Link>
              <Link href="/contact" className="px-3 py-2 hover:bg-gray-100 rounded transition-colors">
                Contact
              </Link>
            </nav>
          </div>
          
          {/* Desktop Search */}
          <div className="hidden lg:flex flex-1 max-w-md mx-8">
            <input
              type="text"
              placeholder="What do you want to learn?"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="w-full px-4 py-2 bg-gray-100 text-gray-900 rounded-l-lg border border-gray-200 focus:outline-none focus:ring-2 focus:ring-[#030256] focus:border-[#030256]"
            />
            <button className="bg-gray-100 text-gray-700 px-4 py-2 rounded-r-lg border border-l-0 border-gray-200 hover:bg-gray-200 transition-colors">
              🔍
            </button>
          </div>

          {/* Desktop Actions */}
          <div className="hidden md:flex items-center space-x-4">
            <Link href="/admin/dashboard" className="px-4 py-2 hover:bg-gray-100 rounded transition-colors">
              Admin
            </Link>
            <Link href="/instructor/dashboard" className="px-4 py-2 hover:bg-gray-100 rounded transition-colors">
              Instructor
            </Link>
            <Link href="/login" className="px-4 py-2 hover:bg-gray-100 rounded transition-colors">
              Log in
            </Link>
            <Link href="/signup" className="px-4 py-2 bg-[#030256] hover:bg-[#04036a] text-white rounded transition-colors font-semibold">
              Sign up
            </Link>
          </div>

          {/* Mobile Actions */}
          <div className="flex md:hidden items-center space-x-2">
            <button
              onClick={() => setMobileSearchOpen(!mobileSearchOpen)}
              className="p-2 hover:bg-gray-100 rounded transition-colors text-gray-700"
              aria-label="Search"
            >
              🔍
            </button>
            <button
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
              className="p-2 hover:bg-gray-100 rounded transition-colors text-gray-700"
              aria-label="Menu"
            >
              {mobileMenuOpen ? '✕' : '☰'}
            </button>
          </div>
        </div>

        {/* Mobile Search Bar */}
        {mobileSearchOpen && (
          <div className="md:hidden pb-4">
            <div className="flex">
              <input
                type="text"
                placeholder="What do you want to learn?"
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="flex-1 px-4 py-2 bg-gray-100 text-gray-900 rounded-l-lg border border-gray-200 focus:outline-none focus:ring-2 focus:ring-[#030256] focus:border-[#030256]"
              />
              <button className="bg-gray-100 text-gray-700 px-4 py-2 rounded-r-lg border border-l-0 border-gray-200 hover:bg-gray-200 transition-colors">
                🔍
              </button>
            </div>
          </div>
        )}

        {/* Mobile Menu */}
        {mobileMenuOpen && (
          <div className="md:hidden border-t border-gray-200 py-4">
            <nav className="flex flex-col space-y-2">
              <Link
                href="/courses"
                className="px-4 py-2 hover:bg-gray-100 rounded transition-colors text-gray-900"
                onClick={() => setMobileMenuOpen(false)}
              >
                Explore Courses
              </Link>
              <Link
                href="/about"
                className="px-4 py-2 hover:bg-gray-100 rounded transition-colors text-gray-900"
                onClick={() => setMobileMenuOpen(false)}
              >
                About Us
              </Link>
              <Link
                href="/contact"
                className="px-4 py-2 hover:bg-gray-100 rounded transition-colors text-gray-900"
                onClick={() => setMobileMenuOpen(false)}
              >
                Contact
              </Link>
              <Link
                href="/admin/dashboard"
                className="px-4 py-2 hover:bg-gray-100 rounded transition-colors text-gray-900"
                onClick={() => setMobileMenuOpen(false)}
              >
                Admin
              </Link>
              <Link
                href="/instructor/dashboard"
                className="px-4 py-2 hover:bg-gray-100 rounded transition-colors text-gray-900"
                onClick={() => setMobileMenuOpen(false)}
              >
                Instructor
              </Link>
              <div className="border-t border-gray-200 pt-2 mt-2">
                <Link
                  href="/login"
                  className="block px-4 py-2 hover:bg-gray-100 rounded transition-colors text-gray-900"
                  onClick={() => setMobileMenuOpen(false)}
                >
                  Log in
                </Link>
                <Link
                  href="/signup"
                  className="block px-4 py-2 bg-[#030256] hover:bg-[#04036a] text-white rounded transition-colors font-semibold mt-2 text-center"
                  onClick={() => setMobileMenuOpen(false)}
                >
                  Sign up
                </Link>
              </div>
            </nav>
          </div>
        )}
      </div>
    </header>
  );
}
