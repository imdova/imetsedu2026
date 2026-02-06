/**
 * Mock data for My Courses page - matches design exactly.
 */

export type TagVariant = "dark" | "light" | "light-green" | "orange" | "purple";

export interface CourseTag {
  label: string;
  variant: TagVariant;
}

export interface MyCourseCard {
  id: string;
  title: string;
  instructor: string;
  bannerText: string;
  bannerVariant: "teal" | "pink" | "teal2" | "white";
  isFavorite: boolean;
  tags: CourseTag[];
  progress: number | null; // null = completed
  buttonLabel: "Resume Learning" | "View Certificate";
  buttonVariant: "primary" | "outline";
}

export const myCoursesData: MyCourseCard[] = [
  {
    id: "1",
    title: "Advanced Cybersecurity...",
    instructor: "Dr. Marcus Vane",
    bannerText: "CYBERSECURITY COURSE",
    bannerVariant: "teal",
    isFavorite: true,
    tags: [
      { label: "SECURITY", variant: "dark" },
      { label: "ADVANCED", variant: "light" },
    ],
    progress: 65,
    buttonLabel: "Resume Learning",
    buttonVariant: "primary",
  },
  {
    id: "2",
    title: "AWS Cloud Architecture &...",
    instructor: "Sarah Jenkins",
    bannerText: "",
    bannerVariant: "pink",
    isFavorite: false,
    tags: [
      { label: "CLOUD", variant: "light-green" },
      { label: "INTERMEDIATE", variant: "light" },
    ],
    progress: 12,
    buttonLabel: "Resume Learning",
    buttonVariant: "primary",
  },
  {
    id: "3",
    title: "Data Science Fundamentals with...",
    instructor: "Dr. Alan Turing",
    bannerText: "DATA SCIENCE",
    bannerVariant: "teal2",
    isFavorite: true,
    tags: [
      { label: "DATA SCIENCE", variant: "orange" },
      { label: "BEGINNER", variant: "light" },
    ],
    progress: 88,
    buttonLabel: "Resume Learning",
    buttonVariant: "primary",
  },
  {
    id: "4",
    title: "UI/UX Design Masterclass 2024",
    instructor: "Elena Rodriguez",
    bannerText: "UI UX",
    bannerVariant: "white",
    isFavorite: false,
    tags: [
      { label: "DESIGN", variant: "purple" },
      { label: "ADVANCED", variant: "light" },
    ],
    progress: null,
    buttonLabel: "View Certificate",
    buttonVariant: "outline",
  },
];

export const learningStats = {
  learningTime: "24.5 hrs",
  learningTimeSub: "+3h this week",
  coursesFinished: "12",
  coursesFinishedSub: "86% Completion rate",
  dailyStreak: "7 Days",
  dailyStreakSub: "Next milestone: 10 days",
};
