import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { ChevronLeft, ChevronRight, Sparkles, ArrowRight, MessageCircle } from 'lucide-react';
import { WHATSAPP_RAW_NUMBER } from '../utils/whatsapp';

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
  isWhatsAppSecondary?: boolean;
}

export const HeroSlider: React.FC = () => {
  const slides: Slide[] = [
    {
      id: 1,
      image: 'https://images.unsplash.com/photo-1522335789203-aabd1fc54bc9?auto=format&fit=crop&w=1800&q=85',
      badge: 'SWISS AUTOMATIC MOVEMENTS',
      headline: 'STYLE THAT DEFINES YOU',
      subheading: 'Precision engineered automatic chronographs and grand complications. White-glove insured delivery across India & UAE.',
      primaryBtnText: 'EXPLORE TIMEPIECES',
      primaryBtnLink: '/products',
      secondaryBtnText: 'WHATSAPP CONCIERGE',
      secondaryBtnLink: `https://wa.me/${WHATSAPP_RAW_NUMBER}?text=${encodeURIComponent('Hello Velmira Concierge, I would like to inquire about your luxury automatic timepieces.')}`,
      isWhatsAppSecondary: true
    },
    {
      id: 2,
      image: 'https://images.unsplash.com/photo-1509042239860-f550ce710b93?auto=format&fit=crop&w=1800&q=85',
      badge: 'HAUTE HORLOGERIE MASTERPIECES',
      headline: 'THE CELESTIAL TOURBILLON',
      subheading: 'Gravity-defying flying tourbillon cage with dual sapphire crystal exhibition caseback and 72-hour power autonomy.',
      primaryBtnText: 'VIEW TOURBILLONS',
      primaryBtnLink: '/products?category=Tourbillon',
      secondaryBtnText: 'ORDER ON WHATSAPP',
      secondaryBtnLink: `https://wa.me/${WHATSAPP_RAW_NUMBER}?text=${encodeURIComponent('Hello Velmira Concierge, I would like to order the Celestial Flying Tourbillon.')}`,
      isWhatsAppSecondary: true
    },
    {
      id: 3,
      image: 'https://images.unsplash.com/photo-1524805444758-089113d48a6d?auto=format&fit=crop&w=1800&q=85',
      badge: 'ARCHITECTURAL OPENWORK SKELETONS',
      headline: 'PURE MECHANICAL ART',
      subheading: 'Ruthenium-coated bridges, 28,800 vph beating balance wheel, and double domed sapphire glass with lifetime atelier support.',
      primaryBtnText: 'EXPLORE SKELETONS',
      primaryBtnLink: '/products?category=Skeleton',
      secondaryBtnText: 'WHATSAPP CONCIERGE',
      secondaryBtnLink: `https://wa.me/${WHATSAPP_RAW_NUMBER}?text=${encodeURIComponent('Hello Velmira Horology Team, I would like to inquire about the skeleton automatic watches.')}`,
      isWhatsAppSecondary: true
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
      {slides.map((slide, index) => {
        const isActive = index === currentSlide;
        return (
          <div
            key={slide.id}
            className={`absolute inset-0 transition-opacity duration-1000 ease-in-out ${
              isActive ? 'opacity-100 z-10' : 'opacity-0 z-0 pointer-events-none'
            }`}
          >
            {/* Gradient Overlays */}
            <div className="absolute inset-0 bg-gradient-to-r from-black/90 via-black/60 to-black/30 z-1" />
            <img
              src={slide.image}
              alt={slide.headline}
              className={`w-full h-full object-cover object-center transition-transform duration-10000 ${
                isActive ? 'scale-105' : 'scale-100'
              }`}
            />

            {/* Slide Content */}
            <div className="absolute inset-0 z-10 max-w-7xl mx-auto px-6 sm:px-12 flex flex-col justify-center">
              <div className="max-w-2xl text-white">
                <div className="inline-flex items-center space-x-1.5 px-3 py-1 rounded-full bg-white/10 backdrop-blur-md border border-white/20 text-[#D4AF37] text-[10px] sm:text-xs font-semibold tracking-widest uppercase mb-4">
                  <Sparkles className="w-3.5 h-3.5" />
                  <span>{slide.badge}</span>
                </div>

                <h1 className="font-cinzel text-3xl sm:text-5xl lg:text-6xl font-black tracking-tight text-white leading-tight drop-shadow-md">
                  {slide.headline}
                </h1>

                <p className="mt-4 text-stone-200 text-xs sm:text-base lg:text-lg leading-relaxed max-w-xl font-light drop-shadow">
                  {slide.subheading}
                </p>

                {/* Buttons */}
                <div className="mt-8 flex flex-wrap gap-3 sm:gap-4">
                  <Link
                    to={slide.primaryBtnLink}
                    className="px-7 py-3 rounded-full bg-[#D4AF37] text-black hover:bg-[#c5a059] font-bold text-xs sm:text-sm tracking-widest uppercase shadow-lg transition flex items-center space-x-2 group"
                  >
                    <span>{slide.primaryBtnText}</span>
                    <ArrowRight className="w-4 h-4 transition-transform group-hover:translate-x-1" />
                  </Link>

                  {slide.isWhatsAppSecondary ? (
                    <a
                      href={slide.secondaryBtnLink}
                      target="_blank"
                      rel="noreferrer"
                      className="px-7 py-3 rounded-full bg-emerald-600 hover:bg-emerald-700 text-white font-bold text-xs sm:text-sm tracking-widest uppercase transition flex items-center space-x-2 shadow-lg"
                    >
                      <MessageCircle className="w-4 h-4 fill-white" />
                      <span>{slide.secondaryBtnText}</span>
                    </a>
                  ) : (
                    <Link
                      to={slide.secondaryBtnLink}
                      className="px-7 py-3 rounded-full bg-white/10 hover:bg-white/20 backdrop-blur-md text-white border border-white/30 font-semibold text-xs sm:text-sm tracking-widest uppercase transition"
                    >
                      {slide.secondaryBtnText}
                    </Link>
                  )}
                </div>
              </div>
            </div>
          </div>
        );
      })}

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
            aria-label={`Slide ${i + 1}`}
          />
        ))}
      </div>
    </div>
  );
};
