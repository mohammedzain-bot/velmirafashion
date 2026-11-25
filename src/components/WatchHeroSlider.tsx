import React, { useState, useEffect, useRef } from 'react';
import { Link } from 'react-router-dom';
import { ChevronLeft, ChevronRight, MessageCircle, Sparkles, ArrowRight } from 'lucide-react';
import { OFFICIAL_WHATSAPP_NUMBER, WHATSAPP_RAW_NUMBER } from '../utils/whatsapp';

export interface WatchSlide {
  id: string;
  image: string;
  tagline: string;
  title: string;
  subtitle: string;
  price: string;
  priceAED: string;
  category: string;
  link: string;
  badge: string;
}

export const WATCH_SLIDES: WatchSlide[] = [
  {
    id: 'slide-1',
    image: '/watches/seiko-collection-vault.jpg',
    tagline: 'EXCLUSIVE HOROLOGY VAULT',
    title: 'THE COLLECTOR’S AUTOMATIC CALIBRE SUITE',
    subtitle: 'Triple sunburst emerald, cyan & ivory dials encased in solid brushed steel with day-date complication.',
    price: '₹14,999',
    priceAED: 'AED 660',
    category: "Men's Watches",
    link: '/watches/prod-w1',
    badge: 'COLLECTOR’S EDITION'
  },
  {
    id: 'slide-2',
    image: '/watches/cartier-boutique-display.jpg',
    tagline: 'HAUTE HORLOGERIE SHOWCASE',
    title: 'SANTOS GEOMETRIC BOUTIQUE EDITION',
    subtitle: 'Classic Roman indices, polished cabochon crown, and dual-tone brushed silver deployant bracelet.',
    price: '₹24,999',
    priceAED: 'AED 1,090',
    category: 'Luxury Watches',
    link: '/watches/prod-w3',
    badge: 'BOUTIQUE CURATION'
  },
  {
    id: 'slide-3',
    image: '/watches/hublot-chrono-lounge.jpg',
    tagline: 'NIGHT LOUNGE COMPLICATION',
    title: 'TITANIUM CHRONO-MONOPUSHER & FLUTED STEEL',
    subtitle: 'Exhibition skeleton subdials with tactile saddle-stitched leather and coin-edge bezel.',
    price: '₹28,500',
    priceAED: 'AED 1,250',
    category: "Men's Watches",
    link: '/watches/prod-w4',
    badge: 'LIMITED ALLOCATION'
  },
  {
    id: 'slide-4',
    image: '/watches/tissot-silver-chronograph.jpg',
    tagline: 'SWISS HERITAGE CHRONOMETER',
    title: 'SILVER SUNBURST TACHYMÈTRE',
    subtitle: 'Pure silver sunburst face with triple chronometer subdials and hand-finished cognac alligator leather.',
    price: '₹18,999',
    priceAED: 'AED 830',
    category: 'Classic Watches',
    link: '/watches/prod-w5',
    badge: 'CHRONOMETER CERTIFIED'
  },
  {
    id: 'slide-5',
    image: '/watches/emerald-purple-automatic.jpg',
    tagline: 'MAHOGANY VAULT SERIES',
    title: 'ROYAL SUNBURST EMERALD & VIOLET AUTOMATIC',
    subtitle: 'Luminescent gold baton hands with 21-jewel self-winding rotor and quickset day-date.',
    price: '₹13,499',
    priceAED: 'AED 590',
    category: "Men's Watches",
    link: '/watches/prod-w2',
    badge: 'BESTSELLER'
  },
  {
    id: 'slide-6',
    image: '/watches/vintage-silver-digital.jpg',
    tagline: 'MINIMAL STEEL HOROLOGY',
    title: 'HERITAGE STEEL DIGITAL & DUAL-TIME ANA-DIGI',
    subtitle: 'Retrograde architectural geometry in full brushed 316L stainless steel with electro-luminescence.',
    price: '₹7,999',
    priceAED: 'AED 350',
    category: 'Minimal Watches',
    link: '/watches/prod-w6',
    badge: 'ARCHIVE CLASSIC'
  },
  {
    id: 'slide-7',
    image: '/watches/horology-atelier-vintage.jpg',
    tagline: 'TIMELESS WORKSHOP HERITAGE',
    title: 'VINTAGE ATELIER MECHANICAL RESTORATIONS',
    subtitle: 'Handcrafted master escapements, antique steel links, and timeless chronometric precision.',
    price: '₹16,500',
    priceAED: 'AED 720',
    category: 'Classic Watches',
    link: '/watches/prod-w7',
    badge: 'MASTER CRAFT'
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

  useEffect(() => {
    if (!isPaused) {
      timerRef.current = setInterval(() => {
        nextSlide();
      }, 5500);
    }
    return () => {
      if (timerRef.current) clearInterval(timerRef.current);
    };
  }, [currentIndex, isPaused]);

  const current = WATCH_SLIDES[currentIndex];

  return (
    <section 
      className="relative bg-[#0B0D12] text-white overflow-hidden border-b border-[#2A3142] select-none"
      onMouseEnter={() => setIsPaused(true)}
      onMouseLeave={() => setIsPaused(false)}
      aria-label="Cinematic Watch Hero Slideshow"
    >
      {/* Background Cinematic Atmosphere */}
      <div className="absolute inset-0 bg-radial from-[#1A2234]/40 via-[#0B0D12]/80 to-[#0B0D12] pointer-events-none" />

      {/* Main Slide Grid */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12 sm:py-16 lg:py-20 relative z-10">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-12 items-center min-h-[500px] lg:min-h-[560px]">
          
          {/* Left: Text Editorial Content with Smooth Fade Animation */}
          <div className="lg:col-span-6 space-y-6">
            <div className="flex items-center space-x-2">
              <span className="px-2.5 py-0.5 rounded-full bg-[#D4AF37]/20 border border-[#D4AF37]/50 text-[#D4AF37] font-mono font-bold text-[10px] tracking-widest uppercase">
                {current.badge}
              </span>
              <span className="text-[#94A3B8] text-[11px] font-mono tracking-wider">
                0{currentIndex + 1} / 0{totalSlides}
              </span>
            </div>

            <div className="space-y-3">
              <p className="text-[11px] sm:text-xs font-semibold tracking-[0.3em] uppercase text-[#C5A059]">
                {current.tagline}
              </p>
              <h1 className="font-serif text-3xl sm:text-5xl lg:text-6xl font-bold tracking-[0.04em] text-white leading-[1.1] transition-all duration-500">
                {current.title}
              </h1>
              <p className="text-[#CBD5E1] text-xs sm:text-sm font-sans leading-relaxed max-w-xl transition-all duration-500">
                {current.subtitle}
              </p>
            </div>

            {/* Price & Delivery Highlights */}
            <div className="flex items-baseline space-x-3 pt-2">
              <span className="font-mono text-2xl sm:text-3xl font-bold text-[#E5B869]">
                {current.price}
              </span>
              <span className="font-mono text-xs text-[#94A3B8]">
                / {current.priceAED}
              </span>
              <span className="text-[11px] text-[#A0AEC0] border-l border-[#2A3142] pl-3">
                Insured White-Glove Delivery (India & UAE)
              </span>
            </div>

            {/* Action Buttons */}
            <div className="pt-3 flex flex-col sm:flex-row items-stretch sm:items-center gap-3">
              <Link
                to={current.link}
                className="px-7 py-3.5 rounded-xl bg-[#D4AF37] hover:bg-[#E5B869] text-[#0B0D12] font-serif font-bold text-xs tracking-[0.2em] uppercase transition flex items-center justify-center space-x-2 shadow-lg shadow-[#D4AF37]/15"
              >
                <span>VIEW TIMEPIECE</span>
                <ArrowRight className="w-4 h-4" />
              </Link>

              <a
                href={`https://wa.me/${WHATSAPP_RAW_NUMBER}?text=${encodeURIComponent(`Hello Velmira Concierge, I am interested in ordering: ${current.title} (${current.price}). Please confirm availability.`)}`}
                target="_blank"
                rel="noreferrer"
                className="px-7 py-3.5 rounded-xl bg-[#161A23] hover:bg-[#202634] border border-[#CBD5E1]/30 text-white font-serif font-semibold text-xs tracking-[0.2em] uppercase transition flex items-center justify-center space-x-2"
              >
                <MessageCircle className="w-4 h-4 text-[#D4AF37]" />
                <span>INQUIRE ON WHATSAPP</span>
              </a>
            </div>

            {/* Slide Indicators & Navigation Controls */}
            <div className="pt-6 flex items-center space-x-4 border-t border-[#2A3142]/80">
              <div className="flex items-center space-x-2">
                <button
                  onClick={prevSlide}
                  aria-label="Previous Slide"
                  className="p-2.5 rounded-xl bg-[#161A23] hover:bg-[#202634] border border-[#2A3142] text-white hover:text-[#D4AF37] transition"
                >
                  <ChevronLeft className="w-4 h-4" />
                </button>
                <button
                  onClick={nextSlide}
                  aria-label="Next Slide"
                  className="p-2.5 rounded-xl bg-[#161A23] hover:bg-[#202634] border border-[#2A3142] text-white hover:text-[#D4AF37] transition"
                >
                  <ChevronRight className="w-4 h-4" />
                </button>
              </div>

              {/* Progress bars */}
              <div className="flex-1 flex items-center space-x-1.5">
                {WATCH_SLIDES.map((slide, idx) => (
                  <button
                    key={slide.id}
                    onClick={() => setCurrentIndex(idx)}
                    aria-label={`Jump to slide ${idx + 1}`}
                    className={`h-1.5 rounded-full transition-all duration-300 ${
                      currentIndex === idx
                        ? 'w-8 bg-[#D4AF37]'
                        : 'w-2 bg-[#2A3142] hover:bg-[#94A3B8]'
                    }`}
                  />
                ))}
              </div>
            </div>
          </div>

          {/* Right: Large Cinematic Image with Luxury Frame */}
          <div className="lg:col-span-6 relative">
            <div className="relative mx-auto max-w-md lg:max-w-lg aspect-[4/5] rounded-2xl overflow-hidden border border-[#CBD5E1]/30 shadow-2xl shadow-black/80 group">
              <img
                src={current.image}
                alt={current.title}
                key={current.image}
                className="w-full h-full object-cover object-center transition-all duration-700 ease-out group-hover:scale-105"
              />

              {/* Subtle Atmospheric Vignette */}
              <div className="absolute inset-0 bg-gradient-to-t from-[#0B0D12]/90 via-transparent to-black/20 pointer-events-none" />

              {/* Floating Bottom Card */}
              <div className="absolute bottom-4 left-4 right-4 bg-[#10141D]/90 backdrop-blur-md border border-[#CBD5E1]/30 p-3.5 rounded-xl flex items-center justify-between">
                <div>
                  <span className="text-[10px] text-[#C5A059] uppercase tracking-widest font-mono block">
                    Authentic Atelier Photograph
                  </span>
                  <p className="text-xs font-serif font-bold text-white truncate max-w-[240px]">
                    {current.title}
                  </p>
                </div>
                <Link
                  to={current.link}
                  className="px-3 py-1.5 rounded-lg bg-[#D4AF37] text-[#0B0D12] text-[10px] font-bold tracking-wider uppercase font-sans hover:bg-[#E5B869] transition shrink-0"
                >
                  DETAILS
                </Link>
              </div>
            </div>

            {/* Thumbnail Strip underneath on larger screens */}
            <div className="hidden sm:flex items-center gap-2 mt-4 overflow-x-auto pb-1 scrollbar-none">
              {WATCH_SLIDES.map((slide, idx) => (
                <button
                  key={slide.id}
                  onClick={() => setCurrentIndex(idx)}
                  className={`w-14 h-14 rounded-lg overflow-hidden border-2 transition-all shrink-0 ${
                    currentIndex === idx
                      ? 'border-[#D4AF37] scale-105 shadow-md'
                      : 'border-[#2A3142] opacity-60 hover:opacity-100'
                  }`}
                >
                  <img src={slide.image} alt={slide.title} className="w-full h-full object-cover" />
                </button>
              ))}
            </div>
          </div>

        </div>
      </div>
    </section>
  );
};