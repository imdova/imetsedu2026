"use client";

import { useState, useRef, useEffect } from "react";
import Link from "next/link";
import Image from "next/image";
import {
  GraduationCap,
  Users,
  ShieldCheck,
  BookOpen,
  Lightbulb,
  Scale,
  GitMerge,
  Award,
  ChevronLeft,
  ChevronRight,
  Share2,
  ArrowRight,
} from "lucide-react";
import { ROUTES } from "@/constants";

const HERO_IMAGE =
  "https://images.unsplash.com/photo-1523050854058-8df90110c9f1?w=1200&q=80";

const PROGRAMS = [
  "Healthcare Quality Management",
  "Healthcare HR Management",
  "Hospital Management and Operational Control",
  "Healthcare Strategic Planning and Management",
  "Infection Prevention and Control",
  "Healthcare Marketing Management",
  "Healthcare Supply Chain Management",
  "Healthcare Financial Analysis and Management",
];

const INSTRUCTORS = [
  { name: "Michael Hammond", role: "Teacher", image: "https://images.unsplash.com/photo-1612349317150-e413f6a5b16d?w=400&q=80" },
  { name: "Cheryl Curry", role: "Teacher", image: "https://images.unsplash.com/photo-1559839734-2b71ea197ec2?w=400&q=80" },
  { name: "Willie Diaz", role: "Teacher", image: "https://images.unsplash.com/photo-1622253692010-333f2b603b43?w=400&q=80" },
  { name: "Jimmy Sifuentes", role: "Teacher", image: "https://images.unsplash.com/photo-1612531386530-97286d97c5b3?w=400&q=80" },
];

const SIDEBAR_LINKS = [
  { id: "overview", label: "Overview" },
  { id: "mission", label: "Mission" },
  { id: "vision", label: "Vision" },
  { id: "values", label: "Values" },
  { id: "programs", label: "Programs" },
];

const VALUES = [
  {
    title: "Innovation",
    description: "We continuously improve our programs and teaching methods to deliver cutting-edge business and professional education.",
    icon: Lightbulb,
  },
  {
    title: "Integrity",
    description: "We uphold the highest ethical standards in education and in our relationships with students and partners.",
    icon: Scale,
  },
  {
    title: "Collaboration",
    description: "We work with leading organizations and experts to create relevant, practical learning experiences.",
    icon: GitMerge,
  },
  {
    title: "Excellence",
    description: "We are committed to excellence in every course, ensuring the highest quality content and outcomes.",
    icon: Award,
  },
];

export default function AboutPage() {
  const [activeSection, setActiveSection] = useState("mission");
  const [instructorIndex, setInstructorIndex] = useState(0);
  const programsRef = useRef<HTMLElement>(null);

  useEffect(() => {
    if (activeSection === "programs" && programsRef.current) {
      programsRef.current.scrollIntoView({ behavior: "smooth", block: "start" });
    }
  }, [activeSection]);

  const nextInstructor = () => {
    setInstructorIndex((i) => (i + 1) % INSTRUCTORS.length);
  };
  const prevInstructor = () => {
    setInstructorIndex((i) => (i - 1 + INSTRUCTORS.length) % INSTRUCTORS.length);
  };

  return (
    <div className="min-h-screen bg-white">
      {/* Hero Section */}
      <section className="relative min-h-[420px] sm:min-h-[480px] lg:min-h-[520px] flex items-center">
        <div className="absolute inset-0">
          <Image
            src={HERO_IMAGE}
            alt="Students learning"
            fill
            className="object-cover"
            sizes="100vw"
            priority
          />
          <div className="absolute inset-0 bg-[#0a47c2]/85" />
        </div>
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-full max-w-7xl px-4 sm:px-6 lg:px-8">
          <div className="relative flex flex-col lg:flex-row lg:items-end lg:justify-between gap-8">
            <div>
              <p className="text-white text-lg sm:text-xl mb-1">About Us</p>
              <h1 className="text-white font-bold text-3xl sm:text-4xl lg:text-5xl mb-3">
                Welcome To IMETS School of Business
              </h1>
              <p className="text-white/95 text-sm sm:text-base max-w-2xl mb-6">
                We are committed to advancing business and professional education through expert-led
                online programs. Our mission is to equip professionals with the
                knowledge and skills needed to excel in their careers.
              </p>
              <Link
                href={ROUTES.COURSES}
                className="inline-flex items-center gap-2 bg-[#c9a227] hover:bg-[#b8921f] text-white font-semibold px-6 py-3 rounded-lg transition-colors"
              >
                Admission Open
                <ArrowRight className="w-5 h-5" strokeWidth={2.5} />
              </Link>
            </div>
            <div className="flex-shrink-0">
              <div className="bg-white rounded-2xl shadow-xl p-6 border-2 border-[#e85d04]/80 max-w-[180px]">
                <span className="text-4xl font-bold text-black">35+</span>
                <p className="text-gray-700 font-medium mt-1">Years Experience</p>
              </div>
            </div>
          </div>
        </div>
        <div
          className="absolute left-0 bottom-0 w-48 h-32 bg-[#7dd3c0]/30 rounded-tr-full"
          aria-hidden
        />
      </section>

      {/* Statistics Bar */}
      <section className="bg-[#c9a227] py-8 sm:py-10">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-2 lg:grid-cols-4 gap-6 sm:gap-8">
            <div className="flex items-center gap-4 text-white">
              <div className="flex-shrink-0 w-14 h-14 rounded-xl bg-white/20 flex items-center justify-center">
                <GraduationCap className="w-7 h-7" strokeWidth={2} />
              </div>
              <div>
                <span className="block text-2xl sm:text-3xl font-bold">22k+</span>
                <span className="text-sm sm:text-base text-white/95">Students</span>
              </div>
            </div>
            <div className="flex items-center gap-4 text-white">
              <div className="flex-shrink-0 w-14 h-14 rounded-xl bg-white/20 flex items-center justify-center">
                <Users className="w-7 h-7" strokeWidth={2} />
              </div>
              <div>
                <span className="block text-2xl sm:text-3xl font-bold">320+</span>
                <span className="text-sm sm:text-base text-white/95">Instructors</span>
              </div>
            </div>
            <div className="flex items-center gap-4 text-white">
              <div className="flex-shrink-0 w-14 h-14 rounded-xl bg-white/20 flex items-center justify-center">
                <ShieldCheck className="w-7 h-7" strokeWidth={2} />
              </div>
              <div>
                <span className="block text-2xl sm:text-3xl font-bold">99%+</span>
                <span className="text-sm sm:text-base text-white/95">Success Rate</span>
              </div>
            </div>
            <div className="flex items-center gap-4 text-white">
              <div className="flex-shrink-0 w-14 h-14 rounded-xl bg-white/20 flex items-center justify-center">
                <BookOpen className="w-7 h-7" strokeWidth={2} />
              </div>
              <div>
                <span className="block text-2xl sm:text-3xl font-bold">600+</span>
                <span className="text-sm sm:text-base text-white/95">Courses</span>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Mission, Vision, Values */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12 sm:py-16 lg:py-20">
        <div className="flex flex-col lg:flex-row gap-8 lg:gap-12">
          <aside className="lg:w-56 flex-shrink-0">
            <nav className="bg-[#0a47c2] rounded-xl p-2 sticky top-24">
              {SIDEBAR_LINKS.map(({ id, label }) => (
                <button
                  key={id}
                  onClick={() => setActiveSection(id)}
                  className={`block w-full text-left px-4 py-3 rounded-lg text-sm font-medium transition-colors ${
                    activeSection === id
                      ? "bg-white text-[#0a47c2]"
                      : "text-white hover:bg-white/10"
                  }`}
                >
                  {label}
                </button>
              ))}
            </nav>
          </aside>
          <div className="flex-1 min-w-0 space-y-10">
            {(activeSection === "overview" || activeSection === "mission") && (
              <div id="mission">
                <h2 className="text-2xl sm:text-3xl font-bold text-black mb-4">
                  IMETS Mission
                </h2>
                <p className="text-gray-700 leading-relaxed">
                  IMETS School of Business is dedicated to advancing professional careers through
                  expert-led online programs. We connect professionals with world-class
                  instructors and industry-relevant curricula to build the skills that
                  matter in today&apos;s business environment. Our mission is to make
                  quality business education accessible, practical, and aligned with
                  international standards.
                </p>
              </div>
            )}
            {(activeSection === "overview" || activeSection === "vision") && (
              <div id="vision">
                <h2 className="text-2xl sm:text-3xl font-bold text-black mb-4">
                  Our Vision
                </h2>
                <p className="text-gray-700 leading-relaxed">
                  We envision a world where every professional has access to
                  top-tier education and certification. By combining live online lectures,
                  international certifications, and career mentoring, we aim to be the
                  leading choice for professionals seeking to grow and
                  excel in their fields.
                </p>
              </div>
            )}
            {(activeSection === "overview" || activeSection === "values") && (
              <div id="values" className="scroll-mt-24">
                <h2 className="text-2xl sm:text-3xl font-bold text-black mb-6">
                  Our Values
                </h2>
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
                  {VALUES.map(({ title, description, icon: Icon }) => (
                    <div key={title} className="flex gap-4">
                      <div className="flex-shrink-0 w-12 h-12 rounded-xl bg-[#f59e0b]/20 flex items-center justify-center">
                        <Icon className="w-6 h-6 text-[#d97706]" strokeWidth={2} />
                      </div>
                      <div>
                        <h3 className="font-bold text-black mb-1">{title}</h3>
                        <p className="text-gray-600 text-sm leading-relaxed">
                          {description}
                        </p>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            )}
          </div>
        </div>
      </section>

      {/* Educational Programs */}
      <section ref={programsRef} id="programs" className="bg-gray-50 py-12 sm:py-16 lg:py-20 scroll-mt-24">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <h2 className="text-2xl sm:text-3xl font-bold text-black text-center mb-10">
            Educational Programs
          </h2>
          <div className="bg-[#0a47c2] rounded-2xl p-6 sm:p-8">
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-x-8 gap-y-4">
              {PROGRAMS.map((name, index) => (
                <div
                  key={index}
                  className="flex items-center gap-3 text-white"
                >
                  <span className="flex-shrink-0 w-8 h-8 rounded-full bg-[#c9a227] flex items-center justify-center text-sm font-bold text-white">
                    {index + 1}
                  </span>
                  <span className="font-medium">{name}</span>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* Meet Our Instructor */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12 sm:py-16 lg:py-20">
        <div className="flex items-center justify-between mb-8">
          <h2 className="text-2xl sm:text-3xl font-bold text-black">
            Meet Our Instructor
          </h2>
          <div className="flex items-center gap-2">
            <button
              type="button"
              onClick={prevInstructor}
              className="w-10 h-10 rounded-full border-2 border-[#c9a227] text-[#c9a227] flex items-center justify-center hover:bg-[#c9a227] hover:text-white transition-colors"
              aria-label="Previous instructor"
            >
              <ChevronLeft className="w-5 h-5" strokeWidth={2.5} />
            </button>
            <button
              type="button"
              onClick={nextInstructor}
              className="w-10 h-10 rounded-full border-2 border-[#c9a227] text-[#c9a227] flex items-center justify-center hover:bg-[#c9a227] hover:text-white transition-colors"
              aria-label="Next instructor"
            >
              <ChevronRight className="w-5 h-5" strokeWidth={2.5} />
            </button>
          </div>
        </div>
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
          {INSTRUCTORS.map((instructor, i) => (
            <div
              key={instructor.name}
              className={`rounded-xl overflow-hidden border-2 bg-white shadow-md transition-all ${
                i === instructorIndex
                  ? "border-[#c9a227] ring-2 ring-[#c9a227]/30"
                  : "border-transparent opacity-90"
              }`}
            >
              <div className="relative aspect-[3/4] bg-gray-200">
                <Image
                  src={instructor.image}
                  alt={instructor.name}
                  fill
                  className="object-cover"
                  sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 25vw"
                />
                <button
                  type="button"
                  className="absolute bottom-3 right-3 w-9 h-9 rounded-lg bg-[#c9a227] text-white flex items-center justify-center hover:bg-[#b8921f] transition-colors"
                  aria-label="Share"
                >
                  <Share2 className="w-4 h-4" strokeWidth={2.5} />
                </button>
              </div>
              <div className="p-4">
                <h3 className="font-bold text-black">{instructor.name}</h3>
                <p className="text-sm text-gray-600">{instructor.role}</p>
              </div>
            </div>
          ))}
        </div>
      </section>
    </div>
  );
}
