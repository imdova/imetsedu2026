"use client";

import { useState, useMemo } from "react";
import Link from "next/link";
import {
  Search,
  Bell,
  Users,
  Star,
  Radio,
  UserPlus,
  Filter,
  Download,
  Sparkles,
  TrendingUp,
  ChevronLeft,
  ChevronRight,
  ChevronUp,
  ChevronDown,
  X,
} from "lucide-react";
import { ROUTES } from "@/constants";
import "./instructors.css";

type InstructorStatus = "active" | "inactive" | "pending";

interface InstructorRow {
  id: string;
  name: string;
  role: string;
  specialty: string;
  assignedGroups: string[];
  rating: number;
  engagement: number;
  status: InstructorStatus;
  image?: string;
}

type SortKey = "name" | "specialty" | "rating" | "engagement" | "groups";

const MOCK_INSTRUCTORS: InstructorRow[] = [
  {
    id: "1",
    name: "Dr. Sarah Chen",
    role: "Senior Faculty",
    specialty: "Data Science",
    assignedGroups: ["G-101", "B-202"],
    rating: 4.9,
    engagement: 92,
    status: "active",
    image: "https://i.pravatar.cc/48?img=1",
  },
  {
    id: "2",
    name: "Marcus Thorne",
    role: "Lead Instructor",
    specialty: "UI/UX Design",
    assignedGroups: ["B-201"],
    rating: 4.7,
    engagement: 88,
    status: "active",
    image: "https://i.pravatar.cc/48?img=2",
  },
  {
    id: "3",
    name: "Dr. Elena Rodriguez",
    role: "Faculty",
    specialty: "Business Analytics",
    assignedGroups: [],
    rating: 4.8,
    engagement: 85,
    status: "pending",
    image: "https://i.pravatar.cc/48?img=3",
  },
  {
    id: "4",
    name: "Prof. James Wilson",
    role: "Senior Faculty",
    specialty: "Machine Learning",
    assignedGroups: ["G-101", "G-303"],
    rating: 4.6,
    engagement: 78,
    status: "active",
    image: "https://i.pravatar.cc/48?img=4",
  },
  {
    id: "5",
    name: "Dr. Amy Liu",
    role: "Faculty",
    specialty: "Data Science",
    assignedGroups: ["B-202"],
    rating: 4.9,
    engagement: 95,
    status: "active",
    image: "https://i.pravatar.cc/48?img=5",
  },
  {
    id: "6",
    name: "David Park",
    role: "Instructor",
    specialty: "Programming",
    assignedGroups: ["G-101"],
    rating: 4.5,
    engagement: 72,
    status: "inactive",
    image: "https://i.pravatar.cc/48?img=6",
  },
  {
    id: "7",
    name: "Dr. Maria Santos",
    role: "Senior Faculty",
    specialty: "Management",
    assignedGroups: ["B-201", "B-202"],
    rating: 4.8,
    engagement: 90,
    status: "active",
    image: "https://i.pravatar.cc/48?img=7",
  },
  {
    id: "8",
    name: "Chris Taylor",
    role: "Lead Instructor",
    specialty: "UI/UX Design",
    assignedGroups: ["G-303"],
    rating: 4.4,
    engagement: 65,
    status: "active",
    image: "https://i.pravatar.cc/48?img=8",
  },
  {
    id: "9",
    name: "Dr. Nina Patel",
    role: "Faculty",
    specialty: "Business Analytics",
    assignedGroups: ["G-101", "B-201"],
    rating: 4.7,
    engagement: 82,
    status: "active",
    image: "https://i.pravatar.cc/48?img=9",
  },
  {
    id: "10",
    name: "Alex Kim",
    role: "Instructor",
    specialty: "Programming",
    assignedGroups: [],
    rating: 4.3,
    engagement: 70,
    status: "pending",
    image: "https://i.pravatar.cc/48?img=10",
  },
];

const SMART_MATCH_ITEMS = [
  {
    groupId: "G-505",
    matchPercent: 98,
    courseName: "Advanced Algorithms",
    instructorName: "Dr. Sarah Chen",
    instructorImage: "https://i.pravatar.cc/40?img=1",
    availability: "Available Tue/Thu",
  },
  {
    groupId: "B-201",
    matchPercent: 85,
    courseName: "UI Foundations",
    instructorName: "Marcus Thorne",
    instructorImage: "https://i.pravatar.cc/40?img=2",
    availability: "Available Mon/Wed",
  },
];

const TOTAL_FACULTY = 124;
const AVG_RATING = 4.8;
const ACTIVE_SESSIONS = 18;
const PENDING_ONBOARDING = 7;
const PER_PAGE = 10;

function engagementBarColor(pct: number): string {
  if (pct >= 85) return "ai-eng-high";
  if (pct >= 70) return "ai-eng-mid";
  return "ai-eng-low";
}

const SPECIALTIES = Array.from(
  new Set(MOCK_INSTRUCTORS.map((i) => i.specialty))
).sort();

const STATUS_OPTIONS: { value: "" | InstructorStatus; label: string }[] = [
  { value: "", label: "All statuses" },
  { value: "active", label: "Active" },
  { value: "inactive", label: "Inactive" },
  { value: "pending", label: "Pending" },
];

const ROLE_OPTIONS = ["Senior Faculty", "Lead Instructor", "Faculty", "Instructor"];

export default function AdminInstructorsPage() {
  const [instructorsList, setInstructorsList] = useState<InstructorRow[]>(MOCK_INSTRUCTORS);
  const [searchTerm, setSearchTerm] = useState("");
  const [filterSpecialty, setFilterSpecialty] = useState("");
  const [filterStatus, setFilterStatus] = useState<"" | InstructorStatus>("");
  const [sortBy, setSortBy] = useState<SortKey>("name");
  const [sortDir, setSortDir] = useState<"asc" | "desc">("asc");
  const [page, setPage] = useState(1);
  const [showAddModal, setShowAddModal] = useState(false);
  const [addForm, setAddForm] = useState({
    name: "",
    email: "",
    role: "Faculty",
    specialty: SPECIALTIES[0] ?? "Data Science",
    status: "pending" as InstructorStatus,
  });

  const filtered = useMemo(() => {
    let list = instructorsList.filter((i) => {
      const matchSearch =
        !searchTerm.trim() ||
        i.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
        i.specialty.toLowerCase().includes(searchTerm.toLowerCase()) ||
        i.role.toLowerCase().includes(searchTerm.toLowerCase());
      const matchSpecialty =
        !filterSpecialty || i.specialty === filterSpecialty;
      const matchStatus = !filterStatus || i.status === filterStatus;
      return matchSearch && matchSpecialty && matchStatus;
    });
    list = [...list].sort((a, b) => {
      let cmp = 0;
      switch (sortBy) {
        case "name":
          cmp = a.name.localeCompare(b.name);
          break;
        case "specialty":
          cmp = a.specialty.localeCompare(b.specialty);
          break;
        case "rating":
          cmp = a.rating - b.rating;
          break;
        case "engagement":
          cmp = a.engagement - b.engagement;
          break;
        case "groups":
          cmp = a.assignedGroups.length - b.assignedGroups.length;
          break;
        default:
          break;
      }
      return sortDir === "asc" ? cmp : -cmp;
    });
    return list;
  }, [instructorsList, searchTerm, filterSpecialty, filterStatus, sortBy, sortDir]);

  const handleAddInstructor = (e: React.FormEvent) => {
    e.preventDefault();
    if (!addForm.name.trim()) return;
    const newInstructor: InstructorRow = {
      id: `new-${Date.now()}`,
      name: addForm.name.trim(),
      role: addForm.role,
      specialty: addForm.specialty,
      assignedGroups: [],
      rating: 0,
      engagement: 0,
      status: addForm.status,
    };
    setInstructorsList((prev) => [newInstructor, ...prev]);
    setShowAddModal(false);
    setAddForm({
      name: "",
      email: "",
      role: "Faculty",
      specialty: SPECIALTIES[0] ?? "Data Science",
      status: "pending",
    });
    setPage(1);
  };

  const totalPages = Math.ceil(filtered.length / PER_PAGE) || 1;
  const currentPage = Math.min(page, totalPages);
  const start = (currentPage - 1) * PER_PAGE;
  const paginated = filtered.slice(start, start + PER_PAGE);

  const handleSort = (key: SortKey) => {
    if (sortBy === key) {
      setSortDir((d) => (d === "asc" ? "desc" : "asc"));
    } else {
      setSortBy(key);
      setSortDir("asc");
    }
    setPage(1);
  };

  const SortIcon = ({ column }: { column: SortKey }) =>
    sortBy !== column ? null : sortDir === "asc" ? (
      <ChevronUp className="ai-sort-icon" strokeWidth={2} aria-hidden />
    ) : (
      <ChevronDown className="ai-sort-icon" strokeWidth={2} aria-hidden />
    );

  return (
    <div className="ai-page">
      {/* Top header bar */}
      <header className="ai-header">
        <div className="ai-search-wrap">
          <Search className="ai-search-icon" strokeWidth={2} aria-hidden />
          <input
            type="search"
            placeholder="Search faculty, specialties, or sessions..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className="ai-search-input"
            aria-label="Search faculty, specialties, or sessions"
          />
        </div>
        <div className="ai-header-right">
          <button
            type="button"
            className="ai-btn-add-instructor"
            onClick={() => setShowAddModal(true)}
          >
            <UserPlus className="w-4 h-4" strokeWidth={2} /> Add Instructor
          </button>
          <button type="button" className="ai-bell" aria-label="Notifications">
            <Bell className="w-5 h-5" strokeWidth={2} />
          </button>
          <div className="ai-user-info">
            <span className="ai-user-name">Admin User</span>
            <span className="ai-user-role">Super Admin</span>
          </div>
          <div className="ai-avatar" aria-hidden>
            <span>A</span>
          </div>
        </div>
      </header>

      <div className="ai-content">
        {/* Stat cards */}
        <div className="ai-stats">
          <div className="ai-stat-card">
            <Users className="ai-stat-icon" strokeWidth={2} />
            <div className="ai-stat-main">
              <span className="ai-stat-value">{TOTAL_FACULTY}</span>
              <span className="ai-stat-label">Total Faculty</span>
            </div>
            <span className="ai-stat-badge ai-stat-badge-green">
              <TrendingUp className="w-3 h-3" strokeWidth={2} /> +12%
            </span>
          </div>
          <div className="ai-stat-card">
            <Star className="ai-stat-icon" strokeWidth={2} />
            <div className="ai-stat-main">
              <span className="ai-stat-value">{AVG_RATING}</span>
              <div className="ai-stat-stars" aria-label={`${AVG_RATING} out of 5`}>
                {[1, 2, 3, 4, 5].map((i) => (
                  <Star key={i} className="ai-stat-star" fill="currentColor" strokeWidth={0} />
                ))}
              </div>
              <span className="ai-stat-label">Avg. Instructor Rating</span>
            </div>
            <span className="ai-stat-badge ai-stat-badge-green">
              <TrendingUp className="w-3 h-3" strokeWidth={2} /> +0.4
            </span>
          </div>
          <div className="ai-stat-card">
            <Radio className="ai-stat-icon" strokeWidth={2} />
            <div className="ai-stat-main">
              <span className="ai-stat-value">{ACTIVE_SESSIONS}</span>
              <span className="ai-stat-label">Active Live Sessions</span>
            </div>
            <span className="ai-stat-badge ai-stat-badge-live">Live</span>
          </div>
          <div className="ai-stat-card">
            <UserPlus className="ai-stat-icon" strokeWidth={2} />
            <div className="ai-stat-main">
              <span className="ai-stat-value">{PENDING_ONBOARDING}</span>
              <span className="ai-stat-label">Pending Onboarding</span>
            </div>
            <span className="ai-stat-badge ai-stat-badge-urgent">URGENT</span>
          </div>
        </div>

        {/* Main + sidebar */}
        <div className="ai-main-wrap">
          {/* Instructor Directory */}
          <div className="ai-directory-card">
            <div className="ai-directory-header">
              <div>
                <h2 className="ai-directory-title">Instructor Directory</h2>
                <p className="ai-directory-subtitle">
                  Manage {filtered.length} faculty members
                </p>
              </div>
              <div className="ai-directory-actions">
                <button
                  type="button"
                  className="ai-btn-add-instructor ai-btn-add-instructor-secondary"
                  onClick={() => setShowAddModal(true)}
                >
                  <UserPlus className="w-4 h-4" strokeWidth={2} /> Add Instructor
                </button>
                <button type="button" className="ai-btn-secondary">
                  <Filter className="w-4 h-4" strokeWidth={2} /> Filter
                </button>
                <button type="button" className="ai-btn-secondary">
                  <Download className="w-4 h-4" strokeWidth={2} /> Export
                </button>
              </div>
            </div>
            <div className="ai-filters-row">
              <div className="ai-filter-group">
                <label htmlFor="ai-filter-specialty" className="ai-filter-label">
                  Specialty
                </label>
                <select
                  id="ai-filter-specialty"
                  className="ai-filter-select"
                  value={filterSpecialty}
                  onChange={(e) => {
                    setFilterSpecialty(e.target.value);
                    setPage(1);
                  }}
                  aria-label="Filter by specialty"
                >
                  <option value="">All specialties</option>
                  {SPECIALTIES.map((s) => (
                    <option key={s} value={s}>
                      {s}
                    </option>
                  ))}
                </select>
              </div>
              <div className="ai-filter-group">
                <label htmlFor="ai-filter-status" className="ai-filter-label">
                  Status
                </label>
                <select
                  id="ai-filter-status"
                  className="ai-filter-select"
                  value={filterStatus}
                  onChange={(e) => {
                    setFilterStatus((e.target.value || "") as "" | InstructorStatus);
                    setPage(1);
                  }}
                  aria-label="Filter by status"
                >
                  {STATUS_OPTIONS.map((opt) => (
                    <option key={opt.value || "all"} value={opt.value}>
                      {opt.label}
                    </option>
                  ))}
                </select>
              </div>
            </div>
            <div className="ai-table-wrap">
              <table className="ai-table">
                <thead>
                  <tr>
                    <th className="ai-th-instructor ai-th-sortable">
                      <button
                        type="button"
                        className="ai-th-sort-btn"
                        onClick={() => handleSort("name")}
                        aria-sort={sortBy === "name" ? (sortDir === "asc" ? "ascending" : "descending") : undefined}
                      >
                        INSTRUCTOR
                        <SortIcon column="name" />
                      </button>
                    </th>
                    <th className="ai-th-sortable">
                      <button
                        type="button"
                        className="ai-th-sort-btn"
                        onClick={() => handleSort("specialty")}
                        aria-sort={sortBy === "specialty" ? (sortDir === "asc" ? "ascending" : "descending") : undefined}
                      >
                        SPECIALTY
                        <SortIcon column="specialty" />
                      </button>
                    </th>
                    <th className="ai-th-sortable">
                      <button
                        type="button"
                        className="ai-th-sort-btn"
                        onClick={() => handleSort("groups")}
                        aria-sort={sortBy === "groups" ? (sortDir === "asc" ? "ascending" : "descending") : undefined}
                      >
                        ASSIGNED GROUPS
                        <SortIcon column="groups" />
                      </button>
                    </th>
                    <th className="ai-th-sortable">
                      <button
                        type="button"
                        className="ai-th-sort-btn"
                        onClick={() => handleSort("rating")}
                        aria-sort={sortBy === "rating" ? (sortDir === "asc" ? "ascending" : "descending") : undefined}
                      >
                        RATING
                        <SortIcon column="rating" />
                      </button>
                    </th>
                    <th className="ai-th-sortable">
                      <button
                        type="button"
                        className="ai-th-sort-btn"
                        onClick={() => handleSort("engagement")}
                        aria-sort={sortBy === "engagement" ? (sortDir === "asc" ? "ascending" : "descending") : undefined}
                      >
                        ENGAGEMENT
                        <SortIcon column="engagement" />
                      </button>
                    </th>
                    <th>STATUS</th>
                  </tr>
                </thead>
                <tbody>
                  {paginated.map((row) => (
                    <tr key={row.id}>
                      <td>
                        <div className="ai-cell-instructor">
                          {row.image ? (
                            <img
                              src={row.image}
                              alt=""
                              className="ai-instructor-avatar"
                            />
                          ) : (
                            <div className="ai-instructor-avatar ai-instructor-avatar-placeholder">
                              {row.name
                                .split(" ")
                                .map((n) => n[0])
                                .join("")}
                            </div>
                          )}
                          <div>
                            <Link
                              href={ROUTES.ADMIN.INSTRUCTOR(row.id)}
                              className="ai-instructor-name ai-instructor-name-link"
                            >
                              {row.name}
                            </Link>
                            <span className="ai-instructor-role">{row.role}</span>
                          </div>
                        </div>
                      </td>
                      <td className="ai-cell-specialty">{row.specialty}</td>
                      <td>
                        {row.assignedGroups.length > 0 ? (
                          <div className="ai-groups">
                            {row.assignedGroups.map((g) => (
                              <a key={g} href="#" className="ai-group-link">
                                {g}
                              </a>
                            ))}
                          </div>
                        ) : (
                          <span className="ai-unassigned">Unassigned</span>
                        )}
                      </td>
                      <td>
                        <div className="ai-rating-cell">
                          <Star className="ai-rating-star" fill="currentColor" strokeWidth={0} />
                          <span>{row.rating.toFixed(1)}</span>
                        </div>
                      </td>
                      <td>
                        <div className="ai-engagement-cell">
                          <div className="ai-engagement-bar-wrap">
                            <div
                              className={`ai-engagement-bar ${engagementBarColor(row.engagement)}`}
                              style={{ width: `${row.engagement}%` }}
                            />
                          </div>
                          <span className="ai-engagement-pct">{row.engagement}%</span>
                        </div>
                      </td>
                      <td>
                        <span className={`ai-status-badge ai-status-${row.status}`}>
                          {row.status.charAt(0).toUpperCase() + row.status.slice(1)}
                        </span>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
            <div className="ai-pagination">
              <span className="ai-pagination-text">
                Showing {start + 1}-{Math.min(start + PER_PAGE, filtered.length)} of{" "}
                {filtered.length} instructors
              </span>
              <div className="ai-pagination-btns">
                <button
                  type="button"
                  className="ai-pagination-btn"
                  onClick={() => setPage((p) => Math.max(1, p - 1))}
                  disabled={currentPage <= 1}
                  aria-label="Previous page"
                >
                  <ChevronLeft className="w-4 h-4" strokeWidth={2} />
                </button>
                <button
                  type="button"
                  className="ai-pagination-btn"
                  onClick={() => setPage((p) => Math.min(totalPages, p + 1))}
                  disabled={currentPage >= totalPages}
                  aria-label="Next page"
                >
                  <ChevronRight className="w-4 h-4" strokeWidth={2} />
                </button>
              </div>
            </div>
          </div>

          {/* Right sidebar */}
          <aside className="ai-sidebar">
            <div className="ai-smart-match">
              <div className="ai-smart-match-header">
                <Sparkles className="w-5 h-5" strokeWidth={2} />
                <div>
                  <h3 className="ai-smart-match-title">Smart Match</h3>
                  <p className="ai-smart-match-subtitle">
                    AI-suggested instructors for unassigned groups based on expertise.
                  </p>
                </div>
              </div>
              <ul className="ai-smart-match-list">
                {SMART_MATCH_ITEMS.map((item) => (
                  <li key={item.groupId} className="ai-smart-match-item">
                    <span
                      className={`ai-match-badge ${
                        item.matchPercent >= 95 ? "ai-match-high" : "ai-match-mid"
                      }`}
                    >
                      {item.matchPercent}% Match
                    </span>
                    <p className="ai-match-course">{item.courseName}</p>
                    <div className="ai-match-instructor">
                      <img
                        src={item.instructorImage}
                        alt=""
                        className="ai-match-avatar"
                      />
                      <div>
                        <span className="ai-match-name">{item.instructorName}</span>
                        <span className="ai-match-avail">{item.availability}</span>
                      </div>
                    </div>
                    <button type="button" className="ai-quick-assign">
                      Quick Assign
                    </button>
                  </li>
                ))}
              </ul>
              <a href="#" className="ai-view-all">
                View All Suggestions →
              </a>
            </div>
            <div className="ai-satisfaction">
              <h3 className="ai-satisfaction-title">
                <TrendingUp className="w-5 h-5" strokeWidth={2} />
                Staff Satisfaction
              </h3>
              <div className="ai-satisfaction-item">
                <div className="ai-sat-circle ai-sat-green">
                  <span>94%</span>
                </div>
                <div className="ai-sat-content">
                  <span className="ai-sat-label">Resource Access</span>
                  <div className="ai-sat-bar-wrap">
                    <div className="ai-sat-bar ai-sat-bar-green" style={{ width: "94%" }} />
                  </div>
                </div>
              </div>
              <div className="ai-satisfaction-item">
                <div className="ai-sat-circle ai-sat-blue">
                  <span>88%</span>
                </div>
                <div className="ai-sat-content">
                  <span className="ai-sat-label">Work-Life Balance</span>
                  <div className="ai-sat-bar-wrap">
                    <div className="ai-sat-bar ai-sat-bar-blue" style={{ width: "88%" }} />
                  </div>
                </div>
              </div>
            </div>
          </aside>
        </div>
      </div>

      {/* Add Instructor modal */}
      {showAddModal && (
        <div
          className="ai-modal-overlay"
          onClick={() => setShowAddModal(false)}
          role="dialog"
          aria-modal="true"
          aria-labelledby="ai-modal-title"
        >
          <div
            className="ai-modal"
            onClick={(e) => e.stopPropagation()}
          >
            <div className="ai-modal-header">
              <h2 id="ai-modal-title" className="ai-modal-title">
                Add Instructor
              </h2>
              <button
                type="button"
                className="ai-modal-close"
                onClick={() => setShowAddModal(false)}
                aria-label="Close"
              >
                <X className="w-5 h-5" strokeWidth={2} />
              </button>
            </div>
            <form onSubmit={handleAddInstructor} className="ai-modal-body">
              <div className="ai-modal-field">
                <label htmlFor="ai-add-name" className="ai-modal-label">
                  Full name <span className="ai-modal-required">*</span>
                </label>
                <input
                  id="ai-add-name"
                  type="text"
                  className="ai-modal-input"
                  value={addForm.name}
                  onChange={(e) => setAddForm((f) => ({ ...f, name: e.target.value }))}
                  placeholder="e.g. Dr. Jane Smith"
                  required
                />
              </div>
              <div className="ai-modal-field">
                <label htmlFor="ai-add-email" className="ai-modal-label">
                  Email
                </label>
                <input
                  id="ai-add-email"
                  type="email"
                  className="ai-modal-input"
                  value={addForm.email}
                  onChange={(e) => setAddForm((f) => ({ ...f, email: e.target.value }))}
                  placeholder="e.g. jane.smith@imets.edu"
                />
              </div>
              <div className="ai-modal-row">
                <div className="ai-modal-field">
                  <label htmlFor="ai-add-role" className="ai-modal-label">
                    Role
                  </label>
                  <select
                    id="ai-add-role"
                    className="ai-modal-input"
                    value={addForm.role}
                    onChange={(e) => setAddForm((f) => ({ ...f, role: e.target.value }))}
                  >
                    {ROLE_OPTIONS.map((r) => (
                      <option key={r} value={r}>
                        {r}
                      </option>
                    ))}
                  </select>
                </div>
                <div className="ai-modal-field">
                  <label htmlFor="ai-add-specialty" className="ai-modal-label">
                    Specialty
                  </label>
                  <select
                    id="ai-add-specialty"
                    className="ai-modal-input"
                    value={addForm.specialty}
                    onChange={(e) => setAddForm((f) => ({ ...f, specialty: e.target.value }))}
                  >
                    {SPECIALTIES.map((s) => (
                      <option key={s} value={s}>
                        {s}
                      </option>
                    ))}
                  </select>
                </div>
              </div>
              <div className="ai-modal-field">
                <label htmlFor="ai-add-status" className="ai-modal-label">
                  Status
                </label>
                <select
                  id="ai-add-status"
                  className="ai-modal-input"
                  value={addForm.status}
                  onChange={(e) =>
                    setAddForm((f) => ({ ...f, status: e.target.value as InstructorStatus }))
                  }
                >
                  <option value="pending">Pending</option>
                  <option value="active">Active</option>
                  <option value="inactive">Inactive</option>
                </select>
              </div>
              <div className="ai-modal-footer">
                <button
                  type="button"
                  className="ai-btn-secondary"
                  onClick={() => setShowAddModal(false)}
                >
                  Cancel
                </button>
                <button type="submit" className="ai-modal-submit">
                  Add Instructor
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
}
