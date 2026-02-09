"use client";

import { useState } from "react";
import Link from "next/link";
import {
  GraduationCap,
  Users,
  Award,
  TrendingUp,
  CheckCircle2,
  Briefcase,
  BookOpen,
  FileText,
  Linkedin,
  Upload,
} from "lucide-react";
import { ROUTES } from "@/constants";

const EXPERTISE_OPTIONS = [
  "Healthcare Quality Management",
  "Healthcare HR Management",
  "Hospital Management",
  "Infection Prevention & Control",
  "Healthcare Marketing",
  "Healthcare Finance",
  "Strategic Planning",
  "Supply Chain Management",
  "Clinical Education",
  "Other",
];

const HEAR_ABOUT_OPTIONS = [
  "Search engine",
  "Social media",
  "Referral",
  "Website / Blog",
  "Conference or event",
  "Other",
];

export default function BecomeInstructorPage() {
  const [submitted, setSubmitted] = useState(false);
  const [formData, setFormData] = useState({
    firstName: "",
    lastName: "",
    email: "",
    phone: "",
    countryCode: "+20",
    professionalTitle: "",
    credentials: "",
    linkedIn: "",
    expertise: [] as string[],
    otherExpertise: "",
    yearsTeaching: "",
    yearsIndustry: "",
    bio: "",
    whyTeach: "",
    cvFile: null as File | null,
    hearAbout: "",
    agreeTerms: false,
  });

  const handleChange = (
    e: React.ChangeEvent<
      HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement
    >
  ) => {
    const { name, value, type } = e.target;
    const checked = (e.target as HTMLInputElement).checked;
    setFormData((prev) => ({
      ...prev,
      [name]: type === "checkbox" ? checked : value,
    }));
  };

  const handleCvUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) setFormData((prev) => ({ ...prev, cvFile: file }));
  };

  const handleExpertiseToggle = (item: string) => {
    setFormData((prev) => ({
      ...prev,
      expertise: prev.expertise.includes(item)
        ? prev.expertise.filter((x) => x !== item)
        : [...prev.expertise, item],
    }));
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setSubmitted(true);
  };

  const inputClass =
    "w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-[#0a47c2] focus:border-[#0a47c2] bg-white";
  const labelClass = "block text-sm font-semibold text-gray-700 mb-1.5";

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Hero */}
      <section className="bg-[#0a47c2] text-white py-12 sm:py-16">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center gap-3 mb-2">
            <GraduationCap className="w-10 h-10 text-[#c9a227]" strokeWidth={2} />
            <span className="text-[#c9a227] font-semibold">Join our team</span>
          </div>
          <h1 className="text-3xl sm:text-4xl lg:text-5xl font-bold mb-3">
            Become an Instructor
          </h1>
          <p className="text-white/90 text-lg max-w-2xl">
            Share your expertise with 22,000+ students. Create courses, set your
            schedule, and grow your impact in business and professional education.
          </p>
        </div>
      </section>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-10 sm:py-14">
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8 lg:gap-12">
          {/* Sidebar - Why join */}
          <aside className="lg:col-span-1 order-2 lg:order-1">
            <div className="bg-white rounded-2xl shadow-md border border-gray-100 p-6 sticky top-24">
              <h2 className="text-lg font-bold text-black mb-4">
                Why teach with IMETS?
              </h2>
              <ul className="space-y-4">
                <li className="flex gap-3">
                  <div className="flex-shrink-0 w-10 h-10 rounded-lg bg-[#0a47c2]/10 flex items-center justify-center">
                    <Users className="w-5 h-5 text-[#0a47c2]" strokeWidth={2} />
                  </div>
                  <div>
                    <span className="font-semibold text-gray-900">22k+ students</span>
                    <p className="text-sm text-gray-600">
                      Reach a large audience of professionals and students
                    </p>
                  </div>
                </li>
                <li className="flex gap-3">
                  <div className="flex-shrink-0 w-10 h-10 rounded-lg bg-[#c9a227]/20 flex items-center justify-center">
                    <TrendingUp className="w-5 h-5 text-[#b8921f]" strokeWidth={2} />
                  </div>
                  <div>
                    <span className="font-semibold text-gray-900">Earn & grow</span>
                    <p className="text-sm text-gray-600">
                      Set your own pace and scale your income
                    </p>
                  </div>
                </li>
                <li className="flex gap-3">
                  <div className="flex-shrink-0 w-10 h-10 rounded-lg bg-[#0a47c2]/10 flex items-center justify-center">
                    <Award className="w-5 h-5 text-[#0a47c2]" strokeWidth={2} />
                  </div>
                  <div>
                    <span className="font-semibold text-gray-900">Support & tools</span>
                    <p className="text-sm text-gray-600">
                      Resources and support to create great courses
                    </p>
                  </div>
                </li>
              </ul>
              <div className="mt-6 pt-6 border-t border-gray-200">
                <p className="text-sm text-gray-600">
                  Questions?{" "}
                  <a
                    href={ROUTES.CONTACT}
                    className="text-[#0a47c2] font-medium hover:underline"
                  >
                    Contact us
                  </a>
                </p>
              </div>
            </div>
          </aside>

          {/* Form */}
          <div className="lg:col-span-2 order-1 lg:order-2">
            <form
              onSubmit={handleSubmit}
              className="bg-white rounded-2xl shadow-md border border-gray-100 overflow-hidden"
            >
              {/* Personal info */}
              <div className="p-6 sm:p-8 border-b border-gray-100">
                <h2 className="text-xl font-bold text-black mb-1 flex items-center gap-2">
                  <Briefcase className="w-5 h-5 text-[#0a47c2]" strokeWidth={2} />
                  Personal information
                </h2>
                <p className="text-sm text-gray-600 mb-6">
                  We’ll use this to get in touch about your application.
                </p>
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
                  <div>
                    <label htmlFor="firstName" className={labelClass}>
                      First name <span className="text-red-500">*</span>
                    </label>
                    <input
                      id="firstName"
                      type="text"
                      name="firstName"
                      value={formData.firstName}
                      onChange={handleChange}
                      className={inputClass}
                      required
                    />
                  </div>
                  <div>
                    <label htmlFor="lastName" className={labelClass}>
                      Last name <span className="text-red-500">*</span>
                    </label>
                    <input
                      id="lastName"
                      type="text"
                      name="lastName"
                      value={formData.lastName}
                      onChange={handleChange}
                      className={inputClass}
                      required
                    />
                  </div>
                </div>
                <div className="mt-5">
                  <label htmlFor="email" className={labelClass}>
                    Email <span className="text-red-500">*</span>
                  </label>
                  <input
                    id="email"
                    type="email"
                    name="email"
                    value={formData.email}
                    onChange={handleChange}
                    className={inputClass}
                    required
                  />
                </div>
                <div className="mt-5">
                  <label className={labelClass}>Phone</label>
                  <div className="flex">
                    <select
                      name="countryCode"
                      value={formData.countryCode}
                      onChange={handleChange}
                      className="w-24 px-3 py-3 border border-gray-300 rounded-l-lg border-r-0 focus:outline-none focus:ring-2 focus:ring-[#0a47c2] bg-white"
                    >
                      <option value="+20">+20</option>
                      <option value="+1">+1</option>
                      <option value="+44">+44</option>
                      <option value="+971">+971</option>
                    </select>
                    <input
                      type="tel"
                      name="phone"
                      value={formData.phone}
                      onChange={handleChange}
                      className={`flex-1 ${inputClass} rounded-l-none`}
                      placeholder="1008815007"
                    />
                  </div>
                </div>
              </div>

              {/* Professional details */}
              <div className="p-6 sm:p-8 border-b border-gray-100">
                <h2 className="text-xl font-bold text-black mb-1 flex items-center gap-2">
                  <BookOpen className="w-5 h-5 text-[#0a47c2]" strokeWidth={2} />
                  Professional details
                </h2>
                <p className="text-sm text-gray-600 mb-6">
                  Your credentials and areas of expertise.
                </p>
                <div className="space-y-5">
                  <div>
                    <label htmlFor="professionalTitle" className={labelClass}>
                      Professional title <span className="text-red-500">*</span>
                    </label>
                    <input
                      id="professionalTitle"
                      type="text"
                      name="professionalTitle"
                      value={formData.professionalTitle}
                      onChange={handleChange}
                      className={inputClass}
                      placeholder="e.g. Healthcare Quality Director, CPHQ"
                      required
                    />
                  </div>
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
                    <div>
                      <label htmlFor="yearsTeaching" className={labelClass}>
                        Years of teaching / training experience
                      </label>
                      <select
                        id="yearsTeaching"
                        name="yearsTeaching"
                        value={formData.yearsTeaching}
                        onChange={handleChange}
                        className={inputClass}
                      >
                        <option value="">Select</option>
                        <option value="0-2">0–2 years</option>
                        <option value="3-5">3–5 years</option>
                        <option value="6-10">6–10 years</option>
                        <option value="10+">10+ years</option>
                      </select>
                    </div>
                    <div>
                      <label htmlFor="yearsIndustry" className={labelClass}>
                        Years of industry experience
                      </label>
                      <select
                        id="yearsIndustry"
                        name="yearsIndustry"
                        value={formData.yearsIndustry}
                        onChange={handleChange}
                        className={inputClass}
                      >
                        <option value="">Select</option>
                        <option value="0-2">0–2 years</option>
                        <option value="3-5">3–5 years</option>
                        <option value="6-10">6–10 years</option>
                        <option value="10+">10+ years</option>
                      </select>
                    </div>
                  </div>
                  <div>
                    <label htmlFor="credentials" className={labelClass}>
                      Certifications / credentials
                    </label>
                    <input
                      id="credentials"
                      type="text"
                      name="credentials"
                      value={formData.credentials}
                      onChange={handleChange}
                      className={inputClass}
                      placeholder="e.g. CPHQ, CIC, Six Sigma"
                    />
                  </div>
                  <div>
                    <label htmlFor="linkedIn" className={labelClass}>
                      LinkedIn profile
                    </label>
                    <div className="relative">
                      <Linkedin className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-gray-400" strokeWidth={2} />
                      <input
                        id="linkedIn"
                        type="url"
                        name="linkedIn"
                        value={formData.linkedIn}
                        onChange={handleChange}
                        className={`${inputClass} pl-11`}
                        placeholder="https://linkedin.com/in/yourprofile"
                      />
                    </div>
                  </div>
                </div>
              </div>

              {/* Teaching interests */}
              <div className="p-6 sm:p-8 border-b border-gray-100">
                <h2 className="text-xl font-bold text-black mb-1 flex items-center gap-2">
                  <GraduationCap className="w-5 h-5 text-[#0a47c2]" strokeWidth={2} />
                  Teaching interests
                </h2>
                <p className="text-sm text-gray-600 mb-4">
                  Select all areas you can teach (at least one).
                </p>
                <div className="flex flex-wrap gap-2">
                  {EXPERTISE_OPTIONS.map((item) => (
                    <button
                      key={item}
                      type="button"
                      onClick={() => handleExpertiseToggle(item)}
                      className={`px-4 py-2 rounded-lg text-sm font-medium transition-colors ${
                        formData.expertise.includes(item)
                          ? "bg-[#0a47c2] text-white"
                          : "bg-gray-100 text-gray-700 hover:bg-gray-200"
                      }`}
                    >
                      {item}
                    </button>
                  ))}
                </div>
                {formData.expertise.includes("Other") && (
                  <div className="mt-4">
                    <label htmlFor="otherExpertise" className={labelClass}>
                      Please specify
                    </label>
                    <input
                      id="otherExpertise"
                      type="text"
                      name="otherExpertise"
                      value={formData.otherExpertise}
                      onChange={handleChange}
                      className={inputClass}
                      placeholder="Other expertise areas"
                    />
                  </div>
                )}
              </div>

              {/* About you */}
              <div className="p-6 sm:p-8 border-b border-gray-100">
                <h2 className="text-xl font-bold text-black mb-1 flex items-center gap-2">
                  <FileText className="w-5 h-5 text-[#0a47c2]" strokeWidth={2} />
                  About you
                </h2>
                <p className="text-sm text-gray-600 mb-6">
                  Help us understand your background and motivation.
                </p>
                <div className="space-y-5">
                  <div>
                    <label htmlFor="bio" className={labelClass}>
                      Short professional bio <span className="text-red-500">*</span>
                    </label>
                    <textarea
                      id="bio"
                      name="bio"
                      value={formData.bio}
                      onChange={handleChange}
                      rows={4}
                      className={`${inputClass} resize-none`}
                      placeholder="Brief summary of your background and experience..."
                      required
                    />
                  </div>
                  <div>
                    <label htmlFor="whyTeach" className={labelClass}>
                      Why do you want to teach with IMETS?
                    </label>
                    <textarea
                      id="whyTeach"
                      name="whyTeach"
                      value={formData.whyTeach}
                      onChange={handleChange}
                      rows={3}
                      className={`${inputClass} resize-none`}
                      placeholder="What motivates you to share your expertise?"
                    />
                  </div>
                  <div>
                    <label className={labelClass}>Upload CV</label>
                    <label
                      htmlFor="cvUpload"
                      className="flex items-center justify-center gap-2 w-full px-4 py-4 border-2 border-dashed border-gray-300 rounded-lg cursor-pointer hover:border-[#0a47c2] hover:bg-[#0a47c2]/5 transition-colors"
                    >
                      <Upload className="w-5 h-5 text-[#0a47c2]" strokeWidth={2} />
                      <span className="text-sm font-medium text-gray-600">
                        {formData.cvFile
                          ? formData.cvFile.name
                          : "Click to upload or drag and drop (PDF, DOC)"}
                      </span>
                      <input
                        id="cvUpload"
                        type="file"
                        accept=".pdf,.doc,.docx"
                        onChange={handleCvUpload}
                        className="hidden"
                      />
                    </label>
                  </div>
                </div>
              </div>

              {/* Optional + Submit */}
              <div className="p-6 sm:p-8">
                <div className="mb-6">
                  <label htmlFor="hearAbout" className={labelClass}>
                    How did you hear about us?
                  </label>
                  <select
                    id="hearAbout"
                    name="hearAbout"
                    value={formData.hearAbout}
                    onChange={handleChange}
                    className={inputClass}
                  >
                    <option value="">Select</option>
                    {HEAR_ABOUT_OPTIONS.map((opt) => (
                      <option key={opt} value={opt}>
                        {opt}
                      </option>
                    ))}
                  </select>
                </div>
                <label className="flex items-start gap-3 cursor-pointer">
                  <input
                    type="checkbox"
                    name="agreeTerms"
                    checked={formData.agreeTerms}
                    onChange={handleChange}
                    className="mt-1 w-4 h-4 rounded border-gray-300 text-[#0a47c2] focus:ring-[#0a47c2]"
                  />
                  <span className="text-sm text-gray-600">
                    I agree to the terms of the instructor application and
                    confirm that the information provided is accurate.{" "}
                    <span className="text-red-500">*</span>
                  </span>
                </label>
                <button
                  type="submit"
                  disabled={!formData.agreeTerms}
                  className="mt-6 w-full sm:w-auto min-w-[200px] py-3.5 rounded-lg font-semibold text-white bg-[#c9a227] hover:bg-[#b8921f] disabled:opacity-50 disabled:cursor-not-allowed transition-colors"
                >
                  Submit application
                </button>
              </div>
            </form>
          </div>
        </div>
      </div>

      {/* Form submitted successfully modal */}
      {submitted && (
        <div
          className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/50"
          role="dialog"
          aria-modal="true"
          aria-labelledby="success-modal-title"
        >
          <div className="bg-white rounded-2xl shadow-xl max-w-md w-full p-8 sm:p-10 text-center">
            <div className="w-16 h-16 rounded-full bg-[#0a47c2]/10 flex items-center justify-center mx-auto mb-6">
              <CheckCircle2 className="w-10 h-10 text-[#0a47c2]" strokeWidth={2} />
            </div>
            <h2 id="success-modal-title" className="text-xl sm:text-2xl font-bold text-black mb-2">
              Form submitted successfully
            </h2>
            <p className="text-gray-600 text-sm sm:text-base mb-6">
              Thank you for your interest in teaching with IMETS. Our team will
              review your application and get back to you within 3–5 business
              days.
            </p>
            <Link
              href={ROUTES.HOME}
              className="inline-flex items-center justify-center w-full bg-[#0a47c2] hover:bg-[#083a9e] text-white font-semibold px-6 py-3 rounded-lg transition-colors"
            >
              Back to home
            </Link>
          </div>
        </div>
      )}
    </div>
  );
}
