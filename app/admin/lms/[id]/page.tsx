"use client";

import { useParams } from "next/navigation";
import Link from "next/link";
import { useState } from "react";
import { Inter } from "next/font/google";
import { ROUTES } from "@/constants/routes";
import { getLMSCourseById, getLMSCourseDetail } from "../lms-data";

const inter = Inter({
  subsets: ["latin"],
  variable: "--font-lms-inter",
  display: "swap",
});
import {
  ChevronRight,
  MoreVertical,
  Plus,
  MessageCircle,
  Zap,
  Pencil,
  Calendar,
  Clock,
  GripVertical,
  ChevronDown,
  Play,
  Check,
  HelpCircle,
} from "lucide-react";
import "./lms-course-details.css";

type TabId = "overview" | "assigned-groups" | "study-materials" | "analytics";

const TABS: { id: TabId; label: string }[] = [
  { id: "overview", label: "Overview" },
  { id: "assigned-groups", label: "Assigned Groups" },
  { id: "study-materials", label: "Study Materials" },
  { id: "analytics", label: "Analytics" },
];

export default function LMSCourseDetailsPage() {
  const params = useParams();
  const id = typeof params.id === "string" ? params.id : "";
  const course = getLMSCourseById(id);
  const detail = getLMSCourseDetail(id);
  const [tab, setTab] = useState<TabId>("overview");
  const [expandedModuleId, setExpandedModuleId] = useState<string | null>("m1");

  if (!course) {
    return (
      <div className="min-h-screen bg-[#F8F9FA] p-6 lms-detail">
        <div className="bg-white rounded-xl shadow-sm border border-gray-100 p-8 text-center">
          <p className="text-gray-600 mb-4">Course not found.</p>
          <Link
            href={ROUTES.ADMIN.LMS_COURSES}
            className="text-[#2563eb] font-medium hover:underline"
          >
            ← Back to LMS Courses
          </Link>
        </div>
      </div>
    );
  }

  return (
    <div className={`min-h-screen bg-[#F8F9FA] lms-detail ${inter.variable}`} style={{ fontFamily: "var(--font-lms-inter), Inter, ui-sans-serif, system-ui, sans-serif" }}>
      {/* Breadcrumb */}
      <div className="bg-white border-b border-gray-200 px-6 py-3">
        <nav className="lms-breadcrumb flex items-center gap-2">
          <Link href={ROUTES.ADMIN.DASHBOARD}>Dashboard</Link>
          <ChevronRight className="w-4 h-4 text-gray-400 flex-shrink-0" />
          <Link href={ROUTES.ADMIN.LMS_COURSES}>Courses</Link>
          <ChevronRight className="w-4 h-4 text-gray-400 flex-shrink-0" />
          <span className="lms-breadcrumb-current truncate max-w-[220px]">
            {course.courseName}
          </span>
        </nav>
      </div>

      <div className="p-6 max-w-6xl mx-auto">
        {/* Course header: thumbnail, tags, title, meta, actions */}
        <div className="flex flex-col sm:flex-row sm:items-flex-start gap-4 mb-6">
          <div className="flex gap-4 flex-wrap">
            <div
              className="lms-course-thumb bg-gray-200"
              aria-hidden
            />
            <div>
              <div className="flex flex-wrap items-center gap-2">
                <span className="lms-tag-category">
                  {course.category.replace(/\s+/g, " ").toUpperCase()}
                </span>
                <span className="lms-tag-active">{course.status}</span>
              </div>
              <h1 className="lms-course-title">{course.courseName}</h1>
              <div className="lms-course-meta">
                <span className="flex items-center gap-1.5">
                  <Calendar className="w-4 h-4 text-gray-400" strokeWidth={2} />
                  Created {detail.createdAt}
                </span>
                <span className="flex items-center gap-1.5">
                  <Clock className="w-4 h-4 text-gray-400" strokeWidth={2} />
                  {detail.totalHours} Hours Total
                </span>
              </div>
            </div>
          </div>
          <div className="flex items-center gap-2 sm:ml-auto">
            <Link
              href={ROUTES.ADMIN.LMS_NEW}
              className="lms-btn-edit inline-flex items-center gap-2"
            >
              <Pencil className="w-4 h-4" strokeWidth={2} />
              Edit Course
            </Link>
            <button
              type="button"
              className="p-2 rounded-lg text-gray-500 hover:bg-gray-100"
              aria-label="More"
            >
              <MoreVertical className="w-5 h-5" strokeWidth={2} />
            </button>
          </div>
        </div>

        {/* Tabs */}
        <div className="lms-tabs">
          {TABS.map((t) => (
            <button
              key={t.id}
              type="button"
              onClick={() => setTab(t.id)}
              className={`lms-tab ${tab === t.id ? "lms-tab-active" : ""}`}
            >
              {t.label}
            </button>
          ))}
        </div>

        {tab === "overview" && (
          <>
            {/* Performance metrics */}
            <div className="grid grid-cols-2 sm:grid-cols-4 gap-4 mb-6">
              <div className="lms-metric-card">
                <p className="lms-metric-label">Total Enrolled</p>
                <p className="lms-metric-value lms-metric-value-primary">
                  {detail.totalEnrolled.toLocaleString()}
                </p>
              </div>
              <div className="lms-metric-card">
                <p className="lms-metric-label">Avg. Progress</p>
                <p className="lms-metric-value">{detail.avgProgress}%</p>
              </div>
              <div className="lms-metric-card">
                <p className="lms-metric-label">Quiz Pass Rate</p>
                <p className="lms-metric-value">{detail.quizPassRate}%</p>
              </div>
              <div className="lms-metric-card">
                <p className="lms-metric-label">Rating</p>
                <p className="lms-metric-value">{detail.rating}/5</p>
              </div>
            </div>

            {/* Two-column: Course Description | Sidebar */}
            <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 mb-6">
              <div className="lg:col-span-2">
                <div className="bg-white rounded-xl border border-gray-200 p-5 shadow-sm">
                  <h2 className="lms-section-title">Course Description</h2>
                  <p className="lms-description">{detail.description}</p>
                </div>
              </div>
              <div className="space-y-5">
                <div className="lms-sidebar-card">
                  <p className="lms-sidebar-label">Instructor</p>
                  <div className="flex items-center gap-3">
                    <div className="w-12 h-12 rounded-full bg-gray-200 shrink-0" />
                    <div>
                      <p className="lms-instructor-name">{course.instructor}</p>
                      <p className="lms-instructor-role">
                        {detail.instructorTitle}
                      </p>
                    </div>
                  </div>
                  <button type="button" className="lms-btn-contact inline-flex items-center justify-center gap-2">
                    <MessageCircle className="w-4 h-4" strokeWidth={2} />
                    Contact Instructor
                  </button>
                </div>
                <div className="lms-sidebar-card">
                  <p className="lms-sidebar-label">Course Meta</p>
                  <ul>
                    <li className="lms-meta-item">
                      Format: <strong>{detail.format}</strong>
                    </li>
                    <li className="lms-meta-item">
                      Difficulty: <strong>{detail.difficulty}</strong>
                    </li>
                    <li className="lms-meta-item">
                      Language: <strong>{detail.language}</strong>
                    </li>
                    <li className="lms-meta-item">
                      Quizzes: <strong>{detail.quizzesTotal} Total</strong>
                    </li>
                  </ul>
                </div>
                <div className="lms-sidebar-card">
                  <p className="lms-quick-insights-title">
                    <Zap className="w-4 h-4" strokeWidth={2} />
                    Quick Insights
                  </p>
                  <p className="lms-quick-insights-text">
                    {detail.quickInsight
                      .split(/(up \d+%)/i)
                      .map((part, i) =>
                        part.match(/^up \d+%$/i) ? (
                          <span key={i} className="lms-quick-insights-highlight">
                            {part}
                          </span>
                        ) : (
                          part
                        )
                      )}
                  </p>
                  <div className="lms-progress-bar">
                    <div
                      className="lms-progress-fill"
                      style={{ width: `${Math.min(detail.quickInsightPercent, 100)}%` }}
                    />
                  </div>
                </div>
              </div>
            </div>

            {/* Recent Assigned Groups */}
            <div className="lms-table-wrap mb-6">
              <div className="lms-table-header">
                <h2 className="lms-table-title">Recent Assigned Groups</h2>
                <button type="button" className="lms-view-all">
                  View All
                </button>
              </div>
              <table className="lms-table">
                <thead>
                  <tr>
                    <th>Group Name</th>
                    <th>Students</th>
                    <th>Start Date</th>
                    <th>Status</th>
                  </tr>
                </thead>
                <tbody>
                  {detail.recentGroups.map((g) => (
                    <tr key={g.name}>
                      <td>
                        <a href="#" className="lms-group-link">
                          {g.name}
                        </a>
                      </td>
                      <td>{g.students} Students</td>
                      <td>{g.date}</td>
                      <td>
                        <span
                          className={
                            g.status === "Upcoming"
                              ? "lms-badge-upcoming"
                              : "lms-badge-progress"
                          }
                        >
                          {g.status}
                        </span>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>

            {/* Study Materials Structure */}
            <div className="bg-white rounded-xl border border-gray-200 overflow-hidden shadow-sm">
              <div className="px-5 py-4 border-b border-gray-100 flex items-center justify-between">
                <h2 className="lms-section-title mb-0">
                  Study Materials Structure
                </h2>
                <button
                  type="button"
                  className="lms-add-module-btn"
                >
                  <Plus className="w-4 h-4" strokeWidth={2} />
                  Add Module
                </button>
              </div>
              <div className="p-4 space-y-0">
                {detail.modules.map((mod) => {
                  const isExpanded = expandedModuleId === mod.id;
                  const hasItems = mod.items.length > 0;
                  return (
                    <div key={mod.id} className="mb-2">
                      <button
                        type="button"
                        className="lms-module-header w-full text-left"
                        onClick={() =>
                          setExpandedModuleId(isExpanded ? null : mod.id)
                        }
                      >
                        <div className="lms-module-left">
                          <GripVertical
                            className="w-4 h-4 text-gray-400 flex-shrink-0"
                            strokeWidth={2}
                          />
                          <span className="lms-module-num">
                            {mod.id.replace("m", "")}
                          </span>
                          <span className="lms-module-title">{mod.title}</span>
                        </div>
                        <div className="flex items-center gap-2">
                          {mod.locked ? (
                            <span className="lms-module-locked">
                              {mod.locked}
                            </span>
                          ) : (
                            <span className="lms-module-meta">
                              {mod.lessonsCount} Lessons • {mod.quizzesCount} Quizzes
                            </span>
                          )}
                          <ChevronDown
                            className={`w-5 h-5 text-gray-500 flex-shrink-0 transition-transform ${
                              isExpanded ? "rotate-180" : ""
                            }`}
                            strokeWidth={2}
                          />
                        </div>
                      </button>
                      {isExpanded && hasItems && (
                        <div className="lms-module-content bg-white">
                          {mod.items.map((item, i) => (
                            <div
                              key={i}
                              className="lms-module-item"
                            >
                              {item.type === "YouTube" && (
                                <span className="lms-module-item-icon-video">
                                  <Play
                                    className="w-4 h-4"
                                    strokeWidth={2}
                                    fill="currentColor"
                                  />
                                </span>
                              )}
                              {item.type === "VdoCipher" && (
                                <span className="lms-module-item-icon-doc">
                                  <Check
                                    className="w-4 h-4"
                                    strokeWidth={2.5}
                                  />
                                </span>
                              )}
                              {item.type === "Quiz" && (
                                <span className="lms-module-item-icon-quiz">
                                  <HelpCircle
                                    className="w-4 h-4"
                                    strokeWidth={2}
                                  />
                                </span>
                              )}
                              <span className="lms-module-item-title">
                                {item.title}
                              </span>
                              <span
                                className={
                                  item.type === "YouTube"
                                    ? "lms-module-item-type-yt"
                                    : item.type === "VdoCipher"
                                      ? "lms-module-item-type-vdoc"
                                      : "lms-module-item-meta"
                                }
                              >
                                {item.type === "YouTube" && item.duration}
                                {item.type === "VdoCipher" && item.duration}
                                {item.type === "Quiz" && item.meta}
                              </span>
                            </div>
                          ))}
                        </div>
                      )}
                    </div>
                  );
                })}
              </div>
            </div>
          </>
        )}

        {tab === "assigned-groups" && (
          <div className="bg-white rounded-xl border border-gray-200 p-8 shadow-sm">
            <h2 className="lms-section-title">Assigned Groups</h2>
            <p className="lms-description mb-6">
              Manage groups assigned to this course.
            </p>
            <div className="border border-dashed border-gray-200 rounded-lg p-8 text-center text-gray-500">
              No groups assigned yet. Assign groups from the Overview or add
              them here.
            </div>
          </div>
        )}

        {tab === "study-materials" && (
          <div className="bg-white rounded-xl border border-gray-200 p-8 shadow-sm">
            <h2 className="lms-section-title">Study Materials</h2>
            <p className="lms-description mb-6">
              Manage modules, lessons, and resources for this course.
            </p>
            <div className="border border-dashed border-gray-200 rounded-lg p-8 text-center text-gray-500">
              Add modules and materials from the Overview tab or configure them
              here.
            </div>
          </div>
        )}

        {tab === "analytics" && (
          <div className="bg-white rounded-xl border border-gray-200 p-8 shadow-sm">
            <h2 className="lms-section-title">Analytics</h2>
            <p className="lms-description mb-6">
              View course analytics and engagement metrics.
            </p>
            <div className="border border-dashed border-gray-200 rounded-lg p-8 text-center text-gray-500">
              Analytics content can be added here.
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
