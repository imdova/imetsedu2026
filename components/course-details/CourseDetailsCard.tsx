import Link from 'next/link';
import { Course } from '@/types/course';

interface CourseDetailsCardProps {
  course: Course;
}

export default function CourseDetailsCard({ course }: CourseDetailsCardProps) {
  const priceEGP = course.priceEGP ?? course.price;

  return (
    <div className="bg-white rounded-xl shadow-lg border border-gray-100 overflow-hidden h-fit">
      <div className="h-24 bg-gradient-to-br from-sky-100 via-sky-50 to-teal-50" />
      <div className="p-5 sm:p-6">
        <h3 className="text-lg font-bold text-[#030256] mb-4">Course Details</h3>
        <div className="space-y-3 text-sm">
          <div className="flex items-center gap-3">
            <span className="text-[#030256] w-8">🕒</span>
            <span className="text-gray-700">Duration: {course.duration}</span>
          </div>
          <div className="flex items-center gap-3">
            <span className="text-[#030256] w-8">🎓</span>
            <span className="text-gray-700">Skill Level: {course.level}</span>
          </div>
          <div className="flex items-center gap-3">
            <span className="text-[#030256] w-8">🌐</span>
            <span className="text-gray-700">Language: {course.language}</span>
          </div>
          <div className="flex items-center gap-3">
            <span className="text-[#030256] w-8">📜</span>
            <span className="text-gray-700">Certificate: Certified</span>
          </div>
        </div>
        <div className="mt-6">
          <span className="text-xl font-bold text-[#030256] block mb-4">
            {priceEGP.toLocaleString()} EGP
          </span>
          <Link
            href="#apply"
            className="block w-full text-center bg-[#f59e0b] hover:bg-[#d97706] text-white py-3 px-4 rounded-lg font-semibold transition-colors"
          >
            Apply Now
          </Link>
        </div>
      </div>
    </div>
  );
}
