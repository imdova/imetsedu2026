import type { Course, CourseSection } from '@/types/course';
import CourseCurriculumAccordion from './CourseCurriculumAccordion';

interface CourseDetailsSyllabusProps {
  course: Course;
}

const DEFAULT_SECTIONS: CourseSection[] = [
  { id: 'm1', title: 'Introduction to Healthcare Quality', lectures: [{ id: 'l1', title: 'Overview', duration: '15:00', isPreview: true }] },
  { id: 'm2', title: 'Core Concepts and Frameworks', lectures: [{ id: 'l2', title: 'Quality Standards', duration: '20:00', isPreview: false }] },
  { id: 'm3', title: 'Implementation and Practice', lectures: [{ id: 'l3', title: 'Case Studies', duration: '25:00', isPreview: false }] },
];

export default function CourseDetailsSyllabus({ course }: CourseDetailsSyllabusProps) {
  const sections = course.curriculum?.length ? course.curriculum : DEFAULT_SECTIONS;
  return (
    <div className="max-w-4xl">
      <h2 className="text-xl font-bold text-[#030256] mb-4">Curriculum</h2>
      <CourseCurriculumAccordion sections={sections} />
    </div>
  );
}
