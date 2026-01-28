'use client';

import { useState } from 'react';
import Link from 'next/link';
import {
  crmLeads,
  leadStatusStyles,
  pipelineStages,
  coursesOfInterest,
  assignedUsers,
  type CRMLead,
  type LeadStatus,
  type PipelineStage,
} from '@/lib/crmData';
import LogActivityModal from '@/components/crm/LogActivityModal';

const AVATAR_COLORS = ['bg-blue-400', 'bg-purple-400', 'bg-red-400', 'bg-amber-400'];

function getInitials(name: string) {
  return name
    .split(' ')
    .map((n) => n[0])
    .join('')
    .toUpperCase()
    .slice(0, 2);
}

export default function CRMLeadsPage() {
  const [search, setSearch] = useState('');
  const [leadStage, setLeadStage] = useState<string>('All Stages');
  const [assignedTo, setAssignedTo] = useState<string>('Everyone');
  const [courseInterest, setCourseInterest] = useState<string>('All Courses');
  const [page, setPage] = useState(1);
  const [logActivityLead, setLogActivityLead] = useState<CRMLead | null>(null);

  const filtered = crmLeads.filter((lead) => {
    const matchSearch =
      !search ||
      lead.name.toLowerCase().includes(search.toLowerCase()) ||
      lead.email.toLowerCase().includes(search.toLowerCase());
    const matchStage = leadStage === 'All Stages' || lead.status === leadStage || lead.pipelineStage === leadStage;
    const matchAssigned = assignedTo === 'Everyone' || lead.assignedTo.name === assignedTo;
    const matchCourse = courseInterest === 'All Courses' || lead.courseInterest === courseInterest;
    return matchSearch && matchStage && matchAssigned && matchCourse;
  });

  const perPage = 10;
  const totalPages = Math.ceil(filtered.length / perPage) || 1;
  const paginated = filtered.slice((page - 1) * perPage, page * perPage);
  const start = (page - 1) * perPage + 1;
  const end = Math.min(page * perPage, filtered.length);

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Header */}
      <div className="bg-white border-b border-gray-200 px-6 py-5">
        <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
          <div>
            <h1 className="text-2xl font-bold text-gray-900">Lead Management</h1>
            <p className="text-sm text-gray-600 mt-1">
              Manage and track your educational academy prospects
            </p>
          </div>
          <div className="flex items-center gap-3">
            <button
              type="button"
              className="inline-flex items-center gap-2 px-4 py-2.5 bg-white border border-gray-300 rounded-lg text-gray-700 font-medium hover:bg-gray-50 transition-colors"
            >
              <span>⬇</span>
              Export
            </button>
            <Link
              href="/admin/crm/leads/new"
              className="inline-flex items-center gap-2 px-4 py-2.5 bg-[#030256] text-white rounded-lg font-medium hover:bg-[#04036a] transition-colors"
            >
              <span>+</span>
              New Lead
            </Link>
          </div>
        </div>
      </div>

      {/* Filters & Search */}
      <div className="bg-white border-b border-gray-200 px-6 py-4 shadow-sm">
        <div className="flex flex-col lg:flex-row gap-4">
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 flex-1">
            <div>
              <label className="block text-xs font-semibold text-gray-500 uppercase tracking-wide mb-1.5">
                Lead Stage
              </label>
              <select
                value={leadStage}
                onChange={(e) => setLeadStage(e.target.value)}
                className="w-full px-3 py-2.5 border border-gray-300 rounded-lg text-gray-700 focus:outline-none focus:ring-2 focus:ring-[#030256] focus:border-[#030256]"
              >
                <option>All Stages</option>
                {(['WARM', 'INTERESTED', 'COLD', 'FOLLOWING'] as LeadStatus[]).map((s) => (
                  <option key={s} value={s}>{s}</option>
                ))}
                {pipelineStages.map((s) => (
                  <option key={s.id} value={s.id}>{s.label}</option>
                ))}
              </select>
            </div>
            <div>
              <label className="block text-xs font-semibold text-gray-500 uppercase tracking-wide mb-1.5">
                Assigned To
              </label>
              <select
                value={assignedTo}
                onChange={(e) => setAssignedTo(e.target.value)}
                className="w-full px-3 py-2.5 border border-gray-300 rounded-lg text-gray-700 focus:outline-none focus:ring-2 focus:ring-[#030256] focus:border-[#030256]"
              >
                <option>Everyone</option>
                {assignedUsers.map((u) => (
                  <option key={u.name} value={u.name}>{u.name}</option>
                ))}
              </select>
            </div>
            <div>
              <label className="block text-xs font-semibold text-gray-500 uppercase tracking-wide mb-1.5">
                Course Interest
              </label>
              <select
                value={courseInterest}
                onChange={(e) => setCourseInterest(e.target.value)}
                className="w-full px-3 py-2.5 border border-gray-300 rounded-lg text-gray-700 focus:outline-none focus:ring-2 focus:ring-[#030256] focus:border-[#030256]"
              >
                <option>All Courses</option>
                {coursesOfInterest.map((c) => (
                  <option key={c} value={c}>{c}</option>
                ))}
              </select>
            </div>
          </div>
          <div className="flex-1 flex items-end">
            <div className="relative w-full">
              <span className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400">🔍</span>
              <input
                type="text"
                placeholder="Search leads..."
                value={search}
                onChange={(e) => setSearch(e.target.value)}
                className="w-full pl-10 pr-10 py-2.5 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-[#030256] focus:border-[#030256]"
              />
              <span className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-400">☰</span>
            </div>
          </div>
        </div>
      </div>

      {/* Table */}
      <div className="p-6">
        <div className="bg-white rounded-xl shadow-sm border border-gray-200 overflow-hidden">
          <div className="overflow-x-auto">
            <table className="w-full">
              <thead>
                <tr className="border-b border-gray-200 bg-gray-50">
                  <th className="text-left py-3.5 px-4 text-xs font-semibold text-gray-500 uppercase tracking-wider">
                    Lead Name
                  </th>
                  <th className="text-left py-3.5 px-4 text-xs font-semibold text-gray-500 uppercase tracking-wider">
                    Source
                  </th>
                  <th className="text-left py-3.5 px-4 text-xs font-semibold text-gray-500 uppercase tracking-wider">
                    Assigned To
                  </th>
                  <th className="text-left py-3.5 px-4 text-xs font-semibold text-gray-500 uppercase tracking-wider">
                    Date Added
                  </th>
                  <th className="text-left py-3.5 px-4 text-xs font-semibold text-gray-500 uppercase tracking-wider">
                    Status
                  </th>
                  <th className="text-left py-3.5 px-4 text-xs font-semibold text-gray-500 uppercase tracking-wider">
                    Quick Actions
                  </th>
                </tr>
              </thead>
              <tbody>
                {paginated.map((lead, idx) => (
                  <tr
                    key={lead.id}
                    className="border-b border-gray-100 hover:bg-gray-50/50 transition-colors"
                  >
                    <td className="py-4 px-4">
                      <Link
                        href={`/admin/crm/leads/${lead.id}`}
                        className="flex items-center gap-3 group"
                      >
                        <div
                          className={`w-10 h-10 rounded-full flex items-center justify-center text-white font-semibold text-sm ${
                            AVATAR_COLORS[idx % AVATAR_COLORS.length]
                          }`}
                        >
                          {getInitials(lead.name)}
                        </div>
                        <div>
                          <p className="font-semibold text-gray-900 group-hover:text-[#030256]">
                            {lead.name}
                          </p>
                          <p className="text-sm text-gray-500">{lead.phoneMasked || lead.phone}</p>
                        </div>
                      </Link>
                    </td>
                    <td className="py-4 px-4">
                      <span className="flex items-center gap-1.5 text-sm text-gray-700">
                        <span className="text-gray-400">📄</span>
                        {lead.source}
                      </span>
                    </td>
                    <td className="py-4 px-4">
                      <div className="flex items-center gap-2">
                        <div className="w-8 h-8 rounded-full bg-gray-300 flex items-center justify-center text-xs font-medium text-gray-600">
                          {getInitials(lead.assignedTo.name)}
                        </div>
                        <span className="text-sm text-gray-700">{lead.assignedTo.name}</span>
                      </div>
                    </td>
                    <td className="py-4 px-4 text-sm text-gray-600">{lead.dateAdded}</td>
                    <td className="py-4 px-4">
                      <span
                        className={`inline-flex px-2.5 py-1 rounded-full text-xs font-semibold ${
                          leadStatusStyles[lead.status]
                        }`}
                      >
                        {lead.status}
                      </span>
                    </td>
                    <td className="py-4 px-4">
                      <div className="flex items-center gap-1">
                        <button
                          type="button"
                          className="w-8 h-8 rounded-full bg-blue-50 text-[#030256] flex items-center justify-center hover:bg-blue-100 transition-colors"
                          title="Call"
                        >
                          📞
                        </button>
                        <button
                          type="button"
                          className="w-8 h-8 rounded-full bg-blue-50 text-[#030256] flex items-center justify-center hover:bg-blue-100 transition-colors"
                          title="Chat"
                        >
                          💬
                        </button>
                        <button
                          type="button"
                          className="w-8 h-8 rounded-full bg-blue-50 text-[#030256] flex items-center justify-center hover:bg-blue-100 transition-colors"
                          title="Email"
                        >
                          ✉
                        </button>
                        <button
                          type="button"
                          onClick={() => setLogActivityLead(lead)}
                          className="w-8 h-8 rounded-full bg-blue-50 text-[#030256] flex items-center justify-center hover:bg-blue-100 transition-colors"
                          title="Log Activity"
                        >
                          📋
                        </button>
                      </div>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>

          {/* Pagination */}
          <div className="flex flex-col sm:flex-row items-center justify-between gap-4 px-4 py-3 border-t border-gray-200 bg-gray-50">
            <p className="text-sm text-gray-600">
              Showing {start} to {end} of {filtered.length} results
            </p>
            <div className="flex items-center gap-2">
              <button
                type="button"
                onClick={() => setPage((p) => Math.max(1, p - 1))}
                disabled={page === 1}
                className="w-8 h-8 rounded-lg border border-gray-300 flex items-center justify-center text-gray-600 hover:bg-gray-100 disabled:opacity-50 disabled:cursor-not-allowed"
              >
                ←
              </button>
              {Array.from({ length: Math.min(3, totalPages) }, (_, i) => i + 1).map((p) => (
                <button
                  key={p}
                  type="button"
                  onClick={() => setPage(p)}
                  className={`w-8 h-8 rounded-lg flex items-center justify-center text-sm font-medium transition-colors ${
                    page === p
                      ? 'bg-[#030256] text-white'
                      : 'border border-gray-300 text-gray-600 hover:bg-gray-100'
                  }`}
                >
                  {p}
                </button>
              ))}
              <button
                type="button"
                onClick={() => setPage((p) => Math.min(totalPages, p + 1))}
                disabled={page === totalPages}
                className="w-8 h-8 rounded-lg border border-gray-300 flex items-center justify-center text-gray-600 hover:bg-gray-100 disabled:opacity-50 disabled:cursor-not-allowed"
              >
                →
              </button>
            </div>
          </div>
        </div>
      </div>

      {logActivityLead && (
        <LogActivityModal
          lead={logActivityLead}
          onClose={() => setLogActivityLead(null)}
          onSave={() => setLogActivityLead(null)}
        />
      )}
    </div>
  );
}
