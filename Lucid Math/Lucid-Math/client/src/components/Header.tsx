import React, { useState, useEffect } from 'react';
import { Link } from 'wouter';
import { Button } from '@/components/ui/button';
import { Calculator, Sun, Moon } from 'lucide-react';
import HelpModal from './HelpModal';

const Header: React.FC = () => {
  const [isHelpOpen, setIsHelpOpen] = useState(false);
  const [currentTheme, setCurrentTheme] = useState<'light' | 'dark'>('light');
  
  // Initialize theme from localStorage on component mount
  useEffect(() => {
    const savedTheme = localStorage.getItem('theme') as 'light' | 'dark' | null;
    if (savedTheme) {
      setCurrentTheme(savedTheme);
      
      // Apply theme
      const root = document.documentElement;
      if (savedTheme === 'dark') {
        root.classList.add('dark');
      } else {
        root.classList.remove('dark');
      }
    }
  }, []);
  
  // Local theme toggle function
  const toggleLocalTheme = () => {
    const newTheme = currentTheme === 'light' ? 'dark' : 'light';
    setCurrentTheme(newTheme);
    
    // Apply theme change to document element
    const root = document.documentElement;
    if (newTheme === 'dark') {
      root.classList.add('dark');
    } else {
      root.classList.remove('dark');
    }
    
    // Save theme preference to local storage
    localStorage.setItem('theme', newTheme);
  };
  
  return (
    <header className="bg-primary text-white shadow-md header-nav">
      <div className="container mx-auto px-4 py-4 flex justify-between items-center">
        <Link href="/">
          <div className="flex items-center space-x-2 cursor-pointer">
            <Calculator className="h-6 w-6 text-yellow-400" />
            <h1 className="font-bold text-2xl md:text-3xl">Lucid Math</h1>
          </div>
        </Link>
        <nav className="flex items-center space-x-2">
          <Button 
            onClick={() => setIsHelpOpen(true)}
            variant="ghost"
            className="font-bold text-white rounded-full hover:bg-primary-foreground/20"
          >
            <span className="mr-1">?</span> Help
          </Button>
          
          <Button
            onClick={toggleLocalTheme}
            variant="outline"
            size="icon"
            className="rounded-full bg-transparent border-white/20 hover:bg-primary-foreground/20"
            aria-label={currentTheme === 'dark' ? 'Switch to light mode' : 'Switch to dark mode'}
          >
            {currentTheme === 'dark' ? (
              <Sun className="h-[1.2rem] w-[1.2rem] text-yellow-300" />
            ) : (
              <Moon className="h-[1.2rem] w-[1.2rem] text-white" />
            )}
          </Button>
        </nav>
      </div>
      
      <HelpModal isOpen={isHelpOpen} onClose={() => setIsHelpOpen(false)} />
    </header>
  );
};

export default Header;
