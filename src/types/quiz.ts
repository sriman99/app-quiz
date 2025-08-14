export interface Question {
  category: string;
  type: string;
  difficulty: string;
  question: string;
  correct_answer: string;
  incorrect_answers: string[];
}

export interface QuizQuestion extends Question {
  id: number;
  choices: string[];
  userAnswer?: string;
  isVisited: boolean;
  isAttempted: boolean;
}

export interface UserAnswer {
  questionId: number;
  answer: string;
  isCorrect: boolean;
}

export interface QuizState {
  questions: QuizQuestion[];
  currentQuestionIndex: number;
  timeRemaining: number;
  isQuizStarted: boolean;
  isQuizCompleted: boolean;
  userEmail: string;
  userAnswers: UserAnswer[];
}

export interface QuizReport {
  question: string;
  userAnswer: string;
  correctAnswer: string;
  isCorrect: boolean;
} 