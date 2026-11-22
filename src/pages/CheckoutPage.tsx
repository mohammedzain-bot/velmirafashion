import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import {
  ShieldCheck,
  Truck,
  MessageCircle,
  ArrowLeft,
  CheckCircle2,
  Clock,
  ChevronDown,
  ChevronUp,
  ShoppingBag
} from 'lucide-react';
import { useCart } from '../context/CartContext';
import { useCurrency } from '../context/CurrencyContext';
import { OFFICIAL_WHATSAPP_NUMBER, WHATSAPP_RAW_NUMBER } from '../utils/whatsapp';

const INDIAN_STATES = [
  'Maharashtra',
  'Delhi',
  'Karnataka',
  'Tamil Nadu',
  'Gujarat',
  'Telangana',
  'Kerala',
  'Uttar Pradesh',
  'West Bengal',
  'Rajasthan',
  'Punjab',
  'Haryana',
  'Madhya Pradesh',
  'Bihar',
  'Andhra Pradesh',
  'Goa',
  'Odisha',
  'Assam',
  'Jammu & Kashmir',
  'Chandigarh'
];

const UAE_EMIRATES = [
  'Dubai',
  'Abu Dhabi',
  'Sharjah',
  'Ajman',
  'Ras Al Khaimah',
  'Fujairah',
  'Umm Al Quwain'
];

export const CheckoutPage: React.FC = () => {
  const { cart, finalTotal, clearCart } = useCart();
  const { formatPrice, currency, country, setRegion } = useCurrency();

  // Mobile order summary accordion state
  const [isSummaryExpanded, setIsSummaryExpanded] = useState(false);

  // Clean empty shipping state (NO mock/demo addresses)
  const [fullName, setFullName] = useState('');
  const [phone, setPhone] = useState('');
  const [addressLine, setAddressLine] = useState('');
  const [landmark, setLandmark] = useState('');
  const [city, setCity] = useState('');
  const [stateOrEmirate, setStateOrEmirate] = useState(country === 'UAE' ? 'Dubai' : 'Maharashtra');
  const [pincode, setPincode] = useState('');
  const [notes, setNotes] = useState('');

  // Submission / confirmation state
  const [isSubmitted, setIsSubmitted] = useState(false);
  const [orderRef, setOrderRef] = useState('');
  const [errorMessage, setErrorMessage] = useState('');

  // Handle region switch directly on checkout
  const handleCountryToggle = (newCountry: 'India' | 'UAE') => {
    setRegion(newCountry);
    setStateOrEmirate(newCountry === 'UAE' ? 'Dubai' : 'Maharashtra');
  };

  // If bag is empty and not yet submitted
  if (cart.length === 0 && !isSubmitted) {
    return (
      <div className="min-h-[70vh] bg-[#FDFDFD] flex flex-col items-center justify-center p-6 text-center">
        <div className="w-14 h-14 rounded-full bg-stone-100 flex items-center justify-center text-stone-400 mb-4">
          <Clock className="w-6 h-6" />
        </div>
        <h2 className="font-cinzel text-xl sm:text-2xl font-bold text-stone-900">
          Your Shopping Bag is Empty
        </h2>
        <p className="text-xs text-stone-500 mt-2 max-w-sm">
          Please select an authentic timepiece or designer bag to submit your order inquiry.
        </p>
        <Link
          to="/products"
          className="mt-6 px-7 py-3 rounded-full bg-[#0F0F0F] text-[#D4AF37] hover:bg-stone-800 font-cinzel text-xs font-bold tracking-widest uppercase transition"
        >
          Explore Collections
        </Link>
      </div>
    );
  }

  // Handle inquiry submission
  const handleSubmitInquiry = (e: React.FormEvent) => {
    e.preventDefault();
    setErrorMessage('');

    // Validation
    if (!fullName.trim()) {
      setErrorMessage('Please enter your full name.');
      return;
    }
    if (!phone.trim() || phone.trim().length < 7) {
      setErrorMessage('Please enter a valid WhatsApp mobile number.');
      return;
    }
    if (!addressLine.trim()) {
      setErrorMessage('Please enter your complete delivery address.');
      return;
    }
    if (country === 'India') {
      if (!city.trim()) {
        setErrorMessage('Please enter your city.');
        return;
      }
      if (!pincode.trim() || pincode.trim().length !== 6) {
        setErrorMessage('Please enter a valid 6-digit Indian PIN code.');
        return;
      }
    }

    // Generate clean inquiry reference ID
    const refId = `VEL-${Math.floor(100000 + Math.random() * 900000)}`;
    setOrderRef(refId);

    // Format luxury WhatsApp message
    const lines: string[] = [
      '👑 *VELMIRA ATELIER — ORDER ENQUIRY*',
      '━━━━━━━━━━━━━━━━━━━━━━━━━━━━',
      `*Reference:* ${refId}`,
      `*Date:* ${new Date().toLocaleDateString('en-GB')}`,
      `*Destination:* ${country === 'UAE' ? '🇦🇪 United Arab Emirates' : '🇮🇳 India'}`,
      '',
      '👤 *PATRON DETAILS:*',
      `• *Name:* ${fullName.trim()}`,
      `• *WhatsApp:* ${phone.trim()}`,
      '',
      '📍 *SHIPPING ADDRESS:*',
      `• *Address:* ${addressLine.trim()}`
    ];

    if (landmark.trim()) {
      lines.push(`• *Landmark:* ${landmark.trim()}`);
    }

    if (country === 'India') {
      lines.push(`• *City:* ${city.trim()}`);
      lines.push(`• *State:* ${stateOrEmirate}`);
      lines.push(`• *PIN Code:* ${pincode.trim()}`);
    } else {
      lines.push(`• *Emirate:* ${stateOrEmirate}`);
      if (city.trim()) lines.push(`• *Area / Makani:* ${city.trim()}`);
    }

    lines.push('');
    lines.push('📦 *SELECTED PIECES:*');
    cart.forEach((item, idx) => {
      lines.push(`${idx + 1}. *${item.name}*`);
      lines.push(`   • Atelier: ${item.brand}`);
      lines.push(`   • Spec: ${item.size} | Color: ${item.color}`);
      lines.push(`   • Qty: ${item.quantity} × ${formatPrice(item.price, item.priceAED)}`);
    });

    lines.push('');
    lines.push(`💰 *TOTAL AMOUNT:* *${formatPrice(finalTotal)}*`);
    lines.push('🚚 *Delivery:* Complimentary Insured White-Glove Dispatch');

    if (notes.trim()) {
      lines.push('');
      lines.push(`📝 *Special Instructions:* ${notes.trim()}`);
    }

    lines.push('━━━━━━━━━━━━━━━━━━━━━━━━━━━━');
    lines.push('Please confirm availability and dispatch schedule. Thank you.');

    const encodedMsg = encodeURIComponent(lines.join('\n'));
    const whatsappUrl = `https://wa.me/${WHATSAPP_RAW_NUMBER}?text=${encodedMsg}`;

    // Open WhatsApp in new tab
    window.open(whatsappUrl, '_blank');

    // Clear cart and show classy confirmation view
    clearCart();
    setIsSubmitted(true);
  };

  // Classy Confirmation Screen
  if (isSubmitted) {
    return (
      <div className="min-h-[75vh] bg-[#FDFDFD] flex items-center justify-center p-4 sm:p-8">
        <div className="max-w-md w-full bg-white border border-stone-200 rounded-3xl p-6 sm:p-10 text-center shadow-xl">
          <div className="w-14 h-14 sm:w-16 sm:h-16 rounded-full bg-stone-900 text-[#D4AF37] flex items-center justify-center mx-auto mb-5 shadow-md">
            <CheckCircle2 className="w-7 h-7 sm:w-8 sm:h-8" />
          </div>

          <span className="text-[10px] font-bold uppercase tracking-[0.3em] text-[#D4AF37] font-cinzel">
            ENQUIRY SUBMITTED
          </span>
          <h2 className="font-cinzel text-xl sm:text-2xl font-bold text-stone-900 tracking-wide mt-1">
            Thank You, {fullName.split(' ')[0]}
          </h2>
          <p className="text-xs text-stone-500 mt-1.5 font-mono">
            Reference ID: <strong className="text-stone-900 font-bold">{orderRef}</strong>
          </p>

          <div className="my-5 p-4 rounded-2xl bg-[#FAFAF8] border border-stone-200/80 text-left text-xs space-y-2 text-stone-600">
            <p className="text-stone-800 font-medium">
              Your inquiry has been transferred directly to our dispatch desk in {country === 'UAE' ? 'the UAE' : 'India'}.
            </p>
            <p className="text-[11px] text-stone-500">
              Our concierge at <strong>{OFFICIAL_WHATSAPP_NUMBER}</strong> is reviewing your order details and will confirm dispatch tracking on WhatsApp shortly.
            </p>
          </div>

          <div className="space-y-2.5">
            <a
              href={`https://wa.me/${WHATSAPP_RAW_NUMBER}?text=${encodeURIComponent(`Hello Velmira Concierge, I am following up on my Order Enquiry Reference ${orderRef}.`)}`}
              target="_blank"
              rel="noreferrer"
              className="w-full py-3.5 px-6 rounded-full bg-emerald-600 hover:bg-emerald-700 text-white font-bold text-xs uppercase tracking-wider transition flex items-center justify-center space-x-2 shadow-sm"
            >
              <MessageCircle className="w-4 h-4 fill-white" />
              <span>Chat on WhatsApp ({OFFICIAL_WHATSAPP_NUMBER})</span>
            </a>

            <Link
              to="/"
              className="block w-full py-2.5 px-6 rounded-full border border-stone-300 hover:border-black text-stone-700 text-xs font-semibold uppercase tracking-wider transition text-center"
            >
              Return to Boutique
            </Link>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-[#FDFDFD] py-4 sm:py-8 lg:py-12">
      <div className="max-w-6xl mx-auto px-3 sm:px-6 lg:px-8">
        {/* Top Minimal Navigation Bar */}
        <div className="flex items-center justify-between mb-4 sm:mb-8 pb-3 sm:pb-4 border-b border-stone-200/80">
          <Link
            to="/products"
            className="inline-flex items-center space-x-1.5 text-xs text-stone-600 hover:text-black font-medium transition py-1"
          >
            <ArrowLeft className="w-4 h-4 text-stone-500" />
            <span>Back to Boutique</span>
          </Link>

          <div className="text-right">
            <span className="font-cinzel text-xs sm:text-sm font-bold tracking-widest text-[#D4AF37] block">
              VELMIRA
            </span>
            <span className="text-[9px] sm:text-[10px] text-stone-400 uppercase tracking-wider">
              Order & Shipping Enquiry
            </span>
          </div>
        </div>

        {/* MOBILE-ONLY: Collapsible Clean Order Summary Header */}
        <div className="lg:hidden mb-5 bg-white border border-stone-200/90 rounded-2xl overflow-hidden shadow-xs">
          <button
            type="button"
            onClick={() => setIsSummaryExpanded(!isSummaryExpanded)}
            className="w-full px-4 py-3.5 flex items-center justify-between text-xs font-medium bg-[#FAFAF8] text-stone-800 transition hover:bg-stone-100"
          >
            <div className="flex items-center space-x-2">
              <ShoppingBag className="w-4 h-4 text-[#D4AF37]" />
              <span className="font-semibold text-stone-900">
                Order Summary ({cart.length} {cart.length === 1 ? 'piece' : 'pieces'})
              </span>
              <span className="text-stone-400 text-[11px]">
                {isSummaryExpanded ? 'Hide' : 'View'}
              </span>
            </div>

            <div className="flex items-center space-x-1.5">
              <span className="font-mono font-bold text-stone-900 text-sm">
                {formatPrice(finalTotal)}
              </span>
              {isSummaryExpanded ? (
                <ChevronUp className="w-4 h-4 text-stone-500" />
              ) : (
                <ChevronDown className="w-4 h-4 text-stone-500" />
              )}
            </div>
          </button>

          {isSummaryExpanded && (
            <div className="p-4 border-t border-stone-200 bg-white space-y-3 animate-fade-in">
              <div className="divide-y divide-stone-100 max-h-60 overflow-y-auto pr-1 space-y-2.5">
                {cart.map(item => (
                  <div key={item.id} className="pt-2.5 first:pt-0 flex items-center space-x-3">
                    <img
                      src={item.image}
                      alt={item.name}
                      className="w-12 h-14 object-cover rounded-lg border border-stone-200 shrink-0"
                    />
                    <div className="flex-1 min-w-0">
                      <p className="text-[9px] text-[#D4AF37] uppercase font-bold tracking-wider font-cinzel">
                        {item.brand}
                      </p>
                      <h4 className="text-xs font-semibold text-stone-900 truncate">
                        {item.name}
                      </h4>
                      <p className="text-[10px] text-stone-500">
                        {item.size} • {item.color} • Qty: {item.quantity}
                      </p>
                    </div>
                    <span className="text-xs font-bold font-mono text-stone-900 shrink-0">
                      {formatPrice(item.price * item.quantity, (item.priceAED || 0) * item.quantity)}
                    </span>
                  </div>
                ))}
              </div>

              <div className="pt-3 border-t border-stone-100 flex items-center justify-between text-xs text-stone-600">
                <span className="flex items-center space-x-1 text-emerald-700 font-medium">
                  <Truck className="w-3.5 h-3.5" />
                  <span>White-Glove Insured Delivery</span>
                </span>
                <span className="text-emerald-700 font-bold uppercase text-[10px]">Complimentary</span>
              </div>
            </div>
          )}
        </div>

        {/* 2-Column Responsive Layout */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 lg:gap-10">
          {/* LEFT COLUMN: Shipping Details Form */}
          <div className="lg:col-span-7">
            <div className="bg-white border border-stone-200/90 rounded-2xl p-4 sm:p-7 lg:p-8 shadow-xs">
              {/* Header with Title and Segment Control */}
              <div className="mb-5 pb-4 border-b border-stone-100">
                <div className="flex items-center justify-between mb-3">
                  <div>
                    <h3 className="font-cinzel text-base sm:text-lg font-bold text-stone-900 tracking-wide">
                      Shipping Information
                    </h3>
                    <p className="text-[11px] sm:text-xs text-stone-500 mt-0.5">
                      Enter your delivery coordinates for direct WhatsApp dispatch.
                    </p>
                  </div>
                </div>

                {/* Country Toggle - Mobile-Friendly 2-tab segment control */}
                <div className="grid grid-cols-2 gap-2 p-1 bg-stone-100 rounded-xl border border-stone-200/80">
                  <button
                    type="button"
                    onClick={() => handleCountryToggle('India')}
                    className={`py-2 px-3 rounded-lg text-xs font-bold transition flex items-center justify-center space-x-1.5 ${
                      country === 'India'
                        ? 'bg-black text-[#D4AF37] shadow-xs'
                        : 'text-stone-600 hover:text-black hover:bg-stone-200/60'
                    }`}
                  >
                    <span className="text-sm">🇮🇳</span>
                    <span>India (₹ INR)</span>
                  </button>
                  <button
                    type="button"
                    onClick={() => handleCountryToggle('UAE')}
                    className={`py-2 px-3 rounded-lg text-xs font-bold transition flex items-center justify-center space-x-1.5 ${
                      country === 'UAE'
                        ? 'bg-black text-[#D4AF37] shadow-xs'
                        : 'text-stone-600 hover:text-black hover:bg-stone-200/60'
                    }`}
                  >
                    <span className="text-sm">🇦🇪</span>
                    <span>UAE (AED)</span>
                  </button>
                </div>
              </div>

              {errorMessage && (
                <div className="mb-4 p-3 rounded-xl bg-rose-50 border border-rose-200 text-rose-700 text-xs font-medium">
                  {errorMessage}
                </div>
              )}

              <form onSubmit={handleSubmitInquiry} className="space-y-4">
                {/* Full Name & Phone - Stacks gracefully on mobile, 2 cols on tablet+ */}
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-3.5 sm:gap-4">
                  <div>
                    <label className="block text-xs font-semibold text-stone-700 uppercase tracking-wider mb-1.5">
                      Full Name <span className="text-rose-500">*</span>
                    </label>
                    <input
                      type="text"
                      required
                      autoComplete="name"
                      placeholder="e.g. Alexander Wright"
                      value={fullName}
                      onChange={e => setFullName(e.target.value)}
                      className="w-full px-3.5 py-3 rounded-xl border border-stone-300 text-sm text-stone-900 bg-white placeholder-stone-400 focus:outline-none focus:border-stone-900 focus:ring-1 focus:ring-stone-900 transition"
                    />
                  </div>

                  <div>
                    <label className="block text-xs font-semibold text-stone-700 uppercase tracking-wider mb-1.5">
                      WhatsApp Mobile Number <span className="text-rose-500">*</span>
                    </label>
                    <input
                      type="tel"
                      required
                      autoComplete="tel"
                      placeholder={country === 'UAE' ? '+971 50 123 4567' : '+91 98765 43210'}
                      value={phone}
                      onChange={e => setPhone(e.target.value)}
                      className="w-full px-3.5 py-3 rounded-xl border border-stone-300 text-sm text-stone-900 font-mono bg-white placeholder-stone-400 focus:outline-none focus:border-stone-900 focus:ring-1 focus:ring-stone-900 transition"
                    />
                  </div>
                </div>

                {/* Delivery Street Address */}
                <div>
                  <label className="block text-xs font-semibold text-stone-700 uppercase tracking-wider mb-1.5">
                    Delivery Address <span className="text-rose-500">*</span>
                  </label>
                  <input
                    type="text"
                    required
                    autoComplete="street-address"
                    placeholder={
                      country === 'UAE'
                        ? 'Apartment / Villa No., Building, Street / Community'
                        : 'House / Flat No., Apartment / Building, Street / Road'
                    }
                    value={addressLine}
                    onChange={e => setAddressLine(e.target.value)}
                    className="w-full px-3.5 py-3 rounded-xl border border-stone-300 text-sm text-stone-900 bg-white placeholder-stone-400 focus:outline-none focus:border-stone-900 focus:ring-1 focus:ring-stone-900 transition"
                  />
                </div>

                {/* Landmark / Area */}
                <div>
                  <label className="block text-xs font-semibold text-stone-700 uppercase tracking-wider mb-1.5">
                    {country === 'UAE' ? 'Area / Community / Makani (Optional)' : 'Landmark / Area (Optional)'}
                  </label>
                  <input
                    type="text"
                    placeholder={country === 'UAE' ? 'e.g. Downtown Dubai / Dubai Marina' : 'e.g. Near Grand Hotel'}
                    value={landmark}
                    onChange={e => setLandmark(e.target.value)}
                    className="w-full px-3.5 py-3 rounded-xl border border-stone-300 text-sm text-stone-900 bg-white placeholder-stone-400 focus:outline-none focus:border-stone-900 focus:ring-1 focus:ring-stone-900 transition"
                  />
                </div>

                {/* Region-Specific Fields (India: State full width, City & PIN 2-cols on mobile) */}
                {country === 'India' ? (
                  <div className="space-y-3.5">
                    <div>
                      <label className="block text-xs font-semibold text-stone-700 uppercase tracking-wider mb-1.5">
                        State <span className="text-rose-500">*</span>
                      </label>
                      <select
                        value={stateOrEmirate}
                        onChange={e => setStateOrEmirate(e.target.value)}
                        className="w-full px-3.5 py-3 rounded-xl border border-stone-300 text-sm text-stone-900 bg-white focus:outline-none focus:border-stone-900 focus:ring-1 focus:ring-stone-900 transition"
                      >
                        {INDIAN_STATES.map(st => (
                          <option key={st} value={st}>{st}</option>
                        ))}
                      </select>
                    </div>

                    <div className="grid grid-cols-2 gap-3">
                      <div>
                        <label className="block text-xs font-semibold text-stone-700 uppercase tracking-wider mb-1.5">
                          City <span className="text-rose-500">*</span>
                        </label>
                        <input
                          type="text"
                          required
                          placeholder="e.g. Mumbai"
                          value={city}
                          onChange={e => setCity(e.target.value)}
                          className="w-full px-3.5 py-3 rounded-xl border border-stone-300 text-sm text-stone-900 bg-white placeholder-stone-400 focus:outline-none focus:border-stone-900 focus:ring-1 focus:ring-stone-900 transition"
                        />
                      </div>

                      <div>
                        <label className="block text-xs font-semibold text-stone-700 uppercase tracking-wider mb-1.5">
                          PIN Code <span className="text-rose-500">*</span>
                        </label>
                        <input
                          type="text"
                          required
                          maxLength={6}
                          placeholder="6 Digits"
                          value={pincode}
                          onChange={e => setPincode(e.target.value.replace(/\D/g, ''))}
                          className="w-full px-3.5 py-3 rounded-xl border border-stone-300 text-sm text-stone-900 font-mono bg-white placeholder-stone-400 focus:outline-none focus:border-stone-900 focus:ring-1 focus:ring-stone-900 transition"
                        />
                      </div>
                    </div>
                  </div>
                ) : (
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-3.5">
                    <div>
                      <label className="block text-xs font-semibold text-stone-700 uppercase tracking-wider mb-1.5">
                        Emirate <span className="text-rose-500">*</span>
                      </label>
                      <select
                        value={stateOrEmirate}
                        onChange={e => setStateOrEmirate(e.target.value)}
                        className="w-full px-3.5 py-3 rounded-xl border border-stone-300 text-sm text-stone-900 bg-white focus:outline-none focus:border-stone-900 focus:ring-1 focus:ring-stone-900 transition"
                      >
                        {UAE_EMIRATES.map(em => (
                          <option key={em} value={em}>{em}</option>
                        ))}
                      </select>
                    </div>

                    <div>
                      <label className="block text-xs font-semibold text-stone-700 uppercase tracking-wider mb-1.5">
                        Area / Sector
                      </label>
                      <input
                        type="text"
                        placeholder="e.g. Palm Jumeirah"
                        value={city}
                        onChange={e => setCity(e.target.value)}
                        className="w-full px-3.5 py-3 rounded-xl border border-stone-300 text-sm text-stone-900 bg-white placeholder-stone-400 focus:outline-none focus:border-stone-900 focus:ring-1 focus:ring-stone-900 transition"
                      />
                    </div>
                  </div>
                )}

                {/* Special Instructions (Optional) */}
                <div>
                  <label className="block text-xs font-semibold text-stone-700 uppercase tracking-wider mb-1.5">
                    Special Inquiries / Gift Wrapping (Optional)
                  </label>
                  <textarea
                    rows={2}
                    placeholder="e.g. Please include bespoke gift packaging / call before delivery."
                    value={notes}
                    onChange={e => setNotes(e.target.value)}
                    className="w-full px-3.5 py-2.5 rounded-xl border border-stone-300 text-sm text-stone-900 bg-white placeholder-stone-400 focus:outline-none focus:border-stone-900 focus:ring-1 focus:ring-stone-900 transition"
                  />
                </div>

                {/* Primary Action Button */}
                <div className="pt-2 sm:pt-4">
                  <button
                    type="submit"
                    className="w-full py-4 px-6 rounded-2xl bg-[#0F0F0F] text-[#D4AF37] hover:bg-stone-900 font-cinzel text-xs sm:text-sm font-bold tracking-widest uppercase transition flex items-center justify-center space-x-2.5 shadow-lg active:scale-[0.99]"
                  >
                    <MessageCircle className="w-4 h-4 sm:w-5 sm:h-5 fill-emerald-500 text-emerald-500 shrink-0" />
                    <span>Send Order Enquiry on WhatsApp</span>
                  </button>
                  <p className="text-[11px] text-center text-stone-500 mt-2.5">
                    Orders are verified directly with our concierge desk at <strong className="text-stone-800">{OFFICIAL_WHATSAPP_NUMBER}</strong>.
                  </p>
                </div>
              </form>
            </div>
          </div>

          {/* RIGHT COLUMN: Desktop Sticky Order Summary Card (Hidden on mobile, since mobile has the top accordion) */}
          <div className="hidden lg:block lg:col-span-5">
            <div className="bg-white border border-stone-200/90 rounded-2xl p-6 shadow-xs sticky top-20">
              <h3 className="font-cinzel text-sm font-bold uppercase tracking-wider text-stone-900 mb-4 pb-3 border-b border-stone-100 flex items-center justify-between">
                <span>Selected Pieces</span>
                <span className="text-xs font-mono font-normal text-stone-500">
                  {cart.length} {cart.length === 1 ? 'item' : 'items'}
                </span>
              </h3>

              {/* Items List */}
              <div className="divide-y divide-stone-100 max-h-72 overflow-y-auto pr-1 space-y-3">
                {cart.map(item => (
                  <div key={item.id} className="pt-3 first:pt-0 flex items-center space-x-3">
                    <img
                      src={item.image}
                      alt={item.name}
                      className="w-14 h-16 object-cover rounded-lg border border-stone-200 shrink-0"
                    />
                    <div className="flex-1 min-w-0">
                      <p className="text-[10px] text-[#D4AF37] uppercase font-bold tracking-wider font-cinzel">
                        {item.brand}
                      </p>
                      <h4 className="text-xs font-semibold text-stone-900 truncate">
                        {item.name}
                      </h4>
                      <p className="text-[11px] text-stone-500">
                        {item.size} • {item.color} • Qty: {item.quantity}
                      </p>
                    </div>
                    <span className="text-xs font-bold font-mono text-stone-900 shrink-0">
                      {formatPrice(item.price * item.quantity, (item.priceAED || 0) * item.quantity)}
                    </span>
                  </div>
                ))}
              </div>

              {/* Cost Breakdown */}
              <div className="mt-6 pt-4 border-t border-stone-200 space-y-2 text-xs">
                <div className="flex justify-between text-stone-600">
                  <span>Subtotal</span>
                  <span className="font-mono">{formatPrice(finalTotal)}</span>
                </div>
                <div className="flex justify-between text-emerald-700 font-medium">
                  <span className="flex items-center space-x-1">
                    <Truck className="w-3.5 h-3.5" />
                    <span>White-Glove Insured Cargo</span>
                  </span>
                  <span className="font-semibold uppercase tracking-wider text-[11px]">Complimentary</span>
                </div>
                <div className="pt-3 border-t border-stone-200 flex justify-between items-baseline">
                  <span className="font-cinzel text-sm font-bold text-stone-900 uppercase tracking-wide">
                    Total
                  </span>
                  <span className="font-mono text-lg font-bold text-stone-900">
                    {formatPrice(finalTotal)}
                  </span>
                </div>
              </div>

              {/* Trust Pillars */}
              <div className="mt-6 pt-4 border-t border-stone-100 space-y-2 text-[11px] text-stone-500">
                <div className="flex items-center space-x-2">
                  <ShieldCheck className="w-4 h-4 text-[#D4AF37] shrink-0" />
                  <span>100% Certified Authentic Swiss Horology & Leather</span>
                </div>
                <div className="flex items-center space-x-2">
                  <MessageCircle className="w-4 h-4 text-emerald-600 shrink-0" />
                  <span>Direct Concierge Verification on WhatsApp</span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
