import React, { useState } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import confetti from 'canvas-confetti';
import {
  CheckCircle2,
  MapPin,
  CreditCard,
  QrCode,
  Truck,
  ShieldCheck,
  ChevronRight,
  Plus,
  ArrowRight,
  Lock,
  Building,
  Smartphone
} from 'lucide-react';
import { useCart } from '../context/CartContext';
import { useAuth } from '../context/AuthContext';
import { useShop } from '../context/ShopContext';
import { Address } from '../types';

export const CheckoutPage: React.FC = () => {
  const navigate = useNavigate();
  const { cart, subtotal, deliveryFee, appliedCoupon, couponDiscount, finalTotal, clearCart } = useCart();
  const { user, addAddress } = useAuth();
  const { placeOrder } = useShop();

  // Multi-step state
  const [currentStep, setCurrentStep] = useState<1 | 2 | 3 | 4>(2); // Default to Address if user logged in
  const [selectedAddressId, setSelectedAddressId] = useState<string>(
    user?.addresses.find(a => a.isDefault)?.id || user?.addresses[0]?.id || ''
  );

  // New Address form modal/toggle
  const [showNewAddressForm, setShowNewAddressForm] = useState(false);
  const [newFullName, setNewFullName] = useState(user?.name || '');
  const [newPhone, setNewPhone] = useState(user?.phone || '');
  const [newLine1, setNewLine1] = useState('');
  const [newLine2, setNewLine2] = useState('');
  const [newCity, setNewCity] = useState('');
  const [newState, setNewState] = useState('');
  const [newPincode, setNewPincode] = useState('');
  const [newAddressType, setNewAddressType] = useState<'Home' | 'Work' | 'Other'>('Home');

  // Customer Details Form (Step 1)
  const [customerName, setCustomerName] = useState(user?.name || 'Aarav Sharma');
  const [customerEmail, setCustomerEmail] = useState(user?.email || 'aarav.sharma@velmira.in');
  const [customerPhone, setCustomerPhone] = useState(user?.phone || '+91 98765 43210');

  // Payment State (Step 4)
  const [paymentMethod, setPaymentMethod] = useState<'cod' | 'upi' | 'card' | 'netbanking'>('upi');
  const [upiId, setUpiId] = useState('aarav@okhdfcbank');
  const [cardNumber, setCardNumber] = useState('4532 •••• •••• 8921');
  const [cardExpiry, setCardExpiry] = useState('08/29');
  const [cardCvv, setCardCvv] = useState('784');
  const [selectedBank, setSelectedBank] = useState('HDFC Bank');
  const [codCaptcha, setCodCaptcha] = useState('');
  const [isProcessingOrder, setIsProcessingOrder] = useState(false);

  if (cart.length === 0) {
    return (
      <div className="min-h-screen bg-[#F8F9FA] flex flex-col items-center justify-center p-8 text-center">
        <h2 className="font-cinzel text-2xl font-bold text-stone-900">Your Shopping Bag Is Empty</h2>
        <p className="text-xs text-stone-500 mt-2">Please add items to your bag before proceeding to checkout.</p>
        <Link
          to="/products"
          className="mt-6 px-6 py-2.5 rounded-full bg-[#0F0F0F] text-[#D4AF37] font-semibold text-xs uppercase tracking-wider"
        >
          Explore Collections
        </Link>
      </div>
    );
  }

  const handleAddNewAddress = (e: React.FormEvent) => {
    e.preventDefault();
    if (!newFullName || !newPhone || !newLine1 || !newCity || !newState || !newPincode) return;

    addAddress({
      fullName: newFullName,
      phone: newPhone,
      addressLine1: newLine1,
      addressLine2: newLine2,
      city: newCity,
      state: newState,
      pincode: newPincode,
      addressType: newAddressType,
      isDefault: true
    });

    setShowNewAddressForm(false);
  };

  const selectedAddress: Address =
    user?.addresses.find(a => a.id === selectedAddressId) ||
    user?.addresses[0] || {
      id: 'addr-default',
      fullName: customerName,
      phone: customerPhone,
      addressLine1: 'Penthouse 14B, Oberoi Sky Heights, Andheri West',
      city: 'Mumbai',
      state: 'Maharashtra',
      pincode: '400053',
      addressType: 'Home',
      isDefault: true
    };

  const handlePlaceOrder = async () => {
    setIsProcessingOrder(true);

    try {
      const order = await placeOrder({
        customerId: user?.id || 'guest-1',
        customerName: customerName,
        customerEmail: customerEmail,
        customerPhone: customerPhone,
        items: cart.map(item => ({
          productId: item.productId,
          name: item.name,
          brand: item.brand,
          image: item.image,
          size: item.size,
          color: item.color,
          price: item.price,
          originalPrice: item.originalPrice,
          quantity: item.quantity
        })),
        shippingAddress: selectedAddress,
        paymentMethod,
        paymentStatus: paymentMethod === 'cod' ? 'pending' : 'completed',
        orderStatus: 'Placed',
        subtotal,
        discount: cart.reduce((acc, it) => acc + (it.originalPrice - it.price) * it.quantity, 0),
        couponCode: appliedCoupon?.code,
        couponDiscount,
        deliveryFee,
        totalAmount: finalTotal
      });

      // Confetti celebratory burst
      confetti({
        particleCount: 120,
        spread: 80,
        origin: { y: 0.6 }
      });

      clearCart();
      navigate(`/order-confirmation/${order.id}`);
    } catch (err) {
      console.error('Order creation failed:', err);
    } finally {
      setIsProcessingOrder(false);
    }
  };

  return (
    <div className="min-h-screen bg-[#F8F9FA] pb-16">
      {/* Top Header */}
      <div className="bg-white border-b border-stone-200 py-4">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 flex items-center justify-between">
          <Link to="/" className="flex items-center space-x-1.5">
            <span className="font-cinzel text-xl font-black tracking-widest text-[#0F0F0F]">
              VELMIRA
            </span>
            <span className="w-1.5 h-1.5 rounded-full bg-[#D4AF37]" />
          </Link>

          <div className="flex items-center space-x-2 text-xs text-stone-500 font-medium">
            <ShieldCheck className="w-4 h-4 text-emerald-600" />
            <span>100% Secure Checkout</span>
          </div>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pt-8">
        {/* Step Indicator */}
        <div className="mb-8 max-w-3xl mx-auto">
          <div className="flex items-center justify-between text-xs font-semibold">
            <div className={`flex items-center space-x-2 ${currentStep >= 1 ? 'text-black font-bold' : 'text-stone-400'}`}>
              <span className={`w-6 h-6 rounded-full flex items-center justify-center font-mono ${currentStep >= 1 ? 'bg-[#0F0F0F] text-[#D4AF37]' : 'bg-stone-200 text-stone-500'}`}>1</span>
              <span className="hidden sm:inline">Details</span>
            </div>
            <div className="w-12 sm:w-20 h-0.5 bg-stone-200" />

            <div className={`flex items-center space-x-2 ${currentStep >= 2 ? 'text-black font-bold' : 'text-stone-400'}`}>
              <span className={`w-6 h-6 rounded-full flex items-center justify-center font-mono ${currentStep >= 2 ? 'bg-[#0F0F0F] text-[#D4AF37]' : 'bg-stone-200 text-stone-500'}`}>2</span>
              <span className="hidden sm:inline">Delivery Address</span>
            </div>
            <div className="w-12 sm:w-20 h-0.5 bg-stone-200" />

            <div className={`flex items-center space-x-2 ${currentStep >= 3 ? 'text-black font-bold' : 'text-stone-400'}`}>
              <span className={`w-6 h-6 rounded-full flex items-center justify-center font-mono ${currentStep >= 3 ? 'bg-[#0F0F0F] text-[#D4AF37]' : 'bg-stone-200 text-stone-500'}`}>3</span>
              <span className="hidden sm:inline">Summary</span>
            </div>
            <div className="w-12 sm:w-20 h-0.5 bg-stone-200" />

            <div className={`flex items-center space-x-2 ${currentStep >= 4 ? 'text-black font-bold' : 'text-stone-400'}`}>
              <span className={`w-6 h-6 rounded-full flex items-center justify-center font-mono ${currentStep >= 4 ? 'bg-[#0F0F0F] text-[#D4AF37]' : 'bg-stone-200 text-stone-500'}`}>4</span>
              <span className="hidden sm:inline">Payment</span>
            </div>
          </div>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
          {/* LEFT: Multi-step checkout accordions (8 cols) */}
          <div className="lg:col-span-8 space-y-5">
            {/* STEP 1: Customer Details */}
            <div className="bg-white rounded-2xl border border-stone-200 overflow-hidden shadow-xs">
              <div
                onClick={() => setCurrentStep(1)}
                className="p-4 sm:p-5 flex items-center justify-between cursor-pointer hover:bg-stone-50/60"
              >
                <div className="flex items-center space-x-3">
                  <span className="w-6 h-6 rounded-full bg-[#0F0F0F] text-[#D4AF37] font-mono text-xs font-bold flex items-center justify-center">
                    1
                  </span>
                  <div>
                    <h3 className="font-cinzel text-sm font-bold text-stone-900 uppercase tracking-wider">
                      Customer Profile & Contact
                    </h3>
                    <p className="text-xs text-stone-500">{customerName} • {customerPhone}</p>
                  </div>
                </div>
                {currentStep > 1 && (
                  <button className="text-xs text-[#C5A059] font-bold hover:underline">
                    Edit
                  </button>
                )}
              </div>

              {currentStep === 1 && (
                <div className="p-6 pt-2 border-t border-stone-100 space-y-4">
                  <div className="grid grid-cols-1 sm:grid-cols-3 gap-3 text-xs">
                    <div>
                      <label className="block font-semibold text-stone-700 mb-1">Full Name</label>
                      <input
                        type="text"
                        value={customerName}
                        onChange={e => setCustomerName(e.target.value)}
                        className="w-full px-3 py-2 rounded-lg border border-stone-300 focus:outline-none focus:border-[#D4AF37]"
                      />
                    </div>
                    <div>
                      <label className="block font-semibold text-stone-700 mb-1">Email</label>
                      <input
                        type="email"
                        value={customerEmail}
                        onChange={e => setCustomerEmail(e.target.value)}
                        className="w-full px-3 py-2 rounded-lg border border-stone-300 focus:outline-none focus:border-[#D4AF37]"
                      />
                    </div>
                    <div>
                      <label className="block font-semibold text-stone-700 mb-1">Phone</label>
                      <input
                        type="tel"
                        value={customerPhone}
                        onChange={e => setCustomerPhone(e.target.value)}
                        className="w-full px-3 py-2 rounded-lg border border-stone-300 focus:outline-none focus:border-[#D4AF37]"
                      />
                    </div>
                  </div>
                  <div className="flex justify-end pt-2">
                    <button
                      onClick={() => setCurrentStep(2)}
                      className="px-6 py-2.5 rounded-xl bg-[#0F0F0F] text-[#D4AF37] text-xs font-bold uppercase tracking-wider hover:bg-stone-800 transition"
                    >
                      Continue to Address
                    </button>
                  </div>
                </div>
              )}
            </div>

            {/* STEP 2: Delivery Address */}
            <div className="bg-white rounded-2xl border border-stone-200 overflow-hidden shadow-xs">
              <div
                onClick={() => setCurrentStep(2)}
                className="p-4 sm:p-5 flex items-center justify-between cursor-pointer hover:bg-stone-50/60"
              >
                <div className="flex items-center space-x-3">
                  <span className="w-6 h-6 rounded-full bg-[#0F0F0F] text-[#D4AF37] font-mono text-xs font-bold flex items-center justify-center">
                    2
                  </span>
                  <div>
                    <h3 className="font-cinzel text-sm font-bold text-stone-900 uppercase tracking-wider">
                      Delivery Address
                    </h3>
                    <p className="text-xs text-stone-500 truncate max-w-md">
                      {selectedAddress.addressLine1}, {selectedAddress.city} ({selectedAddress.pincode})
                    </p>
                  </div>
                </div>
                {currentStep > 2 && (
                  <button className="text-xs text-[#C5A059] font-bold hover:underline">
                    Change
                  </button>
                )}
              </div>

              {currentStep === 2 && (
                <div className="p-6 pt-2 border-t border-stone-100 space-y-4">
                  {/* List of saved addresses */}
                  <div className="space-y-3">
                    {user?.addresses.map(addr => (
                      <label
                        key={addr.id}
                        className={`block p-4 rounded-xl border cursor-pointer transition ${
                          selectedAddressId === addr.id
                            ? 'border-black bg-stone-50/70 shadow-xs'
                            : 'border-stone-200 hover:border-stone-300'
                        }`}
                      >
                        <div className="flex items-start space-x-3">
                          <input
                            type="radio"
                            name="addressSelect"
                            checked={selectedAddressId === addr.id}
                            onChange={() => setSelectedAddressId(addr.id)}
                            className="mt-1 text-black focus:ring-[#D4AF37]"
                          />
                          <div className="flex-1 text-xs">
                            <div className="flex items-center space-x-2">
                              <span className="font-bold text-stone-900 text-sm">{addr.fullName}</span>
                              <span className="px-2 py-0.2 rounded bg-stone-200 text-stone-700 font-semibold text-[10px]">
                                {addr.addressType}
                              </span>
                              {addr.isDefault && (
                                <span className="px-1.5 py-0.2 rounded bg-amber-100 text-amber-900 font-bold text-[9px] uppercase">
                                  Default
                                </span>
                              )}
                            </div>
                            <p className="text-stone-600 mt-1">{addr.addressLine1}</p>
                            {addr.addressLine2 && <p className="text-stone-600">{addr.addressLine2}</p>}
                            <p className="text-stone-600">{addr.city}, {addr.state} - <strong className="text-stone-900 font-mono">{addr.pincode}</strong></p>
                            <p className="text-stone-600 mt-0.5">Mobile: {addr.phone}</p>
                          </div>
                        </div>
                      </label>
                    ))}
                  </div>

                  {/* Add New Address Toggle */}
                  {showNewAddressForm ? (
                    <form onSubmit={handleAddNewAddress} className="p-4 rounded-xl bg-[#FAFAF8] border border-stone-200 space-y-3 text-xs">
                      <p className="font-bold text-stone-900">Add New Delivery Location</p>
                      <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                        <input
                          type="text"
                          required
                          placeholder="Recipient Name"
                          value={newFullName}
                          onChange={e => setNewFullName(e.target.value)}
                          className="px-3 py-2 rounded-lg border border-stone-300 bg-white"
                        />
                        <input
                          type="tel"
                          required
                          placeholder="10-digit Mobile Number"
                          value={newPhone}
                          onChange={e => setNewPhone(e.target.value)}
                          className="px-3 py-2 rounded-lg border border-stone-300 bg-white"
                        />
                      </div>
                      <input
                        type="text"
                        required
                        placeholder="House / Flat No., Luxury Residence, Street"
                        value={newLine1}
                        onChange={e => setNewLine1(e.target.value)}
                        className="w-full px-3 py-2 rounded-lg border border-stone-300 bg-white"
                      />
                      <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
                        <input
                          type="text"
                          required
                          placeholder="City"
                          value={newCity}
                          onChange={e => setNewCity(e.target.value)}
                          className="px-3 py-2 rounded-lg border border-stone-300 bg-white"
                        />
                        <input
                          type="text"
                          required
                          placeholder="State"
                          value={newState}
                          onChange={e => setNewState(e.target.value)}
                          className="px-3 py-2 rounded-lg border border-stone-300 bg-white"
                        />
                        <input
                          type="text"
                          required
                          maxLength={6}
                          placeholder="6-digit PIN"
                          value={newPincode}
                          onChange={e => setNewPincode(e.target.value)}
                          className="px-3 py-2 rounded-lg border border-stone-300 bg-white font-mono"
                        />
                      </div>
                      <div className="flex gap-2">
                        <button
                          type="submit"
                          className="px-4 py-2 bg-[#0F0F0F] text-[#D4AF37] font-bold text-xs uppercase tracking-wider rounded-lg"
                        >
                          Save Address
                        </button>
                        <button
                          type="button"
                          onClick={() => setShowNewAddressForm(false)}
                          className="px-4 py-2 bg-stone-200 text-stone-700 text-xs font-semibold rounded-lg"
                        >
                          Cancel
                        </button>
                      </div>
                    </form>
                  ) : (
                    <button
                      type="button"
                      onClick={() => setShowNewAddressForm(true)}
                      className="flex items-center space-x-1.5 text-xs font-semibold text-stone-800 hover:text-[#C5A059] transition"
                    >
                      <Plus className="w-4 h-4" />
                      <span>Deliver to a New Address</span>
                    </button>
                  )}

                  <div className="flex justify-end pt-3 border-t border-stone-100">
                    <button
                      onClick={() => setCurrentStep(3)}
                      className="px-6 py-2.5 rounded-xl bg-[#0F0F0F] text-[#D4AF37] text-xs font-bold uppercase tracking-wider hover:bg-stone-800 transition"
                    >
                      Proceed to Order Summary
                    </button>
                  </div>
                </div>
              )}
            </div>

            {/* STEP 3: Order Summary */}
            <div className="bg-white rounded-2xl border border-stone-200 overflow-hidden shadow-xs">
              <div
                onClick={() => setCurrentStep(3)}
                className="p-4 sm:p-5 flex items-center justify-between cursor-pointer hover:bg-stone-50/60"
              >
                <div className="flex items-center space-x-3">
                  <span className="w-6 h-6 rounded-full bg-[#0F0F0F] text-[#D4AF37] font-mono text-xs font-bold flex items-center justify-center">
                    3
                  </span>
                  <div>
                    <h3 className="font-cinzel text-sm font-bold text-stone-900 uppercase tracking-wider">
                      Order Summary
                    </h3>
                    <p className="text-xs text-stone-500">{cart.length} items to be delivered</p>
                  </div>
                </div>
                {currentStep > 3 && (
                  <button className="text-xs text-[#C5A059] font-bold hover:underline">
                    View
                  </button>
                )}
              </div>

              {currentStep === 3 && (
                <div className="p-6 pt-2 border-t border-stone-100 space-y-4">
                  <div className="divide-y divide-stone-100">
                    {cart.map(it => (
                      <div key={it.id} className="py-3 flex items-center space-x-4 text-xs">
                        <img src={it.image} alt={it.name} className="w-14 h-18 object-cover rounded-lg border border-stone-200 shrink-0" />
                        <div className="flex-1 min-w-0">
                          <p className="text-[10px] font-bold text-[#D4AF37] uppercase">{it.brand}</p>
                          <p className="font-bold text-stone-900 truncate">{it.name}</p>
                          <p className="text-stone-500">Size: <strong>{it.size}</strong> | Shade: <strong>{it.color}</strong> | Qty: {it.quantity}</p>
                        </div>
                        <span className="font-bold font-mono text-stone-900">
                          ₹{(it.price * it.quantity).toLocaleString('en-IN')}
                        </span>
                      </div>
                    ))}
                  </div>

                  <div className="flex justify-end pt-3 border-t border-stone-100">
                    <button
                      onClick={() => setCurrentStep(4)}
                      className="px-6 py-2.5 rounded-xl bg-[#0F0F0F] text-[#D4AF37] text-xs font-bold uppercase tracking-wider hover:bg-stone-800 transition"
                    >
                      Proceed to Payment Method
                    </button>
                  </div>
                </div>
              )}
            </div>

            {/* STEP 4: Payment Method */}
            <div className="bg-white rounded-2xl border border-stone-200 overflow-hidden shadow-xs">
              <div
                onClick={() => setCurrentStep(4)}
                className="p-4 sm:p-5 flex items-center justify-between cursor-pointer hover:bg-stone-50/60"
              >
                <div className="flex items-center space-x-3">
                  <span className="w-6 h-6 rounded-full bg-[#0F0F0F] text-[#D4AF37] font-mono text-xs font-bold flex items-center justify-center">
                    4
                  </span>
                  <div>
                    <h3 className="font-cinzel text-sm font-bold text-stone-900 uppercase tracking-wider">
                      Payment Options
                    </h3>
                    <p className="text-xs text-stone-500">Encrypted Indian UPI, Cards, NetBanking or COD</p>
                  </div>
                </div>
              </div>

              {currentStep === 4 && (
                <div className="p-6 pt-2 border-t border-stone-100 space-y-4">
                  {/* Payment Choices */}
                  <div className="space-y-3">
                    {/* UPI Option */}
                    <label
                      className={`block p-4 rounded-xl border cursor-pointer transition ${
                        paymentMethod === 'upi' ? 'border-black bg-stone-50' : 'border-stone-200'
                      }`}
                    >
                      <div className="flex items-start space-x-3">
                        <input
                          type="radio"
                          name="payment"
                          checked={paymentMethod === 'upi'}
                          onChange={() => setPaymentMethod('upi')}
                          className="mt-1 text-black focus:ring-[#D4AF37]"
                        />
                        <div className="flex-1">
                          <div className="flex items-center space-x-2">
                            <QrCode className="w-4 h-4 text-[#D4AF37]" />
                            <span className="text-xs font-bold text-stone-900">Instant UPI (GPay, PhonePe, Paytm, BHIM)</span>
                          </div>
                          <p className="text-[11px] text-stone-500 mt-0.5">Zero convenience fee. Instant automated verification.</p>

                          {paymentMethod === 'upi' && (
                            <div className="mt-3 pt-3 border-t border-stone-200 space-y-2">
                              <input
                                type="text"
                                placeholder="Enter your UPI ID (e.g. mobile@upi)"
                                value={upiId}
                                onChange={e => setUpiId(e.target.value)}
                                className="w-full px-3 py-2 text-xs rounded-lg border border-stone-300 font-mono"
                              />
                              <p className="text-[10px] text-stone-400">
                                Simulated instant verification active for fast testing.
                              </p>
                            </div>
                          )}
                        </div>
                      </div>
                    </label>

                    {/* Credit / Debit Card Option */}
                    <label
                      className={`block p-4 rounded-xl border cursor-pointer transition ${
                        paymentMethod === 'card' ? 'border-black bg-stone-50' : 'border-stone-200'
                      }`}
                    >
                      <div className="flex items-start space-x-3">
                        <input
                          type="radio"
                          name="payment"
                          checked={paymentMethod === 'card'}
                          onChange={() => setPaymentMethod('card')}
                          className="mt-1 text-black focus:ring-[#D4AF37]"
                        />
                        <div className="flex-1">
                          <div className="flex items-center space-x-2">
                            <CreditCard className="w-4 h-4 text-[#D4AF37]" />
                            <span className="text-xs font-bold text-stone-900">Credit / Debit Card (Visa, MasterCard, RuPay, Amex)</span>
                          </div>
                          <p className="text-[11px] text-stone-500 mt-0.5">Protected with 3D Secure OTP verification.</p>

                          {paymentMethod === 'card' && (
                            <div className="mt-3 pt-3 border-t border-stone-200 space-y-2">
                              <input
                                type="text"
                                placeholder="Card Number"
                                value={cardNumber}
                                onChange={e => setCardNumber(e.target.value)}
                                className="w-full px-3 py-2 text-xs rounded-lg border border-stone-300 font-mono"
                              />
                              <div className="grid grid-cols-2 gap-2">
                                <input
                                  type="text"
                                  placeholder="MM / YY"
                                  value={cardExpiry}
                                  onChange={e => setCardExpiry(e.target.value)}
                                  className="px-3 py-2 text-xs rounded-lg border border-stone-300 font-mono"
                                />
                                <input
                                  type="password"
                                  placeholder="CVV"
                                  maxLength={4}
                                  value={cardCvv}
                                  onChange={e => setCardCvv(e.target.value)}
                                  className="px-3 py-2 text-xs rounded-lg border border-stone-300 font-mono"
                                />
                              </div>
                            </div>
                          )}
                        </div>
                      </div>
                    </label>

                    {/* Net Banking Option */}
                    <label
                      className={`block p-4 rounded-xl border cursor-pointer transition ${
                        paymentMethod === 'netbanking' ? 'border-black bg-stone-50' : 'border-stone-200'
                      }`}
                    >
                      <div className="flex items-start space-x-3">
                        <input
                          type="radio"
                          name="payment"
                          checked={paymentMethod === 'netbanking'}
                          onChange={() => setPaymentMethod('netbanking')}
                          className="mt-1 text-black focus:ring-[#D4AF37]"
                        />
                        <div className="flex-1">
                          <div className="flex items-center space-x-2">
                            <Building className="w-4 h-4 text-[#D4AF37]" />
                            <span className="text-xs font-bold text-stone-900">Net Banking</span>
                          </div>
                          <p className="text-[11px] text-stone-500 mt-0.5">All major Indian banks supported (HDFC, ICICI, SBI, Axis).</p>

                          {paymentMethod === 'netbanking' && (
                            <div className="mt-3 pt-3 border-t border-stone-200">
                              <select
                                value={selectedBank}
                                onChange={e => setSelectedBank(e.target.value)}
                                className="w-full px-3 py-2 text-xs rounded-lg border border-stone-300"
                              >
                                <option value="HDFC Bank">HDFC Bank</option>
                                <option value="ICICI Bank">ICICI Bank</option>
                                <option value="State Bank of India">State Bank of India</option>
                                <option value="Axis Bank">Axis Bank</option>
                                <option value="Kotak Mahindra Bank">Kotak Mahindra Bank</option>
                              </select>
                            </div>
                          )}
                        </div>
                      </div>
                    </label>

                    {/* Cash on Delivery */}
                    <label
                      className={`block p-4 rounded-xl border cursor-pointer transition ${
                        paymentMethod === 'cod' ? 'border-black bg-stone-50' : 'border-stone-200'
                      }`}
                    >
                      <div className="flex items-start space-x-3">
                        <input
                          type="radio"
                          name="payment"
                          checked={paymentMethod === 'cod'}
                          onChange={() => setPaymentMethod('cod')}
                          className="mt-1 text-black focus:ring-[#D4AF37]"
                        />
                        <div className="flex-1">
                          <div className="flex items-center space-x-2">
                            <Truck className="w-4 h-4 text-[#D4AF37]" />
                            <span className="text-xs font-bold text-stone-900">Cash on Delivery (COD)</span>
                          </div>
                          <p className="text-[11px] text-stone-500 mt-0.5">Pay via Cash or QR at your doorstep upon handover.</p>
                        </div>
                      </div>
                    </label>
                  </div>

                  {/* Complete Order Button */}
                  <div className="pt-4 border-t border-stone-200">
                    <button
                      onClick={handlePlaceOrder}
                      disabled={isProcessingOrder}
                      className="w-full py-4 rounded-xl bg-[#0F0F0F] text-[#D4AF37] font-bold text-xs sm:text-sm uppercase tracking-widest hover:bg-stone-800 transition flex items-center justify-center space-x-2 shadow-lg disabled:opacity-50"
                    >
                      <Lock className="w-4 h-4" />
                      <span>
                        {isProcessingOrder ? 'Securing Your Order...' : `Pay & Confirm Order • ₹${finalTotal.toLocaleString('en-IN')}`}
                      </span>
                    </button>
                  </div>
                </div>
              )}
            </div>
          </div>

          {/* RIGHT: Price Details sticky card (4 cols) */}
          <div className="lg:col-span-4 sticky top-28">
            <div className="bg-white rounded-2xl p-6 border border-stone-200 shadow-xs space-y-4">
              <h3 className="font-cinzel text-sm font-bold text-stone-900 uppercase tracking-widest pb-3 border-b border-stone-100">
                Payment Summary
              </h3>

              <div className="space-y-2 text-xs text-stone-600">
                <div className="flex justify-between">
                  <span>Bag Subtotal</span>
                  <span className="font-mono text-stone-900">₹{subtotal.toLocaleString('en-IN')}</span>
                </div>
                {couponDiscount > 0 && (
                  <div className="flex justify-between text-emerald-700 font-semibold">
                    <span>Coupon Voucher ({appliedCoupon?.code})</span>
                    <span className="font-mono">-₹{couponDiscount.toLocaleString('en-IN')}</span>
                  </div>
                )}
                <div className="flex justify-between">
                  <span>Express White-Glove Shipping</span>
                  {deliveryFee === 0 ? (
                    <span className="text-emerald-700 font-bold uppercase text-[10px]">FREE</span>
                  ) : (
                    <span className="font-mono text-stone-900">₹{deliveryFee}</span>
                  )}
                </div>

                <div className="pt-3 border-t border-stone-200 flex justify-between items-baseline text-stone-900">
                  <span className="text-sm font-bold">Total Amount</span>
                  <span className="text-xl font-bold font-mono text-stone-900">
                    ₹{finalTotal.toLocaleString('en-IN')}
                  </span>
                </div>
              </div>

              {/* Delivery destination preview */}
              <div className="pt-3 border-t border-stone-100 text-xs text-stone-600">
                <div className="flex items-center space-x-1.5 font-bold text-stone-900 mb-1">
                  <MapPin className="w-3.5 h-3.5 text-[#D4AF37]" />
                  <span>Delivering To:</span>
                </div>
                <p className="text-stone-700 font-medium truncate">{selectedAddress.fullName}</p>
                <p className="text-[11px] text-stone-500 line-clamp-1">{selectedAddress.addressLine1}, {selectedAddress.city}</p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
