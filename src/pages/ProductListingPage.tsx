import React, { useState, useEffect } from 'react';
import { useSearchParams, Link } from 'react-router-dom';
import { SlidersHorizontal, ArrowUpDown, X, ChevronRight, ShoppingBag, Sparkles } from 'lucide-react';
import { useShop } from '../context/ShopContext';
import { FilterSidebar } from '../components/FilterSidebar';
import { ProductCard } from '../components/ProductCard';
import { CategoryType } from '../types';

export const ProductListingPage: React.FC = () => {
  const [searchParams] = useSearchParams();
  const { filters, setFilters, resetFilters, filteredProducts, categories } = useShop();
  const [isMobileFilterOpen, setIsMobileFilterOpen] = useState(false);

  // Sync category or search query from URL query params
  useEffect(() => {
    const cat = searchParams.get('category');
    const search = searchParams.get('search');

    if (cat && categories.includes(cat as CategoryType)) {
      setFilters(prev => ({ ...prev, category: cat as CategoryType }));
    }
    if (search) {
      setFilters(prev => ({ ...prev, searchQuery: search }));
    }
  }, [searchParams]);

  const handleSortChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
    setFilters(prev => ({
      ...prev,
      sortBy: e.target.value as any
    }));
  };

  const removeFilterTag = (type: string, val?: string) => {
    setFilters(prev => {
      switch (type) {
        case 'category':
          return { ...prev, category: 'All' };
        case 'subcategory':
          return { ...prev, subcategories: prev.subcategories.filter(s => s !== val) };
        case 'brand':
          return { ...prev, brands: prev.brands.filter(b => b !== val) };
        case 'size':
          return { ...prev, sizes: prev.sizes.filter(s => s !== val) };
        case 'discount':
          return { ...prev, minDiscount: 0 };
        case 'rating':
          return { ...prev, minRating: 0 };
        case 'search':
          return { ...prev, searchQuery: '' };
        default:
          return prev;
      }
    });
  };

  return (
    <div className="min-h-screen bg-[#F8F9FA] pb-16">
      {/* Breadcrumb strip */}
      <div className="bg-white border-b border-stone-200 py-3">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 flex items-center space-x-2 text-xs text-stone-500">
          <Link to="/" className="hover:text-black">Home</Link>
          <ChevronRight className="w-3 h-3 text-stone-400" />
          <Link to="/products" className="hover:text-black">Collections</Link>
          {filters.category !== 'All' && (
            <>
              <ChevronRight className="w-3 h-3 text-stone-400" />
              <span className="font-semibold text-stone-900">{filters.category}</span>
            </>
          )}
          {filters.searchQuery && (
            <>
              <ChevronRight className="w-3 h-3 text-stone-400" />
              <span className="font-semibold text-stone-900">"{filters.searchQuery}"</span>
            </>
          )}
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pt-6">
        {/* Top Control Bar: Title & Sorting */}
        <div className="flex flex-col sm:flex-row sm:items-center justify-between pb-4 gap-4 border-b border-stone-200">
          <div>
            <h1 className="font-cinzel text-xl sm:text-2xl font-bold text-stone-900">
              {filters.category === 'All' ? 'All Luxury Collections' : filters.category}
              {filters.searchQuery ? ` — Results for "${filters.searchQuery}"` : ''}
            </h1>
            <p className="text-xs text-stone-500 mt-0.5">
              Showing <strong className="text-stone-900 font-mono">{filteredProducts.length}</strong> authenticated couture products
            </p>
          </div>

          <div className="flex items-center space-x-3">
            {/* Mobile Filter Button */}
            <button
              onClick={() => setIsMobileFilterOpen(true)}
              className="lg:hidden flex-1 sm:flex-none flex items-center justify-center space-x-1.5 py-2 px-3 rounded-lg border border-stone-300 bg-white text-xs font-semibold text-stone-800 shadow-xs"
            >
              <SlidersHorizontal className="w-3.5 h-3.5" />
              <span>Filters</span>
            </button>

            {/* Sorting Dropdown (Flipkart style) */}
            <div className="flex items-center space-x-2">
              <span className="text-xs text-stone-500 hidden sm:inline">Sort By:</span>
              <select
                value={filters.sortBy}
                onChange={handleSortChange}
                className="bg-white border border-stone-300 text-stone-800 text-xs font-medium rounded-lg px-3 py-2 focus:outline-none focus:border-[#D4AF37]"
              >
                <option value="relevance">Relevance</option>
                <option value="price-asc">Price: Low to High</option>
                <option value="price-desc">Price: High to Low</option>
                <option value="newest">Newest Arrivals</option>
                <option value="popularity">Popularity & Best Sellers</option>
                <option value="rating">Highest Customer Rated</option>
              </select>
            </div>
          </div>
        </div>

        {/* Active Filter Badges */}
        {(filters.category !== 'All' ||
          filters.searchQuery ||
          filters.subcategories.length > 0 ||
          filters.brands.length > 0 ||
          filters.sizes.length > 0 ||
          filters.minDiscount > 0 ||
          filters.minRating > 0) && (
          <div className="flex flex-wrap items-center gap-2 py-3 border-b border-stone-200/60">
            <span className="text-[11px] text-stone-400 font-semibold uppercase tracking-wider">
              Active Filters:
            </span>

            {filters.category !== 'All' && (
              <span className="inline-flex items-center space-x-1 px-2.5 py-1 rounded-full bg-stone-900 text-[#D4AF37] text-xs font-medium">
                <span>Category: {filters.category}</span>
                <button onClick={() => removeFilterTag('category')}>
                  <X className="w-3 h-3 hover:text-white" />
                </button>
              </span>
            )}

            {filters.searchQuery && (
              <span className="inline-flex items-center space-x-1 px-2.5 py-1 rounded-full bg-stone-200 text-stone-800 text-xs font-medium">
                <span>Keyword: "{filters.searchQuery}"</span>
                <button onClick={() => removeFilterTag('search')}>
                  <X className="w-3 h-3 hover:text-black" />
                </button>
              </span>
            )}

            {filters.subcategories.map(sub => (
              <span key={sub} className="inline-flex items-center space-x-1 px-2.5 py-1 rounded-full bg-stone-200 text-stone-800 text-xs font-medium">
                <span>{sub}</span>
                <button onClick={() => removeFilterTag('subcategory', sub)}>
                  <X className="w-3 h-3 hover:text-black" />
                </button>
              </span>
            ))}

            {filters.brands.map(brand => (
              <span key={brand} className="inline-flex items-center space-x-1 px-2.5 py-1 rounded-full bg-stone-200 text-stone-800 text-xs font-medium">
                <span>{brand}</span>
                <button onClick={() => removeFilterTag('brand', brand)}>
                  <X className="w-3 h-3 hover:text-black" />
                </button>
              </span>
            ))}

            {filters.sizes.map(size => (
              <span key={size} className="inline-flex items-center space-x-1 px-2.5 py-1 rounded-full bg-stone-200 text-stone-800 text-xs font-medium">
                <span>Size: {size}</span>
                <button onClick={() => removeFilterTag('size', size)}>
                  <X className="w-3 h-3 hover:text-black" />
                </button>
              </span>
            ))}

            {filters.minRating > 0 && (
              <span className="inline-flex items-center space-x-1 px-2.5 py-1 rounded-full bg-stone-200 text-stone-800 text-xs font-medium">
                <span>{filters.minRating}★ & Above</span>
                <button onClick={() => removeFilterTag('rating')}>
                  <X className="w-3 h-3 hover:text-black" />
                </button>
              </span>
            )}

            {filters.minDiscount > 0 && (
              <span className="inline-flex items-center space-x-1 px-2.5 py-1 rounded-full bg-stone-200 text-stone-800 text-xs font-medium">
                <span>{filters.minDiscount}%+ Discount</span>
                <button onClick={() => removeFilterTag('discount')}>
                  <X className="w-3 h-3 hover:text-black" />
                </button>
              </span>
            )}

            <button
              onClick={resetFilters}
              className="text-xs text-rose-600 hover:text-rose-800 font-semibold ml-2"
            >
              Reset All
            </button>
          </div>
        )}

        {/* 2-Column Flipkart Layout: Left Filters + Right Grid */}
        <div className="grid grid-cols-1 lg:grid-cols-4 gap-6 pt-6 items-start">
          {/* Desktop Left Sidebar Filters */}
          <div className="hidden lg:block lg:col-span-1 sticky top-32">
            <FilterSidebar />
          </div>

          {/* Right Product Grid */}
          <div className="lg:col-span-3">
            {filteredProducts.length === 0 ? (
              <div className="bg-white rounded-2xl border border-stone-200 p-12 text-center my-6">
                <div className="w-16 h-16 rounded-full bg-stone-100 flex items-center justify-center mx-auto mb-4 text-stone-400">
                  <ShoppingBag className="w-8 h-8" />
                </div>
                <h3 className="font-cinzel text-xl font-bold text-stone-900">
                  No matching garments found
                </h3>
                <p className="text-xs text-stone-500 mt-2 max-w-md mx-auto">
                  Try adjusting your filters or price slider, or reset all filters to explore the entire Velmira collection.
                </p>
                <button
                  onClick={resetFilters}
                  className="mt-6 px-6 py-2.5 rounded-full bg-[#0F0F0F] text-[#D4AF37] font-semibold text-xs uppercase tracking-wider hover:bg-stone-800 transition"
                >
                  Clear All Filters
                </button>
              </div>
            ) : (
              <div className="grid grid-cols-2 sm:grid-cols-2 xl:grid-cols-3 gap-4 sm:gap-6">
                {filteredProducts.map(product => (
                  <ProductCard key={product.id} product={product} />
                ))}
              </div>
            )}
          </div>
        </div>
      </div>

      {/* Mobile Filters Slide-in Modal */}
      {isMobileFilterOpen && (
        <div className="fixed inset-0 z-50 overflow-hidden lg:hidden animate-in fade-in">
          <div
            className="absolute inset-0 bg-black/60 backdrop-blur-xs"
            onClick={() => setIsMobileFilterOpen(false)}
          />
          <div className="fixed inset-y-0 right-0 max-w-full flex pl-10">
            <div className="w-screen max-w-xs bg-white shadow-2xl overflow-y-auto">
              <div className="p-4 bg-[#0F0F0F] text-white flex items-center justify-between">
                <span className="font-cinzel font-bold text-sm">Refine & Filter</span>
                <button onClick={() => setIsMobileFilterOpen(false)} className="p-1 text-stone-400 hover:text-white">
                  <X className="w-5 h-5" />
                </button>
              </div>
              <div className="p-4">
                <FilterSidebar onCloseMobile={() => setIsMobileFilterOpen(false)} />
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};
