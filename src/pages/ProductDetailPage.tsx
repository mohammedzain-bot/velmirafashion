import React, { useState, useEffect } from 'react';
import { useParams, useNavigate, Link } from 'react-router-dom';
import {
  Star,
  Heart,
  ShoppingBag,
  Zap,
  Ruler,
  ShieldCheck,
  RotateCcw,
  Truck,
  ChevronRight,
  Plus,
  Minus,
  Check,
  Sparkles,
  MessageCircle
} from 'lucide-react';
import { useShop } from '../context/ShopContext';
import { useCart } from '../context/CartContext';
import { useWishlist } from '../context/WishlistContext';
import { useCurrency } from '../context/CurrencyContext';
import { PINCodeChecker } from '../components/PINCodeChecker';
import { SizeGuideModal } from '../components/SizeGuideModal';
import { ProductCard } from '../components/ProductCard';
import { Review } from '../types';
import { openDirectProductWhatsApp, OFFICIAL_WHATSAPP_NUMBER } from '../utils/whatsapp';

export const ProductDetailPage: React.FC = () => {
  const { id } = useParams<{ id: string }>();
  const navigate = useNavigate();
  const { products, getReviewsForProduct, submitReview } = useShop();
  const { addToCart } = useCart();
  const { isInWishlist, toggleWishlist } = useWishlist();
  const { formatPrice, currency, country } = useCurrency();

  const product = products.find(p => p.id === id);

  const [activeImageIndex, setActiveImageIndex] = useState(0);
  const [selectedSize, setSelectedSize] = useState<string>('');
  const [selectedColor, setSelectedColor] = useState<string>('');
  const [quantity, setQuantity] = useState(1);
  const [isSizeGuideOpen, setIsSizeGuideOpen] = useState(false);
  const [reviews, setReviews] = useState<Review[]>([]);
  const [activeTab, setActiveTab] = useState<'details' | 'specs' | 'reviews'>('details');

  // Review form
  const [reviewRating, setReviewRating] = useState(5);
  const [reviewName, setReviewName] = useState('');
  const [reviewTitle, setReviewTitle] = useState('');
  const [reviewComment, setReviewComment] = useState('');
  const [isSubmittingReview, setIsSubmittingReview] = useState(false);
  const [reviewSuccess, setReviewSuccess] = useState(false);

  useEffect(() => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
    if (product) {
      setActiveImageIndex(0);
      setSelectedSize(product.sizes[0] || '40mm');
      setSelectedColor(product.colors[0]?.name || 'Standard');
      setQuantity(1);

      getReviewsForProduct(product.id).then(res => setReviews(res));
    }
  }, [id, product]);

  if (!product) {
    return (
      <div className="min-h-screen flex flex-col items-center justify-center p-8 text-center bg-[#0B0D12] text-white">
        <h2 className="font-serif text-2xl font-bold text-white">Timepiece Not Found</h2>
        <p className="text-xs text-[#94A3B8] mt-2">The requested luxury timepiece could not be found in the vault.</p>
        <Link
          to="/watches"
          className="mt-6 px-6 py-2.5 bg-[#D4AF37] text-black font-semibold text-xs uppercase tracking-wider hover:bg-[#E5B869] transition"
        >
          Browse All Collections
        </Link>
      </div>
    );
  }

  const inWish = isInWishlist(product.id);
  const relatedProducts = products
    .filter(p => (p.category === product.category || p.subcategory === product.subcategory) && p.id !== product.id)
    .slice(0, 4);

  const handleAddToCart = () => {
    addToCart(product, selectedSize, selectedColor, quantity);
  };

  const handleBuyNow = () => {
    addToCart(product, selectedSize, selectedColor, quantity);
    navigate('/checkout');
  };

  const handleWhatsAppOrder = () => {
    openDirectProductWhatsApp(product, selectedSize, selectedColor, currency);
  };

  const handleReviewSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!reviewName || !reviewTitle || !reviewComment) return;
    setIsSubmittingReview(true);
    try {
      const newRev = await submitReview({
        productId: product.id,
        userName: reviewName,
        userLocation: country === 'UAE' ? 'Dubai, UAE' : 'Verified Buyer, India',
        rating: reviewRating,
        title: reviewTitle,
        comment: reviewComment,
        verifiedPurchase: true
      });
      setReviews(prev => [newRev, ...prev]);
      setReviewSuccess(true);
      setReviewName('');
      setReviewTitle('');
      setReviewComment('');
    } finally {
      setIsSubmittingReview(false);
    }
  };

  return (
    <div className="min-h-screen bg-[#0B0D12] text-[#F1F5F9] pb-16 font-sans selection:bg-[#D4AF37] selection:text-black">
      {/* Breadcrumb */}
      <div className="bg-[#0E1118] border-b border-[#1E2536] py-3">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 flex items-center space-x-2 text-xs text-[#94A3B8] truncate">
          <Link to="/" className="hover:text-[#D4AF37] transition">Home</Link>
          <ChevronRight className="w-3 h-3 text-[#2A3142] shrink-0" />
          <Link to={`/watches?category=${encodeURIComponent(product.category)}`} className="hover:text-[#D4AF37] transition">
            {product.category}
          </Link>
          <ChevronRight className="w-3 h-3 text-[#2A3142] shrink-0" />
          <span className="text-white font-semibold truncate">{product.name}</span>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pt-8">
        <div className="bg-[#141822] border border-[#2A3142] p-6 sm:p-8 shadow-xl">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-12">
            {/* LEFT: Image Gallery (6 cols) */}
            <div className="lg:col-span-6 flex flex-col-reverse sm:flex-row gap-4">
              {/* Thumbnails */}
              <div className="flex sm:flex-col gap-3 overflow-x-auto sm:overflow-y-auto sm:w-20 shrink-0 scrollbar-none">
                {product.images.map((img, idx) => (
                  <button
                    key={idx}
                    onClick={() => setActiveImageIndex(idx)}
                    className={`relative w-16 h-20 sm:w-20 sm:h-24 overflow-hidden border-2 transition shrink-0 ${
                      activeImageIndex === idx
                        ? 'border-[#D4AF37] shadow-md shadow-[#D4AF37]/20'
                        : 'border-[#2A3142] hover:border-[#94A3B8] opacity-60 hover:opacity-100'
                    }`}
                  >
                    <img src={img} alt={`${product.name} preview ${idx + 1}`} className="w-full h-full object-cover object-center" />
                  </button>
                ))}
              </div>

              {/* Main Image Frame with Zoom */}
              <div className="flex-1 relative aspect-[3/4] overflow-hidden bg-black/40 border border-[#2A3142] group">
                <img
                  src={product.images[activeImageIndex] || product.images[0]}
                  alt={product.name}
                  className="w-full h-full object-cover object-center transition-transform duration-700 ease-out group-hover:scale-108"
                />

                <div className="absolute top-3 left-3 flex flex-col gap-1.5 z-10">
                  {product.isBestSeller && (
                    <span className="bg-[#D4AF37] text-black text-[10px] font-bold px-2.5 py-1 tracking-widest uppercase shadow-sm font-mono">
                      Bestseller
                    </span>
                  )}
                  {product.discountPercentage >= 40 && (
                    <span className="bg-white/10 backdrop-blur-md text-white border border-white/20 text-[10px] font-bold px-2.5 py-1 tracking-wider shadow-sm font-mono">
                      {product.discountPercentage}% OFF
                    </span>
                  )}
                </div>

                <button
                  onClick={() => toggleWishlist(product)}
                  className={`absolute top-3 right-3 p-2.5 rounded-full shadow-md transition-all border ${
                    inWish
                      ? 'bg-[#D4AF37] text-black border-[#D4AF37]'
                      : 'bg-black/60 backdrop-blur-md text-white border-white/20 hover:text-[#D4AF37] hover:border-[#D4AF37]'
                  }`}
                  aria-label="Wishlist"
                >
                  <Heart className={`w-5 h-5 ${inWish ? 'fill-black text-black' : ''}`} />
                </button>
              </div>
            </div>

            {/* RIGHT: Product Info & Purchase Controls (6 cols) */}
            <div className="lg:col-span-6 flex flex-col justify-between space-y-6">
              <div>
                <div className="flex items-center justify-between">
                  <span className="text-xs font-bold font-mono text-[#D4AF37] tracking-widest uppercase">
                    {product.brand}
                  </span>
                  <span className="text-xs text-[#94A3B8] uppercase tracking-wider">{product.subcategory}</span>
                </div>

                <h1 className="font-serif text-2xl sm:text-3xl lg:text-4xl font-bold text-white mt-2 leading-tight">
                  {product.name}
                </h1>

                <div className="flex items-center space-x-3 mt-3">
                  <div className="flex items-center space-x-1.5 bg-[#D4AF37] text-black text-xs font-bold px-2 py-0.5">
                    <span>{product.rating}</span>
                    <Star className="w-3 h-3 fill-black text-black" />
                  </div>
                  <span className="text-xs text-[#94A3B8] font-medium">
                    {product.ratingCount.toLocaleString('en-IN')} Patron Ratings & {product.reviewCount} Reviews
                  </span>
                </div>

                {/* Price Callout */}
                <div className="mt-5 p-4 bg-[#0E1118] border border-[#2A3142]">
                  <div className="flex items-baseline space-x-3">
                    <span className="text-2xl sm:text-3xl font-bold text-[#E5B869] font-mono">
                      {formatPrice(product.discountedPrice, product.priceAED)}
                    </span>
                    {product.originalPrice > product.discountedPrice && (
                      <span className="text-sm sm:text-base text-[#64748B] line-through font-mono">
                        {formatPrice(product.originalPrice, product.originalPriceAED)}
                      </span>
                    )}
                    {product.discountPercentage > 0 && (
                      <span className="text-xs sm:text-sm font-bold text-[#D4AF37] font-mono">
                        {product.discountPercentage}% SAVINGS
                      </span>
                    )}
                  </div>
                  <p className="text-[11px] text-[#94A3B8] mt-1.5">
                    Direct insured delivery to <strong className="text-white">{country === 'UAE' ? '🇦🇪 United Arab Emirates' : '🇮🇳 India'}</strong> with serial authenticity card.
                  </p>
                </div>

                {/* Key Watch Attributes Overview */}
                <div className="mt-5 grid grid-cols-2 gap-3 text-xs border border-[#2A3142] p-3.5 bg-[#0E1118]">
                  <div>
                    <span className="text-[10px] uppercase font-semibold text-[#94A3B8] block">Movement / Type:</span>
                    <span className="font-bold text-white">{product.watchType || product.subcategory || 'Automatic'}</span>
                  </div>
                  <div>
                    <span className="text-[10px] uppercase font-semibold text-[#94A3B8] block">Dial Finishing:</span>
                    <span className="font-bold text-white">{product.dialColor || selectedColor}</span>
                  </div>
                  <div>
                    <span className="text-[10px] uppercase font-semibold text-[#94A3B8] block">Case Material:</span>
                    <span className="font-bold text-white">{product.caseMaterial || '316L Surgical Steel'}</span>
                  </div>
                  <div>
                    <span className="text-[10px] uppercase font-semibold text-[#94A3B8] block">Strap / Bracelet:</span>
                    <span className="font-bold text-white">{product.strapMaterial || '316L Brushed Steel / Alligator'}</span>
                  </div>
                </div>

                {/* Colors / Available Dials */}
                {product.colors && product.colors.length > 0 && (
                  <div className="mt-5">
                    <div className="flex items-center justify-between mb-2">
                      <span className="text-xs font-bold text-white uppercase tracking-wider">
                        Available Dials / Finishes: <span className="text-[#D4AF37] font-semibold">{selectedColor}</span>
                      </span>
                    </div>
                    <div className="flex items-center gap-2.5">
                      {product.colors.map(col => (
                        <button
                          key={col.name}
                          type="button"
                          onClick={() => setSelectedColor(col.name)}
                          className={`flex items-center space-x-1.5 px-3 py-1.5 border text-xs font-medium transition ${
                            selectedColor === col.name
                              ? 'border-[#D4AF37] bg-[#D4AF37] text-black font-semibold'
                              : 'border-[#2A3142] text-[#CBD5E1] hover:border-[#D4AF37] bg-[#0E1118]'
                          }`}
                        >
                          <span
                            className="w-3 h-3 rounded-full border border-black/40 shrink-0"
                            style={{ backgroundColor: col.hex }}
                          />
                          <span>{col.name}</span>
                        </button>
                      ))}
                    </div>
                  </div>
                )}

                {/* Case / Dial Size */}
                <div className="mt-5">
                  <div className="flex items-center justify-between mb-2">
                    <span className="text-xs font-bold text-white uppercase tracking-wider">
                      Case Diameter:
                    </span>
                    <button
                      onClick={() => setIsSizeGuideOpen(true)}
                      className="text-xs text-[#94A3B8] hover:text-[#D4AF37] font-semibold flex items-center space-x-1 transition"
                    >
                      <Ruler className="w-3.5 h-3.5" />
                      <span>Dimensions Guide</span>
                    </button>
                  </div>
                  <div className="flex flex-wrap gap-2">
                    {product.sizes.map(size => (
                      <button
                        key={size}
                        type="button"
                        onClick={() => setSelectedSize(size)}
                        className={`min-w-14 py-2 px-3 text-xs font-bold border transition ${
                          selectedSize === size
                            ? 'bg-[#D4AF37] text-black border-[#D4AF37]'
                            : 'bg-[#0E1118] border-[#2A3142] text-white hover:border-[#D4AF37]'
                        }`}
                      >
                        {size}
                      </button>
                    ))}
                  </div>
                </div>

                {/* Availability & Quantity */}
                <div className="mt-5 flex items-center justify-between">
                  <div className="flex items-center space-x-2">
                    <span className="text-xs font-bold text-white uppercase tracking-wider">
                      Qty:
                    </span>
                    <div className="flex items-center border border-[#2A3142] px-2 py-1 bg-[#0E1118]">
                      <button
                        onClick={() => setQuantity(Math.max(1, quantity - 1))}
                        className="p-1 text-[#94A3B8] hover:text-white"
                      >
                        <Minus className="w-3.5 h-3.5" />
                      </button>
                      <span className="px-3 text-xs font-bold text-white font-mono">{quantity}</span>
                      <button
                        onClick={() => setQuantity(Math.min(product.stock, quantity + 1))}
                        className="p-1 text-[#94A3B8] hover:text-white"
                      >
                        <Plus className="w-3.5 h-3.5" />
                      </button>
                    </div>
                  </div>

                  <div>
                    <span className="text-xs font-semibold text-[#D4AF37] flex items-center">
                      <Check className="w-3.5 h-3.5 mr-1" /> {product.availability || 'In Stock (Ships in 24 Hours)'}
                    </span>
                  </div>
                </div>

                {/* THE 4 REQUIRED BUTTONS */}
                <div className="mt-6 space-y-2.5">
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-2.5">
                    {/* 1. Add to Cart */}
                    <button
                      onClick={handleAddToCart}
                      className="py-3.5 px-6 bg-transparent border-2 border-[#D4AF37] text-[#D4AF37] hover:bg-[#D4AF37] hover:text-black font-bold text-xs uppercase tracking-widest transition flex items-center justify-center space-x-2 shadow-xs"
                    >
                      <ShoppingBag className="w-4 h-4" />
                      <span>Add to Cart</span>
                    </button>

                    {/* 2. Buy Now */}
                    <button
                      onClick={handleBuyNow}
                      className="py-3.5 px-6 bg-[#D4AF37] text-black hover:bg-[#E5B869] font-bold text-xs uppercase tracking-widest transition flex items-center justify-center space-x-2 shadow-lg shadow-[#D4AF37]/20"
                    >
                      <Zap className="w-4 h-4 fill-black" />
                      <span>Buy Now</span>
                    </button>
                  </div>

                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-2.5">
                    {/* 3. Add to Wishlist */}
                    <button
                      onClick={() => toggleWishlist(product)}
                      className="py-3 px-6 bg-[#0E1118] border border-[#2A3142] text-white hover:border-[#D4AF37] hover:text-[#D4AF37] font-semibold text-xs uppercase tracking-wider transition flex items-center justify-center space-x-2"
                    >
                      <Heart className={`w-4 h-4 ${inWish ? 'fill-[#D4AF37] text-[#D4AF37]' : ''}`} />
                      <span>{inWish ? 'In Wishlist' : 'Add to Wishlist'}</span>
                    </button>

                    {/* 4. WhatsApp Enquiry */}
                    <button
                      onClick={handleWhatsAppOrder}
                      className="py-3 px-6 bg-[#0E1118] border border-[#2A3142] text-[#D4AF37] hover:bg-[#1E2536] hover:border-[#D4AF37] transition font-semibold text-xs uppercase tracking-wider flex items-center justify-center space-x-2"
                    >
                      <MessageCircle className="w-4 h-4" />
                      <span>WhatsApp Enquiry</span>
                    </button>
                  </div>
                </div>

                {/* Multi-Region Delivery Checker */}
                <div className="mt-6">
                  <PINCodeChecker />
                </div>
              </div>

              {/* Trust highlights */}
              <div className="pt-6 border-t border-[#1E2536] grid grid-cols-3 gap-3 text-center text-xs text-[#94A3B8]">
                <div className="flex flex-col items-center">
                  <ShieldCheck className="w-5 h-5 text-[#D4AF37] mb-1" />
                  <span className="font-semibold text-white text-[11px]">100% Certified</span>
                </div>
                <div className="flex flex-col items-center">
                  <RotateCcw className="w-5 h-5 text-[#D4AF37] mb-1" />
                  <span className="font-semibold text-white text-[11px]">7-Day Returns</span>
                </div>
                <div className="flex flex-col items-center">
                  <Truck className="w-5 h-5 text-[#D4AF37] mb-1" />
                  <span className="font-semibold text-white text-[11px]">Insured Cargo</span>
                </div>
              </div>
            </div>
          </div>

          {/* LOWER TABS */}
          <div className="mt-14 pt-8 border-t border-[#1E2536]">
            <div className="flex border-b border-[#1E2536] space-x-8">
              <button
                onClick={() => setActiveTab('details')}
                className={`pb-3 text-xs font-bold uppercase tracking-widest transition ${
                  activeTab === 'details'
                    ? 'border-b-2 border-[#D4AF37] text-[#D4AF37]'
                    : 'text-[#94A3B8] hover:text-white'
                }`}
              >
                Materials & Craftsmanship
              </button>
              <button
                onClick={() => setActiveTab('specs')}
                className={`pb-3 text-xs font-bold uppercase tracking-widest transition ${
                  activeTab === 'specs'
                    ? 'border-b-2 border-[#D4AF37] text-[#D4AF37]'
                    : 'text-[#94A3B8] hover:text-white'
                }`}
              >
                Atelier Specifications
              </button>
              <button
                onClick={() => setActiveTab('reviews')}
                className={`pb-3 text-xs font-bold uppercase tracking-widest transition ${
                  activeTab === 'reviews'
                    ? 'border-b-2 border-[#D4AF37] text-[#D4AF37]'
                    : 'text-[#94A3B8] hover:text-white'
                }`}
              >
                Patron Reviews ({reviews.length})
              </button>
            </div>

            {activeTab === 'details' && (
              <div className="py-6 space-y-4 max-w-3xl text-xs sm:text-sm text-[#CBD5E1] leading-relaxed">
                <p>{product.description}</p>
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 pt-4 border-t border-[#1E2536] text-xs">
                  <div>
                    <span className="font-bold text-white block mb-0.5">Primary Materials:</span>
                    <span className="text-[#94A3B8]">{product.fabric}</span>
                  </div>
                  <div>
                    <span className="font-bold text-white block mb-0.5">Dimensions & Fit:</span>
                    <span className="text-[#94A3B8]">{product.fit}</span>
                  </div>
                  <div>
                    <span className="font-bold text-white block mb-0.5">Pattern & Finish:</span>
                    <span className="text-[#94A3B8]">{product.pattern}</span>
                  </div>
                  <div>
                    <span className="font-bold text-white block mb-0.5">Care Instructions:</span>
                    <span className="text-[#94A3B8]">{product.care}</span>
                  </div>
                </div>
              </div>
            )}

            {activeTab === 'specs' && (
              <div className="py-6 max-w-2xl">
                <table className="w-full text-xs text-left border border-[#2A3142] overflow-hidden">
                  <tbody className="divide-y divide-[#1E2536]">
                    <tr className="bg-[#0E1118]">
                      <td className="p-3 font-semibold text-white w-1/3">Department</td>
                      <td className="p-3 text-[#94A3B8]">{product.category}</td>
                    </tr>
                    <tr>
                      <td className="p-3 font-semibold text-white">Atelier Line</td>
                      <td className="p-3 text-[#D4AF37] font-mono font-bold">{product.brand}</td>
                    </tr>
                    {Object.entries(product.specifications || {}).map(([key, val], idx) => (
                      <tr key={key} className={idx % 2 === 0 ? 'bg-[#141822]' : 'bg-[#0E1118]'}>
                        <td className="p-3 font-semibold text-white">{key}</td>
                        <td className="p-3 text-[#94A3B8]">{val}</td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            )}

            {activeTab === 'reviews' && (
              <div className="py-6 space-y-8 max-w-4xl">
                <div className="p-6 bg-[#0E1118] border border-[#2A3142] flex flex-col sm:flex-row items-center justify-between gap-6">
                  <div className="flex items-center space-x-3">
                    <span className="font-serif text-4xl font-extrabold text-[#D4AF37]">
                      {product.rating}
                    </span>
                    <div>
                      <div className="flex text-[#D4AF37]">
                        {[1, 2, 3, 4, 5].map(i => (
                          <Star key={i} className="w-4 h-4 fill-[#D4AF37]" />
                        ))}
                      </div>
                      <p className="text-[11px] text-[#94A3B8] mt-0.5">Verified India & UAE Patron Feedback</p>
                    </div>
                  </div>
                  <div className="text-xs text-[#94A3B8] text-center sm:text-right">
                    <p className="font-semibold text-white">100% of owners recommend this luxury piece</p>
                    <p className="text-[11px] text-[#64748B] mt-0.5">Authenticated delivery signatures</p>
                  </div>
                </div>

                <div className="space-y-4">
                  {reviews.map(rev => (
                    <div key={rev.id} className="p-4 border border-[#2A3142] bg-[#0E1118]">
                      <div className="flex items-center justify-between">
                        <div className="flex items-center space-x-2">
                          <span className="bg-[#D4AF37] text-black text-[10px] font-bold px-1.5 py-0.5 flex items-center space-x-0.5">
                            <span>{rev.rating}</span>
                            <Star className="w-2.5 h-2.5 fill-black" />
                          </span>
                          <span className="text-xs font-bold text-white">{rev.title}</span>
                        </div>
                        <span className="text-[10px] text-[#64748B]">
                          {new Date(rev.createdAt).toLocaleDateString('en-IN', { day: 'numeric', month: 'short', year: 'numeric' })}
                        </span>
                      </div>
                      <p className="text-xs text-[#CBD5E1] mt-2 leading-relaxed">{rev.comment}</p>
                      <div className="flex items-center space-x-2 mt-3 text-[11px] text-[#64748B]">
                        <span className="font-medium text-white">{rev.userName} ({rev.userLocation})</span>
                        <span>•</span>
                        <span className="text-[#D4AF37] flex items-center">
                          <Check className="w-3 h-3 mr-0.5" /> Verified Purchase
                        </span>
                      </div>
                    </div>
                  ))}
                </div>

                {/* Submit review */}
                <div className="pt-6 border-t border-[#1E2536]">
                  <h4 className="font-serif text-base font-bold text-white mb-3">
                    Write a Patron Review
                  </h4>
                  {reviewSuccess ? (
                    <div className="p-4 bg-emerald-950/40 border border-emerald-500/40 text-emerald-300 text-xs">
                      Thank you for reviewing! Your feedback has been published.
                    </div>
                  ) : (
                    <form onSubmit={handleReviewSubmit} className="space-y-3">
                      <div>
                        <label className="block text-xs font-semibold text-[#94A3B8] mb-1">Rating</label>
                        <div className="flex space-x-1">
                          {[1, 2, 3, 4, 5].map(st => (
                            <button
                              key={st}
                              type="button"
                              onClick={() => setReviewRating(st)}
                              className="p-1 focus:outline-none"
                            >
                              <Star
                                className={`w-5 h-5 ${
                                  st <= reviewRating
                                    ? 'fill-[#D4AF37] text-[#D4AF37]'
                                    : 'text-[#2A3142]'
                                }`}
                              />
                            </button>
                          ))}
                        </div>
                      </div>

                      <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                        <div>
                          <label className="block text-xs font-semibold text-[#94A3B8] mb-1">Your Name</label>
                          <input
                            type="text"
                            required
                            placeholder="e.g. Sultan Al Qasimi"
                            value={reviewName}
                            onChange={e => setReviewName(e.target.value)}
                            className="w-full px-3 py-2 text-xs border border-[#2A3142] bg-[#0E1118] text-white focus:outline-none focus:border-[#D4AF37]"
                          />
                        </div>
                        <div>
                          <label className="block text-xs font-semibold text-[#94A3B8] mb-1">Review Headline</label>
                          <input
                            type="text"
                            required
                            placeholder="e.g. Flawless dial & rapid WhatsApp delivery"
                            value={reviewTitle}
                            onChange={e => setReviewTitle(e.target.value)}
                            className="w-full px-3 py-2 text-xs border border-[#2A3142] bg-[#0E1118] text-white focus:outline-none focus:border-[#D4AF37]"
                          />
                        </div>
                      </div>

                      <div>
                        <label className="block text-xs font-semibold text-[#94A3B8] mb-1">Detailed Review</label>
                        <textarea
                          required
                          rows={3}
                          placeholder="Describe the build quality, finishing, movement accuracy or leather feel..."
                          value={reviewComment}
                          onChange={e => setReviewComment(e.target.value)}
                          className="w-full px-3 py-2 text-xs border border-[#2A3142] bg-[#0E1118] text-white focus:outline-none focus:border-[#D4AF37]"
                        />
                      </div>

                      <button
                        type="submit"
                        disabled={isSubmittingReview}
                        className="px-6 py-2.5 bg-[#D4AF37] text-black font-semibold text-xs uppercase tracking-wider hover:bg-[#E5B869] transition"
                      >
                        {isSubmittingReview ? 'Submitting...' : 'Submit Review'}
                      </button>
                    </form>
                  )}
                </div>
              </div>
            )}
          </div>
        </div>

        {/* Related products */}
        {relatedProducts.length > 0 && (
          <div className="mt-14">
            <div className="mb-6 pb-2 border-b border-[#1E2536]">
              <span className="text-[10px] font-bold uppercase tracking-widest text-[#D4AF37]">
                MATCHING PIECES
              </span>
              <h3 className="font-serif text-xl font-bold text-white tracking-wide mt-0.5">
                Patrons Also Curated
              </h3>
            </div>
            <div className="grid grid-cols-2 sm:grid-cols-4 gap-4 sm:gap-6">
              {relatedProducts.map(p => (
                <ProductCard key={p.id} product={p} />
              ))}
            </div>
          </div>
        )}
      </div>

      <SizeGuideModal
        isOpen={isSizeGuideOpen}
        onClose={() => setIsSizeGuideOpen(false)}
        category={product.category}
      />
    </div>
  );
};
