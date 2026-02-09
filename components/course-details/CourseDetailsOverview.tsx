import type { Course, CourseSection } from '@/types/course';
import CourseCurriculumAccordion from './CourseCurriculumAccordion';
import LimitedOfferBanner from './LimitedOfferBanner';

interface CourseDetailsOverviewProps {
  course: Course;
}

const DEFAULT_LEARN = [
  'Understand healthcare quality frameworks and standards',
  'Apply quality improvement methodologies in clinical settings',
  'Prepare effectively for the CPHQ certification exam',
  'Analyze and implement patient safety initiatives',
];

const DEFAULT_ATTEND = [
  'Healthcare Professionals',
  'Doctors',
  'Nurses',
  'Healthcare Administrators',
  'Quality Assurance Staff',
  'Medical Students',
];

export default function CourseDetailsOverview({ course }: CourseDetailsOverviewProps) {
  const learn = course.whatYouWillLearn?.length ? course.whatYouWillLearn : DEFAULT_LEARN;
  const attend = DEFAULT_ATTEND;
  const defaultSections: CourseSection[] = [
    { id: 'm1', title: 'Introduction to Healthcare Quality', lectures: [{ id: 'l1', title: 'Overview', duration: '15:00', isPreview: true }] },
    { id: 'm2', title: 'Core Concepts and Frameworks', lectures: [{ id: 'l2', title: 'Quality Standards', duration: '20:00', isPreview: false }] },
    { id: 'm3', title: 'Implementation and Practice', lectures: [{ id: 'l3', title: 'Case Studies', duration: '25:00', isPreview: false }] },
  ];
  const sections = course.curriculum?.length ? course.curriculum : defaultSections;

  return (
    <div id="overview" className="max-w-4xl space-y-10">
      <section>
        <h2 className="text-xl font-bold text-black mb-3">Course Description</h2>
        <p className="text-gray-700 leading-relaxed">
          {course.description}
        </p>
      </section>

      <section>
        <h2 className="text-xl font-bold text-black mb-4">What you&apos;ll learn in this course</h2>
        <ul className="space-y-3">
          {learn.map((item, i) => (
            <li key={i} className="flex items-start gap-3">
              <span className="shrink-0 w-5 h-5 rounded-full bg-[#f59e0b] flex items-center justify-center mt-0.5">
                <span className="text-white text-xs">✓</span>
              </span>
              <span className="text-black text-[15px]">{item}</span>
            </li>
          ))}
        </ul>
      </section>

      <section>
        <h2 className="text-xl font-bold text-black mb-4">Curriculum</h2>
        <CourseCurriculumAccordion sections={sections} />
      </section>

      <section>
        <h2 className="text-xl font-bold text-black mb-4">Who can Attend this course?</h2>
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-x-8 gap-y-3">
          {attend.map((role, i) => (
            <div key={i} className="flex items-start gap-3">
              <span className="shrink-0 w-5 h-5 rounded-full bg-[#f59e0b] flex items-center justify-center mt-0.5">
                <span className="text-white text-xs">✓</span>
              </span>
              <span className="text-black text-[15px]">{role}</span>
            </div>
          ))}
        </div>
      </section>

      <section id="apply">
        <LimitedOfferBanner />
      </section>
    </div>
  );
}
