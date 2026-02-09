"use client";

import Link from "next/link";
import { Container } from "@/components/ui";
import { ROUTES } from "@/constants";

export default function HeroSection() {
  return (
    <section className="bg-gradient-to-r from-primary to-primary-light text-white py-12 sm:py-16 lg:py-20">
      <Container>
        <div className="text-center">
          <h1 className="text-3xl sm:text-4xl lg:text-5xl font-bold mb-4 sm:mb-6">
            Learn Without Limits
          </h1>
          <p className="text-base sm:text-lg lg:text-xl mb-6 sm:mb-8 max-w-2xl mx-auto px-4">
            Start, switch, or advance your career with thousands of courses,
            Professional Certificates, and degrees from world-class
            instructors.
          </p>
          <div className="flex flex-col sm:flex-row justify-center items-center gap-3 sm:gap-4 px-4">
            <Link
              href={ROUTES.SEARCH}
              className="w-full sm:w-auto bg-transparent border-2 border-white text-white px-6 sm:px-8 py-3 rounded-lg font-semibold hover:bg-white hover:text-primary transition-colors text-center"
            >
              Explore Courses
            </Link>
            <Link
              href={ROUTES.BECOME_INSTRUCTOR}
              className="w-full sm:w-auto bg-[#c9a227] text-white px-6 sm:px-8 py-3 rounded-lg font-semibold hover:bg-[#b8921f] transition-colors text-center"
            >
              Become Instructor
            </Link>
          </div>
        </div>
      </Container>
    </section>
  );
}
