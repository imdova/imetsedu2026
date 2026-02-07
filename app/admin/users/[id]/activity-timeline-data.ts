/**
 * Timeline-style activity entries for the Activity Log tab (User Overview).
 */

export type ActivityDateGroup = "today" | "yesterday";

export type ActivityCardIcon = "user" | "shield" | "payment" | "login" | "doc";

export type ActivityCardVariant = "default" | "warning";

export interface ActivityTimelineEntry {
  id: string;
  dateGroup: ActivityDateGroup;
  icon: ActivityCardIcon;
  module: string;
  time: string;
  ip: string;
  /** Optional badge before description (e.g. HIGHSECURITY) */
  badge?: string;
  /** Main description; use {{link}} for clickable link, {{amount}} for green amount, {{badge}} for status badge */
  description: string;
  /** Text to show as link in description (replaces {{link}}) */
  linkText?: string;
  /** Status badge text (e.g. Warm, Cold) - renders as orange pill */
  statusBadge?: string;
  /** Amount in green (e.g. $1,200.00) */
  amount?: string;
  variant?: ActivityCardVariant;
  actionLabel: string;
  actionIcon: "arrow" | "external" | "none";
}

export const activityTimelineEntries: ActivityTimelineEntry[] = [
  {
    id: "1",
    dateGroup: "today",
    icon: "user",
    module: "CRM",
    time: "14:22:10",
    ip: "192.168.1.45",
    description: "Updated status for Lead: {{link}} from Cold to {{badge}}",
    linkText: "Sarah Jenkins",
    statusBadge: "Warm",
    variant: "default",
    actionLabel: "View Details",
    actionIcon: "arrow",
  },
  {
    id: "2",
    dateGroup: "today",
    icon: "shield",
    module: "Security",
    time: "09:15:22",
    ip: "192.168.1.45",
    badge: "HIGHSECURITY",
    description:
      "Administrative Permissions Granted. Full administrative access was assigned to user {{link}} by System Root.",
    linkText: "John Doe",
    variant: "warning",
    actionLabel: "Investigate",
    actionIcon: "arrow",
  },
  {
    id: "3",
    dateGroup: "yesterday",
    icon: "payment",
    module: "Finance",
    time: "18:30:05",
    ip: "192.168.1.45",
    description: "Processed Payment: {{amount}} for Invoice {{link}}",
    amount: "$1,200.00",
    linkText: "#9982",
    variant: "default",
    actionLabel: "View Receipt",
    actionIcon: "external",
  },
  {
    id: "4",
    dateGroup: "yesterday",
    icon: "login",
    module: "System",
    time: "08:00:01",
    ip: "192.168.1.45",
    description: "System Login: Web Browser (Chrome/macOS)",
    variant: "default",
    actionLabel: "Session Info",
    actionIcon: "none",
  },
];

export const activityFilterOptions = [
  { value: "all", label: "All" },
  { value: "crm", label: "CRM" },
  { value: "security", label: "Security" },
  { value: "finance", label: "Finance" },
  { value: "system", label: "System" },
];

export const moduleFilterOptions = [
  { value: "all", label: "All Modules" },
  { value: "crm", label: "CRM" },
  { value: "security", label: "Security" },
  { value: "finance", label: "Finance" },
  { value: "system", label: "System" },
];

export const dateRangeOptions = [
  { value: "7", label: "Last 7 Days" },
  { value: "30", label: "Last 30 Days" },
  { value: "90", label: "Last 90 Days" },
];
