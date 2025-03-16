import React, { useState } from 'react';
import { useLocation } from 'wouter';
import { Card, CardContent } from '@/components/ui/card';
import { Calculator } from 'lucide-react';
import { useMultiplication } from '@/context/MultiplicationContext';
import CalculatorModal from '@/components/CalculatorModal';

const Home: React.FC = () => {
  const [, navigate] = useLocation();
  const { setSelectedTable } = useMultiplication();
  const [isCalculatorOpen, setIsCalculatorOpen] = useState(false);

  const handleTableSelect = (tableNumber: number) => {
    setSelectedTable(tableNumber);
    navigate(`/table/${tableNumber}`);
  };
  
  const handleCalculatorClick = () => {
    setIsCalculatorOpen(true);
  };

  // Generate array of numbers 1-20 for multiplication tables
  const tableNumbers = Array.from({ length: 20 }, (_, i) => i + 1);

  return (
    <section className="animate-fade-in">
      <div className="text-center mb-10">
        <h2 className="font-bold text-3xl md:text-4xl text-neutral-800 dark:text-gray-100 mb-4">Learn Multiplication Tables</h2>
        <p className="text-neutral-600 dark:text-gray-300 max-w-2xl mx-auto mb-6">
          Welcome to Lucid Math! Explore multiplication tables from 1 to 20 and test your skills with fun quizzes. 
          Select a number below to get started.
        </p>
        
        <div className="relative mx-auto w-48 h-48 mb-4 cursor-pointer" onClick={handleCalculatorClick}>
          <div className="rounded-full bg-blue-100 dark:bg-blue-900 w-full h-full border-4 border-yellow-400 shadow-lg flex items-center justify-center overflow-hidden hover:bg-blue-200 dark:hover:bg-blue-800 transition-colors duration-300">
            <Calculator className="h-24 w-24 text-primary dark:text-blue-300" />
          </div>
          <div className="absolute -right-2 -top-2 bg-primary text-white rounded-full w-12 h-12 flex items-center justify-center text-xl font-bold">
            ×
          </div>
        </div>
        
        <CalculatorModal 
          isOpen={isCalculatorOpen} 
          onClose={() => setIsCalculatorOpen(false)} 
        />
      </div>
      
      <div className="mb-8">
        <h3 className="font-bold text-xl text-neutral-700 dark:text-gray-200 mb-4">Choose a Multiplication Table:</h3>
        
        <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 gap-4">
          {tableNumbers.map(num => (
            <button
              key={num}
              className="table-button bg-white dark:bg-gray-800 rounded-lg py-6 shadow-md transition-all duration-300 border-2 border-neutral-200 dark:border-gray-700 hover:border-primary focus:outline-none focus:ring-2 focus:ring-primary focus:ring-opacity-50 hover:translate-y-[-5px] hover:shadow-lg"
              onClick={() => handleTableSelect(num)}
            >
              <span className="block text-3xl font-bold text-primary dark:text-blue-300">{num}</span>
              <span className="text-neutral-500 dark:text-gray-400">times table</span>
            </button>
          ))}
        </div>
      </div>
      
      <Card className="bg-white dark:bg-gray-800 rounded-xl p-6 shadow-md border border-neutral-200 dark:border-gray-700">
        <CardContent className="p-0">
          <h3 className="font-bold text-xl text-neutral-700 dark:text-gray-200 mb-3">How to use Lucid Math:</h3>
          <ol className="list-decimal list-inside space-y-2 text-neutral-600 dark:text-gray-300">
            <li>Select a multiplication table you want to learn</li>
            <li>Study the complete multiplication table</li>
            <li>Test your knowledge with the interactive quiz</li>
            <li>Track your progress and improve your scores</li>
          </ol>
        </CardContent>
      </Card>
    </section>
  );
};

export default Home;
