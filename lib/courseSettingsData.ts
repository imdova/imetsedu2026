/**
 * Types and mock data for admin Course Settings (Categories, Sub Categories, Tags).
 */

export interface CategoryRecord {
  id: string;
  name: string;
  slug: string;
  rank: number;
  createdAt: string;
  courses: number;
  status: "Active" | "Inactive";
  imageUrl?: string;
  iconUrl?: string;
}

export interface SubCategoryRecord {
  id: string;
  name: string;
  slug: string;
  parentCategory: string;
  parentCategoryId: string;
  rank: number;
  createdAt: string;
  courses: number;
  status: "Active" | "Inactive";
  imageUrl?: string;
  iconUrl?: string;
}

export interface TagRecord {
  id: string;
  name: string;
  slug: string;
  description?: string;
  color: string;
  courses: number;
  status: "Active" | "Inactive";
}

export const courseSettingsCategories: CategoryRecord[] = [
  {
    id: "1",
    name: "Healthcare",
    slug: "healthcare",
    rank: 1,
    createdAt: "25/12/2025",
    courses: 8,
    status: "Active",
  },
  {
    id: "2",
    name: "Pharmaceutical Management",
    slug: "pharmaceutical-management",
    rank: 2,
    createdAt: "25/12/2025",
    courses: 0,
    status: "Active",
  },
  {
    id: "3",
    name: "Medicine and Surgery",
    slug: "medicine-and-surgery",
    rank: 3,
    createdAt: "25/12/2025",
    courses: 2,
    status: "Active",
  },
  {
    id: "4",
    name: "Dentistry",
    slug: "dentistry",
    rank: 4,
    createdAt: "25/12/2025",
    courses: 1,
    status: "Active",
  },
  {
    id: "5",
    name: "Nursing",
    slug: "nursing",
    rank: 5,
    createdAt: "25/12/2025",
    courses: 3,
    status: "Active",
  },
  {
    id: "6",
    name: "Pharmacy",
    slug: "pharmacy",
    rank: 6,
    createdAt: "25/12/2025",
    courses: 2,
    status: "Active",
  },
  {
    id: "7",
    name: "Physiotherapy",
    slug: "physiotherapy",
    rank: 7,
    createdAt: "25/12/2025",
    courses: 1,
    status: "Active",
  },
  {
    id: "8",
    name: "Business Administration",
    slug: "business-administration",
    rank: 8,
    createdAt: "25/12/2025",
    courses: 4,
    status: "Active",
  },
];

export const courseSettingsSubCategories: SubCategoryRecord[] = [
  {
    id: "s1",
    name: "Healthcare Quality",
    slug: "healthcare-quality",
    parentCategory: "Healthcare",
    parentCategoryId: "1",
    rank: 0,
    createdAt: "25/12/2025",
    courses: 7,
    status: "Active",
  },
  {
    id: "s2",
    name: "General Practice",
    slug: "general-practice",
    parentCategory: "Healthcare",
    parentCategoryId: "1",
    rank: 1,
    createdAt: "27/01/2026",
    courses: 0,
    status: "Active",
  },
  {
    id: "s3",
    name: "Clinical Research",
    slug: "clinical-research",
    parentCategory: "Healthcare",
    parentCategoryId: "1",
    rank: 2,
    createdAt: "27/01/2026",
    courses: 1,
    status: "Active",
  },
  {
    id: "s4",
    name: "Nursing Education",
    slug: "nursing-education",
    parentCategory: "Nursing",
    parentCategoryId: "5",
    rank: 0,
    createdAt: "27/01/2026",
    courses: 2,
    status: "Active",
  },
  {
    id: "s5",
    name: "Clinical Pharmacy",
    slug: "clinical-pharmacy",
    parentCategory: "Pharmacy",
    parentCategoryId: "6",
    rank: 0,
    createdAt: "27/01/2026",
    courses: 1,
    status: "Active",
  },
  {
    id: "s6",
    name: "MBA",
    slug: "mba",
    parentCategory: "Business Administration",
    parentCategoryId: "8",
    rank: 0,
    createdAt: "27/01/2026",
    courses: 2,
    status: "Active",
  },
];

const TAG_COLORS = [
  "#3b82f6",
  "#22c55e",
  "#ef4444",
  "#f59e0b",
  "#8b5cf6",
  "#ec4899",
  "#0ea5e9",
  "#f97316",
] as const;

export const courseSettingsTags: TagRecord[] = [
  {
    id: "t1",
    name: "Advanced",
    slug: "advanced",
    description: "For advanced learners",
    color: TAG_COLORS[0],
    courses: 0,
    status: "Active",
  },
  {
    id: "t2",
    name: "AI Bootcamp",
    slug: "ai-bootcamp",
    color: TAG_COLORS[0],
    courses: 11,
    status: "Active",
  },
  {
    id: "t3",
    name: "AI Course",
    slug: "ai-course",
    color: TAG_COLORS[0],
    courses: 4,
    status: "Active",
  },
  {
    id: "t4",
    name: "Artificial Intelligence",
    slug: "artificial-intelligence",
    color: TAG_COLORS[0],
    courses: 6,
    status: "Active",
  },
  {
    id: "t5",
    name: "Back-end",
    slug: "back-end",
    color: TAG_COLORS[0],
    courses: 3,
    status: "Active",
  },
  {
    id: "t6",
    name: "Beginner Friendly",
    slug: "beginner-friendly",
    color: TAG_COLORS[0],
    courses: 15,
    status: "Active",
  },
];

export const TAG_PRESET_COLORS = TAG_COLORS;
