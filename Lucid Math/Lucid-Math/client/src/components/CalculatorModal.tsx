import React, { useState } from 'react';
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogDescription,
  DialogFooter,
} from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { X } from "lucide-react";

interface CalculatorModalProps {
  isOpen: boolean;
  onClose: () => void;
}

const CalculatorModal: React.FC<CalculatorModalProps> = ({ isOpen, onClose }) => {
  const [display, setDisplay] = useState('0');
  const [firstOperand, setFirstOperand] = useState<number | null>(null);
  const [operator, setOperator] = useState<string | null>(null);
  const [waitingForSecondOperand, setWaitingForSecondOperand] = useState(false);

  const clear = () => {
    setDisplay('0');
    setFirstOperand(null);
    setOperator(null);
    setWaitingForSecondOperand(false);
  };

  const inputDigit = (digit: string) => {
    if (waitingForSecondOperand) {
      setDisplay(digit);
      setWaitingForSecondOperand(false);
    } else {
      setDisplay(display === '0' ? digit : display + digit);
    }
  };

  const inputDecimal = () => {
    if (waitingForSecondOperand) {
      setDisplay('0.');
      setWaitingForSecondOperand(false);
      return;
    }
    
    if (!display.includes('.')) {
      setDisplay(display + '.');
    }
  };

  const handleOperator = (nextOperator: string) => {
    const inputValue = parseFloat(display);

    if (firstOperand === null) {
      setFirstOperand(inputValue);
    } else if (operator) {
      const result = performCalculation();
      setDisplay(String(result));
      setFirstOperand(result);
    }

    setWaitingForSecondOperand(true);
    setOperator(nextOperator);
  };

  const performCalculation = () => {
    const inputValue = parseFloat(display);
    
    if (operator === '+') {
      return firstOperand! + inputValue;
    } else if (operator === '-') {
      return firstOperand! - inputValue;
    } else if (operator === '*') {
      return firstOperand! * inputValue;
    } else if (operator === '/') {
      return firstOperand! / inputValue;
    }
    
    return inputValue;
  };

  const handleEquals = () => {
    if (!operator || firstOperand === null) return;
    
    const result = performCalculation();
    setDisplay(String(result));
    setFirstOperand(result);
    setOperator(null);
    setWaitingForSecondOperand(true);
  };

  const handlePercentage = () => {
    const currentValue = parseFloat(display);
    const percentValue = currentValue / 100;
    setDisplay(String(percentValue));
  };

  const toggleSign = () => {
    const newValue = parseFloat(display) * -1;
    setDisplay(String(newValue));
  };

  return (
    <Dialog open={isOpen} onOpenChange={(open) => !open && onClose()}>
      <DialogContent className="sm:max-w-[450px] p-0 overflow-hidden bg-neutral-100 dark:bg-gray-800 border-none">
        <DialogHeader className="bg-primary p-4 text-white">
          <div className="flex justify-between items-center">
            <DialogTitle className="text-xl font-bold">Calculator</DialogTitle>
          </div>
          <DialogDescription className="text-white/80">
            Perform quick calculations
          </DialogDescription>
        </DialogHeader>
        
        <div className="p-6">
          <div className="bg-white dark:bg-gray-700 p-5 mb-6 rounded-md shadow-inner text-right h-24 flex items-center justify-end">
            <div className="text-4xl font-medium text-neutral-800 dark:text-white overflow-x-auto">
              {display}
            </div>
          </div>
          
          <div className="grid grid-cols-4 gap-3">
            {/* First row */}
            <Button
              variant="outline"
              className="bg-neutral-200 dark:bg-gray-600 hover:bg-neutral-300 dark:hover:bg-gray-500 text-neutral-800 dark:text-white border-none h-16 text-lg"
              onClick={clear}
            >
              C
            </Button>
            <Button
              variant="outline"
              className="bg-neutral-200 dark:bg-gray-600 hover:bg-neutral-300 dark:hover:bg-gray-500 text-neutral-800 dark:text-white border-none h-16 text-lg"
              onClick={toggleSign}
            >
              +/-
            </Button>
            <Button
              variant="outline"
              className="bg-neutral-200 dark:bg-gray-600 hover:bg-neutral-300 dark:hover:bg-gray-500 text-neutral-800 dark:text-white border-none h-16 text-lg"
              onClick={handlePercentage}
            >
              %
            </Button>
            <Button
              variant="outline"
              className="bg-yellow-500 hover:bg-yellow-600 text-white border-none h-16 text-lg"
              onClick={() => handleOperator('/')}
            >
              ÷
            </Button>
            
            {/* Second row */}
            <Button
              variant="outline"
              className="bg-white dark:bg-gray-700 hover:bg-neutral-100 dark:hover:bg-gray-600 text-neutral-800 dark:text-white border-neutral-200 dark:border-gray-600 h-16 text-lg"
              onClick={() => inputDigit('7')}
            >
              7
            </Button>
            <Button
              variant="outline"
              className="bg-white dark:bg-gray-700 hover:bg-neutral-100 dark:hover:bg-gray-600 text-neutral-800 dark:text-white border-neutral-200 dark:border-gray-600 h-16 text-lg"
              onClick={() => inputDigit('8')}
            >
              8
            </Button>
            <Button
              variant="outline"
              className="bg-white dark:bg-gray-700 hover:bg-neutral-100 dark:hover:bg-gray-600 text-neutral-800 dark:text-white border-neutral-200 dark:border-gray-600 h-16 text-lg"
              onClick={() => inputDigit('9')}
            >
              9
            </Button>
            <Button
              variant="outline"
              className="bg-yellow-500 hover:bg-yellow-600 text-white border-none h-16 text-lg"
              onClick={() => handleOperator('*')}
            >
              ×
            </Button>
            
            {/* Third row */}
            <Button
              variant="outline"
              className="bg-white dark:bg-gray-700 hover:bg-neutral-100 dark:hover:bg-gray-600 text-neutral-800 dark:text-white border-neutral-200 dark:border-gray-600 h-16 text-lg"
              onClick={() => inputDigit('4')}
            >
              4
            </Button>
            <Button
              variant="outline"
              className="bg-white dark:bg-gray-700 hover:bg-neutral-100 dark:hover:bg-gray-600 text-neutral-800 dark:text-white border-neutral-200 dark:border-gray-600 h-16 text-lg"
              onClick={() => inputDigit('5')}
            >
              5
            </Button>
            <Button
              variant="outline"
              className="bg-white dark:bg-gray-700 hover:bg-neutral-100 dark:hover:bg-gray-600 text-neutral-800 dark:text-white border-neutral-200 dark:border-gray-600 h-16 text-lg"
              onClick={() => inputDigit('6')}
            >
              6
            </Button>
            <Button
              variant="outline"
              className="bg-yellow-500 hover:bg-yellow-600 text-white border-none h-16 text-lg"
              onClick={() => handleOperator('-')}
            >
              -
            </Button>
            
            {/* Fourth row */}
            <Button
              variant="outline"
              className="bg-white dark:bg-gray-700 hover:bg-neutral-100 dark:hover:bg-gray-600 text-neutral-800 dark:text-white border-neutral-200 dark:border-gray-600 h-16 text-lg"
              onClick={() => inputDigit('1')}
            >
              1
            </Button>
            <Button
              variant="outline"
              className="bg-white dark:bg-gray-700 hover:bg-neutral-100 dark:hover:bg-gray-600 text-neutral-800 dark:text-white border-neutral-200 dark:border-gray-600 h-16 text-lg"
              onClick={() => inputDigit('2')}
            >
              2
            </Button>
            <Button
              variant="outline"
              className="bg-white dark:bg-gray-700 hover:bg-neutral-100 dark:hover:bg-gray-600 text-neutral-800 dark:text-white border-neutral-200 dark:border-gray-600 h-16 text-lg"
              onClick={() => inputDigit('3')}
            >
              3
            </Button>
            <Button
              variant="outline"
              className="bg-yellow-500 hover:bg-yellow-600 text-white border-none h-16 text-lg"
              onClick={() => handleOperator('+')}
            >
              +
            </Button>
            
            {/* Fifth row */}
            <Button
              variant="outline"
              className="bg-white dark:bg-gray-700 hover:bg-neutral-100 dark:hover:bg-gray-600 text-neutral-800 dark:text-white border-neutral-200 dark:border-gray-600 h-16 text-lg col-span-2"
              onClick={() => inputDigit('0')}
            >
              0
            </Button>
            <Button
              variant="outline"
              className="bg-white dark:bg-gray-700 hover:bg-neutral-100 dark:hover:bg-gray-600 text-neutral-800 dark:text-white border-neutral-200 dark:border-gray-600 h-16 text-lg"
              onClick={inputDecimal}
            >
              .
            </Button>
            <Button
              variant="outline"
              className="bg-primary hover:bg-primary/90 text-white border-none h-16 text-lg font-bold"
              onClick={handleEquals}
            >
              =
            </Button>
          </div>
        </div>
        
        <DialogFooter className="bg-neutral-100 dark:bg-gray-800 px-4 py-3 border-t border-neutral-200 dark:border-gray-700">
          <Button
            variant="ghost"
            className="w-full text-neutral-800 dark:text-white font-medium"
            onClick={onClose}
          >
            Close
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
};

export default CalculatorModal;