import React from 'react';
import { Link, useLocation } from 'react-router-dom';
import { 
  Sparkles, 
  Flame, 
  Watch, 
  Briefcase, 
  Clock, 
  Gem, 
  ShieldCheck, 
  Layers, 
  ShoppingBag 
} from 'lucide-react';
import { CategoryType } from '../types';

interface CategoryItem {
  name: CategoryType;
  label: string;
  icon: React.ElementType;
  badge?: string;
  isSpecial?: boolean;
}

export const CategoryBar: React.FC = () => {
  const location = useLocation();

  const categories: CategoryItem[] = [
    { name: 'All', label: 'All Collections', icon: Layers },
    { name: 'Watches', label: 'All Timepieces', icon: Watch },
    { name: 'Bags', label: 'All Luxury Bags', icon: Briefcase },
    { name: "Men's Watches", label: "Men's Horology", icon: Clock },
    { name: "Women's Watches", label: "Women's Watches", icon: Gem },
    { name: 'Leather Bags', label: 'Leather Bags', icon: ShoppingBag },
    { name: 'Tote Bags', label: 'Executive Totes', icon: Briefcase },
    { name: 'Clutches & Wallets', label: 'Clutches & Wallets', icon: ShieldCheck },
    { name: 'New Arrivals', label: 'New Arrivals', icon: Sparkles, badge: 'NEW' },
    { name: 'Sale', label: 'Private Sale', icon: Flame, badge: 'UP TO 55%', isSpecial: true }
  ];

  return (
    <div className="bg-white border-b border-stone-200 shadow-xs">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between overflow-x-auto py-2.5 space-x-6 sm:space-x-8 scrollbar-none">
          {categories.map(cat => {
            const Icon = cat.icon;
            const searchParams = new URLSearchParams(location.search);
            const currentCat = searchParams.get('category');
            const isActive = currentCat === cat.name || (!currentCat && cat.name === 'All');

            return (
              <Link
                key={cat.name}
                to={cat.name === 'All' ? '/products' : `/products?category=${encodeURIComponent(cat.name)}`}
                className={`flex flex-col sm:flex-row items-center space-y-1 sm:space-y-0 sm:space-x-2 shrink-0 py-1 px-2 rounded-lg transition-all group ${
                  isActive
                    ? 'text-[#0F0F0F] font-bold border-b-2 border-[#D4AF37]'
                    : cat.isSpecial
                    ? 'text-rose-600 hover:text-rose-700 font-semibold'
                    : 'text-stone-700 hover:text-[#C5A059] font-medium'
                }`}
              >
                <div className="relative">
                  <Icon
                    className={`w-4 h-4 transition-transform group-hover:scale-110 ${
                      isActive
                        ? 'text-[#D4AF37]'
                        : cat.isSpecial
                        ? 'text-rose-600'
                        : 'text-stone-500 group-hover:text-[#C5A059]'
                    }`}
                  />
                  {cat.badge && (
                    <span
                      className={`absolute -top-2.5 -right-3 text-[8px] font-bold px-1 rounded uppercase tracking-wider text-white shadow-xs ${
                        cat.isSpecial ? 'bg-rose-600' : 'bg-emerald-700'
                      }`}
                    >
                      {cat.badge}
                    </span>
                  )}
                </div>
                <span className="text-xs tracking-wide whitespace-nowrap">{cat.label}</span>
              </Link>
            );
          })}
        </div>
      </div>
    </div>
  );
};
