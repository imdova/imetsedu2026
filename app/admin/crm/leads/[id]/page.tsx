"use client";

import { useParams } from "next/navigation";
import Link from "next/link";
import { useState } from "react";
import { Play } from "lucide-react";
import { crmLeads, leadStatusStyles } from "@/lib/crmData";
import LogActivityModal from "@/components/crm/LogActivityModal";

function getInitials(name: string) {
  const parts = name.trim().split(/\s+/);
  if (parts.length >= 2) return (parts[0][0] + parts[1][0]).toUpperCase();
  return name.slice(0, 2).toUpperCase();
}

export default function LeadProfilePage() {
  const params = useParams();
  const id = params?.id as string;
  const [activeTab, setActiveTab] = useState<"all" | "calls" | "messages">(
    "all"
  );
  const [note, setNote] = useState("");
  const [logActivityOpen, setLogActivityOpen] = useState(false);

  const lead = crmLeads.find((l) => l.id === id);
  const firstName = lead?.name.trim().split(/\s+/)[0] || lead?.name || "there";
  if (!lead) {
    return (
      <div className="min-h-screen bg-gray-50 flex items-center justify-center">
        <div className="text-center">
          <p className="text-gray-600">Lead not found.</p>
          <Link
            href="/admin/crm/leads"
            className="mt-4 inline-block text-admin-primary font-semibold"
          >
            ← Back to Leads
          </Link>
        </div>
      </div>
    );
  }

  const tabs = [
    { id: "all" as const, label: "All Interactions" },
    { id: "calls" as const, label: "Calls" },
    { id: "messages" as const, label: "Messages" },
  ];

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Breadcrumbs */}
      <div className="bg-white border-b border-gray-200 px-6 py-3">
        <nav className="flex items-center gap-2 text-sm">
          <Link
            href="/admin/crm/leads"
            className="text-gray-500 hover:text-admin-primary"
          >
            Leads
          </Link>
          <span className="text-gray-400">/</span>
          <span className="text-gray-900 font-medium">Student Profile</span>
        </nav>
      </div>

      <div className="p-6">
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          {/* Left - Profile & Course of Interest */}
          <div className="space-y-6">
            <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-6">
              <div className="flex flex-col items-center text-center">
                <div className="w-24 h-24 rounded-full bg-gradient-to-br from-blue-400 to-indigo-500 flex items-center justify-center text-white text-2xl font-bold mb-4">
                  {getInitials(lead.name)}
                </div>
                <h1 className="text-xl font-bold text-gray-900">{lead.name}</h1>
                <p className="text-sm text-gray-500 mt-0.5">
                  Lead ID: #{88000 + (parseInt(lead.id, 10) || 0)}
                </p>
                <span
                  className={`mt-2 inline-flex px-3 py-1 rounded-full text-xs font-semibold ${
                    leadStatusStyles[lead.status]
                  }`}
                >
                  {lead.status} LEAD
                </span>
              </div>
              <div className="mt-6 space-y-3 text-sm">
                <div className="flex items-center gap-2 text-gray-700">
                  <span>✉</span>
                  <span>Email {lead.email}</span>
                </div>
                <div className="flex items-center gap-2 text-gray-700">
                  <span>📞</span>
                  <span>Phone {lead.phone}</span>
                </div>
                {lead.location && (
                  <div className="flex items-center gap-2 text-gray-700">
                    <span>📍</span>
                    <span>Location {lead.location}</span>
                  </div>
                )}
              </div>
              <button
                type="button"
                className="w-full mt-6 py-2.5 border-2 border-admin-primary text-admin-primary font-semibold rounded-lg hover:bg-admin-primary hover:text-white transition-colors"
              >
                Edit Profile
              </button>
            </div>

            <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-6">
              <h3 className="text-xs font-semibold text-gray-500 uppercase tracking-wider mb-4">
                Course of Interest
              </h3>
              <div className="bg-gradient-to-br from-indigo-100 to-purple-100 rounded-lg h-28 flex items-center justify-center mb-4">
                <span className="text-4xl">💼</span>
              </div>
              <p className="font-bold text-gray-900">
                {lead.courseInterest || "Not specified"}
              </p>
              <div className="mt-3 grid grid-cols-2 gap-2 text-sm text-gray-600">
                <div>Intake</div>
                <div className="text-right">Sept 2024</div>
                <div>Mode</div>
                <div className="text-right">Full-time</div>
                <div>Campus</div>
                <div className="text-right">Main Campus</div>
              </div>
            </div>
          </div>

          {/* Middle - Communication History */}
          <div className="lg:col-span-1 bg-white rounded-xl shadow-sm border border-gray-200 p-6">
            <h2 className="text-lg font-bold text-gray-900 mb-4">
              Communication History
            </h2>
            <div className="flex gap-2 mb-6">
              {tabs.map((t) => (
                <button
                  key={t.id}
                  type="button"
                  onClick={() => setActiveTab(t.id)}
                  className={`px-3 py-2 rounded-lg text-sm font-medium transition-colors ${
                    activeTab === t.id
                      ? "bg-admin-primary/10 text-admin-primary"
                      : "bg-gray-100 text-gray-600 hover:bg-gray-200"
                  }`}
                >
                  {t.label}
                </button>
              ))}
            </div>

            <div className="relative">
              <div className="absolute left-4 top-0 bottom-0 w-0.5 bg-gray-200" />
              <div className="space-y-6">
                <div className="flex gap-2 items-center">
                  <span className="px-2 py-0.5 rounded-full bg-gray-200 text-xs font-medium text-gray-600">
                    TODAY
                  </span>
                </div>
                <div className="flex gap-4 relative pl-10">
                  <div className="absolute left-0 w-8 h-8 rounded-full bg-green-500 flex items-center justify-center text-white text-sm shrink-0">
                    💬
                  </div>
                  <div className="bg-gray-100 rounded-lg p-3 flex-1">
                    <p className="text-sm text-gray-700">
                      Hello {firstName}, I&apos;ve sent you the brochure for the{" "}
                      {lead.courseInterest || "program"}. Let me know if you
                      have any questions.
                    </p>
                    <p className="text-xs text-gray-500 mt-1">✔ Delivered</p>
                  </div>
                  <span className="text-xs text-gray-500 shrink-0">
                    10:24 AM
                  </span>
                </div>
                <div className="flex gap-4 relative pl-10">
                  <div className="absolute left-0 w-8 h-8 rounded-full bg-blue-500 flex items-center justify-center text-white text-sm shrink-0">
                    📞
                  </div>
                  <div className="bg-gray-100 rounded-lg p-3 flex-1">
                    <p className="text-sm font-medium text-gray-700">
                      Call Recording
                    </p>
                    <div className="flex items-center gap-2 mt-1">
                      <Play
                        className="h-4 w-4 text-admin-primary shrink-0"
                        strokeWidth={2}
                        fill="currentColor"
                      />
                      <span className="text-sm text-gray-600">5m 22s</span>
                      <a
                        href="#"
                        className="text-sm text-admin-primary hover:underline"
                      >
                        Download
                      </a>
                    </div>
                  </div>
                  <span className="text-xs text-gray-500 shrink-0">
                    09:15 AM
                  </span>
                </div>
                <div className="flex gap-2 items-center pt-2">
                  <span className="px-2 py-0.5 rounded-full bg-gray-200 text-xs font-medium text-gray-600">
                    YESTERDAY
                  </span>
                </div>
                <div className="flex gap-4 relative pl-10">
                  <div className="absolute left-0 w-8 h-8 rounded-full bg-purple-500 flex items-center justify-center text-white text-sm shrink-0">
                    📱
                  </div>
                  <div className="bg-gray-100 rounded-lg p-3 flex-1">
                    <p className="text-sm text-gray-700">
                      Hi {firstName}, reminder about our call tomorrow at 9 AM.
                    </p>
                  </div>
                  <span className="text-xs text-gray-500 shrink-0">
                    4:45 PM
                  </span>
                </div>
              </div>
            </div>

            <div className="mt-6 flex gap-2">
              <input
                type="text"
                placeholder="Type a message..."
                className="flex-1 px-4 py-2.5 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-admin-primary focus:border-admin-primary"
              />
              <button
                type="button"
                className="w-10 h-10 rounded-full bg-admin-primary text-white flex items-center justify-center hover:bg-admin-primary-hover transition-colors"
              >
                ➤
              </button>
            </div>
          </div>

          {/* Right - Quick Actions, Note, Lead Score */}
          <div className="space-y-6">
            <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-6">
              <h3 className="text-xs font-semibold text-gray-500 uppercase tracking-wider mb-4">
                Quick Actions
              </h3>
              <div className="space-y-2">
                <button
                  type="button"
                  onClick={() => setLogActivityOpen(true)}
                  className="w-full flex items-center justify-center gap-2 py-2.5 bg-admin-primary text-white font-medium rounded-lg hover:bg-admin-primary-hover transition-colors"
                >
                  <span>📞</span>
                  Call via VOIP
                </button>
                <button
                  type="button"
                  className="w-full flex items-center justify-center gap-2 py-2.5 border-2 border-green-500 text-green-600 font-medium rounded-lg hover:bg-green-50 transition-colors"
                >
                  <span>💰</span>
                  Send Payment Link
                </button>
                <button
                  type="button"
                  className="w-full flex items-center justify-center gap-2 py-2.5 border-2 border-amber-500 text-amber-600 font-medium rounded-lg hover:bg-amber-50 transition-colors"
                >
                  <span>📅</span>
                  Schedule Meeting
                </button>
              </div>
            </div>

            <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-6">
              <h3 className="text-xs font-semibold text-gray-500 uppercase tracking-wider mb-4">
                Quick Note
              </h3>
              <textarea
                value={note}
                onChange={(e) => setNote(e.target.value)}
                placeholder="Add a private note about this lead..."
                rows={4}
                className="w-full px-4 py-2.5 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-admin-primary focus:border-admin-primary resize-y"
              />
              <button
                type="button"
                className="w-full mt-3 py-2.5 bg-gray-900 text-white font-medium rounded-lg hover:bg-gray-800 transition-colors"
              >
                Save Note
              </button>
            </div>

            <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-6">
              <h3 className="text-xs font-semibold text-gray-500 uppercase tracking-wider mb-4">
                Lead Score
              </h3>
              <div className="flex flex-col items-center">
                <div className="relative w-24 h-24">
                  <svg className="w-24 h-24 -rotate-90">
                    <circle
                      cx="48"
                      cy="48"
                      r="40"
                      fill="none"
                      stroke="#e5e7eb"
                      strokeWidth="8"
                    />
                    <circle
                      cx="48"
                      cy="48"
                      r="40"
                      fill="none"
                      stroke="#0f49bd"
                      strokeWidth="8"
                      strokeDasharray={`${(lead.score / 100) * 251.2} 251.2`}
                    />
                  </svg>
                  <span className="absolute inset-0 flex items-center justify-center text-lg font-bold text-admin-primary">
                    {lead.score}%
                  </span>
                </div>
                <p className="text-sm text-gray-600 mt-2 text-center">
                  {lead.score >= 70 ? "High Intent" : "Medium Intent"} Based on
                  activity
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Footer */}
      <div className="bg-white border-t border-gray-200 px-6 py-3 flex flex-col sm:flex-row items-center justify-between gap-2">
        <div className="flex items-center gap-4 text-sm text-gray-600">
          <span className="flex items-center gap-1.5">
            <span className="w-2 h-2 rounded-full bg-green-500" />
            VOIP Status: Ready
          </span>
          <span>Last Updated: 2 mins ago</span>
        </div>
        <p className="text-sm text-gray-500">EduCRM v2.4.0 © 2024</p>
      </div>

      {logActivityOpen && (
        <LogActivityModal
          lead={lead}
          onClose={() => setLogActivityOpen(false)}
          onSave={() => setLogActivityOpen(false)}
        />
      )}
    </div>
  );
}
