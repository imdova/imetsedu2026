"use client";

import { useState } from "react";
import Link from "next/link";
import { ROUTES } from "@/constants/routes";
import { lmsSettingsCategories } from "@/lib/lmsSettingsData";

function slugFromName(name: string) {
  return name
    .toLowerCase()
    .replace(/\s+/g, "-")
    .replace(/[^a-z0-9-]/g, "");
}

export default function LMSNewSubCategoryPage() {
  const [name, setName] = useState("");
  const [slug, setSlug] = useState("");
  const [parentCategoryId, setParentCategoryId] = useState(
    lmsSettingsCategories[0]?.id ?? ""
  );
  const [rank, setRank] = useState(0);
  const [saved, setSaved] = useState(false);

  const handleNameChange = (value: string) => {
    setName(value);
    setSlug(slugFromName(value));
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setSaved(true);
  };

  return (
    <div className="min-h-screen bg-[#F8F9FA]">
      <div className="bg-white border-b border-gray-200 px-6 py-4">
        <div className="flex flex-wrap items-center gap-2 text-sm">
          <Link
            href={ROUTES.ADMIN.LMS_SETTINGS}
            className="text-gray-500 hover:text-admin-primary font-medium"
          >
            LMS Setting
          </Link>
          <span className="text-gray-400">/</span>
          <Link
            href="/admin/lms/settings?tab=sub-categories"
            className="text-gray-500 hover:text-admin-primary font-medium"
          >
            Sub Categories
          </Link>
          <span className="text-gray-400">/</span>
          <span className="text-gray-900 font-medium">Add New</span>
        </div>
      </div>

      <div className="p-6 lg:p-8 max-w-xl">
        <h1 className="text-xl font-bold text-gray-900 mb-6">
          Add New Sub Category
        </h1>
        <form
          onSubmit={handleSubmit}
          className="bg-white rounded-xl border border-gray-200 shadow-sm p-6 space-y-4"
        >
          <div>
            <label
              htmlFor="subcategory-name"
              className="block text-sm font-medium text-gray-700 mb-1"
            >
              Sub Category Name <span className="text-red-500">*</span>
            </label>
            <input
              id="subcategory-name"
              type="text"
              value={name}
              onChange={(e) => handleNameChange(e.target.value)}
              placeholder="e.g. Project Management"
              className="w-full px-3 py-2.5 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-admin-primary focus:border-admin-primary"
            />
          </div>
          <div>
            <label
              htmlFor="subcategory-slug"
              className="block text-sm font-medium text-gray-700 mb-1"
            >
              Slug <span className="text-red-500">*</span>
            </label>
            <input
              id="subcategory-slug"
              type="text"
              value={slug}
              onChange={(e) => setSlug(e.target.value)}
              placeholder="e.g. project-management"
              className="w-full px-3 py-2.5 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-admin-primary focus:border-admin-primary"
            />
          </div>
          <div>
            <label
              htmlFor="parent-category"
              className="block text-sm font-medium text-gray-700 mb-1"
            >
              Parent Category <span className="text-red-500">*</span>
            </label>
            <select
              id="parent-category"
              value={parentCategoryId}
              onChange={(e) => setParentCategoryId(e.target.value)}
              className="w-full px-3 py-2.5 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-admin-primary focus:border-admin-primary"
            >
              {lmsSettingsCategories.map((c) => (
                <option key={c.id} value={c.id}>
                  {c.name}
                </option>
              ))}
            </select>
          </div>
          <div>
            <label
              htmlFor="subcategory-rank"
              className="block text-sm font-medium text-gray-700 mb-1"
            >
              Rank
            </label>
            <input
              id="subcategory-rank"
              type="number"
              min={0}
              value={rank}
              onChange={(e) => setRank(Number(e.target.value) || 0)}
              className="w-24 px-3 py-2.5 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-admin-primary focus:border-admin-primary"
            />
          </div>
          <div className="flex items-center gap-3 pt-2">
            <button
              type="submit"
              className="px-4 py-2.5 bg-admin-primary text-white rounded-lg font-medium text-sm hover:bg-admin-primary-hover transition-colors disabled:opacity-70"
              disabled={saved || !name.trim()}
            >
              {saved ? "Saved" : "Save Sub Category"}
            </button>
            <Link
              href="/admin/lms/settings?tab=sub-categories"
              className="px-4 py-2.5 border border-gray-200 rounded-lg font-medium text-sm text-gray-700 hover:bg-gray-50 transition-colors"
            >
              Cancel
            </Link>
          </div>
        </form>
      </div>
    </div>
  );
}
