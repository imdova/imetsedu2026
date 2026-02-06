"use client";

import { useState, useEffect } from "react";
import { useParams, useRouter } from "next/navigation";
import Link from "next/link";
import { Play } from "lucide-react";
import { courses } from "@/lib/data";
import { Course } from "@/types/course";
import CourseCurriculum from "@/components/CourseCurriculum";
import CourseTabs from "@/components/CourseTabs";

export default function InstructorCourseDetailsPage() {
  const params = useParams();
  const router = useRouter();
  const courseId = params.id as string;
  const [course, setCourse] = useState<Course | undefined>(undefined);

  useEffect(() => {
    const foundCourse = courses.find((c) => c.id === courseId);
    setCourse(foundCourse);
  }, [courseId]);

  if (!course) {
    return (
      <div className="p-8 text-center">
        <div className="text-4xl mb-4">📚</div>
        <h2 className="text-2xl font-bold text-gray-900 mb-2">
          Course not found
        </h2>
        <p className="text-gray-600 mb-6">
          The course you're looking for doesn't exist.
        </p>
        <Link
          href="/instructor/courses"
          className="inline-block bg-blue-600 text-white px-6 py-3 rounded-lg font-semibold hover:bg-blue-700 transition-colors"
        >
          Back to Courses
        </Link>
      </div>
    );
  }

  const totalLectures =
    course.curriculum?.reduce(
      (acc, section) => acc + section.lectures.length,
      0
    ) || 0;
  const totalSections = course.curriculum?.length || 0;
  const discountPercentage = course.originalPrice
    ? Math.round(
        ((course.originalPrice - course.price) / course.originalPrice) * 100
      )
    : 0;

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Header with Back Button */}
      <div className="bg-white border-b border-gray-200">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-4">
          <div className="flex items-center justify-between">
            <div className="flex items-center space-x-4">
              <button
                onClick={() => router.back()}
                className="text-gray-600 hover:text-gray-900 transition-colors"
              >
                ← Back
              </button>
              <div className="h-6 w-px bg-gray-300"></div>
              <Link
                href="/instructor/courses"
                className="text-gray-600 hover:text-gray-900 transition-colors"
              >
                My Courses
              </Link>
            </div>
            <div className="flex items-center space-x-3">
              <Link
                href={`/instructor/courses/${course.id}/edit`}
                className="px-4 py-2 bg-blue-600 text-white rounded-lg font-semibold hover:bg-blue-700 transition-colors text-sm"
              >
                Edit Course
              </Link>
              <Link
                href={`/courses/${course.id}`}
                className="px-4 py-2 bg-gray-100 text-gray-700 rounded-lg font-semibold hover:bg-gray-200 transition-colors text-sm"
              >
                View as Student
              </Link>
            </div>
          </div>
        </div>
      </div>

      {/* Course Title Section */}
      <div className="bg-white border-b border-gray-200">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-4 sm:py-6">
          <h1 className="text-xl sm:text-2xl lg:text-3xl font-bold text-gray-900 mb-3 sm:mb-4">
            {course.title}
          </h1>

          <div className="flex flex-wrap items-center gap-2 sm:gap-4 text-xs sm:text-sm text-gray-600">
            <div className="flex items-center">
              <span className="mr-1 sm:mr-2">📅</span>
              <span className="whitespace-nowrap">
                Created:{" "}
                {course.createdAt
                  ? new Date(course.createdAt).toLocaleDateString("en-US", {
                      month: "short",
                      day: "numeric",
                      year: "numeric",
                    })
                  : "N/A"}
              </span>
            </div>
            <div className="flex items-center">
              <span className="mr-1 sm:mr-2">🔄</span>
              <span className="whitespace-nowrap">
                Updated:{" "}
                {new Date(course.lastUpdated).toLocaleDateString("en-US", {
                  month: "short",
                  day: "numeric",
                  year: "numeric",
                })}
              </span>
            </div>
            <div className="flex items-center">
              <img
                src={course.instructorImage || `https://i.pravatar.cc/40?img=1`}
                alt={course.instructor}
                className="w-6 h-6 sm:w-8 sm:h-8 rounded-full mr-1 sm:mr-2"
              />
              <span className="truncate max-w-[120px] sm:max-w-none">
                {course.instructor}
              </span>
            </div>
            <span className="px-2 sm:px-3 py-1 bg-gray-100 text-gray-700 rounded-full text-xs font-semibold whitespace-nowrap">
              {course.category}
            </span>
            {course.subCategory && (
              <span className="px-2 sm:px-3 py-1 bg-gray-100 text-gray-700 rounded-full text-xs font-semibold whitespace-nowrap">
                {course.subCategory}
              </span>
            )}
            <span className="px-2 sm:px-3 py-1 bg-green-100 text-green-700 rounded-full text-xs font-semibold flex items-center whitespace-nowrap">
              <Play
                className="h-3.5 w-3.5 mr-1 shrink-0"
                strokeWidth={2}
                fill="currentColor"
              />
              Recorded
            </span>
            <div className="flex items-center">
              <span className="text-yellow-500 mr-1">★</span>
              <span className="text-gray-600">
                {course.rating} ({course.reviewCount} reviews)
              </span>
            </div>
          </div>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-4 sm:py-6 lg:py-8">
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 lg:gap-8">
          {/* Main Content */}
          <div className="lg:col-span-2">
            {/* Course Image/Video Preview */}
            <div className="bg-black rounded-lg overflow-hidden shadow-lg mb-6 relative">
              <div
                className="relative w-full"
                style={{ paddingBottom: "56.25%" }}
              >
                <img
                  src={course.image}
                  alt={course.title}
                  className="absolute top-0 left-0 w-full h-full object-cover"
                />
                <div className="absolute inset-0 flex items-center justify-center">
                  <button
                    className="bg-white/90 hover:bg-white rounded-full p-4 transition-all flex items-center justify-center"
                    aria-label="Play"
                  >
                    <Play
                      className="h-8 w-8 text-gray-900 ml-0.5"
                      strokeWidth={2}
                      fill="currentColor"
                    />
                  </button>
                </div>
              </div>
            </div>

            {/* Course Stats Cards */}
            <div className="grid grid-cols-2 sm:grid-cols-4 gap-4 mb-6">
              <div className="bg-white rounded-lg border border-gray-200 p-4 text-center">
                <div className="text-2xl mb-2">👥</div>
                <div className="text-2xl font-bold text-gray-900">
                  {course.studentCount.toLocaleString()}
                </div>
                <div className="text-xs text-gray-600 mt-1">Students</div>
              </div>
              <div className="bg-white rounded-lg border border-gray-200 p-4 text-center">
                <div className="text-2xl mb-2">📚</div>
                <div className="text-2xl font-bold text-gray-900">
                  {totalLectures}
                </div>
                <div className="text-xs text-gray-600 mt-1">Lessons</div>
              </div>
              <div className="bg-white rounded-lg border border-gray-200 p-4 text-center">
                <div className="text-2xl mb-2">⭐</div>
                <div className="text-2xl font-bold text-gray-900">
                  {course.rating}
                </div>
                <div className="text-xs text-gray-600 mt-1">Rating</div>
              </div>
              <div className="bg-white rounded-lg border border-gray-200 p-4 text-center">
                <div className="text-2xl mb-2">💬</div>
                <div className="text-2xl font-bold text-gray-900">
                  {course.reviewCount}
                </div>
                <div className="text-xs text-gray-600 mt-1">Reviews</div>
              </div>
            </div>

            {/* Navigation Tabs */}
            <CourseTabs />

            {/* Course Overview */}
            <section className="mb-6 sm:mb-8 bg-white rounded-lg border border-gray-200 p-6">
              <h2 className="text-xl sm:text-2xl font-bold text-gray-900 mb-3 sm:mb-4">
                Course Overview
              </h2>
              <div className="prose max-w-none">
                <p className="text-gray-700 leading-relaxed mb-4">
                  {course.description}
                </p>
                <p className="text-gray-700 leading-relaxed">
                  {course.shortDescription}
                </p>
              </div>
              <div className="flex flex-wrap gap-2 mt-4">
                <span className="px-3 py-1 bg-gray-100 text-gray-700 rounded text-sm">
                  Recorded
                </span>
                <span className="px-3 py-1 bg-gray-100 text-gray-700 rounded text-sm">
                  {course.category}
                </span>
                {course.subCategory && (
                  <span className="px-3 py-1 bg-gray-100 text-gray-700 rounded text-sm">
                    {course.subCategory}
                  </span>
                )}
                <span className="px-3 py-1 bg-gray-100 text-gray-700 rounded text-sm">
                  {course.level}
                </span>
                <span className="px-3 py-1 bg-gray-100 text-gray-700 rounded text-sm">
                  {course.language}
                </span>
              </div>
            </section>

            {/* What You Will Learn */}
            {course.whatYouWillLearn && course.whatYouWillLearn.length > 0 && (
              <section className="mb-6 sm:mb-8 bg-white rounded-lg border border-gray-200 p-6">
                <h2 className="text-xl sm:text-2xl font-bold text-gray-900 mb-2">
                  What You Will Learn In This Course
                </h2>
                <p className="text-xs sm:text-sm text-gray-600 mb-3 sm:mb-4">
                  After this course you will be able to
                </p>
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 sm:gap-4">
                  {course.whatYouWillLearn.map((item, index) => (
                    <div key={index} className="flex items-start">
                      <span className="text-green-600 mr-3 mt-1 text-xl">
                        ✓
                      </span>
                      <span className="text-gray-700">{item}</span>
                    </div>
                  ))}
                </div>
              </section>
            )}

            {/* Requirements */}
            {course.requirements && course.requirements.length > 0 && (
              <section className="mb-6 sm:mb-8 bg-white rounded-lg border border-gray-200 p-6">
                <h2 className="text-xl sm:text-2xl font-bold text-gray-900 mb-2">
                  Who can attend this course?
                </h2>
                <p className="text-xs sm:text-sm text-gray-600 mb-3 sm:mb-4">
                  You must have these to attend this course
                </p>
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 sm:gap-4">
                  {course.requirements.map((req, index) => (
                    <div key={index} className="flex items-start">
                      <span className="text-green-600 mr-3 mt-1 text-xl">
                        ✓
                      </span>
                      <span className="text-gray-700">{req}</span>
                    </div>
                  ))}
                </div>
              </section>
            )}

            {/* Course Curriculum */}
            {course.curriculum && course.curriculum.length > 0 && (
              <section className="mb-8 bg-white rounded-lg border border-gray-200 p-6">
                <h2 className="text-2xl font-bold text-gray-900 mb-2">
                  Course Curriculum
                </h2>
                <p className="text-sm text-gray-600 mb-4">
                  {totalSections} Sections, {totalLectures} Lectures, 0 Quizzes
                </p>
                <CourseCurriculum sections={course.curriculum} />
              </section>
            )}

            {/* Course Information */}
            <section className="mb-6 sm:mb-8 bg-white rounded-lg border border-gray-200 p-6">
              <h2 className="text-xl sm:text-2xl font-bold text-gray-900 mb-3 sm:mb-4">
                Course Information
              </h2>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div>
                  <span className="text-sm text-gray-600">Level:</span>
                  <span className="ml-2 font-semibold text-gray-900">
                    {course.level}
                  </span>
                </div>
                <div>
                  <span className="text-sm text-gray-600">Duration:</span>
                  <span className="ml-2 font-semibold text-gray-900">
                    {course.duration}
                  </span>
                </div>
                <div>
                  <span className="text-sm text-gray-600">Language:</span>
                  <span className="ml-2 font-semibold text-gray-900">
                    {course.language}
                  </span>
                </div>
                <div>
                  <span className="text-sm text-gray-600">Last Updated:</span>
                  <span className="ml-2 font-semibold text-gray-900">
                    {new Date(course.lastUpdated).toLocaleDateString("en-US", {
                      month: "long",
                      day: "numeric",
                      year: "numeric",
                    })}
                  </span>
                </div>
                {course.createdAt && (
                  <div>
                    <span className="text-sm text-gray-600">Created:</span>
                    <span className="ml-2 font-semibold text-gray-900">
                      {new Date(course.createdAt).toLocaleDateString("en-US", {
                        month: "long",
                        day: "numeric",
                        year: "numeric",
                      })}
                    </span>
                  </div>
                )}
              </div>
            </section>
          </div>

          {/* Sidebar */}
          <div className="lg:col-span-1">
            <div className="sticky top-20 space-y-6">
              {/* Course Pricing */}
              <div className="bg-white border border-gray-200 rounded-lg shadow-sm p-6">
                <h3 className="text-lg font-bold text-gray-900 mb-4">
                  Pricing
                </h3>
                <div className="space-y-3">
                  {course.price === 0 ? (
                    <div className="text-3xl font-bold text-green-600">
                      Free
                    </div>
                  ) : (
                    <>
                      {course.originalPrice &&
                        course.originalPrice > course.price && (
                          <div className="flex items-center space-x-2">
                            <span className="text-lg text-gray-500 line-through">
                              ${course.originalPrice.toFixed(2)}
                            </span>
                            {discountPercentage > 0 && (
                              <span className="px-2 py-1 bg-red-100 text-red-700 rounded-full text-xs font-semibold">
                                {discountPercentage}% OFF
                              </span>
                            )}
                          </div>
                        )}
                      <div className="text-3xl font-bold text-gray-900">
                        ${course.price.toFixed(2)}
                      </div>
                    </>
                  )}
                </div>
              </div>

              {/* Course Features */}
              <div className="bg-white border border-gray-200 rounded-lg shadow-sm p-6">
                <h3 className="text-lg font-bold text-gray-900 mb-4">
                  Course Features
                </h3>
                <div className="space-y-4">
                  <div className="flex items-center justify-between">
                    <div className="flex items-center">
                      <span className="text-gray-600 mr-2">📊</span>
                      <span className="text-gray-700">Level</span>
                    </div>
                    <span className="text-gray-900 font-semibold capitalize">
                      {course.level.toLowerCase()}
                    </span>
                  </div>
                  <div className="flex items-center justify-between">
                    <div className="flex items-center">
                      <span className="text-gray-600 mr-2">📚</span>
                      <span className="text-gray-700">Lessons</span>
                    </div>
                    <span className="text-gray-900 font-semibold">
                      {totalLectures}
                    </span>
                  </div>
                  <div className="flex items-center justify-between">
                    <div className="flex items-center">
                      <span className="text-gray-600 mr-2">📝</span>
                      <span className="text-gray-700">Sections</span>
                    </div>
                    <span className="text-gray-900 font-semibold">
                      {totalSections}
                    </span>
                  </div>
                  <div className="flex items-center justify-between">
                    <div className="flex items-center">
                      <span className="text-gray-600 mr-2">👥</span>
                      <span className="text-gray-700">Students</span>
                    </div>
                    <span className="text-gray-900 font-semibold">
                      {course.studentCount.toLocaleString()}
                    </span>
                  </div>
                  <div className="flex items-center justify-between">
                    <div className="flex items-center">
                      <span className="text-gray-600 mr-2">⭐</span>
                      <span className="text-gray-700">Rating</span>
                    </div>
                    <span className="text-gray-900 font-semibold">
                      {course.rating} / 5.0
                    </span>
                  </div>
                  <div className="flex items-center justify-between">
                    <div className="flex items-center">
                      <span className="text-gray-600 mr-2">💬</span>
                      <span className="text-gray-700">Reviews</span>
                    </div>
                    <span className="text-gray-900 font-semibold">
                      {course.reviewCount}
                    </span>
                  </div>
                </div>
              </div>

              {/* Quick Actions */}
              <div className="bg-white border border-gray-200 rounded-lg shadow-sm p-6">
                <h3 className="text-lg font-bold text-gray-900 mb-4">
                  Quick Actions
                </h3>
                <div className="space-y-3">
                  <Link
                    href={`/instructor/courses/${course.id}/edit`}
                    className="w-full bg-blue-600 text-white py-3 rounded-lg font-semibold hover:bg-blue-700 transition-colors flex items-center justify-center"
                  >
                    Edit Course
                  </Link>
                  <Link
                    href={`/courses/${course.id}`}
                    className="w-full bg-gray-100 text-gray-700 py-3 rounded-lg font-semibold hover:bg-gray-200 transition-colors flex items-center justify-center"
                  >
                    View as Student
                  </Link>
                  <button className="w-full bg-green-600 text-white py-3 rounded-lg font-semibold hover:bg-green-700 transition-colors flex items-center justify-center">
                    Manage Students
                  </button>
                </div>
              </div>

              {/* Course Status */}
              <div className="bg-white border border-gray-200 rounded-lg shadow-sm p-6">
                <h3 className="text-lg font-bold text-gray-900 mb-4">
                  Course Status
                </h3>
                <div className="space-y-3">
                  <div className="flex items-center justify-between">
                    <span className="text-gray-700">Status</span>
                    <span className="px-3 py-1 bg-green-100 text-green-700 rounded-full text-sm font-semibold">
                      Published
                    </span>
                  </div>
                  <div className="flex items-center justify-between">
                    <span className="text-gray-700">Visibility</span>
                    <span className="text-gray-900 font-semibold">Public</span>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
