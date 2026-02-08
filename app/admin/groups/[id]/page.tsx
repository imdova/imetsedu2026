"use client";

import { useParams } from "next/navigation";
import Link from "next/link";
import { useState, useEffect, useMemo } from "react";
import {
  Calendar,
  Users,
  Pencil,
  Plus,
  List,
  CalendarDays,
  BookOpen,
  Filter,
  Download,
  Trash2,
  ChevronLeft,
  ChevronRight,
  Search,
  User,
} from "lucide-react";
import { ROUTES } from "@/constants";
import {
  getGroupDetail,
  SEARCHABLE_STUDENTS,
  AVAILABLE_LMS_COURSES,
  AVAILABLE_INSTRUCTORS,
  type EnrolledStudent,
} from "./group-detail-data";
import "./group-detail.css";

const STUDENTS_PER_PAGE = 4;

const SCHEDULE_DAYS = ["Mon", "Tue", "Wed", "Thu", "Fri", "Sat", "Sun"] as const;

function periodToDateInput(periodStr: string): string {
  if (!periodStr?.trim()) return "";
  const d = new Date(periodStr.trim());
  return isNaN(d.getTime()) ? "" : d.toISOString().slice(0, 10);
}

function todayFormatted(): string {
  const d = new Date();
  return d.toLocaleDateString("en-US", {
    month: "short",
    day: "2-digit",
    year: "numeric",
  });
}

function formatPeriod(start: string, end: string): string {
  const toShort = (s: string) => {
    const parts = s.replace(/,/g, "").trim().split(/\s+/);
    if (parts.length >= 2) return `${parts[0]} ${parts[1]}`;
    return s;
  };
  return `${toShort(start)} - ${toShort(end)}`;
}

export default function GroupDetailPage() {
  const params = useParams();
  const id = (params?.id as string) ?? "";
  const [activeTab, setActiveTab] = useState<
    "students" | "schedule" | "instructors" | "assigned-lms"
  >("students");
  const [studentPage, setStudentPage] = useState(1);
  const [enrolledStudents, setEnrolledStudents] = useState<EnrolledStudent[]>(
    []
  );
  const [addStudentSearch, setAddStudentSearch] = useState("");
  const [assignedLmsList, setAssignedLmsList] = useState<string[]>([]);
  const [lmsCourseToAdd, setLmsCourseToAdd] = useState("");
  const [assignedInstructorsList, setAssignedInstructorsList] = useState<
    string[]
  >([]);
  const [instructorToAdd, setInstructorToAdd] = useState("");
  const [scheduleStartDate, setScheduleStartDate] = useState("");
  const [scheduleEndDate, setScheduleEndDate] = useState("");
  const [scheduleStudyDays, setScheduleStudyDays] = useState<string[]>([]);

  const data = getGroupDetail(id);

  useEffect(() => {
    const d = getGroupDetail(id);
    if (d) {
      setEnrolledStudents(d.students);
      setAssignedLmsList(d.assignedLms ?? []);
      setAssignedInstructorsList(d.assignedInstructors ?? []);
      setScheduleStartDate(periodToDateInput(d.periodStart));
      setScheduleEndDate(periodToDateInput(d.periodEnd));
      setScheduleStudyDays(d.studyDays ?? []);
    }
  }, [id]);

  const toggleScheduleDay = (day: string) => {
    setScheduleStudyDays((prev) =>
      prev.includes(day) ? prev.filter((d) => d !== day) : [...prev, day]
    );
  };

  if (!data) {
    return (
      <div className="gd-page">
        <div className="gd-not-found">
          <p>Group not found.</p>
          <Link href={ROUTES.ADMIN.GROUPS} className="gd-back-link">
            ← Back to Groups
          </Link>
        </div>
      </div>
    );
  }

  const enrolledIds = useMemo(
    () => new Set(enrolledStudents.map((s) => s.studentId)),
    [enrolledStudents]
  );
  const searchResults = useMemo(() => {
    if (!addStudentSearch.trim()) return [];
    const q = addStudentSearch.toLowerCase().trim();
    return SEARCHABLE_STUDENTS.filter(
      (s) =>
        !enrolledIds.has(s.studentId) &&
        (s.name.toLowerCase().includes(q) || s.studentId.toLowerCase().includes(q))
    ).slice(0, 8);
  }, [addStudentSearch, enrolledIds]);

  const totalStudentPages =
    Math.ceil(enrolledStudents.length / STUDENTS_PER_PAGE) || 1;
  const currentStudentPage = Math.min(studentPage, totalStudentPages);
  const startItem =
    enrolledStudents.length === 0
      ? 0
      : (currentStudentPage - 1) * STUDENTS_PER_PAGE + 1;
  const endItem =
    enrolledStudents.length === 0
      ? 0
      : Math.min(
          currentStudentPage * STUDENTS_PER_PAGE,
          enrolledStudents.length
        );
  const paginatedStudents = enrolledStudents.slice(
    (currentStudentPage - 1) * STUDENTS_PER_PAGE,
    currentStudentPage * STUDENTS_PER_PAGE
  );

  const addStudentToList = (studentId: string, name: string, initials: string) => {
    const newStudent: EnrolledStudent = {
      id: `added-${studentId}-${Date.now()}`,
      studentId,
      name,
      initials,
      enrollmentDate: todayFormatted(),
      status: "Active",
    };
    setEnrolledStudents((prev) => [...prev, newStudent]);
    setAddStudentSearch("");
    setStudentPage(Math.ceil((enrolledStudents.length + 1) / STUDENTS_PER_PAGE));
  };

  const removeStudentFromList = (studentId: string) => {
    setEnrolledStudents((prev) => prev.filter((s) => s.id !== studentId));
  };

  const addLmsToGroup = (code: string) => {
    if (!code || assignedLmsList.includes(code)) return;
    setAssignedLmsList((prev) => [...prev, code]);
    setLmsCourseToAdd("");
  };

  const removeLmsFromGroup = (code: string) => {
    setAssignedLmsList((prev) => prev.filter((c) => c !== code));
  };

  const availableLmsToAdd = AVAILABLE_LMS_COURSES.filter(
    (c) => !assignedLmsList.includes(c.code)
  );

  const addInstructorToGroup = (instructorId: string) => {
    if (!instructorId || assignedInstructorsList.includes(instructorId)) return;
    setAssignedInstructorsList((prev) => [...prev, instructorId]);
    setInstructorToAdd("");
  };

  const removeInstructorFromGroup = (instructorId: string) => {
    setAssignedInstructorsList((prev) =>
      prev.filter((id) => id !== instructorId)
    );
  };

  const availableInstructorsToAdd = AVAILABLE_INSTRUCTORS.filter(
    (i) => !assignedInstructorsList.includes(i.id)
  );

  const tabs = [
    { id: "students" as const, label: "Student List", icon: List },
    {
      id: "schedule" as const,
      label: "Schedule",
      icon: CalendarDays,
    },
    { id: "instructors" as const, label: "Instructors", icon: User },
    { id: "assigned-lms" as const, label: "Assigned LMS", icon: BookOpen },
  ];

  return (
    <div className="gd-page">
      {/* Breadcrumb */}
      <div className="gd-breadcrumb">
        <nav className="gd-breadcrumb-nav">
          <Link href={ROUTES.ADMIN.DASHBOARD}>Admin</Link>
          <span className="gd-breadcrumb-sep">&gt;</span>
          <Link href={ROUTES.ADMIN.GROUPS}>Courses</Link>
          <span className="gd-breadcrumb-sep">&gt;</span>
          <span className="gd-breadcrumb-current">{data.groupTitle}</span>
        </nav>
      </div>

      {/* Group header card */}
      <div className="gd-header-card">
        <div className="gd-header-main">
          <div className="gd-header-title-row">
            <h1 className="gd-group-title">{data.groupTitle}</h1>
            <span
              className={`gd-badge ${
                data.status === "ACTIVE COHORT"
                  ? "gd-badge-active"
                  : "gd-badge-upcoming"
              }`}
            >
              {data.status}
            </span>
          </div>
          <p className="gd-course-name">{data.courseName}</p>
          <div className="gd-meta">
            <span className="gd-meta-item">
              <Calendar className="gd-meta-icon" strokeWidth={2} />
              {formatPeriod(data.periodStart, data.periodEnd)}
            </span>
            <span className="gd-meta-item">
              <Users className="gd-meta-icon" strokeWidth={2} />
              {data.studentsEnrolled} Students Enrolled
            </span>
          </div>
        </div>
        <div className="gd-header-actions">
          <button type="button" className="gd-btn-edit">
            <Pencil className="gd-btn-icon" strokeWidth={2} />
            Edit Details
          </button>
          <button type="button" className="gd-btn-add">
            <Plus className="gd-btn-icon" strokeWidth={2} />
            Add Student
          </button>
        </div>
      </div>

      {/* Main content card with tabs */}
      <div className="gd-main-card">
        <div className="gd-tabs">
          {tabs.map((tab) => (
            <button
              key={tab.id}
              type="button"
              className={`gd-tab ${
                activeTab === tab.id ? "gd-tab-active" : ""
              }`}
              onClick={() => setActiveTab(tab.id)}
            >
              <tab.icon className="gd-tab-icon" strokeWidth={2} />
              {tab.label}
            </button>
          ))}
        </div>

        {activeTab === "students" && (
          <div className="gd-tab-panel">
            <div className="gd-panel-header">
              <h2 className="gd-panel-title">Enrolled Students</h2>
              <div className="gd-panel-actions">
                <button type="button" className="gd-btn-filter">
                  <Filter className="gd-btn-sm-icon" strokeWidth={2} />
                  Filter
                </button>
                <button type="button" className="gd-btn-export">
                  <Download className="gd-btn-sm-icon" strokeWidth={2} />
                  Export
                </button>
              </div>
            </div>
            <div className="gd-enroll-section">
              <h3 className="gd-enroll-title">Enroll student to group</h3>
              <div className="gd-add-student-wrap">
                <div className="gd-add-student-search-wrap">
                  <Search className="gd-add-student-search-icon" strokeWidth={2} />
                  <input
                    type="text"
                    className="gd-add-student-search"
                    placeholder="Search student by name or ID to add..."
                  value={addStudentSearch}
                  onChange={(e) => setAddStudentSearch(e.target.value)}
                  aria-label="Search student to add"
                />
              </div>
              {searchResults.length > 0 && (
                <ul className="gd-add-student-dropdown" role="listbox">
                  {searchResults.map((s) => (
                    <li key={s.id} className="gd-add-student-option">
                      <span className="gd-add-student-option-info">
                        <span className="gd-add-student-option-name">{s.name}</span>
                        <span className="gd-add-student-option-id">{s.studentId}</span>
                      </span>
                      <button
                        type="button"
                        className="gd-add-student-btn"
                        onClick={() =>
                          addStudentToList(s.studentId, s.name, s.initials)
                        }
                        aria-label={`Add ${s.name}`}
                      >
                        <Plus className="w-4 h-4" strokeWidth={2} /> Add
                      </button>
                    </li>
                  ))}
                </ul>
              )}
              {addStudentSearch.trim() && searchResults.length === 0 && (
                  <p className="gd-add-student-no-results">No matching students or already enrolled.</p>
                )}
              </div>
            </div>
            <div className="gd-table-wrap">
              <table className="gd-table">
                <thead>
                  <tr>
                    <th>Student Name</th>
                    <th>Student ID</th>
                    <th>Enrollment Date</th>
                    <th>Status</th>
                    <th>Actions</th>
                  </tr>
                </thead>
                <tbody>
                  {paginatedStudents.map((s) => (
                    <tr key={s.id}>
                      <td>
                        <div className="gd-student-cell">
                          <div className="gd-student-avatar">{s.initials}</div>
                          <span className="gd-student-name">{s.name}</span>
                        </div>
                      </td>
                      <td className="gd-student-id">{s.studentId}</td>
                      <td>{s.enrollmentDate}</td>
                      <td>
                        <span
                          className={`gd-status ${
                            s.status === "Active"
                              ? "gd-status-active"
                              : "gd-status-leave"
                          }`}
                        >
                          {s.status}
                        </span>
                      </td>
                      <td>
                        <button
                          type="button"
                          className="gd-action-delete"
                          onClick={() => removeStudentFromList(s.id)}
                          aria-label="Remove student"
                        >
                          <Trash2 className="w-4 h-4" strokeWidth={2} />
                        </button>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
            <div className="gd-pagination">
              <p className="gd-pagination-text">
                Showing {startItem} to {endItem} of {enrolledStudents.length}{" "}
                students
              </p>
              <div className="gd-pagination-controls">
                <button
                  type="button"
                  className="gd-pagination-btn"
                  onClick={() => setStudentPage((p) => Math.max(1, p - 1))}
                  disabled={currentStudentPage <= 1}
                  aria-label="Previous page"
                >
                  <ChevronLeft className="w-4 h-4" strokeWidth={2} />
                </button>
                {Array.from({ length: totalStudentPages }, (_, i) => i + 1).map(
                  (p) => (
                    <button
                      key={p}
                      type="button"
                      className={`gd-pagination-btn ${
                        currentStudentPage === p ? "active" : ""
                      }`}
                      onClick={() => setStudentPage(p)}
                    >
                      {p}
                    </button>
                  )
                )}
                <button
                  type="button"
                  className="gd-pagination-btn"
                  onClick={() =>
                    setStudentPage((p) => Math.min(totalStudentPages, p + 1))
                  }
                  disabled={currentStudentPage >= totalStudentPages}
                  aria-label="Next page"
                >
                  <ChevronRight className="w-4 h-4" strokeWidth={2} />
                </button>
              </div>
            </div>
          </div>
        )}

        {activeTab === "schedule" && (
          <div className="gd-tab-panel">
            <div className="gd-schedule-card">
              <div className="gd-schedule-header">
                <CalendarDays className="gd-schedule-header-icon" strokeWidth={2} />
                <h2 className="gd-schedule-title">Timeline & Schedule</h2>
              </div>
              <div className="gd-schedule-dates">
                <div className="gd-schedule-field">
                  <label htmlFor="gd-schedule-start" className="gd-schedule-label">
                    Start Date
                  </label>
                  <div className="gd-schedule-date-wrap">
                    <input
                      id="gd-schedule-start"
                      type="date"
                      className="gd-schedule-input"
                      value={scheduleStartDate}
                      onChange={(e) => setScheduleStartDate(e.target.value)}
                      aria-label="Start date"
                    />
                    <Calendar className="gd-schedule-date-icon" strokeWidth={2} aria-hidden />
                  </div>
                </div>
                <div className="gd-schedule-field">
                  <label htmlFor="gd-schedule-end" className="gd-schedule-label">
                    End Date
                  </label>
                  <div className="gd-schedule-date-wrap">
                    <input
                      id="gd-schedule-end"
                      type="date"
                      className="gd-schedule-input"
                      value={scheduleEndDate}
                      onChange={(e) => setScheduleEndDate(e.target.value)}
                      aria-label="End date"
                    />
                    <Calendar className="gd-schedule-date-icon" strokeWidth={2} aria-hidden />
                  </div>
                </div>
              </div>
              <div className="gd-schedule-days-section">
                <label className="gd-schedule-label">Select Study Days</label>
                <div className="gd-schedule-day-pills">
                  {SCHEDULE_DAYS.map((day) => (
                    <button
                      key={day}
                      type="button"
                      className={`gd-schedule-day-pill ${
                        scheduleStudyDays.includes(day) ? "gd-schedule-day-pill-active" : ""
                      }`}
                      onClick={() => toggleScheduleDay(day)}
                      aria-pressed={scheduleStudyDays.includes(day)}
                      aria-label={`${day}${scheduleStudyDays.includes(day) ? ", selected" : ""}`}
                    >
                      {day}
                    </button>
                  ))}
                </div>
              </div>
            </div>
          </div>
        )}
        {activeTab === "instructors" && (
          <div className="gd-tab-panel">
            <div className="gd-panel-header">
              <h2 className="gd-panel-title">Assigned Instructors</h2>
            </div>
            <div className="gd-instructors-add-wrap">
              <label
                htmlFor="gd-instructors-add-select"
                className="gd-instructors-add-label"
              >
                Add instructor
              </label>
              <div className="gd-instructors-add-row">
                <select
                  id="gd-instructors-add-select"
                  className="gd-instructors-select"
                  value={instructorToAdd}
                  onChange={(e) => setInstructorToAdd(e.target.value)}
                  aria-label="Select instructor to add"
                >
                  <option value="">Select instructor...</option>
                  {availableInstructorsToAdd.map((inst) => (
                    <option key={inst.id} value={inst.id}>
                      {inst.name} – {inst.title}
                    </option>
                  ))}
                </select>
                <button
                  type="button"
                  className="gd-instructors-add-btn"
                  onClick={() =>
                    instructorToAdd && addInstructorToGroup(instructorToAdd)
                  }
                  disabled={!instructorToAdd}
                  aria-label="Add instructor"
                >
                  <Plus className="w-4 h-4" strokeWidth={2} /> Add
                </button>
              </div>
            </div>
            {assignedInstructorsList.length > 0 ? (
              <ul className="gd-instructors-list">
                {assignedInstructorsList.map((instId) => {
                  const inst = AVAILABLE_INSTRUCTORS.find((i) => i.id === instId);
                  return (
                    <li key={instId} className="gd-instructors-item">
                      <User className="gd-instructors-item-icon" strokeWidth={2} />
                      <span className="gd-instructors-item-name">
                        {inst?.name ?? instId}
                      </span>
                      {inst && (
                        <span className="gd-instructors-item-title">
                          {inst.title}
                        </span>
                      )}
                      <button
                        type="button"
                        className="gd-instructors-remove"
                        onClick={() => removeInstructorFromGroup(instId)}
                        aria-label={`Remove ${inst?.name ?? instId}`}
                        title="Remove"
                      >
                        <Trash2 className="w-4 h-4" strokeWidth={2} />
                      </button>
                    </li>
                  );
                })}
              </ul>
            ) : (
              <p className="gd-placeholder">
                No instructors assigned to this group yet. Use the dropdown
                above to add one.
              </p>
            )}
          </div>
        )}
        {activeTab === "assigned-lms" && (
          <div className="gd-tab-panel">
            <div className="gd-panel-header">
              <h2 className="gd-panel-title">Assigned LMS Courses</h2>
            </div>
            <div className="gd-lms-add-wrap">
              <label htmlFor="gd-lms-add-select" className="gd-lms-add-label">
                Add LMS course
              </label>
              <div className="gd-lms-add-row">
                <select
                  id="gd-lms-add-select"
                  className="gd-lms-select"
                  value={lmsCourseToAdd}
                  onChange={(e) => setLmsCourseToAdd(e.target.value)}
                  aria-label="Select LMS course to add"
                >
                  <option value="">Select course...</option>
                  {availableLmsToAdd.map((c) => (
                    <option key={c.id} value={c.code}>
                      {c.code} – {c.title}
                    </option>
                  ))}
                </select>
                <button
                  type="button"
                  className="gd-lms-add-btn"
                  onClick={() => lmsCourseToAdd && addLmsToGroup(lmsCourseToAdd)}
                  disabled={!lmsCourseToAdd}
                  aria-label="Add course"
                >
                  <Plus className="w-4 h-4" strokeWidth={2} /> Add
                </button>
              </div>
            </div>
            {assignedLmsList.length > 0 ? (
              <ul className="gd-lms-list">
                {assignedLmsList.map((code) => {
                  const course = AVAILABLE_LMS_COURSES.find((c) => c.code === code);
                  return (
                    <li key={code} className="gd-lms-item">
                      <BookOpen className="gd-lms-item-icon" strokeWidth={2} />
                      <span className="gd-lms-item-code">{code}</span>
                      {course && (
                        <span className="gd-lms-item-title">{course.title}</span>
                      )}
                      <button
                        type="button"
                        className="gd-lms-remove"
                        onClick={() => removeLmsFromGroup(code)}
                        aria-label={`Remove ${code}`}
                        title="Remove"
                      >
                        <Trash2 className="w-4 h-4" strokeWidth={2} />
                      </button>
                    </li>
                  );
                })}
              </ul>
            ) : (
              <p className="gd-placeholder">No LMS courses assigned to this group yet. Use the dropdown above to add one.</p>
            )}
          </div>
        )}
      </div>

    </div>
  );
}
