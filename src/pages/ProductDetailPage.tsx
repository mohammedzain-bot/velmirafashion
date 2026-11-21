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
  Share2,
  Sparkles,
  MessageSquare
} from 'lucide-react';
import { useShop } from '../context/ShopContext';
import { useCart } from '../context/CartContext';
import { useWishlist } from '../context/WishlistContext';
import { PINCodeChecker } from '../components/PINCodeChecker';
import { SizeGuideModal } from '../components/SizeGuideModal';
import { ProductCard } from '../components/ProductCard';
import { Review } from '../types';

export const ProductDetailPage: React.FC = () => {
  const { id } = useParams<{ id: string }>();
  const navigate = useNavigate();
  const { products, getReviewsForProduct, submitReview } = useShop();
  const { addToCart } = useCart();
  const { isInWishlist, toggleWishlist } = useWishlist();

  const product = products.find(p => p.id === id);

  const [activeImageIndex, setActiveImageIndex] = useState(0);
  const [selectedSize, setSelectedSize] = useState<string>('');
  const [selectedColor, setSelectedColor] = useState<string>('');
  const [quantity, setQuantity] = useState(1);
  const [isSizeGuideOpen, setIsSizeGuideOpen] = useState(false);
  const [reviews, setReviews] = useState<Review[]>([]);
  const [activeTab, setActiveTab] = useState<'details' | 'specs' | 'reviews'>('details');

  // Review Form state
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
      setSelectedSize(product.sizes[0] || 'Free Size');
      setSelectedColor(product.colors[0]?.name || 'Standard');
      setQuantity(1);

      getReviewsForProduct(product.id).then(res => setReviews(res));
    }
  }, [id, product]);

  if (!product) {
    return (
      <div className="min-h-screen flex flex-col items-center justify-center p-8 text-center bg-[#F8F9FA]">
        <h2 className="font-cinzel text-2xl font-bold text-stone-900">Product Not Found</h2>
        <p className="text-xs text-stone-500 mt-2">The requested garment could not be found or has concluded its limited run.</p>
        <Link
          to="/products"
          className="mt-6 px-6 py-2.5 rounded-full bg-[#0F0F0F] text-[#D4AF37] font-semibold text-xs uppercase tracking-wider"
        >
          Browse All Collections
        </Link>
      </div>
    );
  }

  const inWish = isInWishlist(product.id);
  const relatedProducts = products
    .filter(p => p.category === product.category && p.id !== product.id)
    .slice(0, 4);

  const handleAddToCart = () => {
    addToCart(product, selectedSize, selectedColor, quantity);
  };

  const handleBuyNow = () => {
    addToCart(product, selectedSize, selectedColor, quantity);
    navigate('/checkout');
  };

  const handleReviewSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!reviewName || !reviewTitle || !reviewComment) return;
    setIsSubmittingReview(true);
    try {
      const newRev = await submitReview({
        productId: product.id,
        userName: reviewName,
        userLocation: 'Verified Buyer',
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
    <div className="min-h-screen bg-[#F8F9FA] pb-16">
      {/* Breadcrumb */}
      <div className="bg-white border-b border-stone-200 py-3">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 flex items-center space-x-2 text-xs text-stone-500 truncate">
          <Link to="/" className="hover:text-black">Home</Link>
          <ChevronRight className="w-3 h-3 text-stone-400 shrink-0" />
          <Link to={`/products?category=${encodeURIComponent(product.category)}`} className="hover:text-black">
            {product.category}
          </Link>
          <ChevronRight className="w-3 h-3 text-stone-400 shrink-0" />
          <span className="text-stone-900 font-semibold truncate">{product.name}</span>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pt-8">
        <div className="bg-white rounded-2xl border border-stone-200 p-6 sm:p-8 shadow-xs">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-12">
            {/* LEFT: Image Gallery (5 cols) */}
            <div className="lg:col-span-6 flex flex-col-reverse sm:flex-row gap-4">
              {/* Thumbnails (vertical on tablet/desktop) */}
              <div className="flex sm:flex-col gap-3 overflow-x-auto sm:overflow-y-auto sm:w-20 shrink-0 scrollbar-none">
                {product.images.map((img, idx) => (
                  <button
                    key={idx}
                    onClick={() => setActiveImageIndex(idx)}
                    className={`relative w-16 h-20 sm:w-20 sm:h-24 rounded-lg overflow-hidden border-2 transition shrink-0 ${
                      activeImageIndex === idx
                        ? 'border-[#D4AF37] shadow-sm'
                        : 'border-stone-200 hover:border-stone-400 opacity-70 hover:opacity-100'
                    }`}
                  >
                    <img src={img} alt={`${product.name} preview ${idx + 1}`} className="w-full h-full object-cover" />
                  </button>
                ))}
              </div>

              {/* Main Image Frame with Zoom */}
              <div className="flex-1 relative aspect-[3/4] rounded-2xl overflow-hidden bg-stone-100 border border-stone-200 group">
                <img
                  src={product.images[activeImageIndex] || product.images[0]}
                  alt={product.name}
                  className="w-full h-full object-cover object-top transition-transform duration-700 ease-out group-hover:scale-110"
                />

                {/* Badges */}
                <div className="absolute top-3 left-3 flex flex-col gap-1.5 z-10">
                  {product.isBestSeller && (
                    <span className="bg-[#0F0F0F] text-[#D4AF37] text-[10px] font-bold px-2.5 py-1 rounded tracking-widest uppercase shadow-md">
                      Bestseller
                    </span>
                  )}
                  {product.discountPercentage >= 50 && (
                    <span className="bg-amber-600 text-white text-[10px] font-bold px-2.5 py-1 rounded tracking-wider shadow-md">
                      {product.discountPercentage}% OFF
                    </span>
                  )}
                </div>

                {/* Wishlist Button */}
                <button
                  onClick={() => toggleWishlist(product)}
                  className={`absolute top-3 right-3 p-2.5 rounded-full shadow-lg transition-all ${
                    inWish
                      ? 'bg-rose-50 text-rose-600'
                      : 'bg-white/90 text-stone-700 hover:text-rose-600 hover:bg-white'
                  }`}
                  aria-label="Wishlist"
                >
                  <Heart className={`w-5 h-5 ${inWish ? 'fill-rose-600 text-rose-600' : ''}`} />
                </button>
              </div>
            </div>

            {/* RIGHT: Product Info & Purchase Controls (7 cols) */}
            <div className="lg:col-span-6 flex flex-col justify-between space-y-6">
              <div>
                {/* Brand & Subcategory */}
                <div className="flex items-center justify-between">
                  <span className="text-xs font-bold font-cinzel text-[#C5A059] tracking-widest uppercase">
                    {product.brand}
                  </span>
                  <span className="text-xs text-stone-400">{product.subcategory}</span>
                </div>

                {/* Title */}
                <h1 className="font-cinzel text-xl sm:text-2xl lg:text-3xl font-bold text-stone-900 mt-1 leading-snug">
                  {product.name}
                </h1>

                {/* Rating & Reviews Pill */}
                <div className="flex items-center space-x-3 mt-3">
                  <div className="flex items-center space-x-1.5 bg-emerald-800 text-white text-xs font-bold px-2 py-0.5 rounded">
                    <span>{product.rating}</span>
                    <Star className="w-3 h-3 fill-white text-white" />
                  </div>
                  <span className="text-xs text-stone-500 font-medium">
                    {product.ratingCount.toLocaleString('en-IN')} Ratings & {product.reviewCount} Verified Buyer Reviews
                  </span>
                </div>

                {/* Flipkart Style Price Callout */}
                <div className="mt-5 p-4 rounded-xl bg-[#FAFAF8] border border-stone-200">
                  <div className="flex items-baseline space-x-3">
                    <span className="text-2xl sm:text-3xl font-bold text-stone-900 font-mono">
                      ₹{product.discountedPrice.toLocaleString('en-IN')}
                    </span>
                    <span className="text-sm sm:text-base text-stone-400 line-through font-mono">
                      ₹{product.originalPrice.toLocaleString('en-IN')}
                    </span>
                    <span className="text-xs sm:text-sm font-bold text-emerald-700 font-mono">
                      {product.discountPercentage}% OFF
                    </span>
                  </div>
                  <p className="text-[11px] text-stone-500 mt-1">
                    Inclusive of all luxury taxes & duties. Free white-glove express delivery included.
                  </p>

                  {/* Bank offer strip */}
                  <div className="mt-3 pt-3 border-t border-stone-200/70 space-y-1 text-xs text-stone-700">
                    <p className="flex items-center space-x-1 font-semibold text-stone-900">
                      <Sparkles className="w-3.5 h-3.5 text-[#D4AF37]" />
                      <span>Available Bank & VIP Offers:</span>
                    </p>
                    <p className="text-[11px] text-stone-600 pl-4">
                      • <strong>15% Instant Discount</strong> with Coupon Code <span className="font-mono text-stone-900">FIRSTBUY</span>
                    </p>
                    <p className="text-[11px] text-stone-600 pl-4">
                      • Flat ₹500 OFF on orders above ₹2,999 with code <span className="font-mono text-stone-900">VELMIRA500</span>
                    </p>
                  </div>
                </div>

                {/* Color Selector */}
                {product.colors && product.colors.length > 0 && (
                  <div className="mt-5">
                    <div className="flex items-center justify-between mb-2">
                      <span className="text-xs font-bold text-stone-900 uppercase tracking-wider">
                        Color: <span className="text-[#C5A059] font-semibold">{selectedColor}</span>
                      </span>
                    </div>
                    <div className="flex items-center gap-3">
                      {product.colors.map(col => (
                        <button
                          key={col.name}
                          type="button"
                          onClick={() => setSelectedColor(col.name)}
                          className={`flex items-center space-x-1.5 px-3 py-1.5 rounded-full border text-xs font-medium transition ${
                            selectedColor === col.name
                              ? 'border-black bg-stone-900 text-white font-semibold'
                              : 'border-stone-300 text-stone-700 hover:border-black'
                          }`}
                        >
                          <span
                            className="w-3.5 h-3.5 rounded-full border border-black/20 shrink-0"
                            style={{ backgroundColor: col.hex }}
                          />
                          <span>{col.name}</span>
                        </button>
                      ))}
                    </div>
                  </div>
                )}

                {/* Size Selector with Size Guide Button */}
                <div className="mt-5">
                  <div className="flex items-center justify-between mb-2">
                    <span className="text-xs font-bold text-stone-900 uppercase tracking-wider">
                      Select Size:
                    </span>
                    <button
                      onClick={() => setIsSizeGuideOpen(true)}
                      className="text-xs text-[#C5A059] hover:text-stone-900 font-semibold flex items-center space-x-1"
                    >
                      <Ruler className="w-3.5 h-3.5" />
                      <span>Size Guide</span>
                    </button>
                  </div>
                  <div className="flex flex-wrap gap-2">
                    {product.sizes.map(size => (
                      <button
                        key={size}
                        type="button"
                        onClick={() => setSelectedSize(size)}
                        className={`min-w-14 py-2 px-3 text-xs font-bold rounded-lg border transition ${
                          selectedSize === size
                            ? 'bg-[#0F0F0F] text-[#D4AF37] border-black shadow-xs'
                            : 'bg-white border-stone-300 text-stone-800 hover:border-stone-900'
                        }`}
                      >
                        {size}
                      </button>
                    ))}
                  </div>
                </div>

                {/* Quantity & Stock Status */}
                <div className="mt-5 flex items-center justify-between">
                  <div className="flex items-center space-x-2">
                    <span className="text-xs font-bold text-stone-900 uppercase tracking-wider">
                      Qty:
                    </span>
                    <div className="flex items-center border border-stone-300 rounded-lg px-2 py-1 bg-white">
                      <button
                        onClick={() => setQuantity(Math.max(1, quantity - 1))}
                        className="p-1 text-stone-500 hover:text-black"
                      >
                        <Minus className="w-3.5 h-3.5" />
                      </button>
                      <span className="px-3 text-xs font-bold text-stone-900 font-mono">{quantity}</span>
                      <button
                        onClick={() => setQuantity(Math.min(product.stock, quantity + 1))}
                        className="p-1 text-stone-500 hover:text-black"
                      >
                        <Plus className="w-3.5 h-3.5" />
                      </button>
                    </div>
                  </div>

                  <div>
                    {product.stock <= 5 && product.stock > 0 ? (
                      <span className="text-xs font-bold text-amber-700 bg-amber-50 border border-amber-200 px-2.5 py-1 rounded-full flex items-center">
                        <Zap className="w-3 h-3 mr-1 fill-amber-500 text-amber-500" /> Only {product.stock} items left in stock!
                      </span>
                    ) : (
                      <span className="text-xs font-semibold text-emerald-700 flex items-center">
                        <Check className="w-3.5 h-3.5 mr-1" /> Ready for Immediate Dispatch
                      </span>
                    )}
                  </div>
                </div>

                {/* Primary Action Buttons (Flipkart style: Add to Cart + Buy Now) */}
                <div className="mt-6 grid grid-cols-1 sm:grid-cols-2 gap-3">
                  <button
                    onClick={handleAddToCart}
                    className="py-3.5 px-6 rounded-xl bg-white border-2 border-stone-900 text-stone-900 hover:bg-stone-50 font-bold text-xs uppercase tracking-widest transition flex items-center justify-center space-x-2 shadow-xs"
                  >
                    <ShoppingBag className="w-4 h-4 text-[#D4AF37]" />
                    <span>Add to Bag</span>
                  </button>

                  <button
                    onClick={handleBuyNow}
                    className="py-3.5 px-6 rounded-xl bg-[#0F0F0F] text-[#D4AF37] hover:bg-stone-800 font-bold text-xs uppercase tracking-widest transition flex items-center justify-center space-x-2 shadow-md"
                  >
                    <Zap className="w-4 h-4 fill-[#D4AF37]" />
                    <span>Buy Now</span>
                  </button>
                </div>

                {/* Indian PIN Code Delivery Checker */}
                <div className="mt-6">
                  <PINCodeChecker />
                </div>
              </div>

              {/* Trust highlights */}
              <div className="pt-6 border-t border-stone-200 grid grid-cols-3 gap-3 text-center text-xs text-stone-600">
                <div className="flex flex-col items-center">
                  <ShieldCheck className="w-5 h-5 text-[#D4AF37] mb-1" />
                  <span className="font-semibold text-stone-900 text-[11px]">100% Genuine</span>
                </div>
                <div className="flex flex-col items-center">
                  <RotateCcw className="w-5 h-5 text-[#D4AF37] mb-1" />
                  <span className="font-semibold text-stone-900 text-[11px]">7-Day Returns</span>
                </div>
                <div className="flex flex-col items-center">
                  <Truck className="w-5 h-5 text-[#D4AF37] mb-1" />
                  <span className="font-semibold text-stone-900 text-[11px]">Insured Air Cargo</span>
                </div>
              </div>
            </div>
          </div>

          {/* LOWER TABS: Description, Specifications, Reviews */}
          <div className="mt-14 pt-8 border-t border-stone-200">
            {/* Tab buttons */}
            <div className="flex border-b border-stone-200 space-x-8">
              <button
                onClick={() => setActiveTab('details')}
                className={`pb-3 text-xs font-bold uppercase tracking-widest transition ${
                  activeTab === 'details'
                    ? 'border-b-2 border-[#D4AF37] text-stone-900'
                    : 'text-stone-400 hover:text-stone-800'
                }`}
              >
                Product Details & Fabric
              </button>
              <button
                onClick={() => setActiveTab('specs')}
                className={`pb-3 text-xs font-bold uppercase tracking-widest transition ${
                  activeTab === 'specs'
                    ? 'border-b-2 border-[#D4AF37] text-stone-900'
                    : 'text-stone-400 hover:text-stone-800'
                }`}
              >
                Specifications
              </button>
              <button
                onClick={() => setActiveTab('reviews')}
                className={`pb-3 text-xs font-bold uppercase tracking-widest transition ${
                  activeTab === 'reviews'
                    ? 'border-b-2 border-[#D4AF37] text-stone-900'
                    : 'text-stone-400 hover:text-stone-800'
                }`}
              >
                Patron Reviews ({reviews.length})
              </button>
            </div>

            {/* Tab 1: Details */}
            {activeTab === 'details' && (
              <div className="py-6 space-y-4 max-w-3xl text-xs sm:text-sm text-stone-700 leading-relaxed">
                <p>{product.description}</p>
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 pt-4 border-t border-stone-100 text-xs">
                  <div>
                    <span className="font-bold text-stone-900 block mb-0.5">Fabric & Composition:</span>
                    <span className="text-stone-600">{product.fabric}</span>
                  </div>
                  <div>
                    <span className="font-bold text-stone-900 block mb-0.5">Silhouette & Fit:</span>
                    <span className="text-stone-600">{product.fit}</span>
                  </div>
                  <div>
                    <span className="font-bold text-stone-900 block mb-0.5">Embellishment Pattern:</span>
                    <span className="text-stone-600">{product.pattern}</span>
                  </div>
                  <div>
                    <span className="font-bold text-stone-900 block mb-0.5">Care Instructions:</span>
                    <span className="text-stone-600">{product.care}</span>
                  </div>
                </div>
              </div>
            )}

            {/* Tab 2: Specifications Table */}
            {activeTab === 'specs' && (
              <div className="py-6 max-w-2xl">
                <table className="w-full text-xs text-left border border-stone-200 rounded-xl overflow-hidden">
                  <tbody className="divide-y divide-stone-100">
                    <tr className="bg-[#FAFAF8]">
                      <td className="p-3 font-semibold text-stone-800 w-1/3">Category</td>
                      <td className="p-3 text-stone-600">{product.category}</td>
                    </tr>
                    <tr>
                      <td className="p-3 font-semibold text-stone-800">Subcategory</td>
                      <td className="p-3 text-stone-600">{product.subcategory}</td>
                    </tr>
                    <tr className="bg-[#FAFAF8]">
                      <td className="p-3 font-semibold text-stone-800">Brand Atelier</td>
                      <td className="p-3 text-stone-600 font-cinzel font-bold">{product.brand}</td>
                    </tr>
                    {Object.entries(product.specifications || {}).map(([key, val], idx) => (
                      <tr key={key} className={idx % 2 === 0 ? 'bg-white' : 'bg-[#FAFAF8]'}>
                        <td className="p-3 font-semibold text-stone-800">{key}</td>
                        <td className="p-3 text-stone-600">{val}</td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            )}

            {/* Tab 3: Customer Reviews */}
            {activeTab === 'reviews' && (
              <div className="py-6 space-y-8 max-w-4xl">
                {/* Rating summary bar */}
                <div className="p-6 rounded-2xl bg-[#FAFAF8] border border-stone-200 flex flex-col sm:flex-row items-center justify-between gap-6">
                  <div className="text-center sm:text-left">
                    <div className="flex items-center space-x-2">
                      <span className="font-cinzel text-4xl font-extrabold text-stone-900">
                        {product.rating}
                      </span>
                      <div>
                        <div className="flex text-amber-500">
                          {[1, 2, 3, 4, 5].map(i => (
                            <Star key={i} className="w-4 h-4 fill-amber-400" />
                          ))}
                        </div>
                        <p className="text-[11px] text-stone-500 mt-0.5">Based on {product.ratingCount} reviews</p>
                      </div>
                    </div>
                  </div>

                  <div className="text-xs text-stone-600 text-center sm:text-right">
                    <p className="font-semibold text-stone-900">100% of customers recommend this couture creation</p>
                    <p className="text-[11px] text-stone-400 mt-0.5">Every review is authentic & verified from Indian deliveries</p>
                  </div>
                </div>

                {/* Reviews List */}
                <div className="space-y-4">
                  {reviews.length === 0 ? (
                    <p className="text-xs text-stone-500">Be the first distinguished patron to review this couture piece.</p>
                  ) : (
                    reviews.map(rev => (
                      <div key={rev.id} className="p-4 rounded-xl border border-stone-200/80 bg-white">
                        <div className="flex items-center justify-between">
                          <div className="flex items-center space-x-2">
                            <span className="bg-emerald-800 text-white text-[10px] font-bold px-1.5 py-0.2 rounded flex items-center space-x-0.5">
                              <span>{rev.rating}</span>
                              <Star className="w-2.5 h-2.5 fill-white" />
                            </span>
                            <span className="text-xs font-bold text-stone-900">{rev.title}</span>
                          </div>
                          <span className="text-[10px] text-stone-400">
                            {new Date(rev.createdAt).toLocaleDateString('en-IN', { day: 'numeric', month: 'short', year: 'numeric' })}
                          </span>
                        </div>
                        <p className="text-xs text-stone-700 mt-2 leading-relaxed">{rev.comment}</p>
                        <div className="flex items-center space-x-2 mt-3 text-[11px] text-stone-400">
                          <span className="font-medium text-stone-800">{rev.userName}</span>
                          <span>•</span>
                          <span className="text-emerald-700 flex items-center">
                            <Check className="w-3 h-3 mr-0.5" /> Verified Purchase
                          </span>
                        </div>
                      </div>
                    ))
                  )}
                </div>

                {/* Write a Review Section */}
                <div className="pt-6 border-t border-stone-200">
                  <h4 className="font-cinzel text-base font-bold text-stone-900 mb-3">
                    Write a Review
                  </h4>
                  {reviewSuccess ? (
                    <div className="p-4 rounded-xl bg-emerald-50 border border-emerald-200 text-emerald-800 text-xs">
                      Thank you for reviewing! Your feedback has been published.
                    </div>
                  ) : (
                    <form onSubmit={handleReviewSubmit} className="space-y-3">
                      <div>
                        <label className="block text-xs font-semibold text-stone-700 mb-1">Rating</label>
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
                                    : 'text-stone-300'
                                }`}
                              />
                            </button>
                          ))}
                        </div>
                      </div>

                      <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                        <div>
                          <label className="block text-xs font-semibold text-stone-700 mb-1">Your Name</label>
                          <input
                            type="text"
                            required
                            placeholder="e.g. Radhika Kapoor"
                            value={reviewName}
                            onChange={e => setReviewName(e.target.value)}
                            className="w-full px-3 py-2 text-xs rounded-lg border border-stone-300 focus:outline-none focus:border-[#D4AF37]"
                          />
                        </div>
                        <div>
                          <label className="block text-xs font-semibold text-stone-700 mb-1">Review Headline</label>
                          <input
                            type="text"
                            required
                            placeholder="e.g. Magnificent weave & fit!"
                            value={reviewTitle}
                            onChange={e => setReviewTitle(e.target.value)}
                            className="w-full px-3 py-2 text-xs rounded-lg border border-stone-300 focus:outline-none focus:border-[#D4AF37]"
                          />
                        </div>
                      </div>

                      <div>
                        <label className="block text-xs font-semibold text-stone-700 mb-1">Detailed Review</label>
                        <textarea
                          required
                          rows={3}
                          placeholder="Describe the fabric quality, stitching, drape, and overall luxury experience..."
                          value={reviewComment}
                          onChange={e => setReviewComment(e.target.value)}
                          className="w-full px-3 py-2 text-xs rounded-lg border border-stone-300 focus:outline-none focus:border-[#D4AF37]"
                        />
                      </div>

                      <button
                        type="submit"
                        disabled={isSubmittingReview}
                        className="px-6 py-2.5 rounded-full bg-[#0F0F0F] text-[#D4AF37] font-semibold text-xs uppercase tracking-wider hover:bg-stone-800 transition"
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

        {/* RELATED PRODUCTS */}
        {relatedProducts.length > 0 && (
          <div className="mt-14">
            <div className="mb-6 pb-2 border-b border-stone-200">
              <span className="text-[10px] font-bold uppercase tracking-widest text-[#D4AF37]">
                SIMILAR SILHOUETTES
              </span>
              <h3 className="font-cinzel text-xl font-bold text-stone-900 tracking-wide mt-0.5">
                Patrons Also Viewed
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

      {/* Size Guide Modal */}
      <SizeGuideModal
        isOpen={isSizeGuideOpen}
        onClose={() => setIsSizeGuideOpen(false)}
        category={product.category}
      />
    </div>
  );
};
