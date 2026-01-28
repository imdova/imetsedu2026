'use client';

import { useState } from 'react';
import { useRouter } from 'next/navigation';
import Link from 'next/link';
import { coursesOfInterest, assignedUsers, pipelineStages } from '@/lib/crmData';

export default function NewLeadPage() {
  const router = useRouter();
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [phone, setPhone] = useState('');
  const [source, setSource] = useState('');
  const [assignedTo, setAssignedTo] = useState('');
  const [courseInterest, setCourseInterest] = useState('');
  const [stage, setStage] = useState('NEW INQUIRIES');

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    // In a real app, would POST to API. For now, redirect to leads.
    router.push('/admin/crm/leads');
  };

  return (
    <div className="min-h-screen bg-gray-50">
      <div className="bg-white border-b border-gray-200 px-6 py-5">
        <div className="flex items-center gap-4">
          <Link
            href="/admin/crm/leads"
            className="text-gray-500 hover:text-[#030256]"
          >
            ←
          </Link>
          <div>
            <h1 className="text-2xl font-bold text-gray-900">New Lead</h1>
            <p className="text-sm text-gray-600 mt-1">Add a new prospect to your pipeline</p>
          </div>
        </div>
      </div>

      <div className="p-6 max-w-2xl">
        <form onSubmit={handleSubmit} className="bg-white rounded-xl shadow-sm border border-gray-200 p-6 space-y-6">
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1.5">Full Name</label>
            <input
              type="text"
              value={name}
              onChange={(e) => setName(e.target.value)}
              required
              className="w-full px-4 py-2.5 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-[#030256] focus:border-[#030256]"
              placeholder="e.g. Basma Khaled"
            />
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1.5">Email</label>
            <input
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              required
              className="w-full px-4 py-2.5 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-[#030256] focus:border-[#030256]"
              placeholder="email@example.com"
            />
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1.5">Phone</label>
            <input
              type="tel"
              value={phone}
              onChange={(e) => setPhone(e.target.value)}
              className="w-full px-4 py-2.5 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-[#030256] focus:border-[#030256]"
              placeholder="+20 100 000 0000"
            />
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1.5">Source</label>
            <select
              value={source}
              onChange={(e) => setSource(e.target.value)}
              className="w-full px-4 py-2.5 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-[#030256] focus:border-[#030256]"
            >
              <option value="">Select source</option>
              <option value="FB Campaign">FB Campaign</option>
              <option value="Direct Message">Direct Message</option>
              <option value="FB Feed">FB Feed</option>
              <option value="Search Ads">Search Ads</option>
              <option value="Webinar">Webinar</option>
              <option value="Website">Website</option>
            </select>
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1.5">Assigned To</label>
            <select
              value={assignedTo}
              onChange={(e) => setAssignedTo(e.target.value)}
              className="w-full px-4 py-2.5 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-[#030256] focus:border-[#030256]"
            >
              <option value="">Select user</option>
              {assignedUsers.map((u) => (
                <option key={u.name} value={u.name}>{u.name}</option>
              ))}
            </select>
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1.5">Course of Interest</label>
            <select
              value={courseInterest}
              onChange={(e) => setCourseInterest(e.target.value)}
              className="w-full px-4 py-2.5 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-[#030256] focus:border-[#030256]"
            >
              <option value="">Select course</option>
              {coursesOfInterest.map((c) => (
                <option key={c} value={c}>{c}</option>
              ))}
            </select>
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1.5">Pipeline Stage</label>
            <select
              value={stage}
              onChange={(e) => setStage(e.target.value)}
              className="w-full px-4 py-2.5 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-[#030256] focus:border-[#030256]"
            >
              {pipelineStages.map((s) => (
                <option key={s.id} value={s.id}>{s.label}</option>
              ))}
            </select>
          </div>
          <div className="flex gap-3 pt-4">
            <Link
              href="/admin/crm/leads"
              className="px-4 py-2.5 border border-gray-300 rounded-lg text-gray-700 font-medium hover:bg-gray-50"
            >
              Cancel
            </Link>
            <button
              type="submit"
              className="px-4 py-2.5 bg-[#030256] text-white font-medium rounded-lg hover:bg-[#04036a] transition-colors"
            >
              Create Lead
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}
