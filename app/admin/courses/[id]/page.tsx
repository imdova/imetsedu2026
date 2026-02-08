"use client";

import { useParams, useRouter } from "next/navigation";
import Link from "next/link";
import { courses, getCourseLessonCount } from "@/lib/courses";
import { ROUTES } from "@/constants/routes";
import { ArrowLeft, Edit, Users, BookOpen, Clock } from "lucide-react";

export default function AdminCourseViewPage() {
  const params = useParams();
  const router = useRouter();
  const id = typeof params.id === "string" ? params.id : "";
  const course = courses.find((c) => c.id === id);

  if (!course) {
    return (
      <div className="min-h-screen bg-[#F5F5F5] p-6">
        <div className="bg-white rounded-xl shadow-sm border border-gray-100 p-8 text-center">
          <p className="text-gray-600 mb-4">Course not found.</p>
          <Link
            href={ROUTES.ADMIN.COURSES}
            className="inline-flex items-center gap-2 text-admin-primary font-medium hover:underline"
          >
            <ArrowLeft className="w-4 h-4" />
            Back to courses
          </Link>
        </div>
      </div>
    );
  }

  const price = course.priceEGP ?? course.price;
  const revenue = price * course.studentCount;
  const lessonCount = getCourseLessonCount(course);

  return (
    <div className="min-h-screen bg-[#F5F5F5] p-6">
      <div className="mb-6">
        <Link
          href={ROUTES.ADMIN.COURSES}
          className="inline-flex items-center gap-2 text-gray-600 hover:text-gray-900 text-sm font-medium"
        >
          <ArrowLeft className="w-4 h-4" />
          Back to courses
        </Link>
      </div>

      <div className="bg-white rounded-xl shadow-sm border border-gray-100 overflow-hidden">
        <div className="aspect-video max-h-[320px] bg-gray-200">
          <img
            src={course.image}
            alt={course.title}
            className="w-full h-full object-cover"
          />
        </div>
        <div className="p-6">
          <div className="flex flex-wrap items-start justify-between gap-4">
            <div>
              <h1 className="text-2xl font-bold text-gray-900">{course.title}</h1>
              <p className="text-gray-500 mt-1">
                {course.category}
                {course.subCategory ? ` · ${course.subCategory}` : ""}
              </p>
            </div>
            <Link
              href={ROUTES.ADMIN.COURSE_EDIT(course.id)}
              className="inline-flex items-center gap-2 px-4 py-2 bg-admin-primary text-white rounded-lg font-medium text-sm hover:bg-admin-primary-hover transition-colors"
            >
              <Edit className="w-4 h-4" />
              Edit course
            </Link>
          </div>

          <p className="text-gray-600 mt-4 max-w-2xl">
            {course.shortDescription || course.description}
          </p>

          <div className="grid grid-cols-2 sm:grid-cols-4 gap-4 mt-6">
            <div className="flex items-center gap-3 p-3 rounded-lg bg-gray-50">
              <Users className="w-5 h-5 text-admin-primary" />
              <div>
                <p className="text-xs text-gray-500">Enrollments</p>
                <p className="font-semibold text-gray-900">
                  {course.studentCount.toLocaleString()}
                </p>
              </div>
            </div>
            <div className="flex items-center gap-3 p-3 rounded-lg bg-gray-50">
              <BookOpen className="w-5 h-5 text-admin-primary" />
              <div>
                <p className="text-xs text-gray-500">Lessons</p>
                <p className="font-semibold text-gray-900">{lessonCount}</p>
              </div>
            </div>
            <div className="flex items-center gap-3 p-3 rounded-lg bg-gray-50">
              <Clock className="w-5 h-5 text-admin-primary" />
              <div>
                <p className="text-xs text-gray-500">Duration</p>
                <p className="font-semibold text-gray-900">{course.duration}</p>
              </div>
            </div>
            <div className="flex items-center gap-3 p-3 rounded-lg bg-gray-50">
              <span className="text-lg font-bold text-emerald-600">EGP</span>
              <div>
                <p className="text-xs text-gray-500">Revenue</p>
                <p className="font-semibold text-gray-900">
                  {revenue.toLocaleString("en-US", { maximumFractionDigits: 0 })}
                </p>
              </div>
            </div>
          </div>

          <div className="mt-6 pt-6 border-t border-gray-100 grid sm:grid-cols-2 gap-6">
            <div>
              <h3 className="text-sm font-semibold text-gray-700 mb-2">
                Price
              </h3>
              <p className="text-gray-900 font-medium">
                {price.toLocaleString("en-US")} EGP
                {course.originalPriceEGP ?? course.originalPrice ? (
                  <span className="text-gray-500 line-through ml-2">
                    {(course.originalPriceEGP ?? course.originalPrice)!.toLocaleString("en-US")}{" "}
                    EGP
                  </span>
                ) : null}
              </p>
            </div>
            <div>
              <h3 className="text-sm font-semibold text-gray-700 mb-2">
                Instructor
              </h3>
              <p className="text-gray-900">{course.instructor}</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
