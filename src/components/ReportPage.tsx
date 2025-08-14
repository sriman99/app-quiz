import React from 'react';
import type { QuizQuestion, QuizReport } from '../types/quiz';

interface ReportPageProps {
  questions: QuizQuestion[];
  userEmail: string;
  onRestart: () => void;
}

export const ReportPage: React.FC<ReportPageProps> = ({ questions, userEmail, onRestart }) => {
  const generateReport = (): QuizReport[] => {
    return questions.map(question => ({
      question: question.question,
      userAnswer: question.userAnswer || 'Not answered',
      correctAnswer: question.correct_answer,
      isCorrect: question.userAnswer === question.correct_answer,
    }));
  };

  const report = generateReport();
  const correctAnswers = report.filter(r => r.isCorrect).length;
  const totalQuestions = report.length;
  const percentage = Math.round((correctAnswers / totalQuestions) * 100);

  const getScoreColor = (score: number): string => {
    if (score >= 80) return 'text-green-600';
    if (score >= 60) return 'text-yellow-600';
    return 'text-red-600';
  };

  const getScoreMessage = (score: number): string => {
    if (score >= 80) return 'Excellent! Great job!';
    if (score >= 60) return 'Good work! Keep practicing.';
    return 'Keep studying and try again!';
  };

  return (
    <div className="min-h-screen bg-gray-50 p-4">
      <div className="max-w-4xl mx-auto">
        {/* Header */}
        <div className="text-center mb-8">
          <h1 className="text-3xl font-bold text-gray-800 mb-2">Quiz Results</h1>
          <p className="text-gray-600">Here's how you performed</p>
        </div>

        {/* Score Summary */}
        <div className="bg-white rounded-lg shadow-md p-6 mb-8">
          <div className="text-center">
            <div className="text-6xl font-bold mb-4">
              <span className={getScoreColor(percentage)}>{percentage}%</span>
            </div>
            <p className="text-xl text-gray-700 mb-2">
              {correctAnswers} out of {totalQuestions} correct
            </p>
            <p className={`text-lg font-medium ${getScoreColor(percentage)}`}>
              {getScoreMessage(percentage)}
            </p>
            <p className="text-sm text-gray-500 mt-2">Email: {userEmail}</p>
          </div>
        </div>

        {/* Detailed Report */}
        <div className="bg-white rounded-lg shadow-md p-6 mb-8">
          <h2 className="text-2xl font-semibold text-gray-800 mb-6">Question Details</h2>
          
          <div className="space-y-6">
            {report.map((item, index) => (
              <div key={index} className="border-b border-gray-200 pb-6 last:border-b-0">
                <div className="mb-4">
                  <h3 className="text-lg font-medium text-gray-800 mb-2">
                    Question {index + 1}
                  </h3>
                  <p className="text-gray-700">{item.question}</p>
                </div>
                
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div className={`p-4 rounded-lg border-2 ${
                    item.isCorrect 
                      ? 'border-green-200 bg-green-50' 
                      : 'border-red-200 bg-red-50'
                  }`}>
                    <h4 className="font-medium text-gray-800 mb-2">Your Answer:</h4>
                    <p className={item.isCorrect ? 'text-green-700' : 'text-red-700'}>
                      {item.userAnswer}
                    </p>
                  </div>
                  
                  <div className="p-4 rounded-lg border-2 border-gray-200 bg-gray-50">
                    <h4 className="font-medium text-gray-800 mb-2">Correct Answer:</h4>
                    <p className="text-gray-700">{item.correctAnswer}</p>
                  </div>
                </div>
                
                <div className="mt-3">
                  {item.isCorrect ? (
                    <span className="inline-flex items-center px-3 py-1 rounded-full text-sm font-medium bg-green-100 text-green-800">
                      ✓ Correct
                    </span>
                  ) : (
                    <span className="inline-flex items-center px-3 py-1 rounded-full text-sm font-medium bg-red-100 text-red-800">
                      ✗ Incorrect
                    </span>
                  )}
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Action Button */}
        <div className="text-center">
          <button
            onClick={onRestart}
            className="bg-blue-500 text-white py-3 px-8 rounded-lg font-medium hover:bg-blue-600 focus:ring-2 focus:ring-blue-500 focus:ring-offset-2 transition-all duration-200"
          >
            Take Quiz Again
          </button>
        </div>
      </div>
    </div>
  );
}; 