"use client";

import { useState } from "react";
import Link from "next/link";
import { SlidersHorizontal, LayoutGrid, List } from "lucide-react";
import {
  crmLeads,
  activePipelineFilterPills,
  type CRMLead,
} from "@/lib/crmData";
import RecordPaymentModal from "@/components/crm/RecordPaymentModal";

function ScoreCircle({ score }: { score: number }) {
  const isLow = score < 60;
  const color = isLow ? "text-amber-500" : "text-primary";
  const strokeColor = isLow ? "#f59e0b" : "#0f49bd";
  return (
    <div className="relative w-12 h-12 shrink-0">
      <svg className="w-12 h-12 -rotate-90" viewBox="0 0 36 36">
        <circle
          cx="18"
          cy="18"
          r="14"
          fill="none"
          stroke="#e5e7eb"
          strokeWidth="4"
        />
        <circle
          cx="18"
          cy="18"
          r="14"
          fill="none"
          stroke={strokeColor}
          strokeWidth="4"
          strokeDasharray={`${(score / 100) * 88} 88`}
        />
      </svg>
      <span
        className={`absolute inset-0 flex items-center justify-center text-xs font-bold ${color}`}
      >
        {score}%
      </span>
    </div>
  );
}

function PrimaryActionButton({
  lead,
  onRecordPayment,
}: {
  lead: CRMLead;
  onRecordPayment: (lead: CRMLead) => void;
}) {
  const action = lead.primaryAction || "Send Follow-up";
  const isPrimary =
    action === "Issue Certificate" || action === "Record Payment";
  const isRecordPayment = action === "Record Payment";
  return (
    <button
      type="button"
      onClick={() => isRecordPayment && onRecordPayment(lead)}
      className={`shrink-0 px-4 py-2 rounded-lg text-sm font-semibold transition-colors ${
        isPrimary
          ? "bg-primary text-white hover:bg-primary/90"
          : "border border-gray-300 bg-white text-gray-700 hover:bg-gray-50"
      }`}
    >
      {action === "Record Payment" && <span className="mr-1">💳</span>}
      {action}
    </button>
  );
}

export default function ActivePipelinePage() {
  const [activeFilter, setActiveFilter] = useState<string>(
    activePipelineFilterPills[0].id
  );
  const [viewMode, setViewMode] = useState<"list" | "grid">("list");
  const [page, setPage] = useState(1);
  const [recordPaymentLead, setRecordPaymentLead] = useState<CRMLead | null>(
    null
  );

  const leads = crmLeads;
  const total = 128;
  const perPage = 4;
  const totalPages = Math.ceil(leads.length / perPage) || 1;
  const paginated = leads.slice((page - 1) * perPage, page * perPage);

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Header: search, notifications, New Lead */}
      <div className="bg-white border-b border-gray-200 px-6 py-4">
        <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
          <div className="relative flex-1 max-w-xl">
            <span className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400">
              🔍
            </span>
            <input
              type="text"
              placeholder="Search leads, campaigns, or actions..."
              className="w-full pl-10 pr-16 py-2.5 bg-gray-100 border-0 rounded-lg focus:outline-none focus:ring-2 focus:ring-primary"
            />
            <span className="absolute right-3 top-1/2 -translate-y-1/2 text-xs text-gray-400">
              CTRL K
            </span>
          </div>
          <div className="flex items-center gap-3">
            <button
              type="button"
              className="w-10 h-10 rounded-full bg-gray-100 flex items-center justify-center text-gray-600 hover:bg-gray-200"
            >
              🔔
            </button>
            <div className="w-10 h-10 rounded-full bg-gradient-to-br from-amber-400 to-pink-400" />
            <Link
              href="/admin/crm/leads/new"
              className="inline-flex items-center gap-2 px-4 py-2.5 bg-primary text-white rounded-lg font-semibold hover:bg-primary/90 transition-colors"
            >
              <span>+</span>
              New Lead
            </Link>
          </div>
        </div>
      </div>

      {/* Filter pills */}
      <div className="bg-white border-b border-gray-200 px-6 py-4">
        <div className="flex flex-wrap items-center gap-2">
          <button
            type="button"
            className="inline-flex items-center gap-2 px-3 py-2 text-sm font-medium text-gray-600 hover:bg-gray-100 rounded-lg"
          >
            <SlidersHorizontal className="h-4 w-4" strokeWidth={2} />
            FILTERS
          </button>
          {activePipelineFilterPills.map((pill) => (
            <button
              key={pill.id}
              type="button"
              onClick={() => setActiveFilter(pill.id)}
              className={`inline-flex items-center gap-1.5 px-4 py-2 rounded-full text-sm font-medium transition-colors ${
                activeFilter === pill.id
                  ? "bg-primary text-white"
                  : "bg-white border border-gray-200 text-gray-700 hover:bg-gray-50"
              }`}
            >
              <span>{pill.icon}</span>
              {pill.label}
            </button>
          ))}
          <button
            type="button"
            className="px-3 py-2 rounded-full text-sm font-medium text-gray-500 border border-gray-200 hover:bg-gray-50"
          >
            + More
          </button>
        </div>
      </div>

      {/* Active Pipeline */}
      <div className="p-6">
        <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4 mb-6">
          <div>
            <h1 className="text-2xl font-bold text-gray-900">
              Active Pipeline
            </h1>
            <p className="text-sm text-gray-600 mt-1">
              {total} leads matching your current criteria
            </p>
          </div>
          <div className="flex items-center gap-1 p-1 bg-gray-100 rounded-lg">
            <button
              type="button"
              onClick={() => setViewMode("grid")}
              className={`p-2 rounded ${
                viewMode === "grid"
                  ? "bg-white shadow text-primary"
                  : "text-gray-500 hover:text-gray-700"
              }`}
              title="Grid view"
            >
              <LayoutGrid className="h-4 w-4" strokeWidth={2} />
            </button>
            <button
              type="button"
              onClick={() => setViewMode("list")}
              className={`p-2 rounded ${
                viewMode === "list"
                  ? "bg-white shadow text-primary"
                  : "text-gray-500 hover:text-gray-700"
              }`}
              title="List view"
            >
              <List className="h-4 w-4" strokeWidth={2} />
            </button>
          </div>
        </div>

        <div className="bg-white rounded-xl shadow-sm border border-gray-200 overflow-hidden">
          {viewMode === "list" ? (
            <div className="overflow-x-auto">
              <table className="w-full">
                <thead>
                  <tr className="border-b border-gray-200 bg-gray-50">
                    <th className="text-left py-3.5 px-4 text-xs font-semibold text-gray-500 uppercase tracking-wider">
                      Score
                    </th>
                    <th className="text-left py-3.5 px-4 text-xs font-semibold text-gray-500 uppercase tracking-wider">
                      Student Details
                    </th>
                    <th className="text-left py-3.5 px-4 text-xs font-semibold text-gray-500 uppercase tracking-wider">
                      Last Active
                    </th>
                    <th className="text-left py-3.5 px-4 text-xs font-semibold text-gray-500 uppercase tracking-wider">
                      Status & Payment
                    </th>
                    <th className="text-left py-3.5 px-4 text-xs font-semibold text-gray-500 uppercase tracking-wider">
                      Primary Action
                    </th>
                  </tr>
                </thead>
                <tbody>
                  {paginated.map((lead, idx) => (
                    <tr
                      key={lead.id}
                      className="border-b border-gray-100 hover:bg-gray-50/50 transition-colors"
                    >
                      <td className="py-4 px-4">
                        <ScoreCircle score={lead.score} />
                      </td>
                      <td className="py-4 px-4">
                        <Link
                          href={`/admin/crm/leads/${lead.id}`}
                          className="flex flex-col group"
                        >
                          <span className="font-semibold text-gray-900 group-hover:text-primary">
                            {lead.name}
                          </span>
                          <span className="text-sm text-gray-500">
                            {lead.email}
                          </span>
                        </Link>
                      </td>
                      <td className="py-4 px-4">
                        <span className="flex items-center gap-1.5 text-sm text-gray-600">
                          <span className="text-gray-400">🕐</span>
                          {lead.lastActive}
                        </span>
                      </td>
                      <td className="py-4 px-4">
                        <div className="flex flex-wrap gap-2">
                          {lead.enrollmentStatus && (
                            <span
                              className={`inline-flex px-2.5 py-1 rounded-full text-xs font-semibold ${
                                lead.enrollmentStatus === "ENROLLED"
                                  ? "bg-green-100 text-green-800"
                                  : lead.enrollmentStatus ===
                                    "WAITING FOR PAYMENT"
                                  ? "bg-amber-100 text-amber-800"
                                  : "bg-gray-100 text-gray-700"
                              }`}
                            >
                              {lead.enrollmentStatus}
                            </span>
                          )}
                          {lead.paymentSummary && (
                            <span
                              className={`inline-flex items-center gap-1 px-2.5 py-1 rounded-full text-xs font-semibold ${
                                lead.paymentSummary === "Fully Paid"
                                  ? "bg-green-100 text-green-800"
                                  : lead.paymentSummary === "No payment record"
                                  ? "text-gray-500"
                                  : "bg-amber-100 text-amber-800"
                              }`}
                            >
                              {lead.paymentSummary === "Fully Paid" && (
                                <span>✓</span>
                              )}
                              {lead.paymentSummary !== "Fully Paid" &&
                                lead.paymentSummary !== "No payment record" && (
                                  <span>💰</span>
                                )}
                              {lead.paymentSummary}
                            </span>
                          )}
                          {!lead.enrollmentStatus && !lead.paymentSummary && (
                            <span className="text-sm text-gray-500">—</span>
                          )}
                        </div>
                      </td>
                      <td
                        className="py-4 px-4"
                        onClick={(e) => e.stopPropagation()}
                      >
                        <PrimaryActionButton
                          lead={lead}
                          onRecordPayment={setRecordPaymentLead}
                        />
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          ) : (
            <div className="p-6 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
              {paginated.map((lead, idx) => (
                <Link
                  key={lead.id}
                  href={`/admin/crm/leads/${lead.id}`}
                  className="block p-4 rounded-xl border border-gray-200 hover:shadow-md hover:border-primary/30 transition-all"
                >
                  <div className="flex items-start justify-between mb-3">
                    <ScoreCircle score={lead.score} />
                    <span className="text-xs text-gray-500">
                      {lead.lastActive}
                    </span>
                  </div>
                  <p className="font-semibold text-gray-900">{lead.name}</p>
                  <p className="text-sm text-gray-500 truncate">{lead.email}</p>
                  <div className="flex flex-wrap gap-1.5 mt-2">
                    {lead.tags.slice(0, 2).map((t) => (
                      <span
                        key={t.label}
                        className={`px-2 py-0.5 rounded text-xs ${
                          t.variant === "blue"
                            ? "bg-blue-50 text-blue-700"
                            : t.variant === "green"
                            ? "bg-green-50 text-green-700"
                            : "bg-gray-100 text-gray-600"
                        }`}
                      >
                        {t.label}
                      </span>
                    ))}
                  </div>
                  <div className="mt-3" onClick={(e) => e.stopPropagation()}>
                    <PrimaryActionButton
                      lead={lead}
                      onRecordPayment={setRecordPaymentLead}
                    />
                  </div>
                </Link>
              ))}
            </div>
          )}

          {/* Pagination */}
          <div className="flex flex-col sm:flex-row items-center justify-between gap-4 px-4 py-3 border-t border-gray-200 bg-gray-50">
            <p className="text-sm text-gray-600">
              Showing {paginated.length} of {total} student leads
            </p>
            <div className="flex items-center gap-2">
              <button
                type="button"
                onClick={() => setPage((p) => Math.max(1, p - 1))}
                disabled={page === 1}
                className="w-9 h-9 rounded-lg border border-gray-300 flex items-center justify-center text-gray-600 hover:bg-gray-100 disabled:opacity-50 disabled:cursor-not-allowed"
              >
                ←
              </button>
              <span className="px-3 py-1.5 rounded-lg border border-gray-300 bg-white text-sm font-medium text-gray-700">
                {page}
              </span>
              <button
                type="button"
                onClick={() => setPage((p) => Math.min(totalPages, p + 1))}
                disabled={page === totalPages}
                className="w-9 h-9 rounded-lg border border-gray-300 flex items-center justify-center text-gray-600 hover:bg-gray-100 disabled:opacity-50 disabled:cursor-not-allowed"
              >
                →
              </button>
            </div>
          </div>
        </div>
      </div>

      {recordPaymentLead && (
        <RecordPaymentModal
          studentName={recordPaymentLead.name}
          courseName={
            recordPaymentLead.courseInterest || "Data Science Certification"
          }
          installments={[
            { index: 1, total: 3 },
            { index: 2, total: 3 },
            { index: 3, total: 3 },
          ]}
          defaultAmount={450}
          defaultInstallmentIndex={2}
          onClose={() => setRecordPaymentLead(null)}
          onConfirm={() => setRecordPaymentLead(null)}
        />
      )}
    </div>
  );
}
