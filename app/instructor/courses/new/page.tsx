'use client';

import { useState } from 'react';
import { useRouter } from 'next/navigation';
import { categories } from '@/lib/data';
import CourseCompleteness from '@/components/CourseCompleteness';
import { CourseModule, CourseLesson, DiscountCoupon, CourseFormData } from '@/types/courseForm';

export default function CreateCoursePage() {
  const router = useRouter();
  const [currentStep, setCurrentStep] = useState(1);
  const [formData, setFormData] = useState<CourseFormData>({
    title: '',
    category: '',
    difficulty: 'Beginner',
    thumbnail: null,
    thumbnailPreview: '',
    description: '',
    modules: [],
    pricingModel: 'one-time',
    currency: 'USD',
    price: 0,
    coupons: [],
    enrollmentLimit: false,
    enrollmentLimitCount: undefined,
    completionCertificate: true,
  });

  const steps = [
    { number: 1, name: 'Basic Info' },
    { number: 2, name: 'Curriculum' },
    { number: 3, name: 'Pricing & Enrollment' },
    { number: 4, name: 'Publish' },
  ];

  const progressPercentage = Math.round((currentStep / steps.length) * 100);

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
    const { name, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: name === 'price' ? parseFloat(value) || 0 : value,
    }));
  };

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      setFormData((prev) => ({
        ...prev,
        thumbnail: file,
        thumbnailPreview: URL.createObjectURL(file),
      }));
    }
  };

  const handleDragOver = (e: React.DragEvent) => {
    e.preventDefault();
  };

  const handleDrop = (e: React.DragEvent) => {
    e.preventDefault();
    const file = e.dataTransfer.files[0];
    if (file && file.type.startsWith('image/')) {
      setFormData((prev) => ({
        ...prev,
        thumbnail: file,
        thumbnailPreview: URL.createObjectURL(file),
      }));
    }
  };

  // Module and Lesson Management
  const addModule = () => {
    const newModule: CourseModule = {
      id: `module-${Date.now()}`,
      title: `Module ${formData.modules.length + 1}`,
      order: formData.modules.length + 1,
      lessons: [],
    };
    setFormData((prev) => ({
      ...prev,
      modules: [...prev.modules, newModule],
    }));
  };

  const updateModule = (moduleId: string, title: string) => {
    setFormData((prev) => ({
      ...prev,
      modules: prev.modules.map((m) => (m.id === moduleId ? { ...m, title } : m)),
    }));
  };

  const deleteModule = (moduleId: string) => {
    setFormData((prev) => ({
      ...prev,
      modules: prev.modules.filter((m) => m.id !== moduleId),
    }));
  };

  const addLesson = (moduleId: string) => {
    const module = formData.modules.find((m) => m.id === moduleId);
    if (!module) return;

    const newLesson: CourseLesson = {
      id: `lesson-${Date.now()}`,
      title: '',
      order: module.lessons.length + 1,
      contentType: 'video',
      isPreview: false,
    };

    setFormData((prev) => ({
      ...prev,
      modules: prev.modules.map((m) =>
        m.id === moduleId ? { ...m, lessons: [...m.lessons, newLesson] } : m
      ),
    }));
  };

  const updateLesson = (moduleId: string, lessonId: string, updates: Partial<CourseLesson>) => {
    setFormData((prev) => ({
      ...prev,
      modules: prev.modules.map((m) =>
        m.id === moduleId
          ? {
              ...m,
              lessons: m.lessons.map((l) => (l.id === lessonId ? { ...l, ...updates } : l)),
            }
          : m
      ),
    }));
  };

  const deleteLesson = (moduleId: string, lessonId: string) => {
    setFormData((prev) => ({
      ...prev,
      modules: prev.modules.map((m) =>
        m.id === moduleId ? { ...m, lessons: m.lessons.filter((l) => l.id !== lessonId) } : m
      ),
    }));
  };

  const handleLessonFileUpload = (moduleId: string, lessonId: string, file: File, type: 'video' | 'pdf') => {
    updateLesson(moduleId, lessonId, {
      contentType: type,
      fileName: file.name,
      contentUrl: URL.createObjectURL(file),
    });
  };

  // Coupon Management
  const addCoupon = () => {
    const newCoupon: DiscountCoupon = {
      id: `coupon-${Date.now()}`,
      code: '',
      discount: 0,
      expiryDate: '',
    };
    setFormData((prev) => ({
      ...prev,
      coupons: [...prev.coupons, newCoupon],
    }));
  };

  const updateCoupon = (couponId: string, updates: Partial<DiscountCoupon>) => {
    setFormData((prev) => ({
      ...prev,
      coupons: prev.coupons.map((c) => (c.id === couponId ? { ...c, ...updates } : c)),
    }));
  };

  const deleteCoupon = (couponId: string) => {
    setFormData((prev) => ({
      ...prev,
      coupons: prev.coupons.filter((c) => c.id !== couponId),
    }));
  };

  const handleSaveDraft = () => {
    alert('Draft saved successfully!');
  };

  const handleNext = () => {
    if (currentStep < 4) {
      setCurrentStep(currentStep + 1);
    }
  };

  const handlePrevious = () => {
    if (currentStep > 1) {
      setCurrentStep(currentStep - 1);
    }
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    alert('Course created successfully!');
    router.push('/instructor/courses');
  };

  // Calculate completeness metrics
  const videoCount = formData.modules.reduce(
    (acc, module) => acc + module.lessons.filter((l) => l.contentType === 'video' && l.contentUrl).length,
    0
  );
  const hasResources = formData.modules.some((m) =>
    m.lessons.some((l) => l.contentType === 'pdf' && l.contentUrl)
  );
  const hasPreview = formData.modules.some((m) => m.lessons.some((l) => l.isPreview));

  return (
    <div className="p-8 bg-gray-50 min-h-screen">
      {/* Progress Indicator */}
      <div className="mb-6">
        <div className="flex items-center justify-between mb-2">
          <h2 className="text-lg font-semibold text-gray-700">
            Step {currentStep}: {steps[currentStep - 1].name}
          </h2>
          <span className="text-sm text-gray-600">
            Progress: Step {currentStep} of {steps.length}
          </span>
        </div>
        <div className="w-full bg-gray-200 rounded-full h-2.5">
          <div
            className="bg-green-600 h-2.5 rounded-full transition-all duration-300"
            style={{ width: `${progressPercentage}%` }}
          ></div>
        </div>
        <p className="text-sm text-gray-500 mt-2">
          {progressPercentage}% Complete
          {currentStep === 3 && ' - Almost there! Your course is taking shape.'}
        </p>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-4 gap-8">
        {/* Main Content */}
        <div className="lg:col-span-3">
          <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-8">
            <form onSubmit={handleSubmit}>
              {currentStep === 1 && (
                <div className="space-y-8">
                  <div>
                    <h1 className="text-2xl font-bold text-gray-900 mb-2">Basic Information</h1>
                    <p className="text-gray-600">Provide essential details about your course</p>
                  </div>

                  <div>
                    <label className="block text-sm font-semibold text-gray-900 mb-2">
                      COURSE TITLE
                    </label>
                    <input
                      type="text"
                      name="title"
                      value={formData.title}
                      onChange={handleInputChange}
                      placeholder="e.g. Advanced Photography Masterclass"
                      className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-green-500"
                      required
                    />
                    <p className="text-sm text-gray-500 mt-2">A catchy title helps your course stand out.</p>
                  </div>

                  <div>
                    <label className="block text-sm font-semibold text-gray-900 mb-2">
                      CATEGORY
                    </label>
                    <select
                      name="category"
                      value={formData.category}
                      onChange={handleInputChange}
                      className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-green-500"
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
                    <label className="block text-sm font-semibold text-gray-900 mb-2">
                      DIFFICULTY LEVEL
                    </label>
                    <div className="flex space-x-4">
                      {['Beginner', 'Intermediate', 'Advanced'].map((level) => (
                        <button
                          key={level}
                          type="button"
                          onClick={() => setFormData((prev) => ({ ...prev, difficulty: level as any }))}
                          className={`flex-1 px-6 py-3 rounded-lg font-semibold transition-colors ${
                            formData.difficulty === level
                              ? 'bg-green-600 text-white'
                              : 'bg-white border-2 border-gray-300 text-gray-700 hover:border-green-500'
                          }`}
                        >
                          {level}
                        </button>
                      ))}
                    </div>
                  </div>

                  <div>
                    <label className="block text-sm font-semibold text-gray-900 mb-2">
                      COURSE THUMBNAIL
                    </label>
                    <div
                      onDragOver={handleDragOver}
                      onDrop={handleDrop}
                      className="border-2 border-dashed border-gray-300 rounded-lg p-12 text-center hover:border-green-500 transition-colors cursor-pointer"
                    >
                      {formData.thumbnailPreview ? (
                        <div className="space-y-4">
                          <img
                            src={formData.thumbnailPreview}
                            alt="Thumbnail preview"
                            className="max-w-full max-h-64 mx-auto rounded-lg"
                          />
                          <button
                            type="button"
                            onClick={() => {
                              setFormData((prev) => ({
                                ...prev,
                                thumbnail: null,
                                thumbnailPreview: '',
                              }));
                            }}
                            className="text-red-600 hover:text-red-700 font-semibold"
                          >
                            Remove Image
                          </button>
                        </div>
                      ) : (
                        <div>
                          <div className="text-5xl mb-4">🖼️</div>
                          <p className="text-gray-700 mb-2">
                            Drag and drop or{' '}
                            <label className="text-green-600 cursor-pointer hover:underline">
                              browse
                              <input
                                type="file"
                                accept="image/*"
                                onChange={handleFileChange}
                                className="hidden"
                              />
                            </label>
                          </p>
                          <p className="text-sm text-gray-500">1280x720px Recommended (JPG, PNG)</p>
                        </div>
                      )}
                    </div>
                  </div>

                  <div>
                    <label className="block text-sm font-semibold text-gray-900 mb-2">
                      COURSE DESCRIPTION
                    </label>
                    <div className="border border-gray-300 rounded-lg">
                      <div className="border-b border-gray-300 p-2 flex space-x-2">
                        <button type="button" className="px-3 py-1 hover:bg-gray-100 rounded" title="Bold">
                          <strong>B</strong>
                        </button>
                        <button type="button" className="px-3 py-1 hover:bg-gray-100 rounded italic" title="Italic">
                          I
                        </button>
                        <button type="button" className="px-3 py-1 hover:bg-gray-100 rounded" title="List">
                          ☰
                        </button>
                        <button type="button" className="px-3 py-1 hover:bg-gray-100 rounded" title="Link">
                          🔗
                        </button>
                        <button type="button" className="px-3 py-1 hover:bg-gray-100 rounded" title="Quote">
                          "
                        </button>
                      </div>
                      <textarea
                        name="description"
                        value={formData.description}
                        onChange={handleInputChange}
                        placeholder="Describe what students will learn, any prerequisites, and why they should take your course..."
                        rows={10}
                        className="w-full px-4 py-3 focus:outline-none resize-none"
                        required
                      />
                    </div>
                  </div>

                  <div className="bg-green-50 border border-green-200 rounded-lg p-4">
                    <div className="flex items-start space-x-3">
                      <span className="text-green-600 text-xl">💡</span>
                      <div>
                        <p className="font-semibold text-green-900 mb-1">Pro Tip</p>
                        <p className="text-sm text-green-800">
                          Courses with clear, detailed descriptions and professional thumbnails see a 45% higher conversion rate. Take your time to make this section shine!
                        </p>
                      </div>
                    </div>
                  </div>
                </div>
              )}

              {currentStep === 2 && (
                <div className="space-y-6">
                  <div>
                    <h1 className="text-2xl font-bold text-gray-900 mb-2">Course Curriculum</h1>
                    <p className="text-gray-600">Build your course structure by adding modules and lessons.</p>
                  </div>

                  {/* Modules */}
                  <div className="space-y-4">
                    {formData.modules.map((module, moduleIndex) => (
                      <div key={module.id} className="border border-gray-200 rounded-lg">
                        <div className="bg-gray-50 p-4 flex items-center justify-between">
                          <div className="flex items-center space-x-3 flex-1">
                            <span className="text-gray-400 cursor-move">⋮⋮</span>
                            <div className="flex-1">
                              <span className="text-xs font-semibold text-green-600 uppercase mr-2">
                                MODULE {moduleIndex + 1}
                              </span>
                              <input
                                type="text"
                                value={module.title}
                                onChange={(e) => updateModule(module.id, e.target.value)}
                                className="text-lg font-semibold text-gray-900 bg-transparent border-none focus:outline-none focus:ring-2 focus:ring-green-500 rounded px-2"
                                placeholder="Module title"
                              />
                            </div>
                          </div>
                          <div className="flex items-center space-x-2">
                            <button
                              type="button"
                              onClick={() => {
                                const newTitle = prompt('Edit module title:', module.title);
                                if (newTitle) updateModule(module.id, newTitle);
                              }}
                              className="p-2 text-gray-600 hover:text-green-600"
                              title="Edit"
                            >
                              ✏️
                            </button>
                            <button
                              type="button"
                              onClick={() => {
                                if (confirm('Delete this module?')) deleteModule(module.id);
                              }}
                              className="p-2 text-gray-600 hover:text-red-600"
                              title="Delete"
                            >
                              🗑️
                            </button>
                          </div>
                        </div>

                        <div className="p-4 space-y-3">
                          {module.lessons.length === 0 ? (
                            <button
                              type="button"
                              onClick={() => addLesson(module.id)}
                              className="w-full py-3 border-2 border-dashed border-gray-300 rounded-lg text-gray-600 hover:border-green-500 hover:text-green-600 transition-colors"
                            >
                              + Create first lesson
                            </button>
                          ) : (
                            <>
                              {module.lessons.map((lesson, lessonIndex) => (
                                <div key={lesson.id} className="flex items-center space-x-3 p-3 bg-gray-50 rounded-lg">
                                  <span className="text-gray-400 cursor-move">☰</span>
                                  <input
                                    type="text"
                                    value={lesson.title}
                                    onChange={(e) => updateLesson(module.id, lesson.id, { title: e.target.value })}
                                    placeholder="Lesson title"
                                    className="flex-1 px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-green-500"
                                  />
                                  <div className="flex items-center space-x-2">
                                    {lesson.contentType === 'video' ? (
                                      <label className="px-3 py-2 bg-green-100 text-green-700 rounded-lg cursor-pointer hover:bg-green-200">
                                        {lesson.fileName ? (
                                          <span className="flex items-center">
                                            <span className="mr-2">✓</span>
                                            {lesson.fileName}
                                          </span>
                                        ) : (
                                          <span className="flex items-center">
                                            📹 Video
                                            <input
                                              type="file"
                                              accept="video/*"
                                              onChange={(e) => {
                                                const file = e.target.files?.[0];
                                                if (file) handleLessonFileUpload(module.id, lesson.id, file, 'video');
                                              }}
                                              className="hidden"
                                            />
                                          </span>
                                        )}
                                      </label>
                                    ) : (
                                      <button
                                        type="button"
                                        onClick={() => updateLesson(module.id, lesson.id, { contentType: 'video' })}
                                        className="px-3 py-2 border border-gray-300 rounded-lg hover:bg-gray-100"
                                      >
                                        📹 Video
                                      </button>
                                    )}
                                    {lesson.contentType === 'pdf' ? (
                                      <label className="px-3 py-2 bg-green-100 text-green-700 rounded-lg cursor-pointer hover:bg-green-200">
                                        {lesson.fileName ? (
                                          <span className="flex items-center">
                                            <span className="mr-2">✓</span>
                                            {lesson.fileName}
                                          </span>
                                        ) : (
                                          <span className="flex items-center">
                                            📄 PDF
                                            <input
                                              type="file"
                                              accept=".pdf"
                                              onChange={(e) => {
                                                const file = e.target.files?.[0];
                                                if (file) handleLessonFileUpload(module.id, lesson.id, file, 'pdf');
                                              }}
                                              className="hidden"
                                            />
                                          </span>
                                        )}
                                      </label>
                                    ) : (
                                      <button
                                        type="button"
                                        onClick={() => updateLesson(module.id, lesson.id, { contentType: 'pdf' })}
                                        className="px-3 py-2 border border-gray-300 rounded-lg hover:bg-gray-100"
                                      >
                                        📄 PDF
                                      </button>
                                    )}
                                  </div>
                                  <label className="flex items-center space-x-2">
                                    <input
                                      type="checkbox"
                                      checked={lesson.isPreview}
                                      onChange={(e) => updateLesson(module.id, lesson.id, { isPreview: e.target.checked })}
                                      className="w-5 h-5 text-green-600 rounded focus:ring-green-500"
                                    />
                                    <span className="text-sm text-gray-700">Free Preview</span>
                                  </label>
                                  <button
                                    type="button"
                                    onClick={() => {
                                      if (confirm('Delete this lesson?')) deleteLesson(module.id, lesson.id);
                                    }}
                                    className="p-2 text-gray-400 hover:text-red-600"
                                  >
                                    ✕
                                  </button>
                                </div>
                              ))}
                              <button
                                type="button"
                                onClick={() => addLesson(module.id)}
                                className="w-full py-2 border border-gray-300 rounded-lg text-gray-600 hover:border-green-500 hover:text-green-600 transition-colors"
                              >
                                + Add Lesson
                              </button>
                            </>
                          )}
                        </div>
                      </div>
                    ))}

                    <button
                      type="button"
                      onClick={addModule}
                      className="w-full py-4 border-2 border-dashed border-gray-300 rounded-lg text-gray-600 hover:border-green-500 hover:text-green-600 transition-colors font-semibold flex items-center justify-center"
                    >
                      <span className="text-2xl mr-2">+</span>
                      Add New Module
                    </button>
                  </div>
                </div>
              )}

              {currentStep === 3 && (
                <div className="space-y-8">
                  <div>
                    <h1 className="text-2xl font-bold text-gray-900 mb-2">Pricing & Enrollment</h1>
                    <p className="text-gray-600">Set your course price and student enrollment options. These can be edited later.</p>
                  </div>

                  {/* Pricing Model */}
                  <div>
                    <label className="block text-sm font-semibold text-gray-900 mb-4">
                      Select Pricing Model
                    </label>
                    <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                      {[
                        { id: 'free', label: 'Free', icon: '🌿', description: 'Great for lead generation or introductory content.' },
                        { id: 'one-time', label: 'One-time Payment', icon: '💰', description: 'Students pay once for lifetime or limited access.' },
                        { id: 'subscription', label: 'Subscription', icon: '🔄', description: 'Recurring monthly or annual payments.' },
                      ].map((model) => (
                        <button
                          key={model.id}
                          type="button"
                          onClick={() => setFormData((prev) => ({ ...prev, pricingModel: model.id as any }))}
                          className={`p-6 border-2 rounded-lg text-left transition-all ${
                            formData.pricingModel === model.id
                              ? 'border-green-600 bg-green-50'
                              : 'border-gray-200 hover:border-gray-300'
                          }`}
                        >
                          <div className="text-3xl mb-3">{model.icon}</div>
                          <h3 className="font-bold text-gray-900 mb-2">{model.label}</h3>
                          <p className="text-sm text-gray-600">{model.description}</p>
                        </button>
                      ))}
                    </div>
                  </div>

                  {/* Currency and Price */}
                  {formData.pricingModel !== 'free' && (
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                      <div>
                        <label className="block text-sm font-semibold text-gray-900 mb-2">
                          Currency
                        </label>
                        <select
                          name="currency"
                          value={formData.currency}
                          onChange={handleInputChange}
                          className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-green-500"
                        >
                          <option value="USD">USD - US Dollar</option>
                          <option value="EUR">EUR - Euro</option>
                          <option value="GBP">GBP - British Pound</option>
                          <option value="EGP">EGP - Egyptian Pound</option>
                        </select>
                      </div>
                      <div>
                        <label className="block text-sm font-semibold text-gray-900 mb-2">
                          Course Price
                        </label>
                        <div className="relative">
                          <span className="absolute left-4 top-1/2 transform -translate-y-1/2 text-gray-600">$</span>
                          <input
                            type="number"
                            name="price"
                            value={formData.price}
                            onChange={handleInputChange}
                            min="0"
                            step="0.01"
                            className="w-full pl-8 pr-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-green-500"
                            placeholder="49.99"
                          />
                        </div>
                      </div>
                    </div>
                  )}

                  {/* Discount Coupons */}
                  <div>
                    <div className="flex justify-between items-center mb-4">
                      <div>
                        <h3 className="text-lg font-semibold text-gray-900">Discount Coupons</h3>
                        <p className="text-sm text-gray-600">Create special offers for your students.</p>
                      </div>
                      <button
                        type="button"
                        onClick={addCoupon}
                        className="px-4 py-2 bg-green-600 text-white rounded-lg font-semibold hover:bg-green-700 flex items-center"
                      >
                        <span className="mr-2">+</span>
                        New Coupon
                      </button>
                    </div>

                    {formData.coupons.length > 0 && (
                      <div className="border border-gray-200 rounded-lg overflow-hidden">
                        <div className="bg-gray-50 grid grid-cols-12 gap-4 p-3 text-xs font-semibold text-gray-700 uppercase">
                          <div className="col-span-4">COUPON CODE</div>
                          <div className="col-span-3">DISCOUNT (%)</div>
                          <div className="col-span-3">EXPIRY DATE</div>
                          <div className="col-span-2">ACTIONS</div>
                        </div>
                        {formData.coupons.map((coupon) => (
                          <div key={coupon.id} className="grid grid-cols-12 gap-4 p-3 border-t border-gray-200 items-center">
                            <div className="col-span-4">
                              <input
                                type="text"
                                value={coupon.code}
                                onChange={(e) => updateCoupon(coupon.id, { code: e.target.value })}
                                placeholder="EARLYBIRD20"
                                className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-green-500"
                              />
                            </div>
                            <div className="col-span-3">
                              <input
                                type="number"
                                value={coupon.discount}
                                onChange={(e) => updateCoupon(coupon.id, { discount: parseInt(e.target.value) || 0 })}
                                min="0"
                                max="100"
                                placeholder="20"
                                className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-green-500"
                              />
                            </div>
                            <div className="col-span-3">
                              <input
                                type="date"
                                value={coupon.expiryDate}
                                onChange={(e) => updateCoupon(coupon.id, { expiryDate: e.target.value })}
                                className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-green-500"
                              />
                            </div>
                            <div className="col-span-2 flex items-center space-x-2">
                              <button
                                type="button"
                                className="px-4 py-2 bg-green-600 text-white rounded-lg text-sm font-semibold hover:bg-green-700"
                              >
                                Apply
                              </button>
                              <button
                                type="button"
                                onClick={() => deleteCoupon(coupon.id)}
                                className="p-2 text-red-600 hover:bg-red-50 rounded-lg"
                              >
                                🗑️
                              </button>
                            </div>
                          </div>
                        ))}
                      </div>
                    )}
                  </div>

                  {/* Enrollment Limit & Certificate */}
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    <div className="border border-gray-200 rounded-lg p-6">
                      <div className="flex items-center justify-between mb-4">
                        <div className="flex items-center">
                          <span className="text-2xl mr-3">👥</span>
                          <h3 className="font-bold text-gray-900">Enrollment Limit</h3>
                        </div>
                        <label className="relative inline-flex items-center cursor-pointer">
                          <input
                            type="checkbox"
                            checked={formData.enrollmentLimit}
                            onChange={(e) => setFormData((prev) => ({ ...prev, enrollmentLimit: e.target.checked }))}
                            className="sr-only peer"
                          />
                          <div className="w-11 h-6 bg-gray-200 peer-focus:outline-none peer-focus:ring-4 peer-focus:ring-green-300 rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-green-600"></div>
                        </label>
                      </div>
                      <p className="text-sm text-gray-600 mb-4">
                        Restrict the total number of students who can join the course at any given time.
                      </p>
                      {formData.enrollmentLimit && (
                        <input
                          type="number"
                          value={formData.enrollmentLimitCount || ''}
                          onChange={(e) => setFormData((prev) => ({ ...prev, enrollmentLimitCount: parseInt(e.target.value) || undefined }))}
                          placeholder="No limit set"
                          className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-green-500"
                        />
                      )}
                    </div>

                    <div className="border border-gray-200 rounded-lg p-6">
                      <div className="flex items-center justify-between mb-4">
                        <div className="flex items-center">
                          <span className="text-2xl mr-3">🏆</span>
                          <h3 className="font-bold text-gray-900">Completion Certificate</h3>
                        </div>
                        <label className="relative inline-flex items-center cursor-pointer">
                          <input
                            type="checkbox"
                            checked={formData.completionCertificate}
                            onChange={(e) => setFormData((prev) => ({ ...prev, completionCertificate: e.target.checked }))}
                            className="sr-only peer"
                          />
                          <div className="w-11 h-6 bg-gray-200 peer-focus:outline-none peer-focus:ring-4 peer-focus:ring-green-300 rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-green-600"></div>
                        </label>
                      </div>
                      <p className="text-sm text-gray-600 mb-4">
                        Automatically issue a verified certificate to students who finish all course modules.
                      </p>
                      {formData.completionCertificate && (
                        <a href="#" className="text-green-600 hover:text-green-700 font-semibold text-sm flex items-center">
                          Preview Certificate
                          <span className="ml-1">↗</span>
                        </a>
                      )}
                    </div>
                  </div>
                </div>
              )}

              {currentStep === 4 && (
                <div className="space-y-8">
                  <div>
                    <h1 className="text-2xl font-bold text-gray-900 mb-2">Publish Course</h1>
                    <p className="text-gray-600">Review your course and publish it to make it available to students.</p>
                  </div>
                  {/* Publish step content */}
                </div>
              )}

              {/* Action Buttons */}
              <div className="flex justify-between items-center mt-8 pt-6 border-t border-gray-200">
                <div>
                  {currentStep > 1 && (
                    <button
                      type="button"
                      onClick={handlePrevious}
                      className="px-6 py-3 text-gray-700 hover:text-gray-900 font-semibold flex items-center"
                    >
                      <span className="mr-2">←</span>
                      Previous Step
                    </button>
                  )}
                </div>
                <div className="flex items-center space-x-4">
                  <span className="text-sm text-gray-500">Autosaved just now</span>
                  <button
                    type="button"
                    onClick={handleSaveDraft}
                    className="px-6 py-3 border border-gray-300 rounded-lg font-semibold text-gray-700 hover:bg-gray-50 transition-colors"
                  >
                    Save Draft
                  </button>
                  {currentStep < 4 ? (
                    <button
                      type="button"
                      onClick={handleNext}
                      className="px-6 py-3 bg-green-600 text-white rounded-lg font-semibold hover:bg-green-700 transition-colors"
                    >
                      Save & Continue
                    </button>
                  ) : (
                    <button
                      type="submit"
                      className="px-6 py-3 bg-green-600 text-white rounded-lg font-semibold hover:bg-green-700 transition-colors"
                    >
                      Publish Course
                    </button>
                  )}
                </div>
              </div>
            </form>
          </div>
        </div>

        {/* Sidebar - Course Completeness */}
        {currentStep === 2 && (
          <div className="lg:col-span-1">
            <CourseCompleteness
              courseTitle={formData.title}
              moduleCount={formData.modules.length}
              videoCount={videoCount}
              hasResources={hasResources}
              hasPreview={hasPreview}
            />
          </div>
        )}
      </div>
    </div>
  );
}
