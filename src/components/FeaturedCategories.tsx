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
      title: "Women's Couture",
      subtitle: 'Silk Sarees, Evening Gowns & Anarkalis',
      image: 'https://images.unsplash.com/photo-1566174053879-31528523f8ae?auto=format&fit=crop&w=900&q=80',
      link: '/products?category=Women',
      colSpan: 'lg:col-span-2'
    },
    {
      title: "Men's Sartorial",
      subtitle: 'Italian Blazers, Tuxedos & Chinos',
      image: 'https://images.unsplash.com/photo-1507679799987-c73779587ccf?auto=format&fit=crop&w=900&q=80',
      link: '/products?category=Men',
      colSpan: 'lg:col-span-1'
    },
    {
      title: 'Ethnic Collection',
      subtitle: 'Royal Banarasi Silks & Dabka Lehengas',
      image: 'https://images.unsplash.com/photo-1610030469983-98e550d6193c?auto=format&fit=crop&w=900&q=80',
      link: '/products?category=Ethnic%20Wear',
      colSpan: 'lg:col-span-1'
    },
    {
      title: 'Formal & Bespoke',
      subtitle: 'Structured Two-Piece & Imperial Sherwanis',
      image: 'https://images.unsplash.com/photo-1594938298603-c8148c4dae35?auto=format&fit=crop&w=900&q=80',
      link: '/products?category=Men',
      colSpan: 'lg:col-span-1'
    },
    {
      title: 'Luxury Footwear',
      subtitle: 'Goodyear Welted Oxfords & Stiletto Pumps',
      image: 'https://images.unsplash.com/photo-1543163521-1bf539c55dd2?auto=format&fit=crop&w=900&q=80',
      link: '/products?category=Footwear',
      colSpan: 'lg:col-span-1'
    }
  ];

  return (
    <section className="py-12 bg-[#F8F9FA]">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center max-w-2xl mx-auto mb-10">
          <span className="text-[11px] font-bold uppercase tracking-[0.2em] text-[#D4AF37]">
            CURATED SELECTION
          </span>
          <h2 className="font-cinzel text-2xl sm:text-3xl font-bold text-stone-900 tracking-wide mt-1">
            Featured Fashion Collections
          </h2>
          <p className="text-xs sm:text-sm text-stone-500 mt-2">
            Immerse yourself in precision Italian tailoring, handloom Banarasi silk, and handcrafted leather masterworks.
          </p>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {categories.map((cat, idx) => (
            <Link
              key={idx}
              to={cat.link}
              className={`group relative h-80 rounded-2xl overflow-hidden shadow-sm hover:shadow-xl transition-all duration-500 ${
                cat.colSpan || ''
              }`}
            >
              <img
                src={cat.image}
                alt={cat.title}
                className="w-full h-full object-cover object-top transition-transform duration-700 ease-out group-hover:scale-108"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black/85 via-black/35 to-transparent" />

              <div className="absolute bottom-0 inset-x-0 p-6 flex items-end justify-between">
                <div>
                  <p className="text-[10px] uppercase tracking-widest text-[#D4AF37] font-semibold mb-1">
                    VELMIRA ATELIER
                  </p>
                  <h3 className="font-cinzel text-xl font-bold text-white tracking-wide">
                    {cat.title}
                  </h3>
                  <p className="text-xs text-stone-300 mt-1 line-clamp-1">{cat.subtitle}</p>
                </div>

                <div className="w-10 h-10 rounded-full bg-white/20 backdrop-blur-md border border-white/40 flex items-center justify-center text-white group-hover:bg-[#D4AF37] group-hover:text-black transition-colors duration-300 shrink-0 ml-3">
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
