"use client";

import { useMemo, useState } from "react";
import Link from "next/link";
import {
  ArrowLeft,
  SlidersHorizontal,
  ChevronDown,
  BookOpen,
  Sparkles,
} from "lucide-react";
import CourseCard from "@/components/CourseCard";
import { ROUTES } from "@/constants";
import type { Course } from "@/types/course";
import type { SubCategory } from "@/types/course";

type LevelFilter = "all" | "Beginner" | "Intermediate" | "Advanced";
type SortOption = "default" | "rating" | "price-asc" | "price-desc";

const LEVEL_OPTIONS: { value: LevelFilter; label: string }[] = [
  { value: "all", label: "All levels" },
  { value: "Beginner", label: "Beginner" },
  { value: "Intermediate", label: "Intermediate" },
  { value: "Advanced", label: "Advanced" },
];

const SORT_OPTIONS: { value: SortOption; label: string }[] = [
  { value: "default", label: "Recommended" },
  { value: "rating", label: "Highest rated" },
  { value: "price-asc", label: "Price: low to high" },
  { value: "price-desc", label: "Price: high to low" },
];

const PROGRAM_TYPE_OPTIONS = [
  { value: "Course", label: "Course" },
  { value: "Diploma", label: "Diploma" },
  { value: "Certificate", label: "Certificate" },
  { value: "Bootcamp", label: "Bootcamp" },
] as const;

const ATTENDANCE_MODE_OPTIONS = [
  { value: "Online", label: "Online" },
  { value: "In-person", label: "In-person" },
  { value: "Hybrid", label: "Hybrid" },
] as const;

function getProgramTypeFromCourse(course: Course): string {
  const t = course.title;
  if (/diploma/i.test(t)) return "Diploma";
  if (/preparation|certification|certificate/i.test(t)) return "Certificate";
  if (/bootcamp/i.test(t)) return "Bootcamp";
  return "Course";
}

function getAttendanceModeFromCourse(course: Course): string | null {
  const d = (course.deliveryMode ?? "").toLowerCase();
  if (/online|zoom|remote/.test(d)) return "Online";
  if (/hybrid/.test(d)) return "Hybrid";
  if (/in-person|onsite|on-site|face-to-face/.test(d)) return "In-person";
  return d ? "Online" : null;
}

type Props = {
  categoryName: string;
  categoryId: string;
  iconBg: string;
  subCategories: SubCategory[];
  courses: Course[];
};

export default function CategoryPageClient({
  categoryName,
  categoryId,
  iconBg,
  subCategories,
  courses,
}: Props) {
  const [subcategoryId, setSubcategoryId] = useState<string | "all">("all");
  const [subcategoryCheckboxes, setSubcategoryCheckboxes] = useState<
    string[]
  >([]);
  const [levelFilter, setLevelFilter] = useState<LevelFilter>("all");
  const [programTypes, setProgramTypes] = useState<string[]>([]);
  const [attendanceModes, setAttendanceModes] = useState<string[]>([]);
  const [sortBy, setSortBy] = useState<SortOption>("default");
  const [filterOpen, setFilterOpen] = useState(true);

  const toggleSubcategory = (id: string) => {
    setSubcategoryCheckboxes((prev) =>
      prev.includes(id) ? prev.filter((x) => x !== id) : [...prev, id]
    );
  };

  const toggleProgramType = (value: string) => {
    setProgramTypes((prev) =>
      prev.includes(value) ? prev.filter((x) => x !== value) : [...prev, value]
    );
  };

  const toggleAttendanceMode = (value: string) => {
    setAttendanceModes((prev) =>
      prev.includes(value) ? prev.filter((x) => x !== value) : [...prev, value]
    );
  };

  const filteredAndSortedCourses = useMemo(() => {
    let list = courses;

    if (subcategoryCheckboxes.length > 0) {
      const names = subcategoryCheckboxes
        .map((id) => subCategories.find((s) => s.id === id)?.name)
        .filter(Boolean) as string[];
      list = list.filter((c) =>
        names.some(
          (n) => c.subCategory?.toLowerCase() === n.toLowerCase()
        )
      );
    } else if (subcategoryId !== "all") {
      const sub = subCategories.find((s) => s.id === subcategoryId);
      if (sub)
        list = list.filter(
          (c) => c.subCategory?.toLowerCase() === sub.name.toLowerCase()
        );
    }

    if (levelFilter !== "all") {
      list = list.filter((c) => c.level === levelFilter);
    }

    if (programTypes.length > 0) {
      list = list.filter((c) =>
        programTypes.includes(getProgramTypeFromCourse(c))
      );
    }

    if (attendanceModes.length > 0) {
      list = list.filter((c) => {
        const mode = getAttendanceModeFromCourse(c);
        return mode && attendanceModes.includes(mode);
      });
    }

    list = [...list];
    switch (sortBy) {
      case "rating":
        list.sort((a, b) => b.rating - a.rating);
        break;
      case "price-asc":
        list.sort((a, b) => a.price - b.price);
        break;
      case "price-desc":
        list.sort((a, b) => b.price - a.price);
        break;
      default:
        break;
    }
    return list;
  }, [
    courses,
    subcategoryId,
    subcategoryCheckboxes,
    subCategories,
    levelFilter,
    programTypes,
    attendanceModes,
    sortBy,
  ]);

  return (
    <div className="min-h-screen bg-[#f8fafc]">
      {/* Header: headline + short description */}
      <header className="bg-white border-b border-gray-200/80">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 sm:py-10">
          <Link
            href={ROUTES.COURSES}
            className="inline-flex items-center gap-2 text-[#0a47c2] hover:text-[#083a9e] text-sm font-medium mb-6 transition-colors"
          >
            <ArrowLeft className="h-4 w-4" strokeWidth={2} />
            All courses
          </Link>
          <div className="flex flex-wrap items-start gap-5">
            <div
              className={`flex-shrink-0 w-14 h-14 sm:w-16 sm:h-16 rounded-2xl flex items-center justify-center ${iconBg}`}
              aria-hidden
            >
              <BookOpen className="h-7 w-7 sm:h-8 sm:w-8" strokeWidth={2} />
            </div>
            <div className="min-w-0">
              <h1 className="text-3xl sm:text-4xl lg:text-5xl font-bold text-gray-900 tracking-tight mb-2">
                {categoryName}
              </h1>
              <p className="text-gray-600 text-base sm:text-lg max-w-2xl">
                Explore courses in {categoryName}. Find the right program to
                advance your career—from fundamentals to advanced topics.
              </p>
            </div>
          </div>
        </div>
      </header>

      {/* Main: sidebar filters + course grid */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 lg:py-10">
        {courses.length === 0 ? (
          <div className="rounded-2xl bg-white border border-gray-200 p-12 text-center shadow-sm">
            <Sparkles className="h-12 w-12 text-gray-300 mx-auto mb-4" />
            <p className="text-gray-600 mb-4">
              No courses in this category yet. Check back later or browse all
              courses.
            </p>
            <Link
              href={ROUTES.COURSES}
              className="inline-flex items-center gap-2 text-[#0a47c2] font-medium hover:underline"
            >
              Browse all courses
              <ArrowLeft className="h-4 w-4 rotate-180" strokeWidth={2} />
            </Link>
          </div>
        ) : (
          <div className="flex flex-col lg:flex-row gap-8">
            {/* Left sidebar: filters */}
            <aside className="lg:w-56 flex-shrink-0">
              <div className="lg:sticky lg:top-24">
                <button
                  type="button"
                  onClick={() => setFilterOpen((o) => !o)}
                  className="flex items-center justify-between w-full lg:hidden py-3 px-4 bg-white rounded-xl border border-gray-200 text-gray-700 font-medium"
                >
                  <span className="flex items-center gap-2">
                    <SlidersHorizontal className="h-4 w-4" />
                    Filters
                  </span>
                  <ChevronDown
                    className={`h-4 w-4 transition-transform ${filterOpen ? "rotate-180" : ""}`}
                  />
                </button>
                <div
                  className={`${
                    filterOpen ? "block" : "hidden"
                  } lg:block mt-4 lg:mt-0 bg-white rounded-2xl border border-gray-200 shadow-sm overflow-hidden`}
                >
                  <div className="p-4 border-b border-gray-100">
                    <h2 className="text-sm font-semibold text-gray-900 flex items-center gap-2">
                      <SlidersHorizontal className="h-4 w-4 text-[#0a47c2]" />
                      Filters
                    </h2>
                  </div>

                  <div className="p-4 space-y-6">
                    {subCategories.length > 0 && (
                      <div>
                        <h3 className="text-xs font-semibold text-gray-500 uppercase tracking-wider mb-3">
                          Subcategories
                        </h3>
                        <ul className="space-y-1.5 max-h-40 overflow-y-auto">
                          {subCategories.map((sub) => (
                            <li key={sub.id}>
                              <label className="flex items-center gap-3 cursor-pointer group">
                                <input
                                  type="checkbox"
                                  checked={subcategoryCheckboxes.includes(sub.id)}
                                  onChange={() => toggleSubcategory(sub.id)}
                                  className="w-4 h-4 rounded border-gray-300 text-[#0a47c2] focus:ring-[#0a47c2]"
                                />
                                <span className="text-sm text-gray-700 group-hover:text-gray-900">
                                  {sub.name}
                                </span>
                              </label>
                            </li>
                          ))}
                        </ul>
                      </div>
                    )}

                    <div>
                      <h3 className="text-xs font-semibold text-gray-500 uppercase tracking-wider mb-3">
                        Level
                      </h3>
                      <ul className="space-y-1.5">
                        {LEVEL_OPTIONS.map((opt) => (
                          <li key={opt.value}>
                            <label className="flex items-center gap-3 cursor-pointer group">
                              <input
                                type="radio"
                                name="level"
                                value={opt.value}
                                checked={levelFilter === opt.value}
                                onChange={() => setLevelFilter(opt.value as LevelFilter)}
                                className="w-4 h-4 text-[#0a47c2] border-gray-300 focus:ring-[#0a47c2]"
                              />
                              <span className="text-sm text-gray-700 group-hover:text-gray-900">
                                {opt.label}
                              </span>
                            </label>
                          </li>
                        ))}
                      </ul>
                    </div>

                    <div>
                      <h3 className="text-xs font-semibold text-gray-500 uppercase tracking-wider mb-3">
                        Program type
                      </h3>
                      <ul className="space-y-1.5">
                        {PROGRAM_TYPE_OPTIONS.map((opt) => (
                          <li key={opt.value}>
                            <label className="flex items-center gap-3 cursor-pointer group">
                              <input
                                type="checkbox"
                                checked={programTypes.includes(opt.value)}
                                onChange={() => toggleProgramType(opt.value)}
                                className="w-4 h-4 rounded border-gray-300 text-[#0a47c2] focus:ring-[#0a47c2]"
                              />
                              <span className="text-sm text-gray-700 group-hover:text-gray-900">
                                {opt.label}
                              </span>
                            </label>
                          </li>
                        ))}
                      </ul>
                    </div>

                    <div>
                      <h3 className="text-xs font-semibold text-gray-500 uppercase tracking-wider mb-3">
                        Attendance mode
                      </h3>
                      <ul className="space-y-1.5">
                        {ATTENDANCE_MODE_OPTIONS.map((opt) => (
                          <li key={opt.value}>
                            <label className="flex items-center gap-3 cursor-pointer group">
                              <input
                                type="checkbox"
                                checked={attendanceModes.includes(opt.value)}
                                onChange={() => toggleAttendanceMode(opt.value)}
                                className="w-4 h-4 rounded border-gray-300 text-[#0a47c2] focus:ring-[#0a47c2]"
                              />
                              <span className="text-sm text-gray-700 group-hover:text-gray-900">
                                {opt.label}
                              </span>
                            </label>
                          </li>
                        ))}
                      </ul>
                    </div>

                    <div>
                      <h3 className="text-xs font-semibold text-gray-500 uppercase tracking-wider mb-3">
                        Sort by
                      </h3>
                      <select
                        value={sortBy}
                        onChange={(e) =>
                          setSortBy(e.target.value as SortOption)
                        }
                        className="w-full rounded-lg border border-gray-200 px-3 py-2 text-sm text-gray-700 bg-gray-50 focus:bg-white focus:ring-2 focus:ring-[#0a47c2]/20 focus:border-[#0a47c2] outline-none"
                      >
                        {SORT_OPTIONS.map((opt) => (
                          <option key={opt.value} value={opt.value}>
                            {opt.label}
                          </option>
                        ))}
                      </select>
                    </div>
                  </div>
                </div>
              </div>
            </aside>

            {/* Course cards + subcategory tabs aligned above */}
            <div className="flex-1 min-w-0">
              {/* Subcategory tabs: just above and aligned with course cards */}
              {subCategories.length > 0 && (
                <div className="flex gap-1 overflow-x-auto mb-4 -mx-px">
                  <button
                    type="button"
                    onClick={() => {
                      setSubcategoryId("all");
                      setSubcategoryCheckboxes([]);
                    }}
                    className={`shrink-0 px-4 py-2.5 text-sm font-medium rounded-lg transition-colors ${
                      subcategoryId === "all" && subcategoryCheckboxes.length === 0
                        ? "bg-[#0a47c2] text-white shadow-sm"
                        : "bg-white border border-gray-200 text-gray-600 hover:bg-gray-50 hover:text-gray-900"
                    }`}
                  >
                    All
                  </button>
                  {subCategories.map((sub) => (
                    <button
                      key={sub.id}
                      type="button"
                      onClick={() => {
                        setSubcategoryId(sub.id);
                        setSubcategoryCheckboxes([sub.id]);
                      }}
                      className={`shrink-0 px-4 py-2.5 text-sm font-medium rounded-lg transition-colors whitespace-nowrap ${
                        subcategoryId === sub.id ||
                        subcategoryCheckboxes.includes(sub.id)
                          ? "bg-[#0a47c2] text-white shadow-sm"
                          : "bg-white border border-gray-200 text-gray-600 hover:bg-gray-50 hover:text-gray-900"
                      }`}
                    >
                      {sub.name}
                    </button>
                  ))}
                </div>
              )}
              <p className="text-sm text-gray-500 mb-4">
                {filteredAndSortedCourses.length} course
                {filteredAndSortedCourses.length !== 1 ? "s" : ""}
              </p>
              <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-6">
                {filteredAndSortedCourses.map((course) => (
                  <CourseCard key={course.id} course={course} />
                ))}
              </div>
              {filteredAndSortedCourses.length === 0 && (
                <div className="rounded-2xl bg-white border border-gray-200 p-10 text-center">
                  <p className="text-gray-600">
                    No courses match the current filters. Try changing level or
                    subcategory.
                  </p>
                </div>
              )}
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
