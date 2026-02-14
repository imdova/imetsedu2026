import { ROUTES } from "@/constants";
import Link from "next/link";

export default function AdminReportsPage() {
  return (
    <div className="min-h-screen bg-[#F8F9FA] p-6">
      <div className="max-w-2xl mx-auto bg-white rounded-xl shadow-sm border border-gray-100 p-8 text-center">
        <h1 className="text-2xl font-bold text-gray-900 mb-2">Reports</h1>
        <p className="text-gray-600 mb-6">
          Full reports and analytics. Use the dashboard for key metrics.
        </p>
        <Link
          href={ROUTES.ADMIN.DASHBOARD}
          className="inline-flex items-center gap-2 px-4 py-2 bg-primary text-white rounded-lg font-medium hover:bg-primary/90"
        >
          Back to Dashboard
        </Link>
      </div>
    </div>
  );
}
