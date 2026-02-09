"use client";

import { useState, useMemo } from "react";
import Link from "next/link";
import {
  Search,
  SlidersHorizontal,
  Download,
  Bell,
  ChevronLeft,
  ChevronRight,
  Plus,
  LayoutGrid,
  List,
  Globe,
  MessageCircle,
  Share2,
  Megaphone,
  Video,
  Phone,
  Mail,
  ClipboardList,
} from "lucide-react";
import {
  crmLeads,
  assignedUsers,
  coursesOfInterest,
  leadSpecialtyOptions,
  type CRMLead,
  type LeadStatus,
  type LeadSource,
} from "@/lib/crmData";
import { ROUTES } from "@/constants";
import LogActivityModal from "@/components/crm/LogActivityModal";
import "./leads.css";

const AVATAR_COLORS = [
  "linear-gradient(135deg, #93c5fd 0%, #c4b5fd 100%)",
  "linear-gradient(135deg, #fbcfe8 0%, #c4b5fd 100%)",
  "linear-gradient(135deg, #fecaca 0%, #fcd34d 100%)",
  "linear-gradient(135deg, #a7f3d0 0%, #93c5fd 100%)",
];

function getInitials(name: string) {
  return name
    .split(" ")
    .map((n) => n[0])
    .join("")
    .toUpperCase()
    .slice(0, 2);
}

type FilterTab = "all" | "unassigned" | "overdue";

function getStatusDisplay(status: LeadStatus): {
  label: string;
  class: string;
} {
  switch (status) {
    case "WARM":
      return { label: "HOT", class: "lm-status-hot" };
    case "INTERESTED":
      return { label: "INTERESTED", class: "lm-status-interested" };
    case "COLD":
      return { label: "COLD", class: "lm-status-cold" };
    case "FOLLOWING":
      return { label: "FOLLOW-UP", class: "lm-status-follow" };
    case "NEW":
      return { label: "NEW", class: "lm-status-new" };
    default:
      return { label: status, class: "lm-status-interested" };
  }
}

const SOURCE_CONFIG: Record<
  LeadSource,
  { Icon: typeof Globe; colorClass: string }
> = {
  "FB Campaign": { Icon: Share2, colorClass: "lm-source-fb" },
  "FB Feed": { Icon: Share2, colorClass: "lm-source-fb" },
  "Direct Message": { Icon: MessageCircle, colorClass: "lm-source-dm" },
  "Search Ads": { Icon: Megaphone, colorClass: "lm-source-ads" },
  Webinar: { Icon: Video, colorClass: "lm-source-webinar" },
  Website: { Icon: Globe, colorClass: "lm-source-website" },
};

function WhatsAppIcon({ className }: { className?: string }) {
  return (
    <svg
      className={className}
      viewBox="0 0 24 24"
      fill="currentColor"
      width="100%"
      height="100%"
      aria-hidden
    >
      <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413z" />
    </svg>
  );
}

function LeadSourceCell({ source }: { source: LeadSource }) {
  const { Icon, colorClass } = SOURCE_CONFIG[source] ?? {
    Icon: Globe,
    colorClass: "lm-source-website",
  };
  return (
    <div className="lm-source-cell">
      <span className={`lm-source-icon ${colorClass}`}>
        <Icon className="lm-source-icon-svg" strokeWidth={2} />
      </span>
      <span className="lm-source-label">{source}</span>
    </div>
  );
}

const PER_PAGE = 10;

type ViewMode = "table" | "grid";

const LEAD_STAGE_OPTIONS: { value: string; label: string }[] = [
  { value: "All Stages", label: "All Stages" },
  { value: "WARM", label: "WARM" },
  { value: "INTERESTED", label: "INTERESTED" },
  { value: "COLD", label: "COLD" },
  { value: "FOLLOWING", label: "FOLLOWING" },
  { value: "NEW", label: "NEW" },
];

const LEAD_SOURCE_OPTIONS: { value: string; label: string }[] = [
  { value: "All Sources", label: "All Sources" },
  { value: "FB Campaign", label: "FB Campaign" },
  { value: "FB Feed", label: "FB Feed" },
  { value: "Direct Message", label: "Direct Message" },
  { value: "Search Ads", label: "Search Ads" },
  { value: "Webinar", label: "Webinar" },
  { value: "Website", label: "Website" },
];

const SPECIALTY_FILTER_OPTIONS = [
  { value: "All Specialties", label: "All Specialties" },
  ...leadSpecialtyOptions.map((s) => ({ value: s, label: s })),
];

export default function CRMLeadsPage() {
  const [search, setSearch] = useState("");
  const [activeTab, setActiveTab] = useState<FilterTab>("all");
  const [leadStage, setLeadStage] = useState("All Stages");
  const [leadSourceFilter, setLeadSourceFilter] = useState("All Sources");
  const [assignedTo, setAssignedTo] = useState("Everyone");
  const [courseInterestFilter, setCourseInterestFilter] =
    useState("All Courses");
  const [specialtyFilter, setSpecialtyFilter] = useState("All Specialties");
  const [dateFrom, setDateFrom] = useState("");
  const [dateTo, setDateTo] = useState("");
  const [page, setPage] = useState(1);
  const [viewMode, setViewMode] = useState<ViewMode>("table");
  const [logActivityLead, setLogActivityLead] = useState<CRMLead | null>(null);

  /** Parse lead dateAdded (e.g. "Jan 25, 2024") to Date for comparison */
  function parseLeadDate(dateStr: string): Date | null {
    if (!dateStr) return null;
    const d = new Date(dateStr);
    return isNaN(d.getTime()) ? null : d;
  }

  const filtered = useMemo(() => {
    let list = crmLeads.filter((lead) => {
      const matchSearch =
        !search ||
        lead.name.toLowerCase().includes(search.toLowerCase()) ||
        lead.email.toLowerCase().includes(search.toLowerCase()) ||
        (lead.courseInterest &&
          lead.courseInterest.toLowerCase().includes(search.toLowerCase()));
      if (!matchSearch) return false;
      const matchStage =
        leadStage === "All Stages" || lead.status === leadStage;
      const matchAssigned =
        assignedTo === "Everyone" || lead.assignedTo?.name === assignedTo;
      const matchCourse =
        courseInterestFilter === "All Courses" ||
        lead.courseInterest === courseInterestFilter;
      const matchSpecialty =
        specialtyFilter === "All Specialties" ||
        lead.specialty === specialtyFilter;
      const leadDate = parseLeadDate(lead.dateAdded);
      const matchDateFrom =
        !dateFrom || (leadDate && leadDate >= new Date(dateFrom + "T00:00:00"));
      const matchDateTo =
        !dateTo || (leadDate && leadDate <= new Date(dateTo + "T23:59:59"));
      if (!matchStage || !matchAssigned || !matchCourse || !matchSpecialty || !matchDateFrom || !matchDateTo)
        return false;
      switch (activeTab) {
        case "unassigned":
          return (
            !lead.assignedTo?.name || lead.assignedTo.name === "Unassigned"
          );
        case "overdue":
          return (
            lead.lastActive.includes("day") || lead.lastActive.includes("days")
          );
        default:
          return true;
      }
    });
    return list;
  }, [
    search,
    activeTab,
    leadStage,
    leadSourceFilter,
    assignedTo,
    courseInterestFilter,
    specialtyFilter,
    dateFrom,
    dateTo,
  ]);

  const totalPages = Math.ceil(filtered.length / PER_PAGE) || 1;
  const currentPage = Math.min(page, totalPages);
  const paginated = useMemo(
    () => filtered.slice((currentPage - 1) * PER_PAGE, currentPage * PER_PAGE),
    [filtered, currentPage]
  );
  const start = (currentPage - 1) * PER_PAGE + 1;
  const end = Math.min(currentPage * PER_PAGE, filtered.length);
  const totalDisplay = filtered.length; // or DISPLAY_TOTAL for design mock

  const unassignedCount = crmLeads.filter(
    (l) => !l.assignedTo?.name || l.assignedTo.name === "Unassigned"
  ).length;
  const overdueCount = crmLeads.filter(
    (l) =>
      l.lastActive.includes("day") ||
      l.lastActive.includes("days") ||
      l.lastActive === "Yesterday"
  ).length;

  return (
    <div className="lm-page">
      {/* Header */}
      <div className="lm-header">
        <div className="lm-header-row">
          <div className="lm-header-left">
            <h1 className="lm-title">Leads Management</h1>
            <p className="lm-subtitle">
              Tracking {totalDisplay.toLocaleString()} prospective students
            </p>
          </div>
          <div className="lm-header-right">
            <div className="lm-avatars">
              <div className="lm-avatar-circle">AM</div>
              <div className="lm-avatar-circle">SJ</div>
              <div className="lm-avatar-more">+5</div>
            </div>
            <button type="button" className="lm-btn-export">
              <Download className="w-4 h-4" strokeWidth={2} />
              Export Data
            </button>
            <div className="lm-btn-bell-wrap">
              <button
                type="button"
                className="lm-btn-bell"
                aria-label="Notifications"
              >
                <Bell className="w-5 h-5" strokeWidth={2} />
              </button>
              <span className="lm-bell-dot" aria-hidden />
            </div>
          </div>
        </div>
      </div>

      {/* Filter tabs */}
      <div className="lm-tabs-wrap">
        <div className="lm-tabs">
          <button
            type="button"
            className={`lm-tab ${activeTab === "all" ? "lm-tab-active" : ""}`}
            onClick={() => setActiveTab("all")}
          >
            All Leads
          </button>
          <button
            type="button"
            className={`lm-tab ${
              activeTab === "unassigned" ? "lm-tab-active" : ""
            }`}
            onClick={() => setActiveTab("unassigned")}
          >
            Unassigned
            <span className="lm-tab-badge">{unassignedCount || 24}</span>
          </button>
          <button
            type="button"
            className={`lm-tab ${
              activeTab === "overdue" ? "lm-tab-active" : ""
            }`}
            onClick={() => setActiveTab("overdue")}
          >
            Overdue Follow-ups
            <span className="lm-tab-badge lm-tab-badge-danger">
              {overdueCount || 12}
            </span>
          </button>
        </div>
        <Link href={ROUTES.ADMIN.CRM_LEAD_NEW} className="lm-btn-add">
          <Plus className="w-5 h-5" strokeWidth={2} />
          Add New Lead
        </Link>
      </div>

      {/* Filters & Search */}
      <div className="lm-filters-wrap">
        <div className="lm-filters-row">
          <div className="lm-search-inner lm-search-inner-flex">
            <Search
              className="lm-search-icon-left"
              strokeWidth={2}
              aria-hidden
            />
            <input
              type="text"
              className="lm-search-input lm-search-input-with-icon"
              placeholder="Search leads..."
              value={search}
              onChange={(e) => setSearch(e.target.value)}
            />
            <button
              type="button"
              className="lm-search-filter"
              aria-label="More filters"
            >
              <SlidersHorizontal className="w-5 h-5" strokeWidth={2} />
            </button>
          </div>
          <div className="lm-filter-group">
            <label className="lm-filter-label" htmlFor="lm-lead-stage">
              Lead Stage
            </label>
            <select
              id="lm-lead-stage"
              className="lm-filter-select"
              value={leadStage}
              onChange={(e) => setLeadStage(e.target.value)}
              aria-label="Filter by lead stage"
            >
              {LEAD_STAGE_OPTIONS.map((opt) => (
                <option key={opt.value} value={opt.value}>
                  {opt.label}
                </option>
              ))}
            </select>
          </div>
          <div className="lm-filter-group">
            <label className="lm-filter-label" htmlFor="lm-lead-source">
              Lead Source
            </label>
            <select
              id="lm-lead-source"
              className="lm-filter-select"
              value={leadSourceFilter}
              onChange={(e) => setLeadSourceFilter(e.target.value)}
              aria-label="Filter by lead source"
            >
              {LEAD_SOURCE_OPTIONS.map((opt) => (
                <option key={opt.value} value={opt.value}>
                  {opt.label}
                </option>
              ))}
            </select>
          </div>
          <div className="lm-filter-group">
            <label className="lm-filter-label" htmlFor="lm-assigned-to">
              Assigned To
            </label>
            <select
              id="lm-assigned-to"
              className="lm-filter-select"
              value={assignedTo}
              onChange={(e) => setAssignedTo(e.target.value)}
              aria-label="Filter by assigned agent"
            >
              <option value="Everyone">Everyone</option>
              {assignedUsers.map((u) => (
                <option key={u.name} value={u.name}>
                  {u.name}
                </option>
              ))}
            </select>
          </div>
          <div className="lm-filter-group">
            <label className="lm-filter-label" htmlFor="lm-course-interest">
              Course Interest
            </label>
            <select
              id="lm-course-interest"
              className="lm-filter-select"
              value={courseInterestFilter}
              onChange={(e) => setCourseInterestFilter(e.target.value)}
              aria-label="Filter by course interest"
            >
              <option value="All Courses">All Courses</option>
              {coursesOfInterest.map((c) => (
                <option key={c} value={c}>
                  {c}
                </option>
              ))}
            </select>
          </div>
          <div className="lm-filter-group">
            <label className="lm-filter-label" htmlFor="lm-specialty">
              Specialty
            </label>
            <select
              id="lm-specialty"
              className="lm-filter-select"
              value={specialtyFilter}
              onChange={(e) => setSpecialtyFilter(e.target.value)}
              aria-label="Filter by specialty"
            >
              {SPECIALTY_FILTER_OPTIONS.map((opt) => (
                <option key={opt.value} value={opt.value}>
                  {opt.label}
                </option>
              ))}
            </select>
          </div>
          <div className="lm-filter-group">
            <label className="lm-filter-label" htmlFor="lm-date-from">
              Date From
            </label>
            <input
              id="lm-date-from"
              type="date"
              className="lm-filter-select lm-filter-date"
              value={dateFrom}
              onChange={(e) => setDateFrom(e.target.value)}
              aria-label="Filter from date"
            />
          </div>
          <div className="lm-filter-group">
            <label className="lm-filter-label" htmlFor="lm-date-to">
              Date To
            </label>
            <input
              id="lm-date-to"
              type="date"
              className="lm-filter-select lm-filter-date"
              value={dateTo}
              onChange={(e) => setDateTo(e.target.value)}
              aria-label="Filter to date"
            />
          </div>
          <div className="lm-view-toggle">
            <button
              type="button"
              className={`lm-view-btn ${viewMode === "table" ? "active" : ""}`}
              onClick={() => setViewMode("table")}
              aria-label="List view"
            >
              <List className="w-5 h-5" strokeWidth={2} />
            </button>
            <button
              type="button"
              className={`lm-view-btn ${viewMode === "grid" ? "active" : ""}`}
              onClick={() => setViewMode("grid")}
              aria-label="Grid view"
            >
              <LayoutGrid className="w-5 h-5" strokeWidth={2} />
            </button>
          </div>
        </div>
      </div>

      {/* Table view */}
      {viewMode === "table" && (
        <div className="lm-table-card">
          <div className="lm-table-wrap">
            <table className="lm-table">
              <thead>
                <tr>
                  <th>Lead Name</th>
                  <th>Source</th>
                  <th>Course Interest</th>
                  <th>Assigned Agent</th>
                  <th>Specialty</th>
                  <th>Status</th>
                  <th>Actions</th>
                </tr>
              </thead>
              <tbody>
                {paginated.map((lead, idx) => {
                  const statusDisplay = getStatusDisplay(lead.status);
                  return (
                    <tr key={lead.id}>
                      <td>
                        <Link
                          href={ROUTES.ADMIN.CRM_LEAD(lead.id)}
                          className="lm-lead-cell lm-lead-name-link"
                        >
                          <div
                            className="lm-lead-avatar"
                            style={{
                              background:
                                AVATAR_COLORS[idx % AVATAR_COLORS.length],
                            }}
                          >
                            {getInitials(lead.name)}
                          </div>
                          <div className="lm-lead-info">
                            <p className="lm-lead-name">{lead.name}</p>
                            {lead.phone && (
                              <p className="lm-lead-email">{lead.phone}</p>
                            )}
                            <p className="lm-lead-email">{lead.email}</p>
                          </div>
                        </Link>
                      </td>
                      <td>
                        <LeadSourceCell source={lead.source} />
                      </td>
                      <td>
                        <span className="lm-course-badge">
                          {lead.courseInterest || "—"}
                        </span>
                      </td>
                      <td>
                        <div className="lm-agent">
                          <div className="lm-agent-avatar">
                            {lead.assignedTo?.name
                              ? getInitials(lead.assignedTo.name)
                              : "—"}
                          </div>
                          <span
                            className={
                              lead.assignedTo?.name
                                ? "lm-agent-name"
                                : "lm-agent-name lm-agent-unassigned"
                            }
                          >
                            {lead.assignedTo?.name || "Unassigned"}
                          </span>
                        </div>
                      </td>
                      <td style={{ color: "#64748b", fontSize: "13px" }}>
                        {lead.specialty ?? "—"}
                      </td>
                      <td>
                        <span className={`lm-status ${statusDisplay.class}`}>
                          <span className="lm-status-dot" />
                          {statusDisplay.label}
                        </span>
                      </td>
                      <td>
                        <div className="lm-actions-cell">
                          <button
                            type="button"
                            className="lm-action-btn lm-action-phone"
                            onClick={() =>
                              window.open(`tel:${lead.phone}`, "_self")
                            }
                            aria-label="Call"
                            title="Call"
                          >
                            <Phone className="lm-action-icon" strokeWidth={2} />
                          </button>
                          <button
                            type="button"
                            className="lm-action-btn lm-action-whatsapp"
                            onClick={() =>
                              window.open(
                                `https://wa.me/${lead.phone?.replace(
                                  /\D/g,
                                  ""
                                )}`,
                                "_blank"
                              )
                            }
                            aria-label="WhatsApp"
                            title="WhatsApp"
                          >
                            <WhatsAppIcon className="lm-action-icon" />
                          </button>
                          <button
                            type="button"
                            className="lm-action-btn lm-action-email"
                            onClick={() =>
                              window.open(`mailto:${lead.email}`, "_self")
                            }
                            aria-label="Email"
                            title="Email"
                          >
                            <Mail className="lm-action-icon" strokeWidth={2} />
                          </button>
                          <button
                            type="button"
                            className="lm-action-btn lm-action-log"
                            onClick={() => setLogActivityLead(lead)}
                            aria-label="Log activity"
                            title="Log activity"
                          >
                            <ClipboardList
                              className="lm-action-icon"
                              strokeWidth={2}
                            />
                          </button>
                        </div>
                      </td>
                    </tr>
                  );
                })}
              </tbody>
            </table>
          </div>

          {/* Pagination */}
          <div className="lm-pagination">
            <p className="lm-pagination-text">
              Showing {start}-{end} of {totalDisplay.toLocaleString()} leads
            </p>
            <div className="lm-pagination-controls">
              <button
                type="button"
                className="lm-pagination-btn"
                onClick={() => setPage((p) => Math.max(1, p - 1))}
                disabled={currentPage <= 1}
                aria-label="Previous page"
              >
                <ChevronLeft className="w-4 h-4" strokeWidth={2} />
              </button>
              {[1, 2, 3]
                .filter((p) => p <= totalPages)
                .map((p) => (
                  <button
                    key={p}
                    type="button"
                    className={`lm-pagination-btn ${
                      currentPage === p ? "active" : ""
                    }`}
                    onClick={() => setPage(p)}
                  >
                    {p}
                  </button>
                ))}
              {totalPages > 4 && (
                <>
                  <span style={{ padding: "0 4px", color: "#94a3b8" }}>
                    ...
                  </span>
                  <button
                    type="button"
                    className={`lm-pagination-btn ${
                      currentPage === totalPages ? "active" : ""
                    }`}
                    onClick={() => setPage(totalPages)}
                  >
                    {totalPages}
                  </button>
                </>
              )}
              <button
                type="button"
                className="lm-pagination-btn"
                onClick={() => setPage((p) => Math.min(totalPages, p + 1))}
                disabled={currentPage >= totalPages}
                aria-label="Next page"
              >
                <ChevronRight className="w-4 h-4" strokeWidth={2} />
              </button>
            </div>
          </div>
        </div>
      )}

      {/* Grid view */}
      {viewMode === "grid" && (
        <>
          <div className="lm-grid-view">
            {paginated.map((lead, idx) => {
              const statusDisplay = getStatusDisplay(lead.status);
              return (
                <div key={lead.id} className="lm-grid-card">
                  <Link
                    href={ROUTES.ADMIN.CRM_LEAD(lead.id)}
                    className="lm-grid-card-link"
                  >
                    <div className="lm-grid-card-top">
                      <div
                        className="lm-grid-card-avatar"
                        style={{
                          background: AVATAR_COLORS[idx % AVATAR_COLORS.length],
                        }}
                      >
                        {getInitials(lead.name)}
                      </div>
                      <div className="lm-grid-card-info">
                        <p className="lm-grid-card-name">{lead.name}</p>
                        {lead.phone && (
                          <p className="lm-grid-card-email">{lead.phone}</p>
                        )}
                        <p className="lm-grid-card-email">{lead.email}</p>
                      </div>
                    </div>
                    <div className="lm-grid-card-meta">
                      <LeadSourceCell source={lead.source} />
                      <span className="lm-course-badge">
                        {lead.courseInterest || "—"}
                      </span>
                      <span className={`lm-status ${statusDisplay.class}`}>
                        <span className="lm-status-dot" />
                        {statusDisplay.label}
                      </span>
                    </div>
                  </Link>
                  <div className="lm-grid-card-footer">
                    <span style={{ fontSize: 13, color: "#64748b" }}>
                      {lead.specialty ?? "—"} ·{" "}
                      {lead.assignedTo?.name || "Unassigned"}
                    </span>
                    <Link
                      href={ROUTES.ADMIN.CRM_LEAD(lead.id)}
                      className="lm-grid-card-view"
                    >
                      View
                    </Link>
                  </div>
                </div>
              );
            })}
          </div>
          <div className="lm-table-card" style={{ marginTop: 0 }}>
            <div className="lm-pagination">
              <p className="lm-pagination-text">
                Showing {start}-{end} of {totalDisplay.toLocaleString()} leads
              </p>
              <div className="lm-pagination-controls">
                <button
                  type="button"
                  className="lm-pagination-btn"
                  onClick={() => setPage((p) => Math.max(1, p - 1))}
                  disabled={currentPage <= 1}
                  aria-label="Previous page"
                >
                  <ChevronLeft className="w-4 h-4" strokeWidth={2} />
                </button>
                {[1, 2, 3]
                  .filter((p) => p <= totalPages)
                  .map((p) => (
                    <button
                      key={p}
                      type="button"
                      className={`lm-pagination-btn ${
                        currentPage === p ? "active" : ""
                      }`}
                      onClick={() => setPage(p)}
                    >
                      {p}
                    </button>
                  ))}
                {totalPages > 4 && (
                  <>
                    <span style={{ padding: "0 4px", color: "#94a3b8" }}>
                      ...
                    </span>
                    <button
                      type="button"
                      className={`lm-pagination-btn ${
                        currentPage === totalPages ? "active" : ""
                      }`}
                      onClick={() => setPage(totalPages)}
                    >
                      {totalPages}
                    </button>
                  </>
                )}
                <button
                  type="button"
                  className="lm-pagination-btn"
                  onClick={() => setPage((p) => Math.min(totalPages, p + 1))}
                  disabled={currentPage >= totalPages}
                  aria-label="Next page"
                >
                  <ChevronRight className="w-4 h-4" strokeWidth={2} />
                </button>
              </div>
            </div>
          </div>
        </>
      )}

      {logActivityLead && (
        <LogActivityModal
          lead={logActivityLead}
          onClose={() => setLogActivityLead(null)}
          onSave={() => setLogActivityLead(null)}
        />
      )}
    </div>
  );
}
