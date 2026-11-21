import React, { useState } from 'react';
import { X, Ruler } from 'lucide-react';

interface SizeGuideModalProps {
  isOpen: boolean;
  onClose: () => void;
  category?: string;
}

export const SizeGuideModal: React.FC<SizeGuideModalProps> = ({ isOpen, onClose, category }) => {
  const [unit, setUnit] = useState<'inches' | 'cm'>('inches');

  if (!isOpen) return null;

  const isFootwear = category === 'Footwear';

  const clothingSizes = unit === 'inches' ? [
    { size: 'XS', bustChest: '34-36', waist: '28-30', hip: '36-38', length: '28' },
    { size: 'S', bustChest: '36-38', waist: '30-32', hip: '38-40', length: '29' },
    { size: 'M', bustChest: '38-40', waist: '32-34', hip: '40-42', length: '30' },
    { size: 'L', bustChest: '40-42', waist: '34-36', hip: '42-44', length: '31' },
    { size: 'XL', bustChest: '42-44', waist: '36-38', hip: '44-46', length: '32' },
    { size: 'XXL', bustChest: '44-46', waist: '38-40', hip: '46-48', length: '33' },
  ] : [
    { size: 'XS', bustChest: '86-91', waist: '71-76', hip: '91-96', length: '71' },
    { size: 'S', bustChest: '91-96', waist: '76-81', hip: '96-101', length: '74' },
    { size: 'M', bustChest: '96-101', waist: '81-86', hip: '101-106', length: '76' },
    { size: 'L', bustChest: '101-106', waist: '86-91', hip: '106-111', length: '79' },
    { size: 'XL', bustChest: '106-111', waist: '91-96', hip: '111-116', length: '81' },
    { size: 'XXL', bustChest: '111-117', waist: '96-101', hip: '116-122', length: '84' },
  ];

  const footwearSizes = [
    { uk: 'UK 6', eu: 'EU 40', us: 'US 7', footLength: unit === 'inches' ? '9.8"' : '25.0 cm' },
    { uk: 'UK 7', eu: 'EU 41', us: 'US 8', footLength: unit === 'inches' ? '10.2"' : '26.0 cm' },
    { uk: 'UK 8', eu: 'EU 42', us: 'US 9', footLength: unit === 'inches' ? '10.6"' : '27.0 cm' },
    { uk: 'UK 9', eu: 'EU 43', us: 'US 10', footLength: unit === 'inches' ? '11.0"' : '28.0 cm' },
    { uk: 'UK 10', eu: 'EU 44', us: 'US 11', footLength: unit === 'inches' ? '11.4"' : '29.0 cm' },
    { uk: 'UK 11', eu: 'EU 45', us: 'US 12', footLength: unit === 'inches' ? '11.8"' : '30.0 cm' },
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
                {isFootwear ? 'Footwear Measurement Guide' : 'Couture Size & Measurement Guide'}
              </h3>
              <p className="text-[11px] text-stone-400">Standard tailored fit specifications</p>
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
          <div className="flex justify-end mb-4">
            <div className="inline-flex rounded-lg border border-stone-300 p-0.5 bg-stone-100 text-xs font-semibold">
              <button
                onClick={() => setUnit('inches')}
                className={`px-3 py-1 rounded-md transition ${
                  unit === 'inches' ? 'bg-[#0F0F0F] text-white shadow-xs' : 'text-stone-600 hover:text-black'
                }`}
              >
                Inches
              </button>
              <button
                onClick={() => setUnit('cm')}
                className={`px-3 py-1 rounded-md transition ${
                  unit === 'cm' ? 'bg-[#0F0F0F] text-white shadow-xs' : 'text-stone-600 hover:text-black'
                }`}
              >
                Centimeters
              </button>
            </div>
          </div>

          <div className="overflow-x-auto border border-stone-200 rounded-xl">
            {isFootwear ? (
              <table className="w-full text-left text-xs">
                <thead className="bg-[#FAFAF8] text-stone-900 border-b border-stone-200 font-semibold uppercase tracking-wider text-[11px]">
                  <tr>
                    <th className="p-3">UK / India</th>
                    <th className="p-3">EU</th>
                    <th className="p-3">US</th>
                    <th className="p-3">Foot Length</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-stone-100 font-mono">
                  {footwearSizes.map((row, idx) => (
                    <tr key={idx} className="hover:bg-amber-50/40">
                      <td className="p-3 font-semibold text-stone-900">{row.uk}</td>
                      <td className="p-3 text-stone-600">{row.eu}</td>
                      <td className="p-3 text-stone-600">{row.us}</td>
                      <td className="p-3 text-stone-900 font-medium">{row.footLength}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            ) : (
              <table className="w-full text-left text-xs">
                <thead className="bg-[#FAFAF8] text-stone-900 border-b border-stone-200 font-semibold uppercase tracking-wider text-[11px]">
                  <tr>
                    <th className="p-3">Standard Size</th>
                    <th className="p-3">Bust / Chest</th>
                    <th className="p-3">Waist</th>
                    <th className="p-3">Hip</th>
                    <th className="p-3">Length</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-stone-100 font-mono">
                  {clothingSizes.map((row, idx) => (
                    <tr key={idx} className="hover:bg-amber-50/40">
                      <td className="p-3 font-semibold text-stone-900">{row.size}</td>
                      <td className="p-3 text-stone-700">{row.bustChest}</td>
                      <td className="p-3 text-stone-700">{row.waist}</td>
                      <td className="p-3 text-stone-700">{row.hip}</td>
                      <td className="p-3 text-stone-700">{row.length}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            )}
          </div>

          <p className="text-[11px] text-stone-500 mt-4 leading-relaxed">
            * Note: If you fall between two sizes, we recommend selecting the larger size for a relaxed luxury drape or opting for our complimentary custom tailoring service upon ordering.
          </p>
        </div>
      </div>
    </div>
  );
};
