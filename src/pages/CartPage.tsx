import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import {
  Trash2,
  Plus,
  Minus,
  ShoppingBag,
  ArrowRight,
  ShieldCheck,
  Tag,
  Check,
  Sparkles,
  ChevronRight,
  MessageCircle
} from 'lucide-react';
import { useCart } from '../context/CartContext';
import { useCurrency } from '../context/CurrencyContext';
import { useAuth } from '../context/AuthContext';
import { openWhatsAppOrder, OFFICIAL_WHATSAPP_NUMBER } from '../utils/whatsapp';

export const CartPage: React.FC = () => {
  const {
    cart,
    removeFromCart,
    updateQuantity,
    updateItemSize,
    totalItemsCount,
    totalMRP,
    subtotal,
    mrpDiscount,
    deliveryFee,
    appliedCoupon,
    couponDiscount,
    finalTotal,
    freeDeliveryThreshold,
    freeDeliveryRemaining,
    applyCoupon,
    removeCoupon
  } = useCart();

  const { formatPrice, currency, country } = useCurrency();
  const { user } = useAuth();
  const navigate = useNavigate();

  const [couponCode, setCouponCode] = useState('');
  const [couponResult, setCouponResult] = useState<{ message: string; isError: boolean } | null>(null);

  const handleApplyCoupon = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!couponCode.trim()) return;
    const res = await applyCoupon(couponCode.trim());
    setCouponResult({ message: res.message, isError: !res.success });
    if (res.success) setCouponCode('');
  };

  const handleWhatsAppOrder = () => {
    const defaultAddress = user?.addresses[0] || {
      id: 'temp',
      fullName: user?.name || 'Valued Patron',
      phone: user?.phone || '',
      country: country,
      addressLine1: country === 'UAE' ? 'Dubai / Abu Dhabi, UAE' : 'Mumbai / Delhi, India',
      city: country === 'UAE' ? 'Dubai' : 'Mumbai',
      state: country === 'UAE' ? 'Dubai' : 'Maharashtra',
      pincode: country === 'UAE' ? '00000' : '400001',
      addressType: 'Home',
      isDefault: true
    };

    openWhatsAppOrder({
      customerName: user?.name || 'Valued Patron',
      customerPhone: user?.phone || 'Provided via chat',
      customerEmail: user?.email,
      shippingAddress: defaultAddress,
      items: cart.map(it => ({
        name: it.name,
        brand: it.brand,
        size: it.size,
        color: it.color,
        quantity: it.quantity,
        price: it.price,
        priceAED: it.priceAED
      })),
      subtotal,
      deliveryFee,
      couponDiscount,
      totalAmount: finalTotal,
      currency,
      paymentMethod: 'WhatsApp Direct Confirmation'
    });
  };

  const shippingPercent = Math.min(100, Math.round((subtotal / freeDeliveryThreshold) * 100));

  if (cart.length === 0) {
    return (
      <div className="min-h-screen bg-[#F8F9FA] py-16">
        <div className="max-w-2xl mx-auto px-4 text-center">
          <div className="bg-white rounded-3xl p-12 border border-stone-200 shadow-xs">
            <div className="w-20 h-20 mx-auto mb-6 rounded-full bg-stone-100 flex items-center justify-center text-stone-400">
              <ShoppingBag className="w-10 h-10" />
            </div>
            <h2 className="font-cinzel text-2xl font-bold text-stone-900">Your Shopping Bag Is Empty</h2>
            <p className="text-xs sm:text-sm text-stone-500 mt-2 max-w-md mx-auto leading-relaxed">
              Explore our luxury automatic watches and Italian Saffiano leather bags to curate your collection.
            </p>
            <Link
              to="/products"
              className="mt-8 inline-flex items-center space-x-2 px-8 py-3.5 rounded-full bg-[#0F0F0F] text-[#D4AF37] font-bold text-xs uppercase tracking-widest hover:bg-stone-800 transition shadow-md"
            >
              <span>Explore Timepieces & Bags</span>
              <ArrowRight className="w-4 h-4" />
            </Link>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-[#F8F9FA] pb-16">
      {/* Breadcrumb */}
      <div className="bg-white border-b border-stone-200 py-3">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 flex items-center space-x-2 text-xs text-stone-500">
          <Link to="/" className="hover:text-black">Home</Link>
          <ChevronRight className="w-3 h-3 text-stone-400" />
          <span className="text-stone-900 font-semibold">Shopping Bag ({totalItemsCount} items)</span>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pt-8">
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 mb-6">
          <h1 className="font-cinzel text-2xl sm:text-3xl font-bold text-stone-900">
            Your Shopping Bag
          </h1>
          <div className="flex items-center space-x-2 text-xs text-emerald-800 bg-emerald-50 border border-emerald-200 px-3 py-1.5 rounded-xl font-medium">
            <MessageCircle className="w-4 h-4 text-emerald-600" />
            <span>Orders routed to WhatsApp Concierge: <strong>{OFFICIAL_WHATSAPP_NUMBER}</strong></span>
          </div>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
          {/* LEFT: Items List (8 cols) */}
          <div className="lg:col-span-8 space-y-4">
            {/* Free shipping progress bar */}
            <div className="bg-white rounded-xl p-4 border border-stone-200 shadow-xs">
              <div className="flex items-center justify-between text-xs">
                {freeDeliveryRemaining > 0 ? (
                  <span className="text-stone-700 font-medium">
                    Add <strong className="text-stone-900 font-mono">{formatPrice(freeDeliveryRemaining)}</strong> more for <strong className="text-emerald-700">Complimentary Express Shipping</strong>
                  </span>
                ) : (
                  <span className="text-emerald-700 font-bold flex items-center">
                    <Sparkles className="w-4 h-4 mr-1 text-[#D4AF37]" /> Congratulations! You have unlocked FREE Express Delivery to {country === 'UAE' ? 'UAE' : 'India'}
                  </span>
                )}
                <span className="font-mono font-bold text-stone-500 text-[11px]">{shippingPercent}%</span>
              </div>
              <div className="w-full bg-stone-100 h-2 rounded-full mt-2.5 overflow-hidden">
                <div
                  className="bg-gradient-to-r from-amber-500 to-[#D4AF37] h-full rounded-full transition-all duration-500"
                  style={{ width: `${shippingPercent}%` }}
                />
              </div>
            </div>

            {/* Cart Items */}
            <div className="bg-white rounded-2xl border border-stone-200 divide-y divide-stone-200 shadow-xs overflow-hidden">
              {cart.map(item => (
                <div key={item.id} className="p-5 sm:p-6 flex flex-col sm:flex-row gap-5">
                  <Link to={`/products/${item.productId}`} className="shrink-0">
                    <img
                      src={item.image}
                      alt={item.name}
                      className="w-24 h-32 sm:w-28 sm:h-36 object-cover object-center rounded-xl border border-stone-200 shadow-xs"
                    />
                  </Link>

                  <div className="flex-1 flex flex-col justify-between">
                    <div>
                      <div className="flex items-start justify-between gap-2">
                        <div>
                          <span className="text-[10px] font-bold font-cinzel text-[#C5A059] uppercase tracking-wider">
                            {item.brand}
                          </span>
                          <Link to={`/products/${item.productId}`}>
                            <h3 className="text-sm sm:text-base font-semibold text-stone-900 hover:text-[#C5A059] transition">
                              {item.name}
                            </h3>
                          </Link>
                        </div>
                        <span className="text-base font-bold text-stone-900 font-mono">
                          {formatPrice(item.price * item.quantity, (item.priceAED || 0) * item.quantity)}
                        </span>
                      </div>

                      <div className="flex flex-wrap items-center gap-3 mt-3 text-xs text-stone-600">
                        <span className="bg-stone-100 px-2.5 py-1 rounded-lg text-stone-800 font-medium">
                          Spec/Size: <strong>{item.size}</strong>
                        </span>
                        <span className="bg-stone-100 px-2.5 py-1 rounded-lg text-stone-800 font-medium">
                          Shade: <strong>{item.color}</strong>
                        </span>
                      </div>
                    </div>

                    <div className="flex items-center justify-between mt-5 pt-4 border-t border-stone-100">
                      <div className="flex items-center space-x-2">
                        <span className="text-xs text-stone-500 font-medium">Quantity:</span>
                        <div className="flex items-center border border-stone-300 rounded-lg px-2 py-0.5 bg-white">
                          <button
                            onClick={() => updateQuantity(item.id, item.quantity - 1)}
                            className="p-1 text-stone-500 hover:text-black"
                          >
                            <Minus className="w-3.5 h-3.5" />
                          </button>
                          <span className="px-3 text-xs font-bold text-stone-900 font-mono">
                            {item.quantity}
                          </span>
                          <button
                            onClick={() => updateQuantity(item.id, item.quantity + 1)}
                            className="p-1 text-stone-500 hover:text-black"
                          >
                            <Plus className="w-3.5 h-3.5" />
                          </button>
                        </div>
                      </div>

                      <button
                        onClick={() => removeFromCart(item.id)}
                        className="text-xs font-medium text-stone-500 hover:text-red-600 transition flex items-center space-x-1"
                      >
                        <Trash2 className="w-3.5 h-3.5" />
                        <span>Remove</span>
                      </button>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* RIGHT: Summary & WhatsApp CTA (4 cols) */}
          <div className="lg:col-span-4 space-y-4 sticky top-32">
            {/* Promo Code Box */}
            <div className="bg-white rounded-2xl p-5 border border-stone-200 shadow-xs">
              <label className="text-xs font-bold text-stone-900 uppercase tracking-wider block mb-2 flex items-center">
                <Tag className="w-3.5 h-3.5 mr-1.5 text-[#D4AF37]" /> Apply Promo Voucher
              </label>

              {appliedCoupon ? (
                <div className="flex items-center justify-between p-3 rounded-xl bg-emerald-50 border border-emerald-200 text-xs">
                  <div>
                    <p className="font-bold text-emerald-900">{appliedCoupon.code} Applied</p>
                    <p className="text-[11px] text-emerald-700">Saved {formatPrice(couponDiscount)}</p>
                  </div>
                  <button
                    onClick={removeCoupon}
                    className="text-stone-500 hover:text-stone-800 text-xs font-semibold"
                  >
                    Remove
                  </button>
                </div>
              ) : (
                <form onSubmit={handleApplyCoupon} className="space-y-2">
                  <div className="flex gap-2">
                    <input
                      type="text"
                      placeholder="e.g. VELMIRA500"
                      value={couponCode}
                      onChange={e => setCouponCode(e.target.value.toUpperCase())}
                      className="flex-1 px-3 py-2 text-xs rounded-xl border border-stone-300 focus:outline-none focus:border-[#D4AF37] uppercase font-mono"
                    />
                    <button
                      type="submit"
                      className="px-4 py-2 bg-[#0F0F0F] text-[#D4AF37] font-bold text-xs uppercase tracking-wider rounded-xl hover:bg-stone-800 transition"
                    >
                      Apply
                    </button>
                  </div>

                  {couponResult && (
                    <p className={`text-[11px] ${couponResult.isError ? 'text-red-600' : 'text-emerald-700'}`}>
                      {couponResult.message}
                    </p>
                  )}
                </form>
              )}
            </div>

            {/* Price Details Card */}
            <div className="bg-white rounded-2xl p-6 border border-stone-200 shadow-xs space-y-4">
              <h3 className="font-cinzel text-sm font-bold text-stone-900 uppercase tracking-widest pb-3 border-b border-stone-100">
                Order Summary
              </h3>

              <div className="space-y-2.5 text-xs text-stone-600">
                <div className="flex justify-between">
                  <span>Bag Subtotal ({totalItemsCount} items)</span>
                  <span className="font-mono text-stone-900">{formatPrice(subtotal)}</span>
                </div>
                {couponDiscount > 0 && (
                  <div className="flex justify-between text-emerald-700">
                    <span>Voucher ({appliedCoupon?.code})</span>
                    <span className="font-mono">-{formatPrice(couponDiscount)}</span>
                  </div>
                )}
                <div className="flex justify-between">
                  <span>Insured Express Air Cargo</span>
                  {deliveryFee === 0 ? (
                    <span className="text-emerald-700 font-bold uppercase text-[10px]">FREE</span>
                  ) : (
                    <span className="font-mono text-stone-900">{formatPrice(deliveryFee)}</span>
                  )}
                </div>

                <div className="pt-3 border-t border-stone-200 flex justify-between items-baseline text-stone-900">
                  <span className="text-sm font-bold">Total Payable</span>
                  <span className="text-xl font-bold font-mono text-stone-900">
                    {formatPrice(finalTotal)}
                  </span>
                </div>
              </div>

              {/* DUAL CHECKOUT BUTTONS: WHATSAPP FIRST */}
              <div className="space-y-2 pt-2">
                <button
                  onClick={handleWhatsAppOrder}
                  className="w-full py-3.5 px-6 rounded-xl bg-emerald-600 hover:bg-emerald-700 text-white font-bold text-xs uppercase tracking-widest transition flex items-center justify-center space-x-2 shadow-md"
                >
                  <MessageCircle className="w-4 h-4 fill-white" />
                  <span>Send Order to WhatsApp (+971 55 678 7854)</span>
                </button>

                <button
                  onClick={() => navigate('/checkout')}
                  className="w-full py-3 px-6 rounded-xl bg-[#0F0F0F] text-[#D4AF37] font-bold text-xs uppercase tracking-widest hover:bg-stone-800 transition flex items-center justify-center space-x-2 shadow-sm"
                >
                  <span>Complete Online Checkout</span>
                  <ArrowRight className="w-4 h-4" />
                </button>
              </div>

              <div className="pt-3 border-t border-stone-100 flex items-center justify-center space-x-1 text-[11px] text-stone-400">
                <ShieldCheck className="w-4 h-4 text-[#D4AF37]" />
                <span>Direct Dispatch to India & UAE via BlueDart / Aramex</span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
