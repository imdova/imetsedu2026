"use client";

import Link from "next/link";
import { Library, CalendarDays, Users, Monitor, ArrowRight } from "lucide-react";
import type { Course } from "@/types/course";
import { ROUTES } from "@/constants";
import { StarRating } from "@/components/ui";

interface PopularCourseCardProps {
  course: Course;
}

export default function PopularCourseCard({ course }: PopularCourseCardProps) {
  const detailsPath = ROUTES.COURSE_DETAIL(course.id);
  const priceEGP = course.priceEGP ?? course.price;
  const originalEGP = course.originalPriceEGP ?? course.originalPrice;
  const lectureCount = course.lectureCount ?? 0;
  const freq = course.lectureFrequency ?? "1 Lecture-Weekly";
  const delivery = course.deliveryMode ?? "Online-Zoom";

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
            <div className="absolute top-2 left-2 bg-primary text-white px-2.5 py-1 rounded text-xs font-semibold">
              Best Seller
            </div>
          )}
        </div>
      </Link>
      <div className="p-4">
        <Link href={detailsPath}>
          <h3 className="font-bold text-base mb-2 line-clamp-2 text-black">
            {course.title}
          </h3>
        </Link>
        <StarRating
          rating={course.rating}
          reviewCount={course.reviewCount}
          className="mb-2"
        />
        <div className="flex flex-wrap items-center gap-x-4 gap-y-2 text-xs text-gray-600 mb-3">
          <span className="flex items-center gap-1.5">
            <Library className="h-3.5 w-3.5 text-[#0a47c2] shrink-0" strokeWidth={2} />
            {lectureCount} Lectures
          </span>
          <span className="flex items-center gap-1.5">
            <CalendarDays className="h-3.5 w-3.5 text-amber-600 shrink-0" strokeWidth={2} />
            {freq}
          </span>
          <span className="flex items-center gap-1.5">
            <Users className="h-3.5 w-3.5 text-emerald-600 shrink-0" strokeWidth={2} />
            {course.studentCount.toLocaleString()} Students
          </span>
          <span className="flex items-center gap-1.5">
            <Monitor className="h-3.5 w-3.5 text-gray-500 shrink-0" strokeWidth={2} />
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
          className="flex items-center justify-center gap-2 w-full bg-[#0a47c2] hover:bg-[#083a9e] text-white py-2.5 px-4 rounded-lg font-semibold transition-colors text-sm"
        >
          Details
          <ArrowRight className="h-4 w-4 shrink-0" strokeWidth={2.5} />
        </Link>
      </div>
    </div>
  );
}
