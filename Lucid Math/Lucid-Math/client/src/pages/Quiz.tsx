import React, { useState, useEffect } from 'react';
import { useRoute, useLocation } from 'wouter';
import { Button } from '@/components/ui/button';
import { ArrowLeft, ArrowRight, CheckCircle, XCircle, HelpCircle } from 'lucide-react';
import { useMultiplication, UserAnswer } from '@/context/MultiplicationContext';
import Confetti from '@/components/ui/confetti';

const Quiz: React.FC = () => {
  const [, navigate] = useLocation();
  const [match, params] = useRoute('/quiz/:number');
  
  const {
    selectedTable,
    setSelectedTable,
    quizQuestions,
    userAnswers,
    setUserAnswers,
    currentQuestionIndex,
    setCurrentQuestionIndex,
    score,
  } = useMultiplication();
  
  const [answered, setAnswered] = useState(false);
  const [selectedOption, setSelectedOption] = useState<number | null>(null);
  const [isCorrect, setIsCorrect] = useState(false);
  const [showConfetti, setShowConfetti] = useState(false);
  
  if (!match) {
    navigate('/');
    return null;
  }
  
  const tableNumber = parseInt(params.number);
  
  // Validate table number
  if (isNaN(tableNumber) || tableNumber < 1 || tableNumber > 20) {
    navigate('/');
    return null;
  }
  
  // Set the selected table in context if it doesn't match
  useEffect(() => {
    if (selectedTable !== tableNumber) {
      setSelectedTable(tableNumber);
    }
  }, [tableNumber, selectedTable, setSelectedTable]);
  
  // Get current question
  const currentQuestion = quizQuestions[currentQuestionIndex];
  
  // Calculate progress percentage
  const progressPercentage = ((currentQuestionIndex + 1) / score.total) * 100;
  
  const goToTable = () => navigate(`/table/${tableNumber}`);
  
  const handleOptionSelect = (optionIndex: number) => {
    if (answered) return; // Prevent selecting after answering
    
    const question = quizQuestions[currentQuestionIndex];
    const isCorrect = optionIndex === question.correctIndex;
    
    // Record user's answer
    const newAnswer: UserAnswer = {
      question: `${tableNumber} × ${question.multiplicand}`,
      userAnswer: question.options[optionIndex],
      correctAnswer: question.correctAnswer,
      isCorrect
    };
    
    // Update state
    setAnswered(true);
    setSelectedOption(optionIndex);
    setIsCorrect(isCorrect);
    
    // Show confetti if correct
    if (isCorrect) {
      setShowConfetti(true);
      setTimeout(() => setShowConfetti(false), 3000);
    }
    
    // Update answers in context
    setUserAnswers([...userAnswers, newAnswer]);
  };
  
  const handleNextQuestion = () => {
    setAnswered(false);
    setSelectedOption(null);
    
    if (currentQuestionIndex + 1 < quizQuestions.length) {
      setCurrentQuestionIndex(currentQuestionIndex + 1);
    } else {
      // Quiz completed - go to results page
      navigate('/results');
    }
  };
  
  // If questions aren't loaded yet, show loading state
  if (!currentQuestion) {
    return (
      <div className="flex justify-center items-center h-full">
        <div className="text-center">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-primary mx-auto mb-4"></div>
          <p className="text-neutral-600">Loading quiz questions...</p>
        </div>
      </div>
    );
  }
  
  return (
    <section className="animate-fade-in">
      <Confetti active={showConfetti} />
      
      <div className="flex flex-col md:flex-row items-start justify-between mb-6">
        <div>
          <Button
            variant="link"
            className="mb-4 flex items-center text-primary hover:text-primary-dark p-0"
            onClick={goToTable}
          >
            <ArrowLeft className="mr-2 h-4 w-4" /> Back to table
          </Button>
          <h2 className="font-bold text-3xl md:text-4xl text-neutral-800">
            Quiz: {tableNumber} Times Table
          </h2>
          <p className="text-neutral-600 mt-2">Answer these multiplication questions!</p>
        </div>
        
        <div className="mt-4 md:mt-0 bg-white rounded-lg shadow-md p-4 border border-neutral-200">
          <div className="flex items-center space-x-2">
            <div className="text-green-500 flex items-center">
              <CheckCircle className="h-4 w-4 mr-1" /> <span>{score.correct}</span>
            </div>
            <div className="text-neutral-300">|</div>
            <div className="text-red-500 flex items-center">
              <XCircle className="h-4 w-4 mr-1" /> <span>{score.incorrect}</span>
            </div>
            <div className="text-neutral-300">|</div>
            <div className="text-primary flex items-center">
              <HelpCircle className="h-4 w-4 mr-1" /> 
              <span>{score.total - (score.correct + score.incorrect)}</span>
            </div>
          </div>
        </div>
      </div>
      
      {/* Progress Bar */}
      <div className="w-full bg-neutral-200 rounded-full h-4 mb-6">
        <div 
          className="bg-primary h-4 rounded-full transition-all duration-500" 
          style={{ width: `${progressPercentage}%` }}
        ></div>
      </div>
      
      {/* Quiz Question Card */}
      <div className="bg-white rounded-xl p-8 shadow-md border border-neutral-200 mb-8">
        <div className="text-center mb-8">
          <h3 className="font-bold text-3xl md:text-5xl text-neutral-800 mb-6">
            What is {tableNumber} × {currentQuestion.multiplicand}?
          </h3>
          
          {answered && (
            <div 
              className={`mb-4 p-3 rounded-lg text-xl font-bold ${
                isCorrect 
                  ? 'bg-green-100 text-green-500' 
                  : 'bg-red-100 text-red-500'
              }`}
            >
              {isCorrect 
                ? 'Correct! Great job!' 
                : `Incorrect. The correct answer is ${currentQuestion.correctAnswer}.`
              }
            </div>
          )}
        </div>
        
        {/* Answer Options */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-6">
          {currentQuestion.options.map((option, index) => {
            let optionClass = "flex items-center justify-between p-4 rounded-lg border-2 border-neutral-300 transition-all duration-200 text-left";
            
            if (answered) {
              if (index === currentQuestion.correctIndex) {
                optionClass += " bg-green-100 border-green-500";
              } else if (index === selectedOption && !isCorrect) {
                optionClass += " bg-red-100 border-red-500";
              } else {
                optionClass += " opacity-70";
              }
            } else {
              optionClass += " hover:scale-103 hover:border-primary";
            }
            
            return (
              <button 
                key={index}
                className={optionClass}
                onClick={() => handleOptionSelect(index)}
                disabled={answered}
              >
                <div className="flex items-center">
                  <div className="w-8 h-8 rounded-full bg-primary bg-opacity-10 flex items-center justify-center mr-3 text-primary font-bold">
                    {String.fromCharCode(65 + index)} {/* A, B, C, D */}
                  </div>
                  <span className="text-xl font-bold text-neutral-700">{option}</span>
                </div>
              </button>
            );
          })}
        </div>
        
        <div className="flex justify-between items-center mt-8">
          <div>
            <span className="text-neutral-500">
              Question {currentQuestionIndex + 1} of {score.total}
            </span>
          </div>
          <Button
            onClick={handleNextQuestion}
            className={`bg-primary hover:bg-blue-600 text-white px-6 py-2 rounded-lg font-bold transition-colors duration-200 shadow-md ${
              !answered ? 'opacity-50 cursor-not-allowed' : ''
            }`}
            disabled={!answered}
          >
            Next Question <ArrowRight className="ml-2 h-4 w-4" />
          </Button>
        </div>
      </div>
    </section>
  );
};

export default Quiz;
