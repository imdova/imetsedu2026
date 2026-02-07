/**
 * Data for User Overview tab (dashboard-style).
 */

export interface OverviewKPI {
  title: string;
  value: string;
  change: string;
  trend: "up" | "down";
  subText?: string;
  type: "percent" | "revenue" | "time" | "task";
}

export const overviewKPIs: OverviewKPI[] = [
  { title: "LEAD CONVERSION", value: "12.5%", change: "+2.1%", trend: "up", type: "percent" },
  { title: "CURRENT REVENUE", value: "$45,200", change: "+15%", trend: "up", type: "revenue" },
  { title: "AVG RESPONSE TIME", value: "14 mins", change: "-3%", trend: "down", subText: "Target: < 15 mins", type: "time" },
  { title: "TASK COMPLETION", value: "92%", change: "+5%", trend: "up", type: "task" },
];

export interface HighImpactActivity {
  id: string;
  icon: "check" | "user-plus" | "users";
  title: string;
  description: string;
  tags?: string[];
  time: string;
}

export const recentHighImpactActivities: HighImpactActivity[] = [
  {
    id: "1",
    icon: "check",
    title: "High-value payment verified",
    description: "Verified $2,450.00 enrollment fee for Student #9921 (David Chen).",
    tags: ["Finance", "Priority"],
    time: "14:20 PM",
  },
  {
    id: "2",
    icon: "user-plus",
    title: "Lead Converted to Student",
    description: "Successfully moved Sarah Jenkins from 'Lead' to 'Enrolled' status.",
    time: "11:05 AM",
  },
  {
    id: "3",
    icon: "users",
    title: "Group Onboarding Completed",
    description: "Conducted session for 12 new MBA candidates. Attendance: 100%.",
    time: "Yesterday",
  },
];

export const securityHealth = {
  percent: 98,
  label: "SECURE ACCOUNT",
  lastActive: "2 mins ago",
  twoFaEnabled: true,
};

export const activeStudents = {
  count: 45,
  capacity: 50,
  capacityPct: 90,
  description: "Currently managing 45 active enrollments. Capacity is 50.",
};

export const pendingFollowUps = {
  count: 12,
  description: "12 leads require urgent attention before EOD.",
  priority: "High Priority",
};

export const nextScheduledActivity = {
  date: "14 OCT",
  title: "Weekly Team Sync",
  description: "Strategy & Goal Alignment",
  time: "2:00 PM (In 40m)",
};

export const operationalVitality = {
  profileStrength: 85,
  customerRating: 4.8,
};
