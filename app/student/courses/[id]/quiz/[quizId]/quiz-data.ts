/**
 * Mock data for Student Quiz page - matches design.
 */

export interface QuizQuestion {
  id: string;
  type: "multiple_choice";
  question: string;
  options: string[];
  correctIndex: number;
  learningInsight?: string;
}

export interface QuizAttemptData {
  quizId: string;
  courseId: string;
  title: string;
  feedbackTitle?: string;
  totalQuestions: number;
  timeLimitMinutes: number;
  passingPct?: number;
  questions: QuizQuestion[];
}

const midTermQuestions: QuizQuestion[] = [
  {
    id: "q1",
    type: "multiple_choice",
    question: "What is the SI unit of force?",
    options: ["Joule", "Newton", "Pascal", "Watt"],
    correctIndex: 1,
    learningInsight:
      "The newton (N) is the SI unit of force, defined as the force required to accelerate 1 kg at 1 m/s².",
  },
  {
    id: "q2",
    type: "multiple_choice",
    question:
      "Which law states that every action has an equal and opposite reaction?",
    options: [
      "Newton's First Law",
      "Newton's Second Law",
      "Newton's Third Law",
      "Law of Conservation of Energy",
    ],
    correctIndex: 2,
    learningInsight:
      "Newton's Third Law states that for every action there is an equal and opposite reaction.",
  },
  {
    id: "q3",
    type: "multiple_choice",
    question: "What is the formula for kinetic energy?",
    options: ["mgh", "½mv²", "Fd", "PV"],
    correctIndex: 1,
    learningInsight:
      "Kinetic energy is ½mv² where m is mass and v is velocity.",
  },
  {
    id: "q4",
    type: "multiple_choice",
    question: "What is the principle of conservation of energy?",
    options: [
      "Energy can be created and destroyed in a closed system under specific conditions.",
      "Energy remains constant and can only be transformed from one form to another.",
      "Total energy in the universe is gradually decreasing due to heat loss.",
      "Energy transformations always result in a net gain of power for the observer.",
    ],
    correctIndex: 1,
  },
  {
    id: "q5",
    type: "multiple_choice",
    question:
      "What is the acceleration due to gravity on Earth (approximately)?",
    options: ["8.9 m/s²", "9.8 m/s²", "10.2 m/s²", "11.0 m/s²"],
    correctIndex: 1,
  },
  {
    id: "q6",
    type: "multiple_choice",
    question: "Which type of wave does not require a medium to travel?",
    options: [
      "Sound wave",
      "Seismic wave",
      "Electromagnetic wave",
      "Water wave",
    ],
    correctIndex: 2,
  },
  {
    id: "q7",
    type: "multiple_choice",
    question: "What is the unit of electric current?",
    options: ["Volt", "Ohm", "Ampere", "Coulomb"],
    correctIndex: 2,
  },
  {
    id: "q8",
    type: "multiple_choice",
    question: "According to quantum mechanics, light exhibits properties of:",
    options: [
      "Only waves",
      "Only particles",
      "Both waves and particles",
      "Neither waves nor particles",
    ],
    correctIndex: 2,
  },
  {
    id: "q9",
    type: "multiple_choice",
    question: "What does the first law of thermodynamics state?",
    options: [
      "Entropy always increases.",
      "Energy cannot be created or destroyed, only transformed.",
      "Absolute zero is unattainable.",
      "Heat flows from cold to hot.",
    ],
    correctIndex: 1,
  },
  {
    id: "q10",
    type: "multiple_choice",
    question: "What is the speed of light in a vacuum (approximately)?",
    options: ["2.5 × 10⁸ m/s", "3 × 10⁸ m/s", "3.5 × 10⁸ m/s", "4 × 10⁸ m/s"],
    correctIndex: 1,
  },
];

export function getQuizData(
  courseId: string,
  quizId: string
): QuizAttemptData | null {
  return {
    quizId,
    courseId,
    title: "MID-TERM: ADVANCED PHYSICS",
    feedbackTitle: "Quiz: Module 2 Knowledge Check",
    totalQuestions: 10,
    passingPct: 70,
    timeLimitMinutes: 60,
    questions: midTermQuestions,
  };
}

export const DEFAULT_QUIZ_ID = "midterm-advanced-physics";
