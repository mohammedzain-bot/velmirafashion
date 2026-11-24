import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { ArrowRight, MessageSquare, ChevronRight, Check } from 'lucide-react';
import { useShop } from '../context/ShopContext';
import { useCurrency } from '../context/CurrencyContext';
import { ProductCard } from '../components/ProductCard';
import { OFFICIAL_WHATSAPP_NUMBER, WHATSAPP_RAW_NUMBER } from '../utils/whatsapp';

export const HomePage: React.FC = () => {
  const { products } = useShop();
  const { country } = useCurrency();

  // Categories defined as requested
  const categoriesList = [
    {
      name: "Men's Watches",
      categoryKey: "Men's Watches",
      subtitle: "Chronographs & Mechanical Calibres",
      image: "https://images.unsplash.com/photo-1522335789203-aabd1fc54bc9?auto=format&fit=crop&w=800&q=80"
    },
    {
      name: "Women's Watches",
      categoryKey: "Women's Watches",
      subtitle: "Diamond Bezels & Mother-of-Pearl",
      image: "https://images.unsplash.com/photo-1523275335684-37898b6baf30?auto=format&fit=crop&w=800&q=80"
    },
    {
      name: "Luxury Watches",
      categoryKey: "Luxury Watches",
      subtitle: "Flying Tourbillons & Skeletons",
      image: "https://images.unsplash.com/photo-1509042239860-f550ce710b93?auto=format&fit=crop&w=800&q=80"
    },
    {
      name: "Classic Watches",
      categoryKey: "Classic Watches",
      subtitle: "Vintage Cushion & Moonphase",
      image: "https://images.unsplash.com/photo-1524805444758-089113d48a6d?auto=format&fit=crop&w=800&q=80"
    },
    {
      name: "Sports Watches",
      categoryKey: "Sports Watches",
      subtitle: "300M Ceramic Divers & Monopushers",
      image: "https://images.unsplash.com/photo-1539185441755-769473a23570?auto=format&fit=crop&w=800&q=80"
    },
    {
      name: "Minimal Watches",
      categoryKey: "Minimal Watches",
      subtitle: "Ultra-Thin Bauhaus & Monochrome",
      image: "https://images.unsplash.com/photo-1523275335684-37898b6baf30?auto=format&fit=crop&w=800&q=80"
    }
  ];

  // Specific collections for homepage sections
  const featuredWatches = products.filter(p => p.isFeatured).slice(0, 4);
  const newArrivals = products.filter(p => p.isNewArrival).slice(0, 4);
  const bestSellers = products.filter(p => p.isBestSeller).slice(0, 4);
  const premiumCollection = products.filter(p => p.category === 'Luxury Watches' || p.category === "Men's Watches").slice(0, 4);

  return (
    <div className="min-h-screen bg-white text-[#111111]">
      {/* =========================================================================
          1. HERO SECTION — LUXURY WATCH EDITORIAL (80-85% White, 15-20% Black)
      ========================================================================= */}
      <section className="relative bg-[#FAFAFA] border-b border-stone-200/80 overflow-hidden">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16 sm:py-24 lg:py-28">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-8 items-center">
            {/* Left Content */}
            <div className="lg:col-span-7 z-10 space-y-6 max-w-2xl">
              <div className="inline-flex items-center space-x-2 text-[10px] sm:text-[11px] font-semibold tracking-[0.3em] uppercase text-[#777777]">
                <span className="w-6 h-[1px] bg-black" />
                <span>VELMIRA HAUTE HORLOGERIE</span>
              </div>

              <h1 className="font-cinzel text-4xl sm:text-6xl lg:text-7xl font-bold tracking-[0.06em] text-[#111111] leading-[1.08]">
                TIMELESS BY DESIGN.
              </h1>

              <p className="text-stone-600 text-sm sm:text-base font-sans leading-relaxed max-w-lg">
                Discover watches that define elegance, precision and individuality.
              </p>

              <div className="pt-2 flex flex-col sm:flex-row items-stretch sm:items-center gap-3">
                <Link
                  to="/products"
                  className="px-8 py-4 bg-[#111111] text-white hover:bg-black font-cinzel text-xs font-bold tracking-[0.2em] uppercase transition text-center shadow-xs"
                >
                  EXPLORE COLLECTION
                </Link>

                <Link
                  to="/products?category=Luxury%20Watches"
                  className="px-8 py-4 bg-white border border-[#111111] text-[#111111] hover:bg-black hover:text-white font-cinzel text-xs font-bold tracking-[0.2em] uppercase transition text-center"
                >
                  SHOP NOW
                </Link>
              </div>

              <div className="pt-6 grid grid-cols-3 gap-6 border-t border-stone-200 text-[#777777] text-xs">
                <div>
                  <span className="block font-bold text-black font-mono text-sm">28,800 VPH</span>
                  <span className="text-[11px]">Swiss Precision</span>
                </div>
                <div>
                  <span className="block font-bold text-black font-mono text-sm">SAPPHIRE</span>
                  <span className="text-[11px]">Scratchproof Glass</span>
                </div>
                <div>
                  <span className="block font-bold text-black font-mono text-sm">INDIA & UAE</span>
                  <span className="text-[11px]">White-Glove Cargo</span>
                </div>
              </div>
            </div>

            {/* Right Visual — Large Luxury Watch Photography */}
            <div className="lg:col-span-5 relative flex items-center justify-center">
              <div className="relative w-full aspect-square max-w-md mx-auto bg-white border border-stone-200 shadow-sm p-4 sm:p-6 group">
                <img
                  src="https://images.unsplash.com/photo-1522335789203-aabd1fc54bc9?auto=format&fit=crop&w=1200&q=85"
                  alt="Velmira Chrono Royal Automatic Timepiece"
                  className="w-full h-full object-cover object-center transition-transform duration-1000 group-hover:scale-105"
                />
                <div className="absolute bottom-4 left-4 right-4 bg-white/95 backdrop-blur-xs border border-stone-200 p-3 flex items-center justify-between">
                  <div>
                    <span className="text-[9px] uppercase tracking-widest text-[#777777]">Flagship Calibre</span>
                    <h4 className="font-cinzel text-xs font-bold text-[#111111]">Chrono Royal Automatic 41mm</h4>
                  </div>
                  <span className="font-mono text-xs font-bold text-[#111111]">₹13,999 / AED 620</span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* =========================================================================
          2. WATCH CATEGORIES SECTION (Section 6)
      ========================================================================= */}
      <section className="py-20 sm:py-24 bg-white border-b border-stone-200/80">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex flex-col md:flex-row md:items-end justify-between mb-12">
            <div>
              <span className="text-[10px] font-bold uppercase tracking-[0.3em] text-[#777777]">
                THE CATALOGUE
              </span>
              <h2 className="font-cinzel text-2xl sm:text-4xl font-bold text-[#111111] tracking-wide mt-1">
                Watch Categories
              </h2>
            </div>
            <Link
              to="/products"
              className="mt-3 md:mt-0 text-xs font-semibold uppercase tracking-[0.18em] text-[#111111] hover:text-[#777777] inline-flex items-center space-x-1 transition"
            >
              <span>View All Watches</span>
              <ChevronRight className="w-4 h-4" />
            </Link>
          </div>

          {/* Spacious Grid for Watch Categories */}
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 sm:gap-8">
            {categoriesList.map((cat, idx) => (
              <Link
                key={idx}
                to={`/products?category=${encodeURIComponent(cat.categoryKey)}`}
                className="group relative bg-[#F8F8F8] border border-stone-200 overflow-hidden flex flex-col hover:border-black transition-all duration-300"
              >
                <div className="relative aspect-[4/3] overflow-hidden bg-white">
                  <img
                    src={cat.image}
                    alt={cat.name}
                    className="w-full h-full object-cover object-center transition-transform duration-700 ease-out group-hover:scale-105"
                    loading="lazy"
                  />
                  <div className="absolute inset-0 bg-black/5 group-hover:bg-transparent transition-colors" />
                </div>
                <div className="p-5 bg-white border-t border-stone-100 flex items-center justify-between">
                  <div>
                    <h3 className="font-cinzel text-base font-bold text-[#111111] tracking-wide group-hover:text-stone-600 transition">
                      {cat.name}
                    </h3>
                    <p className="text-xs text-[#777777] mt-0.5">{cat.subtitle}</p>
                  </div>
                  <div className="w-8 h-8 rounded-full border border-stone-300 flex items-center justify-center text-stone-700 group-hover:bg-black group-hover:text-white group-hover:border-black transition shrink-0 ml-3">
                    <ArrowRight className="w-3.5 h-3.5" />
                  </div>
                </div>
              </Link>
            ))}
          </div>
        </div>
      </section>

      {/* =========================================================================
          3. FEATURED WATCHES (Section 7)
      ========================================================================= */}
      <section className="py-20 bg-white border-b border-stone-200/80">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex flex-col md:flex-row md:items-end justify-between mb-10">
            <div>
              <span className="text-[10px] font-bold uppercase tracking-[0.3em] text-[#777777]">
                CURATED SELECTION
              </span>
              <h2 className="font-cinzel text-2xl sm:text-3xl font-bold text-[#111111] tracking-wide mt-1">
                Featured Watches
              </h2>
              <p className="text-xs text-[#777777] mt-1 max-w-md">
                Hand-selected timepieces showcasing extraordinary precision, design balance, and craftsmanship.
              </p>
            </div>
            <Link
              to="/products"
              className="mt-3 md:mt-0 text-xs font-semibold uppercase tracking-[0.18em] text-[#111111] hover:text-[#777777] inline-flex items-center space-x-1 transition"
            >
              <span>Explore Collection</span>
              <ChevronRight className="w-4 h-4" />
            </Link>
          </div>

          <div className="grid grid-cols-2 sm:grid-cols-2 lg:grid-cols-4 gap-4 sm:gap-6">
            {featuredWatches.map(watch => (
              <ProductCard key={watch.id} product={watch} />
            ))}
          </div>
        </div>
      </section>

      {/* =========================================================================
          4. NEW ARRIVALS (Section 7)
      ========================================================================= */}
      <section className="py-20 bg-[#FBFBFB] border-b border-stone-200/80">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex flex-col md:flex-row md:items-end justify-between mb-10">
            <div>
              <span className="text-[10px] font-bold uppercase tracking-[0.3em] text-[#777777]">
                LATEST RELEASES
              </span>
              <h2 className="font-cinzel text-2xl sm:text-3xl font-bold text-[#111111] tracking-wide mt-1">
                New Arrivals
              </h2>
              <p className="text-xs text-[#777777] mt-1 max-w-md">
                Recently unboxed horology pieces featuring our newest automatic calibres and dials.
              </p>
            </div>
            <Link
              to="/products?category=New%20Arrivals"
              className="mt-3 md:mt-0 text-xs font-semibold uppercase tracking-[0.18em] text-[#111111] hover:text-[#777777] inline-flex items-center space-x-1 transition"
            >
              <span>View All Releases</span>
              <ChevronRight className="w-4 h-4" />
            </Link>
          </div>

          <div className="grid grid-cols-2 sm:grid-cols-2 lg:grid-cols-4 gap-4 sm:gap-6">
            {newArrivals.map(watch => (
              <ProductCard key={watch.id} product={watch} />
            ))}
          </div>
        </div>
      </section>

      {/* =========================================================================
          5. BEST SELLERS (Section 7)
      ========================================================================= */}
      <section className="py-20 bg-white border-b border-stone-200/80">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex flex-col md:flex-row md:items-end justify-between mb-10">
            <div>
              <span className="text-[10px] font-bold uppercase tracking-[0.3em] text-[#777777]">
                PATRON FAVORITES
              </span>
              <h2 className="font-cinzel text-2xl sm:text-3xl font-bold text-[#111111] tracking-wide mt-1">
                Best Sellers
              </h2>
              <p className="text-xs text-[#777777] mt-1 max-w-md">
                Our most sought-after chronographs, divers, and ultra-thin models loved across India & the UAE.
              </p>
            </div>
            <Link
              to="/products"
              className="mt-3 md:mt-0 text-xs font-semibold uppercase tracking-[0.18em] text-[#111111] hover:text-[#777777] inline-flex items-center space-x-1 transition"
            >
              <span>Shop All Best Sellers</span>
              <ChevronRight className="w-4 h-4" />
            </Link>
          </div>

          <div className="grid grid-cols-2 sm:grid-cols-2 lg:grid-cols-4 gap-4 sm:gap-6">
            {bestSellers.map(watch => (
              <ProductCard key={watch.id} product={watch} />
            ))}
          </div>
        </div>
      </section>

      {/* =========================================================================
          6. PREMIUM COLLECTION (Section 7)
      ========================================================================= */}
      <section className="py-20 bg-[#F8F8F8] border-b border-stone-200/80">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex flex-col md:flex-row md:items-end justify-between mb-10">
            <div>
              <span className="text-[10px] font-bold uppercase tracking-[0.3em] text-[#777777]">
                HAUTE HORLOGERIE
              </span>
              <h2 className="font-cinzel text-2xl sm:text-3xl font-bold text-[#111111] tracking-wide mt-1">
                Premium Collection
              </h2>
              <p className="text-xs text-[#777777] mt-1 max-w-md">
                Grand complications, openwork skeleton ruthenium movements, and 18K rose gold masterpieces.
              </p>
            </div>
            <Link
              to="/products?category=Luxury%20Watches"
              className="mt-3 md:mt-0 text-xs font-semibold uppercase tracking-[0.18em] text-[#111111] hover:text-[#777777] inline-flex items-center space-x-1 transition"
            >
              <span>Explore Premium Vault</span>
              <ChevronRight className="w-4 h-4" />
            </Link>
          </div>

          <div className="grid grid-cols-2 sm:grid-cols-2 lg:grid-cols-4 gap-4 sm:gap-6">
            {premiumCollection.map(watch => (
              <ProductCard key={watch.id} product={watch} />
            ))}
          </div>
        </div>
      </section>

      {/* =========================================================================
          7. THE MANUFACTURE STANDARDS (Editorial 80-85% White layout)
      ========================================================================= */}
      <section className="py-20 sm:py-24 bg-white">
        <div className="max-w-6xl mx-auto px-4 text-center">
          <span className="text-[10px] font-bold uppercase tracking-[0.35em] text-[#777777]">
            VELMIRA ATELIER
          </span>
          <h2 className="font-cinzel text-3xl sm:text-5xl font-bold text-[#111111] tracking-wide mt-3 mb-6">
            Crafted for Generations
          </h2>
          <div className="w-12 h-[1px] bg-black mx-auto mb-8" />

          <p className="text-xs sm:text-sm text-stone-600 max-w-2xl mx-auto leading-relaxed mb-12">
            Every timepiece is forged from surgical grade 316L stainless steel, titanium, or high-tech ceramic, equipped with scratchproof anti-reflective sapphire crystal, and calibrated to rigorous Swiss chronometric standards.
          </p>

          <div className="grid grid-cols-2 sm:grid-cols-4 gap-6 text-left max-w-4xl mx-auto pt-6 border-t border-stone-200">
            <div>
              <span className="block font-cinzel font-bold text-sm text-black">Precision Assembly</span>
              <span className="text-xs text-[#777777] mt-1 block">Master horologists calibrate every escapement to ±4s daily tolerance.</span>
            </div>
            <div>
              <span className="block font-cinzel font-bold text-sm text-black">Sapphire Hardness</span>
              <span className="text-xs text-[#777777] mt-1 block">9 Mohs scale hardness ensures lifetime scratch resistance.</span>
            </div>
            <div>
              <span className="block font-cinzel font-bold text-sm text-black">Certified Authenticity</span>
              <span className="text-xs text-[#777777] mt-1 block">Each timepiece ships with laser-engraved serial and atelier warranty.</span>
            </div>
            <div>
              <span className="block font-cinzel font-bold text-sm text-black">Insured Handover</span>
              <span className="text-xs text-[#777777] mt-1 block">Doorstep insured courier handling across India & UAE.</span>
            </div>
          </div>

          <div className="mt-14">
            <a
              href={`https://wa.me/${WHATSAPP_RAW_NUMBER}?text=${encodeURIComponent('Hello Velmira Concierge, I would like to inquire about your watch collection.')}`}
              target="_blank"
              rel="noreferrer"
              className="inline-flex items-center space-x-2 px-8 py-3.5 bg-[#111111] text-white hover:bg-black font-cinzel text-xs font-bold tracking-[0.2em] uppercase transition shadow-xs"
            >
              <MessageSquare className="w-4 h-4" />
              <span>WhatsApp Concierge ({OFFICIAL_WHATSAPP_NUMBER})</span>
            </a>
          </div>
        </div>
      </section>
    </div>
  );
};
