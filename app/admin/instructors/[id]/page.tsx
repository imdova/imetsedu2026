"use client";

import { useState } from "react";
import Link from "next/link";
import { useParams } from "next/navigation";
import {
  ChevronLeft,
  Phone,
  MessageCircle,
  Calendar,
  Users,
  UserPlus,
  Star,
  CheckCircle,
  CalendarDays,
  Download,
  FileText,
  Shield,
  MoreHorizontal,
  Info,
  Clock,
  ArrowRight,
  TrendingUp,
  TrendingDown,
  Filter,
  Plus,
  Eye,
  BarChart3,
  Lightbulb,
  Mail,
  ChevronRight,
  Search,
  Sparkles,
  ThumbsUp,
  Truck,
  Building2,
  ClipboardList,
  LineChart,
} from "lucide-react";
import { ROUTES } from "@/constants";
import { getInstructorDetail } from "./instructor-detail-data";
import "./instructor-detail.css";

const TABS = [
  { id: "profile", label: "Professional Profile" },
  { id: "groups", label: "Assigned Groups" },
  { id: "schedule", label: "Schedule" },
  { id: "feedback", label: "Feedback & Reviews" },
] as const;

type TabId = (typeof TABS)[number]["id"];

export default function InstructorDetailPage() {
  const params = useParams();
  const id = (params?.id as string) ?? "";
  const [activeTab, setActiveTab] = useState<TabId>("profile");
  const [groupsPage, setGroupsPage] = useState(1);
  const data = getInstructorDetail(id);

  const GROUPS_PER_PAGE = 4;
  const groupsData = data?.assignedGroupsTab;
  const groupsTotalPages = groupsData
    ? Math.ceil(groupsData.cohorts.length / GROUPS_PER_PAGE) || 1
    : 0;
  const groupsPaginated = groupsData
    ? groupsData.cohorts.slice(
        (groupsPage - 1) * GROUPS_PER_PAGE,
        groupsPage * GROUPS_PER_PAGE
      )
    : [];

  if (!data) {
    return (
      <div className="id-page">
        <div className="id-not-found">
          <p>Instructor not found.</p>
          <Link href={ROUTES.ADMIN.INSTRUCTORS} className="id-back-link">
            <ChevronLeft className="w-4 h-4" /> Back to Instructors
          </Link>
        </div>
      </div>
    );
  }

  return (
    <div className="id-page">
      <div className="id-content">
        {/* Back / breadcrumb */}
        <div className="id-breadcrumb">
          <Link href={ROUTES.ADMIN.INSTRUCTORS} className="id-back-link">
            <ChevronLeft className="w-4 h-4" strokeWidth={2} /> Instructors
          </Link>
        </div>

        {/* Instructor header */}
        <header className="id-header">
          <div className="id-header-left">
            <div className="id-avatar-wrap">
              {data.image ? (
                <img src={data.image} alt="" className="id-avatar" />
              ) : (
                <div className="id-avatar id-avatar-placeholder">
                  {data.name
                    .split(" ")
                    .map((n) => n[0])
                    .join("")}
                </div>
              )}
              {data.isOnline && <span className="id-online-dot" aria-hidden />}
            </div>
            <div className="id-header-info">
              <h1 className="id-name">{data.name}</h1>
              <span className="id-role-tag">{data.role.toUpperCase()}</span>
              <p className="id-department">{data.department}</p>
              <p className="id-meta">
                Employee ID: {data.employeeId} • Joined {data.joinedDate}
              </p>
            </div>
          </div>
          <div className="id-header-actions">
            <button type="button" className="id-btn-action">
              <Phone className="w-4 h-4" strokeWidth={2} /> Call
            </button>
            <button type="button" className="id-btn-action">
              <MessageCircle className="w-4 h-4" strokeWidth={2} /> Message
            </button>
            <button type="button" className="id-btn-primary">
              <Calendar className="w-4 h-4" strokeWidth={2} /> Schedule Sync
            </button>
          </div>
        </header>

        {/* KPI cards */}
        <div className="id-kpis">
          <div className="id-kpi-card">
            <Users className="id-kpi-icon" strokeWidth={2} />
            <div className="id-kpi-main">
              <span className="id-kpi-value">
                {data.studentsTaught.toLocaleString()}
              </span>
              <span className="id-kpi-label">Students Taught</span>
            </div>
            <span className="id-kpi-trend id-trend-up">
              <TrendingUp className="w-3 h-3" strokeWidth={2} /> {data.studentsTaughtTrend}
            </span>
          </div>
          <div className="id-kpi-card">
            <Star className="id-kpi-icon" strokeWidth={2} />
            <div className="id-kpi-main">
              <span className="id-kpi-value">{data.avgRating}/5</span>
              <span className="id-kpi-label">Avg. Rating</span>
            </div>
            <span className="id-kpi-trend id-trend-up">
              <TrendingUp className="w-3 h-3" strokeWidth={2} /> {data.avgRatingTrend}
            </span>
          </div>
          <div className="id-kpi-card">
            <CheckCircle className="id-kpi-icon" strokeWidth={2} />
            <div className="id-kpi-main">
              <span className="id-kpi-value">{data.completionRate}%</span>
              <span className="id-kpi-label">Completion Rate</span>
            </div>
            <span className="id-kpi-trend id-trend-up">
              <TrendingUp className="w-3 h-3" strokeWidth={2} /> {data.completionRateTrend}
            </span>
          </div>
          <div className="id-kpi-card">
            <CalendarDays className="id-kpi-icon" strokeWidth={2} />
            <div className="id-kpi-main">
              <span className="id-kpi-value">{data.sessionAttendance}%</span>
              <span className="id-kpi-label">Session Attendance</span>
            </div>
            <span className={`id-kpi-trend ${data.sessionAttendanceTrendUp ? "id-trend-up" : "id-trend-down"}`}>
              <TrendingDown className="w-3 h-3" strokeWidth={2} /> {data.sessionAttendanceTrend}
            </span>
          </div>
        </div>

        {/* Tabs + main + sidebar */}
        <div className="id-main-wrap">
          <div className="id-main">
            <div className="id-tabs">
              {TABS.map((tab) => (
                <button
                  key={tab.id}
                  type="button"
                  className={`id-tab ${activeTab === tab.id ? "id-tab-active" : ""}`}
                  onClick={() => setActiveTab(tab.id)}
                >
                  {tab.label}
                </button>
              ))}
            </div>

            {activeTab === "profile" && (
              <div className="id-tab-panel">
                <section className="id-section">
                  <h2 className="id-section-title">Academic Biography</h2>
                  <p className="id-bio">{data.bio}</p>
                </section>
                <section className="id-section">
                  <h2 className="id-section-title">Certifications & Credentials</h2>
                  <div className="id-pills">
                    {data.certifications.map((c) => (
                      <span key={c} className="id-pill">
                        {c}
                      </span>
                    ))}
                  </div>
                </section>
                <section className="id-section">
                  <h2 className="id-section-title">Documentation</h2>
                  <ul className="id-doc-list">
                    {data.documents.map((doc) => (
                      <li key={doc.name} className="id-doc-item">
                        <FileText className="id-doc-icon" strokeWidth={2} />
                        {doc.verified && (
                          <Shield className="id-doc-verified" strokeWidth={2} />
                        )}
                        <span className="id-doc-name">{doc.name}</span>
                        <span className="id-doc-meta">PDF • {doc.size}</span>
                        <button
                          type="button"
                          className="id-doc-download"
                          aria-label={`Download ${doc.name}`}
                        >
                          <Download className="w-4 h-4" strokeWidth={2} />
                        </button>
                      </li>
                    ))}
                  </ul>
                </section>
                <section className="id-section">
                  <div className="id-section-head">
                    <h2 className="id-section-title">Active Assigned Groups</h2>
                    <Link href="#" className="id-link-view-all">
                      View All Cohorts →
                    </Link>
                  </div>
                  <div className="id-table-wrap">
                    <table className="id-table">
                      <thead>
                        <tr>
                          <th>COHORT NAME</th>
                          <th>PROGRAM</th>
                          <th>STUDENTS</th>
                          <th>STATUS</th>
                          <th>ACTION</th>
                        </tr>
                      </thead>
                      <tbody>
                        {data.assignedCohorts.map((row) => (
                          <tr key={row.id}>
                            <td className="id-cell-cohort">{row.cohortName}</td>
                            <td>{row.program}</td>
                            <td>{row.students} Students</td>
                            <td>
                              <span className={`id-cohort-status id-status-${row.status.toLowerCase().replace(" ", "-")}`}>
                                {row.status}
                              </span>
                            </td>
                            <td>
                              <button
                                type="button"
                                className="id-btn-icon"
                                aria-label="Actions"
                              >
                                <MoreHorizontal className="w-4 h-4" strokeWidth={2} />
                              </button>
                            </td>
                          </tr>
                        ))}
                      </tbody>
                    </table>
                  </div>
                </section>
              </div>
            )}

            {activeTab === "groups" && groupsData && (
              <div className="id-tab-panel id-groups-tab">
                <div className="id-groups-summary">
                  <div className="id-groups-card">
                    <Users className="id-groups-card-icon" strokeWidth={2} />
                    <div className="id-groups-card-main">
                      <span className="id-groups-card-value">
                        {groupsData.totalActiveGroups}
                      </span>
                      <span className="id-groups-card-label">Total Active Groups</span>
                    </div>
                    <span className="id-groups-trend id-trend-up">
                      <TrendingUp className="w-3 h-3" strokeWidth={2} />{" "}
                      {groupsData.totalActiveGroupsTrend}
                    </span>
                  </div>
                  <div className="id-groups-card">
                    <UserPlus className="id-groups-card-icon" strokeWidth={2} />
                    <div className="id-groups-card-main">
                      <span className="id-groups-card-value">
                        {groupsData.currentStudentReach}
                      </span>
                      <span className="id-groups-card-label">Current Student Reach</span>
                      <span className="id-groups-capacity">
                        Capacity utilization: {groupsData.capacityUtilization}%
                      </span>
                    </div>
                  </div>
                </div>
                <div className="id-groups-manage">
                  <div className="id-groups-manage-head">
                    <h2 className="id-groups-manage-title">Manage Cohorts</h2>
                    <div className="id-groups-manage-actions">
                      <button type="button" className="id-btn-secondary">
                        <Filter className="w-4 h-4" strokeWidth={2} /> Filter
                      </button>
                      <button type="button" className="id-btn-primary">
                        <Plus className="w-4 h-4" strokeWidth={2} /> Assign Group
                      </button>
                    </div>
                  </div>
                  <div className="id-groups-table-wrap">
                    <table className="id-groups-table">
                      <thead>
                        <tr>
                          <th>GROUP NAME</th>
                          <th>COURSE TITLE</th>
                          <th>PERIOD</th>
                          <th>STUDENTS</th>
                          <th>ATTENDANCE</th>
                          <th>STATUS</th>
                          <th>ACTIONS</th>
                        </tr>
                      </thead>
                      <tbody>
                        {groupsPaginated.map((row) => (
                          <tr key={row.id}>
                            <td className="id-groups-cell-name">{row.groupName}</td>
                            <td>{row.courseTitle}</td>
                            <td>
                              {row.periodStart} - {row.periodEnd}
                            </td>
                            <td>
                              <div className="id-groups-students">
                                <div className="id-groups-students-bar-wrap">
                                  <div
                                    className={`id-groups-students-bar ${
                                      row.status === "Completed"
                                        ? "id-groups-students-bar-completed"
                                        : "id-groups-students-bar-active"
                                    }`}
                                    style={{
                                      width: `${(row.studentsCurrent / row.studentsMax) * 100}%`,
                                    }}
                                  />
                                </div>
                                <span>
                                  {row.studentsCurrent}/{row.studentsMax}
                                </span>
                              </div>
                            </td>
                            <td>
                              {row.attendancePercent != null
                                ? `${row.attendancePercent}%`
                                : "—"}
                            </td>
                            <td>
                              <span
                                className={`id-groups-status id-groups-status-${row.status.toLowerCase()}`}
                              >
                                {row.status}
                              </span>
                            </td>
                            <td>
                              <button
                                type="button"
                                className="id-btn-icon"
                                aria-label="View details"
                                title="View details"
                              >
                                <Eye className="w-4 h-4" strokeWidth={2} />
                              </button>
                            </td>
                          </tr>
                        ))}
                      </tbody>
                    </table>
                  </div>
                  <div className="id-groups-pagination">
                    <span className="id-groups-pagination-text">
                      Showing {(groupsPage - 1) * GROUPS_PER_PAGE + 1}-
                      {Math.min(
                        groupsPage * GROUPS_PER_PAGE,
                        groupsData.cohorts.length
                      )}{" "}
                      of {groupsData.totalAssignedGroups} assigned groups
                    </span>
                    <div className="id-groups-pagination-btns">
                      <button
                        type="button"
                        className="id-pagination-btn"
                        onClick={() => setGroupsPage((p) => Math.max(1, p - 1))}
                        disabled={groupsPage <= 1}
                        aria-label="Previous page"
                      >
                        <ChevronLeft className="w-4 h-4" strokeWidth={2} />
                      </button>
                      <button
                        type="button"
                        className="id-pagination-btn"
                        onClick={() =>
                          setGroupsPage((p) => Math.min(groupsTotalPages, p + 1))
                        }
                        disabled={groupsPage >= groupsTotalPages}
                        aria-label="Next page"
                      >
                        <ChevronRight className="w-4 h-4" strokeWidth={2} />
                      </button>
                    </div>
                  </div>
                </div>
              </div>
            )}
            {activeTab === "schedule" && (
              <div className="id-tab-panel">
                <p className="id-placeholder">Schedule content.</p>
              </div>
            )}
            {activeTab === "feedback" && data.feedbackTab && (
              <div className="id-tab-panel id-feedback-tab">
                <div className="id-feedback-head">
                  <div className="id-feedback-search-wrap">
                    <Search className="id-feedback-search-icon" strokeWidth={2} />
                    <input
                      type="search"
                      placeholder="Search reviews..."
                      className="id-feedback-search"
                      aria-label="Search reviews"
                    />
                  </div>
                  <button type="button" className="id-btn-primary">
                    <Download className="w-4 h-4" strokeWidth={2} /> Export Review Report
                  </button>
                </div>
                <div className="id-feedback-cards id-feedback-row1">
                  <div className="id-fb-card id-fb-overall">
                    <h3 className="id-fb-card-title">Overall Rating</h3>
                    <p className="id-fb-overall-value">
                      {data.feedbackTab.overallRating} <span className="id-fb-overall-max">/ 5.0</span>
                    </p>
                    <div className="id-fb-stars" aria-label={`${data.feedbackTab.overallRating} out of 5`}>
                      {[1, 2, 3, 4, 5].map((i) => (
                        <Star
                          key={i}
                          className={`id-fb-star ${i <= Math.floor(data.feedbackTab.overallRating) ? "id-fb-star-full" : ""}`}
                          fill={i <= data.feedbackTab.overallRating ? "currentColor" : "none"}
                          strokeWidth={0}
                        />
                      ))}
                    </div>
                    <p className="id-fb-review-count">
                      {data.feedbackTab.totalReviews} reviews
                    </p>
                  </div>
                  <div className="id-fb-card id-fb-sentiment">
                    <h3 className="id-fb-card-title">Sentiment Analysis</h3>
                    <div className="id-fb-sentiment-bar">
                      <div
                        className="id-fb-sentiment-seg id-fb-sentiment-positive"
                        style={{ width: `${data.feedbackTab.sentiment.positive}%` }}
                        title={`${data.feedbackTab.sentiment.positive}% Positive`}
                      />
                      <div
                        className="id-fb-sentiment-seg id-fb-sentiment-neutral"
                        style={{ width: `${data.feedbackTab.sentiment.neutral}%` }}
                        title={`${data.feedbackTab.sentiment.neutral}% Neutral`}
                      />
                      <div
                        className="id-fb-sentiment-seg id-fb-sentiment-negative"
                        style={{ width: `${data.feedbackTab.sentiment.negative}%` }}
                        title={`${data.feedbackTab.sentiment.negative}% Negative`}
                      />
                    </div>
                    <div className="id-fb-sentiment-labels">
                      <span className="id-fb-sentiment-label id-fb-sentiment-label-pos">
                        {data.feedbackTab.sentiment.positive}% POSITIVE
                      </span>
                      <span className="id-fb-sentiment-label id-fb-sentiment-label-neu">
                        {data.feedbackTab.sentiment.neutral}% NEUTRAL
                      </span>
                      <span className="id-fb-sentiment-label id-fb-sentiment-label-neg">
                        {data.feedbackTab.sentiment.negative}% NEGATIVE
                      </span>
                    </div>
                  </div>
                  <div className="id-fb-card id-fb-insights">
                    <h3 className="id-fb-card-title">
                      <Sparkles className="w-4 h-4" strokeWidth={2} /> Smart Insights
                    </h3>
                    <div className="id-fb-insight-item id-fb-insight-strength">
                      <Plus className="id-fb-insight-icon" strokeWidth={2} />
                      <p>
                        {data.feedbackTab.smartInsights.strength}{" "}
                        <strong>{data.feedbackTab.smartInsights.strengthHighlight}</strong> in the last 90 days.
                      </p>
                    </div>
                    <div className="id-fb-insight-item id-fb-insight-growth">
                      <TrendingUp className="id-fb-insight-icon" strokeWidth={2} />
                      <p>
                        {data.feedbackTab.smartInsights.growth}{" "}
                        <strong>{data.feedbackTab.smartInsights.growthHighlight}</strong> {data.feedbackTab.smartInsights.growthSuffix}
                      </p>
                    </div>
                    <div className="id-fb-insight-item id-fb-insight-tip">
                      <Info className="id-fb-insight-icon" strokeWidth={2} />
                      <p>{data.feedbackTab.smartInsights.tip}</p>
                    </div>
                    <button type="button" className="id-btn-secondary id-fb-action-plan">
                      VIEW ACTION PLAN
                    </button>
                  </div>
                </div>
                <div className="id-feedback-row2">
                  <div className="id-fb-card id-fb-trends">
                    <h3 className="id-fb-card-title">
                      <LineChart className="w-4 h-4" strokeWidth={2} /> Rating Trends (6 Months)
                    </h3>
                    <div className="id-fb-chart-placeholder">
                      <span className="id-fb-chart-ax">JAN</span>
                      <span className="id-fb-chart-ax">FEB</span>
                      <span className="id-fb-chart-ax">MAR</span>
                      <span className="id-fb-chart-ax">APR</span>
                      <span className="id-fb-chart-ax">MAY</span>
                      <span className="id-fb-chart-ax">JUN</span>
                    </div>
                  </div>
                  <div className="id-fb-card id-fb-categories">
                    <h3 className="id-fb-card-title">
                      <BarChart3 className="w-4 h-4" strokeWidth={2} /> Average Category Scores
                    </h3>
                    <ul className="id-fb-cat-list">
                      {data.feedbackTab.categoryScores.map((c) => (
                        <li key={c.name} className="id-fb-cat-item">
                          <span className="id-fb-cat-name">{c.name}</span>
                          <span className="id-fb-cat-score">{c.score}</span>
                          <div className="id-fb-cat-bar-wrap">
                            <div
                              className="id-fb-cat-bar"
                              style={{ width: `${(c.score / 5) * 100}%` }}
                            />
                          </div>
                        </li>
                      ))}
                    </ul>
                  </div>
                </div>
                <section className="id-fb-recent">
                  <div className="id-fb-recent-head">
                    <h2 className="id-fb-recent-title">Recent Reviews</h2>
                    <select className="id-fb-sort" aria-label="Sort reviews">
                      <option>Newest First</option>
                      <option>Oldest First</option>
                      <option>Highest Rating</option>
                      <option>Lowest Rating</option>
                    </select>
                  </div>
                  <ul className="id-fb-review-list">
                    {data.feedbackTab.recentReviews.map((r) => (
                      <li key={r.id} className="id-fb-review-card">
                        <div className="id-fb-review-meta">
                          {r.reviewerAvatar ? (
                            <img src={r.reviewerAvatar} alt="" className="id-fb-review-avatar" />
                          ) : (
                            <div className="id-fb-review-avatar id-fb-review-avatar-ph">
                              {r.reviewerName.slice(0, 2).toUpperCase()}
                            </div>
                          )}
                          <div className="id-fb-review-info">
                            <span className="id-fb-review-name">{r.reviewerName}</span>
                            <span className="id-fb-review-course">Course: {r.course}</span>
                            <div className="id-fb-review-rating">
                              {[1, 2, 3, 4, 5].map((i) => (
                                <Star
                                  key={i}
                                  className="id-fb-review-star"
                                  fill={i <= r.rating ? "currentColor" : "none"}
                                  strokeWidth={0}
                                />
                              ))}
                              <span className="id-fb-review-date">{r.date}</span>
                            </div>
                          </div>
                        </div>
                        <div className="id-fb-review-strengths">
                          <ThumbsUp className="id-fb-review-section-icon" strokeWidth={2} />
                          <div>
                            <span className="id-fb-review-section-label">STRENGTHS:</span>
                            <p>{r.strengths}</p>
                          </div>
                        </div>
                        <div className="id-fb-review-weaknesses">
                          <FileText className="id-fb-review-section-icon" strokeWidth={2} />
                          <div>
                            <span className="id-fb-review-section-label">WEAKNESSES:</span>
                            <p>{r.weaknesses}</p>
                          </div>
                        </div>
                      </li>
                    ))}
                  </ul>
                </section>
              </div>
            )}
          </div>

          {/* Right sidebar */}
          <aside className="id-sidebar">
            {activeTab === "feedback" && data.feedbackTab ? (
              <>
                <div className="id-sidebar-card">
                  <h3 className="id-sidebar-title id-fb-sidebar-title">COURSE PERFORMANCE</h3>
                  <ul className="id-fb-course-perf">
                    {data.feedbackTab.coursePerformance.map((c) => (
                      <li key={c.courseName} className="id-fb-course-perf-item">
                        {c.icon === "truck" && <Truck className="id-fb-course-icon" strokeWidth={2} />}
                        {c.icon === "building" && <Building2 className="id-fb-course-icon" strokeWidth={2} />}
                        {c.icon === "clipboard" && <ClipboardList className="id-fb-course-icon" strokeWidth={2} />}
                        <span className="id-fb-course-name">{c.courseName}</span>
                        <span className="id-fb-course-score">{c.score}</span>
                      </li>
                    ))}
                  </ul>
                </div>
                <button type="button" className="id-btn-primary id-fb-bulk-reply">
                  <MessageCircle className="w-4 h-4" strokeWidth={2} /> Bulk Reply to Feedback
                </button>
              </>
            ) : activeTab === "groups" && groupsData ? (
              <>
                <div className="id-sidebar-card">
                  <h3 className="id-sidebar-title id-sidebar-title-with-icon">
                    <BarChart3 className="w-5 h-5" strokeWidth={2} />
                    Workload Analytics
                  </h3>
                  <p className="id-wa-weekly">
                    Weekly Teaching Hours <strong>{groupsData.workloadWeeklyHours}h</strong>
                  </p>
                  <div className="id-wa-bar-wrap">
                    <span className="id-wa-bar-label">
                      {data.name}: {groupsData.workloadWeeklyHours} / {groupsData.workloadMaxHours} hrs
                    </span>
                    <div className="id-wa-bar">
                      <div
                        className="id-wa-bar-fill id-wa-bar-blue"
                        style={{
                          width: `${(groupsData.workloadWeeklyHours / groupsData.workloadMaxHours) * 100}%`,
                        }}
                      />
                    </div>
                  </div>
                  <div className="id-wa-bar-wrap">
                    <span className="id-wa-bar-label">
                      Department Avg.: {groupsData.workloadDeptAvgHours} / {groupsData.workloadDeptMaxHours} hrs
                    </span>
                    <div className="id-wa-bar">
                      <div
                        className="id-wa-bar-fill id-wa-bar-gray"
                        style={{
                          width: `${(groupsData.workloadDeptAvgHours / groupsData.workloadDeptMaxHours) * 100}%`,
                        }}
                      />
                    </div>
                  </div>
                  <div className="id-wa-distribution">
                    <span className="id-wa-dist-label">Group Distribution</span>
                    <div className="id-wa-stacked-bar">
                      {groupsData.groupDistribution.map((d) => (
                        <div
                          key={d.label}
                          className={`id-wa-stacked-segment id-wa-${d.color}`}
                          style={{ width: `${d.percent}%` }}
                          title={`${d.label} ${d.percent}%`}
                        />
                      ))}
                    </div>
                    <div className="id-wa-legend">
                      {groupsData.groupDistribution.map((d) => (
                        <span key={d.label} className="id-wa-legend-item">
                          <i className={`id-wa-legend-dot id-wa-${d.color}`} /> {d.label}: {d.percent}%
                        </span>
                      ))}
                    </div>
                  </div>
                  <div className="id-wa-insight">
                    <Lightbulb className="id-wa-insight-icon" strokeWidth={2} />
                    <p>{groupsData.workloadInsight}</p>
                  </div>
                </div>
                <div className="id-sidebar-card">
                  <h3 className="id-sidebar-title">Quick Shortcuts</h3>
                  <Link href="#" className="id-shortcut-link">
                    <Calendar className="w-4 h-4" strokeWidth={2} /> Group Schedule
                  </Link>
                  <Link href="#" className="id-shortcut-link">
                    <Download className="w-4 h-4" strokeWidth={2} /> Export Current Cohorts
                  </Link>
                  <Link href="#" className="id-shortcut-link">
                    <Mail className="w-4 h-4" strokeWidth={2} /> Blast All Students
                  </Link>
                </div>
              </>
            ) : (
              <>
                <div className="id-sidebar-card">
                  <div className="id-sidebar-card-head">
                    <h3 className="id-sidebar-title">Workload Health</h3>
                    <button type="button" className="id-btn-icon-sm" aria-label="Info">
                      <Info className="w-4 h-4" strokeWidth={2} />
                    </button>
                  </div>
                  <div className="id-workload-circle-wrap">
                    <div
                      className="id-workload-circle"
                      style={{ "--pct": data.workloadPercent } as React.CSSProperties}
                    >
                      <span className="id-workload-value">{data.workloadPercent}%</span>
                      <span className="id-workload-label">{data.workloadLabel}</span>
                    </div>
                  </div>
                  <div className="id-workload-bar-wrap">
                    <span className="id-workload-bar-label">
                      Teaching Hours: {data.teachingHours}/{data.teachingHoursMax} hrs
                    </span>
                    <div className="id-workload-bar">
                      <div
                        className="id-workload-bar-fill"
                        style={{
                          width: `${(data.teachingHours / data.teachingHoursMax) * 100}%`,
                        }}
                      />
                    </div>
                  </div>
                  <p className="id-workload-pending">Grading Queue: {data.gradingPending} pending.</p>
                </div>

                <div className="id-sidebar-card">
                  <h3 className="id-sidebar-title">Contract & Payroll</h3>
                  <p className="id-payout-row">
                    <Clock className="id-payout-icon" strokeWidth={2} />
                    Next Payout: Expected {data.nextPayoutDate}
                  </p>
                  <p className="id-payout-amount">{data.nextPayoutAmount}</p>
                  <button type="button" className="id-btn-secondary id-btn-full">
                    Manage Contract
                  </button>
                  <Link href="#" className="id-sidebar-link">
                    Download Tax Forms <ArrowRight className="w-4 h-4" strokeWidth={2} />
                  </Link>
                  <Link href="#" className="id-sidebar-link">
                    Payment History <ArrowRight className="w-4 h-4" strokeWidth={2} />
                  </Link>
                </div>

                <div className="id-sidebar-card id-quick-action">
                  <span className="id-quick-action-badge">QUICK ACTION</span>
                  <h3 className="id-quick-action-title">Annual Performance Review</h3>
                  <p className="id-quick-action-desc">
                    Schedule the yearly assessment with this instructor to review student feedback and set new targets.
                  </p>
                  <button type="button" className="id-quick-action-btn">
                    Initiate Review
                  </button>
                </div>
              </>
            )}
          </aside>
        </div>
      </div>
    </div>
  );
}
