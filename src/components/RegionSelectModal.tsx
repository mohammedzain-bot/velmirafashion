import React from 'react';
import { useCurrency } from '../context/CurrencyContext';
import { Check, ShieldCheck, Truck, MessageSquare, X } from 'lucide-react';
import { OFFICIAL_WHATSAPP_NUMBER } from '../utils/whatsapp';

interface RegionSelectModalProps {
  isOpen: boolean;
  onClose: () => void;
}

export const RegionSelectModal: React.FC<RegionSelectModalProps> = ({ isOpen, onClose }) => {
  const { country, setRegion } = useCurrency();

  if (!isOpen) return null;

  const handleSelectCountry = (selectedCountry: 'India' | 'UAE') => {
    setRegion(selectedCountry);
    onClose();
  };

  return (
    <div className="fixed inset-0 z-[9998] bg-black/80 backdrop-blur-md flex items-center justify-center p-4 animate-fade-in">
      <div className="relative w-full max-w-lg bg-[#121212] border border-[#D4AF37]/50 rounded-3xl shadow-[0_20px_60px_rgba(0,0,0,0.9)] overflow-hidden text-white my-8">
        {/* Top Gold Gradient Trim */}
        <div className="h-1.5 bg-gradient-to-r from-[#997B28] via-[#F3E5AB] to-[#C5A059]" />

        {/* Close Button */}
        <button
          onClick={onClose}
          className="absolute top-4 right-4 p-1.5 rounded-full text-stone-400 hover:text-white hover:bg-stone-800 transition"
          aria-label="Close"
        >
          <X className="w-4 h-4" />
        </button>

        <div className="p-6 sm:p-8">
          {/* Brand Header */}
          <div className="text-center mb-6">
            <span className="inline-block text-[10px] font-bold tracking-[0.3em] uppercase text-[#D4AF37] border border-[#D4AF37]/40 px-3 py-0.5 rounded-full mb-3 bg-[#D4AF37]/5">
              Destination & Currency
            </span>
            <h2 className="font-cinzel text-xl sm:text-2xl font-bold tracking-wider text-white">
              WELCOME TO VELMIRA
            </h2>
            <div className="w-16 h-0.5 bg-[#D4AF37] mx-auto my-2" />
            <p className="text-xs sm:text-sm text-stone-300 font-sans mt-2">
              Are you shopping from <span className="text-[#D4AF37] font-bold">INDIA</span> or <span className="text-[#D4AF37] font-bold">UAE</span>?
            </p>
            <p className="text-[11px] text-stone-400 mt-1">
              Select your location to view authentic timepieces & bags with regional pricing and direct WhatsApp dispatch.
            </p>
          </div>

          {/* Destination Selection Cards */}
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 mb-6">
            {/* 1. INDIA OPTION */}
            <button
              onClick={() => handleSelectCountry('India')}
              className={`group relative text-left p-5 rounded-2xl border-2 transition-all duration-300 ${
                country === 'India'
                  ? 'bg-gradient-to-b from-[#1C1C1C] to-[#141414] border-[#D4AF37] shadow-[0_0_20px_rgba(212,175,55,0.25)]'
                  : 'bg-[#181818] border-stone-800 hover:border-[#D4AF37]/60 hover:bg-[#1E1E1E]'
              }`}
            >
              <div className="flex items-center justify-between mb-3">
                <span className="text-3xl" role="img" aria-label="India Flag">🇮🇳</span>
                {country === 'India' && (
                  <span className="flex items-center space-x-1 text-[10px] font-bold bg-[#D4AF37] text-black px-2 py-0.5 rounded-full">
                    <Check className="w-3 h-3" />
                    <span>Selected</span>
                  </span>
                )}
              </div>
              <h3 className="font-cinzel text-base font-bold text-white group-hover:text-[#D4AF37] transition">
                INDIA
              </h3>
              <p className="text-xs font-mono font-bold text-[#D4AF37] mt-0.5">
                Currency: INR (₹)
              </p>
              <div className="mt-3 pt-3 border-t border-stone-800/80 space-y-1.5 text-[10px] text-stone-300">
                <div className="flex items-center space-x-1.5">
                  <Truck className="w-3 h-3 text-[#D4AF37]" />
                  <span>All-India Express Delivery</span>
                </div>
                <div className="flex items-center space-x-1.5">
                  <MessageSquare className="w-3 h-3 text-emerald-400" />
                  <span>WhatsApp Order Routing</span>
                </div>
              </div>
              <div className="mt-4 w-full py-2 px-3 rounded-xl bg-stone-900 group-hover:bg-[#D4AF37] group-hover:text-black text-center text-xs font-bold font-cinzel tracking-wider transition">
                Shop in India (₹)
              </div>
            </button>

            {/* 2. UAE OPTION */}
            <button
              onClick={() => handleSelectCountry('UAE')}
              className={`group relative text-left p-5 rounded-2xl border-2 transition-all duration-300 ${
                country === 'UAE'
                  ? 'bg-gradient-to-b from-[#1C1C1C] to-[#141414] border-[#D4AF37] shadow-[0_0_20px_rgba(212,175,55,0.25)]'
                  : 'bg-[#181818] border-stone-800 hover:border-[#D4AF37]/60 hover:bg-[#1E1E1E]'
              }`}
            >
              <div className="flex items-center justify-between mb-3">
                <span className="text-3xl" role="img" aria-label="UAE Flag">🇦🇪</span>
                {country === 'UAE' && (
                  <span className="flex items-center space-x-1 text-[10px] font-bold bg-[#D4AF37] text-black px-2 py-0.5 rounded-full">
                    <Check className="w-3 h-3" />
                    <span>Selected</span>
                  </span>
                )}
              </div>
              <h3 className="font-cinzel text-base font-bold text-white group-hover:text-[#D4AF37] transition">
                UAE
              </h3>
              <p className="text-xs font-mono font-bold text-[#D4AF37] mt-0.5">
                Currency: AED (د.إ)
              </p>
              <div className="mt-3 pt-3 border-t border-stone-800/80 space-y-1.5 text-[10px] text-stone-300">
                <div className="flex items-center space-x-1.5">
                  <Truck className="w-3 h-3 text-[#D4AF37]" />
                  <span>Dubai & 7 Emirates Dispatch</span>
                </div>
                <div className="flex items-center space-x-1.5">
                  <MessageSquare className="w-3 h-3 text-emerald-400" />
                  <span>WhatsApp Order Routing</span>
                </div>
              </div>
              <div className="mt-4 w-full py-2 px-3 rounded-xl bg-stone-900 group-hover:bg-[#D4AF37] group-hover:text-black text-center text-xs font-bold font-cinzel tracking-wider transition">
                Shop in UAE (AED)
              </div>
            </button>
          </div>

          {/* Trust Guarantees */}
          <div className="rounded-xl bg-[#0A0A0A] border border-stone-800 p-3 flex items-center justify-between text-[11px] text-stone-400">
            <div className="flex items-center space-x-2">
              <ShieldCheck className="w-4 h-4 text-[#D4AF37] shrink-0" />
              <span>100% Certified Authentic Watches & Leather Bags</span>
            </div>
            <span className="text-[10px] text-stone-500 hidden sm:inline">
              WhatsApp: {OFFICIAL_WHATSAPP_NUMBER}
            </span>
          </div>

          <p className="text-[10px] text-center text-stone-500 mt-4">
            You can also switch your country and currency anytime via the top header bar.
          </p>
        </div>
      </div>
    </div>
  );
};
