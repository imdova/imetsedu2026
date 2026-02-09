import { Calendar, GraduationCap, Users, Star } from 'lucide-react';
import { Course } from '@/types/course';
import CourseDetailsCard from './CourseDetailsCard';

interface CourseTitleBarProps {
  course: Course;
}

/** Format lastUpdated (YYYY-MM-DD) for display, or return a default start date */
function formatCourseDate(dateStr: string | undefined): string {
  if (dateStr) return dateStr;
  return new Date().toISOString().slice(0, 10);
}

export default function CourseTitleBar({ course }: CourseTitleBarProps) {
  const priceEGP = course.priceEGP ?? course.price;
  const originalEGP = course.originalPriceEGP ?? course.originalPrice;
  const showOriginalPrice = originalEGP != null && originalEGP > priceEGP;
  const delivery = course.deliveryMode ?? 'Online-Zoom';
  const freq = course.lectureFrequency ?? '1 Lecture-Weekly';
  const displayDate = formatCourseDate(course.lastUpdated);

  return (
    <div className="bg-[#0a47c2] text-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-5 sm:py-6">
        <h1 className="text-2xl sm:text-3xl lg:text-4xl font-bold mb-3 sm:mb-4">
          {course.title}
        </h1>
        <div className="flex flex-wrap items-center gap-x-4 gap-y-2 text-sm">
          <span className="inline-flex items-center gap-1.5">
            <Calendar className="w-4 h-4 text-white/80" aria-hidden />
            {displayDate}
          </span>
          <span className="inline-flex items-center gap-1.5">
            <GraduationCap className="w-4 h-4 text-white/80" aria-hidden />
            {delivery}
          </span>
          <span className="inline-flex items-center gap-1.5">
            <Calendar className="w-4 h-4 text-white/80" aria-hidden />
            {freq}
          </span>
          <span className="inline-flex items-center gap-1.5">
            {showOriginalPrice && (
              <>
                <span className="line-through text-white/60">
                  {originalEGP.toLocaleString()} EGP
                </span>
                {' '}
              </>
            )}
            <span className="font-semibold">{priceEGP.toLocaleString()} EGP</span>
          </span>
          <span className="inline-flex items-center gap-1.5">
            <Users className="w-4 h-4 text-white/80" aria-hidden />
            {course.studentCount.toLocaleString()} Students
          </span>
          <span className="inline-flex items-center gap-1.5">
            <span className="flex items-center gap-0.5" aria-label={`Rating ${course.rating} out of 5`}>
              {[...Array(5)].map((_, i) => (
                <Star
                  key={i}
                  className={`w-4 h-4 ${i < Math.floor(course.rating) ? 'fill-amber-400 text-amber-400' : 'text-white/40'}`}
                  aria-hidden
                />
              ))}
            </span>
            <span className="text-white/90">({course.reviewCount.toLocaleString()} Reviews)</span>
          </span>
        </div>

        {/* Video + Course Details below metadata, same blue card */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 lg:gap-8 mt-6 lg:mt-8">
          <div className="lg:col-span-2">
            <div className="rounded-xl overflow-hidden shadow-xl relative h-[364px]">
              <iframe
                className="absolute top-0 left-0 w-full h-full"
                src="https://www.youtube.com/embed/jNQXAC9IVRw"
                title={course.title}
                allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                allowFullScreen
              />
            </div>
          </div>
          <div className="lg:col-span-1">
            <CourseDetailsCard course={course} />
          </div>
        </div>
      </div>
    </div>
  );
}
