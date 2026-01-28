import { Course } from '@/types/course';
import CourseDetailsCard from './CourseDetailsCard';

interface CourseDetailsHeroProps {
  course: Course;
}

export default function CourseDetailsHero({ course }: CourseDetailsHeroProps) {
  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6 lg:py-8">
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 lg:gap-8">
        <div className="lg:col-span-2 relative">
          <div className="bg-black rounded-xl overflow-hidden shadow-xl relative" style={{ paddingBottom: '56.25%' }}>
            <iframe
              className="absolute top-0 left-0 w-full h-full"
              src="https://www.youtube.com/embed/dQw4w9WgXcQ"
              title={course.title}
              allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
              allowFullScreen
            />
            <div className="absolute top-3 left-3 flex items-center gap-2">
              <span className="bg-white/90 text-[#030256] px-2 py-1 rounded text-xs font-bold">
                IMETS
              </span>
            </div>
            <div className="absolute bottom-3 left-3">
              <span className="bg-amber-400 text-gray-900 px-3 py-1.5 rounded font-bold text-sm border-2 border-amber-500">
                15 YEARS EXPERIENCE
              </span>
            </div>
          </div>
        </div>
        <div className="lg:col-span-1">
          <CourseDetailsCard course={course} />
        </div>
      </div>
    </div>
  );
}
