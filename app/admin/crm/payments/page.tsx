"use client";

import { useState } from "react";
import { X } from "lucide-react";
import {
  paymentRecords,
  paymentFilterTabs,
  type PaymentRecord,
  type Installment,
} from "@/lib/crmData";
import RecordPaymentModal from "@/components/crm/RecordPaymentModal";

function getInitials(name: string) {
  return name
    .trim()
    .split(/\s+/)
    .map((n) => n[0])
    .join("")
    .toUpperCase()
    .slice(0, 2);
}

const AVATAR_GRADIENTS = [
  "from-pink-400 to-orange-400",
  "from-amber-400 to-orange-400",
  "from-pink-400 to-rose-400",
];

const statusStyles: Record<string, string> = {
  PAID: "bg-green-100 text-green-800",
  PARTIAL: "bg-blue-100 text-blue-800",
  PENDING: "bg-red-100 text-red-800",
};

export default function CRMPaymentsPage() {
  const [activeTab, setActiveTab] = useState<string>(paymentFilterTabs[0]);
  const [selectedRecord, setSelectedRecord] = useState<PaymentRecord | null>(
    null
  );
  const [search, setSearch] = useState("");
  const [recordPaymentContext, setRecordPaymentContext] = useState<{
    record: PaymentRecord;
    installment: Installment;
  } | null>(null);

  const filtered = paymentRecords.filter((r) => {
    const matchSearch =
      !search ||
      r.studentName.toLowerCase().includes(search.toLowerCase()) ||
      r.studentId.includes(search) ||
      r.id.toLowerCase().includes(search.toLowerCase());
    const matchTab =
      activeTab === "All Payments" ||
      (activeTab === "Fully Paid" && r.status === "PAID") ||
      (activeTab === "Bank Transfers" && r.paymentMethod === "Bank Transfer") ||
      (activeTab === "Pending Verification" && r.status === "PENDING") ||
      (activeTab === "Overdue Installments" && r.status === "PARTIAL");
    return matchSearch && matchTab;
  });

  const totalCollected = 128450;
  const pendingInstallments = 42100;
  const totalRecords = 1280;

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Header */}
      <div className="bg-white border-b border-gray-200 px-6 py-4">
        <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
          <div className="flex items-center gap-4">
            <h1 className="text-xl font-bold text-gray-900">
              LeadFlow Payments
            </h1>
          </div>
          <div className="relative w-full sm:max-w-md">
            <span className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400">
              🔍
            </span>
            <input
              type="text"
              placeholder="Search students, invoices, or transactions..."
              value={search}
              onChange={(e) => setSearch(e.target.value)}
              className="w-full pl-10 pr-4 py-2.5 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-primary focus:border-primary"
            />
          </div>
        </div>
      </div>

      {/* Filter tabs */}
      <div className="bg-white border-b border-gray-200 px-6">
        <div className="flex flex-wrap gap-2 py-4">
          {paymentFilterTabs.map((tab) => (
            <button
              key={tab}
              type="button"
              onClick={() => setActiveTab(tab)}
              className={`px-4 py-2 rounded-lg text-sm font-semibold transition-colors ${
                activeTab === tab
                  ? "bg-primary text-white"
                  : "bg-gray-100 text-gray-700 hover:bg-gray-200"
              }`}
            >
              {tab}
            </button>
          ))}
        </div>
      </div>

      <div className="p-6 flex flex-col lg:flex-row gap-6">
        {/* Main: Summary cards + Payment Tracking */}
        <div
          className={`flex-1 ${
            selectedRecord ? "lg:max-w-[calc(100%-380px)]" : ""
          }`}
        >
          {/* Summary cards */}
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 mb-6">
            <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-6">
              <div className="flex items-start justify-between">
                <div>
                  <p className="text-sm font-medium text-gray-500 uppercase tracking-wide">
                    Total Collected
                  </p>
                  <p className="text-2xl font-bold text-gray-900 mt-1">
                    $
                    {totalCollected.toLocaleString("en-US", {
                      minimumFractionDigits: 2,
                    })}
                  </p>
                  <p className="text-sm text-green-600 font-semibold mt-2">
                    +12.5% FROM LAST MONTH
                  </p>
                </div>
                <div className="w-12 h-12 rounded-lg bg-green-100 flex items-center justify-center text-2xl">
                  💵
                </div>
              </div>
            </div>
            <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-6">
              <div className="flex items-start justify-between">
                <div>
                  <p className="text-sm font-medium text-gray-500 uppercase tracking-wide">
                    Pending Installments
                  </p>
                  <p className="text-2xl font-bold text-gray-900 mt-1">
                    $
                    {pendingInstallments.toLocaleString("en-US", {
                      minimumFractionDigits: 2,
                    })}
                  </p>
                  <p className="text-sm text-gray-600 font-medium mt-2">
                    24 PAYMENTS DUE THIS WEEK
                  </p>
                </div>
                <div className="w-12 h-12 rounded-lg bg-blue-100 flex items-center justify-center text-2xl">
                  📅
                </div>
              </div>
            </div>
          </div>

          {/* Payment Tracking */}
          <div className="bg-white rounded-xl shadow-sm border border-gray-200 overflow-hidden">
            <h2 className="text-lg font-bold text-gray-900 px-6 py-4 border-b border-gray-200">
              Payment Tracking
            </h2>
            <div className="overflow-x-auto">
              <table className="w-full">
                <thead>
                  <tr className="border-b border-gray-200 bg-gray-50">
                    <th className="text-left py-3.5 px-6 text-xs font-semibold text-gray-500 uppercase tracking-wider">
                      Student Name
                    </th>
                    <th className="text-left py-3.5 px-6 text-xs font-semibold text-gray-500 uppercase tracking-wider">
                      Total Course Fee
                    </th>
                    <th className="text-left py-3.5 px-6 text-xs font-semibold text-gray-500 uppercase tracking-wider">
                      Payment Method
                    </th>
                    <th className="text-left py-3.5 px-6 text-xs font-semibold text-gray-500 uppercase tracking-wider">
                      Status
                    </th>
                  </tr>
                </thead>
                <tbody>
                  {filtered.map((record, idx) => (
                    <tr
                      key={record.id}
                      onClick={() => setSelectedRecord(record)}
                      className="border-b border-gray-100 hover:bg-blue-50/50 cursor-pointer transition-colors"
                    >
                      <td className="py-4 px-6">
                        <div className="flex items-center gap-3">
                          <div
                            className={`w-10 h-10 rounded-full bg-gradient-to-br flex items-center justify-center text-white font-semibold text-sm ${
                              AVATAR_GRADIENTS[idx % AVATAR_GRADIENTS.length]
                            }`}
                          >
                            {getInitials(record.studentName)}
                          </div>
                          <div>
                            <p className="font-semibold text-gray-900">
                              {record.studentName}
                            </p>
                            <p className="text-xs text-gray-500">
                              ID: #{record.displayId}
                            </p>
                          </div>
                        </div>
                      </td>
                      <td className="py-4 px-6 font-semibold text-gray-900">
                        $
                        {record.totalCourseFee.toLocaleString("en-US", {
                          minimumFractionDigits: 2,
                        })}
                      </td>
                      <td className="py-4 px-6 text-gray-700">
                        {record.paymentMethod}
                      </td>
                      <td className="py-4 px-6">
                        <span
                          className={`inline-flex px-2.5 py-1 rounded-full text-xs font-semibold ${
                            statusStyles[record.status]
                          }`}
                        >
                          {record.status}
                        </span>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
            <div className="px-6 py-3 border-t border-gray-200 bg-gray-50 text-sm text-gray-600">
              Showing {filtered.length} of {totalRecords} payment records
            </div>
          </div>
        </div>

        {/* Installment Schedule Sidebar */}
        {selectedRecord && (
          <div className="w-full lg:w-[360px] shrink-0">
            <InstallmentSidebar
              record={selectedRecord}
              onClose={() => setSelectedRecord(null)}
              onMarkAsPaid={(inst) =>
                setRecordPaymentContext({
                  record: selectedRecord,
                  installment: inst,
                })
              }
            />
          </div>
        )}
      </div>

      {recordPaymentContext && (
        <RecordPaymentModal
          studentName={recordPaymentContext.record.studentName}
          courseName={recordPaymentContext.record.courseName || "Course"}
          installments={recordPaymentContext.record.installments.map((i) => ({
            index: i.index,
            total: i.total,
            amount: i.amount,
          }))}
          defaultAmount={recordPaymentContext.installment.amount}
          defaultInstallmentIndex={recordPaymentContext.installment.index}
          receiptNumber={"IMETS-" + recordPaymentContext.record.displayId}
          onClose={() => setRecordPaymentContext(null)}
          onConfirm={() => setRecordPaymentContext(null)}
        />
      )}
    </div>
  );
}

function InstallmentSidebar({
  record,
  onClose,
  onMarkAsPaid,
}: {
  record: PaymentRecord;
  onClose: () => void;
  onMarkAsPaid: (installment: Installment) => void;
}) {
  return (
    <div className="bg-white rounded-xl shadow-lg border border-gray-200 overflow-hidden sticky top-6">
      <div className="p-4 border-b border-gray-200 flex items-start justify-between">
        <div>
          <h3 className="font-bold text-gray-900">Installment Schedule</h3>
          <p className="text-sm text-gray-600 mt-0.5">
            Student: {record.studentName}
          </p>
        </div>
        <button
          type="button"
          onClick={onClose}
          className="p-2 text-gray-400 hover:text-gray-600 hover:bg-gray-100 rounded-lg"
          aria-label="Close"
        >
          <X className="h-5 w-5" strokeWidth={2} />
        </button>
      </div>
      <div className="p-4 space-y-3 max-h-[420px] overflow-y-auto">
        {record.installments.map((inst) => (
          <InstallmentCard
            key={inst.index}
            installment={inst}
            onMarkAsPaid={
              inst.status === "DUE" ? () => onMarkAsPaid(inst) : undefined
            }
          />
        ))}
      </div>
      <div className="p-4 border-t border-gray-200">
        <button
          type="button"
          className="w-full py-2.5 border-2 border-primary text-primary font-semibold rounded-lg hover:bg-primary hover:text-white transition-colors"
        >
          Edit Payment Plan
        </button>
      </div>
    </div>
  );
}

function InstallmentCard({
  installment,
  onMarkAsPaid,
}: {
  installment: Installment;
  onMarkAsPaid?: () => void;
}) {
  const isPaid = installment.status === "PAID";
  const isDue = installment.status === "DUE";
  const isScheduled = installment.status === "SCHEDULED";

  const bg = isPaid ? "bg-green-50" : isDue ? "bg-white" : "bg-gray-50";
  const border = isPaid
    ? "border-green-200"
    : isDue
    ? "border-amber-200"
    : "border-gray-200";

  return (
    <div className={`rounded-lg border p-4 ${bg} ${border}`}>
      <div className="flex items-start justify-between gap-2">
        <div>
          <p className="font-semibold text-gray-900">
            Installment {installment.index} of {installment.total}
          </p>
          <p className="text-lg font-bold text-gray-900 mt-0.5">
            $
            {installment.amount.toLocaleString("en-US", {
              minimumFractionDigits: 2,
            })}
          </p>
          {isPaid && installment.paidDate && (
            <p className="text-sm text-gray-600 mt-1">
              Paid on {installment.paidDate}
            </p>
          )}
          {isDue && installment.dueDate && (
            <p className="text-sm text-gray-600 mt-1">
              Due Date: {installment.dueDate}
            </p>
          )}
          {isScheduled && installment.dueDate && (
            <p className="text-sm text-gray-600 mt-1">
              Due Date: {installment.dueDate}
            </p>
          )}
        </div>
        <div className="shrink-0 text-right">
          {isPaid && (
            <span className="inline-flex items-center gap-1 px-2 py-1 rounded-full text-xs font-semibold bg-green-100 text-green-800">
              <span>✓</span> PAID
            </span>
          )}
          {isDue && (
            <>
              <span className="block px-2 py-1 rounded-full text-xs font-semibold bg-amber-100 text-amber-800 mb-2">
                DUE TODAY
              </span>
              <button
                type="button"
                onClick={onMarkAsPaid}
                className="px-3 py-1.5 bg-primary text-white text-xs font-semibold rounded-lg hover:bg-primary/90"
              >
                Mark as Paid
              </button>
            </>
          )}
          {isScheduled && (
            <span className="inline-flex px-2 py-1 rounded-full text-xs font-semibold bg-gray-200 text-gray-700">
              SCHEDULED
            </span>
          )}
        </div>
      </div>
    </div>
  );
}
