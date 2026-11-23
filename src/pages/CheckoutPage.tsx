import React, { useState, useRef } from 'react';
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
  ShoppingBag,
  Plus
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
  const [showOptionalFields, setShowOptionalFields] = useState(false);

  // Form submission ref for mobile sticky bar trigger
  const formRef = useRef<HTMLFormElement>(null);

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
  const handleSubmitInquiry = (e?: React.FormEvent) => {
    if (e) e.preventDefault();
    setErrorMessage('');

    // Validation
    if (!fullName.trim()) {
      setErrorMessage('Please enter your full name.');
      window.scrollTo({ top: 0, behavior: 'smooth' });
      return;
    }
    if (!phone.trim() || phone.trim().length < 7) {
      setErrorMessage('Please enter a valid WhatsApp mobile number.');
      window.scrollTo({ top: 0, behavior: 'smooth' });
      return;
    }
    if (!addressLine.trim()) {
      setErrorMessage('Please enter your complete delivery address.');
      window.scrollTo({ top: 100, behavior: 'smooth' });
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

  const primaryItem = cart[0];

  return (
    <div className="min-h-screen bg-[#FDFDFD] pb-28 sm:pb-12 pt-3 sm:pt-6">
      <div className="max-w-5xl mx-auto px-3 sm:px-6 lg:px-8">
        {/* Top Minimal Header Bar */}
        <div className="flex items-center justify-between mb-4 pb-3 border-b border-stone-200/80">
          <Link
            to="/products"
            className="inline-flex items-center space-x-1 text-xs text-stone-500 hover:text-black font-medium transition py-1"
          >
            <ArrowLeft className="w-4 h-4" />
            <span className="hidden xs:inline">Back to Boutique</span>
          </Link>

          <div className="text-center">
            <span className="font-cinzel text-sm sm:text-base font-bold tracking-widest text-[#D4AF37]">
              VELMIRA
            </span>
            <span className="text-[9px] text-stone-400 block tracking-wider uppercase">
              Shipping & Order Enquiry
            </span>
          </div>

          {/* Compact Country Selector Pill */}
          <div className="inline-flex rounded-full bg-stone-100 p-0.5 border border-stone-200">
            <button
              type="button"
              onClick={() => handleCountryToggle('India')}
              className={`px-2.5 py-1 rounded-full text-[11px] font-bold transition flex items-center space-x-1 ${
                country === 'India'
                  ? 'bg-black text-[#D4AF37] shadow-xs'
                  : 'text-stone-500 hover:text-black'
              }`}
            >
              <span>🇮🇳</span>
              <span>₹</span>
            </button>
            <button
              type="button"
              onClick={() => handleCountryToggle('UAE')}
              className={`px-2.5 py-1 rounded-full text-[11px] font-bold transition flex items-center space-x-1 ${
                country === 'UAE'
                  ? 'bg-black text-[#D4AF37] shadow-xs'
                  : 'text-stone-500 hover:text-black'
              }`}
            >
              <span>🇦🇪</span>
              <span>AED</span>
            </button>
          </div>
        </div>

        {/* Compact Item Glance Preview Card (Visible on mobile & tablet) */}
        <div className="lg:hidden mb-4 bg-white border border-stone-200/90 rounded-2xl p-3 shadow-xs">
          <div className="flex items-center justify-between">
            <div className="flex items-center space-x-3 min-w-0">
              {primaryItem && (
                <img
                  src={primaryItem.image}
                  alt={primaryItem.name}
                  className="w-11 h-13 object-cover rounded-lg border border-stone-200 shrink-0"
                />
              )}
              <div className="min-w-0">
                <p className="text-[9px] font-bold text-[#D4AF37] uppercase tracking-wider font-cinzel truncate">
                  {primaryItem?.brand}
                </p>
                <h4 className="text-xs font-semibold text-stone-900 truncate">
                  {primaryItem?.name} {cart.length > 1 && `+ ${cart.length - 1} more`}
                </h4>
                <p className="text-[10px] text-stone-500">
                  {primaryItem?.size} • {primaryItem?.color} • Free Delivery
                </p>
              </div>
            </div>

            <button
              type="button"
              onClick={() => setIsSummaryExpanded(!isSummaryExpanded)}
              className="ml-2 px-2.5 py-1.5 rounded-xl bg-stone-50 border border-stone-200 text-stone-800 text-[11px] font-mono font-bold flex items-center space-x-1 shrink-0"
            >
              <span>{formatPrice(finalTotal)}</span>
              {isSummaryExpanded ? <ChevronUp className="w-3.5 h-3.5" /> : <ChevronDown className="w-3.5 h-3.5" />}
            </button>
          </div>

          {/* Expanded Item Breakdown */}
          {isSummaryExpanded && (
            <div className="mt-3 pt-3 border-t border-stone-100 space-y-2 text-xs animate-fade-in">
              <div className="divide-y divide-stone-100 max-h-48 overflow-y-auto pr-1">
                {cart.map(item => (
                  <div key={item.id} className="py-2 first:pt-0 flex items-center justify-between text-xs">
                    <span className="text-stone-700 truncate max-w-[200px]">{item.name} × {item.quantity}</span>
                    <span className="font-mono font-semibold text-stone-900">{formatPrice(item.price * item.quantity, (item.priceAED || 0) * item.quantity)}</span>
                  </div>
                ))}
              </div>
              <div className="pt-2 border-t border-stone-100 flex justify-between text-[11px] text-emerald-700 font-medium">
                <span>Insured White-Glove Dispatch</span>
                <span className="font-bold uppercase">Complimentary</span>
              </div>
            </div>
          )}
        </div>

        {/* Responsive Grid Layout */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 lg:gap-10">
          {/* LEFT: Streamlined Mobile-Friendly Shipping Form */}
          <div className="lg:col-span-7 space-y-4">
            <form ref={formRef} onSubmit={handleSubmitInquiry} className="space-y-4">
              {errorMessage && (
                <div className="p-3 rounded-xl bg-rose-50 border border-rose-200 text-rose-700 text-xs font-medium">
                  {errorMessage}
                </div>
              )}

              {/* CARD 1: Patron Contact */}
              <div className="bg-white border border-stone-200/90 rounded-2xl p-4 sm:p-6 shadow-xs space-y-3">
                <div className="flex items-center justify-between">
                  <h4 className="font-cinzel text-xs font-bold uppercase tracking-wider text-stone-900">
                    1. Contact Information
                  </h4>
                  <span className="text-[10px] text-stone-400">Direct WhatsApp</span>
                </div>

                <div className="rounded-xl border border-stone-200 overflow-hidden divide-y divide-stone-200 bg-stone-50/50">
                  <div className="p-2.5 sm:p-3 bg-white">
                    <label className="block text-[10px] font-bold uppercase tracking-wider text-stone-500 mb-0.5">
                      Full Name <span className="text-rose-500">*</span>
                    </label>
                    <input
                      type="text"
                      required
                      autoComplete="name"
                      placeholder="e.g. Alexander Wright"
                      value={fullName}
                      onChange={e => setFullName(e.target.value)}
                      className="w-full bg-transparent text-xs sm:text-sm text-stone-900 placeholder-stone-400 focus:outline-none"
                    />
                  </div>

                  <div className="p-2.5 sm:p-3 bg-white">
                    <label className="block text-[10px] font-bold uppercase tracking-wider text-stone-500 mb-0.5">
                      WhatsApp Mobile Number <span className="text-rose-500">*</span>
                    </label>
                    <div className="flex items-center space-x-2">
                      <span className="text-xs font-mono font-bold text-stone-500 shrink-0">
                        {country === 'UAE' ? '🇦🇪 +971' : '🇮🇳 +91'}
                      </span>
                      <input
                        type="tel"
                        required
                        autoComplete="tel"
                        placeholder={country === 'UAE' ? '50 123 4567' : '98765 43210'}
                        value={phone}
                        onChange={e => setPhone(e.target.value)}
                        className="w-full bg-transparent text-xs sm:text-sm text-stone-900 font-mono placeholder-stone-400 focus:outline-none"
                      />
                    </div>
                  </div>
                </div>
              </div>

              {/* CARD 2: Shipping Destination */}
              <div className="bg-white border border-stone-200/90 rounded-2xl p-4 sm:p-6 shadow-xs space-y-3">
                <div className="flex items-center justify-between">
                  <h4 className="font-cinzel text-xs font-bold uppercase tracking-wider text-stone-900">
                    2. Shipping Address
                  </h4>
                  <span className="text-[10px] text-[#D4AF37] font-semibold">
                    {country === 'UAE' ? 'United Arab Emirates' : 'India'}
                  </span>
                </div>

                <div className="rounded-xl border border-stone-200 overflow-hidden divide-y divide-stone-200 bg-stone-50/50">
                  {/* Street Address */}
                  <div className="p-2.5 sm:p-3 bg-white">
                    <label className="block text-[10px] font-bold uppercase tracking-wider text-stone-500 mb-0.5">
                      Delivery Address <span className="text-rose-500">*</span>
                    </label>
                    <input
                      type="text"
                      required
                      autoComplete="street-address"
                      placeholder={
                        country === 'UAE'
                          ? 'Villa / Apt No., Building, Street / Community'
                          : 'Flat / House No., Building Name, Street / Road'
                      }
                      value={addressLine}
                      onChange={e => setAddressLine(e.target.value)}
                      className="w-full bg-transparent text-xs sm:text-sm text-stone-900 placeholder-stone-400 focus:outline-none"
                    />
                  </div>

                  {/* Region Specific Rows */}
                  {country === 'India' ? (
                    <>
                      {/* State Dropdown */}
                      <div className="p-2.5 sm:p-3 bg-white">
                        <label className="block text-[10px] font-bold uppercase tracking-wider text-stone-500 mb-0.5">
                          State <span className="text-rose-500">*</span>
                        </label>
                        <select
                          value={stateOrEmirate}
                          onChange={e => setStateOrEmirate(e.target.value)}
                          className="w-full bg-transparent text-xs sm:text-sm text-stone-900 focus:outline-none cursor-pointer"
                        >
                          {INDIAN_STATES.map(st => (
                            <option key={st} value={st}>{st}</option>
                          ))}
                        </select>
                      </div>

                      {/* City & PIN Code (Side by Side in 1 row) */}
                      <div className="grid grid-cols-2 divide-x divide-stone-200 bg-white">
                        <div className="p-2.5 sm:p-3">
                          <label className="block text-[10px] font-bold uppercase tracking-wider text-stone-500 mb-0.5">
                            City <span className="text-rose-500">*</span>
                          </label>
                          <input
                            type="text"
                            required
                            placeholder="e.g. Mumbai"
                            value={city}
                            onChange={e => setCity(e.target.value)}
                            className="w-full bg-transparent text-xs sm:text-sm text-stone-900 placeholder-stone-400 focus:outline-none"
                          />
                        </div>

                        <div className="p-2.5 sm:p-3">
                          <label className="block text-[10px] font-bold uppercase tracking-wider text-stone-500 mb-0.5">
                            PIN Code <span className="text-rose-500">*</span>
                          </label>
                          <input
                            type="text"
                            required
                            maxLength={6}
                            placeholder="6 Digits"
                            value={pincode}
                            onChange={e => setPincode(e.target.value.replace(/\D/g, ''))}
                            className="w-full bg-transparent text-xs sm:text-sm text-stone-900 font-mono placeholder-stone-400 focus:outline-none"
                          />
                        </div>
                      </div>
                    </>
                  ) : (
                    /* UAE Fields: Emirate & Area */
                    <div className="grid grid-cols-2 divide-x divide-stone-200 bg-white">
                      <div className="p-2.5 sm:p-3">
                        <label className="block text-[10px] font-bold uppercase tracking-wider text-stone-500 mb-0.5">
                          Emirate <span className="text-rose-500">*</span>
                        </label>
                        <select
                          value={stateOrEmirate}
                          onChange={e => setStateOrEmirate(e.target.value)}
                          className="w-full bg-transparent text-xs sm:text-sm text-stone-900 focus:outline-none cursor-pointer"
                        >
                          {UAE_EMIRATES.map(em => (
                            <option key={em} value={em}>{em}</option>
                          ))}
                        </select>
                      </div>

                      <div className="p-2.5 sm:p-3">
                        <label className="block text-[10px] font-bold uppercase tracking-wider text-stone-500 mb-0.5">
                          Area / Makani
                        </label>
                        <input
                          type="text"
                          placeholder="e.g. Downtown"
                          value={city}
                          onChange={e => setCity(e.target.value)}
                          className="w-full bg-transparent text-xs sm:text-sm text-stone-900 placeholder-stone-400 focus:outline-none"
                        />
                      </div>
                    </div>
                  )}
                </div>

                {/* Optional Landmark & Notes Toggle */}
                {!showOptionalFields ? (
                  <button
                    type="button"
                    onClick={() => setShowOptionalFields(true)}
                    className="text-[11px] font-medium text-[#C5A059] hover:text-stone-900 flex items-center space-x-1 pt-1"
                  >
                    <Plus className="w-3 h-3" />
                    <span>Add Landmark or Gift Instructions (Optional)</span>
                  </button>
                ) : (
                  <div className="pt-2 space-y-2.5 animate-fade-in">
                    <div>
                      <label className="block text-[10px] font-bold uppercase tracking-wider text-stone-500 mb-1">
                        Landmark (Optional)
                      </label>
                      <input
                        type="text"
                        placeholder="e.g. Opposite City Mall"
                        value={landmark}
                        onChange={e => setLandmark(e.target.value)}
                        className="w-full px-3 py-2 rounded-xl border border-stone-200 text-xs text-stone-900 focus:outline-none focus:border-stone-800"
                      />
                    </div>
                    <div>
                      <label className="block text-[10px] font-bold uppercase tracking-wider text-stone-500 mb-1">
                        Special Instructions (Optional)
                      </label>
                      <input
                        type="text"
                        placeholder="e.g. Bespoke gift wrap / call before arrival"
                        value={notes}
                        onChange={e => setNotes(e.target.value)}
                        className="w-full px-3 py-2 rounded-xl border border-stone-200 text-xs text-stone-900 focus:outline-none focus:border-stone-800"
                      />
                    </div>
                  </div>
                )}
              </div>

              {/* Desktop-Only Submit Button (Inside Form) */}
              <div className="hidden sm:block pt-2">
                <button
                  type="submit"
                  className="w-full py-4 px-6 rounded-2xl bg-[#0F0F0F] text-[#D4AF37] hover:bg-stone-900 font-cinzel text-xs sm:text-sm font-bold tracking-widest uppercase transition flex items-center justify-center space-x-2.5 shadow-lg active:scale-[0.99]"
                >
                  <MessageCircle className="w-4 h-4 fill-emerald-500 text-emerald-500 shrink-0" />
                  <span>Send Order Enquiry on WhatsApp • {formatPrice(finalTotal)}</span>
                </button>
                <p className="text-[11px] text-center text-stone-500 mt-2">
                  Orders are verified directly with our concierge desk at <strong className="text-stone-800">{OFFICIAL_WHATSAPP_NUMBER}</strong>.
                </p>
              </div>
            </form>
          </div>

          {/* RIGHT: Desktop Sticky Order Summary Column (Hidden on mobile) */}
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

      {/* MOBILE-ONLY: Sleek Sticky Bottom Action Bar */}
      <div className="fixed bottom-0 inset-x-0 bg-white/95 backdrop-blur-md border-t border-stone-200/90 p-3 sm:hidden z-30 shadow-[0_-4px_20px_rgba(0,0,0,0.06)]">
        <div className="flex items-center justify-between gap-3">
          <div className="shrink-0 pl-1">
            <span className="text-[9px] uppercase tracking-wider text-stone-500 font-semibold block leading-tight">
              Total Payable
            </span>
            <span className="font-mono text-sm font-bold text-stone-900 leading-none">
              {formatPrice(finalTotal)}
            </span>
          </div>

          <button
            type="button"
            onClick={() => handleSubmitInquiry()}
            className="flex-1 py-3 px-4 rounded-xl bg-[#0F0F0F] text-[#D4AF37] font-cinzel text-xs font-bold tracking-wider uppercase flex items-center justify-center space-x-2 shadow-md active:scale-98 transition"
          >
            <MessageCircle className="w-4 h-4 fill-emerald-500 text-emerald-500 shrink-0" />
            <span>Order on WhatsApp</span>
          </button>
        </div>
      </div>
    </div>
  );
};
