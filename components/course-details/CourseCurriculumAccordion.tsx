'use client';

import { useState } from 'react';
import { CourseSection } from '@/types/course';

interface CourseCurriculumAccordionProps {
  sections: CourseSection[];
}

export default function CourseCurriculumAccordion({ sections }: CourseCurriculumAccordionProps) {
  const [openId, setOpenId] = useState<string | null>(sections[0]?.id ?? null);

  return (
    <div className="space-y-2">
      {sections.map((section, index) => {
        const isOpen = openId === section.id;
        return (
          <div key={section.id} className="rounded-lg overflow-hidden">
            <button
              type="button"
              onClick={() => setOpenId(isOpen ? null : section.id)}
              className="w-full flex items-center justify-between px-4 py-3.5 bg-[#030256] text-white text-left font-semibold hover:bg-[#04036a] transition-colors"
            >
              <span>Module {index + 1}: {section.title}</span>
              <span className={`transform transition-transform ${isOpen ? 'rotate-180' : ''}`}>
                ▼
              </span>
            </button>
            {isOpen && (
              <div className="border border-t-0 border-gray-200 bg-gray-50 p-4">
                <ul className="space-y-2">
                  {section.lectures.map((lecture) => (
                    <li
                      key={lecture.id}
                      className="flex items-center justify-between py-2 text-gray-700 text-sm"
                    >
                      <span className="flex items-center gap-2">
                        {lecture.isPreview && (
                          <span className="bg-[#e8e8f5] text-[#030256] px-2 py-0.5 rounded text-xs font-medium">
                            Preview
                          </span>
                        )}
                        {lecture.title}
                      </span>
                      <span className="text-gray-500">{lecture.duration}</span>
                    </li>
                  ))}
                </ul>
              </div>
            )}
          </div>
        );
      })}
    </div>
  );
}
