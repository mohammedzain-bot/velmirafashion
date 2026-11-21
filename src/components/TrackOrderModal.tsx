import React from 'react';
import { X, CheckCircle2, Clock, Truck, Package, ShieldCheck, MapPin } from 'lucide-react';
import { Order } from '../types';

interface TrackOrderModalProps {
  order: Order | null;
  isOpen: boolean;
  onClose: () => void;
}

export const TrackOrderModal: React.FC<TrackOrderModalProps> = ({ order, isOpen, onClose }) => {
  if (!isOpen || !order) return null;

  const defaultEvents = [
    {
      status: 'Placed',
      title: 'Order Confirmed & Payment Verified',
      location: 'Velmira Fulfillment Center, Mumbai',
      timestamp: new Date(order.orderDate).toLocaleString('en-IN', { dateStyle: 'medium', timeStyle: 'short' }),
      done: true
    },
    {
      status: 'Processing',
      title: 'Quality Inspected & Luxury Velvet Box Packing',
      location: 'Velmira Hub, Mumbai',
      timestamp: ['Processing', 'Shipped', 'Out for Delivery', 'Delivered'].includes(order.orderStatus)
        ? 'Completed'
        : 'Estimated Next 12 Hours',
      done: ['Processing', 'Shipped', 'Out for Delivery', 'Delivered'].includes(order.orderStatus)
    },
    {
      status: 'Shipped',
      title: 'Dispatched with BlueDart Luxury Express Cargo',
      location: 'Mumbai Air Freight Hub',
      timestamp: ['Shipped', 'Out for Delivery', 'Delivered'].includes(order.orderStatus)
        ? 'Completed'
        : 'Expected in 24 Hours',
      done: ['Shipped', 'Out for Delivery', 'Delivered'].includes(order.orderStatus)
    },
    {
      status: 'Out for Delivery',
      title: 'Consignment with Dedicated White-Glove Courier',
      location: `${order.shippingAddress.city} Regional Delivery Center`,
      timestamp: ['Out for Delivery', 'Delivered'].includes(order.orderStatus)
        ? 'In Progress'
        : 'Expected by ' + order.estimatedDelivery,
      done: ['Out for Delivery', 'Delivered'].includes(order.orderStatus)
    },
    {
      status: 'Delivered',
      title: 'Delivered & Handed to Recipient',
      location: `${order.shippingAddress.city}, ${order.shippingAddress.state}`,
      timestamp: order.orderStatus === 'Delivered' ? 'Completed' : 'Expected by ' + order.estimatedDelivery,
      done: order.orderStatus === 'Delivered'
    }
  ];

  const events = order.trackingEvents && order.trackingEvents.length > 0 ? order.trackingEvents : defaultEvents;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/60 backdrop-blur-sm animate-in fade-in duration-200">
      <div className="relative w-full max-w-2xl bg-white rounded-2xl shadow-2xl border border-stone-200 overflow-hidden">
        {/* Header */}
        <div className="bg-[#0F0F0F] text-white p-5 flex items-center justify-between">
          <div className="flex items-center space-x-2.5">
            <Truck className="w-5 h-5 text-[#D4AF37]" />
            <div>
              <h3 className="font-cinzel text-lg font-bold tracking-wide">
                Live Shipment Tracking — {order.id}
              </h3>
              <p className="text-xs text-stone-400">
                Courier: <strong className="text-[#D4AF37]">{order.courierPartner}</strong> | AWB: <span className="font-mono">{order.trackingNumber}</span>
              </p>
            </div>
          </div>
          <button
            onClick={onClose}
            className="p-1 rounded-full text-stone-400 hover:text-white hover:bg-stone-800 transition"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Status Badge Strip */}
        <div className="bg-[#FAFAF8] p-4 border-b border-stone-200 flex flex-wrap items-center justify-between gap-3 text-xs">
          <div>
            <span className="text-stone-500">Current Status:</span>{' '}
            <span className="font-bold text-stone-900 uppercase tracking-wide px-2 py-0.5 rounded bg-amber-100 text-amber-900 ml-1">
              {order.orderStatus}
            </span>
          </div>
          <div>
            <span className="text-stone-500">Estimated Delivery:</span>{' '}
            <span className="font-bold text-stone-900 ml-1">{order.estimatedDelivery}</span>
          </div>
          <div>
            <span className="text-stone-500">Destination:</span>{' '}
            <span className="font-bold text-stone-900 ml-1">
              {order.shippingAddress.city}, {order.shippingAddress.state} ({order.shippingAddress.pincode})
            </span>
          </div>
        </div>

        {/* Vertical Stepper Timeline */}
        <div className="p-6 max-h-[460px] overflow-y-auto">
          <div className="relative pl-6 space-y-6 before:absolute before:left-3 before:top-2 before:bottom-2 before:w-0.5 before:bg-stone-200">
            {events.map((evt, idx) => (
              <div key={idx} className="relative flex items-start group">
                {/* Node icon */}
                <div
                  className={`absolute -left-6 top-0 w-6 h-6 rounded-full flex items-center justify-center transition-all ${
                    evt.done
                      ? 'bg-emerald-600 text-white shadow-sm ring-4 ring-emerald-50'
                      : 'bg-stone-100 text-stone-400 border-2 border-stone-300'
                  }`}
                >
                  {evt.done ? <CheckCircle2 className="w-3.5 h-3.5" /> : <Clock className="w-3.5 h-3.5" />}
                </div>

                {/* Event Details */}
                <div className="ml-3">
                  <div className="flex items-center space-x-2">
                    <h4
                      className={`text-xs sm:text-sm font-bold ${
                        evt.done ? 'text-stone-900' : 'text-stone-500'
                      }`}
                    >
                      {evt.title}
                    </h4>
                    {evt.done && idx === events.filter(e => e.done).length - 1 && (
                      <span className="px-1.5 py-0.2 rounded text-[9px] font-bold uppercase bg-emerald-100 text-emerald-800 animate-pulse">
                        Current Stage
                      </span>
                    )}
                  </div>
                  <div className="flex items-center space-x-2 mt-1 text-[11px] text-stone-500">
                    <MapPin className="w-3 h-3 text-[#D4AF37]" />
                    <span>{evt.location}</span>
                    <span>•</span>
                    <span className="font-mono">{evt.timestamp}</span>
                  </div>
                </div>
              </div>
            ))}
          </div>

          {/* Package item overview */}
          <div className="mt-8 pt-4 border-t border-stone-200">
            <p className="text-[10px] font-bold uppercase tracking-wider text-stone-400 mb-3">
              Shipment Contents ({order.items.length} {order.items.length === 1 ? 'item' : 'items'})
            </p>
            <div className="space-y-2">
              {order.items.map((it, idx) => (
                <div key={idx} className="flex items-center space-x-3 p-2 rounded-lg bg-[#FAFAF8] border border-stone-200 text-xs">
                  <img src={it.image} alt={it.name} className="w-10 h-12 object-cover rounded border border-stone-200 shrink-0" />
                  <div className="flex-1 min-w-0">
                    <p className="font-bold text-stone-900 truncate">{it.name}</p>
                    <p className="text-[11px] text-stone-500">
                      Size: <span className="text-stone-700 font-semibold">{it.size}</span> | Qty: {it.quantity}
                    </p>
                  </div>
                  <span className="font-mono font-bold text-stone-900">
                    ₹{(it.price * it.quantity).toLocaleString('en-IN')}
                  </span>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
