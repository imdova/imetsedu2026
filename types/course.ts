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
  level: 'Beginner' | 'Intermediate' | 'Advanced';
  duration: string;
  language: string;
  lastUpdated: string;
  curriculum?: CourseSection[];
  reviews?: Review[];
  whatYouWillLearn?: string[];
  requirements?: string[];
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

export interface Category {
  id: string;
  name: string;
  icon: string;
  courseCount: number;
}
