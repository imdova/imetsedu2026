export interface Quiz {
  id: string;
  title: string;
  description: string;
  courseId: string;
  courseName?: string;
  duration: number; // in minutes
  passingScore: number; // percentage
  maxAttempts: number;
  isPublished: boolean;
  createdAt: string;
  updatedAt: string;
  questions: Question[];
}

export interface Question {
  id: string;
  quizId: string;
  questionText: string;
  questionType: 'multiple-choice' | 'true-false' | 'short-answer' | 'essay';
  options?: string[];
  correctAnswer: string | string[];
  points: number;
  explanation?: string;
  order: number;
}

export interface QuizAttempt {
  id: string;
  quizId: string;
  studentId: string;
  answers: Record<string, string | string[]>;
  score: number;
  isPassed: boolean;
  startedAt: string;
  completedAt?: string;
}
