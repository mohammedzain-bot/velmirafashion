import React, { useState, useEffect } from 'react';
import { Sparkles } from 'lucide-react';

interface VelmiraIntroLoaderProps {
  onComplete: () => void;
}

const BRAND_LETTERS = ['V', 'E', 'L', 'M', 'I', 'R', 'A'];

export const VelmiraIntroLoader: React.FC<VelmiraIntroLoaderProps> = ({ onComplete }) => {
  const [visibleCount, setVisibleCount] = useState<number>(0);
  const [showSubtitle, setShowSubtitle] = useState<boolean>(false);
  const [isFadingOut, setIsFadingOut] = useState<boolean>(false);

  useEffect(() => {
    // Reveal letters one by one
    const intervals: (ReturnType<typeof setTimeout>)[] = [];

    BRAND_LETTERS.forEach((_, index) => {
      const timer = setTimeout(() => {
        setVisibleCount(prev => Math.max(prev, index + 1));
      }, 250 + index * 260); // 250ms, 510ms, 770ms, 1030ms, 1290ms, 1550ms, 1810ms
      intervals.push(timer);
    });

    // Subtitle reveal after all letters appear
    const subtitleTimer = setTimeout(() => {
      setShowSubtitle(true);
    }, 2200);

    // Fade out screen
    const fadeTimer = setTimeout(() => {
      setIsFadingOut(true);
    }, 3100);

    // Finish loader and trigger country pop-up
    const completeTimer = setTimeout(() => {
      onComplete();
    }, 3700);

    return () => {
      intervals.forEach(t => clearTimeout(t));
      clearTimeout(subtitleTimer);
      clearTimeout(fadeTimer);
      clearTimeout(completeTimer);
    };
  }, [onComplete]);

  const handleSkip = () => {
    setIsFadingOut(true);
    setTimeout(() => {
      onComplete();
    }, 300);
  };

  return (
    <div
      className={`fixed inset-0 z-[9999] bg-[#0A0A0A] flex flex-col items-center justify-center select-none transition-opacity duration-700 ${
        isFadingOut ? 'opacity-0 pointer-events-none' : 'opacity-100'
      }`}
      style={{
        backgroundImage: 'radial-gradient(circle at center, rgba(212, 175, 55, 0.08) 0%, rgba(10, 10, 10, 0.98) 70%, #050505 100%)'
      }}
    >
      {/* Ambient background glowing rings */}
      <div className="absolute w-72 h-72 sm:w-96 sm:h-96 rounded-full bg-[#D4AF37]/5 blur-3xl pointer-events-none animate-pulse" />

      {/* Luxury Crest / Emblem */}
      <div
        className={`mb-6 transition-all duration-700 transform ${
          visibleCount > 0 ? 'opacity-100 scale-100' : 'opacity-0 scale-90'
        }`}
      >
        <div className="relative flex items-center justify-center w-14 h-14 sm:w-16 sm:h-16 rounded-full border border-[#D4AF37]/40 bg-gradient-to-b from-[#1E1E1E] to-[#0A0A0A] shadow-[0_0_25px_rgba(212,175,55,0.2)]">
          <Sparkles className="w-6 h-6 text-[#D4AF37] animate-spin-slow" />
          <div className="absolute inset-0 rounded-full border border-[#D4AF37]/20 scale-125 animate-ping opacity-20" />
        </div>
      </div>

      {/* Staggered VELMIRA Letter Animation */}
      <div className="flex items-center justify-center space-x-1 sm:space-x-3 md:space-x-4 mb-4">
        {BRAND_LETTERS.map((letter, idx) => {
          const isVisible = visibleCount > idx;
          return (
            <span
              key={idx}
              className={`font-cinzel text-4xl sm:text-6xl md:text-7xl font-extrabold tracking-wider transition-all duration-500 ease-out inline-block ${
                isVisible
                  ? 'opacity-100 translate-y-0 scale-100 text-transparent bg-clip-text bg-gradient-to-b from-[#FFFDF2] via-[#E6CA65] to-[#A37B24] filter drop-shadow-[0_4px_16px_rgba(212,175,55,0.4)]'
                  : 'opacity-0 translate-y-6 scale-90 text-transparent'
              }`}
            >
              {letter}
            </span>
          );
        })}
      </div>

      {/* Decorative Champagne Gold Divider */}
      <div
        className={`h-[1px] bg-gradient-to-r from-transparent via-[#D4AF37] to-transparent transition-all duration-700 ease-out ${
          showSubtitle ? 'w-48 sm:w-72 opacity-100' : 'w-0 opacity-0'
        }`}
      />

      {/* Tagline / Subtitle */}
      <div
        className={`mt-4 text-center transition-all duration-700 transform ${
          showSubtitle ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-3'
        }`}
      >
        <p className="text-[10px] sm:text-xs font-cinzel tracking-[0.35em] sm:tracking-[0.5em] text-stone-300 uppercase">
          Haute Horlogerie & Luxury Atelier
        </p>
        <p className="text-[9px] sm:text-[10px] text-[#D4AF37]/80 tracking-widest mt-1 font-sans uppercase">
          Exclusive Watches & Designer Bags
        </p>
      </div>

      {/* Subtle Progress Bar */}
      <div className="w-36 sm:w-48 h-0.5 bg-stone-800 rounded-full mt-10 overflow-hidden relative">
        <div
          className="h-full bg-gradient-to-r from-[#C5A059] to-[#F3E5AB] rounded-full transition-all duration-300 ease-out"
          style={{ width: `${(visibleCount / BRAND_LETTERS.length) * 100}%` }}
        />
      </div>

      {/* Skip Button */}
      <button
        onClick={handleSkip}
        className="absolute bottom-6 right-6 text-[10px] font-sans tracking-widest text-stone-500 hover:text-[#D4AF37] uppercase transition border border-stone-800 hover:border-[#D4AF37]/40 px-3 py-1 rounded-full bg-black/40"
      >
        Skip Intro &rarr;
      </button>
    </div>
  );
};
