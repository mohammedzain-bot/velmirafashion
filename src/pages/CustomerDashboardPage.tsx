import React, { useState, useEffect } from 'react';
import { useSearchParams, Link } from 'react-router-dom';
import {
  User as UserIcon,
  Package,
  Heart,
  MapPin,
  RotateCcw,
  Settings,
  Truck,
  Printer,
  ShoppingBag,
  Trash2,
  Plus,
  ShieldCheck,
  CheckCircle,
  AlertCircle
} from 'lucide-react';
import { useAuth } from '../context/AuthContext';
import { useShop } from '../context/ShopContext';
import { useWishlist } from '../context/WishlistContext';
import { useCart } from '../context/CartContext';
import { InvoiceModal } from '../components/InvoiceModal';
import { TrackOrderModal } from '../components/TrackOrderModal';
import { Order } from '../types';

export const CustomerDashboardPage: React.FC = () => {
  const [searchParams, setSearchParams] = useSearchParams();
  const { user, updateProfile, addAddress, deleteAddress, setDefaultAddress } = useAuth();
  const { orders, products, requestReturn } = useShop();
  const { wishlistIds, removeFromWishlist } = useWishlist();
  const { addToCart } = useCart();

  const tabParam = searchParams.get('tab') || 'orders';
  const [activeTab, setActiveTab] = useState<string>(tabParam);

  useEffect(() => {
    if (searchParams.get('tab')) {
      setActiveTab(searchParams.get('tab')!);
    }
  }, [searchParams]);

  const switchTab = (tab: string) => {
    setActiveTab(tab);
    setSearchParams({ tab });
  };

  // Modals
  const [selectedOrderForInvoice, setSelectedOrderForInvoice] = useState<Order | null>(null);
  const [selectedOrderForTrack, setSelectedOrderForTrack] = useState<Order | null>(null);

  // Return request modal
  const [returnOrderId, setReturnOrderId] = useState<string | null>(null);
  const [returnReason, setReturnReason] = useState('Size did not fit as expected');
  const [returnSubmitted, setReturnSubmitted] = useState(false);

  // Profile edit
  const [nameInput, setNameInput] = useState(user?.name || '');
  const [phoneInput, setPhoneInput] = useState(user?.phone || '');
  const [profileSaved, setProfileSaved] = useState(false);

  // Wishlist products
  const wishlistProducts = products.filter(p => wishlistIds.includes(p.id));

  // Orders filtered for customer
  const myOrders = orders; // Show user orders

  const handleProfileSave = (e: React.FormEvent) => {
    e.preventDefault();
    updateProfile({ name: nameInput, phone: phoneInput });
    setProfileSaved(true);
    setTimeout(() => setProfileSaved(false), 3000);
  };

  const handleReturnSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!returnOrderId) return;
    await requestReturn(returnOrderId, returnReason);
    setReturnSubmitted(true);
    setTimeout(() => {
      setReturnSubmitted(false);
      setReturnOrderId(null);
    }, 2500);
  };

  return (
    <div className="min-h-screen bg-[#FFFFFF] text-[#111111] pb-16 font-sans">
      {/* Top Banner */}
      <div className="bg-[#FFFFFF] text-[#111111] py-8 border-b border-neutral-200">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 flex flex-col sm:flex-row sm:items-center justify-between gap-4">
          <div className="flex items-center space-x-4">
            <div className="w-14 h-14 bg-[#111111] text-white font-serif font-bold text-xl flex items-center justify-center">
              {user?.name ? user.name.charAt(0) : 'V'}
            </div>
            <div>
              <div className="flex items-center space-x-2">
                <h1 className="font-serif text-xl sm:text-2xl font-bold tracking-wide">
                  {user?.name || 'Valued Patron'}
                </h1>
                <span className="border border-neutral-200 bg-[#F8F8F8] text-[#111111] text-[10px] uppercase font-bold px-2 py-0.5">
                  Privé Patron
                </span>
              </div>
              <p className="text-xs text-stone-400 mt-0.5">{user?.email || 'aarav.sharma@velmira.in'}</p>
            </div>
          </div>

          <div className="flex items-center space-x-3 text-xs">
            <Link
              to="/watches"
              className="px-4 py-2 border border-neutral-300 hover:border-black text-[#111111] transition text-xs uppercase tracking-wider"
            >
              Browse Watches
            </Link>
            <Link
              to="/admin"
              className="px-4 py-2 bg-[#111111] text-white font-medium uppercase tracking-wider text-xs hover:bg-neutral-800 transition"
            >
              Admin Portal
            </Link>
          </div>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pt-8">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
          {/* LEFT: Navigation Tabs (3 cols) */}
          <div className="lg:col-span-3 bg-white border border-neutral-200 p-3 space-y-1">
            <button
              onClick={() => switchTab('orders')}
              className={`w-full flex items-center space-x-3 px-4 py-3 text-xs font-semibold transition ${
                activeTab === 'orders'
                  ? 'bg-[#111111] text-white font-bold'
                  : 'text-[#777777] hover:bg-[#F8F8F8] hover:text-[#111111]'
              }`}
            >
              <Package className="w-4 h-4" />
              <span>My Orders ({myOrders.length})</span>
            </button>

            <button
              onClick={() => switchTab('wishlist')}
              className={`w-full flex items-center space-x-3 px-4 py-3 text-xs font-semibold transition ${
                activeTab === 'wishlist'
                  ? 'bg-[#111111] text-white font-bold'
                  : 'text-[#777777] hover:bg-[#F8F8F8] hover:text-[#111111]'
              }`}
            >
              <Heart className="w-4 h-4" />
              <span>My Wishlist ({wishlistIds.length})</span>
            </button>

            <button
              onClick={() => switchTab('addresses')}
              className={`w-full flex items-center space-x-3 px-4 py-3 text-xs font-semibold transition ${
                activeTab === 'addresses'
                  ? 'bg-[#111111] text-white font-bold'
                  : 'text-[#777777] hover:bg-[#F8F8F8] hover:text-[#111111]'
              }`}
            >
              <MapPin className="w-4 h-4" />
              <span>Saved Addresses</span>
            </button>

            <button
              onClick={() => switchTab('profile')}
              className={`w-full flex items-center space-x-3 px-4 py-3 text-xs font-semibold transition ${
                activeTab === 'profile'
                  ? 'bg-[#111111] text-white font-bold'
                  : 'text-[#777777] hover:bg-[#F8F8F8] hover:text-[#111111]'
              }`}
            >
              <UserIcon className="w-4 h-4" />
              <span>Profile Settings</span>
            </button>

            <button
              onClick={() => switchTab('returns')}
              className={`w-full flex items-center space-x-3 px-4 py-3 text-xs font-semibold transition ${
                activeTab === 'returns'
                  ? 'bg-[#111111] text-white font-bold'
                  : 'text-[#777777] hover:bg-[#F8F8F8] hover:text-[#111111]'
              }`}
            >
              <RotateCcw className="w-4 h-4" />
              <span>Returns & Refunds</span>
            </button>
          </div>

          {/* RIGHT: Active Tab Content (9 cols) */}
          <div className="lg:col-span-9">
            {/* TAB: My Orders */}
            {activeTab === 'orders' && (
              <div className="space-y-4">
                <div className="flex items-center justify-between mb-2">
                  <h2 className="font-cinzel text-xl font-bold text-stone-900">
                    Order History & Live Consignments
                  </h2>
                  <span className="text-xs text-stone-500 font-mono">{myOrders.length} orders recorded</span>
                </div>

                {myOrders.length === 0 ? (
                  <div className="bg-white rounded-2xl border border-stone-200 p-12 text-center">
                    <Package className="w-12 h-12 text-stone-300 mx-auto mb-3" />
                    <h3 className="font-bold text-stone-800 text-sm">No orders placed yet</h3>
                    <p className="text-xs text-stone-500 mt-1">Explore our couture collections to make your maiden order.</p>
                  </div>
                ) : (
                  myOrders.map(order => (
                    <div
                      key={order.id}
                      className="bg-white rounded-2xl border border-stone-200 p-5 sm:p-6 shadow-xs hover:border-stone-300 transition"
                    >
                      {/* Order Header */}
                      <div className="flex flex-col sm:flex-row sm:items-center justify-between pb-4 border-b border-stone-100 gap-2">
                        <div>
                          <div className="flex items-center space-x-2">
                            <span className="font-mono font-bold text-stone-900 text-sm">
                              {order.id}
                            </span>
                            <span
                              className={`text-[10px] font-bold uppercase tracking-wider px-2 py-0.5 rounded ${
                                order.orderStatus === 'Delivered'
                                  ? 'bg-emerald-100 text-emerald-800'
                                  : order.orderStatus === 'Shipped'
                                  ? 'bg-blue-100 text-blue-800'
                                  : 'bg-amber-100 text-amber-900'
                              }`}
                            >
                              {order.orderStatus}
                            </span>
                          </div>
                          <p className="text-[11px] text-stone-500 mt-0.5">
                            Placed on {new Date(order.orderDate).toLocaleDateString('en-IN', { day: 'numeric', month: 'short', year: 'numeric' })}
                          </p>
                        </div>

                        <div className="flex items-center space-x-3 text-xs">
                          <button
                            onClick={() => setSelectedOrderForTrack(order)}
                            className="px-3 py-1.5 bg-[#111111] text-white font-medium flex items-center space-x-1.5 hover:bg-neutral-800 transition"
                          >
                            <Truck className="w-3.5 h-3.5" />
                            <span>Track</span>
                          </button>

                          <button
                            onClick={() => setSelectedOrderForInvoice(order)}
                            className="px-3 py-1.5 rounded-lg border border-stone-300 text-stone-700 font-semibold flex items-center space-x-1.5 hover:bg-stone-50 transition"
                          >
                            <Printer className="w-3.5 h-3.5" />
                            <span>Invoice</span>
                          </button>
                        </div>
                      </div>

                      {/* Items */}
                      <div className="divide-y divide-stone-100 py-2">
                        {order.items.map((it, idx) => (
                          <div key={idx} className="py-3 flex items-center space-x-4 text-xs">
                            <img
                              src={it.image}
                              alt={it.name}
                              className="w-16 h-20 object-cover rounded-lg border border-stone-200 shrink-0"
                            />
                            <div className="flex-1 min-w-0">
                              <span className="text-[10px] font-bold font-cinzel text-[#C5A059] uppercase">
                                {it.brand}
                              </span>
                              <h4 className="font-bold text-stone-900 text-xs sm:text-sm line-clamp-1">
                                {it.name}
                              </h4>
                              <p className="text-stone-500 mt-0.5">
                                Size: <strong className="text-stone-800">{it.size}</strong> | Shade: <strong className="text-stone-800">{it.color}</strong> | Qty: {it.quantity}
                              </p>
                              <p className="font-mono font-bold text-stone-900 mt-1">
                                ₹{(it.price * it.quantity).toLocaleString('en-IN')}
                              </p>
                            </div>
                          </div>
                        ))}
                      </div>

                      {/* Order Footer */}
                      <div className="flex items-center justify-between pt-3 border-t border-stone-100 text-xs">
                        <div>
                          <span className="text-stone-500">Paid via: </span>
                          <span className="uppercase font-semibold text-stone-800">{order.paymentMethod}</span>
                          <span className="text-stone-400"> ({order.paymentStatus})</span>
                        </div>

                        <div className="flex items-center space-x-4">
                          {order.orderStatus === 'Delivered' && !order.returnRequested && (
                            <button
                              onClick={() => setReturnOrderId(order.id)}
                              className="text-stone-500 hover:text-red-700 text-xs font-semibold flex items-center space-x-1"
                            >
                              <RotateCcw className="w-3 h-3" />
                              <span>Request Return</span>
                            </button>
                          )}
                          {order.returnRequested && (
                            <span className="text-amber-700 font-semibold text-xs">
                              Return {order.returnStatus}
                            </span>
                          )}
                          <div className="text-right">
                            <span className="text-stone-500 text-[11px] block">Order Total:</span>
                            <span className="font-mono font-bold text-stone-900 text-base">
                              ₹{order.totalAmount.toLocaleString('en-IN')}
                            </span>
                          </div>
                        </div>
                      </div>
                    </div>
                  ))
                )}
              </div>
            )}

            {/* TAB: Wishlist */}
            {activeTab === 'wishlist' && (
              <div className="space-y-4">
                <div className="flex items-center justify-between mb-2">
                  <h2 className="font-cinzel text-xl font-bold text-stone-900">
                    Curated Wishlist
                  </h2>
                  <span className="text-xs text-stone-500">{wishlistProducts.length} items saved</span>
                </div>

                {wishlistProducts.length === 0 ? (
                  <div className="bg-white rounded-2xl border border-stone-200 p-12 text-center">
                    <Heart className="w-12 h-12 text-stone-300 mx-auto mb-3" />
                    <h3 className="font-bold text-stone-800 text-sm">Your wishlist is currently empty</h3>
                    <p className="text-xs text-stone-500 mt-1">Tap the heart icon on any couture piece to save it for later.</p>
                  </div>
                ) : (
                  <div className="grid grid-cols-1 sm:grid-cols-2 xl:grid-cols-3 gap-4">
                    {wishlistProducts.map(p => (
                      <div key={p.id} className="bg-white rounded-xl border border-stone-200 overflow-hidden shadow-xs flex flex-col justify-between">
                        <Link to={`/products/${p.id}`} className="aspect-[3/4] block relative bg-stone-100">
                          <img src={p.images[0]} alt={p.name} className="w-full h-full object-cover" />
                        </Link>
                        <div className="p-4 flex-1 flex flex-col justify-between">
                          <div>
                            <span className="text-[10px] font-semibold text-[#777777] uppercase tracking-wider">{p.brand}</span>
                            <h4 className="text-xs font-semibold text-stone-900 line-clamp-1 mt-0.5">{p.name}</h4>
                            <span className="text-sm font-bold font-mono text-stone-900 block mt-1">
                              ₹{p.discountedPrice.toLocaleString('en-IN')}
                            </span>
                          </div>

                          <div className="mt-4 pt-3 border-t border-stone-100 flex items-center justify-between">
                            <button
                              onClick={() => {
                                addToCart(p, p.sizes[0], p.colors[0]?.name || 'Standard');
                                removeFromWishlist(p.id);
                              }}
                              className="px-3 py-1.5 bg-[#111111] text-white text-xs font-medium uppercase tracking-wider flex items-center space-x-1 hover:bg-neutral-800 transition"
                            >
                              <ShoppingBag className="w-3.5 h-3.5" />
                              <span>Move to Bag</span>
                            </button>

                            <button
                              onClick={() => removeFromWishlist(p.id)}
                              className="p-1.5 text-stone-400 hover:text-red-600 rounded-lg"
                            >
                              <Trash2 className="w-4 h-4" />
                            </button>
                          </div>
                        </div>
                      </div>
                    ))}
                  </div>
                )}
              </div>
            )}

            {/* TAB: Saved Addresses */}
            {activeTab === 'addresses' && (
              <div className="space-y-4">
                <div className="flex items-center justify-between mb-2">
                  <h2 className="font-cinzel text-xl font-bold text-stone-900">
                    Saved Delivery Destinations
                  </h2>
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  {user?.addresses.map(addr => (
                    <div key={addr.id} className="bg-white rounded-2xl border border-stone-200 p-5 shadow-xs relative flex flex-col justify-between">
                      <div>
                        <div className="flex items-center justify-between mb-2">
                          <div className="flex items-center space-x-2">
                            <span className="font-bold text-stone-900 text-sm">{addr.fullName}</span>
                            <span className="px-2 py-0.2 rounded bg-stone-100 text-stone-700 text-[10px] font-semibold">
                              {addr.addressType}
                            </span>
                          </div>
                          {addr.isDefault && (
                            <span className="px-2 py-0.5 rounded bg-amber-100 text-amber-900 font-bold text-[9px] uppercase">
                              Default
                            </span>
                          )}
                        </div>

                        <p className="text-xs text-stone-600 leading-relaxed">{addr.addressLine1}</p>
                        {addr.addressLine2 && <p className="text-xs text-stone-600">{addr.addressLine2}</p>}
                        <p className="text-xs text-stone-600 mt-1">
                          {addr.city}, {addr.state} - <strong className="text-stone-900 font-mono">{addr.pincode}</strong>
                        </p>
                        <p className="text-xs text-stone-500 mt-1">Phone: {addr.phone}</p>
                      </div>

                      <div className="mt-4 pt-3 border-t border-stone-100 flex items-center justify-between text-xs">
                        {!addr.isDefault ? (
                          <button
                            onClick={() => setDefaultAddress(addr.id)}
                            className="text-[#C5A059] font-semibold hover:underline"
                          >
                            Set as Default
                          </button>
                        ) : (
                          <span className="text-emerald-700 font-semibold flex items-center">
                            <CheckCircle className="w-3.5 h-3.5 mr-1" /> Primary Destination
                          </span>
                        )}

                        <button
                          onClick={() => deleteAddress(addr.id)}
                          className="text-stone-400 hover:text-red-600 p-1"
                        >
                          <Trash2 className="w-4 h-4" />
                        </button>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            )}

            {/* TAB: Profile Settings */}
            {activeTab === 'profile' && (
              <div className="bg-white rounded-2xl border border-stone-200 p-6 sm:p-8 shadow-xs max-w-xl">
                <h2 className="font-cinzel text-xl font-bold text-stone-900 mb-4">
                  Patron Profile Information
                </h2>

                {profileSaved && (
                  <div className="mb-4 p-3 rounded-xl bg-emerald-50 border border-emerald-200 text-emerald-800 text-xs flex items-center space-x-2">
                    <CheckCircle className="w-4 h-4" />
                    <span>Profile settings updated successfully!</span>
                  </div>
                )}

                <form onSubmit={handleProfileSave} className="space-y-4 text-xs">
                  <div>
                    <label className="block font-semibold text-stone-700 uppercase tracking-wider mb-1">
                      Full Legal Name
                    </label>
                    <input
                      type="text"
                      value={nameInput}
                      onChange={e => setNameInput(e.target.value)}
                      className="w-full px-3 py-2 text-sm rounded-xl border border-neutral-300 focus:outline-none focus:border-black"
                    />
                  </div>

                  <div>
                    <label className="block font-semibold text-neutral-700 uppercase tracking-wider mb-1">
                      Primary Contact Number
                    </label>
                    <input
                      type="tel"
                      value={phoneInput}
                      onChange={e => setPhoneInput(e.target.value)}
                      className="w-full px-3 py-2 text-sm rounded-xl border border-neutral-300 focus:outline-none focus:border-black"
                    />
                  </div>

                  <div>
                    <label className="block font-semibold text-neutral-700 uppercase tracking-wider mb-1">
                      Account Email
                    </label>
                    <input
                      type="email"
                      disabled
                      value={user?.email || 'patron@velmira.in'}
                      className="w-full px-3 py-2 text-sm rounded-xl border border-neutral-200 bg-neutral-100 text-[#777777] cursor-not-allowed"
                    />
                    <p className="text-[10px] text-[#777777] mt-1">Contact concierge to update your registered email ID.</p>
                  </div>

                  <button
                    type="submit"
                    className="mt-2 px-6 py-2.5 bg-[#111111] text-white font-medium text-xs uppercase tracking-wider hover:bg-neutral-800 transition"
                  >
                    Save Changes
                  </button>
                </form>
              </div>
            )}

            {/* TAB: Returns & Refunds */}
            {activeTab === 'returns' && (
              <div className="bg-white rounded-2xl border border-stone-200 p-6 sm:p-8 shadow-xs">
                <h2 className="font-cinzel text-xl font-bold text-stone-900 mb-2">
                  7-Day White-Glove Returns Privilege
                </h2>
                <p className="text-xs text-stone-500 mb-6">
                  Items must be returned with intact brand tags, security ribbons, and in original luxury box packaging.
                </p>

                <div className="p-4 rounded-xl bg-amber-50 border border-amber-200 text-xs text-amber-900 space-y-2">
                  <p className="font-bold">Return Pickup Process:</p>
                  <p>1. Submit a return request on any delivered item within 7 days.</p>
                  <p>2. Our BlueDart concierge conducts doorstep inspection and takes custody.</p>
                  <p>3. 100% refund initiated back to your original source account within 24 hours.</p>
                </div>
              </div>
            )}
          </div>
        </div>
      </div>

      {/* Return Request Modal */}
      {returnOrderId && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/60 backdrop-blur-sm">
          <div className="bg-white rounded-2xl p-6 max-w-md w-full shadow-2xl border border-stone-200 text-xs">
            <h3 className="font-cinzel text-lg font-bold text-stone-900 mb-2">
              Request Return for Order {returnOrderId}
            </h3>
            {returnSubmitted ? (
              <div className="py-6 text-center text-emerald-700">
                <CheckCircle className="w-10 h-10 mx-auto mb-2" />
                <p className="font-bold text-sm">Return Request Logged</p>
                <p className="text-stone-500 mt-1">Our courier team will contact you for pickup scheduling.</p>
              </div>
            ) : (
              <form onSubmit={handleReturnSubmit} className="space-y-4">
                <div>
                  <label className="block font-semibold text-stone-700 mb-1">Reason for Return</label>
                  <select
                    value={returnReason}
                    onChange={e => setReturnReason(e.target.value)}
                    className="w-full px-3 py-2 rounded-lg border border-stone-300"
                  >
                    <option value="Size did not fit as expected">Size did not fit as expected</option>
                    <option value="Quality did not match expectations">Quality did not match expectations</option>
                    <option value="Color shade differed from photograph">Color shade differed from photograph</option>
                    <option value="Changed mind / No longer required">Changed mind / No longer required</option>
                  </select>
                </div>
                <div className="flex gap-2 justify-end">
                  <button
                    type="button"
                    onClick={() => setReturnOrderId(null)}
                    className="px-4 py-2 rounded-lg bg-stone-200 text-stone-700 font-semibold"
                  >
                    Cancel
                  </button>
                  <button
                    type="submit"
                    className="px-4 py-2 bg-[#111111] text-white font-medium text-xs uppercase tracking-wider hover:bg-neutral-800 transition"
                  >
                    Confirm Return
                  </button>
                </div>
              </form>
            )}
          </div>
        </div>
      )}

      {/* Invoice Modal */}
      <InvoiceModal
        order={selectedOrderForInvoice}
        isOpen={!!selectedOrderForInvoice}
        onClose={() => setSelectedOrderForInvoice(null)}
      />

      {/* Track Order Modal */}
      <TrackOrderModal
        order={selectedOrderForTrack}
        isOpen={!!selectedOrderForTrack}
        onClose={() => setSelectedOrderForTrack(null)}
      />
    </div>
  );
};
