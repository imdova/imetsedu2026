'use client';

import { useState, useEffect } from 'react';
import { useRouter, useParams } from 'next/navigation';
import { courses, categories } from '@/lib/data';
import { Course } from '@/types/course';

export default function EditCoursePage() {
  const router = useRouter();
  const params = useParams();
  const courseId = params.id as string;
  
  const [formData, setFormData] = useState<Partial<Course>>({
    title: '',
    category: '',
    level: 'Beginner',
    description: '',
    price: 0,
    originalPrice: 0,
  });

  useEffect(() => {
    const course = courses.find((c) => c.id === courseId);
    if (course) {
      setFormData({
        title: course.title,
        category: course.category,
        level: course.level,
        description: course.description,
        price: course.price,
        originalPrice: course.originalPrice,
      });
    }
  }, [courseId]);

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
    const { name, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: name === 'price' || name === 'originalPrice' ? parseFloat(value) || 0 : value,
    }));
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    // Handle form submission
    alert('Course updated successfully!');
    router.push('/instructor/courses');
  };

  const course = courses.find((c) => c.id === courseId);

  if (!course) {
    return (
      <div className="p-8">
        <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-12 text-center">
          <h2 className="text-2xl font-bold text-gray-900 mb-2">Course not found</h2>
          <p className="text-gray-600 mb-6">The course you're looking for doesn't exist.</p>
          <button
            onClick={() => router.push('/instructor/courses')}
            className="bg-blue-600 text-white px-6 py-3 rounded-lg font-semibold hover:bg-blue-700 transition-colors"
          >
            Back to Courses
          </button>
        </div>
      </div>
    );
  }

  return (
    <div className="p-8 bg-gray-50 min-h-screen">
      <div className="max-w-4xl mx-auto">
        <div className="mb-8">
          <h1 className="text-3xl font-bold text-gray-900 mb-2">Edit Course</h1>
          <p className="text-gray-600">Update your course information</p>
        </div>

        <div className="bg-white rounded-xl shadow-lg border border-gray-200 overflow-hidden">
          <form onSubmit={handleSubmit} className="divide-y divide-gray-200">
          {/* Basic Information */}
          <div className="p-8">
            <h3 className="text-lg font-bold text-gray-900 mb-6 flex items-center">
              <span className="w-1 h-6 bg-blue-600 rounded-full mr-3"></span>
              Basic Information
            </h3>
            
            <div className="space-y-6">
              <div>
                <label className="block text-sm font-semibold text-gray-700 mb-2">
                  Course Title <span className="text-red-500">*</span>
                </label>
                <input
                  type="text"
                  name="title"
                  value={formData.title}
                  onChange={handleInputChange}
                  className="w-full px-4 py-3 border-2 border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition-all duration-200 bg-gray-50 hover:bg-white"
                  required
                />
              </div>

              <div>
                <label className="block text-sm font-semibold text-gray-700 mb-2">
                  Category <span className="text-red-500">*</span>
                </label>
                <select
                  name="category"
                  value={formData.category}
                  onChange={handleInputChange}
                  className="w-full px-4 py-3 border-2 border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition-all duration-200 bg-gray-50 hover:bg-white appearance-none cursor-pointer"
                  required
                >
                  <option value="">Select a category</option>
                  {categories.map((category) => (
                    <option key={category.id} value={category.name}>
                      {category.name}
                    </option>
                  ))}
                </select>
              </div>

              <div>
                <label className="block text-sm font-semibold text-gray-700 mb-4">
                  Difficulty Level <span className="text-red-500">*</span>
                </label>
                <div className="flex space-x-4">
                  {(['Beginner', 'Intermediate', 'Advanced'] as const).map((level) => (
                    <button
                      key={level}
                      type="button"
                      onClick={() => setFormData((prev) => ({ ...prev, level }))}
                      className={`flex-1 px-6 py-4 rounded-lg font-semibold transition-all duration-200 ${
                        formData.level === level
                          ? 'bg-gradient-to-r from-blue-600 to-indigo-600 text-white shadow-lg transform scale-105'
                          : 'bg-white border-2 border-gray-300 text-gray-700 hover:border-blue-500 hover:bg-gray-50'
                      }`}
                    >
                      {level}
                    </button>
                  ))}
                </div>
              </div>

              <div>
                <label className="block text-sm font-semibold text-gray-700 mb-2">
                  Description <span className="text-red-500">*</span>
                </label>
                <textarea
                  name="description"
                  value={formData.description}
                  onChange={handleInputChange}
                  rows={8}
                  className="w-full px-4 py-3 border-2 border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition-all duration-200 bg-gray-50 hover:bg-white resize-none"
                  required
                />
              </div>
            </div>
          </div>

          {/* Pricing */}
          <div className="p-8 bg-gray-50">
            <h3 className="text-lg font-bold text-gray-900 mb-6 flex items-center">
              <span className="w-1 h-6 bg-blue-600 rounded-full mr-3"></span>
              Pricing
            </h3>
            
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div className="bg-white p-6 rounded-lg border-2 border-gray-200 hover:border-blue-300 transition-all duration-200">
                <label className="block text-sm font-semibold text-gray-700 mb-2">
                  Price ($) <span className="text-red-500">*</span>
                </label>
                <div className="relative">
                  <span className="absolute left-4 top-1/2 transform -translate-y-1/2 text-gray-400">$</span>
                  <input
                    type="number"
                    name="price"
                    value={formData.price}
                    onChange={handleInputChange}
                    min="0"
                    step="0.01"
                    className="w-full pl-8 pr-4 py-3 border-2 border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition-all duration-200"
                    required
                  />
                </div>
              </div>
              <div className="bg-white p-6 rounded-lg border-2 border-gray-200 hover:border-blue-300 transition-all duration-200">
                <label className="block text-sm font-semibold text-gray-700 mb-2">
                  Original Price ($) <span className="text-gray-500 font-normal text-xs">(optional)</span>
                </label>
                <div className="relative">
                  <span className="absolute left-4 top-1/2 transform -translate-y-1/2 text-gray-400">$</span>
                  <input
                    type="number"
                    name="originalPrice"
                    value={formData.originalPrice}
                    onChange={handleInputChange}
                    min="0"
                    step="0.01"
                    className="w-full pl-8 pr-4 py-3 border-2 border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition-all duration-200"
                  />
                </div>
              </div>
            </div>
          </div>

          {/* Action Buttons */}
          <div className="p-8 bg-gray-50 flex justify-end space-x-4">
            <button
              type="button"
              onClick={() => router.push('/instructor/courses')}
              className="px-8 py-3 border-2 border-gray-300 rounded-lg font-semibold text-gray-700 hover:bg-white hover:border-gray-400 transition-all duration-200 shadow-sm hover:shadow-md"
            >
              Cancel
            </button>
            <button
              type="submit"
              className="px-8 py-3 bg-gradient-to-r from-blue-600 to-indigo-600 text-white rounded-lg font-semibold hover:from-blue-700 hover:to-indigo-700 transition-all duration-200 shadow-lg hover:shadow-xl transform hover:-translate-y-0.5"
            >
              Save Changes
            </button>
          </div>
        </form>
        </div>
      </div>
    </div>
  );
}
