"use client";

import { useState, useEffect } from "react";
import { useRouter, useParams } from "next/navigation";
import { Pencil, Plus, X } from "lucide-react";
import { mockQuizzes } from "@/lib/quizData";
import { Question } from "@/types/quiz";

export default function QuestionsPage() {
  const router = useRouter();
  const params = useParams();
  const quizId = params.id as string;

  const [questions, setQuestions] = useState<Question[]>([]);
  const [showAddForm, setShowAddForm] = useState(false);
  const [editingQuestion, setEditingQuestion] = useState<Question | null>(null);
  const [formData, setFormData] = useState<Partial<Question>>({
    questionText: "",
    questionType: "multiple-choice",
    options: ["", "", "", ""],
    correctAnswer: "",
    points: 10,
    explanation: "",
  });

  useEffect(() => {
    const quiz = mockQuizzes.find((q) => q.id === quizId);
    if (quiz) {
      setQuestions(quiz.questions);
    }
  }, [quizId]);

  const handleInputChange = (
    e: React.ChangeEvent<
      HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement
    >
  ) => {
    const { name, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: name === "points" ? parseInt(value) || 0 : value,
    }));
  };

  const handleOptionChange = (index: number, value: string) => {
    const newOptions = [...(formData.options || [])];
    newOptions[index] = value;
    setFormData((prev) => ({
      ...prev,
      options: newOptions,
    }));
  };

  const handleAddOption = () => {
    setFormData((prev) => ({
      ...prev,
      options: [...(prev.options || []), ""],
    }));
  };

  const handleRemoveOption = (index: number) => {
    const newOptions = formData.options?.filter((_, i) => i !== index) || [];
    setFormData((prev) => ({
      ...prev,
      options: newOptions,
    }));
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (editingQuestion) {
      setQuestions(
        questions.map((q) =>
          q.id === editingQuestion.id
            ? ({ ...editingQuestion, ...formData } as Question)
            : q
        )
      );
      setEditingQuestion(null);
    } else {
      const newQuestion: Question = {
        id: `q${Date.now()}`,
        quizId,
        questionText: formData.questionText || "",
        questionType: formData.questionType || "multiple-choice",
        options:
          formData.questionType === "multiple-choice"
            ? formData.options
            : undefined,
        correctAnswer: formData.correctAnswer || "",
        points: formData.points || 10,
        explanation: formData.explanation,
        order: questions.length + 1,
      };
      setQuestions([...questions, newQuestion]);
    }
    setShowAddForm(false);
    setFormData({
      questionText: "",
      questionType: "multiple-choice",
      options: ["", "", "", ""],
      correctAnswer: "",
      points: 10,
      explanation: "",
    });
  };

  const handleEdit = (question: Question) => {
    setEditingQuestion(question);
    setFormData({
      questionText: question.questionText,
      questionType: question.questionType,
      options: question.options || ["", "", "", ""],
      correctAnswer: Array.isArray(question.correctAnswer)
        ? question.correctAnswer[0]
        : question.correctAnswer,
      points: question.points,
      explanation: question.explanation,
    });
    setShowAddForm(true);
  };

  const handleDelete = (questionId: string) => {
    if (confirm("Are you sure you want to delete this question?")) {
      setQuestions(questions.filter((q) => q.id !== questionId));
    }
  };

  const handleExcelImport = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;
    alert(
      "Excel import functionality would parse the file and add questions. This requires a library like xlsx or exceljs."
    );
  };

  const quiz = mockQuizzes.find((q) => q.id === quizId);

  if (!quiz) {
    return (
      <div className="p-8">
        <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-12 text-center">
          <h2 className="text-2xl font-bold text-gray-900 mb-2">
            Quiz not found
          </h2>
          <button
            onClick={() => router.push("/instructor/quizzes")}
            className="bg-blue-600 text-white px-6 py-3 rounded-lg font-semibold hover:bg-blue-700 transition-colors"
          >
            Back to Quizzes
          </button>
        </div>
      </div>
    );
  }

  return (
    <div className="p-8">
      <div className="mb-8">
        <div className="flex justify-between items-center mb-4">
          <div>
            <h1 className="text-3xl font-bold text-gray-900 mb-2">
              Manage Questions
            </h1>
            <p className="text-gray-600">
              Add, edit, or import questions for: {quiz.title}
            </p>
          </div>
          <div className="flex space-x-4">
            <label className="bg-green-600 text-white px-6 py-3 rounded-lg font-semibold hover:bg-green-700 transition-colors cursor-pointer">
              📥 Import from Excel
              <input
                type="file"
                accept=".xlsx,.xls,.csv"
                onChange={handleExcelImport}
                className="hidden"
              />
            </label>
            <button
              onClick={() => {
                setShowAddForm(true);
                setEditingQuestion(null);
                setFormData({
                  questionText: "",
                  questionType: "multiple-choice",
                  options: ["", "", "", ""],
                  correctAnswer: "",
                  points: 10,
                  explanation: "",
                });
              }}
              className="bg-blue-600 text-white px-6 py-3 rounded-lg font-semibold hover:bg-blue-700 transition-colors"
            >
              + Add Question Manually
            </button>
          </div>
        </div>

        <div className="bg-blue-50 border border-blue-200 rounded-lg p-4 mt-4">
          <details className="cursor-pointer">
            <summary className="font-semibold text-blue-900">
              📋 Excel Import Format Guide
            </summary>
            <div className="mt-3 text-sm text-blue-800 space-y-2">
              <p>Your Excel file should have the following columns:</p>
              <ul className="list-disc list-inside ml-4 space-y-1">
                <li>
                  <strong>questionText</strong> - The question text (required)
                </li>
                <li>
                  <strong>questionType</strong> - multiple-choice, true-false,
                  short-answer, or essay (required)
                </li>
                <li>
                  <strong>option1, option2, option3, option4</strong> - For
                  multiple-choice questions
                </li>
                <li>
                  <strong>correctAnswer</strong> - The correct answer (required)
                </li>
                <li>
                  <strong>points</strong> - Points for this question (default:
                  10)
                </li>
                <li>
                  <strong>explanation</strong> - Explanation shown after quiz
                  (optional)
                </li>
              </ul>
              <p className="mt-2">
                <strong>Example:</strong>
              </p>
              <div className="bg-white p-2 rounded text-xs font-mono overflow-x-auto">
                <div>
                  questionText | questionType | option1 | option2 | option3 |
                  option4 | correctAnswer | points
                </div>
                <div>
                  What is React? | multiple-choice | A JS library | A database |
                  A CSS framework | A server | A JS library | 10
                </div>
              </div>
            </div>
          </details>
        </div>
      </div>

      {showAddForm && (
        <div className="bg-white rounded-xl shadow-lg border-2 border-gray-200 overflow-hidden mb-6">
          <div className="bg-gradient-to-r from-blue-50 to-indigo-50 p-6 border-b border-gray-200">
            <h2 className="text-2xl font-bold text-gray-900 flex items-center">
              <span className="mr-3">{editingQuestion ? "✏️" : "➕"}</span>
              {editingQuestion ? "Edit Question" : "Add New Question"}
            </h2>
          </div>
          <form onSubmit={handleSubmit} className="p-8 space-y-6">
            <div>
              <label className="block text-sm font-semibold text-gray-700 mb-2">
                Question Text <span className="text-red-500">*</span>
              </label>
              <textarea
                name="questionText"
                value={formData.questionText}
                onChange={handleInputChange}
                rows={3}
                className="w-full px-4 py-3 border-2 border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition-all duration-200 bg-gray-50 hover:bg-white resize-none"
                required
              />
            </div>

            <div>
              <label className="block text-sm font-semibold text-gray-700 mb-2">
                Question Type <span className="text-red-500">*</span>
              </label>
              <select
                name="questionType"
                value={formData.questionType}
                onChange={handleInputChange}
                className="w-full px-4 py-3 border-2 border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition-all duration-200 bg-gray-50 hover:bg-white appearance-none cursor-pointer"
                required
              >
                <option value="multiple-choice">Multiple Choice</option>
                <option value="true-false">True/False</option>
                <option value="short-answer">Short Answer</option>
                <option value="essay">Essay</option>
              </select>
            </div>

            {(formData.questionType === "multiple-choice" ||
              formData.questionType === "true-false") && (
              <div className="bg-gray-50 p-6 rounded-lg border-2 border-gray-200">
                <label className="block text-sm font-semibold text-gray-700 mb-4">
                  Options <span className="text-red-500">*</span>
                </label>
                <div className="space-y-3">
                  {formData.options?.map((option, index) => (
                    <div
                      key={index}
                      className="flex items-center space-x-3 bg-white p-4 rounded-lg border-2 border-gray-200 hover:border-blue-300 transition-all duration-200"
                    >
                      <input
                        type="text"
                        value={option}
                        onChange={(e) =>
                          handleOptionChange(index, e.target.value)
                        }
                        placeholder={`Option ${index + 1}`}
                        className="flex-1 px-4 py-2 border-2 border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition-all duration-200"
                        required
                      />
                      <div className="flex items-center space-x-2">
                        <input
                          type="radio"
                          name="correctAnswer"
                          value={option}
                          checked={formData.correctAnswer === option}
                          onChange={(e) =>
                            setFormData((prev) => ({
                              ...prev,
                              correctAnswer: e.target.value,
                            }))
                          }
                          className="w-5 h-5 text-blue-600 border-gray-300 focus:ring-blue-500 cursor-pointer"
                        />
                        <span className="text-sm font-semibold text-gray-700">
                          Correct
                        </span>
                      </div>
                      {formData.options && formData.options.length > 2 && (
                        <button
                          type="button"
                          onClick={() => handleRemoveOption(index)}
                          className="p-2 text-red-600 hover:bg-red-50 rounded-lg transition-colors"
                          aria-label="Remove option"
                        >
                          <X className="h-4 w-4" strokeWidth={2.5} />
                        </button>
                      )}
                    </div>
                  ))}
                </div>
                {formData.questionType === "multiple-choice" && (
                  <button
                    type="button"
                    onClick={handleAddOption}
                    className="mt-4 px-4 py-2 bg-blue-50 text-blue-600 hover:bg-blue-100 rounded-lg font-semibold transition-colors"
                  >
                    + Add Option
                  </button>
                )}
              </div>
            )}

            {formData.questionType === "short-answer" && (
              <div>
                <label className="block text-sm font-semibold text-gray-700 mb-2">
                  Correct Answer <span className="text-red-500">*</span>
                </label>
                <input
                  type="text"
                  name="correctAnswer"
                  value={formData.correctAnswer}
                  onChange={handleInputChange}
                  className="w-full px-4 py-3 border-2 border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition-all duration-200 bg-gray-50 hover:bg-white"
                  required
                />
              </div>
            )}

            {formData.questionType === "essay" && (
              <div>
                <label className="block text-sm font-semibold text-gray-700 mb-2">
                  Sample Answer (for grading reference)
                </label>
                <textarea
                  name="correctAnswer"
                  value={formData.correctAnswer}
                  onChange={handleInputChange}
                  rows={5}
                  className="w-full px-4 py-3 border-2 border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition-all duration-200 bg-gray-50 hover:bg-white resize-none"
                />
              </div>
            )}

            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div className="bg-gray-50 p-6 rounded-lg border-2 border-gray-200">
                <label className="block text-sm font-semibold text-gray-700 mb-2">
                  Points <span className="text-red-500">*</span>
                </label>
                <input
                  type="number"
                  name="points"
                  value={formData.points}
                  onChange={handleInputChange}
                  min="1"
                  className="w-full px-4 py-3 border-2 border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition-all duration-200 bg-white"
                  required
                />
              </div>
            </div>

            <div>
              <label className="block text-sm font-semibold text-gray-700 mb-2">
                Explanation (shown after quiz)
              </label>
              <textarea
                name="explanation"
                value={formData.explanation}
                onChange={handleInputChange}
                rows={3}
                placeholder="Explain why this is the correct answer..."
                className="w-full px-4 py-3 border-2 border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition-all duration-200 bg-gray-50 hover:bg-white placeholder-gray-400 resize-none"
              />
            </div>

            <div className="flex justify-end space-x-4 pt-6 border-t border-gray-200">
              <button
                type="button"
                onClick={() => {
                  setShowAddForm(false);
                  setEditingQuestion(null);
                }}
                className="px-8 py-3 border-2 border-gray-300 rounded-lg font-semibold text-gray-700 hover:bg-white hover:border-gray-400 transition-all duration-200 shadow-sm hover:shadow-md"
              >
                Cancel
              </button>
              <button
                type="submit"
                className="px-8 py-3 bg-gradient-to-r from-blue-600 to-indigo-600 text-white rounded-lg font-semibold hover:from-blue-700 hover:to-indigo-700 transition-all duration-200 shadow-lg hover:shadow-xl transform hover:-translate-y-0.5"
              >
                {editingQuestion ? "Update Question" : "Add Question"}
              </button>
            </div>
          </form>
        </div>
      )}

      <div className="bg-white rounded-lg shadow-sm border border-gray-200">
        <div className="p-6 border-b border-gray-200">
          <h2 className="text-xl font-bold text-gray-900">
            Questions ({questions.length})
          </h2>
        </div>
        {questions.length === 0 ? (
          <div className="p-12 text-center">
            <p className="text-gray-600 mb-4">No questions added yet.</p>
            <button
              onClick={() => setShowAddForm(true)}
              className="text-blue-600 hover:text-blue-700 font-semibold"
            >
              Add your first question
            </button>
          </div>
        ) : (
          <div className="divide-y divide-gray-200">
            {questions.map((question, index) => {
              return (
                <div key={question.id} className="p-6">
                  <div className="flex justify-between items-start mb-4">
                    <div className="flex-1">
                      <div className="flex items-center space-x-3 mb-2">
                        <span className="text-sm font-semibold text-gray-500">
                          Q{index + 1}
                        </span>
                        <span className="px-2 py-1 bg-gray-100 text-gray-700 rounded text-xs font-semibold">
                          {question.questionType}
                        </span>
                        <span className="px-2 py-1 bg-blue-100 text-blue-700 rounded text-xs font-semibold">
                          {question.points} points
                        </span>
                      </div>
                      <p className="text-lg font-semibold text-gray-900 mb-2">
                        {question.questionText}
                      </p>
                      {question.options && (
                        <ul className="space-y-2 mb-4">
                          {question.options.map((option, optIndex) => {
                            const isCorrect =
                              option === question.correctAnswer ||
                              (Array.isArray(question.correctAnswer) &&
                                question.correctAnswer.includes(option));
                            return (
                              <li
                                key={optIndex}
                                className={`px-4 py-2 rounded ${
                                  isCorrect
                                    ? "bg-green-50 border-2 border-green-500"
                                    : "bg-gray-50 border border-gray-200"
                                }`}
                              >
                                {option}
                                {isCorrect && (
                                  <span className="ml-2 text-green-600 font-semibold">
                                    ✓ Correct
                                  </span>
                                )}
                              </li>
                            );
                          })}
                        </ul>
                      )}
                      {question.explanation && (
                        <div className="mt-4 p-3 bg-blue-50 rounded-lg">
                          <p className="text-sm font-semibold text-blue-900 mb-1">
                            Explanation:
                          </p>
                          <p className="text-sm text-blue-800">
                            {question.explanation}
                          </p>
                        </div>
                      )}
                    </div>
                    <div className="flex space-x-2 ml-4">
                      <button
                        onClick={() => handleEdit(question)}
                        className="px-4 py-2 text-blue-600 hover:bg-blue-50 rounded-lg font-semibold"
                      >
                        Edit
                      </button>
                      <button
                        onClick={() => handleDelete(question.id)}
                        className="px-4 py-2 text-red-600 hover:bg-red-50 rounded-lg font-semibold"
                      >
                        Delete
                      </button>
                    </div>
                  </div>
                </div>
              );
            })}
          </div>
        )}
      </div>
    </div>
  );
}
