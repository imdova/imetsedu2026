export interface Course {
  id: string;
  title: string;
  instructor: string;
  instructorImage?: string;
  description: string;
  shortDescription: string;
  price: number;
  originalPrice?: number;
  rating: number;
  reviewCount: number;
  studentCount: number;
  image: string;
  category: string;
  subCategory?: string;
  level: 'Beginner' | 'Intermediate' | 'Advanced';
  duration: string;
  language: string;
  lastUpdated: string;
  createdAt?: string;
  curriculum?: CourseSection[];
  reviews?: Review[];
  whatYouWillLearn?: string[];
  requirements?: string[];
  /** Popular section display */
  isBestSeller?: boolean;
  priceEGP?: number;
  originalPriceEGP?: number;
  lectureCount?: number;
  lectureFrequency?: string;
  deliveryMode?: string;
  popularFilter?: string;
  popularFilterTags?: string[];
}

export interface CourseSection {
  id: string;
  title: string;
  lectures: Lecture[];
}

export interface Lecture {
  id: string;
  title: string;
  duration: string;
  isPreview: boolean;
}

export interface Review {
  id: string;
  userName: string;
  userImage?: string;
  rating: number;
  comment: string;
  date: string;
}

export interface SubCategory {
  id: string;
  name: string;
  courseCount: number;
  icon: string;
}

export interface Category {
  id: string;
  name: string;
  icon: string;
  courseCount: number;
  subCategories?: SubCategory[];
}
