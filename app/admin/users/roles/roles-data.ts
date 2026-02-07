/**
 * Data for Roles and Permissions page.
 */

export interface RoleItem {
  id: string;
  name: string;
  icon: string; // lucide icon name
}

export const SYSTEM_ROLES: RoleItem[] = [
  { id: "senior-admin", name: "Senior Admin", icon: "shield" },
  { id: "course-manager", name: "Course Manager", icon: "graduation-cap" },
  { id: "sales-agent", name: "Sales Agent", icon: "user-search" },
  { id: "finance-officer", name: "Finance Officer", icon: "dollar-sign" },
  { id: "support-staff", name: "Support Staff", icon: "headphones" },
];

export const ACTIVE_ROLES_COUNT = 12;

/** Departments for Create New Role modal */
export const ROLE_DEPARTMENTS = [
  "Admissions & Enrollment",
  "IT Management",
  "Marketing",
  "Student Services",
  "Finance",
  "Operations",
];

/** Smart icon accent: orange, blue, green, purple, red */
export type ModuleIconColor = "orange" | "blue" | "green" | "purple" | "red";

export interface ModulePermission {
  id: string;
  name: string;
  icon: string;
  iconColor: ModuleIconColor;
  description: string;
  view: boolean;
  create: boolean;
  edit: boolean;
  delete: boolean;
  /** Optional: e.g. "EXPORT ONLY" with checkbox in EDIT column */
  editExtra?: { label: string; checked: boolean };
}

export interface RoleConfig {
  roleId: string;
  roleName: string;
  subtitle: string;
  description: string;
  modules: ModulePermission[];
  systemSettings: { label: string; enabled: boolean }[];
  notificationPermissions: { label: string; enabled: boolean }[];
  lastUpdated: string;
}

export const DEFAULT_ROLE_CONFIG: RoleConfig = {
  roleId: "senior-admin",
  roleName: "Senior Admin",
  subtitle: "Configure granular access levels for the core academy modules.",
  description:
    "Full system access. Can manage all staff members, financial records, and academic settings. Responsible for oversight and final approval of course curriculum.",
  modules: [
    {
      id: "leads-crm",
      name: "Leads & CRM",
      icon: "user-plus",
      iconColor: "orange",
      description: "Manage student inquiries and pipelines",
      view: true,
      create: true,
      edit: true,
      delete: true,
    },
    {
      id: "courses",
      name: "Courses Management",
      icon: "file-text",
      iconColor: "blue",
      description: "Course catalog and curriculum settings",
      view: true,
      create: true,
      edit: true,
      delete: false,
    },
    {
      id: "payments",
      name: "Payments & Revenue",
      icon: "dollar-sign",
      iconColor: "green",
      description: "Financial transactions and invoicing",
      view: true,
      create: true,
      edit: false,
      delete: false,
    },
    {
      id: "user-mgmt",
      name: "User Management",
      icon: "users",
      iconColor: "purple",
      description: "System users and staff accounts",
      view: true,
      create: true,
      edit: true,
      delete: true,
    },
    {
      id: "reports",
      name: "Reports & Analytics",
      icon: "bar-chart-3",
      iconColor: "red",
      description: "Export data and view performance metrics",
      view: true,
      create: false,
      edit: false,
      delete: false,
      editExtra: { label: "EXPORT ONLY:", checked: true },
    },
  ],
  systemSettings: [
    { label: "Access Global Configuration", enabled: true },
    { label: "Manage Third-Party Integrations", enabled: false },
  ],
  notificationPermissions: [
    { label: "Receive High-Priority Alerts", enabled: true },
    { label: "Approve Bulk Email Campaigns", enabled: true },
  ],
  lastUpdated: "Last updated by Admin (Alex J.) on Oct 24, 2023, 14:30",
};

export function getRoleConfig(roleId: string): RoleConfig {
  const nameMap: Record<string, string> = {
    "senior-admin": "Senior Admin",
    "course-manager": "Course Manager",
    "sales-agent": "Sales Agent",
    "finance-officer": "Finance Officer",
    "support-staff": "Support Staff",
  };
  const name = nameMap[roleId] ?? "Senior Admin";
  return {
    ...DEFAULT_ROLE_CONFIG,
    roleId,
    roleName: name,
  };
}
