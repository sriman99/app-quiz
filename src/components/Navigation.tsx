import React from 'react';
import type { QuizQuestion } from '../types/quiz';

interface NavigationProps {
  questions: QuizQuestion[];
  currentQuestionIndex: number;
  onQuestionSelect: (index: number) => void;
  onSubmitQuiz?: () => void;
}

export const Navigation: React.FC<NavigationProps> = ({
  questions,
  currentQuestionIndex,
  onQuestionSelect,
  onSubmitQuiz,
}) => {
  const attemptedCount = questions.filter(q => q.isAttempted).length;
  const totalQuestions = questions.length;
  const allQuestionsAttempted = attemptedCount === totalQuestions;

  return (
    <div className="bg-white rounded-lg shadow-md p-6">
      <div className="mb-6">
        <h3 className="text-xl font-semibold text-gray-800 mb-2">Question Overview</h3>
        <div className="flex items-center justify-between text-sm text-gray-600">
          <span>Progress: {attemptedCount}/{totalQuestions}</span>
          <span className="font-medium">
            {Math.round((attemptedCount / totalQuestions) * 100)}%
          </span>
        </div>
        
        {/* Progress Bar */}
        <div className="mt-3 w-full bg-gray-200 rounded-full h-2">
          <div 
            className="bg-blue-500 h-2 rounded-full transition-all duration-300"
            style={{ width: `${(attemptedCount / totalQuestions) * 100}%` }}
          ></div>
        </div>
      </div>
      
      <div className="grid grid-cols-3 sm:grid-cols-4 md:grid-cols-5 gap-2 sm:gap-3 mb-6">
        {questions.map((question, index) => (
          <button
            key={question.id}
            onClick={() => onQuestionSelect(index)}
            className={`relative p-2 sm:p-3 md:p-4 rounded-lg text-xs sm:text-sm font-medium transition-all duration-200 transform hover:scale-105 ${
              index === currentQuestionIndex
                ? 'bg-blue-500 text-white ring-2 ring-blue-300 shadow-lg scale-105'
                : question.isAttempted
                ? 'bg-green-100 text-green-800 border-2 border-green-300 hover:bg-green-200'
                : question.isVisited
                ? 'bg-yellow-100 text-yellow-800 border-2 border-yellow-300 hover:bg-yellow-200'
                : 'bg-gray-100 text-gray-600 border-2 border-gray-300 hover:bg-gray-200'
            }`}
          >
            <span className="block text-sm sm:text-lg font-bold">{question.id}</span>
            {question.isAttempted && (
              <div className="absolute -top-1 -right-1 w-3 h-3 sm:w-4 sm:h-4 bg-green-500 rounded-full flex items-center justify-center">
                <svg className="w-1.5 h-1.5 sm:w-2.5 sm:h-2.5 text-white" fill="currentColor" viewBox="0 0 20 20">
                  <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd" />
                </svg>
              </div>
            )}
            {question.isVisited && !question.isAttempted && (
              <div className="absolute -top-1 -right-1 w-3 h-3 sm:w-4 sm:h-4 bg-yellow-500 rounded-full flex items-center justify-center">
                <svg className="w-1.5 h-1.5 sm:w-2.5 sm:h-2.5 text-white" fill="currentColor" viewBox="0 0 20 20">
                  <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm1-12a1 1 0 10-2 0v4a1 1 0 00.293.707l2.828 2.829a1 1 0 101.415-1.415L11 9.586V6z" clipRule="evenodd" />
                </svg>
              </div>
            )}
          </button>
        ))}
      </div>
      
      {/* Legend */}
      <div className="space-y-2 sm:space-y-3 text-xs sm:text-sm">
        <div className="grid grid-cols-2 gap-2 sm:gap-3">
          <div className="flex items-center space-x-2">
            <div className="w-3 h-3 sm:w-4 sm:h-4 bg-gray-100 border-2 border-gray-300 rounded flex-shrink-0"></div>
            <span className="text-gray-600">Not visited</span>
          </div>
          <div className="flex items-center space-x-2">
            <div className="w-3 h-3 sm:w-4 sm:h-4 bg-yellow-100 border-2 border-yellow-300 rounded flex-shrink-0"></div>
            <span className="text-gray-600">Visited</span>
          </div>
        </div>
        <div className="grid grid-cols-2 gap-2 sm:gap-3">
          <div className="flex items-center space-x-2">
            <div className="w-3 h-3 sm:w-4 sm:h-4 bg-green-100 border-2 border-green-300 rounded flex-shrink-0"></div>
            <span className="text-gray-600">Attempted</span>
          </div>
          <div className="flex items-center space-x-2">
            <div className="w-3 h-3 sm:w-4 sm:h-4 bg-blue-500 rounded flex-shrink-0"></div>
            <span className="text-gray-600">Current</span>
          </div>
        </div>
      </div>

      {/* Submit Button */}
      {allQuestionsAttempted && onSubmitQuiz && (
        <div className="mt-6 pt-4 border-t border-gray-200">
          <button
            onClick={onSubmitQuiz}
            className="w-full bg-green-500 text-white py-3 px-4 rounded-lg font-medium hover:bg-green-600 focus:ring-2 focus:ring-green-500 focus:ring-offset-2 transition-all duration-200 transform hover:scale-105"
          >
            <div className="flex items-center justify-center space-x-2">
              <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
              </svg>
              <span>Submit Quiz & View Results</span>
            </div>
          </button>
          <p className="text-xs text-gray-500 text-center mt-2">
            All questions completed! Click to see your results.
          </p>
        </div>
      )}
    </div>
  );
}; 