"use client";

import { useState, useMemo } from "react";
import PopularCourseCard from "./PopularCourseCard";
import { getPopularCourses, POPULAR_FILTER_TABS } from "@/lib/data";
import type { Course } from "@/types/course";

function filterByTab(courses: Course[], tab: string): Course[] {
  if (tab === "All") return courses;
  return courses.filter((c) => {
    if (c.popularFilter === tab) return true;
    if (c.popularFilterTags?.includes(tab)) return true;
    return false;
  });
}

export default function PopularCoursesSection() {
  const [activeTab, setActiveTab] = useState<string>("All");
  const popularCourses = useMemo(() => getPopularCourses(), []);
  const filtered = useMemo(
    () => filterByTab(popularCourses, activeTab),
    [popularCourses, activeTab]
  );

  return (
    <section className="py-8 sm:py-12 lg:py-16 bg-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <h2 className="text-2xl sm:text-3xl font-bold text-black mb-6">
          Popular courses
        </h2>
        <div className="flex flex-wrap gap-2 mb-8">
          {POPULAR_FILTER_TABS.map((tab) => (
            <button
              key={tab}
              type="button"
              onClick={() => setActiveTab(tab)}
              className={`px-4 py-2 rounded-lg text-sm font-semibold transition-colors border ${
                activeTab === tab
                  ? "bg-primary text-white border-primary"
                  : "bg-white text-primary border-gray-300 hover:border-primary hover:bg-gray-50"
              }`}
            >
              {tab}
            </button>
          ))}
        </div>
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 sm:gap-6">
          {filtered.map((course) => (
            <PopularCourseCard key={course.id} course={course} />
          ))}
        </div>
        {filtered.length === 0 && (
          <p className="text-center text-gray-500 py-12">
            No courses match this filter.
          </p>
        )}
      </div>
    </section>
  );
}
