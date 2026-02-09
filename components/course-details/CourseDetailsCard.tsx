import Link from 'next/link';
import Image from 'next/image';
import { Clock, Video, Languages, Award } from 'lucide-react';
import { Course } from '@/types/course';

interface CourseDetailsCardProps {
  course: Course;
}

export default function CourseDetailsCard({ course }: CourseDetailsCardProps) {
  return (
    <div className="bg-white rounded-xl shadow-lg border border-gray-100 overflow-hidden h-fit">
      <div className="relative h-32 w-full bg-gray-100">
        <Image
          src={course.image}
          alt={course.title}
          fill
          className="object-cover"
          sizes="(max-width: 1024px) 100vw, 33vw"
        />
      </div>
      <div className="p-5 sm:p-6">
        <h3 className="text-lg font-bold text-black mb-4">Course Details:</h3>
        <div className="space-y-3 text-sm">
          <div className="flex items-center justify-between gap-2">
            <span className="flex items-center gap-2 text-gray-600">
              <Clock className="w-4 h-4 text-[#030256] shrink-0" aria-hidden />
              Duration
            </span>
            <span className="text-gray-900 font-medium">{course.duration}</span>
          </div>
          <div className="flex items-center justify-between gap-2">
            <span className="flex items-center gap-2 text-gray-600">
              <Video className="w-4 h-4 text-[#030256] shrink-0" aria-hidden />
              Attendance
            </span>
            <span className="text-gray-900 font-medium">{course.deliveryMode ?? 'Online-Zoom'}</span>
          </div>
          <div className="flex items-center justify-between gap-2">
            <span className="flex items-center gap-2 text-gray-600">
              <Languages className="w-4 h-4 text-[#030256] shrink-0" aria-hidden />
              Language
            </span>
            <span className="text-gray-900 font-medium">{course.language}</span>
          </div>
          <div className="flex items-center justify-between gap-2">
            <span className="flex items-center gap-2 text-gray-600">
              <Award className="w-4 h-4 text-[#030256] shrink-0" aria-hidden />
              Certifications
            </span>
            <span className="text-gray-900 font-medium">International Certificate</span>
          </div>
        </div>
        <div className="mt-6">
          <Link
            href="#apply"
            className="block w-full text-center bg-[var(--color-primary)] hover:bg-[var(--color-primary-hover)] text-white py-3 px-4 rounded-lg font-semibold transition-colors"
          >
            Apply Now
          </Link>
        </div>
      </div>
    </div>
  );
}
