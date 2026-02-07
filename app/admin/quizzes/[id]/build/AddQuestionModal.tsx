"use client";

import { useState } from "react";
import {
  HelpCircle,
  X,
  Sparkles,
  Save,
  ListChecks,
  ToggleLeft,
  ChevronDown,
} from "lucide-react";
import type { Question } from "@/types/quiz";
import "./add-question-modal.css";

type QuestionTypeOption = "multiple-choice" | "true-false";

const QUESTION_TYPE_OPTIONS: {
  id: QuestionTypeOption;
  label: string;
  Icon: typeof ListChecks;
}[] = [
  { id: "multiple-choice", label: "MCQ", Icon: ListChecks },
  { id: "true-false", label: "True / False", Icon: ToggleLeft },
];

interface AddQuestionModalProps {
  quizId: string;
  nextOrder: number;
  onClose: () => void;
  onSave: (question: Omit<Question, "id">) => void;
  saveAndAddAnother?: boolean;
}

export default function AddQuestionModal({
  quizId,
  nextOrder,
  onClose,
  onSave,
}: AddQuestionModalProps) {
  const [questionType, setQuestionType] =
    useState<QuestionTypeOption>("multiple-choice");
  const [dropdownOpen, setDropdownOpen] = useState(false);
  const [questionScore, setQuestionScore] = useState(4);
  const [questionText, setQuestionText] = useState("");
  const [options, setOptions] = useState<string[]>(["", "", "", ""]);
  const [correctIndex, setCorrectIndex] = useState(0);
  const [feedback, setFeedback] = useState("");

  const updateOption = (index: number, value: string) => {
    setOptions((prev) => {
      const next = [...prev];
      next[index] = value;
      return next;
    });
  };

  const handleSaveAndAddAnother = () => {
    const trimmedText = questionText.trim();
    if (!trimmedText) return;

    const validOptions = options.filter((o) => o.trim());
    const opts = questionType === "multiple-choice" ? validOptions : undefined;
    const correctAnswer =
      questionType === "multiple-choice"
        ? validOptions[correctIndex] ?? validOptions[0] ?? ""
        : questionType === "true-false"
        ? correctIndex === 0
          ? "true"
          : "false"
        : "";

    const points = Math.max(0, Math.min(100, Number(questionScore) || 4));

    const newQuestion: Omit<Question, "id"> = {
      quizId,
      questionText: trimmedText,
      questionType,
      options: opts?.length ? opts : undefined,
      correctAnswer,
      points,
      explanation: feedback.trim() || undefined,
      order: nextOrder,
    };
    onSave(newQuestion);
    setQuestionText("");
    setOptions(["", "", "", ""]);
    setCorrectIndex(0);
    setFeedback("");
  };

  return (
    <div
      className="aq-modal-backdrop"
      onClick={onClose}
      role="dialog"
      aria-modal="true"
      aria-labelledby="aq-modal-title"
    >
      <div className="aq-modal" onClick={(e) => e.stopPropagation()}>
        <header className="aq-modal-header">
          <div className="aq-modal-header-content">
            <div className="aq-modal-title-row">
              <div className="aq-modal-title-icon" aria-hidden>
                <HelpCircle className="aq-modal-icon-svg" strokeWidth={2} />
              </div>
              <h2 id="aq-modal-title" className="aq-modal-title">
                Add New Question
              </h2>
            </div>
            <p className="aq-modal-subtitle">
              IMETS Quiz Builder Assessment Tool
            </p>
          </div>
          <button
            type="button"
            className="aq-modal-close"
            onClick={onClose}
            aria-label="Close"
          >
            <X className="w-5 h-5" strokeWidth={2} />
          </button>
        </header>

        <div className="aq-modal-body">
          {/* Question Type + Question Score (same row) */}
          <div className="aq-field aq-type-score-row">
            <div className="aq-type-score-group">
              <label className="aq-label">Question Type</label>
              <div className="aq-type-dropdown-wrap">
                <button
                  type="button"
                  className="aq-type-dropdown-trigger"
                  onClick={() => setDropdownOpen((o) => !o)}
                  aria-haspopup="listbox"
                  aria-expanded={dropdownOpen}
                  aria-label="Question type"
                >
                  {(() => {
                    const curr = QUESTION_TYPE_OPTIONS.find(
                      (t) => t.id === questionType
                    );
                    const Icon = curr?.Icon ?? ListChecks;
                    return (
                      <>
                        <Icon
                          className="aq-type-dropdown-icon"
                          strokeWidth={2}
                        />
                        <span>
                          {curr?.id === "multiple-choice" ? "MCQ" : curr?.label}
                        </span>
                      </>
                    );
                  })()}
                  <ChevronDown
                    className={`aq-type-dropdown-chevron ${
                      dropdownOpen ? "open" : ""
                    }`}
                    strokeWidth={2}
                  />
                </button>
                {dropdownOpen && (
                  <>
                    <div
                      className="aq-type-dropdown-backdrop"
                      aria-hidden
                      onClick={() => setDropdownOpen(false)}
                    />
                    <ul
                      className="aq-type-dropdown-menu"
                      role="listbox"
                      aria-label="Question type"
                    >
                      {QUESTION_TYPE_OPTIONS.map((t) => (
                        <li
                          key={t.id}
                          role="option"
                          aria-selected={questionType === t.id}
                        >
                          <button
                            type="button"
                            className={`aq-type-dropdown-item ${
                              questionType === t.id ? "active" : ""
                            }`}
                            onClick={() => {
                              setQuestionType(t.id);
                              setDropdownOpen(false);
                            }}
                          >
                            <t.Icon
                              className="aq-type-dropdown-icon"
                              strokeWidth={2}
                            />
                            <span>
                              {t.id === "multiple-choice" ? "MCQ" : t.label}
                            </span>
                          </button>
                        </li>
                      ))}
                    </ul>
                  </>
                )}
              </div>
            </div>
            <div className="aq-score-group">
              <label className="aq-label" htmlFor="aq-question-score">
                Question Score
              </label>
              <input
                id="aq-question-score"
                type="number"
                min={0}
                max={100}
                className="aq-score-input"
                value={questionScore}
                onChange={(e) =>
                  setQuestionScore(
                    Math.max(0, Math.min(100, Number(e.target.value) || 0))
                  )
                }
              />
            </div>
          </div>

          {/* Question Text (no format toolbar) */}
          <div className="aq-field">
            <label className="aq-label" htmlFor="aq-question-text">
              Question Text
            </label>
            <textarea
              id="aq-question-text"
              className="aq-textarea"
              placeholder="Enter your question details here..."
              value={questionText}
              onChange={(e) => setQuestionText(e.target.value)}
              rows={4}
            />
          </div>

          {/* Answers - 4 options, mark one correct */}
          {questionType === "multiple-choice" && (
            <div className="aq-field">
              <label className="aq-label">Answers</label>
              <p className="aq-hint">
                Mark the radio button for the correct choice
              </p>
              <div className="aq-options-list">
                {options.map((opt, index) => (
                  <div key={index} className="aq-option-row">
                    <input
                      type="radio"
                      name="correct"
                      id={`aq-opt-${index}`}
                      checked={correctIndex === index}
                      onChange={() => setCorrectIndex(index)}
                      className="aq-option-radio"
                    />
                    <input
                      type="text"
                      className="aq-option-input"
                      placeholder={`Option ${index + 1}`}
                      value={opt}
                      onChange={(e) => updateOption(index, e.target.value)}
                      aria-label={`Option ${index + 1}`}
                    />
                  </div>
                ))}
              </div>
            </div>
          )}

          {/* True/False options */}
          {questionType === "true-false" && (
            <div className="aq-field">
              <label className="aq-label">Correct Answer</label>
              <div className="aq-type-tabs aq-tf-tabs">
                <button
                  type="button"
                  className={`aq-type-tab ${
                    correctIndex === 0 ? "active" : ""
                  }`}
                  onClick={() => setCorrectIndex(0)}
                >
                  True
                </button>
                <button
                  type="button"
                  className={`aq-type-tab ${
                    correctIndex === 1 ? "active" : ""
                  }`}
                  onClick={() => setCorrectIndex(1)}
                >
                  False
                </button>
              </div>
              <input
                type="hidden"
                value={correctIndex === 0 ? "true" : "false"}
              />
            </div>
          )}

          {/* Smart Feedback */}
          <div className="aq-field aq-feedback-wrap">
            <label className="aq-label aq-feedback-label">
              <Sparkles
                className="aq-feedback-icon"
                strokeWidth={2}
                aria-hidden
              />
              Smart Feedback
            </label>
            <p className="aq-hint">
              Explain why the correct answer is right. This helps students learn
              faster.
            </p>
            <textarea
              className="aq-textarea aq-feedback-textarea"
              placeholder="Enter feedback for the correct answer..."
              value={feedback}
              onChange={(e) => setFeedback(e.target.value)}
              rows={3}
            />
          </div>
        </div>

        <footer className="aq-modal-footer">
          <button type="button" className="aq-btn-cancel" onClick={onClose}>
            Cancel
          </button>
          <button
            type="button"
            className="aq-btn-save"
            onClick={handleSaveAndAddAnother}
          >
            <Save className="w-4 h-4" strokeWidth={2} />
            Save & Add Another
          </button>
        </footer>
      </div>
    </div>
  );
}
