import React from 'react';
import { useCurrency } from '../context/CurrencyContext';
import { X } from 'lucide-react';

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
    <div className="fixed inset-0 z-[9998] bg-black/40 backdrop-blur-xs flex items-center justify-center p-4">
      <div className="relative w-full max-w-sm bg-white border border-neutral-200 p-6 sm:p-7 text-center shadow-2xl text-[#111111]">
        {/* Subtle Close Button */}
        <button
          onClick={onClose}
          className="absolute top-3.5 right-3.5 text-neutral-400 hover:text-black transition p-1"
          aria-label="Close"
        >
          <X className="w-4 h-4" />
        </button>

        {/* Brand */}
        <h2 className="font-serif text-lg font-bold tracking-[0.25em] text-[#111111]">
          VELMIRA
        </h2>

        <p className="text-xs text-[#64748B] mt-2 mb-6">
          Select your destination to view curated timepieces and pricing.
        </p>

        {/* Two Minimal Choice Buttons */}
        <div className="grid grid-cols-2 gap-3">
          <button
            onClick={() => handleSelectCountry('India')}
            className={`py-3.5 px-4 border text-xs font-semibold tracking-wider transition-all duration-200 flex flex-col items-center justify-center space-y-1.5 ${
              country === 'India'
                ? 'bg-[#111111] text-white border-[#111111] font-bold shadow-md'
                : 'bg-[#F8F9FA] text-[#111111] border-neutral-200 hover:border-black'
            }`}
          >
            <span className="text-2xl">🇮🇳</span>
            <span className="text-xs font-bold uppercase tracking-wider">India</span>
            <span className="text-[10px] font-mono text-neutral-500">₹ INR</span>
          </button>

          <button
            onClick={() => handleSelectCountry('UAE')}
            className={`py-3.5 px-4 border text-xs font-semibold tracking-wider transition-all duration-200 flex flex-col items-center justify-center space-y-1.5 ${
              country === 'UAE'
                ? 'bg-[#111111] text-white border-[#111111] font-bold shadow-md'
                : 'bg-[#F8F9FA] text-[#111111] border-neutral-200 hover:border-black'
            }`}
          >
            <span className="text-2xl">🇦🇪</span>
            <span className="text-xs font-bold uppercase tracking-wider">UAE</span>
            <span className="text-[10px] font-mono text-neutral-500">AED د.إ</span>
          </button>
        </div>

        <p className="text-[10px] text-neutral-400 mt-5">
          Insured White-Glove Cargo Handling Included
        </p>
      </div>
    </div>
  );
};
