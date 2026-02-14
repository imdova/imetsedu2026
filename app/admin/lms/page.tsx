"use client";

import { useState, useMemo, useEffect } from "react";
import Link from "next/link";
import { ROUTES } from "@/constants";
import {
  lmsStats,
  lmsCourses,
  type LMSCourseRow,
  type CourseStatus,
} from "./lms-data";
import {
  Search,
  ChevronDown,
  Filter,
  Plus,
  FileText,
  Gauge,
  TrendingUp,
  Clock,
  MoreHorizontal,
  BarChart3,
} from "lucide-react";

const CATEGORIES = ["All Categories", "Leadership", "Technical", "Compliance"];
const SUBCATEGORIES_BY_CATEGORY: Record<string, string[]> = {
  Leadership: [
    "All Subcategories",
    "Project Management",
    "Management",
    "Team Building",
  ],
  Technical: ["All Subcategories", "Infrastructure", "Development", "Security"],
  Compliance: ["All Subcategories", "Regulatory", "Data Protection", "Audit"],
};
const STATUS_OPTIONS = ["All", "Active", "Scheduled", "Draft"];

const PER_PAGE = 4;

export default function AdminLMSManagementPage() {
  const [search, setSearch] = useState("");
  const [category, setCategory] = useState("All Categories");
  const [subcategory, setSubcategory] = useState("All Subcategories");
  const [statusFilter, setStatusFilter] = useState("All");
  const [page, setPage] = useState(1);

  const subcategoryOptions = useMemo(() => {
    if (category === "All Categories") return ["All Subcategories"];
    return SUBCATEGORIES_BY_CATEGORY[category] ?? ["All Subcategories"];
  }, [category]);

  useEffect(() => {
    if (!subcategoryOptions.includes(subcategory)) {
      setSubcategory("All Subcategories");
    }
  }, [category, subcategoryOptions, subcategory]);

  const filteredCourses = useMemo(() => {
    return lmsCourses.filter((c) => {
      const matchSearch =
        !search ||
        c.courseName.toLowerCase().includes(search.toLowerCase()) ||
        c.instructor.toLowerCase().includes(search.toLowerCase());
      const matchCategory =
        category === "All Categories" || c.category === category;
      const matchSubcategory =
        subcategory === "All Subcategories" || c.subcategory === subcategory;
      const matchStatus = statusFilter === "All" || c.status === statusFilter;
      return matchSearch && matchCategory && matchSubcategory && matchStatus;
    });
  }, [search, category, subcategory, statusFilter]);

  const totalPages = Math.ceil(filteredCourses.length / PER_PAGE) || 1;
  const currentPage = Math.min(page, totalPages);
  const paginatedCourses = useMemo(
    () =>
      filteredCourses.slice(
        (currentPage - 1) * PER_PAGE,
        currentPage * PER_PAGE
      ),
    [filteredCourses, currentPage]
  );

  return (
    <div className="min-h-screen bg-[#F8F9FA] p-6">
      {/* Page header */}
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4 mb-6">
        <div>
          <h1 className="text-2xl font-bold text-gray-900">
            LMS Course Management
          </h1>
          <p className="text-gray-600 mt-1">
            Monitor and organize your academy&apos;s academic catalog.
          </p>
        </div>
        <Link
          href={ROUTES.ADMIN.LMS_NEW}
          className="inline-flex items-center justify-center gap-2 px-4 py-2.5 bg-primary text-white rounded-lg font-medium hover:bg-primary/90 transition-colors shrink-0"
        >
          <Plus className="w-5 h-5" strokeWidth={2} />
          Add New LMS
        </Link>
      </div>

      {/* KPI cards */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-6">
        <div className="bg-white rounded-xl shadow-sm border border-gray-100 p-5 flex items-start gap-4">
          <div className="w-12 h-12 rounded-full bg-blue-100 flex items-center justify-center shrink-0">
            <FileText className="w-6 h-6 text-blue-600" strokeWidth={2} />
          </div>
          <div className="min-w-0">
            <p className="text-sm font-medium text-gray-500">
              Total Active Courses
            </p>
            <p className="text-2xl font-bold text-gray-900 mt-0.5">
              {lmsStats.totalActiveCourses}
            </p>
            <p className="text-sm text-emerald-600 mt-1 flex items-center gap-1">
              <TrendingUp className="w-4 h-4" strokeWidth={2} />
              {lmsStats.totalActiveCoursesTrend}
            </p>
          </div>
        </div>
        <div className="bg-white rounded-xl shadow-sm border border-gray-100 p-5 flex items-start gap-4">
          <div className="w-12 h-12 rounded-full bg-violet-100 flex items-center justify-center shrink-0">
            <Gauge className="w-6 h-6 text-violet-600" strokeWidth={2} />
          </div>
          <div className="min-w-0">
            <p className="text-sm font-medium text-gray-500">Total Lessons</p>
            <p className="text-2xl font-bold text-gray-900 mt-0.5">
              {lmsStats.totalLessons.toLocaleString()}
            </p>
            <p className="text-sm text-gray-500 mt-1 flex items-center gap-1">
              <Clock className="w-4 h-4" strokeWidth={2} />
              {lmsStats.totalLessonsUpdated}
            </p>
          </div>
        </div>
        <div className="bg-white rounded-xl shadow-sm border border-gray-100 p-5 flex items-start gap-4">
          <div className="w-12 h-12 rounded-full bg-emerald-100 flex items-center justify-center shrink-0">
            <BarChart3 className="w-6 h-6 text-emerald-600" strokeWidth={2} />
          </div>
          <div className="min-w-0">
            <p className="text-sm font-medium text-gray-500">
              Avg. Completion Rate
            </p>
            <p className="text-2xl font-bold text-gray-900 mt-0.5">
              {lmsStats.avgCompletionRate}%
            </p>
            <p className="text-sm text-emerald-600 mt-1 flex items-center gap-1">
              <TrendingUp className="w-4 h-4" strokeWidth={2} />
              {lmsStats.avgCompletionTrend}
            </p>
          </div>
        </div>
      </div>

      {/* Search and filters */}
      <div className="bg-white rounded-xl shadow-sm border border-gray-100 p-4 mb-4">
        <div className="flex flex-wrap items-center gap-3">
          <div className="relative flex-1 min-w-[200px]">
            <Search
              className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-400"
              strokeWidth={2}
            />
            <input
              type="text"
              placeholder="Search courses, instructors..."
              value={search}
              onChange={(e) => setSearch(e.target.value)}
              className="w-full pl-10 pr-4 py-2 border border-gray-200 rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-primary focus:border-primary"
            />
          </div>
          <select
            value={category}
            onChange={(e) => setCategory(e.target.value)}
            className="px-4 py-2 border border-gray-200 rounded-lg text-sm text-gray-700 focus:outline-none focus:ring-2 focus:ring-primary"
            aria-label="Category"
          >
            {CATEGORIES.map((c) => (
              <option key={c} value={c}>
                {c}
              </option>
            ))}
          </select>
          <select
            value={subcategory}
            onChange={(e) => setSubcategory(e.target.value)}
            className="px-4 py-2 border border-gray-200 rounded-lg text-sm text-gray-700 focus:outline-none focus:ring-2 focus:ring-primary"
            aria-label="Subcategory"
          >
            {subcategoryOptions.map((s) => (
              <option key={s} value={s}>
                {s}
              </option>
            ))}
          </select>
          <select
            value={statusFilter}
            onChange={(e) => setStatusFilter(e.target.value)}
            className="px-4 py-2 border border-gray-200 rounded-lg text-sm text-gray-700 focus:outline-none focus:ring-2 focus:ring-primary"
            aria-label="Status"
          >
            {STATUS_OPTIONS.map((s) => (
              <option key={s} value={s}>
                {s === "All" ? "Status: All" : s}
              </option>
            ))}
          </select>
          <button
            type="button"
            className="inline-flex items-center gap-2 px-4 py-2 border border-gray-200 rounded-lg text-sm font-medium text-gray-700 hover:bg-gray-50 transition-colors"
          >
            <Filter className="w-4 h-4" strokeWidth={2} />
            Filters
          </button>
        </div>
      </div>

      {/* Course table */}
      <div className="bg-white rounded-xl shadow-sm border border-gray-100 overflow-hidden">
        <div className="overflow-x-auto">
          <table className="w-full min-w-[800px]">
            <thead>
              <tr className="border-b border-gray-200 bg-gray-50/80">
                <th className="text-left text-xs font-semibold text-gray-600 uppercase tracking-wider px-5 py-4">
                  Course Name
                </th>
                <th className="text-left text-xs font-semibold text-gray-600 uppercase tracking-wider px-5 py-4">
                  Category
                </th>
                <th className="text-left text-xs font-semibold text-gray-600 uppercase tracking-wider px-5 py-4">
                  Modules
                </th>
                <th className="text-left text-xs font-semibold text-gray-600 uppercase tracking-wider px-5 py-4">
                  Assigned Groups
                </th>
                <th className="text-left text-xs font-semibold text-gray-600 uppercase tracking-wider px-5 py-4">
                  Enrollment
                </th>
                <th className="text-left text-xs font-semibold text-gray-600 uppercase tracking-wider px-5 py-4">
                  Status
                </th>
                <th className="text-right text-xs font-semibold text-gray-600 uppercase tracking-wider px-5 py-4">
                  Actions
                </th>
              </tr>
            </thead>
            <tbody>
              {paginatedCourses.map((course) => (
                <TableRow key={course.id} course={course} />
              ))}
            </tbody>
          </table>
        </div>

        {/* Pagination */}
        <div className="flex flex-wrap items-center justify-between gap-4 px-5 py-4 border-t border-gray-100">
          <p className="text-sm text-gray-600">
            Showing {(currentPage - 1) * PER_PAGE + 1}–
            {Math.min(currentPage * PER_PAGE, filteredCourses.length)} of{" "}
            {filteredCourses.length} courses
          </p>
          <div className="flex items-center gap-1">
            <button
              type="button"
              onClick={() => setPage((p) => Math.max(1, p - 1))}
              disabled={currentPage <= 1}
              className="p-2 rounded-lg border border-gray-200 text-gray-600 hover:bg-gray-50 disabled:opacity-50 disabled:pointer-events-none"
              aria-label="Previous page"
            >
              <ChevronDown className="w-4 h-4 rotate-90" strokeWidth={2} />
            </button>
            {Array.from(
              { length: Math.min(3, totalPages) },
              (_, i) => i + 1
            ).map((p) => (
              <button
                key={p}
                type="button"
                onClick={() => setPage(p)}
                className={`min-w-[2.25rem] h-9 rounded-lg text-sm font-medium transition-colors ${
                  currentPage === p
                    ? "bg-primary text-white"
                    : "border border-gray-200 text-gray-700 hover:bg-gray-50"
                }`}
              >
                {p}
              </button>
            ))}
            <button
              type="button"
              onClick={() => setPage((p) => Math.min(totalPages, p + 1))}
              disabled={currentPage >= totalPages}
              className="p-2 rounded-lg border border-gray-200 text-gray-600 hover:bg-gray-50 disabled:opacity-50 disabled:pointer-events-none"
              aria-label="Next page"
            >
              <ChevronDown className="w-4 h-4 -rotate-90" strokeWidth={2} />
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}

function TableRow({ course }: { course: LMSCourseRow }) {
  const statusStyles: Record<CourseStatus, string> = {
    Active: "bg-emerald-100 text-emerald-800",
    Scheduled: "bg-amber-100 text-amber-800",
    Draft: "bg-gray-100 text-gray-700",
  };
  const displayGroupsList: string[] =
    course.assignedGroups.length === 0
      ? []
      : course.assignedGroups
          .slice(0, 2)
          .concat(
            course.assignedGroups.length > 2
              ? [`+${course.assignedGroups.length - 2}`]
              : []
          );

  return (
    <tr className="border-b border-gray-100 hover:bg-gray-50/50 transition-colors">
      <td className="px-5 py-4">
        <div className="flex items-center gap-3">
          <div
            className={`w-10 h-10 rounded-lg ${course.iconColor} flex items-center justify-center shrink-0`}
          >
            <FileText className="w-5 h-5 text-white" strokeWidth={2} />
          </div>
          <div>
            <Link
              href={ROUTES.ADMIN.LMS_COURSE(course.id)}
              className="font-medium text-gray-900 hover:text-primary hover:underline"
            >
              {course.courseName}
            </Link>
            <p className="text-sm text-gray-500">
              Instructor: {course.instructor}
            </p>
          </div>
        </div>
      </td>
      <td className="px-5 py-4">
        <span className="inline-flex px-2.5 py-1 rounded-full text-xs font-medium bg-gray-100 text-gray-700">
          {course.category}
        </span>
      </td>
      <td className="px-5 py-4 text-sm text-gray-700">
        {course.modulesDone}/{course.modulesTotal} Modules/Lessons
      </td>
      <td className="px-5 py-4">
        {displayGroupsList.length === 0 ? (
          <span className="text-sm text-gray-500">No groups assigned</span>
        ) : (
          <div className="flex flex-wrap gap-1">
            {displayGroupsList.map((g) => (
              <span
                key={g}
                className="inline-flex items-center justify-center w-8 h-8 rounded-full bg-gray-100 text-xs font-medium text-gray-700"
              >
                {g}
              </span>
            ))}
          </div>
        )}
      </td>
      <td className="px-5 py-4 text-sm font-medium text-gray-900">
        {course.enrollment.toLocaleString()}
      </td>
      <td className="px-5 py-4">
        <span
          className={`inline-flex px-2.5 py-1 rounded-full text-xs font-medium ${
            statusStyles[course.status]
          }`}
        >
          {course.status}
        </span>
      </td>
      <td className="px-5 py-4 text-right">
        <div className="flex items-center justify-end gap-1">
          <button
            type="button"
            className="p-2 rounded-lg text-gray-500 hover:bg-gray-100 hover:text-gray-700"
            aria-label="Menu"
          >
            <MoreHorizontal className="w-5 h-5" strokeWidth={2} />
          </button>
          <button
            type="button"
            className="p-2 rounded-lg text-gray-500 hover:bg-gray-100 hover:text-gray-700"
            aria-label="Analytics"
          >
            <BarChart3 className="w-5 h-5" strokeWidth={2} />
          </button>
        </div>
      </td>
    </tr>
  );
}
