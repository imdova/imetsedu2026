"use client";

import "./student-profile.css";
import { useState } from "react";
import Link from "next/link";
import {
  User,
  Mail,
  Phone,
  Camera,
  FileText,
  MapPin,
  AlignLeft,
  Shield,
  Globe,
  Calendar,
  AlertCircle,
  RefreshCw,
  ShieldCheck,
  ClipboardList,
  CreditCard,
  HelpCircle,
  GraduationCap,
} from "lucide-react";
import { ROUTES } from "@/constants";

type ProfileTab = "personal" | "security" | "language";

const profileNav = [
  { label: "Profile Settings", href: ROUTES.STUDENT.PROFILE, icon: User },
  {
    label: "My Enrollments",
    href: ROUTES.STUDENT.COURSES,
    icon: ClipboardList,
  },
  { label: "Billing History", href: ROUTES.STUDENT.BILLING, icon: CreditCard },
  { label: "Support Center", href: "#", icon: HelpCircle },
];

export default function StudentProfilePage() {
  const [tab, setTab] = useState<ProfileTab>("personal");
  const [firstName, setFirstName] = useState("Alexander");
  const [lastName, setLastName] = useState("Pierce");
  const [dob, setDob] = useState("05/14/1998");
  const [contactEmail, setContactEmail] = useState(
    "alexander.p@student.imets.edu"
  );
  const [street, setStreet] = useState("452 University Avenue, Suite 102");
  const [city, setCity] = useState("Palo Alto");
  const [stateProvince, setStateProvince] = useState("California");
  const [zipCode, setZipCode] = useState("94301");
  const [aboutMe, setAboutMe] = useState(
    "Third-year Computer Science student passionate about Machine Learning and AI. I'm currently leading the IMETS Tech Society and working on a research paper regarding neural networks."
  );

  return (
    <div className="student-profile-page flex flex-1 min-h-0 min-w-0 bg-[#f9fafb]">
      <div className="flex flex-1 min-h-0 min-w-0">
        {/* Left sidebar: blue profile card + navigation */}
        <aside className="student-profile-sidebar flex flex-col bg-white border-r border-gray-200">
          <div className="student-profile-card flex flex-col items-center text-center">
            <div className="relative">
              <div className="student-profile-avatar-wrap rounded-full flex items-center justify-center overflow-hidden border-2 border-white/30">
                <User className="h-12 w-12 text-white" strokeWidth={2} />
              </div>
              <button
                type="button"
                className="student-profile-avatar-camera"
                aria-label="Change photo"
              >
                <Camera className="h-4 w-4" strokeWidth={2} />
              </button>
            </div>
            <h2 className="student-profile-name text-white">
              {firstName} {lastName}
            </h2>
            <p className="student-profile-id text-white">ID: IMETS-2024-089</p>
            <div className="flex items-center justify-center gap-2 student-profile-status">
              <span className="w-2 h-2 rounded-full bg-green-400" />
              <span>ACTIVE STATUS</span>
            </div>
            <div className="student-profile-buttons">
              <button type="button" className="student-profile-btn-contact">
                <Mail className="h-4 w-4" strokeWidth={2} />
                Email
              </button>
              <button type="button" className="student-profile-btn-contact">
                <Phone className="h-4 w-4" strokeWidth={2} />
                Phone
              </button>
            </div>
          </div>
          <nav className="student-profile-nav flex-1">
            {profileNav.map((item) => (
              <Link key={item.label} href={item.href}>
                <span className="student-profile-nav-icon">
                  <item.icon className="h-4 w-4" strokeWidth={2} />
                </span>
                {item.label}
              </Link>
            ))}
          </nav>
        </aside>

        {/* Main content */}
        <main className="flex-1 min-w-0 overflow-auto">
          <div className="student-profile-main">
            <div className="flex flex-col sm:flex-row sm:items-start sm:justify-between gap-4 student-profile-title-row">
              <div>
                <h1 className="student-profile-title">
                  Student Profile Settings
                </h1>
                <p className="student-profile-subtitle">
                  Update your personal details and account preferences here.
                </p>
              </div>
              <div className="flex items-center student-profile-actions shrink-0">
                <button
                  type="button"
                  className="btn-outline border-primary text-primary hover:bg-primary/70 transition-colors bg-white"
                >
                  Discard
                </button>
                <button
                  type="button"
                  className="bg-primary text-white hover:bg-primary/90 transition-colors"
                >
                  Save Changes
                </button>
              </div>
            </div>

            <div className="flex student-profile-tabs">
              {[
                {
                  id: "personal" as const,
                  label: "Personal Info",
                  icon: FileText,
                },
                { id: "security" as const, label: "Security", icon: Shield },
                {
                  id: "language" as const,
                  label: "Language & Region",
                  icon: Globe,
                },
              ].map(({ id, label, icon: Icon }) => (
                <button
                  key={id}
                  type="button"
                  onClick={() => setTab(id)}
                  className={`student-profile-tab flex items-center gap-2 transition-colors ${
                    tab === id ? "active" : "text-gray-500 hover:text-gray-700"
                  }`}
                >
                  <Icon className="h-4 w-4" strokeWidth={2} />
                  {label}
                </button>
              ))}
            </div>

            {tab === "personal" && (
              <>
                <section className="student-profile-section">
                  <div className="student-profile-section-header">
                    <FileText
                      className="student-profile-section-icon"
                      strokeWidth={2}
                    />
                    <h2 className="student-profile-section-title">
                      Basic Information
                    </h2>
                  </div>
                  <div className="student-profile-grid">
                    <div className="student-profile-field">
                      <label className="student-profile-label">
                        First name
                      </label>
                      <input
                        type="text"
                        value={firstName}
                        onChange={(e) => setFirstName(e.target.value)}
                        className="student-profile-input"
                      />
                    </div>
                    <div className="student-profile-field">
                      <label className="student-profile-label">Last name</label>
                      <input
                        type="text"
                        value={lastName}
                        onChange={(e) => setLastName(e.target.value)}
                        className="student-profile-input"
                      />
                    </div>
                    <div className="student-profile-field">
                      <label className="student-profile-label">
                        Date of birth
                      </label>
                      <div className="relative">
                        <input
                          type="text"
                          value={dob}
                          onChange={(e) => setDob(e.target.value)}
                          placeholder="MM/DD/YYYY"
                          className="student-profile-input pr-10"
                        />
                        <Calendar
                          className="absolute right-3 top-1/2 -translate-y-1/2 h-4 w-4 text-gray-400"
                          strokeWidth={2}
                        />
                      </div>
                    </div>
                    <div className="student-profile-field">
                      <label className="student-profile-label">
                        Contact email
                      </label>
                      <input
                        type="email"
                        value={contactEmail}
                        readOnly
                        className="student-profile-input student-profile-input-readonly"
                      />
                      <p className="student-profile-note">
                        Institutional email cannot be changed.
                      </p>
                    </div>
                  </div>
                </section>

                <section className="student-profile-section">
                  <div className="student-profile-section-header">
                    <MapPin
                      className="student-profile-section-icon"
                      strokeWidth={2}
                    />
                    <h2 className="student-profile-section-title">
                      Current Address
                    </h2>
                  </div>
                  <div className="student-profile-grid">
                    <div className="student-profile-field student-profile-grid-full">
                      <label className="student-profile-label">
                        Street address
                      </label>
                      <input
                        type="text"
                        value={street}
                        onChange={(e) => setStreet(e.target.value)}
                        className="student-profile-input"
                      />
                    </div>
                    <div className="student-profile-field">
                      <label className="student-profile-label">City</label>
                      <input
                        type="text"
                        value={city}
                        onChange={(e) => setCity(e.target.value)}
                        className="student-profile-input"
                      />
                    </div>
                    <div className="student-profile-field">
                      <label className="student-profile-label">
                        State / Province
                      </label>
                      <input
                        type="text"
                        value={stateProvince}
                        onChange={(e) => setStateProvince(e.target.value)}
                        className="student-profile-input"
                      />
                    </div>
                    <div className="student-profile-field">
                      <label className="student-profile-label">Zip code</label>
                      <input
                        type="text"
                        value={zipCode}
                        onChange={(e) => setZipCode(e.target.value)}
                        className="student-profile-input"
                      />
                    </div>
                  </div>
                </section>

                <section className="student-profile-section">
                  <div className="student-profile-section-header">
                    <AlignLeft
                      className="student-profile-section-icon"
                      strokeWidth={2}
                    />
                    <h2 className="student-profile-section-title">Biography</h2>
                  </div>
                  <div className="student-profile-field">
                    <label className="student-profile-label">About me</label>
                    <textarea
                      value={aboutMe}
                      onChange={(e) => setAboutMe(e.target.value)}
                      rows={4}
                      className="student-profile-textarea"
                    />
                    <div className="student-profile-alert">
                      <AlertCircle className="h-4 w-4" strokeWidth={2} />
                      <span>
                        Your profile information is visible to faculty members
                        and instructors only.
                      </span>
                    </div>
                  </div>
                </section>

                <div className="student-profile-cards">
                  <div className="student-profile-card-password">
                    <div className="student-profile-card-icon bg-amber-100">
                      <RefreshCw
                        className="h-6 w-6 text-amber-600"
                        strokeWidth={2}
                      />
                    </div>
                    <div>
                      <h3 className="student-profile-card-title">
                        Password Expiry
                      </h3>
                      <p className="student-profile-card-text">
                        Your password expires in 24 days. Update it soon to
                        maintain account access.
                      </p>
                      <button
                        type="button"
                        className="student-profile-card-link"
                      >
                        Change Now
                      </button>
                    </div>
                  </div>
                  <div className="student-profile-card-2fa">
                    <div className="student-profile-card-icon student-profile-card-icon-primary">
                      <ShieldCheck
                        className="h-6 w-6 text-white"
                        strokeWidth={2}
                      />
                    </div>
                    <div>
                      <h3 className="student-profile-card-title">
                        Two-Factor Auth
                      </h3>
                      <p className="student-profile-card-text">
                        2FA is currently enabled for your student account via
                        Authenticator App.
                      </p>
                      <button
                        type="button"
                        className="student-profile-card-link"
                      >
                        Manage Security
                      </button>
                    </div>
                  </div>
                </div>
              </>
            )}

            {tab === "security" && (
              <div className="space-y-6">
                <section className="student-profile-section">
                  <h2 className="student-profile-section-title mb-2">
                    Password
                  </h2>
                  <p className="text-sm text-gray-600 mb-4">
                    Change your password to keep your account secure.
                  </p>
                  <button
                    type="button"
                    className="px-4 py-2.5 rounded-lg bg-primary text-white font-medium hover:bg-primary/90 transition-colors text-sm"
                  >
                    Update Password
                  </button>
                </section>
                <section className="student-profile-section">
                  <h2 className="student-profile-section-title mb-2">
                    Two-Factor Authentication
                  </h2>
                  <p className="text-sm text-gray-600 mb-4">
                    Manage your 2FA settings and authenticator app.
                  </p>
                  <button type="button" className="student-profile-card-link">
                    Manage Security
                  </button>
                </section>
              </div>
            )}

            {tab === "language" && (
              <section className="student-profile-section">
                <h2 className="student-profile-section-title mb-4">
                  Language & Region
                </h2>
                <div className="student-profile-grid">
                  <div className="student-profile-field">
                    <label className="student-profile-label">Language</label>
                    <select className="student-profile-input bg-white">
                      <option>English</option>
                      <option>Arabic</option>
                      <option>French</option>
                    </select>
                  </div>
                  <div className="student-profile-field">
                    <label className="student-profile-label">Time zone</label>
                    <select className="student-profile-input bg-white">
                      <option>(GMT-08:00) Pacific Time</option>
                      <option>(GMT+00:00) UTC</option>
                      <option>(GMT+02:00) Cairo</option>
                    </select>
                  </div>
                </div>
              </section>
            )}
          </div>

          <footer className="student-profile-footer flex flex-col sm:flex-row items-center justify-between gap-4">
            <div className="flex items-center gap-2">
              <GraduationCap
                className="w-5 h-5 text-gray-500"
                strokeWidth={2}
                aria-hidden
              />
              <span>© 2024 IMETS Academy. All rights reserved.</span>
            </div>
            <div className="flex items-center gap-2 student-profile-footer-links">
              <Link href="#">PRIVACY POLICY</Link>
              <span>·</span>
              <Link href="#">TERMS OF SERVICE</Link>
              <span>·</span>
              <Link href="#">COOKIE POLICY</Link>
            </div>
          </footer>
        </main>
      </div>
    </div>
  );
}
