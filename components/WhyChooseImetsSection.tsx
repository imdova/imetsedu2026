"use client";

import {
  GraduationCap,
  BookOpen,
  Award,
  Users,
  Building2,
  Target,
  ShieldCheck,
} from "lucide-react";

const REASONS = [
  {
    icon: GraduationCap,
    title: "Industry-Led Education",
    description:
      "Learn from practitioners and academics who bring real-world expertise into every program. Our faculty are active in their fields, ensuring curriculum stays current and relevant.",
    color: "bg-[#0a47c2]/10 text-[#0a47c2]",
  },
  {
    icon: BookOpen,
    title: "Rigorous, Practical Curriculum",
    description:
      "Programs designed to balance theory with applied skills. From case studies to live projects, you build the competencies employers look for in business and management roles.",
    color: "bg-emerald-500/10 text-emerald-600",
  },
  {
    icon: Award,
    title: "Recognized Credentials",
    description:
      "Earn certificates and diplomas that are valued by employers and institutions. Our programs align with industry standards and support your next career or academic step.",
    color: "bg-amber-500/10 text-amber-600",
  },
  {
    icon: Users,
    title: "Vibrant Learning Community",
    description:
      "Join a diverse network of professionals and peers. Collaborate, network, and learn alongside others who are committed to growth and excellence in business and management.",
    color: "bg-violet-500/10 text-violet-600",
  },
  {
    icon: Building2,
    title: "Strong Industry Links",
    description:
      "Partnerships with leading organizations give you access to guest speakers, projects, and insights that bridge the gap between classroom learning and the workplace.",
    color: "bg-cyan-500/10 text-cyan-600",
  },
  {
    icon: Target,
    title: "Career-Focused Outcomes",
    description:
      "From resume building to interview prep and placement support, we focus on helping you achieve your career goals. Our alumni work across sectors and geographies.",
    color: "bg-rose-500/10 text-rose-600",
  },
  {
    icon: ShieldCheck,
    title: "Quality & Integrity",
    description:
      "We are committed to academic integrity, inclusive learning, and transparent standards. Your growth and credibility matter to us at every step of your journey.",
    color: "bg-indigo-500/10 text-indigo-600",
  },
];

export default function WhyChooseImetsSection() {
  return (
    <section className="py-12 sm:py-16 lg:py-20 bg-gray-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center max-w-3xl mx-auto mb-10 sm:mb-14">
          <h2 className="text-2xl sm:text-3xl lg:text-4xl font-bold text-black mb-3">
            Why choose IMETS School of Business?
          </h2>
          <p className="text-gray-600 text-sm sm:text-base">
            We combine academic excellence with practical relevance so you can lead with confidence in a changing world.
          </p>
        </div>
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 sm:gap-8">
          {REASONS.map((item) => {
            const Icon = item.icon;
            return (
              <div
                key={item.title}
                className="bg-white rounded-xl border border-gray-200 p-6 sm:p-7 hover:shadow-lg hover:border-[#0a47c2]/20 transition-all duration-300"
              >
                <div
                  className={`inline-flex h-12 w-12 items-center justify-center rounded-xl ${item.color} mb-4`}
                >
                  <Icon className="h-6 w-6" strokeWidth={2} />
                </div>
                <h3 className="font-semibold text-lg text-black mb-2">
                  {item.title}
                </h3>
                <p className="text-sm sm:text-base text-gray-600 leading-relaxed">
                  {item.description}
                </p>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
}
