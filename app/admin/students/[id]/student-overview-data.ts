/**
 * Student overview tab – academic, contact, financial, timeline, documents.
 */

export interface StudentOverviewData {
  currentCourse: string;
  batchGroup: string;
  intake: string;
  progressPercent: number;
  phone: string;
  assignedAdvisor: string;
  totalPaid: number;
  totalDue: number;
  outstanding: number;
  documents: { name: string; url: string }[];
  timeline: {
    type: "payment" | "whatsapp" | "quiz";
    title: string;
    detail: string;
    time: string;
  }[];
}

const overviewByStudentId: Record<string, StudentOverviewData> = {
  "1": {
    currentCourse: "B.Sc Computer Science",
    batchGroup: "Group A - Morning Shift",
    intake: "Spring 2024",
    progressPercent: 45,
    phone: "+1 234 567 890",
    assignedAdvisor: "Sarah Mitchell",
    totalPaid: 4250,
    totalDue: 5000,
    outstanding: 750,
    documents: [
      { name: "Passport.pdf", url: "#" },
      { name: "Transcript.jpg", url: "#" },
    ],
    timeline: [
      {
        type: "payment",
        title: "Payment Verified",
        detail: "Installment #2 received via Stripe.",
        time: "10:45 AM",
      },
      {
        type: "whatsapp",
        title: "WhatsApp Received",
        detail: '"Confirming my attendance for the workshop."',
        time: "Yesterday",
      },
      {
        type: "quiz",
        title: "Quiz Completed",
        detail: "Score: 92/100 in CS-101 Programming.",
        time: "Oct 12",
      },
    ],
  },
  "2": {
    currentCourse: "MBA Executive",
    batchGroup: "Group B - Evening",
    intake: "Fall 2023",
    progressPercent: 72,
    phone: "+966 50 123 4567",
    assignedAdvisor: "Ahmed Hassan",
    totalPaid: 6000,
    totalDue: 7500,
    outstanding: 1500,
    documents: [
      { name: "ID.pdf", url: "#" },
      { name: "Degree.pdf", url: "#" },
    ],
    timeline: [
      {
        type: "payment",
        title: "Payment Verified",
        detail: "Full semester fee received.",
        time: "2 days ago",
      },
      {
        type: "quiz",
        title: "Quiz Completed",
        detail: "Module 3 assessment: 88/100.",
        time: "Oct 10",
      },
    ],
  },
};

const defaultOverview: StudentOverviewData = {
  currentCourse: "—",
  batchGroup: "—",
  intake: "—",
  progressPercent: 0,
  phone: "—",
  assignedAdvisor: "—",
  totalPaid: 0,
  totalDue: 0,
  outstanding: 0,
  documents: [],
  timeline: [],
};

export function getStudentOverview(studentId: string): StudentOverviewData {
  return overviewByStudentId[studentId] ?? defaultOverview;
}
