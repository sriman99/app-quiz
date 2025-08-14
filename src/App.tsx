import { useEffect } from 'react';
import { StartPage } from './components/StartPage';
import { QuizPage } from './components/QuizPage';
import { ReportPage } from './components/ReportPage';
import { useQuiz } from './hooks/useQuiz';
import './App.css';

function App() {
  const {
    quizState,
    isLoading,
    error,
    fetchQuestions,
    forceFallbackQuestions,
    startQuiz,
    navigateToQuestion,
    submitAnswer,
    submitQuiz,
    usingFallback,
  } = useQuiz();

  // Fetch questions when component mounts
  useEffect(() => {
    fetchQuestions();
  }, [fetchQuestions]);

  const handleRestart = () => {
    window.location.reload();
  };

  if (error && !usingFallback) {
    return (
      <div className="min-h-screen bg-red-50 flex items-center justify-center p-4">
        <div className="bg-white rounded-lg shadow-md p-8 text-center max-w-md">
          <div className="text-red-500 text-6xl mb-4">⚠️</div>
          <h1 className="text-2xl font-bold text-gray-800 mb-4">Error Loading Quiz</h1>
          <p className="text-gray-600 mb-6">{error}</p>
          
          <div className="mb-6 p-4 bg-blue-50 border border-blue-200 rounded-lg">
            <p className="text-sm text-blue-700">
              The external API is currently unavailable. You can still take the quiz with fallback questions.
            </p>
          </div>
          
          <div className="space-y-3">
            <button
              onClick={handleRestart}
              className="w-full bg-blue-500 text-white py-2 px-6 rounded-lg font-medium hover:bg-blue-600 transition-colors"
            >
              Try Again
            </button>
            
            <button
              onClick={() => {
                // Force using fallback questions without API call
                forceFallbackQuestions();
              }}
              className="w-full bg-yellow-500 text-white py-2 px-6 rounded-lg font-medium hover:bg-yellow-600 transition-colors"
            >
              Use Fallback Questions
            </button>
          </div>
        </div>
      </div>
    );
  }

  if (quizState.isQuizCompleted) {
    return (
      <ReportPage
        questions={quizState.questions}
        userEmail={quizState.userEmail}
        onRestart={handleRestart}
      />
    );
  }

  if (quizState.isQuizStarted) {
    return (
      <QuizPage
        questions={quizState.questions}
        currentQuestionIndex={quizState.currentQuestionIndex}
        timeRemaining={quizState.timeRemaining}
        onQuestionSelect={navigateToQuestion}
        onAnswerSubmit={submitAnswer}
        onSubmitQuiz={submitQuiz}
      />
    );
  }

  return (
    <StartPage
      onStart={startQuiz}
      isLoading={isLoading}
      usingFallback={usingFallback}
      error={error}
      onRetry={fetchQuestions}
    />
  );
}

export default App;
