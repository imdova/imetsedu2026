"use client";

import "./verification-status.css";
import Link from "next/link";
import {
  Clock,
  Check,
  RefreshCw,
  FileDown,
  RotateCcw,
  Info,
  ShieldCheck,
} from "lucide-react";
import { ROUTES } from "@/constants";

const submissionDetails = {
  amountPaid: "1,250.00",
  referenceCode: "#IMT-998234",
  dateSubmitted: "Oct 24, 2023",
};

const steps = [
  {
    icon: Check,
    iconClass: "green",
    title: "Payment Submitted",
    desc: "Transfer proof received and logged into our system.",
  },
  {
    icon: RefreshCw,
    iconClass: "orange",
    title: "Finance Review",
    desc: "Our finance team is cross-referencing your transfer with bank records.",
  },
  {
    icon: Check,
    iconClass: "grey",
    title: "Enrollment Confirmation",
    desc: "Once verified, your course access will be instantly granted and you'll receive an email notification.",
  },
];

export default function VerificationStatusPage() {
  return (
    <div className="vs-page">
      <nav className="vs-breadcrumb" aria-label="Breadcrumb">
        <Link href={ROUTES.STUDENT.BILLING}>Billing</Link>
        <span>&gt;</span>
        <span>Verification Status</span>
      </nav>

      <div className="vs-layout">
        <main>
          <div className="vs-main-card">
            <div className="vs-status-icon-wrap">
              <Clock className="w-10 h-10" strokeWidth={2} />
            </div>
            <h1 className="vs-status-title">Pending Verification</h1>
            <p className="vs-status-desc">
              Your payment is currently being reviewed by our finance team. This
              usually takes <strong>24-48 business hours.</strong>
            </p>

            <h2 className="vs-section-title">Submission Details</h2>
            <div className="vs-details-grid">
              <div className="vs-detail-box">
                <div className="vs-detail-label">Amount Paid</div>
                <div className="vs-detail-value blue">
                  ${submissionDetails.amountPaid}
                </div>
              </div>
              <div className="vs-detail-box">
                <div className="vs-detail-label">Reference Code</div>
                <div className="vs-detail-value">
                  {submissionDetails.referenceCode}
                </div>
              </div>
              <div className="vs-detail-box">
                <div className="vs-detail-label">Date Submitted</div>
                <div className="vs-detail-value">
                  {submissionDetails.dateSubmitted}
                </div>
              </div>
            </div>

            <section className="vs-what-next" aria-label="What happens next">
              <div className="vs-what-next-header">
                <Info className="vs-info-icon" strokeWidth={2} />
                <h2 className="vs-what-next-title">What happens next?</h2>
              </div>
              <div className="vs-steps">
                {steps.map((step) => {
                  const Icon = step.icon;
                  return (
                    <div key={step.title} className="vs-step">
                      <div className={`vs-step-icon ${step.iconClass}`}>
                        <Icon className="w-3.5 h-3.5" strokeWidth={2.5} />
                      </div>
                      <div className="vs-step-body">
                        <h4>{step.title}</h4>
                        <p>{step.desc}</p>
                      </div>
                    </div>
                  );
                })}
              </div>
            </section>
          </div>
        </main>

        <aside className="vs-sidebar">
          <div className="vs-sidebar-card vs-quick-actions">
            <h2 className="vs-section-title">Quick Actions</h2>
            <div className="vs-quick-actions-btns">
              <button type="button" className="vs-quick-btn primary">
                <FileDown className="w-4 h-4" strokeWidth={2} />
                Download Receipt
              </button>
              <Link
                href={ROUTES.STUDENT.BILLING}
                className="vs-quick-btn secondary"
              >
                <RotateCcw className="w-4 h-4" strokeWidth={2} />
                View Billing History
              </Link>
            </div>
            <p className="vs-need-help">
              Need help? <Link href="#">Contact Support</Link>
            </p>
          </div>

          <div className="vs-sidebar-card vs-safe-card">
            <div className="vs-safe-icon">
              <ShieldCheck className="w-6 h-6" strokeWidth={2} />
            </div>
            <h3 className="vs-safe-title">Safe & Secure</h3>
            <p className="vs-safe-text">
              All transactions at IMETS Academy are encrypted and verified
              manually to ensure student security and enrollment accuracy.
            </p>
          </div>
        </aside>
      </div>

      <footer className="vs-footer">
        © 2023 IMETS Academy. All rights reserved.
        <span>|</span>
        <Link href="#">Terms of Service</Link>
        <span>|</span>
        <Link href="#">Privacy Policy</Link>
      </footer>
    </div>
  );
}
