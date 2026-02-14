"use client";

import { useState, useMemo, Suspense } from "react";
import Link from "next/link";
import { useSearchParams } from "next/navigation";
import { ROUTES } from "@/constants/routes";
import { Search, Plus, Download, Pencil, Trash2, GripVertical } from "lucide-react";
import {
  lmsSettingsCategories,
  lmsSettingsSubCategories,
  type LMSCategoryRecord,
  type LMSSubCategoryRecord,
} from "@/lib/lmsSettingsData";

type TabId = "categories" | "sub-categories";

const TABS: { id: TabId; label: string }[] = [
  { id: "categories", label: "Categories" },
  { id: "sub-categories", label: "Sub Categories" },
];

function slugFromName(name: string) {
  return name
    .toLowerCase()
    .replace(/\s+/g, "-")
    .replace(/[^a-z0-9-]/g, "");
}

function LMSSettingsContent() {
  const searchParams = useSearchParams();
  const tabParam = searchParams.get("tab") as TabId | null;
  const tab: TabId =
    tabParam && TABS.some((t) => t.id === tabParam) ? tabParam : "categories";

  const [categorySearch, setCategorySearch] = useState("");
  const [subCategorySearch, setSubCategorySearch] = useState("");
  const [addedCategories, setAddedCategories] = useState<LMSCategoryRecord[]>([]);
  const [addedSubCategories, setAddedSubCategories] = useState<
    LMSSubCategoryRecord[]
  >([]);

  const [newCatName, setNewCatName] = useState("");
  const [newSubName, setNewSubName] = useState("");
  const [newSubParentId, setNewSubParentId] = useState(
    lmsSettingsCategories[0]?.id ?? ""
  );

  const allCategories = useMemo(
    () => [...lmsSettingsCategories, ...addedCategories],
    [addedCategories]
  );
  const allSubCategories = useMemo(
    () => [...lmsSettingsSubCategories, ...addedSubCategories],
    [addedSubCategories]
  );

  const filteredCategories = useMemo(
    () =>
      allCategories.filter((c) =>
        c.name.toLowerCase().includes(categorySearch.toLowerCase())
      ),
    [allCategories, categorySearch]
  );
  const filteredSubCategories = useMemo(
    () =>
      allSubCategories.filter((s) =>
        s.name.toLowerCase().includes(subCategorySearch.toLowerCase())
      ),
    [allSubCategories, subCategorySearch]
  );

  const handleAddCategory = (e: React.FormEvent) => {
    e.preventDefault();
    if (!newCatName.trim()) return;
    setAddedCategories((prev) => [
      ...prev,
      {
        id: `add-${Date.now()}`,
        name: newCatName.trim(),
        slug: slugFromName(newCatName),
        rank: 0,
        createdAt: new Date().toLocaleDateString(),
        courses: 0,
        status: "Active",
      },
    ]);
    setNewCatName("");
  };

  const handleAddSubCategory = (e: React.FormEvent) => {
    e.preventDefault();
    if (!newSubName.trim()) return;
    const parent = allCategories.find((c) => c.id === newSubParentId);
    setAddedSubCategories((prev) => [
      ...prev,
      {
        id: `add-sub-${Date.now()}`,
        name: newSubName.trim(),
        slug: slugFromName(newSubName),
        parentCategory: parent?.name ?? "",
        parentCategoryId: newSubParentId,
        rank: 0,
        createdAt: new Date().toLocaleDateString(),
        courses: 0,
        status: "Active",
      },
    ]);
    setNewSubName("");
  };

  return (
    <div className="min-h-screen bg-[#F8F9FA]">
      <div className="bg-white border-b border-gray-200 px-6 py-5">
        <div className="flex flex-wrap items-center justify-between gap-4">
          <div>
            <Link
              href={ROUTES.ADMIN.LMS_COURSES}
              className="text-sm text-gray-500 hover:text-gray-900 font-medium"
            >
              ← Back to LMS Courses
            </Link>
            <h1 className="text-xl font-bold text-gray-900 mt-1">
              LMS Setting
            </h1>
          </div>
          <nav className="flex items-center gap-2 text-sm">
            {TABS.map((t) => (
              <Link
                key={t.id}
                href={`/admin/lms/settings?tab=${t.id}`}
                className={`px-4 py-2 rounded-lg font-medium transition-colors ${
                  tab === t.id
                    ? "text-primary border-b-2 border-primary bg-primary/5"
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
                <span className="ml-2 inline-flex items-center justify-center min-w-[1.75rem] h-7 px-2 rounded-full bg-primary text-white text-sm font-semibold">
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
              </div>
            </div>
            <div className="bg-white rounded-xl border border-gray-200 p-4 mb-4">
              <form onSubmit={handleAddCategory} className="flex flex-wrap items-end gap-3">
                <div className="min-w-[160px]">
                  <label className="block text-xs font-medium text-gray-500 mb-1">
                    Category Name
                  </label>
                  <input
                    type="text"
                    value={newCatName}
                    onChange={(e) => setNewCatName(e.target.value)}
                    placeholder="e.g. Leadership"
                    className="w-full px-3 py-2 border border-gray-300 rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-primary focus:border-primary"
                  />
                </div>
                <button
                  type="submit"
                  className="inline-flex items-center gap-2 px-4 py-2 bg-primary text-white rounded-lg font-medium text-sm hover:bg-primary/90 transition-colors"
                >
                  <Plus className="h-4 w-4" strokeWidth={2} />
                  Add
                </button>
              </form>
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
                  className="w-full pl-10 pr-4 py-2.5 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-primary focus:border-primary"
                />
              </div>
              <button
                type="button"
                className="inline-flex items-center justify-center gap-2 px-4 py-2.5 bg-primary text-white rounded-lg font-medium hover:bg-primary/90 transition-colors"
              >
                <Search className="h-4 w-4" strokeWidth={2} />
                Search
              </button>
            </div>
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
                    <th className="px-4 py-3 text-xs font-semibold text-gray-500 uppercase tracking-wider">
                      Created At
                    </th>
                    <th className="px-4 py-3 text-xs font-semibold text-gray-500 uppercase tracking-wider w-24">
                      Courses
                    </th>
                    <th className="px-4 py-3 text-xs font-semibold text-gray-500 uppercase tracking-wider w-36">
                      Actions
                    </th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-gray-200">
                  {filteredCategories.map((c) => (
                    <LMSCategoryRow key={c.id} category={c} />
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
                <span className="ml-2 inline-flex items-center justify-center min-w-[1.75rem] h-7 px-2 rounded-full bg-primary text-white text-sm font-semibold">
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
              </div>
            </div>
            <div className="bg-white rounded-xl border border-gray-200 p-4 mb-4">
              <form onSubmit={handleAddSubCategory} className="flex flex-wrap items-end gap-3">
                <div className="min-w-[160px]">
                  <label className="block text-xs font-medium text-gray-500 mb-1">
                    Sub Category Name
                  </label>
                  <input
                    type="text"
                    value={newSubName}
                    onChange={(e) => setNewSubName(e.target.value)}
                    placeholder="e.g. Project Management"
                    className="w-full px-3 py-2 border border-gray-300 rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-primary focus:border-primary"
                  />
                </div>
                <div className="min-w-[140px]">
                  <label className="block text-xs font-medium text-gray-500 mb-1">
                    Parent Category
                  </label>
                  <select
                    value={newSubParentId}
                    onChange={(e) => setNewSubParentId(e.target.value)}
                    className="w-full px-3 py-2 border border-gray-300 rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-primary focus:border-primary"
                  >
                    {allCategories.map((c) => (
                      <option key={c.id} value={c.id}>
                        {c.name}
                      </option>
                    ))}
                  </select>
                </div>
                <button
                  type="submit"
                  className="inline-flex items-center gap-2 px-4 py-2 bg-primary text-white rounded-lg font-medium text-sm hover:bg-primary/90 transition-colors"
                >
                  <Plus className="h-4 w-4" strokeWidth={2} />
                  Add
                </button>
              </form>
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
                  className="w-full pl-10 pr-4 py-2.5 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-primary focus:border-primary"
                />
              </div>
              <button
                type="button"
                className="inline-flex items-center justify-center gap-2 px-4 py-2.5 bg-primary text-white rounded-lg font-medium hover:bg-primary/90 transition-colors"
              >
                <Search className="h-4 w-4" strokeWidth={2} />
                Search
              </button>
            </div>
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
                    <th className="px-4 py-3 text-xs font-semibold text-gray-500 uppercase tracking-wider">
                      Created At
                    </th>
                    <th className="px-4 py-3 text-xs font-semibold text-gray-500 uppercase tracking-wider w-24">
                      Courses
                    </th>
                    <th className="px-4 py-3 text-xs font-semibold text-gray-500 uppercase tracking-wider w-36">
                      Actions
                    </th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-gray-200">
                  {filteredSubCategories.map((s) => (
                    <LMSSubCategoryRow key={s.id} subCategory={s} />
                  ))}
                </tbody>
              </table>
            </div>
          </>
        )}
      </div>
    </div>
  );
}

function LMSCategoryRow({ category }: { category: LMSCategoryRecord }) {
  return (
    <tr className="hover:bg-gray-50/50">
      <td className="px-4 py-3">
        <div className="flex items-center gap-2">
          <button
            type="button"
            className="p-1 text-gray-400 hover:text-gray-600 rounded"
          >
            <GripVertical className="h-4 w-4" strokeWidth={2} />
          </button>
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
      <td className="px-4 py-3 text-sm text-gray-600">{category.createdAt}</td>
      <td className="px-4 py-3 text-sm text-gray-900">{category.courses}</td>
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

function LMSSubCategoryRow({
  subCategory,
}: {
  subCategory: LMSSubCategoryRecord;
}) {
  return (
    <tr className="hover:bg-gray-50/50">
      <td className="px-4 py-3">
        <div className="flex items-center gap-2">
          <button
            type="button"
            className="p-1 text-gray-400 hover:text-gray-600 rounded"
          >
            <GripVertical className="h-4 w-4" strokeWidth={2} />
          </button>
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
      <td className="px-4 py-3 text-sm text-gray-600">
        {subCategory.createdAt}
      </td>
      <td className="px-4 py-3 text-sm text-gray-900">{subCategory.courses}</td>
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

function LMSSettingsFallback() {
  return (
    <div className="min-h-screen bg-[#F8F9FA]">
      <div className="bg-white border-b border-gray-200 px-6 py-5">
        <div className="flex flex-wrap items-center gap-2 text-sm text-gray-500">
          Loading…
        </div>
      </div>
      <div className="p-6 lg:p-8 flex items-center justify-center min-h-[40vh]">
        <p className="text-gray-500">Loading settings…</p>
      </div>
    </div>
  );
}

export default function AdminLMSSettingsPage() {
  return (
    <Suspense fallback={<LMSSettingsFallback />}>
      <LMSSettingsContent />
    </Suspense>
  );
}
