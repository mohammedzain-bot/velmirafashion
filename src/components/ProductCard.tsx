import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { Heart, MessageCircle, ArrowRight } from 'lucide-react';
import { Product } from '../types';
import { useWishlist } from '../context/WishlistContext';
import { useCurrency } from '../context/CurrencyContext';
import { openDirectProductWhatsApp } from '../utils/whatsapp';

interface ProductCardProps {
  product: Product;
  onQuickView?: (product: Product) => void;
}

export const ProductCard: React.FC<ProductCardProps> = ({ product }) => {
  const navigate = useNavigate();
  const { isInWishlist, toggleWishlist } = useWishlist();
  const { formatPrice, currency } = useCurrency();
  const [isHovered, setIsHovered] = useState(false);
  const inWish = isInWishlist(product.id);

  const primaryImage = product.images[0];
  const secondaryImage = product.images[1] || product.images[0];

  const handleWhatsAppOrder = (e: React.MouseEvent) => {
    e.preventDefault();
    e.stopPropagation();
    openDirectProductWhatsApp(
      product,
      product.sizes[0] || 'Standard',
      product.colors[0]?.name || 'Standard',
      currency
    );
  };

  const handleWishlistClick = (e: React.MouseEvent) => {
    e.preventDefault();
    e.stopPropagation();
    toggleWishlist(product);
  };

  return (
    <div
      className="group relative bg-white border border-stone-200 hover:border-black transition-all duration-300 flex flex-col justify-between"
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
    >
      {/* Product Image Frame */}
      <Link to={`/products/${product.id}`} className="relative block aspect-[4/5] overflow-hidden bg-[#FBFBFB]">
        <img
          src={isHovered ? secondaryImage : primaryImage}
          alt={product.name}
          className="w-full h-full object-cover object-center transition-transform duration-700 ease-out group-hover:scale-105"
          loading="lazy"
        />

        {/* Minimal Badges */}
        <div className="absolute top-3 left-3 flex flex-col gap-1 z-10">
          {product.isNewArrival && (
            <span className="bg-black text-white text-[9px] font-semibold px-2 py-0.5 uppercase tracking-widest">
              NEW
            </span>
          )}
          {product.isBestSeller && !product.isNewArrival && (
            <span className="bg-stone-900 text-white text-[9px] font-semibold px-2 py-0.5 uppercase tracking-widest">
              BESTSELLER
            </span>
          )}
        </div>

        {/* Wishlist Icon */}
        <button
          onClick={handleWishlistClick}
          aria-label="Save to Wishlist"
          className={`absolute top-3 right-3 p-2 rounded-full transition-all duration-200 z-10 shadow-xs ${
            inWish
              ? 'bg-black text-white'
              : 'bg-white/90 text-stone-700 hover:text-black hover:bg-white'
          }`}
        >
          <Heart className={`w-3.5 h-3.5 ${inWish ? 'fill-white text-white' : ''}`} />
        </button>
      </Link>

      {/* Product Details */}
      <div className="p-4 sm:p-5 flex-1 flex flex-col justify-between bg-white">
        <div>
          {/* Brand & Subcategory */}
          <div className="flex items-center justify-between mb-1.5 text-[10px] uppercase tracking-[0.2em] text-[#777777]">
            <span>{product.brand}</span>
            <span>{product.subcategory || product.category}</span>
          </div>

          {/* Product Name */}
          <Link to={`/products/${product.id}`} className="block">
            <h3 className="font-cinzel text-xs sm:text-sm font-bold text-[#111111] line-clamp-1 hover:text-stone-600 transition-colors tracking-wide leading-snug">
              {product.name}
            </h3>
          </Link>

          {/* Available Colors Swatches */}
          {product.colors && product.colors.length > 0 && (
            <div className="flex items-center space-x-1.5 mt-2.5">
              {product.colors.slice(0, 4).map((c, idx) => (
                <span
                  key={idx}
                  title={c.name}
                  className="w-2.5 h-2.5 rounded-full border border-stone-300"
                  style={{ backgroundColor: c.hex }}
                />
              ))}
              {product.colors.length > 4 && (
                <span className="text-[9px] text-[#777777] font-mono">
                  +{product.colors.length - 4}
                </span>
              )}
            </div>
          )}
        </div>

        {/* Pricing & View Product Button */}
        <div className="mt-4 pt-3 border-t border-stone-100 flex items-center justify-between gap-2">
          <div>
            <div className="flex items-baseline space-x-2">
              <span className="text-sm sm:text-base font-bold text-[#111111] font-mono">
                {formatPrice(product.discountedPrice, product.priceAED)}
              </span>
              {product.originalPrice > product.discountedPrice && (
                <span className="text-xs text-[#777777] line-through font-mono">
                  {formatPrice(product.originalPrice, product.originalPriceAED)}
                </span>
              )}
            </div>
          </div>

          <div className="flex items-center space-x-1.5">
            <button
              onClick={handleWhatsAppOrder}
              className="p-2 border border-stone-200 text-stone-700 hover:text-black hover:border-black transition rounded-none"
              title="Inquire on WhatsApp (+971 55 678 7854)"
            >
              <MessageCircle className="w-3.5 h-3.5" />
            </button>

            <Link
              to={`/products/${product.id}`}
              className="px-3.5 py-1.5 bg-[#111111] text-white hover:bg-black transition text-[10px] font-semibold uppercase tracking-widest font-sans"
            >
              View
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
};
