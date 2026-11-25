import React, { useState, useEffect, useRef } from 'react';

interface VelmiraIntroLoaderProps {
  onComplete: () => void;
}

const BRAND_LETTERS = ['V', 'E', 'L', 'M', 'I', 'R', 'A'];

export const VelmiraIntroLoader: React.FC<VelmiraIntroLoaderProps> = ({ onComplete }) => {
  const [visibleCount, setVisibleCount] = useState<number>(0);
  const [isFadingOut, setIsFadingOut] = useState<boolean>(false);
  const onCompleteRef = useRef(onComplete);
  onCompleteRef.current = onComplete;

  useEffect(() => {
    // Reveal VELMIRA letters one by one
    const intervals: (ReturnType<typeof setTimeout>)[] = [];

    BRAND_LETTERS.forEach((_, index) => {
      const timer = setTimeout(() => {
        setVisibleCount(prev => Math.max(prev, index + 1));
      }, 140 + index * 160);
      intervals.push(timer);
    });

    // Fade out screen
    const fadeTimer = setTimeout(() => {
      setIsFadingOut(true);
    }, 1600);

    // Complete loader and trigger country pop-up
    const completeTimer = setTimeout(() => {
      onCompleteRef.current();
    }, 2100);

    return () => {
      intervals.forEach(t => clearTimeout(t));
      clearTimeout(fadeTimer);
      clearTimeout(completeTimer);
    };
  }, []);

  return (
    <div
      onClick={() => onCompleteRef.current()}
      className={`fixed inset-0 z-[9999] bg-[#0B0D12] flex items-center justify-center select-none cursor-pointer transition-opacity duration-500 ${
        isFadingOut ? 'opacity-0 pointer-events-none' : 'opacity-100'
      }`}
    >
      {/* VELMIRA each letter revealed one by one */}
      <div className="flex items-center justify-center space-x-2 sm:space-x-4 md:space-x-6">
        {BRAND_LETTERS.map((letter, idx) => {
          const isVisible = visibleCount > idx;
          return (
            <span
              key={idx}
              className={`font-serif text-4xl sm:text-6xl md:text-7xl font-bold tracking-[0.3em] text-[#D4AF37] transition-all duration-400 ease-out inline-block ${
                isVisible
                  ? 'opacity-100 translate-y-0 scale-100 drop-shadow-[0_0_15px_rgba(212,175,55,0.4)]'
                  : 'opacity-0 translate-y-4 scale-95'
              }`}
            >
              {letter}
            </span>
          );
        })}
      </div>
    </div>
  );
};
