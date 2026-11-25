import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { Heart, MessageCircle } from 'lucide-react';
import { Product } from '../types';
import { useWishlist } from '../context/WishlistContext';
import { useCurrency } from '../context/CurrencyContext';
import { openDirectProductWhatsApp } from '../utils/whatsapp';

interface ProductCardProps {
  product: Product;
  onQuickView?: (product: Product) => void;
}

export const ProductCard: React.FC<ProductCardProps> = ({ product }) => {
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
      className="group relative bg-white border border-neutral-200 hover:border-black transition-all duration-300 flex flex-col justify-between shadow-xs hover:shadow-md"
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
    >
      {/* Product Image Frame */}
      <Link to={`/products/${product.id}`} className="relative block aspect-[4/5] overflow-hidden bg-[#F8F9FA]">
        <img
          src={isHovered ? secondaryImage : primaryImage}
          alt={product.name}
          className="w-full h-full object-cover object-center transition-transform duration-700 ease-out group-hover:scale-106"
          loading="lazy"
        />

        {/* Minimal Badges */}
        <div className="absolute top-2.5 left-2.5 flex flex-col gap-1 z-10">
          {product.isNewArrival && (
            <span className="bg-[#111111] text-white text-[9px] font-semibold px-2 py-0.5 uppercase tracking-widest font-mono">
              NEW
            </span>
          )}
          {product.isBestSeller && !product.isNewArrival && (
            <span className="bg-white/95 text-[#111111] border border-neutral-300 text-[9px] font-semibold px-2 py-0.5 uppercase tracking-widest font-mono shadow-xs">
              BESTSELLER
            </span>
          )}
        </div>

        {/* Wishlist Icon */}
        <button
          onClick={handleWishlistClick}
          aria-label="Save to Wishlist"
          className={`absolute top-2.5 right-2.5 p-2 rounded-full transition-all duration-200 z-10 shadow-xs border ${
            inWish
              ? 'bg-[#111111] text-white border-[#111111]'
              : 'bg-white/90 text-neutral-700 border-neutral-200 hover:text-black hover:border-black hover:bg-white'
          }`}
        >
          <Heart className={`w-3.5 h-3.5 ${inWish ? 'fill-white text-white' : ''}`} />
        </button>
      </Link>

      {/* Product Details */}
      <div className="p-3.5 sm:p-4.5 flex-1 flex flex-col justify-between bg-white">
        <div>
          {/* Brand & Subcategory */}
          <div className="flex items-center justify-between mb-1 text-[9px] uppercase tracking-[0.2em] text-[#71717A]">
            <span className="font-semibold text-neutral-800">{product.brand}</span>
            <span className="truncate max-w-[120px]">{product.subcategory || product.category}</span>
          </div>

          {/* Product Name */}
          <Link to={`/products/${product.id}`} className="block">
            <h3 className="font-serif text-xs sm:text-sm font-bold text-[#111111] line-clamp-1 hover:text-neutral-600 transition-colors tracking-tight leading-snug">
              {product.name}
            </h3>
          </Link>

          {/* Available Colors Swatches */}
          {product.colors && product.colors.length > 0 && (
            <div className="flex items-center space-x-1.5 mt-2">
              {product.colors.slice(0, 4).map((c, idx) => (
                <span
                  key={idx}
                  title={c.name}
                  className="w-2.5 h-2.5 rounded-full border border-neutral-300"
                  style={{ backgroundColor: c.hex }}
                />
              ))}
              {product.colors.length > 4 && (
                <span className="text-[9px] text-[#71717A] font-mono">
                  +{product.colors.length - 4}
                </span>
              )}
            </div>
          )}
        </div>

        {/* Pricing & View Product Button */}
        <div className="mt-3.5 pt-3 border-t border-neutral-100 flex items-center justify-between gap-2">
          <div>
            <div className="flex items-baseline space-x-2">
              <span className="text-xs sm:text-sm font-bold text-[#111111] font-mono">
                {formatPrice(product.discountedPrice, product.priceAED)}
              </span>
              {product.originalPrice > product.discountedPrice && (
                <span className="text-[10px] text-[#A1A1AA] line-through font-mono">
                  {formatPrice(product.originalPrice, product.originalPriceAED)}
                </span>
              )}
            </div>
          </div>

          <div className="flex items-center space-x-1.5">
            <button
              onClick={handleWhatsAppOrder}
              className="p-1.5 border border-neutral-200 text-neutral-700 hover:text-black hover:border-black transition"
              title="Inquire on WhatsApp (+971 55 678 7854)"
            >
              <MessageCircle className="w-3.5 h-3.5" />
            </button>

            <Link
              to={`/products/${product.id}`}
              className="px-3 py-1.5 bg-[#111111] text-white hover:bg-black transition text-[9px] font-bold uppercase tracking-widest font-sans"
            >
              View
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
};
