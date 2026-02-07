"use client";

import { useState, useMemo } from "react";
import Link from "next/link";
import {
  ChevronRight,
  Download,
  Pencil,
  Search,
  Calendar,
  Filter,
  ArrowRight,
  Info,
  X,
  Globe,
} from "lucide-react";
import { useParams } from "next/navigation";
import { ROUTES } from "@/constants";
import { getStaffMemberById } from "../../users-data";
import {
  mockAuditLog,
  TOTAL_ACTIVITIES,
  PER_PAGE,
  ACTIVITY_TYPE_OPTIONS,
  ACTION_TYPE_LABELS,
  type ActionType,
  type AuditLogEntry,
} from "./activity-log-data";
import "./activity-log.css";

const ACTION_PILL_CLASS: Record<ActionType, string> = {
  login: "ual-pill-green",
  "lead-updated": "ual-pill-yellow",
  "grade-published": "ual-pill-blue",
  "doc-verified": "ual-pill-purple",
  logout: "ual-pill-grey",
};

export default function UserActivityLogPage() {
  const params = useParams();
  const id = typeof params.id === "string" ? params.id : "";
  const staff = getStaffMemberById(id);
  const [searchTerm, setSearchTerm] = useState("");
  const [activityFilter, setActivityFilter] = useState("all");
  const [dateRange, setDateRange] = useState("Oct 01, 2023 - Oct 24, 2023");
  const [page, setPage] = useState(1);
  const [sidebarOpen, setSidebarOpen] = useState(false);
  const [selectedEvent, setSelectedEvent] = useState<AuditLogEntry | null>(
    null
  );

  const filtered = useMemo(() => {
    return mockAuditLog.filter((entry) => {
      const matchSearch =
        !searchTerm ||
        entry.eventDescription
          .toLowerCase()
          .includes(searchTerm.toLowerCase()) ||
        ACTION_TYPE_LABELS[entry.actionType]
          .toLowerCase()
          .includes(searchTerm.toLowerCase());
      const matchActivity =
        activityFilter === "all" || entry.actionType === activityFilter;
      return matchSearch && matchActivity;
    });
  }, [searchTerm, activityFilter]);

  const totalPages = Math.ceil(TOTAL_ACTIVITIES / PER_PAGE) || 1;
  const currentPage = Math.min(page, totalPages);
  const start = (currentPage - 1) * PER_PAGE + 1;
  const end = Math.min(currentPage * PER_PAGE, TOTAL_ACTIVITIES);
  const pageRows = filtered.slice(0, PER_PAGE);

  const openEventDetails = (entry: AuditLogEntry) => {
    setSelectedEvent(entry);
    setSidebarOpen(true);
  };

  if (!staff) {
    return (
      <div className="ual-page">
        <div className="ual-error">
          <p>User not found.</p>
          <Link href={ROUTES.ADMIN.USERS} className="ual-back-link">
            Back to User Management
          </Link>
        </div>
      </div>
    );
  }

  const roleDisplay =
    staff.role === "admin"
      ? "Senior Academic Admin"
      : staff.role === "instructor"
      ? "Instructor"
      : staff.role === "counselor"
      ? "Counselor"
      : "Finance Officer";

  return (
    <div className="ual-page">
      <nav className="ual-breadcrumb" aria-label="Breadcrumb">
        <Link href={ROUTES.ADMIN.DASHBOARD}>Home</Link>
        <ChevronRight className="ual-breadcrumb-sep" aria-hidden />
        <Link href={ROUTES.ADMIN.USERS}>Staff Management</Link>
        <ChevronRight className="ual-breadcrumb-sep" aria-hidden />
        <span className="ual-breadcrumb-current">User Audit Log</span>
      </nav>

      <div className="ual-layout">
        <main className="ual-main">
          {/* User profile card */}
          <div className="ual-profile-card">
            <div className="ual-profile-info">
              <div className={`ual-avatar ual-avatar-${staff.avatarColor}`}>
                {staff.avatarInitials}
              </div>
              <div className="ual-profile-meta">
                <div className="ual-profile-name-row">
                  <h1 className="ual-profile-name">
                    {staff.role === "instructor" ? "Dr. " : ""}
                    {staff.name}
                  </h1>
                  <span
                    className={`ual-status-badge ual-status-${staff.status}`}
                  >
                    {staff.status === "active"
                      ? "ACTIVE"
                      : staff.status === "on-leave"
                      ? "ON LEAVE"
                      : "INACTIVE"}
                  </span>
                </div>
                <p className="ual-profile-role">
                  {roleDisplay} · Emp ID: {staff.staffId}
                </p>
                <div className="ual-profile-extra">
                  <span className="ual-profile-login">
                    <ArrowRight className="ual-extra-icon" />
                    Last Login: 2 mins ago
                  </span>
                  <span className="ual-profile-ip">
                    <Globe className="ual-extra-icon" />
                    IP: 192.168.1.45
                  </span>
                </div>
              </div>
            </div>
            <div className="ual-profile-actions">
              <button type="button" className="ual-btn-export">
                <Download className="ual-btn-icon" strokeWidth={2} />
                Export Logs
              </button>
              <Link href={ROUTES.ADMIN.USERS} className="ual-btn-edit">
                <Pencil className="ual-btn-icon" strokeWidth={2} />
                Edit Permissions
              </Link>
            </div>
          </div>

          {/* Filters */}
          <div className="ual-filters">
            <div className="ual-search-wrap">
              <Search className="ual-search-icon" strokeWidth={2} />
              <input
                type="search"
                className="ual-search-input"
                placeholder="Search by action or keyword..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
              />
            </div>
            <select
              className="ual-select"
              value={activityFilter}
              onChange={(e) => setActivityFilter(e.target.value)}
            >
              {ACTIVITY_TYPE_OPTIONS.map((opt) => (
                <option key={opt.value} value={opt.value}>
                  {opt.label}
                </option>
              ))}
            </select>
            <div className="ual-date-wrap">
              <Calendar className="ual-date-icon" strokeWidth={2} />
              <input
                type="text"
                className="ual-date-input"
                value={dateRange}
                readOnly
                onChange={() => {}}
              />
            </div>
            <button
              type="button"
              className="ual-filter-btn"
              aria-label="Filter"
            >
              <Filter className="ual-filter-icon" strokeWidth={2} />
            </button>
          </div>

          {/* Activity table */}
          <div className="ual-table-card">
            <div className="ual-table-wrap">
              <table className="ual-table">
                <thead>
                  <tr>
                    <th>Timestamp</th>
                    <th>Action Type</th>
                    <th>Event Description</th>
                    <th>IP Address</th>
                    <th>Details</th>
                  </tr>
                </thead>
                <tbody>
                  {pageRows.map((entry) => (
                    <tr key={entry.id}>
                      <td className="ual-cell-timestamp">{entry.timestamp}</td>
                      <td>
                        <span
                          className={`ual-pill ${
                            ACTION_PILL_CLASS[entry.actionType]
                          }`}
                        >
                          {ACTION_TYPE_LABELS[entry.actionType]}
                        </span>
                      </td>
                      <td className="ual-cell-desc">
                        {entry.eventDescription}
                      </td>
                      <td className="ual-cell-ip">{entry.ipAddress}</td>
                      <td>
                        <button
                          type="button"
                          className="ual-link-details"
                          onClick={() => openEventDetails(entry)}
                        >
                          View Details
                        </button>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>

            <div className="ual-pagination">
              <p className="ual-pagination-text">
                Showing {start}-{end} of {TOTAL_ACTIVITIES} activities
              </p>
              <div className="ual-pagination-controls">
                <button
                  type="button"
                  className="ual-pagination-btn"
                  disabled={currentPage <= 1}
                  onClick={() => setPage((p) => Math.max(1, p - 1))}
                >
                  &lt;
                </button>
                {[1, 2, 3].map((p) => (
                  <button
                    key={p}
                    type="button"
                    className={`ual-pagination-btn ual-pagination-num ${
                      currentPage === p ? "active" : ""
                    }`}
                    onClick={() => setPage(p)}
                  >
                    {p}
                  </button>
                ))}
                <span className="ual-pagination-ellipsis">...</span>
                <button
                  type="button"
                  className={`ual-pagination-btn ual-pagination-num ${
                    currentPage === totalPages ? "active" : ""
                  }`}
                  onClick={() => setPage(totalPages)}
                >
                  {totalPages}
                </button>
                <button
                  type="button"
                  className="ual-pagination-btn"
                  disabled={currentPage >= totalPages}
                  onClick={() => setPage((p) => Math.min(totalPages, p + 1))}
                >
                  &gt;
                </button>
              </div>
            </div>
          </div>

          <p className="ual-footer-note">
            <Info className="ual-footer-icon" strokeWidth={2} />
            These audit logs are immutable and stored for 24 months per IMETS
            security compliance policy. Any discrepancy should be reported to
            the IT Security Oversight Committee.
          </p>
        </main>

        {/* Event Details sidebar */}
        {sidebarOpen && (
          <aside className="ual-sidebar">
            <div className="ual-sidebar-header">
              <h2 className="ual-sidebar-title">Event Details</h2>
              <button
                type="button"
                className="ual-sidebar-close"
                onClick={() => setSidebarOpen(false)}
                aria-label="Close"
              >
                <X className="w-5 h-5" strokeWidth={2} />
              </button>
            </div>
            <div className="ual-sidebar-body">
              {selectedEvent ? (
                <div className="ual-event-detail">
                  <p className="ual-event-detail-row">
                    <strong>Timestamp:</strong> {selectedEvent.timestamp}
                  </p>
                  <p className="ual-event-detail-row">
                    <strong>Action:</strong>{" "}
                    {ACTION_TYPE_LABELS[selectedEvent.actionType]}
                  </p>
                  <p className="ual-event-detail-row">
                    <strong>Description:</strong>{" "}
                    {selectedEvent.eventDescription}
                  </p>
                  <p className="ual-event-detail-row">
                    <strong>IP Address:</strong> {selectedEvent.ipAddress}
                  </p>
                </div>
              ) : (
                <p className="ual-sidebar-empty">
                  Select an event to view details.
                </p>
              )}
            </div>
          </aside>
        )}
      </div>
    </div>
  );
}
