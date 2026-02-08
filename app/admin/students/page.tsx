"use client";

import { useState, useMemo } from "react";
import Link from "next/link";
import {
  Search,
  Download,
  UserPlus,
  GraduationCap,
  BookOpen,
  Award,
  Users,
  Eye,
  Pencil,
  MoreHorizontal,
  ChevronLeft,
  ChevronRight,
} from "lucide-react";
import { ROUTES } from "@/constants";
import {
  STUDENTS,
  STATUS_OPTIONS,
  COUNTRY_OPTIONS,
  type Student,
  type StudentStatus,
} from "./students-data";
import "./students.css";

const PER_PAGE = 10;

function statusClass(s: StudentStatus): string {
  const map: Record<StudentStatus, string> = {
    active: "asm-status-active",
    inactive: "asm-status-inactive",
    suspended: "asm-status-suspended",
  };
  return `asm-status ${map[s]}`;
}

export default function AdminStudentsPage() {
  const [searchTerm, setSearchTerm] = useState("");
  const [statusFilter, setStatusFilter] = useState<StudentStatus | "all">(
    "all"
  );
  const [countryFilter, setCountryFilter] = useState("all");
  const [quickFilter, setQuickFilter] = useState<"all" | "active" | "new">(
    "all"
  );
  const [page, setPage] = useState(1);

  const filtered = useMemo(() => {
    const now = new Date();
    const firstDayOfMonth = new Date(now.getFullYear(), now.getMonth(), 1);
    return STUDENTS.filter((s) => {
      const matchSearch =
        !searchTerm ||
        s.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
        s.email.toLowerCase().includes(searchTerm.toLowerCase());
      const matchStatus = statusFilter === "all" || s.status === statusFilter;
      const matchCountry =
        countryFilter === "all" || s.country === countryFilter;
      const matchQuick =
        quickFilter === "all" ||
        (quickFilter === "active" && s.status === "active") ||
        (quickFilter === "new" && new Date(s.joinDate) >= firstDayOfMonth);
      return matchSearch && matchStatus && matchCountry && matchQuick;
    });
  }, [searchTerm, statusFilter, countryFilter, quickFilter]);

  const totalPages = Math.max(1, Math.ceil(filtered.length / PER_PAGE));
  const currentPage = Math.min(page, totalPages);
  const start = (currentPage - 1) * PER_PAGE;
  const pageRows = filtered.slice(start, start + PER_PAGE);

  const totalStudents = STUDENTS.length;
  const activeStudents = STUDENTS.filter((s) => s.status === "active").length;
  const totalEnrollments = STUDENTS.reduce(
    (sum, s) => sum + s.enrolledCourses,
    0
  );
  const totalCertificates = STUDENTS.reduce(
    (sum, s) => sum + s.certificates,
    0
  );

  return (
    <div className="asm-page">
      <header className="asm-header">
        <div className="asm-header-row">
          <div className="asm-header-content">
            <h1 className="asm-title">Students Management</h1>
            <p className="asm-description">
              View, search, and manage all enrolled students and their progress.
            </p>
          </div>
          <div className="asm-filters" style={{ gap: 12 }}>
            <button type="button" className="asm-btn-secondary">
              <Download className="asm-btn-icon" strokeWidth={2} />
              Export
            </button>
            <Link href={ROUTES.ADMIN.STUDENTS} className="asm-btn-primary">
              <UserPlus className="asm-btn-icon" strokeWidth={2} />
              Add Student
            </Link>
          </div>
        </div>
      </header>

      <main className="asm-main">
        {/* Summary cards */}
        <div className="asm-cards">
          <div className="asm-card">
            <div className="asm-card-icon blue">
              <Users className="asm-btn-icon" strokeWidth={2} />
            </div>
            <p className="asm-card-label">Total Students</p>
            <p className="asm-card-value">{totalStudents}</p>
            <p className="asm-card-sub">All registered accounts</p>
          </div>
          <div className="asm-card">
            <div className="asm-card-icon green">
              <GraduationCap className="asm-btn-icon" strokeWidth={2} />
            </div>
            <p className="asm-card-label">Active</p>
            <p className="asm-card-value">{activeStudents}</p>
            <p className="asm-card-sub">Currently active</p>
          </div>
          <div className="asm-card">
            <div className="asm-card-icon violet">
              <BookOpen className="asm-btn-icon" strokeWidth={2} />
            </div>
            <p className="asm-card-label">Total Enrollments</p>
            <p className="asm-card-value">{totalEnrollments}</p>
            <p className="asm-card-sub">Across all courses</p>
          </div>
          <div className="asm-card">
            <div className="asm-card-icon amber">
              <Award className="asm-btn-icon" strokeWidth={2} />
            </div>
            <p className="asm-card-label">Certificates</p>
            <p className="asm-card-value">{totalCertificates}</p>
            <p className="asm-card-sub">Issued to date</p>
          </div>
        </div>

        {/* List card: toolbar + table */}
        <div className="asm-list-card">
          <div className="asm-toolbar">
            <div className="asm-search-wrap">
              <Search className="asm-search-icon" strokeWidth={2} aria-hidden />
              <input
                type="search"
                className="asm-search-input"
                placeholder="Search by name or email..."
                value={searchTerm}
                onChange={(e) => {
                  setSearchTerm(e.target.value);
                  setPage(1);
                }}
                aria-label="Search students"
              />
            </div>
            <div className="asm-filters">
              <div className="asm-chips">
                {(
                  [
                    { id: "all", label: "All" },
                    { id: "active", label: "Active" },
                    { id: "new", label: "New this month" },
                  ] as const
                ).map(({ id, label }) => (
                  <button
                    key={id}
                    type="button"
                    className={`asm-chip ${quickFilter === id ? "active" : ""}`}
                    onClick={() => {
                      setQuickFilter(id);
                      setPage(1);
                    }}
                  >
                    {label}
                  </button>
                ))}
              </div>
              <select
                className="asm-select"
                value={statusFilter}
                onChange={(e) => {
                  setStatusFilter(e.target.value as StudentStatus | "all");
                  setPage(1);
                }}
                aria-label="Filter by status"
              >
                {STATUS_OPTIONS.map((opt) => (
                  <option key={opt.value} value={opt.value}>
                    {opt.label}
                  </option>
                ))}
              </select>
              <select
                className="asm-select"
                value={countryFilter}
                onChange={(e) => {
                  setCountryFilter(e.target.value);
                  setPage(1);
                }}
                aria-label="Filter by country"
              >
                {COUNTRY_OPTIONS.map((opt) => (
                  <option key={opt.value} value={opt.value}>
                    {opt.label}
                  </option>
                ))}
              </select>
            </div>
          </div>

          <div className="asm-table-wrap">
            <table className="asm-table">
              <thead>
                <tr>
                  <th>Student</th>
                  <th>Email</th>
                  <th>Country</th>
                  <th>Enrolled</th>
                  <th>Completed</th>
                  <th>Certificates</th>
                  <th>Status</th>
                  <th>Actions</th>
                </tr>
              </thead>
              <tbody>
                {pageRows.length === 0 ? (
                  <tr>
                    <td colSpan={8} className="asm-empty">
                      <p className="asm-empty-title">No students found</p>
                      <p>
                        Try adjusting your search or filters to see more
                        results.
                      </p>
                    </td>
                  </tr>
                ) : (
                  pageRows.map((student) => (
                    <tr key={student.id}>
                      <td>
                        <div className="asm-student-cell">
                          {student.image ? (
                            <img
                              src={student.image}
                              alt=""
                              className="asm-avatar-img"
                            />
                          ) : (
                            <div
                              className="asm-avatar"
                              style={{
                                background:
                                  "linear-gradient(135deg, #6366f1 0%, #8b5cf6 100%)",
                              }}
                            >
                              {student.name
                                .split(" ")
                                .map((n) => n[0])
                                .join("")
                                .slice(0, 2)}
                            </div>
                          )}
                          <div>
                            <Link
                              href={ROUTES.ADMIN.STUDENT_OVERVIEW(student.id)}
                              className="asm-student-name asm-student-name-link"
                            >
                              {student.name}
                            </Link>
                            <p className="asm-student-meta">
                              Joined{" "}
                              {new Date(student.joinDate).toLocaleDateString(
                                undefined,
                                {
                                  month: "short",
                                  day: "numeric",
                                  year: "numeric",
                                }
                              )}
                            </p>
                          </div>
                        </div>
                      </td>
                      <td>
                        <span className="asm-email-cell">{student.email}</span>
                      </td>
                      <td>
                        <span className="asm-country-badge">
                          {student.countryLabel}
                        </span>
                      </td>
                      <td>
                        <span className="asm-stat-num">
                          {student.enrolledCourses}
                        </span>
                      </td>
                      <td>
                        <span className="asm-stat-num">
                          {student.completedCourses}
                        </span>
                      </td>
                      <td>
                        <span className="asm-stat-num">
                          {student.certificates}
                        </span>
                      </td>
                      <td>
                        <span className={statusClass(student.status)}>
                          <span className="asm-status-dot" aria-hidden />
                          {student.status}
                        </span>
                      </td>
                      <td>
                        <div className="asm-row-actions">
                          <Link
                            href={ROUTES.ADMIN.STUDENT_OVERVIEW(student.id)}
                            className="asm-action-btn"
                            title="View profile"
                            aria-label={`View ${student.name}`}
                          >
                            <Eye strokeWidth={2} />
                          </Link>
                          <button
                            type="button"
                            className="asm-action-btn"
                            title="Edit"
                            aria-label={`Edit ${student.name}`}
                          >
                            <Pencil strokeWidth={2} />
                          </button>
                          <button
                            type="button"
                            className="asm-action-btn"
                            title="More"
                            aria-label={`More actions for ${student.name}`}
                          >
                            <MoreHorizontal strokeWidth={2} />
                          </button>
                        </div>
                      </td>
                    </tr>
                  ))
                )}
              </tbody>
            </table>
          </div>

          {filtered.length > 0 && (
            <div className="asm-pagination">
              <p className="asm-pagination-text">
                Showing {start + 1}–
                {Math.min(start + PER_PAGE, filtered.length)} of{" "}
                {filtered.length}
              </p>
              <div className="asm-pagination-controls">
                <button
                  type="button"
                  className="asm-pagination-btn asm-pagination-num"
                  disabled={currentPage <= 1}
                  onClick={() => setPage((p) => Math.max(1, p - 1))}
                  aria-label="Previous page"
                >
                  <ChevronLeft strokeWidth={2} size={18} />
                </button>
                {Array.from({ length: totalPages }, (_, i) => i + 1)
                  .filter(
                    (n) =>
                      n === 1 ||
                      n === totalPages ||
                      (n >= currentPage - 2 && n <= currentPage + 2)
                  )
                  .map((n, i, arr) => (
                    <span key={n}>
                      {i > 0 && arr[i - 1] !== n - 1 && (
                        <span
                          className="asm-pagination-btn"
                          style={{ cursor: "default" }}
                        >
                          …
                        </span>
                      )}
                      <button
                        type="button"
                        className={`asm-pagination-btn asm-pagination-num ${
                          n === currentPage ? "active" : ""
                        }`}
                        onClick={() => setPage(n)}
                        aria-label={`Page ${n}`}
                        aria-current={n === currentPage ? "page" : undefined}
                      >
                        {n}
                      </button>
                    </span>
                  ))}
                <button
                  type="button"
                  className="asm-pagination-btn asm-pagination-num"
                  disabled={currentPage >= totalPages}
                  onClick={() => setPage((p) => Math.min(totalPages, p + 1))}
                  aria-label="Next page"
                >
                  <ChevronRight strokeWidth={2} size={18} />
                </button>
              </div>
            </div>
          )}
        </div>
      </main>
    </div>
  );
}
