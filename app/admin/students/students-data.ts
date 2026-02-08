/**
 * Students management – data and types for admin/students.
 */

export type StudentStatus = "active" | "inactive" | "suspended";

export interface Student {
  id: string;
  name: string;
  email: string;
  image?: string;
  enrolledCourses: number;
  completedCourses: number;
  certificates: number;
  country: string;
  countryLabel: string;
  joinDate: string;
  status: StudentStatus;
}

export const STUDENTS: Student[] = [
  {
    id: "1",
    name: "Ahmed Mohamed",
    email: "ahmed.mohamed@example.com",
    image: "https://i.pravatar.cc/80?img=1",
    enrolledCourses: 5,
    completedCourses: 3,
    certificates: 2,
    country: "EG",
    countryLabel: "Egypt",
    joinDate: "2024-01-15",
    status: "active",
  },
  {
    id: "2",
    name: "Sarah Ali",
    email: "sarah.ali@example.com",
    image: "https://i.pravatar.cc/80?img=2",
    enrolledCourses: 8,
    completedCourses: 6,
    certificates: 5,
    country: "SA",
    countryLabel: "Saudi Arabia",
    joinDate: "2023-12-20",
    status: "active",
  },
  {
    id: "3",
    name: "Mohamed Hassan",
    email: "mohamed.hassan@example.com",
    image: "https://i.pravatar.cc/80?img=3",
    enrolledCourses: 3,
    completedCourses: 1,
    certificates: 1,
    country: "AE",
    countryLabel: "UAE",
    joinDate: "2024-01-10",
    status: "active",
  },
  {
    id: "4",
    name: "Fatima Ibrahim",
    email: "fatima.ibrahim@example.com",
    image: "https://i.pravatar.cc/80?img=4",
    enrolledCourses: 12,
    completedCourses: 10,
    certificates: 8,
    country: "JO",
    countryLabel: "Jordan",
    joinDate: "2023-11-05",
    status: "active",
  },
  {
    id: "5",
    name: "Omar Khalil",
    email: "omar.khalil@example.com",
    image: "https://i.pravatar.cc/80?img=5",
    enrolledCourses: 2,
    completedCourses: 0,
    certificates: 0,
    country: "KW",
    countryLabel: "Kuwait",
    joinDate: "2024-01-20",
    status: "active",
  },
  {
    id: "6",
    name: "Layla Hassan",
    email: "layla.h@example.com",
    enrolledCourses: 4,
    completedCourses: 2,
    certificates: 1,
    country: "EG",
    countryLabel: "Egypt",
    joinDate: "2023-10-12",
    status: "inactive",
  },
  {
    id: "7",
    name: "Youssef Nasser",
    email: "youssef.n@example.com",
    image: "https://i.pravatar.cc/80?img=7",
    enrolledCourses: 6,
    completedCourses: 4,
    certificates: 3,
    country: "SA",
    countryLabel: "Saudi Arabia",
    joinDate: "2024-02-01",
    status: "active",
  },
];

export const STATUS_OPTIONS: { value: StudentStatus | "all"; label: string }[] =
  [
    { value: "all", label: "All statuses" },
    { value: "active", label: "Active" },
    { value: "inactive", label: "Inactive" },
    { value: "suspended", label: "Suspended" },
  ];

export const COUNTRY_OPTIONS = [
  { value: "all", label: "All countries" },
  { value: "EG", label: "Egypt" },
  { value: "SA", label: "Saudi Arabia" },
  { value: "AE", label: "UAE" },
  { value: "JO", label: "Jordan" },
  { value: "KW", label: "Kuwait" },
];
