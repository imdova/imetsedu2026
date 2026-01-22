'use client';

import { useState } from 'react';
import Link from 'next/link';
import { courses } from '@/lib/data';
import { Course } from '@/types/course';

export default function InstructorCoursesPage() {
  const [courseList, setCourseList] = useState<Course[]>(courses.slice(0, 3)); // Simulating instructor's courses

  const handleDelete = (courseId: string) => {
    if (confirm('Are you sure you want to delete this course? This action cannot be undone.')) {
      setCourseList(courseList.filter((course) => course.id !== courseId));
    }
  };

  return (
    <div className="p-8">
      <div className="mb-8 flex justify-between items-center">
        <div>
          <h1 className="text-3xl font-bold text-gray-900 mb-2">My Courses</h1>
          <p className="text-gray-600">Manage and organize your courses</p>
        </div>
        <Link
          href="/instructor/courses/new"
          className="bg-blue-600 text-white px-6 py-3 rounded-lg font-semibold hover:bg-blue-700 transition-colors"
        >
          + Create New Course
        </Link>
      </div>

      {courseList.length === 0 ? (
        <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-12 text-center">
          <div className="text-6xl mb-4">📚</div>
          <h2 className="text-2xl font-bold text-gray-900 mb-2">No courses yet</h2>
          <p className="text-gray-600 mb-6">Get started by creating your first course</p>
          <Link
            href="/instructor/courses/new"
            className="inline-block bg-blue-600 text-white px-6 py-3 rounded-lg font-semibold hover:bg-blue-700 transition-colors"
          >
            Create Your First Course
          </Link>
        </div>
      ) : (
        <div className="bg-white rounded-lg shadow-sm border border-gray-200 overflow-hidden">
          <div className="overflow-x-auto">
            <table className="w-full">
              <thead className="bg-gray-50 border-b border-gray-200">
                <tr>
                  <th className="px-6 py-4 text-left text-sm font-semibold text-gray-900">Course</th>
                  <th className="px-6 py-4 text-left text-sm font-semibold text-gray-900">Students</th>
                  <th className="px-6 py-4 text-left text-sm font-semibold text-gray-900">Rating</th>
                  <th className="px-6 py-4 text-left text-sm font-semibold text-gray-900">Status</th>
                  <th className="px-6 py-4 text-left text-sm font-semibold text-gray-900">Actions</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-gray-200">
                {courseList.map((course) => (
                  <tr key={course.id} className="hover:bg-gray-50">
                    <td className="px-6 py-4">
                      <div className="flex items-center space-x-4">
                        <img
                          src={course.image}
                          alt={course.title}
                          className="w-20 h-12 object-cover rounded"
                        />
                        <div>
                          <p className="font-semibold text-gray-900">{course.title}</p>
                          <p className="text-sm text-gray-500">{course.category}</p>
                        </div>
                      </div>
                    </td>
                    <td className="px-6 py-4 text-gray-700">
                      {course.studentCount.toLocaleString()}
                    </td>
                    <td className="px-6 py-4">
                      <div className="flex items-center">
                        <span className="text-yellow-500 mr-1">★</span>
                        <span className="font-semibold">{course.rating}</span>
                      </div>
                    </td>
                    <td className="px-6 py-4">
                      <span className="px-3 py-1 bg-green-100 text-green-700 rounded-full text-sm font-semibold">
                        Published
                      </span>
                    </td>
                    <td className="px-6 py-4">
                      <div className="flex items-center space-x-3">
                        <Link
                          href={`/instructor/courses/${course.id}/edit`}
                          className="text-blue-600 hover:text-blue-700 font-semibold"
                        >
                          Edit
                        </Link>
                        <button
                          onClick={() => handleDelete(course.id)}
                          className="text-red-600 hover:text-red-700 font-semibold"
                        >
                          Delete
                        </button>
                      </div>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      )}
    </div>
  );
}
