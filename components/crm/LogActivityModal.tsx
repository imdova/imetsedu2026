"use client";

import { useState } from "react";
import { X, User } from "lucide-react";
import type { CRMLead } from "@/lib/crmData";
import { coursesOfInterest } from "@/lib/crmData";

const PIPELINE_STAGES = [
  "CONTACTED",
  "QUALIFIED",
  "PROPOSAL",
  "NEGOTIATION",
] as const;

interface LogActivityModalProps {
  lead: CRMLead;
  onClose: () => void;
  onSave: () => void;
}

export default function LogActivityModal({
  lead,
  onClose,
  onSave,
}: LogActivityModalProps) {
  const [customerName] = useState(lead.name);
  const [courseInterest, setCourseInterest] = useState(
    lead.courseInterest || ""
  );
  const [pipelineStage, setPipelineStage] =
    useState<(typeof PIPELINE_STAGES)[number]>("CONTACTED");
  const [callNotes, setCallNotes] = useState("");
  const [followUp, setFollowUp] = useState("");
  const [markComplete, setMarkComplete] = useState(true);

  const handleSave = () => {
    onSave();
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/50">
      <div
        className="bg-white rounded-xl shadow-xl max-w-2xl w-full max-h-[90vh] overflow-y-auto"
        onClick={(e) => e.stopPropagation()}
      >
        <div className="p-6 border-b border-gray-200 flex items-start justify-between">
          <div>
            <h2 className="text-xl font-bold text-gray-900">
              Log Activity & Create Deal
            </h2>
            <p className="text-sm text-gray-600 mt-1">
              Record call details and move lead through the pipeline
            </p>
          </div>
          <button
            type="button"
            onClick={onClose}
            className="p-2 text-gray-400 hover:text-gray-600 hover:bg-gray-100 rounded-lg transition-colors"
          >
            ✕
          </button>
        </div>

        <div className="p-6 grid grid-cols-1 md:grid-cols-2 gap-6">
          <div className="space-y-4">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1.5">
                Customer Name
              </label>
              <div className="relative">
                <span className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400">
                  <User className="h-4 w-4" strokeWidth={2} />
                </span>
                <input
                  type="text"
                  value={customerName}
                  readOnly
                  className="w-full pl-10 pr-4 py-2.5 border border-gray-300 rounded-lg bg-gray-50 text-gray-700"
                />
              </div>
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1.5">
                Course of Interest
              </label>
              <div className="relative">
                <span className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400">
                  🎓
                </span>
                <select
                  value={courseInterest}
                  onChange={(e) => setCourseInterest(e.target.value)}
                  className="w-full pl-10 pr-10 py-2.5 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-primary focus:border-primary"
                >
                  <option value="">Select course</option>
                  {coursesOfInterest.map((c) => (
                    <option key={c} value={c}>
                      {c}
                    </option>
                  ))}
                </select>
                <span className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-400">
                  ▼
                </span>
              </div>
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Pipeline Stage
              </label>
              <div className="flex flex-wrap gap-2">
                {PIPELINE_STAGES.map((stage) => (
                  <button
                    key={stage}
                    type="button"
                    onClick={() => setPipelineStage(stage)}
                    className={`px-4 py-2 rounded-lg text-sm font-semibold border transition-colors ${
                      pipelineStage === stage
                        ? "border-primary bg-primary text-white"
                        : "border-gray-300 text-gray-600 hover:bg-gray-50"
                    }`}
                  >
                    {stage}
                  </button>
                ))}
              </div>
            </div>
          </div>

          <div className="space-y-4">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1.5">
                Enter Call Notes
              </label>
              <textarea
                value={callNotes}
                onChange={(e) => setCallNotes(e.target.value)}
                placeholder="Summary of the conversation..."
                rows={4}
                className="w-full px-4 py-2.5 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-primary focus:border-primary resize-none"
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1.5">
                Follow-up Meeting
              </label>
              <div className="relative">
                <span className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400">
                  📅
                </span>
                <input
                  type="text"
                  value={followUp}
                  onChange={(e) => setFollowUp(e.target.value)}
                  placeholder="mm/dd/yyyy, --:--"
                  className="w-full pl-10 pr-10 py-2.5 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-primary focus:border-primary"
                />
                <span className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-400">
                  📅
                </span>
              </div>
            </div>
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-2">
                <span className="text-green-600">✓</span>
                <label className="text-sm font-medium text-gray-700">
                  Mark Task as Complete
                </label>
              </div>
              <button
                type="button"
                onClick={() => setMarkComplete(!markComplete)}
                className={`relative w-11 h-6 rounded-full transition-colors ${
                  markComplete ? "bg-primary" : "bg-gray-300"
                }`}
              >
                <span
                  className={`absolute top-1 w-4 h-4 rounded-full bg-white shadow transition-transform ${
                    markComplete ? "left-6" : "left-1"
                  }`}
                />
              </button>
            </div>
          </div>
        </div>

        <div className="p-6 border-t border-gray-200 flex justify-end gap-3">
          <button
            type="button"
            onClick={onClose}
            className="px-4 py-2.5 text-gray-700 font-medium hover:bg-gray-100 rounded-lg transition-colors"
          >
            Cancel
          </button>
          <button
            type="button"
            onClick={handleSave}
            className="inline-flex items-center gap-2 px-4 py-2.5 bg-primary text-white font-medium rounded-lg hover:bg-primary/90 transition-colors"
          >
            <span>💾</span>
            Save Activity
          </button>
        </div>
      </div>
    </div>
  );
}
