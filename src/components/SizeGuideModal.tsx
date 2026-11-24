import React from 'react';
import { X, Ruler, Watch, Compass } from 'lucide-react';

interface SizeGuideModalProps {
  isOpen: boolean;
  onClose: () => void;
  category?: string;
}

export const SizeGuideModal: React.FC<SizeGuideModalProps> = ({ isOpen, onClose }) => {
  if (!isOpen) return null;

  const watchSizes = [
    { size: '36mm - 38mm', wrist: '13cm - 16cm (5.0" - 6.3")', style: 'Ultra-Thin Bauhaus / Vintage Classic (Slim Wrist & Unisex)' },
    { size: '39mm - 40mm', wrist: '15cm - 18cm (6.0" - 7.1")', style: 'Executive Boardroom & Moonphase Dress' },
    { size: '41mm - 42mm', wrist: '17cm - 20cm (6.7" - 7.9")', style: 'Contemporary Standard (Automatic Chronographs & Tourbillons)' },
    { size: '43mm - 44mm+', wrist: '18.5cm+ (7.3"+)', style: 'Commanding Presence (300M Diver & Titanium Pilot Aviator)' }
  ];

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/80 backdrop-blur-sm animate-in fade-in duration-200">
      <div className="relative w-full max-w-xl bg-[#111111] text-white rounded-2xl shadow-2xl border border-stone-800 overflow-hidden">
        {/* Header */}
        <div className="bg-[#0A0A0A] p-5 flex items-center justify-between border-b border-stone-800">
          <div className="flex items-center space-x-2.5">
            <Watch className="w-5 h-5 text-[#D4AF37]" />
            <div>
              <h3 className="font-cinzel text-base sm:text-lg font-bold tracking-wide text-white">
                Horology Dial & Case Dimensions Guide
              </h3>
              <p className="text-[11px] text-stone-400">Swiss dial diameter & wrist circumference standards</p>
            </div>
          </div>
          <button
            onClick={onClose}
            className="p-1 rounded-full text-stone-400 hover:text-white hover:bg-stone-800 transition"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Content */}
        <div className="p-6">
          <div className="overflow-x-auto border border-stone-800 rounded-xl bg-black/40">
            <table className="w-full text-left text-xs">
              <thead className="bg-[#171717] text-stone-300 border-b border-stone-800 font-semibold uppercase tracking-wider text-[11px]">
                <tr>
                  <th className="p-3">Dial Diameter</th>
                  <th className="p-3">Recommended Wrist</th>
                  <th className="p-3">Aesthetic Profile</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-stone-800/80 font-mono">
                {watchSizes.map((row, idx) => (
                  <tr key={idx} className="hover:bg-stone-900/60 transition">
                    <td className="p-3 font-semibold text-[#D4AF37]">{row.size}</td>
                    <td className="p-3 text-stone-300">{row.wrist}</td>
                    <td className="p-3 font-sans text-stone-400 text-[11px]">{row.style}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>

          <div className="mt-5 p-4 rounded-xl bg-stone-900/60 border border-stone-800/80 flex items-start space-x-3 text-xs text-stone-400">
            <Compass className="w-4 h-4 text-[#D4AF37] shrink-0 mt-0.5" />
            <div className="leading-relaxed">
              <strong className="text-white">Lug-to-Lug Fit Tip:</strong> Ensure that the watch lugs do not overhang your wrist edges. For slim wrists (under 6.5 inches), 38mm to 40mm dials offer perfect proportions. All Velmira bracelets include micro-adjust links.
            </div>
          </div>

          <div className="mt-6 flex justify-end">
            <button
              onClick={onClose}
              className="px-6 py-2 rounded-full bg-[#D4AF37] text-black font-cinzel text-xs font-bold uppercase tracking-wider hover:bg-[#c5a059] transition"
            >
              Understood
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};
