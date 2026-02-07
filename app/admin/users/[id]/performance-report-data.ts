/**
 * Data for Performance Report tab (User Overview).
 */

export interface PerformanceKPI {
  label: string;
  value: string | number;
  comparison: string;
  trend: "up" | "down" | "neutral";
}

export const performanceKPIs: PerformanceKPI[] = [
  {
    label: "Leads Handled",
    value: 450,
    comparison: "vs. 442 last month",
    trend: "neutral",
  },
  {
    label: "Total Enrollments",
    value: 82,
    comparison: "↑ 12% from last month",
    trend: "up",
  },
  {
    label: "Conversion Rate",
    value: "18.2%",
    comparison: "↑ 5% increase",
    trend: "up",
  },
  {
    label: "Revenue Generated",
    value: "$45,000",
    comparison: "↓ 2.4% decrease",
    trend: "down",
  },
];

export const monthlyTargetActual = [
  { month: "JAN", target: 70, actual: 65 },
  { month: "FEB", target: 75, actual: 72 },
  { month: "MAR", target: 80, actual: 78 },
  { month: "APR", target: 85, actual: 82 },
  { month: "MAY", target: 90, actual: 85 },
  { month: "JUN", target: 94, actual: 94 },
];

export const targetAchievementPercent = 85;

export const activityBreakdown = [
  { week: "Week 1", calls: 180, whatsapp: 120, followups: 95 },
  { week: "Week 2", calls: 210, whatsapp: 145, followups: 110 },
  { week: "Week 3", calls: 195, whatsapp: 160, followups: 125 },
  { week: "Week 4 (Current)", calls: 220, whatsapp: 175, followups: 140 },
];

export const activityBreakdownTotal = 1240;

export const conversionFunnelStages = [
  {
    stage: "Inquiry",
    percent: 100,
    leads: 450,
    drop: "Base",
    color: "#007bff",
  },
  {
    stage: "Contacted",
    percent: 78,
    leads: 351,
    drop: "-22% drop",
    color: "#5a9eff",
  },
  {
    stage: "Qualified",
    percent: 42,
    leads: 189,
    drop: "-36% drop",
    color: "#8bb8ff",
  },
  {
    stage: "Enrolled",
    percent: 18,
    leads: 82,
    drop: "Final",
    color: "#28a745",
  },
];

export interface WeeklyPerformanceRow {
  week: string;
  leads: number;
  conversations: number;
  enrollments: number;
  conversionPct: number;
  status: "TARGET MET" | "AVERAGE" | "HIGH PERFORMER";
}

export const weeklyPerformanceRows: WeeklyPerformanceRow[] = [
  {
    week: "Week 1",
    leads: 112,
    conversations: 85,
    enrollments: 20,
    conversionPct: 17.8,
    status: "TARGET MET",
  },
  {
    week: "Week 2",
    leads: 108,
    conversations: 78,
    enrollments: 18,
    conversionPct: 16.6,
    status: "AVERAGE",
  },
  {
    week: "Week 3",
    leads: 115,
    conversations: 92,
    enrollments: 22,
    conversionPct: 19.1,
    status: "HIGH PERFORMER",
  },
  {
    week: "Week 4",
    leads: 115,
    conversations: 95,
    enrollments: 22,
    conversionPct: 19.1,
    status: "TARGET MET",
  },
];

export interface TopCourse {
  name: string;
  sales: number;
  color: string;
}

export const topCoursesSold: TopCourse[] = [
  { name: "Global MBA", sales: 34, color: "#007bff" },
  { name: "Data Science MSc", sales: 21, color: "#28a745" },
  { name: "Digital Marketing", sales: 15, color: "#fd7e14" },
  { name: "Applied Psychology", sales: 12, color: "#6f42c1" },
];

export const maxCourseSales = 34;

export const performanceInsightText =
  "John's conversion rate is 5% higher than the team average this month. Consider assigning him high-value MBA inquiries.";
