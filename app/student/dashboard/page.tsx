"use client";

import "./dashboard.css";
import Link from "next/link";
import {
  Calendar,
  AlertCircle,
  Play,
  History,
  Megaphone,
  Plus,
  ChevronRight,
  Clock,
  CreditCard,
} from "lucide-react";
import { ROUTES } from "@/constants";
import {
  dashboardStats,
  nextUpSession,
  upcomingDeadlines,
  activeCourses,
  recentActivity,
  announcements,
} from "./dashboard-data";

export default function StudentDashboardPage() {
  return (
    <div className="sd-grid">
      {/* Welcome banner */}
      <section className="sd-welcome">
        <h2>Welcome back, Alex! 👋</h2>
        <p>
          You&apos;ve completed {dashboardStats.weeklyGoalPercent}% of your
          weekly learning goal. Keep it up!
        </p>
        <div className="sd-welcome-stats">
          <div className="sd-welcome-stat">
            <div className="sd-welcome-stat-label">Courses Active</div>
            <div className="sd-welcome-stat-value">
              {dashboardStats.coursesActive}
            </div>
          </div>
          <div className="sd-welcome-stat">
            <div className="sd-welcome-stat-label">Hours Learned</div>
            <div className="sd-welcome-stat-value">
              {dashboardStats.hoursLearned}
            </div>
          </div>
          <div className="sd-welcome-stat">
            <div className="sd-welcome-stat-label">Certificates</div>
            <div className="sd-welcome-stat-value">
              {dashboardStats.certificates}
            </div>
          </div>
        </div>
      </section>

      {/* Next Up */}
      <section className="sd-next-up">
        <h3 className="sd-section-title">
          <Calendar className="w-5 h-5 text-gray-600" strokeWidth={2} />
          Next Up
        </h3>
        <div className="sd-next-up-inner">
          <div className="sd-next-up-date">
            <span>{nextUpSession.date.split(" ")[0]}</span>
            <span>{nextUpSession.date.split(" ")[1]}</span>
          </div>
          <div className="sd-next-up-body">
            <span className="sd-next-up-tag">{nextUpSession.tag}</span>
            <div className="sd-next-up-title">{nextUpSession.title}</div>
            <div className="sd-next-up-time">
              <Clock className="w-4 h-4" strokeWidth={2} />
              {nextUpSession.time}
            </div>
            <button type="button" className="sd-btn-join">
              <Plus className="w-4 h-4" strokeWidth={2.5} />
              Join Now
            </button>
          </div>
        </div>
      </section>

      {/* Upcoming Deadlines */}
      <section className="sd-deadlines">
        <h3 className="sd-section-title">
          <AlertCircle className="w-5 h-5 text-gray-600" strokeWidth={2} />
          Upcoming Deadlines
        </h3>
        {upcomingDeadlines.map((d) => (
          <div key={d.id} className="sd-deadline-item">
            <div className={`sd-deadline-accent ${d.accent}`} />
            <div className="sd-deadline-text">
              <div className="sd-deadline-title">{d.title}</div>
              <div className="sd-deadline-due">{d.due}</div>
            </div>
            <ChevronRight
              className="w-5 h-5 sd-deadline-arrow"
              strokeWidth={2}
            />
          </div>
        ))}
      </section>

      {/* Fees & Installments */}
      <section className="sd-installments">
        <h3 className="sd-section-title">
          <CreditCard className="w-5 h-5 text-gray-600" strokeWidth={2} />
          Fees & Installments
        </h3>
        <Link
          href={ROUTES.STUDENT.INSTALLMENTS}
          className="sd-installments-card"
        >
          <div className="sd-installments-card-body">
            <div className="sd-installments-title">
              Manage your course fees and installments
            </div>
            <p className="sd-installments-desc">
              View payment roadmap, settle balances, and manage payment methods.
            </p>
            <span className="sd-installments-link">
              View installments
              <ChevronRight className="w-4 h-4" strokeWidth={2} />
            </span>
          </div>
        </Link>
      </section>

      {/* My Active Courses */}
      <section className="sd-courses">
        <div className="sd-courses-header">
          <h3 className="sd-section-title">
            <Play className="w-5 h-5 text-gray-600" strokeWidth={2} />
            My Active Courses
          </h3>
          <Link
            href={ROUTES.STUDENT.COURSES}
            className="text-sm font-medium text-primary hover:underline"
          >
            View All
          </Link>
        </div>
        <div className="sd-courses-list">
          {activeCourses.map((c) => (
            <div key={c.id} className="sd-course-card">
              <div className="sd-course-image">
                <span className="sd-course-module">{c.moduleLabel}</span>
              </div>
              <div className="sd-course-body">
                <div className="sd-course-title">{c.title}</div>
                <div className="sd-course-instructor">
                  Instructor: {c.instructor}
                </div>
                <div className="sd-course-footer">
                  <div className="sd-course-progress-wrap">
                    <div
                      className="sd-course-progress-ring"
                      style={{ "--p": `${c.progress}%` } as React.CSSProperties}
                    >
                      <div className="sd-course-progress-ring-inner">
                        {c.progress}%
                      </div>
                    </div>
                  </div>
                  <button type="button" className="sd-btn-continue">
                    Continue Learning
                  </button>
                </div>
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* Right column: Recent Activity + Announcements */}
      <div className="sd-right-col">
        <section className="sd-activity">
          <h3 className="sd-section-title">
            <History className="w-5 h-5 text-gray-600" strokeWidth={2} />
            Recent Activity
          </h3>
          <div className="sd-activity-list">
            {recentActivity.map((a) => {
              const colonIndex = a.text.indexOf(":");
              const label =
                colonIndex >= 0 ? a.text.slice(0, colonIndex + 1) : "";
              const rest =
                colonIndex >= 0 ? a.text.slice(colonIndex + 1).trim() : a.text;
              return (
                <div key={a.id} className="sd-activity-item">
                  <div className={`sd-activity-dot ${a.variant}`} />
                  <div>
                    <div className="sd-activity-time">{a.time}</div>
                    <div className="sd-activity-text">
                      <span
                        className={`highlight ${
                          a.variant === "grey" ? "" : a.variant
                        }`}
                      >
                        {label}
                      </span>{" "}
                      {rest}
                    </div>
                  </div>
                </div>
              );
            })}
          </div>
        </section>

        <section className="sd-announcements">
          <h3 className="sd-section-title">
            <Megaphone className="w-5 h-5 text-gray-600" strokeWidth={2} />
            Announcements
          </h3>
          {announcements.map((a) => (
            <div key={a.id} className="sd-announcement-card">
              <div className="sd-announcement-avatar">{a.avatar}</div>
              <div className="sd-announcement-body">
                <div className="sd-announcement-meta">
                  <span className="sd-announcement-author">{a.author}</span>
                  <span className="sd-announcement-time">{a.time}</span>
                </div>
                <p className="sd-announcement-message">{a.message}</p>
              </div>
            </div>
          ))}
        </section>
      </div>
    </div>
  );
}
