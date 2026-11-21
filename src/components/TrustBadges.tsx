import React from 'react';
import { ShieldCheck, RotateCcw, Truck, Award } from 'lucide-react';

export const TrustBadges: React.FC = () => {
  const perks = [
    {
      icon: ShieldCheck,
      title: '100% Genuine Luxury',
      subtitle: 'Certified authentic brand merchandise directly from master artisans'
    },
    {
      icon: RotateCcw,
      title: '7-Day Easy Returns',
      subtitle: 'Hassle-free doorstep pickup & instant refund guarantee'
    },
    {
      icon: Truck,
      title: 'Free Express Delivery',
      subtitle: 'Complimentary insured shipping on all orders above ₹999'
    },
    {
      icon: Award,
      title: 'Velmira Privé Care',
      subtitle: '24/7 dedicated personal styling & concierge assistance'
    }
  ];

  return (
    <section className="border-y border-stone-200 bg-white py-8">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
          {perks.map((perk, idx) => {
            const Icon = perk.icon;
            return (
              <div
                key={idx}
                className="flex items-center space-x-4 p-4 rounded-xl bg-[#FAFAF8] border border-stone-100/80 hover:border-[#D4AF37]/40 hover:shadow-sm transition-all duration-300"
              >
                <div className="w-12 h-12 rounded-full bg-[#0F0F0F] text-[#D4AF37] flex items-center justify-center shrink-0 shadow-inner">
                  <Icon className="w-6 h-6" />
                </div>
                <div>
                  <h4 className="text-sm font-semibold text-stone-900 tracking-wide">{perk.title}</h4>
                  <p className="text-xs text-stone-500 mt-0.5 leading-relaxed">{perk.subtitle}</p>
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
};
