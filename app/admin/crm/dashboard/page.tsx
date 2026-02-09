"use client";

import { useState } from "react";
import Link from "next/link";
import {
  Search,
  Filter,
  Download,
  Bell,
  Plus,
  Phone,
  MessageCircle,
  FileText,
  Calendar,
  Clock,
  ChevronLeft,
  ChevronRight,
} from "lucide-react";
import { ROUTES } from "@/constants";
import "./lead-dashboard.css";

const AVATAR_COLORS = [
  "linear-gradient(135deg, #93c5fd 0%, #60a5fa 100%)",
  "linear-gradient(135deg, #fdba74 0%, #f97316 100%)",
  "linear-gradient(135deg, #94a3b8 0%, #64748b 100%)",
  "linear-gradient(135deg, #f9a8d4 0%, #ec4899 100%)",
];

const DASHBOARD_LEADS = [
  {
    id: "1",
    name: "Jordan Davies",
    email: "jordan.d@example.com",
    course: "Data Science Pro",
    priority: "High" as const,
    lastActivity: "15 mins ago",
    lastActivitySub: "Website Inquiry",
    isLate: false,
  },
  {
    id: "2",
    name: "Sarah Rain",
    email: "sarah.rain@email.io",
    course: "UI/UX Advanced",
    priority: "Medium" as const,
    lastActivity: "2 hours ago",
    lastActivitySub: "WhatsApp Reply",
    isLate: false,
  },
  {
    id: "3",
    name: "Marcus King",
    email: "m.king@outlook.com",
    course: "Full Stack Dev",
    priority: "Low" as const,
    lastActivity: "Yesterday",
    lastActivitySub: "Email Opened",
    isLate: false,
  },
  {
    id: "4",
    name: "Elena Brooks",
    email: "elena.b@academy.edu",
    course: "Digital Marketing",
    priority: "High" as const,
    lastActivity: "LATE",
    lastActivitySub: "Due 3h ago",
    isLate: true,
  },
];

function getInitials(name: string) {
  return name
    .split(" ")
    .map((n) => n[0])
    .join("")
    .toUpperCase()
    .slice(0, 2);
}

const PER_PAGE = 4;
const TOTAL_LEADS = 41;

export default function LeadDashboardPage() {
  const [search, setSearch] = useState("");
  const [page, setPage] = useState(1);

  const totalPages = Math.ceil(TOTAL_LEADS / PER_PAGE) || 1;
  const start = (page - 1) * PER_PAGE + 1;
  const end = Math.min(page * PER_PAGE, TOTAL_LEADS);

  return (
    <div className="ld-page">
      <header className="ld-header">
        <div className="ld-header-top">
          <div>
            <h1 className="ld-title">Lead Dashboard</h1>
            <p className="ld-welcome">Welcome back, Alex. You have 24 new leads today.</p>
          </div>
          <div className="ld-header-actions">
            <button type="button" className="ld-btn-icon" aria-label="Notifications">
              <Bell className="w-5 h-5" strokeWidth={2} />
            </button>
            <Link href={ROUTES.ADMIN.CRM_LEAD_NEW} className="ld-btn-new">
              <Plus className="w-5 h-5" strokeWidth={2} />
              New Lead
            </Link>
          </div>
        </div>
      </header>

      <div className="ld-cards">
        <div className="ld-card ld-card-fresh">
          <div className="ld-card-icon-wrap ld-card-icon-blue">
            <FileText className="ld-card-icon" strokeWidth={2} />
          </div>
          <span className="ld-card-badge ld-card-badge-blue">+5 today</span>
          <p className="ld-card-label">FRESH LEADS</p>
          <p className="ld-card-value">24</p>
          <div className="ld-card-chart ld-card-chart-gray" aria-hidden />
        </div>
        <div className="ld-card ld-card-follow">
          <div className="ld-card-icon-wrap ld-card-icon-amber">
            <Calendar className="ld-card-icon" strokeWidth={2} />
          </div>
          <span className="ld-card-badge ld-card-badge-amber">Scheduled</span>
          <p className="ld-card-label">FOLLOW UP</p>
          <p className="ld-card-value">12</p>
          <div className="ld-card-chart ld-card-chart-gray" aria-hidden />
        </div>
        <div className="ld-card ld-card-late">
          <div className="ld-card-icon-wrap ld-card-icon-red">
            <Clock className="ld-card-icon" strokeWidth={2} />
          </div>
          <span className="ld-card-badge ld-card-badge-red">Overdue</span>
          <p className="ld-card-label">LATE</p>
          <p className="ld-card-value">5</p>
          <div className="ld-card-exclamation" aria-hidden />
        </div>
      </div>

      <div className="ld-toolbar">
        <div className="ld-search-wrap">
          <Search className="ld-search-icon" strokeWidth={2} />
          <input
            type="search"
            className="ld-search-input"
            placeholder="Search by name, email or course..."
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            aria-label="Search leads"
          />
        </div>
        <div className="ld-toolbar-buttons">
          <button type="button" className="ld-btn-filter">
            <Filter className="w-4 h-4" strokeWidth={2} />
            Filters
          </button>
          <button type="button" className="ld-btn-export">
            <Download className="w-4 h-4" strokeWidth={2} />
            Export
          </button>
        </div>
      </div>

      <div className="ld-table-wrap">
        <table className="ld-table">
          <thead>
            <tr>
              <th>LEAD NAME</th>
              <th>COURSE</th>
              <th>PRIORITY</th>
              <th>LAST ACTIVITY</th>
              <th>NEXT ACTION</th>
            </tr>
          </thead>
          <tbody>
            {DASHBOARD_LEADS.map((lead, idx) => (
              <tr key={lead.id}>
                <td>
                  <Link
                    href={ROUTES.ADMIN.CRM_LEAD(lead.id)}
                    className="ld-cell-lead"
                  >
                    <div
                      className="ld-avatar"
                      style={{ background: AVATAR_COLORS[idx % AVATAR_COLORS.length] }}
                    >
                      {getInitials(lead.name)}
                    </div>
                    <div className="ld-lead-info">
                      <span className="ld-lead-name">{lead.name}</span>
                      <span className="ld-lead-email">{lead.email}</span>
                    </div>
                  </Link>
                </td>
                <td>
                  <span className="ld-pill">{lead.course}</span>
                </td>
                <td>
                  <span
                    className={`ld-priority ld-priority-${lead.priority.toLowerCase()}`}
                  >
                    <span className="ld-priority-dot" />
                    {lead.priority}
                  </span>
                </td>
                <td>
                  <div className="ld-activity">
                    <span
                      className={
                        lead.isLate ? "ld-activity-time ld-activity-late" : "ld-activity-time"
                      }
                    >
                      {lead.lastActivity}
                    </span>
                    <span className="ld-activity-sub">{lead.lastActivitySub}</span>
                  </div>
                </td>
                <td>
                  <div className="ld-actions">
                    <button
                      type="button"
                      className="ld-action-btn ld-action-phone"
                      aria-label="Call"
                    >
                      <Phone className="w-4 h-4" strokeWidth={2} />
                    </button>
                    <button
                      type="button"
                      className="ld-action-btn ld-action-chat"
                      aria-label="Message"
                    >
                      <MessageCircle className="w-4 h-4" strokeWidth={2} />
                    </button>
                  </div>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      <div className="ld-pagination">
        <p className="ld-pagination-text">
          Showing {start} to {end} of {TOTAL_LEADS} leads
        </p>
        <div className="ld-pagination-controls">
          <button
            type="button"
            className="ld-pagination-btn"
            onClick={() => setPage((p) => Math.max(1, p - 1))}
            disabled={page <= 1}
            aria-label="Previous page"
          >
            <ChevronLeft className="w-4 h-4" strokeWidth={2} />
          </button>
          {[1, 2, 3].map((n) => (
            <button
              key={n}
              type="button"
              className={`ld-pagination-num ${page === n ? "ld-pagination-num-active" : ""}`}
              onClick={() => setPage(n)}
              aria-label={`Page ${n}`}
            >
              {n}
            </button>
          ))}
          <button
            type="button"
            className="ld-pagination-btn"
            onClick={() => setPage((p) => Math.min(totalPages, p + 1))}
            disabled={page >= totalPages}
            aria-label="Next page"
          >
            <ChevronRight className="w-4 h-4" strokeWidth={2} />
          </button>
        </div>
      </div>
    </div>
  );
}
