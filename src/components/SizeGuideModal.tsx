import React, { useState } from 'react';
import { X, Ruler, Watch, Briefcase } from 'lucide-react';

interface SizeGuideModalProps {
  isOpen: boolean;
  onClose: () => void;
  category?: string;
}

export const SizeGuideModal: React.FC<SizeGuideModalProps> = ({ isOpen, onClose, category }) => {
  const [guideTab, setGuideTab] = useState<'watches' | 'bags'>(
    category?.toLowerCase().includes('bag') ? 'bags' : 'watches'
  );

  if (!isOpen) return null;

  const watchSizes = [
    { size: '32mm - 34mm', wrist: '13cm - 16cm (5.0" - 6.3")', style: 'Petite / Classic Dress (Women / Slim Wrist)' },
    { size: '38mm - 40mm', wrist: '15cm - 18cm (6.0" - 7.1")', style: 'Midsize Elegance (Unisex / Business Formal)' },
    { size: '41mm - 42mm', wrist: '17cm - 20cm (6.7" - 7.9")', style: 'Contemporary Standard (Chronograph & Tourbillon)' },
    { size: '44mm+', wrist: '19cm+ (7.5"+)', style: 'Commanding / Oceanic Diver (Sport & Aviation)' }
  ];

  const bagSizes = [
    { type: 'Continental Wallet / Clutch', dims: '7.8" × 4.1" × 1.0"', capacity: 'Cards, Passport, iPhone Pro Max' },
    { type: 'Flap Crossbody Bag', dims: '10.0" × 7.0" × 3.5"', capacity: 'Cosmetics, Sunglasses, Keys, iPad Mini' },
    { type: 'Kelly Top Handle Bag', dims: '11.0" × 8.5" × 4.5"', capacity: 'Daily Essentials, Small Diary, iPad Air' },
    { type: 'Executive Saffiano Tote', dims: '14.0" × 11.0" × 5.0"', capacity: '14" MacBook Pro, Documents, Water Bottle' },
    { type: 'Grand Voyage Duffle', dims: '20.0" × 11.0" × 10.0"', capacity: 'Weekend Clothing (42L), Shoes, Toiletries' }
  ];

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/60 backdrop-blur-sm animate-in fade-in duration-200">
      <div className="relative w-full max-w-xl bg-white rounded-2xl shadow-2xl border border-stone-200 overflow-hidden">
        {/* Header */}
        <div className="bg-[#0F0F0F] text-white p-5 flex items-center justify-between">
          <div className="flex items-center space-x-2">
            <Ruler className="w-5 h-5 text-[#D4AF37]" />
            <div>
              <h3 className="font-cinzel text-lg font-bold tracking-wide">
                Horology & Leather Dimensions Guide
              </h3>
              <p className="text-[11px] text-stone-400">Precision case sizing & bag capacity standards</p>
            </div>
          </div>
          <button
            onClick={onClose}
            className="p-1 rounded-full text-stone-400 hover:text-white hover:bg-stone-800 transition"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Tab switch */}
        <div className="flex border-b border-stone-200 bg-[#FAFAF8]">
          <button
            onClick={() => setGuideTab('watches')}
            className={`flex-1 py-3 text-xs font-semibold uppercase tracking-wider flex items-center justify-center space-x-1.5 transition ${
              guideTab === 'watches'
                ? 'text-[#0F0F0F] border-b-2 border-[#D4AF37] bg-white font-bold'
                : 'text-stone-400 hover:text-stone-700'
            }`}
          >
            <Watch className="w-4 h-4" />
            <span>Timepiece Dial Sizing</span>
          </button>
          <button
            onClick={() => setGuideTab('bags')}
            className={`flex-1 py-3 text-xs font-semibold uppercase tracking-wider flex items-center justify-center space-x-1.5 transition ${
              guideTab === 'bags'
                ? 'text-[#0F0F0F] border-b-2 border-[#D4AF37] bg-white font-bold'
                : 'text-stone-400 hover:text-stone-700'
            }`}
          >
            <Briefcase className="w-4 h-4" />
            <span>Bag Dimensions & Capacity</span>
          </button>
        </div>

        {/* Content */}
        <div className="p-6">
          <div className="overflow-x-auto border border-stone-200 rounded-xl">
            {guideTab === 'watches' ? (
              <table className="w-full text-left text-xs">
                <thead className="bg-[#FAFAF8] text-stone-900 border-b border-stone-200 font-semibold uppercase tracking-wider text-[11px]">
                  <tr>
                    <th className="p-3">Dial Diameter</th>
                    <th className="p-3">Recommended Wrist Size</th>
                    <th className="p-3">Aesthetic Profile</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-stone-100 font-mono">
                  {watchSizes.map((row, idx) => (
                    <tr key={idx} className="hover:bg-amber-50/40">
                      <td className="p-3 font-semibold text-stone-900">{row.size}</td>
                      <td className="p-3 text-stone-700">{row.wrist}</td>
                      <td className="p-3 font-sans text-stone-600">{row.style}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            ) : (
              <table className="w-full text-left text-xs">
                <thead className="bg-[#FAFAF8] text-stone-900 border-b border-stone-200 font-semibold uppercase tracking-wider text-[11px]">
                  <tr>
                    <th className="p-3">Bag Silhouette</th>
                    <th className="p-3">Dimensions (L × H × W)</th>
                    <th className="p-3">Holds / Fits</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-stone-100 font-mono">
                  {bagSizes.map((row, idx) => (
                    <tr key={idx} className="hover:bg-amber-50/40">
                      <td className="p-3 font-sans font-semibold text-stone-900">{row.type}</td>
                      <td className="p-3 text-stone-700">{row.dims}</td>
                      <td className="p-3 font-sans text-stone-600">{row.capacity}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            )}
          </div>

          <div className="mt-4 p-3 rounded-xl bg-amber-50 border border-amber-200 text-xs text-amber-900 flex items-center justify-between">
            <span>
              Need tailored bracelet sizing or custom leather embossing?
            </span>
            <a
              href="https://wa.me/971556787854?text=Hello%20Velmira%20Concierge,%20I%20have%20a%20sizing%20question"
              target="_blank"
              rel="noreferrer"
              className="text-black font-bold underline ml-2"
            >
              Ask on WhatsApp
            </a>
          </div>
        </div>
      </div>
    </div>
  );
};
