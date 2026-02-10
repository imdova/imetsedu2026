"use client";

import { useState, useMemo, Suspense, useEffect, useCallback } from "react";
import Link from "next/link";
import { useSearchParams } from "next/navigation";
import {
  Download,
  Plus,
  Search,
  Pencil,
  Copy,
  Trash2,
  GripVertical,
  FileUp,
  Settings2,
  X,
} from "lucide-react";
import {
  courseSettingsCategories,
  courseSettingsSubCategories,
  courseSettingsTags,
  courseSettingsVariables,
  COURSE_VARIABLES_ACTIVE_COUNT,
  type CategoryRecord,
  type SubCategoryRecord,
  type TagRecord,
  type VariableRecord,
} from "@/lib/courseSettingsData";
import "./course-settings-variables.css";

function reorderByRank<T extends { id: string; rank: number }>(
  list: T[],
  draggedId: string,
  targetId: string
): T[] {
  const fromIdx = list.findIndex((x) => x.id === draggedId);
  const toIdx = list.findIndex((x) => x.id === targetId);
  if (fromIdx === -1 || toIdx === -1 || fromIdx === toIdx) return list;
  const next = list.slice();
  const [removed] = next.splice(fromIdx, 1);
  next.splice(toIdx, 0, removed);
  return next.map((item, i) => ({ ...item, rank: i + 1 }));
}

type TabId = "categories" | "sub-categories" | "tags" | "variables";

const TABS: { id: TabId; label: string }[] = [
  { id: "categories", label: "Categories" },
  { id: "sub-categories", label: "Sub Categories" },
  { id: "tags", label: "Tags" },
  { id: "variables", label: "Course Variables" },
];

function slugFromName(name: string) {
  return name
    .toLowerCase()
    .replace(/\s+/g, "-")
    .replace(/[^a-z0-9-]/g, "");
}

function CourseSettingsContent() {
  const searchParams = useSearchParams();
  const tabParam = searchParams.get("tab") as TabId | null;
  const tab: TabId =
    tabParam && TABS.some((t) => t.id === tabParam) ? tabParam : "categories";
  const [categoriesOrdered, setCategoriesOrdered] = useState<CategoryRecord[]>(
    () => [...courseSettingsCategories]
  );
  const [subCategoriesOrdered, setSubCategoriesOrdered] = useState<
    SubCategoryRecord[]
  >(() => [...courseSettingsSubCategories]);
  const [categorySearch, setCategorySearch] = useState("");
  const [subCategorySearch, setSubCategorySearch] = useState("");
  const [tagSearch, setTagSearch] = useState("");
  const [tagName, setTagName] = useState("");
  const [tagSlug, setTagSlug] = useState("");
  const [tagDescription, setTagDescription] = useState("");
  const [tagColor, setTagColor] = useState("#3b82f6");
  const [tagsPerPage, setTagsPerPage] = useState(20);
  const [tagsPage, setTagsPage] = useState(1);
  const [draggedCategoryId, setDraggedCategoryId] = useState<string | null>(
    null
  );
  const [draggedSubCategoryId, setDraggedSubCategoryId] = useState<string | null>(
    null
  );
  const [dropTargetCategoryId, setDropTargetCategoryId] = useState<string | null>(
    null
  );
  const [dropTargetSubCategoryId, setDropTargetSubCategoryId] = useState<
    string | null
  >(null);

  const handleCategoryDragStart = useCallback(
    (e: React.DragEvent, id: string) => {
      const cell = (e.target as HTMLElement).closest("td");
      if (!cell || cell.cellIndex !== 0) {
        e.preventDefault();
        return;
      }
      setDraggedCategoryId(id);
      e.dataTransfer.setData("text/plain", id);
      e.dataTransfer.effectAllowed = "move";
      e.dataTransfer.setData("application/x-category-id", id);
    },
    []
  );
  const handleCategoryDragEnd = useCallback(() => {
    setDraggedCategoryId(null);
    setDropTargetCategoryId(null);
  }, []);
  const handleCategoryDragOver = useCallback(
    (e: React.DragEvent, id: string) => {
      e.preventDefault();
      e.dataTransfer.dropEffect = "move";
      if (draggedCategoryId && draggedCategoryId !== id)
        setDropTargetCategoryId(id);
    },
    [draggedCategoryId]
  );
  const handleCategoryDragLeave = useCallback(() => {
    setDropTargetCategoryId(null);
  }, []);
  const handleCategoryDrop = useCallback(
    (e: React.DragEvent, targetId: string) => {
      e.preventDefault();
      const id = e.dataTransfer.getData("application/x-category-id");
      if (id && id !== targetId) {
        setCategoriesOrdered((prev) => reorderByRank(prev, id, targetId));
      }
      setDraggedCategoryId(null);
      setDropTargetCategoryId(null);
    },
    []
  );

  const handleSubCategoryDragStart = useCallback(
    (e: React.DragEvent, id: string) => {
      const cell = (e.target as HTMLElement).closest("td");
      if (!cell || cell.cellIndex !== 0) {
        e.preventDefault();
        return;
      }
      setDraggedSubCategoryId(id);
      e.dataTransfer.setData("text/plain", id);
      e.dataTransfer.effectAllowed = "move";
      e.dataTransfer.setData("application/x-subcategory-id", id);
    },
    []
  );
  const handleSubCategoryDragEnd = useCallback(() => {
    setDraggedSubCategoryId(null);
    setDropTargetSubCategoryId(null);
  }, []);
  const handleSubCategoryDragOver = useCallback(
    (e: React.DragEvent, id: string) => {
      e.preventDefault();
      e.dataTransfer.dropEffect = "move";
      if (draggedSubCategoryId && draggedSubCategoryId !== id)
        setDropTargetSubCategoryId(id);
    },
    [draggedSubCategoryId]
  );
  const handleSubCategoryDragLeave = useCallback(() => {
    setDropTargetSubCategoryId(null);
  }, []);
  const handleSubCategoryDrop = useCallback(
    (e: React.DragEvent, targetId: string) => {
      e.preventDefault();
      const id = e.dataTransfer.getData("application/x-subcategory-id");
      if (id && id !== targetId) {
        setSubCategoriesOrdered((prev) => reorderByRank(prev, id, targetId));
      }
      setDraggedSubCategoryId(null);
      setDropTargetSubCategoryId(null);
    },
    []
  );

  const [selectedVariableId, setSelectedVariableId] = useState(
    courseSettingsVariables[0]?.id ?? ""
  );
  const [variableName, setVariableName] = useState("");
  const [variableOptions, setVariableOptions] = useState<string[]>([]);

  const selectedVariable = useMemo(
    () =>
      courseSettingsVariables.find((v) => v.id === selectedVariableId) ?? null,
    [selectedVariableId]
  );

  useEffect(() => {
    if (selectedVariable) {
      setVariableName(selectedVariable.name);
      setVariableOptions([...selectedVariable.options]);
    }
  }, [selectedVariable]);

  const addVariableOption = () => {
    setVariableOptions((prev) => [...prev, ""]);
  };
  const updateVariableOption = (index: number, value: string) => {
    setVariableOptions((prev) =>
      prev.map((o, i) => (i === index ? value : o))
    );
  };
  const removeVariableOption = (index: number) => {
    setVariableOptions((prev) => prev.filter((_, i) => i !== index));
  };

  const filteredCategories = useMemo(
    () =>
      categoriesOrdered.filter((c) =>
        c.name.toLowerCase().includes(categorySearch.toLowerCase())
      ),
    [categoriesOrdered, categorySearch]
  );
  const filteredSubCategories = useMemo(
    () =>
      subCategoriesOrdered.filter((s) =>
        s.name.toLowerCase().includes(subCategorySearch.toLowerCase())
      ),
    [subCategoriesOrdered, subCategorySearch]
  );
  const filteredTags = useMemo(
    () =>
      courseSettingsTags.filter(
        (t) =>
          t.name.toLowerCase().includes(tagSearch.toLowerCase()) ||
          t.slug.toLowerCase().includes(tagSearch.toLowerCase())
      ),
    [tagSearch]
  );
  const tagsTotalPages = Math.ceil(filteredTags.length / tagsPerPage) || 1;
  const paginatedTags = useMemo(
    () =>
      filteredTags.slice((tagsPage - 1) * tagsPerPage, tagsPage * tagsPerPage),
    [filteredTags, tagsPage, tagsPerPage]
  );

  const handleAddTag = (e: React.FormEvent) => {
    e.preventDefault();
    if (!tagName.trim()) return;
    setTagName("");
    setTagSlug("");
    setTagDescription("");
    setTagColor("#3b82f6");
  };

  return (
    <div className="min-h-screen bg-gray-50">
      <div className="bg-white border-b border-gray-200 px-6 py-5">
        <div className="flex flex-wrap items-center justify-between gap-4">
          <nav className="flex items-center gap-2 text-sm">
            {TABS.map((t) => (
              <Link
                key={t.id}
                href={`/admin/courses/settings?tab=${t.id}`}
                className={`px-4 py-2 rounded-lg font-medium transition-colors ${
                  tab === t.id
                    ? "text-admin-primary border-b-2 border-admin-primary bg-admin-primary/5"
                    : "text-gray-600 hover:text-gray-900 hover:bg-gray-50"
                }`}
              >
                {t.label}
              </Link>
            ))}
          </nav>
        </div>
      </div>

      <div className="p-6 lg:p-8">
        {tab === "categories" && (
          <>
            <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4 mb-6">
              <h2 className="text-xl font-bold text-gray-900">
                All Categories
                <span className="ml-2 inline-flex items-center justify-center min-w-[1.75rem] h-7 px-2 rounded-full bg-admin-primary text-white text-sm font-semibold">
                  {filteredCategories.length}
                </span>
              </h2>
              <div className="flex items-center gap-3">
                <button
                  type="button"
                  className="inline-flex items-center gap-2 px-4 py-2.5 bg-white border border-gray-300 rounded-lg text-gray-700 font-medium hover:bg-gray-50 transition-colors"
                >
                  <Download className="h-4 w-4" strokeWidth={2} />
                  Download
                </button>
                <Link
                  href="/admin/courses/settings/categories/new"
                  className="inline-flex items-center gap-2 px-4 py-2.5 bg-admin-primary text-white rounded-lg font-medium hover:bg-admin-primary-hover transition-colors"
                >
                  <Plus className="h-4 w-4" strokeWidth={2} />
                  Add New
                </Link>
              </div>
            </div>
            <div className="flex flex-col sm:flex-row gap-4 mb-4">
              <div className="relative flex-1">
                <Search
                  className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-gray-400"
                  strokeWidth={2}
                />
                <input
                  type="text"
                  placeholder="Search by name..."
                  value={categorySearch}
                  onChange={(e) => setCategorySearch(e.target.value)}
                  className="w-full pl-10 pr-4 py-2.5 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-admin-primary focus:border-admin-primary"
                />
              </div>
              <button
                type="button"
                className="inline-flex items-center justify-center gap-2 px-4 py-2.5 bg-admin-primary text-white rounded-lg font-medium hover:bg-admin-primary-hover transition-colors"
              >
                <Search className="h-4 w-4" strokeWidth={2} />
                Search
              </button>
            </div>
            <p className="text-sm text-gray-500 mb-3">
              Drag rows by the grip icon to reorder. Rank updates automatically.
            </p>
            <div className="bg-white rounded-xl border border-gray-200 overflow-hidden shadow-sm">
              <table className="w-full text-left">
                <thead className="bg-gray-50 border-b border-gray-200">
                  <tr>
                    <th className="px-4 py-3 text-xs font-semibold text-gray-500 uppercase tracking-wider w-14">
                      Image
                    </th>
                    <th className="px-4 py-3 text-xs font-semibold text-gray-500 uppercase tracking-wider">
                      Category Name
                    </th>
                    <th className="px-4 py-3 text-xs font-semibold text-gray-500 uppercase tracking-wider w-20">
                      Rank
                    </th>
                    <th className="px-4 py-3 text-xs font-semibold text-gray-500 uppercase tracking-wider">
                      Created At
                    </th>
                    <th className="px-4 py-3 text-xs font-semibold text-gray-500 uppercase tracking-wider w-24">
                      Courses
                    </th>
                    <th className="px-4 py-3 text-xs font-semibold text-gray-500 uppercase tracking-wider w-28">
                      Status
                    </th>
                    <th className="px-4 py-3 text-xs font-semibold text-gray-500 uppercase tracking-wider w-36">
                      Actions
                    </th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-gray-200">
                  {filteredCategories.map((c) => (
                    <CategoryRow
                      key={c.id}
                      category={c}
                      isDragging={draggedCategoryId === c.id}
                      isDropTarget={dropTargetCategoryId === c.id}
                      onDragStart={handleCategoryDragStart}
                      onDragEnd={handleCategoryDragEnd}
                      onDragOver={handleCategoryDragOver}
                      onDragLeave={handleCategoryDragLeave}
                      onDrop={handleCategoryDrop}
                    />
                  ))}
                </tbody>
              </table>
            </div>
          </>
        )}

        {tab === "sub-categories" && (
          <>
            <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4 mb-6">
              <h2 className="text-xl font-bold text-gray-900">
                All Sub Categories
                <span className="ml-2 inline-flex items-center justify-center min-w-[1.75rem] h-7 px-2 rounded-full bg-admin-primary text-white text-sm font-semibold">
                  {filteredSubCategories.length}
                </span>
              </h2>
              <div className="flex items-center gap-3">
                <button
                  type="button"
                  className="inline-flex items-center gap-2 px-4 py-2.5 bg-white border border-gray-300 rounded-lg text-gray-700 font-medium hover:bg-gray-50 transition-colors"
                >
                  <Download className="h-4 w-4" strokeWidth={2} />
                  Download
                </button>
                <Link
                  href="/admin/courses/settings/sub-categories/new"
                  className="inline-flex items-center gap-2 px-4 py-2.5 bg-admin-primary text-white rounded-lg font-medium hover:bg-admin-primary-hover transition-colors"
                >
                  <Plus className="h-4 w-4" strokeWidth={2} />
                  Add New
                </Link>
              </div>
            </div>
            <div className="flex flex-col sm:flex-row gap-4 mb-4">
              <div className="relative flex-1">
                <Search
                  className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-gray-400"
                  strokeWidth={2}
                />
                <input
                  type="text"
                  placeholder="Search by name..."
                  value={subCategorySearch}
                  onChange={(e) => setSubCategorySearch(e.target.value)}
                  className="w-full pl-10 pr-4 py-2.5 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-admin-primary focus:border-admin-primary"
                />
              </div>
              <button
                type="button"
                className="inline-flex items-center justify-center gap-2 px-4 py-2.5 bg-admin-primary text-white rounded-lg font-medium hover:bg-admin-primary-hover transition-colors"
              >
                <Search className="h-4 w-4" strokeWidth={2} />
                Search
              </button>
            </div>
            <p className="text-sm text-gray-500 mb-3">
              Drag rows by the grip icon to reorder. Rank updates automatically.
            </p>
            <div className="bg-white rounded-xl border border-gray-200 overflow-hidden shadow-sm">
              <table className="w-full text-left">
                <thead className="bg-gray-50 border-b border-gray-200">
                  <tr>
                    <th className="px-4 py-3 text-xs font-semibold text-gray-500 uppercase tracking-wider w-14">
                      Image
                    </th>
                    <th className="px-4 py-3 text-xs font-semibold text-gray-500 uppercase tracking-wider">
                      Sub Category Name
                    </th>
                    <th className="px-4 py-3 text-xs font-semibold text-gray-500 uppercase tracking-wider">
                      Parent Category
                    </th>
                    <th className="px-4 py-3 text-xs font-semibold text-gray-500 uppercase tracking-wider w-20">
                      Rank
                    </th>
                    <th className="px-4 py-3 text-xs font-semibold text-gray-500 uppercase tracking-wider">
                      Created At
                    </th>
                    <th className="px-4 py-3 text-xs font-semibold text-gray-500 uppercase tracking-wider w-24">
                      Courses
                    </th>
                    <th className="px-4 py-3 text-xs font-semibold text-gray-500 uppercase tracking-wider w-28">
                      Status
                    </th>
                    <th className="px-4 py-3 text-xs font-semibold text-gray-500 uppercase tracking-wider w-36">
                      Actions
                    </th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-gray-200">
                  {filteredSubCategories.map((s) => (
                    <SubCategoryRow
                      key={s.id}
                      subCategory={s}
                      isDragging={draggedSubCategoryId === s.id}
                      isDropTarget={dropTargetSubCategoryId === s.id}
                      onDragStart={handleSubCategoryDragStart}
                      onDragEnd={handleSubCategoryDragEnd}
                      onDragOver={handleSubCategoryDragOver}
                      onDragLeave={handleSubCategoryDragLeave}
                      onDrop={handleSubCategoryDrop}
                    />
                  ))}
                </tbody>
              </table>
            </div>
          </>
        )}

        {tab === "tags" && (
          <>
            <div className="grid grid-cols-1 lg:grid-cols-3 gap-8 mb-8">
              <div className="lg:col-span-1">
                <div className="bg-white rounded-xl border border-gray-200 p-6 shadow-sm">
                  <h3 className="text-lg font-semibold text-gray-900 mb-1">
                    Add New Tag
                  </h3>
                  <p className="text-sm text-gray-500 mb-4">
                    Create tags to help organize and categorize courses.
                  </p>
                  <form onSubmit={handleAddTag} className="space-y-4">
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-1">
                        Tag Name <span className="text-red-500">*</span>
                      </label>
                      <input
                        type="text"
                        value={tagName}
                        onChange={(e) => {
                          setTagName(e.target.value);
                          if (!tagSlug || tagSlug === slugFromName(tagName))
                            setTagSlug(slugFromName(e.target.value));
                        }}
                        placeholder="e.g., Advanced, Beginner Friendly"
                        className="w-full px-3 py-2.5 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-admin-primary focus:border-admin-primary"
                      />
                    </div>
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-1">
                        Slug <span className="text-red-500">*</span>
                      </label>
                      <input
                        type="text"
                        value={tagSlug}
                        onChange={(e) => setTagSlug(e.target.value)}
                        placeholder="e.g., advanced"
                        className="w-full px-3 py-2.5 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-admin-primary focus:border-admin-primary"
                      />
                    </div>
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-1">
                        Description
                      </label>
                      <input
                        type="text"
                        value={tagDescription}
                        onChange={(e) => setTagDescription(e.target.value)}
                        placeholder="Brief description of this tag"
                        className="w-full px-3 py-2.5 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-admin-primary focus:border-admin-primary"
                      />
                    </div>
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-2">
                        Tag Color <span className="text-red-500">*</span>
                      </label>
                      <div className="flex flex-wrap gap-2 mb-2">
                        {[
                          "#3b82f6",
                          "#22c55e",
                          "#ef4444",
                          "#f59e0b",
                          "#8b5cf6",
                          "#ec4899",
                          "#0ea5e9",
                          "#f97316",
                        ].map((color) => (
                          <button
                            key={color}
                            type="button"
                            onClick={() => setTagColor(color)}
                            className={`w-8 h-8 rounded-full border-2 transition-transform ${
                              tagColor === color
                                ? "border-gray-900 scale-110"
                                : "border-gray-300 hover:border-gray-400"
                            }`}
                            style={{ backgroundColor: color }}
                            aria-label={`Color ${color}`}
                          />
                        ))}
                      </div>
                      <div
                        className="inline-flex items-center px-3 py-1 rounded-full text-sm font-medium text-white"
                        style={{ backgroundColor: tagColor }}
                      >
                        Sample Tag
                      </div>
                    </div>
                    <button
                      type="submit"
                      className="w-full inline-flex items-center justify-center gap-2 px-4 py-2.5 bg-admin-primary text-white rounded-lg font-medium hover:bg-admin-primary-hover transition-colors"
                    >
                      <Plus className="h-4 w-4" strokeWidth={2} />
                      Add Tag
                    </button>
                  </form>
                  <div className="mt-4 pt-4 border-t border-gray-200">
                    <button
                      type="button"
                      className="w-full inline-flex items-center justify-center gap-2 px-4 py-2.5 bg-white border border-gray-300 rounded-lg text-gray-700 font-medium hover:bg-gray-50 transition-colors"
                    >
                      <FileUp className="h-4 w-4" strokeWidth={2} />
                      Upload Excel
                    </button>
                  </div>
                </div>
              </div>
              <div className="lg:col-span-2">
                <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4 mb-4">
                  <h3 className="text-lg font-semibold text-gray-900">
                    All Tags
                    <span className="ml-2 text-sm font-normal text-gray-500">
                      {filteredTags.length} total tags
                    </span>
                  </h3>
                  <div className="relative flex-1 sm:max-w-xs">
                    <Search
                      className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-gray-400"
                      strokeWidth={2}
                    />
                    <input
                      type="text"
                      placeholder="Search tags..."
                      value={tagSearch}
                      onChange={(e) => setTagSearch(e.target.value)}
                      className="w-full pl-9 pr-3 py-2 border border-gray-300 rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-admin-primary focus:border-admin-primary"
                    />
                  </div>
                </div>
                <div className="bg-white rounded-xl border border-gray-200 overflow-hidden shadow-sm">
                  <table className="w-full text-left">
                    <thead className="bg-gray-50 border-b border-gray-200">
                      <tr>
                        <th className="px-4 py-3 text-xs font-semibold text-gray-500 uppercase tracking-wider">
                          Tag
                        </th>
                        <th className="px-4 py-3 text-xs font-semibold text-gray-500 uppercase tracking-wider">
                          Slug
                        </th>
                        <th className="px-4 py-3 text-xs font-semibold text-gray-500 uppercase tracking-wider">
                          Description
                        </th>
                        <th className="px-4 py-3 text-xs font-semibold text-gray-500 uppercase tracking-wider w-24">
                          Courses
                        </th>
                        <th className="px-4 py-3 text-xs font-semibold text-gray-500 uppercase tracking-wider w-28">
                          Status
                        </th>
                        <th className="px-4 py-3 text-xs font-semibold text-gray-500 uppercase tracking-wider w-40">
                          Actions
                        </th>
                      </tr>
                    </thead>
                    <tbody className="divide-y divide-gray-200">
                      {paginatedTags.map((t) => (
                        <TagRow key={t.id} tag={t} />
                      ))}
                    </tbody>
                  </table>
                </div>
                <div className="mt-4 flex flex-wrap items-center justify-between gap-4">
                  <div className="flex items-center gap-2">
                    <span className="text-sm text-gray-600">Show</span>
                    <select
                      value={tagsPerPage}
                      onChange={(e) => {
                        setTagsPerPage(Number(e.target.value));
                        setTagsPage(1);
                      }}
                      className="px-2 py-1.5 border border-gray-300 rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-admin-primary focus:border-admin-primary"
                    >
                      <option value={10}>10</option>
                      <option value={20}>20</option>
                      <option value={50}>50</option>
                    </select>
                    <span className="text-sm text-gray-600">per page</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <span className="text-sm text-gray-600">
                      Page {tagsPage} of {tagsTotalPages}
                    </span>
                    <button
                      type="button"
                      onClick={() => setTagsPage((p) => Math.max(1, p - 1))}
                      disabled={tagsPage <= 1}
                      className="p-2 rounded-lg border border-gray-300 text-gray-700 hover:bg-gray-50 disabled:opacity-50 disabled:cursor-not-allowed"
                    >
                      Previous
                    </button>
                    <button
                      type="button"
                      onClick={() =>
                        setTagsPage((p) => Math.min(tagsTotalPages, p + 1))
                      }
                      disabled={tagsPage >= tagsTotalPages}
                      className="p-2 rounded-lg border border-gray-300 text-gray-700 hover:bg-gray-50 disabled:opacity-50 disabled:cursor-not-allowed"
                    >
                      Next
                    </button>
                  </div>
                </div>
              </div>
            </div>
          </>
        )}

        {tab === "variables" && (
          <div className="acv-layout">
            <aside className="acv-sidebar">
              <div className="acv-sidebar-header">
                <h2 className="acv-sidebar-title">Course Variables</h2>
                <span className="acv-sidebar-badge">
                  {COURSE_VARIABLES_ACTIVE_COUNT} Active
                </span>
              </div>
              <button type="button" className="acv-btn-create">
                <Plus className="acv-btn-create-icon" strokeWidth={2} />
                Create New Variable
              </button>
              <ul className="acv-variable-list">
                {courseSettingsVariables.map((v) => (
                  <li key={v.id}>
                    <button
                      type="button"
                      className={`acv-variable-item ${
                        selectedVariableId === v.id ? "active" : ""
                      }`}
                      onClick={() => setSelectedVariableId(v.id)}
                    >
                      <Settings2
                        className="acv-variable-item-icon"
                        strokeWidth={2}
                      />
                      <span>{v.name}</span>
                    </button>
                  </li>
                ))}
              </ul>
            </aside>
            <main className="acv-main">
              {selectedVariable ? (
                <div className="acv-main-inner">
                  <section className="acv-section">
                    <h3 className="acv-section-title">Variable Name</h3>
                    <input
                      type="text"
                      className="acv-input-name"
                      placeholder="e.g. Difficulty Level"
                      value={variableName}
                      onChange={(e) => setVariableName(e.target.value)}
                    />
                  </section>

                  <section className="acv-section">
                    <h3 className="acv-section-title">Related Options</h3>
                    <p className="text-sm text-gray-500 mb-3">
                      Add the options that will be available when this variable
                      is used (e.g. dropdown choices).
                    </p>
                    <ul className="acv-options-list">
                      {variableOptions.map((opt, index) => (
                        <li key={index} className="acv-option-row">
                          <input
                            type="text"
                            className="acv-option-input"
                            placeholder={`Option ${index + 1}`}
                            value={opt}
                            onChange={(e) =>
                              updateVariableOption(index, e.target.value)
                            }
                          />
                          <button
                            type="button"
                            className="acv-option-remove"
                            onClick={() => removeVariableOption(index)}
                            aria-label="Remove option"
                          >
                            <X className="w-4 h-4" strokeWidth={2} />
                          </button>
                        </li>
                      ))}
                    </ul>
                    <button
                      type="button"
                      className="acv-btn-add-option"
                      onClick={addVariableOption}
                    >
                      <Plus className="w-4 h-4" strokeWidth={2} />
                      Add option
                    </button>
                  </section>

                  <div className="acv-save-wrap">
                    <button type="button" className="acv-btn-save">
                      Save Variable
                    </button>
                  </div>
                </div>
              ) : (
                <div className="acv-empty">
                  <p className="acv-empty-title">No variable selected</p>
                  <p>
                    Create a new variable or select one from the list to
                    configure its name and options.
                  </p>
                </div>
              )}
            </main>
          </div>
        )}
      </div>
    </div>
  );
}

function CourseSettingsFallback() {
  return (
    <div className="min-h-screen bg-gray-50">
      <div className="bg-white border-b border-gray-200 px-6 py-5">
        <div className="flex flex-wrap items-center gap-2 text-sm text-gray-500">
          {TABS.map((t) => (
            <span key={t.id} className="px-4 py-2 rounded-lg bg-gray-100">
              {t.label}
            </span>
          ))}
        </div>
      </div>
      <div className="p-6 lg:p-8 flex items-center justify-center min-h-[40vh]">
        <p className="text-gray-500">Loading settings…</p>
      </div>
    </div>
  );
}

export default function CourseSettingsPage() {
  return (
    <Suspense fallback={<CourseSettingsFallback />}>
      <CourseSettingsContent />
    </Suspense>
  );
}

type CategoryRowDndProps = {
  category: CategoryRecord;
  isDragging?: boolean;
  isDropTarget?: boolean;
  onDragStart: (e: React.DragEvent, id: string) => void;
  onDragEnd: () => void;
  onDragOver: (e: React.DragEvent, id: string) => void;
  onDragLeave: () => void;
  onDrop: (e: React.DragEvent, id: string) => void;
};

function CategoryRow({
  category,
  isDragging,
  isDropTarget,
  onDragStart,
  onDragEnd,
  onDragOver,
  onDragLeave,
  onDrop,
}: CategoryRowDndProps) {
  const [status, setStatus] = useState(category.status);
  return (
    <tr
      className={`hover:bg-gray-50/50 transition-colors ${
        isDragging ? "opacity-50 bg-gray-100" : ""
      } ${isDropTarget ? "ring-2 ring-inset ring-admin-primary bg-admin-primary/5" : ""}`}
      draggable
      onDragStart={(e) => onDragStart(e, category.id)}
      onDragEnd={onDragEnd}
      onDragOver={(e) => onDragOver(e, category.id)}
      onDragLeave={onDragLeave}
      onDrop={(e) => onDrop(e, category.id)}
    >
      <td className="px-4 py-3">
        <div className="flex items-center gap-2">
          <span
            className="p-1 text-gray-400 hover:text-gray-600 rounded cursor-grab active:cursor-grabbing"
            aria-hidden
          >
            <GripVertical className="h-4 w-4" strokeWidth={2} />
          </span>
          <div className="w-10 h-10 rounded-full bg-sky-100 flex items-center justify-center text-sky-600 font-semibold text-sm">
            {category.name.slice(0, 2).toUpperCase()}
          </div>
        </div>
      </td>
      <td className="px-4 py-3">
        <div>
          <p className="font-medium text-gray-900">{category.name}</p>
          <p className="text-sm text-gray-500 lowercase">{category.slug}</p>
        </div>
      </td>
      <td className="px-4 py-3">
        <span className="inline-flex items-center px-2 py-0.5 rounded-md bg-gray-100 text-gray-700 text-sm">
          {category.rank}
        </span>
      </td>
      <td className="px-4 py-3 text-sm text-gray-600">{category.createdAt}</td>
      <td className="px-4 py-3 text-sm text-gray-900">{category.courses}</td>
      <td className="px-4 py-3">
        <button
          type="button"
          role="switch"
          aria-checked={status === "Active"}
          onClick={() => setStatus(status === "Active" ? "Inactive" : "Active")}
          className={`relative inline-flex h-6 w-11 flex-shrink-0 cursor-pointer rounded-full border-2 border-transparent transition-colors focus:outline-none focus:ring-2 focus:ring-admin-primary focus:ring-offset-2 ${
            status === "Active" ? "bg-admin-primary" : "bg-gray-200"
          }`}
        >
          <span
            className={`pointer-events-none inline-block h-5 w-5 transform rounded-full bg-white shadow ring-0 transition ${
              status === "Active" ? "translate-x-5" : "translate-x-0"
            }`}
          />
        </button>
        <span className="ml-2 text-sm text-gray-600">{status}</span>
      </td>
      <td className="px-4 py-3">
        <div className="flex items-center gap-1">
          <button
            type="button"
            className="p-2 rounded-lg border border-blue-200 text-blue-600 hover:bg-blue-50 transition-colors"
            title="Edit"
          >
            <Pencil className="h-4 w-4" strokeWidth={2} />
          </button>
          <button
            type="button"
            className="p-2 rounded-lg border border-green-200 text-green-600 hover:bg-green-50 transition-colors"
            title="Duplicate"
          >
            <Copy className="h-4 w-4" strokeWidth={2} />
          </button>
          <button
            type="button"
            className="p-2 rounded-lg border border-red-200 text-red-600 hover:bg-red-50 transition-colors"
            title="Delete"
          >
            <Trash2 className="h-4 w-4" strokeWidth={2} />
          </button>
        </div>
      </td>
    </tr>
  );
}

type SubCategoryRowDndProps = {
  subCategory: SubCategoryRecord;
  isDragging?: boolean;
  isDropTarget?: boolean;
  onDragStart: (e: React.DragEvent, id: string) => void;
  onDragEnd: () => void;
  onDragOver: (e: React.DragEvent, id: string) => void;
  onDragLeave: () => void;
  onDrop: (e: React.DragEvent, id: string) => void;
};

function SubCategoryRow({
  subCategory,
  isDragging,
  isDropTarget,
  onDragStart,
  onDragEnd,
  onDragOver,
  onDragLeave,
  onDrop,
}: SubCategoryRowDndProps) {
  const [status, setStatus] = useState(subCategory.status);
  return (
    <tr
      className={`hover:bg-gray-50/50 transition-colors ${
        isDragging ? "opacity-50 bg-gray-100" : ""
      } ${isDropTarget ? "ring-2 ring-inset ring-admin-primary bg-admin-primary/5" : ""}`}
      draggable
      onDragStart={(e) => onDragStart(e, subCategory.id)}
      onDragEnd={onDragEnd}
      onDragOver={(e) => onDragOver(e, subCategory.id)}
      onDragLeave={onDragLeave}
      onDrop={(e) => onDrop(e, subCategory.id)}
    >
      <td className="px-4 py-3">
        <div className="flex items-center gap-2">
          <span
            className="p-1 text-gray-400 hover:text-gray-600 rounded cursor-grab active:cursor-grabbing"
            aria-hidden
          >
            <GripVertical className="h-4 w-4" strokeWidth={2} />
          </span>
          <div className="w-10 h-10 rounded-full bg-gray-100 flex items-center justify-center text-gray-600 font-semibold text-xs">
            {subCategory.name.slice(0, 2).toUpperCase()}
          </div>
        </div>
      </td>
      <td className="px-4 py-3">
        <div>
          <p className="font-medium text-gray-900">{subCategory.name}</p>
          <p className="text-sm text-gray-500 lowercase">{subCategory.slug}</p>
        </div>
      </td>
      <td className="px-4 py-3 text-sm text-gray-600">
        {subCategory.parentCategory}
      </td>
      <td className="px-4 py-3">
        <span className="inline-flex items-center px-2 py-0.5 rounded-md bg-gray-100 text-gray-700 text-sm">
          {subCategory.rank}
        </span>
      </td>
      <td className="px-4 py-3 text-sm text-gray-600">
        {subCategory.createdAt}
      </td>
      <td className="px-4 py-3 text-sm text-gray-900">{subCategory.courses}</td>
      <td className="px-4 py-3">
        <button
          type="button"
          role="switch"
          aria-checked={status === "Active"}
          onClick={() => setStatus(status === "Active" ? "Inactive" : "Active")}
          className={`relative inline-flex h-6 w-11 flex-shrink-0 cursor-pointer rounded-full border-2 border-transparent transition-colors focus:outline-none focus:ring-2 focus:ring-admin-primary focus:ring-offset-2 ${
            status === "Active" ? "bg-admin-primary" : "bg-gray-200"
          }`}
        >
          <span
            className={`pointer-events-none inline-block h-5 w-5 transform rounded-full bg-white shadow ring-0 transition ${
              status === "Active" ? "translate-x-5" : "translate-x-0"
            }`}
          />
        </button>
        <span className="ml-2 text-sm text-gray-600">{status}</span>
      </td>
      <td className="px-4 py-3">
        <div className="flex items-center gap-1">
          <button
            type="button"
            className="p-2 rounded-lg border border-blue-200 text-blue-600 hover:bg-blue-50 transition-colors"
            title="Edit"
          >
            <Pencil className="h-4 w-4" strokeWidth={2} />
          </button>
          <button
            type="button"
            className="p-2 rounded-lg border border-green-200 text-green-600 hover:bg-green-50 transition-colors"
            title="Duplicate"
          >
            <Copy className="h-4 w-4" strokeWidth={2} />
          </button>
          <button
            type="button"
            className="p-2 rounded-lg border border-red-200 text-red-600 hover:bg-red-50 transition-colors"
            title="Delete"
          >
            <Trash2 className="h-4 w-4" strokeWidth={2} />
          </button>
        </div>
      </td>
    </tr>
  );
}

function TagRow({ tag }: { tag: TagRecord }) {
  const [status, setStatus] = useState(tag.status);
  return (
    <tr className="hover:bg-gray-50/50">
      <td className="px-4 py-3">
        <span
          className="inline-flex items-center px-3 py-1 rounded-full text-sm font-medium text-white"
          style={{ backgroundColor: tag.color }}
        >
          {tag.name}
        </span>
      </td>
      <td className="px-4 py-3 text-sm text-gray-600">{tag.slug}</td>
      <td className="px-4 py-3 text-sm text-gray-500">
        {tag.description ?? "—"}
      </td>
      <td className="px-4 py-3 text-sm text-gray-900">{tag.courses}</td>
      <td className="px-4 py-3">
        <button
          type="button"
          role="switch"
          aria-checked={status === "Active"}
          onClick={() => setStatus(status === "Active" ? "Inactive" : "Active")}
          className={`relative inline-flex h-6 w-11 flex-shrink-0 cursor-pointer rounded-full border-2 border-transparent transition-colors focus:outline-none focus:ring-2 focus:ring-admin-primary focus:ring-offset-2 ${
            status === "Active" ? "bg-admin-primary" : "bg-gray-200"
          }`}
        >
          <span
            className={`pointer-events-none inline-block h-5 w-5 transform rounded-full bg-white shadow ring-0 transition ${
              status === "Active" ? "translate-x-5" : "translate-x-0"
            }`}
          />
        </button>
        <span className="ml-2 text-sm text-gray-600">{status}</span>
      </td>
      <td className="px-4 py-3">
        <div className="flex items-center gap-2">
          <button
            type="button"
            className="inline-flex items-center gap-1.5 px-2 py-1.5 text-sm text-gray-700 hover:bg-gray-100 rounded-lg transition-colors"
          >
            <Pencil className="h-4 w-4" strokeWidth={2} />
            Edit
          </button>
          <button
            type="button"
            className="inline-flex items-center gap-1.5 px-2 py-1.5 text-sm text-red-600 hover:bg-red-50 rounded-lg transition-colors"
          >
            <Trash2 className="h-4 w-4" strokeWidth={2} />
            Delete
          </button>
        </div>
      </td>
    </tr>
  );
}
