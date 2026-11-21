import React, { useState, useRef, useEffect } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import {
  Search,
  ShoppingBag,
  Heart,
  User as UserIcon,
  ChevronDown,
  Sparkles,
  Package,
  LogOut,
  Shield,
  MapPin,
  Menu,
  X,
  TrendingUp,
  MessageCircle,
  Globe
} from 'lucide-react';
import { useCart } from '../context/CartContext';
import { useWishlist } from '../context/WishlistContext';
import { useAuth } from '../context/AuthContext';
import { useShop } from '../context/ShopContext';
import { useCurrency } from '../context/CurrencyContext';
import { AuthModal } from './AuthModal';
import { OFFICIAL_WHATSAPP_NUMBER, WHATSAPP_RAW_NUMBER } from '../utils/whatsapp';

export const Navbar: React.FC = () => {
  const { totalItemsCount, setIsCartDrawerOpen } = useCart();
  const { wishlistIds } = useWishlist();
  const { user, logout } = useAuth();
  const { products, setFilters } = useShop();
  const { country, currency, setRegion } = useCurrency();
  const navigate = useNavigate();

  const [searchQuery, setSearchQuery] = useState('');
  const [isSearchFocused, setIsSearchFocused] = useState(false);
  const [isUserMenuOpen, setIsUserMenuOpen] = useState(false);
  const [isRegionMenuOpen, setIsRegionMenuOpen] = useState(false);
  const [isAuthModalOpen, setIsAuthModalOpen] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

  const searchRef = useRef<HTMLDivElement>(null);
  const userMenuRef = useRef<HTMLDivElement>(null);
  const regionRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const handleClickOutside = (e: MouseEvent) => {
      if (searchRef.current && !searchRef.current.contains(e.target as Node)) {
        setIsSearchFocused(false);
      }
      if (userMenuRef.current && !userMenuRef.current.contains(e.target as Node)) {
        setIsUserMenuOpen(false);
      }
      if (regionRef.current && !regionRef.current.contains(e.target as Node)) {
        setIsRegionMenuOpen(false);
      }
    };
    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, []);

  const handleSearchSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (searchQuery.trim()) {
      setFilters(prev => ({ ...prev, searchQuery: searchQuery.trim(), category: 'All' }));
      navigate(`/products?search=${encodeURIComponent(searchQuery.trim())}`);
      setIsSearchFocused(false);
    }
  };

  const handleSuggestionClick = (query: string) => {
    setSearchQuery(query);
    setFilters(prev => ({ ...prev, searchQuery: query, category: 'All' }));
    navigate(`/products?search=${encodeURIComponent(query)}`);
    setIsSearchFocused(false);
  };

  const trendingKeywords = [
    'Chrono Royal',
    'Saffiano Tote',
    'Tourbillon 42mm',
    'Submariner Diver',
    'Kelly Handbag',
    'Diamond Lady Date',
    'Weekender Duffle'
  ];

  const liveMatches = searchQuery.trim()
    ? products
        .filter(
          p =>
            p.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
            p.brand.toLowerCase().includes(searchQuery.toLowerCase()) ||
            p.subcategory.toLowerCase().includes(searchQuery.toLowerCase())
        )
        .slice(0, 4)
    : [];

  return (
    <>
      <header className="sticky top-0 z-40 bg-[#0F0F0F] text-white">
        {/* Top Announcement Ribbon with WhatsApp Ordering Info & Currency Switcher */}
        <div className="bg-[#171717] border-b border-stone-800 text-[11px] py-1.5 px-4 sm:px-8 flex items-center justify-between text-stone-300">
          <div className="flex items-center space-x-2 truncate">
            <span className="bg-[#D4AF37] text-black text-[9px] font-bold px-1.5 py-0.2 rounded uppercase tracking-wider font-cinzel">
              India & UAE Direct
            </span>
            <span className="truncate">
              ⚡ Order Directly on WhatsApp: <a href={`https://wa.me/${WHATSAPP_RAW_NUMBER}`} target="_blank" rel="noreferrer" className="text-emerald-400 font-bold hover:underline">{OFFICIAL_WHATSAPP_NUMBER}</a> | White-Glove Delivery
            </span>
          </div>

          <div className="flex items-center space-x-4 text-xs">
            {/* Region / Currency Switcher */}
            <div ref={regionRef} className="relative">
              <button
                onClick={() => setIsRegionMenuOpen(!isRegionMenuOpen)}
                className="flex items-center space-x-1.5 py-0.5 px-2 rounded bg-stone-900 border border-stone-700 text-stone-200 hover:text-white transition"
              >
                <span>{country === 'UAE' ? '🇦🇪 UAE (AED)' : '🇮🇳 India (INR ₹)'}</span>
                <ChevronDown className="w-3 h-3 text-stone-400" />
              </button>

              {isRegionMenuOpen && (
                <div className="absolute right-0 mt-1 w-44 bg-white text-stone-900 rounded-xl shadow-xl border border-stone-200 py-1.5 z-50 text-xs">
                  <button
                    onClick={() => { setRegion('India'); setIsRegionMenuOpen(false); }}
                    className={`w-full text-left px-3 py-1.5 flex items-center justify-between hover:bg-stone-50 ${country === 'India' ? 'font-bold text-[#D4AF37]' : ''}`}
                  >
                    <span>🇮🇳 India (₹ INR)</span>
                    {country === 'India' && <span className="text-[10px] bg-amber-100 text-amber-900 px-1.5 rounded">Active</span>}
                  </button>
                  <button
                    onClick={() => { setRegion('UAE'); setIsRegionMenuOpen(false); }}
                    className={`w-full text-left px-3 py-1.5 flex items-center justify-between hover:bg-stone-50 ${country === 'UAE' ? 'font-bold text-[#D4AF37]' : ''}`}
                  >
                    <span>🇦🇪 UAE (AED د.إ)</span>
                    {country === 'UAE' && <span className="text-[10px] bg-emerald-100 text-emerald-900 px-1.5 rounded">Active</span>}
                  </button>
                </div>
              )}
            </div>

            <div className="hidden md:flex items-center space-x-4 text-stone-400">
              <Link to="/dashboard?tab=orders" className="hover:text-[#D4AF37] transition flex items-center space-x-1">
                <Package className="w-3.5 h-3.5" />
                <span>Track</span>
              </Link>
              <span className="text-stone-700">|</span>
              <Link to="/admin" className="hover:text-[#D4AF37] transition flex items-center space-x-1 text-amber-300">
                <Shield className="w-3.5 h-3.5" />
                <span>Admin</span>
              </Link>
            </div>
          </div>
        </div>

        {/* Main Navbar */}
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-3.5 flex items-center justify-between gap-4">
          {/* Logo */}
          <div className="flex items-center space-x-3">
            <Link to="/" className="flex flex-col group">
              <div className="flex items-center space-x-1.5">
                <span className="font-cinzel text-xl sm:text-2xl font-extrabold tracking-widest text-white group-hover:text-stone-100 transition">
                  VELMIRA
                </span>
                <span className="w-1.5 h-1.5 rounded-full bg-[#D4AF37] inline-block mb-1" />
              </div>
              <span className="text-[8px] sm:text-[9px] font-medium tracking-[0.25em] text-[#D4AF37] uppercase -mt-1 font-sans">
                Luxury Watches & Bags Atelier
              </span>
            </Link>
          </div>

          {/* Center Search Bar */}
          <div ref={searchRef} className="relative flex-1 max-w-xl hidden md:block">
            <form onSubmit={handleSearchSubmit} className="relative flex items-center">
              <input
                type="text"
                placeholder="Search luxury automatic watches, chronographs, Saffiano totes, duffle bags..."
                value={searchQuery}
                onChange={e => setSearchQuery(e.target.value)}
                onFocus={() => setIsSearchFocused(true)}
                className="w-full bg-[#FAFAF8] text-stone-900 placeholder-stone-400 pl-11 pr-24 py-2.5 rounded-full text-xs font-medium border border-transparent focus:border-[#D4AF37] focus:bg-white focus:outline-none transition shadow-inner"
              />
              <Search className="w-4 h-4 text-stone-400 absolute left-4 pointer-events-none" />

              <button
                type="submit"
                className="absolute right-1.5 px-4 py-1.5 rounded-full bg-[#0F0F0F] text-[#D4AF37] text-xs font-semibold uppercase tracking-wider hover:bg-stone-800 transition"
              >
                Search
              </button>
            </form>

            {/* Search Dropdown */}
            {isSearchFocused && (
              <div className="absolute top-full left-0 right-0 mt-2 bg-white text-stone-800 rounded-2xl shadow-2xl border border-stone-200 overflow-hidden z-50">
                {liveMatches.length > 0 && (
                  <div className="p-3 border-b border-stone-100">
                    <p className="text-[10px] font-bold uppercase tracking-wider text-stone-400 mb-2">
                      Matching Watches & Bags
                    </p>
                    <div className="space-y-2">
                      {liveMatches.map(product => (
                        <Link
                          key={product.id}
                          to={`/products/${product.id}`}
                          onClick={() => setIsSearchFocused(false)}
                          className="flex items-center space-x-3 p-1.5 rounded-lg hover:bg-stone-50 transition"
                        >
                          <img
                            src={product.images[0]}
                            alt={product.name}
                            className="w-9 h-11 object-cover rounded border border-stone-200 shrink-0"
                          />
                          <div className="flex-1 min-w-0">
                            <p className="text-[10px] text-[#D4AF37] uppercase font-bold tracking-wide">
                              {product.brand}
                            </p>
                            <p className="text-xs font-medium text-stone-900 truncate">{product.name}</p>
                          </div>
                          <span className="text-xs font-bold font-mono text-stone-900">
                            {currency === 'AED' ? `AED ${product.priceAED}` : `₹${product.discountedPrice.toLocaleString('en-IN')}`}
                          </span>
                        </Link>
                      ))}
                    </div>
                  </div>
                )}

                <div className="p-4 bg-[#FAFAF8]">
                  <p className="text-[10px] font-bold uppercase tracking-wider text-stone-500 mb-2 flex items-center">
                    <TrendingUp className="w-3 h-3 mr-1 text-[#D4AF37]" /> Trending Silhouettes
                  </p>
                  <div className="flex flex-wrap gap-1.5">
                    {trendingKeywords.map((kw, i) => (
                      <button
                        key={i}
                        type="button"
                        onClick={() => handleSuggestionClick(kw)}
                        className="px-2.5 py-1 text-xs rounded-full bg-white border border-stone-200 text-stone-700 hover:border-[#D4AF37] hover:text-[#0F0F0F] transition"
                      >
                        {kw}
                      </button>
                    ))}
                  </div>
                </div>
              </div>
            )}
          </div>

          {/* Right Action Icons */}
          <div className="flex items-center space-x-2 sm:space-x-4">
            {/* Direct WhatsApp Ordering Header Button */}
            <a
              href={`https://wa.me/${WHATSAPP_RAW_NUMBER}?text=${encodeURIComponent('Hello Velmira Dispatch Concierge, I would like to order a luxury watch/bag.')}`}
              target="_blank"
              rel="noreferrer"
              className="hidden lg:flex items-center space-x-1.5 py-1.5 px-3 rounded-full bg-emerald-600 hover:bg-emerald-700 text-white text-xs font-semibold shadow-xs transition"
              title="Order on WhatsApp"
            >
              <MessageCircle className="w-4 h-4 fill-white" />
              <span>WhatsApp: +971 55 678 7854</span>
            </a>

            {/* Account Menu */}
            <div ref={userMenuRef} className="relative">
              {user ? (
                <button
                  onClick={() => setIsUserMenuOpen(!isUserMenuOpen)}
                  className="flex items-center space-x-2 py-1.5 px-3 rounded-full bg-stone-900 hover:bg-stone-800 border border-stone-800 transition"
                >
                  <div className="w-6 h-6 rounded-full bg-[#D4AF37] text-black font-bold text-xs flex items-center justify-center font-cinzel">
                    {user.name.charAt(0)}
                  </div>
                  <ChevronDown className="w-3.5 h-3.5 text-stone-400" />
                </button>
              ) : (
                <button
                  onClick={() => setIsAuthModalOpen(true)}
                  className="px-3.5 py-1.5 rounded-full bg-stone-900 hover:bg-stone-800 border border-stone-700 text-white text-xs font-semibold uppercase tracking-wider flex items-center space-x-1.5 transition"
                >
                  <UserIcon className="w-3.5 h-3.5 text-[#D4AF37]" />
                  <span>Login</span>
                </button>
              )}

              {isUserMenuOpen && user && (
                <div className="absolute right-0 mt-2 w-56 bg-white text-stone-800 rounded-xl shadow-2xl border border-stone-200 py-2 z-50">
                  <div className="px-4 py-2 border-b border-stone-100">
                    <p className="text-xs font-bold text-stone-900">{user.name}</p>
                    <p className="text-[11px] text-stone-500 truncate">{user.email}</p>
                  </div>
                  <Link
                    to="/dashboard?tab=orders"
                    onClick={() => setIsUserMenuOpen(false)}
                    className="flex items-center space-x-2 px-4 py-2 text-xs text-stone-700 hover:bg-stone-50"
                  >
                    <Package className="w-3.5 h-3.5 text-stone-400" />
                    <span>My Orders</span>
                  </Link>
                  <Link
                    to="/dashboard?tab=wishlist"
                    onClick={() => setIsUserMenuOpen(false)}
                    className="flex items-center space-x-2 px-4 py-2 text-xs text-stone-700 hover:bg-stone-50"
                  >
                    <Heart className="w-3.5 h-3.5 text-stone-400" />
                    <span>Wishlist ({wishlistIds.length})</span>
                  </Link>
                  <Link
                    to="/admin"
                    onClick={() => setIsUserMenuOpen(false)}
                    className="flex items-center space-x-2 px-4 py-2 text-xs font-semibold text-amber-800 bg-amber-50/60"
                  >
                    <Shield className="w-3.5 h-3.5 text-[#D4AF37]" />
                    <span>Admin Portal</span>
                  </Link>
                  <button
                    onClick={() => { logout(); setIsUserMenuOpen(false); }}
                    className="w-full text-left flex items-center space-x-2 px-4 py-2 text-xs text-red-600 hover:bg-red-50"
                  >
                    <LogOut className="w-3.5 h-3.5" />
                    <span>Sign Out</span>
                  </button>
                </div>
              )}
            </div>

            {/* Wishlist Icon */}
            <Link
              to="/dashboard?tab=wishlist"
              className="relative p-2 rounded-full text-stone-300 hover:text-white transition"
              title="Wishlist"
            >
              <Heart className="w-5 h-5" />
              {wishlistIds.length > 0 && (
                <span className="absolute top-1 right-1 w-4 h-4 rounded-full bg-[#D4AF37] text-black font-bold text-[10px] flex items-center justify-center font-mono">
                  {wishlistIds.length}
                </span>
              )}
            </Link>

            {/* Cart Trigger */}
            <button
              onClick={() => setIsCartDrawerOpen(true)}
              className="relative flex items-center space-x-2 py-1.5 px-3 rounded-full bg-[#D4AF37] text-black hover:bg-[#c5a059] transition shadow-sm font-semibold"
            >
              <ShoppingBag className="w-4 h-4" />
              <span className="hidden sm:inline text-xs font-bold uppercase tracking-wider">Bag</span>
              <span className="bg-black text-[#D4AF37] text-[10px] font-bold px-1.5 py-0.2 rounded-full font-mono">
                {totalItemsCount}
              </span>
            </button>
          </div>
        </div>

        {/* Mobile Search */}
        <div className="p-3 md:hidden border-t border-stone-800 bg-[#121212]">
          <form onSubmit={handleSearchSubmit} className="relative flex items-center">
            <input
              type="text"
              placeholder="Search watches & bags..."
              value={searchQuery}
              onChange={e => setSearchQuery(e.target.value)}
              className="w-full bg-[#FAFAF8] text-stone-900 placeholder-stone-400 pl-10 pr-20 py-2 rounded-full text-xs font-medium focus:outline-none"
            />
            <Search className="w-4 h-4 text-stone-400 absolute left-3.5 pointer-events-none" />
            <button
              type="submit"
              className="absolute right-1 px-3 py-1 rounded-full bg-[#0F0F0F] text-[#D4AF37] text-[10px] font-bold uppercase tracking-wider"
            >
              Go
            </button>
          </form>
        </div>
      </header>

      <AuthModal isOpen={isAuthModalOpen} onClose={() => setIsAuthModalOpen(false)} />
    </>
  );
};
