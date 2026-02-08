/**
 * Mock data for LMS Course Management page.
 */

export const lmsStats = {
  totalActiveCourses: 124,
  totalActiveCoursesTrend: "+12% from last month",
  totalLessons: 1842,
  totalLessonsUpdated: "Updated 2 hours ago",
  avgCompletionRate: 78.4,
  avgCompletionTrend: "↑ 4.2% increase",
};

export type CourseStatus = "Active" | "Scheduled" | "Draft";

export interface LMSCourseRow {
  id: string;
  courseName: string;
  instructor: string;
  category: string;
  subcategory: string;
  modulesDone: number;
  modulesTotal: number;
  assignedGroups: string[];
  enrollment: number;
  status: CourseStatus;
  iconColor: string;
}

export const lmsCourses: LMSCourseRow[] = [
  {
    id: "1",
    courseName: "Advanced Project Management",
    instructor: "Sarah J. Miller",
    category: "Leadership",
    subcategory: "Project Management",
    modulesDone: 12,
    modulesTotal: 48,
    assignedGroups: ["QA", "Dev", "Eng", "MGT"],
    enrollment: 1240,
    status: "Active",
    iconColor: "bg-emerald-500",
  },
  {
    id: "2",
    courseName: "Cloud Infrastructure & DevOps",
    instructor: "Michael Chen",
    category: "Technical",
    subcategory: "Infrastructure",
    modulesDone: 24,
    modulesTotal: 32,
    assignedGroups: ["IT", "HR"],
    enrollment: 856,
    status: "Active",
    iconColor: "bg-blue-500",
  },
  {
    id: "3",
    courseName: "Data Privacy & Compliance",
    instructor: "Emma Wilson",
    category: "Compliance",
    subcategory: "Regulatory",
    modulesDone: 0,
    modulesTotal: 16,
    assignedGroups: [],
    enrollment: 0,
    status: "Scheduled",
    iconColor: "bg-amber-500",
  },
  {
    id: "4",
    courseName: "Leadership Essentials",
    instructor: "David Brown",
    category: "Leadership",
    subcategory: "Management",
    modulesDone: 8,
    modulesTotal: 24,
    assignedGroups: ["MGT"],
    enrollment: 412,
    status: "Draft",
    iconColor: "bg-violet-500",
  },
];

export function getLMSCourseById(id: string): LMSCourseRow | undefined {
  return lmsCourses.find((c) => c.id === id);
}

/** Mock detail for LMS course overview (description, metrics, modules, etc.) */
export interface LMSCourseDetail {
  totalEnrolled: number;
  avgProgress: number;
  quizPassRate: number;
  rating: number;
  description: string;
  createdAt: string;
  totalHours: number;
  format: string;
  difficulty: string;
  language: string;
  quizzesTotal: number;
  instructorTitle: string;
  recentGroups: { name: string; students: number; date: string; status: string }[];
  modules: {
    id: string;
    title: string;
    locked?: string;
    lessonsCount: number;
    quizzesCount: number;
    items: { title: string; type: string; duration?: string; meta?: string }[];
  }[];
  quickInsight: string;
  quickInsightPercent: number;
}

export function getLMSCourseDetail(id: string): LMSCourseDetail {
  const base = getLMSCourseById(id);
  return {
    totalEnrolled: base?.enrollment ?? 1248,
    avgProgress: 76,
    quizPassRate: 82,
    rating: 4.8,
    description:
      "This advanced program covers stakeholder psychology, risk mitigation matrices, and hybrid frameworks. Designed for experienced project managers seeking PMP certification and leadership skills.",
    createdAt: "Jan 15, 2024",
    totalHours: 45,
    format: "Hybrid",
    difficulty: "Advanced",
    language: "English (UK)",
    quizzesTotal: 12,
    instructorTitle: "Lead Project Analyst",
    recentGroups: [
      { name: "Winter Cohort 2024", students: 45, date: "Feb 1, 2024", status: "Upcoming" },
      { name: "Corporate Excellence A1", students: 12, date: "Jan 10, 2024", status: "In-Progress" },
    ],
    modules: [
      {
        id: "m1",
        title: "M1 Foundations of Advanced PM",
        lessonsCount: 4,
        quizzesCount: 2,
        items: [
          { title: "Introduction to Stakeholder Psychology", type: "YouTube", duration: "12:45 min" },
          { title: "Advanced Risk Mitigation Matrices", type: "VdoCipher", duration: "34:20 min" },
          { title: "Module 1 Baseline Assessment", type: "Quiz", meta: "15 Questions • Required" },
        ],
      },
      {
        id: "m2",
        title: "M2 Agile & Hybrid Frameworks",
        locked: "Locked until M1 Complete",
        lessonsCount: 0,
        quizzesCount: 0,
        items: [],
      },
    ],
    quickInsight: "Course engagement is up 12% compared to last month",
    quickInsightPercent: 12,
  };
}
