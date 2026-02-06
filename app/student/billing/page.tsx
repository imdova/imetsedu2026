"use client";

import "./billing.css";
import Link from "next/link";
import {
  CreditCard,
  Landmark,
  FileDown,
  Filter,
  ChevronLeft,
  ChevronRight,
  Info,
  Calendar,
  User,
  Settings,
  HelpCircle,
} from "lucide-react";
import { ROUTES } from "@/constants";
import {
  billingSummary,
  transactions,
  upcomingPayments,
  type Transaction,
  type TransactionStatus,
  type UpcomingPayment,
} from "./billing-data";

const statusLabel: Record<TransactionStatus, string> = {
  paid: "Paid",
  pending: "Pending",
  overdue: "Overdue",
};

export default function StudentBillingPage() {
  const totalTransactions = transactions.length;

  return (
    <div className="bill-page">
      <header className="bill-header">
        <div>
          <h1 className="bill-title">Billing & Payment History</h1>
          <p className="bill-subtitle">
            Manage your tuition fees, view invoices, and track your transaction
            history.
          </p>
        </div>
        <Link
          href={ROUTES.STUDENT.PAYMENT_METHODS}
          className="bill-payment-methods-btn"
        >
          <CreditCard className="w-4 h-4" strokeWidth={2} />
          Payment Methods
        </Link>
      </header>

      {/* Summary cards */}
      <div className="bill-summary">
        <div className="bill-card">
          <div className="bill-card-label">Total Course Fee</div>
          <p className="bill-card-value">${billingSummary.totalCourseFee}</p>
          <p className="bill-card-note">
            <Info className="w-4 h-4 shrink-0" strokeWidth={2} />
            {billingSummary.academicYear}
          </p>
        </div>
        <div className="bill-card">
          <div className="bill-card-label">Amount Paid</div>
          <p className="bill-card-value blue">${billingSummary.amountPaid}</p>
          <div className="bill-progress-wrap">
            <div className="bill-progress-bar">
              <div
                className="bill-progress-fill"
                style={{ width: `${billingSummary.percentComplete}%` }}
              />
            </div>
            <p className="bill-progress-text">
              {billingSummary.percentComplete}% Complete
            </p>
          </div>
        </div>
        <div className="bill-card">
          <div className="bill-card-label">Remaining Balance</div>
          <p className="bill-card-value blue">
            ${billingSummary.remainingBalance}
          </p>
          <p className="bill-card-note">
            Next installment due in {billingSummary.nextInstallmentDays} days
          </p>
        </div>
      </div>

      <div className="bill-main-wrap">
        {/* Transaction History */}
        <div className="bill-section">
          <div className="bill-section-header">
            <h2 className="bill-section-title">Transaction History</h2>
            <div className="bill-section-header-actions">
              <Link
                href={ROUTES.STUDENT.PAYMENT_METHODS}
                className="bill-payment-methods-link"
              >
                <CreditCard className="w-4 h-4" strokeWidth={2} />
                Payment Methods
              </Link>
              <button type="button" className="bill-filter-btn">
                <Filter className="w-4 h-4" strokeWidth={2} />
                Filter History
              </button>
            </div>
          </div>
          <div className="bill-table-wrap">
            <table className="bill-table">
              <thead>
                <tr>
                  <th>Date</th>
                  <th>Invoice ID</th>
                  <th>Description</th>
                  <th>Amount</th>
                  <th>Method</th>
                  <th>Status</th>
                  <th>Action</th>
                </tr>
              </thead>
              <tbody>
                {transactions.map((row) => (
                  <tr key={row.id}>
                    <td>{row.date}</td>
                    <td>{row.invoiceId}</td>
                    <td>{row.description}</td>
                    <td>${row.amount}</td>
                    <td>
                      <span className="inline-flex items-center gap-2">
                        {row.method === "card" ? (
                          <CreditCard
                            className="w-4 h-4 text-gray-500"
                            strokeWidth={2}
                          />
                        ) : (
                          <Landmark
                            className="w-4 h-4 text-gray-500"
                            strokeWidth={2}
                          />
                        )}
                        {row.methodLabel}
                      </span>
                    </td>
                    <td>
                      <span className={`bill-status bill-status-${row.status}`}>
                        <span className={`bill-status-dot ${row.status}`} />
                        {statusLabel[row.status]}
                      </span>
                    </td>
                    <td>
                      <button
                        type="button"
                        className="bill-action-btn"
                        aria-label="Download PDF"
                        title="Download PDF"
                      >
                        <FileDown className="w-5 h-5" strokeWidth={2} />
                      </button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
          <div className="bill-pagination">
            <span>
              Showing {totalTransactions} of {totalTransactions} transactions
            </span>
            <div className="bill-pagination-nav">
              <button
                type="button"
                className="bill-pagination-btn"
                disabled
                aria-label="Previous"
              >
                <ChevronLeft className="w-4 h-4" strokeWidth={2} />
              </button>
              <button
                type="button"
                className="bill-pagination-btn"
                aria-label="Next"
              >
                <ChevronRight className="w-4 h-4" strokeWidth={2} />
              </button>
            </div>
          </div>
        </div>

        {/* Sidebar */}
        <aside className="bill-sidebar">
          <div className="bill-sidebar-card">
            <h3 className="bill-sidebar-title">Upcoming Payments</h3>
            <div className="bill-upcoming-list">
              {upcomingPayments.map((item) => (
                <UpcomingItem key={item.id} item={item} />
              ))}
            </div>
          </div>
          <Link
            href={ROUTES.STUDENT.PAYMENT_METHODS}
            className="bill-manage-btn"
          >
            <Settings className="w-4 h-4" strokeWidth={2} />
            Manage Payment Methods &gt;
          </Link>
          <div className="bill-help-card">
            <h3 className="bill-help-title">Need Help?</h3>
            <p className="bill-help-text">
              Having trouble with your payment? Our financial aid office is here
              to assist.
            </p>
            <button type="button" className="bill-help-btn">
              Contact Support
            </button>
          </div>
        </aside>
      </div>

      <footer className="bill-footer">
        <span>© 2023 IMETS Academy. All rights reserved.</span>
        <div className="bill-footer-links">
          <Link href="#">Privacy Policy</Link>
          <Link href="#">Terms of Service</Link>
          <Link href="#">Contact Finance</Link>
        </div>
      </footer>
    </div>
  );
}

function UpcomingItem({ item }: { item: UpcomingPayment }) {
  const isFirst = item.variant === "installment";

  return (
    <div className="bill-upcoming-item">
      <div className="bill-upcoming-head">
        <span
          className={`bill-upcoming-name ${
            isFirst ? "" : "normal"
          } bill-upcoming-name-with-icon`}
        >
          {item.variant === "calendar" && (
            <Calendar className="w-4 h-4 shrink-0" strokeWidth={2} />
          )}
          {item.variant === "person" && (
            <User className="w-4 h-4 shrink-0" strokeWidth={2} />
          )}
          {item.title}
        </span>
        <span className="bill-upcoming-due">{item.dueLabel}</span>
      </div>
      <p className="bill-upcoming-amount">${item.amount}</p>
      {isFirst && (
        <Link href={ROUTES.STUDENT.CHECKOUT} className="bill-pay-now">
          <CreditCard className="w-4 h-4" strokeWidth={2} />
          Pay Now
        </Link>
      )}
    </div>
  );
}
