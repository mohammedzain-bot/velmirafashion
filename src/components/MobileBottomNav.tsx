import React from 'react';
import { Link, useLocation } from 'react-router-dom';
import { Home, Grid, Heart, User, ShoppingBag } from 'lucide-react';
import { useCart } from '../context/CartContext';
import { useWishlist } from '../context/WishlistContext';
import { useAuth } from '../context/AuthContext';

export const MobileBottomNav: React.FC = () => {
  const location = useLocation();
  const { totalItemsCount, setIsCartDrawerOpen } = useCart();
  const { wishlistIds } = useWishlist();
  const { user } = useAuth();

  const navItems = [
    { label: 'Home', path: '/', icon: Home },
    { label: 'Categories', path: '/products', icon: Grid },
    { label: 'Wishlist', path: '/dashboard?tab=wishlist', icon: Heart, count: wishlistIds.length },
    { label: 'Account', path: user ? '/dashboard?tab=profile' : '/dashboard', icon: User },
  ];

  return (
    <nav className="fixed bottom-0 inset-x-0 bg-[#0F0F0F] text-stone-300 border-t border-stone-800 z-40 sm:hidden">
      <div className="grid grid-cols-5 items-center h-15">
        {navItems.map((item, idx) => {
          const Icon = item.icon;
          const isActive = location.pathname === item.path;
          return (
            <Link
              key={idx}
              to={item.path}
              className={`flex flex-col items-center justify-center h-full relative transition ${
                isActive ? 'text-[#D4AF37]' : 'text-stone-400 hover:text-stone-200'
              }`}
            >
              <div className="relative">
                <Icon className="w-5 h-5" />
                {item.count !== undefined && item.count > 0 && (
                  <span className="absolute -top-1.5 -right-2 bg-[#D4AF37] text-black font-bold text-[9px] w-4 h-4 rounded-full flex items-center justify-center font-mono">
                    {item.count}
                  </span>
                )}
              </div>
              <span className="text-[10px] mt-1 font-medium">{item.label}</span>
            </Link>
          );
        })}

        {/* Cart button */}
        <button
          onClick={() => setIsCartDrawerOpen(true)}
          className="flex flex-col items-center justify-center h-full relative text-stone-400 hover:text-[#D4AF37] transition"
        >
          <div className="relative">
            <ShoppingBag className="w-5 h-5" />
            {totalItemsCount > 0 && (
              <span className="absolute -top-1.5 -right-2 bg-[#D4AF37] text-black font-bold text-[9px] w-4 h-4 rounded-full flex items-center justify-center font-mono">
                {totalItemsCount}
              </span>
            )}
          </div>
          <span className="text-[10px] mt-1 font-medium">Bag</span>
        </button>
      </div>
    </nav>
  );
};
