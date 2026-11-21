import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { ChevronLeft, ChevronRight, Sparkles, ArrowRight } from 'lucide-react';

interface Slide {
  id: number;
  image: string;
  badge: string;
  headline: string;
  subheading: string;
  primaryBtnText: string;
  primaryBtnLink: string;
  secondaryBtnText: string;
  secondaryBtnLink: string;
  alignment: 'left' | 'center' | 'right';
}

export const HeroSlider: React.FC = () => {
  const slides: Slide[] = [
    {
      id: 1,
      image: 'https://images.unsplash.com/photo-1490481651871-ab68de25d43d?auto=format&fit=crop&w=1800&q=85',
      badge: 'SPRING / SUMMER 2026 COUTURE',
      headline: 'STYLE THAT DEFINES YOU',
      subheading: 'Discover fashion that speaks your personality. Explore the latest collections at Velmira.',
      primaryBtnText: 'SHOP NOW',
      primaryBtnLink: '/products',
      secondaryBtnText: 'EXPLORE COLLECTION',
      secondaryBtnLink: '/products?category=New%20Arrivals',
      alignment: 'left'
    },
    {
      id: 2,
      image: 'https://images.unsplash.com/photo-1583391733956-3750e0ff4e8b?auto=format&fit=crop&w=1800&q=85',
      badge: 'ROYAL HERITAGE ATELIER',
      headline: 'TIMELESS INDIAN REGALIA',
      subheading: 'Handcrafted Varanasi Katan Silks, Dabka Lehengas & Imperial Zardozi Sherwanis.',
      primaryBtnText: 'SHOP ETHNIC',
      primaryBtnLink: '/products?category=Ethnic%20Wear',
      secondaryBtnText: 'VIEW BRIDAL',
      secondaryBtnLink: '/products?category=Sale',
      alignment: 'center'
    },
    {
      id: 3,
      image: 'https://images.unsplash.com/photo-1507679799987-c73779587ccf?auto=format&fit=crop&w=1800&q=85',
      badge: 'MILANESE SARTORIAL EXCELLENCE',
      headline: 'THE MODERN GENTLEMAN',
      subheading: 'Precision-tailored Italian virgin wool blazers, Goodyear footwear and Swiss automatic timepieces.',
      primaryBtnText: 'EXPLORE MEN',
      primaryBtnLink: '/products?category=Men',
      secondaryBtnText: 'ACCESSORIES',
      secondaryBtnLink: '/products?category=Accessories',
      alignment: 'left'
    }
  ];

  const [currentSlide, setCurrentSlide] = useState(0);
  const [isPaused, setIsPaused] = useState(false);

  useEffect(() => {
    if (isPaused) return;
    const interval = setInterval(() => {
      setCurrentSlide(prev => (prev + 1) % slides.length);
    }, 6000);
    return () => clearInterval(interval);
  }, [isPaused, slides.length]);

  const prevSlide = () => {
    setCurrentSlide(prev => (prev === 0 ? slides.length - 1 : prev - 1));
  };

  const nextSlide = () => {
    setCurrentSlide(prev => (prev + 1) % slides.length);
  };

  return (
    <div
      className="relative w-full h-[460px] sm:h-[540px] lg:h-[620px] bg-stone-950 overflow-hidden"
      onMouseEnter={() => setIsPaused(true)}
      onMouseLeave={() => setIsPaused(false)}
    >
      {/* Slides Container */}
      {slides.map((slide, index) => {
        const isActive = index === currentSlide;
        return (
          <div
            key={slide.id}
            className={`absolute inset-0 transition-opacity duration-1000 ease-in-out ${
              isActive ? 'opacity-100 z-10' : 'opacity-0 z-0 pointer-events-none'
            }`}
          >
            {/* Background Lifestyle Photography with Gradient Overlay */}
            <div className="absolute inset-0 bg-gradient-to-r from-black/85 via-black/55 to-black/20 z-1" />
            <img
              src={slide.image}
              alt={slide.headline}
              className={`w-full h-full object-cover object-center transition-transform duration-10000 ${
                isActive ? 'scale-105' : 'scale-100'
              }`}
            />

            {/* Slide Text Content */}
            <div className="absolute inset-0 z-10 max-w-7xl mx-auto px-6 sm:px-12 flex flex-col justify-center">
              <div
                className={`max-w-2xl text-white ${
                  slide.alignment === 'center' ? 'mx-auto text-center' : ''
                }`}
              >
                {/* Badge */}
                <div
                  className={`inline-flex items-center space-x-1.5 px-3 py-1 rounded-full bg-white/10 backdrop-blur-md border border-white/20 text-[#D4AF37] text-[10px] sm:text-xs font-semibold tracking-widest uppercase mb-4 ${
                    slide.alignment === 'center' ? 'mx-auto' : ''
                  }`}
                >
                  <Sparkles className="w-3.5 h-3.5" />
                  <span>{slide.badge}</span>
                </div>

                {/* Main Headline */}
                <h1 className="font-cinzel text-3xl sm:text-5xl lg:text-6xl font-black tracking-tight text-white leading-tight drop-shadow-md">
                  {slide.headline}
                </h1>

                {/* Subheading */}
                <p className="mt-4 text-stone-200 text-xs sm:text-base lg:text-lg leading-relaxed max-w-xl font-light drop-shadow">
                  {slide.subheading}
                </p>

                {/* CTA Action Buttons */}
                <div
                  className={`mt-8 flex flex-wrap gap-3 sm:gap-4 ${
                    slide.alignment === 'center' ? 'justify-center' : ''
                  }`}
                >
                  <Link
                    to={slide.primaryBtnLink}
                    className="px-7 py-3 rounded-full bg-[#D4AF37] text-black hover:bg-[#c5a059] font-bold text-xs sm:text-sm tracking-widest uppercase shadow-lg hover:shadow-xl transition flex items-center space-x-2 group"
                  >
                    <span>{slide.primaryBtnText}</span>
                    <ArrowRight className="w-4 h-4 transition-transform group-hover:translate-x-1" />
                  </Link>
                  <Link
                    to={slide.secondaryBtnLink}
                    className="px-7 py-3 rounded-full bg-white/10 hover:bg-white/20 backdrop-blur-md text-white border border-white/30 font-semibold text-xs sm:text-sm tracking-widest uppercase transition"
                  >
                    {slide.secondaryBtnText}
                  </Link>
                </div>
              </div>
            </div>
          </div>
        );
      })}

      {/* Navigation Arrows */}
      <button
        onClick={prevSlide}
        className="absolute left-4 top-1/2 -translate-y-1/2 z-20 p-2.5 rounded-full bg-black/40 hover:bg-black/70 text-white/80 hover:text-white backdrop-blur-xs transition border border-white/10"
        aria-label="Previous Slide"
      >
        <ChevronLeft className="w-5 h-5" />
      </button>

      <button
        onClick={nextSlide}
        className="absolute right-4 top-1/2 -translate-y-1/2 z-20 p-2.5 rounded-full bg-black/40 hover:bg-black/70 text-white/80 hover:text-white backdrop-blur-xs transition border border-white/10"
        aria-label="Next Slide"
      >
        <ChevronRight className="w-5 h-5" />
      </button>

      {/* Slide Indicator Dots */}
      <div className="absolute bottom-6 left-1/2 -translate-x-1/2 z-20 flex items-center space-x-2.5">
        {slides.map((_, i) => (
          <button
            key={i}
            onClick={() => setCurrentSlide(i)}
            className={`transition-all duration-300 rounded-full ${
              i === currentSlide
                ? 'w-8 h-2 bg-[#D4AF37]'
                : 'w-2 h-2 bg-white/40 hover:bg-white/70'
            }`}
            aria-label={`Go to slide ${i + 1}`}
          />
        ))}
      </div>
    </div>
  );
};
