import Link from 'next/link';
import { Course } from '@/types/course';

interface CourseTitleBarProps {
  course: Course;
}

export default function CourseTitleBar({ course }: CourseTitleBarProps) {
  const priceEGP = course.priceEGP ?? course.price;
  const delivery = course.deliveryMode ?? 'Online-Zoom';
  const freq = course.lectureFrequency ?? '1 Lecture-Weekly';

  return (
    <div className="bg-[#030256] text-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-5 sm:py-6">
        <h1 className="text-2xl sm:text-3xl lg:text-4xl font-bold mb-3 sm:mb-4">
          {course.title}
        </h1>
        <div className="flex flex-wrap items-center gap-3 sm:gap-5 text-sm">
          <span>{delivery}</span>
          <span className="text-white/70">•</span>
          <span>{freq}</span>
          <span className="text-white/70">•</span>
          <span className="font-semibold">{priceEGP.toLocaleString()} EGP</span>
          <span className="text-white/70">•</span>
          <span>{course.studentCount.toLocaleString()} Students</span>
          <span className="text-white/70">•</span>
          <div className="flex items-center gap-1">
            {[...Array(5)].map((_, i) => (
              <span key={i} className={i < Math.floor(course.rating) ? 'text-amber-400' : 'text-white/40'}>
                ★
              </span>
            ))}
          </div>
          <Link
            href="#overview"
            className="ml-auto inline-flex items-center px-4 py-2 bg-white text-[#030256] rounded-lg font-semibold hover:bg-gray-100 transition-colors text-sm"
          >
            View
          </Link>
        </div>
      </div>
    </div>
  );
}
