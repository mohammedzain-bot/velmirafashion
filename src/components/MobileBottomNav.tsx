import React from 'react';
import { Link, useLocation } from 'react-router-dom';
import { Home, Grid, Heart, ShoppingBag, MessageSquare } from 'lucide-react';
import { useCart } from '../context/CartContext';
import { useWishlist } from '../context/WishlistContext';
import { WHATSAPP_RAW_NUMBER } from '../utils/whatsapp';

export const MobileBottomNav: React.FC = () => {
  const location = useLocation();
  const { totalItemsCount, setIsCartDrawerOpen } = useCart();
  const { wishlistIds } = useWishlist();

  return (
    <nav className="fixed bottom-0 left-0 right-6 sm:right-7.5 bg-white/95 backdrop-blur-md text-[#777777] border-t border-neutral-200 z-40 sm:hidden">
      <div className="grid grid-cols-4 items-center h-14">
        {/* Home */}
        <Link
          to="/"
          className={`flex flex-col items-center justify-center h-full relative transition ${
            location.pathname === '/' ? 'text-[#111111] font-semibold' : 'text-[#777777] hover:text-[#111111]'
          }`}
        >
          <Home className="w-4 h-4" />
          <span className="text-[10px] mt-1 font-medium">Home</span>
        </Link>

        {/* Collections */}
        <Link
          to="/watches"
          className={`flex flex-col items-center justify-center h-full relative transition ${
            location.pathname.startsWith('/watches') || location.pathname.startsWith('/products') ? 'text-[#111111] font-semibold' : 'text-[#777777] hover:text-[#111111]'
          }`}
        >
          <Grid className="w-4 h-4" />
          <span className="text-[10px] mt-1 font-medium">Watches</span>
        </Link>

        {/* Wishlist */}
        <Link
          to="/watches"
          className="flex flex-col items-center justify-center h-full relative text-[#777777] hover:text-[#111111] transition"
        >
          <div className="relative">
            <Heart className="w-4 h-4" />
            {wishlistIds.length > 0 && (
              <span className="absolute -top-1.5 -right-2 bg-[#111111] text-white font-bold text-[9px] w-3.5 h-3.5 rounded-full flex items-center justify-center font-mono">
                {wishlistIds.length}
              </span>
            )}
          </div>
          <span className="text-[10px] mt-1 font-medium">Wishlist</span>
        </Link>

        {/* Shopping Bag / Checkout */}
        <button
          onClick={() => setIsCartDrawerOpen(true)}
          className="flex flex-col items-center justify-center h-full relative text-[#777777] hover:text-[#111111] transition"
        >
          <div className="relative">
            <ShoppingBag className="w-4 h-4" />
            {totalItemsCount > 0 && (
              <span className="absolute -top-1.5 -right-2 bg-[#111111] text-white font-bold text-[9px] w-3.5 h-3.5 rounded-full flex items-center justify-center font-mono">
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
