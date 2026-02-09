"use client";

import { useParams, useRouter } from "next/navigation";
import Link from "next/link";
import { useState, useEffect } from "react";
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
  User,
  UserX,
  Lightbulb,
  Paperclip,
  AtSign,
  Eye,
  Clock,
  Image,
  Bell,
  Plus,
  Pencil,
  X,
  Target,
  ThumbsDown,
  TrendingUp,
  Flame,
  MessageSquare,
} from "lucide-react";
import { crmLeads, leadSpecialtyOptions, type LeadSpecialty } from "@/lib/crmData";
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

type FollowUpStatus = "overdue" | "today" | "upcoming" | "done";

interface FollowUp {
  id: string;
  date: string;
  note: string;
  status: FollowUpStatus;
  createdAt: string;
}

const FOLLOW_UPS_INITIAL: FollowUp[] = [
  {
    id: "fu1",
    date: "2026-02-05",
    note: "Call back to confirm interest in Full Stack course",
    status: "overdue",
    createdAt: "2026-02-01",
  },
  {
    id: "fu2",
    date: "2026-02-08",
    note: "Send enrollment link and payment options",
    status: "today",
    createdAt: "2026-02-06",
  },
  {
    id: "fu3",
    date: "2026-02-12",
    note: "Follow up on document submission",
    status: "upcoming",
    createdAt: "2026-02-07",
  },
];

function formatFollowUpDate(iso: string) {
  const d = new Date(iso);
  return d.toLocaleDateString("en-US", {
    month: "short",
    day: "numeric",
    year: "numeric",
  });
}

export default function LeadProfilePage() {
  const params = useParams();
  const router = useRouter();
  const id = (params?.id as string) ?? "";
  const [activeInteractionTab, setActiveInteractionTab] = useState<
    "note" | "email" | "sms"
  >("note");
  const [noteText, setNoteText] = useState("");
  const [followUps, setFollowUps] = useState<FollowUp[]>(FOLLOW_UPS_INITIAL);
  const [addFollowUpOpen, setAddFollowUpOpen] = useState(false);
  const [addFollowUpDate, setAddFollowUpDate] = useState("");
  const [addFollowUpNote, setAddFollowUpNote] = useState("");
  const [updateLeadOpen, setUpdateLeadOpen] = useState(false);
  const [editingFollowUpId, setEditingFollowUpId] = useState<string | null>(
    null,
  );
  const [editFollowUpDate, setEditFollowUpDate] = useState("");
  const [editFollowUpNote, setEditFollowUpNote] = useState("");
  const [channel, setChannel] = useState<"call" | "whatsapp" | "messenger">(
    "call",
  );
  type LeadStatusOption =
    | "general lead"
    | "out of target"
    | "not interested"
    | "potential"
    | "hot"
    | "student";
  const [leadStatusOption, setLeadStatusOption] =
    useState<LeadStatusOption>("potential");
  const [specialtyDisplay, setSpecialtyDisplay] = useState<LeadSpecialty | "">(
    "",
  );
  type ExtraNumberType = "phone" | "whatsapp";
  interface ExtraNumber {
    id: string;
    type: ExtraNumberType;
    number: string;
  }
  const [extraNumbers, setExtraNumbers] = useState<ExtraNumber[]>([]);
  const [addingNumber, setAddingNumber] = useState<ExtraNumberType | null>(
    null,
  );
  const [newNumberValue, setNewNumberValue] = useState("");

  const addExtraNumber = () => {
    const t = addingNumber;
    const v = newNumberValue.trim();
    if (!t || !v) return;
    setExtraNumbers((prev) => [
      ...prev,
      { id: `en-${Date.now()}`, type: t, number: v },
    ]);
    setAddingNumber(null);
    setNewNumberValue("");
  };

  const removeExtraNumber = (extraId: string) => {
    setExtraNumbers((prev) => prev.filter((n) => n.id !== extraId));
  };

  const handleLeadStatusChange = (value: LeadStatusOption) => {
    setLeadStatusOption(value);
    if (value === "student") router.push(ROUTES.ADMIN.CRM_LEAD_ADD_TO_GROUP(id));
  };

  const lead = crmLeads.find((l) => l.id === id);

  useEffect(() => {
    if (lead) setSpecialtyDisplay(lead.specialty ?? "");
  }, [lead?.id, lead?.specialty]);

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
    "0",
  )}`;
  const courseTags =
    lead.tags?.map((t) => t.label) ??
    [lead.courseInterest ?? "General"].slice(0, 2);
  if (lead.courseInterest && !courseTags.includes(lead.courseInterest)) {
    courseTags.unshift(lead.courseInterest);
  }
  const score = lead.score ?? 85;

  const openAddFollowUp = () => {
    const tomorrow = new Date();
    tomorrow.setDate(tomorrow.getDate() + 1);
    setAddFollowUpDate(tomorrow.toISOString().slice(0, 10));
    setAddFollowUpNote("");
    setAddFollowUpOpen(true);
  };

  const saveAddFollowUp = () => {
    if (!addFollowUpDate.trim()) return;
    const today = new Date().toISOString().slice(0, 10);
    let status: FollowUpStatus = "upcoming";
    if (addFollowUpDate < today) status = "overdue";
    else if (addFollowUpDate === today) status = "today";
    setFollowUps((prev) => [
      ...prev,
      {
        id: `fu-${Date.now()}`,
        date: addFollowUpDate,
        note: addFollowUpNote.trim() || "No note",
        status,
        createdAt: today,
      },
    ]);
    setAddFollowUpOpen(false);
    setAddFollowUpDate("");
    setAddFollowUpNote("");
  };

  const openEditFollowUp = (fu: FollowUp) => {
    setEditingFollowUpId(fu.id);
    setEditFollowUpDate(fu.date);
    setEditFollowUpNote(fu.note);
  };

  const saveEditFollowUp = () => {
    if (!editingFollowUpId || !editFollowUpDate.trim()) return;
    const today = new Date().toISOString().slice(0, 10);
    let status: FollowUpStatus = "upcoming";
    if (editFollowUpDate < today) status = "overdue";
    else if (editFollowUpDate === today) status = "today";
    setFollowUps((prev) =>
      prev.map((f) =>
        f.id === editingFollowUpId
          ? {
              ...f,
              date: editFollowUpDate,
              note: editFollowUpNote.trim() || f.note,
              status,
            }
          : f,
      ),
    );
    setEditingFollowUpId(null);
    setEditFollowUpDate("");
    setEditFollowUpNote("");
  };

  const markFollowUpDone = (fuId: string) => {
    setFollowUps((prev) =>
      prev.map((f) => (f.id === fuId ? { ...f, status: "done" as const } : f)),
    );
  };

  const followUpsActive = followUps.filter((f) => f.status !== "done");

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
          <span
            className={`lp-status-tag lp-status-tag-${leadStatusOption.replace(/\s+/g, "-")}`}
          >
            {leadStatusOption.charAt(0).toUpperCase() +
              leadStatusOption.slice(1)}
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
                <li className="lp-extra-numbers-li">
                  <div className="lp-extra-numbers-block">
                    <p className="lp-extra-numbers-title">Extra phone / WhatsApp</p>
                    {extraNumbers.length > 0 && (
                      <ul className="lp-extra-numbers-list">
                        {extraNumbers.map((en) => (
                          <li key={en.id} className="lp-extra-numbers-item">
                            {en.type === "whatsapp" ? (
                              <MessageCircle
                                className="lp-extra-numbers-icon lp-extra-numbers-icon-wa"
                                strokeWidth={2}
                              />
                            ) : (
                              <Phone className="lp-extra-numbers-icon" strokeWidth={2} />
                            )}
                            <span className="lp-extra-numbers-value">{en.number}</span>
                            <button
                              type="button"
                              className="lp-extra-numbers-remove"
                              onClick={() => removeExtraNumber(en.id)}
                              aria-label={`Remove ${en.type} number`}
                            >
                              <X className="w-3.5 h-3.5" strokeWidth={2} />
                            </button>
                          </li>
                        ))}
                      </ul>
                    )}
                    {addingNumber ? (
                      <div className="lp-extra-numbers-add-row">
                        <input
                          type="tel"
                          className="lp-extra-numbers-input"
                          placeholder={
                            addingNumber === "whatsapp"
                              ? "WhatsApp number"
                              : "Phone number"
                          }
                          value={newNumberValue}
                          onChange={(e) => setNewNumberValue(e.target.value)}
                          autoFocus
                        />
                        <button
                          type="button"
                          className="lp-extra-numbers-save"
                          onClick={addExtraNumber}
                        >
                          Add
                        </button>
                        <button
                          type="button"
                          className="lp-extra-numbers-cancel"
                          onClick={() => {
                            setAddingNumber(null);
                            setNewNumberValue("");
                          }}
                        >
                          Cancel
                        </button>
                      </div>
                    ) : (
                      <div className="lp-extra-numbers-actions">
                        <button
                          type="button"
                          className="lp-extra-numbers-btn"
                          onClick={() => setAddingNumber("phone")}
                        >
                          <Phone className="w-4 h-4" strokeWidth={2} />
                          Add phone
                        </button>
                        <button
                          type="button"
                          className="lp-extra-numbers-btn lp-extra-numbers-btn-wa"
                          onClick={() => setAddingNumber("whatsapp")}
                        >
                          <MessageCircle className="w-4 h-4" strokeWidth={2} />
                          Add WhatsApp
                        </button>
                      </div>
                    )}
                  </div>
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
              <div className="lp-specialty-section">
                <p className="lp-card-title">Specialty</p>
                <select
                  className="lp-specialty-select"
                  value={specialtyDisplay}
                  onChange={(e) =>
                    setSpecialtyDisplay((e.target.value || "") as LeadSpecialty | "")
                  }
                  aria-label="Update specialty"
                >
                  <option value="">Select specialty</option>
                  {leadSpecialtyOptions.map((s) => (
                    <option key={s} value={s}>
                      {s}
                    </option>
                  ))}
                </select>
              </div>
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

              <div className="lp-interaction-options">
                <div className="lp-option-group">
                  <label className="lp-option-label">Channel</label>
                  <select
                    className="lp-option-select"
                    value={channel}
                    onChange={(e) =>
                      setChannel(
                        e.target.value as "call" | "whatsapp" | "messenger",
                      )
                    }
                  >
                    <option value="call">Call</option>
                    <option value="whatsapp">WhatsApp</option>
                    <option value="messenger">Messenger</option>
                  </select>
                </div>
                <div className="lp-option-group">
                  <label className="lp-option-label">Lead status</label>
                  <select
                    className="lp-option-select"
                    value={leadStatusOption}
                    onChange={(e) =>
                      handleLeadStatusChange(e.target.value as LeadStatusOption)
                    }
                  >
                    <option value="general lead">General lead</option>
                    <option value="out of target">Out of target</option>
                    <option value="not interested">Not interested</option>
                    <option value="potential">Potential</option>
                    <option value="hot">Hot</option>
                    <option value="student">Student</option>
                  </select>
                </div>
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
              <button
                type="button"
                className="lp-btn-edit"
                onClick={() => setUpdateLeadOpen(true)}
              >
                Update
              </button>
              <button type="button" className="lp-btn-convert">
                Convert to Enrollment
              </button>
            </div>

            {/* Lead status */}
            <div className="lp-card lp-lead-status-card" style={{ marginBottom: "24px" }}>
              <h3 className="lp-lead-status-title">Lead status</h3>
              <div className="lp-lead-status-current-badge-wrap">
                <span className="lp-lead-status-label">Current status</span>
                <span
                  className={`lp-lead-status-badge lp-lead-status-badge-${leadStatusOption.replace(/\s+/g, "-")}`}
                >
                  {leadStatusOption.charAt(0).toUpperCase() + leadStatusOption.slice(1)}
                </span>
              </div>
              <div className="lp-lead-status-dropdown-wrap">
                <label className="lp-lead-status-label" htmlFor="lp-lead-status-select">
                  Update status
                </label>
                <select
                  id="lp-lead-status-select"
                  className="lp-lead-status-select"
                  value={leadStatusOption}
                  onChange={(e) =>
                    handleLeadStatusChange(e.target.value as LeadStatusOption)
                  }
                  aria-label="Update lead status"
                >
                  <option value="general lead">General lead</option>
                  <option value="out of target">Out of target</option>
                  <option value="not interested">Not interested</option>
                  <option value="potential">Potential</option>
                  <option value="hot">Hot</option>
                  <option value="student">Student</option>
                </select>
              </div>
            </div>

            {/* Follow-up alerts */}
            <div
              className="lp-card lp-followup-card"
              style={{ marginBottom: "24px" }}
            >
              <div className="lp-followup-header">
                <h3 className="lp-card-title">
                  <Bell className="lp-followup-title-icon" strokeWidth={2} />
                  Follow-up alerts
                </h3>
                <button
                  type="button"
                  className="lp-btn-add-followup"
                  onClick={openAddFollowUp}
                >
                  <Plus className="w-4 h-4" strokeWidth={2} />
                  Add follow up
                </button>
              </div>
              {followUpsActive.length === 0 ? (
                <p className="lp-followup-empty">No follow-ups scheduled.</p>
              ) : (
                <ul className="lp-followup-list">
                  {followUpsActive.map((fu) => (
                    <li key={fu.id} className="lp-followup-item">
                      <span
                        className={`lp-followup-badge lp-followup-badge-${fu.status}`}
                      >
                        {fu.status === "overdue"
                          ? "Overdue"
                          : fu.status === "today"
                            ? "Today"
                            : "Upcoming"}
                      </span>
                      <p className="lp-followup-date">
                        {formatFollowUpDate(fu.date)}
                      </p>
                      <p className="lp-followup-note">{fu.note}</p>
                      <div className="lp-followup-actions">
                        <button
                          type="button"
                          className="lp-followup-btn-update"
                          onClick={() => openEditFollowUp(fu)}
                          aria-label="Update follow-up"
                        >
                          <Pencil className="w-3.5 h-3.5" strokeWidth={2} />
                          Update
                        </button>
                        {fu.status !== "done" && (
                          <button
                            type="button"
                            className="lp-followup-btn-done"
                            onClick={() => markFollowUpDone(fu.id)}
                            aria-label="Mark done"
                          >
                            Done
                          </button>
                        )}
                      </div>
                    </li>
                  ))}
                </ul>
              )}
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

      {/* Add follow up modal */}
      {addFollowUpOpen && (
        <div
          className="lp-modal-backdrop"
          onClick={() => setAddFollowUpOpen(false)}
        >
          <div
            className="lp-modal lp-modal-followup"
            onClick={(e) => e.stopPropagation()}
          >
            <div className="lp-modal-header">
              <h3 className="lp-modal-title">Add follow up</h3>
              <button
                type="button"
                className="lp-modal-close"
                onClick={() => setAddFollowUpOpen(false)}
                aria-label="Close"
              >
                <X className="w-5 h-5" strokeWidth={2} />
              </button>
            </div>
            <div className="lp-modal-body">
              <label className="lp-modal-label">Follow-up date</label>
              <input
                type="date"
                className="lp-modal-input"
                value={addFollowUpDate}
                onChange={(e) => setAddFollowUpDate(e.target.value)}
              />
              <label className="lp-modal-label">Note</label>
              <textarea
                className="lp-modal-textarea"
                placeholder="What should you do on this follow-up?"
                value={addFollowUpNote}
                onChange={(e) => setAddFollowUpNote(e.target.value)}
                rows={3}
              />
            </div>
            <div className="lp-modal-footer">
              <button
                type="button"
                className="lp-btn-secondary"
                onClick={() => setAddFollowUpOpen(false)}
              >
                Cancel
              </button>
              <button
                type="button"
                className="lp-btn-save"
                onClick={saveAddFollowUp}
              >
                Save follow up
              </button>
            </div>
          </div>
        </div>
      )}

      {/* Update follow-up modal */}
      {editingFollowUpId && (
        <div
          className="lp-modal-backdrop"
          onClick={() => setEditingFollowUpId(null)}
        >
          <div
            className="lp-modal lp-modal-followup"
            onClick={(e) => e.stopPropagation()}
          >
            <div className="lp-modal-header">
              <h3 className="lp-modal-title">Update follow-up</h3>
              <button
                type="button"
                className="lp-modal-close"
                onClick={() => setEditingFollowUpId(null)}
                aria-label="Close"
              >
                <X className="w-5 h-5" strokeWidth={2} />
              </button>
            </div>
            <div className="lp-modal-body">
              <label className="lp-modal-label">Follow-up date</label>
              <input
                type="date"
                className="lp-modal-input"
                value={editFollowUpDate}
                onChange={(e) => setEditFollowUpDate(e.target.value)}
              />
              <label className="lp-modal-label">Note</label>
              <textarea
                className="lp-modal-textarea"
                value={editFollowUpNote}
                onChange={(e) => setEditFollowUpNote(e.target.value)}
                rows={3}
              />
            </div>
            <div className="lp-modal-footer">
              <button
                type="button"
                className="lp-btn-secondary"
                onClick={() => setEditingFollowUpId(null)}
              >
                Cancel
              </button>
              <button
                type="button"
                className="lp-btn-save"
                onClick={saveEditFollowUp}
              >
                Update
              </button>
            </div>
          </div>
        </div>
      )}

      {/* Update lead modal */}
      {updateLeadOpen && (
        <div
          className="lp-modal-backdrop"
          onClick={() => setUpdateLeadOpen(false)}
        >
          <div
            className="lp-modal lp-modal-lead"
            onClick={(e) => e.stopPropagation()}
          >
            <div className="lp-modal-header">
              <h3 className="lp-modal-title">Update lead</h3>
              <button
                type="button"
                className="lp-modal-close"
                onClick={() => setUpdateLeadOpen(false)}
                aria-label="Close"
              >
                <X className="w-5 h-5" strokeWidth={2} />
              </button>
            </div>
            <div className="lp-modal-body">
              <label className="lp-modal-label">Name</label>
              <input
                type="text"
                className="lp-modal-input"
                defaultValue={lead.name}
                placeholder="Full name"
              />
              <label className="lp-modal-label">Email</label>
              <input
                type="email"
                className="lp-modal-input"
                defaultValue={lead.email}
                placeholder="Email"
              />
              <label className="lp-modal-label">Phone</label>
              <input
                type="tel"
                className="lp-modal-input"
                defaultValue={lead.phone}
                placeholder="Phone"
              />
              {lead.location && (
                <>
                  <label className="lp-modal-label">Location</label>
                  <input
                    type="text"
                    className="lp-modal-input"
                    defaultValue={lead.location}
                    placeholder="Location"
                  />
                </>
              )}
              <label className="lp-modal-label">Specialty</label>
              <select
                className="lp-modal-input"
                value={specialtyDisplay}
                onChange={(e) =>
                  setSpecialtyDisplay(
                    (e.target.value || "") as LeadSpecialty | "",
                  )
                }
                aria-label="Specialty"
              >
                <option value="">Select specialty</option>
                {leadSpecialtyOptions.map((s) => (
                  <option key={s} value={s}>
                    {s}
                  </option>
                ))}
              </select>
            </div>
            <div className="lp-modal-footer">
              <button
                type="button"
                className="lp-btn-secondary"
                onClick={() => setUpdateLeadOpen(false)}
              >
                Cancel
              </button>
              <button
                type="button"
                className="lp-btn-save"
                onClick={() => setUpdateLeadOpen(false)}
              >
                Update lead
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
