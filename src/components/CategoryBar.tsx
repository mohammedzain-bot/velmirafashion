import React from 'react';
import { Link, useLocation } from 'react-router-dom';
import { 
  Sparkles, 
  Watch, 
  Clock, 
  Layers,
  Compass,
  Activity,
  Moon,
  Gem,
  Award
} from 'lucide-react';
import { CategoryType } from '../types';

interface CategoryItem {
  name: CategoryType;
  label: string;
  icon: React.ElementType;
  badge?: string;
}

export const CategoryBar: React.FC = () => {
  const location = useLocation();

  const categories: CategoryItem[] = [
    { name: 'All', label: 'All Horology', icon: Layers },
    { name: 'Chronograph', label: 'Chronographs', icon: Clock },
    { name: 'Automatic', label: 'Automatics', icon: Watch },
    { name: 'Tourbillon', label: 'Tourbillons', icon: Activity, badge: 'EXCLUSIVE' },
    { name: 'Diver', label: '300M+ Divers', icon: Compass },
    { name: 'Skeleton', label: 'Openwork Skeletons', icon: Award },
    { name: 'Moonphase', label: 'Moonphase & Calendar', icon: Moon },
    { name: 'Classic Dress', label: 'Dress & Diamond', icon: Gem },
    { name: 'New Arrivals', label: 'New Releases', icon: Sparkles, badge: 'NEW' }
  ];

  return (
    <div className="bg-[#0F0F0F] border-b border-stone-800 shadow-sm sticky top-[48px] z-30 transition-all duration-300">
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
                className={`flex items-center space-x-2 shrink-0 py-1 px-2.5 rounded-full text-xs transition-all duration-200 group ${
                  isActive
                    ? 'bg-stone-800 text-[#D4AF37] font-semibold shadow-xs'
                    : 'text-stone-400 hover:text-white hover:bg-stone-900'
                }`}
              >
                <Icon
                  className={`w-3.5 h-3.5 transition-transform group-hover:scale-110 ${
                    isActive ? 'text-[#D4AF37]' : 'text-stone-400 group-hover:text-stone-200'
                  }`}
                />
                <span className="font-cinzel tracking-wider text-[11px] whitespace-nowrap">
                  {cat.label}
                </span>
                {cat.badge && (
                  <span className="text-[8px] font-bold px-1.5 py-0.2 rounded-full uppercase tracking-wider bg-[#D4AF37] text-black">
                    {cat.badge}
                  </span>
                )}
              </Link>
            );
          })}
        </div>
      </div>
    </div>
  );
};
