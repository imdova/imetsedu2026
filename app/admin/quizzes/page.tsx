"use client";

import { useState, useMemo } from "react";
import Link from "next/link";
import {
  Search,
  Download,
  Plus,
  LayoutGrid,
  List,
  Eye,
  PlusCircle,
  Clock,
  ChevronDown,
  Pencil,
  Trash2,
} from "lucide-react";
import { mockQuizzes } from "@/lib/quizData";
import AddQuizModal from "./AddQuizModal";
import "./quizzes.css";

const MONTHS = [
  "Jan",
  "Feb",
  "Mar",
  "Apr",
  "May",
  "Jun",
  "Jul",
  "Aug",
  "Sep",
  "Oct",
  "Nov",
  "Dec",
];

function formatDate(iso: string): string {
  const [y, m, d] = iso.split("-").map(Number);
  const month = MONTHS[(m || 1) - 1];
  return `${month} ${d || 1}, ${y || ""}`;
}

type ViewMode = "table" | "grid";

const STATUS_OPTIONS = [
  { value: "all", label: "All statuses" },
  { value: "published", label: "Published" },
  { value: "not-published", label: "Not published" },
];

const DATE_RANGE_OPTIONS = [
  { value: "all", label: "All" },
  { value: "7d", label: "Last 7 days" },
  { value: "30d", label: "Last 30 days" },
  { value: "90d", label: "Last 90 days" },
];

export default function AdminQuizzesPage() {
  const [searchTerm, setSearchTerm] = useState("");
  const [statusFilter, setStatusFilter] = useState("all");
  const [dateRangeFilter, setDateRangeFilter] = useState("all");
  const [viewMode, setViewMode] = useState<ViewMode>("table");
  const [addQuizModalOpen, setAddQuizModalOpen] = useState(false);

  const filteredQuizzes = useMemo(() => {
    return mockQuizzes.filter((quiz) => {
      const matchesSearch =
        !searchTerm ||
        quiz.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
        (quiz.description &&
          quiz.description.toLowerCase().includes(searchTerm.toLowerCase()));
      const matchesStatus =
        statusFilter === "all" ||
        (statusFilter === "published" && quiz.isPublished) ||
        (statusFilter === "not-published" && !quiz.isPublished);
      return matchesSearch && matchesStatus;
    });
  }, [searchTerm, statusFilter, dateRangeFilter]);

  const totalCount = filteredQuizzes.length;

  return (
    <div className="qz-page">
      {/* Header */}
      <div className="qz-header">
        <div className="qz-header-row">
          <div className="qz-title-wrap">
            <h1 className="qz-title">Quizzes</h1>
            <span
              className="qz-count-badge"
              aria-label={`${totalCount} quizzes`}
            >
              {totalCount}
            </span>
          </div>
          <div className="qz-header-actions">
            <div className="qz-view-toggle">
              <button
                type="button"
                className={`qz-view-btn ${viewMode === "grid" ? "active" : ""}`}
                onClick={() => setViewMode("grid")}
                aria-label="Grid view"
              >
                <LayoutGrid className="w-5 h-5" strokeWidth={2} />
              </button>
              <button
                type="button"
                className={`qz-view-btn ${
                  viewMode === "table" ? "active" : ""
                }`}
                onClick={() => setViewMode("table")}
                aria-label="List view"
              >
                <List className="w-5 h-5" strokeWidth={2} />
              </button>
            </div>
            <button type="button" className="qz-btn-download">
              <Download className="w-4 h-4" strokeWidth={2} />
              Download
            </button>
            <button
              type="button"
              className="qz-btn-add"
              onClick={() => setAddQuizModalOpen(true)}
            >
              <Plus className="w-5 h-5" strokeWidth={2} />
              Add New
            </button>
          </div>
        </div>
      </div>

      {/* Filters */}
      <div className="qz-filters-wrap">
        <div className="qz-filters-row">
          <div className="qz-search-inner qz-search-inner-flex">
            <Search className="qz-search-icon" strokeWidth={2} aria-hidden />
            <input
              type="text"
              className="qz-search-input"
              placeholder="Search by name..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
            />
          </div>
          <div className="qz-filter-group">
            <label className="qz-filter-label" htmlFor="qz-status">
              Status
            </label>
            <select
              id="qz-status"
              className="qz-filter-select"
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
          <div className="qz-filter-group">
            <label className="qz-filter-label" htmlFor="qz-date-range">
              Date Range
            </label>
            <select
              id="qz-date-range"
              className="qz-filter-select"
              value={dateRangeFilter}
              onChange={(e) => setDateRangeFilter(e.target.value)}
              aria-label="Filter by date range"
            >
              {DATE_RANGE_OPTIONS.map((opt) => (
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
        <div className="qz-table-card">
          <div className="qz-table-wrap">
            <table className="qz-table">
              <thead>
                <tr>
                  <th>Quiz Title</th>
                  <th>Questions</th>
                  <th>Duration</th>
                  <th>Passing Score</th>
                  <th>Created At</th>
                  <th>Last Update</th>
                  <th>Status</th>
                  <th>Actions</th>
                </tr>
              </thead>
              <tbody>
                {filteredQuizzes.map((quiz) => (
                  <tr key={quiz.id}>
                    <td>
                      <p className="qz-quiz-title">{quiz.title}</p>
                      <p className="qz-quiz-desc">{quiz.description || "—"}</p>
                    </td>
                    <td>
                      <div className="qz-questions-num">
                        # {quiz.questions.length}
                      </div>
                      <div className="qz-questions-actions">
                        <button
                          type="button"
                          className="qz-q-icon-btn view"
                          aria-label="View questions"
                          title="View questions"
                        >
                          <Eye className="w-4 h-4" strokeWidth={2} />
                        </button>
                        <Link
                          href={`/admin/quizzes/${quiz.id}/build`}
                          className="qz-q-icon-btn add"
                          aria-label="Build questions"
                          title="Build questions"
                        >
                          <PlusCircle className="w-4 h-4" strokeWidth={2} />
                        </Link>
                      </div>
                    </td>
                    <td>
                      <div className="qz-duration">
                        <Clock
                          className="qz-duration-icon w-4 h-4"
                          strokeWidth={2}
                        />
                        {quiz.duration} min
                      </div>
                    </td>
                    <td>{quiz.passingScore}%</td>
                    <td style={{ color: "#64748b", fontSize: "13px" }}>
                      {formatDate(quiz.createdAt)}
                    </td>
                    <td style={{ color: "#64748b", fontSize: "13px" }}>
                      {formatDate(quiz.updatedAt)}
                    </td>
                    <td>
                      <span
                        className={`qz-status ${
                          quiz.isPublished ? "published" : "not-published"
                        }`}
                      >
                        {quiz.isPublished ? "Published" : "Not published"}
                        <ChevronDown className="w-3.5 h-3.5" strokeWidth={2} />
                      </span>
                    </td>
                    <td>
                      <div className="qz-actions-cell">
                        <Link
                          href={`/admin/quizzes/${quiz.id}/edit`}
                          className="qz-action-btn edit"
                          aria-label="Edit quiz"
                          title="Edit"
                        >
                          <Pencil className="qz-action-icon" strokeWidth={2} />
                        </Link>
                        <button
                          type="button"
                          className="qz-action-btn delete"
                          aria-label="Delete quiz"
                          title="Delete"
                        >
                          <Trash2 className="qz-action-icon" strokeWidth={2} />
                        </button>
                      </div>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      )}

      {/* Grid view */}
      {viewMode === "grid" && (
        <div
          className="qz-table-card"
          style={{ margin: "0 28px", padding: "20px" }}
        >
          <div
            style={{
              display: "grid",
              gridTemplateColumns: "repeat(auto-fill, minmax(280px, 1fr))",
              gap: "20px",
            }}
          >
            {filteredQuizzes.map((quiz) => (
              <div
                key={quiz.id}
                style={{
                  background: "#fff",
                  border: "1px solid #e2e8f0",
                  borderRadius: "12px",
                  padding: "20px",
                }}
              >
                <p className="qz-quiz-title" style={{ marginBottom: "4px" }}>
                  {quiz.title}
                </p>
                <p className="qz-quiz-desc" style={{ marginBottom: "12px" }}>
                  {quiz.description || "—"}
                </p>
                <div
                  style={{
                    fontSize: "13px",
                    color: "#64748b",
                    marginBottom: "12px",
                  }}
                >
                  # {quiz.questions.length} questions · {quiz.duration} min ·{" "}
                  {quiz.passingScore}%
                </div>
                <span
                  className={`qz-status ${
                    quiz.isPublished ? "published" : "not-published"
                  }`}
                  style={{ marginBottom: "12px", display: "inline-flex" }}
                >
                  {quiz.isPublished ? "Published" : "Not published"}
                </span>
                <div className="qz-actions-cell" style={{ marginTop: "12px" }}>
                  <Link
                    href={`/admin/quizzes/${quiz.id}/edit`}
                    className="qz-action-btn edit"
                    aria-label="Edit quiz"
                  >
                    <Pencil className="qz-action-icon" strokeWidth={2} />
                  </Link>
                  <button
                    type="button"
                    className="qz-action-btn delete"
                    aria-label="Delete quiz"
                  >
                    <Trash2 className="qz-action-icon" strokeWidth={2} />
                  </button>
                </div>
              </div>
            ))}
          </div>
        </div>
      )}

      {addQuizModalOpen && (
        <AddQuizModal
          onClose={() => setAddQuizModalOpen(false)}
          onNext={() => setAddQuizModalOpen(false)}
        />
      )}
    </div>
  );
}
