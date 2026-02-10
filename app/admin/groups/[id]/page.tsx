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
  Clock,
  ArrowRightLeft,
  X,
} from "lucide-react";
import { ROUTES } from "@/constants";
import {
  getGroupDetail,
  SEARCHABLE_STUDENTS,
  AVAILABLE_LMS_COURSES,
  AVAILABLE_INSTRUCTORS,
  type EnrolledStudent,
} from "./group-detail-data";
import { groupsList } from "../groups-data";
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
  const [enrollModalOpen, setEnrollModalOpen] = useState(false);
  const [deleteStudent, setDeleteStudent] = useState<EnrolledStudent | null>(null);
  const [transferStudent, setTransferStudent] = useState<EnrolledStudent | null>(null);
  const [transferTargetGroupId, setTransferTargetGroupId] = useState("");
  const [studentListSearch, setStudentListSearch] = useState("");

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

  const filteredEnrolledStudents = useMemo(() => {
    if (!studentListSearch.trim()) return enrolledStudents;
    const q = studentListSearch.toLowerCase().trim();
    return enrolledStudents.filter(
      (s) =>
        s.name.toLowerCase().includes(q) ||
        s.studentId.toLowerCase().includes(q) ||
        (s.email ?? "").toLowerCase().includes(q)
    );
  }, [enrolledStudents, studentListSearch]);

  const totalStudentPages =
    Math.ceil(filteredEnrolledStudents.length / STUDENTS_PER_PAGE) || 1;
  const currentStudentPage = Math.min(studentPage, totalStudentPages);
  const startItem =
    filteredEnrolledStudents.length === 0
      ? 0
      : (currentStudentPage - 1) * STUDENTS_PER_PAGE + 1;
  const endItem =
    filteredEnrolledStudents.length === 0
      ? 0
      : Math.min(
          currentStudentPage * STUDENTS_PER_PAGE,
          filteredEnrolledStudents.length
        );
  const paginatedStudents = filteredEnrolledStudents.slice(
    (currentStudentPage - 1) * STUDENTS_PER_PAGE,
    currentStudentPage * STUDENTS_PER_PAGE
  );

  const addStudentToList = (studentId: string, name: string, initials: string, email?: string) => {
    const newStudent: EnrolledStudent = {
      id: `added-${studentId}-${Date.now()}`,
      studentId,
      name,
      initials,
      email: email ?? undefined,
      enrollmentDate: todayFormatted(),
      enrolledBy: "Admin",
      course: data?.courseName,
      paidAmount: 0,
      remainingAmount: 0,
      nextInstallmentAmount: 0,
      nextInstallmentDate: "—",
      status: "Active",
    };
    setEnrolledStudents((prev) => [...prev, newStudent]);
    setAddStudentSearch("");
    setStudentPage(Math.ceil((enrolledStudents.length + 1) / STUDENTS_PER_PAGE));
  };

  const removeStudentFromList = (studentId: string) => {
    setEnrolledStudents((prev) => prev.filter((s) => s.id !== studentId));
  };

  const updateStudentStatus = (studentId: string, status: EnrolledStudent["status"]) => {
    setEnrolledStudents((prev) =>
      prev.map((s) => (s.id === studentId ? { ...s, status } : s))
    );
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
            <span className="gd-meta-item gd-meta-period">
              <Calendar className="gd-meta-icon gd-meta-icon-period" strokeWidth={2} />
              <span className="gd-meta-label">Period</span>
              {formatPeriod(data.periodStart, data.periodEnd)}
            </span>
            <span className="gd-meta-item gd-meta-days">
              <CalendarDays className="gd-meta-icon gd-meta-icon-days" strokeWidth={2} />
              <span className="gd-meta-label">Study Days</span>
              {data.studyDays?.length ? data.studyDays.join(", ") : "—"}
            </span>
            <span className="gd-meta-item gd-meta-created">
              <Clock className="gd-meta-icon gd-meta-icon-created" strokeWidth={2} />
              <span className="gd-meta-label">Created At</span>
              {data.createdAt || "—"}
            </span>
            <span className="gd-meta-item gd-meta-students">
              <Users className="gd-meta-icon gd-meta-icon-students" strokeWidth={2} />
              {data.studentsEnrolled} Students Enrolled
            </span>
          </div>
        </div>
        <div className="gd-header-actions">
          <Link
            href={`${ROUTES.ADMIN.GROUP(id)}/edit`}
            className="gd-btn-edit"
          >
            <Pencil className="gd-btn-icon" strokeWidth={2} />
            Edit Group
          </Link>
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
              <h2 className="gd-panel-title">
                Enrolled Students ({studentListSearch.trim() ? filteredEnrolledStudents.length : enrolledStudents.length})
              </h2>
              <div className="gd-panel-actions">
                <div className="gd-panel-search-wrap">
                  <Search className="gd-panel-search-icon" strokeWidth={2} />
                  <input
                    type="search"
                    className="gd-panel-search-input"
                    placeholder="Search students..."
                    value={studentListSearch}
                    onChange={(e) => {
                      setStudentListSearch(e.target.value);
                      setStudentPage(1);
                    }}
                    aria-label="Search enrolled students"
                  />
                </div>
                <button type="button" className="gd-btn-filter">
                  <Filter className="gd-btn-sm-icon" strokeWidth={2} />
                  Filter
                </button>
                <button type="button" className="gd-btn-export">
                  <Download className="gd-btn-sm-icon" strokeWidth={2} />
                  Export
                </button>
                <button
                  type="button"
                  className="gd-btn-enroll-student"
                  onClick={() => setEnrollModalOpen(true)}
                  aria-label="Enroll student"
                >
                  <Plus className="gd-btn-sm-icon" strokeWidth={2} />
                  Enroll student
                </button>
              </div>
            </div>
            <div className="gd-table-wrap">
              <table className="gd-table gd-table-students">
                <thead>
                  <tr>
                    <th>Student Name</th>
                    <th>Student ID</th>
                    <th>Country</th>
                    <th>Phone</th>
                    <th>Enrollment Date</th>
                    <th>Enrolled By</th>
                    <th>Course</th>
                    <th>Paid Amount</th>
                    <th>Remaining Amount</th>
                    <th>Next Installment</th>
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
                          <div>
                            <span className="gd-student-name">{s.name}</span>
                            <span className="gd-student-email">{s.email || "—"}</span>
                          </div>
                        </div>
                      </td>
                      <td className="gd-student-id">{s.studentId}</td>
                      <td>{s.country ?? "—"}</td>
                      <td>{s.phone ?? "—"}</td>
                      <td>{s.enrollmentDate}</td>
                      <td>{s.enrolledBy ?? "—"}</td>
                      <td className="gd-student-course">{s.course ?? "—"}</td>
                      <td>{typeof s.paidAmount === "number" ? s.paidAmount.toLocaleString() : (s.paidAmount ?? "—")}</td>
                      <td>{typeof s.remainingAmount === "number" ? s.remainingAmount.toLocaleString() : (s.remainingAmount ?? "—")}</td>
                      <td className="gd-next-installment-cell">
                        {s.nextInstallmentAmount != null && Number(s.nextInstallmentAmount) > 0 && s.nextInstallmentDate
                          ? `${typeof s.nextInstallmentAmount === "number" ? s.nextInstallmentAmount.toLocaleString() : s.nextInstallmentAmount} · ${s.nextInstallmentDate}`
                          : s.nextInstallmentDate && s.nextInstallmentDate !== "—"
                            ? s.nextInstallmentDate
                            : s.nextInstallmentAmount != null && Number(s.nextInstallmentAmount) > 0
                              ? (typeof s.nextInstallmentAmount === "number" ? s.nextInstallmentAmount.toLocaleString() : String(s.nextInstallmentAmount))
                              : "—"}
                      </td>
                      <td>
                        <button
                          type="button"
                          role="switch"
                          aria-checked={s.status === "Active"}
                          className={`gd-status-toggle ${s.status === "Active" ? "gd-status-toggle-on" : ""}`}
                          onClick={() =>
                            updateStudentStatus(s.id, s.status === "Active" ? "On Leave" : "Active")
                          }
                          title={s.status === "Active" ? "Active" : "On Leave"}
                        >
                          <span className="gd-status-toggle-dot" />
                        </button>
                      </td>
                      <td>
                        <div className="gd-student-actions">
                          <button
                            type="button"
                            className="gd-action-btn gd-action-transfer"
                            onClick={() => {
                              setTransferStudent(s);
                              setTransferTargetGroupId("");
                            }}
                            title="Transfer to another group"
                            aria-label="Transfer to another group"
                          >
                            <ArrowRightLeft className="gd-action-svg" strokeWidth={2} />
                          </button>
                          <button
                            type="button"
                            className="gd-action-btn gd-action-delete"
                            onClick={() => setDeleteStudent(s)}
                            title="Remove from group"
                            aria-label="Remove from group"
                          >
                            <Trash2 className="gd-action-svg" strokeWidth={2} />
                          </button>
                        </div>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
            <div className="gd-pagination">
              <p className="gd-pagination-text">
                Showing {startItem} to {endItem} of {filteredEnrolledStudents.length}{" "}
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

      {/* Enroll Student Modal */}
      {enrollModalOpen && (
        <div
          className="gd-modal-overlay"
          role="dialog"
          aria-modal="true"
          aria-labelledby="gd-modal-enroll-title"
          onClick={(e) => e.target === e.currentTarget && setEnrollModalOpen(false)}
        >
          <div className="gd-modal gd-modal-enroll" onClick={(e) => e.stopPropagation()}>
            <div className="gd-modal-header">
              <h2 id="gd-modal-enroll-title" className="gd-modal-title">Enroll student</h2>
              <button
                type="button"
                className="gd-modal-close"
                onClick={() => setEnrollModalOpen(false)}
                aria-label="Close"
              >
                <X className="w-4 h-4" strokeWidth={2} />
              </button>
            </div>
            <div className="gd-modal-body">
              <p className="gd-modal-desc">Search by name or ID and add students to this group.</p>
              <div className="gd-modal-search-wrap">
                <Search className="gd-modal-search-icon" strokeWidth={2} />
                <input
                  type="text"
                  className="gd-modal-search-input"
                  placeholder="Search student by name or ID..."
                  value={addStudentSearch}
                  onChange={(e) => setAddStudentSearch(e.target.value)}
                  aria-label="Search student"
                />
              </div>
              {searchResults.length > 0 && (
                <ul className="gd-modal-student-list">
                  {searchResults.map((s) => (
                    <li key={s.id} className="gd-modal-student-item">
                      <span className="gd-modal-student-info">
                        <span className="gd-modal-student-name">{s.name}</span>
                        <span className="gd-modal-student-id">{s.studentId}</span>
                      </span>
                      <button
                        type="button"
                        className="gd-modal-add-btn"
                        onClick={() => {
                          addStudentToList(s.studentId, s.name, s.initials, s.email);
                          setAddStudentSearch("");
                        }}
                        aria-label={`Add ${s.name}`}
                      >
                        <Plus className="w-4 h-4" strokeWidth={2} /> Add
                      </button>
                    </li>
                  ))}
                </ul>
              )}
              {addStudentSearch.trim() && searchResults.length === 0 && (
                <p className="gd-modal-no-results">No matching students or already enrolled.</p>
              )}
            </div>
            <div className="gd-modal-footer">
              <button
                type="button"
                className="gd-modal-btn gd-modal-btn-secondary"
                onClick={() => setEnrollModalOpen(false)}
              >
                Done
              </button>
            </div>
          </div>
        </div>
      )}

      {/* Delete (Remove) Student Modal */}
      {deleteStudent && (
        <div
          className="gd-modal-overlay"
          role="dialog"
          aria-modal="true"
          aria-labelledby="gd-modal-delete-title"
          onClick={(e) => e.target === e.currentTarget && setDeleteStudent(null)}
        >
          <div className="gd-modal gd-modal-delete" onClick={(e) => e.stopPropagation()}>
            <div className="gd-modal-header">
              <h2 id="gd-modal-delete-title" className="gd-modal-title">Remove from group</h2>
              <button
                type="button"
                className="gd-modal-close"
                onClick={() => setDeleteStudent(null)}
                aria-label="Close"
              >
                <X className="w-4 h-4" strokeWidth={2} />
              </button>
            </div>
            <div className="gd-modal-body">
              <p className="gd-modal-desc">
                Remove <strong>{deleteStudent.name}</strong> ({deleteStudent.studentId}) from this group? They will need to be re-enrolled to join again.
              </p>
            </div>
            <div className="gd-modal-footer">
              <button
                type="button"
                className="gd-modal-btn gd-modal-btn-secondary"
                onClick={() => setDeleteStudent(null)}
              >
                Cancel
              </button>
              <button
                type="button"
                className="gd-modal-btn gd-modal-btn-danger"
                onClick={() => {
                  removeStudentFromList(deleteStudent.id);
                  setDeleteStudent(null);
                }}
              >
                <Trash2 className="w-4 h-4" strokeWidth={2} /> Remove
              </button>
            </div>
          </div>
        </div>
      )}

      {/* Transfer Student Modal */}
      {transferStudent && (
        <div
          className="gd-modal-overlay"
          role="dialog"
          aria-modal="true"
          aria-labelledby="gd-modal-transfer-title"
          onClick={(e) => e.target === e.currentTarget && setTransferStudent(null)}
        >
          <div className="gd-modal gd-modal-transfer" onClick={(e) => e.stopPropagation()}>
            <div className="gd-modal-header">
              <h2 id="gd-modal-transfer-title" className="gd-modal-title">Transfer to another group</h2>
              <button
                type="button"
                className="gd-modal-close"
                onClick={() => setTransferStudent(null)}
                aria-label="Close"
              >
                <X className="w-4 h-4" strokeWidth={2} />
              </button>
            </div>
            <div className="gd-modal-body">
              <p className="gd-modal-desc">
                Transfer <strong>{transferStudent.name}</strong> ({transferStudent.studentId}) to another group.
              </p>
              <label htmlFor="gd-transfer-group-select" className="gd-modal-label">
                Select target group
              </label>
              <select
                id="gd-transfer-group-select"
                className="gd-modal-select"
                value={transferTargetGroupId}
                onChange={(e) => setTransferTargetGroupId(e.target.value)}
                aria-label="Target group"
              >
                <option value="">Choose a group...</option>
                {groupsList
                  .filter((g) => g.id !== id)
                  .map((g) => (
                    <option key={g.id} value={g.id}>
                      {g.groupName} – {g.courseTitle}
                    </option>
                  ))}
              </select>
              {groupsList.filter((g) => g.id !== id).length === 0 && (
                <p className="gd-modal-no-results">No other groups available.</p>
              )}
            </div>
            <div className="gd-modal-footer">
              <button
                type="button"
                className="gd-modal-btn gd-modal-btn-secondary"
                onClick={() => setTransferStudent(null)}
              >
                Cancel
              </button>
              <button
                type="button"
                className="gd-modal-btn gd-modal-btn-primary"
                disabled={!transferTargetGroupId}
                onClick={() => {
                  removeStudentFromList(transferStudent.id);
                  setTransferStudent(null);
                  setTransferTargetGroupId("");
                }}
              >
                <ArrowRightLeft className="w-4 h-4" strokeWidth={2} /> Transfer
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
