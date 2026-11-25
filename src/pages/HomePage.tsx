import React from 'react';
import { Link } from 'react-router-dom';
import { ArrowRight, MessageSquare, ChevronRight, ShieldCheck, Clock, Award, Sparkles, Star, CheckCircle2, Shield } from 'lucide-react';
import { useShop } from '../context/ShopContext';
import { useCurrency } from '../context/CurrencyContext';
import { ProductCard } from '../components/ProductCard';
import { WatchHeroSlider } from '../components/WatchHeroSlider';
import { OFFICIAL_WHATSAPP_NUMBER, WHATSAPP_RAW_NUMBER } from '../utils/whatsapp';

export const HomePage: React.FC = () => {
  const { products } = useShop();
  const { country } = useCurrency();

  // Watch Categories featuring user photos and horology collections
  const categoriesList = [
    {
      name: "Men's Watches",
      categoryKey: "Men's Watches",
      subtitle: "Mechanical Calibres & Day-Date Suiting",
      image: "/watches/seiko-collection-vault.jpg",
      tag: "FLAGSHIP SUITE"
    },
    {
      name: "Luxury Watches",
      categoryKey: "Luxury Watches",
      subtitle: "Haute Horlogerie & Roman Dial Editions",
      image: "/watches/cartier-boutique-display.jpg",
      tag: "HAUTE HORLOGERIE"
    },
    {
      name: "Classic Chronographs",
      categoryKey: "Classic Watches",
      subtitle: "Silver Sunburst & Cognac Alligator Leather",
      image: "/watches/tissot-silver-chronograph.jpg",
      tag: "TACHYMÈTRE"
    },
    {
      name: "Grand Complications",
      categoryKey: "Luxury Watches",
      subtitle: "Titanium Monopushers & Fluted Steel",
      image: "/watches/hublot-chrono-lounge.jpg",
      tag: "LIMITED ALLOCATION"
    },
    {
      name: "Sunburst Jewel Dials",
      categoryKey: "Men's Watches",
      subtitle: "Emerald Green & Amethyst Purple Calibres",
      image: "/watches/emerald-purple-automatic.jpg",
      tag: "SUNBURST RADIAL"
    },
    {
      name: "Minimalist Steel",
      categoryKey: "Minimal Watches",
      subtitle: "316L Brushed Steel Digital & Ana-Digi",
      image: "/watches/vintage-silver-digital.jpg",
      tag: "ARCHIVE CLASSIC"
    }
  ];

  // Specific collections for homepage sections
  const featuredWatches = products.filter(p => p.isFeatured).slice(0, 4);
  const newArrivals = products.filter(p => p.isNewArrival).slice(0, 4);
  const bestSellers = products.filter(p => p.isBestSeller).slice(0, 4);
  const premiumCollection = products.filter(p => p.category === 'Luxury Watches' || p.category === "Men's Watches").slice(0, 4);

  return (
    <div className="min-h-screen bg-white text-[#111111] font-sans selection:bg-black selection:text-white">
      {/* =========================================================================
          1. CINEMATIC ALMOST FULL SCREEN WATCH HERO SLIDESHOW (AUTOPLAY)
      ========================================================================= */}
      <WatchHeroSlider />

      {/* =========================================================================
          2. LUXURY STANDARDS STRIP (Editorial Trust Credentials)
      ========================================================================= */}
      <section className="bg-[#FAFAFA] border-b border-neutral-200 py-6">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-2 lg:grid-cols-4 gap-6 text-center lg:text-left">
            <div className="flex flex-col lg:flex-row items-center space-y-2 lg:space-y-0 lg:space-x-3.5">
              <div className="w-10 h-10 rounded-full bg-white border border-neutral-200 flex items-center justify-center text-neutral-800 shrink-0 shadow-xs">
                <Clock className="w-4 h-4" />
              </div>
              <div>
                <span className="block text-xs font-bold uppercase tracking-wider text-[#111111]">Swiss-Grade Calibres</span>
                <span className="text-[11px] text-[#71717A]">Calibrated to ±4s daily tolerance</span>
              </div>
            </div>

            <div className="flex flex-col lg:flex-row items-center space-y-2 lg:space-y-0 lg:space-x-3.5">
              <div className="w-10 h-10 rounded-full bg-white border border-neutral-200 flex items-center justify-center text-neutral-800 shrink-0 shadow-xs">
                <ShieldCheck className="w-4 h-4" />
              </div>
              <div>
                <span className="block text-xs font-bold uppercase tracking-wider text-[#111111]">Sapphire Crystal</span>
                <span className="text-[11px] text-[#71717A]">9 Mohs scale scratchproof glass</span>
              </div>
            </div>

            <div className="flex flex-col lg:flex-row items-center space-y-2 lg:space-y-0 lg:space-x-3.5">
              <div className="w-10 h-10 rounded-full bg-white border border-neutral-200 flex items-center justify-center text-neutral-800 shrink-0 shadow-xs">
                <Shield className="w-4 h-4" />
              </div>
              <div>
                <span className="block text-xs font-bold uppercase tracking-wider text-[#111111]">Laser Serial Serial</span>
                <span className="text-[11px] text-[#71717A]">Certificate of Atelier Authenticity</span>
              </div>
            </div>

            <div className="flex flex-col lg:flex-row items-center space-y-2 lg:space-y-0 lg:space-x-3.5">
              <div className="w-10 h-10 rounded-full bg-white border border-neutral-200 flex items-center justify-center text-neutral-800 shrink-0 shadow-xs">
                <Sparkles className="w-4 h-4" />
              </div>
              <div>
                <span className="block text-xs font-bold uppercase tracking-wider text-[#111111]">White-Glove Cargo</span>
                <span className="text-[11px] text-[#71717A]">Direct insured delivery in India & UAE</span>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* =========================================================================
          3. WATCH CATEGORIES SECTION (Crisp White + Clean Architecture)
      ========================================================================= */}
      <section className="py-12 sm:py-24 bg-white border-b border-neutral-200">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex flex-col md:flex-row md:items-end justify-between mb-6 sm:mb-12">
            <div>
              <span className="text-[10px] font-bold uppercase tracking-[0.25em] text-[#71717A] block">
                THE 2026 REPERTOIRE
              </span>
              <h2 className="font-serif text-2xl sm:text-4xl font-bold text-[#111111] tracking-tight mt-1">
                Curated Watch Categories
              </h2>
              <p className="text-xs sm:text-sm text-[#71717A] mt-1.5 max-w-lg">
                Explore hand-selected automatic movements, vintage mechanical restorations, and iconic luxury silhouettes.
              </p>
            </div>
            
            <div className="flex items-center justify-between mt-3 md:mt-0">
              <span className="text-[11px] text-neutral-400 font-medium sm:hidden flex items-center space-x-1">
                <span>Swipe to explore</span>
                <ArrowRight className="w-3.5 h-3.5" />
              </span>
              <Link
                to="/watches"
                className="text-xs font-semibold uppercase tracking-[0.18em] text-[#111111] hover:text-neutral-500 inline-flex items-center space-x-1.5 transition group"
              >
                <span>Explore All Watches</span>
                <ChevronRight className="w-4 h-4 transition-transform group-hover:translate-x-1" />
              </Link>
            </div>
          </div>

          {/* Side Scroll on Mobile, Spacious Multi-Column Grid on Tablet/Desktop */}
          <div className="flex overflow-x-auto gap-4 pb-4 pt-1 -mx-4 px-4 sm:mx-0 sm:px-0 sm:pb-0 scrollbar-none snap-x snap-mandatory sm:grid sm:grid-cols-2 lg:grid-cols-3 sm:gap-6 lg:gap-8">
            {categoriesList.map((cat, idx) => (
              <Link
                key={idx}
                to={`/watches?category=${encodeURIComponent(cat.categoryKey)}`}
                className="group relative bg-[#F8F9FA] border border-neutral-200 overflow-hidden flex flex-col hover:border-black transition-all duration-400 shadow-xs hover:shadow-lg w-[72vw] max-w-[290px] sm:w-auto shrink-0 snap-start"
              >
                <div className="relative aspect-[4/3] overflow-hidden bg-neutral-100">
                  <img
                    src={cat.image}
                    alt={cat.name}
                    className="w-full h-full object-cover object-center transition-transform duration-700 ease-out group-hover:scale-106"
                    loading="lazy"
                  />
                  <div className="absolute top-3 left-3 bg-white/92 backdrop-blur-xs px-2.5 py-1 border border-neutral-200 text-[9px] font-mono tracking-widest text-[#111111] uppercase shadow-xs">
                    {cat.tag}
                  </div>
                </div>
                <div className="p-4 sm:p-5 bg-white border-t border-neutral-200 flex items-center justify-between">
                  <div className="min-w-0 pr-2">
                    <h3 className="font-serif text-sm sm:text-base font-bold text-[#111111] tracking-wide group-hover:text-black transition-colors truncate">
                      {cat.name}
                    </h3>
                    <p className="text-[11px] sm:text-xs text-[#71717A] mt-0.5 truncate">{cat.subtitle}</p>
                  </div>
                  <div className="w-8 h-8 sm:w-9 sm:h-9 rounded-full border border-neutral-300 flex items-center justify-center text-neutral-600 group-hover:bg-[#111111] group-hover:text-white group-hover:border-[#111111] transition-all duration-300 shrink-0 shadow-xs">
                    <ArrowRight className="w-3.5 h-3.5 sm:w-4 sm:h-4" />
                  </div>
                </div>
              </Link>
            ))}
          </div>
        </div>
      </section>

      {/* =========================================================================
          4. FEATURED TIMEPIECES (Off-White #F8F9FA)
      ========================================================================= */}
      <section className="py-16 sm:py-20 bg-[#F8F9FA] border-b border-neutral-200">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex flex-col md:flex-row md:items-end justify-between mb-10">
            <div>
              <span className="text-[10px] font-bold uppercase tracking-[0.25em] text-[#71717A] block">
                CURATED SELECTION
              </span>
              <h2 className="font-serif text-2xl sm:text-3xl font-bold text-[#111111] tracking-tight mt-1">
                Featured Timepieces
              </h2>
              <p className="text-xs text-[#71717A] mt-1 max-w-md">
                Hand-selected timepieces showcasing extraordinary precision, sunburst dials, and flawless craftsmanship.
              </p>
            </div>
            <Link
              to="/watches"
              className="mt-3 md:mt-0 text-xs font-semibold uppercase tracking-[0.18em] text-[#111111] hover:text-neutral-500 inline-flex items-center space-x-1 transition"
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
          5. NEW ARRIVALS (Pure White)
      ========================================================================= */}
      <section className="py-16 sm:py-20 bg-white border-b border-neutral-200">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex flex-col md:flex-row md:items-end justify-between mb-10">
            <div>
              <span className="text-[10px] font-bold uppercase tracking-[0.25em] text-[#71717A] block">
                LATEST RELEASES
              </span>
              <h2 className="font-serif text-2xl sm:text-3xl font-bold text-[#111111] tracking-tight mt-1">
                New Arrivals
              </h2>
              <p className="text-xs text-[#71717A] mt-1 max-w-md">
                Recently unboxed horology pieces featuring our newest automatic calibres, titanium bezels, and textured leather straps.
              </p>
            </div>
            <Link
              to="/watches?category=New%20Arrivals"
              className="mt-3 md:mt-0 text-xs font-semibold uppercase tracking-[0.18em] text-[#111111] hover:text-neutral-500 inline-flex items-center space-x-1 transition"
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
          6. ATELIER HOROLOGY SPOTLIGHT (Editorial Centerpiece)
      ========================================================================= */}
      <section className="py-16 sm:py-24 bg-white border-b border-neutral-200">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-center">
            {/* Visual Frame */}
            <div className="lg:col-span-6 relative">
              <div className="relative aspect-[4/3] sm:aspect-[16/10] overflow-hidden border border-neutral-200 shadow-md bg-neutral-100 group">
                <img
                  src="/watches/horology-atelier-vintage.jpg"
                  alt="Velmira Horology Atelier Craftsmanship"
                  className="w-full h-full object-cover object-center filter contrast-[1.02] transition-transform duration-700 ease-out group-hover:scale-105"
                />
                <div className="absolute bottom-4 left-4 right-4 bg-white/95 backdrop-blur-md border border-neutral-200 p-4">
                  <span className="text-[9px] uppercase tracking-widest font-mono text-[#71717A] block">
                    ATELIER WORKSHOP RESTORATION
                  </span>
                  <p className="font-serif text-sm font-bold text-[#111111] mt-0.5">
                    Hand-Calibrated Escapements & Certified Chronometry
                  </p>
                </div>
              </div>
            </div>

            {/* Editorial Content */}
            <div className="lg:col-span-6 space-y-6">
              <div className="inline-flex items-center space-x-2 text-[10px] font-bold uppercase tracking-[0.3em] text-[#71717A]">
                <span className="w-6 h-[1.5px] bg-[#111111]" />
                <span>MANUFACTURE DISCIPLINE</span>
              </div>

              <h2 className="font-serif text-3xl sm:text-4xl font-bold text-[#111111] leading-tight tracking-tight">
                Engineering Beauty at 28,800 Beats Per Hour.
              </h2>

              <p className="text-xs sm:text-sm text-[#52525B] leading-relaxed">
                At Velmira, every mechanical calibre is regulated to stringent chronometric tolerances. We utilize solid surgical grade 316L stainless steel, anti-reflective sapphire glass with 9 Mohs scale hardness, and hand-finished dials in jewel-toned emerald, violet, and pure silver sunburst.
              </p>

              <div className="grid grid-cols-2 gap-4 pt-2 border-t border-neutral-200 text-xs">
                <div>
                  <span className="font-mono font-bold text-[#111111] text-base block">10 ATM</span>
                  <span className="text-[#71717A] text-[11px]">100M Water Resistance Rating</span>
                </div>
                <div>
                  <span className="font-mono font-bold text-[#111111] text-base block">42 HOURS</span>
                  <span className="text-[#71717A] text-[11px]">Continuous Rotor Power Reserve</span>
                </div>
              </div>

              <div className="pt-2">
                <Link
                  to="/watches"
                  className="inline-flex items-center space-x-2 px-7 py-3.5 bg-[#111111] text-white hover:bg-black font-serif text-xs font-bold tracking-[0.2em] uppercase transition shadow-sm"
                >
                  <span>Explore The Watch Vault</span>
                  <ArrowRight className="w-3.5 h-3.5" />
                </Link>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* =========================================================================
          7. BEST SELLERS (Off-White #F8F9FA)
      ========================================================================= */}
      <section className="py-16 sm:py-20 bg-[#F8F9FA] border-b border-neutral-200">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex flex-col md:flex-row md:items-end justify-between mb-10">
            <div>
              <span className="text-[10px] font-bold uppercase tracking-[0.25em] text-[#71717A] block">
                PATRON FAVORITES
              </span>
              <h2 className="font-serif text-2xl sm:text-3xl font-bold text-[#111111] tracking-tight mt-1">
                Best Sellers
              </h2>
              <p className="text-xs text-[#71717A] mt-1 max-w-md">
                Our most sought-after chronographs, divers, and vintage steel models loved across India & the UAE.
              </p>
            </div>
            <Link
              to="/watches"
              className="mt-3 md:mt-0 text-xs font-semibold uppercase tracking-[0.18em] text-[#111111] hover:text-neutral-500 inline-flex items-center space-x-1 transition"
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
          8. COLLECTOR VOICES / PATRON TESTIMONIALS
      ========================================================================= */}
      <section className="py-16 sm:py-20 bg-white border-b border-neutral-200">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center max-w-2xl mx-auto mb-12">
            <span className="text-[10px] font-bold uppercase tracking-[0.3em] text-[#71717A] block">
              PATRON VERIFICATIONS
            </span>
            <h2 className="font-serif text-2xl sm:text-3xl font-bold text-[#111111] tracking-tight mt-1">
              Collector Experiences Across India & UAE
            </h2>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            <div className="p-6 bg-[#FAFAFA] border border-neutral-200 shadow-xs flex flex-col justify-between">
              <div>
                <div className="flex text-amber-500 mb-3">
                  {[1, 2, 3, 4, 5].map(i => (
                    <Star key={i} className="w-3.5 h-3.5 fill-amber-400 text-amber-400" />
                  ))}
                </div>
                <p className="text-xs text-[#52525B] leading-relaxed italic">
                  "The teal cyan dial of the Calibre 5 Suite catches the afternoon sun with unbelievable depth. Delivered in Dubai within 24 hours with certified paperwork."
                </p>
              </div>
              <div className="mt-5 pt-3 border-t border-neutral-200 flex items-center justify-between text-xs">
                <div>
                  <span className="font-bold text-[#111111] block">Rashid Al Maktoum</span>
                  <span className="text-[10px] text-neutral-500">Downtown, Dubai</span>
                </div>
                <span className="text-[10px] text-emerald-700 font-semibold flex items-center">
                  <CheckCircle2 className="w-3 h-3 mr-1" /> Verified
                </span>
              </div>
            </div>

            <div className="p-6 bg-[#FAFAFA] border border-neutral-200 shadow-xs flex flex-col justify-between">
              <div>
                <div className="flex text-amber-500 mb-3">
                  {[1, 2, 3, 4, 5].map(i => (
                    <Star key={i} className="w-3.5 h-3.5 fill-amber-400 text-amber-400" />
                  ))}
                </div>
                <p className="text-xs text-[#52525B] leading-relaxed italic">
                  "The Tissot tachymètre on cognac alligator leather has become my daily executive watch. The case polishing and weight are exceptional."
                </p>
              </div>
              <div className="mt-5 pt-3 border-t border-neutral-200 flex items-center justify-between text-xs">
                <div>
                  <span className="font-bold text-[#111111] block">Vikramaditya S.</span>
                  <span className="text-[10px] text-neutral-500">Bandra West, Mumbai</span>
                </div>
                <span className="text-[10px] text-emerald-700 font-semibold flex items-center">
                  <CheckCircle2 className="w-3 h-3 mr-1" /> Verified
                </span>
              </div>
            </div>

            <div className="p-6 bg-[#FAFAFA] border border-neutral-200 shadow-xs flex flex-col justify-between">
              <div>
                <div className="flex text-amber-500 mb-3">
                  {[1, 2, 3, 4, 5].map(i => (
                    <Star key={i} className="w-3.5 h-3.5 fill-amber-400 text-amber-400" />
                  ))}
                </div>
                <p className="text-xs text-[#52525B] leading-relaxed italic">
                  "Ordered via direct WhatsApp Concierge. Fast, direct responses and seamless white-glove cargo handling to Abu Dhabi."
                </p>
              </div>
              <div className="mt-5 pt-3 border-t border-neutral-200 flex items-center justify-between text-xs">
                <div>
                  <span className="font-bold text-[#111111] block">Tariq Al Qasimi</span>
                  <span className="text-[10px] text-neutral-500">Al Reem, Abu Dhabi</span>
                </div>
                <span className="text-[10px] text-emerald-700 font-semibold flex items-center">
                  <CheckCircle2 className="w-3 h-3 mr-1" /> Verified
                </span>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* =========================================================================
          9. CONCIERGE DIRECT WHATSAPP ACTION
      ========================================================================= */}
      <section className="py-20 bg-white">
        <div className="max-w-4xl mx-auto px-4 text-center">
          <span className="text-[10px] font-bold uppercase tracking-[0.35em] text-[#71717A]">
            HAUTE HORLOGERIE CONCIERGE
          </span>
          <h2 className="font-serif text-3xl sm:text-4xl font-bold text-[#111111] tracking-tight mt-2 mb-4">
            Private Timepiece Curation & Sourcing
          </h2>
          <div className="w-12 h-[2px] bg-[#111111] mx-auto mb-6" />

          <p className="text-xs sm:text-sm text-[#71717A] max-w-xl mx-auto leading-relaxed mb-8">
            Looking for a specific mechanical calibre, customized dial allocation, or private collector consultation? Connect directly with our master atelier concierge.
          </p>

          <a
            href={`https://wa.me/${WHATSAPP_RAW_NUMBER}?text=${encodeURIComponent('Hello Velmira Concierge, I would like to inquire about private timepiece allocations.')}`}
            target="_blank"
            rel="noreferrer"
            className="inline-flex items-center space-x-2 px-8 py-3.5 bg-[#111111] text-white hover:bg-black font-serif text-xs font-bold tracking-[0.2em] uppercase transition shadow-md hover:shadow-lg"
          >
            <MessageSquare className="w-4 h-4 text-emerald-400" />
            <span>WhatsApp Concierge ({OFFICIAL_WHATSAPP_NUMBER})</span>
          </a>
        </div>
      </section>
    </div>
  );
};
