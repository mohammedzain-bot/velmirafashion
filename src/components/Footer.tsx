import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { Mail, MapPin, Sparkles, Check, ArrowRight, MessageCircle, Watch, ShieldCheck } from 'lucide-react';
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
    <footer className="bg-[#0A0A0A] text-stone-300 border-t border-stone-800/80 pt-16 pb-12">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Top Newsletter & Club Bar */}
        <div className="bg-[#121212] rounded-2xl p-6 sm:p-10 border border-stone-800 mb-14 flex flex-col lg:flex-row items-center justify-between gap-6">
          <div className="max-w-xl text-center lg:text-left">
            <div className="inline-flex items-center space-x-1.5 text-[#D4AF37] text-xs font-semibold uppercase tracking-widest mb-1.5">
              <Sparkles className="w-3.5 h-3.5" />
              <span>Velmira Horology Privé</span>
            </div>
            <h3 className="font-cinzel text-xl sm:text-2xl font-bold text-white tracking-wide">
              Receive Private Watch Release Previews
            </h3>
            <p className="text-xs text-stone-400 mt-2">
              Subscribe for private vault access to limited edition automatic timepieces, flying tourbillons, and collector allocations.
            </p>
          </div>

          <div className="w-full lg:w-auto">
            {isSubscribed ? (
              <div className="flex items-center space-x-2 text-emerald-400 bg-emerald-950/40 border border-emerald-800/60 px-4 py-3 rounded-xl text-xs font-semibold">
                <Check className="w-4 h-4" />
                <span>You are now registered for Velmira Privé watch allocations!</span>
              </div>
            ) : (
              <form onSubmit={handleSubscribe} className="flex flex-col sm:flex-row gap-2 w-full max-w-md">
                <input
                  type="email"
                  required
                  placeholder="Enter your VIP email address..."
                  value={newsletterEmail}
                  onChange={e => setNewsletterEmail(e.target.value)}
                  className="bg-black/60 text-white placeholder-stone-500 text-xs px-4 py-3 rounded-full border border-stone-700 focus:outline-none focus:border-[#D4AF37] flex-1"
                />
                <button
                  type="submit"
                  className="px-6 py-3 rounded-full bg-[#D4AF37] text-black font-bold text-xs uppercase tracking-widest hover:bg-[#c5a059] transition flex items-center justify-center space-x-1.5 shrink-0 font-cinzel"
                >
                  <span>Join Privé</span>
                  <ArrowRight className="w-3.5 h-3.5" />
                </button>
              </form>
            )}
          </div>
        </div>

        {/* Links Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-8 sm:gap-10 pb-12 border-b border-stone-800/80">
          {/* Brand Info */}
          <div className="lg:col-span-2 space-y-4">
            <Link to="/" className="inline-block">
              <div className="flex items-center space-x-2">
                <span className="font-cinzel text-2xl font-black tracking-widest text-white">
                  VELMIRA
                </span>
                <span className="w-2 h-2 rounded-full bg-[#D4AF37]" />
              </div>
              <span className="text-[9px] font-semibold tracking-[0.3em] text-[#D4AF37] uppercase -mt-1 block font-sans">
                Haute Horlogerie Ateliers
              </span>
            </Link>
            <p className="text-xs text-stone-400 leading-relaxed max-w-sm">
              Velmira is an independent luxury watch atelier dedicated strictly to mechanical precision, high-beat automatic movements, and timeless craftsmanship. Direct white-glove delivery across India and the United Arab Emirates.
            </p>
            <div className="space-y-2 text-xs text-stone-400 pt-2">
              <div className="flex items-center space-x-2">
                <MessageCircle className="w-4 h-4 text-emerald-400 shrink-0" />
                <span>WhatsApp Concierge: <strong className="text-emerald-400 font-mono">{OFFICIAL_WHATSAPP_NUMBER}</strong></span>
              </div>
              <div className="flex items-center space-x-2">
                <MapPin className="w-4 h-4 text-[#D4AF37] shrink-0" />
                <span>Regional Ateliers: Dubai, UAE & Mumbai, India</span>
              </div>
              <div className="flex items-center space-x-2">
                <Mail className="w-4 h-4 text-[#D4AF37] shrink-0" />
                <span>concierge@velmira.com</span>
              </div>
            </div>
          </div>

          {/* Timepieces Categories */}
          <div>
            <h4 className="font-cinzel text-xs font-bold text-white uppercase tracking-widest mb-4">
              Collections
            </h4>
            <ul className="space-y-2 text-xs text-stone-400">
              <li>
                <Link to="/products?category=Chronograph" className="hover:text-[#D4AF37] transition">
                  Automatic Chronographs
                </Link>
              </li>
              <li>
                <Link to="/products?category=Tourbillon" className="hover:text-[#D4AF37] transition">
                  Celestial Tourbillons
                </Link>
              </li>
              <li>
                <Link to="/products?category=Diver" className="hover:text-[#D4AF37] transition">
                  300M & 500M Oceanic Divers
                </Link>
              </li>
              <li>
                <Link to="/products?category=Skeleton" className="hover:text-[#D4AF37] transition">
                  Openwork Skeletons
                </Link>
              </li>
              <li>
                <Link to="/products?category=Moonphase" className="hover:text-[#D4AF37] transition">
                  Perpetual Moonphase
                </Link>
              </li>
              <li>
                <Link to="/products?category=Classic%20Dress" className="hover:text-[#D4AF37] transition">
                  Ultra-Thin Bauhaus 38mm
                </Link>
              </li>
            </ul>
          </div>

          {/* Craftsmanship Standards */}
          <div>
            <h4 className="font-cinzel text-xs font-bold text-white uppercase tracking-widest mb-4">
              Manufacture
            </h4>
            <ul className="space-y-2 text-xs text-stone-400">
              <li>
                <span className="text-stone-300 font-medium">In-House Automatic Calibres</span>
              </li>
              <li>
                <span className="text-stone-300 font-medium">Double Domed Sapphire Crystal</span>
              </li>
              <li>
                <span className="text-stone-300 font-medium">316L Surgical Marine Steel</span>
              </li>
              <li>
                <span className="text-stone-300 font-medium">Grade 5 Aerospace Titanium</span>
              </li>
              <li>
                <span className="text-stone-300 font-medium">High-Tech Zirconia Ceramic</span>
              </li>
              <li>
                <span className="text-stone-300 font-medium">Super-LumiNova BGW9 Optics</span>
              </li>
            </ul>
          </div>

          {/* Trust & Guarantee */}
          <div>
            <h4 className="font-cinzel text-xs font-bold text-white uppercase tracking-widest mb-4">
              Assurance
            </h4>
            <div className="space-y-3 text-xs text-stone-400">
              <div className="p-3 rounded-xl bg-stone-900/80 border border-stone-800">
                <p className="font-semibold text-white text-[11px]">100% Certified Authentic</p>
                <p className="text-[10px] text-stone-400 mt-0.5">Tested for water resistance, chronometer accuracy, and magnetic shielding.</p>
              </div>
              <div className="p-3 rounded-xl bg-stone-900/80 border border-stone-800">
                <p className="font-semibold text-white text-[11px]">White-Glove Insured Cargo</p>
                <p className="text-[10px] text-stone-400 mt-0.5">Insured doorstep dispatch across India & UAE Emirates.</p>
              </div>
            </div>
          </div>
        </div>

        {/* Bottom Bar */}
        <div className="mt-8 flex flex-col sm:flex-row items-center justify-between gap-4 text-xs text-stone-500">
          <p>© {new Date().getFullYear()} VELMIRA ATELIER PRIVÉ. Haute Horlogerie. All rights reserved.</p>

          <div className="flex items-center space-x-3 text-[10px] uppercase font-mono tracking-wider">
            <span className="px-2.5 py-1 rounded-full bg-stone-900 border border-stone-800 text-stone-300">India 🇮🇳 (INR ₹)</span>
            <span className="px-2.5 py-1 rounded-full bg-stone-900 border border-stone-800 text-stone-300">UAE 🇦🇪 (AED د.إ)</span>
            <span className="px-2.5 py-1 rounded-full bg-stone-900 border border-stone-800 text-emerald-400 font-bold">WhatsApp Ordering</span>
          </div>
        </div>
      </div>
    </footer>
  );
};
