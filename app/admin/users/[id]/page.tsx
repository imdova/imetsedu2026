"use client";

import { useState } from "react";
import Link from "next/link";
import {
  ChevronRight,
  Pencil,
  IdCard,
  MapPin,
  Check,
  X,
  LogIn,
  RefreshCw,
  FileText,
  Send,
  StopCircle,
  Filter,
  LayoutGrid,
  Calendar,
  Download,
  ChevronDown,
  ArrowRight,
  ExternalLink,
  User,
  Shield,
  DollarSign,
  Building2,
  Clock,
  Globe,
  Lock,
  Settings,
  MessageCircle,
  GraduationCap,
  Percent,
  Wallet,
  Briefcase,
  BookOpen,
  Tag,
  Lightbulb,
  UserSearch,
  Database,
  Brain,
  Zap,
  TrendingUp,
  TrendingDown,
  UserPlus,
  Users,
  Star,
  Award,
  AlertCircle,
} from "lucide-react";
import {
  LineChart,
  Line,
  BarChart,
  Bar,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  Legend,
  ResponsiveContainer,
  Cell,
  LabelList,
} from "recharts";
import { useParams } from "next/navigation";
import { ROUTES } from "@/constants";
import { getStaffMemberById } from "../users-data";
import {
  getPermissionsForUser,
  getKPIForUser,
  getRecentActivityForUser,
  type PermissionRow,
  type RecentActivityItem,
} from "./overview-data";
import {
  activityTimelineEntries,
  activityFilterOptions,
  moduleFilterOptions,
  dateRangeOptions as activityDateRangeOptions,
  type ActivityTimelineEntry,
  type ActivityCardIcon,
} from "./activity-timeline-data";
import {
  performanceKPIs,
  monthlyTargetActual,
  targetAchievementPercent,
  activityBreakdown,
  activityBreakdownTotal,
  conversionFunnelStages,
  weeklyPerformanceRows,
  topCoursesSold,
  maxCourseSales,
  performanceInsightText,
  type PerformanceKPI,
} from "./performance-report-data";
import {
  overviewKPIs,
  recentHighImpactActivities,
  securityHealth,
  activeStudents,
  pendingFollowUps,
  nextScheduledActivity,
  operationalVitality,
  type HighImpactActivity,
} from "./overview-dashboard-data";
import "./overview.css";

const TAB_IDS = ["profile", "role", "performance", "activity"] as const;
type TabId = (typeof TAB_IDS)[number];

function roleDisplay(role: string): string {
  const map: Record<string, string> = {
    admin: "Senior Admin",
    instructor: "Instructor",
    counselor: "Counselor",
    finance: "Finance Officer",
  };
  return map[role] ?? role;
}

function statusLabel(status: string): string {
  const map: Record<string, string> = {
    active: "ACTIVE",
    "on-leave": "ON LEAVE",
    deactivated: "DEACTIVATED",
  };
  return map[status] ?? status;
}

function ActivityIcon({ type }: { type: RecentActivityItem["type"] }) {
  switch (type) {
    case "login":
      return <LogIn className="uo-activity-icon uo-activity-login" />;
    case "lead":
      return <Pencil className="uo-activity-icon uo-activity-lead" />;
    case "proposal":
      return <Send className="uo-activity-icon uo-activity-proposal" />;
    default:
      return <FileText className="uo-activity-icon" />;
  }
}

function TimelineCardIcon({ icon }: { icon: ActivityCardIcon }) {
  const className = "uo-timeline-card-icon-inner";
  switch (icon) {
    case "user":
      return (
        <span className="uo-timeline-icon-wrap uo-timeline-icon-user">
          <User className={className} size={18} strokeWidth={2} />
        </span>
      );
    case "shield":
      return (
        <span className="uo-timeline-icon-wrap uo-timeline-icon-shield">
          <Shield className={className} size={18} strokeWidth={2} />
        </span>
      );
    case "payment":
      return (
        <span className="uo-timeline-icon-wrap uo-timeline-icon-payment">
          <DollarSign className={className} size={18} strokeWidth={2} />
        </span>
      );
    case "login":
      return (
        <span className="uo-timeline-icon-wrap uo-timeline-icon-login">
          <LogIn className={className} size={18} strokeWidth={2} />
        </span>
      );
    default:
      return (
        <span className="uo-timeline-icon-wrap uo-timeline-icon-login">
          <FileText className={className} size={18} strokeWidth={2} />
        </span>
      );
  }
}

function ModuleIcon({ module }: { module: string }) {
  const m = module.toLowerCase();
  if (m === "security") return <Lock className="uo-meta-icon-sm" size={14} />;
  if (m === "system") return <Settings className="uo-meta-icon-sm" size={14} />;
  return <Building2 className="uo-meta-icon-sm" size={14} />;
}

function renderActivityDescription(entry: ActivityTimelineEntry) {
  let text = entry.description;
  if (entry.linkText) {
    text = text.replace("{{link}}", `\u0001${entry.linkText}\u0001`);
  }
  if (entry.amount) {
    text = text.replace("{{amount}}", `\u0002${entry.amount}\u0002`);
  }
  if (entry.statusBadge) {
    text = text.replace("{{badge}}", `\u0003${entry.statusBadge}\u0003`);
  }
  const parts: React.ReactNode[] = [];
  let key = 0;
  const segments = text.split(
    /(\u0001[^\u0001]*\u0001|\u0002[^\u0002]*\u0002|\u0003[^\u0003]*\u0003)/g
  );
  for (const seg of segments) {
    if (seg.startsWith("\u0001") && seg.endsWith("\u0001")) {
      parts.push(
        <span key={key++} className="uo-activity-link-inline">
          {seg.slice(1, -1)}
        </span>
      );
    } else if (seg.startsWith("\u0002") && seg.endsWith("\u0002")) {
      parts.push(
        <span key={key++} className="uo-activity-amount">
          {seg.slice(1, -1)}
        </span>
      );
    } else if (seg.startsWith("\u0003") && seg.endsWith("\u0003")) {
      parts.push(
        <span key={key++} className="uo-activity-status-badge">
          {seg.slice(1, -1)}
        </span>
      );
    } else {
      parts.push(seg);
    }
  }
  return <>{parts}</>;
}

export default function UserOverviewPage() {
  const params = useParams();
  const id = typeof params.id === "string" ? params.id : "";
  const staff = getStaffMemberById(id);
  const [activeTab, setActiveTab] = useState<TabId>("profile");
  const [activityActivityFilter, setActivityActivityFilter] = useState("all");
  const [activityModuleFilter, setActivityModuleFilter] = useState("all");
  const [activityDateRange, setActivityDateRange] = useState("30");
  const [activityVisibleCount, setActivityVisibleCount] = useState(4);

  if (!staff) {
    return (
      <div className="uo-page">
        <div className="uo-error">
          <p>User not found.</p>
          <Link href={ROUTES.ADMIN.USERS} className="uo-back-link">
            Back to User Management
          </Link>
        </div>
      </div>
    );
  }

  const permissions = getPermissionsForUser(staff.id);
  const kpi = getKPIForUser(staff.id);
  const recentActivity = getRecentActivityForUser(staff.id);
  const revenuePct = Math.round((kpi.revenueActual / kpi.revenueTarget) * 100);

  return (
    <div className="uo-page">
      <nav className="uo-breadcrumb" aria-label="Breadcrumb">
        <Link href={ROUTES.ADMIN.DASHBOARD}>Home</Link>
        <ChevronRight className="uo-breadcrumb-sep" aria-hidden />
        <Link href={ROUTES.ADMIN.USERS}>Staff Management</Link>
        <ChevronRight className="uo-breadcrumb-sep" aria-hidden />
        <span className="uo-breadcrumb-current">User Overview</span>
      </nav>

      {/* Profile header */}
      <header className="uo-header">
        <div className="uo-header-main">
          <div className={`uo-avatar uo-avatar-${staff.avatarColor}`}>
            {staff.avatarInitials}
          </div>
          <div className="uo-header-info">
            <div className="uo-header-name-row">
              <h1 className="uo-header-name">{staff.name}</h1>
              <span className={`uo-status-badge uo-status-${staff.status}`}>
                {statusLabel(staff.status)}
              </span>
            </div>
            <p className="uo-header-role">
              {roleDisplay(staff.role)} • {staff.department}
            </p>
            <div className="uo-header-meta">
              <span className="uo-meta-item">
                <IdCard className="uo-meta-icon" />#{staff.staffId}
              </span>
              <span className="uo-meta-item">
                <MapPin className="uo-meta-icon" />
                {staff.city} Office
              </span>
            </div>
            <div className="uo-header-actions">
              <button type="button" className="uo-btn-edit">
                <Pencil className="uo-btn-icon" strokeWidth={2} />
                Edit Profile
              </button>
              <button
                type="button"
                className="uo-btn-deactivate"
                disabled={staff.status === "deactivated"}
              >
                <StopCircle className="uo-btn-icon" strokeWidth={2} />
                {staff.status === "deactivated" ? "Deactivated" : "Deactivate"}
              </button>
            </div>
          </div>
        </div>
      </header>

      {/* Tabs */}
      <div className="uo-tabs-wrap">
        <div className="uo-tabs" role="tablist">
          {[
            { id: "profile" as const, label: "Overview" },
            { id: "role" as const, label: "Role & Permissions" },
            { id: "performance" as const, label: "Performance Report" },
            { id: "activity" as const, label: "User Activity Log" },
          ].map(({ id, label }) => (
            <button
              key={id}
              type="button"
              role="tab"
              aria-selected={activeTab === id}
              className={`uo-tab ${activeTab === id ? "active" : ""}`}
              onClick={() => setActiveTab(id)}
            >
              {label}
            </button>
          ))}
        </div>
      </div>

      <div className="uo-body">
        <div className="uo-main">
          {activeTab === "profile" && (
            <div className="uo-panel uo-overview-dashboard" role="tabpanel">
              <div className="uo-ov-kpis">
                {overviewKPIs.map((kpi) => (
                  <div key={kpi.title} className="uo-ov-kpi-card">
                    <span className="uo-ov-kpi-title">{kpi.title}</span>
                    <span className="uo-ov-kpi-value">{kpi.value}</span>
                    <span
                      className={`uo-ov-kpi-change uo-ov-trend-${kpi.trend}`}
                    >
                      {kpi.trend === "up" ? (
                        <TrendingUp size={14} />
                      ) : (
                        <TrendingDown size={14} />
                      )}
                      {kpi.change}
                    </span>
                    {kpi.subText && (
                      <span className="uo-ov-kpi-sub">
                        <Clock size={12} />
                        {kpi.subText}
                      </span>
                    )}
                    {kpi.type === "percent" && (
                      <div className="uo-ov-kpi-bar-wrap">
                        <div
                          className="uo-ov-kpi-bar uo-ov-kpi-bar-blue"
                          style={{ width: `${kpi.value.replace("%", "")}%` }}
                        />
                      </div>
                    )}
                    {kpi.type === "revenue" && (
                      <div className="uo-ov-kpi-mini-bars">
                        {[40, 55, 50, 60, 70, 85].map((w, i) => (
                          <div
                            key={i}
                            className="uo-ov-mini-bar"
                            style={{
                              height: `${w}%`,
                              background: i === 5 ? "#007bff" : "#cce5ff",
                            }}
                          />
                        ))}
                      </div>
                    )}
                    {kpi.type === "time" && null}
                    {kpi.type === "task" && (
                      <div className="uo-ov-kpi-bar-wrap">
                        <div
                          className="uo-ov-kpi-bar uo-ov-kpi-bar-green"
                          style={{ width: "92%" }}
                        />
                      </div>
                    )}
                  </div>
                ))}
              </div>
              <div className="uo-ov-middle">
                <div className="uo-ov-card uo-ov-activities">
                  <div className="uo-ov-card-head">
                    <h3 className="uo-ov-card-title">
                      <Zap size={18} className="uo-ov-title-icon" />
                      Recent High-Impact Activities
                    </h3>
                    <button type="button" className="uo-ov-link">
                      View All
                    </button>
                  </div>
                  <ul className="uo-ov-activity-list">
                    {recentHighImpactActivities.map((a: HighImpactActivity) => (
                      <li key={a.id} className="uo-ov-activity-item">
                        <span
                          className={`uo-ov-activity-icon uo-ov-activity-icon-${a.icon}`}
                        >
                          {a.icon === "check" && <Check size={16} />}
                          {a.icon === "user-plus" && <UserPlus size={16} />}
                          {a.icon === "users" && <Users size={16} />}
                        </span>
                        <div className="uo-ov-activity-body">
                          <span className="uo-ov-activity-title">
                            {a.title}
                          </span>
                          <p className="uo-ov-activity-desc">{a.description}</p>
                          {a.tags && (
                            <div className="uo-ov-activity-tags">
                              {a.tags.map((t) => (
                                <span key={t} className="uo-ov-tag">
                                  {t}
                                </span>
                              ))}
                            </div>
                          )}
                        </div>
                        <span className="uo-ov-activity-time">{a.time}</span>
                      </li>
                    ))}
                  </ul>
                </div>
                <div className="uo-ov-card uo-ov-security">
                  <h3 className="uo-ov-card-title">SECURITY HEALTH</h3>
                  <div className="uo-ov-security-ring-wrap">
                    <div
                      className="uo-ov-security-ring"
                      style={{
                        background: `conic-gradient(#007bff ${
                          securityHealth.percent * 3.6
                        }deg, #e9ecef 0deg)`,
                      }}
                    >
                      <div className="uo-ov-security-ring-inner">
                        <span className="uo-ov-security-pct">
                          {securityHealth.percent}%
                        </span>
                        <span className="uo-ov-security-label">
                          {securityHealth.label}
                        </span>
                      </div>
                    </div>
                  </div>
                  <div className="uo-ov-security-meta">
                    <span>Last Active</span>
                    <span>{securityHealth.lastActive}</span>
                  </div>
                  <div className="uo-ov-security-meta">
                    <span>2FA Status</span>
                    <span className="uo-ov-2fa">
                      <Check size={14} /> Enabled
                    </span>
                  </div>
                </div>
              </div>
              <div className="uo-ov-bottom">
                <div className="uo-ov-bottom-left">
                  <div className="uo-ov-card uo-ov-ring-card">
                    <div
                      className="uo-ov-ring uo-ov-ring-blue"
                      style={{
                        background: `conic-gradient(#007bff ${
                          activeStudents.capacityPct * 3.6
                        }deg, #e9ecef 0deg)`,
                      }}
                    >
                      <div className="uo-ov-ring-inner">
                        <span>{activeStudents.count}</span>
                      </div>
                    </div>
                    <h3 className="uo-ov-ring-title">Active Students</h3>
                    <p className="uo-ov-ring-desc">
                      {activeStudents.description}
                    </p>
                    <span className="uo-ov-ring-status uo-ov-status-ok">
                      <Check size={14} /> {activeStudents.capacityPct}% Capacity
                    </span>
                  </div>
                  <div className="uo-ov-card uo-ov-ring-card">
                    <div
                      className="uo-ov-ring uo-ov-ring-orange"
                      style={{
                        background: `conic-gradient(#fd7e14 72deg, #e9ecef 0deg)`,
                      }}
                    >
                      <div className="uo-ov-ring-inner">
                        <span>{pendingFollowUps.count}</span>
                      </div>
                    </div>
                    <h3 className="uo-ov-ring-title">Pending Follow-ups</h3>
                    <p className="uo-ov-ring-desc">
                      {pendingFollowUps.description}
                    </p>
                    <span className="uo-ov-ring-status uo-ov-status-priority">
                      <AlertCircle size={14} /> {pendingFollowUps.priority}
                    </span>
                  </div>
                </div>
                <div className="uo-ov-bottom-right">
                  <div className="uo-ov-card uo-ov-next-activity">
                    <h3 className="uo-ov-next-title">
                      NEXT SCHEDULED ACTIVITY
                    </h3>
                    <div className="uo-ov-next-date">
                      {nextScheduledActivity.date}
                    </div>
                    <h4 className="uo-ov-next-name">
                      {nextScheduledActivity.title}
                    </h4>
                    <p className="uo-ov-next-desc">
                      {nextScheduledActivity.description}
                    </p>
                    <span className="uo-ov-next-time">
                      <Clock size={16} /> {nextScheduledActivity.time}
                    </span>
                    <button
                      type="button"
                      className="uo-ov-next-arrow"
                      aria-label="View"
                    >
                      <ArrowRight size={20} />
                    </button>
                  </div>
                  <div className="uo-ov-card uo-ov-vitality">
                    <h3 className="uo-ov-card-title">OPERATIONAL VITALITY</h3>
                    <div className="uo-ov-vitality-row">
                      <Star size={16} className="uo-ov-vitality-icon" />
                      <span className="uo-ov-vitality-label">
                        Profile Strength
                      </span>
                      <div className="uo-ov-vitality-bar-wrap">
                        <div
                          className="uo-ov-vitality-bar"
                          style={{
                            width: `${operationalVitality.profileStrength}%`,
                          }}
                        />
                      </div>
                      <span className="uo-ov-vitality-value">
                        {operationalVitality.profileStrength}%
                      </span>
                    </div>
                    <div className="uo-ov-vitality-row">
                      <Award size={16} className="uo-ov-vitality-icon" />
                      <span className="uo-ov-vitality-label">
                        Customer Rating
                      </span>
                      <div className="uo-ov-vitality-stars">
                        {[1, 2, 3, 4, 5].map((i) => (
                          <Star
                            key={i}
                            size={16}
                            fill={
                              i <=
                              Math.floor(operationalVitality.customerRating)
                                ? "#ffc107"
                                : "none"
                            }
                            stroke="#ffc107"
                          />
                        ))}
                      </div>
                      <span className="uo-ov-vitality-value">
                        {operationalVitality.customerRating}
                      </span>
                    </div>
                    <button type="button" className="uo-ov-vitality-link">
                      View Performance Details
                    </button>
                  </div>
                </div>
              </div>
            </div>
          )}

          {activeTab === "role" && (
            <div className="uo-panel" role="tabpanel">
              <section className="uo-section">
                <h2 className="uo-section-title">Role & Permissions</h2>
                <p className="uo-muted">
                  Manage this user&apos;s role and module-level permissions
                  below.
                </p>
                <div className="uo-table-wrap">
                  <table className="uo-table">
                    <thead>
                      <tr>
                        <th>MODULE NAME</th>
                        <th>READ</th>
                        <th>WRITE</th>
                        <th>DELETE</th>
                        <th>EXPORT</th>
                      </tr>
                    </thead>
                    <tbody>
                      {permissions.map((row: PermissionRow) => (
                        <tr key={row.moduleName}>
                          <td>{row.moduleName}</td>
                          <td>
                            <span
                              className={`uo-perm-cell ${
                                row.read ? "uo-perm-yes" : "uo-perm-no"
                              }`}
                            >
                              {row.read ? (
                                <Check className="uo-check" />
                              ) : (
                                <X className="uo-x" />
                              )}
                            </span>
                          </td>
                          <td>
                            <span
                              className={`uo-perm-cell ${
                                row.write ? "uo-perm-yes" : "uo-perm-no"
                              }`}
                            >
                              {row.write ? (
                                <Check className="uo-check" />
                              ) : (
                                <X className="uo-x" />
                              )}
                            </span>
                          </td>
                          <td>
                            <span
                              className={`uo-perm-cell ${
                                row.delete ? "uo-perm-yes" : "uo-perm-no"
                              }`}
                            >
                              {row.delete ? (
                                <Check className="uo-check" />
                              ) : (
                                <X className="uo-x" />
                              )}
                            </span>
                          </td>
                          <td>
                            <span
                              className={`uo-perm-cell ${
                                row.export ? "uo-perm-yes" : "uo-perm-no"
                              }`}
                            >
                              {row.export ? (
                                <Check className="uo-check" />
                              ) : (
                                <X className="uo-x" />
                              )}
                            </span>
                          </td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>
              </section>
            </div>
          )}

          {activeTab === "performance" && (
            <div className="uo-panel uo-panel-performance" role="tabpanel">
              <div className="uo-perf-header">
                <div className="uo-perf-title-wrap">
                  <h2 className="uo-section-title uo-perf-main-title">
                    {staff.name}&apos;s Performance
                  </h2>
                  <span className="uo-perf-role-badge">SENIOR AGENT</span>
                </div>
                <div className="uo-perf-actions">
                  <button type="button" className="uo-btn-month">
                    <Calendar size={18} strokeWidth={2} />
                    This Month
                  </button>
                  <button type="button" className="uo-btn-export-pdf">
                    <Download size={18} strokeWidth={2} />
                    Export PDF
                  </button>
                </div>
              </div>
              <div className="uo-perf-kpis">
                {[
                  {
                    Icon: UserSearch,
                    key: "leads",
                    iconClass: "uo-perf-kpi-icon-blue",
                  },
                  {
                    Icon: GraduationCap,
                    key: "enrollments",
                    iconClass: "uo-perf-kpi-icon-green",
                  },
                  {
                    Icon: Percent,
                    key: "conversion",
                    iconClass: "uo-perf-kpi-icon-blue",
                  },
                  {
                    Icon: Wallet,
                    key: "revenue",
                    iconClass: "uo-perf-kpi-icon-orange",
                  },
                ].map(({ Icon, key, iconClass }, i) => {
                  const k = performanceKPIs[i];
                  if (!k) return null;
                  return (
                    <div key={key} className="uo-perf-kpi-card">
                      <div className={`uo-perf-kpi-icon ${iconClass}`}>
                        <Icon size={22} strokeWidth={2} />
                      </div>
                      <div className="uo-perf-kpi-content">
                        <span
                          className={`uo-perf-kpi-value${
                            k.label === "Total Enrollments" && k.trend === "up"
                              ? " uo-perf-kpi-value-trend-up"
                              : k.trend === "down"
                              ? " uo-perf-kpi-value-trend-down"
                              : ""
                          }`}
                        >
                          {k.value}
                        </span>
                        <span
                          className={`uo-perf-kpi-compare uo-perf-trend-${k.trend}`}
                        >
                          {k.comparison}
                        </span>
                      </div>
                      <span className="uo-perf-kpi-label">{k.label}</span>
                    </div>
                  );
                })}
              </div>
              <div className="uo-perf-charts-row">
                <div className="uo-perf-charts-left">
                  <div className="uo-perf-chart-card">
                    <h3 className="uo-perf-chart-title">
                      Monthly Target vs. Actual
                    </h3>
                    <p className="uo-perf-chart-sub">
                      Sales goal tracking for 2024
                    </p>
                    <ResponsiveContainer width="100%" height={220}>
                      <BarChart
                        data={monthlyTargetActual}
                        layout="vertical"
                        margin={{ top: 5, right: 30, left: 0, bottom: 5 }}
                        barCategoryGap="20%"
                        barGap={8}
                      >
                        <CartesianGrid
                          strokeDasharray="3 3"
                          stroke="#eee"
                          horizontal={false}
                        />
                        <XAxis
                          type="number"
                          domain={[0, 100]}
                          tick={{ fontSize: 11 }}
                        />
                        <YAxis
                          type="category"
                          dataKey="month"
                          width={36}
                          tick={{ fontSize: 11 }}
                        />
                        <Tooltip />
                        <Legend />
                        <Bar
                          dataKey="target"
                          name="Target"
                          fill="#6c757d"
                          radius={[0, 4, 4, 0]}
                          barSize={14}
                        />
                        <Bar
                          dataKey="actual"
                          name="Actual"
                          fill="#007bff"
                          radius={[0, 4, 4, 0]}
                          barSize={14}
                        >
                          <LabelList
                            dataKey="actual"
                            position="right"
                            content={({
                              value,
                              payload,
                            }: {
                              value?: number;
                              payload?: { target?: number; actual?: number };
                            }) => {
                              const val =
                                value ??
                                (payload?.actual as number | undefined);
                              const target = payload?.target;
                              if (target == null || typeof val !== "number")
                                return "";
                              return `${Math.round((val / target) * 100)}%`;
                            }}
                          />
                        </Bar>
                      </BarChart>
                    </ResponsiveContainer>
                    <p className="uo-perf-target-met">
                      Overall Target Achievement:{" "}
                      <span className="uo-perf-target-met-value">
                        {targetAchievementPercent}% Met
                      </span>
                    </p>
                  </div>
                  <div className="uo-perf-chart-card">
                    <h3 className="uo-perf-chart-title">Activity Breakdown</h3>
                    <p className="uo-perf-chart-sub">
                      Daily interaction volume (Total:{" "}
                      {activityBreakdownTotal.toLocaleString()})
                    </p>
                    <ResponsiveContainer width="100%" height={220}>
                      <LineChart
                        data={activityBreakdown}
                        margin={{ top: 5, right: 5, left: 0, bottom: 5 }}
                      >
                        <CartesianGrid strokeDasharray="3 3" stroke="#eee" />
                        <XAxis dataKey="week" tick={{ fontSize: 10 }} />
                        <YAxis tick={{ fontSize: 11 }} />
                        <Tooltip />
                        <Legend />
                        <Line
                          type="monotone"
                          dataKey="calls"
                          name="Calls"
                          stroke="#007bff"
                          strokeWidth={2}
                          dot={{ r: 3 }}
                        />
                        <Line
                          type="monotone"
                          dataKey="whatsapp"
                          name="WhatsApp"
                          stroke="#28a745"
                          strokeWidth={2}
                          dot={{ r: 3 }}
                        />
                        <Line
                          type="monotone"
                          dataKey="followups"
                          name="Follow-ups"
                          stroke="#fd7e14"
                          strokeWidth={2}
                          dot={{ r: 3 }}
                        />
                      </LineChart>
                    </ResponsiveContainer>
                  </div>
                </div>
                <div className="uo-perf-charts-right">
                  <div className="uo-perf-chart-card">
                    <h3 className="uo-perf-chart-title">Conversion Funnel</h3>
                    <div className="uo-perf-funnel-vertical">
                      <ResponsiveContainer width="100%" height={220}>
                        <BarChart
                          data={conversionFunnelStages}
                          margin={{ top: 5, right: 5, left: 0, bottom: 5 }}
                          barCategoryGap="12%"
                          barGap={4}
                        >
                          <CartesianGrid
                            strokeDasharray="3 3"
                            stroke="#eee"
                            vertical={false}
                          />
                          <XAxis dataKey="stage" tick={{ fontSize: 10 }} />
                          <YAxis domain={[0, 100]} tick={{ fontSize: 11 }} />
                          <Tooltip
                            formatter={(
                              val: number,
                              name: string,
                              props?: {
                                payload?: (typeof conversionFunnelStages)[0];
                              }
                            ) => {
                              const p = props?.payload;
                              if (!p) return [val, name];
                              const detail =
                                p.stage === "Enrolled"
                                  ? `${p.leads} Students`
                                  : `${p.leads} Leads${
                                      p.drop !== "Base" && p.drop !== "Final"
                                        ? ` ${p.drop}`
                                        : ""
                                    }`;
                              return [detail, p.stage];
                            }}
                          />
                          <Bar
                            dataKey="percent"
                            radius={[4, 4, 0, 0]}
                            barSize={28}
                          >
                            {conversionFunnelStages.map((s) => (
                              <Cell
                                key={s.stage}
                                fill={
                                  s.stage === "Enrolled" ? "#28a745" : "#b8a9e0"
                                }
                              />
                            ))}
                            <LabelList
                              dataKey="percent"
                              position="top"
                              formatter={(v: number) => `${v}%`}
                            />
                            <LabelList
                              dataKey="leads"
                              position="center"
                              content={({
                                value,
                                payload,
                              }: {
                                value?: number;
                                payload?: (typeof conversionFunnelStages)[0];
                              }) => {
                                const v = value ?? payload?.leads;
                                const s = payload;
                                if (s?.stage === "Enrolled")
                                  return `${v} Students`;
                                return `${v} Leads`;
                              }}
                            />
                          </Bar>
                        </BarChart>
                      </ResponsiveContainer>
                    </div>
                  </div>
                </div>
              </div>
              <div className="uo-perf-bottom">
                <div className="uo-perf-table-wrap">
                  <div className="uo-perf-table-head">
                    <h3 className="uo-perf-chart-title">
                      Weekly Performance Breakdown
                    </h3>
                    <button type="button" className="uo-perf-link">
                      View All Weeks
                    </button>
                  </div>
                  <div className="uo-perf-table-scroll">
                    <table className="uo-perf-table">
                      <thead>
                        <tr>
                          <th>WEEK</th>
                          <th>LEADS</th>
                          <th>CONVERSATIONS</th>
                          <th>ENROLLMENTS</th>
                          <th>CONVERSION %</th>
                          <th>STATUS</th>
                        </tr>
                      </thead>
                      <tbody>
                        {weeklyPerformanceRows.map((row, i) => (
                          <tr key={row.week}>
                            <td>{row.week}</td>
                            <td>{row.leads}</td>
                            <td>{row.conversations}</td>
                            <td className="uo-perf-enrollments-cell">
                              {row.enrollments}
                            </td>
                            <td>
                              <div className="uo-perf-conv-bar-wrap">
                                <div
                                  className="uo-perf-conv-bar"
                                  style={{
                                    width: `${Math.min(
                                      row.conversionPct * 5,
                                      100
                                    )}%`,
                                    background:
                                      row.conversionPct >= 18
                                        ? "#28a745"
                                        : "#007bff",
                                  }}
                                />
                                <span>{row.conversionPct}%</span>
                              </div>
                            </td>
                            <td>
                              <span
                                className={`uo-perf-status uo-perf-status-${row.status
                                  .replace(/\s+/g, "-")
                                  .toLowerCase()}`}
                              >
                                {row.status}
                              </span>
                            </td>
                          </tr>
                        ))}
                      </tbody>
                    </table>
                  </div>
                </div>
                <div className="uo-perf-side">
                  <div className="uo-perf-courses">
                    <h3 className="uo-perf-chart-title">Top Courses Sold</h3>
                    <ul className="uo-perf-courses-list">
                      {[
                        { ...topCoursesSold[0], Icon: Briefcase },
                        { ...topCoursesSold[1], Icon: Database },
                        { ...topCoursesSold[2], Icon: Settings },
                        { ...topCoursesSold[3], Icon: Brain },
                      ].map((c) => (
                        <li key={c.name}>
                          <div className="uo-perf-course-row">
                            <span
                              className="uo-perf-course-icon"
                              style={{ color: c.color }}
                            >
                              <c.Icon size={18} strokeWidth={2} />
                            </span>
                            <span className="uo-perf-course-name">
                              {c.name}
                            </span>
                            <span className="uo-perf-course-sales">
                              {c.sales} Sales
                            </span>
                          </div>
                          <div className="uo-perf-course-bar-wrap">
                            <div
                              className="uo-perf-course-bar"
                              style={{
                                width: `${(c.sales / maxCourseSales) * 100}%`,
                                background: c.color,
                              }}
                            />
                          </div>
                        </li>
                      ))}
                    </ul>
                    <button type="button" className="uo-perf-catalog-btn">
                      View Full Catalog Performance
                    </button>
                  </div>
                  <div className="uo-perf-insight">
                    <span className="uo-perf-insight-bulb" aria-hidden>
                      <Lightbulb size={64} strokeWidth={1.5} opacity={0.2} />
                    </span>
                    <h3 className="uo-perf-insight-title">
                      Performance Insight
                    </h3>
                    <p className="uo-perf-insight-text">
                      {performanceInsightText.replace(
                        "John",
                        staff.name.split(" ")[0]
                      )}
                    </p>
                    <button type="button" className="uo-perf-insight-btn">
                      VIEW COACHING PLAN
                    </button>
                  </div>
                </div>
              </div>
            </div>
          )}

          {activeTab === "activity" && (
            <div className="uo-panel uo-panel-activity" role="tabpanel">
              <div className="uo-activity-filters">
                <div className="uo-activity-filter-row">
                  <label className="uo-dropdown-wrap">
                    <Filter size={16} className="uo-dropdown-icon" />
                    <select
                      value={activityActivityFilter}
                      onChange={(e) =>
                        setActivityActivityFilter(e.target.value)
                      }
                      className="uo-dropdown-select"
                    >
                      {activityFilterOptions.map((o) => (
                        <option key={o.value} value={o.value}>
                          Activity: {o.label}
                        </option>
                      ))}
                    </select>
                    <ChevronDown size={16} className="uo-dropdown-chevron" />
                  </label>
                  <label className="uo-dropdown-wrap">
                    <LayoutGrid size={16} className="uo-dropdown-icon" />
                    <select
                      value={activityModuleFilter}
                      onChange={(e) => setActivityModuleFilter(e.target.value)}
                      className="uo-dropdown-select"
                    >
                      {moduleFilterOptions.map((o) => (
                        <option key={o.value} value={o.value}>
                          Module:{" "}
                          {o.value === "all" ? "All" : o.value.toUpperCase()}
                        </option>
                      ))}
                    </select>
                    <ChevronDown size={16} className="uo-dropdown-chevron" />
                  </label>
                  <label className="uo-dropdown-wrap">
                    <Calendar size={16} className="uo-dropdown-icon" />
                    <select
                      value={activityDateRange}
                      onChange={(e) => setActivityDateRange(e.target.value)}
                      className="uo-dropdown-select"
                    >
                      {activityDateRangeOptions.map((o) => (
                        <option key={o.value} value={o.value}>
                          {o.label}
                        </option>
                      ))}
                    </select>
                    <ChevronDown size={16} className="uo-dropdown-chevron" />
                  </label>
                  <button type="button" className="uo-activity-link-btn">
                    <Download size={16} />
                    Export Logs
                  </button>
                  <button
                    type="button"
                    className="uo-btn-primary uo-btn-refresh"
                    onClick={() => {}}
                  >
                    Refresh
                  </button>
                </div>
              </div>
              <div className="uo-activity-timeline">
                {(() => {
                  const filtered = activityTimelineEntries
                    .filter(
                      (e) =>
                        activityModuleFilter === "all" ||
                        e.module.toLowerCase() === activityModuleFilter
                    )
                    .slice(0, activityVisibleCount);
                  const byGroup = {
                    today: [] as ActivityTimelineEntry[],
                    yesterday: [] as ActivityTimelineEntry[],
                  };
                  filtered.forEach((e) => {
                    if (e.dateGroup === "today") byGroup.today.push(e);
                    else byGroup.yesterday.push(e);
                  });
                  return (["today", "yesterday"] as const).map((group) => {
                    const entries = byGroup[group];
                    if (entries.length === 0) return null;
                    const dateLabel =
                      group === "today"
                        ? "TODAY, OCT 24, 2023"
                        : "YESTERDAY, OCT 23, 2023";
                    const shortLabel = group === "today" ? "TOD" : "YST";
                    return (
                      <div key={group} className="uo-timeline-group">
                        <div className="uo-timeline-date-head">
                          <span className="uo-timeline-date-dot">
                            {shortLabel}
                          </span>
                          <span className="uo-timeline-date-line" />
                          <h3 className="uo-timeline-date-title">
                            {dateLabel}
                          </h3>
                        </div>
                        <div className="uo-timeline-cards">
                          {entries.map((entry) => (
                            <div
                              key={entry.id}
                              className={`uo-timeline-card ${
                                entry.variant === "warning"
                                  ? "uo-timeline-card-warning"
                                  : ""
                              }`}
                            >
                              <TimelineCardIcon icon={entry.icon} />
                              <div className="uo-timeline-card-body">
                                {entry.badge && (
                                  <span className="uo-timeline-badge">
                                    {entry.badge}
                                  </span>
                                )}
                                <p className="uo-timeline-desc">
                                  {renderActivityDescription(entry)}
                                </p>
                                <div className="uo-timeline-meta">
                                  <span>
                                    <ModuleIcon module={entry.module} />
                                    {entry.module}
                                  </span>
                                  <span>
                                    <Clock size={14} />
                                    {entry.time}
                                  </span>
                                  <span>
                                    <Globe size={14} />
                                    IP: {entry.ip}
                                  </span>
                                </div>
                              </div>
                              <div className="uo-timeline-card-action">
                                {entry.actionIcon === "arrow" && (
                                  <button
                                    type="button"
                                    className={`uo-activity-action-link ${
                                      entry.variant === "warning"
                                        ? "uo-activity-action-warning"
                                        : ""
                                    }`}
                                  >
                                    {entry.actionLabel}
                                    <ArrowRight size={14} />
                                  </button>
                                )}
                                {entry.actionIcon === "external" && (
                                  <button
                                    type="button"
                                    className="uo-activity-action-link"
                                  >
                                    {entry.actionLabel}
                                    <ExternalLink size={14} />
                                  </button>
                                )}
                                {entry.actionIcon === "none" && (
                                  <button
                                    type="button"
                                    className="uo-activity-action-link"
                                  >
                                    {entry.actionLabel}
                                  </button>
                                )}
                              </div>
                            </div>
                          ))}
                        </div>
                      </div>
                    );
                  });
                })()}
              </div>
              <div className="uo-load-more-wrap">
                <button
                  type="button"
                  className="uo-btn-load-more"
                  onClick={() =>
                    setActivityVisibleCount((c) => Math.min(c + 4, 20))
                  }
                >
                  <ChevronDown size={18} />
                  Load More Activities
                </button>
              </div>
            </div>
          )}
        </div>

        {/* Right sidebar - hidden on Performance Report tab */}
        {activeTab !== "performance" && (
          <aside className="uo-sidebar">
            <section className="uo-sidebar-block">
              <h3 className="uo-sidebar-title">Quarterly KPI</h3>
              <div className="uo-kpi-list">
                <div className="uo-kpi-item">
                  <div className="uo-kpi-item-head">
                    <span className="uo-kpi-label">Revenue Target</span>
                    <span className="uo-kpi-value-small">
                      ${(kpi.revenueActual / 1000).toFixed(0)}k / $
                      {(kpi.revenueTarget / 1000).toFixed(0)}k
                    </span>
                  </div>
                  <div className="uo-progress-wrap">
                    <div
                      className="uo-progress-bar"
                      style={{ width: `${Math.min(revenuePct, 100)}%` }}
                    />
                  </div>
                </div>
                <div className="uo-kpi-item">
                  <div className="uo-kpi-item-head">
                    <span className="uo-kpi-label">Lead Conversion</span>
                    <span className="uo-kpi-value-small">
                      {kpi.leadConversionPercent}%
                    </span>
                  </div>
                  <div className="uo-progress-wrap">
                    <div
                      className="uo-progress-bar"
                      style={{ width: `${kpi.leadConversionPercent}%` }}
                    />
                  </div>
                </div>
                <p className="uo-kpi-stat">
                  <strong>ACTIVE DEALS</strong> {kpi.activeDeals}
                </p>
                <p className="uo-kpi-stat">
                  <strong>CALLS TODAY</strong> {kpi.callsToday}
                </p>
              </div>
            </section>
            <section className="uo-sidebar-block">
              <div className="uo-sidebar-head">
                <h3 className="uo-sidebar-title">Recent Activity</h3>
                <button
                  type="button"
                  className="uo-btn-icon-sm"
                  aria-label="Refresh"
                >
                  <RefreshCw className="w-4 h-4" strokeWidth={2} />
                </button>
              </div>
              <ul className="uo-activity-list">
                {recentActivity.map((item) => (
                  <li key={item.id} className="uo-activity-item">
                    <ActivityIcon type={item.type} />
                    <div>
                      <span className="uo-activity-label">{item.label}</span>
                      <span className="uo-activity-time">{item.timestamp}</span>
                    </div>
                  </li>
                ))}
              </ul>
              <Link
                href={ROUTES.ADMIN.USERS_ACTIVITY_LOG(staff.id)}
                className="uo-btn-full"
              >
                View Full Activity Log
              </Link>
            </section>
          </aside>
        )}
      </div>

      <footer className="uo-footer">
        © 2023 IMETS International. All Rights Reserved. Proprietary Staff
        Management System.
      </footer>
    </div>
  );
}
