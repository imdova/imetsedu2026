/**
 * Mock data for student dashboard.
 */

export const dashboardStats = {
  weeklyGoalPercent: 75,
  coursesActive: 4,
  hoursLearned: "28.5h",
  certificates: 12,
};

export const nextUpSession = {
  date: "14 OCT",
  tag: "LIVE SESSION",
  title: "Advanced UI Systems & Design Principles",
  time: "Today at 14:00 (Starts in 45 mins)",
};

export const upcomingDeadlines = [
  {
    id: "1",
    title: "Network Security Quiz",
    due: "Due in 5 hours",
    accent: "red",
  },
  {
    id: "2",
    title: "ML Model Documentation",
    due: "Due Tomorrow",
    accent: "amber",
  },
];

export const activeCourses = [
  {
    id: "1",
    title: "Advanced Cybersecurity Fundamentals",
    instructor: "Dr. Sarah Mitchell",
    moduleLabel: "Module 5 of 12",
    progress: 65,
  },
  {
    id: "2",
    title: "Data Science & Machine Learning",
    instructor: "Prof. James Wilson",
    moduleLabel: "Module 2 of 10",
    progress: 22,
  },
];

export const recentActivity = [
  {
    id: "1",
    time: "Today, 09:12 AM",
    text: "Completed Lesson: Encryption Algorithms",
    variant: "blue",
  },
  {
    id: "2",
    time: "Yesterday, 04:45 PM",
    text: "Passed Quiz: Introduction to Python",
    variant: "green",
  },
  {
    id: "3",
    time: "Oct 12, 11:20 AM",
    text: "Uploaded Assignment: Case Study Alpha",
    variant: "grey",
  },
];

export const announcements = [
  {
    id: "1",
    author: "Dr. Mitchell",
    avatar: "DM",
    time: "2h ago",
    message:
      "New study materials for the final examination have been uploaded to the resources folder.",
  },
];
