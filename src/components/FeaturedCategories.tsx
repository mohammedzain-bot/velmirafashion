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
      title: "Automatic Chronographs",
      subtitle: 'Swiss 24-Jewel Self-Winding & Sunburst Dials',
      image: 'https://images.unsplash.com/photo-1522335789203-aabd1fc54bc9?auto=format&fit=crop&w=900&q=80',
      link: "/products?category=Men's%20Watches",
      colSpan: 'lg:col-span-2'
    },
    {
      title: "Executive Saffiano Totes",
      subtitle: 'Milanese Full-Grain Leather & Gold Hardware',
      image: 'https://images.unsplash.com/photo-1584917865442-de89df76afd3?auto=format&fit=crop&w=900&q=80',
      link: '/products?category=Tote%20Bags',
      colSpan: 'lg:col-span-1'
    },
    {
      title: 'Grand Complications',
      subtitle: 'Open-Heart Flying Tourbillons & Sapphire Cases',
      image: 'https://images.unsplash.com/photo-1509042239860-f550ce710b93?auto=format&fit=crop&w=900&q=80',
      link: '/products?category=Watches',
      colSpan: 'lg:col-span-1'
    },
    {
      title: 'Kelly & Flap Handbags',
      subtitle: 'French Box Calfskin with Key Padlocks',
      image: 'https://images.unsplash.com/photo-1591561954557-26941169b49e?auto=format&fit=crop&w=900&q=80',
      link: '/products?category=Leather%20Bags',
      colSpan: 'lg:col-span-1'
    },
    {
      title: 'Weekend Travel Duffles',
      subtitle: 'Tuscan Vegetable-Tanned Saddle Leather',
      image: 'https://images.unsplash.com/photo-1553062407-98eeb64c6a62?auto=format&fit=crop&w=900&q=80',
      link: '/products?category=Bags',
      colSpan: 'lg:col-span-1'
    }
  ];

  return (
    <section className="py-12 bg-[#F8F9FA]">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center max-w-2xl mx-auto mb-10">
          <span className="text-[11px] font-bold uppercase tracking-[0.2em] text-[#D4AF37]">
            ATELIER CURATION
          </span>
          <h2 className="font-cinzel text-2xl sm:text-3xl font-bold text-stone-900 tracking-wide mt-1">
            Luxury Timepieces & Designer Leather Bags
          </h2>
          <p className="text-xs sm:text-sm text-stone-500 mt-2">
            Swiss precision automatic horology paired with Italian hand-stitched calfskin leather. Order to India & UAE.
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
                className="w-full h-full object-cover object-center transition-transform duration-700 ease-out group-hover:scale-108"
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
