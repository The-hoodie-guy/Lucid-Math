import React, { useEffect } from 'react';
import { useLocation } from 'wouter';
import { Button } from '@/components/ui/button';
import { CheckCircle, XCircle, Home, RotateCcw, AlertCircle } from 'lucide-react';
import { useMultiplication } from '@/context/MultiplicationContext';

const Results: React.FC = () => {
  const [, navigate] = useLocation();
  const { 
    selectedTable, 
    userAnswers, 
    score, 
    resetQuiz,
    saveQuizResult 
  } = useMultiplication();
  
  const scorePercentage = Math.round((score.correct / score.total) * 100);
  
  // Save the quiz result
  useEffect(() => {
    saveQuizResult();
  }, [saveQuizResult]);
  
  // Get incorrect answers for review
  const incorrectAnswers = userAnswers.filter(answer => !answer.isCorrect);
  
  // Generate feedback message based on score
  const getFeedback = () => {
    if (scorePercentage === 100) {
      return {
        title: 'Perfect Score!',
        message: `Amazing job! You've mastered the ${selectedTable} times table!`,
        bgClass: 'bg-green-100',
        titleClass: 'text-green-500'
      };
    } else if (scorePercentage >= 80) {
      return {
        title: 'Great job!',
        message: `You're doing very well with the ${selectedTable} times table. Just a little more practice!`,
        bgClass: 'bg-primary bg-opacity-10',
        titleClass: 'text-primary'
      };
    } else if (scorePercentage >= 60) {
      return {
        title: 'Good effort!',
        message: `You're getting better at the ${selectedTable} times table. Keep practicing!`,
        bgClass: 'bg-neutral-100',
        titleClass: 'text-neutral-800'
      };
    } else {
      return {
        title: 'Keep practicing!',
        message: `The ${selectedTable} times table needs more practice. Don't give up!`,
        bgClass: 'bg-red-100',
        titleClass: 'text-red-500'
      };
    }
  };
  
  const feedback = getFeedback();
  
  const handleRetakeQuiz = () => {
    resetQuiz();
    navigate(`/quiz/${selectedTable}`);
  };
  
  const goToHome = () => navigate('/');
  
  return (
    <section className="animate-fade-in">
      <div className="text-center mb-8">
        <h2 className="font-bold text-3xl md:text-4xl text-neutral-800 mb-4">Quiz Results</h2>
        <p className="text-neutral-600">Great job completing the {selectedTable} times table quiz!</p>
      </div>
      
      <div className="bg-white rounded-xl p-8 shadow-md border border-neutral-200 mb-8">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
          <div className="text-center p-4 rounded-lg bg-green-100 border border-green-500 border-opacity-20">
            <div className="text-4xl font-bold text-green-500 mb-2">{score.correct}</div>
            <div className="text-neutral-700 font-bold">Correct Answers</div>
          </div>
          
          <div className="text-center p-4 rounded-lg bg-red-100 border border-red-500 border-opacity-20">
            <div className="text-4xl font-bold text-red-500 mb-2">{score.incorrect}</div>
            <div className="text-neutral-700 font-bold">Incorrect Answers</div>
          </div>
          
          <div className="text-center p-4 rounded-lg bg-primary bg-opacity-10 border border-primary border-opacity-20">
            <div className="text-4xl font-bold text-white mb-2">{scorePercentage}%</div>
            <div className="text-neutral-700 font-bold">Your Score</div>
          </div>
        </div>
        
        <div className={`text-center mb-6 p-4 rounded-lg ${feedback.bgClass}`}>
          <h3 className={`font-bold text-xl ${feedback.titleClass} mb-2`}>{feedback.title}</h3>
          <p className="text-neutral-600">{feedback.message}</p>
        </div>
        
        <div className="flex flex-col md:flex-row justify-center gap-4">
          <Button
            variant="default"
            className="bg-primary hover:bg-blue-600 text-white shadow-md"
            onClick={handleRetakeQuiz}
          >
            <RotateCcw className="mr-2 h-4 w-4" /> Try Again
          </Button>
          <Button
            variant="secondary"
            className="text-neutral-800 shadow-md"
            onClick={goToHome}
          >
            <Home className="mr-2 h-4 w-4" /> Back to Home
          </Button>
        </div>
      </div>
      
      {incorrectAnswers.length > 0 && (
        <div className="bg-white rounded-xl p-6 shadow-md border border-neutral-200 mb-8">
          <h3 className="font-bold text-xl text-neutral-700 mb-4">
            <AlertCircle className="inline-block text-red-500 mr-2 h-5 w-5" /> Review Incorrect Answers
          </h3>
          
          <div className="space-y-4">
            {incorrectAnswers.map((answer, index) => (
              <div key={index} className="p-4 rounded-lg bg-neutral-100 border border-neutral-200">
                <p className="font-bold">{answer.question} = ?</p>
                <div className="flex flex-col sm:flex-row items-start sm:items-center mt-2">
                  <div className="text-red-500 mr-4 mb-2 sm:mb-0">
                    <XCircle className="inline-block mr-1 h-4 w-4" /> Your answer: {answer.userAnswer}
                  </div>
                  <div className="text-green-500">
                    <CheckCircle className="inline-block mr-1 h-4 w-4" /> Correct answer: {answer.correctAnswer}
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      )}
    </section>
  );
};

export default Results;
