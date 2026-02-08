"use client";

import { useParams, useRouter } from "next/navigation";
import Link from "next/link";
import { useState, useEffect } from "react";
import { courses } from "@/lib/courses";
import { ROUTES } from "@/constants/routes";
import { ArrowLeft } from "lucide-react";

export default function AdminCourseEditPage() {
  const params = useParams();
  const router = useRouter();
  const id = typeof params.id === "string" ? params.id : "";
  const course = courses.find((c) => c.id === id);

  const [title, setTitle] = useState("");
  const [category, setCategory] = useState("");
  const [subCategory, setSubCategory] = useState("");
  const [price, setPrice] = useState("");
  const [originalPrice, setOriginalPrice] = useState("");
  const [saved, setSaved] = useState(false);

  useEffect(() => {
    if (course) {
      setTitle(course.title);
      setCategory(course.category);
      setSubCategory(course.subCategory ?? "");
      setPrice(String(course.priceEGP ?? course.price));
      setOriginalPrice(
        String(course.originalPriceEGP ?? course.originalPrice ?? "")
      );
    }
  }, [course]);

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

  const handleSave = (e: React.FormEvent) => {
    e.preventDefault();
    setSaved(true);
    setTimeout(() => router.push(ROUTES.ADMIN.COURSE(id)), 800);
  };

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
          <h1 className="text-xl font-bold text-gray-900">Edit course</h1>
          <p className="text-sm text-gray-500 mt-1">{course.title}</p>
        </div>
        <form onSubmit={handleSave} className="p-6 space-y-5">
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">
              Title
            </label>
            <input
              type="text"
              value={title}
              onChange={(e) => setTitle(e.target.value)}
              className="w-full px-4 py-2.5 border border-gray-200 rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-admin-primary focus:border-admin-primary"
            />
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">
              Category
            </label>
            <input
              type="text"
              value={category}
              onChange={(e) => setCategory(e.target.value)}
              className="w-full px-4 py-2.5 border border-gray-200 rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-admin-primary focus:border-admin-primary"
            />
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">
              Subcategory
            </label>
            <input
              type="text"
              value={subCategory}
              onChange={(e) => setSubCategory(e.target.value)}
              className="w-full px-4 py-2.5 border border-gray-200 rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-admin-primary focus:border-admin-primary"
            />
          </div>
          <div className="grid grid-cols-2 gap-4">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">
                Price (EGP)
              </label>
              <input
                type="number"
                min={0}
                step={0.01}
                value={price}
                onChange={(e) => setPrice(e.target.value)}
                className="w-full px-4 py-2.5 border border-gray-200 rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-admin-primary focus:border-admin-primary"
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">
                Original price (EGP)
              </label>
              <input
                type="number"
                min={0}
                step={0.01}
                value={originalPrice}
                onChange={(e) => setOriginalPrice(e.target.value)}
                placeholder="Optional"
                className="w-full px-4 py-2.5 border border-gray-200 rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-admin-primary focus:border-admin-primary"
              />
            </div>
          </div>
          <div className="flex items-center gap-3 pt-2">
            <button
              type="submit"
              className="px-4 py-2.5 bg-admin-primary text-white rounded-lg font-medium text-sm hover:bg-admin-primary-hover transition-colors disabled:opacity-60"
              disabled={saved}
            >
              {saved ? "Saved" : "Save changes"}
            </button>
            <Link
              href={ROUTES.ADMIN.COURSE(id)}
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
