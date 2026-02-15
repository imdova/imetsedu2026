"use client";

import Link from "next/link";
import { useState } from "react";
import { Search } from "lucide-react";
import { ROUTES } from "@/constants";
import CategoryMegaMenu from "@/components/CategoryMegaMenu";
import Image from "next/image";
import TransparentHeaderWrapper from "./transparent-header-wrapper";

export const TransparentHeader: React.FC = () => {
    const [searchQuery, setSearchQuery] = useState("");
    const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
    const [mobileSearchOpen, setMobileSearchOpen] = useState(false);
  
  return (
    <TransparentHeaderWrapper>
      <div className="mx-auto max-w-360 px-4 ">
         <div className="flex justify-between items-center h-16">
          <div className="flex items-center space-x-4 sm:space-x-6">
            <Link href={ROUTES.HOME} className="flex items-center">
              <Image
                src="/images/logo.png"
                alt="IMETS school of business"
                className="h-8 sm:h-10 w-auto"
                width={32}
                height={32}
              />
            </Link>
            <nav className="hidden md:flex items-center space-x-1">
              <CategoryMegaMenu />
              <Link
                href={ROUTES.ABOUT}
                className="px-3 py-2 hover:bg-gray-100 rounded transition-colors"
              >
                About Us
              </Link>
              <Link
                href={ROUTES.CONTACT}
                className="px-3 py-2 hover:bg-gray-100 rounded transition-colors"
              >
                Contact Us
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
              className="w-full px-4 py-2 bg-gray-100 text-gray-900 rounded-l-lg border border-gray-200 focus:outline-none focus:ring-2 focus:ring-primary focus:border-primary"
            />
            <button
              type="button"
              className="bg-gray-100 text-gray-600 px-4 py-2 rounded-r-lg border border-l-0 border-gray-200 hover:bg-gray-200 transition-colors"
              aria-label="Search"
            >
              <Search className="h-4 w-4" strokeWidth={2} />
            </button>
          </div>

          {/* Desktop Actions */}
          <div className="hidden md:flex items-center space-x-4">
            <Link
              href={ROUTES.ADMIN.DASHBOARD}
              className="px-4 py-2 hover:bg-gray-100 rounded transition-colors"
            >
              Admin
            </Link>
            <Link
              href={ROUTES.STUDENT.DASHBOARD}
              className="px-4 py-2 hover:bg-gray-100 rounded transition-colors"
            >
              Student
            </Link>
            <Link
              href={ROUTES.INSTRUCTOR.DASHBOARD}
              className="px-4 py-2 hover:bg-gray-100 rounded transition-colors"
            >
              Instructor
            </Link>
            <Link
              href={ROUTES.LOGIN}
              className="px-4 py-2 hover:bg-gray-100 rounded transition-colors"
            >
              Log in
            </Link>
            <Link
              href={ROUTES.SIGNUP}
              className="px-4 py-2 bg-primary hover:bg-primary/90 text-white rounded transition-colors font-semibold"
            >
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
              {mobileMenuOpen ? "✕" : "☰"}
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
                className="flex-1 px-4 py-2 bg-gray-100 text-gray-900 rounded-l-lg border border-gray-200 focus:outline-none focus:ring-2 focus:ring-primary focus:border-primary"
              />
              <button
                type="button"
                className="bg-gray-100 text-gray-600 px-4 py-2 rounded-r-lg border border-l-0 border-gray-200 hover:bg-gray-200 transition-colors"
                aria-label="Search"
              >
                <Search className="h-4 w-4" strokeWidth={2} />
              </button>
            </div>
          </div>
        )}

        {/* Mobile Menu */}
        {mobileMenuOpen && (
          <div className="md:hidden border-t border-gray-200 py-4">
            <nav className="flex flex-col space-y-2">
              <Link
                href={ROUTES.COURSES}
                className="px-4 py-2 hover:bg-gray-100 rounded transition-colors text-gray-900"
                onClick={() => setMobileMenuOpen(false)}
              >
                Explore Courses
              </Link>
              <Link
                href={ROUTES.ABOUT}
                className="px-4 py-2 hover:bg-gray-100 rounded transition-colors text-gray-900"
                onClick={() => setMobileMenuOpen(false)}
              >
                About Us
              </Link>
              <Link
                href={ROUTES.CONTACT}
                className="px-4 py-2 hover:bg-gray-100 rounded transition-colors text-gray-900"
                onClick={() => setMobileMenuOpen(false)}
              >
                Contact Us
              </Link>
              <Link
                href={ROUTES.ADMIN.DASHBOARD}
                className="px-4 py-2 hover:bg-gray-100 rounded transition-colors text-gray-900"
                onClick={() => setMobileMenuOpen(false)}
              >
                Admin
              </Link>
              <Link
                href={ROUTES.STUDENT.DASHBOARD}
                className="px-4 py-2 hover:bg-gray-100 rounded transition-colors text-gray-900"
                onClick={() => setMobileMenuOpen(false)}
              >
                Student
              </Link>
              <Link
                href={ROUTES.INSTRUCTOR.DASHBOARD}
                className="px-4 py-2 hover:bg-gray-100 rounded transition-colors text-gray-900"
                onClick={() => setMobileMenuOpen(false)}
              >
                Instructor
              </Link>
              <div className="border-t border-gray-200 pt-2 mt-2">
                <Link
                  href={ROUTES.LOGIN}
                  className="block px-4 py-2 hover:bg-gray-100 rounded transition-colors text-gray-900"
                  onClick={() => setMobileMenuOpen(false)}
                >
                  Log in
                </Link>
                <Link
                  href={ROUTES.SIGNUP}
                  className="block px-4 py-2 bg-primary hover:bg-primary/90 text-white rounded transition-colors font-semibold mt-2 text-center"
                  onClick={() => setMobileMenuOpen(false)}
                >
                  Sign up
                </Link>
              </div>
            </nav>
          </div>
        )}
      </div>
    </TransparentHeaderWrapper>
  );
};
