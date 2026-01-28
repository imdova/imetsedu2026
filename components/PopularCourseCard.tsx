'use client';

import Link from 'next/link';
import { Course } from '@/types/course';

interface PopularCourseCardProps {
  course: Course;
}

export default function PopularCourseCard({ course }: PopularCourseCardProps) {
  const detailsPath = `/courses/${course.id}`;
  const priceEGP = course.priceEGP ?? course.price;
  const originalEGP = course.originalPriceEGP ?? course.originalPrice;
  const lectureCount = course.lectureCount ?? 0;
  const freq = course.lectureFrequency ?? '1 Lecture-Weekly';
  const delivery = course.deliveryMode ?? 'Online-Zoom';

  return (
    <div className="bg-white rounded-lg border border-gray-200 overflow-hidden hover:shadow-lg transition-shadow duration-300">
      <Link href={detailsPath} className="block relative">
        <div className="relative h-40 sm:h-44 w-full bg-gray-200 overflow-hidden">
          <img
            src={course.image}
            alt={course.title}
            className="w-full h-full object-cover"
          />
          {course.isBestSeller && (
            <div className="absolute top-2 left-2 bg-[#030256] text-white px-2.5 py-1 rounded text-xs font-semibold">
              Best Seller
            </div>
          )}
        </div>
      </Link>
      <div className="p-4">
        <Link href={detailsPath}>
          <h3 className="font-bold text-base mb-2 line-clamp-2 text-[#030256] hover:text-[#04036a] transition-colors">
            {course.title}
          </h3>
        </Link>
        <div className="flex items-center gap-1 mb-2">
          {[...Array(5)].map((_, i) => (
            <span
              key={i}
              className={i < Math.floor(course.rating) ? 'text-yellow-400' : 'text-gray-300'}
            >
              ★
            </span>
          ))}
          <span className="text-xs text-gray-600 ml-1">
            ({course.reviewCount.toLocaleString()} Reviews)
          </span>
        </div>
        <div className="flex flex-wrap items-center gap-x-3 gap-y-1 text-xs text-gray-600 mb-3">
          <span className="flex items-center">
            <span className="mr-1">📖</span>
            {lectureCount} Lectures
          </span>
          <span className="flex items-center">
            <span className="mr-1">🕒</span>
            {freq}
          </span>
          <span className="flex items-center">
            <span className="mr-1">👥</span>
            {course.studentCount.toLocaleString()} Students
          </span>
          <span className="flex items-center">
            <span className="mr-1">💻</span>
            {delivery}
          </span>
        </div>
        <div className="mb-4">
          {originalEGP != null && originalEGP > priceEGP && (
            <span className="text-sm text-gray-400 line-through mr-2">
              {originalEGP.toLocaleString()} EGP
            </span>
          )}
          <span className="text-lg font-bold text-[#030256]">
            {priceEGP.toLocaleString()} EGP
          </span>
        </div>
        <Link
          href={detailsPath}
          className="block w-full text-center bg-[#f59e0b] hover:bg-[#d97706] text-white py-2.5 px-4 rounded-lg font-semibold transition-colors text-sm"
        >
          Details →
        </Link>
      </div>
    </div>
  );
}
