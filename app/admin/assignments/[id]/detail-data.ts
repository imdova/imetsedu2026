/**
 * Mock data for assignment detail page (submission stats & student list).
 */

export type SubmissionStatus = "graded" | "submitted" | "late" | "not-submitted";
export type PlagiarismLevel = "low" | "medium" | "high";

export interface SubmissionRow {
  id: string;
  studentName: string;
  studentId: string;
  avatarInitials: string;
  submissionDate: string | null;
  status: SubmissionStatus;
  plagiarismScore: number | null;
  plagiarismLevel: PlagiarismLevel | null;
  finalGrade: string | null; // "92 / 100" or "Pending"
}

export interface AssignmentDetailStats {
  totalSubmissions: number;
  totalStudents: number;
  avgTurnaroundDays: number;
  turnaroundTrend: string;
  averageGradePct: number;
  gradeTrend: string;
  plagiarismAlerts: number;
  plagiarismAlertLabel: string;
}

export const mockDetailStats: AssignmentDetailStats = {
  totalSubmissions: 42,
  totalStudents: 50,
  avgTurnaroundDays: 1.2,
  turnaroundTrend: "~0.2d from last week",
  averageGradePct: 78.5,
  gradeTrend: "+2.4% inc.",
  plagiarismAlerts: 3,
  plagiarismAlertLabel: "Immediate Review Required",
};

export const mockSubmissions: SubmissionRow[] = [
  {
    id: "s1",
    studentName: "Sarah Jenkins",
    studentId: "#STU-9021",
    avatarInitials: "SJ",
    submissionDate: "Oct 24, 2023, 10:30 AM",
    status: "graded",
    plagiarismScore: 8,
    plagiarismLevel: "low",
    finalGrade: "92 / 100",
  },
  {
    id: "s2",
    studentName: "Michael Chen",
    studentId: "#STU-8842",
    avatarInitials: "MC",
    submissionDate: "Oct 25, 2023, 09:15 AM",
    status: "submitted",
    plagiarismScore: 24,
    plagiarismLevel: "medium",
    finalGrade: "Pending",
  },
  {
    id: "s3",
    studentName: "Robert Wilson",
    studentId: "#STU-7231",
    avatarInitials: "RW",
    submissionDate: "Oct 25, 2023, 11:45 PM",
    status: "late",
    plagiarismScore: 48,
    plagiarismLevel: "high",
    finalGrade: "Pending",
  },
  {
    id: "s4",
    studentName: "Emily Jackson",
    studentId: "#STU-1192",
    avatarInitials: "EJ",
    submissionDate: null,
    status: "not-submitted",
    plagiarismScore: null,
    plagiarismLevel: null,
    finalGrade: null,
  },
];

export const tabCounts = {
  all: 42,
  readyToGrade: 12,
  graded: 30,
  overdue: 8,
};
