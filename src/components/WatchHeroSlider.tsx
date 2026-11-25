import React, { useState, useEffect, useRef } from 'react';
import { Link } from 'react-router-dom';
import { ChevronLeft, ChevronRight, MessageCircle, ArrowRight } from 'lucide-react';
import { OFFICIAL_WHATSAPP_NUMBER, WHATSAPP_RAW_NUMBER } from '../utils/whatsapp';

export interface WatchSlide {
  id: string;
  image: string;
  category: string;
  title: string;
  subtitle: string;
  price: string;
  priceAED: string;
  link: string;
}

export const WATCH_SLIDES: WatchSlide[] = [
  {
    id: 'slide-1',
    image: '/watches/seiko-collection-vault.jpg',
    category: "COLLECTOR'S SUITE",
    title: 'THE MECHANICAL CALIBRE VAULT',
    subtitle: 'Triple sunburst emerald, cyan & ivory dials in brushed 316L steel.',
    price: '₹14,999',
    priceAED: 'AED 660',
    link: '/watches/prod-w1'
  },
  {
    id: 'slide-2',
    image: '/watches/cartier-boutique-display.jpg',
    category: 'HAUTE HORLOGERIE',
    title: 'SANTOS GEOMETRIC BOUTIQUE',
    subtitle: 'Classic Roman indices with sapphire cabochon crown and deployant bracelet.',
    price: '₹24,999',
    priceAED: 'AED 1,090',
    link: '/watches/prod-w3'
  },
  {
    id: 'slide-3',
    image: '/watches/hublot-chrono-lounge.jpg',
    category: 'GRAND COMPLICATION',
    title: 'TITANIUM CHRONO & FLUTED STEEL',
    subtitle: 'Skeleton exhibition dials with hand saddle-stitched calfskin leather.',
    price: '₹28,500',
    priceAED: 'AED 1,250',
    link: '/watches/prod-w4'
  },
  {
    id: 'slide-4',
    image: '/watches/tissot-silver-chronograph.jpg',
    category: 'SWISS CHRONOMETER',
    title: 'SILVER SUNBURST TACHYMÈTRE',
    subtitle: 'Triple chronometer subdials with hand-finished cognac alligator leather.',
    price: '₹18,999',
    priceAED: 'AED 830',
    link: '/watches/prod-w5'
  },
  {
    id: 'slide-5',
    image: '/watches/emerald-purple-automatic.jpg',
    category: 'ROYAL CALIBRE',
    title: 'SUNBURST EMERALD & AMETHYST',
    subtitle: '21-jewel self-winding rotor with bilingual day-date complications.',
    price: '₹13,499',
    priceAED: 'AED 590',
    link: '/watches/prod-w2'
  },
  {
    id: 'slide-6',
    image: '/watches/vintage-silver-digital.jpg',
    category: 'ARCHIVE CLASSIC',
    title: 'HERITAGE STEEL DIGITAL & ANA-DIGI',
    subtitle: 'Architectural geometry in full surgical grade 316L stainless steel.',
    price: '₹7,999',
    priceAED: 'AED 350',
    link: '/watches/prod-w6'
  },
  {
    id: 'slide-7',
    image: '/watches/horology-atelier-vintage.jpg',
    category: 'VINTAGE RESTORATION',
    title: 'ATELIER MECHANICAL CALIBRES',
    subtitle: 'Hand-calibrated antique escapements and timeless chronometric precision.',
    price: '₹16,500',
    priceAED: 'AED 720',
    link: '/watches/prod-w7'
  }
];

export const WatchHeroSlider: React.FC = () => {
  const [currentIndex, setCurrentIndex] = useState(0);
  const [isPaused, setIsPaused] = useState(false);
  const timerRef = useRef<ReturnType<typeof setTimeout> | null>(null);

  const totalSlides = WATCH_SLIDES.length;

  const nextSlide = () => {
    setCurrentIndex(prev => (prev + 1) % totalSlides);
  };

  const prevSlide = () => {
    setCurrentIndex(prev => (prev - 1 + totalSlides) % totalSlides);
  };

  // Automatic slide change every 4.5 seconds
  useEffect(() => {
    if (!isPaused) {
      timerRef.current = setInterval(() => {
        nextSlide();
      }, 4500);
    }
    return () => {
      if (timerRef.current) clearInterval(timerRef.current);
    };
  }, [currentIndex, isPaused]);

  const current = WATCH_SLIDES[currentIndex];

  return (
    <section 
      className="relative w-full h-[78vh] sm:h-[84vh] lg:h-[88vh] bg-[#FFFFFF] overflow-hidden border-b border-neutral-200 select-none group"
      onMouseEnter={() => setIsPaused(true)}
      onMouseLeave={() => setIsPaused(false)}
      aria-label="Almost Full Screen Watch Hero Slideshow"
    >
      {/* 
        Almost Full Screen Watch Photography with Smooth Cross-Fade
      */}
      <div className="absolute inset-0 w-full h-full">
        {WATCH_SLIDES.map((slide, idx) => (
          <div
            key={slide.id}
            className={`absolute inset-0 w-full h-full transition-opacity duration-1000 ease-in-out ${
              idx === currentIndex ? 'opacity-100 z-10' : 'opacity-0 z-0 pointer-events-none'
            }`}
          >
            {/* The watch photo almost full screen */}
            <img
              src={slide.image}
              alt={slide.title}
              className="w-full h-full object-cover object-center filter brightness-[0.96] contrast-[1.02] transform transition-transform duration-[6000ms] ease-out scale-100 group-hover:scale-102"
              loading={idx === 0 ? 'eager' : 'lazy'}
            />

            {/* Subtle soft gradient scrim to ensure small text readability while preserving full-screen watch visual */}
            <div className="absolute inset-0 bg-gradient-to-t from-white via-white/20 to-black/30 pointer-events-none" />
            <div className="absolute inset-0 bg-gradient-to-r from-white/80 via-transparent to-white/40 pointer-events-none sm:from-white/70" />
          </div>
        ))}
      </div>

      {/* Floating Small Texts (Minimal, Subtle & Editorial) */}
      <div className="relative z-20 max-w-7xl mx-auto h-full px-4 sm:px-8 lg:px-12 flex flex-col justify-between py-8 sm:py-12 pointer-events-none">
        
        {/* Top Minimal Track Indicator */}
        <div className="flex items-center justify-between text-[11px] font-mono tracking-widest text-[#111111] pointer-events-auto">
          <div className="inline-flex items-center space-x-2 bg-white/90 backdrop-blur-md px-3 py-1 border border-neutral-200 shadow-xs">
            <span className="w-1.5 h-1.5 rounded-full bg-[#111111] animate-pulse" />
            <span className="uppercase text-[10px] font-semibold text-[#111111]">
              {current.category}
            </span>
          </div>

          <div className="bg-white/90 backdrop-blur-md px-3 py-1 border border-neutral-200 text-[10px] font-semibold text-neutral-600 shadow-xs">
            0{currentIndex + 1} / 0{totalSlides}
          </div>
        </div>

        {/* Bottom Small Texts — Minimal & Uncluttered */}
        <div className="max-w-lg bg-white/92 backdrop-blur-md p-5 sm:p-6 border border-neutral-200 shadow-lg pointer-events-auto space-y-2.5 transition-all duration-500">
          <span className="text-[9px] uppercase tracking-[0.25em] text-[#71717A] font-semibold block">
            VELMIRA TIMEPIECES
          </span>

          <h2 className="font-serif text-lg sm:text-2xl font-bold tracking-tight text-[#111111] leading-snug">
            {current.title}
          </h2>

          <p className="text-xs text-[#52525B] leading-relaxed line-clamp-2">
            {current.subtitle}
          </p>

          <div className="pt-2 flex items-center justify-between border-t border-neutral-200/80">
            <div>
              <span className="text-sm sm:text-base font-bold font-mono text-[#111111]">
                {current.price}
              </span>
              <span className="text-[10px] text-neutral-500 font-mono ml-1.5">
                / {current.priceAED}
              </span>
            </div>

            <div className="flex items-center space-x-2">
              <a
                href={`https://wa.me/${WHATSAPP_RAW_NUMBER}?text=${encodeURIComponent(`Hello Velmira, I would like to inquire about: ${current.title}`)}`}
                target="_blank"
                rel="noreferrer"
                className="p-2 border border-neutral-300 text-neutral-700 hover:text-black hover:border-black transition"
                title="WhatsApp Inquiry"
              >
                <MessageCircle className="w-3.5 h-3.5 text-emerald-600" />
              </a>

              <Link
                to={current.link}
                className="inline-flex items-center space-x-1.5 px-3.5 py-1.5 bg-[#111111] text-white hover:bg-black text-[10px] font-bold uppercase tracking-widest transition shadow-xs"
              >
                <span>View</span>
                <ArrowRight className="w-3 h-3" />
              </Link>
            </div>
          </div>
        </div>

        {/* Bottom Slide Progress Dotted Line */}
        <div className="flex items-center space-x-2 pointer-events-auto">
          {WATCH_SLIDES.map((_, idx) => (
            <button
              key={idx}
              onClick={() => setCurrentIndex(idx)}
              aria-label={`Go to slide ${idx + 1}`}
              className={`h-1 transition-all duration-300 ${
                currentIndex === idx 
                  ? 'w-8 bg-[#111111]' 
                  : 'w-2 bg-neutral-300 hover:bg-neutral-500'
              }`}
            />
          ))}
        </div>
      </div>

      {/* Discreet Previous / Next Arrows on Screen Edges */}
      <button
        onClick={prevSlide}
        aria-label="Previous Slide"
        className="absolute left-3 sm:left-6 top-1/2 -translate-y-1/2 z-30 p-2.5 sm:p-3 bg-white/85 hover:bg-white text-neutral-800 hover:text-black border border-neutral-200/80 shadow-md backdrop-blur-xs transition rounded-full opacity-70 hover:opacity-100"
      >
        <ChevronLeft className="w-4 h-4 sm:w-5 sm:h-5" />
      </button>

      <button
        onClick={nextSlide}
        aria-label="Next Slide"
        className="absolute right-9 sm:right-12 top-1/2 -translate-y-1/2 z-30 p-2.5 sm:p-3 bg-white/85 hover:bg-white text-neutral-800 hover:text-black border border-neutral-200/80 shadow-md backdrop-blur-xs transition rounded-full opacity-70 hover:opacity-100"
      >
        <ChevronRight className="w-4 h-4 sm:w-5 sm:h-5" />
      </button>
    </section>
  );
};
