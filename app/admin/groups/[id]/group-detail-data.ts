/**
 * Data for Group Details page.
 */

import { groupsList } from "../groups-data";

export type StudentStatus = "Active" | "On Leave";

export interface EnrolledStudent {
  id: string;
  initials: string;
  name: string;
  studentId: string;
  enrollmentDate: string;
  status: StudentStatus;
}

export interface GroupDetailData {
  id: string;
  groupTitle: string;
  status: "ACTIVE COHORT" | "UPCOMING";
  courseName: string;
  periodStart: string;
  periodEnd: string;
  studyDays: string[];
  studentsEnrolled: number;
  students: EnrolledStudent[];
  assignedLms: string[];
  assignedInstructors: string[];
  instructorName: string;
  instructorTitle: string;
  instructorEmail: string;
  attendancePercent: number;
  avgGpa: string;
  openAlerts: number;
}

/** Pool of students that can be searched and added to a group */
export interface SearchableStudent {
  id: string;
  name: string;
  studentId: string;
  initials: string;
}

/** Available LMS courses that can be assigned to a group */
export const AVAILABLE_LMS_COURSES = [
  { id: "1", code: "CS-101", title: "Computer Science Fundamentals" },
  { id: "2", code: "DA-200", title: "Data Analytics Bootcamp" },
  { id: "3", code: "MBA-100", title: "MBA Core Curriculum" },
  { id: "4", code: "PM-201", title: "Advanced Project Management" },
  { id: "5", code: "SE-102", title: "Software Engineering Fundamentals" },
] as const;

export const SEARCHABLE_STUDENTS: SearchableStudent[] = [
  { id: "pool-1", name: "Alex Johnson", studentId: "STU-9821", initials: "AJ" },
  { id: "pool-2", name: "Maria Garcia", studentId: "STU-9822", initials: "MG" },
  { id: "pool-3", name: "James Wilson", studentId: "STU-9825", initials: "JW" },
  { id: "pool-4", name: "Sarah Lim", studentId: "STU-9830", initials: "SL" },
  { id: "pool-5", name: "David Kim", studentId: "STU-9831", initials: "DK" },
  { id: "pool-6", name: "Emma Patel", studentId: "STU-9832", initials: "EP" },
  { id: "pool-7", name: "Ryan Brown", studentId: "STU-9833", initials: "RB" },
  { id: "pool-8", name: "Olivia Lee", studentId: "STU-9834", initials: "OL" },
  { id: "pool-9", name: "Thomas Nguyen", studentId: "STU-9835", initials: "TN" },
  { id: "pool-10", name: "Sophie Johnson", studentId: "STU-9836", initials: "SJ" },
  { id: "pool-11", name: "Michael White", studentId: "STU-9837", initials: "MW" },
  { id: "pool-12", name: "Anna Harris", studentId: "STU-9838", initials: "AH" },
  { id: "pool-13", name: "James Martinez", studentId: "STU-9839", initials: "JM" },
  { id: "pool-14", name: "Charlotte Lewis", studentId: "STU-9840", initials: "CL" },
  { id: "pool-15", name: "Benjamin Robinson", studentId: "STU-9841", initials: "BR" },
  { id: "pool-16", name: "Ella Walker", studentId: "STU-9842", initials: "EW" },
  { id: "pool-17", name: "Liam Hall", studentId: "STU-9843", initials: "LH" },
  { id: "pool-18", name: "Mia Young", studentId: "STU-9844", initials: "MY" },
  { id: "pool-19", name: "Noah Allen", studentId: "STU-9845", initials: "NA" },
  { id: "pool-20", name: "Isabella King", studentId: "STU-9846", initials: "IK" },
  { id: "pool-21", name: "Ethan Wright", studentId: "STU-9847", initials: "EW" },
  { id: "pool-22", name: "Ava Scott", studentId: "STU-9848", initials: "AS" },
  { id: "pool-23", name: "Mason Green", studentId: "STU-9849", initials: "MG" },
  { id: "pool-24", name: "Harper Baker", studentId: "STU-9850", initials: "HB" },
  { id: "pool-25", name: "Lucas Adams", studentId: "STU-9851", initials: "LA" },
  { id: "pool-26", name: "Zoe Nelson", studentId: "STU-9852", initials: "ZN" },
  { id: "pool-27", name: "Liam Carter", studentId: "STU-9853", initials: "LC" },
  { id: "pool-28", name: "Chloe Mitchell", studentId: "STU-9854", initials: "CM" },
];

const enrolledStudentsByGroup: Record<string, EnrolledStudent[]> = {
  "1": [
    {
      id: "s1",
      initials: "AJ",
      name: "Alex Johnson",
      studentId: "STU-9821",
      enrollmentDate: "Oct 01, 2023",
      status: "Active",
    },
    {
      id: "s2",
      initials: "MG",
      name: "Maria Garcia",
      studentId: "STU-9822",
      enrollmentDate: "Oct 05, 2023",
      status: "Active",
    },
    {
      id: "s3",
      initials: "JW",
      name: "James Wilson",
      studentId: "STU-9825",
      enrollmentDate: "Oct 12, 2023",
      status: "On Leave",
    },
    {
      id: "s4",
      initials: "SL",
      name: "Sarah Lim",
      studentId: "STU-9830",
      enrollmentDate: "Oct 15, 2023",
      status: "Active",
    },
    {
      id: "s5",
      initials: "DK",
      name: "David Kim",
      studentId: "STU-9831",
      enrollmentDate: "Oct 18, 2023",
      status: "Active",
    },
    {
      id: "s6",
      initials: "EP",
      name: "Emma Patel",
      studentId: "STU-9832",
      enrollmentDate: "Oct 20, 2023",
      status: "Active",
    },
    {
      id: "s7",
      initials: "RB",
      name: "Ryan Brown",
      studentId: "STU-9833",
      enrollmentDate: "Oct 22, 2023",
      status: "Active",
    },
    {
      id: "s8",
      initials: "OL",
      name: "Olivia Lee",
      studentId: "STU-9834",
      enrollmentDate: "Oct 25, 2023",
      status: "On Leave",
    },
    {
      id: "s9",
      initials: "TN",
      name: "Thomas Nguyen",
      studentId: "STU-9835",
      enrollmentDate: "Oct 28, 2023",
      status: "Active",
    },
    {
      id: "s10",
      initials: "SJ",
      name: "Sophie Johnson",
      studentId: "STU-9836",
      enrollmentDate: "Nov 01, 2023",
      status: "Active",
    },
    {
      id: "s11",
      initials: "MW",
      name: "Michael White",
      studentId: "STU-9837",
      enrollmentDate: "Nov 05, 2023",
      status: "Active",
    },
    {
      id: "s12",
      initials: "AH",
      name: "Anna Harris",
      studentId: "STU-9838",
      enrollmentDate: "Nov 08, 2023",
      status: "Active",
    },
    {
      id: "s13",
      initials: "JM",
      name: "James Martinez",
      studentId: "STU-9839",
      enrollmentDate: "Nov 10, 2023",
      status: "Active",
    },
    {
      id: "s14",
      initials: "CL",
      name: "Charlotte Lewis",
      studentId: "STU-9840",
      enrollmentDate: "Nov 12, 2023",
      status: "Active",
    },
    {
      id: "s15",
      initials: "BR",
      name: "Benjamin Robinson",
      studentId: "STU-9841",
      enrollmentDate: "Nov 15, 2023",
      status: "Active",
    },
    {
      id: "s16",
      initials: "EW",
      name: "Ella Walker",
      studentId: "STU-9842",
      enrollmentDate: "Nov 18, 2023",
      status: "On Leave",
    },
    {
      id: "s17",
      initials: "LH",
      name: "Liam Hall",
      studentId: "STU-9843",
      enrollmentDate: "Nov 20, 2023",
      status: "Active",
    },
    {
      id: "s18",
      initials: "MY",
      name: "Mia Young",
      studentId: "STU-9844",
      enrollmentDate: "Nov 22, 2023",
      status: "Active",
    },
    {
      id: "s19",
      initials: "NA",
      name: "Noah Allen",
      studentId: "STU-9845",
      enrollmentDate: "Nov 25, 2023",
      status: "Active",
    },
    {
      id: "s20",
      initials: "IK",
      name: "Isabella King",
      studentId: "STU-9846",
      enrollmentDate: "Nov 28, 2023",
      status: "Active",
    },
    {
      id: "s21",
      initials: "EW",
      name: "Ethan Wright",
      studentId: "STU-9847",
      enrollmentDate: "Dec 01, 2023",
      status: "Active",
    },
    {
      id: "s22",
      initials: "AS",
      name: "Ava Scott",
      studentId: "STU-9848",
      enrollmentDate: "Dec 05, 2023",
      status: "Active",
    },
    {
      id: "s23",
      initials: "MG",
      name: "Mason Green",
      studentId: "STU-9849",
      enrollmentDate: "Dec 08, 2023",
      status: "Active",
    },
    {
      id: "s24",
      initials: "HB",
      name: "Harper Baker",
      studentId: "STU-9850",
      enrollmentDate: "Dec 10, 2023",
      status: "Active",
    },
  ],
  "2": [
    {
      id: "s5",
      initials: "DK",
      name: "David Kim",
      studentId: "STU-9840",
      enrollmentDate: "Mar 15, 2024",
      status: "Active",
    },
    {
      id: "s6",
      initials: "EP",
      name: "Emma Patel",
      studentId: "STU-9841",
      enrollmentDate: "Mar 18, 2024",
      status: "Active",
    },
  ],
  "3": [],
  "4": [],
};

const instructorDetails: Record<
  string,
  { name: string; title: string; email: string }
> = {
  "1": {
    name: "Dr. Sarah Thompson",
    title: "Senior Faculty • Management & Economics",
    email: "s.thompson@imets.edu",
  },
  "2": {
    name: "Prof. Michael Chen",
    title: "Lead Instructor • Data Science",
    email: "m.chen@imets.edu",
  },
  "3": {
    name: "Dr. Amanda Lee",
    title: "Faculty • Project Management",
    email: "a.lee@imets.edu",
  },
  "4": {
    name: "Prof. Raj Kumar",
    title: "Faculty • Software Engineering",
    email: "r.kumar@imets.edu",
  },
};

/** Available instructors that can be assigned to a group */
export const AVAILABLE_INSTRUCTORS = (
  Object.entries(instructorDetails).map(([id, { name, title }]) => ({
    id,
    name,
    title,
  }))
) as { id: string; name: string; title: string }[];

export function getGroupDetail(id: string): GroupDetailData | null {
  const group = groupsList.find((g) => g.id === id);
  if (!group) return null;

  const instructor = instructorDetails[id] ?? {
    name: group.instructorName,
    title: "Faculty",
    email: "instructor@imets.edu",
  };

  const students = enrolledStudentsByGroup[id] ?? [];

  return {
    id: group.id,
    groupTitle: group.groupName,
    status: group.status === "ACTIVE" ? "ACTIVE COHORT" : "UPCOMING",
    courseName: group.courseTitle,
    periodStart: group.periodStart,
    periodEnd: group.periodEnd,
    studyDays: group.studyDays ?? [],
    studentsEnrolled:
      students.length > 0 ? students.length : group.studentsCurrent,
    students,
    assignedLms: group.assignedLms ?? [],
    assignedInstructors: [id],
    instructorName: instructor.name,
    instructorTitle: instructor.title,
    instructorEmail: instructor.email,
    attendancePercent: 92,
    avgGpa: "3.8",
    openAlerts: 12,
  };
}
