/**
 * Admin assignments list (extends student assignment data with admin fields).
 */

import { activeAssignments } from "@/app/student/assignments/assignments-data";
import type { AssignmentItem } from "@/app/student/assignments/assignments-data";

export type AdminAssignmentItem = AssignmentItem & { submissionsCount: number };

export const adminAssignmentsList: AdminAssignmentItem[] = [
  { ...activeAssignments[0], submissionsCount: 24 },
  { ...activeAssignments[1], submissionsCount: 18 },
  { ...activeAssignments[2], submissionsCount: 31 },
  {
    id: "4",
    status: "regular",
    courseCode: "EN101: Writing",
    courseName: "Academic Writing",
    title: "Essay Draft 1 - Argumentative",
    dueText: "DUE IN",
    dueCountdown: "12d : 00h : 00m",
    primaryAction: "Submit",
    fileCount: 1,
    submissionsCount: 42,
  },
  {
    id: "5",
    status: "urgent",
    courseCode: "PY301: ML",
    courseName: "Machine Learning",
    title: "Project Proposal Submission",
    dueText: "DUE IN",
    dueCountdown: "00d : 06h : 30m",
    primaryAction: "Submit",
    submissionsCount: 28,
  },
];

export function getAssignmentById(id: string): AdminAssignmentItem | undefined {
  return adminAssignmentsList.find((a) => a.id === id);
}
