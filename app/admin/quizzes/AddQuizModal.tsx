"use client";

import { useState } from "react";
import { HelpCircle, X, Info, ChevronRight } from "lucide-react";
import "./add-quiz-modal.css";

const CATEGORY_OPTIONS = [
  { value: "", label: "Select Category" },
  { value: "finance", label: "Finance" },
  { value: "healthcare", label: "Healthcare" },
  { value: "tech", label: "Technology" },
];

const SUBCATEGORY_OPTIONS = [
  { value: "", label: "Select Sub-category" },
  { value: "modeling", label: "Financial Modeling" },
  { value: "analytics", label: "Analytics" },
];

const ATTEMPT_OPTIONS = [
  { value: "1", label: "1 Attempt" },
  { value: "2", label: "2 Attempts" },
  { value: "3", label: "3 Attempts" },
  { value: "unlimited", label: "Unlimited" },
];

const DIFFICULTY_LEVELS = [
  { id: "beginner", label: "BEGINNER" },
  { id: "intermediate", label: "INTERMEDIATE" },
  { id: "advanced", label: "ADVANCED" },
] as const;

type DifficultyId = (typeof DIFFICULTY_LEVELS)[number]["id"];

const MOCK_GROUPS = [
  { id: "1", name: "Full-stack 2024" },
  { id: "2", name: "Q3 Interns" },
  { id: "3", name: "MBA-JAN-24-A" },
  { id: "4", name: "DS-MAR-24-B" },
];

interface AddQuizModalProps {
  onClose: () => void;
  onNext?: () => void;
}

export default function AddQuizModal({ onClose, onNext }: AddQuizModalProps) {
  const [title, setTitle] = useState("");
  const [category, setCategory] = useState("");
  const [subcategory, setSubcategory] = useState("");
  const [selectedGroups, setSelectedGroups] = useState<
    { id: string; name: string }[]
  >([MOCK_GROUPS[0], MOCK_GROUPS[1]]);
  const [groupInput, setGroupInput] = useState("");
  const [timeLimitEnabled, setTimeLimitEnabled] = useState(true);
  const [timeLimitMins, setTimeLimitMins] = useState(45);
  const [passingScore, setPassingScore] = useState(70);
  const [attempts, setAttempts] = useState("1");
  const [difficulty, setDifficulty] = useState<DifficultyId>("intermediate");
  const [browserLocking, setBrowserLocking] = useState(true);
  const [shuffleQuestions, setShuffleQuestions] = useState(true);

  const removeGroup = (id: string) => {
    setSelectedGroups((prev) => prev.filter((g) => g.id !== id));
  };

  const addGroup = (group: { id: string; name: string }) => {
    if (selectedGroups.some((g) => g.id === group.id)) return;
    setSelectedGroups((prev) => [...prev, group]);
    setGroupInput("");
  };

  const availableGroups = MOCK_GROUPS.filter(
    (g) =>
      !selectedGroups.some((s) => s.id === g.id) &&
      (groupInput === "" ||
        g.name.toLowerCase().includes(groupInput.toLowerCase()))
  );

  const handleNext = () => {
    if (onNext) onNext();
    else onClose();
  };

  return (
    <div
      className="aqm-backdrop"
      onClick={onClose}
      role="dialog"
      aria-modal="true"
      aria-labelledby="aqm-title"
    >
      <div className="aqm-modal" onClick={(e) => e.stopPropagation()}>
        <header className="aqm-header">
          <div className="aqm-header-content">
            <div className="aqm-title-row">
              <HelpCircle
                className="aqm-title-icon"
                strokeWidth={2}
                aria-hidden
              />
              <h2 id="aqm-title" className="aqm-title">
                Quiz Information &amp; Settings
              </h2>
            </div>
            <p className="aqm-subtitle">
              Configure identity and behavior for the new assessment.
            </p>
          </div>
          <button
            type="button"
            className="aqm-close"
            onClick={onClose}
            aria-label="Close"
          >
            <X className="w-5 h-5" strokeWidth={2} />
          </button>
        </header>

        <div className="aqm-body">
          <div className="aqm-section aqm-identity">
            <h3 className="aqm-section-title">Quiz Identity</h3>
            <div className="aqm-field">
              <label className="aqm-label" htmlFor="aqm-title-input">
                Quiz Title
              </label>
              <input
                id="aqm-title-input"
                type="text"
                className="aqm-input"
                placeholder="e.g. Advanced Financial Modeling."
                value={title}
                onChange={(e) => setTitle(e.target.value)}
              />
            </div>
            <div className="aqm-field">
              <label className="aqm-label" htmlFor="aqm-category">
                Course Category
              </label>
              <div className="aqm-select-wrap">
                <select
                  id="aqm-category"
                  className="aqm-select"
                  value={category}
                  onChange={(e) => setCategory(e.target.value)}
                >
                  {CATEGORY_OPTIONS.map((opt) => (
                    <option key={opt.value || "cat"} value={opt.value}>
                      {opt.label}
                    </option>
                  ))}
                </select>
              </div>
            </div>
            <div className="aqm-field">
              <label className="aqm-label" htmlFor="aqm-subcategory">
                Sub-category
              </label>
              <div className="aqm-select-wrap">
                <select
                  id="aqm-subcategory"
                  className="aqm-select"
                  value={subcategory}
                  onChange={(e) => setSubcategory(e.target.value)}
                >
                  {SUBCATEGORY_OPTIONS.map((opt) => (
                    <option key={opt.value || "sub"} value={opt.value}>
                      {opt.label}
                    </option>
                  ))}
                </select>
              </div>
            </div>
            <div className="aqm-field">
              <label className="aqm-label">Assign to Groups</label>
              <div className="aqm-groups-input">
                {selectedGroups.map((g) => (
                  <span key={g.id} className="aqm-group-tag">
                    {g.name}
                    <button
                      type="button"
                      className="aqm-group-tag-remove"
                      onClick={() => removeGroup(g.id)}
                      aria-label={`Remove ${g.name}`}
                    >
                      <X className="w-3.5 h-3.5" strokeWidth={2} />
                    </button>
                  </span>
                ))}
                <input
                  type="text"
                  className="aqm-groups-placeholder"
                  placeholder="Add groups..."
                  value={groupInput}
                  onChange={(e) => setGroupInput(e.target.value)}
                  onFocus={(e) => e.target.select()}
                />
                {groupInput && availableGroups.length > 0 && (
                  <div className="aqm-groups-dropdown">
                    {availableGroups.slice(0, 5).map((g) => (
                      <button
                        key={g.id}
                        type="button"
                        className="aqm-groups-dropdown-item"
                        onClick={() => addGroup(g)}
                      >
                        {g.name}
                      </button>
                    ))}
                  </div>
                )}
              </div>
              <p className="aqm-info">
                <Info className="aqm-info-icon" strokeWidth={2} aria-hidden />
                Assigning to groups automatically invites all members to this
                quiz once published.
              </p>
            </div>
          </div>

          <div className="aqm-section aqm-settings">
            <h3 className="aqm-section-title">Smart Settings</h3>
            <div className="aqm-field aqm-toggle-field">
              <label className="aqm-label">Time Limit</label>
              <div className="aqm-toggle-row">
                <button
                  type="button"
                  role="switch"
                  aria-checked={timeLimitEnabled}
                  className={`aqm-toggle ${timeLimitEnabled ? "on" : ""}`}
                  onClick={() => setTimeLimitEnabled((v) => !v)}
                >
                  <span className="aqm-toggle-thumb" />
                </button>
                <input
                  type="number"
                  min={1}
                  max={999}
                  className="aqm-input aqm-input-inline"
                  value={timeLimitMins}
                  onChange={(e) =>
                    setTimeLimitMins(Number(e.target.value) || 45)
                  }
                  disabled={!timeLimitEnabled}
                />
                <span className="aqm-unit">mins</span>
              </div>
            </div>
            <div className="aqm-field">
              <label className="aqm-label" htmlFor="aqm-passing">
                Passing Score
              </label>
              <div className="aqm-input-suffix">
                <input
                  id="aqm-passing"
                  type="number"
                  min={0}
                  max={100}
                  className="aqm-input"
                  value={passingScore}
                  onChange={(e) =>
                    setPassingScore(
                      Math.min(100, Math.max(0, Number(e.target.value) || 0))
                    )
                  }
                />
                <span className="aqm-unit">%</span>
              </div>
            </div>
            <div className="aqm-field">
              <label className="aqm-label" htmlFor="aqm-attempts">
                Number of Attempts
              </label>
              <div className="aqm-select-wrap">
                <select
                  id="aqm-attempts"
                  className="aqm-select"
                  value={attempts}
                  onChange={(e) => setAttempts(e.target.value)}
                >
                  {ATTEMPT_OPTIONS.map((opt) => (
                    <option key={opt.value} value={opt.value}>
                      {opt.label}
                    </option>
                  ))}
                </select>
              </div>
            </div>
            <div className="aqm-field">
              <label className="aqm-label">Difficulty Level</label>
              <div className="aqm-slider-wrap">
                <div className="aqm-slider-labels">
                  {DIFFICULTY_LEVELS.map((d) => (
                    <span
                      key={d.id}
                      className={`aqm-slider-label ${
                        difficulty === d.id ? "active" : ""
                      }`}
                    >
                      {d.label}
                    </span>
                  ))}
                </div>
                <div className="aqm-slider-track">
                  <input
                    type="range"
                    min={0}
                    max={2}
                    value={DIFFICULTY_LEVELS.findIndex(
                      (d) => d.id === difficulty
                    )}
                    onChange={(e) =>
                      setDifficulty(
                        DIFFICULTY_LEVELS[Number(e.target.value)]?.id ??
                          "intermediate"
                      )
                    }
                    className="aqm-slider"
                  />
                </div>
              </div>
            </div>
            <div className="aqm-field aqm-checks">
              <p className="aqm-subsection-title">Anti-Cheat Features</p>
              <label className="aqm-check">
                <input
                  type="checkbox"
                  checked={browserLocking}
                  onChange={(e) => setBrowserLocking(e.target.checked)}
                />
                <span className="aqm-check-text">
                  Enable Browser Locking — Prevents users from switching tabs
                  during the quiz.
                </span>
              </label>
              <label className="aqm-check">
                <input
                  type="checkbox"
                  checked={shuffleQuestions}
                  onChange={(e) => setShuffleQuestions(e.target.checked)}
                />
                <span className="aqm-check-text">
                  Shuffle Questions — Randomizes question order for every
                  student.
                </span>
              </label>
            </div>
          </div>
        </div>

        <footer className="aqm-footer">
          <button type="button" className="aqm-btn-cancel" onClick={onClose}>
            Cancel
          </button>
          <button type="button" className="aqm-btn-next" onClick={handleNext}>
            Next: Build Questions
            <ChevronRight className="w-5 h-5" strokeWidth={2} />
          </button>
        </footer>
      </div>
    </div>
  );
}
