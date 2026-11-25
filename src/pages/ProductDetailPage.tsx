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
      <div className="min-h-screen flex flex-col items-center justify-center p-8 text-center bg-white text-[#111111]">
        <h2 className="font-serif text-2xl font-bold text-[#111111]">Timepiece Not Found</h2>
        <p className="text-xs text-[#71717A] mt-2">The requested luxury timepiece could not be found in the catalogue.</p>
        <Link
          to="/watches"
          className="mt-6 px-6 py-2.5 bg-[#111111] text-white font-semibold text-xs uppercase tracking-wider hover:bg-black transition"
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
    <div className="min-h-screen bg-white text-[#111111] pb-16 font-sans selection:bg-black selection:text-white">
      {/* Breadcrumb */}
      <div className="bg-[#F8F9FA] border-b border-neutral-200 py-3">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 flex items-center space-x-2 text-xs text-[#71717A] truncate">
          <Link to="/" className="hover:text-black transition">Home</Link>
          <ChevronRight className="w-3 h-3 text-neutral-300 shrink-0" />
          <Link to={`/watches?category=${encodeURIComponent(product.category)}`} className="hover:text-black transition">
            {product.category}
          </Link>
          <ChevronRight className="w-3 h-3 text-neutral-300 shrink-0" />
          <span className="text-[#111111] font-semibold truncate">{product.name}</span>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pt-8">
        <div className="bg-white border border-neutral-200 p-6 sm:p-8 shadow-xs">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-12">
            {/* LEFT: Image Gallery (6 cols) */}
            <div className="lg:col-span-6 flex flex-col-reverse sm:flex-row gap-4">
              {/* Thumbnails */}
              <div className="flex sm:flex-col gap-3 overflow-x-auto sm:overflow-y-auto sm:w-20 shrink-0 scrollbar-none">
                {product.images.map((img, idx) => (
                  <button
                    key={idx}
                    onClick={() => setActiveImageIndex(idx)}
                    className={`relative w-16 h-20 sm:w-20 sm:h-24 overflow-hidden border transition shrink-0 ${
                      activeImageIndex === idx
                        ? 'border-[#111111] ring-1 ring-[#111111]'
                        : 'border-neutral-200 hover:border-neutral-400 opacity-70 hover:opacity-100'
                    }`}
                  >
                    <img src={img} alt={`${product.name} preview ${idx + 1}`} className="w-full h-full object-cover object-center" />
                  </button>
                ))}
              </div>

              {/* Main Image Frame with Zoom */}
              <div className="flex-1 relative aspect-[3/4] overflow-hidden bg-[#F8F9FA] border border-neutral-200 group">
                <img
                  src={product.images[activeImageIndex] || product.images[0]}
                  alt={product.name}
                  className="w-full h-full object-cover object-center transition-transform duration-700 ease-out group-hover:scale-106"
                />

                <div className="absolute top-3 left-3 flex flex-col gap-1.5 z-10">
                  {product.isBestSeller && (
                    <span className="bg-[#111111] text-white text-[10px] font-bold px-2.5 py-1 tracking-widest uppercase shadow-xs font-mono">
                      Bestseller
                    </span>
                  )}
                  {product.discountPercentage >= 40 && (
                    <span className="bg-white/95 text-[#111111] border border-neutral-300 text-[10px] font-bold px-2.5 py-1 tracking-wider shadow-xs font-mono">
                      {product.discountPercentage}% OFF
                    </span>
                  )}
                </div>

                <button
                  onClick={() => toggleWishlist(product)}
                  className={`absolute top-3 right-3 p-2.5 rounded-full shadow-xs transition-all border ${
                    inWish
                      ? 'bg-[#111111] text-white border-[#111111]'
                      : 'bg-white/95 text-neutral-700 border-neutral-200 hover:text-black hover:border-black'
                  }`}
                  aria-label="Wishlist"
                >
                  <Heart className={`w-5 h-5 ${inWish ? 'fill-white text-white' : ''}`} />
                </button>
              </div>
            </div>

            {/* RIGHT: Product Info & Purchase Controls (6 cols) */}
            <div className="lg:col-span-6 flex flex-col justify-between space-y-6">
              <div>
                <div className="flex items-center justify-between">
                  <span className="text-xs font-bold font-mono text-neutral-800 tracking-widest uppercase">
                    {product.brand}
                  </span>
                  <span className="text-xs text-[#71717A] uppercase tracking-wider">{product.subcategory}</span>
                </div>

                <h1 className="font-serif text-2xl sm:text-3xl lg:text-4xl font-bold text-[#111111] mt-2 leading-tight">
                  {product.name}
                </h1>

                <div className="flex items-center space-x-3 mt-3">
                  <div className="flex items-center space-x-1.5 bg-[#111111] text-white text-xs font-bold px-2 py-0.5">
                    <span>{product.rating}</span>
                    <Star className="w-3 h-3 fill-white text-white" />
                  </div>
                  <span className="text-xs text-[#71717A] font-medium">
                    {product.ratingCount.toLocaleString('en-IN')} Patron Ratings & {product.reviewCount} Reviews
                  </span>
                </div>

                {/* Price Callout */}
                <div className="mt-5 p-4 bg-[#F8F9FA] border border-neutral-200">
                  <div className="flex items-baseline space-x-3">
                    <span className="text-2xl sm:text-3xl font-bold text-[#111111] font-mono">
                      {formatPrice(product.discountedPrice, product.priceAED)}
                    </span>
                    {product.originalPrice > product.discountedPrice && (
                      <span className="text-sm sm:text-base text-neutral-400 line-through font-mono">
                        {formatPrice(product.originalPrice, product.originalPriceAED)}
                      </span>
                    )}
                    {product.discountPercentage > 0 && (
                      <span className="text-xs sm:text-sm font-bold text-neutral-800 font-mono">
                        {product.discountPercentage}% OFF
                      </span>
                    )}
                  </div>
                  <p className="text-[11px] text-[#71717A] mt-1.5">
                    Direct insured delivery to <strong className="text-[#111111]">{country === 'UAE' ? '🇦🇪 United Arab Emirates' : '🇮🇳 India'}</strong> with serial authenticity card.
                  </p>
                </div>

                {/* Key Watch Attributes Overview */}
                <div className="mt-5 grid grid-cols-2 gap-3 text-xs border border-neutral-200 p-3.5 bg-white">
                  <div>
                    <span className="text-[10px] uppercase font-semibold text-[#71717A] block">Movement / Type:</span>
                    <span className="font-bold text-[#111111]">{product.watchType || product.subcategory || 'Automatic'}</span>
                  </div>
                  <div>
                    <span className="text-[10px] uppercase font-semibold text-[#71717A] block">Dial Finishing:</span>
                    <span className="font-bold text-[#111111]">{product.dialColor || selectedColor}</span>
                  </div>
                  <div>
                    <span className="text-[10px] uppercase font-semibold text-[#71717A] block">Case Material:</span>
                    <span className="font-bold text-[#111111]">{product.caseMaterial || '316L Surgical Steel'}</span>
                  </div>
                  <div>
                    <span className="text-[10px] uppercase font-semibold text-[#71717A] block">Strap / Bracelet:</span>
                    <span className="font-bold text-[#111111]">{product.strapMaterial || '316L Brushed Steel / Alligator'}</span>
                  </div>
                </div>

                {/* Colors / Available Dials */}
                {product.colors && product.colors.length > 0 && (
                  <div className="mt-5">
                    <div className="flex items-center justify-between mb-2">
                      <span className="text-xs font-bold text-[#111111] uppercase tracking-wider">
                        Available Dials / Finishes: <span className="text-[#71717A] font-semibold">{selectedColor}</span>
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
                              ? 'border-[#111111] bg-[#111111] text-white font-semibold'
                              : 'border-neutral-200 text-[#111111] hover:border-black bg-white'
                          }`}
                        >
                          <span
                            className="w-3 h-3 rounded-full border border-neutral-300 shrink-0"
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
                    <span className="text-xs font-bold text-[#111111] uppercase tracking-wider">
                      Case Diameter:
                    </span>
                    <button
                      onClick={() => setIsSizeGuideOpen(true)}
                      className="text-xs text-[#71717A] hover:text-black font-semibold flex items-center space-x-1 transition"
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
                            ? 'bg-[#111111] text-white border-[#111111]'
                            : 'bg-white border-neutral-200 text-[#111111] hover:border-black'
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
                    <span className="text-xs font-bold text-[#111111] uppercase tracking-wider">
                      Qty:
                    </span>
                    <div className="flex items-center border border-neutral-200 px-2 py-1 bg-white">
                      <button
                        onClick={() => setQuantity(Math.max(1, quantity - 1))}
                        className="p-1 text-[#71717A] hover:text-black"
                      >
                        <Minus className="w-3.5 h-3.5" />
                      </button>
                      <span className="px-3 text-xs font-bold text-[#111111] font-mono">{quantity}</span>
                      <button
                        onClick={() => setQuantity(Math.min(product.stock, quantity + 1))}
                        className="p-1 text-[#71717A] hover:text-black"
                      >
                        <Plus className="w-3.5 h-3.5" />
                      </button>
                    </div>
                  </div>

                  <div>
                    <span className="text-xs font-semibold text-emerald-700 flex items-center">
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
                      className="py-3.5 px-6 bg-white border border-[#111111] text-[#111111] hover:bg-[#111111] hover:text-white font-bold text-xs uppercase tracking-widest transition flex items-center justify-center space-x-2 shadow-xs"
                    >
                      <ShoppingBag className="w-4 h-4" />
                      <span>Add to Cart</span>
                    </button>

                    {/* 2. Buy Now */}
                    <button
                      onClick={handleBuyNow}
                      className="py-3.5 px-6 bg-[#111111] text-white hover:bg-black font-bold text-xs uppercase tracking-widest transition flex items-center justify-center space-x-2 shadow-xs"
                    >
                      <Zap className="w-4 h-4 fill-white" />
                      <span>Buy Now</span>
                    </button>
                  </div>

                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-2.5">
                    {/* 3. Add to Wishlist */}
                    <button
                      onClick={() => toggleWishlist(product)}
                      className="py-3 px-6 bg-white border border-neutral-300 text-[#111111] hover:border-black font-semibold text-xs uppercase tracking-wider transition flex items-center justify-center space-x-2"
                    >
                      <Heart className={`w-4 h-4 ${inWish ? 'fill-black text-black' : ''}`} />
                      <span>{inWish ? 'In Wishlist' : 'Add to Wishlist'}</span>
                    </button>

                    {/* 4. WhatsApp Enquiry */}
                    <button
                      onClick={handleWhatsAppOrder}
                      className="py-3 px-6 bg-[#F8F9FA] border border-neutral-300 text-[#111111] hover:bg-neutral-100 transition font-semibold text-xs uppercase tracking-wider flex items-center justify-center space-x-2"
                    >
                      <MessageCircle className="w-4 h-4 text-emerald-600" />
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
              <div className="pt-6 border-t border-neutral-200 grid grid-cols-3 gap-3 text-center text-xs text-[#71717A]">
                <div className="flex flex-col items-center">
                  <ShieldCheck className="w-5 h-5 text-[#111111] mb-1" />
                  <span className="font-semibold text-[#111111] text-[11px]">100% Certified</span>
                </div>
                <div className="flex flex-col items-center">
                  <RotateCcw className="w-5 h-5 text-[#111111] mb-1" />
                  <span className="font-semibold text-[#111111] text-[11px]">7-Day Returns</span>
                </div>
                <div className="flex flex-col items-center">
                  <Truck className="w-5 h-5 text-[#111111] mb-1" />
                  <span className="font-semibold text-[#111111] text-[11px]">Insured Cargo</span>
                </div>
              </div>
            </div>
          </div>

          {/* LOWER TABS */}
          <div className="mt-14 pt-8 border-t border-neutral-200">
            <div className="flex border-b border-neutral-200 space-x-4 sm:space-x-8 overflow-x-auto scrollbar-none whitespace-nowrap">
              <button
                onClick={() => setActiveTab('details')}
                className={`pb-3 text-xs font-bold uppercase tracking-widest transition ${
                  activeTab === 'details'
                    ? 'border-b-2 border-black text-[#111111]'
                    : 'text-[#71717A] hover:text-[#111111]'
                }`}
              >
                Materials & Craftsmanship
              </button>
              <button
                onClick={() => setActiveTab('specs')}
                className={`pb-3 text-xs font-bold uppercase tracking-widest transition ${
                  activeTab === 'specs'
                    ? 'border-b-2 border-black text-[#111111]'
                    : 'text-[#71717A] hover:text-[#111111]'
                }`}
              >
                Atelier Specifications
              </button>
              <button
                onClick={() => setActiveTab('reviews')}
                className={`pb-3 text-xs font-bold uppercase tracking-widest transition ${
                  activeTab === 'reviews'
                    ? 'border-b-2 border-black text-[#111111]'
                    : 'text-[#71717A] hover:text-[#111111]'
                }`}
              >
                Patron Reviews ({reviews.length})
              </button>
            </div>

            {activeTab === 'details' && (
              <div className="py-6 space-y-4 max-w-3xl text-xs sm:text-sm text-[#52525B] leading-relaxed">
                <p>{product.description}</p>
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 pt-4 border-t border-neutral-200 text-xs">
                  <div>
                    <span className="font-bold text-[#111111] block mb-0.5">Primary Materials:</span>
                    <span className="text-[#71717A]">{product.fabric}</span>
                  </div>
                  <div>
                    <span className="font-bold text-[#111111] block mb-0.5">Dimensions & Fit:</span>
                    <span className="text-[#71717A]">{product.fit}</span>
                  </div>
                  <div>
                    <span className="font-bold text-[#111111] block mb-0.5">Pattern & Finish:</span>
                    <span className="text-[#71717A]">{product.pattern}</span>
                  </div>
                  <div>
                    <span className="font-bold text-[#111111] block mb-0.5">Care Instructions:</span>
                    <span className="text-[#71717A]">{product.care}</span>
                  </div>
                </div>
              </div>
            )}

            {activeTab === 'specs' && (
              <div className="py-6 max-w-2xl">
                <table className="w-full text-xs text-left border border-neutral-200 overflow-hidden">
                  <tbody className="divide-y divide-neutral-200">
                    <tr className="bg-[#F8F9FA]">
                      <td className="p-3 font-semibold text-[#111111] w-1/3">Department</td>
                      <td className="p-3 text-[#71717A]">{product.category}</td>
                    </tr>
                    <tr>
                      <td className="p-3 font-semibold text-[#111111]">Atelier Line</td>
                      <td className="p-3 text-[#111111] font-mono font-bold">{product.brand}</td>
                    </tr>
                    {Object.entries(product.specifications || {}).map(([key, val], idx) => (
                      <tr key={key} className={idx % 2 === 0 ? 'bg-white' : 'bg-[#F8F9FA]'}>
                        <td className="p-3 font-semibold text-[#111111]">{key}</td>
                        <td className="p-3 text-[#71717A]">{val}</td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            )}

            {activeTab === 'reviews' && (
              <div className="py-6 space-y-8 max-w-4xl">
                <div className="p-6 bg-[#F8F9FA] border border-neutral-200 flex flex-col sm:flex-row items-center justify-between gap-6">
                  <div className="flex items-center space-x-3">
                    <span className="font-serif text-4xl font-extrabold text-[#111111]">
                      {product.rating}
                    </span>
                    <div>
                      <div className="flex text-amber-500">
                        {[1, 2, 3, 4, 5].map(i => (
                          <Star key={i} className="w-4 h-4 fill-amber-400" />
                        ))}
                      </div>
                      <p className="text-[11px] text-[#71717A] mt-0.5">Verified India & UAE Patron Feedback</p>
                    </div>
                  </div>
                  <div className="text-xs text-[#71717A] text-center sm:text-right">
                    <p className="font-semibold text-[#111111]">100% of owners recommend this luxury piece</p>
                    <p className="text-[11px] text-neutral-400 mt-0.5">Authenticated delivery signatures</p>
                  </div>
                </div>

                <div className="space-y-4">
                  {reviews.map(rev => (
                    <div key={rev.id} className="p-4 border border-neutral-200 bg-white">
                      <div className="flex items-center justify-between">
                        <div className="flex items-center space-x-2">
                          <span className="bg-[#111111] text-white text-[10px] font-bold px-1.5 py-0.5 flex items-center space-x-0.5">
                            <span>{rev.rating}</span>
                            <Star className="w-2.5 h-2.5 fill-white" />
                          </span>
                          <span className="text-xs font-bold text-[#111111]">{rev.title}</span>
                        </div>
                        <span className="text-[10px] text-neutral-400">
                          {new Date(rev.createdAt).toLocaleDateString('en-IN', { day: 'numeric', month: 'short', year: 'numeric' })}
                        </span>
                      </div>
                      <p className="text-xs text-[#52525B] mt-2 leading-relaxed">{rev.comment}</p>
                      <div className="flex items-center space-x-2 mt-3 text-[11px] text-neutral-500">
                        <span className="font-medium text-[#111111]">{rev.userName} ({rev.userLocation})</span>
                        <span>•</span>
                        <span className="text-emerald-700 flex items-center">
                          <Check className="w-3 h-3 mr-0.5" /> Verified Purchase
                        </span>
                      </div>
                    </div>
                  ))}
                </div>

                {/* Submit review */}
                <div className="pt-6 border-t border-neutral-200">
                  <h4 className="font-serif text-base font-bold text-[#111111] mb-3">
                    Write a Patron Review
                  </h4>
                  {reviewSuccess ? (
                    <div className="p-4 bg-emerald-50 border border-emerald-200 text-emerald-800 text-xs">
                      Thank you for reviewing! Your feedback has been published.
                    </div>
                  ) : (
                    <form onSubmit={handleReviewSubmit} className="space-y-3">
                      <div>
                        <label className="block text-xs font-semibold text-[#111111] mb-1">Rating</label>
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
                                    ? 'fill-amber-400 text-amber-400'
                                    : 'text-neutral-300'
                                }`}
                              />
                            </button>
                          ))}
                        </div>
                      </div>

                      <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                        <div>
                          <label className="block text-xs font-semibold text-[#111111] mb-1">Your Name</label>
                          <input
                            type="text"
                            required
                            placeholder="e.g. Sultan Al Qasimi"
                            value={reviewName}
                            onChange={e => setReviewName(e.target.value)}
                            className="w-full px-3 py-2 text-xs border border-neutral-300 bg-white text-[#111111] focus:outline-none focus:border-black"
                          />
                        </div>
                        <div>
                          <label className="block text-xs font-semibold text-[#111111] mb-1">Review Headline</label>
                          <input
                            type="text"
                            required
                            placeholder="e.g. Flawless dial & rapid WhatsApp delivery"
                            value={reviewTitle}
                            onChange={e => setReviewTitle(e.target.value)}
                            className="w-full px-3 py-2 text-xs border border-neutral-300 bg-white text-[#111111] focus:outline-none focus:border-black"
                          />
                        </div>
                      </div>

                      <div>
                        <label className="block text-xs font-semibold text-[#111111] mb-1">Detailed Review</label>
                        <textarea
                          required
                          rows={3}
                          placeholder="Describe the build quality, finishing, movement accuracy or leather feel..."
                          value={reviewComment}
                          onChange={e => setReviewComment(e.target.value)}
                          className="w-full px-3 py-2 text-xs border border-neutral-300 bg-white text-[#111111] focus:outline-none focus:border-black"
                        />
                      </div>

                      <button
                        type="submit"
                        disabled={isSubmittingReview}
                        className="px-6 py-2.5 bg-[#111111] text-white font-semibold text-xs uppercase tracking-wider hover:bg-black transition"
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
            <div className="mb-6 pb-2 border-b border-neutral-200">
              <span className="text-[10px] font-bold uppercase tracking-widest text-[#71717A]">
                MATCHING PIECES
              </span>
              <h3 className="font-serif text-xl font-bold text-[#111111] tracking-wide mt-0.5">
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
