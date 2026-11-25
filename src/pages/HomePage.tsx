import React from 'react';
import { Link } from 'react-router-dom';
import { ArrowRight, MessageSquare, ChevronRight, ShieldCheck, Clock, Award, Sparkles } from 'lucide-react';
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
      image: "/watches/seiko-collection-vault.jpg"
    },
    {
      name: "Luxury Watches",
      categoryKey: "Luxury Watches",
      subtitle: "Haute Horlogerie & Roman Dial Editions",
      image: "/watches/cartier-boutique-display.jpg"
    },
    {
      name: "Classic Chronographs",
      categoryKey: "Classic Watches",
      subtitle: "Silver Sunburst & Cognac Alligator Leather",
      image: "/watches/tissot-silver-chronograph.jpg"
    },
    {
      name: "Grand Complications",
      categoryKey: "Luxury Watches",
      subtitle: "Titanium Monopushers & Fluted Steel",
      image: "/watches/hublot-chrono-lounge.jpg"
    },
    {
      name: "Sunburst Jewel Dials",
      categoryKey: "Men's Watches",
      subtitle: "Emerald Green & Amethyst Purple Calibres",
      image: "/watches/emerald-purple-automatic.jpg"
    },
    {
      name: "Minimalist Steel",
      categoryKey: "Minimal Watches",
      subtitle: "316L Brushed Steel Digital & Ana-Digi",
      image: "/watches/vintage-silver-digital.jpg"
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
          1. CINEMATIC ALMOST FULL SCREEN WATCH HERO SLIDESHOW (AUTOPLAY + SMALL TEXTS)
      ========================================================================= */}
      <WatchHeroSlider />

      {/* =========================================================================
          2. WATCH CATEGORIES SECTION (Crisp White + Minimal Spacing)
      ========================================================================= */}
      <section className="py-16 sm:py-20 bg-white border-b border-neutral-200">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex flex-col md:flex-row md:items-end justify-between mb-10">
            <div>
              <span className="text-[10px] font-bold uppercase tracking-[0.25em] text-[#71717A] block">
                THE CATALOGUE
              </span>
              <h2 className="font-serif text-2xl sm:text-3xl font-bold text-[#111111] tracking-tight mt-1">
                Watch Categories
              </h2>
              <p className="text-xs text-[#71717A] mt-1 max-w-lg">
                Explore hand-selected automatic movements, vintage mechanical restorations, and iconic luxury silhouettes.
              </p>
            </div>
            <Link
              to="/watches"
              className="mt-4 md:mt-0 text-xs font-semibold uppercase tracking-[0.15em] text-[#111111] hover:text-neutral-500 inline-flex items-center space-x-1.5 transition group"
            >
              <span>Explore All Watches</span>
              <ChevronRight className="w-4 h-4 transition-transform group-hover:translate-x-1" />
            </Link>
          </div>

          {/* Spacious Grid for Watch Categories */}
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
            {categoriesList.map((cat, idx) => (
              <Link
                key={idx}
                to={`/watches?category=${encodeURIComponent(cat.categoryKey)}`}
                className="group relative bg-[#F8F9FA] border border-neutral-200 overflow-hidden flex flex-col hover:border-black transition-all duration-300 shadow-xs hover:shadow-md"
              >
                <div className="relative aspect-[4/3] overflow-hidden bg-neutral-100">
                  <img
                    src={cat.image}
                    alt={cat.name}
                    className="w-full h-full object-cover object-center transition-transform duration-700 ease-out group-hover:scale-106"
                    loading="lazy"
                  />
                  <div className="absolute top-3 left-3 bg-white/90 backdrop-blur-xs px-2.5 py-1 border border-neutral-200 text-[9px] font-mono tracking-widest text-[#111111] uppercase">
                    0{idx + 1} // EDITION
                  </div>
                </div>
                <div className="p-4 sm:p-5 bg-white border-t border-neutral-200 flex items-center justify-between">
                  <div>
                    <h3 className="font-serif text-sm sm:text-base font-bold text-[#111111] tracking-wide group-hover:text-black transition-colors">
                      {cat.name}
                    </h3>
                    <p className="text-xs text-[#71717A] mt-0.5">{cat.subtitle}</p>
                  </div>
                  <div className="w-8 h-8 rounded-full border border-neutral-300 flex items-center justify-center text-neutral-600 group-hover:bg-[#111111] group-hover:text-white group-hover:border-[#111111] transition-all duration-300 shrink-0 ml-3">
                    <ArrowRight className="w-3.5 h-3.5" />
                  </div>
                </div>
              </Link>
            ))}
          </div>
        </div>
      </section>

      {/* =========================================================================
          3. FEATURED TIMEPIECES (Off-White #F8F9FA)
      ========================================================================= */}
      <section className="py-16 sm:py-20 bg-[#F8F9FA] border-b border-neutral-200">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex flex-col md:flex-row md:items-end justify-between mb-8">
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
              className="mt-3 md:mt-0 text-xs font-semibold uppercase tracking-[0.15em] text-[#111111] hover:text-neutral-500 inline-flex items-center space-x-1 transition"
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
          4. NEW ARRIVALS (Pure White)
      ========================================================================= */}
      <section className="py-16 sm:py-20 bg-white border-b border-neutral-200">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex flex-col md:flex-row md:items-end justify-between mb-8">
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
              className="mt-3 md:mt-0 text-xs font-semibold uppercase tracking-[0.15em] text-[#111111] hover:text-neutral-500 inline-flex items-center space-x-1 transition"
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
          5. BEST SELLERS (Off-White #F8F9FA)
      ========================================================================= */}
      <section className="py-16 sm:py-20 bg-[#F8F9FA] border-b border-neutral-200">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex flex-col md:flex-row md:items-end justify-between mb-8">
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
              className="mt-3 md:mt-0 text-xs font-semibold uppercase tracking-[0.15em] text-[#111111] hover:text-neutral-500 inline-flex items-center space-x-1 transition"
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
          6. PREMIUM COLLECTION (Pure White)
      ========================================================================= */}
      <section className="py-16 sm:py-20 bg-white border-b border-neutral-200">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex flex-col md:flex-row md:items-end justify-between mb-8">
            <div>
              <span className="text-[10px] font-bold uppercase tracking-[0.25em] text-[#71717A] block">
                HAUTE HORLOGERIE
              </span>
              <h2 className="font-serif text-2xl sm:text-3xl font-bold text-[#111111] tracking-tight mt-1">
                Premium Collection
              </h2>
              <p className="text-xs text-[#71717A] mt-1 max-w-md">
                Grand complications, openwork skeleton movements, and 316L brushed steel masterpieces.
              </p>
            </div>
            <Link
              to="/watches?category=Luxury%20Watches"
              className="mt-3 md:mt-0 text-xs font-semibold uppercase tracking-[0.15em] text-[#111111] hover:text-neutral-500 inline-flex items-center space-x-1 transition"
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
          7. THE MANUFACTURE STANDARDS (Clean Editorial White)
      ========================================================================= */}
      <section className="py-20 sm:py-24 bg-[#FAFAFA] relative overflow-hidden">
        <div className="max-w-5xl mx-auto px-4 text-center relative z-10">
          <span className="text-[10px] font-bold uppercase tracking-[0.3em] text-[#71717A]">
            VELMIRA ATELIER HERITAGE
          </span>
          <h2 className="font-serif text-3xl sm:text-4xl font-bold text-[#111111] tracking-tight mt-2 mb-4">
            Crafted for Generations
          </h2>
          <div className="w-12 h-[2px] bg-[#111111] mx-auto mb-6" />

          <p className="text-xs sm:text-sm text-[#71717A] max-w-2xl mx-auto leading-relaxed mb-12">
            Every timepiece is forged from surgical grade 316L stainless steel, titanium, or brushed silver alloys, equipped with scratchproof anti-reflective sapphire crystal, and calibrated to rigorous chronometric standards.
          </p>

          <div className="grid grid-cols-2 sm:grid-cols-4 gap-5 text-left max-w-4xl mx-auto pt-6 border-t border-neutral-200">
            <div className="p-4 bg-white border border-neutral-200">
              <span className="block font-serif font-bold text-xs sm:text-sm text-[#111111]">Precision Assembly</span>
              <span className="text-[11px] text-[#71717A] mt-1 block">Master horologists calibrate every escapement to ±4s daily tolerance.</span>
            </div>
            <div className="p-4 bg-white border border-neutral-200">
              <span className="block font-serif font-bold text-xs sm:text-sm text-[#111111]">Sapphire Hardness</span>
              <span className="text-[11px] text-[#71717A] mt-1 block">9 Mohs scale hardness ensures lifetime scratch resistance.</span>
            </div>
            <div className="p-4 bg-white border border-neutral-200">
              <span className="block font-serif font-bold text-xs sm:text-sm text-[#111111]">Certified Serial</span>
              <span className="text-[11px] text-[#71717A] mt-1 block">Each timepiece ships with laser-engraved serial and atelier warranty.</span>
            </div>
            <div className="p-4 bg-white border border-neutral-200">
              <span className="block font-serif font-bold text-xs sm:text-sm text-[#111111]">Insured Handover</span>
              <span className="text-[11px] text-[#71717A] mt-1 block">Doorstep white-glove courier handling across India & the UAE.</span>
            </div>
          </div>

          <div className="mt-12">
            <a
              href={`https://wa.me/${WHATSAPP_RAW_NUMBER}?text=${encodeURIComponent('Hello Velmira Concierge, I would like to inquire about your watch collection.')}`}
              target="_blank"
              rel="noreferrer"
              className="inline-flex items-center space-x-2 px-8 py-3.5 bg-[#111111] text-white hover:bg-black font-serif text-xs font-bold tracking-[0.2em] uppercase transition shadow-sm"
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
