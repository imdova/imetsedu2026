import { notFound } from "next/navigation";
import {
  getCategoryBySlugOrId,
  getCategorySlug,
  categories,
} from "@/lib/data";
import { getCoursesByCategoryName } from "@/lib/courses";
import CategoryPageClient from "./CategoryPageClient";
import type { Metadata } from "next";

const CATEGORY_ICON_BG: Record<string, string> = {
  "1": "bg-blue-500/15 text-[#0a47c2]",
  "2": "bg-emerald-500/15 text-emerald-600",
  "3": "bg-violet-500/15 text-violet-600",
  "4": "bg-pink-500/15 text-pink-600",
  "5": "bg-amber-500/15 text-amber-600",
  "6": "bg-cyan-500/15 text-cyan-600",
  "7": "bg-rose-500/15 text-rose-600",
  "8": "bg-indigo-500/15 text-indigo-600",
};

type Props = { params: Promise<{ slug: string }> };

export async function generateStaticParams() {
  return categories.map((c) => ({ slug: getCategorySlug(c) }));
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { slug } = await params;
  const category = getCategoryBySlugOrId(slug);
  if (!category) return { title: "Category Not Found" };
  const courseCount = getCoursesByCategoryName(category.name).length;
  return {
    title: `${category.name} Courses | IMETS School of Business`,
    description: `Explore ${courseCount} courses in ${category.name}. Find the right program to advance your career.`,
  };
}

export default async function SingleCategoryPage({ params }: Props) {
  const { slug } = await params;
  const category = getCategoryBySlugOrId(slug);
  if (!category) notFound();

  const categoryCourses = getCoursesByCategoryName(category.name);
  const iconBg =
    CATEGORY_ICON_BG[category.id] ?? "bg-gray-500/15 text-gray-600";
  const subCategories = category.subCategories ?? [];

  return (
    <CategoryPageClient
      categoryName={category.name}
      categoryId={category.id}
      iconBg={iconBg}
      subCategories={subCategories}
      courses={categoryCourses}
    />
  );
}
