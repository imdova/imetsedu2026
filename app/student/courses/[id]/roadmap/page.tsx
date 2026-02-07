"use client";

import "./roadmap.css";
import Link from "next/link";
import { useParams } from "next/navigation";
import { useState } from "react";
import {
  Play,
  Check,
  FileText,
  HelpCircle,
  Video,
  Download,
  BarChart3,
  Lock,
  ChevronDown,
  Camera,
} from "lucide-react";
import { ROUTES } from "@/constants";
import { getRoadmapForCourse } from "./roadmap-data";
import type {
  RoadmapModule as RoadmapModuleType,
  RoadmapLesson,
} from "./roadmap-data";

export default function CourseRoadmapPage() {
  const params = useParams();
  const courseId = typeof params.id === "string" ? params.id : "";
  const [expandAll, setExpandAll] = useState(true);

  const roadmap = getRoadmapForCourse(courseId, "Course");
  const [modules, setModules] = useState<RoadmapModuleType[]>(
    roadmap.modules.map((m) => ({
      ...m,
      expanded: m.status !== "locked" && (m.expanded ?? true),
    }))
  );

  const toggleModule = (id: string) => {
    setModules((prev) =>
      prev.map((m) =>
        m.id === id && m.status !== "locked"
          ? { ...m, expanded: !m.expanded }
          : m
      )
    );
  };

  const handleExpandAll = () => {
    const next = !expandAll;
    setExpandAll(next);
    setModules((prev) =>
      prev.map((m) => (m.status !== "locked" ? { ...m, expanded: next } : m))
    );
  };

  return (
    <div className="crm-page">
      {/* Breadcrumb */}
      <nav className="crm-breadcrumb" aria-label="Breadcrumb">
        <Link href={ROUTES.STUDENT.DASHBOARD}>Home</Link>
        <span className="mx-2">/</span>
        <Link href={ROUTES.STUDENT.COURSES}>My Courses</Link>
        <span className="mx-2">/</span>
        <span>{roadmap.title}</span>
      </nav>

      {/* Course title + progress */}
      <div className="crm-hero">
        <div className="crm-hero-left">
          <h1 className="crm-hero-title">{roadmap.title}</h1>
          <div className="crm-hero-meta">
            <span className="crm-hero-dept">{roadmap.department}</span>
            <span>Instructor: {roadmap.instructor}</span>
            <span>{roadmap.semester}</span>
          </div>
        </div>
        <div className="crm-hero-progress-card">
          <div className="crm-hero-progress-label">Progress</div>
          <div className="crm-hero-progress-pct">{roadmap.progressPct}%</div>
          <div className="crm-hero-progress-bar">
            <div
              className="crm-hero-progress-bar-fill"
              style={{ width: `${roadmap.progressPct}%` }}
            />
          </div>
          <p className="crm-hero-progress-text">
            {roadmap.lessonsCompleted} of {roadmap.lessonsTotal} lessons
            completed
          </p>
          <Link href="#" className="crm-hero-resume-btn">
            <Play className="w-4 h-4" strokeWidth={2} />
            Resume Learning
          </Link>
        </div>
      </div>

      {/* Main: roadmap + sidebar */}
      <div className="crm-main">
        <section className="crm-roadmap-section">
          <div className="crm-roadmap-header">
            <h2 className="crm-roadmap-title">Course Roadmap & Syllabus</h2>
            <button
              type="button"
              className="crm-expand-all"
              onClick={handleExpandAll}
            >
              Expand All
            </button>
          </div>

          {modules.map((module) => (
            <ModuleCard
              key={module.id}
              module={module}
              onToggle={() => toggleModule(module.id)}
            />
          ))}
        </section>

        <aside className="crm-sidebar">
          <div className="crm-sidebar-card">
            <h3 className="crm-sidebar-card-title">
              <BarChart3 className="w-5 h-5" strokeWidth={2} />
              Academic Performance
            </h3>
            <div className="crm-sidebar-card-body">
              <p className="crm-grade-value">{roadmap.overallGrade}</p>
              <table className="crm-assessments-table">
                <thead>
                  <tr>
                    <th colSpan={2}>Recent Assessments</th>
                  </tr>
                </thead>
                <tbody>
                  {roadmap.recentAssessments.map((a) => (
                    <tr key={a.name}>
                      <td>{a.name}</td>
                      <td>{a.score}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>

          <div className="crm-sidebar-card">
            <h3 className="crm-sidebar-card-title">
              <FileText className="w-5 h-5" strokeWidth={2} />
              Course Resources
            </h3>
            <div className="crm-sidebar-card-body">
              {roadmap.resources.map((r) => (
                <div key={r.name} className="crm-resource-item">
                  <FileText
                    className="w-5 h-5 crm-resource-icon"
                    strokeWidth={2}
                  />
                  <div className="crm-resource-info">
                    <p className="crm-resource-name">{r.name}</p>
                    <p className="crm-resource-meta">
                      {r.type} • {r.size}
                    </p>
                  </div>
                  <button
                    type="button"
                    className="crm-resource-download"
                    aria-label={`Download ${r.name}`}
                  >
                    <Download className="w-5 h-5" strokeWidth={2} />
                  </button>
                </div>
              ))}
            </div>
          </div>

          <div className="crm-stats-card">
            <h3 className="crm-sidebar-card-title">Course Statistics</h3>
            <div className="crm-stats-grid">
              <div>
                <div className="crm-stat-item-label">Time Spent</div>
                <div className="crm-stat-item-value">{roadmap.timeSpent}</div>
              </div>
              <div>
                <div className="crm-stat-item-label">Class Rank</div>
                <div className="crm-stat-item-value">{roadmap.classRank}</div>
              </div>
              <div>
                <div className="crm-stat-item-label">Avg. Score</div>
                <div className="crm-stat-item-value">{roadmap.avgScore}</div>
              </div>
              <div>
                <div className="crm-stat-item-label">Streaks</div>
                <div className="crm-stat-item-value">{roadmap.streaks}</div>
              </div>
            </div>
            <p className="crm-next-session">
              Next Live Session: {roadmap.nextLiveSession}
            </p>
          </div>
        </aside>
      </div>

      {/* Footer */}
      <footer className="crm-footer">
        <span>© 2024 IMETS Education Platform</span>
        <div className="crm-footer-links">
          <Link href="#">Help Center</Link>
          <Link href="#">Privacy Policy</Link>
          <Link href="#">Student Support</Link>
        </div>
      </footer>
    </div>
  );
}

function ModuleCard({
  module,
  onToggle,
}: {
  module: RoadmapModuleType & { expanded?: boolean };
  onToggle: () => void;
}) {
  const isLocked = module.status === "locked";
  const isOpen = module.expanded && !isLocked;

  return (
    <div className={`crm-module ${isOpen ? "open" : ""}`}>
      <div
        className="crm-module-header"
        onClick={isLocked ? undefined : onToggle}
        role={isLocked ? undefined : "button"}
        aria-expanded={isOpen}
      >
        <div className="crm-module-number">{module.number}</div>
        <div className="crm-module-info">
          <h3 className="crm-module-title">{module.title}</h3>
          <p className="crm-module-summary">{module.summary}</p>
        </div>
        <div className={`crm-module-status ${module.status}`}>
          {module.status === "completed" && (
            <>
              <Check className="w-4 h-4" strokeWidth={2} />
              <span>Completed</span>
            </>
          )}
          {module.status === "in_progress" && (
            <span>{module.progressPct}% Complete</span>
          )}
          {module.status === "locked" && (
            <Lock className="w-5 h-5" strokeWidth={2} />
          )}
        </div>
        {!isLocked && (
          <ChevronDown className="w-5 h-5 crm-module-chevron" strokeWidth={2} />
        )}
      </div>
      {isOpen && module.lessons.length > 0 && (
        <div className="crm-module-body">
          {module.lessons.map((lesson) => (
            <LessonRow key={lesson.id} lesson={lesson} />
          ))}
        </div>
      )}
    </div>
  );
}

function LessonRow({ lesson }: { lesson: RoadmapLesson }) {
  const iconClass = `crm-lesson-icon ${lesson.type}`;
  const Icon =
    lesson.type === "video" || lesson.type === "live"
      ? lesson.type === "live"
        ? Camera
        : Video
      : lesson.type === "reading"
      ? FileText
      : HelpCircle;

  return (
    <div className="crm-lesson">
      <div className={iconClass}>
        <Icon className="w-4 h-4" strokeWidth={2} />
      </div>
      <div className="crm-lesson-info">
        <p className="crm-lesson-title">{lesson.title}</p>
        <p className="crm-lesson-meta">
          {lesson.type === "live" && lesson.date
            ? `${lesson.meta} • ${lesson.date}`
            : lesson.meta}
          {lesson.score != null && ` • Score: ${lesson.score}`}
        </p>
      </div>
      {lesson.completed && (
        <Check className="w-5 h-5 crm-lesson-done" strokeWidth={2} />
      )}
      {lesson.actionLabel && (
        <button type="button" className="crm-lesson-action">
          {lesson.actionLabel}
        </button>
      )}
    </div>
  );
}
