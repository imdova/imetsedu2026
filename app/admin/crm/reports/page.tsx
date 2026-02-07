"use client";

import { useState, useMemo } from "react";
import {
  Search,
  BarChart3,
  Bell,
  Star,
  TrendingUp,
  TrendingDown,
  DollarSign,
  Clock,
  PieChart,
  Sparkles,
} from "lucide-react";
import {
  reportCards,
  dateRangeOptions,
  assignedTeamOptions,
  courseCategoryOptions,
  type ReportCard as ReportCardType,
} from "./reports-data";
import "./reports.css";

const ICON_MAP: Record<
  ReportCardType["icon"],
  React.ComponentType<{ className?: string }>
> = {
  dollar: DollarSign,
  sparkles: Sparkles,
  "bar-chart": BarChart3,
  trend: TrendingUp,
  clock: Clock,
  pie: PieChart,
};

function ReportCardRow({ card }: { card: ReportCardType }) {
  const IconComponent = ICON_MAP[card.icon];
  const iconEl = <IconComponent className="cr-icon" strokeWidth={2} />;

  return (
    <article className="cr-card">
      {card.pinned && (
        <span className="cr-card-pin" aria-label="Pinned">
          <Star className="w-4 h-4" fill="currentColor" strokeWidth={0} />
        </span>
      )}
      <div className="cr-card-icon">{iconEl}</div>
      <div className="cr-card-body">
        <h3 className="cr-card-title">{card.title}</h3>
        <p className="cr-card-desc">{card.description}</p>
        <div className={`cr-tag cr-tag-${card.tag}`}>
          <span className="cr-tag-label">{card.tagLabel}</span>
          <span className="cr-tag-value">
            {card.tagTrend === "up" && (
              <TrendingUp className="cr-tag-trend cr-trend-up" />
            )}
            {card.tagTrend === "down" && (
              <TrendingDown className="cr-tag-trend cr-trend-down" />
            )}
            {card.tagValue}
          </span>
        </div>
      </div>
    </article>
  );
}

export default function CRMReportsPage() {
  const [search, setSearch] = useState("");
  const [dateRange, setDateRange] = useState("30");
  const [assignedTeam, setAssignedTeam] = useState("all");
  const [categories, setCategories] = useState<Record<string, boolean>>({
    professional: true,
    technical: true,
    soft: false,
  });

  const filtered = useMemo(() => {
    if (!search.trim()) return reportCards;
    const q = search.toLowerCase();
    return reportCards.filter(
      (c) =>
        c.title.toLowerCase().includes(q) ||
        c.description.toLowerCase().includes(q)
    );
  }, [search]);

  const pinned = filtered.filter((c) => c.section === "pinned");
  const sales = filtered.filter((c) => c.section === "sales");
  const lead = filtered.filter((c) => c.section === "lead");

  const toggleCategory = (key: string) => {
    setCategories((prev) => ({ ...prev, [key]: !prev[key] }));
  };

  return (
    <div className="cr-page">
      <div className="cr-filters-bar">
        <div className="cr-filters-row">
          <label className="cr-filter-group">
            <span className="cr-filter-label">Date Range</span>
            <select
              value={dateRange}
              onChange={(e) => setDateRange(e.target.value)}
              className="cr-select"
            >
              {dateRangeOptions.map((opt) => (
                <option key={opt.value} value={opt.value}>
                  {opt.label}
                </option>
              ))}
            </select>
          </label>
          <label className="cr-filter-group">
            <span className="cr-filter-label">Assigned Team</span>
            <select
              value={assignedTeam}
              onChange={(e) => setAssignedTeam(e.target.value)}
              className="cr-select"
            >
              {assignedTeamOptions.map((opt) => (
                <option key={opt.value} value={opt.value}>
                  {opt.label}
                </option>
              ))}
            </select>
          </label>
          <div className="cr-filter-group">
            <span className="cr-filter-label">Course Category</span>
            <div className="cr-checkboxes">
              {courseCategoryOptions.map((opt) => (
                <label key={opt.value} className="cr-checkbox-label">
                  <input
                    type="checkbox"
                    checked={categories[opt.value] ?? false}
                    onChange={() => toggleCategory(opt.value)}
                  />
                  <span>{opt.label}</span>
                </label>
              ))}
            </div>
          </div>
        </div>
      </div>

      <header className="cr-header">
        <h1 className="cr-title">CRM Reports</h1>
        <div className="cr-header-actions">
          <div className="cr-search-wrap">
            <Search className="cr-search-icon" strokeWidth={2} />
            <input
              type="search"
              className="cr-search-input"
              placeholder="Search for reports, datasets or metrics..."
              value={search}
              onChange={(e) => setSearch(e.target.value)}
            />
          </div>
          <button
            type="button"
            className="cr-btn-icon"
            aria-label="Notifications"
          >
            <Bell className="w-5 h-5" strokeWidth={2} />
          </button>
          <button type="button" className="cr-btn-build">
            <BarChart3 className="cr-btn-build-icon" strokeWidth={2} />
            Build Custom Report
          </button>
        </div>
      </header>

      <main className="cr-main">
        {pinned.length > 0 && (
          <section className="cr-section">
            <div className="cr-section-head">
              <h2 className="cr-section-title">
                <Star className="cr-section-icon" strokeWidth={2} />
                Pinned Reports
              </h2>
              <button type="button" className="cr-link-edit">
                Edit Favorites
              </button>
            </div>
            <div className="cr-grid">
              {pinned.map((card) => (
                <ReportCardRow key={card.id} card={card} />
              ))}
            </div>
          </section>
        )}

        {sales.length > 0 && (
          <section className="cr-section">
            <h2 className="cr-section-title cr-section-title-uppercase">
              Sales & Revenue
            </h2>
            <div className="cr-grid">
              {sales.map((card) => (
                <ReportCardRow key={card.id} card={card} />
              ))}
            </div>
          </section>
        )}

        {lead.length > 0 && (
          <section className="cr-section">
            <h2 className="cr-section-title cr-section-title-uppercase">
              Lead Performance
            </h2>
            <div className="cr-grid">
              {lead.map((card) => (
                <ReportCardRow key={card.id} card={card} />
              ))}
            </div>
          </section>
        )}

        {filtered.length === 0 && (
          <p className="cr-empty">No reports match your search.</p>
        )}
      </main>
    </div>
  );
}
