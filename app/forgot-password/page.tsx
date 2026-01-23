'use client';

import { useState } from 'react';
import Link from 'next/link';

export default function ForgotPasswordPage() {
  const [email, setEmail] = useState('');
  const [isSubmitted, setIsSubmitted] = useState(false);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitted(true);
    // Handle password reset logic here
  };

  return (
    <div className="min-h-screen bg-gray-50 flex items-center justify-center py-12 px-4 sm:px-6 lg:px-8">
      <div className="max-w-md w-full">
        {/* Logo and Header */}
        <div className="text-center mb-8">
          <Link href="/" className="inline-flex items-center space-x-2 mb-4">
            <span className="text-3xl font-bold text-green-600">m</span>
            <span className="text-2xl font-bold text-gray-900">medicova</span>
          </Link>
          <h2 className="text-3xl font-bold text-gray-900">Forgot your password?</h2>
          <p className="mt-2 text-gray-600">
            {isSubmitted
              ? "We've sent you a password reset link"
              : "Don't worry, we'll help you reset it"}
          </p>
        </div>

        {/* Reset Form Card */}
        <div className="bg-white rounded-xl shadow-lg border border-gray-200 overflow-hidden">
          <div className="p-8">
            {!isSubmitted ? (
              <>
                <div className="mb-6 p-4 bg-blue-50 border border-blue-200 rounded-lg">
                  <div className="flex items-start space-x-3">
                    <span className="text-2xl">💡</span>
                    <div>
                      <p className="text-sm text-blue-900 font-semibold mb-1">How it works</p>
                      <p className="text-xs text-blue-800">
                        Enter your email address and we'll send you a link to reset your password.
                      </p>
                    </div>
                  </div>
                </div>

                <form onSubmit={handleSubmit} className="space-y-6">
                  <div>
                    <label className="block text-sm font-semibold text-gray-700 mb-2">
                      Email address <span className="text-red-500">*</span>
                    </label>
                    <input
                      type="email"
                      value={email}
                      onChange={(e) => setEmail(e.target.value)}
                      required
                      placeholder="you@example.com"
                      className="w-full px-4 py-3 border-2 border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-green-500 focus:border-green-500 transition-all duration-200 bg-gray-50 hover:bg-white placeholder-gray-400"
                    />
                  </div>

                  <button
                    type="submit"
                    className="w-full bg-gradient-to-r from-green-600 to-emerald-600 text-white px-8 py-3 rounded-lg font-semibold hover:from-green-700 hover:to-emerald-700 transition-all duration-200 shadow-lg hover:shadow-xl transform hover:-translate-y-0.5"
                  >
                    Send Reset Link
                  </button>
                </form>
              </>
            ) : (
              <div className="text-center py-8">
                <div className="w-16 h-16 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-4">
                  <span className="text-3xl">✓</span>
                </div>
                <h3 className="text-xl font-bold text-gray-900 mb-2">Check your email</h3>
                <p className="text-gray-600 mb-6">
                  We've sent a password reset link to <strong>{email}</strong>
                </p>
                <div className="space-y-3">
                  <p className="text-sm text-gray-500">
                    Didn't receive the email? Check your spam folder or
                  </p>
                  <button
                    onClick={() => setIsSubmitted(false)}
                    className="text-green-600 hover:text-green-700 font-semibold text-sm"
                  >
                    Try again
                  </button>
                </div>
              </div>
            )}
          </div>

          {/* Back to Login Link */}
          <div className="bg-gray-50 px-8 py-6 border-t border-gray-200 text-center">
            <Link
              href="/login"
              className="text-sm text-green-600 hover:text-green-700 font-semibold inline-flex items-center space-x-1"
            >
              <span>←</span>
              <span>Back to Sign in</span>
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
}
