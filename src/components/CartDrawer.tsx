import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { X, Trash2, Plus, Minus, ShoppingBag, ArrowRight, Tag, Check, Sparkles } from 'lucide-react';
import { useCart } from '../context/CartContext';

export const CartDrawer: React.FC = () => {
  const {
    cart,
    isCartDrawerOpen,
    setIsCartDrawerOpen,
    updateQuantity,
    removeFromCart,
    subtotal,
    deliveryFee,
    appliedCoupon,
    couponDiscount,
    finalTotal,
    freeDeliveryThreshold,
    freeDeliveryRemaining,
    applyCoupon,
    removeCoupon
  } = useCart();

  const navigate = useNavigate();
  const [couponInput, setCouponInput] = useState('');
  const [couponStatus, setCouponStatus] = useState<{ message: string; isError: boolean } | null>(null);

  if (!isCartDrawerOpen) return null;

  const handleApplyCoupon = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!couponInput.trim()) return;
    const res = await applyCoupon(couponInput.trim());
    setCouponStatus({ message: res.message, isError: !res.success });
    if (res.success) setCouponInput('');
  };

  const handleCheckout = () => {
    setIsCartDrawerOpen(false);
    navigate('/checkout');
  };

  const handleViewCart = () => {
    setIsCartDrawerOpen(false);
    navigate('/cart');
  };

  const shippingPercent = Math.min(100, Math.round((subtotal / freeDeliveryThreshold) * 100));

  return (
    <div className="fixed inset-0 z-50 overflow-hidden animate-in fade-in duration-200">
      <div
        className="absolute inset-0 bg-black/60 backdrop-blur-xs transition-opacity"
        onClick={() => setIsCartDrawerOpen(false)}
      />

      <div className="fixed inset-y-0 right-0 max-w-full flex pl-10">
        <div className="w-screen max-w-md bg-white shadow-2xl flex flex-col border-l border-stone-200">
          {/* Header */}
          <div className="p-4 sm:p-5 bg-[#0F0F0F] text-white flex items-center justify-between">
            <div className="flex items-center space-x-2">
              <ShoppingBag className="w-5 h-5 text-[#D4AF37]" />
              <h2 className="font-cinzel text-lg font-bold tracking-wider">Your Shopping Bag</h2>
              <span className="text-xs bg-stone-800 text-[#D4AF37] px-2 py-0.5 rounded-full font-mono">
                {cart.length}
              </span>
            </div>
            <button
              onClick={() => setIsCartDrawerOpen(false)}
              className="p-1 rounded-full text-stone-400 hover:text-white hover:bg-stone-800 transition"
            >
              <X className="w-5 h-5" />
            </button>
          </div>

          {/* Free Shipping Progress Indicator */}
          <div className="bg-[#FAF9F5] p-3 px-5 border-b border-stone-200 text-xs">
            {freeDeliveryRemaining > 0 ? (
              <p className="text-stone-700 font-medium">
                Add <span className="font-bold text-[#0F0F0F]">₹{freeDeliveryRemaining.toLocaleString('en-IN')}</span> more to unlock <span className="text-emerald-700 font-bold">FREE Express Delivery</span>
              </p>
            ) : (
              <p className="text-emerald-700 font-bold flex items-center">
                <Sparkles className="w-3.5 h-3.5 mr-1 text-[#D4AF37]" /> You've unlocked Complimentary Express Delivery!
              </p>
            )}
            <div className="w-full bg-stone-200 h-1.5 rounded-full mt-2 overflow-hidden">
              <div
                className="bg-gradient-to-r from-amber-500 to-[#D4AF37] h-full rounded-full transition-all duration-500"
                style={{ width: `${shippingPercent}%` }}
              />
            </div>
          </div>

          {/* Cart Items List */}
          <div className="flex-1 overflow-y-auto p-4 sm:p-5 space-y-4">
            {cart.length === 0 ? (
              <div className="text-center py-16">
                <div className="w-16 h-16 mx-auto mb-4 rounded-full bg-stone-100 flex items-center justify-center text-stone-400">
                  <ShoppingBag className="w-8 h-8" />
                </div>
                <h3 className="font-serif-luxury text-lg font-semibold text-stone-800">Your bag is empty</h3>
                <p className="text-xs text-stone-500 mt-1 max-w-xs mx-auto">
                  Explore our royal heritage & modern couture collections to curate your luxury wardrobe.
                </p>
                <button
                  onClick={() => {
                    setIsCartDrawerOpen(false);
                    navigate('/products');
                  }}
                  className="mt-6 px-6 py-2.5 rounded-full bg-[#0F0F0F] text-[#D4AF37] text-xs font-semibold uppercase tracking-wider hover:bg-stone-800 transition"
                >
                  Start Shopping
                </button>
              </div>
            ) : (
              cart.map(item => (
                <div
                  key={item.id}
                  className="flex space-x-3.5 p-3 rounded-xl border border-stone-200/80 bg-[#FAFAF8] hover:border-stone-300 transition"
                >
                  <img
                    src={item.image}
                    alt={item.name}
                    className="w-20 h-24 object-cover rounded-lg shrink-0 border border-stone-200"
                  />
                  <div className="flex-1 min-w-0 flex flex-col justify-between">
                    <div>
                      <p className="text-[10px] font-bold text-[#D4AF37] tracking-wider uppercase truncate">
                        {item.brand}
                      </p>
                      <h4 className="text-xs font-medium text-stone-900 line-clamp-1 mt-0.5">{item.name}</h4>
                      <div className="flex items-center space-x-2 mt-1 text-[11px] text-stone-500">
                        <span className="bg-stone-200/70 px-1.5 py-0.5 rounded text-stone-700 font-medium">
                          Size: {item.size}
                        </span>
                        <span className="truncate">{item.color}</span>
                      </div>
                    </div>

                    <div className="flex items-center justify-between mt-2 pt-2 border-t border-stone-200/60">
                      <div className="flex items-center space-x-1.5 border border-stone-300 bg-white rounded-lg px-2 py-0.5">
                        <button
                          onClick={() => updateQuantity(item.id, item.quantity - 1)}
                          className="text-stone-500 hover:text-black p-0.5"
                        >
                          <Minus className="w-3 h-3" />
                        </button>
                        <span className="text-xs font-semibold px-1 text-stone-900">{item.quantity}</span>
                        <button
                          onClick={() => updateQuantity(item.id, item.quantity + 1)}
                          className="text-stone-500 hover:text-black p-0.5"
                        >
                          <Plus className="w-3 h-3" />
                        </button>
                      </div>

                      <div className="flex items-center space-x-2">
                        <div className="text-right">
                          <span className="text-xs font-bold text-stone-900">
                            ₹{(item.price * item.quantity).toLocaleString('en-IN')}
                          </span>
                        </div>
                        <button
                          onClick={() => removeFromCart(item.id)}
                          className="text-stone-400 hover:text-red-600 p-1"
                        >
                          <Trash2 className="w-3.5 h-3.5" />
                        </button>
                      </div>
                    </div>
                  </div>
                </div>
              ))
            )}
          </div>

          {/* Footer & Checkout Action */}
          {cart.length > 0 && (
            <div className="border-t border-stone-200 p-4 sm:p-5 bg-white space-y-3.5">
              {/* Coupon Bar */}
              {appliedCoupon ? (
                <div className="flex items-center justify-between p-2.5 rounded-lg bg-emerald-50 border border-emerald-200 text-xs">
                  <div className="flex items-center space-x-1.5 text-emerald-800">
                    <Check className="w-4 h-4 text-emerald-600" />
                    <span>
                      Code <strong className="font-mono">{appliedCoupon.code}</strong> applied (-₹{couponDiscount.toLocaleString('en-IN')})
                    </span>
                  </div>
                  <button onClick={removeCoupon} className="text-stone-400 hover:text-stone-700 text-xs font-medium">
                    Remove
                  </button>
                </div>
              ) : (
                <form onSubmit={handleApplyCoupon} className="flex space-x-2">
                  <div className="relative flex-1">
                    <Tag className="w-3.5 h-3.5 text-stone-400 absolute left-2.5 top-2.5" />
                    <input
                      type="text"
                      placeholder="Coupon Code (e.g. VELMIRA500)"
                      value={couponInput}
                      onChange={e => setCouponInput(e.target.value.toUpperCase())}
                      className="w-full pl-8 pr-2 py-1.5 text-xs rounded-lg border border-stone-300 focus:outline-none focus:border-[#D4AF37]"
                    />
                  </div>
                  <button
                    type="submit"
                    className="px-3 py-1.5 bg-stone-900 text-white rounded-lg text-xs font-semibold hover:bg-stone-800 transition"
                  >
                    Apply
                  </button>
                </form>
              )}

              {couponStatus && (
                <p className={`text-[11px] ${couponStatus.isError ? 'text-red-600' : 'text-emerald-700'}`}>
                  {couponStatus.message}
                </p>
              )}

              {/* Summary Breakdown */}
              <div className="space-y-1.5 text-xs text-stone-600 pt-2 border-t border-stone-100">
                <div className="flex justify-between">
                  <span>Bag Subtotal</span>
                  <span className="text-stone-900 font-medium">₹{subtotal.toLocaleString('en-IN')}</span>
                </div>
                {couponDiscount > 0 && (
                  <div className="flex justify-between text-emerald-700">
                    <span>Coupon Discount</span>
                    <span>-₹{couponDiscount.toLocaleString('en-IN')}</span>
                  </div>
                )}
                <div className="flex justify-between">
                  <span>Express Shipping</span>
                  {deliveryFee === 0 ? (
                    <span className="text-emerald-700 font-bold uppercase text-[10px]">FREE</span>
                  ) : (
                    <span>₹{deliveryFee}</span>
                  )}
                </div>
                <div className="flex justify-between text-sm font-bold text-stone-900 pt-2 border-t border-stone-200">
                  <span>Total Amount</span>
                  <span className="text-base text-stone-900">₹{finalTotal.toLocaleString('en-IN')}</span>
                </div>
              </div>

              {/* Actions */}
              <div className="grid grid-cols-2 gap-2 pt-1">
                <button
                  onClick={handleViewCart}
                  className="w-full py-2.5 rounded-xl border border-stone-300 text-stone-800 font-semibold text-xs uppercase tracking-wider hover:bg-stone-50 transition"
                >
                  View Full Bag
                </button>
                <button
                  onClick={handleCheckout}
                  className="w-full py-2.5 rounded-xl bg-[#0F0F0F] text-[#D4AF37] font-semibold text-xs uppercase tracking-wider hover:bg-stone-800 transition flex items-center justify-center space-x-1 shadow-sm"
                >
                  <span>Checkout</span>
                  <ArrowRight className="w-3.5 h-3.5" />
                </button>
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};
