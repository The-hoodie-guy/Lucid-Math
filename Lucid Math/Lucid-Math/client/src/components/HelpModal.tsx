import React from 'react';
import { 
  Dialog, 
  DialogContent, 
  DialogHeader, 
  DialogTitle,
  DialogDescription,
  DialogFooter
} from '@/components/ui/dialog';
import { Button } from '@/components/ui/button';
import { X } from 'lucide-react';

interface HelpModalProps {
  isOpen: boolean;
  onClose: () => void;
}

const HelpModal: React.FC<HelpModalProps> = ({ isOpen, onClose }) => {
  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent className="bg-white rounded-xl p-6 max-w-md w-full mx-4 shadow-2xl">
        <DialogHeader>
          <div className="flex justify-between items-center">
            <DialogTitle className="font-bold text-2xl text-neutral-800">Help & Tips</DialogTitle>
            <Button variant="ghost" size="icon" onClick={onClose} className="text-neutral-500 hover:text-neutral-700">
              <X className="h-5 w-5" />
            </Button>
          </div>
        </DialogHeader>
        
        <DialogDescription className="space-y-4 mb-6">
          <div>
            <h4 className="font-bold text-lg text-neutral-700 mb-2">How to use Lucid Math:</h4>
            <ol className="list-decimal list-inside space-y-1 text-neutral-600">
              <li>Select a multiplication table from the home page</li>
              <li>Study the complete table and memorize the patterns</li>
              <li>Click "Start Quiz" when you're ready to test your knowledge</li>
              <li>For each question, select one of the four answer options</li>
              <li>Get immediate feedback on your answers</li>
              <li>Complete the quiz to see your overall score</li>
            </ol>
          </div>
          
          <div>
            <h4 className="font-bold text-lg text-neutral-700 mb-2">Helpful Tips:</h4>
            <ul className="list-disc list-inside space-y-1 text-neutral-600">
              <li>Look for patterns in the multiplication tables</li>
              <li>Practice regularly to improve your memory</li>
              <li>Try to work through problems in your head before checking</li>
              <li>Focus on the tables you find most challenging</li>
            </ul>
          </div>
        </DialogDescription>
        
        <DialogFooter>
          <Button 
            onClick={onClose} 
            className="w-full bg-primary hover:bg-blue-600 text-white px-4 py-2 rounded-lg font-bold"
          >
            Got it!
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
};

export default HelpModal;
