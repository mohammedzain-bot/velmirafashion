import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { 
  ArrowRight, 
  MessageSquare, 
  Watch, 
  Clock, 
  Activity, 
  Compass, 
  ShieldCheck, 
  Award, 
  Sparkles,
  ChevronDown
} from 'lucide-react';
import { useShop } from '../context/ShopContext';
import { useCurrency } from '../context/CurrencyContext';
import { HeroSlider } from '../components/HeroSlider';
import { ProductCard } from '../components/ProductCard';
import { OFFICIAL_WHATSAPP_NUMBER, WHATSAPP_RAW_NUMBER } from '../utils/whatsapp';
import { CategoryType } from '../types';

export const HomePage: React.FC = () => {
  const { products } = useShop();
  const { country } = useCurrency();
  const [selectedCategory, setSelectedCategory] = useState<CategoryType | 'All'>('All');
  const [scrolledPastHero, setScrolledPastHero] = useState<boolean>(false);

  // Monitor scroll for smooth scroll-indicator fade
  useEffect(() => {
    const handleScroll = () => {
      setScrolledPastHero(window.scrollY > 200);
    };
    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const filterTabs: { label: string; value: CategoryType | 'All'; icon: React.ElementType }[] = [
    { label: 'All Timepieces', value: 'All', icon: Watch },
    { label: 'Chronographs', value: 'Chronograph', icon: Clock },
    { label: 'Automatics', value: 'Automatic', icon: Watch },
    { label: 'Tourbillons', value: 'Tourbillon', icon: Activity },
    { label: 'Divers (300M+)', value: 'Diver', icon: Compass },
    { label: 'Skeleton', value: 'Skeleton', icon: Award },
    { label: 'Moonphase', value: 'Moonphase', icon: Sparkles },
    { label: 'Classic Dress', value: 'Classic Dress', icon: ShieldCheck }
  ];

  const displayedProducts = selectedCategory === 'All'
    ? products
    : products.filter(p => p.category === selectedCategory || p.subcategory.toLowerCase().includes(selectedCategory.toLowerCase()));

  return (
    <div className="min-h-screen bg-[#0A0A0A] text-white">
      {/* 1. Hero Lifestyle Horology Stage */}
      <section className="relative">
        <HeroSlider />

        {/* Minimal Scroll Indicator */}
        <div 
          className={`absolute bottom-6 left-1/2 -translate-x-1/2 z-20 flex flex-col items-center space-y-2 pointer-events-none transition-all duration-700 ${
            scrolledPastHero ? 'opacity-0 translate-y-3' : 'opacity-85 translate-y-0'
          }`}
        >
          <span className="text-[9px] uppercase tracking-[0.3em] font-cinzel text-stone-300">
            Scroll to Explore
          </span>
          <div className="w-5 h-8 rounded-full border border-stone-400/60 flex items-start justify-center p-1">
            <div className="w-1 h-2 rounded-full bg-[#D4AF37] animate-bounce" />
          </div>
        </div>
      </section>

      {/* 2. Ultra-Minimal Horology Assurance Strip */}
      <section className="py-6 border-y border-stone-800/80 bg-[#0E0E0E]">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4 text-center">
            <div className="flex flex-col items-center justify-center p-3">
              <span className="font-cinzel text-xs font-bold tracking-widest text-[#D4AF37] uppercase">
                Swiss Calibres
              </span>
              <span className="text-[11px] text-stone-400 mt-0.5">
                28,800 VPH Automatic Movements
              </span>
            </div>

            <div className="flex flex-col items-center justify-center p-3 border-l border-stone-800/80">
              <span className="font-cinzel text-xs font-bold tracking-widest text-[#D4AF37] uppercase">
                Dual Atelier Hubs
              </span>
              <span className="text-[11px] text-stone-400 mt-0.5">
                Direct Delivery to India & UAE
              </span>
            </div>

            <div className="flex flex-col items-center justify-center p-3 border-l-0 md:border-l border-stone-800/80">
              <span className="font-cinzel text-xs font-bold tracking-widest text-[#D4AF37] uppercase">
                Sapphire Crystal
              </span>
              <span className="text-[11px] text-stone-400 mt-0.5">
                Scratchproof Anti-Reflective Glass
              </span>
            </div>

            <div className="flex flex-col items-center justify-center p-3 border-l border-stone-800/80">
              <span className="font-cinzel text-xs font-bold tracking-widest text-[#D4AF37] uppercase">
                WhatsApp VIP Service
              </span>
              <span className="text-[11px] text-stone-400 mt-0.5">
                {OFFICIAL_WHATSAPP_NUMBER}
              </span>
            </div>
          </div>
        </div>
      </section>

      {/* 3. The Architecture of Precision — Minimalist Scroll Showcase */}
      <section className="py-16 sm:py-24 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center max-w-2xl mx-auto mb-14">
          <span className="text-[10px] font-bold uppercase tracking-[0.35em] text-[#D4AF37]">
            THE HOROLOGICAL STANDARD
          </span>
          <h2 className="font-cinzel text-2xl sm:text-4xl font-bold text-white tracking-wide mt-2">
            Engineered Without Compromise
          </h2>
          <div className="w-12 h-[1.5px] bg-[#D4AF37] mx-auto mt-4 mb-3" />
          <p className="text-xs sm:text-sm text-stone-400 leading-relaxed font-sans">
            Every Velmira timepiece is assembled with mathematical exactitude. Discover the four pillars of our manufacture.
          </p>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
          {/* Pillar 1 */}
          <div className="bg-[#121212] border border-stone-800/90 rounded-2xl p-6 sm:p-7 hover:border-[#D4AF37]/50 transition-all duration-300 group">
            <div className="text-[10px] font-mono text-[#D4AF37] font-semibold tracking-widest mb-3">
              01 // OPTICS
            </div>
            <h3 className="font-cinzel text-base font-bold text-white group-hover:text-[#D4AF37] transition">
              Double Domed Sapphire
            </h3>
            <p className="text-xs text-stone-400 mt-2 leading-relaxed">
              9 Mohs scale hardness, second only to diamond. Internal multi-layer anti-reflective treatment ensures crystal-clear dial legibility under harsh sunlight.
            </p>
          </div>

          {/* Pillar 2 */}
          <div className="bg-[#121212] border border-stone-800/90 rounded-2xl p-6 sm:p-7 hover:border-[#D4AF37]/50 transition-all duration-300 group">
            <div className="text-[10px] font-mono text-[#D4AF37] font-semibold tracking-widest mb-3">
              02 // HEARTBEAT
            </div>
            <h3 className="font-cinzel text-base font-bold text-white group-hover:text-[#D4AF37] transition">
              28,800 VPH Calibres
            </h3>
            <p className="text-xs text-stone-400 mt-2 leading-relaxed">
              High-beat 4Hz automatic mechanical escapements with 24 to 28 synthetic rubies, self-winding bidirectional rotors, and 42 to 72 hour power reserves.
            </p>
          </div>

          {/* Pillar 3 */}
          <div className="bg-[#121212] border border-stone-800/90 rounded-2xl p-6 sm:p-7 hover:border-[#D4AF37]/50 transition-all duration-300 group">
            <div className="text-[10px] font-mono text-[#D4AF37] font-semibold tracking-widest mb-3">
              03 // DIAL
            </div>
            <h3 className="font-cinzel text-base font-bold text-white group-hover:text-[#D4AF37] transition">
              Sunburst & Guilloché
            </h3>
            <p className="text-xs text-stone-400 mt-2 leading-relaxed">
              Engine-turned geometrical guilloché patterns and radial sunburst brushing that catch light from every angle, complemented by diamond-cut luminescent hands.
            </p>
          </div>

          {/* Pillar 4 */}
          <div className="bg-[#121212] border border-stone-800/90 rounded-2xl p-6 sm:p-7 hover:border-[#D4AF37]/50 transition-all duration-300 group">
            <div className="text-[10px] font-mono text-[#D4AF37] font-semibold tracking-widest mb-3">
              04 // ARMOR
            </div>
            <h3 className="font-cinzel text-base font-bold text-white group-hover:text-[#D4AF37] transition">
              316L Surgical Steel
            </h3>
            <p className="text-xs text-stone-400 mt-2 leading-relaxed">
              Satin-brushed and hand-polished bevelled edges forged from low-carbon surgical marine stainless steel, offering absolute resistance to magnetic fields and salt.
            </p>
          </div>
        </div>
      </section>

      {/* 4. Curated Timepiece Catalog with Minimalist Filter Pills */}
      <section className="py-16 bg-[#0E0E0E] border-t border-stone-800/80">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex flex-col md:flex-row md:items-end justify-between gap-6 mb-10">
            <div>
              <span className="text-[10px] font-bold uppercase tracking-[0.3em] text-[#D4AF37]">
                THE COLLECTION
              </span>
              <h2 className="font-cinzel text-2xl sm:text-3xl font-bold text-white tracking-wide mt-1">
                Curated Timepieces
              </h2>
              <p className="text-xs text-stone-400 mt-1 max-w-lg">
                Explore our full manufacture catalog: Automatic chronographs, tourbillons, 300M divers, and ultra-thin dress watches.
              </p>
            </div>

            {/* Filter Pills */}
            <div className="flex items-center gap-1.5 overflow-x-auto pb-2 scrollbar-none">
              {filterTabs.map(tab => {
                const Icon = tab.icon;
                const isSelected = selectedCategory === tab.value;
                return (
                  <button
                    key={tab.value}
                    onClick={() => setSelectedCategory(tab.value)}
                    className={`flex items-center space-x-1.5 px-3.5 py-1.5 rounded-full text-xs font-medium tracking-wide transition-all duration-200 shrink-0 ${
                      isSelected
                        ? 'bg-[#D4AF37] text-black font-bold shadow-md'
                        : 'bg-stone-900 text-stone-300 border border-stone-800 hover:border-stone-700 hover:text-white'
                    }`}
                  >
                    <Icon className="w-3.5 h-3.5" />
                    <span>{tab.label}</span>
                  </button>
                );
              })}
            </div>
          </div>

          {/* Product Grid */}
          <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 gap-4 sm:gap-6">
            {displayedProducts.map(product => (
              <ProductCard key={product.id} product={product} />
            ))}
          </div>

          {displayedProducts.length === 0 && (
            <div className="py-16 text-center text-stone-500 text-xs">
              No timepieces found in this category.
            </div>
          )}

          <div className="mt-14 text-center">
            <Link
              to="/products"
              className="inline-flex items-center space-x-2 px-8 py-3 rounded-full bg-white text-black hover:bg-[#D4AF37] hover:text-black font-cinzel text-xs font-bold tracking-widest uppercase transition duration-300 shadow-sm"
            >
              <span>View All 12 Timepieces</span>
              <ArrowRight className="w-4 h-4" />
            </Link>
          </div>
        </div>
      </section>

      {/* 5. Minimalist Statement Banner */}
      <section className="py-20 bg-[#0A0A0A] border-t border-stone-800/80 text-center relative overflow-hidden">
        <div className="max-w-4xl mx-auto px-4 relative z-10">
          <span className="text-[10px] font-bold uppercase tracking-[0.4em] text-[#D4AF37]">
            VELMIRA PHILOSOPHY
          </span>
          <h2 className="font-cinzel text-2xl sm:text-4xl font-extrabold text-white tracking-widest uppercase mt-4 leading-relaxed">
            Time is not measured by clocks, <br className="hidden sm:inline" />
            but by the precision of moments.
          </h2>
          <div className="w-16 h-[1.5px] bg-[#D4AF37] mx-auto my-6" />
          <p className="text-xs sm:text-sm text-stone-400 max-w-xl mx-auto leading-relaxed">
            Crafted for watch connoisseurs who demand absolute mechanical purity and understated luxury. Insured door-to-door delivery across India and the United Arab Emirates.
          </p>

          <div className="mt-8 flex flex-wrap items-center justify-center gap-3">
            <a
              href={`https://wa.me/${WHATSAPP_RAW_NUMBER}?text=${encodeURIComponent('Hello Velmira Concierge, I would like to consult with your watch specialists.')}`}
              target="_blank"
              rel="noreferrer"
              className="inline-flex items-center space-x-2 px-6 py-2.5 rounded-full bg-[#D4AF37] text-black font-cinzel text-xs font-bold tracking-widest uppercase hover:bg-[#c5a059] transition shadow-md"
            >
              <MessageSquare className="w-4 h-4" />
              <span>Direct WhatsApp Concierge ({OFFICIAL_WHATSAPP_NUMBER})</span>
            </a>
          </div>
        </div>
      </section>
    </div>
  );
};
