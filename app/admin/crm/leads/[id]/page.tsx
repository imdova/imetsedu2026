"use client";

import { useParams } from "next/navigation";
import Link from "next/link";
import { useState } from "react";
import {
  Mail,
  Phone,
  MapPin,
  FileText,
  MessageCircle,
  Phone as PhoneIcon,
  Download,
  Clipboard,
  Calendar,
  ArrowLeftRight,
  CheckSquare,
  UserX,
  Lightbulb,
  Paperclip,
  AtSign,
  Eye,
  Clock,
  Image,
} from "lucide-react";
import { crmLeads } from "@/lib/crmData";
import { ROUTES } from "@/constants";
import "./lead-profile.css";

function getInitials(name: string) {
  const parts = name.trim().split(/\s+/);
  if (parts.length >= 2) return (parts[0][0] + parts[1][0]).toUpperCase();
  return name.slice(0, 2).toUpperCase();
}

const ACQUISITION_MOCK = {
  source: "Facebook Ads",
  utmCampaign: "Winter_Intake_24",
  inquiryDate: "Oct 12, 2023",
};

const TIMELINE_ITEMS = [
  {
    id: "1",
    type: "whatsapp" as const,
    title: "WhatsApp Follow-up Sent",
    body: "Hi John, I've sent the curriculum for the Full Stack course. Let me know if you have questions!",
    meta: "Sent by Admin Sarah",
    time: "2 HOURS AGO",
  },
  {
    id: "2",
    type: "call" as const,
    title: "Initial Counseling Call",
    body: "Discussion about career goals. John expressed strong interest in Python and React components. Requested syllabus.",
    meta: "15M 24S",
    metaIcon: "clock" as const,
    time: "YESTERDAY, 4:30 PM",
  },
  {
    id: "3",
    type: "download" as const,
    title: "Syllabus Downloaded",
    body: "Full_Stack_Syllabus_v2.pdf",
    meta: "",
    time: "OCT 14, 2023",
    link: "#",
  },
  {
    id: "4",
    type: "form" as const,
    title: "Website Inquiry Form",
    body: "I am looking for a part-time bootcamp to switch my career into software engineering.",
    meta: "",
    time: "OCT 12, 2023",
  },
];

const DOCUMENTS_MOCK = [
  {
    id: "1",
    name: "National_ID_John.pdf",
    size: "1.2 MB",
    date: "Oct 14",
    icon: "doc" as const,
  },
  {
    id: "2",
    name: "HighSchool_Transcr.j...",
    size: "4.5 MB",
    date: "Oct 14",
    icon: "image" as const,
  },
  {
    id: "3",
    name: "English_Cert.pdf",
    size: "0.8 MB",
    date: "Oct 15",
    icon: "doc" as const,
  },
];

const RECOMMENDED_TEXT =
  "Lead has downloaded the syllabus. Send a WhatsApp invitation for the upcoming Open House on Saturday.";

export default function LeadProfilePage() {
  const params = useParams();
  const id = (params?.id as string) ?? "";
  const [activeInteractionTab, setActiveInteractionTab] = useState<
    "note" | "email" | "sms"
  >("note");
  const [noteText, setNoteText] = useState("");

  const lead = crmLeads.find((l) => l.id === id);

  if (!lead) {
    return (
      <div className="lp-page">
        <div className="lp-not-found">
          <p>Lead not found.</p>
          <Link href={ROUTES.ADMIN.CRM_LEADS}>← Back to Leads</Link>
        </div>
      </div>
    );
  }

  const displayId = `IMETS-2024-${String(parseInt(lead.id, 10) || 1).padStart(
    3,
    "0"
  )}`;
  const courseTags =
    lead.tags?.map((t) => t.label) ??
    [lead.courseInterest ?? "General"].slice(0, 2);
  if (lead.courseInterest && !courseTags.includes(lead.courseInterest)) {
    courseTags.unshift(lead.courseInterest);
  }
  const score = lead.score ?? 85;

  return (
    <div className="lp-page">
      {/* Breadcrumb */}
      <div className="lp-breadcrumb">
        <nav className="lp-breadcrumb-nav">
          <Link href={ROUTES.ADMIN.CRM_LEADS}>CRM</Link>
          <span className="lp-breadcrumb-sep">&gt;</span>
          <Link href={ROUTES.ADMIN.CRM_LEADS}>Leads</Link>
          <span className="lp-breadcrumb-sep">&gt;</span>
          <span className="lp-breadcrumb-current">
            Lead Profile: {lead.name}
          </span>
        </nav>
      </div>

      <div className="lp-main">
        <div className="lp-title-row">
          <h1 className="lp-lead-name">{lead.name}</h1>
          <span className="lp-status-tag lp-status-tag-warm">
            {lead.status} LEAD
          </span>
        </div>

        <div className="lp-grid">
          {/* Left column - Lead info */}
          <div className="lp-left">
            {/* Lead Profile card */}
            <div className="lp-card" style={{ marginBottom: "24px" }}>
              <div className="lp-profile-header">
                <div className="lp-avatar-wrap">
                  <div className="lp-avatar">{getInitials(lead.name)}</div>
                  <span className="lp-avatar-badge">{score}</span>
                </div>
                <div className="lp-profile-info">
                  <h2>{lead.name}</h2>
                  <p className="lp-profile-id">ID: {displayId}</p>
                </div>
              </div>
              <p className="lp-score-label">Lead Score</p>
              <div className="lp-score-bar-wrap">
                <div className="lp-score-bar">
                  <div
                    className="lp-score-fill"
                    style={{ width: `${Math.min(100, score)}%` }}
                  />
                </div>
                <p className="lp-score-text">{score}/100</p>
              </div>
              <ul className="lp-contact-list">
                <li>
                  <Mail className="lp-contact-icon" strokeWidth={2} />
                  <span>
                    <span className="lp-contact-label">Email Address</span>{" "}
                    {lead.email}
                  </span>
                </li>
                <li>
                  <Phone className="lp-contact-icon" strokeWidth={2} />
                  <span>
                    <span className="lp-contact-label">Phone Number</span>{" "}
                    {lead.phone}
                  </span>
                </li>
                {lead.location && (
                  <li>
                    <MapPin className="lp-contact-icon" strokeWidth={2} />
                    <span>
                      <span className="lp-contact-label">Location</span>{" "}
                      {lead.location}
                    </span>
                  </li>
                )}
              </ul>
              <div className="lp-course-interest">
                <p className="lp-card-title">Course Interest</p>
                <div className="lp-pills">
                  {courseTags.slice(0, 3).map((tag) => (
                    <span key={tag} className="lp-pill">
                      {tag}
                    </span>
                  ))}
                </div>
              </div>
            </div>

            {/* Acquisition card */}
            <div className="lp-card">
              <h3 className="lp-card-title">Acquisition</h3>
              <div className="lp-acq-row">
                <span className="lp-acq-label">Source</span>
                <span className="lp-acq-value">{ACQUISITION_MOCK.source}</span>
              </div>
              <div className="lp-acq-row">
                <span className="lp-acq-label">UTM Campaign</span>
                <span className="lp-acq-value">
                  {ACQUISITION_MOCK.utmCampaign}
                </span>
              </div>
              <div className="lp-acq-row">
                <span className="lp-acq-label">Inquiry Date</span>
                <span className="lp-acq-value">
                  {ACQUISITION_MOCK.inquiryDate}
                </span>
              </div>
            </div>
          </div>

          {/* Center column - Note + Timeline */}
          <div className="lp-center">
            {/* Interaction card */}
            <div className="lp-card" style={{ marginBottom: "24px" }}>
              <div className="lp-tabs">
                <button
                  type="button"
                  className={`lp-tab ${
                    activeInteractionTab === "note" ? "lp-tab-active" : ""
                  }`}
                  onClick={() => setActiveInteractionTab("note")}
                >
                  <FileText className="lp-tab-icon" strokeWidth={2} />
                  Add Note
                </button>
                <button
                  type="button"
                  className={`lp-tab ${
                    activeInteractionTab === "email" ? "lp-tab-active" : ""
                  }`}
                  onClick={() => setActiveInteractionTab("email")}
                >
                  <Mail className="lp-tab-icon" strokeWidth={2} />
                  Email
                </button>
                <button
                  type="button"
                  className={`lp-tab ${
                    activeInteractionTab === "sms" ? "lp-tab-active" : ""
                  }`}
                  onClick={() => setActiveInteractionTab("sms")}
                >
                  <MessageCircle className="lp-tab-icon" strokeWidth={2} />
                  SMS
                </button>
              </div>
              <textarea
                className="lp-note-area"
                placeholder="Take a note about this lead..."
                value={noteText}
                onChange={(e) => setNoteText(e.target.value)}
                rows={4}
              />
              <div className="lp-note-actions">
                <button
                  type="button"
                  className="lp-note-btn-icon"
                  aria-label="Attach file"
                >
                  <Paperclip className="w-4 h-4" strokeWidth={2} />
                </button>
                <button
                  type="button"
                  className="lp-note-btn-icon"
                  aria-label="Mention"
                >
                  <AtSign className="w-4 h-4" strokeWidth={2} />
                </button>
                <button type="button" className="lp-btn-save">
                  Save Note
                </button>
              </div>
            </div>

            {/* Activity Timeline */}
            <div className="lp-card" style={{ marginBottom: "24px" }}>
              <h3 className="lp-card-title">Activity Timeline</h3>
              <div className="lp-timeline">
                {TIMELINE_ITEMS.map((item) => (
                  <div key={item.id} className="lp-timeline-item">
                    <div
                      className={`lp-timeline-icon ${
                        item.type === "whatsapp"
                          ? "lp-timeline-icon-green"
                          : item.type === "call"
                          ? "lp-timeline-icon-blue"
                          : item.type === "download"
                          ? "lp-timeline-icon-yellow"
                          : "lp-timeline-icon-grey"
                      }`}
                    >
                      {item.type === "whatsapp" && (
                        <MessageCircle className="w-3 h-3" strokeWidth={2} />
                      )}
                      {item.type === "call" && (
                        <PhoneIcon className="w-3 h-3" strokeWidth={2} />
                      )}
                      {item.type === "download" && (
                        <Download className="w-3 h-3" strokeWidth={2} />
                      )}
                      {item.type === "form" && (
                        <Clipboard className="w-3 h-3" strokeWidth={2} />
                      )}
                    </div>
                    {"title" in item && item.title && (
                      <p className="lp-timeline-title">{item.title}</p>
                    )}
                    <p className="lp-timeline-body">
                      {item.link ? (
                        <a href={item.link} className="lp-timeline-link">
                          {item.body}
                        </a>
                      ) : (
                        item.body
                      )}
                    </p>
                    {item.meta && (
                      <p
                        className={
                          "metaIcon" in item && item.metaIcon
                            ? "lp-timeline-meta lp-timeline-meta-with-icon"
                            : "lp-timeline-meta"
                        }
                      >
                        {"metaIcon" in item && item.metaIcon === "clock" && (
                          <>
                            <Clock className="w-3.5 h-3.5" strokeWidth={2} />
                            {item.meta}
                          </>
                        )}
                        {!("metaIcon" in item && item.metaIcon) && item.meta}
                      </p>
                    )}
                    <p className="lp-timeline-time">{item.time}</p>
                  </div>
                ))}
              </div>
            </div>
          </div>

          {/* Right column - Actions, Documents, Recommendation */}
          <div className="lp-right">
            <div className="lp-actions-row">
              <button type="button" className="lp-btn-edit">
                Edit Profile
              </button>
              <button type="button" className="lp-btn-convert">
                Convert to Enrollment
              </button>
            </div>

            {/* Quick Actions */}
            <div className="lp-card" style={{ marginBottom: "24px" }}>
              <h3 className="lp-card-title">Quick Actions</h3>
              <div className="lp-quick-actions">
                <button type="button" className="lp-quick-btn">
                  <Calendar className="w-[18px] h-[18px]" strokeWidth={2} />
                  Schedule Call
                </button>
                <button type="button" className="lp-quick-btn">
                  <ArrowLeftRight
                    className="w-[18px] h-[18px]"
                    strokeWidth={2}
                  />
                  Transfer Lead
                </button>
                <button type="button" className="lp-quick-btn">
                  <CheckSquare className="w-[18px] h-[18px]" strokeWidth={2} />
                  Assign Tasks
                </button>
                <button
                  type="button"
                  className="lp-quick-btn lp-quick-btn-danger"
                >
                  <UserX className="w-[18px] h-[18px]" strokeWidth={2} />
                  Mark as Unqualified
                </button>
              </div>
            </div>

            {/* Documents */}
            <div className="lp-card" style={{ marginBottom: "24px" }}>
              <div className="lp-doc-header">
                <h3 className="lp-card-title" style={{ marginBottom: 0 }}>
                  Documents
                </h3>
                <button type="button" className="lp-btn-upload">
                  Upload
                </button>
              </div>
              <ul className="lp-doc-list">
                {DOCUMENTS_MOCK.map((doc, idx) => (
                  <li key={doc.id} className="lp-doc-item">
                    {doc.icon === "image" ? (
                      <Image
                        className="lp-doc-icon lp-doc-icon-yellow"
                        strokeWidth={2}
                      />
                    ) : (
                      <FileText
                        className={`lp-doc-icon ${
                          idx === 2 ? "lp-doc-icon-green" : "lp-doc-icon-blue"
                        }`}
                        strokeWidth={2}
                      />
                    )}
                    <span className="lp-doc-name">{doc.name}</span>
                    <span className="lp-doc-meta">
                      {doc.size} · {doc.date}
                    </span>
                    <button
                      type="button"
                      className="lp-doc-action"
                      aria-label={doc.icon === "image" ? "View" : "Download"}
                    >
                      {doc.icon === "image" ? (
                        <Eye className="w-4 h-4" strokeWidth={2} />
                      ) : (
                        <Download className="w-4 h-4" strokeWidth={2} />
                      )}
                    </button>
                  </li>
                ))}
              </ul>
            </div>

            {/* Recommended Next Step */}
            <div className="lp-card lp-recommend">
              <h3 className="lp-recommend-title">
                <Lightbulb className="w-4 h-4" strokeWidth={2} />
                Recommended Next Step
              </h3>
              <p className="lp-recommend-text">{RECOMMENDED_TEXT}</p>
              <button type="button" className="lp-btn-execute">
                Execute Recommendation
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
