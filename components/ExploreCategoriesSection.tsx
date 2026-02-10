"use client";

import Link from "next/link";
import {
  Code2,
  BarChart3,
  Smartphone,
  Palette,
  Briefcase,
  TrendingUp,
  Camera,
  Music,
  ArrowRight,
  type LucideIcon,
} from "lucide-react";
import type { Category } from "@/types/course";
import { ROUTES } from "@/constants";
import { getCategorySlug } from "@/lib/data";

const CATEGORY_ICONS: Record<string, LucideIcon> = {
  "1": Code2,
  "2": BarChart3,
  "3": Smartphone,
  "4": Palette,
  "5": Briefcase,
  "6": TrendingUp,
  "7": Camera,
  "8": Music,
};

const ICON_BG_COLORS: Record<string, string> = {
  "1": "bg-blue-500/10 text-[#0a47c2]",
  "2": "bg-emerald-500/10 text-emerald-600",
  "3": "bg-violet-500/10 text-violet-600",
  "4": "bg-pink-500/10 text-pink-600",
  "5": "bg-amber-500/10 text-amber-600",
  "6": "bg-cyan-500/10 text-cyan-600",
  "7": "bg-rose-500/10 text-rose-600",
  "8": "bg-indigo-500/10 text-indigo-600",
};

interface ExploreCategoriesSectionProps {
  categories: Category[];
}

export default function ExploreCategoriesSection({
  categories,
}: ExploreCategoriesSectionProps) {
  return (
    <section className="py-12 sm:py-16 lg:py-20 bg-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center max-w-2xl mx-auto mb-10 sm:mb-14">
          <h2 className="text-2xl sm:text-3xl lg:text-4xl font-bold text-black mb-3">
            Explore Top Categories
          </h2>
          <p className="text-gray-600 text-sm sm:text-base">
            Find the right path for your career with programs designed by industry leaders.
          </p>
        </div>
        <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 gap-3 sm:gap-4">
          {categories.map((category) => {
            const Icon = CATEGORY_ICONS[category.id] ?? Briefcase;
            const iconStyle = ICON_BG_COLORS[category.id] ?? "bg-gray-500/10 text-gray-600";
            return (
              <Link
                key={category.id}
                href={ROUTES.CATEGORY(getCategorySlug(category))}
                className="group relative bg-white rounded-xl border border-gray-200 p-4 hover:border-[#0a47c2]/40 hover:shadow-lg hover:shadow-[#0a47c2]/5 transition-all duration-300 overflow-hidden"
              >
                <div
                  className={`inline-flex h-9 w-9 items-center justify-center rounded-lg ${iconStyle} mb-2.5 transition-transform duration-300 group-hover:scale-110`}
                >
                  <Icon className="h-4 w-4" strokeWidth={2} />
                </div>
                <h3 className="font-semibold text-sm sm:text-base text-black mb-0.5 line-clamp-2">
                  {category.name}
                </h3>
                <p className="text-xs text-gray-500 mb-2">
                  {category.courseCount} courses
                </p>
                <span className="inline-flex items-center gap-1 text-xs font-medium text-[#0a47c2] opacity-0 group-hover:opacity-100 transition-opacity">
                  Explore
                  <ArrowRight className="h-3.5 w-3.5 group-hover:translate-x-0.5 transition-transform" strokeWidth={2.5} />
                </span>
              </Link>
            );
          })}
        </div>
      </div>
    </section>
  );
}
