import type { Course } from "@/types/course";
import { courses, getPopularCourses, getRelevantCourses } from "./data";

export { getPopularCourses, getRelevantCourses };
export { courses } from "./data";

/** Courses that belong to the given category name (e.g. "Web Development"). */
export function getCoursesByCategoryName(categoryName: string): Course[] {
  return courses.filter(
    (c) => c.category.toLowerCase() === categoryName.toLowerCase()
  );
}

/** Courses sorted by student count (bestsellers), limited to `limit`. */
export function getBestsellers(limit = 3): Course[] {
  return [...courses]
    .sort((a, b) => b.studentCount - a.studentCount)
    .slice(0, limit);
}

/** Courses sorted by rating then review count, limited to `limit`. */
export function getTopRated(limit = 3): Course[] {
  return [...courses]
    .sort((a, b) => {
      if (b.rating !== a.rating) return b.rating - a.rating;
      return b.reviewCount - a.reviewCount;
    })
    .slice(0, limit);
}

/** Total lesson count from curriculum. */
export function getCourseLessonCount(course: Course): number {
  return (
    course.curriculum?.reduce(
      (acc, section) => acc + section.lectures.length,
      0
    ) ?? 0
  );
}

/** Human-readable duration (e.g. "24.5 hours" -> "2.5 weeks"). */
export function getCourseWeeksLabel(duration: string): string {
  if (duration.includes("week")) return duration;
  const hours = parseFloat(duration) || 0;
  const weeks = Math.round((hours / 10) * 10) / 10;
  return weeks === 0 ? "0 weeks" : `${weeks} weeks`;
}

/** Discount percentage from original and current price. */
export function getDiscountPercentage(
  price: number,
  originalPrice?: number
): number {
  if (!originalPrice || originalPrice <= price) return 0;
  return Math.round(((originalPrice - price) / originalPrice) * 100);
}
