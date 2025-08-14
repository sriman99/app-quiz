import React from 'react';
import type { QuizQuestion } from '../types/quiz';

interface QuestionProps {
  question: QuizQuestion;
  onAnswerSubmit: (answer: string) => void;
}

export const Question: React.FC<QuestionProps> = ({ question, onAnswerSubmit }) => {
  const handleAnswerClick = (answer: string) => {
    onAnswerSubmit(answer);
  };

  return (
    <div className="bg-white rounded-lg shadow-md p-6">
      <div className="mb-6">
        <div className="flex items-center justify-between mb-4">
          <span className="bg-blue-100 text-blue-800 text-sm font-medium px-3 py-1 rounded-full">
            Question {question.id}
          </span>
          <span className="bg-gray-100 text-gray-700 text-sm font-medium px-3 py-1 rounded-full">
            {question.difficulty}
          </span>
        </div>
        
        <h3 className="text-xl font-semibold text-gray-800 mb-2">
          {question.question}
        </h3>
        
        <p className="text-sm text-gray-600">
          Category: {question.category}
        </p>
      </div>

      <div className="space-y-3">
        {question.choices.map((choice, index) => (
          <button
            key={index}
            onClick={() => handleAnswerClick(choice)}
            disabled={question.userAnswer !== undefined}
            className={`w-full p-4 text-left rounded-lg border-2 transition-all duration-200 ${
              question.userAnswer === choice
                ? 'border-blue-500 bg-blue-50 text-blue-800'
                : question.userAnswer !== undefined
                ? 'border-gray-200 bg-gray-50 text-gray-600 cursor-not-allowed'
                : 'border-gray-200 bg-white text-gray-800 hover:border-blue-300 hover:bg-blue-50 cursor-pointer'
            }`}
          >
            <span className="font-medium">{String.fromCharCode(65 + index)}.</span> {choice}
          </button>
        ))}
      </div>

      {question.userAnswer && (
        <div className="mt-6 p-4 bg-gray-50 rounded-lg">
          <p className="text-sm text-gray-700">
            <span className="font-medium">Your answer:</span> {question.userAnswer}
          </p>
          {question.userAnswer === question.correct_answer ? (
            <p className="text-green-600 text-sm font-medium mt-1">✓ Correct!</p>
          ) : (
            <p className="text-red-600 text-sm font-medium mt-1">
              ✗ Incorrect. Correct answer: {question.correct_answer}
            </p>
          )}
        </div>
      )}
    </div>
  );
}; 