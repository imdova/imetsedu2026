'use client';

import { useState } from 'react';
import Link from 'next/link';
import { crmLeads, pipelineStages, type CRMLead, type PipelineStage } from '@/lib/crmData';

function getStageCount(stage: PipelineStage) {
  return crmLeads.filter((l) => l.pipelineStage === stage).length;
}

export default function CRMPipelinePage() {
  const [activeStage, setActiveStage] = useState<PipelineStage | null>(null);

  const leadsByStage = pipelineStages.map((stage) => ({
    ...stage,
    leads: crmLeads.filter((l) => l.pipelineStage === stage.id),
  }));

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Header */}
      <div className="bg-white border-b border-gray-200 px-6 py-5">
        <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
          <div>
            <h1 className="text-2xl font-bold text-gray-900">Lead Pipeline</h1>
            <p className="text-sm text-gray-600 mt-1">
              Manage student recruitment across different stages
            </p>
          </div>
          <div className="flex items-center gap-3">
            <button
              type="button"
              className="inline-flex items-center gap-2 px-4 py-2.5 bg-white border border-gray-300 rounded-lg text-gray-700 font-medium hover:bg-gray-50 transition-colors"
            >
              <span>🔽</span>
              Filter
            </button>
            <button
              type="button"
              className="inline-flex items-center gap-2 px-4 py-2.5 bg-white border border-gray-300 rounded-lg text-gray-700 font-medium hover:bg-gray-50 transition-colors"
            >
              <span>↕</span>
              Sort
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

      {/* Stage tabs */}
      <div className="bg-white border-b border-gray-200 px-6">
        <div className="flex flex-wrap gap-2 py-4">
          {pipelineStages.map((stage) => {
            const count = getStageCount(stage.id);
            const isActive = activeStage === stage.id;
            return (
              <button
                key={stage.id}
                type="button"
                onClick={() => setActiveStage(isActive ? null : stage.id)}
                className={`flex items-center gap-2 px-4 py-2 rounded-lg font-semibold transition-colors ${
                  isActive ? 'bg-[#030256] text-white' : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
                }`}
              >
                <span className={`w-2 h-2 rounded-full ${stage.dot}`} />
                {stage.label}
                <span
                  className={`px-2 py-0.5 rounded text-xs font-medium ${
                    isActive ? 'bg-white/20' : 'bg-gray-200 text-gray-600'
                  }`}
                >
                  {count}
                </span>
              </button>
            );
          })}
        </div>
      </div>

      {/* Kanban */}
      <div className="p-6 overflow-x-auto">
        <div className="flex gap-6 min-w-max">
          {leadsByStage.map((stage) => (
            <div key={stage.id} className="w-80 shrink-0 flex flex-col">
              <div className="flex items-center gap-2 mb-4">
                <span className={`w-2 h-2 rounded-full ${stage.dot}`} />
                <h2 className="font-bold text-gray-900">{stage.label}</h2>
                <span className="px-2 py-0.5 rounded bg-gray-200 text-gray-600 text-sm font-medium">
                  {stage.leads.length}
                </span>
              </div>
              <div className="space-y-3 flex-1">
                {stage.leads.map((lead) => (
                  <LeadCard key={lead.id} lead={lead} />
                ))}
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}

function LeadCard({ lead }: { lead: CRMLead }) {
  const isWaiting = lead.pipelineStage === 'WAITING FOR PAYMENT';
  const isEnrolled = lead.pipelineStage === 'ENROLLED';

  return (
    <Link
      href={`/admin/crm/leads/${lead.id}`}
      className="block bg-white rounded-xl shadow-sm border border-gray-200 p-4 hover:shadow-md transition-shadow"
    >
      <div className="flex items-start justify-between gap-2">
        <div>
          <p className="font-semibold text-gray-900">{lead.name}</p>
          <p className="text-xs text-gray-500 mt-0.5">
            {lead.pipelineStage === 'NEW INQUIRIES'
              ? '3 hours ago'
              : lead.pipelineStage === 'CONTACTED'
                ? '2 days ago'
                : '3 days ago'}
          </p>
        </div>
        <span
          className={`w-8 h-8 rounded-full flex items-center justify-center text-white text-sm ${
            isEnrolled ? 'bg-green-500' : 'bg-[#030256]'
          }`}
        >
          💬
        </span>
      </div>
      <p className="text-sm text-gray-600 mt-2">{lead.courseInterest || '—'}</p>
      <div className="mt-3">
        {isWaiting ? (
          <button
            type="button"
            onClick={(e) => e.preventDefault()}
            className="w-full py-2 bg-[#030256] text-white text-sm font-medium rounded-lg hover:bg-[#04036a] transition-colors flex items-center justify-center gap-1"
          >
            <span>📄</span>
            Send Invoice
          </button>
        ) : isEnrolled ? (
          <p className="text-sm text-green-600 font-medium">PKR 25,000</p>
        ) : (
          <button
            type="button"
            onClick={(e) => e.preventDefault()}
            className="w-full py-2 bg-blue-50 text-[#030256] text-sm font-medium rounded-lg hover:bg-blue-100 transition-colors flex items-center justify-center gap-1"
          >
            <span>↩</span>
            {lead.pipelineStage === 'NEW INQUIRIES' ? 'Quick Response' : 'Follow Up'}
          </button>
        )}
      </div>
    </Link>
  );
}
