/**
 * Mock data for admin Certificate Management.
 */

export type CertificateStatus = "Active" | "Revoked" | "Pending";

export interface CertificateRecord {
  id: string;
  certificateId: string;
  studentName: string;
  course: string;
  issueDate: string;
  status: CertificateStatus;
}

export const certificateSummary = {
  totalIssued: 12840,
  totalIssuedChange: 12.5,
  verified: 10205,
  verifiedChange: 8.2,
  pendingApprovals: 42,
  pendingChange: -3.1,
};

export const certificateCourses = [
  "All Courses",
  "Advanced Cybersecurity",
  "Data Science Fundamentals",
  "React Development Bootcamp",
  "Healthcare Quality Management",
  "Business Administration",
];

export const mockCertificates: CertificateRecord[] = [
  {
    id: "1",
    certificateId: "IM-2024-8842",
    studentName: "Jonathan Smith",
    course: "Advanced Cybersecurity",
    issueDate: "Oct 12, 2024",
    status: "Active",
  },
  {
    id: "2",
    certificateId: "IM-2024-8841",
    studentName: "Maria Lopez",
    course: "Data Science Fundamentals",
    issueDate: "Oct 11, 2024",
    status: "Active",
  },
  {
    id: "3",
    certificateId: "IM-2024-8840",
    studentName: "David Chen",
    course: "Advanced Cybersecurity",
    issueDate: "Oct 10, 2024",
    status: "Revoked",
  },
  {
    id: "4",
    certificateId: "IM-2024-8839",
    studentName: "Anna Williams",
    course: "React Development Bootcamp",
    issueDate: "Oct 9, 2024",
    status: "Pending",
  },
  {
    id: "5",
    certificateId: "IM-2024-8838",
    studentName: "Robert Kim",
    course: "Healthcare Quality Management",
    issueDate: "Oct 8, 2024",
    status: "Active",
  },
  {
    id: "6",
    certificateId: "IM-2024-8837",
    studentName: "Emma Davis",
    course: "Business Administration",
    issueDate: "Oct 7, 2024",
    status: "Active",
  },
  {
    id: "7",
    certificateId: "IM-2024-8836",
    studentName: "James Wilson",
    course: "Advanced Cybersecurity",
    issueDate: "Oct 6, 2024",
    status: "Pending",
  },
  {
    id: "8",
    certificateId: "IM-2024-8835",
    studentName: "Sophie Brown",
    course: "Data Science Fundamentals",
    issueDate: "Oct 5, 2024",
    status: "Active",
  },
];

const AVATAR_COLORS = [
  "bg-blue-500",
  "bg-purple-500",
  "bg-emerald-500",
  "bg-amber-500",
  "bg-rose-500",
  "bg-cyan-500",
  "bg-indigo-500",
  "bg-teal-500",
] as const;

export function getCertificateAvatarColor(index: number) {
  return AVATAR_COLORS[index % AVATAR_COLORS.length];
}

export function getInitials(name: string) {
  return name
    .split(" ")
    .map((n) => n[0])
    .join("")
    .toUpperCase()
    .slice(0, 2);
}

// --- Bulk Certificate Issuance Hub ---

export type IssuanceStudentStatus = "Ready" | "Review Required" | "Pending";

export interface BulkIssuanceStudent {
  id: string;
  name: string;
  email: string;
  score: number;
  completionDate: string;
  status: IssuanceStudentStatus;
}

export interface IssuanceHistoryBatch {
  id: string;
  batchId: string;
  courseName: string;
  dateTime: string;
  count: number;
  status: "SUCCESS" | "FAILED";
  failedCount?: number;
}

export const bulkIssuanceCourses = [
  "Advanced Tactical Medicine - Cohort A",
  "Field Trauma Response (FTR-1)",
  "Emergency Response Level 1",
  "Advanced Cybersecurity",
];

export const bulkIssuanceStatusOptions = [
  "Ready to Issue",
  "Review Required",
  "All Statuses",
];

export const bulkIssuanceStudents: BulkIssuanceStudent[] = [
  {
    id: "1",
    name: "Sarah Adams",
    email: "sarah.adams@example.com",
    score: 98,
    completionDate: "Oct 24, 2023",
    status: "Ready",
  },
  {
    id: "2",
    name: "James Miller",
    email: "james.miller@example.com",
    score: 92,
    completionDate: "Oct 25, 2023",
    status: "Ready",
  },
  {
    id: "3",
    name: "Linda Thompson",
    email: "linda.thompson@example.com",
    score: 85,
    completionDate: "Oct 26, 2023",
    status: "Ready",
  },
  {
    id: "4",
    name: "Robert Kim",
    email: "robert.kim@example.com",
    score: 64,
    completionDate: "Pending",
    status: "Review Required",
  },
  {
    id: "5",
    name: "Elena Hu",
    email: "elena.hu@example.com",
    score: 100,
    completionDate: "Oct 26, 2023",
    status: "Ready",
  },
];

export const issuanceHistoryBatches: IssuanceHistoryBatch[] = [
  {
    id: "1",
    batchId: "BH-98231",
    courseName: "Field Trauma Response (FTR-1)",
    dateTime: "Oct 20, 2023 14:32",
    count: 142,
    status: "SUCCESS",
  },
  {
    id: "2",
    batchId: "BH-98212",
    courseName: "Advanced Tactical Medicine",
    dateTime: "Oct 18, 2023 09:15",
    count: 54,
    status: "SUCCESS",
  },
  {
    id: "3",
    batchId: "BH-98199",
    courseName: "Emergency Response Level 1",
    dateTime: "Oct 15, 2023 11:20",
    count: 88,
    status: "FAILED",
    failedCount: 2,
  },
];
