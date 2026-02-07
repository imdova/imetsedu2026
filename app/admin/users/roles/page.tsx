"use client";

import { useState, useMemo, useEffect } from "react";
import {
  Shield,
  GraduationCap,
  UserSearch,
  DollarSign,
  Headphones,
  UserPlus,
  FileText,
  Users,
  BarChart3,
  Filter,
  Plus,
  ClipboardList,
  Copy,
  Bell,
  Save,
  Info,
  X,
  UsersRound,
} from "lucide-react";
import {
  SYSTEM_ROLES,
  ACTIVE_ROLES_COUNT,
  getRoleConfig,
  DEFAULT_ROLE_CONFIG,
  ROLE_DEPARTMENTS,
  type ModulePermission,
} from "./roles-data";
import "./roles.css";

const ICONS: Record<
  string,
  React.ComponentType<{ className?: string; strokeWidth?: number }>
> = {
  shield: Shield,
  "graduation-cap": GraduationCap,
  "user-search": UserSearch,
  "dollar-sign": DollarSign,
  headphones: Headphones,
  "user-plus": UserPlus,
  "file-text": FileText,
  users: Users,
  "bar-chart-3": BarChart3,
};

export default function RolesAndPermissionsPage() {
  const [selectedRoleId, setSelectedRoleId] = useState(SYSTEM_ROLES[0].id);
  const [roleFilter, setRoleFilter] = useState("");
  const [description, setDescription] = useState(
    DEFAULT_ROLE_CONFIG.description
  );
  const [modules, setModules] = useState<ModulePermission[]>(() =>
    JSON.parse(JSON.stringify(DEFAULT_ROLE_CONFIG.modules))
  );
  const [systemSettings, setSystemSettings] = useState<
    { label: string; enabled: boolean }[]
  >(() => JSON.parse(JSON.stringify(DEFAULT_ROLE_CONFIG.systemSettings)));
  const [notificationPerms, setNotificationPerms] = useState<
    { label: string; enabled: boolean }[]
  >(() =>
    JSON.parse(JSON.stringify(DEFAULT_ROLE_CONFIG.notificationPermissions))
  );
  const [lastUpdated, setLastUpdated] = useState(
    DEFAULT_ROLE_CONFIG.lastUpdated
  );

  const [createModalOpen, setCreateModalOpen] = useState(false);
  const [newRoleTitle, setNewRoleTitle] = useState("");
  const [newRoleDepartment, setNewRoleDepartment] = useState(
    ROLE_DEPARTMENTS[0]
  );
  const [responsibleForOtherRoles, setResponsibleForOtherRoles] =
    useState(false);

  const config = useMemo(() => getRoleConfig(selectedRoleId), [selectedRoleId]);

  useEffect(() => {
    setDescription(config.description);
    setModules(JSON.parse(JSON.stringify(config.modules)));
    setSystemSettings(JSON.parse(JSON.stringify(config.systemSettings)));
    setNotificationPerms(
      JSON.parse(JSON.stringify(config.notificationPermissions))
    );
    setLastUpdated(config.lastUpdated);
  }, [config]);

  const filteredRoles = useMemo(
    () =>
      SYSTEM_ROLES.filter((r) =>
        r.name.toLowerCase().includes(roleFilter.toLowerCase())
      ),
    [roleFilter]
  );

  const handleModulePermission = (
    moduleId: string,
    field: "view" | "create" | "edit" | "delete",
    value: boolean
  ) => {
    setModules((prev) =>
      prev.map((m) => (m.id === moduleId ? { ...m, [field]: value } : m))
    );
  };

  const handleEditExtra = (moduleId: string, checked: boolean) => {
    setModules((prev) =>
      prev.map((m) =>
        m.id === moduleId && m.editExtra
          ? { ...m, editExtra: { ...m.editExtra, checked } }
          : m
      )
    );
  };

  const handleSystemSetting = (index: number, enabled: boolean) => {
    setSystemSettings((prev) =>
      prev.map((s, i) => (i === index ? { ...s, enabled } : s))
    );
  };

  const handleNotificationPerm = (index: number, enabled: boolean) => {
    setNotificationPerms((prev) =>
      prev.map((s, i) => (i === index ? { ...s, enabled } : s))
    );
  };

  const handleDiscard = () => {
    setDescription(config.description);
    setModules(JSON.parse(JSON.stringify(config.modules)));
    setSystemSettings(JSON.parse(JSON.stringify(config.systemSettings)));
    setNotificationPerms(
      JSON.parse(JSON.stringify(config.notificationPermissions))
    );
    setLastUpdated(config.lastUpdated);
  };
  const handleSave = () => {
    setLastUpdated(`Last updated by Admin on ${new Date().toLocaleString()}`);
  };

  const openCreateModal = () => {
    setNewRoleTitle("");
    setNewRoleDepartment(ROLE_DEPARTMENTS[0]);
    setResponsibleForOtherRoles(false);
    setCreateModalOpen(true);
  };

  const closeCreateModal = () => setCreateModalOpen(false);

  const handleCreateRole = () => {
    // Placeholder: would create role with newRoleTitle, newRoleDepartment, responsibleForOtherRoles
    closeCreateModal();
  };

  const RoleIcon =
    ICONS[
      config.roleName === "Senior Admin"
        ? "shield"
        : SYSTEM_ROLES.find((r) => r.id === selectedRoleId)?.icon ?? "shield"
    ] ?? Shield;

  return (
    <div className="arp-page">
      <aside className="arp-sidebar">
        <div className="arp-sidebar-header">
          <h2 className="arp-sidebar-title">System Roles</h2>
          <span className="arp-sidebar-badge">{ACTIVE_ROLES_COUNT} Active</span>
        </div>
        <button
          type="button"
          className="arp-btn-create"
          onClick={openCreateModal}
        >
          <Plus className="arp-btn-create-icon" strokeWidth={2} />
          Create New Role
        </button>
        <div className="arp-filter-wrap">
          <Filter className="arp-filter-icon" strokeWidth={2} />
          <input
            type="text"
            className="arp-filter-input"
            placeholder="Filter roles..."
            value={roleFilter}
            onChange={(e) => setRoleFilter(e.target.value)}
          />
        </div>
        <ul className="arp-role-list">
          {filteredRoles.map((role) => {
            const Icon = ICONS[role.icon] ?? Shield;
            return (
              <li key={role.id}>
                <button
                  type="button"
                  className={`arp-role-item ${
                    selectedRoleId === role.id ? "active" : ""
                  }`}
                  onClick={() => setSelectedRoleId(role.id)}
                >
                  <Icon className="arp-role-icon" strokeWidth={2} />
                  <span>{role.name}</span>
                </button>
              </li>
            );
          })}
        </ul>
        <div className="arp-help">
          <p className="arp-help-title">Permission Help</p>
          <p className="arp-help-text">
            Changes to roles are applied instantly to all assigned staff
            members. Use with caution.
          </p>
        </div>
      </aside>

      <main className="arp-main">
        <div className="arp-main-inner">
          <header className="arp-role-header">
            <div className="arp-role-header-content">
              <h1 className="arp-role-name">
                <RoleIcon className="arp-role-name-icon" strokeWidth={2} />
                Role: {config.roleName}
              </h1>
              <p className="arp-role-subtitle">{config.subtitle}</p>
            </div>
            <div className="arp-role-header-actions">
              <button type="button" className="arp-btn-audit">
                <ClipboardList className="w-4 h-4" strokeWidth={2} />
                Audit Log
              </button>
              <button type="button" className="arp-btn-duplicate">
                <Copy className="w-4 h-4" strokeWidth={2} />
                Duplicate Role
              </button>
            </div>
          </header>

          <section className="arp-section">
            <h3 className="arp-section-title">Role Description</h3>
            <textarea
              className="arp-description"
              rows={4}
              value={description}
              onChange={(e) => setDescription(e.target.value)}
              placeholder="Describe this role..."
            />
          </section>

          <section className="arp-section">
            <h3 className="arp-section-title">Module Permissions</h3>
            <div className="arp-table-wrap">
              <table className="arp-table">
                <thead>
                  <tr>
                    <th>Module Name</th>
                    <th>View</th>
                    <th>Create</th>
                    <th>Edit</th>
                    <th>Delete</th>
                  </tr>
                </thead>
                <tbody>
                  {modules.map((mod) => {
                    const ModIcon = ICONS[mod.icon] ?? FileText;
                    return (
                      <tr key={mod.id}>
                        <td>
                          <div className="arp-module-cell">
                            <span
                              className={`arp-module-icon-wrap arp-module-icon-${mod.iconColor}`}
                            >
                              <ModIcon
                                className="arp-module-icon"
                                strokeWidth={2}
                              />
                            </span>
                            <div>
                              <span className="arp-module-name">
                                {mod.name}
                              </span>
                              <span className="arp-module-desc">
                                {mod.description}
                              </span>
                            </div>
                          </div>
                        </td>
                        <td>
                          <input
                            type="checkbox"
                            checked={mod.view}
                            onChange={(e) =>
                              handleModulePermission(
                                mod.id,
                                "view",
                                e.target.checked
                              )
                            }
                            className="arp-checkbox"
                          />
                        </td>
                        <td>
                          <input
                            type="checkbox"
                            checked={mod.create}
                            onChange={(e) =>
                              handleModulePermission(
                                mod.id,
                                "create",
                                e.target.checked
                              )
                            }
                            className="arp-checkbox"
                          />
                        </td>
                        <td>
                          {mod.editExtra ? (
                            <div className="arp-edit-extra">
                              <span className="arp-edit-extra-label">
                                {mod.editExtra.label}
                              </span>
                              <input
                                type="checkbox"
                                checked={mod.editExtra.checked}
                                onChange={(e) =>
                                  handleEditExtra(mod.id, e.target.checked)
                                }
                                className="arp-checkbox"
                              />
                            </div>
                          ) : (
                            <input
                              type="checkbox"
                              checked={mod.edit}
                              onChange={(e) =>
                                handleModulePermission(
                                  mod.id,
                                  "edit",
                                  e.target.checked
                                )
                              }
                              className="arp-checkbox"
                            />
                          )}
                        </td>
                        <td>
                          <input
                            type="checkbox"
                            checked={mod.delete}
                            onChange={(e) =>
                              handleModulePermission(
                                mod.id,
                                "delete",
                                e.target.checked
                              )
                            }
                            className="arp-checkbox"
                          />
                        </td>
                      </tr>
                    );
                  })}
                </tbody>
              </table>
            </div>
          </section>

          <section className="arp-section">
            <h3 className="arp-section-title">
              <Shield className="arp-section-title-icon" strokeWidth={2} />
              System Settings Access
            </h3>
            <div className="arp-toggles">
              {systemSettings.map((s, i) => (
                <div key={i} className="arp-toggle-row">
                  <span className="arp-toggle-label">{s.label}</span>
                  <button
                    type="button"
                    role="switch"
                    aria-checked={s.enabled}
                    className={`arp-toggle ${s.enabled ? "on" : ""}`}
                    onClick={() => handleSystemSetting(i, !s.enabled)}
                  >
                    <span className="arp-toggle-thumb" />
                  </button>
                </div>
              ))}
            </div>
          </section>

          <section className="arp-section">
            <h3 className="arp-section-title">
              <Bell className="arp-section-title-icon" strokeWidth={2} />
              Notification Permissions
            </h3>
            <div className="arp-toggles">
              {notificationPerms.map((s, i) => (
                <div key={i} className="arp-toggle-row">
                  <span className="arp-toggle-label">{s.label}</span>
                  <button
                    type="button"
                    role="switch"
                    aria-checked={s.enabled}
                    className={`arp-toggle ${s.enabled ? "on" : ""}`}
                    onClick={() => handleNotificationPerm(i, !s.enabled)}
                  >
                    <span className="arp-toggle-thumb" />
                  </button>
                </div>
              ))}
            </div>
          </section>

          <footer className="arp-footer">
            <p className="arp-footer-updated">
              <Info className="arp-footer-info-icon" strokeWidth={2} />
              {lastUpdated}
            </p>
            <div className="arp-footer-actions">
              <button
                type="button"
                className="arp-btn-discard"
                onClick={handleDiscard}
              >
                Discard Changes
              </button>
              <button
                type="button"
                className="arp-btn-save"
                onClick={handleSave}
              >
                <Save className="w-4 h-4" strokeWidth={2} />
                Save Changes
              </button>
            </div>
          </footer>
        </div>
      </main>

      {/* Create New Role modal */}
      {createModalOpen && (
        <div
          className="arp-modal-backdrop"
          role="dialog"
          aria-modal="true"
          aria-labelledby="arp-create-modal-title"
          onClick={closeCreateModal}
        >
          <div className="arp-modal" onClick={(e) => e.stopPropagation()}>
            <div className="arp-modal-header">
              <h2 id="arp-create-modal-title" className="arp-modal-title">
                <UsersRound className="arp-modal-title-icon" strokeWidth={2} />
                Create New Role
              </h2>
              <button
                type="button"
                className="arp-modal-close"
                onClick={closeCreateModal}
                aria-label="Close"
              >
                <X className="w-5 h-5" strokeWidth={2} />
              </button>
            </div>
            <div className="arp-modal-body">
              <label className="arp-modal-label">
                Role title
                <input
                  type="text"
                  className="arp-modal-input"
                  placeholder="e.g. Team Lead, Coordinator"
                  value={newRoleTitle}
                  onChange={(e) => setNewRoleTitle(e.target.value)}
                />
              </label>
              <label className="arp-modal-label">
                Related department
                <select
                  className="arp-modal-select"
                  value={newRoleDepartment}
                  onChange={(e) => setNewRoleDepartment(e.target.value)}
                >
                  {ROLE_DEPARTMENTS.map((d) => (
                    <option key={d} value={d}>
                      {d}
                    </option>
                  ))}
                </select>
              </label>
              <div className="arp-modal-toggle-row">
                <span className="arp-modal-toggle-label">
                  This role is responsible for other roles
                </span>
                <button
                  type="button"
                  role="switch"
                  aria-checked={responsibleForOtherRoles}
                  className={`arp-modal-toggle ${
                    responsibleForOtherRoles ? "on" : ""
                  }`}
                  onClick={() =>
                    setResponsibleForOtherRoles(!responsibleForOtherRoles)
                  }
                >
                  <span className="arp-modal-toggle-thumb" />
                </button>
              </div>
            </div>
            <div className="arp-modal-footer">
              <button
                type="button"
                className="arp-modal-btn-cancel"
                onClick={closeCreateModal}
              >
                Cancel
              </button>
              <button
                type="button"
                className="arp-modal-btn-create"
                onClick={handleCreateRole}
              >
                Create Role
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
