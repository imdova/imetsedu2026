/**
 * Mock data for User Activity / Audit Log page.
 */

export type ActionType =
  | "login"
  | "lead-updated"
  | "grade-published"
  | "doc-verified"
  | "logout";

export interface AuditLogEntry {
  id: string;
  timestamp: string;
  actionType: ActionType;
  eventDescription: string;
  ipAddress: string;
}

export const ACTION_TYPE_LABELS: Record<ActionType, string> = {
  login: "LOGIN SUCCESS",
  "lead-updated": "LEAD UPDATED",
  "grade-published": "GRADE PUBLISHED",
  "doc-verified": "DOC VERIFIED",
  logout: "LOGOUT",
};

export const mockAuditLog: AuditLogEntry[] = [
  {
    id: "1",
    timestamp: "Oct 24, 2023, 10:30 AM",
    actionType: "login",
    eventDescription: "User session started via Web Browser (Chrome/macOS)",
    ipAddress: "192.168.1.45",
  },
  {
    id: "2",
    timestamp: "Oct 24, 2023, 09:15 AM",
    actionType: "lead-updated",
    eventDescription: "Changed status of Lead #4421 to 'Enrolled'",
    ipAddress: "192.168.1.45",
  },
  {
    id: "3",
    timestamp: "Oct 23, 2023, 04:20 PM",
    actionType: "grade-published",
    eventDescription:
      "Finalized and published grades for Course: CS101 - Semester A",
    ipAddress: "102.44.12.8",
  },
  {
    id: "4",
    timestamp: "Oct 23, 2023, 11:00 AM",
    actionType: "doc-verified",
    eventDescription: "Approved 'Passport Copy' document for Student ID #9901",
    ipAddress: "102.44.12.8",
  },
  {
    id: "5",
    timestamp: "Oct 22, 2023, 05:45 PM",
    actionType: "logout",
    eventDescription: "Manual user logout / Session termination",
    ipAddress: "192.168.1.45",
  },
];

export const TOTAL_ACTIVITIES = 124;
export const PER_PAGE = 5;

export const ACTIVITY_TYPE_OPTIONS = [
  { value: "all", label: "All Activities" },
  { value: "login", label: "Login" },
  { value: "logout", label: "Logout" },
  { value: "lead-updated", label: "Lead Updated" },
  { value: "grade-published", label: "Grade Published" },
  { value: "doc-verified", label: "Document Verified" },
];
