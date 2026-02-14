"use client";

import { useState, useMemo } from "react";
import Link from "next/link";
import { Check, X, Eye, Plus } from "lucide-react";
import { courses, getDiscountPercentage } from "@/lib/courses";
import type { Course } from "@/types/course";
import { ROUTES } from "@/constants/routes";

type ViewMode = "grid" | "list";
type CourseEdits = Record<string, { price: number; originalPrice?: number }>;
type SeoMeta = {
  metaTitle: string;
  metaDescription: string;
  metaKeywords: string;
};

export default function AdminCoursesPage() {
  const [searchTerm, setSearchTerm] = useState("");
  const [mainCategory, setMainCategory] = useState("all");
  const [subCategory, setSubCategory] = useState("all");
  const [dateRange, setDateRange] = useState("all");
  const [statusFilter, setStatusFilter] = useState("all");
  const [viewMode, setViewMode] = useState<ViewMode>("list");
  const [courseEdits, setCourseEdits] = useState<CourseEdits>({});
  const [deletedIds, setDeletedIds] = useState<Set<string>>(new Set());
  const [duplicatedCourses, setDuplicatedCourses] = useState<Course[]>([]);
  const [seoByCourseId, setSeoByCourseId] = useState<Record<string, boolean>>(
    () => ({})
  );
  const [seoMetaByCourseId, setSeoMetaByCourseId] = useState<
    Record<string, SeoMeta>
  >({});
  const [seoModalCourseId, setSeoModalCourseId] = useState<string | null>(
    null
  );
  const [seoModalDraft, setSeoModalDraft] = useState<SeoMeta>({
    metaTitle: "",
    metaDescription: "",
    metaKeywords: "",
  });

  const getSeoAdded = (courseId: string) => seoByCourseId[courseId] ?? false;
  const setSeoAdded = (courseId: string, added: boolean) =>
    setSeoByCourseId((prev) => ({ ...prev, [courseId]: added }));

  const openSeoModal = (courseId: string) => {
    setSeoModalCourseId(courseId);
    setSeoModalDraft(
      seoMetaByCourseId[courseId] ?? {
        metaTitle: "",
        metaDescription: "",
        metaKeywords: "",
      }
    );
  };

  const closeSeoModal = () => setSeoModalCourseId(null);

  const saveSeoModal = () => {
    if (!seoModalCourseId) return;
    setSeoMetaByCourseId((prev) => ({
      ...prev,
      [seoModalCourseId]: { ...seoModalDraft },
    }));
    setSeoAdded(seoModalCourseId, true);
    closeSeoModal();
  };

  const categories = useMemo(
    () => ["all", ...Array.from(new Set(courses.map((c) => c.category)))],
    []
  );
  const subCategories = useMemo(
    () =>
      mainCategory === "all"
        ? ["all"]
        : [
            "all",
            ...Array.from(
              new Set(
                courses
                  .filter((c) => c.category === mainCategory && c.subCategory)
                  .map((c) => c.subCategory!)
              )
            ),
          ],
    [mainCategory]
  );

  const baseCourseList = useMemo(
    () => [
      ...courses.filter((c) => !deletedIds.has(c.id)),
      ...duplicatedCourses,
    ],
    [deletedIds, duplicatedCourses]
  );

  const filteredCourses = useMemo(() => {
    return baseCourseList.filter((course) => {
      const matchesSearch =
        course.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
        course.instructor.toLowerCase().includes(searchTerm.toLowerCase());
      const matchesMain =
        mainCategory === "all" || course.category === mainCategory;
      const matchesSub =
        subCategory === "all" || course.subCategory === subCategory;
      return matchesSearch && matchesMain && matchesSub;
    });
  }, [baseCourseList, searchTerm, mainCategory, subCategory]);

  const getDisplayPrice = (course: Course) =>
    courseEdits[course.id]?.price ?? course.priceEGP ?? course.price;
  const getDisplayOriginalPrice = (course: Course) =>
    courseEdits[course.id]?.originalPrice ??
    course.originalPriceEGP ??
    course.originalPrice;

  const handlePriceChange = (courseId: string, value: string) => {
    const num = parseFloat(value);
    if (Number.isNaN(num) || num < 0) return;
    setCourseEdits((prev) => {
      const next = { ...prev };
      const current = next[courseId] ?? {};
      next[courseId] = { ...current, price: num };
      return next;
    });
  };

  const handleDiscountChange = (courseId: string, value: string) => {
    const pct = parseFloat(value);
    if (Number.isNaN(pct) || pct < 0 || pct >= 100) return;
    const course = baseCourseList.find((c) => c.id === courseId);
    if (!course) return;
    const price = getDisplayPrice(course);
    const originalPrice = pct === 0 ? undefined : price / (1 - pct / 100);
    setCourseEdits((prev) => {
      const next = { ...prev };
      const current = next[courseId] ?? {};
      next[courseId] = { ...current, price, originalPrice };
      return next;
    });
  };

  const handleDuplicate = (course: Course) => {
    const newId = `dup-${course.id}-${Date.now()}`;
    setDuplicatedCourses((prev) => [
      ...prev,
      { ...course, id: newId, title: `${course.title} (Copy)` },
    ]);
  };

  const handleDelete = (courseId: string) => {
    if (!confirm("Delete this course? This cannot be undone.")) return;
    if (duplicatedCourses.some((c) => c.id === courseId)) {
      setDuplicatedCourses((prev) => prev.filter((c) => c.id !== courseId));
    } else {
      setDeletedIds((prev) => new Set(prev).add(courseId));
    }
  };

  const handleDownload = () => {
    const headers = [
      "Title",
      "Category",
      "Subcategory",
      "Created",
      "Purchases",
      "Price (EGP)",
      "Revenue (EGP)",
    ];
    const rows = filteredCourses.map((c) => {
      const price = getDisplayPrice(c);
      return [
        c.title,
        c.category,
        c.subCategory ?? "",
        c.lastUpdated ?? c.createdAt ?? "",
        String(c.studentCount),
        String(price),
        String(price * c.studentCount),
      ];
    });
    const csv = [headers.join(","), ...rows.map((r) => r.map((cell) => `"${String(cell).replace(/"/g, '""')}"`).join(","))].join("\n");
    const blob = new Blob([csv], { type: "text/csv;charset=utf-8;" });
    const url = URL.createObjectURL(blob);
    const a = document.createElement("a");
    a.href = url;
    a.download = `courses-export-${new Date().toISOString().slice(0, 10)}.csv`;
    a.click();
    URL.revokeObjectURL(url);
  };

  const totalStudents = useMemo(
    () => courses.reduce((sum, c) => sum + c.studentCount, 0),
    []
  );
  const totalRevenue = useMemo(
    () =>
      courses.reduce(
        (sum, c) => sum + (c.priceEGP ?? c.price) * c.studentCount,
        0
      ),
    []
  );
  const publishedCount = courses.length;
  const draftCount = 0;

  const formatDate = (dateStr?: string) => {
    if (!dateStr) return "—";
    const d = new Date(dateStr);
    return d.toLocaleDateString("en-US", {
      year: "numeric",
      month: "short",
      day: "numeric",
    });
  };

  return (
    <div className="min-h-screen bg-[#F5F5F5] p-6">
      {/* Summary cards */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-5 gap-4 mb-6">
        <div className="bg-white rounded-xl shadow-sm border border-gray-100 p-5 relative overflow-hidden">
          <p className="text-sm font-medium text-gray-500 mb-1">
            Total Courses
          </p>
          <p className="text-2xl font-bold text-gray-900">{courses.length}</p>
          <p className="text-sm text-emerald-600 mt-1">+8%</p>
          <div className="absolute top-4 right-4 w-10 h-10 rounded-lg bg-blue-100 flex items-center justify-center">
            <svg
              className="w-5 h-5 text-blue-600"
              fill="currentColor"
              viewBox="0 0 24 24"
            >
              <path d="M18 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V4a2 2 0 0 0-2-2zM6 4h5v8l-2.5-1.5L6 12V4z" />
            </svg>
          </div>
        </div>
        <div className="bg-white rounded-xl shadow-sm border border-gray-100 p-5 relative overflow-hidden">
          <p className="text-sm font-medium text-gray-500 mb-1">Published</p>
          <p className="text-2xl font-bold text-gray-900">{publishedCount}</p>
          <p className="text-sm text-emerald-600 mt-1">Active</p>
          <div className="absolute top-4 right-4 w-10 h-10 rounded-lg bg-emerald-100 flex items-center justify-center">
            <svg
              className="w-5 h-5 text-emerald-600"
              fill="currentColor"
              viewBox="0 0 24 24"
            >
              <path d="M9 16.17L4.83 12l-1.42 1.41L9 19 21 7l-1.41-1.41z" />
            </svg>
          </div>
        </div>
        <div className="bg-white rounded-xl shadow-sm border border-gray-100 p-5 relative overflow-hidden">
          <p className="text-sm font-medium text-gray-500 mb-1">Unpublished</p>
          <p className="text-2xl font-bold text-gray-900">{draftCount}</p>
          <p className="text-sm text-amber-600 mt-1">Draft / In review</p>
          <div className="absolute top-4 right-4 w-10 h-10 rounded-lg bg-amber-100 flex items-center justify-center">
            <svg
              className="w-5 h-5 text-amber-600"
              fill="currentColor"
              viewBox="0 0 24 24"
            >
              <path d="M11.99 2C6.47 2 2 6.48 2 12s4.47 10 9.99 10C17.52 22 22 17.52 22 12S17.52 2 11.99 2zM12 20c-4.42 0-8-3.58-8-8s3.58-8 8-8 8 3.58 8 8-3.58 8-8 8zm.5-13H11v6l5.25 3.15.75-1.23-4.5-2.67z" />
            </svg>
          </div>
        </div>
        <div className="bg-white rounded-xl shadow-sm border border-gray-100 p-5 relative overflow-hidden">
          <p className="text-sm font-medium text-gray-500 mb-1">
            Total Enrollments
          </p>
          <p className="text-2xl font-bold text-gray-900">
            {totalStudents.toLocaleString()}
          </p>
          <div className="absolute top-4 right-4 w-10 h-10 rounded-lg bg-violet-100 flex items-center justify-center">
            <svg
              className="w-5 h-5 text-violet-600"
              fill="currentColor"
              viewBox="0 0 24 24"
            >
              <path d="M7 18c-1.1 0-1.99.9-1.99 2S5.9 22 7 22s2-.9 2-2-.9-2-2-2zM1 2v2h2l3.6 7.59-1.35 2.45c-.16.28-.25.61-.25.96 0 1.1.9 2 2 2h12v-2H7.42c-.14 0-.25-.11-.25-.25l.03-.12.9-1.63h7.45c.75 0 1.41-.41 1.75-1.03l3.58-6.49c.08-.14.12-.31.12-.48 0-.55-.45-1-1-1H5.21l-.94-2H1zm16 16c-1.1 0-1.99.9-1.99 2s.89 2 1.99 2 2-.9 2-2-.9-2-2-2z" />
            </svg>
          </div>
        </div>
        <div className="bg-white rounded-xl shadow-sm border border-gray-100 p-5 relative overflow-hidden">
          <p className="text-sm font-medium text-gray-500 mb-1">
            Total Revenue
          </p>
          <p className="text-2xl font-bold text-gray-900">
            {totalRevenue.toLocaleString("en-US", {
              maximumFractionDigits: 0,
              minimumFractionDigits: 0,
            })}{" "}
            EGP
          </p>
          <div className="absolute top-4 right-4 w-10 h-10 rounded-lg bg-emerald-100 flex items-center justify-center">
            <span className="text-lg font-bold text-emerald-600">EGP</span>
          </div>
        </div>
      </div>

      {/* Main content panel */}
      <div className="bg-white rounded-xl shadow-sm border border-gray-100 overflow-hidden">
        <div className="p-5 border-b border-gray-100 flex flex-wrap items-center justify-between gap-4">
          <div className="flex items-center gap-2">
            <h2 className="text-lg font-bold text-gray-900">All Courses</h2>
            <span className="inline-flex items-center justify-center min-w-[1.75rem] h-7 px-2 rounded-full bg-primary text-white text-sm font-semibold">
              {filteredCourses.length}
            </span>
          </div>
          <div className="flex items-center gap-2">
            <button
              type="button"
              onClick={() => setViewMode("grid")}
              className={`p-2 rounded-lg border transition-colors ${
                viewMode === "grid"
                  ? "bg-gray-100 border-gray-300 text-gray-900"
                  : "border-gray-200 text-gray-500 hover:bg-gray-50"
              }`}
              aria-label="Grid view"
            >
              <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24">
                <path d="M3 3v8h8V3H3zm6 6H5V5h4v4zm-6 4v8h8v-8H3zm2 6v-4h4v4H5zm8-12v8h8V3h-8zm2 6h-4V5h4v4zm4 4h-8v8h8v-8zm-2 6v-4h-4v4h4z" />
              </svg>
            </button>
            <button
              type="button"
              onClick={() => setViewMode("list")}
              className={`p-2 rounded-lg border transition-colors ${
                viewMode === "list"
                  ? "bg-gray-100 border-gray-300 text-gray-900"
                  : "border-gray-200 text-gray-500 hover:bg-gray-50"
              }`}
              aria-label="List view"
            >
              <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24">
                <path d="M3 13h2v-2H3v2zm0 4h2v-2H3v2zm0-8h2V7H3v2zm4 4h14v-2H7v2zm0 4h14v-2H7v2zM7 7v2h14V7H7z" />
              </svg>
            </button>
            <button
              type="button"
              onClick={handleDownload}
              className="inline-flex items-center gap-2 px-4 py-2 border-2 border-primary text-gray-900 rounded-lg font-medium text-sm hover:bg-primary/5 transition-colors"
            >
              <svg
                className="w-4 h-4"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M4 16v1a3 3 0 003 3h10a3 3 0 003-3v-1m-4-4l-4 4m0 0l-4-4m4 4V4"
                />
              </svg>
              Download
            </button>
            <Link
              href="/admin/courses/new"
              className="inline-flex items-center gap-2 px-4 py-2 bg-primary text-white rounded-lg font-medium text-sm hover:bg-primary/90 transition-colors"
            >
              <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 24 24">
                <path d="M19 13h-6v6h-2v-6H5v-2h6V5h2v6h6v2z" />
              </svg>
              Add New
            </Link>
          </div>
        </div>

        {/* Search and filters */}
        <div className="px-5 py-4 border-b border-gray-100 space-y-4">
          <div className="flex flex-wrap gap-3 items-end">
            <div className="relative flex-1 min-w-[200px] max-w-md">
              <span className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400">
                <svg
                  className="w-4 h-4"
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z"
                  />
                </svg>
              </span>
              <input
                type="text"
                placeholder="Search by name..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="w-full pl-10 pr-4 py-2.5 border border-gray-200 rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-primary focus:border-primary"
              />
            </div>
            <select
              value={mainCategory}
              onChange={(e) => setMainCategory(e.target.value)}
              className="px-4 py-2.5 border border-gray-200 rounded-lg text-sm text-gray-700 focus:outline-none focus:ring-2 focus:ring-primary min-w-[140px]"
            >
              <option value="all">Main Category</option>
              {categories
                .filter((c) => c !== "all")
                .map((cat) => (
                  <option key={cat} value={cat}>
                    {cat}
                  </option>
                ))}
            </select>
            <select
              value={subCategory}
              onChange={(e) => setSubCategory(e.target.value)}
              className="px-4 py-2.5 border border-gray-200 rounded-lg text-sm text-gray-700 focus:outline-none focus:ring-2 focus:ring-primary min-w-[140px]"
            >
              <option value="all">Sub Category</option>
              {subCategories
                .filter((c) => c !== "all")
                .map((cat) => (
                  <option key={cat} value={cat}>
                    {cat}
                  </option>
                ))}
            </select>
            <select
              value={dateRange}
              onChange={(e) => setDateRange(e.target.value)}
              className="px-4 py-2.5 border border-gray-200 rounded-lg text-sm text-gray-700 focus:outline-none focus:ring-2 focus:ring-primary min-w-[130px]"
            >
              <option value="all">Date Range</option>
              <option value="7">Last 7 days</option>
              <option value="30">Last 30 days</option>
              <option value="90">Last 90 days</option>
            </select>
            <select
              value={statusFilter}
              onChange={(e) => setStatusFilter(e.target.value)}
              className="px-4 py-2.5 border border-gray-200 rounded-lg text-sm text-gray-700 focus:outline-none focus:ring-2 focus:ring-primary min-w-[130px]"
            >
              <option value="all">All statuses</option>
              <option value="active">Active</option>
              <option value="draft">Draft</option>
            </select>
          </div>
        </div>

        {/* Grid / Cards view */}
        {viewMode === "grid" && (
          <div className="p-5">
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4">
              {filteredCourses.map((course) => {
                const price = getDisplayPrice(course);
                const originalPrice = getDisplayOriginalPrice(course);
                const discount = getDiscountPercentage(price, originalPrice);
                const revenue = price * course.studentCount;
                return (
                  <div
                    key={course.id}
                    className="bg-gray-50 rounded-xl border border-gray-200 overflow-hidden hover:shadow-md transition-shadow"
                  >
                    <div className="aspect-video bg-gray-200 relative">
                      <img
                        src={course.image}
                        alt={course.title}
                        className="w-full h-full object-cover"
                      />
                      <div className="absolute top-2 right-2 flex items-center gap-0.5 bg-white/90 rounded-lg shadow-sm p-1">
                        <Link
                          href={ROUTES.ADMIN.COURSE(course.id)}
                          className="p-1.5 text-primary hover:bg-primary/10 rounded-md transition-colors"
                          title="View"
                        >
                          <svg
                            className="w-4 h-4"
                            fill="currentColor"
                            viewBox="0 0 24 24"
                          >
                            <path d="M12 4.5C7 4.5 2.73 7.61 1 12c1.73 4.39 6 7.5 11 7.5s9.27-3.11 11-7.5c-1.73-4.39-6-7.5-11-7.5zM12 17c-2.76 0-5-2.24-5-5s2.24-5 5-5 5 2.24 5 5-2.24 5-5 5zm0-8c-1.66 0-3 1.34-3 3s1.34 3 3 3 3-1.34 3-3-1.34-3-3-3z" />
                          </svg>
                        </Link>
                        <Link
                          href={ROUTES.ADMIN.COURSE_EDIT(course.id)}
                          className="p-1.5 text-primary hover:bg-primary/10 rounded-md transition-colors"
                          title="Edit"
                        >
                          <svg
                            className="w-4 h-4"
                            fill="currentColor"
                            viewBox="0 0 24 24"
                          >
                            <path d="M3 17.25V21h3.75L17.81 9.94l-3.75-3.75L3 17.25zM20.71 7.04c.39-.39.39-1.02 0-1.41l-2.34-2.34c-.39-.39-1.02-.39-1.41 0l-1.83 1.83 3.75 3.75 1.83-1.83z" />
                          </svg>
                        </Link>
                        <button
                          type="button"
                          onClick={() => handleDuplicate(course)}
                          className="p-1.5 text-teal-600 hover:bg-teal-50 rounded-md transition-colors"
                          title="Duplicate"
                        >
                          <svg
                            className="w-4 h-4"
                            fill="currentColor"
                            viewBox="0 0 24 24"
                          >
                            <path d="M16 1H4c-1.1 0-2 .9-2 2v14h2V3h12V1zm3 4H8c-1.1 0-2 .9-2 2v14c0 1.1.9 2 2 2h11c1.1 0 2-.9 2-2V7c0-1.1-.9-2-2-2zm0 16H8V7h11v14z" />
                          </svg>
                        </button>
                        <button
                          type="button"
                          onClick={() => handleDelete(course.id)}
                          className="p-1.5 text-red-600 hover:bg-red-50 rounded-md transition-colors"
                          title="Delete"
                        >
                          <svg
                            className="w-4 h-4"
                            fill="currentColor"
                            viewBox="0 0 24 24"
                          >
                            <path d="M6 19c0 1.1.9 2 2 2h8c1.1 0 2-.9 2-2V7H6v12zM19 4h-3.5l-1-1h-5l-1 1H5v2h14V4z" />
                          </svg>
                        </button>
                      </div>
                    </div>
                    <div className="p-4 space-y-3">
                      <div>
                        <h3 className="font-semibold text-gray-900 line-clamp-2">
                          {course.title}
                        </h3>
                        <p className="text-xs text-gray-500 mt-0.5">
                          {course.category}
                          {course.subCategory ? ` · ${course.subCategory}` : ""}
                        </p>
                      </div>
                      <p className="text-xs text-gray-600">
                        Created{" "}
                        {formatDate(course.lastUpdated ?? course.createdAt)}
                      </p>
                      <div className="grid grid-cols-2 gap-2 text-sm">
                        <div>
                          <p className="text-xs text-gray-500">Purchases</p>
                          <p className="font-medium text-gray-900">
                            {course.studentCount.toLocaleString()}
                          </p>
                        </div>
                        <div>
                          <p className="text-xs text-gray-500">Revenue</p>
                          <p className="font-medium text-gray-900">
                            {revenue.toLocaleString("en-US", {
                              maximumFractionDigits: 0,
                              minimumFractionDigits: 0,
                            })}{" "}
                            EGP
                          </p>
                        </div>
                      </div>
                      <div className="flex items-center gap-2 flex-wrap">
                        <label className="text-xs text-gray-500 shrink-0">
                          Price
                        </label>
                        <input
                          type="number"
                          min={0}
                          step={0.01}
                          value={price}
                          onChange={(e) =>
                            handlePriceChange(course.id, e.target.value)
                          }
                          className="flex-1 min-w-0 px-2 py-1.5 border border-gray-200 rounded-lg text-sm font-medium text-gray-900 focus:outline-none focus:ring-2 focus:ring-primary focus:border-primary"
                        />
                      </div>
                      <div className="flex items-center gap-2 flex-wrap">
                        <label className="text-xs text-gray-500 shrink-0">
                          Discount %
                        </label>
                        <input
                          type="number"
                          min={0}
                          max={99}
                          step={1}
                          value={discount}
                          onChange={(e) =>
                            handleDiscountChange(course.id, e.target.value)
                          }
                          className="w-20 px-2 py-1.5 border border-gray-200 rounded-lg text-sm text-gray-900 focus:outline-none focus:ring-2 focus:ring-primary focus:border-primary"
                        />
                      </div>
                      <div className="flex items-center gap-2 pt-2 border-t border-gray-200">
                        <span className="text-xs text-gray-500 shrink-0">
                          SEO
                        </span>
                        {getSeoAdded(course.id) ? (
                          <span
                            className="inline-flex p-1 rounded bg-emerald-100 text-emerald-700"
                            title="SEO added"
                          >
                            <Check className="w-3.5 h-3.5" strokeWidth={2.5} />
                          </span>
                        ) : (
                          <span
                            className="inline-flex p-1 rounded bg-red-100 text-red-600"
                            title="SEO not added"
                          >
                            <X className="w-3.5 h-3.5" strokeWidth={2.5} />
                          </span>
                        )}
                        <button
                          type="button"
                          onClick={() => openSeoModal(course.id)}
                          className="p-1.5 text-gray-600 hover:bg-gray-100 rounded-md transition-colors"
                          title="View SEO"
                        >
                          <Eye className="w-3.5 h-3.5" strokeWidth={2} />
                        </button>
                        <button
                          type="button"
                          onClick={() => openSeoModal(course.id)}
                          className="p-1.5 text-primary hover:bg-primary/10 rounded-md transition-colors"
                          title="Add SEO"
                        >
                          <Plus className="w-3.5 h-3.5" strokeWidth={2} />
                        </button>
                      </div>
                    </div>
                  </div>
                );
              })}
            </div>
            {filteredCourses.length === 0 && (
              <div className="py-16 text-center text-gray-500">
                No courses match your filters.
              </div>
            )}
          </div>
        )}

        {/* Data table (list view) */}
        {viewMode === "list" && (
          <div className="overflow-x-auto">
            <table className="w-full text-sm">
              <thead>
                <tr className="border-b border-gray-200 bg-gray-50/80">
                  <th className="px-5 py-3.5 text-left text-xs font-semibold text-gray-500 uppercase tracking-wider">
                    Course
                  </th>
                  <th className="px-5 py-3.5 text-left text-xs font-semibold text-gray-500 uppercase tracking-wider">
                    Category
                  </th>
                  <th className="px-5 py-3.5 text-left text-xs font-semibold text-gray-500 uppercase tracking-wider">
                    Subcategory
                  </th>
                  <th className="px-5 py-3.5 text-left text-xs font-semibold text-gray-500 uppercase tracking-wider">
                    Created at
                  </th>
                  <th className="px-5 py-3.5 text-left text-xs font-semibold text-gray-500 uppercase tracking-wider">
                    Purchases
                  </th>
                  <th className="px-5 py-3.5 text-left text-xs font-semibold text-gray-500 uppercase tracking-wider">
                    Price
                  </th>
                  <th className="px-5 py-3.5 text-left text-xs font-semibold text-gray-500 uppercase tracking-wider">
                    Discount
                  </th>
                  <th className="px-5 py-3.5 text-left text-xs font-semibold text-gray-500 uppercase tracking-wider">
                    Revenue
                  </th>
                  <th className="px-5 py-3.5 text-left text-xs font-semibold text-gray-500 uppercase tracking-wider">
                    SEO
                  </th>
                  <th className="px-5 py-3.5 text-right text-xs font-semibold text-gray-500 uppercase tracking-wider">
                    Actions
                  </th>
                </tr>
              </thead>
              <tbody className="divide-y divide-gray-100">
                {filteredCourses.map((course) => {
                  const price = getDisplayPrice(course);
                  const originalPrice = getDisplayOriginalPrice(course);
                  const discount = getDiscountPercentage(price, originalPrice);
                  const revenue = price * course.studentCount;
                  return (
                    <tr
                      key={course.id}
                      className="hover:bg-gray-50/50 transition-colors"
                    >
                      <td className="px-5 py-4">
                        <div className="flex items-center gap-3">
                          <div className="w-12 h-12 rounded-lg bg-gray-100 overflow-hidden flex-shrink-0">
                            <img
                              src={course.image}
                              alt={course.title}
                              className="w-full h-full object-cover"
                            />
                          </div>
                          <div>
                            <p className="font-semibold text-gray-900 line-clamp-1">
                              {course.title}
                            </p>
                            <p className="text-xs text-gray-500 mt-0.5">
                              {course.category}
                            </p>
                          </div>
                        </div>
                      </td>
                      <td className="px-5 py-4 text-gray-700">
                        {course.category}
                      </td>
                      <td className="px-5 py-4 text-gray-700">
                        {course.subCategory ?? "—"}
                      </td>
                      <td className="px-5 py-4 text-gray-700 whitespace-nowrap">
                        {formatDate(course.lastUpdated ?? course.createdAt)}
                      </td>
                      <td className="px-5 py-4">
                        <span className="font-medium text-gray-900">
                          {course.studentCount.toLocaleString()}
                        </span>
                      </td>
                      <td className="px-5 py-4">
                        <input
                          type="number"
                          min={0}
                          step={0.01}
                          value={price}
                          onChange={(e) =>
                            handlePriceChange(course.id, e.target.value)
                          }
                          className="w-24 px-2 py-1.5 border border-gray-200 rounded-lg text-sm font-medium text-gray-900 focus:outline-none focus:ring-2 focus:ring-primary focus:border-primary"
                        />
                      </td>
                      <td className="px-5 py-4">
                        <input
                          type="number"
                          min={0}
                          max={99}
                          step={1}
                          value={discount}
                          onChange={(e) =>
                            handleDiscountChange(course.id, e.target.value)
                          }
                          className="w-16 px-2 py-1.5 border border-gray-200 rounded-lg text-sm text-gray-900 focus:outline-none focus:ring-2 focus:ring-primary focus:border-primary"
                        />
                        {discount > 0 && (
                          <span className="ml-1 text-xs text-gray-500">%</span>
                        )}
                      </td>
                      <td className="px-5 py-4 font-medium text-gray-900 whitespace-nowrap">
                        {revenue.toLocaleString("en-US", {
                          maximumFractionDigits: 0,
                          minimumFractionDigits: 0,
                        })}{" "}
                        EGP
                      </td>
                      <td className="px-5 py-4">
                        <div className="flex items-center gap-1">
                          {getSeoAdded(course.id) ? (
                            <span
                              className="inline-flex p-1.5 rounded-md bg-emerald-100 text-emerald-700"
                              title="SEO added"
                            >
                              <Check className="w-4 h-4" strokeWidth={2.5} />
                            </span>
                          ) : (
                            <span
                              className="inline-flex p-1.5 rounded-md bg-red-100 text-red-600"
                              title="SEO not added"
                            >
                              <X className="w-4 h-4" strokeWidth={2.5} />
                            </span>
                          )}
                          <button
                            type="button"
                            onClick={() => openSeoModal(course.id)}
                            className="p-2 text-gray-600 hover:bg-gray-100 rounded-lg transition-colors"
                            title="View SEO"
                          >
                            <Eye className="w-4 h-4" strokeWidth={2} />
                          </button>
                          <button
                            type="button"
                            onClick={() => openSeoModal(course.id)}
                            className="p-2 text-primary hover:bg-primary/10 rounded-lg transition-colors"
                            title="Add SEO"
                          >
                            <Plus className="w-4 h-4" strokeWidth={2} />
                          </button>
                        </div>
                      </td>
                      <td className="px-5 py-4">
                        <div className="flex items-center justify-end gap-0.5">
                          <Link
                            href={ROUTES.ADMIN.COURSE(course.id)}
                            className="p-2 text-primary hover:bg-primary/10 rounded-lg transition-colors"
                            title="View"
                          >
                            <svg
                              className="w-4 h-4"
                              fill="currentColor"
                              viewBox="0 0 24 24"
                            >
                              <path d="M12 4.5C7 4.5 2.73 7.61 1 12c1.73 4.39 6 7.5 11 7.5s9.27-3.11 11-7.5c-1.73-4.39-6-7.5-11-7.5zM12 17c-2.76 0-5-2.24-5-5s2.24-5 5-5 5 2.24 5 5-2.24 5-5 5zm0-8c-1.66 0-3 1.34-3 3s1.34 3 3 3 3-1.34 3-3-1.34-3-3-3z" />
                            </svg>
                          </Link>
                          <Link
                            href={ROUTES.ADMIN.COURSE_EDIT(course.id)}
                            className="p-2 text-primary hover:bg-primary/10 rounded-lg transition-colors"
                            title="Edit"
                          >
                            <svg
                              className="w-4 h-4"
                              fill="currentColor"
                              viewBox="0 0 24 24"
                            >
                              <path d="M3 17.25V21h3.75L17.81 9.94l-3.75-3.75L3 17.25zM20.71 7.04c.39-.39.39-1.02 0-1.41l-2.34-2.34c-.39-.39-1.02-.39-1.41 0l-1.83 1.83 3.75 3.75 1.83-1.83z" />
                            </svg>
                          </Link>
                          <button
                            type="button"
                            onClick={() => handleDuplicate(course)}
                            className="p-2 text-teal-600 hover:bg-teal-50 rounded-lg transition-colors"
                            title="Duplicate"
                          >
                            <svg
                              className="w-4 h-4"
                              fill="currentColor"
                              viewBox="0 0 24 24"
                            >
                              <path d="M16 1H4c-1.1 0-2 .9-2 2v14h2V3h12V1zm3 4H8c-1.1 0-2 .9-2 2v14c0 1.1.9 2 2 2h11c1.1 0 2-.9 2-2V7c0-1.1-.9-2-2-2zm0 16H8V7h11v14z" />
                            </svg>
                          </button>
                          <button
                            type="button"
                            onClick={() => handleDelete(course.id)}
                            className="p-2 text-red-600 hover:bg-red-50 rounded-lg transition-colors"
                            title="Delete"
                          >
                            <svg
                              className="w-4 h-4"
                              fill="currentColor"
                              viewBox="0 0 24 24"
                            >
                              <path d="M6 19c0 1.1.9 2 2 2h8c1.1 0 2-.9 2-2V7H6v12zM19 4h-3.5l-1-1h-5l-1 1H5v2h14V4z" />
                            </svg>
                          </button>
                        </div>
                      </td>
                    </tr>
                  );
                })}
              </tbody>
            </table>
          </div>
        )}

        {viewMode === "list" && filteredCourses.length === 0 && (
          <div className="py-16 text-center text-gray-500">
            No courses match your filters.
          </div>
        )}

        {viewMode === "list" && (
          <div className="px-5 py-4 border-t border-gray-100 flex flex-wrap items-center justify-between gap-4">
            <div className="flex items-center gap-3 text-sm text-gray-600">
              <span>Rows per page</span>
              <select className="px-2 py-1.5 border border-gray-200 rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-primary">
                <option>10</option>
                <option>25</option>
                <option>50</option>
              </select>
              <span>
                1–{filteredCourses.length} of {filteredCourses.length}
              </span>
            </div>
            <div className="flex gap-1">
              <button
                type="button"
                className="p-2 border border-gray-200 rounded-lg text-gray-600 hover:bg-gray-50 disabled:opacity-50"
                disabled
              >
                <svg
                  className="w-4 h-4"
                  fill="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path d="M15.41 7.41L14 6l-6 6 6 6 1.41-1.41L10.83 12z" />
                </svg>
              </button>
              <button
                type="button"
                className="p-2 border border-gray-200 rounded-lg text-gray-600 hover:bg-gray-50 disabled:opacity-50"
                disabled={filteredCourses.length <= 10}
              >
                <svg
                  className="w-4 h-4"
                  fill="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path d="M8.59 16.59L10 18l6-6-6-6-1.41 1.41L13.17 12z" />
                </svg>
              </button>
            </div>
          </div>
        )}
      </div>

      {/* SEO Modal */}
      {seoModalCourseId && (
        <div
          className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/50"
          onClick={closeSeoModal}
          role="dialog"
          aria-modal="true"
          aria-labelledby="seo-modal-title"
        >
          <div
            className="bg-white rounded-xl shadow-xl border border-gray-200 w-full max-w-lg max-h-[90vh] overflow-y-auto"
            onClick={(e) => e.stopPropagation()}
          >
            <div className="p-5 border-b border-gray-100 flex items-center justify-between">
              <div>
                <h2
                  id="seo-modal-title"
                  className="text-lg font-bold text-gray-900"
                >
                  Meta tags
                </h2>
                {(() => {
                  const title = baseCourseList.find(
                    (c) => c.id === seoModalCourseId
                  )?.title;
                  return title ? (
                    <p className="text-sm text-gray-500 mt-0.5 line-clamp-1">
                      {title}
                    </p>
                  ) : null;
                })()}
              </div>
              <button
                type="button"
                onClick={closeSeoModal}
                className="p-2 text-gray-500 hover:text-gray-700 hover:bg-gray-100 rounded-lg transition-colors"
                aria-label="Close"
              >
                <X className="w-5 h-5" strokeWidth={2} />
              </button>
            </div>
            <div className="p-5 space-y-4">
              <div>
                <label
                  htmlFor="seo-meta-title"
                  className="block text-sm font-medium text-gray-700 mb-1"
                >
                  Meta Title
                </label>
                <input
                  id="seo-meta-title"
                  type="text"
                  value={seoModalDraft.metaTitle}
                  onChange={(e) =>
                    setSeoModalDraft((prev) => ({
                      ...prev,
                      metaTitle: e.target.value,
                    }))
                  }
                  placeholder="e.g. Course Name | Platform"
                  className="w-full px-4 py-2.5 border border-gray-200 rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-primary focus:border-primary"
                />
              </div>
              <div>
                <label
                  htmlFor="seo-meta-description"
                  className="block text-sm font-medium text-gray-700 mb-1"
                >
                  Meta Description
                </label>
                <textarea
                  id="seo-meta-description"
                  rows={3}
                  value={seoModalDraft.metaDescription}
                  onChange={(e) =>
                    setSeoModalDraft((prev) => ({
                      ...prev,
                      metaDescription: e.target.value,
                    }))
                  }
                  placeholder="Short description for search results..."
                  className="w-full px-4 py-2.5 border border-gray-200 rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-primary focus:border-primary resize-none"
                />
              </div>
              <div>
                <label
                  htmlFor="seo-meta-keywords"
                  className="block text-sm font-medium text-gray-700 mb-1"
                >
                  Meta Keywords
                </label>
                <input
                  id="seo-meta-keywords"
                  type="text"
                  value={seoModalDraft.metaKeywords}
                  onChange={(e) =>
                    setSeoModalDraft((prev) => ({
                      ...prev,
                      metaKeywords: e.target.value,
                    }))
                  }
                  placeholder="keyword1, keyword2, keyword3"
                  className="w-full px-4 py-2.5 border border-gray-200 rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-primary focus:border-primary"
                />
              </div>
            </div>
            <div className="p-5 border-t border-gray-100 flex justify-end gap-2">
              <button
                type="button"
                onClick={closeSeoModal}
                className="px-4 py-2.5 border border-gray-200 rounded-lg font-medium text-sm text-gray-700 hover:bg-gray-50 transition-colors"
              >
                Cancel
              </button>
              <button
                type="button"
                onClick={saveSeoModal}
                className="px-4 py-2.5 bg-primary text-white rounded-lg font-medium text-sm hover:bg-primary/90 transition-colors"
              >
                Save
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
