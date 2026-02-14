"use client";

import "./checkout.css";
import { useState } from "react";
import Link from "next/link";
import {
  Lock,
  CreditCard,
  Landmark,
  Wallet,
  Shield,
  AlertTriangle,
  FileDown,
  HelpCircle,
  Check,
  X,
  Printer,
  LayoutDashboard,
  RotateCcw,
  Copy,
  CloudUpload,
  Calendar,
  ArrowRight,
  Clock,
  Info,
  Smartphone,
  Zap,
} from "lucide-react";
import { ROUTES } from "@/constants";

type PaymentMethod = "card" | "bank" | "instapay" | "wallet";

const orderSummary = {
  courseName: "Advanced Cloud Architecture Masterclass",
  studentId: "IM-882910",
  items: [
    { label: "Installment #2 of 4", amount: "1,250.00" },
    { label: "Administration Fee", amount: "25.00" },
    { label: "Late Processing Fee", amount: "50.00", warning: true },
  ],
  total: "1,325.00",
};

function CopyField({ label, value }: { label: string; value: string }) {
  const copy = () => navigator.clipboard?.writeText(value);
  return (
    <div className="btv-field">
      <label className="btv-label">{label}</label>
      <div className="btv-copy-field">
        <span className="btv-copy-value">{value}</span>
        <button
          type="button"
          className="btv-copy-icon-btn"
          onClick={copy}
          aria-label={`Copy ${label}`}
        >
          <Copy className="w-4 h-4" strokeWidth={2} />
        </button>
      </div>
    </div>
  );
}

const confirmationData = {
  studentName: "Alex Chen",
  courseName: "Advanced Data Science & Machine Learning",
  receiptId: "#IM-2023-9981",
  studentEmail: "alex.chen@example.com",
  studentId: "IM-90210",
  paymentDate: "October 24, 2023",
  paymentMethod: "Visa ending in **** 4242",
  breakdown: [
    {
      name: "Advanced Data Science & Machine Learning",
      sub: "Installment 1 of 3 (Q4 2023)",
      amount: "425.00",
    },
    { name: "Service Fee", sub: null, amount: "15.00" },
    { name: "Applicable Taxes (0%)", sub: null, amount: "10.00" },
  ],
  totalPaid: "450.00",
};

export default function StudentCheckoutPage() {
  const [method, setMethod] = useState<PaymentMethod>("card");
  const [showConfirmationModal, setShowConfirmationModal] = useState(false);

  return (
    <div className="checkout-page">
      <nav className="checkout-breadcrumb" aria-label="Breadcrumb">
        <Link href={ROUTES.STUDENT.COURSES}>Enrollment</Link>
        <span>/</span>
        <Link href={ROUTES.STUDENT.COURSES}>Course Selection</Link>
        <span>/</span>
        <span>Secure Checkout</span>
      </nav>

      <div className="checkout-layout">
        {/* Left: Make a Payment */}
        <section className="checkout-form-section">
          <h1 className="checkout-form-title">Make a Payment</h1>
          <p className="checkout-secure-note">
            <Lock className="w-4 h-4" strokeWidth={2} />
            Secure and encrypted transaction
          </p>

          <div className="checkout-tabs" role="tablist">
            <button
              type="button"
              role="tab"
              aria-selected={method === "card"}
              className={`checkout-tab ${method === "card" ? "active" : ""}`}
              onClick={() => setMethod("card")}
            >
              <CreditCard className="w-4 h-4" strokeWidth={2} />
              New Card
            </button>
            <button
              type="button"
              role="tab"
              aria-selected={method === "bank"}
              className={`checkout-tab ${method === "bank" ? "active" : ""}`}
              onClick={() => setMethod("bank")}
            >
              <Landmark className="w-4 h-4" strokeWidth={2} />
              Bank Transfer
            </button>
            <button
              type="button"
              role="tab"
              aria-selected={method === "instapay"}
              className={`checkout-tab ${
                method === "instapay" ? "active" : ""
              }`}
              onClick={() => setMethod("instapay")}
            >
              <Smartphone className="w-4 h-4" strokeWidth={2} />
              Instapay
            </button>
            <button
              type="button"
              role="tab"
              aria-selected={method === "wallet"}
              className={`checkout-tab ${method === "wallet" ? "active" : ""}`}
              onClick={() => setMethod("wallet")}
            >
              <Wallet className="w-4 h-4" strokeWidth={2} />
              Wallet
            </button>
          </div>

          {method === "card" && (
            <>
              <div className="checkout-field">
                <label htmlFor="cardholder">Cardholder Name</label>
                <input
                  id="cardholder"
                  type="text"
                  defaultValue="John Doe"
                  placeholder="Cardholder Name"
                />
              </div>
              <div className="checkout-field">
                <label htmlFor="cardnumber">Card Number</label>
                <div className="checkout-field-wrap">
                  <input
                    id="cardnumber"
                    type="text"
                    placeholder="0000 0000 0000 0000"
                    maxLength={19}
                  />
                  <span className="checkout-card-brands" aria-hidden>
                    <span className="visa">VISA</span>
                    <span className="mc">MC</span>
                  </span>
                </div>
              </div>
              <div className="checkout-row-2">
                <div className="checkout-field">
                  <label htmlFor="expiry">Expiry Date</label>
                  <input
                    id="expiry"
                    type="text"
                    placeholder="MM/YY"
                    maxLength={5}
                  />
                </div>
                <div className="checkout-field">
                  <label htmlFor="cvv">CVV / CVC</label>
                  <div className="checkout-field-wrap">
                    <input
                      id="cvv"
                      type="text"
                      defaultValue="123"
                      placeholder="123"
                      maxLength={4}
                    />
                    <span
                      className="checkout-cvv-info"
                      title="3 digits on back of card"
                    >
                      <HelpCircle className="w-4 h-4" strokeWidth={2} />
                    </span>
                  </div>
                </div>
              </div>
              <div className="checkout-checkbox-wrap">
                <input id="savecard" type="checkbox" />
                <label htmlFor="savecard">
                  Save card details for future installments
                </label>
              </div>
              <div className="checkout-shield-banner">
                <Shield className="w-5 h-5" strokeWidth={2} />
                <p className="checkout-shield-text">
                  <strong>IMETS Secure Shield.</strong> Your data is protected
                  with 256-bit SSL encryption. We never store your CVV.
                </p>
              </div>
            </>
          )}

          {method === "bank" && (
            <div className="btv-block">
              <div className="btv-header">
                <div className="btv-header-left">
                  <Landmark className="btv-header-icon" strokeWidth={2} />
                  <div>
                    <h2 className="btv-title">Bank Transfer & Verification</h2>
                    <p className="btv-subtitle">
                      Complete your payment to activate your courses
                    </p>
                  </div>
                </div>
              </div>
              <div className="btv-columns">
                <div className="btv-col">
                  <h3 className="btv-section-title">
                    1. Bank Transfer Details
                  </h3>
                  <CopyField
                    label="Account Name"
                    value="IMETS Educational Services"
                  />
                  <CopyField
                    label="Bank Name"
                    value="International Merchant Bank"
                  />
                  <CopyField
                    label="IBAN"
                    value="AE12 3456 7890 1234 5678 901"
                  />
                  <CopyField label="SWIFT / BIC" value="IMBKAEXX" />
                  <div className="btv-critical-box">
                    <div className="btv-critical-header">
                      <AlertTriangle className="w-5 h-5" strokeWidth={2} />
                      <span>Critical Reference Code</span>
                    </div>
                    <p className="btv-critical-note">
                      You must include this code in your bank transfer
                      description to avoid delays.
                    </p>
                    <div className="btv-critical-code-wrap">
                      <span className="btv-critical-code">REF-IMETS-2024</span>
                      <button type="button" className="btv-copy-btn">
                        <Copy className="w-4 h-4" strokeWidth={2} />
                        Copy
                      </button>
                    </div>
                  </div>
                </div>
                <div className="btv-col">
                  <h3 className="btv-section-title">
                    2. Upload Proof of Payment
                  </h3>
                  <div className="btv-field">
                    <label className="btv-label">
                      Upload Receipt (PDF, JPG, PNG)
                    </label>
                    <div className="btv-upload-zone">
                      <CloudUpload
                        className="w-10 h-10 text-gray-400"
                        strokeWidth={1.5}
                      />
                      <span className="btv-upload-text">
                        Drag and drop or click to upload
                      </span>
                      <span className="btv-upload-hint">
                        Maximum file size: 5MB
                      </span>
                    </div>
                  </div>
                  <div className="btv-row-2">
                    <div className="btv-field">
                      <label className="btv-label">Date of Transfer</label>
                      <div className="btv-input-wrap">
                        <input
                          type="text"
                          placeholder="mm/dd/yyyy"
                          className="btv-input"
                        />
                        <Calendar
                          className="w-4 h-4 btv-input-icon"
                          strokeWidth={2}
                        />
                      </div>
                    </div>
                    <div className="btv-field">
                      <label className="btv-label">Amount (USD)</label>
                      <input
                        type="text"
                        placeholder="$ 0.00"
                        className="btv-input"
                      />
                    </div>
                  </div>
                  <div className="btv-verify-note">
                    <Clock className="w-5 h-5 shrink-0" strokeWidth={2} />
                    <p>
                      <strong>Verification Process</strong> Our finance team
                      will manually verify your payment within 24-48 business
                      hours. You will receive an email confirmation once
                      approved.
                    </p>
                  </div>
                  <Link
                    href={ROUTES.STUDENT.VERIFICATION_STATUS}
                    className="btv-submit-btn"
                  >
                    Submit for Verification
                    <ArrowRight className="w-5 h-5" strokeWidth={2} />
                  </Link>
                </div>
              </div>
              <div className="btv-footer-badges">
                <span className="btv-badge">
                  <Lock className="w-4 h-4" strokeWidth={2} /> Secure Payment
                </span>
                <span className="btv-badge">
                  <Check className="w-4 h-4" strokeWidth={2} /> Finance Verified
                </span>
              </div>
            </div>
          )}

          {method === "instapay" && (
            <div className="ip-block">
              <div className="ip-two-col">
                <div className="ip-left">
                  <div className="ip-details-header">
                    <div className="ip-logo-wrap">
                      <Smartphone className="w-5 h-5" strokeWidth={2} />
                    </div>
                    <h2 className="ip-details-title">Instapay Details</h2>
                  </div>
                  <div className="ip-qr-section">
                    <div className="ip-qr-box">
                      <div className="ip-qr-brand">IMETS</div>
                      <div className="ip-qr-tagline">
                        THE NEW AGE OF LEARNING
                      </div>
                      <div className="ip-qr-code" />
                    </div>
                    <p className="ip-scan-text">Scan to Pay</p>
                  </div>
                  <div className="ip-ipa-section">
                    <label className="ip-ipa-label">
                      Official Instapay Address (IPA)
                    </label>
                    <div className="ip-copy-row">
                      <input
                        type="text"
                        readOnly
                        defaultValue="official.imets.academy@instap..."
                        className="ip-ipa-input"
                      />
                      <button
                        type="button"
                        className="ip-copy-btn"
                        aria-label="Copy IPA"
                      >
                        <Copy className="w-4 h-4" strokeWidth={2} />
                      </button>
                    </div>
                  </div>
                  <div className="ip-realtime-box">
                    <Zap className="w-5 h-5" strokeWidth={2} />
                    <div>
                      <strong>Real-time Verification</strong>
                      <p>
                        Instapay transfers are prioritized and usually verified
                        within 1-2 hours.
                      </p>
                    </div>
                  </div>
                </div>
                <div className="ip-right">
                  <div className="ip-confirm-header">
                    <div>
                      <h2 className="ip-confirm-title">
                        Transfer Confirmation
                      </h2>
                      <p className="ip-confirm-subtitle">
                        Submit your transaction details for validation
                      </p>
                    </div>
                  </div>
                  <div className="ip-form">
                    <div className="ip-field">
                      <label className="ip-label">
                        Sender&apos;s Instapay Address
                      </label>
                      <input
                        type="text"
                        className="ip-input"
                        placeholder="yourname@bank"
                      />
                    </div>
                    <div className="ip-row-2">
                      <div className="ip-field">
                        <label className="ip-label">Transaction Ref #</label>
                        <input
                          type="text"
                          className="ip-input"
                          placeholder="12-digit number"
                        />
                      </div>
                      <div className="ip-field">
                        <label className="ip-label">Amount Paid (PHP)</label>
                        <input
                          type="text"
                          className="ip-input"
                          defaultValue="0.00"
                          placeholder="0.00"
                        />
                      </div>
                    </div>
                    <div className="ip-field">
                      <label className="ip-label">Upload Receipt</label>
                      <div className="ip-upload-zone">
                        <CloudUpload
                          className="w-10 h-10 text-primary"
                          strokeWidth={1.5}
                        />
                        <span className="ip-upload-text">
                          Click to upload screenshot
                        </span>
                        <span className="ip-upload-hint">
                          PNG, JPG or PDF (max. 5MB)
                        </span>
                      </div>
                    </div>
                  </div>
                  <div className="ip-footer-btns">
                    <button type="button" className="ip-cancel-btn">
                      Cancel
                    </button>
                    <Link
                      href={ROUTES.STUDENT.VERIFICATION_STATUS}
                      className="ip-submit-btn"
                    >
                      Submit for Verification
                      <Check className="w-4 h-4" strokeWidth={2} />
                    </Link>
                  </div>
                </div>
              </div>
              <p className="ip-secure-footer">
                <Lock className="w-4 h-4" strokeWidth={2} />
                Secure SSL Encrypted Transaction
              </p>
            </div>
          )}

          {method === "wallet" && (
            <div className="ew-block">
              <div className="ew-header">
                <Wallet className="ew-header-icon" strokeWidth={2} />
                <div>
                  <h2 className="ew-title">E-wallet Transfer & Verification</h2>
                  <p className="ew-subtitle">
                    Complete your payment and submit the proof for verification
                  </p>
                </div>
              </div>

              <section className="ew-section">
                <div className="ew-section-head">
                  <span className="ew-step-num">1</span>
                  <h3 className="ew-section-title">E-wallet Details</h3>
                </div>
                <div className="ew-section-grid">
                  <div className="ew-details">
                    <p className="ew-wallet-label">Official Academy Wallet</p>
                    <p className="ew-provider">Vodafone Cash / Fawry</p>
                    <div className="ew-field">
                      <label className="ew-label">Phone Number / ID</label>
                      <div className="ew-copy-field">
                        <input
                          type="text"
                          defaultValue="010 1234 5678"
                          readOnly
                          className="ew-input-readonly"
                        />
                        <button
                          type="button"
                          className="ew-copy-btn"
                          aria-label="Copy"
                        >
                          <Copy className="w-4 h-4" strokeWidth={2} />
                        </button>
                      </div>
                    </div>
                    <div className="ew-field">
                      <label className="ew-label">Account Name</label>
                      <p className="ew-account-name">
                        IMETS Educational Academy Ltd.
                      </p>
                    </div>
                  </div>
                  <div className="ew-qr-block">
                    <div className="ew-qr-placeholder">
                      <div className="ew-qr-inner" />
                    </div>
                    <p className="ew-qr-hint">
                      Scan for quick transfer via your E-wallet app
                    </p>
                  </div>
                </div>
              </section>

              <section className="ew-section">
                <div className="ew-section-head">
                  <span className="ew-step-num">2</span>
                  <h3 className="ew-section-title">Submission Form</h3>
                </div>
                <div className="ew-section-grid">
                  <div className="ew-form-fields">
                    <div className="ew-field">
                      <label className="ew-label">Transaction ID</label>
                      <input
                        type="text"
                        className="ew-input"
                        placeholder="e.g. 982341765"
                      />
                    </div>
                    <div className="ew-field">
                      <label className="ew-label">Sender Number / ID</label>
                      <input
                        type="text"
                        className="ew-input"
                        placeholder="The number you sent from"
                      />
                    </div>
                    <div className="ew-field">
                      <label className="ew-label">
                        Amount Transferred (EGP)
                      </label>
                      <div className="ew-amount-wrap">
                        <span className="ew-amount-prefix">EGP</span>
                        <input
                          type="text"
                          className="ew-input ew-input-amount"
                          placeholder="0.00"
                        />
                      </div>
                    </div>
                  </div>
                  <div className="ew-upload-block">
                    <label className="ew-label">Upload Screenshot Proof</label>
                    <div className="ew-upload-zone">
                      <CloudUpload
                        className="w-12 h-12 text-primary"
                        strokeWidth={1.5}
                      />
                      <span className="ew-upload-text">
                        Click to upload or drag & drop
                      </span>
                      <span className="ew-upload-hint">
                        PNG, JPG or PDF (max. 5MB)
                      </span>
                    </div>
                  </div>
                </div>
              </section>

              <div className="ew-info-box">
                <Info className="w-5 h-5 shrink-0" strokeWidth={2} />
                <p>
                  E-wallet verifications are typically handled within{" "}
                  <strong>12-24 hours</strong>. You will receive an email
                  notification and account update once your transaction is
                  confirmed by our financial team.
                </p>
              </div>

              <div className="ew-footer">
                <span className="ew-secure-msg">
                  <Check className="w-4 h-4" strokeWidth={2} /> Secure IMETS
                  Payment Gateway
                </span>
                <div className="ew-footer-btns">
                  <button type="button" className="ew-cancel-btn">
                    Cancel
                  </button>
                  <Link
                    href={ROUTES.STUDENT.VERIFICATION_STATUS}
                    className="ew-submit-btn"
                  >
                    Submit Transaction
                    <ArrowRight className="w-4 h-4" strokeWidth={2} />
                  </Link>
                </div>
              </div>
            </div>
          )}
        </section>

        {/* Right: Order Summary */}
        <aside className="checkout-summary-card">
          <h2 className="checkout-summary-title">Order Summary</h2>
          <p className="checkout-selected-label">Selected Course</p>
          <p className="checkout-course-name">{orderSummary.courseName}</p>
          <p className="checkout-student-id">
            Student ID: {orderSummary.studentId}
          </p>

          <div className="checkout-line-items">
            {orderSummary.items.map((item) => (
              <div
                key={item.label}
                className={`checkout-line-item ${
                  item.warning ? "warning" : ""
                }`}
              >
                <span className="label">
                  {item.warning && (
                    <AlertTriangle className="w-4 h-4 inline" strokeWidth={2} />
                  )}
                  {item.label}
                </span>
                <span className="amount">${item.amount}</span>
              </div>
            ))}
          </div>

          <div className="checkout-total-row">
            <span className="checkout-total-label">Total to Pay</span>
            <span className="checkout-total-amount">${orderSummary.total}</span>
          </div>

          <button
            type="button"
            className="checkout-complete-btn"
            onClick={() => setShowConfirmationModal(true)}
          >
            <Shield className="w-5 h-5" strokeWidth={2} />
            Complete Payment
          </button>

          <p className="checkout-stripe-note">Transaction secured by Stripe</p>

          <div className="checkout-summary-links">
            <Link href="#">
              <HelpCircle className="w-4 h-4" strokeWidth={2} />
              Need help with payment?
            </Link>
            <Link href="#">
              <FileDown className="w-4 h-4" strokeWidth={2} />
              Download Invoice Draft (PDF)
            </Link>
          </div>
        </aside>
      </div>

      <footer className="checkout-footer">
        <span>© 2024 IMETS Academy. All rights reserved.</span>
        <div className="checkout-footer-links">
          <Link href="#">Privacy Policy</Link>
          <Link href="#">Terms of Service</Link>
          <Link href="#">Refund Policy</Link>
          <Link href="#">Support</Link>
        </div>
      </footer>

      {/* Payment Confirmation Modal */}
      {showConfirmationModal && (
        <div
          className="payment-modal-overlay"
          role="dialog"
          aria-modal="true"
          aria-labelledby="payment-confirmation-title"
          onClick={(e) =>
            e.target === e.currentTarget && setShowConfirmationModal(false)
          }
        >
          <div className="payment-modal" onClick={(e) => e.stopPropagation()}>
            <button
              type="button"
              className="payment-modal-close"
              aria-label="Close"
              onClick={() => setShowConfirmationModal(false)}
            >
              <X className="w-5 h-5" strokeWidth={2} />
            </button>
            <div className="payment-modal-body">
              <div className="payment-modal-success-icon">
                <Check className="w-9 h-9" strokeWidth={2.5} />
              </div>
              <h2
                id="payment-confirmation-title"
                className="payment-modal-title"
              >
                Payment Confirmed!
              </h2>
              <p className="payment-modal-message">
                Thank you, <strong>{confirmationData.studentName}</strong>! Your
                enrollment for <strong>{confirmationData.courseName}</strong> is
                now active.
              </p>

              <div className="payment-receipt-card">
                <div className="payment-receipt-grid">
                  <div>
                    <div className="payment-receipt-label">Receipt Number</div>
                    <div className="payment-receipt-id">
                      {confirmationData.receiptId}
                    </div>
                    <div className="payment-receipt-section-title">
                      Student Information
                    </div>
                    <p className="payment-receipt-detail">
                      {confirmationData.studentName}
                    </p>
                    <p className="payment-receipt-detail">
                      {confirmationData.studentEmail}
                    </p>
                    <p className="payment-receipt-detail">
                      Student ID: {confirmationData.studentId}
                    </p>
                    <div className="payment-receipt-section-title">
                      Payment Breakdown
                    </div>
                    {confirmationData.breakdown.map((item) => (
                      <div key={item.name} className="payment-receipt-line">
                        <div>
                          <span className="name">{item.name}</span>
                          {item.sub && <div className="sub">{item.sub}</div>}
                        </div>
                        <span className="amt">${item.amount}</span>
                      </div>
                    ))}
                    <div className="payment-receipt-total-row">
                      <span className="payment-receipt-total-label">
                        Total Amount Paid
                      </span>
                      <span className="payment-receipt-total-amount">
                        ${confirmationData.totalPaid}
                      </span>
                    </div>
                  </div>
                  <div>
                    <div className="payment-receipt-label">Payment Date</div>
                    <p className="payment-receipt-date">
                      {confirmationData.paymentDate}
                    </p>
                    <div className="payment-receipt-section-title">
                      Payment Method
                    </div>
                    <div className="payment-receipt-method">
                      <CreditCard
                        className="w-4 h-4 text-primary"
                        strokeWidth={2}
                      />
                      {confirmationData.paymentMethod}
                    </div>
                  </div>
                </div>
                <div className="payment-receipt-actions">
                  <button type="button" className="payment-receipt-btn primary">
                    <FileDown className="w-4 h-4" strokeWidth={2} />
                    Download PDF Receipt
                  </button>
                  <button
                    type="button"
                    className="payment-receipt-btn secondary"
                  >
                    <Printer className="w-4 h-4" strokeWidth={2} />
                    Print Receipt
                  </button>
                </div>
                <p className="payment-receipt-secure">
                  <Lock className="w-4 h-4" strokeWidth={2} />
                  Secure encrypted transaction handled by IMETS Payments.
                </p>
              </div>

              <h3 className="payment-whats-next">What&apos;s next?</h3>
              <div className="payment-next-cards">
                <Link
                  href={ROUTES.STUDENT.DASHBOARD}
                  className="payment-next-card"
                  onClick={() => setShowConfirmationModal(false)}
                >
                  <div className="payment-next-card-icon">
                    <LayoutDashboard className="w-5 h-5" strokeWidth={2} />
                  </div>
                  <div className="payment-next-card-title">
                    Learning Dashboard
                  </div>
                  <p className="payment-next-card-desc">
                    Access your course materials and start your learning
                    journey.
                  </p>
                </Link>
                <Link
                  href={ROUTES.STUDENT.BILLING}
                  className="payment-next-card"
                  onClick={() => setShowConfirmationModal(false)}
                >
                  <div className="payment-next-card-icon">
                    <RotateCcw className="w-5 h-5" strokeWidth={2} />
                  </div>
                  <div className="payment-next-card-title">Billing History</div>
                  <p className="payment-next-card-desc">
                    View all past transactions, invoices, and future installment
                    dates.
                  </p>
                </Link>
              </div>

              <p className="payment-modal-support">
                Having trouble with your payment or receipt?{" "}
                <Link href="#" onClick={(e) => e.stopPropagation()}>
                  Contact IMETS Student Support
                </Link>
              </p>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
