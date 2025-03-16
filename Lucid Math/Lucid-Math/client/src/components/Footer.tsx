import React from 'react';
import { Calculator, Mail, Twitter, Facebook, Instagram } from 'lucide-react';

const Footer: React.FC = () => {
  return (
    <footer className="bg-neutral-800 dark:bg-gray-900 text-white py-6 header-nav">
      <div className="container mx-auto px-4">
        <div className="flex flex-col md:flex-row justify-between items-center">
          <div className="mb-4 md:mb-0">
            <div className="flex items-center">
              <Calculator className="h-5 w-5 text-yellow-400 mr-2" />
              <span className="font-bold">Lucid Math</span>
            </div>
            <p className="text-sm text-neutral-400 dark:text-gray-400 mt-1">Learn multiplication tables the fun way!</p>
          </div>
          
          <div className="flex flex-col items-center">
            <div className="flex space-x-4">
              <a href="#" className="text-neutral-400 dark:text-gray-400 hover:text-white transition-colors">
                <Mail className="h-5 w-5" />
              </a>
              <a href="#" className="text-neutral-400 dark:text-gray-400 hover:text-white transition-colors">
                <Twitter className="h-5 w-5" />
              </a>
              <a href="#" className="text-neutral-400 dark:text-gray-400 hover:text-white transition-colors">
                <Facebook className="h-5 w-5" />
              </a>
              <a href="#" className="text-neutral-400 dark:text-gray-400 hover:text-white transition-colors">
                <Instagram className="h-5 w-5" />
              </a>
            </div>
            <p className="text-sm text-neutral-500 dark:text-gray-500 mt-2 italic">Coming Soon</p>
          </div>
        </div>
        
        <div className="mt-4 pt-4 border-t border-neutral-700 dark:border-gray-800 text-center text-sm text-neutral-500 dark:text-gray-500">
          <p>{new Date().getFullYear()} Lucid Math</p>
          <p className="mt-1">Founder - Saksham Kansal</p>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
