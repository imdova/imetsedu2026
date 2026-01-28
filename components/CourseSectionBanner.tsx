import Link from 'next/link';
import CourseCard from './CourseCard';
import { Course } from '@/types/course';

interface CourseSectionBannerProps {
  title: string;
  description: string;
  courses: Course[];
  viewMoreLink?: string;
}

export default function CourseSectionBanner({
  title,
  description,
  courses,
  viewMoreLink = '/courses',
}: CourseSectionBannerProps) {
  return (
    <section className="py-8 sm:py-12 bg-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="bg-[#030256] rounded-xl overflow-hidden shadow-lg">
          <div className="flex flex-col lg:flex-row">
            {/* Left Section - Text Content */}
            <div className="lg:w-1/3 xl:w-1/4 p-6 sm:p-8 lg:p-10 xl:p-12 flex flex-col justify-center bg-[#030256]">
              <h2 className="text-xl sm:text-2xl lg:text-3xl xl:text-4xl font-bold text-white mb-3 sm:mb-4 leading-tight">
                {title}
              </h2>
              <p className="text-white text-xs sm:text-sm lg:text-base mb-4 sm:mb-6 leading-relaxed opacity-95">
                {description}
              </p>
              <Link
                href={viewMoreLink}
                className="text-white font-semibold hover:underline inline-flex items-center self-start transition-all hover:translate-x-1 text-sm sm:text-base"
              >
                View More
                <span className="ml-2">→</span>
              </Link>
            </div>

            {/* Right Section - Course Cards */}
            <div className="lg:w-2/3 xl:w-3/4 p-4 sm:p-6 lg:p-8 bg-[#030256]">
              <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4 lg:gap-5">
                {courses.slice(0, 3).map((course) => (
                  <CourseCard key={course.id} course={course} />
                ))}
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
