/**
 * Types and mock data for admin Group Settings (Categories, Sub Categories).
 */

export interface GroupCategoryRecord {
  id: string;
  name: string;
  slug: string;
  rank: number;
  createdAt: string;
  groups: number;
  status: "Active" | "Inactive";
}

export interface GroupSubCategoryRecord {
  id: string;
  name: string;
  slug: string;
  parentCategory: string;
  parentCategoryId: string;
  rank: number;
  createdAt: string;
  groups: number;
  status: "Active" | "Inactive";
}

export const groupSettingsCategories: GroupCategoryRecord[] = [
  {
    id: "1",
    name: "Business",
    slug: "business",
    rank: 1,
    createdAt: "25/12/2025",
    groups: 12,
    status: "Active",
  },
  {
    id: "2",
    name: "Technology",
    slug: "technology",
    rank: 2,
    createdAt: "25/12/2025",
    groups: 18,
    status: "Active",
  },
  {
    id: "3",
    name: "Management",
    slug: "management",
    rank: 3,
    createdAt: "25/12/2025",
    groups: 8,
    status: "Active",
  },
];

export const groupSettingsSubCategories: GroupSubCategoryRecord[] = [
  {
    id: "s1",
    name: "MBA",
    slug: "mba",
    parentCategory: "Business",
    parentCategoryId: "1",
    rank: 0,
    createdAt: "25/12/2025",
    groups: 5,
    status: "Active",
  },
  {
    id: "s2",
    name: "Data Science",
    slug: "data-science",
    parentCategory: "Technology",
    parentCategoryId: "2",
    rank: 0,
    createdAt: "27/01/2026",
    groups: 6,
    status: "Active",
  },
  {
    id: "s3",
    name: "Programming",
    slug: "programming",
    parentCategory: "Technology",
    parentCategoryId: "2",
    rank: 1,
    createdAt: "27/01/2026",
    groups: 8,
    status: "Active",
  },
  {
    id: "s4",
    name: "Project Management",
    slug: "project-management",
    parentCategory: "Management",
    parentCategoryId: "3",
    rank: 0,
    createdAt: "27/01/2026",
    groups: 4,
    status: "Active",
  },
];
