"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import Link from "next/link";
import {
  User,
  Link2,
  MapPin,
  GraduationCap,
  Megaphone,
  Snowflake,
  Thermometer,
  Flame,
  Check,
  Circle,
  Plus,
} from "lucide-react";
import { coursesOfInterest, leadSpecialtyOptions, type LeadSpecialty } from "@/lib/crmData";

const LEAD_SOURCES = [
  "Website",
  "FB Campaign",
  "Direct Message",
  "FB Feed",
  "Search Ads",
  "Webinar",
];

const COUNSELORS = [
  { name: "Sarah Jenkins", role: "Admissions" },
  { name: "Marina Magdy", role: "Admissions" },
  { name: "Rania Samy", role: "Admissions" },
  { name: "Kariman Tarek", role: "Admissions" },
];

const inputClass =
  "w-full px-3 py-2 text-sm border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-primary focus:border-primary bg-white text-black";
const labelClass = "block text-sm font-medium text-gray-700 mb-1.5";
const sectionHeadingClass =
  "text-sm font-semibold text-gray-900 flex items-center gap-2 mb-3";

export default function NewLeadPage() {
  const router = useRouter();
  const [fullName, setFullName] = useState("");
  const [email, setEmail] = useState("");
  const [emailTouched, setEmailTouched] = useState(false);
  const [countryCode, setCountryCode] = useState("+1");
  const [phone, setPhone] = useState("");
  const [location, setLocation] = useState("");
  const [specialty, setSpecialty] = useState<LeadSpecialty | "">("");
  const [courseInterests, setCourseInterests] = useState<string[]>([]);
  const group = ""; // reserved (Group input removed from form)
  const [leadSource, setLeadSource] = useState("Website");
  const [assignedTo, setAssignedTo] = useState("Sarah Jenkins (Admissions)");
  const [priority, setPriority] = useState<"cold" | "warm" | "hot">("warm");
  const [quickNote, setQuickNote] = useState("");

  const emailValid = email.length > 0 && /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    router.push("/admin/crm/leads");
  };

  const leadScore = 75;
  const scorePercent = leadScore;

  return (
    <div className="min-h-screen bg-gray-100">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6 sm:py-8">
        <div className="flex flex-col lg:flex-row gap-6 lg:gap-8">
          {/* Main form card */}
          <div className="flex-1 min-w-0">
            <div className="bg-white rounded-xl shadow-sm border border-gray-200 overflow-hidden">
              <div className="p-6 sm:p-8">
                <div className="flex items-center gap-4 mb-6">
                  <Link
                    href="/admin/crm/leads"
                    className="text-gray-500 hover:text-primary"
                  >
                    ← Back
                  </Link>
                </div>
                <h1 className="text-2xl sm:text-3xl font-bold text-gray-900">
                  Create New Lead
                </h1>
                <p className="text-gray-600 text-sm mt-1 mb-6">
                  Capture potential student interest and initiate the enrollment
                  journey.
                </p>

                {/* Smart Lead Import */}
                <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-3 p-4 bg-gray-50 rounded-lg border border-gray-200 mb-6">
                  <div className="flex items-start gap-3">
                    <Link2 className="w-5 h-5 text-primary shrink-0 mt-0.5" strokeWidth={2} />
                    <div>
                      <span className="font-medium text-primary">
                        Smart Lead Import
                      </span>
                      <p className="text-sm text-gray-600 mt-0.5">
                        Save time by importing profile data directly.
                      </p>
                    </div>
                  </div>
                  <button
                    type="button"
                    className="shrink-0 inline-flex items-center gap-2 px-4 py-2 bg-primary text-white text-sm font-medium rounded-lg hover:opacity-90 transition-opacity"
                  >
                    <User className="w-4 h-4" strokeWidth={2} />
                    Auto-fill from LinkedIn URL
                  </button>
                </div>

                <form onSubmit={handleSubmit} className="space-y-6">
                  {/* Contact Information */}
                  <section>
                    <h2 className={sectionHeadingClass}>
                      <User className="w-4 h-4 text-primary" strokeWidth={2} />
                      Contact Information
                    </h2>
                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                      <div>
                        <label className={labelClass}>Full Name</label>
                        <input
                          type="text"
                          value={fullName}
                          onChange={(e) => setFullName(e.target.value)}
                          className={inputClass}
                          placeholder="e.g. John Doe"
                        />
                      </div>
                      <div className="relative">
                        <label className={labelClass}>Email Address</label>
                        <div className="relative">
                          <input
                            type="email"
                            value={email}
                            onChange={(e) => setEmail(e.target.value)}
                            onBlur={() => setEmailTouched(true)}
                            className={`${inputClass} pr-10`}
                            placeholder="john.doe@example.com"
                            required
                          />
                          {emailTouched && emailValid && (
                            <span className="absolute right-3 top-1/2 -translate-y-1/2 text-green-600">
                              <Check className="w-5 h-5" strokeWidth={2.5} />
                            </span>
                          )}
                        </div>
                      </div>
                      <div>
                        <label className={labelClass}>Location</label>
                        <div className="relative">
                          <MapPin className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-primary" strokeWidth={2} />
                          <input
                            type="text"
                            value={location}
                            onChange={(e) => setLocation(e.target.value)}
                            className={`${inputClass} pl-9`}
                            placeholder="City, Country"
                          />
                        </div>
                      </div>
                      <div>
                        <label className={labelClass}>Specialty</label>
                        <select
                          value={specialty}
                          onChange={(e) => setSpecialty(e.target.value as LeadSpecialty | "")}
                          className={inputClass}
                        >
                          <option value="">Select specialty</option>
                          {leadSpecialtyOptions.map((s) => (
                            <option key={s} value={s}>
                              {s}
                            </option>
                          ))}
                        </select>
                      </div>
                      <div>
                        <label className={labelClass}>Phone Number</label>
                        <div className="flex">
                          <select
                            value={countryCode}
                            onChange={(e) => setCountryCode(e.target.value)}
                            className="w-24 px-2 py-2 text-sm border border-gray-300 rounded-l-lg border-r-0 focus:outline-none focus:ring-2 focus:ring-primary bg-white text-black"
                          >
                            <option value="+1">🇺🇸 +1</option>
                            <option value="+20">🇪🇬 +20</option>
                            <option value="+44">+44</option>
                            <option value="+971">+971</option>
                          </select>
                          <input
                            type="tel"
                            value={phone}
                            onChange={(e) => setPhone(e.target.value)}
                            className={`${inputClass} rounded-l-none`}
                            placeholder="(555) 000-0000"
                          />
                        </div>
                      </div>
                    </div>
                  </section>

                  {/* Academic Interest */}
                  <section>
                    <h2 className={sectionHeadingClass}>
                      <GraduationCap className="w-4 h-4 text-primary" strokeWidth={2} />
                      Academic Interest
                    </h2>
                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                      <div>
                        <label className={labelClass}>Primary Course of Interest</label>
                        <div className="border border-gray-300 rounded-lg bg-white focus-within:ring-2 focus-within:ring-primary focus-within:border-primary max-h-40 overflow-y-auto">
                          <div className="p-2 space-y-1.5">
                            {coursesOfInterest.map((c) => (
                              <label
                                key={c}
                                className="flex items-center gap-2 cursor-pointer hover:bg-gray-50 rounded px-2 py-1.5 text-sm text-gray-800"
                              >
                                <input
                                  type="checkbox"
                                  checked={courseInterests.includes(c)}
                                  onChange={(e) => {
                                    if (e.target.checked) {
                                      setCourseInterests((prev) => [...prev, c]);
                                    } else {
                                      setCourseInterests((prev) => prev.filter((x) => x !== c));
                                    }
                                  }}
                                  className="w-4 h-4 rounded border-gray-300 text-primary focus:ring-primary"
                                />
                                <span>{c}</span>
                              </label>
                            ))}
                          </div>
                        </div>
                        <p className="text-xs text-gray-500 mt-1">Select one or more courses</p>
                      </div>
                    </div>
                  </section>

                  {/* Source & Management */}
                  <section>
                    <h2 className={sectionHeadingClass}>
                      <Megaphone className="w-4 h-4 text-primary" strokeWidth={2} />
                      Source & Management
                    </h2>
                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                      <div>
                        <label className={labelClass}>Lead Source</label>
                        <select
                          value={leadSource}
                          onChange={(e) => setLeadSource(e.target.value)}
                          className={inputClass}
                        >
                          {LEAD_SOURCES.map((s) => (
                            <option key={s} value={s}>
                              {s}
                            </option>
                          ))}
                        </select>
                      </div>
                      <div>
                        <label className={labelClass}>Assign to Counselor</label>
                        <select
                          value={assignedTo}
                          onChange={(e) => setAssignedTo(e.target.value)}
                          className={inputClass}
                        >
                          {COUNSELORS.map((c) => (
                            <option
                              key={c.name}
                              value={`${c.name} (${c.role})`}
                            >
                              {c.name} ({c.role})
                            </option>
                          ))}
                        </select>
                      </div>
                    </div>
                    <div className="mt-4">
                      <label className={labelClass}>Lead Priority</label>
                      <div className="flex gap-2">
                        <button
                          type="button"
                          onClick={() => setPriority("cold")}
                          className={`inline-flex items-center gap-2 px-4 py-2 rounded-lg text-sm font-medium border-2 transition-colors ${
                            priority === "cold"
                              ? "border-amber-400 bg-amber-50 text-amber-800"
                              : "border-gray-200 bg-white text-gray-700 hover:border-gray-300"
                          }`}
                        >
                          <Snowflake className="w-4 h-4 text-primary" strokeWidth={2} />
                          Cold
                        </button>
                        <button
                          type="button"
                          onClick={() => setPriority("warm")}
                          className={`inline-flex items-center gap-2 px-4 py-2 rounded-lg text-sm font-medium border-2 transition-colors ${
                            priority === "warm"
                              ? "border-amber-400 bg-amber-50 text-amber-800"
                              : "border-gray-200 bg-white text-gray-700 hover:border-gray-300"
                          }`}
                        >
                          <Thermometer className="w-4 h-4 text-primary" strokeWidth={2} />
                          Warm
                        </button>
                        <button
                          type="button"
                          onClick={() => setPriority("hot")}
                          className={`inline-flex items-center gap-2 px-4 py-2 rounded-lg text-sm font-medium border-2 transition-colors ${
                            priority === "hot"
                              ? "border-amber-400 bg-amber-50 text-amber-800"
                              : "border-gray-200 bg-white text-gray-700 hover:border-gray-300"
                          }`}
                        >
                          <Flame className="w-4 h-4 text-primary" strokeWidth={2} />
                          Hot
                        </button>
                      </div>
                    </div>
                  </section>

                  {/* Quick Note */}
                  <section>
                    <h2 className={sectionHeadingClass}>Quick Note</h2>
                    <textarea
                      value={quickNote}
                      onChange={(e) => setQuickNote(e.target.value)}
                      rows={4}
                      className={`${inputClass} resize-none`}
                      placeholder="Add initial observations, career goals, or context..."
                    />
                  </section>

                  {/* Actions */}
                  <div className="flex flex-col-reverse sm:flex-row justify-between gap-3 pt-4 border-t border-gray-200">
                    <Link
                      href="/admin/crm/leads"
                      className="inline-flex items-center justify-center px-4 py-2.5 text-gray-700 font-medium hover:bg-gray-50 rounded-lg transition-colors"
                    >
                      Cancel
                    </Link>
                    <button
                      type="submit"
                      className="inline-flex items-center gap-2 px-5 py-2.5 bg-primary text-white font-medium rounded-lg hover:opacity-90 transition-opacity"
                    >
                      <Plus className="w-4 h-4 text-white" strokeWidth={2.5} />
                      Create Lead
                    </button>
                  </div>
                </form>
              </div>
            </div>
          </div>

          {/* Right sidebar - Real-Time Lead Scoring */}
          <aside className="lg:w-80 flex-shrink-0">
            <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-6 sticky top-6">
              <h3 className="text-xs font-semibold text-gray-500 uppercase tracking-wider mb-4">
                Real-Time Lead Scoring
              </h3>
              <div className="flex flex-col items-center mb-4">
                <div
                  className="relative w-32 h-32 rounded-full flex items-center justify-center"
                  style={{
                    background: `conic-gradient(var(--color-primary) ${scorePercent * 3.6}deg, #e5e7eb 0deg)`,
                  }}
                >
                  <div className="absolute inset-2 rounded-full bg-white flex flex-col items-center justify-center">
                    <span className="text-2xl font-bold text-gray-900">
                      {leadScore}
                    </span>
                    <span className="text-xs text-gray-500">SCORE / 100</span>
                  </div>
                </div>
              </div>
              <div className="text-center mb-4">
                <p className="font-semibold text-gray-900">High Interest</p>
                <p className="text-sm text-gray-600 mt-0.5">
                  This lead shows a high probability of enrollment based on
                  current profile data.
                </p>
              </div>
              <div className="mb-4">
                <p className="text-xs font-semibold text-gray-500 uppercase tracking-wider mb-2">
                  Breakdown
                </p>
                <ul className="space-y-2 text-sm">
                  <li className="flex items-start gap-2">
                    <Check className="w-4 h-4 text-green-600 shrink-0 mt-0.5" strokeWidth={2.5} />
                    <span className="text-gray-700">
                      High-Value Job Title <span className="text-gray-500">(+30 points for &apos;Manager&apos; level)</span>
                    </span>
                  </li>
                  <li className="flex items-start gap-2">
                    <Check className="w-4 h-4 text-green-600 shrink-0 mt-0.5" strokeWidth={2.5} />
                    <span className="text-gray-700">
                      Preferred Source <span className="text-gray-500">(+25 points for LinkedIn referral)</span>
                    </span>
                  </li>
                  <li className="flex items-start gap-2">
                    <Circle className="w-4 h-4 text-gray-300 shrink-0 mt-0.5" strokeWidth={2} />
                    <span className="text-gray-700">
                      Incomplete Profile <span className="text-gray-500">(Complete location to gain +10 pts)</span>
                    </span>
                  </li>
                </ul>
              </div>
              <div className="p-4 bg-primary rounded-lg text-white text-sm">
                <p className="font-medium mb-1">Did you know?</p>
                <p>
                  Leads assigned to counselors within <strong>5 minutes</strong> are{" "}
                  <strong>4x</strong> more likely to convert. Finish the form to
                  notify {assignedTo.split(" ")[0]}!
                </p>
              </div>
            </div>
          </aside>
        </div>
      </div>

      <footer className="text-center py-6 text-sm text-gray-500 border-t border-gray-200 mt-8">
        © 2024 IMETS School of Business. All rights reserved.
      </footer>
    </div>
  );
}
