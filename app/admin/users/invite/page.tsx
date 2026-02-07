"use client";

import { useState } from "react";
import Link from "next/link";
import {
  ChevronRight,
  User,
  Shield,
  Phone,
  ArrowRight,
  Lock,
  Sparkles,
} from "lucide-react";
import { ROUTES } from "@/constants";
import { INVITE_ROLES, INVITE_DEPARTMENTS, SALES_AGENTS } from "./invite-data";
import "./invite.css";

export default function InviteNewUserPage() {
  const [fullName, setFullName] = useState("");
  const [email, setEmail] = useState("");
  const [phone, setPhone] = useState("");
  const [role, setRole] = useState(INVITE_ROLES[0]);
  const [department, setDepartment] = useState(INVITE_DEPARTMENTS[0]);
  const [salesAgents, setSalesAgents] = useState<string[]>([]);
  const [smartInvite, setSmartInvite] = useState(true);

  const isTeamLeader = role === "Team Leader";

  const handleSalesAgentToggle = (agent: string) => {
    setSalesAgents((prev) =>
      prev.includes(agent) ? prev.filter((a) => a !== agent) : [...prev, agent]
    );
  };

  const handleSubmit = () => {
    window.location.href = ROUTES.ADMIN.USERS;
  };

  return (
    <div className="aui-page">
      <nav className="aui-breadcrumb" aria-label="Breadcrumb">
        <Link href={ROUTES.ADMIN.DASHBOARD}>Dashboard</Link>
        <ChevronRight className="aui-breadcrumb-sep" aria-hidden />
        <Link href={ROUTES.ADMIN.USERS}>Users</Link>
        <ChevronRight className="aui-breadcrumb-sep" aria-hidden />
        <span className="aui-breadcrumb-current">Invite New Member</span>
      </nav>

      <header className="aui-header">
        <h1 className="aui-title">Invite New User</h1>
        <p className="aui-subtitle">
          Configure permissions and send a secure invitation to your new team
          member.
        </p>
      </header>

      <div className="aui-card">
        <div className="aui-card-inner">
          {/* 1. Basic Info */}
          <section className="aui-section">
            <h2 className="aui-section-title">
              <User className="aui-section-icon" />
              1. Basic Information
            </h2>
            <div className="aui-fields">
              <div className="aui-fields-row">
                <label className="aui-label">
                  Full Name
                  <input
                    type="text"
                    className="aui-input"
                    placeholder="e.g. Johnathan Smith"
                    value={fullName}
                    onChange={(e) => setFullName(e.target.value)}
                  />
                </label>
                <label className="aui-label">
                  Professional Email
                  <input
                    type="email"
                    className="aui-input"
                    placeholder="john.smith@company.com"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                  />
                </label>
              </div>
              <label className="aui-label">
                Phone Number
                <div className="aui-input-wrap">
                  <Phone className="aui-input-icon" strokeWidth={2} />
                  <input
                    type="tel"
                    className="aui-input"
                    placeholder="+1 (555) 000-0000"
                    value={phone}
                    onChange={(e) => setPhone(e.target.value)}
                  />
                </div>
              </label>
            </div>
          </section>

          {/* 2. Role & Access + Department */}
          <section className="aui-section">
            <h2 className="aui-section-title">
              <Shield className="aui-section-icon" />
              2. Role & Access
            </h2>
            <div className="aui-role-dept-row">
              <label className="aui-label">
                Select Role
                <select
                  className="aui-select"
                  value={role}
                  onChange={(e) => setRole(e.target.value)}
                >
                  {INVITE_ROLES.map((r) => (
                    <option key={r} value={r}>
                      {r}
                    </option>
                  ))}
                </select>
              </label>
              <label className="aui-label">
                Department
                <select
                  className="aui-select"
                  value={department}
                  onChange={(e) => setDepartment(e.target.value)}
                >
                  {INVITE_DEPARTMENTS.map((d) => (
                    <option key={d} value={d}>
                      {d}
                    </option>
                  ))}
                </select>
              </label>
            </div>

            {isTeamLeader && (
              <div className="aui-sales-agents">
                <p className="aui-sales-agents-label">
                  Responsible for sales agents
                </p>
                <div className="aui-sales-agents-options">
                  {SALES_AGENTS.map((agent) => (
                    <label key={agent} className="aui-sales-agent-check">
                      <input
                        type="checkbox"
                        checked={salesAgents.includes(agent)}
                        onChange={() => handleSalesAgentToggle(agent)}
                      />
                      <span>{agent}</span>
                    </label>
                  ))}
                </div>
              </div>
            )}

            <div className="aui-smart-invite">
              <div className="aui-smart-invite-head">
                <Sparkles className="aui-smart-invite-icon" />
                <span className="aui-smart-invite-label">Smart Invite</span>
              </div>
              <p className="aui-smart-invite-desc">
                Automatically send a customized Welcome Pack PDF
              </p>
              <button
                type="button"
                role="switch"
                aria-checked={smartInvite}
                className={`aui-toggle ${smartInvite ? "on" : ""}`}
                onClick={() => setSmartInvite(!smartInvite)}
              >
                <span className="aui-toggle-thumb" />
              </button>
            </div>
          </section>

          <div className="aui-actions">
            <Link href={ROUTES.ADMIN.USERS} className="aui-btn-cancel">
              Cancel
            </Link>
            <button
              type="button"
              className="aui-btn-submit"
              onClick={handleSubmit}
            >
              Send Smart Invite
              <ArrowRight className="aui-btn-arrow" strokeWidth={2} />
            </button>
          </div>
        </div>
      </div>

      <p className="aui-footer-note">
        <Lock className="aui-footer-icon" />
        Invitations are secure and expire in 48 hours.
      </p>
    </div>
  );
}
