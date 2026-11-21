import React, { useState } from 'react';
import { useParams, Link } from 'react-router-dom';
import { CheckCircle2, Package, Printer, Truck, ArrowRight, ShieldCheck, MapPin } from 'lucide-react';
import { useShop } from '../context/ShopContext';
import { InvoiceModal } from '../components/InvoiceModal';
import { TrackOrderModal } from '../components/TrackOrderModal';

export const OrderConfirmationPage: React.FC = () => {
  const { id } = useParams<{ id: string }>();
  const { orders } = useShop();

  const [isInvoiceOpen, setIsInvoiceOpen] = useState(false);
  const [isTrackOpen, setIsTrackOpen] = useState(false);

  const order = orders.find(o => o.id === id) || orders[0];

  return (
    <div className="min-h-screen bg-[#F8F9FA] py-12 sm:py-16">
      <div className="max-w-3xl mx-auto px-4 sm:px-6">
        <div className="bg-white rounded-3xl border border-stone-200 p-8 sm:p-12 shadow-sm text-center">
          {/* Animated Gold Checkmark */}
          <div className="w-20 h-20 rounded-full bg-emerald-50 border-2 border-emerald-500 text-emerald-600 flex items-center justify-center mx-auto mb-6 shadow-inner animate-in zoom-in duration-300">
            <CheckCircle2 className="w-10 h-10" />
          </div>

          <span className="text-[11px] font-bold uppercase tracking-[0.25em] text-[#D4AF37]">
            ORDER CONFIRMED & REGISTERED
          </span>
          <h1 className="font-cinzel text-2xl sm:text-4xl font-extrabold text-stone-900 tracking-wide mt-1">
            Thank You For Your Patronage
          </h1>
          <p className="text-xs sm:text-sm text-stone-500 mt-2 max-w-md mx-auto">
            Your luxury consignment has been booked and scheduled for white-glove inspection & air express dispatch.
          </p>

          {/* Order Details Strip */}
          <div className="mt-8 p-6 rounded-2xl bg-[#FAFAF8] border border-stone-200 text-left grid grid-cols-1 sm:grid-cols-3 gap-4 text-xs">
            <div>
              <span className="text-stone-400 block font-semibold uppercase text-[10px]">Order Reference</span>
              <span className="font-mono font-bold text-stone-900 text-sm mt-0.5 block">{order?.id || id}</span>
            </div>
            <div>
              <span className="text-stone-400 block font-semibold uppercase text-[10px]">Estimated Doorstep Handover</span>
              <span className="font-bold text-stone-900 text-sm mt-0.5 block">{order?.estimatedDelivery || 'Within 3-4 Days'}</span>
            </div>
            <div>
              <span className="text-stone-400 block font-semibold uppercase text-[10px]">Total Amount Paid</span>
              <span className="font-mono font-bold text-stone-900 text-sm mt-0.5 block">
                ₹{order?.totalAmount?.toLocaleString('en-IN') || '—'}
              </span>
            </div>
          </div>

          {/* Action Buttons */}
          <div className="mt-8 flex flex-wrap items-center justify-center gap-3">
            <a
              href={`https://wa.me/971556787854?text=${encodeURIComponent(`Hello Velmira Dispatch, I am inquiring about my Order ID: ${order?.id || id}`)}`}
              target="_blank"
              rel="noreferrer"
              className="px-6 py-3 rounded-full bg-emerald-600 hover:bg-emerald-700 text-white font-bold text-xs uppercase tracking-widest transition flex items-center space-x-2 shadow-md"
            >
              <span>Message on WhatsApp (+971 55 678 7854)</span>
            </a>

            <button
              onClick={() => setIsTrackOpen(true)}
              className="px-6 py-3 rounded-full bg-[#0F0F0F] text-[#D4AF37] font-bold text-xs uppercase tracking-widest hover:bg-stone-800 transition flex items-center space-x-2 shadow-sm"
            >
              <Truck className="w-4 h-4" />
              <span>Track Consignment</span>
            </button>

            <button
              onClick={() => setIsInvoiceOpen(true)}
              className="px-6 py-3 rounded-full bg-white border border-stone-300 text-stone-800 font-semibold text-xs uppercase tracking-widest hover:bg-stone-50 transition flex items-center space-x-2 shadow-xs"
            >
              <Printer className="w-4 h-4" />
              <span>Tax Invoice</span>
            </button>

            <Link
              to="/products"
              className="px-6 py-3 rounded-full bg-stone-100 hover:bg-stone-200 text-stone-800 font-semibold text-xs uppercase tracking-widest transition flex items-center space-x-2"
            >
              <span>Continue Shopping</span>
              <ArrowRight className="w-4 h-4" />
            </Link>
          </div>

          {/* Delivery Address summary */}
          {order?.shippingAddress && (
            <div className="mt-10 pt-6 border-t border-stone-100 text-left text-xs text-stone-500 max-w-md mx-auto">
              <div className="flex items-center space-x-1.5 font-bold text-stone-800 mb-1">
                <MapPin className="w-3.5 h-3.5 text-[#D4AF37]" />
                <span>Shipping Destination:</span>
              </div>
              <p className="text-stone-700 font-medium">{order.shippingAddress.fullName}</p>
              <p>{order.shippingAddress.addressLine1}, {order.shippingAddress.city}, {order.shippingAddress.state} - {order.shippingAddress.pincode}</p>
            </div>
          )}
        </div>
      </div>

      {/* Invoice Modal */}
      <InvoiceModal
        order={order}
        isOpen={isInvoiceOpen}
        onClose={() => setIsInvoiceOpen(false)}
      />

      {/* Track Order Modal */}
      <TrackOrderModal
        order={order}
        isOpen={isTrackOpen}
        onClose={() => setIsTrackOpen(false)}
      />
    </div>
  );
};
