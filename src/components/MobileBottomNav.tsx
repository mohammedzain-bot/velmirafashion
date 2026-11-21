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
    <nav className="fixed bottom-0 inset-x-0 bg-[#0F0F0F] text-stone-300 border-t border-stone-800 z-40 sm:hidden">
      <div className="grid grid-cols-4 items-center h-15">
        {/* Home */}
        <Link
          to="/"
          className={`flex flex-col items-center justify-center h-full relative transition ${
            location.pathname === '/' ? 'text-[#D4AF37]' : 'text-stone-400 hover:text-stone-200'
          }`}
        >
          <Home className="w-5 h-5" />
          <span className="text-[10px] mt-1 font-medium">Home</span>
        </Link>

        {/* Collections */}
        <Link
          to="/products"
          className={`flex flex-col items-center justify-center h-full relative transition ${
            location.pathname.startsWith('/products') ? 'text-[#D4AF37]' : 'text-stone-400 hover:text-stone-200'
          }`}
        >
          <Grid className="w-5 h-5" />
          <span className="text-[10px] mt-1 font-medium">Catalog</span>
        </Link>

        {/* Wishlist */}
        <Link
          to="/products"
          onClick={() => {}}
          className="flex flex-col items-center justify-center h-full relative text-stone-400 hover:text-stone-200 transition"
        >
          <div className="relative">
            <Heart className="w-5 h-5" />
            {wishlistIds.length > 0 && (
              <span className="absolute -top-1.5 -right-2 bg-[#D4AF37] text-black font-bold text-[9px] w-4 h-4 rounded-full flex items-center justify-center font-mono">
                {wishlistIds.length}
              </span>
            )}
          </div>
          <span className="text-[10px] mt-1 font-medium">Wishlist</span>
        </Link>

        {/* Shopping Bag / Checkout */}
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
