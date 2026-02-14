"use client";

import Link from "next/link";
import { CreditCard, FileText, ChevronRight } from "lucide-react";
import { ROUTES } from "@/constants";

const settingsLinks = [
  {
    title: "Payment Methods",
    description:
      "Manage your saved cards and bank accounts for tuition payments.",
    href: ROUTES.STUDENT.PAYMENT_METHODS,
    icon: CreditCard,
  },
  {
    title: "Billing History",
    description: "View invoices, transaction history, and upcoming payments.",
    href: ROUTES.STUDENT.BILLING,
    icon: FileText,
  },
];

export default function StudentSettingsPage() {
  return (
    <div className="p-6 lg:p-8 max-w-2xl">
      <h1 className="text-2xl font-bold text-gray-900 mb-2">Settings</h1>
      <p className="text-gray-600 mb-8">
        Manage your account, payment methods, and billing.
      </p>
      <ul className="space-y-4">
        {settingsLinks.map((item) => {
          const Icon = item.icon;
          return (
            <li key={item.href}>
              <Link
                href={item.href}
                className="flex items-center gap-4 p-4 rounded-xl border border-gray-200 bg-white hover:border-primary hover:shadow-sm transition-all group"
              >
                <div className="w-10 h-10 rounded-lg bg-primary/70 text-primary flex items-center justify-center shrink-0">
                  <Icon className="w-5 h-5" strokeWidth={2} />
                </div>
                <div className="flex-1 min-w-0">
                  <h2 className="font-semibold text-gray-900 group-hover:text-primary transition-colors">
                    {item.title}
                  </h2>
                  <p className="text-sm text-gray-500 mt-0.5">
                    {item.description}
                  </p>
                </div>
                <ChevronRight
                  className="w-5 h-5 text-gray-400 group-hover:text-primary shrink-0"
                  strokeWidth={2}
                />
              </Link>
            </li>
          );
        })}
      </ul>
    </div>
  );
}
