"use client";

import { useState, useMemo } from "react";
import Link from "next/link";
import {
  Download,
  Mail,
  Users,
  Clock,
  Eye,
  SlidersHorizontal,
  ChevronDown,
  Calendar,
  RefreshCw,
  FileText,
  ArrowLeft,
  Check,
} from "lucide-react";
import {
  bulkIssuanceCourses,
  bulkIssuanceStatusOptions,
  bulkIssuanceStudents,
  issuanceHistoryBatches,
  getInitials,
  getCertificateAvatarColor,
  type BulkIssuanceStudent,
  type IssuanceStudentStatus,
} from "@/lib/certificateData";

const PER_PAGE = 5;
const TOTAL_STUDENTS = 124;
const ELIGIBLE_COUNT = 42;

const statusDot: Record<IssuanceStudentStatus, string> = {
  Ready: "bg-green-500",
  "Review Required": "bg-amber-500",
  Pending: "bg-gray-400",
};

function scoreBadgeClass(score: number) {
  if (score >= 80) return "bg-green-100 text-green-800";
  if (score >= 60) return "bg-amber-100 text-amber-800";
  return "bg-red-100 text-red-800";
}

export default function BulkCertificateIssuancePage() {
  const [tab, setTab] = useState<"active" | "history">("active");
  const [course, setCourse] = useState(bulkIssuanceCourses[0]);
  const [statusFilter, setStatusFilter] = useState(
    bulkIssuanceStatusOptions[0]
  );
  const [selectedIds, setSelectedIds] = useState<Set<string>>(new Set());
  const [previewStudent, setPreviewStudent] =
    useState<BulkIssuanceStudent | null>(bulkIssuanceStudents[0]);
  const [page, setPage] = useState(1);

  const filteredStudents = useMemo(() => {
    return bulkIssuanceStudents.filter((s) => {
      if (statusFilter === "Ready to Issue") return s.status === "Ready";
      if (statusFilter === "Review Required")
        return s.status === "Review Required";
      return true;
    });
  }, [statusFilter]);

  const paginated = useMemo(
    () => filteredStudents.slice((page - 1) * PER_PAGE, page * PER_PAGE),
    [filteredStudents, page]
  );
  const totalPages = Math.ceil(filteredStudents.length / PER_PAGE) || 1;
  const selectedReadyCount = Array.from(selectedIds).filter((id) => {
    const s = bulkIssuanceStudents.find((x) => x.id === id);
    return s?.status === "Ready";
  }).length;

  const toggleSelect = (id: string) => {
    setSelectedIds((prev) => {
      const next = new Set(prev);
      if (next.has(id)) next.delete(id);
      else next.add(id);
      return next;
    });
  };

  const toggleSelectAll = () => {
    if (selectedIds.size === paginated.length) setSelectedIds(new Set());
    else setSelectedIds(new Set(paginated.map((s) => s.id)));
  };

  return (
    <div className="min-h-screen bg-gray-50">
      <div className="bg-white border-b border-gray-200 px-6 py-5">
        <div className="flex flex-col lg:flex-row lg:items-start lg:justify-between gap-4">
          <div className="flex items-center gap-3 min-w-0">
            <Link
              href="/admin/certificates"
              className="p-2 rounded-lg text-gray-500 hover:bg-gray-100 hover:text-gray-700 transition-colors shrink-0"
              aria-label="Back to certificates"
            >
              <ArrowLeft className="h-5 w-5" strokeWidth={2} />
            </Link>
            <div>
              <h1 className="text-2xl font-bold text-gray-900">
                Bulk Certificate Issuance Hub
              </h1>
              <p className="text-sm text-gray-600 mt-1 max-w-2xl">
                Efficiently manage, generate, and dispatch professional
                certifications for students who have completed IMETS coursework.
              </p>
            </div>
          </div>
          <div className="flex items-center gap-2 shrink-0">
            <button
              type="button"
              className="inline-flex items-center gap-2 px-4 py-2.5 border border-gray-300 rounded-lg text-gray-700 font-medium hover:bg-gray-50 transition-colors"
            >
              <Download className="h-4 w-4" strokeWidth={2} />
              Export CSV
            </button>
            <button
              type="button"
              className="inline-flex items-center gap-2 px-4 py-2.5 bg-primary text-white rounded-lg font-semibold hover:bg-primary/90 transition-colors"
            >
              <Mail className="h-4 w-4" strokeWidth={2} />
              Generate & Email Certificates
            </button>
          </div>
        </div>

        {/* Tabs */}
        <div className="flex gap-1 mt-6 border-b border-gray-200">
          <button
            type="button"
            onClick={() => setTab("active")}
            className={`flex items-center gap-2 px-4 py-3 text-sm font-medium border-b-2 transition-colors ${
              tab === "active"
                ? "border-primary text-primary"
                : "border-transparent text-gray-500 hover:text-gray-700"
            }`}
          >
            <Users className="h-4 w-4" strokeWidth={2} />
            Active Issuance
          </button>
          <button
            type="button"
            onClick={() => setTab("history")}
            className={`flex items-center gap-2 px-4 py-3 text-sm font-medium border-b-2 transition-colors ${
              tab === "history"
                ? "border-primary text-primary"
                : "border-transparent text-gray-500 hover:text-gray-700"
            }`}
          >
            <Clock className="h-4 w-4" strokeWidth={2} />
            Issuance History
          </button>
        </div>
      </div>

      <div className="p-6 lg:p-8">
        {tab === "active" && (
          <div className="grid grid-cols-1 xl:grid-cols-3 gap-6">
            {/* Left: filters + table */}
            <div className="xl:col-span-2 space-y-4">
              <div className="flex flex-wrap items-end gap-3">
                <div>
                  <label className="block text-xs font-semibold text-gray-500 uppercase tracking-wider mb-1.5">
                    Course Selection
                  </label>
                  <div className="relative min-w-[240px]">
                    <select
                      value={course}
                      onChange={(e) => setCourse(e.target.value)}
                      className="w-full pl-4 pr-10 py-2.5 border border-gray-300 rounded-lg text-gray-700 bg-white focus:outline-none focus:ring-2 focus:ring-primary focus:border-primary appearance-none"
                    >
                      {bulkIssuanceCourses.map((c) => (
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
                    Status
                  </label>
                  <div className="relative min-w-[160px]">
                    <select
                      value={statusFilter}
                      onChange={(e) => setStatusFilter(e.target.value)}
                      className="w-full pl-4 pr-10 py-2.5 border border-gray-300 rounded-lg text-gray-700 bg-white focus:outline-none focus:ring-2 focus:ring-primary focus:border-primary appearance-none"
                    >
                      {bulkIssuanceStatusOptions.map((s) => (
                        <option key={s} value={s}>
                          {s}
                        </option>
                      ))}
                    </select>
                    <ChevronDown
                      className="absolute right-3 top-1/2 -translate-y-1/2 h-4 w-4 text-gray-400 pointer-events-none"
                      strokeWidth={2}
                    />
                  </div>
                </div>
                <button
                  type="button"
                  className="p-2.5 border border-gray-300 rounded-lg text-gray-600 hover:bg-gray-50 transition-colors"
                  aria-label="More filters"
                >
                  <SlidersHorizontal className="h-4 w-4" strokeWidth={2} />
                </button>
              </div>

              <div className="bg-white rounded-xl border border-gray-200 shadow-sm overflow-hidden">
                <table className="w-full text-left">
                  <thead className="bg-gray-50 border-b border-gray-200">
                    <tr>
                      <th className="px-4 py-3 w-10">
                        <input
                          type="checkbox"
                          checked={
                            paginated.length > 0 &&
                            selectedIds.size === paginated.length
                          }
                          onChange={toggleSelectAll}
                          className="rounded border-gray-300 text-primary focus:ring-primary"
                        />
                      </th>
                      <th className="px-4 py-3 text-xs font-semibold text-gray-500 uppercase tracking-wider">
                        Student Name
                      </th>
                      <th className="px-4 py-3 text-xs font-semibold text-gray-500 uppercase tracking-wider">
                        Email Address
                      </th>
                      <th className="px-4 py-3 text-xs font-semibold text-gray-500 uppercase tracking-wider w-20">
                        Score
                      </th>
                      <th className="px-4 py-3 text-xs font-semibold text-gray-500 uppercase tracking-wider">
                        Completion Date
                      </th>
                      <th className="px-4 py-3 text-xs font-semibold text-gray-500 uppercase tracking-wider w-32">
                        Status
                      </th>
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-gray-200">
                    {paginated.map((student, idx) => (
                      <tr
                        key={student.id}
                        className="hover:bg-gray-50/50"
                        onClick={() => setPreviewStudent(student)}
                      >
                        <td
                          className="px-4 py-3"
                          onClick={(e) => e.stopPropagation()}
                        >
                          <input
                            type="checkbox"
                            checked={selectedIds.has(student.id)}
                            onChange={() => toggleSelect(student.id)}
                            className="rounded border-gray-300 text-primary focus:ring-primary"
                          />
                        </td>
                        <td className="px-4 py-3">
                          <div className="flex items-center gap-3">
                            <div
                              className={`w-9 h-9 rounded-full flex items-center justify-center text-sm font-semibold text-white ${getCertificateAvatarColor(
                                idx
                              )}`}
                            >
                              {getInitials(student.name)}
                            </div>
                            <span className="font-medium text-gray-900">
                              {student.name}
                            </span>
                          </div>
                        </td>
                        <td className="px-4 py-3 text-sm text-gray-600">
                          {student.email}
                        </td>
                        <td className="px-4 py-3">
                          <span
                            className={`inline-flex px-2 py-0.5 rounded text-xs font-semibold ${scoreBadgeClass(
                              student.score
                            )}`}
                          >
                            {student.score}%
                          </span>
                        </td>
                        <td className="px-4 py-3 text-sm text-gray-600">
                          {student.completionDate}
                        </td>
                        <td className="px-4 py-3">
                          <div className="flex items-center gap-2">
                            <span
                              className={`w-2 h-2 rounded-full ${
                                statusDot[student.status]
                              }`}
                            />
                            <span className="text-sm text-gray-700">
                              {student.status}
                            </span>
                          </div>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
                <div className="flex items-center justify-between px-4 py-3 border-t border-gray-200 bg-gray-50 text-sm text-gray-600">
                  <span>
                    Showing {(page - 1) * PER_PAGE + 1} to{" "}
                    {Math.min(page * PER_PAGE, filteredStudents.length)} of{" "}
                    {TOTAL_STUDENTS} students ({ELIGIBLE_COUNT} eligible for
                    issuance).
                  </span>
                  <div className="flex items-center gap-2">
                    <button
                      type="button"
                      onClick={() => setPage((p) => Math.max(1, p - 1))}
                      disabled={page === 1}
                      className="px-3 py-1.5 rounded border border-gray-300 text-gray-700 hover:bg-white disabled:opacity-50 disabled:cursor-not-allowed"
                    >
                      Prev
                    </button>
                    <button
                      type="button"
                      onClick={() =>
                        setPage((p) => Math.min(totalPages, p + 1))
                      }
                      disabled={page === totalPages}
                      className="px-3 py-1.5 rounded border border-gray-300 text-gray-700 hover:bg-white disabled:opacity-50 disabled:cursor-not-allowed"
                    >
                      Next
                    </button>
                  </div>
                </div>
              </div>
            </div>

            {/* Right: Live Preview + Last Batch Status */}
            <div className="space-y-4">
              <div className="bg-white rounded-xl border border-gray-200 shadow-sm overflow-hidden">
                <div className="flex items-center gap-2 px-4 py-3 border-b border-gray-200">
                  <Eye className="h-4 w-4 text-gray-500" strokeWidth={2} />
                  <span className="font-semibold text-gray-900">
                    Live Preview
                  </span>
                  {previewStudent && (
                    <span className="ml-auto text-xs font-medium text-gray-500 uppercase tracking-wide">
                      {previewStudent.name.toUpperCase()}
                    </span>
                  )}
                </div>
                <div className="p-4">
                  <div className="border-2 border-dashed border-primary/30 rounded-lg bg-white p-6 text-center aspect-[842/595] max-h-[320px] flex flex-col items-center justify-center">
                    <p className="text-xs font-semibold text-gray-500 uppercase tracking-wider mb-1">
                      Certificate of Completion
                    </p>
                    <p className="text-xs text-gray-500 mb-3">
                      This is to certify that
                    </p>
                    <p className="text-xl font-bold text-gray-900 mb-2">
                      {previewStudent?.name ?? "—"}
                    </p>
                    <p className="text-xs text-gray-600 mb-2">
                      Has successfully completed the requirements for
                    </p>
                    <p className="text-sm font-bold text-primary">
                      {course}
                    </p>
                    <div className="mt-4 w-12 h-12 rounded bg-gray-200/80 flex items-center justify-center opacity-60">
                      <FileText
                        className="h-6 w-6 text-gray-500"
                        strokeWidth={1.5}
                      />
                    </div>
                  </div>
                </div>
              </div>

              <div className="bg-white rounded-xl border border-gray-200 shadow-sm overflow-hidden">
                <div className="flex items-center gap-2 px-4 py-3 border-b border-gray-200">
                  <RefreshCw
                    className="h-4 w-4 text-gray-500"
                    strokeWidth={2}
                  />
                  <span className="font-semibold text-gray-900">
                    Last Batch Status
                  </span>
                </div>
                <div className="p-4 space-y-4">
                  <span className="inline-flex px-2.5 py-1 rounded text-xs font-semibold bg-amber-100 text-amber-800">
                    Processing
                  </span>
                  <div>
                    <div className="flex justify-between text-sm text-gray-600 mb-1">
                      <span>Generating PDFs...</span>
                      <span>68%</span>
                    </div>
                    <div className="h-2 bg-gray-200 rounded-full overflow-hidden">
                      <div
                        className="h-full bg-primary rounded-full transition-all"
                        style={{ width: "68%" }}
                      />
                    </div>
                  </div>
                  <div className="flex flex-wrap gap-4 text-sm">
                    <span className="text-green-600 font-medium">
                      Success: 82
                    </span>
                    <span className="text-amber-600 font-medium">
                      Pending: 38
                    </span>
                    <span className="text-red-600 font-medium">Failed: 4</span>
                  </div>
                </div>
              </div>
            </div>
          </div>
        )}

        {tab === "history" && (
          <div className="bg-white rounded-xl border border-gray-200 shadow-sm overflow-hidden">
            <div className="px-4 py-3 border-b border-gray-200 flex items-center gap-2">
              <Calendar className="h-4 w-4 text-gray-500" strokeWidth={2} />
              <span className="font-semibold text-gray-900">
                Issuance History Log
              </span>
            </div>
            <div className="overflow-x-auto">
              <table className="w-full text-left">
                <thead className="bg-gray-50 border-b border-gray-200">
                  <tr>
                    <th className="px-4 py-3 text-xs font-semibold text-gray-500 uppercase tracking-wider">
                      Batch ID
                    </th>
                    <th className="px-4 py-3 text-xs font-semibold text-gray-500 uppercase tracking-wider">
                      Course Name
                    </th>
                    <th className="px-4 py-3 text-xs font-semibold text-gray-500 uppercase tracking-wider">
                      Date / Count
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
                  {issuanceHistoryBatches.map((batch) => (
                    <tr key={batch.id} className="hover:bg-gray-50/50">
                      <td className="px-4 py-3 font-medium text-gray-900">
                        #{batch.batchId}
                      </td>
                      <td className="px-4 py-3 text-sm text-gray-700">
                        {batch.courseName}
                      </td>
                      <td className="px-4 py-3 text-sm text-gray-600">
                        {batch.dateTime} · {batch.count}
                      </td>
                      <td className="px-4 py-3">
                        <span
                          className={`inline-flex px-2.5 py-0.5 rounded text-xs font-semibold ${
                            batch.status === "SUCCESS"
                              ? "bg-green-100 text-green-800"
                              : "bg-red-100 text-red-800"
                          }`}
                        >
                          {batch.status === "SUCCESS"
                            ? "SUCCESS"
                            : `FAILED${
                                batch.failedCount
                                  ? ` (${batch.failedCount})`
                                  : ""
                              }`}
                        </span>
                      </td>
                      <td className="px-4 py-3">
                        {batch.status === "SUCCESS" ? (
                          <button
                            type="button"
                            className="text-sm font-medium text-primary hover:underline"
                          >
                            Download Log
                          </button>
                        ) : (
                          <button
                            type="button"
                            className="text-sm font-medium text-primary hover:underline"
                          >
                            View Errors
                          </button>
                        )}
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        )}

        {/* Floating action bar when students selected (Active Issuance) */}
        {tab === "active" && selectedIds.size > 0 && (
          <div className="fixed bottom-6 left-1/2 -translate-x-1/2 z-10 flex items-center gap-4 px-6 py-3 bg-gray-800 text-white rounded-xl shadow-lg">
            <Check className="h-5 w-5 text-green-400" strokeWidth={2} />
            <span className="font-medium">
              {selectedIds.size} Student{selectedIds.size !== 1 ? "s" : ""}{" "}
              Selected {selectedReadyCount > 0 && "READY FOR ISSUANCE."}
            </span>
            <button
              type="button"
              onClick={() => setSelectedIds(new Set())}
              className="text-sm text-gray-300 hover:text-white underline"
            >
              Clear
            </button>
            <button
              type="button"
              className="px-4 py-2 bg-primary text-white rounded-lg font-semibold hover:bg-primary/90 transition-colors"
            >
              Process Batch
            </button>
          </div>
        )}

        {/* Issuance History Log section when on Active tab (bottom panel) */}
        {tab === "active" && (
          <div className="mt-8">
            <div className="flex items-center gap-2 mb-3">
              <Calendar className="h-4 w-4 text-gray-500" strokeWidth={2} />
              <span className="font-semibold text-gray-900">
                Issuance History Log
              </span>
            </div>
            <div className="bg-white rounded-xl border border-gray-200 shadow-sm overflow-hidden">
              <table className="w-full text-left">
                <thead className="bg-gray-50 border-b border-gray-200">
                  <tr>
                    <th className="px-4 py-3 text-xs font-semibold text-gray-500 uppercase tracking-wider">
                      Batch ID
                    </th>
                    <th className="px-4 py-3 text-xs font-semibold text-gray-500 uppercase tracking-wider">
                      Course Name
                    </th>
                    <th className="px-4 py-3 text-xs font-semibold text-gray-500 uppercase tracking-wider">
                      Date / Count
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
                  {issuanceHistoryBatches.map((batch) => (
                    <tr key={batch.id} className="hover:bg-gray-50/50">
                      <td className="px-4 py-3 font-medium text-gray-900">
                        #{batch.batchId}
                      </td>
                      <td className="px-4 py-3 text-sm text-gray-700">
                        {batch.courseName}
                      </td>
                      <td className="px-4 py-3 text-sm text-gray-600">
                        {batch.dateTime} · {batch.count}
                      </td>
                      <td className="px-4 py-3">
                        <span
                          className={`inline-flex px-2.5 py-0.5 rounded text-xs font-semibold ${
                            batch.status === "SUCCESS"
                              ? "bg-green-100 text-green-800"
                              : "bg-red-100 text-red-800"
                          }`}
                        >
                          {batch.status === "SUCCESS"
                            ? "SUCCESS"
                            : `FAILED${
                                batch.failedCount
                                  ? ` (${batch.failedCount})`
                                  : ""
                              }`}
                        </span>
                      </td>
                      <td className="px-4 py-3">
                        {batch.status === "SUCCESS" ? (
                          <button
                            type="button"
                            className="text-sm font-medium text-primary hover:underline"
                          >
                            Download Log
                          </button>
                        ) : (
                          <button
                            type="button"
                            className="text-sm font-medium text-primary hover:underline"
                          >
                            View Errors
                          </button>
                        )}
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
