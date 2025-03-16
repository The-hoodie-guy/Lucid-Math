import React, { createContext, useContext, useState, useEffect } from "react";
import { generateQuizQuestions } from "../utils/quizGenerator";

export interface Question {
  multiplicand: number;
  correctAnswer: number;
  options: number[];
  correctIndex: number;
}

export interface UserAnswer {
  question: string;
  userAnswer: number;
  correctAnswer: number;
  isCorrect: boolean;
}

interface MultiplicationContextType {
  selectedTable: number;
  setSelectedTable: (table: number) => void;
  quizQuestions: Question[];
  userAnswers: UserAnswer[];
  setUserAnswers: (answers: UserAnswer[]) => void;
  currentQuestionIndex: number;
  setCurrentQuestionIndex: (index: number) => void;
  score: {
    correct: number;
    incorrect: number;
    total: number;
  };
  resetQuiz: () => void;
  saveQuizResult: () => Promise<void>;
}

const MultiplicationContext = createContext<MultiplicationContextType | undefined>(undefined);

export const MultiplicationProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [selectedTable, setSelectedTable] = useState<number>(1);
  const [quizQuestions, setQuizQuestions] = useState<Question[]>([]);
  const [userAnswers, setUserAnswers] = useState<UserAnswer[]>([]);
  const [currentQuestionIndex, setCurrentQuestionIndex] = useState<number>(0);
  const [score, setScore] = useState({
    correct: 0,
    incorrect: 0,
    total: 10,
  });

  // Generate new quiz questions when selected table changes
  useEffect(() => {
    const questions = generateQuizQuestions(selectedTable, 10);
    setQuizQuestions(questions);
  }, [selectedTable]);

  // Update score when user answers change
  useEffect(() => {
    const correct = userAnswers.filter(answer => answer.isCorrect).length;
    const incorrect = userAnswers.filter(answer => !answer.isCorrect).length;
    
    setScore({
      correct,
      incorrect,
      total: 10,
    });
  }, [userAnswers]);

  const resetQuiz = () => {
    setUserAnswers([]);
    setCurrentQuestionIndex(0);
    const questions = generateQuizQuestions(selectedTable, 10);
    setQuizQuestions(questions);
  };

  const saveQuizResult = async () => {
    try {
      // In a real application, you'd save the user ID if they're logged in
      const userId = 1; // Default user ID for demo
      
      await fetch('/api/quiz-results', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          userId,
          tableNumber: selectedTable,
          correctAnswers: score.correct,
          totalQuestions: score.total,
        }),
      });
    } catch (error) {
      console.error('Failed to save quiz result:', error);
    }
  };

  return (
    <MultiplicationContext.Provider
      value={{
        selectedTable,
        setSelectedTable,
        quizQuestions,
        userAnswers,
        setUserAnswers,
        currentQuestionIndex,
        setCurrentQuestionIndex,
        score,
        resetQuiz,
        saveQuizResult,
      }}
    >
      {children}
    </MultiplicationContext.Provider>
  );
};

export const useMultiplication = (): MultiplicationContextType => {
  const context = useContext(MultiplicationContext);
  if (context === undefined) {
    throw new Error('useMultiplication must be used within a MultiplicationProvider');
  }
  return context;
};
