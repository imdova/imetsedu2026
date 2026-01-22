'use client';

import Link from 'next/link';
import { useState } from 'react';
import { categories, courses } from '@/lib/data';

export default function CategoryMegaMenu() {
  const [isOpen, setIsOpen] = useState(false);
  const [hoveredCategory, setHoveredCategory] = useState<string | null>(null);

  const getCoursesByCategory = (categoryName: string) => {
    return courses.filter((course) => course.category === categoryName).slice(0, 4);
  };

  return (
    <div
      className="relative"
      onMouseEnter={() => setIsOpen(true)}
      onMouseLeave={() => setIsOpen(false)}
    >
      <Link
        href="/courses"
        className="px-3 py-2 hover:bg-green-700 rounded transition-colors flex items-center space-x-1"
      >
        <span>Explore Courses</span>
        <span className="text-green-300">▼</span>
      </Link>

      {isOpen && (
        <div className="absolute top-full left-0 mt-2 w-[900px] bg-white rounded-lg shadow-2xl border border-gray-200 overflow-hidden z-50">
          <div className="grid grid-cols-3 gap-0">
            {/* Categories List */}
            <div className="bg-gray-50 border-r border-gray-200">
              <div className="p-4 border-b border-gray-200">
                <h3 className="font-bold text-gray-900 text-sm uppercase tracking-wide">Categories</h3>
              </div>
              <div className="max-h-[500px] overflow-y-auto">
                {categories.map((category) => {
                  const categoryCourses = getCoursesByCategory(category.name);
                  const hasCourses = categoryCourses.length > 0;
                  
                  return (
                    <div
                      key={category.id}
                      className={`p-4 border-b border-gray-200 cursor-pointer transition-colors ${
                        hoveredCategory === category.id
                          ? 'bg-white shadow-sm'
                          : 'hover:bg-white'
                      }`}
                      onMouseEnter={() => hasCourses && setHoveredCategory(category.id)}
                    >
                      <div className="flex items-center space-x-3">
                        <span className="text-2xl">{category.icon}</span>
                        <div className="flex-1">
                          <p className="font-semibold text-gray-900 text-sm">{category.name}</p>
                          <p className="text-xs text-gray-500">{category.courseCount} courses</p>
                        </div>
                      </div>
                    </div>
                  );
                })}
              </div>
            </div>

            {/* Featured Courses for Selected Category */}
            <div className="col-span-2 p-6">
              {hoveredCategory ? (
                (() => {
                  const selectedCategory = categories.find((c) => c.id === hoveredCategory);
                  const categoryCourses = selectedCategory
                    ? getCoursesByCategory(selectedCategory.name)
                    : [];

                  return (
                    <div>
                      <div className="mb-4">
                        <h3 className="font-bold text-gray-900 text-lg flex items-center space-x-2">
                          <span>{selectedCategory?.icon}</span>
                          <span>Featured {selectedCategory?.name} Courses</span>
                        </h3>
                        <p className="text-sm text-gray-600 mt-1">
                          {selectedCategory?.courseCount} courses available
                        </p>
                      </div>
                      {categoryCourses.length > 0 ? (
                        <div className="space-y-4">
                          {categoryCourses.map((course) => (
                            <Link
                              key={course.id}
                              href={`/courses/${course.id}`}
                              className="flex items-start space-x-4 p-3 rounded-lg hover:bg-gray-50 transition-colors group"
                            >
                              <img
                                src={course.image}
                                alt={course.title}
                                className="w-24 h-16 object-cover rounded"
                              />
                              <div className="flex-1">
                                <h4 className="font-semibold text-gray-900 text-sm group-hover:text-green-600 transition-colors line-clamp-2">
                                  {course.title}
                                </h4>
                                <p className="text-xs text-gray-500 mt-1">{course.instructor}</p>
                                <div className="flex items-center space-x-2 mt-2">
                                  <span className="text-yellow-500 text-xs">⭐ {course.rating}</span>
                                  <span className="text-gray-400">•</span>
                                  <span className="text-xs text-gray-500">
                                    {course.studentCount.toLocaleString()} students
                                  </span>
                                </div>
                                <div className="mt-2">
                                  <span className="font-bold text-green-600 text-sm">
                                    ${course.price}
                                  </span>
                                  {course.originalPrice && (
                                    <>
                                      <span className="text-xs text-gray-400 line-through ml-2">
                                        ${course.originalPrice}
                                      </span>
                                    </>
                                  )}
                                </div>
                              </div>
                            </Link>
                          ))}
                          <Link
                            href={`/courses?category=${selectedCategory?.name}`}
                            className="block text-center py-3 text-green-600 font-semibold hover:bg-green-50 rounded-lg transition-colors text-sm"
                          >
                            View All {selectedCategory?.name} Courses →
                          </Link>
                        </div>
                      ) : (
                        <div className="text-center py-12">
                          <p className="text-gray-500">No courses available in this category yet.</p>
                        </div>
                      )}
                    </div>
                  );
                })()
              ) : (
                <div className="flex items-center justify-center h-full">
                  <div className="text-center">
                    <p className="text-gray-500 text-sm">Hover over a category to see featured courses</p>
                  </div>
                </div>
              )}
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
