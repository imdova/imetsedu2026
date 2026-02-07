"use client";

import { useState, useMemo } from "react";
import Link from "next/link";
import {
  Search,
  Download,
  UserPlus,
  Users,
  GraduationCap,
  Mail,
  Filter,
  Building2,
  MoreVertical,
  ChevronUp,
  ChevronDown,
  X,
  User,
  Pencil,
  KeyRound,
  Shield,
  Mail as MailIcon,
  UserMinus,
  UserCheck,
  ClipboardList,
  Trash2,
} from "lucide-react";
import { ROUTES } from "@/constants";
import {
  staffSummary,
  staffMembers,
  ROLE_OPTIONS,
  DEPARTMENT_OPTIONS,
  TOTAL_STAFF_RESULTS,
  type StaffMember,
  type StaffRole,
  type StaffStatus,
} from "./users-data";
import "./users.css";

const PER_PAGE = 5;

function roleLabel(role: StaffRole): string {
  const map: Record<StaffRole, string> = {
    admin: "Admin",
    instructor: "Instructor",
    counselor: "Counselor",
    finance: "Finance",
  };
  return map[role];
}

function statusLabel(status: StaffStatus): string {
  const map: Record<StaffStatus, string> = {
    active: "Active",
    "on-leave": "On Leave",
    deactivated: "Deactivated",
  };
  return map[status];
}

export default function AdminUsersPage() {
  const [searchTerm, setSearchTerm] = useState("");
  const [roleFilter, setRoleFilter] = useState("all");
  const [departmentFilter, setDepartmentFilter] = useState("all");
  const [page, setPage] = useState(1);
  const [manageStaff, setManageStaff] = useState<StaffMember | null>(null);
  const [statusOverrides, setStatusOverrides] = useState<
    Record<string, StaffStatus>
  >({});

  const getStatus = (row: StaffMember): StaffStatus =>
    statusOverrides[row.id] ?? row.status;

  const setStatus = (id: string, status: StaffStatus) => {
    setStatusOverrides((prev) => ({ ...prev, [id]: status }));
  };

  const filtered = useMemo(() => {
    return staffMembers.filter((s) => {
      const matchSearch =
        !searchTerm ||
        s.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
        s.email.toLowerCase().includes(searchTerm.toLowerCase()) ||
        s.staffId.toLowerCase().includes(searchTerm.toLowerCase());
      const matchRole = roleFilter === "all" || s.role === roleFilter;
      const matchDept =
        departmentFilter === "all" || s.department === departmentFilter;
      return matchSearch && matchRole && matchDept;
    });
  }, [searchTerm, roleFilter, departmentFilter]);

  const totalResults = TOTAL_STAFF_RESULTS;
  const totalPages = Math.ceil(totalResults / PER_PAGE) || 1;
  const currentPage = Math.min(page, totalPages);
  const start = (currentPage - 1) * PER_PAGE + 1;
  const end = Math.min(currentPage * PER_PAGE, totalResults);
  const pageRows = filtered.slice(0, PER_PAGE);

  return (
    <div className="aum-page">
      <header className="aum-header">
        <div className="aum-header-row">
          <div className="aum-header-content">
            <h1 className="aum-title">User Management Directory</h1>
            <p className="aum-description">
              Manage and oversee all academy staff roles and permissions.
            </p>
          </div>
          <Link href={ROUTES.ADMIN.USERS_INVITE} className="aum-btn-invite">
            <UserPlus className="aum-btn-invite-icon" strokeWidth={2} />
            Invite New User
          </Link>
        </div>
      </header>

      <div className="aum-main">
        {/* Summary cards */}
        <div className="aum-cards">
          <div className="aum-card">
            <div className="aum-card-icon blue">
              <Users className="w-5 h-5" strokeWidth={2} />
            </div>
            <div className="aum-card-body">
              <p className="aum-card-label">Total Staff</p>
              <p className="aum-card-value">
                {staffSummary.totalStaff.toLocaleString()}
              </p>
              <p className="aum-card-trend positive">
                <ChevronUp className="aum-trend-arrow" />
                {staffSummary.totalStaffTrend}
              </p>
            </div>
          </div>
          <div className="aum-card">
            <div className="aum-card-icon blue">
              <GraduationCap className="w-5 h-5" strokeWidth={2} />
            </div>
            <div className="aum-card-body">
              <p className="aum-card-label">Active Instructors</p>
              <p className="aum-card-value">
                {staffSummary.activeInstructors.toLocaleString()}
              </p>
              <p className="aum-card-trend positive">
                <ChevronUp className="aum-trend-arrow" />
                {staffSummary.activeInstructorsTrend}
              </p>
            </div>
          </div>
          <div className="aum-card">
            <div className="aum-card-icon orange">
              <Mail className="w-5 h-5" strokeWidth={2} />
            </div>
            <div className="aum-card-body">
              <p className="aum-card-label">Pending Invites</p>
              <p className="aum-card-value">
                {staffSummary.pendingInvites.toLocaleString()}
              </p>
              <p className="aum-card-trend muted">
                {staffSummary.pendingInvitesLabel}
              </p>
            </div>
          </div>
        </div>

        {/* Staff list card */}
        <div className="aum-list-card">
          <div className="aum-toolbar">
            <div className="aum-search-wrap">
              <Search className="aum-search-icon" strokeWidth={2} />
              <input
                type="search"
                className="aum-search-input"
                placeholder="Search by name, email or ID..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                aria-label="Search staff"
              />
            </div>
            <div className="aum-filters">
              <div className="aum-select-wrap">
                <Filter className="aum-select-icon" strokeWidth={2} />
                <select
                  className="aum-select"
                  value={roleFilter}
                  onChange={(e) => setRoleFilter(e.target.value)}
                  aria-label="Filter by role"
                >
                  {ROLE_OPTIONS.map((opt) => (
                    <option key={opt.value} value={opt.value}>
                      Role: {opt.label}
                    </option>
                  ))}
                </select>
              </div>
              <div className="aum-select-wrap">
                <Building2 className="aum-select-icon" strokeWidth={2} />
                <select
                  className="aum-select"
                  value={departmentFilter}
                  onChange={(e) => setDepartmentFilter(e.target.value)}
                  aria-label="Filter by department"
                >
                  {DEPARTMENT_OPTIONS.map((opt) => (
                    <option key={opt.value} value={opt.value}>
                      Department: {opt.label}
                    </option>
                  ))}
                </select>
              </div>
            </div>
            <button
              type="button"
              className="aum-download-btn"
              aria-label="Download"
            >
              <Download className="w-5 h-5" strokeWidth={2} />
            </button>
          </div>

          <div className="aum-table-wrap">
            <table className="aum-table">
              <thead>
                <tr>
                  <th>Staff Member</th>
                  <th>Role</th>
                  <th>Email</th>
                  <th>Department</th>
                  <th>Phone</th>
                  <th>City</th>
                  <th>Status</th>
                  <th>Actions</th>
                </tr>
              </thead>
              <tbody>
                {pageRows.map((row) => (
                  <tr key={row.id}>
                    <td>
                      <div className="aum-staff-cell">
                        <div
                          className={`aum-avatar aum-avatar-${row.avatarColor}`}
                        >
                          {row.avatarInitials}
                        </div>
                        <div>
                          <p className="aum-staff-name">
                            <Link
                              href={ROUTES.ADMIN.USER_OVERVIEW(row.id)}
                              className="aum-staff-name-link"
                            >
                              {row.name}
                            </Link>
                          </p>
                          <p className="aum-staff-id">ID: {row.staffId}</p>
                        </div>
                      </div>
                    </td>
                    <td>
                      <span className={`aum-role-pill aum-role-${row.role}`}>
                        {roleLabel(row.role)}
                      </span>
                    </td>
                    <td className="aum-email-cell">{row.email}</td>
                    <td>{row.department}</td>
                    <td className="aum-phone-cell">{row.phone}</td>
                    <td>{row.city}</td>
                    <td>
                      <label
                        className="aum-status-toggle"
                        title={statusLabel(getStatus(row))}
                      >
                        <input
                          type="checkbox"
                          checked={getStatus(row) === "active"}
                          onChange={(e) =>
                            setStatus(
                              row.id,
                              e.target.checked ? "active" : "deactivated"
                            )
                          }
                          aria-label={`Toggle status for ${row.name}`}
                        />
                        <span className="aum-status-toggle-slider" />
                      </label>
                    </td>
                    <td>
                      <div className="aum-row-actions-inline">
                        <button
                          type="button"
                          className="aum-action-btn aum-action-edit"
                          onClick={() => setManageStaff(row)}
                          title="Edit"
                          aria-label="Edit"
                        >
                          <Pencil
                            className="aum-action-btn-icon"
                            strokeWidth={2.25}
                          />
                        </button>
                        <button
                          type="button"
                          className="aum-action-btn aum-action-role"
                          onClick={() => setManageStaff(row)}
                          title="Change role"
                          aria-label="Change role"
                        >
                          <Shield
                            className="aum-action-btn-icon"
                            strokeWidth={2.25}
                          />
                        </button>
                        <Link
                          href={ROUTES.ADMIN.USERS_ACTIVITY_LOG(row.id)}
                          className="aum-action-btn aum-action-activity"
                          title="View user activity log"
                          aria-label="View user activity log"
                        >
                          <ClipboardList
                            className="aum-action-btn-icon"
                            strokeWidth={2.25}
                          />
                        </Link>
                        <button
                          type="button"
                          className="aum-action-btn aum-action-delete"
                          title="Delete"
                          aria-label="Delete"
                        >
                          <Trash2
                            className="aum-action-btn-icon"
                            strokeWidth={2.25}
                          />
                        </button>
                      </div>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>

          <div className="aum-pagination">
            <p className="aum-pagination-text">
              Showing {start} to {end} of {totalResults} results
            </p>
            <div className="aum-pagination-controls">
              <button
                type="button"
                className="aum-pagination-btn"
                disabled={currentPage <= 1}
                onClick={() => setPage((p) => Math.max(1, p - 1))}
              >
                Previous
              </button>
              {[1, 2].map((p) => (
                <button
                  key={p}
                  type="button"
                  className={`aum-pagination-btn aum-pagination-num ${
                    currentPage === p ? "active" : ""
                  }`}
                  onClick={() => setPage(p)}
                >
                  {p}
                </button>
              ))}
              <button
                type="button"
                className="aum-pagination-btn"
                disabled={currentPage >= totalPages}
                onClick={() => setPage((p) => Math.min(totalPages, p + 1))}
              >
                Next
              </button>
            </div>
          </div>
        </div>
      </div>

      {/* Manage staff modal */}
      {manageStaff && (
        <div
          className="aum-modal-backdrop"
          role="dialog"
          aria-modal="true"
          aria-labelledby="aum-modal-title"
          onClick={() => setManageStaff(null)}
        >
          <div className="aum-modal" onClick={(e) => e.stopPropagation()}>
            <div className="aum-modal-header">
              <div className="aum-modal-staff">
                <div
                  className={`aum-avatar aum-avatar-${manageStaff.avatarColor}`}
                >
                  {manageStaff.avatarInitials}
                </div>
                <div>
                  <h2 id="aum-modal-title" className="aum-modal-title">
                    {manageStaff.name}
                  </h2>
                  <p className="aum-modal-meta">
                    {roleLabel(manageStaff.role)} · {manageStaff.staffId}
                  </p>
                </div>
              </div>
              <button
                type="button"
                className="aum-modal-close"
                onClick={() => setManageStaff(null)}
                aria-label="Close modal"
              >
                <X className="w-5 h-5" strokeWidth={2} />
              </button>
            </div>
            <div className="aum-modal-body">
              <p className="aum-modal-email">
                <MailIcon className="w-4 h-4" />
                {manageStaff.email}
              </p>
              <p className="aum-modal-dept">{manageStaff.department}</p>
              <span className={`aum-status aum-status-${manageStaff.status}`}>
                <span className="aum-status-dot" />
                {statusLabel(manageStaff.status)}
              </span>
            </div>
            <div className="aum-modal-actions">
              <button
                type="button"
                className="aum-modal-action-btn"
                onClick={() => setManageStaff(null)}
              >
                <User className="w-4 h-4" />
                View Profile
              </button>
              <button
                type="button"
                className="aum-modal-action-btn"
                onClick={() => setManageStaff(null)}
              >
                <Pencil className="w-4 h-4" />
                Edit User
              </button>
              <button
                type="button"
                className="aum-modal-action-btn"
                onClick={() => setManageStaff(null)}
              >
                <Shield className="w-4 h-4" />
                Change Role
              </button>
              <button
                type="button"
                className="aum-modal-action-btn"
                onClick={() => setManageStaff(null)}
              >
                <KeyRound className="w-4 h-4" />
                Reset Password
              </button>
              <button
                type="button"
                className="aum-modal-action-btn"
                onClick={() => setManageStaff(null)}
              >
                <MailIcon className="w-4 h-4" />
                Send Email
              </button>
              {manageStaff.status === "deactivated" ? (
                <button
                  type="button"
                  className="aum-modal-action-btn aum-modal-action-success"
                  onClick={() => setManageStaff(null)}
                >
                  <UserCheck className="w-4 h-4" />
                  Activate User
                </button>
              ) : (
                <button
                  type="button"
                  className="aum-modal-action-btn aum-modal-action-danger"
                  onClick={() => setManageStaff(null)}
                >
                  <UserMinus className="w-4 h-4" />
                  Deactivate User
                </button>
              )}
            </div>
            <div className="aum-modal-footer">
              <button
                type="button"
                className="aum-modal-btn-secondary"
                onClick={() => setManageStaff(null)}
              >
                Close
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
