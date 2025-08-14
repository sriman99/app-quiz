import { useState, useEffect, useCallback } from 'react';
import type { Question, QuizQuestion, QuizState } from '../types/quiz';

const QUIZ_DURATION = 30 * 60; // 30 minutes in seconds

// Fallback questions when API is unavailable
const FALLBACK_QUESTIONS: Question[] = [
  {
    category: "Programming",
    type: "multiple",
    difficulty: "medium",
    question: "What is the primary purpose of version control systems like Git?",
    correct_answer: "To track changes in source code and enable collaboration",
    incorrect_answers: [
      "To compile code faster",
      "To debug applications",
      "To deploy applications automatically"
    ]
  },
  {
    category: "Programming",
    type: "multiple",
    difficulty: "easy",
    question: "Which of the following is NOT a JavaScript framework?",
    correct_answer: "Django",
    incorrect_answers: [
      "React",
      "Vue.js",
      "Angular"
    ]
  },
  {
    category: "Programming",
    type: "multiple",
    difficulty: "medium",
    question: "What does API stand for?",
    correct_answer: "Application Programming Interface",
    incorrect_answers: [
      "Application Program Integration",
      "Advanced Programming Interface",
      "Automated Program Interface"
    ]
  },
  {
    category: "Programming",
    type: "multiple",
    difficulty: "hard",
    question: "What is the time complexity of binary search?",
    correct_answer: "O(log n)",
    incorrect_answers: [
      "O(n)",
      "O(n²)",
      "O(1)"
    ]
  },
  {
    category: "Programming",
    type: "multiple",
    difficulty: "medium",
    question: "Which HTTP method is used to create a new resource?",
    correct_answer: "POST",
    incorrect_answers: [
      "GET",
      "PUT",
      "DELETE"
    ]
  },
  {
    category: "Programming",
    type: "multiple",
    difficulty: "easy",
    question: "What is the main purpose of CSS?",
    correct_answer: "To style and layout web pages",
    incorrect_answers: [
      "To add interactivity to web pages",
      "To store data on the server",
      "To handle database operations"
    ]
  },
  {
    category: "Programming",
    type: "multiple",
    difficulty: "medium",
    question: "What is a closure in JavaScript?",
    correct_answer: "A function that has access to variables in its outer scope",
    incorrect_answers: [
      "A way to close browser windows",
      "A method to end loops",
      "A type of JavaScript object"
    ]
  },
  {
    category: "Programming",
    type: "multiple",
    difficulty: "hard",
    question: "What is the difference between '==' and '===' in JavaScript?",
    correct_answer: "'==' performs type coercion, '===' does not",
    incorrect_answers: [
      "'===' is faster than '=='",
      "'==' is deprecated in modern JavaScript",
      "There is no difference between them"
    ]
  },
  {
    category: "Programming",
    type: "multiple",
    difficulty: "medium",
    question: "What is the purpose of the 'useState' hook in React?",
    correct_answer: "To add state to functional components",
    incorrect_answers: [
      "To create new components",
      "To handle API calls",
      "To style components"
    ]
  },
  {
    category: "Programming",
    type: "multiple",
    difficulty: "easy",
    question: "Which of the following is a valid HTML5 tag?",
    correct_answer: "<section>",
    incorrect_answers: [
      "<divider>",
      "<spacer>",
      "<blink>"
    ]
  },
  {
    category: "Programming",
    type: "multiple",
    difficulty: "medium",
    question: "What is the purpose of a database index?",
    correct_answer: "To speed up data retrieval operations",
    incorrect_answers: [
      "To store more data",
      "To encrypt data",
      "To backup data"
    ]
  },
  {
    category: "Programming",
    type: "multiple",
    difficulty: "hard",
    question: "What is the difference between synchronous and asynchronous programming?",
    correct_answer: "Synchronous executes code sequentially, asynchronous allows non-blocking operations",
    incorrect_answers: [
      "Synchronous is faster than asynchronous",
      "Asynchronous is only used for databases",
      "There is no practical difference"
    ]
  },
  {
    category: "Programming",
    type: "multiple",
    difficulty: "medium",
    question: "What is the purpose of the 'git merge' command?",
    correct_answer: "To combine changes from different branches",
    incorrect_answers: [
      "To create a new branch",
      "To delete a branch",
      "To view commit history"
    ]
  },
  {
    category: "Programming",
    type: "multiple",
    difficulty: "easy",
    question: "What is the main advantage of using TypeScript over JavaScript?",
    correct_answer: "Static type checking and better tooling",
    incorrect_answers: [
      "Faster execution speed",
      "Smaller file sizes",
      "Better browser compatibility"
    ]
  },
  {
    category: "Programming",
    type: "multiple",
    difficulty: "medium",
    question: "What is the purpose of environment variables?",
    correct_answer: "To store configuration settings outside of code",
    incorrect_answers: [
      "To store user passwords",
      "To define CSS styles",
      "To create database tables"
    ]
  }
];

export const useQuiz = () => {
  const [quizState, setQuizState] = useState<QuizState>({
    questions: [],
    currentQuestionIndex: 0,
    timeRemaining: QUIZ_DURATION,
    isQuizStarted: false,
    isQuizCompleted: false,
    userEmail: '',
    userAnswers: [],
  });

  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [usingFallback, setUsingFallback] = useState(false);

  // Helper function to decode HTML entities
  const decodeHtmlEntities = (text: string): string => {
    if (!text) return text;
    
    // Simple HTML entities mapping - using only safe characters
    const htmlEntities: { [key: string]: string } = {
      '&quot;': '"',
      '&amp;': '&',
      '&lt;': '<',
      '&gt;': '>',
      '&apos;': "'",
      '&nbsp;': ' ',
      '&hellip;': '...',
      '&mdash;': '-',
      '&ndash;': '-'
    };
    
    // Replace HTML entities
    let decodedText = text;
    Object.entries(htmlEntities).forEach(([entity, replacement]) => {
      decodedText = decodedText.replace(new RegExp(entity, 'g'), replacement);
    });
    
    // Fallback to DOM method for any remaining entities
    try {
      const textarea = document.createElement('textarea');
      textarea.innerHTML = decodedText;
      return textarea.value;
    } catch {
      return decodedText;
    }
  };

  // Fetch questions from OpenTDB API with fallback
  const fetchQuestions = useCallback(async () => {
    setIsLoading(true);
    setError(null);
    setUsingFallback(false);
    
    // Try multiple API endpoints and retry logic
    const apiEndpoints = [
      'https://opentdb.com/api.php?amount=15&type=multiple',
      'https://opentdb.com/api.php?amount=15&category=18&type=multiple', // Computer Science
      'https://opentdb.com/api.php?amount=15&category=9&type=multiple',  // General Knowledge
    ];
    
    let lastError = null;
    
    for (let attempt = 0; attempt < 3; attempt++) {
      for (const endpoint of apiEndpoints) {
        try {
          console.log(`Attempting API call to: ${endpoint} (attempt ${attempt + 1})`);
          
          const controller = new AbortController();
          const timeoutId = setTimeout(() => controller.abort(), 10000); // 10 second timeout
          
          const response = await fetch(endpoint, {
            signal: controller.signal,
            headers: {
              'Accept': 'application/json',
              'User-Agent': 'QuizApp/1.0'
            }
          });
          
          clearTimeout(timeoutId);
          
          if (response.status === 429) {
            // Rate limited - wait and try next endpoint
            console.log('Rate limited, trying next endpoint...');
            lastError = new Error('API rate limit exceeded');
            continue;
          }
          
          if (!response.ok) {
            throw new Error(`API error: ${response.status} ${response.statusText}`);
          }
          
          const data = await response.json();
          
          if (data.response_code === 0 && data.results && data.results.length > 0) {
            console.log('Successfully fetched questions from API');
            
            const quizQuestions: QuizQuestion[] = data.results.map((question: Question, index: number) => ({
              ...question,
              id: index + 1,
              question: decodeHtmlEntities(question.question),
              correct_answer: decodeHtmlEntities(question.correct_answer),
              incorrect_answers: question.incorrect_answers.map(answer => decodeHtmlEntities(answer)),
              choices: [...question.incorrect_answers, question.correct_answer]
                .map(answer => decodeHtmlEntities(answer))
                .sort(() => Math.random() - 0.5),
              isVisited: false,
              isAttempted: false,
            }));
            
            setQuizState(prev => ({
              ...prev,
              questions: quizQuestions,
            }));
            
            setIsLoading(false);
            return; // Success - exit function
          } else {
            throw new Error('Invalid API response format');
          }
          
        } catch (err) {
          lastError = err instanceof Error ? err : new Error(String(err));
          console.warn(`API attempt failed for ${endpoint}:`, err);
          
          if (err instanceof Error && err.name === 'AbortError') {
            console.log('Request timeout, trying next endpoint...');
            continue;
          }
          
          // If it's a network error, wait before retrying
          if (attempt < 2) {
            await new Promise(resolve => setTimeout(resolve, 1000 * (attempt + 1))); // Progressive delay
          }
        }
      }
    }
    
    // All API attempts failed, use fallback questions
    console.warn('All API attempts failed, using fallback questions:', lastError);
    
    const fallbackQuizQuestions: QuizQuestion[] = FALLBACK_QUESTIONS.map((question, index) => ({
      ...question,
      id: index + 1,
      question: decodeHtmlEntities(question.question),
      correct_answer: decodeHtmlEntities(question.correct_answer),
      incorrect_answers: question.incorrect_answers.map(answer => decodeHtmlEntities(answer)),
      choices: [...question.incorrect_answers, question.correct_answer]
        .map(answer => decodeHtmlEntities(answer))
        .sort(() => Math.random() - 0.5),
      isVisited: false,
      isAttempted: false,
    }));
    
    setQuizState(prev => ({
      ...prev,
      questions: fallbackQuizQuestions,
    }));
    
    setUsingFallback(true);
    setError('Using fallback questions due to API unavailability. These are curated programming questions.');
    setIsLoading(false);
  }, []);

  // Force fallback questions without API call
  const forceFallbackQuestions = useCallback(() => {
    setIsLoading(true);
    
    // Small delay to show loading state
    setTimeout(() => {
      const fallbackQuizQuestions: QuizQuestion[] = FALLBACK_QUESTIONS.map((question, index) => ({
        ...question,
        id: index + 1,
        choices: [...question.incorrect_answers, question.correct_answer].sort(() => Math.random() - 0.5),
        isVisited: false,
        isAttempted: false,
      }));
      
      setQuizState(prev => ({
        ...prev,
        questions: fallbackQuizQuestions,
      }));
      
      setUsingFallback(true);
      setError(null); // Clear the error since we're now using fallback
      setIsLoading(false);
    }, 500);
  }, []);

  // Start quiz
  const startQuiz = useCallback((email: string) => {
    setQuizState(prev => ({
      ...prev,
      userEmail: email,
      isQuizStarted: true,
      timeRemaining: QUIZ_DURATION,
    }));
  }, []);

  // Navigate to question
  const navigateToQuestion = useCallback((questionIndex: number) => {
    if (questionIndex >= 0 && questionIndex < quizState.questions.length) {
      setQuizState(prev => ({
        ...prev,
        currentQuestionIndex: questionIndex,
        questions: prev.questions.map((q, index) => 
          index === questionIndex ? { ...q, isVisited: true } : q
        ),
      }));
    }
  }, [quizState.questions.length]);

  // Submit answer
  const submitAnswer = useCallback((answer: string) => {
    const currentQuestion = quizState.questions[quizState.currentQuestionIndex];
    if (!currentQuestion) return;

    const isCorrect = answer === currentQuestion.correct_answer;
    
    setQuizState(prev => ({
      ...prev,
      questions: prev.questions.map((q, index) => 
        index === prev.currentQuestionIndex 
          ? { ...q, userAnswer: answer, isAttempted: true }
          : q
      ),
      userAnswers: [
        ...prev.userAnswers.filter(a => a.questionId !== currentQuestion.id),
        {
          questionId: currentQuestion.id,
          answer,
          isCorrect,
        },
      ],
    }));
  }, [quizState.currentQuestionIndex, quizState.questions]);

  // Submit quiz when all questions are completed
  const submitQuiz = useCallback(() => {
    setQuizState(prev => ({
      ...prev,
      isQuizCompleted: true,
    }));
  }, []);

  // Timer effect
  useEffect(() => {
    if (!quizState.isQuizStarted || quizState.isQuizCompleted) return;

    const timer = setInterval(() => {
      setQuizState(prev => {
        if (prev.timeRemaining <= 1) {
          clearInterval(timer);
          return {
            ...prev,
            timeRemaining: 0,
            isQuizCompleted: true,
          };
        }
        return {
          ...prev,
          timeRemaining: prev.timeRemaining - 1,
        };
      });
    }, 1000);

    return () => clearInterval(timer);
  }, [quizState.isQuizStarted, quizState.isQuizCompleted]);

  // Auto-submit when timer reaches zero
  useEffect(() => {
    if (quizState.timeRemaining === 0 && !quizState.isQuizCompleted) {
      setQuizState(prev => ({
        ...prev,
        isQuizCompleted: true,
      }));
    }
  }, [quizState.timeRemaining, quizState.isQuizCompleted]);

  // Mark current question as visited
  useEffect(() => {
    if (quizState.isQuizStarted && quizState.questions.length > 0) {
      setQuizState(prev => ({
        ...prev,
        questions: prev.questions.map((q, index) => 
          index === prev.currentQuestionIndex ? { ...q, isVisited: true } : q
        ),
      }));
    }
  }, [quizState.currentQuestionIndex, quizState.isQuizStarted]);

  return {
    quizState,
    isLoading,
    error,
    usingFallback,
    fetchQuestions,
    forceFallbackQuestions,
    startQuiz,
    navigateToQuestion,
    submitAnswer,
    submitQuiz,
  };
}; 