"use client";

import "./groups.css";
import { useState, useMemo } from "react";
import Link from "next/link";
import { ROUTES } from "@/constants";
import {
  ChevronDown,
  Plus,
  Users,
  UserPlus,
  Clock,
  GraduationCap,
  ChevronLeft,
  ChevronRight,
  Pencil,
  Copy,
  Trash2,
  Search,
} from "lucide-react";
import {
  groupsSummary,
  groupsList,
  type GroupRow,
} from "./groups-data";

const PER_PAGE = 4;

export default function GroupsManagementPage() {
  const [searchQuery, setSearchQuery] = useState("");
  const [courseCategory, setCourseCategory] = useState("All");
  const [subCategory, setSubCategory] = useState("All");
  const [page, setPage] = useState(1);

  const filteredGroups = useMemo(() => {
    return groupsList.filter((g) => {
      const matchSearch =
        !searchQuery.trim() ||
        g.groupName.toLowerCase().includes(searchQuery.toLowerCase()) ||
        g.courseTitle.toLowerCase().includes(searchQuery.toLowerCase()) ||
        g.instructorName.toLowerCase().includes(searchQuery.toLowerCase());
      const matchCategory =
        courseCategory === "All" || g.category === courseCategory;
      const matchSubCategory =
        subCategory === "All" || g.subCategory === subCategory;
      return matchSearch && matchCategory && matchSubCategory;
    });
  }, [searchQuery, courseCategory, subCategory]);

  const totalPages = Math.ceil(filteredGroups.length / PER_PAGE) || 1;
  const currentPage = Math.min(page, totalPages);
  const paginatedGroups = useMemo(
    () =>
      filteredGroups.slice(
        (currentPage - 1) * PER_PAGE,
        currentPage * PER_PAGE
      ),
    [filteredGroups, currentPage]
  );

  const startItem = (currentPage - 1) * PER_PAGE + 1;
  const endItem = Math.min(currentPage * PER_PAGE, filteredGroups.length);

  return (
    <div className="gm-page">
      {/* Breadcrumb */}
      <div className="gm-breadcrumb">
        <nav className="gm-breadcrumb-nav">
          <Link href={ROUTES.ADMIN.DASHBOARD}>Admin</Link>
          <span className="gm-breadcrumb-sep">&gt;</span>
          <span className="gm-breadcrumb-current">Groups Management</span>
        </nav>
      </div>

      <div className="gm-main">
        {/* Title row */}
        <div className="gm-header">
          <div>
            <h1 className="gm-title">Groups Management</h1>
            <p className="gm-desc">
              Manage and monitor all active and upcoming academic study groups,
              assign instructors, and track student capacity.
            </p>
          </div>
          <Link href={ROUTES.ADMIN.GROUPS + "/new"} className="gm-btn-create">
            <Plus strokeWidth={2.5} />
            Create New Group
          </Link>
        </div>

        {/* Search + Filters */}
        <div className="gm-filter-card">
          <div className="gm-filter-row">
            <div className="gm-search-wrap">
              <Search className="gm-search-icon" strokeWidth={2} />
              <input
                type="search"
                value={searchQuery}
                onChange={(e) => {
                  setSearchQuery(e.target.value);
                  setPage(1);
                }}
                placeholder="Search groups, course, instructor..."
                className="gm-search-input"
                aria-label="Search groups"
              />
            </div>
            <div className="gm-select-wrap">
              <GraduationCap className="gm-select-icon" strokeWidth={2} />
              <select
                value={courseCategory}
                onChange={(e) => {
                  setCourseCategory(e.target.value);
                  setSubCategory("All");
                }}
                aria-label="Category"
              >
                <option value="All">Category</option>
                <option value="Technology">Technology</option>
                <option value="Business">Business</option>
                <option value="Management">Management</option>
              </select>
              <ChevronDown className="gm-chevron" strokeWidth={2} />
            </div>
            <div className="gm-select-wrap">
              <GraduationCap className="gm-select-icon" strokeWidth={2} />
              <select
                value={subCategory}
                onChange={(e) => setSubCategory(e.target.value)}
                aria-label="Sub-Category"
              >
                <option value="All">Sub-Category</option>
                <option value="Programming">Programming</option>
                <option value="Data Science">Data Science</option>
                <option value="MBA">MBA</option>
                <option value="Project Management">Project Management</option>
              </select>
              <ChevronDown className="gm-chevron" strokeWidth={2} />
            </div>
          </div>
        </div>

        {/* Table */}
        <div className="gm-table-card">
          <div style={{ overflowX: "auto" }}>
            <table className="gm-table">
              <thead>
                <tr>
                  <th>Group Name</th>
                  <th>Period</th>
                  <th>Study Days</th>
                  <th>Created At</th>
                  <th>Students</th>
                  <th>Instructor</th>
                  <th>Assigned LMS</th>
                  <th>Status</th>
                  <th style={{ textAlign: "right" }}>Actions</th>
                </tr>
              </thead>
              <tbody>
                {paginatedGroups.map((group) => (
                  <GroupRow key={group.id} group={group} />
                ))}
              </tbody>
            </table>
          </div>

          {/* Pagination */}
          <div className="gm-pagination">
            <p className="gm-pagination-text">
              Showing {startItem} to {endItem} of {filteredGroups.length} groups
            </p>
            <div className="gm-pagination-controls">
              <button
                type="button"
                className="gm-pagination-btn"
                onClick={() => setPage((p) => Math.max(1, p - 1))}
                disabled={currentPage <= 1}
                aria-label="Previous page"
              >
                <ChevronLeft className="w-4 h-4" strokeWidth={2} />
              </button>
              {[1, 2, 3].map((p) => (
                <button
                  key={p}
                  type="button"
                  className={`gm-pagination-btn ${
                    currentPage === p ? "active" : ""
                  }`}
                  onClick={() => setPage(p)}
                >
                  {p}
                </button>
              ))}
              <span className="gm-pagination-ellipsis">...</span>
              <button
                type="button"
                className="gm-pagination-btn"
                onClick={() => setPage((p) => Math.min(totalPages, p + 1))}
                disabled={currentPage >= totalPages}
                aria-label="Next page"
              >
                <ChevronRight className="w-4 h-4" strokeWidth={2} />
              </button>
            </div>
          </div>
        </div>

        {/* Summary cards */}
        <div className="gm-cards">
          <div className="gm-card">
            <div className="gm-card-icon">
              <Users strokeWidth={2} />
            </div>
            <div>
              <p className="gm-card-value">{groupsSummary.activeGroups}</p>
              <p className="gm-card-label">Active Groups</p>
            </div>
          </div>
          <div className="gm-card">
            <div className="gm-card-icon">
              <UserPlus strokeWidth={2} />
            </div>
            <div>
              <p className="gm-card-value">{groupsSummary.pendingEnrollment}</p>
              <p className="gm-card-label">Pending Enrollment</p>
            </div>
          </div>
          <div className="gm-card">
            <div className="gm-card-icon">
              <Clock strokeWidth={2} />
            </div>
            <div>
              <p className="gm-card-value">{groupsSummary.upcomingCourses}</p>
              <p className="gm-card-label">Upcoming Courses</p>
            </div>
          </div>
        </div>
      </div>

      {/* Footer */}
      <footer className="gm-footer">
        <div className="gm-footer-inner">
          <span className="gm-footer-brand">IMETS Academy Administration</span>
          <span className="gm-footer-copy">
            © 2024 International Modern Education & Technology School. All
            rights reserved.
          </span>
          <div className="gm-footer-links">
            <Link href="#">Privacy Policy</Link>
            <Link href="#">Support Center</Link>
          </div>
        </div>
      </footer>
    </div>
  );
}

function GroupRow({ group }: { group: GroupRow }) {
  const [status, setStatus] = useState(group.status);
  const isActive = status === "ACTIVE";

  const handleToggle = () => {
    setStatus((s) => (s === "ACTIVE" ? "UPCOMING" : "ACTIVE"));
  };

  return (
    <tr>
      <td>
        <Link
          href={ROUTES.ADMIN.GROUP(group.id)}
          className="gm-group-name-link"
        >
          <p className="gm-group-name">{group.groupName}</p>
        </Link>
      </td>
      <td className="gm-period">
        {group.periodStart} to {group.periodEnd}
      </td>
      <td className="gm-study-days">{group.studyDays.join(", ")}</td>
      <td className="gm-created-at">{group.createdAt}</td>
      <td className="gm-students">
        {group.studentsCurrent}/{group.studentsMax}
      </td>
      <td>
        <div className="gm-instructor">
          <div className="gm-instructor-avatar">{group.instructorInitials}</div>
          <span className="gm-instructor-name">{group.instructorName}</span>
        </div>
      </td>
      <td className="gm-assigned-lms">
        {group.assignedLms.length > 0 ? group.assignedLms.join(", ") : "—"}
      </td>
      <td>
        <button
          type="button"
          role="switch"
          aria-checked={isActive}
          className={`gm-status-toggle ${isActive ? "gm-status-toggle-on" : ""}`}
          onClick={handleToggle}
          title={isActive ? "Active" : "Upcoming"}
        >
          <span className="gm-status-toggle-dot" />
        </button>
      </td>
      <td style={{ textAlign: "right" }}>
        <div className="gm-action-icons">
          <Link
            href={ROUTES.ADMIN.GROUP(group.id) + "/edit"}
            className="gm-action-icon gm-action-icon-edit"
            title="Edit"
            aria-label="Edit"
          >
            <Pencil className="gm-action-icon-svg" strokeWidth={2} />
          </Link>
          <button
            type="button"
            className="gm-action-icon gm-action-icon-duplicate"
            title="Duplicate"
            aria-label="Duplicate"
          >
            <Copy className="gm-action-icon-svg" strokeWidth={2} />
          </button>
          <button
            type="button"
            className="gm-action-icon gm-action-icon-delete"
            title="Delete"
            aria-label="Delete"
          >
            <Trash2 className="gm-action-icon-svg" strokeWidth={2} />
          </button>
        </div>
      </td>
    </tr>
  );
}
