"use client";

import { useParams, useRouter } from "next/navigation";
import Link from "next/link";
import { useState, useEffect } from "react";
import {
  Briefcase,
  Calendar,
  BookOpen,
  CalendarIcon,
  X,
  Info,
  Plus,
} from "lucide-react";
import { ROUTES } from "@/constants";
import { getGroupDetail } from "../group-detail-data";
import "../../new/add-group-form.css";

const DAYS = ["Mon", "Tue", "Wed", "Thu", "Fri", "Sat", "Sun"] as const;

const MOCK_LMS_COURSES = [
  { id: "1", title: "Computer Science Fundamentals", code: "CS-101" },
  { id: "2", title: "Data Analytics Bootcamp", code: "DA-200" },
  { id: "3", title: "MBA Core Curriculum", code: "MBA-100" },
];

function periodToDateInput(periodStr: string): string {
  if (!periodStr?.trim()) return "";
  const d = new Date(periodStr.trim());
  return isNaN(d.getTime()) ? "" : d.toISOString().slice(0, 10);
}

export default function EditGroupPage() {
  const params = useParams();
  const router = useRouter();
  const id = (params?.id as string) ?? "";
  const data = getGroupDetail(id);

  const [groupName, setGroupName] = useState("");
  const [courseCategory, setCourseCategory] = useState("");
  const [subCategory, setSubCategory] = useState("");
  const [startDate, setStartDate] = useState("");
  const [endDate, setEndDate] = useState("");
  const [studyDays, setStudyDays] = useState<(typeof DAYS)[number][]>([]);
  const [selectedLmsCourses, setSelectedLmsCourses] = useState<
    (typeof MOCK_LMS_COURSES)[number][]
  >([]);
  const [lmsCourseToAdd, setLmsCourseToAdd] = useState("");

  useEffect(() => {
    if (data) {
      setGroupName(data.groupTitle);
      setStartDate(periodToDateInput(data.periodStart));
      setEndDate(periodToDateInput(data.periodEnd));
      setStudyDays((data.studyDays ?? []) as (typeof DAYS)[number][]);
      setSelectedLmsCourses(
        (data.assignedLms ?? []).map((code) => {
          const c = MOCK_LMS_COURSES.find((x) => x.code === code);
          return c ?? { id: code, title: code, code };
        })
      );
    }
  }, [data]);

  const addLmsCourse = () => {
    if (!lmsCourseToAdd) return;
    const course = MOCK_LMS_COURSES.find((c) => c.id === lmsCourseToAdd);
    if (course && !selectedLmsCourses.some((c) => c.id === course.id)) {
      setSelectedLmsCourses((prev) => [...prev, course]);
      setLmsCourseToAdd("");
    }
  };

  const removeLmsCourse = (id: string) => {
    setSelectedLmsCourses((prev) => prev.filter((c) => c.id !== id));
  };

  const toggleDay = (day: (typeof DAYS)[number]) => {
    setStudyDays((prev) =>
      prev.includes(day) ? prev.filter((d) => d !== day) : [...prev, day]
    );
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    router.push(ROUTES.ADMIN.GROUP(id));
  };

  if (!data) {
    return (
      <div className="agn-page">
        <div className="agn-breadcrumb">
          <nav className="agn-breadcrumb-nav">
            <Link href={ROUTES.ADMIN.GROUPS}>Groups</Link>
            <span className="agn-breadcrumb-sep">&gt;</span>
            <span className="agn-breadcrumb-current">Group not found</span>
          </nav>
        </div>
        <p className="agn-subtitle">Group not found.</p>
        <Link href={ROUTES.ADMIN.GROUPS}>Back to Groups</Link>
      </div>
    );
  }

  return (
    <div className="agn-page">
      <div className="agn-breadcrumb">
        <nav className="agn-breadcrumb-nav">
          <Link href={ROUTES.ADMIN.DASHBOARD}>Dashboard</Link>
          <span className="agn-breadcrumb-sep">&gt;</span>
          <Link href={ROUTES.ADMIN.GROUPS}>Groups</Link>
          <span className="agn-breadcrumb-sep">&gt;</span>
          <Link href={ROUTES.ADMIN.GROUP(id)}>{data.groupTitle}</Link>
          <span className="agn-breadcrumb-sep">&gt;</span>
          <span className="agn-breadcrumb-current">Edit Group</span>
        </nav>
      </div>

      <div className="agn-main">
        <header className="agn-header">
          <h1 className="agn-title">Edit Group</h1>
          <p className="agn-subtitle">
            Update group identity, schedule, and assigned LMS courses.
          </p>
        </header>

        <form className="agn-form" onSubmit={handleSubmit} noValidate>
          <section className="agn-card">
            <h2 className="agn-card-title">
              <Briefcase className="agn-card-icon" strokeWidth={2} />
              Group Identity
            </h2>
            <div className="agn-card-fields agn-grid-2x2">
              <div className="agn-field">
                <label className="agn-label" htmlFor="group-name">
                  Group Title
                </label>
                <input
                  id="group-name"
                  type="text"
                  className="agn-input"
                  placeholder="e.g. CS-2024-A"
                  value={groupName}
                  onChange={(e) => setGroupName(e.target.value)}
                />
              </div>
              <div className="agn-field">
                <label className="agn-label" htmlFor="course-category">
                  Course Category
                </label>
                <select
                  id="course-category"
                  className="agn-select"
                  value={courseCategory}
                  onChange={(e) => setCourseCategory(e.target.value)}
                >
                  <option value="">Select Category</option>
                  <option value="tech">Technology</option>
                  <option value="management">Management</option>
                  <option value="business">Business</option>
                </select>
              </div>
              <div className="agn-field">
                <label className="agn-label" htmlFor="sub-category">
                  Sub-Category
                </label>
                <select
                  id="sub-category"
                  className="agn-select"
                  value={subCategory}
                  onChange={(e) => setSubCategory(e.target.value)}
                >
                  <option value="">Select Sub-Category</option>
                  <option value="programming">Programming</option>
                  <option value="data">Data Science</option>
                </select>
              </div>
            </div>
          </section>

          <section className="agn-card">
            <h2 className="agn-card-title">
              <Calendar className="agn-card-icon" strokeWidth={2} />
              Timeline & Schedule
            </h2>
            <div className="agn-card-fields">
              <div className="agn-grid-2 agn-mb">
                <div className="agn-field">
                  <label className="agn-label" htmlFor="start-date">
                    Start Date
                  </label>
                  <div className="agn-input-wrap">
                    <input
                      id="start-date"
                      type="date"
                      className="agn-input agn-input-with-icon"
                      value={startDate}
                      onChange={(e) => setStartDate(e.target.value)}
                    />
                    <CalendarIcon
                      className="agn-input-icon"
                      strokeWidth={2}
                      aria-hidden
                    />
                  </div>
                </div>
                <div className="agn-field">
                  <label className="agn-label" htmlFor="end-date">
                    End Date
                  </label>
                  <div className="agn-input-wrap">
                    <input
                      id="end-date"
                      type="date"
                      className="agn-input agn-input-with-icon"
                      value={endDate}
                      onChange={(e) => setEndDate(e.target.value)}
                    />
                    <CalendarIcon
                      className="agn-input-icon"
                      strokeWidth={2}
                      aria-hidden
                    />
                  </div>
                </div>
              </div>
              <div className="agn-field">
                <label className="agn-label agn-label-below">
                  Select Study Days
                </label>
                <div className="agn-day-pills">
                  {DAYS.map((day) => (
                    <button
                      key={day}
                      type="button"
                      className={`agn-day-pill ${
                        studyDays.includes(day) ? "agn-day-pill-active" : ""
                      }`}
                      onClick={() => toggleDay(day)}
                    >
                      {day}
                    </button>
                  ))}
                </div>
              </div>
            </div>
          </section>

          <section className="agn-card">
            <h2 className="agn-card-title">
              <BookOpen className="agn-card-icon" strokeWidth={2} />
              Assign to LMS Course
            </h2>
            <div className="agn-card-fields">
              <div className="agn-field agn-lms-add-row">
                <label className="agn-label" htmlFor="lms-course">
                  Choose LMS Course
                </label>
                <div className="agn-lms-add-wrap">
                  <select
                    id="lms-course"
                    className="agn-select"
                    value={lmsCourseToAdd}
                    onChange={(e) => setLmsCourseToAdd(e.target.value)}
                  >
                    <option value="">Select course...</option>
                    {MOCK_LMS_COURSES.filter(
                      (c) => !selectedLmsCourses.some((s) => s.id === c.id)
                    ).map((c) => (
                      <option key={c.id} value={c.id}>
                        {c.code} – {c.title}
                      </option>
                    ))}
                  </select>
                  <button
                    type="button"
                    className="agn-btn-add-course"
                    onClick={addLmsCourse}
                    disabled={!lmsCourseToAdd}
                    aria-label="Add course"
                  >
                    <Plus className="w-4 h-4" /> Add
                  </button>
                </div>
              </div>
              {selectedLmsCourses.length > 0 && (
                <div className="agn-lms-chips">
                  {selectedLmsCourses.map((course) => (
                    <div key={course.id} className="agn-instructor-chip">
                      <div className="agn-chip-avatar" aria-hidden>
                        <BookOpen className="w-4 h-4" strokeWidth={2} />
                      </div>
                      <div className="agn-chip-info">
                        <span className="agn-chip-name">{course.title}</span>
                        <span className="agn-chip-title">{course.code}</span>
                      </div>
                      <button
                        type="button"
                        className="agn-chip-remove"
                        onClick={() => removeLmsCourse(course.id)}
                        aria-label={`Remove ${course.code}`}
                      >
                        <X className="w-4 h-4" strokeWidth={2} />
                      </button>
                    </div>
                  ))}
                </div>
              )}
            </div>
          </section>

          <div className="agn-actions">
            <Link href={ROUTES.ADMIN.GROUP(id)} className="agn-btn-cancel">
              Cancel
            </Link>
            <button type="submit" className="agn-btn-create">
              Save changes
            </button>
          </div>
        </form>

        <div className="agn-protip">
          <Info className="agn-protip-icon" strokeWidth={2} aria-hidden />
          <div>
            <p className="agn-protip-title">Edit Group</p>
            <p className="agn-protip-text">
              Changes to schedule or LMS assignments will apply to this cohort.
              Use the group detail page to manage enrolled students and
              instructors.
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}
