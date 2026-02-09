import { Course } from '@/types/course';
import CourseDetailsCard from './CourseDetailsCard';

interface CourseDetailsHeroProps {
  course: Course;
}

export default function CourseDetailsHero({ course }: CourseDetailsHeroProps) {
  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6 lg:py-8">
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 lg:gap-8">
        <div className="lg:col-span-2">
          <div className="rounded-xl overflow-hidden shadow-xl relative" style={{ paddingBottom: '56.25%' }}>
            <iframe
              className="absolute top-0 left-0 w-full h-full"
              src="https://www.youtube.com/embed/dQw4w9WgXcQ"
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
  );
}
