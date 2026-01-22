export interface CourseModule {
  id: string;
  title: string;
  order: number;
  lessons: CourseLesson[];
}

export interface CourseLesson {
  id: string;
  title: string;
  order: number;
  contentType: 'video' | 'pdf' | 'text';
  contentUrl?: string;
  fileName?: string;
  isPreview: boolean;
  duration?: string;
}

export interface DiscountCoupon {
  id: string;
  code: string;
  discount: number;
  expiryDate: string;
}

export interface CourseFormData {
  // Step 1: Basic Info
  title: string;
  category: string;
  difficulty: 'Beginner' | 'Intermediate' | 'Advanced';
  thumbnail: File | null;
  thumbnailPreview: string;
  description: string;
  
  // Step 2: Curriculum
  modules: CourseModule[];
  
  // Step 3: Pricing & Enrollment
  pricingModel: 'free' | 'one-time' | 'subscription';
  currency: string;
  price: number;
  coupons: DiscountCoupon[];
  enrollmentLimit: boolean;
  enrollmentLimitCount?: number;
  completionCertificate: boolean;
}
