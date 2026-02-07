/**
 * Report card definitions for CRM Reports Hub.
 */

export type HighlightTag =
  | "latest"
  | "metric"
  | "attention"
  | "top-source"
  | "conversion";

export interface ReportCard {
  id: string;
  title: string;
  description: string;
  tag: HighlightTag;
  tagLabel: string;
  tagValue: string;
  tagTrend?: "up" | "down" | "neutral";
  icon:
    | "dollar"
    | "atom"
    | "bar-chart"
    | "trend"
    | "clock"
    | "pie"
    | "sparkles";
  pinned?: boolean;
  section: "pinned" | "sales" | "lead";
}

export const reportCards: ReportCard[] = [
  {
    id: "daily-revenue",
    title: "Daily Revenue Snapshot",
    description:
      "Real-time revenue tracking across all active enrollment channels.",
    tag: "latest",
    tagLabel: "LATEST HIGHLIGHT",
    tagValue: "+15% this week",
    tagTrend: "up",
    icon: "dollar",
    pinned: true,
    section: "pinned",
  },
  {
    id: "lead-velocity",
    title: "Lead Velocity Index",
    description:
      "Speed of lead progression from initial inquiry to enrollment.",
    tag: "latest",
    tagLabel: "LATEST HIGHLIGHT",
    tagValue: "4.2 Days Avg",
    icon: "sparkles",
    pinned: true,
    section: "pinned",
  },
  {
    id: "marketing-roi",
    title: "Marketing ROI Map",
    description:
      "Attribution and profitability analysis for digital marketing campaigns.",
    tag: "latest",
    tagLabel: "LATEST HIGHLIGHT",
    tagValue: "3.4x ROI",
    tagTrend: "up",
    icon: "bar-chart",
    pinned: true,
    section: "pinned",
  },
  {
    id: "monthly-revenue",
    title: "Monthly Revenue",
    description: "Breakdown of monthly recurring revenue and one-time fees.",
    tag: "metric",
    tagLabel: "METRIC HIGHLIGHT",
    tagValue: "$428.5k +8.2%",
    tagTrend: "up",
    icon: "dollar",
    section: "sales",
  },
  {
    id: "pipeline-value",
    title: "Pipeline Value",
    description: "Total value of all active deals in the current sales funnel.",
    tag: "metric",
    tagLabel: "METRIC HIGHLIGHT",
    tagValue: "$1.2M Steady",
    tagTrend: "neutral",
    icon: "trend",
    section: "sales",
  },
  {
    id: "conversion-rates",
    title: "Conversion Rates",
    description: "Leads to sales conversion efficiency across branches.",
    tag: "metric",
    tagLabel: "METRIC HIGHLIGHT",
    tagValue: "24.8% +2.1%",
    tagTrend: "up",
    icon: "bar-chart",
    section: "sales",
  },
  {
    id: "refund-velocity",
    title: "Refund Velocity",
    description: "Monitoring credit notes and enrollment cancellations.",
    tag: "metric",
    tagLabel: "METRIC HIGHLIGHT",
    tagValue: "1.2% -0.4%",
    tagTrend: "down",
    icon: "trend",
    section: "sales",
  },
  {
    id: "monthly-conversions",
    title: "Monthly Conversions",
    description: "Overall lead-to-customer conversion velocity metrics.",
    tag: "metric",
    tagLabel: "METRIC HIGHLIGHT",
    tagValue: "+8.2% vs LW",
    tagTrend: "up",
    icon: "trend",
    section: "lead",
  },
  {
    id: "lead-aging",
    title: "Lead Aging Report",
    description: "Time elapsed since lead creation without final status.",
    tag: "attention",
    tagLabel: "ATTENTION REQUIRED",
    tagValue: "12 Days +3d",
    tagTrend: "up",
    icon: "clock",
    section: "lead",
  },
  {
    id: "source-attribution",
    title: "Source Attribution",
    description: "Distribution of leads across organic and paid channels.",
    tag: "top-source",
    tagLabel: "TOP SOURCE",
    tagValue: "Social (42%)",
    icon: "pie",
    section: "lead",
  },
  {
    id: "mql-sql-ratio",
    title: "MQL to SQL Ratio",
    description: "The quality gap between marketing and sales qualifying.",
    tag: "conversion",
    tagLabel: "CONVERSION",
    tagValue: "1:3.4 Improved",
    tagTrend: "up",
    icon: "bar-chart",
    section: "lead",
  },
];

export const dateRangeOptions = [
  { value: "7", label: "Last 7 Days" },
  { value: "30", label: "Last 30 Days" },
  { value: "90", label: "Last 90 Days" },
];

export const assignedTeamOptions = [
  { value: "all", label: "All Teams" },
  { value: "sales", label: "Sales" },
  { value: "marketing", label: "Marketing" },
];

export const courseCategoryOptions = [
  { value: "professional", label: "Professional Certs" },
  { value: "technical", label: "Technical Skills" },
  { value: "soft", label: "Soft Skills" },
];
