'use client';

import { useState } from 'react';
import { CourseSection } from '@/types/course';

interface CourseCurriculumProps {
  sections: CourseSection[];
}

export default function CourseCurriculum({ sections }: CourseCurriculumProps) {
  const [openSections, setOpenSections] = useState<Set<string>>(new Set([sections[0]?.id]));

  const toggleSection = (sectionId: string) => {
    const newOpenSections = new Set(openSections);
    if (newOpenSections.has(sectionId)) {
      newOpenSections.delete(sectionId);
    } else {
      newOpenSections.add(sectionId);
    }
    setOpenSections(newOpenSections);
  };

  return (
    <div className="border border-gray-200 rounded-lg overflow-hidden">
      {sections.map((section, index) => (
        <div key={section.id} className={index > 0 ? 'border-t border-gray-200' : ''}>
          <button
            onClick={() => toggleSection(section.id)}
            className="w-full p-4 bg-gray-50 hover:bg-gray-100 cursor-pointer flex justify-between items-center"
          >
            <span className="font-semibold text-gray-900">{section.title}</span>
            <div className="flex items-center space-x-2">
              <span className="text-sm text-gray-600">{section.lectures.length} lectures</span>
              <span className={`transform transition-transform ${openSections.has(section.id) ? 'rotate-180' : ''}`}>
                ▼
              </span>
            </div>
          </button>
          {openSections.has(section.id) && (
            <div className="p-4 bg-white">
              <ul className="space-y-3">
                {section.lectures.map((lecture) => (
                  <li key={lecture.id} className="flex items-center justify-between py-2 border-b border-gray-100 last:border-0">
                    <div className="flex items-center">
                      {lecture.isPreview && (
                        <span className="text-xs bg-blue-100 text-blue-600 px-2 py-1 rounded mr-3">
                          Preview
                        </span>
                      )}
                      <span className="text-gray-700">{lecture.title}</span>
                    </div>
                    <span className="text-sm text-gray-600">{lecture.duration}</span>
                  </li>
                ))}
              </ul>
            </div>
          )}
        </div>
      ))}
    </div>
  );
}
