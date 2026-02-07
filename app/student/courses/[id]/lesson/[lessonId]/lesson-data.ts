/**
 * Mock data for Student Lesson page - matches design.
 */

export type LessonStatus = "completed" | "in_progress" | "locked";

export interface SidebarLesson {
  id: string;
  slug: string;
  title: string;
  duration: string;
  status: LessonStatus;
}

export interface SidebarModule {
  id: string;
  title: string;
  lessons: SidebarLesson[];
  expanded: boolean;
}

export interface LessonPageData {
  courseId: string;
  courseTitle: string;
  breadcrumb: string[]; // e.g. ["Professional Certifications", "Advanced Engineering", "Module 2: Structural Dynamics"]
  progressPct: number;
  lessonsCompleted: number;
  lessonsTotal: number;
  modules: SidebarModule[];
  currentLesson: {
    id: string;
    slug: string;
    title: string;
    duration: string;
    currentTime: string;
    description: string;
    objectives: string[];
    resource: {
      name: string;
      size: string;
      type: string;
    };
  };
  qaCount: number;
  prevLessonSlug: string | null;
  nextLessonSlug: string | null;
}

const defaultLessonData: LessonPageData = {
  courseId: "1",
  courseTitle: "Advanced Engineering",
  breadcrumb: [
    "Professional Certifications",
    "Advanced Engineering",
    "Module 2: Structural Dynamics",
  ],
  progressPct: 65,
  lessonsCompleted: 12,
  lessonsTotal: 18,
  modules: [
    {
      id: "m1",
      title: "Module 1: Structural Dynamics",
      expanded: true,
      lessons: [
        {
          id: "l1",
          slug: "1-1",
          title: "1.1 Introduction to Forces",
          duration: "12:40",
          status: "completed",
        },
        {
          id: "l2",
          slug: "2-1",
          title: "2.1 Advanced Structural Analysis",
          duration: "18:25",
          status: "in_progress",
        },
        {
          id: "l3",
          slug: "2-2",
          title: "2.2 Dynamics Lab Simulation",
          duration: "08:15",
          status: "locked",
        },
      ],
    },
    {
      id: "m2",
      title: "Module 2: Seismic Engineering",
      expanded: true,
      lessons: [
        {
          id: "l4",
          slug: "3-1",
          title: "3.1 Plate Tectonics Basics",
          duration: "15:00",
          status: "locked",
        },
      ],
    },
  ],
  currentLesson: {
    id: "l2",
    slug: "2-1",
    title: "2.1 Advanced Structural Analysis",
    duration: "18:25",
    currentTime: "05:14",
    description:
      "In this lesson, we delve into the core principles of structural analysis within high-density urban environments. You will learn about load distribution, seismic resistance coefficients, and the mathematical modeling required for skyscrapers above 50 stories.",
    objectives: [
      "Understand the D'Alembert's Principle for dynamic systems.",
      "Apply Fourier Transform methods to vibration analysis.",
      "Calculate damping ratios for various structural materials.",
    ],
    resource: {
      name: "Module_2_Formulas.pdf",
      size: "2.4 MB",
      type: "Essential Reference",
    },
  },
  qaCount: 12,
  prevLessonSlug: "1-1",
  nextLessonSlug: "2-2",
};

export function getLessonData(
  courseId: string,
  lessonId: string
): LessonPageData | null {
  const slug = lessonId.replace(/\./g, "-");
  const data: LessonPageData = JSON.parse(JSON.stringify(defaultLessonData));
  data.courseId = courseId;
  const flatLessons = data.modules.flatMap((m) => m.lessons);
  const currentIndex = flatLessons.findIndex(
    (l) => l.slug === slug || l.id === lessonId
  );
  const current = currentIndex >= 0 ? flatLessons[currentIndex] : null;

  if (current) {
    data.currentLesson = {
      ...data.currentLesson,
      id: current.id,
      slug: current.slug,
      title: current.title,
      duration: current.duration,
      currentTime: "05:14",
    };
    data.prevLessonSlug =
      currentIndex > 0 ? flatLessons[currentIndex - 1].slug : null;
    data.nextLessonSlug =
      currentIndex < flatLessons.length - 1 && currentIndex >= 0
        ? flatLessons[currentIndex + 1].slug
        : null;
  } else {
    data.currentLesson.slug = slug;
    data.currentLesson.duration = "18:25";
  }
  return data;
}

/** Default lesson slug for "Resume Learning" when no lesson in progress is stored. */
export const DEFAULT_LESSON_SLUG = "2-1";
