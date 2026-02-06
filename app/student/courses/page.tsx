"use client";

import "./courses.css";
import { useState } from "react";
import Link from "next/link";
import {
  Search,
  Bell,
  Play,
  Heart,
  User,
  Award,
  Clock,
  Trophy,
  Flame,
  BadgeCheck,
} from "lucide-react";
import {
  myCoursesData,
  learningStats,
  type MyCourseCard,
} from "./courses-data";

type FilterKey = "all" | "active" | "completed" | "favorites";

const filterTabs: { key: FilterKey; label: string }[] = [
  { key: "all", label: "All Courses" },
  { key: "active", label: "Active" },
  { key: "completed", label: "Completed" },
  { key: "favorites", label: "Favorites" },
];

export default function StudentCoursesPage() {
  const [filter, setFilter] = useState<FilterKey>("all");

  return (
    <div className="mc-page">
      {/* Header row: Title + Search + Bell + Avatar */}
      <div className="mc-header-row">
        <h1 className="mc-page-title">My Courses</h1>
        <div className="mc-header-right">
          <div className="mc-search-wrap">
            <Search className="w-4 h-4 mc-search-icon" strokeWidth={2} />
            <input
              type="search"
              placeholder="Search your courses..."
              aria-label="Search courses"
            />
          </div>
          <button
            type="button"
            className="mc-bell-btn"
            aria-label="Notifications"
          >
            <Bell className="w-5 h-5" strokeWidth={2} />
            <span className="mc-bell-dot" />
          </button>
          <div className="mc-avatar" aria-hidden />
        </div>
      </div>

      {/* Filters + Sort */}
      <div className="mc-toolbar">
        <div className="mc-filters">
          {filterTabs.map(({ key, label }) => (
            <button
              key={key}
              type="button"
              onClick={() => setFilter(key)}
              className={`mc-filter-btn ${filter === key ? "active" : ""}`}
            >
              {label}
            </button>
          ))}
        </div>
        <div className="mc-sort-wrap">
          <span className="mc-sort-label">Sort by:</span>
          <select className="mc-sort-select" aria-label="Sort courses">
            <option>Recently Accessed</option>
            <option>Progress</option>
            <option>Title</option>
          </select>
        </div>
      </div>

      <div className="mc-content">
        {/* Course cards grid */}
        <div className="mc-grid">
          {myCoursesData.map((course) => (
            <CourseCard key={course.id} course={course} />
          ))}
        </div>

        {/* Stats */}
        <div className="mc-stats">
          <div className="mc-stat-card">
            <div className="mc-stat-icon blue">
              <Clock className="w-6 h-6" strokeWidth={2} />
            </div>
            <div>
              <p className="mc-stat-value">{learningStats.learningTime}</p>
              <p className="mc-stat-sub">{learningStats.learningTimeSub}</p>
            </div>
          </div>
          <div className="mc-stat-card">
            <div className="mc-stat-icon gold">
              <Trophy className="w-6 h-6" strokeWidth={2} />
            </div>
            <div>
              <p className="mc-stat-value">{learningStats.coursesFinished}</p>
              <p className="mc-stat-sub">{learningStats.coursesFinishedSub}</p>
            </div>
          </div>
          <div className="mc-stat-card">
            <div className="mc-stat-icon green">
              <Flame className="w-6 h-6" strokeWidth={2} />
            </div>
            <div>
              <p className="mc-stat-value">{learningStats.dailyStreak}</p>
              <p className="mc-stat-sub">{learningStats.dailyStreakSub}</p>
            </div>
          </div>
        </div>

        {/* CTA Banner */}
        <div className="mc-cta-banner">
          <p className="mc-cta-text">
            Ready to expand your skills? Discover 50+ new specialized courses in
            AI, Blockchain and Data Science. Student discounts applied
            automatically.
          </p>
          <div className="mc-cta-btn-wrap">
            <Link href="#" className="mc-cta-btn">
              Explore Catalog
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
}

function CourseCard({ course }: { course: MyCourseCard }) {
  const isCompleted = course.progress === null;

  return (
    <article className="mc-card">
      <div className={`mc-card-banner ${course.bannerVariant}`}>
        {course.bannerText && <span>{course.bannerText}</span>}
        <button
          type="button"
          className={`mc-card-heart ${course.isFavorite ? "favorited" : ""}`}
          aria-label={
            course.isFavorite ? "Remove from favorites" : "Add to favorites"
          }
        >
          <Heart
            className="w-5 h-5"
            strokeWidth={2}
            fill={course.isFavorite ? "currentColor" : "none"}
          />
        </button>
      </div>
      <div className="mc-card-body">
        <div className="mc-card-tags">
          {course.tags.map((tag) => (
            <span key={tag.label} className={`mc-tag ${tag.variant}`}>
              {tag.label}
            </span>
          ))}
        </div>
        <h2 className="mc-card-title">{course.title}</h2>
        <p className="mc-card-instructor">
          <User className="w-4 h-4 shrink-0" strokeWidth={2} />
          {course.instructor}
        </p>
        {isCompleted ? (
          <p className="mc-card-completed">Completed</p>
        ) : (
          <div className="mc-card-progress-row">
            <span className="mc-card-progress-label">Progress</span>
            <div className="mc-card-progress-bar">
              <div
                className="mc-card-progress-fill"
                style={{ width: `${course.progress}%` }}
              />
            </div>
            <span className="mc-card-progress-pct">{course.progress}%</span>
          </div>
        )}
        <Link href="#" className={`mc-card-btn ${course.buttonVariant}`}>
          {course.buttonLabel === "Resume Learning" && (
            <Play className="w-4 h-4" strokeWidth={2} />
          )}
          {course.buttonLabel === "View Certificate" && (
            <BadgeCheck className="w-4 h-4" strokeWidth={2} />
          )}
          {course.buttonLabel}
        </Link>
      </div>
    </article>
  );
}
