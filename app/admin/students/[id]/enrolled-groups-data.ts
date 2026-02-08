/**
 * Enrolled Groups tab – groups the student is in, with sections and actions.
 */

export type EnrolledGroupStatus = "active" | "upcoming" | "completed";

export interface EnrolledGroup {
  id: string;
  groupName: string;
  courseTitle: string;
  status: EnrolledGroupStatus;
  periodStart: string;
  periodEnd: string;
  joinedDate: string;
  studentsCurrent: number;
  studentsMax: number;
  instructorName: string;
  section?: string;
  /** 0–100 progress in this group (optional) */
  progressPercent?: number;
  /** Next session in this group (optional) */
  nextSession?: string;
}

export interface UpcomingSession {
  id: string;
  groupId: string;
  groupName: string;
  title: string;
  scheduledAt: string;
  type: "live" | "workshop" | "assignment";
}

export interface EnrolledGroupsData {
  groups: EnrolledGroup[];
  upcomingSessions: UpcomingSession[];
}

const defaultEnrolled: EnrolledGroupsData = {
  groups: [],
  upcomingSessions: [],
};

const enrolledByStudentId: Record<string, EnrolledGroupsData> = {
  "1": {
    groups: [
      {
        id: "1",
        groupName: "MBA-JAN-24-A",
        courseTitle: "Master of Business Administration",
        status: "active",
        periodStart: "Jan 01, 2024",
        periodEnd: "Jun 30, 2024",
        joinedDate: "2024-01-05",
        studentsCurrent: 25,
        studentsMax: 30,
        instructorName: "Dr. Sarah Jenkins",
        section: "Morning",
        progressPercent: 45,
        nextSession: "Week 8 Live Q&A · Feb 20, 2:00 PM",
      },
      {
        id: "2",
        groupName: "DS-MAR-24-B",
        courseTitle: "Data Science Bootcamp",
        status: "active",
        periodStart: "Mar 15, 2024",
        periodEnd: "Aug 15, 2024",
        joinedDate: "2024-03-10",
        studentsCurrent: 30,
        studentsMax: 30,
        instructorName: "Prof. Michael Chen",
        section: "Cohort B",
        progressPercent: 12,
        nextSession: "Python Workshop · Mar 18, 10:00 AM",
      },
      {
        id: "3",
        groupName: "PM-APR-24-A",
        courseTitle: "Advanced Project Management",
        status: "upcoming",
        periodStart: "Apr 01, 2024",
        periodEnd: "Sep 30, 2024",
        joinedDate: "2024-03-20",
        studentsCurrent: 18,
        studentsMax: 28,
        instructorName: "Dr. Amanda Lee",
        nextSession: "Kickoff · Apr 01, 9:00 AM",
      },
    ],
    upcomingSessions: [
      {
        id: "s1",
        groupId: "1",
        groupName: "MBA-JAN-24-A",
        title: "Week 8 Live Q&A",
        scheduledAt: "2024-02-20T14:00:00",
        type: "live",
      },
      {
        id: "s2",
        groupId: "1",
        groupName: "MBA-JAN-24-A",
        title: "Case Study Submission",
        scheduledAt: "2024-02-25T23:59:00",
        type: "assignment",
      },
      {
        id: "s3",
        groupId: "2",
        groupName: "DS-MAR-24-B",
        title: "Python Workshop",
        scheduledAt: "2024-03-18T10:00:00",
        type: "workshop",
      },
    ],
  },
  "2": {
    groups: [
      {
        id: "1",
        groupName: "MBA-JAN-24-A",
        courseTitle: "Master of Business Administration",
        status: "active",
        periodStart: "Jan 01, 2024",
        periodEnd: "Jun 30, 2024",
        joinedDate: "2023-12-15",
        studentsCurrent: 25,
        studentsMax: 30,
        instructorName: "Dr. Sarah Jenkins",
      },
    ],
    upcomingSessions: [
      {
        id: "s1",
        groupId: "1",
        groupName: "MBA-JAN-24-A",
        title: "Week 8 Live Q&A",
        scheduledAt: "2024-02-20T14:00:00",
        type: "live",
      },
    ],
  },
};

export function getEnrolledGroups(studentId: string): EnrolledGroupsData {
  return enrolledByStudentId[studentId] ?? defaultEnrolled;
}
