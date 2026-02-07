/**
 * Mock data for User Management Directory (staff).
 */

export type StaffRole = "admin" | "instructor" | "counselor" | "finance";
export type StaffStatus = "active" | "on-leave" | "deactivated";

export interface StaffMember {
  id: string;
  name: string;
  staffId: string;
  avatarInitials: string;
  avatarColor: string; // for placeholder bg, e.g. "orange", "green"
  role: StaffRole;
  email: string;
  department: string;
  status: StaffStatus;
  phone: string;
  city: string;
  /** Optional for user overview profile */
  biography?: string;
  joinedDate?: string;
}

export const staffSummary = {
  totalStaff: 1248,
  totalStaffTrend: "+12% vs last month",
  activeInstructors: 842,
  activeInstructorsTrend: "+5% increase",
  pendingInvites: 12,
  pendingInvitesLabel: "Awaiting response",
};

export const staffMembers: StaffMember[] = [
  {
    id: "1",
    name: "Alex Rivera",
    staffId: "IM-2024-001",
    avatarInitials: "AR",
    avatarColor: "orange",
    role: "admin",
    email: "a.rivera@imets.edu",
    department: "IT Management",
    status: "active",
    phone: "+1 (555) 201-4001",
    city: "New York",
    biography:
      "Strategic leader with over 8 years of experience in enterprise solutions. Alex specializes in IT management and has consistently driven operational excellence since joining IMETS.",
    joinedDate: "Jan 12, 2022",
  },
  {
    id: "2",
    name: "Sarah Jenkins",
    staffId: "IM-2024-042",
    avatarInitials: "SJ",
    avatarColor: "green",
    role: "instructor",
    email: "s.jenkins@imets.edu",
    department: "Marketing",
    status: "active",
    phone: "+1 (555) 202-4202",
    city: "Los Angeles",
    biography:
      "Marketing and curriculum expert with a focus on learner engagement and brand growth.",
    joinedDate: "Mar 8, 2023",
  },
  {
    id: "3",
    name: "Michael Chen",
    staffId: "IM-2023-118",
    avatarInitials: "MC",
    avatarColor: "orange",
    role: "counselor",
    email: "m.chen@imets.edu",
    department: "Student Services",
    status: "on-leave",
    phone: "+1 (555) 203-3118",
    city: "Chicago",
    biography: "Student success and counseling specialist.",
    joinedDate: "Jun 15, 2022",
  },
  {
    id: "4",
    name: "Elena Rodriguez",
    staffId: "IM-2024-089",
    avatarInitials: "ER",
    avatarColor: "light-orange",
    role: "finance",
    email: "e.rodriguez@imets.edu",
    department: "Finance",
    status: "active",
    phone: "+1 (555) 204-8089",
    city: "Houston",
    biography: "Finance and compliance professional.",
    joinedDate: "Sep 1, 2024",
  },
  {
    id: "5",
    name: "James Wilson",
    staffId: "IM-2022-015",
    avatarInitials: "JW",
    avatarColor: "gray",
    role: "instructor",
    email: "j.wilson@imets.edu",
    department: "Operations",
    status: "deactivated",
    phone: "+1 (555) 205-2015",
    city: "Phoenix",
    biography: "Operations and course delivery.",
    joinedDate: "Feb 20, 2022",
  },
];

export const ROLE_OPTIONS = [
  { value: "all", label: "All" },
  { value: "admin", label: "Admin" },
  { value: "instructor", label: "Instructor" },
  { value: "counselor", label: "Counselor" },
  { value: "finance", label: "Finance" },
];

export const DEPARTMENT_OPTIONS = [
  { value: "all", label: "All" },
  ...Array.from(new Set(staffMembers.map((s) => s.department))).map((d) => ({
    value: d,
    label: d,
  })),
];

export const TOTAL_STAFF_RESULTS = 128;

export function getStaffMemberById(id: string): StaffMember | undefined {
  return staffMembers.find((s) => s.id === id);
}
