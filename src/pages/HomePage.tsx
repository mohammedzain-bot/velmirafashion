import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { Sparkles, ArrowRight, Clock, MessageCircle } from 'lucide-react';
import { useShop } from '../context/ShopContext';
import { useCurrency } from '../context/CurrencyContext';
import { HeroSlider } from '../components/HeroSlider';
import { TrustBadges } from '../components/TrustBadges';
import { FeaturedCategories } from '../components/FeaturedCategories';
import { ProductSlider } from '../components/ProductSlider';
import { ProductCard } from '../components/ProductCard';
import { OFFICIAL_WHATSAPP_NUMBER, WHATSAPP_RAW_NUMBER } from '../utils/whatsapp';

export const HomePage: React.FC = () => {
  const { products } = useShop();
  const { country } = useCurrency();

  const trendingProducts = products.filter(p => p.isTrending);
  const bestSellers = products.filter(p => p.isBestSeller);
  const newArrivals = products.filter(p => p.isNewArrival);

  const [timeLeft, setTimeLeft] = useState({ hours: 7, minutes: 24, seconds: 48 });

  useEffect(() => {
    const timer = setInterval(() => {
      setTimeLeft(prev => {
        if (prev.seconds > 0) return { ...prev, seconds: prev.seconds - 1 };
        if (prev.minutes > 0) return { ...prev, minutes: 59, seconds: 59 };
        if (prev.hours > 0) return { hours: prev.hours - 1, minutes: 59, seconds: 59 };
        return { hours: 12, minutes: 0, seconds: 0 };
      });
    }, 1000);
    return () => clearInterval(timer);
  }, []);

  return (
    <div className="min-h-screen bg-[#F8F9FA]">
      {/* 1. Hero Lifestyle Slider */}
      <HeroSlider />

      {/* 2. Direct WhatsApp Dispatch Strip */}
      <section className="bg-emerald-800 text-white py-3.5 px-4 text-xs">
        <div className="max-w-7xl mx-auto flex flex-col sm:flex-row items-center justify-between gap-3 text-center sm:text-left">
          <div className="flex items-center space-x-2">
            <MessageCircle className="w-5 h-5 text-emerald-300 shrink-0" />
            <span>
              <strong>Dual India & UAE White-Glove Service:</strong> Ordering on WhatsApp directly routes your selection to <strong className="underline">{OFFICIAL_WHATSAPP_NUMBER}</strong> for instant VIP handling.
            </span>
          </div>
          <a
            href={`https://wa.me/${WHATSAPP_RAW_NUMBER}?text=${encodeURIComponent('Hello Velmira Concierge, I would like to inquire about your luxury watches and bags.')}`}
            target="_blank"
            rel="noreferrer"
            className="px-4 py-1.5 rounded-full bg-white text-emerald-900 font-bold uppercase tracking-wider text-[11px] hover:bg-emerald-50 shadow-sm shrink-0"
          >
            Chat with Concierge
          </a>
        </div>
      </section>

      {/* 3. Trust Assurance Strip */}
      <TrustBadges />

      {/* 4. Featured Categories Grid */}
      <FeaturedCategories />

      {/* 5. Flash Deals Banner */}
      <section className="py-6 bg-white border-y border-stone-200">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="bg-gradient-to-r from-[#0F0F0F] via-stone-900 to-[#1C1917] rounded-2xl p-6 sm:p-8 text-white relative overflow-hidden shadow-lg border border-[#D4AF37]/30">
            <div className="relative z-10 flex flex-col md:flex-row items-center justify-between gap-6">
              <div className="text-center md:text-left">
                <div className="inline-flex items-center space-x-2 text-[#D4AF37] text-xs font-bold uppercase tracking-widest mb-1">
                  <Sparkles className="w-3.5 h-3.5" />
                  <span>Exclusive Private Vault Event</span>
                </div>
                <h3 className="font-cinzel text-2xl sm:text-3xl font-bold tracking-wide">
                  The Horology & Saffiano Leather Showcase — Up to 55% OFF
                </h3>
                <p className="text-xs text-stone-300 mt-1 max-w-lg">
                  Precision Swiss automatic chronographs, 300M divers, and Italian full-grain calfskin leather totes. Direct delivery across {country === 'UAE' ? 'the UAE' : 'India'}.
                </p>
              </div>

              {/* Countdown clock */}
              <div className="flex items-center space-x-4">
                <div className="flex items-center space-x-2 bg-white/10 backdrop-blur-md px-4 py-2.5 rounded-xl border border-white/20">
                  <Clock className="w-4 h-4 text-[#D4AF37]" />
                  <div className="text-center font-mono">
                    <span className="text-base sm:text-lg font-bold text-white">
                      {String(timeLeft.hours).padStart(2, '0')}:{String(timeLeft.minutes).padStart(2, '0')}:{String(timeLeft.seconds).padStart(2, '0')}
                    </span>
                    <span className="block text-[9px] uppercase tracking-wider text-stone-400">Vault Closes</span>
                  </div>
                </div>

                <Link
                  to="/products?category=Sale"
                  className="px-6 py-3 rounded-full bg-[#D4AF37] text-black font-bold text-xs uppercase tracking-widest hover:bg-[#c5a059] transition shadow-md whitespace-nowrap"
                >
                  Explore Vault
                </Link>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* 6. Trending Watches & Bags */}
      <ProductSlider
        title="Trending In Haute Horology & Leather"
        subtitle="The most sought-after chronographs and structured totes"
        products={trendingProducts}
        viewAllLink="/products?category=All"
      />

      {/* 7. Best Sellers */}
      <ProductSlider
        title="Velmira Best Sellers"
        subtitle="Cherished by connoisseurs across Mumbai, Delhi, Dubai & Abu Dhabi"
        products={bestSellers}
        viewAllLink="/products?category=All"
      />

      {/* 8. New Arrivals */}
      <ProductSlider
        title="Fresh Runway Horology"
        subtitle="Direct from Swiss watchmakers and Milanese leather ateliers"
        products={newArrivals}
        viewAllLink="/products?category=New%20Arrivals"
      />

      {/* 9. Comprehensive Recommendation Grid */}
      <section className="py-12 bg-[#F8F9FA]">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-end justify-between mb-8 pb-3 border-b border-stone-200">
            <div>
              <span className="text-[11px] font-bold uppercase tracking-widest text-[#D4AF37]">
                BESPOKE CURATION
              </span>
              <h2 className="font-cinzel text-2xl sm:text-3xl font-bold text-stone-900 tracking-wide mt-1">
                Luxury Watches & Handbags
              </h2>
              <p className="text-xs text-stone-500 mt-1">
                Authentic mechanical movements and handcrafted French/Italian leather creations
              </p>
            </div>
            <Link
              to="/products"
              className="text-xs font-semibold text-stone-800 hover:text-[#D4AF37] uppercase tracking-wider flex items-center space-x-1"
            >
              <span>Explore All ({products.length})</span>
              <ArrowRight className="w-3.5 h-3.5" />
            </Link>
          </div>

          <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 gap-4 sm:gap-6">
            {products.slice(0, 8).map(product => (
              <ProductCard key={product.id} product={product} />
            ))}
          </div>
        </div>
      </section>

      {/* 10. Featured Ateliers */}
      <section className="py-10 bg-white border-t border-stone-200">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <p className="text-[11px] font-bold uppercase tracking-[0.25em] text-stone-400 mb-6">
            HOROLOGY & LEATHER HOUSES
          </p>
          <div className="flex flex-wrap items-center justify-center gap-8 sm:gap-14 text-stone-500 font-cinzel text-sm sm:text-base tracking-widest">
            <span className="hover:text-stone-900 transition">VELMIRA HOROLOGY</span>
            <span className="hover:text-stone-900 transition">AURELIA SAFFIANO</span>
            <span className="hover:text-stone-900 transition">VALENTINO MILANO</span>
            <span className="hover:text-stone-900 transition">MONTE CARLO ATELIER</span>
          </div>
        </div>
      </section>
    </div>
  );
};
