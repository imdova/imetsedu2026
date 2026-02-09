import Link from "next/link";
import CourseCard from "@/components/CourseCard";
import HeroSection from "@/components/HeroSection";
import ExploreCategoriesSection from "@/components/ExploreCategoriesSection";
import WhyChooseImetsSection from "@/components/WhyChooseImetsSection";
import CourseSectionBanner from "@/components/CourseSectionBanner";
import PopularCoursesSection from "@/components/PopularCoursesSection";
import { Container, Section } from "@/components/ui";
import { ROUTES } from "@/constants";
import { categories } from "@/lib/data";
import { courses, getBestsellers, getTopRated } from "@/lib/courses";

const FEATURED_COURSES_COUNT = 8;
const FEATURED_CATEGORIES_COUNT = 8;

export default function Home() {
  const featuredCourses = courses.slice(0, FEATURED_COURSES_COUNT);
  const featuredCategories = categories.slice(0, FEATURED_CATEGORIES_COUNT);
  const bestsellers = getBestsellers(3);
  const topRated = getTopRated(3);

  return (
    <div className="min-h-screen bg-gray-50">
      <HeroSection />

      {/* Popular courses Section */}
      <PopularCoursesSection />

      {/* Explore Top Categories - modern section */}
      <ExploreCategoriesSection categories={featuredCategories} />

      {/* Bestsellers Section */}
      <CourseSectionBanner
        title="Bestsellers Chosen by Our Students"
        description="Explore our top-selling courses, chosen by thousands of learners who've enrolled and benefited. These bestsellers reflect what's most in-demand and valuable across our platform."
        courses={bestsellers}
        viewMoreLink="/courses?sort=bestseller"
      />

      {/* Featured Courses Section */}
      <Section className="bg-gray-50">
        <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center mb-8 sm:mb-12 gap-4">
          <h2 className="text-2xl sm:text-3xl font-bold text-black">Featured Courses</h2>
          <Link
            href={ROUTES.COURSES}
            className="text-primary hover:text-primary-hover font-semibold"
          >
            View All →
          </Link>
        </div>
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 sm:gap-6">
          {featuredCourses.map((course) => (
            <CourseCard key={course.id} course={course} />
          ))}
        </div>
      </Section>

      {/* Top Rated Section */}
      <CourseSectionBanner
        title="Top Rated Courses"
        description="Discover our highest-rated courses based on student reviews and ratings. These courses have received exceptional feedback and are trusted by thousands of learners worldwide."
        courses={topRated}
        viewMoreLink="/courses?sort=top-rated"
      />

      {/* Why choose IMETS School of Business? */}
      <WhyChooseImetsSection />
    </div>
  );
}
