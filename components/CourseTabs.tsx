'use client';

import { useState } from 'react';

export default function CourseTabs() {
  const [activeTab, setActiveTab] = useState('overview');

  const tabs = [
    { id: 'overview', label: 'Overview' },
    { id: 'instructors', label: 'Instructors' },
    { id: 'reviews', label: 'Reviews' },
    { id: 'certificate', label: 'Certificate' },
  ];

  return (
    <div className="border-b border-gray-200 mb-6">
      <div className="flex space-x-8">
        {tabs.map((tab) => (
          <button
            key={tab.id}
            onClick={() => setActiveTab(tab.id)}
            className={`pb-4 transition-colors ${
              activeTab === tab.id
                ? 'border-b-2 border-blue-600 text-blue-600 font-semibold'
                : 'text-gray-600 hover:text-gray-900'
            }`}
          >
            {tab.label}
          </button>
        ))}
      </div>
    </div>
  );
}
