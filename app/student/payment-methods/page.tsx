"use client";

import "./payment-methods.css";
import { useState } from "react";
import Link from "next/link";
import {
  CreditCard,
  Landmark,
  Wallet,
  Pencil,
  Trash2,
  Lock,
  Plus,
  Shield,
  LockKeyhole,
  ShieldCheck,
  MapPin,
  ChevronRight,
  Check,
} from "lucide-react";
import { ROUTES } from "@/constants";

type AddMethodTab = "card" | "bank" | "wallet";

const savedMethods = [
  {
    id: "1",
    type: "visa" as const,
    label: "Visa ending in...",
    expiry: "12/25",
    primary: true,
  },
  {
    id: "2",
    type: "mastercard" as const,
    label: "Mastercard ending i...",
    expiry: "05/26",
    primary: false,
  },
];

export default function PaymentMethodsPage() {
  const [addTab, setAddTab] = useState<AddMethodTab>("card");
  const [primaryId, setPrimaryId] = useState("1");

  return (
    <div className="pm-page">
      <header className="pm-header">
        <h1 className="pm-title">Manage Payment Methods</h1>
        <p className="pm-subtitle">
          Securely manage your saved cards and bank accounts for tuition
          payments.
        </p>
      </header>

      <div className="pm-layout">
        <main>
          {/* Saved Payment Methods */}
          <section className="pm-section">
            <div className="pm-section-header">
              <h2 className="pm-section-title">Saved Payment Methods</h2>
              <span className="pm-badge">{savedMethods.length} Saved</span>
            </div>
            {savedMethods.map((card) => (
              <div key={card.id} className="pm-card-item">
                <div
                  className={`pm-card-icon ${
                    card.type === "mastercard" ? "mastercard" : ""
                  }`}
                >
                  <CreditCard className="w-6 h-6" strokeWidth={2} />
                </div>
                <div className="pm-card-body">
                  <div className="pm-card-row">
                    <span className="pm-card-label">{card.label}</span>
                    {card.primary && (
                      <span className="pm-card-primary-pill">Primary</span>
                    )}
                  </div>
                  <p className="pm-card-expiry">Expires {card.expiry}</p>
                  <div className="pm-card-actions">
                    <button type="button" className="pm-card-action-btn">
                      <Pencil className="w-4 h-4" strokeWidth={2} />
                      Edit
                    </button>
                    <button type="button" className="pm-card-action-btn danger">
                      <Trash2 className="w-4 h-4" strokeWidth={2} />
                      Delete
                    </button>
                  </div>
                </div>
                <div className="pm-toggle-wrap">
                  <button
                    type="button"
                    role="switch"
                    aria-checked={primaryId === card.id}
                    className={`pm-toggle ${
                      primaryId === card.id ? "active" : ""
                    }`}
                    onClick={() => setPrimaryId(card.id)}
                    aria-label={
                      primaryId === card.id
                        ? "Primary payment method"
                        : "Set as primary"
                    }
                  />
                  <span className="pm-toggle-label">
                    {primaryId === card.id ? "Primary" : "Set primary"}
                  </span>
                </div>
              </div>
            ))}
          </section>

          {/* Add New Payment Method */}
          <section className="pm-add-section">
            <h2 className="pm-add-title">+ Add New Payment Method</h2>
            <div className="pm-method-tabs" role="tablist">
              <button
                type="button"
                role="tab"
                aria-selected={addTab === "card"}
                className={`pm-method-tab ${addTab === "card" ? "active" : ""}`}
                onClick={() => setAddTab("card")}
              >
                <CreditCard className="w-5 h-5" strokeWidth={2} />
                Credit/Debit Card
              </button>
              <button
                type="button"
                role="tab"
                aria-selected={addTab === "bank"}
                className={`pm-method-tab ${addTab === "bank" ? "active" : ""}`}
                onClick={() => setAddTab("bank")}
              >
                <Landmark className="w-5 h-5" strokeWidth={2} />
                Bank Transfer
              </button>
              <button
                type="button"
                role="tab"
                aria-selected={addTab === "wallet"}
                className={`pm-method-tab ${
                  addTab === "wallet" ? "active" : ""
                }`}
                onClick={() => setAddTab("wallet")}
              >
                <Wallet className="w-5 h-5" strokeWidth={2} />
                Online Wallet
              </button>
            </div>

            {addTab === "card" && (
              <>
                <div className="pm-form-grid">
                  <div className="pm-field">
                    <label htmlFor="pm-name">Name on Card</label>
                    <input
                      id="pm-name"
                      type="text"
                      defaultValue="Johnathan Doe"
                      placeholder="Name on Card"
                    />
                  </div>
                  <div className="pm-field">
                    <label htmlFor="pm-number">Card Number</label>
                    <div className="pm-field-wrap">
                      <input
                        id="pm-number"
                        type="text"
                        placeholder="0000 0000 0000 0000"
                        maxLength={19}
                      />
                      <Lock className="w-4 h-4 pm-field-icon" strokeWidth={2} />
                    </div>
                  </div>
                  <div className="pm-form-row-2">
                    <div className="pm-field">
                      <label htmlFor="pm-expiry">Expiry Date</label>
                      <input
                        id="pm-expiry"
                        type="text"
                        placeholder="MM/YY"
                        maxLength={5}
                      />
                    </div>
                    <div className="pm-field">
                      <label htmlFor="pm-cvv">CVV</label>
                      <input
                        id="pm-cvv"
                        type="text"
                        defaultValue="123"
                        placeholder="123"
                        maxLength={4}
                      />
                    </div>
                  </div>
                </div>
                <button type="button" className="pm-save-btn">
                  <Plus className="w-5 h-5" strokeWidth={2} />
                  Save Payment Method
                </button>
                <p className="pm-secure-note">
                  <Check className="w-4 h-4" strokeWidth={2} />
                  Your card data is encrypted and never stored on our servers.
                </p>
              </>
            )}

            {addTab === "bank" && (
              <p style={{ fontSize: 14, color: "#6b7280" }}>
                Add your bank account for direct transfer. Instructions will
                appear here.
              </p>
            )}

            {addTab === "wallet" && (
              <p style={{ fontSize: 14, color: "#6b7280" }}>
                Connect PayPal, Apple Pay, or other supported wallets.
              </p>
            )}
          </section>
        </main>

        {/* Sidebar */}
        <aside className="pm-sidebar">
          <div className="pm-sidebar-card">
            <h3 className="pm-sidebar-title">
              <Shield
                className="w-5 h-5 text-primary"
                strokeWidth={2}
              />
              Payment Security
            </h3>
            <p className="pm-sidebar-text">
              We use industry-leading encryption and security protocols to
              ensure your financial information is always protected.
            </p>
            <div className="pm-sidebar-badges">
              <div className="pm-sidebar-badge">
                <LockKeyhole className="w-5 h-5 icon green" strokeWidth={2} />
                <div>
                  <strong>SSL Encrypted</strong>
                  256-bit Secure Connection
                </div>
              </div>
              <div className="pm-sidebar-badge">
                <ShieldCheck className="w-5 h-5 icon blue" strokeWidth={2} />
                <div>
                  <strong>PCI DSS Compliant</strong>
                  Certified Secure Handling
                </div>
              </div>
            </div>
          </div>

          <div className="pm-sidebar-card">
            <h3 className="pm-sidebar-title">
              <MapPin
                className="w-5 h-5 text-primary"
                strokeWidth={2}
              />
              Billing Address
              <Link href="#" className="pm-change-link">
                Change
              </Link>
            </h3>
            <p className="pm-address-block">
              Johnathan Doe, 123 Academy Way, Suite 400, San Francisco, CA
              94105, United States.
            </p>
            <p className="pm-currency">Default Currency USD ($)</p>
          </div>

          <div className="pm-sidebar-card">
            <h3 className="pm-sidebar-title">Need Help?</h3>
            <p className="pm-sidebar-text">
              If you&apos;re having trouble adding a payment method, please
              contact our financial department.
            </p>
            <Link href="#" className="pm-support-link">
              Contact Support
              <ChevronRight className="w-4 h-4" strokeWidth={2} />
            </Link>
          </div>
        </aside>
      </div>

      <footer className="pm-footer">
        <span>© 2024 IMETS Academy. All rights reserved.</span>
        <div className="pm-footer-links">
          <Link href="#">Privacy Policy</Link>
          <Link href="#">Terms of Service</Link>
          <Link href="#">Refund Policy</Link>
        </div>
      </footer>
    </div>
  );
}
