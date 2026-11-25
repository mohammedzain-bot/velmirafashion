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
      className="group relative bg-[#141822] border border-[#2A3142] hover:border-[#D4AF37] transition-all duration-300 flex flex-col justify-between shadow-md hover:shadow-[#D4AF37]/10"
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
    >
      {/* Product Image Frame */}
      <Link to={`/products/${product.id}`} className="relative block aspect-[4/5] overflow-hidden bg-black/40">
        <img
          src={isHovered ? secondaryImage : primaryImage}
          alt={product.name}
          className="w-full h-full object-cover object-center transition-transform duration-700 ease-out group-hover:scale-106"
          loading="lazy"
        />

        {/* Badges */}
        <div className="absolute top-3 left-3 flex flex-col gap-1 z-10">
          {product.isNewArrival && (
            <span className="bg-[#D4AF37] text-black font-bold text-[9px] px-2 py-0.5 uppercase tracking-widest font-mono">
              NEW
            </span>
          )}
          {product.isBestSeller && !product.isNewArrival && (
            <span className="bg-white/10 backdrop-blur-md text-white border border-white/20 text-[9px] font-semibold px-2 py-0.5 uppercase tracking-widest font-mono">
              BESTSELLER
            </span>
          )}
        </div>

        {/* Wishlist Icon */}
        <button
          onClick={handleWishlistClick}
          aria-label="Save to Wishlist"
          className={`absolute top-3 right-3 p-2 rounded-full transition-all duration-200 z-10 shadow-xs border ${
            inWish
              ? 'bg-[#D4AF37] text-black border-[#D4AF37]'
              : 'bg-black/60 backdrop-blur-md text-white border-white/20 hover:border-[#D4AF37] hover:text-[#D4AF37]'
          }`}
        >
          <Heart className={`w-3.5 h-3.5 ${inWish ? 'fill-black text-black' : ''}`} />
        </button>
      </Link>

      {/* Product Details */}
      <div className="p-4 sm:p-5 flex-1 flex flex-col justify-between bg-[#141822]">
        <div>
          {/* Brand & Subcategory */}
          <div className="flex items-center justify-between mb-1.5 text-[10px] uppercase tracking-[0.2em] text-[#94A3B8]">
            <span className="text-[#D4AF37] font-semibold">{product.brand}</span>
            <span className="truncate max-w-[120px]">{product.subcategory || product.category}</span>
          </div>

          {/* Product Name */}
          <Link to={`/products/${product.id}`} className="block">
            <h3 className="font-serif text-xs sm:text-sm font-bold text-white line-clamp-1 hover:text-[#D4AF37] transition-colors tracking-wide leading-snug">
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
                  className="w-2.5 h-2.5 rounded-full border border-white/20"
                  style={{ backgroundColor: c.hex }}
                />
              ))}
              {product.colors.length > 4 && (
                <span className="text-[9px] text-[#94A3B8] font-mono">
                  +{product.colors.length - 4}
                </span>
              )}
            </div>
          )}
        </div>

        {/* Pricing & View Product Button */}
        <div className="mt-4 pt-3 border-t border-[#1E2536] flex items-center justify-between gap-2">
          <div>
            <div className="flex items-baseline space-x-2">
              <span className="text-sm sm:text-base font-bold text-[#E5B869] font-mono">
                {formatPrice(product.discountedPrice, product.priceAED)}
              </span>
              {product.originalPrice > product.discountedPrice && (
                <span className="text-xs text-[#64748B] line-through font-mono">
                  {formatPrice(product.originalPrice, product.originalPriceAED)}
                </span>
              )}
            </div>
          </div>

          <div className="flex items-center space-x-1.5">
            <button
              onClick={handleWhatsAppOrder}
              className="p-2 border border-[#2A3142] text-[#D4AF37] hover:bg-[#1E2536] hover:border-[#D4AF37] transition"
              title="Inquire on WhatsApp (+971 55 678 7854)"
            >
              <MessageCircle className="w-3.5 h-3.5" />
            </button>

            <Link
              to={`/products/${product.id}`}
              className="px-3.5 py-1.5 bg-[#D4AF37] text-black hover:bg-[#E5B869] transition text-[10px] font-bold uppercase tracking-widest font-sans"
            >
              View
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
};
