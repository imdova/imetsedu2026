"use client";

import { useState, useCallback } from "react";
import Link from "next/link";
import { Video, Phone, MoreVertical } from "lucide-react";

const MAX_CHARS = 1024;
const CATEGORIES = [
  "Payment Receipt",
  "Enrollment Confirmation",
  "Course Reminder",
  "Certificate Ready",
] as const;

const VARIABLES = [
  { key: "{{student_name}}", label: "{{student_name}}" },
  { key: "{{amount_paid}}", label: "{{amount_paid}}" },
  { key: "{{installment_no}}", label: "{{installment_no}}" },
  { key: "{{course_name}}", label: "{{course_name}}" },
  { key: "{{date}}", label: "{{date}}" },
] as const;

const DEFAULT_BODY = `Hello {{student_name}},
We have successfully received your payment of {{amount_paid}} for
{{installment_no}}.
Thank you for choosing IMETS school of business! Your receipt is attached below.
Best regards,
IMETS Team`;

const PREVIEW_VALUES: Record<string, string> = {
  "{{student_name}}": "Jamie Smith",
  "{{amount_paid}}": "$450.00",
  "{{installment_no}}": "Installment 2 of 3",
  "{{course_name}}": "Data Science Certification",
  "{{date}}": "Oct 24, 2023",
};

function interpolate(template: string, values: Record<string, string>) {
  let out = template;
  for (const [k, v] of Object.entries(values)) {
    out = out.split(k).join(v);
  }
  return out;
}

export default function EditWhatsAppTemplatePage() {
  const [templateName, setTemplateName] = useState(
    "Payment Receipt Notification"
  );
  const [category, setCategory] = useState<string>(CATEGORIES[0]);
  const [messageBody, setMessageBody] = useState(DEFAULT_BODY);
  const [bold, setBold] = useState(false);
  const [italic, setItalic] = useState(false);
  const [strikethrough, setStrikethrough] = useState(false);

  const charCount = messageBody.length;

  const insertVariable = useCallback((variable: string) => {
    setMessageBody((prev) => prev + variable);
  }, []);

  const previewText = interpolate(messageBody, PREVIEW_VALUES);
  const highlightValues = Object.values(PREVIEW_VALUES);
  const previewParts = previewText.split(
    new RegExp(
      `(${highlightValues
        .map((v) => v.replace(/[.*+?^${}()|[\]\\]/g, "\\$&"))
        .join("|")})`,
      "g"
    )
  );

  return (
    <div className="min-h-screen bg-white">
      {/* Breadcrumbs + Actions */}
      <div className="border-b border-gray-200 bg-white px-6 lg:px-8 py-4">
        <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
          <nav className="text-sm text-gray-500">
            <Link href="/admin/settings" className="hover:text-primary">
              Settings
            </Link>
            <span className="mx-1.5">/</span>
            <Link
              href="/admin/settings/whatsapp-templates"
              className="hover:text-primary"
            >
              WhatsApp Templates
            </Link>
            <span className="mx-1.5">/</span>
            <span className="text-gray-900 font-medium">Edit Template</span>
          </nav>
          <div className="flex items-center gap-3">
            <button
              type="button"
              className="px-4 py-2.5 border border-gray-300 rounded-lg text-primary font-semibold hover:bg-gray-50 transition-colors"
            >
              Send Test Message
            </button>
            <button
              type="button"
              className="inline-flex items-center gap-2 px-4 py-2.5 bg-primary text-white rounded-lg font-semibold hover:bg-primary/90 transition-colors"
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
                  d="M8 7H5a2 2 0 00-2 2v9a2 2 0 002 2h14a2 2 0 002-2V9a2 2 0 00-2-2h-3m-1 4l-3 3m0 0l-3-3m3 3V4"
                />
              </svg>
              Save Template
            </button>
          </div>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-0 min-h-[calc(100vh-140px)]">
        {/* Left: Edit Template Form */}
        <div className="p-6 lg:p-8 border-r border-gray-200 overflow-y-auto">
          <h1 className="text-2xl font-bold text-gray-900">Edit Template</h1>
          <p className="text-gray-500 mt-1 mb-8">
            Configure your automated WhatsApp notification message.
          </p>

          <div className="space-y-6">
            <div>
              <label className="block text-xs font-semibold text-gray-500 uppercase tracking-wider mb-2">
                Template Name
              </label>
              <input
                type="text"
                value={templateName}
                onChange={(e) => setTemplateName(e.target.value)}
                className="w-full px-4 py-2.5 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-primary focus:border-primary"
                placeholder="e.g. Payment Receipt Notification"
              />
            </div>

            <div>
              <label className="block text-xs font-semibold text-gray-500 uppercase tracking-wider mb-2">
                Category
              </label>
              <div className="relative">
                <select
                  value={category}
                  onChange={(e) => setCategory(e.target.value)}
                  className="w-full px-4 py-2.5 border border-gray-300 rounded-lg appearance-none focus:outline-none focus:ring-2 focus:ring-primary focus:border-primary pr-10 bg-white"
                >
                  {CATEGORIES.map((c) => (
                    <option key={c} value={c}>
                      {c}
                    </option>
                  ))}
                </select>
                <span className="absolute right-3 top-1/2 -translate-y-1/2 pointer-events-none text-gray-400">
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
                      d="M19 9l-7 7-7-7"
                    />
                  </svg>
                </span>
              </div>
            </div>

            <div>
              <div className="flex items-center justify-between mb-2">
                <label className="block text-xs font-semibold text-gray-500 uppercase tracking-wider">
                  Message Body
                </label>
                <span className="text-sm text-gray-400">
                  {charCount}/{MAX_CHARS} characters
                </span>
              </div>
              <div className="border border-gray-300 rounded-lg overflow-hidden">
                {/* Rich text toolbar */}
                <div className="flex items-center gap-1 px-3 py-2 bg-gray-50 border-b border-gray-300">
                  <button
                    type="button"
                    onClick={() => setBold(!bold)}
                    className={`p-2 rounded ${
                      bold ? "bg-gray-200" : "hover:bg-gray-200"
                    }`}
                    title="Bold"
                  >
                    <span className="font-bold text-sm">B</span>
                  </button>
                  <button
                    type="button"
                    onClick={() => setItalic(!italic)}
                    className={`p-2 rounded ${
                      italic ? "bg-gray-200" : "hover:bg-gray-200"
                    }`}
                    title="Italic"
                  >
                    <span className="italic text-sm">I</span>
                  </button>
                  <button
                    type="button"
                    onClick={() => setStrikethrough(!strikethrough)}
                    className={`p-2 rounded ${
                      strikethrough ? "bg-gray-200" : "hover:bg-gray-200"
                    }`}
                    title="Strikethrough"
                  >
                    <span className="text-sm line-through">S</span>
                  </button>
                  <button
                    type="button"
                    className="p-2 rounded hover:bg-gray-200"
                    title="Emoji"
                  >
                    <span className="text-lg">😊</span>
                  </button>
                </div>
                <textarea
                  value={messageBody}
                  onChange={(e) =>
                    setMessageBody(e.target.value.slice(0, MAX_CHARS))
                  }
                  rows={10}
                  className="w-full px-4 py-3 resize-y focus:outline-none focus:ring-0 border-0"
                  placeholder="Enter your message..."
                />
              </div>
            </div>

            <div>
              <label className="block text-xs font-semibold text-gray-500 uppercase tracking-wider mb-2">
                Variable Picker
              </label>
              <div className="flex flex-wrap gap-2">
                {VARIABLES.map((v) => (
                  <button
                    key={v.key}
                    type="button"
                    onClick={() => insertVariable(v.key)}
                    className="px-3 py-1.5 rounded-lg bg-gray-100 border border-gray-200 text-gray-700 text-sm font-medium hover:bg-gray-200 hover:border-gray-300 transition-colors"
                  >
                    {v.label}
                  </button>
                ))}
              </div>
            </div>
          </div>
        </div>

        {/* Right: Live Preview */}
        <div className="bg-gray-100 flex flex-col items-center justify-center p-8 lg:p-12">
          <div className="relative">
            {/* Phone mockup */}
            <div className="w-[280px] rounded-[2.5rem] bg-gray-900 p-2 shadow-2xl">
              <div className="rounded-[2rem] overflow-hidden bg-white">
                {/* Status bar */}
                <div className="h-6 bg-gray-900 flex items-center justify-between px-6 text-white text-xs">
                  <span>9:41</span>
                  <div className="flex items-center gap-1">
                    <span>📶</span>
                    <span>📡</span>
                    <span>🔋</span>
                  </div>
                </div>
                {/* WhatsApp chat */}
                <div
                  className="bg-[#e5ddd5]"
                  style={{
                    backgroundImage:
                      "url(\"data:image/svg+xml,%3Csvg width='60' height='60' xmlns='http://www.w3.org/2000/svg'%3E%3Cpath d='M30 0L30 60M0 30L60 30' stroke='%23d4c4b0' stroke-width='0.5' fill='none'/%3E%3C/svg%3E\")",
                  }}
                >
                  {/* Chat header */}
                  <div className="bg-[#075e54] flex items-center gap-2 px-3 py-2">
                    <span className="text-white">←</span>
                    <div className="w-8 h-8 rounded-full bg-[#e8f4f2] flex items-center justify-center">
                      <span className="text-primary font-bold text-xs">
                        I
                      </span>
                    </div>
                    <div className="flex-1 min-w-0">
                      <p className="font-semibold text-white text-sm truncate">
                        IMETS school of business
                      </p>
                      <p className="text-[#a8d4ce] text-xs">online</p>
                    </div>
                    <Video
                      className="h-5 w-5 text-white shrink-0"
                      strokeWidth={2}
                    />
                    <Phone
                      className="h-5 w-5 text-white shrink-0"
                      strokeWidth={2}
                    />
                    <MoreVertical
                      className="h-5 w-5 text-white shrink-0"
                      strokeWidth={2}
                    />
                  </div>
                  {/* Messages */}
                  <div className="px-3 py-4 min-h-[320px]">
                    <div className="flex justify-start">
                      <div className="max-w-[85%] rounded-lg rounded-tl-none shadow-sm overflow-hidden">
                        <div className="bg-[#fff9e6] px-3 py-2">
                          <p className="text-gray-900 text-sm whitespace-pre-wrap leading-relaxed">
                            {previewParts.map((part, i) =>
                              highlightValues.includes(part) ? (
                                <span
                                  key={i}
                                  className="text-primary font-semibold"
                                >
                                  {part}
                                </span>
                              ) : (
                                <span key={i}>{part}</span>
                              )
                            )}
                          </p>
                          <div className="flex justify-end items-center gap-1 mt-1">
                            <span className="text-xs text-gray-400">09:41</span>
                            <span className="text-[#53bdeb]">✓✓</span>
                          </div>
                        </div>
                        {/* Receipt attachment */}
                        <div className="bg-white border-t border-gray-100 px-3 py-2 flex items-center gap-2">
                          <div className="w-10 h-10 rounded bg-gray-100 flex items-center justify-center text-gray-500">
                            <svg
                              className="w-5 h-5"
                              fill="none"
                              stroke="currentColor"
                              viewBox="0 0 24 24"
                            >
                              <path
                                strokeLinecap="round"
                                strokeLinejoin="round"
                                strokeWidth={2}
                                d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z"
                              />
                            </svg>
                          </div>
                          <div className="flex-1 min-w-0">
                            <p className="text-sm font-medium text-gray-900 truncate">
                              Receipt_#IMETS-89241...
                            </p>
                            <p className="text-xs text-gray-500">
                              1.2 MB • PDF
                            </p>
                          </div>
                          <span className="text-gray-400">⬇</span>
                        </div>
                      </div>
                    </div>
                  </div>
                  {/* Input bar */}
                  <div className="bg-gray-100 flex items-center gap-2 px-2 py-2 border-t border-gray-200">
                    <span className="text-gray-400">😊</span>
                    <input
                      type="text"
                      readOnly
                      placeholder="Message"
                      className="flex-1 bg-white border border-gray-200 rounded-full px-4 py-2 text-sm text-gray-400"
                    />
                    <span className="text-gray-500">📷</span>
                    <span className="text-gray-500">📎</span>
                    <span className="text-gray-500">🎤</span>
                  </div>
                </div>
              </div>
            </div>
            {/* Live preview label */}
            <div className="flex justify-center mt-4 items-center gap-2">
              <span className="w-2 h-2 rounded-full bg-green-500" />
              <span className="text-sm text-gray-500 font-medium">
                LIVE PREVIEW
              </span>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
