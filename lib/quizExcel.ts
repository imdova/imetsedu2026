/**
 * Quiz questions Excel template and import.
 * Uses xlsx (SheetJS) for .xlsx generation and parsing.
 */

import * as XLSX from "xlsx";
import type { Question } from "@/types/quiz";

export const TEMPLATE_HEADERS = [
  "Question Text",
  "Type",
  "Option A",
  "Option B",
  "Option C",
  "Option D",
  "Correct Answer",
  "Points",
  "Explanation",
] as const;

const VALID_TYPES = [
  "multiple-choice",
  "true-false",
  "short-answer",
  "essay",
] as const;

function normalizeType(s: string): Question["questionType"] {
  const v = s?.toString().trim().toLowerCase();
  if (VALID_TYPES.includes(v as Question["questionType"]))
    return v as Question["questionType"];
  if (v === "multiple choice" || v === "mc") return "multiple-choice";
  if (v === "true/false" || v === "true false" || v === "tf")
    return "true-false";
  if (v === "short answer") return "short-answer";
  return "multiple-choice";
}

/** Build and trigger download of the Excel template. */
export function downloadQuizQuestionsTemplate(): void {
  const wsData: (string | number)[][] = [
    [...TEMPLATE_HEADERS],
    [
      "What is React?",
      "multiple-choice",
      "A JavaScript library for building UIs",
      "A database",
      "A CSS framework",
      "A server framework",
      "A JavaScript library for building UIs",
      10,
      "React is a JavaScript library for building user interfaces.",
    ],
    [
      "React uses a virtual DOM.",
      "true-false",
      "",
      "",
      "",
      "",
      "true",
      5,
      "React uses a virtual DOM to optimize rendering.",
    ],
  ];

  const ws = XLSX.utils.aoa_to_sheet(wsData);
  const wb = XLSX.utils.book_new();
  XLSX.utils.book_append_sheet(wb, ws, "Questions");

  const colWidths = [
    { wch: 40 },
    { wch: 18 },
    { wch: 35 },
    { wch: 20 },
    { wch: 20 },
    { wch: 20 },
    { wch: 35 },
    { wch: 8 },
    { wch: 50 },
  ];
  ws["!cols"] = colWidths;

  XLSX.writeFile(wb, "quiz-questions-template.xlsx");
}

/** Parse an Excel file (or CSV) and return an array of partial questions (quizId and order to be set by caller). */
export function parseQuizQuestionsFromFile(
  file: File
): Promise<{
  questions: Omit<Question, "id" | "quizId" | "order">[];
  errors: string[];
}> {
  return new Promise((resolve) => {
    const errors: string[] = [];
    const reader = new FileReader();

    reader.onload = (e) => {
      try {
        const data = e.target?.result;
        if (!data) {
          resolve({ questions: [], errors: ["Could not read file."] });
          return;
        }

        const wb = XLSX.read(data, { type: "binary", cellText: true });
        const firstSheet = wb.SheetNames[0];
        if (!firstSheet) {
          resolve({ questions: [], errors: ["No sheet found in file."] });
          return;
        }

        const ws = wb.Sheets[firstSheet];
        const rows = XLSX.utils.sheet_to_json<string[]>(ws, {
          header: 1,
          defval: "",
        }) as (string | number)[][];

        if (!rows.length) {
          resolve({ questions: [], errors: ["File is empty."] });
          return;
        }

        const headerRow = rows[0].map((c) => String(c ?? "").trim());
        const colIndex = (name: string) => {
          const i = headerRow.findIndex(
            (h) => h.toLowerCase() === name.toLowerCase()
          );
          return i >= 0 ? i : -1;
        };

        const idx = {
          questionText:
            colIndex("Question Text") >= 0 ? colIndex("Question Text") : 0,
          type: colIndex("Type") >= 0 ? colIndex("Type") : 1,
          optionA: colIndex("Option A"),
          optionB: colIndex("Option B"),
          optionC: colIndex("Option C"),
          optionD: colIndex("Option D"),
          correctAnswer:
            colIndex("Correct Answer") >= 0 ? colIndex("Correct Answer") : 6,
          points: colIndex("Points") >= 0 ? colIndex("Points") : 7,
          explanation:
            colIndex("Explanation") >= 0 ? colIndex("Explanation") : 8,
        };

        const questions: Omit<Question, "id" | "quizId" | "order">[] = [];

        for (let i = 1; i < rows.length; i++) {
          const row = rows[i];
          if (!row || row.length === 0) continue;

          const questionText = String(row[idx.questionText] ?? "").trim();
          if (!questionText) continue;

          const type = normalizeType(
            String(row[idx.type] ?? "multiple-choice")
          );
          const correctAnswer = String(row[idx.correctAnswer] ?? "").trim();
          const pointsRaw = row[idx.points];
          const points = Math.max(0, Math.min(100, Number(pointsRaw) || 4));
          const explanation =
            String(row[idx.explanation] ?? "").trim() || undefined;

          let options: string[] | undefined;
          if (type === "multiple-choice") {
            options = [
              idx.optionA >= 0 ? String(row[idx.optionA] ?? "").trim() : "",
              idx.optionB >= 0 ? String(row[idx.optionB] ?? "").trim() : "",
              idx.optionC >= 0 ? String(row[idx.optionC] ?? "").trim() : "",
              idx.optionD >= 0 ? String(row[idx.optionD] ?? "").trim() : "",
            ].filter(Boolean);
          }

          questions.push({
            questionText,
            questionType: type,
            options: options?.length ? options : undefined,
            correctAnswer: correctAnswer || (options?.[0] ?? ""),
            points,
            explanation,
          });
        }

        resolve({ questions, errors });
      } catch (err) {
        resolve({
          questions: [],
          errors: [
            err instanceof Error ? err.message : "Failed to parse file.",
          ],
        });
      }
    };

    reader.onerror = () =>
      resolve({ questions: [], errors: ["Failed to read file."] });
    reader.readAsBinaryString(file);
  });
}
