'use client';

import { useState } from 'react';
import Link from 'next/link';
import { useRouter } from 'next/navigation';
import { mockEvents } from '@/lib/eventData';
import { Event } from '@/types/event';

export default function ManageEventsPage() {
  const router = useRouter();
  const [events, setEvents] = useState<Event[]>(mockEvents);
  const [filterStatus, setFilterStatus] = useState<string>('all');

  const filteredEvents = events.filter((event) => {
    if (filterStatus === 'all') return true;
    return event.status === filterStatus;
  });

  const handleDelete = (eventId: string) => {
    if (confirm('Are you sure you want to delete this event? This action cannot be undone.')) {
      setEvents(events.filter((e) => e.id !== eventId));
    }
  };

  const handleStatusChange = (eventId: string, newStatus: Event['status']) => {
    setEvents(events.map((e) => (e.id === eventId ? { ...e, status: newStatus } : e)));
  };

  return (
    <div className="p-8">
      <div className="mb-8 flex justify-between items-center">
        <div>
          <h1 className="text-3xl font-bold text-gray-900 mb-2">Manage Events</h1>
          <p className="text-gray-600">Edit, delete, and manage all your events</p>
        </div>
        <Link
          href="/instructor/events/new"
          className="bg-green-600 text-white px-6 py-3 rounded-lg font-semibold hover:bg-green-700 transition-colors"
        >
          + Create New Event
        </Link>
      </div>

      {/* Filter */}
      <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-4 mb-6">
        <div className="flex items-center space-x-4">
          <span className="text-sm font-semibold text-gray-700">Filter by status:</span>
          {['all', 'draft', 'published', 'completed', 'cancelled'].map((status) => (
            <button
              key={status}
              onClick={() => setFilterStatus(status)}
              className={`px-4 py-2 rounded-lg font-semibold transition-colors ${
                filterStatus === status
                  ? 'bg-green-600 text-white'
                  : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
              }`}
            >
              {status.charAt(0).toUpperCase() + status.slice(1)}
            </button>
          ))}
        </div>
      </div>

      {/* Events Table */}
      {filteredEvents.length === 0 ? (
        <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-12 text-center">
          <div className="text-6xl mb-4">📅</div>
          <h2 className="text-2xl font-bold text-gray-900 mb-2">No events found</h2>
          <p className="text-gray-600 mb-6">Get started by creating your first event</p>
          <Link
            href="/instructor/events/new"
            className="inline-block bg-green-600 text-white px-6 py-3 rounded-lg font-semibold hover:bg-green-700 transition-colors"
          >
            Create Your First Event
          </Link>
        </div>
      ) : (
        <div className="bg-white rounded-lg shadow-sm border border-gray-200 overflow-hidden">
          <div className="overflow-x-auto">
            <table className="w-full">
              <thead className="bg-gray-50 border-b border-gray-200">
                <tr>
                  <th className="px-6 py-4 text-left text-sm font-semibold text-gray-900">Event Title</th>
                  <th className="px-6 py-4 text-left text-sm font-semibold text-gray-900">Date & Time</th>
                  <th className="px-6 py-4 text-left text-sm font-semibold text-gray-900">Location</th>
                  <th className="px-6 py-4 text-left text-sm font-semibold text-gray-900">Attendees</th>
                  <th className="px-6 py-4 text-left text-sm font-semibold text-gray-900">Price</th>
                  <th className="px-6 py-4 text-left text-sm font-semibold text-gray-900">Status</th>
                  <th className="px-6 py-4 text-left text-sm font-semibold text-gray-900">Actions</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-gray-200">
                {filteredEvents.map((event) => (
                  <tr key={event.id} className="hover:bg-gray-50">
                    <td className="px-6 py-4">
                      <div>
                        <p className="font-semibold text-gray-900">{event.title}</p>
                        <p className="text-sm text-gray-500 line-clamp-1">{event.description}</p>
                      </div>
                    </td>
                    <td className="px-6 py-4 text-gray-700">
                      <div>
                        <p className="text-sm">{new Date(event.startDate).toLocaleDateString()}</p>
                        <p className="text-xs text-gray-500">{event.startTime} - {event.endTime}</p>
                      </div>
                    </td>
                    <td className="px-6 py-4 text-gray-700">
                      {event.isOnline ? (
                        <span className="text-sm">🌐 Online</span>
                      ) : (
                        <span className="text-sm">{event.location}</span>
                      )}
                    </td>
                    <td className="px-6 py-4 text-gray-700">
                      {event.currentAttendees}/{event.maxAttendees || '∞'}
                    </td>
                    <td className="px-6 py-4 text-gray-700">
                      ${event.price.toFixed(2)}
                    </td>
                    <td className="px-6 py-4">
                      <select
                        value={event.status}
                        onChange={(e) => handleStatusChange(event.id, e.target.value as Event['status'])}
                        className={`px-3 py-1 rounded-full text-xs font-semibold border-0 ${
                          event.status === 'published'
                            ? 'bg-green-100 text-green-700'
                            : event.status === 'draft'
                            ? 'bg-gray-100 text-gray-700'
                            : event.status === 'completed'
                            ? 'bg-blue-100 text-blue-700'
                            : 'bg-red-100 text-red-700'
                        }`}
                      >
                        <option value="draft">Draft</option>
                        <option value="published">Published</option>
                        <option value="completed">Completed</option>
                        <option value="cancelled">Cancelled</option>
                      </select>
                    </td>
                    <td className="px-6 py-4">
                      <div className="flex items-center space-x-3">
                        <Link
                          href={`/instructor/events/${event.id}/edit`}
                          className="text-blue-600 hover:text-blue-700 font-semibold text-sm"
                        >
                          Edit
                        </Link>
                        <button
                          onClick={() => handleDelete(event.id)}
                          className="text-red-600 hover:text-red-700 font-semibold text-sm"
                        >
                          Delete
                        </button>
                      </div>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      )}
    </div>
  );
}
