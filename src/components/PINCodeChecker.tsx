import React, { useState } from 'react';
import { MapPin, CheckCircle, Truck, AlertCircle } from 'lucide-react';

export const PINCodeChecker: React.FC = () => {
  const [pincode, setPincode] = useState('');
  const [result, setResult] = useState<{
    valid: boolean;
    city?: string;
    deliveryDate?: string;
    codAvailable?: boolean;
    message?: string;
  } | null>(null);

  const checkPincode = (e: React.FormEvent) => {
    e.preventDefault();
    const cleanPin = pincode.trim();
    if (!/^\d{6}$/.test(cleanPin)) {
      setResult({
        valid: false,
        message: 'Please enter a valid 6-digit Indian PIN code'
      });
      return;
    }

    // Realistic delivery estimates
    const deliveryDate = new Date(Date.now() + 3 * 24 * 60 * 60 * 1000).toLocaleDateString('en-IN', {
      weekday: 'short',
      day: 'numeric',
      month: 'short'
    });

    let city = 'Metro Region';
    if (cleanPin.startsWith('400')) city = 'Mumbai';
    else if (cleanPin.startsWith('110')) city = 'New Delhi';
    else if (cleanPin.startsWith('560')) city = 'Bengaluru';
    else if (cleanPin.startsWith('600')) city = 'Chennai';
    else if (cleanPin.startsWith('700')) city = 'Kolkata';
    else if (cleanPin.startsWith('500')) city = 'Hyderabad';

    setResult({
      valid: true,
      city,
      deliveryDate,
      codAvailable: true
    });
  };

  return (
    <div className="p-4 rounded-xl bg-[#FAFAF8] border border-stone-200">
      <div className="flex items-center space-x-2 text-xs font-semibold text-stone-800 uppercase tracking-wider mb-2">
        <MapPin className="w-3.5 h-3.5 text-[#D4AF37]" />
        <span>Check Delivery Availability & Speed</span>
      </div>

      <form onSubmit={checkPincode} className="flex gap-2">
        <input
          type="text"
          maxLength={6}
          placeholder="Enter 6-digit PIN code (e.g. 400053)"
          value={pincode}
          onChange={e => setPincode(e.target.value.replace(/\D/g, ''))}
          className="flex-1 px-3 py-2 text-xs rounded-lg border border-stone-300 focus:outline-none focus:border-[#D4AF37] bg-white font-mono"
        />
        <button
          type="submit"
          className="px-4 py-2 bg-[#0F0F0F] text-[#D4AF37] hover:bg-stone-800 text-xs font-semibold uppercase tracking-wider rounded-lg transition"
        >
          Check
        </button>
      </form>

      {result && (
        <div className="mt-3 text-xs">
          {result.valid ? (
            <div className="space-y-1.5 p-2.5 rounded-lg bg-emerald-50/80 border border-emerald-200 text-emerald-900">
              <div className="flex items-center space-x-1.5 font-semibold">
                <CheckCircle className="w-4 h-4 text-emerald-600" />
                <span>Express Delivery to {result.city} ({pincode})</span>
              </div>
              <p className="text-[11px] text-stone-600 pl-5">
                • Expected Delivery by <strong className="text-stone-900">{result.deliveryDate}</strong>
              </p>
              <p className="text-[11px] text-stone-600 pl-5">
                • <strong className="text-emerald-700">Cash on Delivery Available</strong>
              </p>
              <p className="text-[11px] text-stone-600 pl-5">
                • Complimentary Shipping on orders over ₹999
              </p>
            </div>
          ) : (
            <div className="flex items-center space-x-1.5 text-red-600 text-[11px]">
              <AlertCircle className="w-4 h-4" />
              <span>{result.message}</span>
            </div>
          )}
        </div>
      )}
    </div>
  );
};
