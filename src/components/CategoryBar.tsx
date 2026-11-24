import React from 'react';
import { Link, useLocation } from 'react-router-dom';
import { 
  Watch, 
  Layers, 
  Compass, 
  Sparkles, 
  ShieldCheck, 
  Award,
  Clock
} from 'lucide-react';
import { CategoryType } from '../types';

interface CategoryItem {
  name: CategoryType;
  label: string;
  icon: React.ElementType;
}

export const CategoryBar: React.FC = () => {
  const location = useLocation();

  const categories: CategoryItem[] = [
    { name: 'All Watches', label: 'All Watches', icon: Layers },
    { name: "Men's Watches", label: "Men's Watches", icon: Clock },
    { name: "Women's Watches", label: "Women's Watches", icon: Sparkles },
    { name: 'Luxury Watches', label: 'Luxury Watches', icon: Award },
    { name: 'Classic Watches', label: 'Classic Watches', icon: ShieldCheck },
    { name: 'Sports Watches', label: 'Sports Watches', icon: Compass },
    { name: 'Minimal Watches', label: 'Minimal Watches', icon: Watch }
  ];

  return (
    <div className="bg-white border-b border-stone-200 sticky top-[73px] z-30 transition-all">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between overflow-x-auto py-2.5 space-x-6 sm:space-x-8 scrollbar-none">
          {categories.map(cat => {
            const Icon = cat.icon;
            const searchParams = new URLSearchParams(location.search);
            const currentCat = searchParams.get('category');
            const isActive = currentCat === cat.name || (!currentCat && (cat.name === 'All Watches' || cat.name === 'All'));

            return (
              <Link
                key={cat.name}
                to={cat.name === 'All Watches' ? '/products' : `/products?category=${encodeURIComponent(cat.name)}`}
                className={`flex items-center space-x-1.5 shrink-0 py-1 px-3 rounded-full text-xs font-semibold uppercase tracking-wider transition-all duration-200 ${
                  isActive
                    ? 'bg-black text-white'
                    : 'text-stone-600 hover:text-black hover:bg-stone-100'
                }`}
              >
                <Icon className="w-3.5 h-3.5" />
                <span className="font-sans text-[11px] whitespace-nowrap">
                  {cat.label}
                </span>
              </Link>
            );
          })}
        </div>
      </div>
    </div>
  );
};
