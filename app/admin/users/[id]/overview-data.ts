/**
 * Mock data for User Overview page: permissions, KPI, recent activity.
 */

export interface PermissionRow {
  moduleName: string;
  read: boolean;
  write: boolean;
  delete: boolean;
  export: boolean;
}

export interface UserKPI {
  revenueActual: number;
  revenueTarget: number;
  leadConversionPercent: number;
  activeDeals: number;
  callsToday: number;
}

export interface RecentActivityItem {
  id: string;
  label: string;
  timestamp: string;
  type: "login" | "lead" | "proposal" | "other";
}

function defaultPermissions(userId: string): PermissionRow[] {
  const isAdmin = userId === "1";
  return [
    {
      moduleName: "Leads & Opportunities",
      read: true,
      write: true,
      delete: isAdmin,
      export: true,
    },
    {
      moduleName: "Financial Records",
      read: true,
      write: isAdmin,
      delete: false,
      export: isAdmin,
    },
    {
      moduleName: "Staff Management",
      read: isAdmin,
      write: isAdmin,
      delete: isAdmin,
      export: isAdmin,
    },
    {
      moduleName: "Courses & LMS",
      read: true,
      write: true,
      delete: false,
      export: true,
    },
    {
      moduleName: "Reports",
      read: true,
      write: false,
      delete: false,
      export: true,
    },
  ];
}

function defaultKPI(): UserKPI {
  return {
    revenueActual: 125000,
    revenueTarget: 150000,
    leadConversionPercent: 12.5,
    activeDeals: 24,
    callsToday: 18,
  };
}

function defaultRecentActivity(): RecentActivityItem[] {
  return [
    {
      id: "1",
      label: "System Login",
      timestamp: "Today at 08:45 AM",
      type: "login",
    },
    {
      id: "2",
      label: "Updated Lead: Acme Corp",
      timestamp: "Yesterday at 04:20 PM",
      type: "lead",
    },
    {
      id: "3",
      label: "Sent Proposal #4592",
      timestamp: "Oct 24, 2023 at 11:10 AM",
      type: "proposal",
    },
  ];
}

export function getPermissionsForUser(userId: string): PermissionRow[] {
  return defaultPermissions(userId);
}

export function getKPIForUser(_userId: string): UserKPI {
  return defaultKPI();
}

export function getRecentActivityForUser(
  _userId: string
): RecentActivityItem[] {
  return defaultRecentActivity();
}
