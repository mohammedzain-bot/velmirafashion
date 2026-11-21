import React, { useState } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import confetti from 'canvas-confetti';
import {
  MapPin,
  CreditCard,
  QrCode,
  Truck,
  ShieldCheck,
  Plus,
  Lock,
  Building,
  MessageCircle,
  Globe
} from 'lucide-react';
import { useCart } from '../context/CartContext';
import { useAuth } from '../context/AuthContext';
import { useShop } from '../context/ShopContext';
import { useCurrency } from '../context/CurrencyContext';
import { Address, CountryType } from '../types';
import { openWhatsAppOrder, OFFICIAL_WHATSAPP_NUMBER } from '../utils/whatsapp';

export const CheckoutPage: React.FC = () => {
  const navigate = useNavigate();
  const { cart, subtotal, deliveryFee, appliedCoupon, couponDiscount, finalTotal, clearCart } = useCart();
  const { user, addAddress } = useAuth();
  const { placeOrder } = useShop();
  const { formatPrice, currency, country, setRegion } = useCurrency();

  // Multi-step state
  const [currentStep, setCurrentStep] = useState<1 | 2 | 3 | 4>(2);
  const [selectedAddressId, setSelectedAddressId] = useState<string>(
    user?.addresses.find(a => a.isDefault)?.id || user?.addresses[0]?.id || ''
  );

  // Address creation form
  const [showNewAddressForm, setShowNewAddressForm] = useState(false);
  const [newCountry, setNewCountry] = useState<CountryType>(country);
  const [newFullName, setNewFullName] = useState(user?.name || '');
  const [newPhone, setNewPhone] = useState(user?.phone || '');
  const [newLine1, setNewLine1] = useState('');
  const [newLine2, setNewLine2] = useState('');
  const [newCity, setNewCity] = useState('');
  const [newState, setNewState] = useState(country === 'UAE' ? 'Dubai' : 'Maharashtra');
  const [newPincode, setNewPincode] = useState('');
  const [newAddressType] = useState<'Home' | 'Work' | 'Other'>('Home');

  // Customer Details Form (Step 1)
  const [customerName, setCustomerName] = useState(user?.name || 'Hamdan Al Maktoum');
  const [customerEmail, setCustomerEmail] = useState(user?.email || 'patron@velmira.com');
  const [customerPhone, setCustomerPhone] = useState(user?.phone || '+971 50 123 4567');

  // Payment Method (Step 4)
  const [paymentMethod, setPaymentMethod] = useState<'whatsapp' | 'cod' | 'upi' | 'card' | 'netbanking'>('whatsapp');
  const [upiId, setUpiId] = useState('patron@upi');
  const [cardNumber, setCardNumber] = useState('4532 •••• •••• 8921');
  const [cardExpiry, setCardExpiry] = useState('08/29');
  const [cardCvv, setCardCvv] = useState('784');
  const [selectedBank, setSelectedBank] = useState('Emirates NBD');
  const [isProcessingOrder, setIsProcessingOrder] = useState(false);

  if (cart.length === 0) {
    return (
      <div className="min-h-screen bg-[#F8F9FA] flex flex-col items-center justify-center p-8 text-center">
        <h2 className="font-cinzel text-2xl font-bold text-stone-900">Your Shopping Bag Is Empty</h2>
        <p className="text-xs text-stone-500 mt-2">Please select a luxury watch or bag before proceeding to checkout.</p>
        <Link
          to="/products"
          className="mt-6 px-6 py-2.5 rounded-full bg-[#0F0F0F] text-[#D4AF37] font-semibold text-xs uppercase tracking-wider"
        >
          Explore Watches & Bags
        </Link>
      </div>
    );
  }

  const handleAddNewAddress = (e: React.FormEvent) => {
    e.preventDefault();
    if (!newFullName || !newPhone || !newLine1 || !newCity || !newPincode) return;

    addAddress({
      fullName: newFullName,
      phone: newPhone,
      country: newCountry,
      addressLine1: newLine1,
      addressLine2: newLine2,
      city: newCity,
      state: newState,
      pincode: newPincode,
      addressType: newAddressType,
      isDefault: true
    });

    setRegion(newCountry);
    setShowNewAddressForm(false);
  };

  const selectedAddress: Address =
    user?.addresses.find(a => a.id === selectedAddressId) ||
    user?.addresses[0] || {
      id: 'addr-default',
      fullName: customerName,
      phone: customerPhone,
      country: country,
      addressLine1: country === 'UAE' ? 'Penthouse 24, Downtown Boulevard' : 'Penthouse 14B, Oberoi Sky Heights',
      addressLine2: country === 'UAE' ? 'Downtown Dubai' : 'Andheri West',
      city: country === 'UAE' ? 'Dubai' : 'Mumbai',
      state: country === 'UAE' ? 'Dubai' : 'Maharashtra',
      pincode: country === 'UAE' ? '00000' : '400053',
      addressType: 'Home',
      isDefault: true
    };

  const handlePlaceOrder = async () => {
    setIsProcessingOrder(true);

    try {
      const order = await placeOrder({
        customerId: user?.id || 'patron-1',
        customerName: customerName,
        customerEmail: customerEmail,
        customerPhone: customerPhone,
        country: selectedAddress.country || country,
        currency: currency,
        items: cart.map(item => ({
          productId: item.productId,
          name: item.name,
          brand: item.brand,
          image: item.image,
          size: item.size,
          color: item.color,
          price: item.price,
          originalPrice: item.originalPrice,
          priceAED: item.priceAED,
          quantity: item.quantity
        })),
        shippingAddress: selectedAddress,
        paymentMethod,
        paymentStatus: paymentMethod === 'whatsapp' ? 'whatsapp_order' : paymentMethod === 'cod' ? 'pending' : 'completed',
        orderStatus: 'Placed',
        subtotal,
        discount: cart.reduce((acc, it) => acc + (it.originalPrice - it.price) * it.quantity, 0),
        couponCode: appliedCoupon?.code,
        couponDiscount,
        deliveryFee,
        totalAmount: finalTotal,
        whatsappMessageSent: true
      });

      // Send to WhatsApp if paymentMethod is whatsapp OR always send order summary copy
      openWhatsAppOrder({
        orderId: order.id,
        customerName: customerName,
        customerPhone: customerPhone,
        customerEmail: customerEmail,
        shippingAddress: selectedAddress,
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
        paymentMethod: paymentMethod === 'whatsapp' ? 'Direct WhatsApp Order' : paymentMethod.toUpperCase(),
        notes: `Selected region: ${selectedAddress.country}`
      });

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

          <div className="flex items-center space-x-3 text-xs text-stone-600 font-medium">
            <span className="hidden sm:inline bg-emerald-50 text-emerald-800 border border-emerald-200 px-2.5 py-1 rounded-lg">
              WhatsApp: {OFFICIAL_WHATSAPP_NUMBER}
            </span>
            <div className="flex items-center space-x-1 text-emerald-700">
              <ShieldCheck className="w-4 h-4 text-emerald-600" />
              <span>India & UAE Secured</span>
            </div>
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
              <span className="hidden sm:inline">Address (India / UAE)</span>
            </div>
            <div className="w-12 sm:w-20 h-0.5 bg-stone-200" />

            <div className={`flex items-center space-x-2 ${currentStep >= 3 ? 'text-black font-bold' : 'text-stone-400'}`}>
              <span className={`w-6 h-6 rounded-full flex items-center justify-center font-mono ${currentStep >= 3 ? 'bg-[#0F0F0F] text-[#D4AF37]' : 'bg-stone-200 text-stone-500'}`}>3</span>
              <span className="hidden sm:inline">Summary</span>
            </div>
            <div className="w-12 sm:w-20 h-0.5 bg-stone-200" />

            <div className={`flex items-center space-x-2 ${currentStep >= 4 ? 'text-black font-bold' : 'text-stone-400'}`}>
              <span className={`w-6 h-6 rounded-full flex items-center justify-center font-mono ${currentStep >= 4 ? 'bg-[#0F0F0F] text-[#D4AF37]' : 'bg-stone-200 text-stone-500'}`}>4</span>
              <span className="hidden sm:inline">Payment / WhatsApp</span>
            </div>
          </div>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
          {/* LEFT: Multi-step checkout accordions (8 cols) */}
          <div className="lg:col-span-8 space-y-5">
            {/* STEP 1: Details */}
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
                      Patron Profile & WhatsApp Contact
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
                      <label className="block font-semibold text-stone-700 mb-1">WhatsApp Mobile</label>
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
                      Continue to Delivery Address
                    </button>
                  </div>
                </div>
              )}
            </div>

            {/* STEP 2: Delivery Address (India & UAE) */}
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
                      Delivery Address (India & UAE)
                    </h3>
                    <p className="text-xs text-stone-500 truncate max-w-md">
                      {selectedAddress.addressLine1}, {selectedAddress.city} ({selectedAddress.country})
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
                  {/* Saved Addresses list */}
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
                            onChange={() => {
                              setSelectedAddressId(addr.id);
                              if (addr.country) setRegion(addr.country);
                            }}
                            className="mt-1 text-black focus:ring-[#D4AF37]"
                          />
                          <div className="flex-1 text-xs">
                            <div className="flex items-center space-x-2">
                              <span className="font-bold text-stone-900 text-sm">{addr.fullName}</span>
                              <span className="px-2 py-0.2 rounded bg-stone-200 text-stone-700 font-semibold text-[10px]">
                                {addr.country === 'UAE' ? '🇦🇪 UAE' : '🇮🇳 India'} • {addr.addressType}
                              </span>
                            </div>
                            <p className="text-stone-600 mt-1">{addr.addressLine1}</p>
                            {addr.addressLine2 && <p className="text-stone-600">{addr.addressLine2}</p>}
                            <p className="text-stone-600">
                              {addr.city}, {addr.state} - <strong className="text-stone-900 font-mono">{addr.pincode}</strong> ({addr.country || 'India'})
                            </p>
                            <p className="text-stone-600 mt-0.5">Mobile: {addr.phone}</p>
                          </div>
                        </div>
                      </label>
                    ))}
                  </div>

                  {/* Add New Address with India / UAE toggle */}
                  {showNewAddressForm ? (
                    <form onSubmit={handleAddNewAddress} className="p-4 rounded-xl bg-[#FAFAF8] border border-stone-200 space-y-3 text-xs">
                      <div className="flex items-center justify-between pb-2 border-b border-stone-200">
                        <span className="font-bold text-stone-900">Add New Delivery Location</span>
                        <div className="inline-flex rounded-lg border border-stone-300 p-0.5 bg-white text-xs font-semibold">
                          <button
                            type="button"
                            onClick={() => { setNewCountry('India'); setNewState('Maharashtra'); }}
                            className={`px-3 py-1 rounded transition ${newCountry === 'India' ? 'bg-[#0F0F0F] text-white' : 'text-stone-600'}`}
                          >
                            🇮🇳 India
                          </button>
                          <button
                            type="button"
                            onClick={() => { setNewCountry('UAE'); setNewState('Dubai'); }}
                            className={`px-3 py-1 rounded transition ${newCountry === 'UAE' ? 'bg-[#0F0F0F] text-white' : 'text-stone-600'}`}
                          >
                            🇦🇪 UAE
                          </button>
                        </div>
                      </div>

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
                          placeholder={newCountry === 'UAE' ? '+971 50 123 4567' : '+91 98765 43210'}
                          value={newPhone}
                          onChange={e => setNewPhone(e.target.value)}
                          className="px-3 py-2 rounded-lg border border-stone-300 bg-white"
                        />
                      </div>

                      <input
                        type="text"
                        required
                        placeholder={newCountry === 'UAE' ? 'Villa / Apartment No., Building / Street' : 'House / Flat No., Street, Area'}
                        value={newLine1}
                        onChange={e => setNewLine1(e.target.value)}
                        className="w-full px-3 py-2 rounded-lg border border-stone-300 bg-white"
                      />

                      <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
                        <input
                          type="text"
                          required
                          placeholder={newCountry === 'UAE' ? 'City / Area (e.g. Downtown)' : 'City'}
                          value={newCity}
                          onChange={e => setNewCity(e.target.value)}
                          className="px-3 py-2 rounded-lg border border-stone-300 bg-white"
                        />

                        {newCountry === 'UAE' ? (
                          <select
                            value={newState}
                            onChange={e => setNewState(e.target.value)}
                            className="px-3 py-2 rounded-lg border border-stone-300 bg-white font-medium"
                          >
                            <option value="Dubai">Dubai</option>
                            <option value="Abu Dhabi">Abu Dhabi</option>
                            <option value="Sharjah">Sharjah</option>
                            <option value="Ajman">Ajman</option>
                            <option value="Ras Al Khaimah">Ras Al Khaimah</option>
                            <option value="Fujairah">Fujairah</option>
                            <option value="Umm Al Quwain">Umm Al Quwain</option>
                          </select>
                        ) : (
                          <input
                            type="text"
                            required
                            placeholder="State (e.g. Maharashtra)"
                            value={newState}
                            onChange={e => setNewState(e.target.value)}
                            className="px-3 py-2 rounded-lg border border-stone-300 bg-white"
                          />
                        )}

                        <input
                          type="text"
                          required
                          placeholder={newCountry === 'UAE' ? 'Makani / Postal' : '6-digit PIN'}
                          value={newPincode}
                          onChange={e => setNewPincode(e.target.value)}
                          className="px-3 py-2 rounded-lg border border-stone-300 bg-white font-mono"
                        />
                      </div>

                      <div className="flex gap-2 pt-2">
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
                      <span>Deliver to a New Address in India or UAE</span>
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
                    <p className="text-xs text-stone-500">{cart.length} luxury watches/bags</p>
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
                        <img src={it.image} alt={it.name} className="w-14 h-18 object-cover object-center rounded-lg border border-stone-200 shrink-0" />
                        <div className="flex-1 min-w-0">
                          <p className="text-[10px] font-bold text-[#D4AF37] uppercase">{it.brand}</p>
                          <p className="font-bold text-stone-900 truncate">{it.name}</p>
                          <p className="text-stone-500">Spec: <strong>{it.size}</strong> | Shade: <strong>{it.color}</strong> | Qty: {it.quantity}</p>
                        </div>
                        <span className="font-bold font-mono text-stone-900">
                          {formatPrice(it.price * it.quantity, (it.priceAED || 0) * it.quantity)}
                        </span>
                      </div>
                    ))}
                  </div>

                  <div className="flex justify-end pt-3 border-t border-stone-100">
                    <button
                      onClick={() => setCurrentStep(4)}
                      className="px-6 py-2.5 rounded-xl bg-[#0F0F0F] text-[#D4AF37] text-xs font-bold uppercase tracking-wider hover:bg-stone-800 transition"
                    >
                      Proceed to Payment & WhatsApp Dispatch
                    </button>
                  </div>
                </div>
              )}
            </div>

            {/* STEP 4: Payment / WhatsApp Ordering Method */}
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
                      Ordering & Payment Channel
                    </h3>
                    <p className="text-xs text-stone-500">Direct WhatsApp Ordering (+971 55 678 7854), COD or Online</p>
                  </div>
                </div>
              </div>

              {currentStep === 4 && (
                <div className="p-6 pt-2 border-t border-stone-100 space-y-4">
                  <div className="space-y-3">
                    {/* 1. WHATSAPP ORDERING CHANNEL (RECOMMENDED) */}
                    <label
                      className={`block p-4 rounded-xl border cursor-pointer transition ${
                        paymentMethod === 'whatsapp' ? 'border-emerald-600 bg-emerald-50/70 shadow-sm' : 'border-stone-200'
                      }`}
                    >
                      <div className="flex items-start space-x-3">
                        <input
                          type="radio"
                          name="payment"
                          checked={paymentMethod === 'whatsapp'}
                          onChange={() => setPaymentMethod('whatsapp')}
                          className="mt-1 text-emerald-600 focus:ring-emerald-500"
                        />
                        <div className="flex-1">
                          <div className="flex items-center space-x-2">
                            <MessageCircle className="w-4 h-4 text-emerald-600 fill-emerald-600" />
                            <span className="text-xs font-bold text-stone-900">
                              Direct WhatsApp Dispatch ({OFFICIAL_WHATSAPP_NUMBER})
                            </span>
                            <span className="text-[9px] font-bold uppercase px-2 py-0.5 rounded bg-emerald-600 text-white">
                              Official
                            </span>
                          </div>
                          <p className="text-[11px] text-stone-600 mt-1">
                            Your complete order summary with address and selected items will be sent directly to our Dubai concierge (+971 55 678 7854) for instant confirmation and white-glove dispatch.
                          </p>
                        </div>
                      </div>
                    </label>

                    {/* Cash on Delivery / Card on Handover */}
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
                            <span className="text-xs font-bold text-stone-900">
                              Cash / Card on Delivery (Doorstep Handover)
                            </span>
                          </div>
                          <p className="text-[11px] text-stone-500 mt-0.5">
                            Available across major UAE Emirates and all Indian PIN codes.
                          </p>
                        </div>
                      </div>
                    </label>

                    {/* UPI (India) */}
                    {selectedAddress.country === 'India' && (
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
                            <p className="text-[11px] text-stone-500 mt-0.5">Automated UPI payment gateway.</p>
                          </div>
                        </div>
                      </label>
                    )}

                    {/* Credit / Debit Card */}
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
                            <span className="text-xs font-bold text-stone-900">International Credit / Debit Card (Visa, MasterCard, Amex)</span>
                          </div>
                          <p className="text-[11px] text-stone-500 mt-0.5">Supports AED and INR transactions.</p>
                        </div>
                      </div>
                    </label>
                  </div>

                  {/* Complete Order Button */}
                  <div className="pt-4 border-t border-stone-200">
                    <button
                      onClick={handlePlaceOrder}
                      disabled={isProcessingOrder}
                      className="w-full py-4 rounded-xl bg-emerald-600 hover:bg-emerald-700 text-white font-bold text-xs sm:text-sm uppercase tracking-widest transition flex items-center justify-center space-x-2 shadow-lg disabled:opacity-50"
                    >
                      <MessageCircle className="w-5 h-5 fill-white" />
                      <span>
                        {isProcessingOrder
                          ? 'Transmitting Order...'
                          : `Complete Order & Send to WhatsApp (${OFFICIAL_WHATSAPP_NUMBER})`}
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
              <div className="flex items-center justify-between pb-3 border-b border-stone-100">
                <h3 className="font-cinzel text-sm font-bold text-stone-900 uppercase tracking-widest">
                  Order Summary
                </h3>
                <span className="text-xs bg-stone-100 text-stone-800 font-mono font-bold px-2 py-0.5 rounded">
                  {selectedAddress.country === 'UAE' ? '🇦🇪 AED' : '🇮🇳 INR'}
                </span>
              </div>

              <div className="space-y-2 text-xs text-stone-600">
                <div className="flex justify-between">
                  <span>Subtotal ({cart.length} items)</span>
                  <span className="font-mono text-stone-900">{formatPrice(subtotal)}</span>
                </div>
                {couponDiscount > 0 && (
                  <div className="flex justify-between text-emerald-700 font-semibold">
                    <span>Voucher ({appliedCoupon?.code})</span>
                    <span className="font-mono">-{formatPrice(couponDiscount)}</span>
                  </div>
                )}
                <div className="flex justify-between">
                  <span>Insured Air Cargo</span>
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

              {/* Destination preview */}
              <div className="pt-3 border-t border-stone-100 text-xs text-stone-600">
                <div className="flex items-center space-x-1.5 font-bold text-stone-900 mb-1">
                  <MapPin className="w-3.5 h-3.5 text-[#D4AF37]" />
                  <span>Delivering To:</span>
                </div>
                <p className="text-stone-700 font-medium truncate">{selectedAddress.fullName}</p>
                <p className="text-[11px] text-stone-500 line-clamp-1">
                  {selectedAddress.addressLine1}, {selectedAddress.city} ({selectedAddress.country})
                </p>
              </div>

              {/* WhatsApp confirmation box */}
              <div className="p-3 rounded-xl bg-emerald-50 border border-emerald-200 text-[11px] text-emerald-900 space-y-1">
                <p className="font-bold flex items-center">
                  <MessageCircle className="w-3.5 h-3.5 mr-1 text-emerald-600" /> WhatsApp Dispatch Channel
                </p>
                <p className="text-stone-600">
                  Order summary auto-routes to: <strong className="text-stone-900">{OFFICIAL_WHATSAPP_NUMBER}</strong>
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
