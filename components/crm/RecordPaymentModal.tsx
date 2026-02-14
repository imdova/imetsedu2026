"use client";

import { useState, useMemo } from "react";

export type PaymentMethodOption = "CASH" | "BANK" | "CARD";

interface InstallmentOption {
  label: string;
  value: string;
  index: number;
  total: number;
}

export interface RecordPaymentModalProps {
  studentName: string;
  courseName?: string;
  /** e.g. [{ index: 1, total: 3 }, { index: 2, total: 3 }, ...] */
  installments?: { index: number; total: number; amount?: number }[];
  defaultAmount?: number;
  defaultInstallmentIndex?: number;
  receiptNumber?: string;
  onClose: () => void;
  onConfirm: (payload: {
    amount: number;
    installment: string;
    paymentMethod: PaymentMethodOption;
    notes: string;
    sendWhatsApp: boolean;
  }) => void;
}

const PAYMENT_METHODS: {
  id: PaymentMethodOption;
  label: string;
  icon: string;
}[] = [
  { id: "CASH", label: "CASH", icon: "💵" },
  { id: "BANK", label: "BANK", icon: "🏦" },
  { id: "CARD", label: "CARD", icon: "💳" },
];

function formatCurrency(val: number) {
  return "$ " + val.toFixed(2).replace(/\B(?=(\d{3})+(?!\d))/g, ",");
}

function parseAmount(str: string): number {
  const n = parseFloat(str.replace(/[^0-9.]/g, "")) || 0;
  return Math.max(0, n);
}

export default function RecordPaymentModal({
  studentName,
  courseName = "Data Science Certification",
  installments = [
    { index: 1, total: 3 },
    { index: 2, total: 3 },
    { index: 3, total: 3 },
  ],
  defaultAmount = 450,
  defaultInstallmentIndex = 2,
  receiptNumber: receiptNumberProp,
  onClose,
  onConfirm,
}: RecordPaymentModalProps) {
  const [receiptNumber] = useState(
    () =>
      receiptNumberProp ?? "IMETS-" + Math.floor(80000 + Math.random() * 20000)
  );
  const [amount, setAmount] = useState(defaultAmount);
  const [amountInput, setAmountInput] = useState(formatCurrency(defaultAmount));
  const [installment, setInstallment] = useState(
    installments.find((i) => i.index === defaultInstallmentIndex) ??
      installments[0]
  );
  const [paymentMethod, setPaymentMethod] =
    useState<PaymentMethodOption>("CASH");
  const [notes, setNotes] = useState("");
  const [whatsApp, setWhatsApp] = useState(true);

  const installmentOptions: InstallmentOption[] = useMemo(
    () =>
      installments.map((i) => ({
        label: `Installment ${i.index} of ${i.total}`,
        value: `inst-${i.index}-${i.total}`,
        index: i.index,
        total: i.total,
      })),
    [installments]
  );

  const selectedOption =
    installmentOptions.find(
      (o) => o.index === installment.index && o.total === installment.total
    ) ?? installmentOptions[0];

  const handleAmountChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const raw = e.target.value;
    setAmountInput(raw);
    setAmount(parseAmount(raw));
  };

  const handleInstallmentChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
    const opt = installmentOptions.find((o) => o.value === e.target.value);
    if (opt) {
      setInstallment({ index: opt.index, total: opt.total });
    }
  };

  const handleConfirm = () => {
    onConfirm({
      amount,
      installment: `Installment ${installment.index} of ${installment.total}`,
      paymentMethod,
      notes,
      sendWhatsApp: whatsApp,
    });
    onClose();
  };

  const today = new Date().toLocaleDateString("en-US", {
    year: "numeric",
    month: "short",
    day: "numeric",
  });

  return (
    <div
      className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/40 backdrop-blur-sm"
      onClick={onClose}
    >
      <div
        className="bg-white rounded-2xl shadow-2xl w-full max-w-4xl max-h-[90vh] overflow-hidden flex flex-col"
        onClick={(e) => e.stopPropagation()}
      >
        {/* Header */}
        <div className="flex items-start justify-between p-6 pb-4">
          <div className="flex items-start gap-4">
            <div className="w-12 h-12 rounded-xl bg-emerald-500 flex items-center justify-center shrink-0">
              <svg
                className="w-6 h-6 text-white"
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
            <div>
              <h2 className="text-xl font-bold text-gray-900">
                Record Payment
              </h2>
              <p className="text-sm text-gray-500 mt-0.5">
                Issue a new digital receipt for a student
              </p>
            </div>
          </div>
          <button
            type="button"
            onClick={onClose}
            className="p-2 text-gray-400 hover:text-gray-600 hover:bg-gray-100 rounded-lg transition-colors"
          >
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
                d="M6 18L18 6M6 6l12 12"
              />
            </svg>
          </button>
        </div>

        <div className="flex-1 overflow-y-auto px-6 pb-6">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
            {/* Left: Payment Details */}
            <div className="space-y-5">
              <div>
                <label className="block text-xs font-semibold text-gray-500 uppercase tracking-wider mb-1.5">
                  Student Name
                </label>
                <div className="relative">
                  <input
                    type="text"
                    value={studentName}
                    readOnly
                    className="w-full px-4 py-2.5 bg-gray-100 border border-gray-200 rounded-lg text-gray-700 pr-12"
                  />
                  <span className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-400">
                    🔒
                  </span>
                </div>
              </div>

              <div>
                <label className="block text-xs font-semibold text-gray-500 uppercase tracking-wider mb-1.5">
                  Amount to Pay
                </label>
                <input
                  type="text"
                  value={amountInput}
                  onChange={handleAmountChange}
                  placeholder="$ 0.00"
                  className="w-full px-4 py-2.5 bg-gray-50 border border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-primary focus:border-primary"
                />
              </div>

              <div>
                <label className="block text-xs font-semibold text-gray-500 uppercase tracking-wider mb-1.5">
                  Installment
                </label>
                <div className="relative">
                  <select
                    value={selectedOption.value}
                    onChange={handleInstallmentChange}
                    className="w-full px-4 py-2.5 bg-gray-50 border border-gray-200 rounded-lg appearance-none focus:outline-none focus:ring-2 focus:ring-primary focus:border-primary pr-10"
                  >
                    {installmentOptions.map((o) => (
                      <option key={o.value} value={o.value}>
                        {o.label}
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
                <label className="block text-xs font-semibold text-gray-500 uppercase tracking-wider mb-2">
                  Payment Method
                </label>
                <div className="flex gap-3">
                  {PAYMENT_METHODS.map((m) => {
                    const selected = paymentMethod === m.id;
                    return (
                      <button
                        key={m.id}
                        type="button"
                        onClick={() => setPaymentMethod(m.id)}
                        className={`flex-1 flex flex-col items-center gap-2 p-4 rounded-xl border-2 transition-all ${
                          selected
                            ? "border-primary bg-primary/5"
                            : "border-gray-200 bg-white hover:border-gray-300"
                        }`}
                      >
                        <span
                          className={`w-12 h-12 rounded-lg flex items-center justify-center text-2xl ${
                            selected
                              ? "bg-primary text-white"
                              : "bg-gray-100 text-gray-600"
                          }`}
                        >
                          {m.icon}
                        </span>
                        <span
                          className={`text-sm font-semibold ${
                            selected ? "text-primary" : "text-gray-700"
                          }`}
                        >
                          {m.label}
                        </span>
                      </button>
                    );
                  })}
                </div>
              </div>

              <div>
                <label className="block text-xs font-semibold text-gray-500 uppercase tracking-wider mb-1.5">
                  Notes (Internal)
                </label>
                <textarea
                  value={notes}
                  onChange={(e) => setNotes(e.target.value)}
                  placeholder="Add any transaction details..."
                  rows={3}
                  className="w-full px-4 py-2.5 bg-gray-50 border border-gray-200 rounded-lg resize-y focus:outline-none focus:ring-2 focus:ring-primary focus:border-primary placeholder:text-gray-400"
                />
              </div>
            </div>

            {/* Right: Receipt Preview */}
            <div className="lg:pl-4">
              <p className="text-xs font-semibold text-gray-400 uppercase tracking-wider mb-4">
                Receipt Preview
              </p>
              <div className="bg-gray-50 rounded-xl border border-gray-200 p-6 space-y-4">
                <div className="flex items-center justify-between">
                  <span className="text-primary font-bold text-lg flex items-center gap-2">
                    <span className="w-8 h-8 rounded bg-primary text-white flex items-center justify-center text-sm font-bold">
                      I
                    </span>
                    IMETS school of business
                  </span>
                </div>
                <p className="text-xs text-gray-400">
                  RECEIPT NO.{" "}
                  <span className="font-bold text-gray-900">
                    #{receiptNumber}
                  </span>
                </p>
                <div className="space-y-1 text-sm">
                  <div className="flex justify-between">
                    <span className="text-gray-400">Student:</span>
                    <span className="font-medium text-gray-900">
                      {studentName}
                    </span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-gray-400">Date:</span>
                    <span className="font-medium text-gray-900">{today}</span>
                  </div>
                </div>
                <div className="border-t border-dashed border-gray-300 pt-4 mt-4">
                  <div className="flex justify-between items-start">
                    <div>
                      <p className="font-semibold text-gray-900">
                        {courseName}
                      </p>
                      <p className="text-xs text-gray-400 mt-0.5">
                        Installment {installment.index} of {installment.total}
                      </p>
                    </div>
                    <p className="font-semibold text-gray-900">
                      {formatCurrency(amount)}
                    </p>
                  </div>
                  <p className="text-xs text-gray-400 mt-1 text-right">
                    Payment Method:{" "}
                    {paymentMethod === "CASH"
                      ? "Cash"
                      : paymentMethod === "BANK"
                      ? "Bank"
                      : "Card"}
                  </p>
                </div>
                <div className="bg-gray-200/60 rounded-lg px-4 py-3 flex justify-between items-center">
                  <span className="font-bold text-gray-900">TOTAL PAID</span>
                  <span className="font-bold text-primary text-lg">
                    {formatCurrency(amount)}
                  </span>
                </div>
                <p className="text-xs text-gray-400 text-center pt-2">
                  Thank you for choosing IMETS school of business
                </p>
                <div className="flex items-center justify-between pt-2 border-t border-gray-200">
                  <div className="flex items-center gap-2 text-green-600">
                    <span className="w-5 h-5 rounded-full bg-green-100 flex items-center justify-center">
                      <svg
                        className="w-3 h-3"
                        fill="currentColor"
                        viewBox="0 0 20 20"
                      >
                        <path
                          fillRule="evenodd"
                          d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z"
                          clipRule="evenodd"
                        />
                      </svg>
                    </span>
                    <span className="text-sm font-medium">Live Preview</span>
                  </div>
                  <span className="text-xs font-semibold text-green-600">
                    SYNCHRONIZED
                  </span>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Footer */}
        <div className="border-t border-gray-200 px-6 py-4 bg-gray-50 flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
          <div className="flex items-center gap-3">
            <button
              type="button"
              role="switch"
              aria-checked={whatsApp}
              onClick={() => setWhatsApp(!whatsApp)}
              className={`relative w-11 h-6 rounded-full transition-colors ${
                whatsApp ? "bg-primary" : "bg-gray-300"
              }`}
            >
              <span
                className={`absolute top-0.5 w-5 h-5 rounded-full bg-white shadow transition-all ${
                  whatsApp ? "left-auto right-0.5" : "left-0.5 right-auto"
                }`}
              />
            </button>
            <div>
              <p className="text-sm font-medium text-gray-900">
                WhatsApp Notification
              </p>
              <p className="text-xs text-gray-500">
                Send receipt to student automatically
              </p>
            </div>
          </div>
          <div className="flex items-center gap-3">
            <button
              type="button"
              onClick={onClose}
              className="px-4 py-2.5 text-gray-700 font-semibold hover:bg-gray-200 rounded-lg transition-colors"
            >
              Discard
            </button>
            <button
              type="button"
              onClick={handleConfirm}
              className="inline-flex items-center gap-2 px-5 py-2.5 bg-primary text-white font-semibold rounded-lg hover:bg-primary/90 transition-colors"
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
                  d="M12 19l9 2-9-18-9 18 9-2zm0 0v-8"
                />
              </svg>
              Confirm & Send Receipt
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
