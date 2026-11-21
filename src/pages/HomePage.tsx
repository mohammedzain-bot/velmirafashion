import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { ArrowRight, MessageSquare, Watch, Briefcase, Award } from 'lucide-react';
import { useShop } from '../context/ShopContext';
import { useCurrency } from '../context/CurrencyContext';
import { HeroSlider } from '../components/HeroSlider';
import { TrustBadges } from '../components/TrustBadges';
import { ProductCard } from '../components/ProductCard';
import { OFFICIAL_WHATSAPP_NUMBER, WHATSAPP_RAW_NUMBER } from '../utils/whatsapp';

type ActiveTab = 'all' | 'watches' | 'bags' | 'bestsellers';

export const HomePage: React.FC = () => {
  const { products } = useShop();
  const { country } = useCurrency();
  const [activeTab, setActiveTab] = useState<ActiveTab>('all');

  const watches = products.filter(p => p.category === 'Watches' || p.category === "Men's Watches" || p.category === "Women's Watches");
  const bags = products.filter(p => p.category === 'Bags' || p.category === 'Leather Bags' || p.category === 'Tote Bags' || p.category === 'Clutches & Wallets');
  const bestsellers = products.filter(p => p.isBestSeller);

  const displayedProducts = activeTab === 'watches'
    ? watches
    : activeTab === 'bags'
    ? bags
    : activeTab === 'bestsellers'
    ? bestsellers
    : products;

  return (
    <div className="min-h-screen bg-[#FDFDFD]">
      {/* 1. Hero Lifestyle Slider */}
      <HeroSlider />

      {/* 2. Refined Trust Assurance Strip */}
      <TrustBadges />

      {/* 3. The Two Pillars — Editorial Showcase (Watches & Bags) */}
      <section className="py-12 sm:py-16 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center max-w-2xl mx-auto mb-10">
          <span className="text-[10px] font-bold uppercase tracking-[0.3em] text-[#D4AF37]">
            VELMIRA ATELIERS
          </span>
          <h2 className="font-cinzel text-2xl sm:text-3xl font-bold text-stone-900 tracking-wide mt-1.5">
            Two Worlds of Craftsmanship
          </h2>
          <p className="text-xs sm:text-sm text-stone-500 mt-2 font-sans">
            Swiss precision automatic horology and Italian hand-stitched leather. Insured delivery across India & UAE.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 sm:gap-8">
          {/* Pillar 1: Timepieces */}
          <Link
            to="/products?category=Watches"
            className="group relative h-96 sm:h-[440px] rounded-2xl overflow-hidden shadow-sm hover:shadow-2xl transition-all duration-700 bg-stone-900"
          >
            <img
              src="https://images.unsplash.com/photo-1522335789203-aabd1fc54bc9?auto=format&fit=crop&w=1200&q=85"
              alt="Haute Horlogerie Timepieces"
              className="w-full h-full object-cover object-center transition-transform duration-1000 group-hover:scale-105"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-black/90 via-black/35 to-transparent" />
            <div className="absolute bottom-0 inset-x-0 p-8 flex items-end justify-between">
              <div>
                <div className="flex items-center space-x-1.5 text-[#D4AF37] text-xs font-bold uppercase tracking-widest mb-1.5">
                  <Watch className="w-4 h-4" />
                  <span>HAUTE HORLOGERIE</span>
                </div>
                <h3 className="font-cinzel text-2xl sm:text-3xl font-bold text-white tracking-wide">
                  Luxury Timepieces
                </h3>
                <p className="text-xs text-stone-300 mt-1.5 max-w-sm line-clamp-2">
                  Swiss automatic chronographs, 300M divers, and flying tourbillons crafted in 316L surgical steel.
                </p>
              </div>
              <div className="w-11 h-11 rounded-full bg-white/15 backdrop-blur-md border border-white/30 flex items-center justify-center text-white group-hover:bg-[#D4AF37] group-hover:text-black transition-all shrink-0 ml-4">
                <ArrowRight className="w-5 h-5 transition-transform group-hover:translate-x-1" />
              </div>
            </div>
          </Link>

          {/* Pillar 2: Designer Bags */}
          <Link
            to="/products?category=Bags"
            className="group relative h-96 sm:h-[440px] rounded-2xl overflow-hidden shadow-sm hover:shadow-2xl transition-all duration-700 bg-stone-900"
          >
            <img
              src="https://images.unsplash.com/photo-1584917865442-de89df76afd3?auto=format&fit=crop&w=1200&q=85"
              alt="Designer Leather Bags"
              className="w-full h-full object-cover object-center transition-transform duration-1000 group-hover:scale-105"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-black/90 via-black/35 to-transparent" />
            <div className="absolute bottom-0 inset-x-0 p-8 flex items-end justify-between">
              <div>
                <div className="flex items-center space-x-1.5 text-[#D4AF37] text-xs font-bold uppercase tracking-widest mb-1.5">
                  <Briefcase className="w-4 h-4" />
                  <span>LEATHER ATELIER</span>
                </div>
                <h3 className="font-cinzel text-2xl sm:text-3xl font-bold text-white tracking-wide">
                  Designer Handbags
                </h3>
                <p className="text-xs text-stone-300 mt-1.5 max-w-sm line-clamp-2">
                  Hand-stitched Italian Saffiano leather totes, French Box Calfskin Kelly bags, and structured satchels.
                </p>
              </div>
              <div className="w-11 h-11 rounded-full bg-white/15 backdrop-blur-md border border-white/30 flex items-center justify-center text-white group-hover:bg-[#D4AF37] group-hover:text-black transition-all shrink-0 ml-4">
                <ArrowRight className="w-5 h-5 transition-transform group-hover:translate-x-1" />
              </div>
            </div>
          </Link>
        </div>
      </section>

      {/* 4. Curated Catalog Showcase with Interactive Filter Tabs */}
      <section className="py-12 bg-white border-t border-stone-200/70">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex flex-col md:flex-row md:items-end justify-between gap-4 mb-8">
            <div>
              <span className="text-[10px] font-bold uppercase tracking-[0.3em] text-[#D4AF37]">
                THE CATALOG
              </span>
              <h2 className="font-cinzel text-2xl sm:text-3xl font-bold text-stone-900 tracking-wide mt-1">
                Curated Collection
              </h2>
              <p className="text-xs text-stone-500 mt-1">
                Explore our full spectrum of luxury timepieces and bespoke leather bags.
              </p>
            </div>

            {/* Filter Tabs */}
            <div className="flex flex-wrap items-center gap-2">
              <button
                onClick={() => setActiveTab('all')}
                className={`px-4 py-1.5 rounded-full text-xs font-medium transition ${
                  activeTab === 'all'
                    ? 'bg-[#0F0F0F] text-[#D4AF37] font-semibold'
                    : 'bg-stone-100 text-stone-600 hover:bg-stone-200'
                }`}
              >
                All Curations ({products.length})
              </button>
              <button
                onClick={() => setActiveTab('watches')}
                className={`px-4 py-1.5 rounded-full text-xs font-medium transition ${
                  activeTab === 'watches'
                    ? 'bg-[#0F0F0F] text-[#D4AF37] font-semibold'
                    : 'bg-stone-100 text-stone-600 hover:bg-stone-200'
                }`}
              >
                Timepieces ({watches.length})
              </button>
              <button
                onClick={() => setActiveTab('bags')}
                className={`px-4 py-1.5 rounded-full text-xs font-medium transition ${
                  activeTab === 'bags'
                    ? 'bg-[#0F0F0F] text-[#D4AF37] font-semibold'
                    : 'bg-stone-100 text-stone-600 hover:bg-stone-200'
                }`}
              >
                Designer Bags ({bags.length})
              </button>
              <button
                onClick={() => setActiveTab('bestsellers')}
                className={`px-4 py-1.5 rounded-full text-xs font-medium transition ${
                  activeTab === 'bestsellers'
                    ? 'bg-[#0F0F0F] text-[#D4AF37] font-semibold'
                    : 'bg-stone-100 text-stone-600 hover:bg-stone-200'
                }`}
              >
                Bestsellers ({bestsellers.length})
              </button>
            </div>
          </div>

          {/* Product Grid */}
          <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 gap-4 sm:gap-6">
            {displayedProducts.map(product => (
              <ProductCard key={product.id} product={product} />
            ))}
          </div>

          <div className="mt-10 text-center">
            <Link
              to="/products"
              className="inline-flex items-center space-x-2 px-8 py-3 rounded-full bg-[#0F0F0F] text-white hover:text-[#D4AF37] font-cinzel text-xs font-bold tracking-widest uppercase transition shadow-sm hover:shadow-md"
            >
              <span>View Full Catalog</span>
              <ArrowRight className="w-4 h-4" />
            </Link>
          </div>
        </div>
      </section>

      {/* 5. Quiet Luxury WhatsApp Concierge Consultation Strip */}
      <section className="py-12 bg-[#0F0F0F] text-white border-t border-stone-800">
        <div className="max-w-5xl mx-auto px-4 text-center">
          <div className="w-12 h-12 rounded-full bg-[#1C1C1C] border border-[#D4AF37]/40 flex items-center justify-center mx-auto mb-4 text-[#D4AF37]">
            <Award className="w-6 h-6" />
          </div>
          <h3 className="font-cinzel text-xl sm:text-2xl font-bold tracking-wide">
            Velmira Private Concierge
          </h3>
          <p className="text-xs sm:text-sm text-stone-400 max-w-xl mx-auto mt-2 leading-relaxed">
            Need styling advice or personalized sizing? Inquire directly with our horology and leather specialists in India and the UAE via WhatsApp.
          </p>
          <div className="mt-6">
            <a
              href={`https://wa.me/${WHATSAPP_RAW_NUMBER}?text=${encodeURIComponent('Hello Velmira Concierge, I would like to inquire about your luxury watches and bags.')}`}
              target="_blank"
              rel="noreferrer"
              className="inline-flex items-center space-x-2 px-6 py-2.5 rounded-full bg-[#D4AF37] text-black font-cinzel text-xs font-bold tracking-wider hover:bg-[#c5a059] transition shadow-md"
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
