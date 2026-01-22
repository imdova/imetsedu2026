'use client';

import Link from 'next/link';
import { Course } from '@/types/course';
import { useState } from 'react';

interface CourseCardProps {
  course: Course;
}

export default function CourseCard({ course }: CourseCardProps) {
  const [isSaved, setIsSaved] = useState(false);
  
  const discountPercentage = course.originalPrice
    ? Math.round(((course.originalPrice - course.price) / course.originalPrice) * 100)
    : 0;

  const totalLessons = course.curriculum?.reduce((acc, section) => acc + section.lectures.length, 0) || 0;
  
  // Convert duration to weeks (assuming format like "24.5 hours" or "2 weeks")
  const getWeeks = () => {
    if (course.duration.includes('week')) {
      return course.duration;
    }
    // If it's in hours, convert roughly (assuming 10 hours per week)
    const hours = parseFloat(course.duration) || 0;
    const weeks = Math.round((hours / 10) * 10) / 10;
    return weeks === 0 ? '0 weeks' : `${weeks} weeks`;
  };

  const handleSave = (e: React.MouseEvent) => {
    e.preventDefault();
    e.stopPropagation();
    setIsSaved(!isSaved);
  };

  const handleAddToCart = (e: React.MouseEvent) => {
    e.preventDefault();
    e.stopPropagation();
    // Handle add to cart logic
  };

  const handleEnroll = (e: React.MouseEvent) => {
    e.preventDefault();
    e.stopPropagation();
    // Handle enroll logic
  };

  return (
    <div className="bg-white rounded-lg shadow-md overflow-hidden hover:shadow-xl transition-shadow duration-300">
      {/* Image/Video Thumbnail Area */}
      <Link href={`/courses/${course.id}`} className="block relative">
        <div className="relative h-48 w-full bg-gray-200 overflow-hidden">
          <img
            src={course.image}
            alt={course.title}
            className="w-full h-full object-cover"
          />
          
          {/* Recorded Tag - Top Left */}
          <div className="absolute top-2 left-2 bg-gray-100 bg-opacity-95 text-gray-700 px-2 py-1 rounded text-xs font-medium flex items-center">
            <span className="mr-1 text-white bg-gray-400 rounded p-0.5">📹</span>
            <span className="text-gray-700">recorded</span>
          </div>

          {/* Save Button - Top Right */}
          <button
            onClick={handleSave}
            className="absolute top-2 right-2 bg-white bg-opacity-90 hover:bg-opacity-100 p-1.5 rounded-full transition-all shadow-sm"
            aria-label="Save course"
          >
            <span className={`text-lg ${isSaved ? 'text-red-500' : 'text-gray-600'}`}>
              {isSaved ? '❤️' : '🤍'}
            </span>
          </button>

          {/* Discount Tag - Top Right (below save button) */}
          {discountPercentage > 0 && (
            <div className="absolute top-11 right-2 bg-red-500 text-white px-2.5 py-1 rounded-full text-xs font-bold shadow-md">
              {discountPercentage}%
            </div>
          )}

          {/* Play Icon - Bottom Right */}
          <div className="absolute bottom-3 right-3 bg-black bg-opacity-70 rounded-full p-2.5 hover:bg-opacity-90 transition-all">
            <span className="text-white text-lg">▶</span>
          </div>
        </div>
      </Link>
      
      {/* Course Information Area */}
      <div className="p-4">
        {/* Course Title */}
        <Link href={`/courses/${course.id}`}>
          <h3 className="font-bold text-lg mb-3 line-clamp-2 text-gray-900 hover:text-green-600 transition-colors">
            {course.title}
          </h3>
        </Link>

        {/* Instructor and Rating */}
        <div className="flex items-center justify-between mb-3">
          <div className="flex items-center">
            <img
              src={course.instructorImage || `https://i.pravatar.cc/40?img=1`}
              alt={course.instructor}
              className="w-6 h-6 rounded-full mr-2"
            />
            <span className="text-sm text-gray-700">{course.instructor}</span>
          </div>
          <div className="flex items-center">
            {[...Array(5)].map((_, i) => (
              <span
                key={i}
                className={i < Math.floor(course.rating) ? 'text-yellow-400' : 'text-gray-300'}
              >
                ★
              </span>
            ))}
            <span className="text-xs text-gray-600 ml-1">
              ({course.reviewCount} Reviews)
            </span>
          </div>
        </div>

        {/* Course Metrics */}
        <div className="flex items-center space-x-3 mb-4 text-sm text-gray-600">
          <div className="flex items-center">
            <span className="mr-1.5 text-base">📖</span>
            <span>{totalLessons} Lessons</span>
          </div>
          <div className="flex items-center">
            <span className="mr-1.5 text-base">🕒</span>
            <span>{getWeeks()}</span>
          </div>
          <div className="flex items-center">
            <span className="mr-1.5 text-base">🎓</span>
            <span>{course.studentCount} Students</span>
          </div>
        </div>

        {/* Pricing */}
        <div className="mb-4">
          {course.price === 0 ? (
            <div className="text-2xl font-bold text-green-600">Free</div>
          ) : (
            <div>
              {course.originalPrice && (
                <div className="flex items-center mb-1">
                  <span className="text-sm text-gray-500 line-through mr-2">
                    ${course.originalPrice.toFixed(2)}
                  </span>
                  {discountPercentage > 0 && (
                    <span className="bg-red-500 text-white text-xs px-2 py-0.5 rounded-full font-bold">
                      {discountPercentage}%
                    </span>
                  )}
                </div>
              )}
              <div className="text-2xl font-bold text-gray-900">
                ${course.price.toFixed(2)}
              </div>
            </div>
          )}
        </div>

        {/* Action Buttons */}
        <div className="flex items-center space-x-2">
          <button
            onClick={handleEnroll}
            className="flex-1 bg-green-600 text-white py-2.5 px-4 rounded-lg font-semibold hover:bg-green-700 transition-colors flex items-center justify-center text-sm"
          >
            Enroll
            <span className="ml-1">→</span>
          </button>
          {course.price > 0 && (
            <button
              onClick={handleAddToCart}
              className="w-11 h-11 border border-gray-300 rounded-lg hover:bg-gray-50 hover:border-gray-400 transition-colors flex items-center justify-center"
              aria-label="Add to cart"
            >
              <span className="text-lg">🛒</span>
            </button>
          )}
        </div>
      </div>
    </div>
  );
}
