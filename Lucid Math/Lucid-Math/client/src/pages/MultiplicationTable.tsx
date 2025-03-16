import React from 'react';
import { useRoute, useLocation } from 'wouter';
import { Button } from '@/components/ui/button';
import { ArrowLeft, PlayCircle, Lightbulb, Star, CheckCircle } from 'lucide-react';
import { useMultiplication } from '@/context/MultiplicationContext';

const MultiplicationTable: React.FC = () => {
  const [, navigate] = useLocation();
  const [match, params] = useRoute('/table/:number');
  const { setSelectedTable } = useMultiplication();
  
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
  
  // Set the selected table in context
  React.useEffect(() => {
    setSelectedTable(tableNumber);
  }, [tableNumber, setSelectedTable]);
  
  // Generate multiplication table rows (1-12)
  const tableRows = Array.from({ length: 12 }, (_, i) => {
    const multiplicand = i + 1;
    const result = tableNumber * multiplicand;
    return { multiplicand, result };
  });
  
  const goToHome = () => navigate('/');
  const startQuiz = () => navigate(`/quiz/${tableNumber}`);
  
  return (
    <section className="animate-fade-in">
      <div className="flex flex-col md:flex-row items-start justify-between mb-6">
        <div>
          <Button
            variant="link"
            className="mb-4 flex items-center text-primary hover:text-primary-dark p-0"
            onClick={goToHome}
          >
            <ArrowLeft className="mr-2 h-4 w-4" /> Back to all tables
          </Button>
          <h2 className="font-bold text-3xl md:text-4xl text-neutral-800">
            {tableNumber} Times Table
          </h2>
          <p className="text-neutral-600 mt-2">Learn the complete table, then test your knowledge!</p>
        </div>
        
        <div className="mt-4 md:mt-0">
          <Button
            variant="secondary"
            size="lg"
            className="font-bold text-neutral-800 shadow-md"
            onClick={startQuiz}
          >
            <PlayCircle className="mr-2 h-5 w-5" /> Start Quiz
          </Button>
        </div>
      </div>
      
      <div className="bg-white rounded-xl p-6 shadow-md border border-neutral-200 mb-8 overflow-x-auto">
        <table className="w-full">
          <thead>
            <tr>
              <th className="py-3 text-left text-xl font-bold text-primary border-b-2 border-neutral-200" colSpan={3}>
                Multiplication Table of {tableNumber}
              </th>
            </tr>
          </thead>
          <tbody>
            {tableRows.map(({ multiplicand, result }) => (
              <tr key={multiplicand} className="border-b border-neutral-200">
                <td className="py-3 text-lg font-bold text-neutral-700">
                  {tableNumber} × {multiplicand}
                </td>
                <td className="py-3 text-lg font-bold text-primary">
                  = {result}
                </td>
                <td className="py-3 text-neutral-600 hidden md:table-cell">
                  {tableNumber} times {multiplicand} equals {result}
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
      
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-8">
        <div className="bg-white rounded-xl p-6 shadow-md border border-neutral-200">
          <h3 className="font-bold text-xl text-neutral-700 mb-3">
            <Lightbulb className="inline-block text-yellow-400 mr-2 h-5 w-5" /> Study Tips
          </h3>
          <ul className="space-y-2 text-neutral-600">
            <li className="flex items-start">
              <CheckCircle className="text-green-500 mt-1 mr-2 h-4 w-4" />
              <span>Look for patterns in the results</span>
            </li>
            <li className="flex items-start">
              <CheckCircle className="text-green-500 mt-1 mr-2 h-4 w-4" />
              <span>Practice saying the equations out loud</span>
            </li>
            <li className="flex items-start">
              <CheckCircle className="text-green-500 mt-1 mr-2 h-4 w-4" />
              <span>Try to memorize the results in order</span>
            </li>
          </ul>
        </div>
        
        <div className="bg-primary bg-opacity-10 rounded-xl p-6 shadow-md border border-primary border-opacity-20">
          <h3 className="font-bold text-xl text-primary mb-3">
            <Star className="inline-block text-yellow-400 mr-2 h-5 w-5" /> Did You Know?
          </h3>
          <p className="text-neutral-700">
            {tableNumber === 13 ? (
              <>
                When multiplying by 13, you can use this trick: multiply by 10, then by 3, and add the results together!
              </>
            ) : tableNumber === 11 ? (
              <>
                For multiplying by 11, with single digits, you can just repeat the digit twice (e.g., 11×3=33)!
              </>
            ) : tableNumber === 9 ? (
              <>
                For the 9 times table, the digits of the results always add up to 9, and the tens digit is always one less than the multiplier!
              </>
            ) : tableNumber === 5 ? (
              <>
                Numbers in the 5 times table always end in either 0 or 5. It follows a simple pattern!
              </>
            ) : (
              <>
                Breaking down multiplication problems can make them easier. For example, 7×8 can be thought of as 7×4×2, which is 28×2=56.
              </>
            )}
          </p>
          <div className="mt-3 p-3 bg-white rounded-lg">
            <p className="text-neutral-700">
              For example: {tableNumber} × 4 = {
                tableNumber === 13 ? `(10 × 4) + (3 × 4) = 40 + 12 = 52` :
                tableNumber === 11 ? `11 × 4 = 44 (notice the pattern: 4, 4)` :
                tableNumber === 9 ? `9 × 4 = 36 (3+6=9, and 3 is 4-1)` :
                tableNumber === 5 ? `5 × 4 = 20 (ends in 0)` :
                `${tableNumber} × 4 = ${tableNumber * 4}`
              }
            </p>
          </div>
        </div>
      </div>
      
      <div className="text-center mt-8">
        <Button
          variant="secondary"
          size="lg"
          className="font-bold text-neutral-800 shadow-md px-8 py-7 text-xl"
          onClick={startQuiz}
        >
          <PlayCircle className="mr-2 h-6 w-6" /> I'm Ready to Take the Quiz!
        </Button>
      </div>
    </section>
  );
};

export default MultiplicationTable;
