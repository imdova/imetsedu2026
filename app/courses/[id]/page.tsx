import { notFound } from 'next/navigation';
import { courses } from '@/lib/data';
import CourseTitleBar from '@/components/course-details/CourseTitleBar';
import CourseDetailsTabs from '@/components/course-details/CourseDetailsTabs';
import CourseDetailsOverview from '@/components/course-details/CourseDetailsOverview';
import CourseDetailsSyllabus from '@/components/course-details/CourseDetailsSyllabus';

interface CourseDetailsPageProps {
  params: Promise<{ id: string }>;
}

export default async function CourseDetailsPage({ params }: CourseDetailsPageProps) {
  const { id } = await params;
  const course = courses.find((c) => c.id === id);

  if (!course) {
    notFound();
  }

  return (
    <div className="min-h-screen bg-white pb-16">
      <CourseTitleBar course={course} />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <CourseDetailsTabs
          overview={<CourseDetailsOverview course={course} />}
          syllabus={<CourseDetailsSyllabus course={course} />}
        />
      </div>
    </div>
  );
}
