import { notFound } from 'next/navigation';
import Link from 'next/link';
import { courses } from '@/lib/data';
import { Course } from '@/types/course';
import CourseCurriculum from '@/components/CourseCurriculum';
import CourseTabs from '@/components/CourseTabs';

interface CourseDetailsPageProps {
  params: Promise<{ id: string }>;
}

export default async function CourseDetailsPage({ params }: CourseDetailsPageProps) {
  const { id } = await params;
  const course = courses.find((c) => c.id === id);

  if (!course) {
    notFound();
  }

  const totalLectures = course.curriculum?.reduce((acc, section) => acc + section.lectures.length, 0) || 0;
  const totalSections = course.curriculum?.length || 0;

  return (
    <div className="min-h-screen bg-white">
      {/* Course Title Section */}
      <div className="bg-white border-b border-gray-200">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6">
          <h1 className="text-3xl font-bold text-gray-900 mb-4">{course.title}</h1>
          
          <div className="flex flex-wrap items-center gap-4 text-sm text-gray-600">
            <div className="flex items-center">
              <span className="mr-2">📅</span>
              <span>{new Date(course.lastUpdated).toLocaleDateString('en-US', { month: 'short', day: 'numeric', year: 'numeric' }).replace(',', ',')}</span>
            </div>
            <div className="flex items-center">
              <img
                src={course.instructorImage || `https://i.pravatar.cc/40?img=1`}
                alt={course.instructor}
                className="w-8 h-8 rounded-full mr-2"
              />
              <span>{course.instructor}</span>
            </div>
            <span className="px-3 py-1 bg-gray-100 text-gray-700 rounded-full text-xs font-semibold">
              {course.category}
            </span>
            <span className="px-3 py-1 bg-gray-100 text-gray-700 rounded-full text-xs font-semibold">
              Healthcare Management
            </span>
            <span className="px-3 py-1 bg-green-100 text-green-700 rounded-full text-xs font-semibold flex items-center">
              <span className="mr-1">▶</span>
              Recorded
            </span>
            <div className="flex items-center">
              <span className="text-gray-400 mr-1">★</span>
              <span className="text-gray-600">({course.reviewCount} reviews)</span>
            </div>
          </div>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Main Content */}
          <div className="lg:col-span-2">
            {/* Video Player */}
            <div className="bg-black rounded-lg overflow-hidden shadow-lg mb-6 relative">
              <div className="relative w-full" style={{ paddingBottom: '56.25%' }}>
                <iframe
                  className="absolute top-0 left-0 w-full h-full"
                  src="https://www.youtube.com/embed/dQw4w9WgXcQ"
                  title={course.title}
                  allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                  allowFullScreen
                ></iframe>
              </div>
              <div className="absolute top-4 right-4 flex space-x-2">
                <button className="bg-black bg-opacity-50 text-white p-2 rounded hover:bg-opacity-70">
                  🔗
                </button>
                <button className="bg-black bg-opacity-50 text-white p-2 rounded hover:bg-opacity-70">
                  ⬇
                </button>
              </div>
            </div>

            {/* Navigation Tabs */}
            <CourseTabs />

            {/* Course Overview */}
            <section className="mb-8">
              <h2 className="text-2xl font-bold text-gray-900 mb-4">Course Overview</h2>
              <div className="prose max-w-none">
                <p className="text-gray-700 leading-relaxed mb-4">
                  Welcome to <strong>Healthcare Quality Management</strong>, a foundational course designed for future healthcare leaders. This comprehensive program provides you with the essential knowledge and skills needed to understand, implement, and manage quality improvement initiatives in healthcare settings.
                </p>
                <p className="text-gray-700 leading-relaxed mb-4">
                  {course.description}
                </p>
              </div>
              <div className="flex flex-wrap gap-2 mt-4">
                <span className="px-3 py-1 bg-gray-100 text-gray-700 rounded text-sm">Recorded</span>
                <span className="px-3 py-1 bg-gray-100 text-gray-700 rounded text-sm">{course.category}</span>
              </div>
            </section>

            {/* What You Will Learn */}
            {course.whatYouWillLearn && course.whatYouWillLearn.length > 0 && (
              <section className="mb-8">
                <h2 className="text-2xl font-bold text-gray-900 mb-2">What You Will Learn In This Course</h2>
                <p className="text-sm text-gray-600 mb-4">After this course you will be able to</p>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  {course.whatYouWillLearn.map((item, index) => (
                    <div key={index} className="flex items-start">
                      <span className="text-green-600 mr-3 mt-1 text-xl">✓</span>
                      <span className="text-gray-700">{item}</span>
                    </div>
                  ))}
                </div>
                <button className="mt-4 text-blue-600 hover:text-blue-700 font-semibold flex items-center">
                  View All Learning Outcomes
                  <span className="ml-2">→</span>
                </button>
              </section>
            )}

            {/* Who Can Attend */}
            {course.requirements && course.requirements.length > 0 && (
              <section className="mb-8">
                <h2 className="text-2xl font-bold text-gray-900 mb-2">Who can attend this course?</h2>
                <p className="text-sm text-gray-600 mb-4">You must have these to attend this course</p>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  {['Healthcare Professionals', 'Doctors', 'Nurses', 'Healthcare Administrators', 'Quality Assurance Staff', 'Medical Students'].map((role, index) => (
                    <div key={index} className="flex items-start">
                      <span className="text-green-600 mr-3 mt-1 text-xl">✓</span>
                      <span className="text-gray-700">{role}</span>
                    </div>
                  ))}
                </div>
              </section>
            )}

            {/* Course Curriculum */}
            {course.curriculum && course.curriculum.length > 0 && (
              <section className="mb-8">
                <h2 className="text-2xl font-bold text-gray-900 mb-2">Course Curriculum</h2>
                <p className="text-sm text-gray-600 mb-4">
                  {totalSections} Sections, {totalLectures} Lectures, 0 Quizzes
                </p>
                <CourseCurriculum sections={course.curriculum} />
              </section>
            )}

            {/* Knowledge & Skills */}
            <section className="mb-8">
              <h2 className="text-2xl font-bold text-gray-900 mb-4">Knowledge & Skills You Will Learn</h2>
              <div className="bg-gray-100 rounded-lg p-4 inline-block">
                <span className="text-gray-700 font-semibold">cphq</span>
              </div>
            </section>

            {/* FAQ */}
            <section className="mb-8">
              <div className="flex items-center justify-between mb-4">
                <h2 className="text-2xl font-bold text-gray-900">Frequently Asked Questions</h2>
                <div className="text-4xl">💬</div>
              </div>
              <div className="space-y-4">
                <details className="border border-gray-200 rounded-lg p-4">
                  <summary className="font-semibold text-gray-900 cursor-pointer">What is the course duration?</summary>
                  <p className="mt-2 text-gray-600">The course duration is {course.duration}.</p>
                </details>
                <details className="border border-gray-200 rounded-lg p-4">
                  <summary className="font-semibold text-gray-900 cursor-pointer">Do I get a certificate?</summary>
                  <p className="mt-2 text-gray-600">Yes, you will receive a certificate upon completion of the course.</p>
                </details>
                <details className="border border-gray-200 rounded-lg p-4">
                  <summary className="font-semibold text-gray-900 cursor-pointer">Can I access the course on mobile?</summary>
                  <p className="mt-2 text-gray-600">Yes, the course is accessible on both mobile and desktop devices.</p>
                </details>
              </div>
            </section>

            {/* Related Courses */}
            <section className="mb-8">
              <div className="flex items-center justify-between mb-4">
                <h2 className="text-2xl font-bold text-gray-900">Learners who took in this course also enrolled in</h2>
                <div className="flex space-x-2">
                  <button className="w-8 h-8 rounded-full border border-gray-300 hover:bg-gray-100 flex items-center justify-center">
                    ←
                  </button>
                  <button className="w-8 h-8 rounded-full border border-gray-300 hover:bg-gray-100 flex items-center justify-center">
                    →
                  </button>
                </div>
              </div>
              <div className="text-center py-8 text-gray-500">
                No courses found
              </div>
            </section>
          </div>

          {/* Sidebar */}
          <div className="lg:col-span-1">
            <div className="sticky top-20 space-y-6">
              {/* Course Features */}
              <div className="bg-white border border-gray-200 rounded-lg shadow-sm p-6">
                <h3 className="text-lg font-bold text-gray-900 mb-4">Course Features</h3>
                <div className="space-y-4">
                  <div className="flex items-center justify-between">
                    <div className="flex items-center">
                      <span className="text-gray-600 mr-2">📊</span>
                      <span className="text-gray-700">level</span>
                    </div>
                    <span className="text-gray-900 font-semibold">{course.level.toLowerCase()}</span>
                  </div>
                  <div className="flex items-center justify-between">
                    <div className="flex items-center">
                      <span className="text-gray-600 mr-2">📚</span>
                      <span className="text-gray-700">lessons</span>
                    </div>
                    <span className="text-gray-900 font-semibold">{totalLectures}</span>
                  </div>
                  <div className="flex items-center justify-between">
                    <div className="flex items-center">
                      <span className="text-gray-600 mr-2">📝</span>
                      <span className="text-gray-700">quizzes</span>
                    </div>
                    <span className="text-gray-900 font-semibold">2</span>
                  </div>
                  <div className="flex items-center justify-between">
                    <div className="flex items-center">
                      <span className="text-gray-600 mr-2">👥</span>
                      <span className="text-gray-700">Students</span>
                    </div>
                    <span className="text-gray-900 font-semibold">{course.studentCount.toLocaleString()}</span>
                  </div>
                </div>
              </div>

              {/* Secure Payment */}
              <div className="bg-white border border-gray-200 rounded-lg shadow-sm p-6">
                <h3 className="text-lg font-bold text-gray-900 mb-4">Secure Payment</h3>
                <div className="flex items-center space-x-2 mb-6">
                  <span className="text-2xl">💳</span>
                  <span className="text-2xl">💳</span>
                  <span className="text-2xl">💳</span>
                  <span className="text-2xl">💳</span>
                </div>
                <button className="w-full bg-green-600 text-white py-3 rounded-lg font-semibold hover:bg-green-700 transition-colors flex items-center justify-center">
                  Enroll in Course
                  <span className="ml-2">→</span>
                </button>
              </div>

              {/* Related Search */}
              <div className="bg-white border border-gray-200 rounded-lg shadow-sm p-6">
                <h3 className="text-lg font-bold text-gray-900 mb-4">Related Search</h3>
                <div className="bg-gray-100 rounded-lg p-3 inline-block">
                  <span className="text-gray-700 font-semibold">cphq</span>
                </div>
              </div>

              {/* Not Sure Where to Begin */}
              <div className="bg-white border border-gray-200 rounded-lg shadow-sm p-6 text-center">
                <div className="text-6xl mb-4">❓</div>
                <h3 className="text-lg font-bold text-gray-900 mb-2">Not sure where to begin?</h3>
                <p className="text-sm text-gray-600 mb-4">
                  Discover the career most suitable for you and get started in the field with a step-by-step plan.
                </p>
                <button className="w-full bg-green-600 text-white py-3 rounded-lg font-semibold hover:bg-green-700 transition-colors">
                  Get Your Plan
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
