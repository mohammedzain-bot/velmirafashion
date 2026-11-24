import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { Mail, MapPin, Check, ArrowRight, MessageCircle } from 'lucide-react';
import { OFFICIAL_WHATSAPP_NUMBER, WHATSAPP_RAW_NUMBER } from '../utils/whatsapp';

export const Footer: React.FC = () => {
  const [newsletterEmail, setNewsletterEmail] = useState('');
  const [isSubscribed, setIsSubscribed] = useState(false);

  const handleSubscribe = (e: React.FormEvent) => {
    e.preventDefault();
    if (newsletterEmail.trim()) {
      setIsSubscribed(true);
      setNewsletterEmail('');
    }
  };

  return (
    <footer className="bg-[#FAFAFA] text-[#111111] border-t border-stone-200 pt-16 pb-12">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Top Newsletter Strip (Clean White Box) */}
        <div className="bg-white p-8 sm:p-10 border border-stone-200 mb-14 flex flex-col lg:flex-row items-center justify-between gap-6">
          <div className="max-w-xl text-center lg:text-left">
            <span className="text-[10px] font-bold uppercase tracking-[0.3em] text-[#777777] block mb-1">
              VELMIRA ATELIER
            </span>
            <h3 className="font-cinzel text-xl sm:text-2xl font-bold text-[#111111] tracking-wide">
              Receive Private Watch Release Previews
            </h3>
            <p className="text-xs text-[#777777] mt-1.5 leading-relaxed">
              Subscribe for private vault access to limited edition automatic timepieces, flying tourbillons, and collector allocations.
            </p>
          </div>

          <div className="w-full lg:w-auto">
            {isSubscribed ? (
              <div className="flex items-center space-x-2 text-black bg-stone-100 border border-stone-300 px-5 py-3 text-xs font-semibold">
                <Check className="w-4 h-4" />
                <span>You are registered for Velmira Privé watch allocations.</span>
              </div>
            ) : (
              <form onSubmit={handleSubscribe} className="flex flex-col sm:flex-row gap-2 w-full max-w-md">
                <input
                  type="email"
                  required
                  placeholder="Enter your VIP email address..."
                  value={newsletterEmail}
                  onChange={e => setNewsletterEmail(e.target.value)}
                  className="bg-white text-black placeholder-stone-400 text-xs px-4 py-3 border border-stone-300 focus:outline-none focus:border-black flex-1"
                />
                <button
                  type="submit"
                  className="px-6 py-3 bg-[#111111] text-white hover:bg-black font-cinzel text-xs font-bold uppercase tracking-widest transition flex items-center justify-center space-x-2 shrink-0"
                >
                  <span>Join Privé</span>
                  <ArrowRight className="w-3.5 h-3.5" />
                </button>
              </form>
            )}
          </div>
        </div>

        {/* Links Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-8 sm:gap-10 pb-12 border-b border-stone-200">
          {/* Brand Info */}
          <div className="lg:col-span-2 space-y-4">
            <Link to="/" className="inline-block">
              <span className="font-cinzel text-2xl font-black tracking-[0.18em] text-[#111111] block">
                VELMIRA
              </span>
              <span className="text-[9px] font-medium tracking-[0.3em] text-[#777777] uppercase -mt-0.5 block font-sans">
                Haute Horlogerie Ateliers
              </span>
            </Link>
            <p className="text-xs text-[#777777] leading-relaxed max-w-sm">
              Velmira is an independent luxury watch atelier dedicated strictly to mechanical precision, high-beat automatic movements, and timeless craftsmanship. Direct white-glove delivery across India and the United Arab Emirates.
            </p>
            <div className="space-y-2 text-xs text-stone-600 pt-2">
              <div className="flex items-center space-x-2">
                <MessageCircle className="w-4 h-4 text-emerald-700 shrink-0" />
                <span>WhatsApp Concierge: <strong className="text-black font-mono">{OFFICIAL_WHATSAPP_NUMBER}</strong></span>
              </div>
              <div className="flex items-center space-x-2">
                <MapPin className="w-4 h-4 text-stone-800 shrink-0" />
                <span>Regional Ateliers: Dubai, UAE & Mumbai, India</span>
              </div>
              <div className="flex items-center space-x-2">
                <Mail className="w-4 h-4 text-stone-800 shrink-0" />
                <span>concierge@velmira.com</span>
              </div>
            </div>
          </div>

          {/* Watch Collections */}
          <div>
            <h4 className="font-cinzel text-xs font-bold text-black uppercase tracking-widest mb-4">
              Collections
            </h4>
            <ul className="space-y-2.5 text-xs text-[#777777]">
              <li>
                <Link to="/products?category=Men's%20Watches" className="hover:text-black transition">
                  Men's Watches
                </Link>
              </li>
              <li>
                <Link to="/products?category=Women's%20Watches" className="hover:text-black transition">
                  Women's Watches
                </Link>
              </li>
              <li>
                <Link to="/products?category=Luxury%20Watches" className="hover:text-black transition">
                  Luxury Watches
                </Link>
              </li>
              <li>
                <Link to="/products?category=Classic%20Watches" className="hover:text-black transition">
                  Classic Watches
                </Link>
              </li>
              <li>
                <Link to="/products?category=Sports%20Watches" className="hover:text-black transition">
                  Sports Watches
                </Link>
              </li>
              <li>
                <Link to="/products?category=Minimal%20Watches" className="hover:text-black transition">
                  Minimal Watches
                </Link>
              </li>
            </ul>
          </div>

          {/* Manufacture Standards */}
          <div>
            <h4 className="font-cinzel text-xs font-bold text-black uppercase tracking-widest mb-4">
              Manufacture
            </h4>
            <ul className="space-y-2.5 text-xs text-[#777777]">
              <li>Swiss Automatic Calibres</li>
              <li>28,800 VPH High-Frequency</li>
              <li>Anti-Reflective Sapphire</li>
              <li>316L Surgical Steel</li>
              <li>Grade 5 Aerospace Titanium</li>
              <li>High-Tech Zirconia Ceramic</li>
            </ul>
          </div>

          {/* Assurance */}
          <div>
            <h4 className="font-cinzel text-xs font-bold text-black uppercase tracking-widest mb-4">
              Assurance
            </h4>
            <div className="space-y-3 text-xs text-[#777777]">
              <div className="p-3.5 bg-white border border-stone-200">
                <p className="font-semibold text-black text-[11px]">100% Certified Authentic</p>
                <p className="text-[10px] text-[#777777] mt-0.5">Tested for water resistance, chronometer accuracy, and magnetic shielding.</p>
              </div>
              <div className="p-3.5 bg-white border border-stone-200">
                <p className="font-semibold text-black text-[11px]">White-Glove Insured Cargo</p>
                <p className="text-[10px] text-[#777777] mt-0.5">Insured doorstep dispatch across India & UAE Emirates.</p>
              </div>
            </div>
          </div>
        </div>

        {/* Bottom Bar */}
        <div className="mt-8 flex flex-col sm:flex-row items-center justify-between gap-4 text-xs text-[#777777]">
          <p>© {new Date().getFullYear()} VELMIRA HAUTE HORLOGERIE. All rights reserved.</p>

          <div className="flex items-center space-x-3 text-[10px] uppercase font-mono tracking-wider">
            <span className="px-2.5 py-1 bg-white border border-stone-200 text-black">India 🇮🇳 (INR ₹)</span>
            <span className="px-2.5 py-1 bg-white border border-stone-200 text-black">UAE 🇦🇪 (AED د.إ)</span>
            <span className="px-2.5 py-1 bg-black text-white font-bold">WhatsApp Direct</span>
          </div>
        </div>
      </div>
    </footer>
  );
};
