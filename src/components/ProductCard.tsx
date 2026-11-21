import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { Heart, Star, ShoppingBag, Eye, Zap } from 'lucide-react';
import { Product } from '../types';
import { useCart } from '../context/CartContext';
import { useWishlist } from '../context/WishlistContext';

interface ProductCardProps {
  product: Product;
  onQuickView?: (product: Product) => void;
}

export const ProductCard: React.FC<ProductCardProps> = ({ product, onQuickView }) => {
  const { addToCart } = useCart();
  const { isInWishlist, toggleWishlist } = useWishlist();
  const [isHovered, setIsHovered] = useState(false);
  const inWish = isInWishlist(product.id);

  const primaryImage = product.images[0];
  const secondaryImage = product.images[1] || product.images[0];

  const handleQuickAdd = (e: React.MouseEvent) => {
    e.preventDefault();
    e.stopPropagation();
    addToCart(
      product,
      product.sizes[0] || 'Free Size',
      product.colors[0]?.name || 'Standard',
      1
    );
  };

  const handleWishlistClick = (e: React.MouseEvent) => {
    e.preventDefault();
    e.stopPropagation();
    toggleWishlist(product);
  };

  return (
    <div
      className="group relative bg-white rounded-xl border border-stone-200/90 hover:border-stone-400/60 shadow-xs hover:shadow-xl transition-all duration-300 flex flex-col overflow-hidden"
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
    >
      {/* Product Image Frame */}
      <Link to={`/products/${product.id}`} className="relative block aspect-[3/4] overflow-hidden bg-stone-100">
        <img
          src={isHovered ? secondaryImage : primaryImage}
          alt={product.name}
          className="w-full h-full object-cover object-top transition-transform duration-700 ease-out group-hover:scale-105"
          loading="lazy"
        />

        {/* Top Badges */}
        <div className="absolute top-2.5 left-2.5 flex flex-col gap-1 z-10">
          {product.isBestSeller && (
            <span className="bg-[#0F0F0F] text-[#D4AF37] text-[10px] font-bold px-2 py-0.5 rounded tracking-widest uppercase shadow-sm">
              Bestseller
            </span>
          )}
          {product.isNewArrival && (
            <span className="bg-emerald-800 text-white text-[10px] font-bold px-2 py-0.5 rounded tracking-widest uppercase shadow-sm">
              New Arrival
            </span>
          )}
          {product.discountPercentage >= 50 && (
            <span className="bg-amber-600 text-white text-[10px] font-bold px-2 py-0.5 rounded tracking-wider shadow-sm">
              {product.discountPercentage}% OFF
            </span>
          )}
        </div>

        {/* Wishlist Button */}
        <button
          onClick={handleWishlistClick}
          aria-label="Save to Wishlist"
          className={`absolute top-2.5 right-2.5 p-2 rounded-full transition-all duration-200 shadow-md ${
            inWish
              ? 'bg-rose-50 text-rose-600 hover:bg-rose-100'
              : 'bg-white/90 text-stone-700 hover:text-rose-600 hover:bg-white'
          }`}
        >
          <Heart className={`w-4 h-4 ${inWish ? 'fill-rose-600 text-rose-600' : ''}`} />
        </button>

        {/* Quick View overlay button */}
        {onQuickView && (
          <button
            onClick={(e) => {
              e.preventDefault();
              e.stopPropagation();
              onQuickView(product);
            }}
            className="absolute bottom-3 left-1/2 -translate-x-1/2 px-3.5 py-1.5 rounded-full bg-white/90 backdrop-blur-xs text-stone-900 text-xs font-semibold shadow-md opacity-0 group-hover:opacity-100 transition-all duration-200 flex items-center space-x-1.5 hover:bg-white"
          >
            <Eye className="w-3.5 h-3.5" />
            <span>Quick View</span>
          </button>
        )}
      </Link>

      {/* Product Details */}
      <div className="p-3.5 sm:p-4 flex-1 flex flex-col justify-between">
        <div>
          {/* Brand & Rating Bar */}
          <div className="flex items-center justify-between mb-1">
            <span className="text-[11px] font-bold tracking-wider text-[#C5A059] uppercase font-cinzel">
              {product.brand}
            </span>
            <div className="flex items-center space-x-1 bg-emerald-700 text-white text-[10px] font-bold px-1.5 py-0.5 rounded">
              <span>{product.rating}</span>
              <Star className="w-2.5 h-2.5 fill-white text-white" />
              <span className="text-emerald-200 font-normal">({product.ratingCount})</span>
            </div>
          </div>

          {/* Product Name */}
          <Link to={`/products/${product.id}`} className="block">
            <h3 className="text-xs sm:text-sm font-medium text-stone-800 line-clamp-2 hover:text-[#C5A059] transition-colors leading-snug">
              {product.name}
            </h3>
          </Link>

          {/* Available Sizes preview */}
          <div className="flex flex-wrap items-center gap-1 mt-2">
            <span className="text-[10px] text-stone-400 font-medium">Sizes:</span>
            {product.sizes.slice(0, 4).map((sz, idx) => (
              <span
                key={idx}
                className="text-[10px] px-1.5 py-0.2 rounded border border-stone-200 text-stone-600 font-medium"
              >
                {sz}
              </span>
            ))}
            {product.sizes.length > 4 && (
              <span className="text-[10px] text-stone-400">+{product.sizes.length - 4}</span>
            )}
          </div>
        </div>

        {/* Pricing & Cart Action */}
        <div className="mt-3 pt-2.5 border-t border-stone-100 flex items-end justify-between">
          <div>
            <div className="flex items-baseline space-x-1.5">
              <span className="text-sm sm:text-base font-bold text-stone-900 font-mono">
                ₹{product.discountedPrice.toLocaleString('en-IN')}
              </span>
              <span className="text-xs text-stone-400 line-through font-mono">
                ₹{product.originalPrice.toLocaleString('en-IN')}
              </span>
            </div>
            {product.stock <= 5 && product.stock > 0 && (
              <p className="text-[10px] font-semibold text-amber-700 mt-0.5 flex items-center">
                <Zap className="w-2.5 h-2.5 mr-0.5 fill-amber-500 text-amber-500" /> Only {product.stock} left in stock!
              </p>
            )}
          </div>

          <button
            onClick={handleQuickAdd}
            className="p-2 sm:px-3 sm:py-1.5 rounded-lg bg-[#0F0F0F] text-[#D4AF37] hover:bg-stone-800 transition-all flex items-center space-x-1 shadow-xs group/btn"
            title="Add to Bag"
          >
            <ShoppingBag className="w-3.5 h-3.5" />
            <span className="hidden sm:inline text-xs font-semibold uppercase tracking-wider">Add</span>
          </button>
        </div>
      </div>
    </div>
  );
};
