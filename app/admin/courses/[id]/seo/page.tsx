"use client";

import { useParams } from "next/navigation";
import Link from "next/link";
import { courses } from "@/lib/courses";
import { ROUTES } from "@/constants/routes";
import { ArrowLeft } from "lucide-react";

export default function AdminCourseSeoPage() {
  const params = useParams();
  const id = typeof params.id === "string" ? params.id : "";
  const course = courses.find((c) => c.id === id);

  if (!course) {
    return (
      <div className="min-h-screen bg-[#F5F5F5] p-6">
        <div className="bg-white rounded-xl shadow-sm border border-gray-100 p-8 text-center">
          <p className="text-gray-600 mb-4">Course not found.</p>
          <Link
            href={ROUTES.ADMIN.COURSES}
            className="inline-flex items-center gap-2 text-primary font-medium hover:underline"
          >
            <ArrowLeft className="w-4 h-4" />
            Back to courses
          </Link>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-[#F5F5F5] p-6">
      <div className="mb-6">
        <Link
          href={ROUTES.ADMIN.COURSE(id)}
          className="inline-flex items-center gap-2 text-gray-600 hover:text-gray-900 text-sm font-medium"
        >
          <ArrowLeft className="w-4 h-4" />
          Back to course
        </Link>
      </div>

      <div className="bg-white rounded-xl shadow-sm border border-gray-100 overflow-hidden max-w-2xl">
        <div className="p-6 border-b border-gray-100">
          <h1 className="text-xl font-bold text-gray-900">SEO</h1>
          <p className="text-sm text-gray-500 mt-1">{course.title}</p>
        </div>
        <div className="p-6 space-y-4 text-sm text-gray-600">
          <p>Configure meta title, description, and keywords for this course.</p>
          <p className="text-gray-400">SEO form can be added here.</p>
        </div>
      </div>
    </div>
  );
}
