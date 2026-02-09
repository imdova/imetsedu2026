"use client";

import Link from "next/link";
import { useState } from "react";
import {
  Video,
  Play,
  Heart,
  Library,
  CalendarDays,
  Users,
  ShoppingCart,
  ArrowRight,
} from "lucide-react";
import type { Course } from "@/types/course";
import {
  getCourseLessonCount,
  getCourseWeeksLabel,
  getDiscountPercentage,
} from "@/lib/courses";
import { ROUTES } from "@/constants";
import { StarRating } from "@/components/ui";

interface CourseCardProps {
  course: Course;
  detailsPath?: string;
  className?: string;
}

const DEFAULT_INSTRUCTOR_IMAGE = "https://i.pravatar.cc/40?img=1";

export default function CourseCard({ course, detailsPath, className }: CourseCardProps) {
  const courseDetailsPath = detailsPath ?? ROUTES.COURSE_DETAIL(course.id);
  const [isSaved, setIsSaved] = useState(false);
  const discountPercentage = getDiscountPercentage(
    course.price,
    course.originalPrice
  );
  const totalLessons = getCourseLessonCount(course);
  const weeksLabel = getCourseWeeksLabel(course.duration);

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
    <div className={`bg-white rounded-lg shadow-md overflow-hidden hover:shadow-xl transition-shadow duration-300 w-full min-w-0 ${className ?? ""}`}>
      {/* Image/Video Thumbnail Area */}
      <Link href={courseDetailsPath} className="block relative">
        <div className="relative h-48 w-full bg-gray-200 overflow-hidden">
          <img
            src={course.image}
            alt={course.title}
            className="w-full h-full object-cover"
          />

          {/* Recorded Tag - Top Left */}
          <div className="absolute top-2 left-2 bg-white/95 backdrop-blur-sm text-gray-700 px-2.5 py-1.5 rounded-md text-xs font-medium flex items-center gap-1.5 shadow-sm border border-gray-100">
            <Video className="h-3.5 w-3.5 text-[#0a47c2]" strokeWidth={2.5} />
            <span>Recorded</span>
          </div>

          {/* Save Button - Top Right */}
          <button
            onClick={handleSave}
            className="absolute top-2 right-2 bg-white/90 hover:bg-white p-1.5 rounded-full transition-all shadow-sm text-gray-600 hover:text-red-500"
            aria-label={isSaved ? "Unsave course" : "Save course"}
          >
            <Heart
              className={`h-5 w-5 ${
                isSaved ? "fill-red-500 text-red-500" : ""
              }`}
              strokeWidth={2}
            />
          </button>

          {/* Discount Tag - Top Right (below save button) */}
          {discountPercentage > 0 && (
            <div className="absolute top-11 right-2 bg-red-500 text-white px-2.5 py-1 rounded-full text-xs font-bold shadow-md">
              {discountPercentage}%
            </div>
          )}

          {/* Play Icon - Bottom Right */}
          <div className="absolute bottom-3 right-3 bg-[#0a47c2]/90 hover:bg-[#0a47c2] text-white rounded-full p-2.5 transition-all flex items-center justify-center shadow-lg">
            <Play
              className="h-5 w-5 ml-0.5"
              strokeWidth={2.5}
              fill="currentColor"
            />
          </div>
        </div>
      </Link>

      {/* Course Information Area */}
      <div className="p-4">
        {/* Course Title */}
        <Link href={courseDetailsPath}>
          <h3 className="font-bold text-lg mb-3 line-clamp-2 text-black">
            {course.title}
          </h3>
        </Link>

        {/* Instructor and Rating */}
        <div className="flex items-center justify-between mb-3">
          <div className="flex items-center">
            <img
              src={course.instructorImage ?? DEFAULT_INSTRUCTOR_IMAGE}
              alt={course.instructor}
              className="w-6 h-6 rounded-full mr-2"
            />
            <span className="text-sm text-gray-700">{course.instructor}</span>
          </div>
          <StarRating rating={course.rating} reviewCount={course.reviewCount} />
        </div>

        {/* Course Metrics */}
        <div className="flex flex-wrap items-center gap-x-4 gap-y-2 mb-4 text-sm text-gray-600">
          <div className="flex items-center gap-2">
            <span className="flex h-8 w-8 items-center justify-center rounded-lg bg-[#0a47c2]/10 text-[#0a47c2]">
              <Library className="h-4 w-4 shrink-0" strokeWidth={2} />
            </span>
            <span>{totalLessons} Lessons</span>
          </div>
          <div className="flex items-center gap-2">
            <span className="flex h-8 w-8 items-center justify-center rounded-lg bg-amber-500/10 text-amber-600">
              <CalendarDays className="h-4 w-4 shrink-0" strokeWidth={2} />
            </span>
            <span>{weeksLabel}</span>
          </div>
          <div className="flex items-center gap-2">
            <span className="flex h-8 w-8 items-center justify-center rounded-lg bg-emerald-500/10 text-emerald-600">
              <Users className="h-4 w-4 shrink-0" strokeWidth={2} />
            </span>
            <span>{course.studentCount} Students</span>
          </div>
        </div>

        {/* Pricing */}
        <div className="mb-4">
          {course.price === 0 ? (
            <div className="text-2xl font-bold text-primary">Free</div>
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
        <div className="flex items-center gap-2">
          <button
            onClick={handleEnroll}
            className="flex-1 bg-[#0a47c2] text-white py-2.5 px-4 rounded-lg font-semibold hover:bg-[#083a9e] transition-colors flex items-center justify-center gap-2 text-sm"
          >
            Enroll
            <ArrowRight className="h-4 w-4 shrink-0" strokeWidth={2.5} />
          </button>
          {course.price > 0 && (
            <button
              onClick={handleAddToCart}
              className="h-11 w-11 shrink-0 border border-gray-300 rounded-lg hover:bg-gray-50 hover:border-[#0a47c2]/50 transition-colors flex items-center justify-center text-[#0a47c2]"
              aria-label="Add to cart"
            >
              <ShoppingCart className="h-5 w-5" strokeWidth={2} />
            </button>
          )}
        </div>
      </div>
    </div>
  );
}
