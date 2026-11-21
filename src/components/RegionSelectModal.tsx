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
    <div className="fixed inset-0 z-[9998] bg-black/75 backdrop-blur-sm flex items-center justify-center p-4">
      <div className="relative w-full max-w-sm bg-[#111111] border border-stone-800 rounded-2xl p-6 sm:p-7 text-center shadow-2xl text-white">
        {/* Subtle Close Button */}
        <button
          onClick={onClose}
          className="absolute top-3.5 right-3.5 text-stone-500 hover:text-white transition p-1"
          aria-label="Close"
        >
          <X className="w-4 h-4" />
        </button>

        {/* Brand */}
        <h2 className="font-cinzel text-lg font-bold tracking-widest text-[#D4AF37]">
          VELMIRA
        </h2>

        <p className="text-xs text-stone-300 mt-2 mb-6">
          Are you shopping from <strong className="text-white">India</strong> or the <strong className="text-white">UAE</strong>?
        </p>

        {/* Two Minimal Choice Buttons */}
        <div className="grid grid-cols-2 gap-3">
          <button
            onClick={() => handleSelectCountry('India')}
            className={`py-3.5 px-4 rounded-xl border text-xs font-semibold font-cinzel tracking-wider transition-all duration-200 flex flex-col items-center justify-center space-y-1.5 ${
              country === 'India'
                ? 'bg-[#D4AF37] text-black border-[#D4AF37] font-bold shadow-md'
                : 'bg-stone-900/80 text-stone-200 border-stone-800 hover:border-[#D4AF37] hover:text-[#D4AF37]'
            }`}
          >
            <span className="text-2xl">🇮🇳</span>
            <span className="text-xs font-bold">India</span>
            <span className="text-[10px] font-mono opacity-80">₹ INR</span>
          </button>

          <button
            onClick={() => handleSelectCountry('UAE')}
            className={`py-3.5 px-4 rounded-xl border text-xs font-semibold font-cinzel tracking-wider transition-all duration-200 flex flex-col items-center justify-center space-y-1.5 ${
              country === 'UAE'
                ? 'bg-[#D4AF37] text-black border-[#D4AF37] font-bold shadow-md'
                : 'bg-stone-900/80 text-stone-200 border-stone-800 hover:border-[#D4AF37] hover:text-[#D4AF37]'
            }`}
          >
            <span className="text-2xl">🇦🇪</span>
            <span className="text-xs font-bold">UAE</span>
            <span className="text-[10px] font-mono opacity-80">AED (د.إ)</span>
          </button>
        </div>
      </div>
    </div>
  );
};
