"use client";

import { useState } from "react";
import Link from "next/link";
import { useParams, useRouter } from "next/navigation";
import { Upload, ArrowLeft } from "lucide-react";
import { crmLeads } from "@/lib/crmData";
import { ROUTES } from "@/constants";
import "./add-to-group.css";

const EXISTING_GROUPS = [
  { id: "g1", name: "Full Stack Feb 2026" },
  { id: "g2", name: "Data Science Jan 2026" },
  { id: "g3", name: "IELTS Prep Mar 2026" },
  { id: "g4", name: "Python Bootcamp Apr 2026" },
];

const CATEGORIES: { id: string; name: string }[] = [
  { id: "tech", name: "Technology" },
  { id: "health", name: "Healthcare" },
  { id: "lang", name: "Language" },
  { id: "biz", name: "Business" },
];

const SUBCATEGORIES: Record<string, { id: string; name: string }[]> = {
  tech: [
    { id: "fs", name: "Full Stack" },
    { id: "ds", name: "Data Science" },
    { id: "py", name: "Python" },
  ],
  health: [
    { id: "med", name: "Medical" },
    { id: "nurse", name: "Nursing" },
  ],
  lang: [
    { id: "ielts", name: "IELTS" },
    { id: "eng", name: "General English" },
  ],
  biz: [
    { id: "mba", name: "MBA" },
    { id: "pm", name: "Project Management" },
  ],
};

type InstallmentPlan = "cash" | "2" | "3";

export default function AddToGroupPage() {
  const params = useParams();
  const router = useRouter();
  const id = (params?.id as string) ?? "";
  const lead = crmLeads.find((l) => l.id === id);

  const [category, setCategory] = useState("");
  const [subcategory, setSubcategory] = useState("");
  const [selectedGroupId, setSelectedGroupId] = useState("");
  const [installment, setInstallment] = useState<InstallmentPlan>("cash");
  const [courseFeesEGP, setCourseFeesEGP] = useState("");
  const [paidAmount, setPaidAmount] = useState("");
  const [remaining1, setRemaining1] = useState("");
  const [remaining2, setRemaining2] = useState("");
  const [receiptFile, setReceiptFile] = useState<File | null>(null);

  const subcategoryOptions = category ? SUBCATEGORIES[category] ?? [] : [];

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (selectedGroupId) router.push(ROUTES.ADMIN.CRM_LEAD(id));
  };

  if (!lead) {
    return (
      <div className="atg-page">
        <div className="atg-not-found">
          <p>Lead not found.</p>
          <Link href={ROUTES.ADMIN.CRM_LEADS}>← Back to Leads</Link>
        </div>
      </div>
    );
  }

  return (
    <div className="atg-page">
      <div className="atg-breadcrumb">
        <nav className="atg-breadcrumb-nav">
          <Link href={ROUTES.ADMIN.CRM_LEADS}>CRM</Link>
          <span className="atg-breadcrumb-sep">&gt;</span>
          <Link href={ROUTES.ADMIN.CRM_LEADS}>Leads</Link>
          <span className="atg-breadcrumb-sep">&gt;</span>
          <Link href={ROUTES.ADMIN.CRM_LEAD(id)}>{lead.name}</Link>
          <span className="atg-breadcrumb-sep">&gt;</span>
          <span className="atg-breadcrumb-current">Add to group</span>
        </nav>
      </div>

      <div className="atg-main">
        <Link href={ROUTES.ADMIN.CRM_LEAD(id)} className="atg-back">
          <ArrowLeft className="atg-back-icon" strokeWidth={2} />
          Back to lead
        </Link>
        <h1 className="atg-title">Add student to existing group</h1>
        <p className="atg-intro">
          Add <strong>{lead.name}</strong> to an existing group and complete payment details.
        </p>

        <form onSubmit={handleSubmit} className="atg-card atg-form">
          <div className="atg-row">
            <div className="atg-field">
              <label className="atg-label">Category</label>
              <select
                className="atg-input"
                value={category}
                onChange={(e) => {
                  setCategory(e.target.value);
                  setSubcategory("");
                }}
                aria-label="Category"
              >
                <option value="">Select category</option>
                {CATEGORIES.map((c) => (
                  <option key={c.id} value={c.id}>
                    {c.name}
                  </option>
                ))}
              </select>
            </div>
            <div className="atg-field">
              <label className="atg-label">Subcategory</label>
              <select
                className="atg-input"
                value={subcategory}
                onChange={(e) => setSubcategory(e.target.value)}
                aria-label="Subcategory"
                disabled={!category}
              >
                <option value="">Select subcategory</option>
                {subcategoryOptions.map((s) => (
                  <option key={s.id} value={s.id}>
                    {s.name}
                  </option>
                ))}
              </select>
            </div>
          </div>

          <div className="atg-field">
            <label className="atg-label">Choose group</label>
            <select
              className="atg-input"
              value={selectedGroupId}
              onChange={(e) => setSelectedGroupId(e.target.value)}
              aria-label="Select group"
            >
              <option value="">Select a group</option>
              {EXISTING_GROUPS.map((g) => (
                <option key={g.id} value={g.id}>
                  {g.name}
                </option>
              ))}
            </select>
          </div>

          <div className="atg-section">
            <label className="atg-label">Installment plan</label>
            <div className="atg-tabs" role="tablist">
              {(
                [
                  { value: "cash" as const, label: "Cash" },
                  { value: "2" as const, label: "2 installments" },
                  { value: "3" as const, label: "3 installments" },
                ] as const
              ).map(({ value, label }) => (
                <button
                  key={value}
                  type="button"
                  role="tab"
                  aria-selected={installment === value}
                  className={`atg-tab ${installment === value ? "atg-tab-active" : ""}`}
                  onClick={() => setInstallment(value)}
                >
                  {label}
                </button>
              ))}
            </div>
            {installment === "2" && (
              <div className="atg-remaining-wrap">
                <label className="atg-label">Remaining amount (EGP)</label>
                <input
                  type="number"
                  className="atg-input"
                  placeholder="0"
                  min={0}
                  value={remaining1}
                  onChange={(e) => setRemaining1(e.target.value)}
                  aria-label="Remaining amount"
                />
              </div>
            )}
            {installment === "3" && (
              <div className="atg-row">
                <div className="atg-field">
                  <label className="atg-label">Remaining amount 1 (EGP)</label>
                  <input
                    type="number"
                    className="atg-input"
                    placeholder="0"
                    min={0}
                    value={remaining1}
                    onChange={(e) => setRemaining1(e.target.value)}
                    aria-label="Remaining amount 1"
                  />
                </div>
                <div className="atg-field">
                  <label className="atg-label">Remaining amount 2 (EGP)</label>
                  <input
                    type="number"
                    className="atg-input"
                    placeholder="0"
                    min={0}
                    value={remaining2}
                    onChange={(e) => setRemaining2(e.target.value)}
                    aria-label="Remaining amount 2"
                  />
                </div>
              </div>
            )}
          </div>

          <div className="atg-row">
            <div className="atg-field">
              <label className="atg-label">Course fees (EGP)</label>
              <input
                type="number"
                className="atg-input"
                placeholder="0"
                min={0}
                value={courseFeesEGP}
                onChange={(e) => setCourseFeesEGP(e.target.value)}
                aria-label="Course fees in EGP"
              />
            </div>
            <div className="atg-field">
              <label className="atg-label">Paid amount (EGP)</label>
              <input
                type="number"
                className="atg-input"
                placeholder="0"
                min={0}
                value={paidAmount}
                onChange={(e) => setPaidAmount(e.target.value)}
                aria-label="Paid amount"
              />
            </div>
          </div>

          <div className="atg-field">
            <label className="atg-label">Upload receipt</label>
            <div className="atg-upload-wrap">
              <input
                type="file"
                id="atg-receipt"
                className="atg-upload-input"
                accept=".pdf,.jpg,.jpeg,.png"
                onChange={(e) => setReceiptFile(e.target.files?.[0] ?? null)}
                aria-label="Upload receipt"
              />
              <label htmlFor="atg-receipt" className="atg-upload-label">
                <Upload className="atg-upload-icon" strokeWidth={2} />
                <span>
                  {receiptFile ? receiptFile.name : "Choose file or drag here"}
                </span>
              </label>
            </div>
          </div>

          <div className="atg-actions">
            <Link
              href={ROUTES.ADMIN.CRM_LEAD(id)}
              className="atg-btn atg-btn-secondary"
            >
              Cancel
            </Link>
            <button
              type="submit"
              className="atg-btn atg-btn-primary"
              disabled={!selectedGroupId}
            >
              Add to group
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}
