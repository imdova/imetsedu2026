"use client";

import { useState } from "react";
import { useParams } from "next/navigation";
import Link from "next/link";
import {
  GraduationCap,
  FileText,
  CreditCard,
  CheckCircle,
  Phone,
  MessageCircle,
  Mail,
  Pencil,
  Download,
  HelpCircle,
  Plus,
  FileDown,
  Info,
  AlertTriangle,
  Calendar as CalendarIcon,
  Filter,
  LayoutList,
  FileText as FileTextIcon,
  MessageSquare,
  Users,
  BookOpen,
  ExternalLink,
  UserMinus,
  Video,
  ClipboardList,
  ArrowRightLeft,
} from "lucide-react";
import { ROUTES } from "@/constants";
import { STUDENTS } from "../students-data";
import { getStudentOverview } from "./student-overview-data";
import {
  getPaymentHistory,
  TRANSACTIONS_TOTAL,
  PAGE_SIZE,
  type TransactionStatus,
} from "./payment-history-data";
import { getEnrolledGroups } from "./enrolled-groups-data";
import "../students.css";
import "./student-overview.css";
import "./student-payment-history.css";
import "./student-enrolled-groups.css";

const TABS = [
  { id: "overview", label: "Overview" },
  { id: "payment", label: "Payment History" },
  { id: "groups", label: "Enrolled Groups" },
  { id: "lms", label: "LMS Progress" },
] as const;

export default function AdminStudentProfilePage() {
  const params = useParams();
  const id = typeof params.id === "string" ? params.id : "";
  const [activeTab, setActiveTab] =
    useState<(typeof TABS)[number]["id"]>("overview");
  const [activityTab, setActivityTab] = useState<"activity" | "note">(
    "activity"
  );
  const [activityText, setActivityText] = useState("");
  const [paymentPage, setPaymentPage] = useState(1);

  const student = STUDENTS.find((s) => s.id === id);
  const overview = student ? getStudentOverview(id) : null;

  if (!student) {
    return (
      <div className="asm-page">
        <main className="asm-main">
          <div
            className="asm-list-card"
            style={{ padding: 48, textAlign: "center" }}
          >
            <h1 className="asm-title">Student not found</h1>
            <p className="asm-description">
              No student with ID &quot;{id}&quot; was found.
            </p>
            <Link
              href={ROUTES.ADMIN.STUDENTS}
              className="asm-btn-primary"
              style={{ marginTop: 16, display: "inline-flex" }}
            >
              Back to Students
            </Link>
          </div>
        </main>
      </div>
    );
  }

  const paidPercent =
    overview && overview.totalDue > 0
      ? Math.round((overview.totalPaid / overview.totalDue) * 100)
      : 0;
  const gaugeValue = 85; // dynamic score from overview if we add it later
  const circumference = 2 * Math.PI * 42;
  const gaugeOffset = circumference - (gaugeValue / 100) * circumference;

  return (
    <div className="asm-page">
      <header className="asm-header">
        <div className="asm-header-row">
          <Link
            href={ROUTES.ADMIN.STUDENTS}
            className="asm-btn-secondary asm-so-back"
          >
            ← Back to Students
          </Link>
        </div>
      </header>

      <main className="asm-main">
        {/* Profile header card */}
        <div className="asm-so-header-card">
          <div className="asm-so-header-row">
            <div className="asm-so-profile">
              <div className="asm-so-avatar-wrap">
                {student.image ? (
                  <img src={student.image} alt="" className="asm-so-avatar" />
                ) : (
                  <div className="asm-so-avatar-initials">
                    {student.name
                      .split(" ")
                      .map((n) => n[0])
                      .join("")
                      .slice(0, 2)}
                  </div>
                )}
                {student.status === "active" && (
                  <span className="asm-so-avatar-dot" aria-hidden />
                )}
              </div>
              <div className="asm-so-profile-body">
                <div className="asm-so-name-row">
                  <h1 className="asm-so-name">{student.name}</h1>
                  {student.status === "active" && (
                    <span className="asm-so-badge asm-so-badge-active">
                      Active
                    </span>
                  )}
                </div>
                <p className="asm-so-id-course">
                  Student ID: #IM-{student.id.padStart(5, "0")}{" "}
                  {overview?.currentCourse && (
                    <>
                      ·{" "}
                      <Link href={ROUTES.ADMIN.COURSES}>
                        {overview.currentCourse}
                      </Link>
                    </>
                  )}
                </p>
                <div className="asm-so-actions">
                  <button type="button" className="asm-so-btn-voip">
                    <Phone size={16} strokeWidth={2} />
                    Call via VOIP
                  </button>
                  <button type="button" className="asm-so-btn-whatsapp">
                    <MessageCircle size={16} strokeWidth={2} />
                    WhatsApp
                  </button>
                  <a
                    href={`mailto:${student.email}`}
                    className="asm-so-btn-icon-only"
                    aria-label="Email"
                  >
                    <Mail size={18} strokeWidth={2} />
                  </a>
                  <button
                    type="button"
                    className="asm-so-btn-icon-only"
                    aria-label="Edit"
                  >
                    <Pencil size={18} strokeWidth={2} />
                  </button>
                </div>
              </div>
            </div>
            <div className="asm-so-header-right">
              <p className="asm-so-enrollment-label">Enrollment Date</p>
              <p className="asm-so-enrollment-date">
                {new Date(student.joinDate).toLocaleDateString(undefined, {
                  month: "short",
                  day: "numeric",
                  year: "numeric",
                })}
              </p>
              {overview?.assignedAdvisor && (
                <span className="asm-so-advisor">
                  Assigned Advisor: {overview.assignedAdvisor.toUpperCase()}
                </span>
              )}
            </div>
          </div>
        </div>

        {/* Tabs */}
        <div className="asm-so-tabs">
          {TABS.map((tab) => (
            <button
              key={tab.id}
              type="button"
              className={`asm-so-tab ${activeTab === tab.id ? "active" : ""}`}
              onClick={() => setActiveTab(tab.id)}
            >
              {tab.label}
            </button>
          ))}
        </div>

        {/* Overview tab content */}
        {activeTab === "overview" && overview && (
          <div className="asm-so-content">
            <div className="asm-so-grid">
              {/* Left column */}
              <div className="asm-so-col">
                <div className="asm-so-card">
                  <div className="asm-so-card-head">
                    <div className="asm-so-card-icon blue">
                      <GraduationCap size={18} strokeWidth={2} />
                    </div>
                    <h2 className="asm-so-card-title">Academic Status</h2>
                  </div>
                  <div className="asm-so-card-body">
                    <p>Current Course: {overview.currentCourse}</p>
                    <p>Batch / Group: {overview.batchGroup}</p>
                    <p>Intake: {overview.intake}</p>
                  </div>
                  <div className="asm-so-progress-wrap">
                    <div className="asm-so-progress-bar">
                      <div
                        className="asm-so-progress-fill"
                        style={{ width: `${overview.progressPercent}%` }}
                      />
                    </div>
                    <p className="asm-so-progress-label">
                      {overview.progressPercent}% progress
                    </p>
                  </div>
                </div>

                <div className="asm-so-card">
                  <div className="asm-so-card-head">
                    <div className="asm-so-card-icon gray">
                      <FileText size={18} strokeWidth={2} />
                    </div>
                    <h2 className="asm-so-card-title">Contact Info</h2>
                  </div>
                  <div className="asm-so-card-body">
                    <p>Personal Email: {student.email}</p>
                    <p>Phone Number: {overview.phone}</p>
                  </div>
                </div>

                <div className="asm-so-card asm-so-score-card">
                  <h2
                    className="asm-so-card-title"
                    style={{ marginBottom: 12 }}
                  >
                    Student Score
                  </h2>
                  <div className="asm-so-gauge-wrap">
                    <svg className="asm-so-gauge-svg" viewBox="0 0 100 100">
                      <circle
                        className="asm-so-gauge-bg"
                        cx="50"
                        cy="50"
                        r="42"
                      />
                      <circle
                        className="asm-so-gauge-fill"
                        cx="50"
                        cy="50"
                        r="42"
                        strokeDasharray={circumference}
                        strokeDashoffset={gaugeOffset}
                      />
                    </svg>
                    <span className="asm-so-gauge-value">{gaugeValue}</span>
                  </div>
                  <p className="asm-so-gauge-label">Dynamic Score</p>
                </div>
              </div>

              {/* Middle column */}
              <div className="asm-so-col">
                <div className="asm-so-card">
                  <div className="asm-so-activity-tabs">
                    <button
                      type="button"
                      className={`asm-so-activity-tab ${
                        activityTab === "activity" ? "active" : ""
                      }`}
                      onClick={() => setActivityTab("activity")}
                    >
                      New Activity
                    </button>
                    <button
                      type="button"
                      className={`asm-so-activity-tab ${
                        activityTab === "note" ? "active" : ""
                      }`}
                      onClick={() => setActivityTab("note")}
                    >
                      Internal Note
                    </button>
                  </div>
                  <textarea
                    className="asm-so-activity-textarea"
                    placeholder="Log a new activity or interaction..."
                    value={activityText}
                    onChange={(e) => setActivityText(e.target.value)}
                  />
                  <div style={{ display: "flex", justifyContent: "flex-end" }}>
                    <button type="button" className="asm-so-post-btn">
                      Post Entry
                    </button>
                  </div>
                </div>

                <div className="asm-so-card">
                  <h3 className="asm-so-timeline-title">
                    Interaction Timeline
                  </h3>
                  <ul className="asm-so-timeline-list">
                    {overview.timeline.map((item, i) => (
                      <li key={i} className="asm-so-timeline-item">
                        <div className={`asm-so-timeline-icon ${item.type}`}>
                          {item.type === "payment" && (
                            <CreditCard size={16} strokeWidth={2} />
                          )}
                          {item.type === "whatsapp" && (
                            <MessageCircle size={16} strokeWidth={2} />
                          )}
                          {item.type === "quiz" && (
                            <HelpCircle size={16} strokeWidth={2} />
                          )}
                        </div>
                        <div className="asm-so-timeline-body">
                          <p className="asm-so-timeline-head">{item.title}</p>
                          <p className="asm-so-timeline-detail">
                            {item.detail}
                          </p>
                          <p className="asm-so-timeline-time">{item.time}</p>
                        </div>
                      </li>
                    ))}
                  </ul>
                </div>
              </div>

              {/* Right column */}
              <div className="asm-so-col">
                <div className="asm-so-card">
                  <div className="asm-so-card-head">
                    <div className="asm-so-card-icon blue">
                      <CreditCard size={18} strokeWidth={2} />
                    </div>
                    <h2 className="asm-so-card-title">Financial Health</h2>
                  </div>
                  <div className="asm-so-card-body">
                    <p className="asm-so-total-paid">
                      Total Paid: $
                      {overview.totalPaid.toLocaleString("en-US", {
                        minimumFractionDigits: 2,
                      })}{" "}
                      ({paidPercent}%)
                    </p>
                    <div className="asm-so-progress-wrap">
                      <div className="asm-so-progress-bar">
                        <div
                          className="asm-so-progress-fill"
                          style={{ width: `${paidPercent}%` }}
                        />
                      </div>
                    </div>
                    <p className="asm-so-outstanding">
                      Outstanding $
                      {overview.outstanding.toLocaleString("en-US", {
                        minimumFractionDigits: 2,
                      })}
                    </p>
                    <Link
                      href={ROUTES.ADMIN.CRM_PAYMENTS}
                      className="asm-so-pay-now"
                    >
                      Pay Now
                    </Link>
                  </div>
                </div>

                <div className="asm-so-card">
                  <div className="asm-so-card-head asm-so-doc-head">
                    <div className="asm-so-card-head">
                      <div className="asm-so-card-icon green">
                        <CheckCircle size={18} strokeWidth={2} />
                      </div>
                      <h2 className="asm-so-card-title">Documents</h2>
                    </div>
                    <a href="#" className="asm-so-view-all">
                      View All
                    </a>
                  </div>
                  <ul className="asm-so-doc-list">
                    {overview.documents.map((doc, i) => (
                      <li key={i} className="asm-so-doc-item">
                        <span>{doc.name}</span>
                        <button
                          type="button"
                          className="asm-so-doc-download"
                          aria-label={`Download ${doc.name}`}
                        >
                          <Download size={16} strokeWidth={2} />
                        </button>
                      </li>
                    ))}
                  </ul>
                </div>

                <div className="asm-so-card">
                  <h2 className="asm-so-card-title" style={{ marginBottom: 8 }}>
                    Student Portal
                  </h2>
                  <p className="asm-so-portal-desc">
                    Access LMS view directly.
                  </p>
                  <Link
                    href={ROUTES.STUDENT.DASHBOARD}
                    className="asm-so-login-as"
                  >
                    Login as Student
                  </Link>
                </div>
              </div>
            </div>
          </div>
        )}

        {/* Payment History Ledger tab */}
        {activeTab === "payment" &&
          student &&
          (() => {
            const payment = getPaymentHistory(id);
            const totalPages = Math.ceil(TRANSACTIONS_TOTAL / PAGE_SIZE) || 1;
            const currentPaymentPage = Math.min(paymentPage, totalPages);
            const start = (currentPaymentPage - 1) * PAGE_SIZE + 1;
            const end = Math.min(
              currentPaymentPage * PAGE_SIZE,
              TRANSACTIONS_TOTAL
            );
            const paidPct =
              payment.totalFee > 0
                ? Math.round((payment.totalPaid / payment.totalFee) * 100)
                : 0;
            const actionLabel = (status: TransactionStatus) => {
              if (status === "overdue") return "Send Reminder";
              if (status === "pending") return "View Details";
              return "Details";
            };
            return (
              <div className="asm-ph-wrap">
                <div className="asm-ph-toolbar">
                  <button type="button" className="asm-ph-btn-add">
                    <Plus className="asm-ph-btn-icon" strokeWidth={2} />
                    Add Manual Payment
                  </button>
                  <button type="button" className="asm-ph-btn-export">
                    <FileDown className="asm-ph-btn-icon" strokeWidth={2} />
                    Export Statement
                  </button>
                </div>

                <div className="asm-ph-cards">
                  <div className="asm-ph-card">
                    <p className="asm-ph-card-label">Total Fee</p>
                    <p className="asm-ph-card-value">
                      $
                      {payment.totalFee.toLocaleString("en-US", {
                        minimumFractionDigits: 2,
                      })}
                    </p>
                    <p className="asm-ph-card-sub">
                      <Info className="asm-ph-card-sub-icon" strokeWidth={2} />
                      Includes Tax & Enrollment
                    </p>
                  </div>
                  <div className="asm-ph-card">
                    <p className="asm-ph-card-label">Total Paid</p>
                    <p className="asm-ph-card-value green">
                      $
                      {payment.totalPaid.toLocaleString("en-US", {
                        minimumFractionDigits: 2,
                      })}
                    </p>
                    <div className="asm-ph-progress-bar">
                      <div
                        className="asm-ph-progress-fill"
                        style={{ width: `${paidPct}%` }}
                      />
                    </div>
                  </div>
                  <div className="asm-ph-card outstanding">
                    <p className="asm-ph-card-label">Outstanding Balance</p>
                    <p className="asm-ph-card-value red">
                      $
                      {payment.outstanding.toLocaleString("en-US", {
                        minimumFractionDigits: 2,
                      })}
                    </p>
                    <p className="asm-ph-card-sub red">
                      <AlertTriangle
                        className="asm-ph-card-sub-icon"
                        strokeWidth={2}
                      />
                      Action Required
                    </p>
                  </div>
                  <div className="asm-ph-card">
                    <p className="asm-ph-card-label">Upcoming Payment Date</p>
                    <p className="asm-ph-card-value">
                      {new Date(payment.upcomingPaymentDate).toLocaleDateString(
                        "en-US",
                        {
                          month: "short",
                          day: "numeric",
                          year: "numeric",
                        }
                      )}
                    </p>
                    <p className="asm-ph-card-sub blue">
                      <CalendarIcon
                        className="asm-ph-card-sub-icon"
                        strokeWidth={2}
                      />
                      $
                      {payment.upcomingAmount.toLocaleString("en-US", {
                        minimumFractionDigits: 2,
                      })}{" "}
                      Due Soon
                    </p>
                  </div>
                </div>

                <div className="asm-ph-body">
                  <div className="asm-ph-main">
                    <div className="asm-ph-section-head">
                      <h2 className="asm-ph-section-title">
                        Transaction History
                      </h2>
                      <div className="asm-ph-table-actions">
                        <button
                          type="button"
                          className="asm-ph-table-action-btn"
                          aria-label="Filter"
                        >
                          <Filter size={18} strokeWidth={2} />
                        </button>
                        <button
                          type="button"
                          className="asm-ph-table-action-btn"
                          aria-label="Sort"
                        >
                          <LayoutList size={18} strokeWidth={2} />
                        </button>
                      </div>
                    </div>
                    <div className="asm-ph-table-wrap">
                      <table className="asm-ph-table">
                        <thead>
                          <tr>
                            <th>Transaction Date</th>
                            <th>Receipt ID</th>
                            <th>Description</th>
                            <th>Method</th>
                            <th>Amount</th>
                            <th>Status</th>
                            <th>Actions</th>
                          </tr>
                        </thead>
                        <tbody>
                          {payment.transactions.map((tx) => (
                            <tr key={tx.id}>
                              <td>
                                {new Date(
                                  tx.transactionDate
                                ).toLocaleDateString("en-US", {
                                  month: "short",
                                  day: "2-digit",
                                  year: "numeric",
                                })}
                              </td>
                              <td>
                                {tx.receiptId
                                  ? `#${tx.receiptId}`
                                  : tx.status === "overdue"
                                  ? "Pending..."
                                  : "Upcoming"}
                              </td>
                              <td>{tx.description}</td>
                              <td>{tx.method}</td>
                              <td className="asm-ph-amount">
                                $
                                {tx.amount.toLocaleString("en-US", {
                                  minimumFractionDigits: 2,
                                })}
                              </td>
                              <td>
                                <span className={`asm-ph-status ${tx.status}`}>
                                  <span
                                    className="asm-ph-status-dot"
                                    aria-hidden
                                  />
                                  {tx.status === "paid"
                                    ? "Paid"
                                    : tx.status === "overdue"
                                    ? "Overdue"
                                    : "Pending"}
                                </span>
                              </td>
                              <td>
                                <div className="asm-ph-row-actions">
                                  <button
                                    type="button"
                                    className="asm-ph-download-btn"
                                    aria-label="Download"
                                  >
                                    <Download size={16} strokeWidth={2} />
                                  </button>
                                  <a href="#" className="asm-ph-link">
                                    {actionLabel(tx.status)}
                                  </a>
                                </div>
                              </td>
                            </tr>
                          ))}
                        </tbody>
                      </table>
                      <div className="asm-ph-pagination">
                        <p
                          className="asm-ph-pagination-text"
                          style={{ margin: 0 }}
                        >
                          Showing {start} to {end} of {TRANSACTIONS_TOTAL}{" "}
                          entries
                        </p>
                        <div className="asm-ph-pagination-controls">
                          <button
                            type="button"
                            className="asm-ph-pagination-btn"
                            disabled={currentPaymentPage <= 1}
                            onClick={() =>
                              setPaymentPage((p) => Math.max(1, p - 1))
                            }
                          >
                            Previous
                          </button>
                          {Array.from(
                            { length: totalPages },
                            (_, i) => i + 1
                          ).map((n) => (
                            <button
                              key={n}
                              type="button"
                              className={`asm-ph-pagination-btn ${
                                n === currentPaymentPage ? "active" : ""
                              }`}
                              onClick={() => setPaymentPage(n)}
                            >
                              {n}
                            </button>
                          ))}
                          <button
                            type="button"
                            className="asm-ph-pagination-btn"
                            disabled={currentPaymentPage >= totalPages}
                            onClick={() =>
                              setPaymentPage((p) => Math.min(totalPages, p + 1))
                            }
                          >
                            Next
                          </button>
                        </div>
                      </div>
                    </div>
                  </div>

                  <aside className="asm-ph-sidebar">
                    <div className="asm-ph-sidebar-card">
                      <h3 className="asm-ph-sidebar-title">
                        Installment Roadmap
                      </h3>
                      <ul className="asm-ph-roadmap">
                        {payment.installmentRoadmap.map((step, i) => (
                          <li key={i} className="asm-ph-roadmap-item">
                            <div
                              className={`asm-ph-roadmap-dot ${step.status}`}
                              aria-hidden
                            />
                            <div className="asm-ph-roadmap-body">
                              <p className="asm-ph-roadmap-label">
                                {step.label}
                              </p>
                              <p className="asm-ph-roadmap-meta">{step.date}</p>
                              <p
                                className={`asm-ph-roadmap-amount ${
                                  step.status === "overdue" ? "overdue" : ""
                                }`}
                              >
                                $
                                {step.amount.toLocaleString("en-US", {
                                  minimumFractionDigits: 2,
                                })}
                                {step.status === "overdue" ? " (Overdue)" : ""}
                              </p>
                            </div>
                          </li>
                        ))}
                      </ul>
                    </div>
                    <div className="asm-ph-sidebar-card">
                      <h3 className="asm-ph-sidebar-title">Plan Summary</h3>
                      <div className="asm-ph-plan-row">
                        <span className="asm-ph-plan-label">Duration</span>
                        <span className="asm-ph-plan-value">
                          {payment.planDuration}
                        </span>
                      </div>
                      <div className="asm-ph-plan-row">
                        <span className="asm-ph-plan-label">Method</span>
                        <span className="asm-ph-plan-value">
                          {payment.planMethod}
                        </span>
                      </div>
                      <button type="button" className="asm-ph-btn-adjust">
                        Adjust Payment Plan
                      </button>
                    </div>
                    <div className="asm-ph-sidebar-card">
                      <h3 className="asm-ph-sidebar-title">Quick Actions</h3>
                      <ul className="asm-ph-quick-list">
                        <li className="asm-ph-quick-item">
                          <Mail className="asm-ph-quick-icon" strokeWidth={2} />
                          Send Statement via Email
                        </li>
                        <li className="asm-ph-quick-item">
                          <FileTextIcon
                            className="asm-ph-quick-icon"
                            strokeWidth={2}
                          />
                          Generate Tax Invoice
                        </li>
                        <li className="asm-ph-quick-item">
                          <MessageSquare
                            className="asm-ph-quick-icon"
                            strokeWidth={2}
                          />
                          SMS Payment Reminder
                        </li>
                      </ul>
                    </div>
                  </aside>
                </div>
              </div>
            );
          })()}

        {/* Enrolled Groups tab */}
        {activeTab === "groups" &&
          student &&
          (() => {
            const enrolled = getEnrolledGroups(id);
            const activeCount = enrolled.groups.filter(
              (g) => g.status === "active"
            ).length;
            const upcomingCount = enrolled.groups.filter(
              (g) => g.status === "upcoming"
            ).length;
            const statusLabel = (s: "active" | "upcoming" | "completed") =>
              s === "active"
                ? "Active"
                : s === "upcoming"
                ? "Upcoming"
                : "Completed";
            const sessionTypeLabel = (t: "live" | "workshop" | "assignment") =>
              t === "live"
                ? "Live"
                : t === "workshop"
                ? "Workshop"
                : "Assignment";
            return (
              <div className="asm-eg-wrap">
                <div className="asm-eg-header">
                  <div className="asm-eg-title-wrap">
                    <h2 className="asm-eg-title">Enrolled Groups</h2>
                    <span className="asm-eg-count">
                      {enrolled.groups.length}{" "}
                      {enrolled.groups.length === 1 ? "group" : "groups"}
                    </span>
                  </div>
                  <div className="asm-eg-actions">
                    <Link
                      href={ROUTES.ADMIN.GROUPS}
                      className="asm-eg-btn-secondary"
                    >
                      <Users className="asm-eg-btn-icon" strokeWidth={2} />
                      Browse all groups
                    </Link>
                    <button type="button" className="asm-eg-btn-primary">
                      <Plus className="asm-eg-btn-icon" strokeWidth={2} />
                      Add to group
                    </button>
                  </div>
                </div>

                {enrolled.groups.length > 0 && (
                  <div className="asm-eg-summary">
                    <div className="asm-eg-chip">
                      <span className="asm-eg-chip-value">
                        {enrolled.groups.length}
                      </span>
                      <span>Total</span>
                    </div>
                    <div className="asm-eg-chip active">
                      <span className="asm-eg-chip-value">{activeCount}</span>
                      <span>Active</span>
                    </div>
                    <div className="asm-eg-chip upcoming">
                      <span className="asm-eg-chip-value">{upcomingCount}</span>
                      <span>Upcoming</span>
                    </div>
                  </div>
                )}

                <div className="asm-eg-body">
                  <div className="asm-eg-main">
                    {enrolled.groups.length === 0 ? (
                      <div className="asm-eg-empty">
                        <p className="asm-eg-empty-title">No groups yet</p>
                        <p className="asm-eg-empty-desc">
                          This student is not enrolled in any group. Add them to
                          a group from the groups directory.
                        </p>
                        <Link
                          href={ROUTES.ADMIN.GROUPS}
                          className="asm-eg-btn-primary"
                        >
                          <Plus className="asm-eg-btn-icon" strokeWidth={2} />
                          Add to group
                        </Link>
                      </div>
                    ) : (
                      <div className="asm-eg-list">
                        {enrolled.groups.map((group) => {
                          const capacityPct =
                            group.studentsMax > 0
                              ? Math.round(
                                  (group.studentsCurrent / group.studentsMax) *
                                    100
                                )
                              : 0;
                          return (
                            <div key={group.id} className="asm-eg-card">
                              <div className="asm-eg-card-inner">
                                <div className="asm-eg-card-head">
                                  <div>
                                    <h3 className="asm-eg-card-title">
                                      {group.groupName}
                                    </h3>
                                    <p className="asm-eg-card-course">
                                      {group.courseTitle}
                                    </p>
                                  </div>
                                  <span
                                    className={`asm-eg-card-badge ${group.status}`}
                                  >
                                    {statusLabel(group.status)}
                                  </span>
                                </div>
                                <div className="asm-eg-card-stats">
                                  <div className="asm-eg-card-progress-wrap">
                                    <div className="asm-eg-card-progress-label">
                                      <span>Progress</span>
                                      <span className="asm-eg-card-progress-value">
                                        {group.progressPercent != null
                                          ? `${group.progressPercent}%`
                                          : "—"}
                                      </span>
                                    </div>
                                    <div className="asm-eg-card-progress-bar">
                                      <div
                                        className="asm-eg-card-progress-fill"
                                        style={{
                                          width: `${
                                            group.progressPercent ?? 0
                                          }%`,
                                        }}
                                      />
                                    </div>
                                  </div>
                                  <div className="asm-eg-card-capacity">
                                    <div className="asm-eg-card-capacity-bar">
                                      <div
                                        className="asm-eg-card-capacity-fill"
                                        style={{ width: `${capacityPct}%` }}
                                      />
                                    </div>
                                    <span>
                                      {group.studentsCurrent}/
                                      {group.studentsMax}
                                    </span>
                                  </div>
                                </div>
                                {group.nextSession && (
                                  <div className="asm-eg-card-next">
                                    <CalendarIcon size={14} strokeWidth={2} />
                                    {group.nextSession}
                                  </div>
                                )}
                                <div className="asm-eg-card-meta">
                                  <span className="asm-eg-card-meta-item">
                                    <CalendarIcon size={14} strokeWidth={2} />
                                    {group.periodStart} – {group.periodEnd}
                                  </span>
                                  <span className="asm-eg-card-meta-item">
                                    <Users size={14} strokeWidth={2} />
                                    {group.instructorName}
                                  </span>
                                  {group.section && (
                                    <span className="asm-eg-card-meta-item">
                                      Section: {group.section}
                                    </span>
                                  )}
                                  <span className="asm-eg-card-meta-item">
                                    Joined{" "}
                                    {new Date(
                                      group.joinedDate
                                    ).toLocaleDateString("en-US")}
                                  </span>
                                </div>
                                <div className="asm-eg-card-actions">
                                  <Link
                                    href={ROUTES.ADMIN.GROUP(group.id)}
                                    className="asm-eg-card-btn"
                                  >
                                    <ExternalLink size={16} strokeWidth={2} />
                                    View group
                                  </Link>
                                  <button
                                    type="button"
                                    className="asm-eg-card-btn transfer"
                                  >
                                    <ArrowRightLeft size={16} strokeWidth={2} />
                                    Transfer to another group
                                  </button>
                                  <button
                                    type="button"
                                    className="asm-eg-card-btn outline"
                                  >
                                    <CalendarIcon size={16} strokeWidth={2} />
                                    Schedule
                                  </button>
                                  <button
                                    type="button"
                                    className="asm-eg-card-btn outline"
                                  >
                                    <BookOpen size={16} strokeWidth={2} />
                                    Materials
                                  </button>
                                  <button
                                    type="button"
                                    className="asm-eg-card-btn danger"
                                  >
                                    <UserMinus size={16} strokeWidth={2} />
                                    Leave group
                                  </button>
                                </div>
                              </div>
                            </div>
                          );
                        })}
                      </div>
                    )}
                  </div>

                  {enrolled.groups.length > 0 && (
                    <aside className="asm-eg-sidebar">
                      <div className="asm-eg-sidebar-card">
                        <h3 className="asm-eg-sidebar-title">
                          Upcoming sessions
                        </h3>
                        {enrolled.upcomingSessions.length === 0 ? (
                          <p
                            className="asm-eg-empty-desc"
                            style={{ margin: 0, fontSize: 13 }}
                          >
                            No upcoming sessions.
                          </p>
                        ) : (
                          <>
                            <ul className="asm-eg-session-list">
                              {enrolled.upcomingSessions
                                .slice(0, 5)
                                .map((s) => (
                                  <li
                                    key={s.id}
                                    className="asm-eg-session-item"
                                  >
                                    <p className="asm-eg-session-name">
                                      {s.title}
                                    </p>
                                    <p className="asm-eg-session-meta">
                                      {s.groupName}
                                    </p>
                                    <p className="asm-eg-session-meta">
                                      {new Date(
                                        s.scheduledAt
                                      ).toLocaleDateString("en-US", {
                                        month: "short",
                                        day: "numeric",
                                        year: "numeric",
                                        hour: "numeric",
                                        minute: "2-digit",
                                      })}
                                    </p>
                                    <span
                                      className={`asm-eg-session-type ${s.type}`}
                                    >
                                      {sessionTypeLabel(s.type)}
                                    </span>
                                  </li>
                                ))}
                            </ul>
                            <a href="#" className="asm-eg-view-all">
                              View all sessions
                            </a>
                          </>
                        )}
                      </div>
                      <div className="asm-eg-sidebar-card">
                        <h3 className="asm-eg-sidebar-title">
                          Related actions
                        </h3>
                        <ul className="asm-eg-quick-list">
                          <li className="asm-eg-quick-item">
                            <Video size={18} strokeWidth={2} />
                            View live sessions
                          </li>
                          <li className="asm-eg-quick-item">
                            <BookOpen size={18} strokeWidth={2} />
                            Group materials
                          </li>
                          <li className="asm-eg-quick-item">
                            <ClipboardList size={18} strokeWidth={2} />
                            Assignments by group
                          </li>
                        </ul>
                      </div>
                    </aside>
                  )}
                </div>
              </div>
            );
          })()}

        {/* LMS Progress placeholder */}
        {activeTab === "lms" && (
          <div className="asm-so-content">
            <div className="asm-so-card" style={{ maxWidth: 480 }}>
              <p className="asm-card-label">LMS Progress</p>
              <p className="asm-student-meta" style={{ marginTop: 8 }}>
                Content for this tab is coming soon.
              </p>
            </div>
          </div>
        )}
      </main>
    </div>
  );
}
