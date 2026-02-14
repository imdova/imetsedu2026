"use client";

import { useState } from "react";
import Link from "next/link";
import {
  ListChecks,
  Upload,
  Plus,
  RefreshCw,
  Bold,
  Italic,
  Underline,
  List,
  ListOrdered,
  AlignLeft,
  AlignCenter,
  AlignRight,
  Link as LinkIcon,
} from "lucide-react";

function slugFromName(name: string) {
  return name
    .toLowerCase()
    .replace(/\s+/g, "-")
    .replace(/[^a-z0-9-]/g, "");
}

export default function AddNewCategoryPage() {
  const [name, setName] = useState("");
  const [slug, setSlug] = useState("category-slug");
  const [metaTitle, setMetaTitle] = useState("");
  const [metaDescription, setMetaDescription] = useState("");
  const [metaKeywords, setMetaKeywords] = useState<string[]>([]);
  const [keywordInput, setKeywordInput] = useState("");
  const [headline, setHeadline] = useState("");
  const [description, setDescription] = useState("");
  const [faqItems, setFaqItems] = useState<
    { question: string; answer: string }[]
  >([]);

  const addKeyword = () => {
    const v = keywordInput.trim();
    if (v && !metaKeywords.includes(v)) {
      setMetaKeywords((prev) => [...prev, v]);
      setKeywordInput("");
    }
  };

  const removeKeyword = (k: string) => {
    setMetaKeywords((prev) => prev.filter((x) => x !== k));
  };

  const addFaq = () => {
    setFaqItems((prev) => [...prev, { question: "", answer: "" }]);
  };

  const updateFaq = (
    index: number,
    field: "question" | "answer",
    value: string
  ) => {
    setFaqItems((prev) => {
      const next = [...prev];
      next[index] = { ...next[index], [field]: value };
      return next;
    });
  };

  const handleNameChange = (value: string) => {
    setName(value);
    setSlug(slugFromName(value) || "category-slug");
  };

  return (
    <div className="min-h-screen bg-gray-50">
      <div className="bg-white border-b border-gray-200 px-6 py-4">
        <div className="flex flex-wrap items-center justify-between gap-4">
          <nav className="flex items-center gap-2 text-sm">
            <Link
              href="/admin/courses/settings?tab=categories"
              className="text-gray-500 hover:text-primary font-medium"
            >
              Categories
            </Link>
            <span className="text-gray-400">/</span>
            <Link
              href="/admin/courses/settings?tab=sub-categories"
              className="text-gray-500 hover:text-primary font-medium"
            >
              Sub Categories
            </Link>
            <span className="text-gray-400">/</span>
            <Link
              href="/admin/courses/settings?tab=tags"
              className="text-gray-500 hover:text-primary font-medium"
            >
              Tags
            </Link>
            <span className="text-gray-400">/</span>
            <Link
              href="/admin/courses/settings?tab=variables"
              className="text-gray-500 hover:text-primary font-medium"
            >
              Course Variables
            </Link>
          </nav>
          <Link
            href="/admin/courses/settings?tab=categories"
            className="inline-flex items-center gap-2 px-4 py-2 text-primary font-medium hover:bg-primary/5 rounded-lg transition-colors"
          >
            Back to Categories
          </Link>
        </div>
      </div>

      <div className="p-6 lg:p-8 max-w-6xl mx-auto">
        <h1 className="text-2xl font-bold text-gray-900 mb-6">
          Add New Category
        </h1>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          <div className="lg:col-span-2 space-y-6">
            {/* Category Setup */}
            <section className="bg-white rounded-xl border border-gray-200 p-6 shadow-sm">
              <div className="flex items-center gap-2 mb-4">
                <div className="w-9 h-9 rounded-lg bg-primary/10 flex items-center justify-center">
                  <ListChecks
                    className="h-5 w-5 text-primary"
                    strokeWidth={2}
                  />
                </div>
                <h2 className="text-lg font-semibold text-gray-900">
                  Category Setup
                </h2>
              </div>
              <div className="space-y-4">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">
                    Category Name <span className="text-red-500">*</span>
                  </label>
                  <input
                    type="text"
                    value={name}
                    onChange={(e) => handleNameChange(e.target.value)}
                    placeholder="Enter category name"
                    className="w-full px-4 py-2.5 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-primary focus:border-primary"
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">
                    Slug <span className="text-red-500">*</span>
                  </label>
                  <input
                    type="text"
                    value={slug}
                    onChange={(e) => setSlug(e.target.value)}
                    className="w-full px-4 py-2.5 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-primary focus:border-primary"
                  />
                  <p className="mt-1 text-xs text-gray-500">
                    Auto-generated from category name (editable)
                  </p>
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">
                    Icon
                  </label>
                  <button
                    type="button"
                    className="inline-flex items-center gap-2 px-4 py-2.5 border border-gray-300 rounded-lg text-gray-700 font-medium hover:bg-gray-50 transition-colors"
                  >
                    <Upload className="h-4 w-4" strokeWidth={2} />
                    Upload Icon
                  </button>
                  <p className="mt-1 text-xs text-gray-500">
                    Optional: Upload an icon file (JPEG, PNG, or WebP)
                  </p>
                </div>
              </div>
            </section>

            {/* SEO Meta */}
            <section className="bg-white rounded-xl border border-gray-200 p-6 shadow-sm">
              <h2 className="text-lg font-semibold text-gray-900 mb-1">
                SEO Meta Information (Optional)
              </h2>
              <p className="text-sm text-gray-500 mb-4">
                Improve search engine visibility for this category
              </p>
              <div className="space-y-4">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">
                    Meta Title
                  </label>
                  <input
                    type="text"
                    value={metaTitle}
                    onChange={(e) => setMetaTitle(e.target.value)}
                    placeholder="Enter meta title"
                    className="w-full px-4 py-2.5 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-primary focus:border-primary"
                  />
                  <p className="mt-1 text-xs text-gray-500">
                    Recommended: 25-40 characters
                  </p>
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">
                    Meta Description
                  </label>
                  <textarea
                    value={metaDescription}
                    onChange={(e) => setMetaDescription(e.target.value)}
                    placeholder="Enter meta description for search engines"
                    rows={3}
                    className="w-full px-4 py-2.5 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-primary focus:border-primary resize-y"
                  />
                  <p className="mt-1 text-xs text-gray-500">
                    Recommended: 150-160 characters
                  </p>
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">
                    Meta Keywords
                  </label>
                  <div className="flex gap-2">
                    <input
                      type="text"
                      value={keywordInput}
                      onChange={(e) => setKeywordInput(e.target.value)}
                      onKeyDown={(e) =>
                        e.key === "Enter" && (e.preventDefault(), addKeyword())
                      }
                      placeholder="Enter a keyword"
                      className="flex-1 px-4 py-2.5 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-primary focus:border-primary"
                    />
                    <button
                      type="button"
                      onClick={addKeyword}
                      className="p-2.5 border border-gray-300 rounded-lg text-gray-600 hover:bg-gray-50 transition-colors"
                      title="Add keyword"
                    >
                      <Plus className="h-4 w-4" strokeWidth={2} />
                    </button>
                  </div>
                  <p className="mt-1 text-xs text-gray-500">
                    Press Enter or click + to add a keyword
                  </p>
                  {metaKeywords.length > 0 && (
                    <div className="flex flex-wrap gap-2 mt-2">
                      {metaKeywords.map((k) => (
                        <span
                          key={k}
                          className="inline-flex items-center gap-1 px-2 py-1 bg-gray-100 rounded-md text-sm"
                        >
                          {k}
                          <button
                            type="button"
                            onClick={() => removeKeyword(k)}
                            className="text-gray-500 hover:text-red-600"
                          >
                            ×
                          </button>
                        </span>
                      ))}
                    </div>
                  )}
                </div>
              </div>
            </section>

            {/* FAQ */}
            <section className="bg-white rounded-xl border border-gray-200 p-6 shadow-sm">
              <h2 className="text-lg font-semibold text-gray-900 mb-1">
                Frequently Asked Questions (Optional)
              </h2>
              <p className="text-sm text-gray-500 mb-4">
                Add common questions and answers about this category
              </p>
              {faqItems.map((faq, i) => (
                <div
                  key={i}
                  className="mb-4 p-4 border border-gray-200 rounded-lg space-y-2"
                >
                  <input
                    type="text"
                    value={faq.question}
                    onChange={(e) => updateFaq(i, "question", e.target.value)}
                    placeholder="Question"
                    className="w-full px-3 py-2 border border-gray-300 rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-primary"
                  />
                  <textarea
                    value={faq.answer}
                    onChange={(e) => updateFaq(i, "answer", e.target.value)}
                    placeholder="Answer"
                    rows={2}
                    className="w-full px-3 py-2 border border-gray-300 rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-primary resize-y"
                  />
                </div>
              ))}
              <button
                type="button"
                onClick={addFaq}
                className="inline-flex items-center gap-2 px-4 py-2 text-primary font-medium hover:bg-primary/5 rounded-lg transition-colors"
              >
                <Plus className="h-4 w-4" strokeWidth={2} />
                Add FAQ
              </button>
            </section>
          </div>

          <div className="space-y-6">
            {/* Category Image */}
            <div className="bg-white rounded-xl border border-gray-200 p-6 shadow-sm">
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Category Image
              </label>
              <div className="border-2 border-dashed border-gray-300 rounded-xl p-8 text-center hover:border-primary/50 transition-colors cursor-pointer">
                <Upload
                  className="h-12 w-12 text-gray-400 mx-auto mb-2"
                  strokeWidth={1.5}
                />
                <p className="text-sm font-medium text-gray-600">
                  Drag and drop an image here or click to browse
                </p>
                <p className="text-xs text-gray-500 mt-1">
                  JPEG, PNG, WebP — Max 5MB
                </p>
              </div>
            </div>

            {/* Headline */}
            <div className="bg-white rounded-xl border border-gray-200 p-6 shadow-sm">
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Category Headline
              </label>
              <input
                type="text"
                value={headline}
                onChange={(e) => setHeadline(e.target.value)}
                placeholder="Enter a catchy headline"
                className="w-full px-4 py-2.5 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-primary focus:border-primary"
              />
              <p className="mt-1 text-xs text-gray-500">
                Optional: A short, catchy headline for the category
              </p>
            </div>

            {/* Description */}
            <div className="bg-white rounded-xl border border-gray-200 p-6 shadow-sm">
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Description <span className="text-red-500">*</span>
              </label>
              <div className="border border-gray-300 rounded-lg overflow-hidden">
                <div className="flex flex-wrap items-center gap-1 p-2 bg-gray-50 border-b border-gray-300">
                  <button
                    type="button"
                    className="p-2 rounded hover:bg-gray-200"
                    title="Bold"
                  >
                    <Bold className="h-4 w-4" />
                  </button>
                  <button
                    type="button"
                    className="p-2 rounded hover:bg-gray-200"
                    title="Italic"
                  >
                    <Italic className="h-4 w-4" />
                  </button>
                  <button
                    type="button"
                    className="p-2 rounded hover:bg-gray-200"
                    title="Underline"
                  >
                    <Underline className="h-4 w-4" />
                  </button>
                  <span className="w-px h-5 bg-gray-300" />
                  <button
                    type="button"
                    className="p-2 rounded hover:bg-gray-200"
                    title="Bullet list"
                  >
                    <List className="h-4 w-4" />
                  </button>
                  <button
                    type="button"
                    className="p-2 rounded hover:bg-gray-200"
                    title="Numbered list"
                  >
                    <ListOrdered className="h-4 w-4" />
                  </button>
                  <span className="w-px h-5 bg-gray-300" />
                  <button
                    type="button"
                    className="p-2 rounded hover:bg-gray-200"
                    title="Align left"
                  >
                    <AlignLeft className="h-4 w-4" />
                  </button>
                  <button
                    type="button"
                    className="p-2 rounded hover:bg-gray-200"
                    title="Align center"
                  >
                    <AlignCenter className="h-4 w-4" />
                  </button>
                  <button
                    type="button"
                    className="p-2 rounded hover:bg-gray-200"
                    title="Align right"
                  >
                    <AlignRight className="h-4 w-4" />
                  </button>
                  <button
                    type="button"
                    className="p-2 rounded hover:bg-gray-200"
                    title="Link"
                  >
                    <LinkIcon className="h-4 w-4" />
                  </button>
                  <button
                    type="button"
                    className="p-2 rounded hover:bg-gray-200"
                    title="Refresh"
                  >
                    <RefreshCw className="h-4 w-4" />
                  </button>
                </div>
                <textarea
                  value={description}
                  onChange={(e) => setDescription(e.target.value)}
                  placeholder="Required: Add a detailed description with formatting"
                  rows={6}
                  className="w-full px-4 py-3 border-0 focus:outline-none focus:ring-0 resize-y"
                />
              </div>
            </div>
          </div>
        </div>

        <div className="mt-8 flex justify-end gap-3">
          <button
            type="button"
            className="px-5 py-2.5 border border-gray-300 rounded-lg text-gray-700 font-medium hover:bg-gray-50 transition-colors"
          >
            Reset
          </button>
          <button
            type="button"
            className="px-5 py-2.5 bg-primary text-white rounded-lg font-medium hover:bg-primary/90 transition-colors"
          >
            Create Category
          </button>
        </div>
      </div>
    </div>
  );
}
