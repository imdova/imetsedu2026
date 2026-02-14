"use client";

import { useState, useMemo } from "react";
import Link from "next/link";
import {
  Search,
  Bell,
  Plus,
  FileText,
  ShieldCheck,
  AlertTriangle,
  ChevronDown,
  Calendar,
  SlidersHorizontal,
  Download,
  MoreVertical,
  ChevronLeft,
  ChevronRight,
  Info,
} from "lucide-react";
import {
  certificateSummary,
  certificateCourses,
  mockCertificates,
  getCertificateAvatarColor,
  getInitials,
  type CertificateRecord,
  type CertificateStatus,
} from "@/lib/certificateData";

const PER_PAGE = 5;
const DISPLAY_TOTAL_ENTRIES = certificateSummary.totalIssued;

const statusStyles: Record<CertificateStatus, { dot: string; text: string }> = {
  Active: { dot: "bg-green-500", text: "text-gray-700" },
  Revoked: { dot: "bg-red-500", text: "text-gray-700" },
  Pending: { dot: "bg-amber-500", text: "text-gray-700" },
};

export default function AdminCertificatesPage() {
  const [search, setSearch] = useState("");
  const [courseFilter, setCourseFilter] = useState("All Courses");
  const [dateRangeLabel] = useState("Jan 2024 - Dec 2024");
  const [page, setPage] = useState(1);

  const filtered = useMemo(() => {
    return mockCertificates.filter((c) => {
      const matchSearch =
        !search ||
        c.studentName.toLowerCase().includes(search.toLowerCase()) ||
        c.certificateId.toLowerCase().includes(search.toLowerCase()) ||
        c.course.toLowerCase().includes(search.toLowerCase());
      const matchCourse =
        courseFilter === "All Courses" || c.course === courseFilter;
      return matchSearch && matchCourse;
    });
  }, [search, courseFilter]);

  const totalPages = Math.ceil(filtered.length / PER_PAGE) || 1;
  const paginated = useMemo(
    () => filtered.slice((page - 1) * PER_PAGE, page * PER_PAGE),
    [filtered, page]
  );
  const start = filtered.length === 0 ? 0 : (page - 1) * PER_PAGE + 1;
  const end = Math.min(page * PER_PAGE, filtered.length);
  const displayTotal = DISPLAY_TOTAL_ENTRIES;

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Header */}
      <div className="bg-white border-b border-gray-200 px-6 py-5">
        <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
          <h1 className="text-2xl font-bold text-gray-900">
            Certificate Management
          </h1>
          <div className="flex items-center gap-3">
            <div className="relative flex-1 sm:max-w-xs">
              <Search
                className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-gray-400"
                strokeWidth={2}
              />
              <input
                type="text"
                placeholder="Search certificates..."
                value={search}
                onChange={(e) => setSearch(e.target.value)}
                className="w-full pl-10 pr-4 py-2.5 border border-gray-300 rounded-lg text-gray-900 placeholder-gray-500 focus:outline-none focus:ring-2 focus:ring-primary focus:border-primary"
              />
            </div>
            <button
              type="button"
              className="relative p-2.5 rounded-lg border border-gray-300 text-gray-600 hover:bg-gray-50 transition-colors"
              aria-label="Notifications"
            >
              <Bell className="h-5 w-5" strokeWidth={2} />
              <span className="absolute top-1.5 right-1.5 w-2 h-2 bg-red-500 rounded-full" />
            </button>
            <Link
              href="/admin/certificates/bulk"
              className="inline-flex items-center gap-2 px-4 py-2.5 border border-gray-300 rounded-lg text-gray-700 font-medium hover:bg-gray-50 transition-colors"
            >
              <Download className="h-4 w-4" strokeWidth={2} />
              Bulk Issuance
            </Link>
            <Link
              href="/admin/certificates/design"
              className="inline-flex items-center gap-2 px-4 py-2.5 bg-primary text-white rounded-lg font-semibold hover:bg-primary/90 transition-colors"
            >
              <Plus className="h-4 w-4" strokeWidth={2} />
              Design New Template
            </Link>
          </div>
        </div>
      </div>

      <div className="p-6 lg:p-8">
        {/* Summary cards */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-6">
          <div className="bg-white rounded-xl border border-gray-200 p-5 shadow-sm">
            <div className="flex items-start justify-between">
              <div>
                <p className="text-sm font-medium text-gray-500 mb-1">
                  Total Certificates Issued
                </p>
                <p className="text-2xl font-bold text-gray-900">
                  {certificateSummary.totalIssued.toLocaleString()}
                </p>
                <p className="text-sm text-green-600 font-medium mt-1">
                  +{certificateSummary.totalIssuedChange}%
                </p>
              </div>
              <div className="w-10 h-10 rounded-lg bg-primary/10 flex items-center justify-center">
                <FileText
                  className="h-5 w-5 text-primary"
                  strokeWidth={2}
                />
              </div>
            </div>
          </div>
          <div className="bg-white rounded-xl border border-gray-200 p-5 shadow-sm">
            <div className="flex items-start justify-between">
              <div>
                <p className="text-sm font-medium text-gray-500 mb-1">
                  Verified Credentials
                </p>
                <p className="text-2xl font-bold text-gray-900">
                  {certificateSummary.verified.toLocaleString()}
                </p>
                <p className="text-sm text-green-600 font-medium mt-1">
                  +{certificateSummary.verifiedChange}%
                </p>
              </div>
              <div className="w-10 h-10 rounded-lg bg-green-100 flex items-center justify-center">
                <ShieldCheck
                  className="h-5 w-5 text-green-600"
                  strokeWidth={2}
                />
              </div>
            </div>
          </div>
          <div className="bg-white rounded-xl border border-gray-200 p-5 shadow-sm">
            <div className="flex items-start justify-between">
              <div>
                <p className="text-sm font-medium text-gray-500 mb-1">
                  Pending Approvals
                </p>
                <p className="text-2xl font-bold text-gray-900">
                  {certificateSummary.pendingApprovals}
                </p>
                <p className="text-sm text-red-600 font-medium mt-1">
                  {certificateSummary.pendingChange}%
                </p>
              </div>
              <div className="w-10 h-10 rounded-lg bg-amber-100 flex items-center justify-center">
                <AlertTriangle
                  className="h-5 w-5 text-amber-600"
                  strokeWidth={2}
                />
              </div>
            </div>
          </div>
        </div>

        {/* Filters */}
        <div className="flex flex-wrap items-end gap-4 mb-4">
          <div>
            <label className="block text-xs font-semibold text-gray-500 uppercase tracking-wider mb-1.5">
              Course Name
            </label>
            <div className="relative min-w-[180px]">
              <select
                value={courseFilter}
                onChange={(e) => setCourseFilter(e.target.value)}
                className="w-full pl-4 pr-10 py-2.5 border border-gray-300 rounded-lg text-gray-700 bg-white focus:outline-none focus:ring-2 focus:ring-primary focus:border-primary appearance-none"
              >
                {certificateCourses.map((c) => (
                  <option key={c} value={c}>
                    {c}
                  </option>
                ))}
              </select>
              <ChevronDown
                className="absolute right-3 top-1/2 -translate-y-1/2 h-4 w-4 text-gray-400 pointer-events-none"
                strokeWidth={2}
              />
            </div>
          </div>
          <div>
            <label className="block text-xs font-semibold text-gray-500 uppercase tracking-wider mb-1.5">
              Issue Date Range
            </label>
            <div className="relative min-w-[200px] flex items-center border border-gray-300 rounded-lg bg-white overflow-hidden">
              <Calendar
                className="absolute left-3 h-4 w-4 text-gray-400"
                strokeWidth={2}
              />
              <span className="pl-10 pr-4 py-2.5 text-sm text-gray-700">
                {dateRangeLabel}
              </span>
            </div>
          </div>
          <button
            type="button"
            className="inline-flex items-center gap-2 px-4 py-2.5 bg-white border border-gray-300 rounded-lg text-gray-700 font-medium hover:bg-gray-50 transition-colors"
          >
            <SlidersHorizontal className="h-4 w-4" strokeWidth={2} />
            More Filters
          </button>
          <button
            type="button"
            className="inline-flex items-center gap-2 px-4 py-2.5 bg-white border border-gray-300 rounded-lg text-gray-700 font-medium hover:bg-gray-50 transition-colors"
          >
            <Download className="h-4 w-4" strokeWidth={2} />
            Export
          </button>
        </div>

        {/* Table */}
        <div className="bg-white rounded-xl border border-gray-200 shadow-sm overflow-hidden mb-6">
          <table className="w-full text-left">
            <thead className="bg-gray-50 border-b border-gray-200">
              <tr>
                <th className="px-6 py-3 text-xs font-semibold text-gray-500 uppercase tracking-wider">
                  Certificate ID
                </th>
                <th className="px-6 py-3 text-xs font-semibold text-gray-500 uppercase tracking-wider">
                  Student Name
                </th>
                <th className="px-6 py-3 text-xs font-semibold text-gray-500 uppercase tracking-wider">
                  Course
                </th>
                <th className="px-6 py-3 text-xs font-semibold text-gray-500 uppercase tracking-wider">
                  Issue Date
                </th>
                <th className="px-6 py-3 text-xs font-semibold text-gray-500 uppercase tracking-wider">
                  Status
                </th>
                <th className="px-6 py-3 text-xs font-semibold text-gray-500 uppercase tracking-wider w-20">
                  Actions
                </th>
              </tr>
            </thead>
            <tbody className="divide-y divide-gray-200">
              {paginated.length === 0 ? (
                <tr>
                  <td
                    colSpan={6}
                    className="px-6 py-12 text-center text-gray-500"
                  >
                    No certificates match your filters.
                  </td>
                </tr>
              ) : (
                paginated.map((cert, idx) => (
                  <CertificateRow
                    key={cert.id}
                    cert={cert}
                    avatarColor={getCertificateAvatarColor(
                      (page - 1) * PER_PAGE + idx
                    )}
                  />
                ))
              )}
            </tbody>
          </table>

          {/* Pagination */}
          <div className="flex flex-col sm:flex-row items-center justify-between gap-4 px-6 py-4 border-t border-gray-200 bg-gray-50">
            <p className="text-sm text-gray-600">
              Showing {filtered.length === 0 ? 0 : start} to {end} of{" "}
              {displayTotal.toLocaleString()} entries
            </p>
            <div className="flex items-center gap-1">
              <button
                type="button"
                onClick={() => setPage((p) => Math.max(1, p - 1))}
                disabled={page === 1}
                className="w-9 h-9 rounded-lg border border-gray-300 flex items-center justify-center text-gray-600 hover:bg-white disabled:opacity-50 disabled:cursor-not-allowed transition-colors"
              >
                <ChevronLeft className="h-4 w-4" strokeWidth={2} />
              </button>
              {totalPages <= 7 ? (
                Array.from({ length: totalPages }, (_, i) => i + 1).map((p) => (
                  <button
                    key={p}
                    type="button"
                    onClick={() => setPage(p)}
                    className={`w-9 h-9 rounded-lg flex items-center justify-center text-sm font-medium transition-colors ${
                      page === p
                        ? "bg-primary text-white border border-primary"
                        : "border border-gray-300 text-gray-700 hover:bg-white"
                    }`}
                  >
                    {p}
                  </button>
                ))
              ) : (
                <>
                  <button
                    type="button"
                    onClick={() => setPage(1)}
                    className={`w-9 h-9 rounded-lg flex items-center justify-center text-sm font-medium transition-colors ${
                      page === 1
                        ? "bg-primary text-white border border-primary"
                        : "border border-gray-300 text-gray-700 hover:bg-white"
                    }`}
                  >
                    1
                  </button>
                  {page > 3 && (
                    <span className="w-9 h-9 flex items-center justify-center text-gray-400">
                      ...
                    </span>
                  )}
                  {[page - 1, page, page + 1]
                    .filter((p) => p > 1 && p < totalPages)
                    .map((p) => (
                      <button
                        key={p}
                        type="button"
                        onClick={() => setPage(p)}
                        className={`w-9 h-9 rounded-lg flex items-center justify-center text-sm font-medium transition-colors ${
                          page === p
                            ? "bg-primary text-white border border-primary"
                            : "border border-gray-300 text-gray-700 hover:bg-white"
                        }`}
                      >
                        {p}
                      </button>
                    ))}
                  {page < totalPages - 2 && (
                    <span className="w-9 h-9 flex items-center justify-center text-gray-400">
                      ...
                    </span>
                  )}
                  <button
                    type="button"
                    onClick={() => setPage(totalPages)}
                    className={`w-9 h-9 rounded-lg flex items-center justify-center text-sm font-medium transition-colors ${
                      page === totalPages
                        ? "bg-primary text-white border border-primary"
                        : "border border-gray-300 text-gray-700 hover:bg-white"
                    }`}
                  >
                    {totalPages}
                  </button>
                </>
              )}
              <button
                type="button"
                onClick={() => setPage((p) => Math.min(totalPages, p + 1))}
                disabled={page === totalPages}
                className="w-9 h-9 rounded-lg border border-gray-300 flex items-center justify-center text-gray-600 hover:bg-white disabled:opacity-50 disabled:cursor-not-allowed transition-colors"
              >
                <ChevronRight className="h-4 w-4" strokeWidth={2} />
              </button>
            </div>
          </div>
        </div>

        {/* Bottom info sections */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-4">
          <div className="lg:col-span-2 rounded-xl bg-primary/5 border border-primary/20 p-4">
            <div className="flex gap-3">
              <div className="w-8 h-8 rounded-lg bg-primary/10 flex items-center justify-center shrink-0">
                <Info className="h-4 w-4 text-primary" strokeWidth={2} />
              </div>
              <div>
                <h3 className="font-semibold text-gray-900 mb-1">
                  Bulk Management Note
                </h3>
                <p className="text-sm text-gray-600">
                  You can revoke multiple certificates at once by selecting the
                  rows and using the bulk actions menu.
                </p>
              </div>
            </div>
          </div>
          <div className="rounded-xl bg-white border border-gray-200 p-4 shadow-sm">
            <h3 className="font-semibold text-gray-900 mb-2">System Status</h3>
            <div className="flex items-center gap-2">
              <span className="w-2 h-2 rounded-full bg-green-500" />
              <span className="text-sm font-medium text-gray-700">Optimal</span>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

function CertificateRow({
  cert,
  avatarColor,
}: {
  cert: CertificateRecord;
  avatarColor: string;
}) {
  const style = statusStyles[cert.status];
  return (
    <tr className="hover:bg-gray-50/50 transition-colors">
      <td className="px-6 py-4">
        <button
          type="button"
          className="text-primary font-medium hover:underline focus:outline-none focus:ring-2 focus:ring-primary focus:ring-offset-1 rounded"
        >
          #{cert.certificateId}
        </button>
      </td>
      <td className="px-6 py-4">
        <div className="flex items-center gap-3">
          <div
            className={`w-9 h-9 rounded-full flex items-center justify-center text-sm font-semibold text-white ${avatarColor}`}
          >
            {getInitials(cert.studentName)}
          </div>
          <span className="font-medium text-gray-900">{cert.studentName}</span>
        </div>
      </td>
      <td className="px-6 py-4 text-sm text-gray-700">{cert.course}</td>
      <td className="px-6 py-4 text-sm text-gray-600">{cert.issueDate}</td>
      <td className="px-6 py-4">
        <div className="flex items-center gap-2">
          <span className={`w-2 h-2 rounded-full shrink-0 ${style.dot}`} />
          <span className={style.text}>{cert.status}</span>
        </div>
      </td>
      <td className="px-6 py-4">
        <button
          type="button"
          className="p-2 rounded-lg text-gray-500 hover:bg-gray-100 hover:text-gray-700 transition-colors"
          aria-label="Actions"
        >
          <MoreVertical className="h-4 w-4" strokeWidth={2} />
        </button>
      </td>
    </tr>
  );
}
