import React from 'react';
import { RotateCcw, Star, ChevronDown, Check } from 'lucide-react';
import { useShop } from '../context/ShopContext';
import { useCurrency } from '../context/CurrencyContext';
import { CategoryType } from '../types';

interface FilterSidebarProps {
  onCloseMobile?: () => void;
}

export const FilterSidebar: React.FC<FilterSidebarProps> = ({ onCloseMobile }) => {
  const {
    filters,
    setFilters,
    resetFilters,
    categories,
    allBrands,
    allSubcategories,
    allSizes,
    filteredProducts
  } = useShop();
  const { formatPrice } = useCurrency();

  const handleCategoryChange = (cat: CategoryType) => {
    setFilters(prev => ({ ...prev, category: cat }));
  };

  const handleSubcategoryToggle = (sub: string) => {
    setFilters(prev => {
      const exists = prev.subcategories.includes(sub);
      return {
        ...prev,
        subcategories: exists
          ? prev.subcategories.filter(s => s !== sub)
          : [...prev.subcategories, sub]
      };
    });
  };

  const handleBrandToggle = (brand: string) => {
    setFilters(prev => {
      const exists = prev.brands.includes(brand);
      return {
        ...prev,
        brands: exists
          ? prev.brands.filter(b => b !== brand)
          : [...prev.brands, brand]
      };
    });
  };

  const handleSizeToggle = (size: string) => {
    setFilters(prev => {
      const exists = prev.sizes.includes(size);
      return {
        ...prev,
        sizes: exists ? prev.sizes.filter(s => s !== size) : [...prev.sizes, size]
      };
    });
  };

  const handlePriceChange = (val: number) => {
    setFilters(prev => ({ ...prev, maxPrice: val }));
  };

  const handleDiscountChange = (discount: number) => {
    setFilters(prev => ({ ...prev, minDiscount: prev.minDiscount === discount ? 0 : discount }));
  };

  const handleRatingChange = (rating: number) => {
    setFilters(prev => ({ ...prev, minRating: prev.minRating === rating ? 0 : rating }));
  };

  const hasActiveFilters =
    filters.category !== 'All' ||
    filters.subcategories.length > 0 ||
    filters.brands.length > 0 ||
    filters.sizes.length > 0 ||
    filters.minDiscount > 0 ||
    filters.minRating > 0 ||
    filters.inStockOnly ||
    filters.maxPrice < 50000;

  return (
    <div className="bg-white rounded-xl border border-stone-200 p-4 sm:p-5 shadow-xs divide-y divide-stone-200 space-y-5">
      {/* Header with Clear Button */}
      <div className="flex items-center justify-between pb-1">
        <div>
          <h3 className="font-cinzel text-base font-bold text-stone-900 tracking-wide">Filters</h3>
          <p className="text-[11px] text-stone-500 mt-0.5">{filteredProducts.length} items found</p>
        </div>
        {hasActiveFilters && (
          <button
            onClick={resetFilters}
            className="text-[11px] font-semibold text-rose-600 hover:text-rose-800 flex items-center space-x-1"
          >
            <RotateCcw className="w-3 h-3" />
            <span>Clear All</span>
          </button>
        )}
      </div>

      {/* Category Filter */}
      <div className="pt-4 space-y-2">
        <label className="text-xs font-bold text-stone-900 uppercase tracking-wider block">
          Category
        </label>
        <div className="space-y-1 max-h-44 overflow-y-auto pr-1">
          {categories.map(cat => (
            <button
              key={cat}
              onClick={() => handleCategoryChange(cat)}
              className={`w-full text-left px-2.5 py-1.5 rounded-lg text-xs font-medium transition flex items-center justify-between ${
                filters.category === cat
                  ? 'bg-[#0F0F0F] text-[#D4AF37] font-semibold'
                  : 'text-stone-700 hover:bg-stone-100'
              }`}
            >
              <span>{cat}</span>
              {filters.category === cat && <Check className="w-3.5 h-3.5 text-[#D4AF37]" />}
            </button>
          ))}
        </div>
      </div>

      {/* Subcategories */}
      {allSubcategories.length > 0 && (
        <div className="pt-4 space-y-2">
          <label className="text-xs font-bold text-stone-900 uppercase tracking-wider block">
            Subcategory
          </label>
          <div className="space-y-1.5 max-h-40 overflow-y-auto pr-1">
            {allSubcategories.map(sub => {
              const checked = filters.subcategories.includes(sub);
              return (
                <label
                  key={sub}
                  className="flex items-center space-x-2 text-xs text-stone-700 cursor-pointer hover:text-black select-none"
                >
                  <input
                    type="checkbox"
                    checked={checked}
                    onChange={() => handleSubcategoryToggle(sub)}
                    className="rounded border-stone-300 text-stone-900 focus:ring-[#D4AF37] h-3.5 w-3.5"
                  />
                  <span className="truncate">{sub}</span>
                </label>
              );
            })}
          </div>
        </div>
      )}

      {/* Price Range Slider */}
      <div className="pt-4 space-y-3">
        <div className="flex items-center justify-between">
          <label className="text-xs font-bold text-stone-900 uppercase tracking-wider">
            Price Range
          </label>
          <span className="text-xs font-mono font-bold text-stone-900">
            Up to {formatPrice(filters.maxPrice)}
          </span>
        </div>
        <input
          type="range"
          min={1000}
          max={50000}
          step={500}
          value={filters.maxPrice}
          onChange={e => handlePriceChange(Number(e.target.value))}
          className="w-full accent-[#0F0F0F] h-1.5 bg-stone-200 rounded-lg cursor-pointer"
        />
        <div className="flex justify-between text-[10px] text-stone-400 font-mono">
          <span>{formatPrice(1000)}</span>
          <span>{formatPrice(50000)}</span>
        </div>
      </div>

      {/* Brand Filter */}
      {allBrands.length > 0 && (
        <div className="pt-4 space-y-2">
          <label className="text-xs font-bold text-stone-900 uppercase tracking-wider block">
            Luxury Brand
          </label>
          <div className="space-y-1.5 max-h-40 overflow-y-auto pr-1">
            {allBrands.map(brand => {
              const checked = filters.brands.includes(brand);
              return (
                <label
                  key={brand}
                  className="flex items-center space-x-2 text-xs text-stone-700 cursor-pointer hover:text-black select-none"
                >
                  <input
                    type="checkbox"
                    checked={checked}
                    onChange={() => handleBrandToggle(brand)}
                    className="rounded border-stone-300 text-stone-900 focus:ring-[#D4AF37] h-3.5 w-3.5"
                  />
                  <span className="truncate font-medium">{brand}</span>
                </label>
              );
            })}
          </div>
        </div>
      )}

      {/* Sizes Filter */}
      {allSizes.length > 0 && (
        <div className="pt-4 space-y-2">
          <label className="text-xs font-bold text-stone-900 uppercase tracking-wider block">
            Dial Diameter
          </label>
          <div className="flex flex-wrap gap-1.5 max-h-36 overflow-y-auto">
            {allSizes.map(size => {
              const active = filters.sizes.includes(size);
              return (
                <button
                  key={size}
                  type="button"
                  onClick={() => handleSizeToggle(size)}
                  className={`px-2.5 py-1 text-xs rounded-lg font-medium border transition ${
                    active
                      ? 'bg-[#0F0F0F] text-[#D4AF37] border-black font-bold'
                      : 'border-stone-300 text-stone-700 hover:border-black'
                  }`}
                >
                  {size}
                </button>
              );
            })}
          </div>
        </div>
      )}

      {/* Customer Rating Filter */}
      <div className="pt-4 space-y-2">
        <label className="text-xs font-bold text-stone-900 uppercase tracking-wider block">
          Customer Rating
        </label>
        <div className="space-y-1.5">
          {[4, 3].map(rating => (
            <label
              key={rating}
              className="flex items-center space-x-2 text-xs text-stone-700 cursor-pointer hover:text-black select-none"
            >
              <input
                type="radio"
                name="rating"
                checked={filters.minRating === rating}
                onChange={() => handleRatingChange(rating)}
                className="text-[#0F0F0F] focus:ring-[#D4AF37] h-3.5 w-3.5"
              />
              <div className="flex items-center space-x-1">
                <span>{rating}★ & above</span>
              </div>
            </label>
          ))}
        </div>
      </div>

      {/* Discount Percentage */}
      <div className="pt-4 space-y-2">
        <label className="text-xs font-bold text-stone-900 uppercase tracking-wider block">
          Discount
        </label>
        <div className="space-y-1.5">
          {[50, 40, 20].map(disc => (
            <label
              key={disc}
              className="flex items-center space-x-2 text-xs text-stone-700 cursor-pointer hover:text-black select-none"
            >
              <input
                type="radio"
                name="discount"
                checked={filters.minDiscount === disc}
                onChange={() => handleDiscountChange(disc)}
                className="text-[#0F0F0F] focus:ring-[#D4AF37] h-3.5 w-3.5"
              />
              <span>{disc}% and above</span>
            </label>
          ))}
        </div>
      </div>

      {/* In-Stock Only Toggle */}
      <div className="pt-4">
        <label className="flex items-center justify-between text-xs text-stone-800 cursor-pointer select-none font-semibold">
          <span>In-Stock Items Only</span>
          <input
            type="checkbox"
            checked={filters.inStockOnly}
            onChange={e => setFilters(prev => ({ ...prev, inStockOnly: e.target.checked }))}
            className="rounded border-stone-300 text-stone-900 focus:ring-[#D4AF37] h-4 w-4"
          />
        </label>
      </div>

      {/* Mobile close button */}
      {onCloseMobile && (
        <div className="pt-4 lg:hidden">
          <button
            onClick={onCloseMobile}
            className="w-full py-2.5 rounded-xl bg-[#0F0F0F] text-[#D4AF37] font-semibold text-xs uppercase tracking-wider"
          >
            Apply Filters
          </button>
        </div>
      )}
    </div>
  );
};
