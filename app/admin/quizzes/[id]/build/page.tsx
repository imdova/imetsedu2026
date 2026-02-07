"use client";

import { useParams } from "next/navigation";
import Link from "next/link";
import { useRef, useState, useMemo } from "react";
import {
  ChevronLeft,
  Plus,
  Pencil,
  Trash2,
  GripVertical,
  Download,
  FileUp,
} from "lucide-react";
import { mockQuizzes } from "@/lib/quizData";
import {
  downloadQuizQuestionsTemplate,
  parseQuizQuestionsFromFile,
} from "@/lib/quizExcel";
import type { Quiz, Question } from "@/types/quiz";
import AddQuestionModal from "./AddQuestionModal";
import "./build.css";

function getQuizById(id: string): Quiz | undefined {
  return mockQuizzes.find((q) => q.id === id);
}

const QUESTION_TYPE_LABELS: Record<string, string> = {
  "multiple-choice": "Multiple choice",
  "true-false": "True / False",
  "short-answer": "Short answer",
  essay: "Essay",
};

export default function QuizBuildPage() {
  const params = useParams();
  const quizId = typeof params.id === "string" ? params.id : "";
  const quiz = getQuizById(quizId);

  if (!quiz) {
    return (
      <div className="qzb-page">
        <div className="qzb-error">
          <p>Quiz not found.</p>
          <Link href="/admin/quizzes" className="qzb-btn-back">
            <ChevronLeft className="w-4 h-4" />
            Back to Quizzes
          </Link>
        </div>
      </div>
    );
  }

  const [localQuestions, setLocalQuestions] = useState<Question[]>(() =>
    [...quiz.questions].sort((a, b) => a.order - b.order)
  );
  const [importError, setImportError] = useState<string | null>(null);
  const [importSuccess, setImportSuccess] = useState<string | null>(null);
  const [addQuestionModalOpen, setAddQuestionModalOpen] = useState(false);
  const fileInputRef = useRef<HTMLInputElement>(null);

  const questions = useMemo(
    () => [...localQuestions].sort((a, b) => a.order - b.order),
    [localQuestions]
  );

  const handleAddQuestion = () => {
    setAddQuestionModalOpen(true);
  };

  const nextOrder = Math.max(0, ...localQuestions.map((q) => q.order), 0) + 1;

  const handleSaveNewQuestion = (q: Omit<Question, "id">) => {
    const newQuestion: Question = {
      ...q,
      id: `q-${Date.now()}-${Math.random().toString(36).slice(2, 9)}`,
    };
    setLocalQuestions((prev) => [...prev, newQuestion]);
  };

  const handleDownloadTemplate = () => {
    downloadQuizQuestionsTemplate();
  };

  const handleImportClick = () => {
    setImportError(null);
    setImportSuccess(null);
    fileInputRef.current?.click();
  };

  const handleFileChange = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    e.target.value = "";
    if (!file) return;

    const name = file.name.toLowerCase();
    if (
      !name.endsWith(".xlsx") &&
      !name.endsWith(".xls") &&
      !name.endsWith(".csv")
    ) {
      setImportError("Please choose an Excel file (.xlsx, .xls) or CSV.");
      return;
    }

    const { questions: parsed, errors } = await parseQuizQuestionsFromFile(
      file
    );
    if (errors.length) {
      setImportError(errors[0]);
      return;
    }
    if (!parsed.length) {
      setImportError("No valid questions found in the file.");
      return;
    }

    const nextOrder = Math.max(0, ...localQuestions.map((q) => q.order)) + 1;
    const newQuestions: Question[] = parsed.map((q, i) => ({
      ...q,
      id: `import-${Date.now()}-${i}`,
      quizId,
      order: nextOrder + i,
    }));
    setLocalQuestions((prev) => [...prev, ...newQuestions]);
    setImportSuccess(`Imported ${newQuestions.length} question(s).`);
  };

  return (
    <div className="qzb-page">
      <header className="qzb-header">
        <div className="qzb-header-inner">
          <Link href="/admin/quizzes" className="qzb-back">
            <ChevronLeft className="w-5 h-5" strokeWidth={2} />
            Quizzes
          </Link>
          <div className="qzb-title-wrap">
            <h1 className="qzb-title">{quiz.title}</h1>
            <span className="qzb-badge">Build Questions</span>
          </div>
          {quiz.description && <p className="qzb-desc">{quiz.description}</p>}
        </div>
      </header>

      <div className="qzb-main">
        <div className="qzb-card">
          <div className="qzb-card-head">
            <h2 className="qzb-card-title">Questions</h2>
            <div className="qzb-card-actions">
              <button
                type="button"
                className="qzb-btn-secondary"
                onClick={handleDownloadTemplate}
              >
                <Download className="w-4 h-4" strokeWidth={2} />
                Download Excel template
              </button>
              <button
                type="button"
                className="qzb-btn-secondary"
                onClick={handleImportClick}
              >
                <FileUp className="w-4 h-4" strokeWidth={2} />
                Import from Excel
              </button>
              <input
                ref={fileInputRef}
                type="file"
                accept=".xlsx,.xls,.csv"
                className="qzb-file-input"
                aria-hidden
                onChange={handleFileChange}
              />
              <button
                type="button"
                className="qzb-btn-add"
                onClick={handleAddQuestion}
              >
                <Plus className="w-5 h-5" strokeWidth={2} />
                Add question
              </button>
            </div>
          </div>
          {(importError || importSuccess) && (
            <div
              className={
                importError
                  ? "qzb-import-message error"
                  : "qzb-import-message success"
              }
            >
              {importError ?? importSuccess}
            </div>
          )}

          {questions.length === 0 ? (
            <div className="qzb-empty">
              <p className="qzb-empty-text">No questions yet.</p>
              <p className="qzb-empty-hint">
                Click &quot;Add question&quot; to create the first question.
              </p>
              <button
                type="button"
                className="qzb-btn-add qzb-btn-add-center"
                onClick={handleAddQuestion}
              >
                <Plus className="w-5 h-5" strokeWidth={2} />
                Add question
              </button>
            </div>
          ) : (
            <ul className="qzb-list">
              {questions.map((q, index) => (
                <li key={q.id} className="qzb-item">
                  <div className="qzb-item-drag">
                    <GripVertical className="w-4 h-4" strokeWidth={2} />
                  </div>
                  <div className="qzb-item-num">{index + 1}</div>
                  <div className="qzb-item-body">
                    <p className="qzb-item-text">{q.questionText}</p>
                    <div className="qzb-item-meta">
                      <span className="qzb-item-type">
                        {QUESTION_TYPE_LABELS[q.questionType] ?? q.questionType}
                      </span>
                      <span className="qzb-item-points">{q.points} pts</span>
                    </div>
                  </div>
                  <div className="qzb-item-actions">
                    <button
                      type="button"
                      className="qzb-action-btn edit"
                      aria-label="Edit question"
                      title="Edit"
                    >
                      <Pencil className="w-4 h-4" strokeWidth={2} />
                    </button>
                    <button
                      type="button"
                      className="qzb-action-btn delete"
                      aria-label="Delete question"
                      title="Delete"
                    >
                      <Trash2 className="w-4 h-4" strokeWidth={2} />
                    </button>
                  </div>
                </li>
              ))}
            </ul>
          )}
        </div>
      </div>

      {addQuestionModalOpen && (
        <AddQuestionModal
          quizId={quizId}
          nextOrder={nextOrder}
          onClose={() => setAddQuestionModalOpen(false)}
          onSave={handleSaveNewQuestion}
        />
      )}
    </div>
  );
}
