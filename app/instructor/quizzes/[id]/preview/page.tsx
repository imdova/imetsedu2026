'use client';

import { useState, useEffect } from 'react';
import { useRouter, useParams } from 'next/navigation';
import { mockQuizzes } from '@/lib/quizData';
import { Quiz, Question } from '@/types/quiz';

export default function QuizPreviewPage() {
  const router = useRouter();
  const params = useParams();
  const quizId = params.id as string;

  const [quiz, setQuiz] = useState<Quiz | null>(null);
  const [currentQuestionIndex, setCurrentQuestionIndex] = useState(0);
  const [answers, setAnswers] = useState<Record<string, string>>({});
  const [timeRemaining, setTimeRemaining] = useState(0);
  const [isStarted, setIsStarted] = useState(false);
  const [isCompleted, setIsCompleted] = useState(false);
  const [score, setScore] = useState(0);

  useEffect(() => {
    const foundQuiz = mockQuizzes.find((q) => q.id === quizId);
    if (foundQuiz) {
      setQuiz(foundQuiz);
      setTimeRemaining(foundQuiz.duration * 60); // Convert minutes to seconds
    }
  }, [quizId]);

  useEffect(() => {
    if (isStarted && timeRemaining > 0 && !isCompleted) {
      const timer = setTimeout(() => {
        setTimeRemaining(timeRemaining - 1);
      }, 1000);
      return () => clearTimeout(timer);
    } else if (timeRemaining === 0 && isStarted) {
      handleSubmit();
    }
  }, [timeRemaining, isStarted, isCompleted]);

  const handleStart = () => {
    setIsStarted(true);
  };

  const handleAnswerChange = (questionId: string, answer: string) => {
    setAnswers((prev) => ({
      ...prev,
      [questionId]: answer,
    }));
  };

  const handleNext = () => {
    if (quiz && currentQuestionIndex < quiz.questions.length - 1) {
      setCurrentQuestionIndex(currentQuestionIndex + 1);
    }
  };

  const handlePrevious = () => {
    if (currentQuestionIndex > 0) {
      setCurrentQuestionIndex(currentQuestionIndex - 1);
    }
  };

  const handleSubmit = () => {
    if (!quiz) return;

    let totalPoints = 0;
    let earnedPoints = 0;

    quiz.questions.forEach((question) => {
      totalPoints += question.points;
      const userAnswer = answers[question.id];
      const correctAnswer = Array.isArray(question.correctAnswer)
        ? question.correctAnswer[0]
        : question.correctAnswer;

      if (userAnswer === correctAnswer) {
        earnedPoints += question.points;
      }
    });

    const percentage = (earnedPoints / totalPoints) * 100;
    setScore(percentage);
    setIsCompleted(true);
  };

  const formatTime = (seconds: number) => {
    const mins = Math.floor(seconds / 60);
    const secs = seconds % 60;
    return `${mins}:${secs.toString().padStart(2, '0')}`;
  };

  if (!quiz) {
    return (
      <div className="p-8">
        <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-12 text-center">
          <h2 className="text-2xl font-bold text-gray-900 mb-2">Quiz not found</h2>
          <button
            onClick={() => router.push('/instructor/quizzes')}
            className="bg-blue-600 text-white px-6 py-3 rounded-lg font-semibold hover:bg-blue-700 transition-colors"
          >
            Back to Quizzes
          </button>
        </div>
      </div>
    );
  }

  const currentQuestion = quiz.questions[currentQuestionIndex];

  if (!isStarted) {
    return (
      <div className="p-8">
        <div className="max-w-3xl mx-auto">
          <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-8">
            <h1 className="text-3xl font-bold text-gray-900 mb-4">{quiz.title}</h1>
            <p className="text-gray-600 mb-6">{quiz.description}</p>

            <div className="bg-gray-50 rounded-lg p-6 mb-6">
              <h2 className="text-lg font-semibold text-gray-900 mb-4">Quiz Instructions</h2>
              <ul className="space-y-2 text-gray-700">
                <li>• Duration: {quiz.duration} minutes</li>
                <li>• Total Questions: {quiz.questions.length}</li>
                <li>• Passing Score: {quiz.passingScore}%</li>
                <li>• Max Attempts: {quiz.maxAttempts}</li>
                <li>• You can navigate between questions</li>
                <li>• Timer will start when you begin the quiz</li>
              </ul>
            </div>

            <div className="flex justify-end">
              <button
                onClick={handleStart}
                className="bg-blue-600 text-white px-8 py-3 rounded-lg font-semibold hover:bg-blue-700 transition-colors"
              >
                Start Quiz
              </button>
            </div>
          </div>
        </div>
      </div>
    );
  }

  if (isCompleted) {
    const isPassed = score >= quiz.passingScore;
    return (
      <div className="p-8">
        <div className="max-w-3xl mx-auto">
          <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-8 text-center">
            <div className={`text-6xl mb-4 ${isPassed ? 'text-green-500' : 'text-red-500'}`}>
              {isPassed ? '✓' : '✗'}
            </div>
            <h1 className="text-3xl font-bold text-gray-900 mb-4">
              {isPassed ? 'Congratulations!' : 'Quiz Completed'}
            </h1>
            <div className="bg-gray-50 rounded-lg p-6 mb-6">
              <p className="text-4xl font-bold text-gray-900 mb-2">{score.toFixed(1)}%</p>
              <p className="text-gray-600">
                Passing Score: {quiz.passingScore}% | Your Score: {score.toFixed(1)}%
              </p>
            </div>
            <div className="space-y-4">
              {quiz.questions.map((question, index) => {
                const userAnswer = answers[question.id];
                const correctAnswer = Array.isArray(question.correctAnswer)
                  ? question.correctAnswer[0]
                  : question.correctAnswer;
                const isCorrect = userAnswer === correctAnswer;

                return (
                  <div
                    key={question.id}
                    className={`p-4 rounded-lg border-2 ${
                      isCorrect ? 'bg-green-50 border-green-500' : 'bg-red-50 border-red-500'
                    }`}
                  >
                    <div className="flex items-start justify-between mb-2">
                      <p className="font-semibold text-gray-900">Q{index + 1}: {question.questionText}</p>
                      <span className={`px-2 py-1 rounded text-sm font-semibold ${
                        isCorrect ? 'bg-green-200 text-green-800' : 'bg-red-200 text-red-800'
                      }`}>
                        {isCorrect ? 'Correct' : 'Incorrect'}
                      </span>
                    </div>
                    <p className="text-sm text-gray-700 mb-1">
                      Your Answer: <span className="font-semibold">{userAnswer || 'Not answered'}</span>
                    </p>
                    {!isCorrect && (
                      <p className="text-sm text-gray-700">
                        Correct Answer: <span className="font-semibold">{correctAnswer}</span>
                      </p>
                    )}
                    {question.explanation && (
                      <p className="text-sm text-blue-700 mt-2">{question.explanation}</p>
                    )}
                  </div>
                );
              })}
            </div>
            <div className="mt-6">
              <button
                onClick={() => router.push('/instructor/quizzes')}
                className="bg-blue-600 text-white px-8 py-3 rounded-lg font-semibold hover:bg-blue-700 transition-colors"
              >
                Back to Quizzes
              </button>
            </div>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="p-8">
      <div className="max-w-4xl mx-auto">
        {/* Timer and Progress */}
        <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-4 mb-6">
          <div className="flex justify-between items-center">
            <div>
              <p className="text-sm text-gray-600">Time Remaining</p>
              <p className={`text-2xl font-bold ${timeRemaining < 300 ? 'text-red-600' : 'text-gray-900'}`}>
                {formatTime(timeRemaining)}
              </p>
            </div>
            <div>
              <p className="text-sm text-gray-600">Progress</p>
              <p className="text-2xl font-bold text-gray-900">
                {currentQuestionIndex + 1} / {quiz.questions.length}
              </p>
            </div>
          </div>
        </div>

        {/* Question Card */}
        <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-8 mb-6">
          <div className="mb-6">
            <span className="text-sm font-semibold text-gray-500">Question {currentQuestionIndex + 1} of {quiz.questions.length}</span>
            <span className="ml-4 px-2 py-1 bg-blue-100 text-blue-700 rounded text-xs font-semibold">
              {currentQuestion.points} points
            </span>
          </div>
          <h2 className="text-2xl font-bold text-gray-900 mb-6">{currentQuestion.questionText}</h2>

          <div className="space-y-3">
            {currentQuestion.options?.map((option, index) => (
              <label
                key={index}
                className={`flex items-center p-4 border-2 rounded-lg cursor-pointer transition-colors ${
                  answers[currentQuestion.id] === option
                    ? 'border-blue-500 bg-blue-50'
                    : 'border-gray-200 hover:border-gray-300'
                }`}
              >
                <input
                  type="radio"
                  name={`question-${currentQuestion.id}`}
                  value={option}
                  checked={answers[currentQuestion.id] === option}
                  onChange={(e) => handleAnswerChange(currentQuestion.id, e.target.value)}
                  className="w-5 h-5 text-blue-600"
                />
                <span className="ml-3 text-gray-900">{option}</span>
              </label>
            ))}
          </div>
        </div>

        {/* Navigation */}
        <div className="flex justify-between">
          <button
            onClick={handlePrevious}
            disabled={currentQuestionIndex === 0}
            className={`px-6 py-3 rounded-lg font-semibold transition-colors ${
              currentQuestionIndex === 0
                ? 'bg-gray-100 text-gray-400 cursor-not-allowed'
                : 'bg-gray-200 text-gray-700 hover:bg-gray-300'
            }`}
          >
            Previous
          </button>
          {currentQuestionIndex === quiz.questions.length - 1 ? (
            <button
              onClick={handleSubmit}
              className="bg-green-600 text-white px-6 py-3 rounded-lg font-semibold hover:bg-green-700 transition-colors"
            >
              Submit Quiz
            </button>
          ) : (
            <button
              onClick={handleNext}
              className="bg-blue-600 text-white px-6 py-3 rounded-lg font-semibold hover:bg-blue-700 transition-colors"
            >
              Next
            </button>
          )}
        </div>
      </div>
    </div>
  );
}
