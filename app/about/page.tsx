import Link from 'next/link';

export default function AboutPage() {
  return (
    <div className="min-h-screen bg-gray-50">
      {/* Hero Section */}
      <div className="bg-gradient-to-r from-green-600 to-emerald-600 text-white py-20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center">
            <h1 className="text-5xl font-bold mb-6">About Medicova</h1>
            <p className="text-xl text-green-100 max-w-3xl mx-auto">
              Empowering learners worldwide with high-quality online education
            </p>
          </div>
        </div>
      </div>

      {/* Mission Section */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-12 items-center">
          <div>
            <h2 className="text-4xl font-bold text-gray-900 mb-6">Our Mission</h2>
            <p className="text-lg text-gray-600 mb-4">
              At Medicova, we believe that education should be accessible, engaging, and transformative. 
              Our mission is to provide high-quality online courses that empower individuals to achieve 
              their personal and professional goals.
            </p>
            <p className="text-lg text-gray-600">
              We connect passionate instructors with eager learners, creating a vibrant community 
              where knowledge is shared and skills are developed.
            </p>
          </div>
          <div className="bg-white rounded-xl shadow-lg p-8">
            <div className="text-6xl mb-4">🎓</div>
            <h3 className="text-2xl font-bold text-gray-900 mb-4">Why Choose Medicova?</h3>
            <ul className="space-y-3">
              <li className="flex items-start space-x-3">
                <span className="text-green-600 text-xl">✓</span>
                <span className="text-gray-700">Expert instructors with real-world experience</span>
              </li>
              <li className="flex items-start space-x-3">
                <span className="text-green-600 text-xl">✓</span>
                <span className="text-gray-700">Comprehensive course materials and resources</span>
              </li>
              <li className="flex items-start space-x-3">
                <span className="text-green-600 text-xl">✓</span>
                <span className="text-gray-700">Flexible learning at your own pace</span>
              </li>
              <li className="flex items-start space-x-3">
                <span className="text-green-600 text-xl">✓</span>
                <span className="text-gray-700">Lifetime access to course content</span>
              </li>
            </ul>
          </div>
        </div>
      </div>

      {/* Stats Section */}
      <div className="bg-white py-16">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
            <div className="text-center">
              <div className="text-5xl font-bold text-green-600 mb-2">500K+</div>
              <div className="text-gray-600">Active Students</div>
            </div>
            <div className="text-center">
              <div className="text-5xl font-bold text-green-600 mb-2">10K+</div>
              <div className="text-gray-600">Online Courses</div>
            </div>
            <div className="text-center">
              <div className="text-5xl font-bold text-green-600 mb-2">2K+</div>
              <div className="text-gray-600">Expert Instructors</div>
            </div>
            <div className="text-center">
              <div className="text-5xl font-bold text-green-600 mb-2">150+</div>
              <div className="text-gray-600">Countries</div>
            </div>
          </div>
        </div>
      </div>

      {/* Values Section */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
        <h2 className="text-4xl font-bold text-gray-900 text-center mb-12">Our Values</h2>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          <div className="bg-white rounded-xl shadow-lg p-8 text-center">
            <div className="text-5xl mb-4">🌟</div>
            <h3 className="text-xl font-bold text-gray-900 mb-3">Excellence</h3>
            <p className="text-gray-600">
              We strive for excellence in every course, ensuring the highest quality content and instruction.
            </p>
          </div>
          <div className="bg-white rounded-xl shadow-lg p-8 text-center">
            <div className="text-5xl mb-4">🤝</div>
            <h3 className="text-xl font-bold text-gray-900 mb-3">Community</h3>
            <p className="text-gray-600">
              Building a supportive learning community where students and instructors thrive together.
            </p>
          </div>
          <div className="bg-white rounded-xl shadow-lg p-8 text-center">
            <div className="text-5xl mb-4">🚀</div>
            <h3 className="text-xl font-bold text-gray-900 mb-3">Innovation</h3>
            <p className="text-gray-600">
              Continuously innovating to provide the best learning experience and cutting-edge content.
            </p>
          </div>
        </div>
      </div>

      {/* CTA Section */}
      <div className="bg-gradient-to-r from-green-600 to-emerald-600 text-white py-16">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h2 className="text-4xl font-bold mb-4">Ready to Start Learning?</h2>
          <p className="text-xl text-green-100 mb-8">
            Join thousands of students already learning on Medicova
          </p>
          <Link
            href="/courses"
            className="inline-block bg-white text-green-600 px-8 py-4 rounded-lg font-semibold hover:bg-gray-100 transition-colors"
          >
            Explore Courses
          </Link>
        </div>
      </div>
    </div>
  );
}
