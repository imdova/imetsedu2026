/**
 * Types and mock data for admin LMS Settings (Categories, Sub Categories).
 */

export interface LMSCategoryRecord {
  id: string;
  name: string;
  slug: string;
  rank: number;
  createdAt: string;
  courses: number;
  status: "Active" | "Inactive";
}

export interface LMSSubCategoryRecord {
  id: string;
  name: string;
  slug: string;
  parentCategory: string;
  parentCategoryId: string;
  rank: number;
  createdAt: string;
  courses: number;
  status: "Active" | "Inactive";
}

export const lmsSettingsCategories: LMSCategoryRecord[] = [
  {
    id: "1",
    name: "Leadership",
    slug: "leadership",
    rank: 1,
    createdAt: "25/12/2025",
    courses: 12,
    status: "Active",
  },
  {
    id: "2",
    name: "Technical",
    slug: "technical",
    rank: 2,
    createdAt: "25/12/2025",
    courses: 18,
    status: "Active",
  },
  {
    id: "3",
    name: "Compliance",
    slug: "compliance",
    rank: 3,
    createdAt: "25/12/2025",
    courses: 6,
    status: "Active",
  },
];

export const lmsSettingsSubCategories: LMSSubCategoryRecord[] = [
  {
    id: "s1",
    name: "Project Management",
    slug: "project-management",
    parentCategory: "Leadership",
    parentCategoryId: "1",
    rank: 0,
    createdAt: "25/12/2025",
    courses: 5,
    status: "Active",
  },
  {
    id: "s2",
    name: "Management",
    slug: "management",
    parentCategory: "Leadership",
    parentCategoryId: "1",
    rank: 1,
    createdAt: "27/01/2026",
    courses: 4,
    status: "Active",
  },
  {
    id: "s3",
    name: "Team Building",
    slug: "team-building",
    parentCategory: "Leadership",
    parentCategoryId: "1",
    rank: 2,
    createdAt: "27/01/2026",
    courses: 3,
    status: "Active",
  },
  {
    id: "s4",
    name: "Infrastructure",
    slug: "infrastructure",
    parentCategory: "Technical",
    parentCategoryId: "2",
    rank: 0,
    createdAt: "27/01/2026",
    courses: 6,
    status: "Active",
  },
  {
    id: "s5",
    name: "Development",
    slug: "development",
    parentCategory: "Technical",
    parentCategoryId: "2",
    rank: 1,
    createdAt: "27/01/2026",
    courses: 8,
    status: "Active",
  },
  {
    id: "s6",
    name: "Security",
    slug: "security",
    parentCategory: "Technical",
    parentCategoryId: "2",
    rank: 2,
    createdAt: "27/01/2026",
    courses: 4,
    status: "Active",
  },
  {
    id: "s7",
    name: "Regulatory",
    slug: "regulatory",
    parentCategory: "Compliance",
    parentCategoryId: "3",
    rank: 0,
    createdAt: "27/01/2026",
    courses: 2,
    status: "Active",
  },
  {
    id: "s8",
    name: "Data Protection",
    slug: "data-protection",
    parentCategory: "Compliance",
    parentCategoryId: "3",
    rank: 1,
    createdAt: "27/01/2026",
    courses: 4,
    status: "Active",
  },
];
