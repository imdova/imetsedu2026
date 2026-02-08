/**
 * Mock data for instructor detail page.
 */

export interface InstructorDetailData {
  id: string;
  name: string;
  role: string;
  department: string;
  employeeId: string;
  joinedDate: string;
  image?: string;
  isOnline: boolean;
  studentsTaught: number;
  studentsTaughtTrend: string;
  avgRating: number;
  avgRatingTrend: string;
  completionRate: number;
  completionRateTrend: string;
  sessionAttendance: number;
  sessionAttendanceTrend: string;
  sessionAttendanceTrendUp: boolean;
  bio: string;
  certifications: string[];
  documents: { name: string; size: string; verified?: boolean }[];
  assignedCohorts: {
    id: string;
    cohortName: string;
    program: string;
    students: number;
    status: "IN PROGRESS" | "STARTING SOON" | "COMPLETED";
  }[];
  /** Assigned Groups tab: full cohort list with period, capacity, attendance */
  assignedGroupsTab: {
    totalActiveGroups: number;
    totalActiveGroupsTrend: string;
    currentStudentReach: number;
    capacityUtilization: number;
    cohorts: {
      id: string;
      groupName: string;
      courseTitle: string;
      periodStart: string;
      periodEnd: string;
      studentsCurrent: number;
      studentsMax: number;
      attendancePercent: number | null;
      status: "Active" | "Upcoming" | "Completed";
    }[];
    totalAssignedGroups: number;
    /** Sidebar when on Assigned Groups tab */
    workloadWeeklyHours: number;
    workloadMaxHours: number;
    workloadDeptAvgHours: number;
    workloadDeptMaxHours: number;
    groupDistribution: { label: string; percent: number; color: "active" | "upcoming" | "completed" }[];
    workloadInsight: string;
  };
  workloadPercent: number;
  workloadLabel: string;
  teachingHours: number;
  teachingHoursMax: number;
  gradingPending: number;
  nextPayoutDate: string;
  nextPayoutAmount: string;
  /** Feedback & Reviews tab */
  feedbackTab: {
    overallRating: number;
    totalReviews: number;
    sentiment: { positive: number; neutral: number; negative: number };
    smartInsights: {
      strength: string;
      strengthHighlight: string;
      growth: string;
      growthHighlight: string;
      growthSuffix: string;
      tip: string;
    };
    categoryScores: { name: string; score: number }[];
    coursePerformance: { courseName: string; score: number; icon: string }[];
    recentReviews: {
      id: string;
      reviewerName: string;
      reviewerAvatar?: string;
      course: string;
      rating: number;
      date: string;
      strengths: string;
      weaknesses: string;
    }[];
  };
}

export function getInstructorDetail(id: string): InstructorDetailData | null {
  const data: InstructorDetailData = {
    id: "1",
    name: "Dr. Sarah Chen",
    role: "Senior Faculty",
    department: "Department of Civil Engineering & Structures",
    employeeId: "IM-90210",
    joinedDate: "Aug 2021",
    image: "https://i.pravatar.cc/120?img=1",
    isOnline: true,
    studentsTaught: 1240,
    studentsTaughtTrend: "+12%",
    avgRating: 4.9,
    avgRatingTrend: "+0.2%",
    completionRate: 94,
    completionRateTrend: "+3%",
    sessionAttendance: 98,
    sessionAttendanceTrend: "-1%",
    sessionAttendanceTrendUp: false,
    bio: "Dr. Sarah Jenkins is a structural engineering specialist with over 15 years of experience in academia and industry. She specializes in earthquake-resistant design and sustainable urban infrastructure. Dr. Jenkins is recognized for her pedagogical innovation and has led multiple curriculum development initiatives.",
    certifications: [
      "PhD Structural Engineering",
      "LEED Accredited Professional",
      "CPE Licensed Engineer",
      "Advanced Pedagogy Certificate",
    ],
    documents: [
      { name: "Curriculum Vitae_2024.pdf", size: "2.4 MB" },
      { name: "PhD_Verification_Records.pdf", size: "1.1 MB", verified: true },
    ],
    assignedCohorts: [
      {
        id: "1",
        cohortName: "STRUC-CO-24-A",
        program: "Advanced Bridge Design",
        students: 42,
        status: "IN PROGRESS",
      },
      {
        id: "2",
        cohortName: "ENGR-99-B",
        program: "Engineering Ethics 101",
        students: 128,
        status: "STARTING SOON",
      },
    ],
    assignedGroupsTab: {
      totalActiveGroups: 8,
      totalActiveGroupsTrend: "+2 from last term",
      currentStudentReach: 224,
      capacityUtilization: 92,
      totalAssignedGroups: 12,
      cohorts: [
        {
          id: "1",
          groupName: "MBA-JAN-24-B",
          courseTitle: "Advanced Business Strategy",
          periodStart: "Jan 01",
          periodEnd: "Jun 30, 2024",
          studentsCurrent: 28,
          studentsMax: 30,
          attendancePercent: 94.5,
          status: "Active",
        },
        {
          id: "2",
          groupName: "CS-APR-24-A",
          courseTitle: "Machine Learning Fundamentals",
          periodStart: "Apr 15",
          periodEnd: "Aug 20, 2024",
          studentsCurrent: 22,
          studentsMax: 25,
          attendancePercent: null,
          status: "Upcoming",
        },
        {
          id: "3",
          groupName: "DS-SEP-23-C",
          courseTitle: "Data Visualization & BI",
          periodStart: "Sep 10",
          periodEnd: "Dec 15, 2023",
          studentsCurrent: 30,
          studentsMax: 30,
          attendancePercent: 89.2,
          status: "Completed",
        },
        {
          id: "4",
          groupName: "MKT-JAN-24-A",
          courseTitle: "Digital Marketing Strategy",
          periodStart: "Jan 05",
          periodEnd: "May 20, 2024",
          studentsCurrent: 32,
          studentsMax: 35,
          attendancePercent: 92.1,
          status: "Active",
        },
        {
          id: "5",
          groupName: "FIN-MAR-24-B",
          courseTitle: "Corporate Finance",
          periodStart: "Mar 01",
          periodEnd: "Jul 15, 2024",
          studentsCurrent: 25,
          studentsMax: 30,
          attendancePercent: 91,
          status: "Active",
        },
        {
          id: "6",
          groupName: "OPS-APR-24-A",
          courseTitle: "Operations Management",
          periodStart: "Apr 10",
          periodEnd: "Aug 30, 2024",
          studentsCurrent: 18,
          studentsMax: 25,
          attendancePercent: null,
          status: "Upcoming",
        },
        {
          id: "7",
          groupName: "HR-JAN-24-C",
          courseTitle: "Strategic HR",
          periodStart: "Jan 15",
          periodEnd: "May 25, 2024",
          studentsCurrent: 28,
          studentsMax: 28,
          attendancePercent: 88.5,
          status: "Completed",
        },
        {
          id: "8",
          groupName: "PM-SEP-23-A",
          courseTitle: "Project Management",
          periodStart: "Sep 05",
          periodEnd: "Dec 20, 2023",
          studentsCurrent: 30,
          studentsMax: 30,
          attendancePercent: 90,
          status: "Completed",
        },
        {
          id: "9",
          groupName: "QM-FEB-24-A",
          courseTitle: "Quality Management",
          periodStart: "Feb 01",
          periodEnd: "Jun 15, 2024",
          studentsCurrent: 22,
          studentsMax: 28,
          attendancePercent: 93,
          status: "Active",
        },
        {
          id: "10",
          groupName: "SCM-MAY-24-B",
          courseTitle: "Supply Chain",
          periodStart: "May 01",
          periodEnd: "Sep 10, 2024",
          studentsCurrent: 0,
          studentsMax: 25,
          attendancePercent: null,
          status: "Upcoming",
        },
        {
          id: "11",
          groupName: "ENT-JAN-24-A",
          courseTitle: "Entrepreneurship",
          periodStart: "Jan 10",
          periodEnd: "Apr 30, 2024",
          studentsCurrent: 24,
          studentsMax: 24,
          attendancePercent: 87,
          status: "Completed",
        },
        {
          id: "12",
          groupName: "LD-OCT-24-A",
          courseTitle: "Leadership Development",
          periodStart: "Oct 01",
          periodEnd: "Feb 28, 2025",
          studentsCurrent: 20,
          studentsMax: 30,
          attendancePercent: null,
          status: "Upcoming",
        },
      ],
      workloadWeeklyHours: 24,
      workloadMaxHours: 40,
      workloadDeptAvgHours: 18,
      workloadDeptMaxHours: 40,
      groupDistribution: [
        { label: "Active", percent: 50, color: "active" },
        { label: "Upcoming", percent: 25, color: "upcoming" },
        { label: "Completed", percent: 25, color: "completed" },
      ],
      workloadInsight:
        "Your workload is 33% higher than the department average this term. Consider delegating grading for CS-APR-24-A.",
    },
    workloadPercent: 85,
    workloadLabel: "HIGH CAPACITY",
    teachingHours: 32,
    teachingHoursMax: 40,
    gradingPending: 14,
    nextPayoutDate: "Dec 31, 2024",
    nextPayoutAmount: "$8,450.00",
    feedbackTab: {
      overallRating: 4.8,
      totalReviews: 124,
      sentiment: { positive: 85, neutral: 10, negative: 5 },
      smartInsights: {
        strength: "Frequently praised for use of",
        strengthHighlight: "real-world case studies",
        growth: "Improvement noted in",
        growthHighlight: "response time",
        growthSuffix: "scores (+12%) since April.",
        tip: "Consider providing more concise feedback on midterm exams to address minor student concerns.",
      },
      categoryScores: [
        { name: "CLARITY", score: 4.9 },
        { name: "ENGAGEMENT", score: 4.2 },
        { name: "KNOWLEDGE", score: 4.8 },
        { name: "SUPPORT", score: 4.5 },
      ],
      coursePerformance: [
        { courseName: "Logistics Mgmt", score: 4.92, icon: "truck" },
        { courseName: "Supply Ethics", score: 4.75, icon: "building" },
        { courseName: "Inventory Ctrl", score: 4.6, icon: "clipboard" },
      ],
      recentReviews: [
        {
          id: "1",
          reviewerName: "Alex Thompson",
          reviewerAvatar: "https://i.pravatar.cc/48?img=11",
          course: "Advanced Logistics Management",
          rating: 5,
          date: "JUNE 12, 2024",
          strengths:
            "Dr. Sarah uses incredible real-world examples that made complex supply chain concepts click. The case studies from her industry experience were the highlight of the course.",
          weaknesses:
            "The grading turnaround on the first two assignments was a bit slow. Would have helped to get feedback sooner while the material was still fresh.",
        },
        {
          id: "2",
          reviewerName: "Jordan Lee",
          reviewerAvatar: "https://i.pravatar.cc/48?img=12",
          course: "Supply Chain Ethics",
          rating: 5,
          date: "JUNE 8, 2024",
          strengths:
            "Clear explanations and very responsive in office hours. The weekly Q&A sessions were invaluable.",
          weaknesses:
            "Some readings felt redundant with the lecture content. Could trim a few to reduce workload.",
        },
      ],
    },
  };

  return id === data.id ? data : null;
}
