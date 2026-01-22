'use client';

import Link from 'next/link';
import { useState } from 'react';

export default function Header() {
  const [searchQuery, setSearchQuery] = useState('');

  return (
    <header className="bg-green-600 text-white sticky top-0 z-50 shadow-md">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center h-16">
          <div className="flex items-center space-x-6">
            <Link href="/" className="flex items-center space-x-2">
              <span className="text-2xl font-bold">m</span>
              <span className="text-xl font-bold">medicova</span>
            </Link>
            <div className="hidden md:flex items-center space-x-1">
              <Link href="/courses" className="px-3 py-2 hover:bg-green-700 rounded transition-colors">
                Explore Courses
              </Link>
              <span className="text-green-300">▼</span>
            </div>
          </div>
          
          <div className="hidden md:flex flex-1 max-w-md mx-8">
            <input
              type="text"
              placeholder="What do you want to learn?"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="w-full px-4 py-2 bg-white text-gray-900 rounded-l-lg focus:outline-none focus:ring-2 focus:ring-green-300"
            />
            <button className="bg-white text-green-600 px-4 py-2 rounded-r-lg hover:bg-gray-100 transition-colors">
              🔍
            </button>
          </div>

          <div className="flex items-center space-x-4">
            <Link href="/instructor/dashboard" className="hidden md:block px-4 py-2 hover:bg-green-700 rounded transition-colors">
              Instructor
            </Link>
            <button className="px-4 py-2 hover:bg-green-700 rounded transition-colors">
              Log in
            </button>
            <button className="px-4 py-2 bg-green-500 hover:bg-green-400 rounded transition-colors font-semibold">
              Join as instructor
            </button>
          </div>
        </div>
      </div>
    </header>
  );
}
