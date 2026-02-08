"use client";

import { useState } from "react";
import Link from "next/link";
import { ROUTES } from "@/constants/routes";

function slugFromName(name: string) {
  return name
    .toLowerCase()
    .replace(/\s+/g, "-")
    .replace(/[^a-z0-9-]/g, "");
}

export default function LMSNewCategoryPage() {
  const [name, setName] = useState("");
  const [slug, setSlug] = useState("");
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
            href="/admin/lms/settings?tab=categories"
            className="text-gray-500 hover:text-admin-primary font-medium"
          >
            Categories
          </Link>
          <span className="text-gray-400">/</span>
          <span className="text-gray-900 font-medium">Add New</span>
        </div>
      </div>

      <div className="p-6 lg:p-8 max-w-xl">
        <h1 className="text-xl font-bold text-gray-900 mb-6">
          Add New Category
        </h1>
        <form onSubmit={handleSubmit} className="bg-white rounded-xl border border-gray-200 shadow-sm p-6 space-y-4">
          <div>
            <label
              htmlFor="category-name"
              className="block text-sm font-medium text-gray-700 mb-1"
            >
              Category Name <span className="text-red-500">*</span>
            </label>
            <input
              id="category-name"
              type="text"
              value={name}
              onChange={(e) => handleNameChange(e.target.value)}
              placeholder="e.g. Leadership"
              className="w-full px-3 py-2.5 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-admin-primary focus:border-admin-primary"
            />
          </div>
          <div>
            <label
              htmlFor="category-slug"
              className="block text-sm font-medium text-gray-700 mb-1"
            >
              Slug <span className="text-red-500">*</span>
            </label>
            <input
              id="category-slug"
              type="text"
              value={slug}
              onChange={(e) => setSlug(e.target.value)}
              placeholder="e.g. leadership"
              className="w-full px-3 py-2.5 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-admin-primary focus:border-admin-primary"
            />
          </div>
          <div className="flex items-center gap-3 pt-2">
            <button
              type="submit"
              className="px-4 py-2.5 bg-admin-primary text-white rounded-lg font-medium text-sm hover:bg-admin-primary-hover transition-colors disabled:opacity-70"
              disabled={saved || !name.trim()}
            >
              {saved ? "Saved" : "Save Category"}
            </button>
            <Link
              href="/admin/lms/settings?tab=categories"
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
