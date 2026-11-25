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
    <div className="bg-[#141822] border border-[#2A3142] p-4 sm:p-5 divide-y divide-[#1E2536] space-y-5 font-sans shadow-lg">
      {/* Header with Clear Button */}
      <div className="flex items-center justify-between pb-1">
        <div>
          <h3 className="font-serif text-sm font-bold uppercase tracking-wider text-white">Refine Vault</h3>
          <p className="text-[11px] text-[#94A3B8] mt-0.5">{filteredProducts.length} timepieces</p>
        </div>
        {hasActiveFilters && (
          <button
            onClick={resetFilters}
            className="text-[11px] font-medium text-[#D4AF37] hover:underline flex items-center space-x-1"
          >
            <RotateCcw className="w-3 h-3" />
            <span>Reset</span>
          </button>
        )}
      </div>

      {/* Category Filter */}
      <div className="pt-4 space-y-2">
        <label className="text-xs font-semibold text-[#D4AF37] uppercase tracking-wider block">
          Watch Category
        </label>
        <div className="space-y-1 max-h-48 overflow-y-auto pr-1">
          {categories.map(cat => (
            <button
              key={cat}
              onClick={() => handleCategoryChange(cat)}
              className={`w-full text-left px-2.5 py-1.5 text-xs font-medium transition flex items-center justify-between ${
                filters.category === cat
                  ? 'bg-[#D4AF37] text-black font-semibold'
                  : 'text-[#94A3B8] hover:bg-[#1E2536] hover:text-white'
              }`}
            >
              <span>{cat}</span>
              {filters.category === cat && <Check className="w-3.5 h-3.5 text-black" />}
            </button>
          ))}
        </div>
      </div>

      {/* Price Range Slider */}
      <div className="pt-4 space-y-3">
        <div className="flex items-center justify-between">
          <label className="text-xs font-semibold text-[#D4AF37] uppercase tracking-wider">
            Price Range
          </label>
          <span className="text-xs font-mono font-medium text-white">
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
          className="w-full accent-[#D4AF37] h-1 bg-[#1E2536] cursor-pointer"
        />
        <div className="flex justify-between text-[10px] text-[#94A3B8] font-mono">
          <span>{formatPrice(1000)}</span>
          <span>{formatPrice(50000)}</span>
        </div>
      </div>

      {/* Subcategory / Calibre Type */}
      {allSubcategories.length > 0 && (
        <div className="pt-4 space-y-2">
          <label className="text-xs font-semibold text-[#D4AF37] uppercase tracking-wider block">
            Movement & Complications
          </label>
          <div className="space-y-1 max-h-40 overflow-y-auto pr-1">
            {allSubcategories.map(sub => {
              const checked = filters.subcategories.includes(sub);
              return (
                <label
                  key={sub}
                  className="flex items-center space-x-2 text-xs text-[#94A3B8] hover:text-white cursor-pointer py-0.5"
                >
                  <input
                    type="checkbox"
                    checked={checked}
                    onChange={() => handleSubcategoryToggle(sub)}
                    className="accent-[#D4AF37] rounded-none"
                  />
                  <span>{sub}</span>
                </label>
              );
            })}
          </div>
        </div>
      )}

      {/* Case Diameter Sizes */}
      {allSizes.length > 0 && (
        <div className="pt-4 space-y-2">
          <label className="text-xs font-semibold text-[#D4AF37] uppercase tracking-wider block">
            Dial Diameter
          </label>
          <div className="flex flex-wrap gap-1.5">
            {allSizes.map(size => {
              const active = filters.sizes.includes(size);
              return (
                <button
                  key={size}
                  onClick={() => handleSizeToggle(size)}
                  className={`px-2.5 py-1 text-xs border font-mono transition ${
                    active
                      ? 'border-[#D4AF37] bg-[#D4AF37] text-black font-bold'
                      : 'border-[#2A3142] text-[#94A3B8] hover:border-[#D4AF37] hover:text-white bg-[#0E1118]'
                  }`}
                >
                  {size}
                </button>
              );
            })}
          </div>
        </div>
      )}

      {/* In-stock Only */}
      <div className="pt-4">
        <label className="flex items-center space-x-2 text-xs text-[#CBD5E1] cursor-pointer">
          <input
            type="checkbox"
            checked={filters.inStockOnly}
            onChange={e => setFilters(prev => ({ ...prev, inStockOnly: e.target.checked }))}
            className="accent-[#D4AF37]"
          />
          <span>In Stock & Ready for Immediate Dispatch</span>
        </label>
      </div>

      {onCloseMobile && (
        <div className="pt-4">
          <button
            onClick={onCloseMobile}
            className="w-full py-2.5 bg-[#D4AF37] text-black font-semibold text-xs uppercase tracking-wider hover:bg-[#E5B869] transition"
          >
            Apply Filters
          </button>
        </div>
      )}
    </div>
  );
};
