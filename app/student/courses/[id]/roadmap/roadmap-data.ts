/**
 * Mock data for Course Roadmap page - matches design.
 */

export type LessonType = "video" | "reading" | "quiz" | "live";

export interface RoadmapLesson {
  id: string;
  title: string;
  type: LessonType;
  meta: string; // e.g. "45 mins", "PDF", "10 Questions"
  completed?: boolean;
  score?: string; // e.g. "95/100"
  date?: string;
  actionLabel?: string; // e.g. "Watch Recording"
}

export interface RoadmapModule {
  id: string;
  number: string;
  title: string;
  summary: string; // e.g. "4 Lessons • 1 Quiz • 3.5 Hours"
  status: "completed" | "in_progress" | "locked";
  progressPct?: number;
  lessons: RoadmapLesson[];
  expanded?: boolean;
}

export interface RoadmapAssessment {
  name: string;
  score: string;
}

export interface RoadmapResource {
  name: string;
  type: string;
  size: string;
}

export interface CourseRoadmapData {
  courseId: string;
  title: string;
  department: string;
  instructor: string;
  semester: string;
  progressPct: number;
  lessonsCompleted: number;
  lessonsTotal: number;
  modules: RoadmapModule[];
  overallGrade: string;
  gradePct: number;
  recentAssessments: RoadmapAssessment[];
  resources: RoadmapResource[];
  timeSpent: string;
  classRank: string;
  avgScore: string;
  streaks: string;
  nextLiveSession: string;
}

function getDefaultRoadmap(
  courseId: string,
  courseTitle: string
): CourseRoadmapData {
  return {
    courseId,
    title: courseTitle,
    department: "ENGINEERING DEPT",
    instructor: "Dr. Sarah Jenkins",
    semester: "Semester 1, 2024",
    progressPct: 80,
    lessonsCompleted: 12,
    lessonsTotal: 15,
    modules: [
      {
        id: "m1",
        number: "01",
        title: "Foundations of Structural Analysis",
        summary: "4 Lessons • 1 Quiz • 3.5 Hours",
        status: "completed",
        expanded: true,
        lessons: [
          {
            id: "l1",
            title: "1.1 Introduction to Elasticity Theory",
            type: "video",
            meta: "45 mins",
            completed: true,
          },
          {
            id: "l2",
            title: "1.2 Stress-Strain Relations in 3D",
            type: "reading",
            meta: "PDF",
            completed: true,
          },
          {
            id: "l3",
            title: "Module 01: Final Assessment",
            type: "quiz",
            meta: "10 Questions",
            completed: true,
            score: "95/100",
          },
        ],
      },
      {
        id: "m2",
        number: "02",
        title: "Matrix Methods in Engineering",
        summary: "5 Lessons • 1 Live Session • 5 Hours",
        status: "in_progress",
        progressPct: 60,
        expanded: true,
        lessons: [
          {
            id: "l4",
            title: "Recorded: Matrix Formulation Session",
            type: "live",
            meta: "Live Session",
            date: "Oct 12, 2023",
            actionLabel: "Watch Recording",
          },
        ],
      },
      {
        id: "m3",
        number: "03",
        title: "Non-Linear Dynamics",
        summary: "6 Lessons • Project Phase",
        status: "locked",
        lessons: [],
      },
    ],
    overallGrade: "A- (88%)",
    gradePct: 88,
    recentAssessments: [
      { name: "Midterm Exam", score: "92/100" },
      { name: "Design Project 1", score: "85/100" },
      { name: "Weekly Quiz 4", score: "100/100" },
    ],
    resources: [
      { name: "Full_Syllabus_2024.pdf", type: "PDF Document", size: "2.4 MB" },
      {
        name: "Textbook_Structural_Vol1.epub",
        type: "E-Book",
        size: "12.8 MB",
      },
      { name: "Design_Cheat_Sheet.xlsx", type: "Spreadsheet", size: "850 KB" },
    ],
    timeSpent: "28.5h",
    classRank: "#4 / 120",
    avgScore: "94.2",
    streaks: "12 Days",
    nextLiveSession: "Tomorrow, 10:00 AM",
  };
}

const titleOverrides: Record<string, string> = {
  "1": "Advanced Structural Engineering",
  "2": "Advanced Structural Engineering",
  "3": "Advanced Structural Engineering",
  "4": "Advanced Structural Engineering",
};

export function getRoadmapForCourse(
  courseId: string,
  courseTitle: string
): CourseRoadmapData {
  const title = titleOverrides[courseId] ?? courseTitle;
  return getDefaultRoadmap(courseId, title);
}
