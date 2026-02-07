"use client";

import "../../lesson/[lessonId]/lesson.css";
import "./quiz.css";
import Link from "next/link";
import { useParams } from "next/navigation";
import { useState, useRef, useCallback, useEffect } from "react";
import {
  Search,
  Bell,
  ChevronDown,
  GraduationCap,
  Settings,
  Flag,
  ChevronLeft,
  ChevronRight,
  ArrowLeft,
  Maximize,
  Minimize,
  ClipboardList,
  Check,
  Play,
  Lock,
  ChevronRight as ChevronRightIcon,
  Lightbulb,
  RotateCcw,
  Share2,
  X,
} from "lucide-react";
import { ROUTES } from "@/constants";
import { getQuizData } from "./quiz-data";
import { getLessonData } from "../../lesson/[lessonId]/lesson-data";
import type { SidebarModule } from "../../lesson/[lessonId]/lesson-data";

function formatTime(seconds: number): string {
  const m = Math.floor(seconds / 60);
  const s = seconds % 60;
  return `00:${String(m).padStart(2, "0")}:${String(s).padStart(2, "0")}`;
}

function formatTimeTaken(seconds: number): string {
  const m = Math.floor(seconds / 60);
  const s = seconds % 60;
  if (m > 0) return `${m}m ${s}s`;
  return `${s}s`;
}

function timeAgo(ts: number): string {
  const sec = Math.floor((Date.now() - ts) / 1000);
  if (sec < 60) return "Just now";
  if (sec < 120) return "1 minute ago";
  const min = Math.floor(sec / 60);
  if (min < 60) return `${min} minutes ago`;
  const hr = Math.floor(min / 60);
  if (hr === 1) return "1 hour ago";
  return `${hr} hours ago`;
}

type ReviewFilter = "all" | "incorrect" | "correct";

function QuizFeedbackView({
  quiz,
  courseId,
  lessonData,
  modules,
  toggleModule,
  score,
  submittedAnswers,
  timeTakenSeconds,
  submittedAt,
  pointsEarned,
  pointsMax,
  pct,
  passed,
  correctIndices,
  incorrectIndices,
  quizId,
}: {
  quiz: NonNullable<ReturnType<typeof getQuizData>>;
  courseId: string;
  lessonData: ReturnType<typeof getLessonData> | null;
  modules: SidebarModule[];
  toggleModule: (id: string) => void;
  score: { correct: number; total: number };
  submittedAnswers: Record<number, number>;
  timeTakenSeconds: number;
  submittedAt: number;
  pointsEarned: number;
  pointsMax: number;
  pct: number;
  passed: boolean;
  correctIndices: number[];
  incorrectIndices: number[];
  quizId: string;
}) {
  const [reviewFilter, setReviewFilter] = useState<ReviewFilter>("all");
  const feedbackTitle = quiz.feedbackTitle ?? quiz.title;
  const passingPct = quiz.passingPct ?? 70;

  const reviewIndices =
    reviewFilter === "all"
      ? quiz.questions.map((_, i) => i)
      : reviewFilter === "incorrect"
      ? incorrectIndices
      : correctIndices;

  return (
    <div className="slp-page">
      <header className="slp-topbar">
        <Link href={ROUTES.STUDENT.COURSES} className="slp-logo">
          <div className="slp-logo-icon">
            <GraduationCap className="w-5 h-5" strokeWidth={2} />
          </div>
          <span className="slp-logo-text">IMETS Academy</span>
        </Link>
        <nav className="slp-nav">
          <Link href={ROUTES.STUDENT.COURSES}>My Courses</Link>
          <Link href={ROUTES.STUDENT.DASHBOARD}>Learning Path</Link>
          <Link href={ROUTES.STUDENT.COURSES}>Resources</Link>
        </nav>
        <div className="slp-topbar-right">
          <div className="slp-search-wrap">
            <Search className="w-4 h-4 slp-search-icon" strokeWidth={2} />
            <input
              type="search"
              placeholder="Search lessons..."
              aria-label="Search"
            />
          </div>
          <button
            type="button"
            className="slp-icon-btn sqf-bell-wrap"
            aria-label="Notifications"
          >
            <Bell className="w-5 h-5" strokeWidth={2} />
            <span className="sqf-bell-dot" />
          </button>
          <div className="slp-avatar" aria-hidden />
        </div>
      </header>

      <div className="slp-main">
        <aside className="slp-sidebar sqf-sidebar">
          <div className="sqf-sidebar-course">COURSE: ADVANCED SYSTEMS</div>
          {lessonData && (
            <>
              <div className="sqf-progress-label">Overall Progress</div>
              <div className="slp-progress-bar">
                <div
                  className="slp-progress-fill"
                  style={{ width: `${lessonData.progressPct}%` }}
                />
              </div>
            </>
          )}
          <div className="slp-module-list">
            {modules.map((mod) => (
              <div
                key={mod.id}
                className={`slp-module ${mod.expanded ? "open" : ""}`}
              >
                <button
                  type="button"
                  className="slp-module-header"
                  onClick={() => toggleModule(mod.id)}
                >
                  {mod.title}
                  <ChevronRightIcon
                    className="w-4 h-4 slp-module-chevron"
                    strokeWidth={2}
                  />
                </button>
                {mod.expanded &&
                  mod.lessons.map((lesson) => (
                    <Link
                      key={lesson.id}
                      href={ROUTES.STUDENT.COURSE_LESSON(courseId, lesson.slug)}
                      className="slp-lesson"
                    >
                      {lesson.status === "completed" && (
                        <Check
                          className="w-4 h-4 slp-lesson-icon"
                          strokeWidth={2}
                        />
                      )}
                      {lesson.status === "in_progress" && (
                        <Play
                          className="w-4 h-4 slp-lesson-icon play"
                          strokeWidth={2}
                          fill="currentColor"
                        />
                      )}
                      {lesson.status === "locked" && (
                        <Lock
                          className="w-4 h-4 slp-lesson-icon locked"
                          strokeWidth={2}
                        />
                      )}
                      <div className="slp-lesson-info">
                        <p className="slp-lesson-title">{lesson.title}</p>
                      </div>
                    </Link>
                  ))}
              </div>
            ))}
            <div className="slp-sidebar-quiz-section">
              <span className="slp-sidebar-quiz slp-sidebar-quiz-active">
                <ClipboardList
                  className="w-4 h-4 slp-sidebar-quiz-icon"
                  strokeWidth={2}
                />
                <div className="slp-lesson-info">
                  <p className="slp-lesson-title">Quiz: Knowledge Check</p>
                </div>
                <ChevronRightIcon
                  className="w-4 h-4 slp-sidebar-quiz-arrow"
                  strokeWidth={2}
                />
              </span>
            </div>
          </div>
        </aside>

        <div className="slp-content sqf-content">
          <div className="sqf-header">
            <Link
              href={ROUTES.STUDENT.COURSE_LESSON(courseId, "2-1")}
              className="sqf-back"
            >
              <ArrowLeft className="w-5 h-5" strokeWidth={2} />
            </Link>
            <div className="sqf-header-text">
              <h1 className="sqf-title">{feedbackTitle}</h1>
              <p className="sqf-submitted">Submitted {timeAgo(submittedAt)}</p>
            </div>
            <span className="sqf-pill">GRADED ASSESSMENT</span>
          </div>

          <div className="sqf-card">
            <div className={`sqf-status ${passed ? "passed" : "failed"}`}>
              <Check className="w-4 h-4" strokeWidth={2} />
              STATUS: {passed ? "PASSED" : "FAILED"}
            </div>
            <h2 className="sqf-headline">
              {passed ? "Excellent performance!" : "Keep practicing"}
            </h2>
            <p className="sqf-desc">
              {passed
                ? "You've demonstrated a strong understanding of the material. You have successfully unlocked the next chapter."
                : "Review the incorrect answers below and consider retaking the quiz."}
            </p>
            <div className="sqf-donut-wrap">
              <div className="sqf-donut" style={{ ["--pct" as string]: pct }}>
                <span className="sqf-donut-value">{pct}%</span>
                <span className="sqf-donut-label">SCORE</span>
              </div>
            </div>
            <div className="sqf-metrics">
              <div className="sqf-metric">
                <span className="sqf-metric-label">TOTAL POINTS</span>
                <span className="sqf-metric-value">
                  {pointsEarned} / {pointsMax}
                </span>
              </div>
              <div className="sqf-metric">
                <span className="sqf-metric-label">TIME TAKEN</span>
                <span className="sqf-metric-value">
                  {formatTimeTaken(timeTakenSeconds)}
                </span>
              </div>
              <div className="sqf-metric">
                <span className="sqf-metric-label">PASSING MARK</span>
                <span className="sqf-metric-value">{passingPct}%</span>
              </div>
            </div>
          </div>

          <section className="sqf-review">
            <h2 className="sqf-review-title">Answer Review</h2>
            <div className="sqf-filters">
              <button
                type="button"
                className={`sqf-filter-btn ${
                  reviewFilter === "all" ? "active" : ""
                }`}
                onClick={() => setReviewFilter("all")}
              >
                All ({score.total})
              </button>
              <button
                type="button"
                className={`sqf-filter-btn ${
                  reviewFilter === "incorrect" ? "active" : ""
                }`}
                onClick={() => setReviewFilter("incorrect")}
              >
                Incorrect ({incorrectIndices.length})
              </button>
              <button
                type="button"
                className={`sqf-filter-btn ${
                  reviewFilter === "correct" ? "active" : ""
                }`}
                onClick={() => setReviewFilter("correct")}
              >
                Correct ({correctIndices.length})
              </button>
            </div>

            <div className="sqf-questions">
              {reviewIndices.map((qIndex) => {
                const q = quiz.questions[qIndex];
                const userChoice = submittedAnswers[qIndex];
                const isCorrect = userChoice === q.correctIndex;
                return (
                  <div key={q.id} className="sqf-question-block">
                    <div className="sqf-question-row">
                      <span className="sqf-q-num">{qIndex + 1}</span>
                      <p className="sqf-q-text">{q.question}</p>
                      <span
                        className={`sqf-q-result ${
                          isCorrect ? "correct" : "incorrect"
                        }`}
                      >
                        {isCorrect ? (
                          <Check className="w-4 h-4" strokeWidth={2} />
                        ) : (
                          <X className="w-4 h-4" strokeWidth={2} />
                        )}
                        {isCorrect ? "Correct" : "Incorrect"}
                      </span>
                    </div>
                    <div className="sqf-options">
                      {q.options.map((opt, optIndex) => (
                        <div
                          key={optIndex}
                          className={`sqf-option-row ${
                            userChoice === optIndex ? "your-choice" : ""
                          } ${
                            userChoice === optIndex && isCorrect
                              ? "correct"
                              : ""
                          } ${
                            userChoice === optIndex && !isCorrect
                              ? "incorrect"
                              : ""
                          }`}
                        >
                          <span className="sqf-option-radio" />
                          <span className="sqf-option-text">{opt}</span>
                          {userChoice === optIndex && (
                            <span className="sqf-your-choice">YOUR CHOICE</span>
                          )}
                        </div>
                      ))}
                    </div>
                    {q.learningInsight && (
                      <div className="sqf-insight">
                        <Lightbulb
                          className="w-4 h-4 sqf-insight-icon"
                          strokeWidth={2}
                        />
                        <div>
                          <div className="sqf-insight-title">
                            LEARNING INSIGHT
                          </div>
                          <p className="sqf-insight-text">
                            {q.learningInsight}
                          </p>
                        </div>
                      </div>
                    )}
                  </div>
                );
              })}
            </div>
          </section>

          <div className="sqf-actions">
            <Link
              href={ROUTES.STUDENT.COURSE_QUIZ(courseId, quizId)}
              className="sqf-action-btn retake"
            >
              <RotateCcw className="w-4 h-4" strokeWidth={2} />
              Retake Quiz
            </Link>
            <button type="button" className="sqf-action-btn share">
              <Share2 className="w-4 h-4" strokeWidth={2} />
              Share Results
            </button>
            <Link
              href={ROUTES.STUDENT.COURSE_LESSON(courseId, "2-2")}
              className="sqf-action-btn next"
            >
              Continue to Next Lesson
              <ChevronRight className="w-4 h-4" strokeWidth={2} />
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
}

export default function StudentQuizPage() {
  const params = useParams();
  const courseId = typeof params.id === "string" ? params.id : "";
  const quizId = typeof params.quizId === "string" ? params.quizId : "";

  const quiz = getQuizData(courseId, quizId);
  const lessonData = getLessonData(courseId, "2-1");
  const [currentIndex, setCurrentIndex] = useState(0);
  const [answers, setAnswers] = useState<Record<number, number>>({});
  const [flagged, setFlagged] = useState<Set<number>>(new Set([5]));
  const [timerSeconds, setTimerSeconds] = useState(45 * 60 + 12);
  const [isFullscreen, setIsFullscreen] = useState(false);
  const [submitted, setSubmitted] = useState(false);
  const [showSubmitConfirm, setShowSubmitConfirm] = useState(false);
  const [score, setScore] = useState<{
    correct: number;
    total: number;
    timeTakenSeconds: number;
    submittedAt: number;
  } | null>(null);
  const [submittedAnswers, setSubmittedAnswers] = useState<
    Record<number, number>
  >({});
  const timerRef = useRef(45 * 60 + 12);
  const fullscreenRef = useRef<HTMLDivElement>(null);
  const [modules, setModules] = useState<SidebarModule[]>(
    lessonData?.modules ?? []
  );

  const toggleModule = useCallback((id: string) => {
    setModules((prev) =>
      prev.map((m) => (m.id === id ? { ...m, expanded: !m.expanded } : m))
    );
  }, []);

  const handleFullscreen = useCallback(() => {
    const el = fullscreenRef.current;
    if (!el) return;
    if (!document.fullscreenElement) {
      el.requestFullscreen?.().then(() => setIsFullscreen(true));
    } else {
      document.exitFullscreen?.().then(() => setIsFullscreen(false));
    }
  }, []);

  useEffect(() => {
    const onFullscreenChange = () =>
      setIsFullscreen(!!document.fullscreenElement);
    document.addEventListener("fullscreenchange", onFullscreenChange);
    return () =>
      document.removeEventListener("fullscreenchange", onFullscreenChange);
  }, []);

  // Timer countdown; auto-submit when time runs out
  useEffect(() => {
    if (submitted || !quiz) return;
    const interval = setInterval(() => {
      setTimerSeconds((s) => {
        const next = s <= 0 ? 0 : s - 1;
        timerRef.current = next;
        return next;
      });
    }, 1000);
    return () => clearInterval(interval);
  }, [submitted, quiz]);

  useEffect(() => {
    timerRef.current = timerSeconds;
  }, [timerSeconds]);

  useEffect(() => {
    if (submitted || !quiz || timerSeconds > 0) return;
    let correct = 0;
    quiz.questions.forEach((q, i) => {
      if (answers[i] === q.correctIndex) correct++;
    });
    const initialTimer = 45 * 60 + 12;
    setSubmittedAnswers(answers);
    setScore({
      correct,
      total: quiz.questions.length,
      timeTakenSeconds: Math.max(0, initialTimer - timerRef.current),
      submittedAt: Date.now(),
    });
    setSubmitted(true);
  }, [timerSeconds, submitted, quiz, answers]);

  // Keyboard: Arrow Left / Right for Previous / Next
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (submitted || showSubmitConfirm) return;
      if (e.key === "ArrowLeft") {
        setCurrentIndex((i) => Math.max(0, i - 1));
      } else if (e.key === "ArrowRight") {
        if (quiz)
          setCurrentIndex((i) => Math.min(quiz.questions.length - 1, i + 1));
      }
    };
    window.addEventListener("keydown", handleKeyDown);
    return () => window.removeEventListener("keydown", handleKeyDown);
  }, [submitted, showSubmitConfirm, quiz]);

  if (!quiz) {
    return (
      <div className="slp-page">
        <p style={{ padding: 24 }}>Quiz not found.</p>
        <Link href={ROUTES.STUDENT.COURSES}>Back to My Courses</Link>
      </div>
    );
  }

  const total = quiz.totalQuestions;
  const current = quiz.questions[currentIndex];
  const progressPct =
    total > 0 ? Math.round(((currentIndex + 1) / total) * 100) : 0;
  const isFlagged = flagged.has(currentIndex);

  const handleSelectOption = (optionIndex: number) => {
    setAnswers((prev) => ({ ...prev, [currentIndex]: optionIndex }));
  };

  const toggleFlag = () => {
    setFlagged((prev) => {
      const next = new Set(prev);
      if (next.has(currentIndex)) next.delete(currentIndex);
      else next.add(currentIndex);
      return next;
    });
  };

  const goToQuestion = (index: number) => {
    setCurrentIndex(index);
  };

  const unansweredCount = total - Object.keys(answers).length;
  const handleSubmitClick = () => setShowSubmitConfirm(true);
  const initialTimer = 45 * 60 + 12;
  const handleSubmitConfirm = () => {
    let correct = 0;
    quiz.questions.forEach((q, i) => {
      if (answers[i] === q.correctIndex) correct++;
    });
    setSubmittedAnswers(answers);
    setScore({
      correct,
      total,
      timeTakenSeconds: Math.max(0, initialTimer - timerRef.current),
      submittedAt: Date.now(),
    });
    setSubmitted(true);
    setShowSubmitConfirm(false);
  };
  const handleSubmitCancel = () => setShowSubmitConfirm(false);

  // Quiz Feedback view after submit
  if (submitted && score !== null && quiz) {
    const pct = Math.round((score.correct / score.total) * 100);
    const passed = quiz.passingPct != null ? pct >= quiz.passingPct : pct >= 70;
    const pointsEarned = Math.round((score.correct / score.total) * 20);
    const pointsMax = 20;
    const incorrectCount = score.total - score.correct;
    const correctIndices = quiz.questions
      .map((q, i) => (submittedAnswers[i] === q.correctIndex ? i : -1))
      .filter((i) => i >= 0);
    const incorrectIndices = quiz.questions
      .map((q, i) => (submittedAnswers[i] !== q.correctIndex ? i : -1))
      .filter((i) => i >= 0);

    return (
      <QuizFeedbackView
        quiz={quiz}
        courseId={courseId}
        lessonData={lessonData}
        modules={modules}
        toggleModule={toggleModule}
        score={score}
        submittedAnswers={submittedAnswers}
        timeTakenSeconds={score.timeTakenSeconds}
        submittedAt={score.submittedAt}
        pointsEarned={pointsEarned}
        pointsMax={pointsMax}
        pct={pct}
        passed={passed}
        correctIndices={correctIndices}
        incorrectIndices={incorrectIndices}
        quizId={quizId}
      />
    );
  }

  return (
    <div className="slp-page">
      {/* Lesson-style top bar */}
      <header className="slp-topbar">
        <Link href={ROUTES.STUDENT.COURSES} className="slp-logo">
          <div className="slp-logo-icon">
            <GraduationCap className="w-5 h-5" strokeWidth={2} />
          </div>
          <span className="slp-logo-text">IMETS Academy</span>
        </Link>
        <nav className="slp-nav">
          <Link href={ROUTES.STUDENT.COURSES}>My Courses</Link>
          <Link href={ROUTES.STUDENT.DASHBOARD}>Dashboard</Link>
          <Link href={ROUTES.STUDENT.COURSES}>Resources</Link>
        </nav>
        <div className="slp-topbar-right">
          <div className="slp-search-wrap">
            <Search className="w-4 h-4 slp-search-icon" strokeWidth={2} />
            <input
              type="search"
              placeholder="Search lessons..."
              aria-label="Search lessons"
            />
          </div>
          <button
            type="button"
            className="slp-icon-btn"
            aria-label="Notifications"
          >
            <Bell className="w-5 h-5" strokeWidth={2} />
          </button>
          <button type="button" className="slp-profile">
            <div className="slp-avatar" aria-hidden />
            <ChevronDown className="w-4 h-4" strokeWidth={2} />
          </button>
        </div>
      </header>

      {/* Breadcrumb */}
      <nav className="slp-breadcrumb" aria-label="Breadcrumb">
        <Link href={ROUTES.STUDENT.DASHBOARD}>Home</Link>
        <span className="mx-2">/</span>
        <Link href={ROUTES.STUDENT.COURSES}>My Courses</Link>
        <span className="mx-2">/</span>
        <Link href={ROUTES.STUDENT.COURSE_LESSON(courseId, "2-1")}>
          {lessonData?.courseTitle ?? "Course"}
        </Link>
        <span className="mx-2">/</span>
        <span>{quiz.title}</span>
      </nav>

      <div className="slp-main">
        {/* Course Content sidebar (same as lesson view) */}
        <aside className="slp-sidebar">
          <div className="slp-sidebar-header">
            <h2 className="slp-sidebar-title">Course Content</h2>
            {lessonData && (
              <>
                <div className="slp-progress-bar">
                  <div
                    className="slp-progress-fill"
                    style={{ width: `${lessonData.progressPct}%` }}
                  />
                </div>
                <p className="slp-progress-text">
                  {lessonData.progressPct}% Completed ·{" "}
                  {lessonData.lessonsCompleted}/{lessonData.lessonsTotal}{" "}
                  Lessons
                </p>
              </>
            )}
          </div>
          <div className="slp-module-list">
            {modules.map((mod) => (
              <div
                key={mod.id}
                className={`slp-module ${mod.expanded ? "open" : ""}`}
              >
                <button
                  type="button"
                  className="slp-module-header"
                  onClick={() => toggleModule(mod.id)}
                >
                  {mod.title}
                  <ChevronRightIcon
                    className="w-4 h-4 slp-module-chevron"
                    strokeWidth={2}
                  />
                </button>
                {mod.expanded &&
                  mod.lessons.map((lesson) => (
                    <Link
                      key={lesson.id}
                      href={ROUTES.STUDENT.COURSE_LESSON(courseId, lesson.slug)}
                      className={`slp-lesson ${false ? "active" : ""}`}
                    >
                      {lesson.status === "completed" && (
                        <Check
                          className="w-4 h-4 slp-lesson-icon"
                          strokeWidth={2}
                        />
                      )}
                      {lesson.status === "in_progress" && (
                        <Play
                          className="w-4 h-4 slp-lesson-icon play"
                          strokeWidth={2}
                          fill="currentColor"
                        />
                      )}
                      {lesson.status === "locked" && (
                        <Lock
                          className="w-4 h-4 slp-lesson-icon locked"
                          strokeWidth={2}
                        />
                      )}
                      <div className="slp-lesson-info">
                        <p className="slp-lesson-title">{lesson.title}</p>
                        <p className="slp-lesson-meta">
                          {lesson.status === "completed" && "Completed"}
                          {lesson.status === "in_progress" && "In Progress"}
                        </p>
                      </div>
                      <span className="slp-lesson-duration">
                        {lesson.duration}
                      </span>
                    </Link>
                  ))}
              </div>
            ))}
            <div className="slp-sidebar-quiz-section">
              <span className="slp-sidebar-quiz slp-sidebar-quiz-active">
                <ClipboardList
                  className="w-4 h-4 slp-sidebar-quiz-icon"
                  strokeWidth={2}
                />
                <div className="slp-lesson-info">
                  <p className="slp-lesson-title">Mid-Term: Advanced Physics</p>
                  <p className="slp-lesson-meta">10 Questions · 60 mins</p>
                </div>
                <ChevronRightIcon
                  className="w-4 h-4 slp-sidebar-quiz-arrow"
                  strokeWidth={2}
                />
              </span>
            </div>
          </div>
          <Link
            href={ROUTES.STUDENT.COURSE_ROADMAP(courseId)}
            className="slp-course-overview"
          >
            <ArrowLeft className="w-4 h-4" strokeWidth={2} />
            Course Overview
          </Link>
        </aside>

        {/* Quiz content (embedded in lesson view; can go fullscreen) */}
        <div className="slp-content slp-content-quiz">
          <div ref={fullscreenRef} className="sqa-fullscreen-wrap">
            <div className="sqa-embed-header">
              <div className="sqa-embed-header-left">
                <span className="sqa-quiz-title">{quiz.title}</span>
              </div>
              <div className="sqa-timer">{formatTime(timerSeconds)}</div>
              <div className="sqa-embed-header-right">
                <button
                  type="button"
                  className="sqa-icon-btn"
                  aria-label="Settings"
                >
                  <Settings className="w-5 h-5" strokeWidth={2} />
                </button>
                <button
                  type="button"
                  className="sqa-icon-btn"
                  aria-label={isFullscreen ? "Exit fullscreen" : "Fullscreen"}
                  onClick={handleFullscreen}
                >
                  {isFullscreen ? (
                    <Minimize className="w-5 h-5" strokeWidth={2} />
                  ) : (
                    <Maximize className="w-5 h-5" strokeWidth={2} />
                  )}
                </button>
                <Link
                  href={ROUTES.STUDENT.COURSE_LESSON(courseId, "2-1")}
                  className="sqa-finish-btn"
                >
                  Finish Attempt
                </Link>
              </div>
            </div>

            <div className="sqa-progress-wrap">
              <div className="sqa-progress-top">
                <span>
                  Question {currentIndex + 1} of {total}
                </span>
                <span>{progressPct}% Completed</span>
              </div>
              <div className="sqa-progress-bar">
                <div
                  className="sqa-progress-fill"
                  style={{ width: `${progressPct}%` }}
                />
              </div>
            </div>

            <div className="sqa-main">
              <div className="sqa-question-col">
                <div className="sqa-question-meta">
                  <span className="sqa-type-pill">MULTIPLE CHOICE</span>
                  <button
                    type="button"
                    className={`sqa-flag-btn ${isFlagged ? "flagged" : ""}`}
                    onClick={toggleFlag}
                  >
                    <Flag
                      className="w-4 h-4"
                      strokeWidth={2}
                      fill={isFlagged ? "currentColor" : "none"}
                    />
                    Flag Question
                  </button>
                </div>
                <h2 className="sqa-question-text">
                  Question {currentIndex + 1}: {current.question}
                </h2>
                <div className="sqa-options">
                  {current.options.map((option, optionIndex) => (
                    <button
                      key={optionIndex}
                      type="button"
                      className={`sqa-option ${
                        answers[currentIndex] === optionIndex ? "selected" : ""
                      }`}
                      onClick={() => handleSelectOption(optionIndex)}
                    >
                      <span className="sqa-option-radio" />
                      <span>{option}</span>
                    </button>
                  ))}
                </div>
              </div>

              <aside className="sqa-sidebar">
                <div className="sqa-grid-card">
                  <h3 className="sqa-grid-title">QUESTION GRID</h3>
                  <div className="sqa-question-grid">
                    {quiz.questions.map((_, index) => (
                      <button
                        key={index}
                        type="button"
                        className={`sqa-grid-btn ${
                          answers[index] !== undefined ? "answered" : ""
                        } ${flagged.has(index) ? "flagged" : ""} ${
                          index === currentIndex ? "current" : ""
                        }`}
                        onClick={() => goToQuestion(index)}
                      >
                        {index + 1}
                      </button>
                    ))}
                  </div>
                  <div className="sqa-legend">
                    <span className="sqa-legend-item">
                      <span className="sqa-legend-dot answered" /> Answered
                    </span>
                    <span className="sqa-legend-item">
                      <span className="sqa-legend-dot flagged" /> Flagged for
                      Review
                    </span>
                    <span className="sqa-legend-item">
                      <span className="sqa-legend-dot unattempted" />{" "}
                      Unattempted
                    </span>
                    <span className="sqa-legend-item">
                      <span className="sqa-legend-dot current" /> Current
                      Question
                    </span>
                  </div>
                </div>
                <div className="sqa-help-card">
                  <h3 className="sqa-help-title">Need Help?</h3>
                  <p className="sqa-help-text">
                    If you encounter technical issues, please notify the
                    invigilator immediately.
                  </p>
                  <button type="button" className="sqa-contact-btn">
                    Contact Support
                  </button>
                </div>
              </aside>
            </div>

            {/* Submit confirmation modal */}
            {showSubmitConfirm && (
              <div className="sqa-modal-overlay" onClick={handleSubmitCancel}>
                <div className="sqa-modal" onClick={(e) => e.stopPropagation()}>
                  <h3 className="sqa-modal-title">Submit Quiz?</h3>
                  <p className="sqa-modal-text">
                    {unansweredCount > 0
                      ? `You have ${unansweredCount} unanswered question${
                          unansweredCount === 1 ? "" : "s"
                        }. Submit anyway?`
                      : "Are you sure you want to submit your answers?"}
                  </p>
                  <div className="sqa-modal-actions">
                    <button
                      type="button"
                      className="sqa-bottom-btn prev"
                      onClick={handleSubmitCancel}
                    >
                      Cancel
                    </button>
                    <button
                      type="button"
                      className="sqa-bottom-btn submit"
                      onClick={handleSubmitConfirm}
                    >
                      Submit Quiz
                    </button>
                  </div>
                </div>
              </div>
            )}

            <div className="sqa-bottom-bar">
              <button
                type="button"
                className="sqa-bottom-btn prev"
                onClick={() => setCurrentIndex((i) => Math.max(0, i - 1))}
                disabled={currentIndex === 0}
                aria-label="Previous question"
              >
                <ChevronLeft className="w-4 h-4" strokeWidth={2} />
                Previous Question
              </button>
              <button
                type="button"
                className={`sqa-bottom-btn flag ${isFlagged ? "flagged" : ""}`}
                onClick={toggleFlag}
                aria-label={isFlagged ? "Unflag question" : "Flag for review"}
              >
                <Flag
                  className="w-4 h-4"
                  strokeWidth={2}
                  fill={isFlagged ? "currentColor" : "none"}
                />
                Flag
              </button>
              <button
                type="button"
                className="sqa-bottom-btn next"
                onClick={() =>
                  setCurrentIndex((i) =>
                    Math.min(quiz.questions.length - 1, i + 1)
                  )
                }
                disabled={currentIndex === quiz.questions.length - 1}
                aria-label="Next question"
              >
                Next Question
                <ChevronRight className="w-4 h-4" strokeWidth={2} />
              </button>
              <button
                type="button"
                className="sqa-bottom-btn submit"
                onClick={handleSubmitClick}
              >
                Submit Quiz
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
