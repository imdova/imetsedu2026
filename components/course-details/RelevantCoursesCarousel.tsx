"use client";

import { useRef } from "react";
import Link from "next/link";
import { FileText, Users } from "lucide-react";
import { Course } from "@/types/course";

interface RelevantCoursesCarouselProps {
  courses: Course[];
  currentId: string;
}

export default function RelevantCoursesCarousel({
  courses,
  currentId,
}: RelevantCoursesCarouselProps) {
  const scrollRef = useRef<HTMLDivElement>(null);

  const scroll = (dir: "left" | "right") => {
    if (!scrollRef.current) return;
    const step = 320;
    scrollRef.current.scrollBy({
      left: dir === "left" ? -step : step,
      behavior: "smooth",
    });
  };

  if (courses.length === 0) return null;

  return (
    <section className="mt-12 sm:mt-16">
      <div className="flex items-center justify-between mb-6">
        <h2 className="text-xl sm:text-2xl font-bold text-[#030256]">
          Relevant Courses
        </h2>
        <div className="flex gap-2">
          <button
            type="button"
            onClick={() => scroll("left")}
            className="w-9 h-9 rounded-full border-2 border-[#030256] text-[#030256] flex items-center justify-center hover:bg-[#030256] hover:text-white transition-colors"
            aria-label="Scroll left"
          >
            ←
          </button>
          <button
            type="button"
            onClick={() => scroll("right")}
            className="w-9 h-9 rounded-full border-2 border-[#030256] text-[#030256] flex items-center justify-center hover:bg-[#030256] hover:text-white transition-colors"
            aria-label="Scroll right"
          >
            →
          </button>
        </div>
      </div>
      <div
        ref={scrollRef}
        className="flex gap-4 overflow-x-auto pb-4 scroll-smooth"
      >
        {courses.map((course) => {
          const priceEGP = course.priceEGP ?? course.price;
          const lectureCount =
            course.lectureCount ??
            course.curriculum?.reduce((acc, s) => acc + s.lectures.length, 0) ??
            0;
          return (
            <Link
              key={course.id}
              href={`/courses/${course.id}`}
              className="shrink-0 w-72 bg-white rounded-xl border border-gray-200 overflow-hidden hover:shadow-lg transition-shadow"
            >
              <div className="relative h-36 bg-gray-200">
                <img
                  src={course.image}
                  alt={course.title}
                  className="w-full h-full object-cover"
                />
              </div>
              <div className="p-4">
                <h3 className="font-bold text-[#030256] text-sm line-clamp-2 mb-2">
                  {course.title}
                </h3>
                <div className="flex gap-1 mb-2">
                  {[...Array(5)].map((_, i) => (
                    <span
                      key={i}
                      className={
                        i < Math.floor(course.rating)
                          ? "text-amber-400"
                          : "text-gray-300"
                      }
                    >
                      ★
                    </span>
                  ))}
                </div>
                <div className="flex items-center gap-3 text-xs text-gray-600 mb-3">
                  <span className="flex items-center gap-1">
                    <FileText
                      className="h-3.5 w-3.5 shrink-0"
                      strokeWidth={2}
                    />{" "}
                    {lectureCount ? `${lectureCount} Lectures` : "—"}
                  </span>
                  <span className="flex items-center gap-1">
                    <Users className="h-3.5 w-3.5 shrink-0" strokeWidth={2} />{" "}
                    {course.studentCount.toLocaleString()} Students
                  </span>
                </div>
                <div className="flex items-center justify-between">
                  <span className="text-[#f59e0b] font-semibold text-sm">
                    Details
                  </span>
                  <span className="text-[#f59e0b] font-bold">
                    {priceEGP.toLocaleString()} EGP
                  </span>
                </div>
              </div>
            </Link>
          );
        })}
      </div>
    </section>
  );
}
