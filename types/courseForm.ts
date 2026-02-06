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
  contentType: "video" | "pdf" | "text";
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
  subcategory: string;
  courseType: string;
  tags: string[];
  students: number;
  lectures: number;
  duration: string;
  attendanceMode: string;
  difficulty: "Beginner" | "Intermediate" | "Advanced";
  thumbnail: File | null;
  thumbnailPreview: string;
  description: string;
  // Pricing in first section (per-currency rows: EGP default, then SAR, USD)
  price: number;
  salePrice?: number;
  originalPrice?: number;
  discountPercentage?: number;
  currency: string;
  pricingModel: "free" | "one-time" | "subscription";
  // EGP (default row)
  priceEGP?: number;
  salePriceEGP?: number;
  discountPercentageEGP?: number;
  // SAR row
  priceSAR?: number;
  salePriceSAR?: number;
  discountPercentageSAR?: number;
  // USD row
  priceUSD?: number;
  salePriceUSD?: number;
  discountPercentageUSD?: number;
  // Structure (Step 2)
  whatYouWillLearn: string;
  whoCanAttend: string;
  credits: string;
  language: string;
  languages: string[];
  modules: CourseModule[];
  // Step 3: Pricing & Enrollment (extras)
  coupons: DiscountCoupon[];
  enrollmentLimit: boolean;
  enrollmentLimitCount?: number;
  completionCertificate: boolean;
}
