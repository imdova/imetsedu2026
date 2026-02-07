"use client";

import { useState, useMemo } from "react";
import Link from "next/link";
import {
  Search,
  Download,
  Plus,
  LayoutGrid,
  List,
  Clock,
  Pencil,
  Trash2,
  Eye,
  FileText,
} from "lucide-react";
import { adminAssignmentsList } from "./assignments-data";
import "./assignments.css";

const adminAssignments = adminAssignmentsList;

type ViewMode = "table" | "grid";

const STATUS_OPTIONS = [
  { value: "all", label: "All statuses" },
  { value: "urgent", label: "Urgent" },
  { value: "regular", label: "Regular" },
];

const COURSE_OPTIONS = [
  { value: "all", label: "All courses" },
  ...Array.from(new Set(adminAssignments.map((a) => a.courseName))).map(
    (name) => ({ value: name, label: name })
  ),
];

export default function AdminAssignmentsPage() {
  const [searchTerm, setSearchTerm] = useState("");
  const [statusFilter, setStatusFilter] = useState("all");
  const [courseFilter, setCourseFilter] = useState("all");
  const [viewMode, setViewMode] = useState<ViewMode>("table");

  const filtered = useMemo(() => {
    return adminAssignments.filter((a) => {
      const matchSearch =
        !searchTerm ||
        a.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
        a.courseName.toLowerCase().includes(searchTerm.toLowerCase()) ||
        a.courseCode.toLowerCase().includes(searchTerm.toLowerCase());
      const matchStatus = statusFilter === "all" || a.status === statusFilter;
      const matchCourse =
        courseFilter === "all" || a.courseName === courseFilter;
      return matchSearch && matchStatus && matchCourse;
    });
  }, [searchTerm, statusFilter, courseFilter]);

  const totalCount = filtered.length;

  return (
    <div className="aa-page">
      {/* Header */}
      <div className="aa-header">
        <div className="aa-header-row">
          <div className="aa-title-wrap">
            <h1 className="aa-title">Assignments</h1>
            <span
              className="aa-count-badge"
              aria-label={`${totalCount} assignments`}
            >
              {totalCount}
            </span>
          </div>
          <div className="aa-header-actions">
            <div className="aa-view-toggle">
              <button
                type="button"
                className={`aa-view-btn ${viewMode === "grid" ? "active" : ""}`}
                onClick={() => setViewMode("grid")}
                aria-label="Grid view"
              >
                <LayoutGrid className="w-5 h-5" strokeWidth={2} />
              </button>
              <button
                type="button"
                className={`aa-view-btn ${
                  viewMode === "table" ? "active" : ""
                }`}
                onClick={() => setViewMode("table")}
                aria-label="List view"
              >
                <List className="w-5 h-5" strokeWidth={2} />
              </button>
            </div>
            <button type="button" className="aa-btn-download">
              <Download className="w-4 h-4" strokeWidth={2} />
              Download
            </button>
            <button type="button" className="aa-btn-add">
              <Plus className="w-5 h-5" strokeWidth={2} />
              Add Assignment
            </button>
          </div>
        </div>
      </div>

      {/* Filters */}
      <div className="aa-filters-wrap">
        <div className="aa-filters-row">
          <div className="aa-search-inner aa-search-inner-flex">
            <Search className="aa-search-icon" strokeWidth={2} aria-hidden />
            <input
              type="text"
              className="aa-search-input"
              placeholder="Search by title or course..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
            />
          </div>
          <div className="aa-filter-group">
            <label className="aa-filter-label" htmlFor="aa-status">
              Status
            </label>
            <select
              id="aa-status"
              className="aa-filter-select"
              value={statusFilter}
              onChange={(e) => setStatusFilter(e.target.value)}
              aria-label="Filter by status"
            >
              {STATUS_OPTIONS.map((opt) => (
                <option key={opt.value} value={opt.value}>
                  {opt.label}
                </option>
              ))}
            </select>
          </div>
          <div className="aa-filter-group">
            <label className="aa-filter-label" htmlFor="aa-course">
              Course
            </label>
            <select
              id="aa-course"
              className="aa-filter-select"
              value={courseFilter}
              onChange={(e) => setCourseFilter(e.target.value)}
              aria-label="Filter by course"
            >
              {COURSE_OPTIONS.map((opt) => (
                <option key={opt.value} value={opt.value}>
                  {opt.label}
                </option>
              ))}
            </select>
          </div>
        </div>
      </div>

      {/* Table view */}
      {viewMode === "table" && (
        <div className="aa-table-card">
          <div className="aa-table-wrap">
            <table className="aa-table">
              <thead>
                <tr>
                  <th>Assignment</th>
                  <th>Course</th>
                  <th>Due</th>
                  <th>Status</th>
                  <th>Submissions</th>
                  <th>Actions</th>
                </tr>
              </thead>
              <tbody>
                {filtered.map((a) => (
                  <tr key={a.id}>
                    <td>
                      <div className="aa-assignment-cell">
                        <div className="aa-assignment-icon-wrap">
                          <FileText
                            className="aa-assignment-icon"
                            strokeWidth={2}
                          />
                        </div>
                        <div>
                          <Link
                            href={`/admin/assignments/${a.id}`}
                            className="aa-assignment-title aa-assignment-title-link"
                          >
                            {a.title}
                          </Link>
                          <p className="aa-assignment-meta">
                            {a.courseCode}
                            {a.fileCount != null && ` · ${a.fileCount} file(s)`}
                          </p>
                        </div>
                      </div>
                    </td>
                    <td>
                      <span className="aa-course-name">{a.courseName}</span>
                    </td>
                    <td>
                      <div className="aa-due-cell">
                        <Clock className="aa-due-icon" strokeWidth={2} />
                        {a.dueCountdown}
                      </div>
                    </td>
                    <td>
                      <span className={`aa-status-pill ${a.status}`}>
                        {a.status === "urgent" ? "Urgent" : "Regular"}
                      </span>
                    </td>
                    <td>
                      <span className="aa-submissions-num">
                        {a.submissionsCount ?? 0}
                      </span>
                    </td>
                    <td>
                      <div className="aa-actions-cell">
                        <Link
                          href={`/admin/assignments/${a.id}`}
                          className="aa-action-btn view"
                          aria-label="View assignment"
                          title="View"
                        >
                          <Eye className="aa-action-icon" strokeWidth={2} />
                        </Link>
                        <button
                          type="button"
                          className="aa-action-btn edit"
                          aria-label="Edit assignment"
                          title="Edit"
                        >
                          <Pencil className="aa-action-icon" strokeWidth={2} />
                        </button>
                        <button
                          type="button"
                          className="aa-action-btn delete"
                          aria-label="Delete assignment"
                          title="Delete"
                        >
                          <Trash2 className="aa-action-icon" strokeWidth={2} />
                        </button>
                      </div>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
          <div className="aa-pagination">
            <p className="aa-pagination-text">
              Showing 1–{filtered.length} of {filtered.length} assignments
            </p>
          </div>
        </div>
      )}

      {/* Grid view */}
      {viewMode === "grid" && (
        <div className="aa-grid-wrap">
          {filtered.map((a) => (
            <div key={a.id} className="aa-grid-card">
              <div className="aa-grid-card-top">
                <div className="aa-grid-icon-wrap">
                  <FileText className="aa-grid-icon" strokeWidth={2} />
                </div>
                <div className="aa-grid-card-info">
                  <Link
                    href={`/admin/assignments/${a.id}`}
                    className="aa-grid-title aa-grid-title-link"
                  >
                    {a.title}
                  </Link>
                  <p className="aa-grid-course">{a.courseName}</p>
                </div>
              </div>
              <div className="aa-grid-meta">
                <span className="aa-due-cell">
                  <Clock className="aa-due-icon" strokeWidth={2} />
                  {a.dueCountdown}
                </span>
                <span className={`aa-status-pill ${a.status}`}>
                  {a.status === "urgent" ? "Urgent" : "Regular"}
                </span>
                <span className="aa-submissions-num">
                  {a.submissionsCount ?? 0} submissions
                </span>
              </div>
              <div className="aa-grid-actions">
                <Link
                  href={`/admin/assignments/${a.id}`}
                  className="aa-action-btn view"
                  aria-label="View"
                >
                  <Eye className="aa-action-icon" strokeWidth={2} />
                </Link>
                <button
                  type="button"
                  className="aa-action-btn edit"
                  aria-label="Edit"
                >
                  <Pencil className="aa-action-icon" strokeWidth={2} />
                </button>
                <button
                  type="button"
                  className="aa-action-btn delete"
                  aria-label="Delete"
                >
                  <Trash2 className="aa-action-icon" strokeWidth={2} />
                </button>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}
