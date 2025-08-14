import React from 'react';
import { Timer } from './Timer';
import { Question } from './Question';
import { Navigation } from './Navigation';
import type { QuizQuestion } from '../types/quiz';

interface QuizPageProps {
  questions: QuizQuestion[];
  currentQuestionIndex: number;
  timeRemaining: number;
  onQuestionSelect: (index: number) => void;
  onAnswerSubmit: (answer: string) => void;
  onSubmitQuiz: () => void;
}

export const QuizPage: React.FC<QuizPageProps> = ({
  questions,
  currentQuestionIndex,
  timeRemaining,
  onQuestionSelect,
  onAnswerSubmit,
  onSubmitQuiz,
}) => {
  const currentQuestion = questions[currentQuestionIndex];
  const attemptedCount = questions.filter(q => q.isAttempted).length;
  const totalQuestions = questions.length;

  return (
    <div className="min-h-screen bg-gray-50 p-4">
      <div className="max-w-6xl mx-auto">
        {/* Header */}
        <div className="mb-6">
          <h1 className="text-3xl font-bold text-gray-800 text-center mb-2">Quiz App</h1>
          <p className="text-gray-600 text-center">
            Question {currentQuestionIndex + 1} of {totalQuestions} • 
            {attemptedCount} of {totalQuestions} attempted
          </p>
        </div>

        {/* Timer */}
        <Timer timeRemaining={timeRemaining} />

        <div className="grid grid-cols-1 lg:grid-cols-4 gap-6">
          {/* Main Content */}
          <div className="lg:col-span-3">
            {currentQuestion && (
              <Question
                question={currentQuestion}
                onAnswerSubmit={onAnswerSubmit}
              />
            )}
            
            {/* Manual Submit Button */}
            {attemptedCount === totalQuestions && (
              <div className="mt-6 bg-green-50 border border-green-200 rounded-lg p-6 text-center">
                <h3 className="text-lg font-semibold text-green-800 mb-2">
                  🎉 All Questions Completed!
                </h3>
                <p className="text-green-700 mb-4">
                  You've answered all {totalQuestions} questions. Ready to see your results?
                </p>
                <button
                  onClick={onSubmitQuiz}
                  className="bg-green-500 text-white py-3 px-8 rounded-lg font-medium hover:bg-green-600 focus:ring-2 focus:ring-green-500 focus:ring-offset-2 transition-all duration-200 transform hover:scale-105"
                >
                  <div className="flex items-center justify-center space-x-2">
                    <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
                    </svg>
                    <span>Submit Quiz & View Results</span>
                  </div>
                </button>
              </div>
            )}
          </div>

          {/* Sidebar Navigation */}
          <div className="lg:col-span-1">
            <Navigation
              questions={questions}
              currentQuestionIndex={currentQuestionIndex}
              onQuestionSelect={onQuestionSelect}
              onSubmitQuiz={onSubmitQuiz}
            />
          </div>
        </div>
      </div>
    </div>
  );
}; 