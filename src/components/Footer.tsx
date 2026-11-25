import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { Mail, MapPin, Check, ArrowRight, MessageCircle, Sparkles } from 'lucide-react';
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
    <footer className="bg-[#080A0E] text-[#94A3B8] border-t border-[#1E2536] pt-16 pb-12 selection:bg-[#D4AF37] selection:text-black">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Top Newsletter Strip (Dark Luxury Box) */}
        <div className="bg-[#141822] p-8 sm:p-10 border border-[#2A3142] mb-14 flex flex-col lg:flex-row items-center justify-between gap-6 shadow-xl">
          <div className="max-w-xl text-center lg:text-left">
            <span className="text-[10px] font-bold uppercase tracking-[0.3em] text-[#D4AF37] block mb-1">
              VELMIRA ATELIER PRIVÉ
            </span>
            <h3 className="font-serif text-xl sm:text-2xl font-bold text-white tracking-wide">
              Receive Private Watch Release Previews
            </h3>
            <p className="text-xs text-[#94A3B8] mt-1.5 leading-relaxed">
              Subscribe for private vault access to limited edition automatic timepieces, flying tourbillons, and collector allocations.
            </p>
          </div>

          <div className="w-full lg:w-auto">
            {isSubscribed ? (
              <div className="flex items-center space-x-2 text-[#D4AF37] bg-[#0E1118] border border-[#D4AF37]/50 px-5 py-3 text-xs font-semibold">
                <Check className="w-4 h-4 text-[#D4AF37]" />
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
                  className="bg-[#0E1118] text-white placeholder-[#64748B] text-xs px-4 py-3 border border-[#2A3142] focus:outline-none focus:border-[#D4AF37] flex-1 font-mono"
                />
                <button
                  type="submit"
                  className="px-6 py-3 bg-[#D4AF37] text-black hover:bg-[#E5B869] font-serif text-xs font-bold uppercase tracking-widest transition flex items-center justify-center space-x-2 shrink-0 shadow-md shadow-[#D4AF37]/15"
                >
                  <span>Join Privé</span>
                  <ArrowRight className="w-3.5 h-3.5" />
                </button>
              </form>
            )}
          </div>
        </div>

        {/* Links Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-8 sm:gap-10 pb-12 border-b border-[#1E2536]">
          {/* Brand Info */}
          <div className="lg:col-span-2 space-y-4">
            <Link to="/" className="inline-block">
              <span className="font-serif text-2xl font-bold tracking-[0.2em] text-[#D4AF37] block">
                VELMIRA
              </span>
              <span className="text-[9px] font-medium tracking-[0.3em] text-[#94A3B8] uppercase -mt-0.5 block font-sans">
                Haute Horlogerie Ateliers
              </span>
            </Link>
            <p className="text-xs text-[#94A3B8] leading-relaxed max-w-sm">
              Velmira is an independent luxury watch atelier dedicated strictly to mechanical precision, high-beat automatic movements, and timeless craftsmanship. Direct white-glove delivery across India and the United Arab Emirates.
            </p>
            <div className="space-y-2 text-xs text-[#CBD5E1] pt-2">
              <div className="flex items-center space-x-2">
                <MessageCircle className="w-4 h-4 text-[#D4AF37] shrink-0" />
                <span>WhatsApp Concierge: <strong className="text-white font-mono">{OFFICIAL_WHATSAPP_NUMBER}</strong></span>
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

          {/* Watch Collections */}
          <div>
            <h4 className="font-serif text-xs font-bold text-white uppercase tracking-widest mb-4">
              Collections
            </h4>
            <ul className="space-y-2.5 text-xs text-[#94A3B8]">
              <li>
                <Link to="/watches?category=Men's%20Watches" className="hover:text-[#D4AF37] transition">
                  Men's Watches
                </Link>
              </li>
              <li>
                <Link to="/watches?category=Women's%20Watches" className="hover:text-[#D4AF37] transition">
                  Women's Watches
                </Link>
              </li>
              <li>
                <Link to="/watches?category=Luxury%20Watches" className="hover:text-[#D4AF37] transition">
                  Luxury Watches
                </Link>
              </li>
              <li>
                <Link to="/watches?category=Classic%20Watches" className="hover:text-[#D4AF37] transition">
                  Classic Watches
                </Link>
              </li>
              <li>
                <Link to="/watches?category=Sports%20Watches" className="hover:text-[#D4AF37] transition">
                  Sports Watches
                </Link>
              </li>
              <li>
                <Link to="/watches?category=Minimal%20Watches" className="hover:text-[#D4AF37] transition">
                  Minimal Watches
                </Link>
              </li>
            </ul>
          </div>

          {/* Manufacture Standards */}
          <div>
            <h4 className="font-serif text-xs font-bold text-white uppercase tracking-widest mb-4">
              Manufacture
            </h4>
            <ul className="space-y-2.5 text-xs text-[#94A3B8]">
              <li>Swiss Automatic Calibres</li>
              <li>28,800 VPH High-Frequency</li>
              <li>Anti-Reflective Sapphire</li>
              <li>316L Surgical Steel</li>
              <li>Grade 5 Aerospace Titanium</li>
              <li>Sunburst Emerald & Violet Dials</li>
            </ul>
          </div>

          {/* Assurance */}
          <div>
            <h4 className="font-serif text-xs font-bold text-white uppercase tracking-widest mb-4">
              Assurance
            </h4>
            <div className="space-y-3 text-xs text-[#94A3B8]">
              <div className="p-3.5 bg-[#141822] border border-[#2A3142]">
                <p className="font-semibold text-white text-[11px]">100% Certified Authentic</p>
                <p className="text-[10px] text-[#94A3B8] mt-0.5">Tested for water resistance, chronometer accuracy, and magnetic shielding.</p>
              </div>
              <div className="p-3.5 bg-[#141822] border border-[#2A3142]">
                <p className="font-semibold text-white text-[11px]">White-Glove Insured Cargo</p>
                <p className="text-[10px] text-[#94A3B8] mt-0.5">Insured doorstep dispatch across India & UAE Emirates.</p>
              </div>
            </div>
          </div>
        </div>

        {/* Bottom Bar */}
        <div className="mt-8 flex flex-col sm:flex-row items-center justify-between gap-4 text-xs text-[#94A3B8]">
          <p>© {new Date().getFullYear()} VELMIRA HAUTE HORLOGERIE. All rights reserved.</p>

          <div className="flex items-center space-x-3 text-[10px] uppercase font-mono tracking-wider">
            <span className="px-2.5 py-1 bg-[#141822] border border-[#2A3142] text-[#CBD5E1]">India 🇮🇳 (INR ₹)</span>
            <span className="px-2.5 py-1 bg-[#141822] border border-[#2A3142] text-[#CBD5E1]">UAE 🇦🇪 (AED د.إ)</span>
            <span className="px-2.5 py-1 bg-[#D4AF37] text-black font-bold">WhatsApp Direct</span>
          </div>
        </div>
      </div>
    </footer>
  );
};
