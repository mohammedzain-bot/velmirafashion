import React from 'react';
import { RotateCcw, Check } from 'lucide-react';
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
    <div className="bg-white border border-neutral-200 p-4 sm:p-5 divide-y divide-neutral-200 space-y-5 font-sans">
      {/* Header with Clear Button */}
      <div className="flex items-center justify-between pb-1">
        <div>
          <h3 className="font-serif text-sm font-bold uppercase tracking-wider text-[#111111]">Refine</h3>
          <p className="text-[11px] text-[#777777] mt-0.5">{filteredProducts.length} watches</p>
        </div>
        {hasActiveFilters && (
          <button
            onClick={resetFilters}
            className="text-[11px] font-medium text-[#111111] hover:underline flex items-center space-x-1"
          >
            <RotateCcw className="w-3 h-3" />
            <span>Reset</span>
          </button>
        )}
      </div>

      {/* Category Filter */}
      <div className="pt-4 space-y-2">
        <label className="text-xs font-semibold text-[#111111] uppercase tracking-wider block">
          Category
        </label>
        <div className="space-y-1 max-h-48 overflow-y-auto pr-1">
          {categories.map(cat => (
            <button
              key={cat}
              onClick={() => handleCategoryChange(cat)}
              className={`w-full text-left px-2.5 py-1.5 text-xs font-medium transition flex items-center justify-between ${
                filters.category === cat
                  ? 'bg-[#111111] text-white font-semibold'
                  : 'text-[#777777] hover:bg-[#F8F8F8] hover:text-[#111111]'
              }`}
            >
              <span>{cat}</span>
              {filters.category === cat && <Check className="w-3.5 h-3.5 text-white" />}
            </button>
          ))}
        </div>
      </div>

      {/* Price Range Slider */}
      <div className="pt-4 space-y-3">
        <div className="flex items-center justify-between">
          <label className="text-xs font-semibold text-[#111111] uppercase tracking-wider">
            Price Range
          </label>
          <span className="text-xs font-mono font-medium text-[#111111]">
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
          className="w-full accent-black h-1 bg-neutral-200 cursor-pointer"
        />
        <div className="flex justify-between text-[10px] text-[#777777] font-mono">
          <span>{formatPrice(1000)}</span>
          <span>{formatPrice(50000)}</span>
        </div>
      </div>

      {/* Brand Filter */}
      {allBrands.length > 0 && (
        <div className="pt-4 space-y-2">
          <label className="text-xs font-semibold text-[#111111] uppercase tracking-wider block">
            Brand / Atelier
          </label>
          <div className="space-y-1.5 max-h-40 overflow-y-auto pr-1">
            {allBrands.map(brand => {
              const checked = filters.brands.includes(brand);
              return (
                <label
                  key={brand}
                  className="flex items-center space-x-2 text-xs text-[#777777] cursor-pointer hover:text-[#111111] select-none"
                >
                  <input
                    type="checkbox"
                    checked={checked}
                    onChange={() => handleBrandToggle(brand)}
                    className="border-neutral-300 text-black focus:ring-black h-3.5 w-3.5"
                  />
                  <span className="truncate">{brand}</span>
                </label>
              );
            })}
          </div>
        </div>
      )}

      {/* Sizes / Case Diameters Filter */}
      {allSizes.length > 0 && (
        <div className="pt-4 space-y-2">
          <label className="text-xs font-semibold text-[#111111] uppercase tracking-wider block">
            Case Diameter
          </label>
          <div className="flex flex-wrap gap-1.5 max-h-36 overflow-y-auto">
            {allSizes.map(size => {
              const active = filters.sizes.includes(size);
              return (
                <button
                  key={size}
                  type="button"
                  onClick={() => handleSizeToggle(size)}
                  className={`px-2.5 py-1 text-xs font-medium border transition ${
                    active
                      ? 'bg-[#111111] text-white border-black font-semibold'
                      : 'border-neutral-300 text-[#777777] hover:border-black hover:text-[#111111]'
                  }`}
                >
                  {size}
                </button>
              );
            })}
          </div>
        </div>
      )}

      {/* In-Stock Only Toggle */}
      <div className="pt-4">
        <label className="flex items-center justify-between text-xs text-[#111111] cursor-pointer select-none font-medium">
          <span>In-Stock Watches Only</span>
          <input
            type="checkbox"
            checked={filters.inStockOnly}
            onChange={e => setFilters(prev => ({ ...prev, inStockOnly: e.target.checked }))}
            className="border-neutral-300 text-black focus:ring-black h-4 w-4"
          />
        </label>
      </div>

      {/* Mobile close button */}
      {onCloseMobile && (
        <div className="pt-4 lg:hidden">
          <button
            onClick={onCloseMobile}
            className="w-full py-2.5 bg-[#111111] text-white font-medium text-xs uppercase tracking-wider hover:bg-neutral-800 transition"
          >
            Apply Filters
          </button>
        </div>
      )}
    </div>
  );
};