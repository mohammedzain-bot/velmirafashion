import React from 'react';

const SCROLLING_PHRASE = 'TIMELESS ELEGANCE ✦ PREMIUM WATCH COLLECTION ✦ DISCOVER YOUR STYLE ✦ ';

export const TiltedVerticalMarquee: React.FC = () => {
  // Repeat the text multiple times to ensure continuous seamless infinite scroll
  const repeatedText = Array(12).fill(SCROLLING_PHRASE).join(' ');

  return (
    <aside 
      aria-label="Editorial Brand Stream"
      className="fixed right-0 top-0 bottom-0 w-6 sm:w-7.5 bg-[#0B0D12] text-white z-40 pointer-events-none select-none flex items-center justify-center overflow-hidden border-l border-[#2A3142] shadow-[-2px_0_15px_rgba(0,0,0,0.5)]"
    >
      {/* 
        The entire strip rotated by 90 degrees relative to horizontal orientation,
        running vertically along the right side of the website with continuous animated text.
      */}
      <div className="w-screen h-full flex items-center justify-center rotate-90 origin-center absolute">
        <div className="animate-marquee-strip flex items-center whitespace-nowrap text-[9px] sm:text-[10px] font-serif font-medium tracking-[0.3em] text-[#FFFFFF]">
          <span>{repeatedText}</span>
          <span className="text-[#D4AF37] px-2">✦</span>
          <span>{repeatedText}</span>
        </div>
      </div>
    </aside>
  );
};
