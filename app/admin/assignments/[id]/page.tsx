"use client";

import { useParams } from "next/navigation";
import Link from "next/link";
import { useState } from "react";
import {
  ChevronLeft,
  ChevronRight,
  Download,
  Plus,
  FileText,
  Phone,
  BarChart3,
  ShieldAlert,
  SlidersHorizontal,
} from "lucide-react";
import { getAssignmentById } from "../assignments-data";
import { ROUTES } from "@/constants";
import { mockDetailStats, mockSubmissions, tabCounts } from "./detail-data";
import "./detail.css";

type TabId = "all" | "readyToGrade" | "graded" | "overdue";

const PER_PAGE = 4;
const TOTAL_STUDENTS = 50;

export default function AdminAssignmentDetailPage() {
  const params = useParams();
  const id = typeof params.id === "string" ? params.id : "";
  const assignment = getAssignmentById(id);
  const [activeTab, setActiveTab] = useState<TabId>("all");
  const [page, setPage] = useState(1);

  const stats = mockDetailStats;
  const submissions = mockSubmissions;
  const totalPages = Math.ceil(TOTAL_STUDENTS / PER_PAGE) || 1;
  const currentPage = Math.min(page, totalPages);
  const start = (currentPage - 1) * PER_PAGE + 1;
  const end = Math.min(currentPage * PER_PAGE, TOTAL_STUDENTS);

  if (!assignment) {
    return (
      <div className="aad-page">
        <div className="aad-error">
          <p>Assignment not found.</p>
          <Link href={ROUTES.ADMIN.ASSIGNMENTS} className="aad-back-link">
            Back to Assignments
          </Link>
        </div>
      </div>
    );
  }

  const submissionProgress =
    (stats.totalSubmissions / stats.totalStudents) * 100;

  return (
    <div className="aad-page">
      <nav className="aad-breadcrumb" aria-label="Breadcrumb">
        <Link href={ROUTES.ADMIN.ASSIGNMENTS}>Assignments</Link>
        <ChevronRight className="aad-breadcrumb-sep" aria-hidden />
        <span className="aad-breadcrumb-current">{assignment.courseName}</span>
      </nav>

      <header className="aad-header">
        <div className="aad-header-row">
          <div className="aad-header-content">
            <h1 className="aad-title">{assignment.title}</h1>
            <p className="aad-description">
              Detailed Assignment Submission List &amp; Grading Panel
            </p>
          </div>
          <div className="aad-header-actions">
            <button type="button" className="aad-btn-export">
              <Download className="w-4 h-4" strokeWidth={2} />
              Export Report
            </button>
            <button type="button" className="aad-btn-primary">
              <Plus className="w-4 h-4" strokeWidth={2} />
              Post Announcement
            </button>
          </div>
        </div>
      </header>

      <div className="aad-main">
        {/* Summary cards */}
        <div className="aad-cards">
          <div className="aad-card">
            <div className="aad-card-icon blue">
              <FileText className="w-5 h-5" strokeWidth={2} />
            </div>
            <div className="aad-card-body">
              <p className="aad-card-label">Total Submissions</p>
              <p className="aad-card-value">
                {stats.totalSubmissions} / {stats.totalStudents}
              </p>
              <div className="aad-card-progress">
                <div
                  className="aad-card-progress-fill"
                  style={{ width: `${submissionProgress}%` }}
                />
              </div>
            </div>
          </div>
          <div className="aad-card">
            <div className="aad-card-icon green">
              <Phone className="w-5 h-5" strokeWidth={2} />
            </div>
            <div className="aad-card-body">
              <p className="aad-card-label">Avg. Turnaround</p>
              <p className="aad-card-value">{stats.avgTurnaroundDays} Days</p>
              <p className="aad-card-trend positive">{stats.turnaroundTrend}</p>
            </div>
          </div>
          <div className="aad-card">
            <div className="aad-card-icon purple">
              <BarChart3 className="w-5 h-5" strokeWidth={2} />
            </div>
            <div className="aad-card-body">
              <p className="aad-card-label">Average Grade</p>
              <p className="aad-card-value">{stats.averageGradePct}%</p>
              <p className="aad-card-trend positive">{stats.gradeTrend}</p>
            </div>
          </div>
          <div className="aad-card">
            <div className="aad-card-icon red">
              <ShieldAlert className="w-5 h-5" strokeWidth={2} />
            </div>
            <div className="aad-card-body">
              <p className="aad-card-label">Plagiarism Alerts</p>
              <p className="aad-card-value aad-card-value-danger">
                <span className="aad-card-value-num">
                  {stats.plagiarismAlerts}
                </span>
                <span className="aad-card-value-suffix"> High Risk</span>
              </p>
              <p className="aad-card-trend danger">
                {stats.plagiarismAlertLabel}
              </p>
            </div>
          </div>
        </div>

        {/* Submissions card */}
        <div className="aad-submissions-card">
          <div className="aad-tabs-row">
            <div className="aad-tabs">
              <button
                type="button"
                className={`aad-tab ${activeTab === "all" ? "active" : ""}`}
                onClick={() => setActiveTab("all")}
              >
                All Submissions ({tabCounts.all})
              </button>
              <button
                type="button"
                className={`aad-tab ${
                  activeTab === "readyToGrade" ? "active" : ""
                }`}
                onClick={() => setActiveTab("readyToGrade")}
              >
                Ready to Grade ({tabCounts.readyToGrade})
              </button>
              <button
                type="button"
                className={`aad-tab ${activeTab === "graded" ? "active" : ""}`}
                onClick={() => setActiveTab("graded")}
              >
                Graded ({tabCounts.graded})
              </button>
              <button
                type="button"
                className={`aad-tab aad-tab-overdue ${
                  activeTab === "overdue" ? "active" : ""
                }`}
                onClick={() => setActiveTab("overdue")}
              >
                Overdue ({tabCounts.overdue})
              </button>
            </div>
            <button
              type="button"
              className="aad-filter-btn"
              aria-label="Filter"
            >
              <SlidersHorizontal className="w-5 h-5" strokeWidth={2} />
            </button>
          </div>

          <div className="aad-table-wrap">
            <table className="aad-table">
              <thead>
                <tr>
                  <th>Student</th>
                  <th>Submission Date</th>
                  <th>Status</th>
                  <th>Plagiarism Score</th>
                  <th>Final Grade</th>
                  <th>Actions</th>
                </tr>
              </thead>
              <tbody>
                {submissions.map((row) => (
                  <tr key={row.id}>
                    <td>
                      <div className="aad-student-cell">
                        <div
                          className={`aad-student-avatar ${
                            row.status === "not-submitted"
                              ? "aad-avatar-placeholder"
                              : ""
                          }`}
                        >
                          {row.avatarInitials}
                        </div>
                        <div>
                          <p className="aad-student-name">{row.studentName}</p>
                          <p className="aad-student-id">ID: {row.studentId}</p>
                        </div>
                      </div>
                    </td>
                    <td
                      className={`aad-date-cell ${
                        row.status === "not-submitted"
                          ? "aad-date-not-submitted"
                          : ""
                      }`}
                    >
                      {row.status === "not-submitted"
                        ? "Not Submitted"
                        : row.submissionDate ?? "—"}
                    </td>
                    <td>
                      <span
                        className={`aad-status-pill ${
                          row.status === "not-submitted"
                            ? "overdue"
                            : row.status
                        }`}
                      >
                        {row.status === "graded"
                          ? "Graded"
                          : row.status === "submitted"
                          ? "Submitted"
                          : row.status === "late"
                          ? "Late"
                          : "Overdue"}
                      </span>
                    </td>
                    <td>
                      {row.plagiarismScore != null ? (
                        <span
                          className={`aad-plagiarism ${
                            row.plagiarismLevel ?? "low"
                          }`}
                        >
                          <span className="aad-plagiarism-dot" />
                          {row.plagiarismScore}% (
                          {row.plagiarismLevel === "high"
                            ? "High"
                            : row.plagiarismLevel === "medium"
                            ? "Medium"
                            : "Low"}
                          )
                        </span>
                      ) : (
                        "—"
                      )}
                    </td>
                    <td
                      className={`aad-grade-cell ${
                        row.finalGrade === "Pending" ? "aad-grade-pending" : ""
                      }`}
                    >
                      {row.finalGrade ?? "—"}
                    </td>
                    <td>
                      <div className="aad-row-actions">
                        {row.status === "graded" && (
                          <button type="button" className="aad-btn-action">
                            View Feedback
                          </button>
                        )}
                        {(row.status === "submitted" ||
                          row.status === "late") && (
                          <button type="button" className="aad-btn-action">
                            Open Workspace
                          </button>
                        )}
                        {row.status === "not-submitted" && (
                          <button
                            type="button"
                            className="aad-btn-action-outline"
                          >
                            Send Reminder
                          </button>
                        )}
                      </div>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>

          <div className="aad-pagination">
            <p className="aad-pagination-text">
              Showing {start} to {end} of {TOTAL_STUDENTS} students
            </p>
            <div className="aad-pagination-controls">
              <button
                type="button"
                className="aad-pagination-btn"
                disabled={currentPage <= 1}
                aria-label="Previous page"
              >
                <ChevronLeft className="w-4 h-4" strokeWidth={2} />
              </button>
              {[1, 2, 3].map((p) => (
                <button
                  key={p}
                  type="button"
                  className={`aad-pagination-btn ${
                    currentPage === p ? "active" : ""
                  }`}
                  onClick={() => setPage(p)}
                >
                  {p}
                </button>
              ))}
              <span className="aad-pagination-ellipsis">...</span>
              <button
                type="button"
                className={`aad-pagination-btn ${
                  currentPage === totalPages ? "active" : ""
                }`}
                onClick={() => setPage(totalPages)}
              >
                {totalPages}
              </button>
              <button
                type="button"
                className="aad-pagination-btn"
                disabled={currentPage >= totalPages}
                aria-label="Next page"
              >
                <ChevronRight className="w-4 h-4" strokeWidth={2} />
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
