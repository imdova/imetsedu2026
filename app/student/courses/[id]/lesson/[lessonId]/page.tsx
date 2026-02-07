"use client";

import "./lesson.css";
import Link from "next/link";
import { useParams } from "next/navigation";
import { useState } from "react";
import {
  Search,
  Bell,
  ChevronDown,
  Play,
  Check,
  Lock,
  ChevronRight,
  ArrowLeft,
  SkipBack,
  SkipForward,
  Volume2,
  Settings,
  Maximize,
  Download,
  ClipboardList,
} from "lucide-react";
import { ROUTES } from "@/constants";
import { getLessonData } from "./lesson-data";
import type { SidebarModule, SidebarLesson } from "./lesson-data";
import { DEFAULT_QUIZ_ID } from "../../quiz/[quizId]/quiz-data";

export default function StudentLessonPage() {
  const params = useParams();
  const courseId = typeof params.id === "string" ? params.id : "";
  const lessonId = typeof params.lessonId === "string" ? params.lessonId : "";

  const data = getLessonData(courseId, lessonId);
  const [activeTab, setActiveTab] = useState<
    "overview" | "resources" | "notes" | "qa" | "quiz"
  >("overview");
  const [modules, setModules] = useState<SidebarModule[]>(data?.modules ?? []);

  const toggleModule = (id: string) => {
    setModules((prev) =>
      prev.map((m) => (m.id === id ? { ...m, expanded: !m.expanded } : m))
    );
  };

  if (!data) {
    return (
      <div className="slp-page">
        <p style={{ padding: 24 }}>Lesson not found.</p>
        <Link href={ROUTES.STUDENT.COURSES}>Back to My Courses</Link>
      </div>
    );
  }

  return (
    <div className="slp-page">
      {/* Top bar */}
      <header className="slp-topbar">
        <Link href={ROUTES.STUDENT.COURSES} className="slp-logo">
          <div className="slp-logo-icon">M</div>
          <span className="slp-logo-text">IMETS Academy</span>
        </Link>
        <nav className="slp-nav">
          <Link href={ROUTES.STUDENT.COURSES}>My Courses</Link>
          <Link href={ROUTES.STUDENT.DASHBOARD}>Dashboard</Link>
          <Link href={ROUTES.STUDENT.COURSES}>Resources</Link>
        </nav>
        <div className="slp-topbar-right">
          <div className="slp-search-wrap">
            <Search className="w-4 h-4 slp-search-icon" strokeWidth={2} />
            <input
              type="search"
              placeholder="Search lessons..."
              aria-label="Search lessons"
            />
          </div>
          <button
            type="button"
            className="slp-icon-btn"
            aria-label="Notifications"
          >
            <Bell className="w-5 h-5" strokeWidth={2} />
          </button>
          <button type="button" className="slp-profile">
            <div className="slp-avatar" aria-hidden />
            <ChevronDown className="w-4 h-4" strokeWidth={2} />
          </button>
        </div>
      </header>

      {/* Breadcrumb */}
      <nav className="slp-breadcrumb" aria-label="Breadcrumb">
        {data.breadcrumb.map((item, i) => (
          <span key={i}>
            {i > 0 && " > "}
            {i < data.breadcrumb.length - 1 ? (
              <Link href="#">{item}</Link>
            ) : (
              <span>{item}</span>
            )}
          </span>
        ))}
      </nav>

      <div className="slp-main">
        {/* Left sidebar - Course Content */}
        <aside className="slp-sidebar">
          <div className="slp-sidebar-header">
            <h2 className="slp-sidebar-title">Course Content</h2>
            <div className="slp-progress-bar">
              <div
                className="slp-progress-fill"
                style={{ width: `${data.progressPct}%` }}
              />
            </div>
            <p className="slp-progress-text">
              {data.progressPct}% Completed · {data.lessonsCompleted}/
              {data.lessonsTotal} Lessons
            </p>
          </div>
          <div className="slp-module-list">
            {modules.map((mod) => (
              <div
                key={mod.id}
                className={`slp-module ${mod.expanded ? "open" : ""}`}
              >
                <button
                  type="button"
                  className="slp-module-header"
                  onClick={() => toggleModule(mod.id)}
                >
                  {mod.title}
                  <ChevronRight
                    className="w-4 h-4 slp-module-chevron"
                    strokeWidth={2}
                  />
                </button>
                {mod.expanded &&
                  mod.lessons.map((lesson) => (
                    <LessonSidebarItem
                      key={lesson.id}
                      lesson={lesson}
                      courseId={courseId}
                      currentSlug={data.currentLesson.slug}
                    />
                  ))}
              </div>
            ))}
            <div className="slp-sidebar-quiz-section">
              <Link
                href={ROUTES.STUDENT.COURSE_QUIZ(courseId, DEFAULT_QUIZ_ID)}
                className="slp-sidebar-quiz"
              >
                <ClipboardList
                  className="w-4 h-4 slp-sidebar-quiz-icon"
                  strokeWidth={2}
                />
                <div className="slp-lesson-info">
                  <p className="slp-lesson-title">Mid-Term: Advanced Physics</p>
                  <p className="slp-lesson-meta">10 Questions · 60 mins</p>
                </div>
                <ChevronRight
                  className="w-4 h-4 slp-sidebar-quiz-arrow"
                  strokeWidth={2}
                />
              </Link>
            </div>
          </div>
          <Link
            href={ROUTES.STUDENT.COURSE_ROADMAP(courseId)}
            className="slp-course-overview"
          >
            <ArrowLeft className="w-4 h-4" strokeWidth={2} />
            Course Overview
          </Link>
        </aside>

        {/* Main content */}
        <div className="slp-content">
          <div className="slp-video-wrap">
            <div className="slp-video-placeholder">
              <button
                type="button"
                className="slp-video-play-btn"
                aria-label="Play"
              >
                <Play
                  className="w-10 h-10"
                  strokeWidth={2}
                  fill="currentColor"
                />
              </button>
            </div>
            <div className="slp-video-controls">
              <button type="button" aria-label="Pause">
                <Play className="w-5 h-5" strokeWidth={2} />
              </button>
              <button type="button" aria-label="Skip back">
                <SkipBack className="w-5 h-5" strokeWidth={2} />
              </button>
              <button type="button" aria-label="Skip forward">
                <SkipForward className="w-5 h-5" strokeWidth={2} />
              </button>
              <button type="button" aria-label="Volume">
                <Volume2 className="w-5 h-5" strokeWidth={2} />
              </button>
              <span className="slp-video-time">
                {data.currentLesson.currentTime} / {data.currentLesson.duration}
              </span>
              <div className="slp-video-progress">
                <div className="slp-video-progress-fill" />
              </div>
              <span className="slp-video-speed">1.0X</span>
              <button type="button" aria-label="Settings">
                <Settings className="w-5 h-5" strokeWidth={2} />
              </button>
              <button type="button" aria-label="Fullscreen">
                <Maximize className="w-5 h-5" strokeWidth={2} />
              </button>
            </div>
          </div>

          <Link
            href={ROUTES.STUDENT.COURSE_QUIZ(courseId, DEFAULT_QUIZ_ID)}
            className="slp-quiz-strip"
          >
            <p className="slp-quiz-strip-text">Mid-Term: Advanced Physics</p>
            <span className="slp-quiz-strip-link">Take Quiz →</span>
          </Link>

          <div className="slp-body">
            <div className="slp-tabs">
              <button
                type="button"
                className={`slp-tab ${
                  activeTab === "overview" ? "active" : ""
                }`}
                onClick={() => setActiveTab("overview")}
              >
                Overview
              </button>
              <button
                type="button"
                className={`slp-tab ${
                  activeTab === "resources" ? "active" : ""
                }`}
                onClick={() => setActiveTab("resources")}
              >
                Resources
              </button>
              <button
                type="button"
                className={`slp-tab ${activeTab === "notes" ? "active" : ""}`}
                onClick={() => setActiveTab("notes")}
              >
                Notes
              </button>
              <button
                type="button"
                className={`slp-tab ${activeTab === "qa" ? "active" : ""}`}
                onClick={() => setActiveTab("qa")}
              >
                Q&A ({data.qaCount})
              </button>
              <button
                type="button"
                className={`slp-tab ${activeTab === "quiz" ? "active" : ""}`}
                onClick={() => setActiveTab("quiz")}
              >
                Quiz
              </button>
            </div>

            {activeTab === "overview" && (
              <>
                <h1 className="slp-lesson-title">{data.currentLesson.title}</h1>
                <p className="slp-description">
                  {data.currentLesson.description}
                </p>
                <h3 className="slp-objectives-title">
                  Key Learning Objectives
                </h3>
                <ul className="slp-objectives-list">
                  {data.currentLesson.objectives.map((obj, i) => (
                    <li key={i}>{obj}</li>
                  ))}
                </ul>
                <div className="slp-resource-card">
                  <div className="slp-resource-icon">PDF</div>
                  <div className="slp-resource-info">
                    <p className="slp-resource-name">
                      {data.currentLesson.resource.name}
                    </p>
                    <p className="slp-resource-meta">
                      {data.currentLesson.resource.size} ·{" "}
                      {data.currentLesson.resource.type}
                    </p>
                  </div>
                  <button type="button" className="slp-resource-download">
                    <Download className="w-4 h-4" strokeWidth={2} />
                    Download
                  </button>
                </div>
              </>
            )}

            {activeTab === "resources" && (
              <p className="slp-description">
                Course resources will appear here.
              </p>
            )}
            {activeTab === "notes" && (
              <p className="slp-description">Your notes will appear here.</p>
            )}
            {activeTab === "qa" && (
              <p className="slp-description">
                Questions and answers ({data.qaCount}).
              </p>
            )}

            {activeTab === "quiz" && (
              <div className="slp-quiz-card">
                <h3 className="slp-quiz-card-title">
                  MID-TERM: ADVANCED PHYSICS
                </h3>
                <p className="slp-description">
                  Complete the mid-term quiz to test your understanding of this
                  module. You have 60 minutes and 10 multiple choice questions.
                </p>
                <Link
                  href={ROUTES.STUDENT.COURSE_QUIZ(courseId, DEFAULT_QUIZ_ID)}
                  className="slp-quiz-start-btn"
                >
                  Start Quiz
                </Link>
              </div>
            )}

            <div className="slp-nav-buttons">
              {data.prevLessonSlug ? (
                <Link
                  href={ROUTES.STUDENT.COURSE_LESSON(
                    courseId,
                    data.prevLessonSlug
                  )}
                  className="slp-nav-btn prev"
                >
                  <ArrowLeft className="w-4 h-4" strokeWidth={2} />
                  Previous Lesson
                </Link>
              ) : (
                <span />
              )}
              {data.nextLessonSlug ? (
                <Link
                  href={ROUTES.STUDENT.COURSE_LESSON(
                    courseId,
                    data.nextLessonSlug
                  )}
                  className="slp-nav-btn next"
                >
                  Next Lesson
                  <ChevronRight className="w-4 h-4" strokeWidth={2} />
                </Link>
              ) : (
                <span />
              )}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

function LessonSidebarItem({
  lesson,
  courseId,
  currentSlug,
}: {
  lesson: SidebarLesson;
  courseId: string;
  currentSlug: string;
}) {
  const isActive = lesson.slug === currentSlug;
  const isLocked = lesson.status === "locked";
  const href = isLocked
    ? undefined
    : ROUTES.STUDENT.COURSE_LESSON(courseId, lesson.slug);

  const content = (
    <>
      {lesson.status === "completed" && (
        <Check className="w-4 h-4 slp-lesson-icon" strokeWidth={2} />
      )}
      {lesson.status === "in_progress" && (
        <Play
          className="w-4 h-4 slp-lesson-icon play"
          strokeWidth={2}
          fill="currentColor"
        />
      )}
      {lesson.status === "locked" && (
        <Lock className="w-4 h-4 slp-lesson-icon locked" strokeWidth={2} />
      )}
      <div className="slp-lesson-info">
        <p className="slp-lesson-title">{lesson.title}</p>
        <p className="slp-lesson-meta">
          {lesson.status === "completed" && "Completed"}
          {lesson.status === "in_progress" && "In Progress"}
        </p>
      </div>
      <span className="slp-lesson-duration">{lesson.duration}</span>
    </>
  );

  if (isLocked) {
    return (
      <div
        className={`slp-lesson ${isActive ? "active" : ""}`}
        style={{ cursor: "default" }}
      >
        {content}
      </div>
    );
  }

  return (
    <Link
      href={href ?? "#"}
      className={`slp-lesson ${isActive ? "active" : ""}`}
    >
      {content}
    </Link>
  );
}
