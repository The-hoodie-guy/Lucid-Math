import React, { useEffect, useRef } from 'react';

interface ConfettiProps {
  active: boolean;
  duration?: number;
}

const Confetti: React.FC<ConfettiProps> = ({ active, duration = 3000 }) => {
  const containerRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (!active || !containerRef.current) return;

    const container = containerRef.current;
    const confettiCount = 50;
    const colors = ['#4361EE', '#FFC107', '#4CAF50', '#F44336', '#9C27B0'];
    const confettiElements: HTMLDivElement[] = [];

    const cleanup = () => {
      confettiElements.forEach(element => {
        if (element.parentNode) {
          element.parentNode.removeChild(element);
        }
      });
    };

    // Clean up any existing confetti
    cleanup();

    // Create new confetti pieces
    for (let i = 0; i < confettiCount; i++) {
      const confetti = document.createElement('div');
      confetti.className = 'absolute w-3 h-3 opacity-70';
      confetti.style.left = `${Math.random() * 100}%`;
      confetti.style.backgroundColor = colors[Math.floor(Math.random() * colors.length)];
      confetti.style.transform = 'translateY(0) rotate(0)';
      confetti.style.animation = `confetti ${(Math.random() * 3) + 2}s ease-in-out forwards`;
      
      container.appendChild(confetti);
      confettiElements.push(confetti);
    }

    // Clean up after animation duration
    const timer = setTimeout(() => {
      cleanup();
    }, duration);

    return () => {
      clearTimeout(timer);
      cleanup();
    };
  }, [active, duration]);

  return (
    <div 
      ref={containerRef}
      className="absolute inset-0 overflow-hidden pointer-events-none z-50"
      style={{ 
        perspective: '1000px',
      }}
    >
      <style jsx>{`
        @keyframes confetti {
          0% { transform: translateY(0) rotateX(0) rotateY(0); }
          100% { transform: translateY(1000px) rotateX(720deg) rotateY(720deg); }
        }
      `}</style>
    </div>
  );
};

export default Confetti;
