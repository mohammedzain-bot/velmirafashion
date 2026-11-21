import React, { useRef } from 'react';
import { Link } from 'react-router-dom';
import { ChevronLeft, ChevronRight, ArrowRight } from 'lucide-react';
import { Product } from '../types';
import { ProductCard } from './ProductCard';

interface ProductSliderProps {
  title: string;
  subtitle?: string;
  products: Product[];
  viewAllLink?: string;
}

export const ProductSlider: React.FC<ProductSliderProps> = ({
  title,
  subtitle,
  products,
  viewAllLink
}) => {
  const scrollRef = useRef<HTMLDivElement>(null);

  const scroll = (direction: 'left' | 'right') => {
    if (scrollRef.current) {
      const { scrollLeft, clientWidth } = scrollRef.current;
      const scrollAmount = clientWidth * 0.75;
      scrollRef.current.scrollTo({
        left: direction === 'left' ? scrollLeft - scrollAmount : scrollLeft + scrollAmount,
        behavior: 'smooth'
      });
    }
  };

  if (!products || products.length === 0) return null;

  return (
    <section className="py-8 bg-white border-y border-stone-100">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Section Header */}
        <div className="flex items-end justify-between mb-6 pb-3 border-b border-stone-200">
          <div>
            <span className="text-[11px] font-bold uppercase tracking-widest text-[#D4AF37]">
              VELMIRA CURATION
            </span>
            <h2 className="font-cinzel text-xl sm:text-2xl font-bold text-stone-900 tracking-wide mt-0.5">
              {title}
            </h2>
            {subtitle && <p className="text-xs text-stone-500 mt-1">{subtitle}</p>}
          </div>

          <div className="flex items-center space-x-3">
            {viewAllLink && (
              <Link
                to={viewAllLink}
                className="hidden sm:flex items-center space-x-1 text-xs font-semibold uppercase tracking-wider text-stone-800 hover:text-[#D4AF37] transition"
              >
                <span>View All</span>
                <ArrowRight className="w-3.5 h-3.5" />
              </Link>
            )}

            <div className="flex items-center space-x-1.5">
              <button
                onClick={() => scroll('left')}
                className="p-2 rounded-full border border-stone-300 hover:border-black hover:bg-stone-50 text-stone-700 transition"
                aria-label="Previous Products"
              >
                <ChevronLeft className="w-4 h-4" />
              </button>
              <button
                onClick={() => scroll('right')}
                className="p-2 rounded-full border border-stone-300 hover:border-black hover:bg-stone-50 text-stone-700 transition"
                aria-label="Next Products"
              >
                <ChevronRight className="w-4 h-4" />
              </button>
            </div>
          </div>
        </div>

        {/* Scrollable Track */}
        <div
          ref={scrollRef}
          className="flex space-x-4 overflow-x-auto pb-4 pt-1 scrollbar-none snap-x snap-mandatory"
          style={{ scrollbarWidth: 'none', msOverflowStyle: 'none' }}
        >
          {products.map(product => (
            <div
              key={product.id}
              className="w-56 sm:w-64 shrink-0 snap-start"
            >
              <ProductCard product={product} />
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};
