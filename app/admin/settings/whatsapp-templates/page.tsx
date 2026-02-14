"use client";

import Link from "next/link";

export default function WhatsAppTemplatesPage() {
  return (
    <div className="p-6 lg:p-8">
      <nav className="text-sm text-gray-500 mb-6">
        <Link href="/admin/settings" className="hover:text-primary">
          Settings
        </Link>
        <span className="mx-1.5">/</span>
        <span className="text-gray-900 font-medium">WhatsApp Templates</span>
      </nav>
      <h1 className="text-2xl font-bold text-gray-900 mb-2">
        WhatsApp Templates
      </h1>
      <p className="text-gray-500 mb-8">
        Manage automated WhatsApp notification messages.
      </p>
      <div className="bg-white rounded-xl border border-gray-200 overflow-hidden max-w-2xl">
        <Link
          href="/admin/settings/whatsapp-templates/edit"
          className="flex items-center justify-between p-4 hover:bg-gray-50 transition-colors"
        >
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-lg bg-primary/10 flex items-center justify-center text-primary">
              💬
            </div>
            <div>
              <p className="font-semibold text-gray-900">
                Payment Receipt Notification
              </p>
              <p className="text-sm text-gray-500">Payment Receipt</p>
            </div>
          </div>
          <span className="text-primary font-medium">Edit →</span>
        </Link>
      </div>
    </div>
  );
}
