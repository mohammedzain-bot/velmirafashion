import React from 'react';
import { Link } from 'react-router-dom';
import { ArrowUpRight } from 'lucide-react';

interface FeaturedCategory {
  title: string;
  subtitle: string;
  image: string;
  link: string;
  colSpan?: string;
}

export const FeaturedCategories: React.FC = () => {
  const categories: FeaturedCategory[] = [
    {
      title: 'Automatic Chronographs',
      subtitle: 'Swiss 24-Jewel Self-Winding & Sunburst Dials',
      image: 'https://images.unsplash.com/photo-1522335789203-aabd1fc54bc9?auto=format&fit=crop&w=900&q=80',
      link: '/products?category=Chronograph',
      colSpan: 'lg:col-span-2'
    },
    {
      title: 'Celestial Tourbillons',
      subtitle: 'Gravity-Defying Open-Heart Cages & Exhibition Casebacks',
      image: 'https://images.unsplash.com/photo-1509042239860-f550ce710b93?auto=format&fit=crop&w=900&q=80',
      link: '/products?category=Tourbillon',
      colSpan: 'lg:col-span-1'
    },
    {
      title: 'Oceanic 300M Divers',
      subtitle: 'Unidirectional Ceramic Bezels & Helium Valves',
      image: 'https://images.unsplash.com/photo-1539185441755-769473a23570?auto=format&fit=crop&w=900&q=80',
      link: '/products?category=Diver',
      colSpan: 'lg:col-span-1'
    },
    {
      title: 'Openwork Skeletons',
      subtitle: 'Ruthenium Bridges & Architectural Geartrains',
      image: 'https://images.unsplash.com/photo-1524805444758-089113d48a6d?auto=format&fit=crop&w=900&q=80',
      link: '/products?category=Skeleton',
      colSpan: 'lg:col-span-1'
    },
    {
      title: 'Ultra-Thin Minimalist',
      subtitle: 'Understated Bauhaus 6.8mm Dress Profiles',
      image: 'https://images.unsplash.com/photo-1523275335684-37898b6baf30?auto=format&fit=crop&w=900&q=80',
      link: '/products?category=Classic%20Dress',
      colSpan: 'lg:col-span-1'
    }
  ];

  return (
    <section className="py-12 bg-[#0A0A0A] text-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center max-w-2xl mx-auto mb-10">
          <span className="text-[11px] font-bold uppercase tracking-[0.2em] text-[#D4AF37]">
            ATELIER HOROLOGY
          </span>
          <h2 className="font-cinzel text-2xl sm:text-3xl font-bold text-white tracking-wide mt-1">
            Manufacture Collections
          </h2>
          <p className="text-xs text-stone-400 mt-2">
            Explore our precision timepieces crafted for collectors in India & the UAE.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {categories.map((cat, idx) => (
            <Link
              key={idx}
              to={cat.link}
              className={`group relative h-72 sm:h-80 rounded-2xl overflow-hidden border border-stone-800 shadow-md ${cat.colSpan || ''}`}
            >
              <img
                src={cat.image}
                alt={cat.title}
                className="w-full h-full object-cover object-center transition-transform duration-700 group-hover:scale-105 brightness-90 group-hover:brightness-100"
                loading="lazy"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black/90 via-black/40 to-transparent" />
              <div className="absolute bottom-0 inset-x-0 p-6 flex items-end justify-between">
                <div>
                  <h3 className="font-cinzel text-lg sm:text-xl font-bold text-white tracking-wide group-hover:text-[#D4AF37] transition">
                    {cat.title}
                  </h3>
                  <p className="text-xs text-stone-300 mt-1 max-w-xs">{cat.subtitle}</p>
                </div>
                <div className="w-10 h-10 rounded-full bg-stone-900/80 border border-stone-700 flex items-center justify-center text-white group-hover:bg-[#D4AF37] group-hover:text-black transition shrink-0 ml-3">
                  <ArrowUpRight className="w-5 h-5 transition-transform group-hover:translate-x-0.5 group-hover:-translate-y-0.5" />
                </div>
              </div>
            </Link>
          ))}
        </div>
      </div>
    </section>
  );
};
