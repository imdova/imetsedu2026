'use client';

import { useState } from 'react';

type TabId = 'overview' | 'reviews' | 'news' | 'syllabus';

const TABS: { id: TabId; label: string }[] = [
  { id: 'overview', label: 'Overview' },
  { id: 'reviews', label: 'Reviews' },
  { id: 'news', label: 'News' },
  { id: 'syllabus', label: 'Syllabus' },
];

interface CourseDetailsTabsProps {
  overview: React.ReactNode;
  reviews?: React.ReactNode;
  news?: React.ReactNode;
  syllabus?: React.ReactNode;
}

export default function CourseDetailsTabs({
  overview,
  reviews,
  news,
  syllabus,
}: CourseDetailsTabsProps) {
  const [activeTab, setActiveTab] = useState<TabId>('overview');

  const panels: Record<TabId, React.ReactNode> = {
    overview,
    reviews: reviews ?? <TabPlaceholder title="Reviews" />,
    news: news ?? <TabPlaceholder title="News" />,
    syllabus: syllabus ?? <TabPlaceholder title="Syllabus" />,
  };

  return (
    <div className="bg-white">
      <div className="flex flex-wrap border-b border-gray-200">
        {TABS.map((tab) => (
          <button
            key={tab.id}
            type="button"
            onClick={() => setActiveTab(tab.id)}
            className={`px-5 py-3.5 text-sm font-semibold transition-colors border border-gray-200 border-b-0 -mb-px ${
              activeTab === tab.id
                ? 'bg-[#030256] text-white border-[#030256]'
                : 'bg-white text-[#030256] hover:bg-gray-50'
            }`}
          >
            {tab.label}
          </button>
        ))}
      </div>
      <div className="py-6 sm:py-8 px-4 sm:px-6 border-x border-b border-gray-200">
        {panels[activeTab]}
      </div>
    </div>
  );
}

function TabPlaceholder({ title }: { title: string }) {
  return (
    <p className="text-gray-500 text-center py-12">
      {title} content coming soon.
    </p>
  );
}
