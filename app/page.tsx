import Link from 'next/link';
import CourseCard from '@/components/CourseCard';
import CategoryCard from '@/components/CategoryCard';
import CourseSectionBanner from '@/components/CourseSectionBanner';
import PopularCoursesSection from '@/components/PopularCoursesSection';
import { courses, categories } from '@/lib/data';

export default function Home() {
  const featuredCourses = courses.slice(0, 6);
  const featuredCategories = categories.slice(0, 8);
  
  // Get bestsellers (sorted by student count)
  const bestsellers = [...courses]
    .sort((a, b) => b.studentCount - a.studentCount)
    .slice(0, 3);
  
  // Get top rated (sorted by rating, then by review count)
  const topRated = [...courses]
    .sort((a, b) => {
      if (b.rating !== a.rating) {
        return b.rating - a.rating;
      }
      return b.reviewCount - a.reviewCount;
    })
    .slice(0, 3);

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Hero Section */}
      <section className="bg-gradient-to-r from-[#030256] to-[#0a0a7d] text-white py-12 sm:py-16 lg:py-20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center">
            <h1 className="text-3xl sm:text-4xl lg:text-5xl font-bold mb-4 sm:mb-6">
              Learn Without Limits
            </h1>
            <p className="text-base sm:text-lg lg:text-xl mb-6 sm:mb-8 max-w-2xl mx-auto px-4">
              Start, switch, or advance your career with thousands of courses, Professional Certificates, and degrees from world-class instructors.
            </p>
            <div className="flex flex-col sm:flex-row justify-center items-center gap-3 sm:gap-4 px-4">
              <Link
                href="/search"
                className="w-full sm:w-auto bg-white text-[#030256] px-6 sm:px-8 py-3 rounded-lg font-semibold hover:bg-gray-100 transition-colors text-center"
              >
                Explore Courses
              </Link>
              <Link
                href="/courses"
                className="w-full sm:w-auto bg-transparent border-2 border-white text-white px-6 sm:px-8 py-3 rounded-lg font-semibold hover:bg-white hover:text-[#030256] transition-colors text-center"
              >
                Browse All
              </Link>
            </div>
          </div>
        </div>
      </section>

      {/* Popular courses Section */}
      <PopularCoursesSection />

      {/* Categories Section */}
      <section className="py-8 sm:py-12 lg:py-16 bg-gray-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <h2 className="text-2xl sm:text-3xl font-bold text-center mb-8 sm:mb-12">Explore Top Categories</h2>
          <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 gap-4 sm:gap-6">
            {featuredCategories.map((category) => (
              <CategoryCard key={category.id} category={category} />
            ))}
          </div>
        </div>
      </section>

      {/* Bestsellers Section */}
      <CourseSectionBanner
        title="Bestsellers Chosen by Our Students"
        description="Explore our top-selling courses, chosen by thousands of learners who've enrolled and benefited. These bestsellers reflect what's most in-demand and valuable across our platform."
        courses={bestsellers}
        viewMoreLink="/courses?sort=bestseller"
      />

      {/* Featured Courses Section */}
      <section className="py-8 sm:py-12 lg:py-16 bg-gray-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center mb-8 sm:mb-12 gap-4">
            <h2 className="text-2xl sm:text-3xl font-bold">Featured Courses</h2>
            <Link
              href="/courses"
              className="text-[#030256] hover:text-[#04036a] font-semibold"
            >
              View All →
            </Link>
          </div>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 sm:gap-6">
            {featuredCourses.map((course) => (
              <CourseCard key={course.id} course={course} />
            ))}
          </div>
        </div>
      </section>

      {/* Top Rated Section */}
      <CourseSectionBanner
        title="Top Rated Courses"
        description="Discover our highest-rated courses based on student reviews and ratings. These courses have received exceptional feedback and are trusted by thousands of learners worldwide."
        courses={topRated}
        viewMoreLink="/courses?sort=top-rated"
      />

      {/* Why Choose Us Section */}
      <section className="py-8 sm:py-12 lg:py-16 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <h2 className="text-2xl sm:text-3xl font-bold text-center mb-8 sm:mb-12">Why Choose IMETS?</h2>
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6 sm:gap-8">
            <div className="text-center">
              <div className="text-4xl sm:text-5xl mb-4">🎓</div>
              <h3 className="text-lg sm:text-xl font-semibold mb-2">Expert Instructors</h3>
              <p className="text-sm sm:text-base text-gray-600">
                Learn from industry experts with years of real-world experience
              </p>
            </div>
            <div className="text-center">
              <div className="text-4xl sm:text-5xl mb-4">📚</div>
              <h3 className="text-lg sm:text-xl font-semibold mb-2">Comprehensive Content</h3>
              <p className="text-sm sm:text-base text-gray-600">
                Access thousands of courses covering all major topics and skills
              </p>
            </div>
            <div className="text-center sm:col-span-2 md:col-span-1">
              <div className="text-4xl sm:text-5xl mb-4">💼</div>
              <h3 className="text-lg sm:text-xl font-semibold mb-2">Career Advancement</h3>
              <p className="text-sm sm:text-base text-gray-600">
                Get the skills you need to advance your career and achieve your goals
              </p>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}
