import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { Mail, Phone, MapPin, Sparkles, Check, ArrowRight, MessageCircle } from 'lucide-react';
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
    <footer className="bg-[#0F0F0F] text-stone-300 border-t border-stone-800 pt-16 pb-12">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Top Newsletter & Club Bar */}
        <div className="bg-[#171717] rounded-2xl p-6 sm:p-10 border border-stone-800 mb-14 flex flex-col lg:flex-row items-center justify-between gap-6">
          <div className="max-w-xl text-center lg:text-left">
            <div className="inline-flex items-center space-x-1.5 text-[#D4AF37] text-xs font-semibold uppercase tracking-widest mb-1.5">
              <Sparkles className="w-3.5 h-3.5" />
              <span>Velmira Privé Club</span>
            </div>
            <h3 className="font-cinzel text-xl sm:text-2xl font-bold text-white tracking-wide">
              Receive Private Horology & Leather Previews
            </h3>
            <p className="text-xs text-stone-400 mt-2">
              Subscribe for private vault access to limited edition automatic timepieces and bespoke handcrafted leather bags.
            </p>
          </div>

          <div className="w-full lg:w-auto">
            {isSubscribed ? (
              <div className="flex items-center space-x-2 text-emerald-400 bg-emerald-950/40 border border-emerald-800/60 px-4 py-3 rounded-xl text-xs font-semibold">
                <Check className="w-4 h-4" />
                <span>You are now subscribed to the Velmira Privé guestbook!</span>
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
                  className="px-6 py-3 rounded-full bg-[#D4AF37] text-black font-bold text-xs uppercase tracking-widest hover:bg-[#c5a059] transition flex items-center justify-center space-x-1.5 shrink-0"
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
                Haute Horlogerie & Leather Atelier
              </span>
            </Link>
            <p className="text-xs text-stone-400 leading-relaxed max-w-sm">
              Velmira is an independent luxury atelier curating bespoke Swiss precision automatic timepieces and handcrafted Italian leather bags. Direct delivery across India & the United Arab Emirates.
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
              Timepieces
            </h4>
            <ul className="space-y-2 text-xs text-stone-400">
              <li>
                <Link to="/products?category=Watches" className="hover:text-[#D4AF37] transition">
                  Automatic Chronographs
                </Link>
              </li>
              <li>
                <Link to="/products?category=Men's%20Watches" className="hover:text-[#D4AF37] transition">
                  Men's Haute Horology
                </Link>
              </li>
              <li>
                <Link to="/products?category=Women's%20Watches" className="hover:text-[#D4AF37] transition">
                  Women's Diamond Bezels
                </Link>
              </li>
              <li>
                <Link to="/products?category=Watches" className="hover:text-[#D4AF37] transition">
                  300M Diver Complications
                </Link>
              </li>
              <li>
                <Link to="/products?category=Watches" className="hover:text-[#D4AF37] transition">
                  Open-Heart Tourbillons
                </Link>
              </li>
            </ul>
          </div>

          {/* Luxury Bags Categories */}
          <div>
            <h4 className="font-cinzel text-xs font-bold text-white uppercase tracking-widest mb-4">
              Designer Bags
            </h4>
            <ul className="space-y-2 text-xs text-stone-400">
              <li>
                <Link to="/products?category=Leather%20Bags" className="hover:text-[#D4AF37] transition">
                  Italian Saffiano Handbags
                </Link>
              </li>
              <li>
                <Link to="/products?category=Tote%20Bags" className="hover:text-[#D4AF37] transition">
                  Executive Leather Totes
                </Link>
              </li>
              <li>
                <Link to="/products?category=Leather%20Bags" className="hover:text-[#D4AF37] transition">
                  Box Calfskin Kelly Bags
                </Link>
              </li>
              <li>
                <Link to="/products?category=Clutches%20%26%20Wallets" className="hover:text-[#D4AF37] transition">
                  Evening Clutches & Wallets
                </Link>
              </li>
              <li>
                <Link to="/products?category=Bags" className="hover:text-[#D4AF37] transition">
                  Weekend Travel Duffles
                </Link>
              </li>
            </ul>
          </div>

          {/* Trust & Guarantee */}
          <div>
            <h4 className="font-cinzel text-xs font-bold text-white uppercase tracking-widest mb-4">
              Assurance
            </h4>
            <div className="space-y-3 text-xs text-stone-400">
              <div className="p-3 rounded-xl bg-stone-900 border border-stone-800">
                <p className="font-semibold text-white text-[11px]">100% Certified Authentic</p>
                <p className="text-[10px] text-stone-400 mt-0.5">Swiss mechanical movements & Italian full-grain calfskin leather.</p>
              </div>
              <div className="p-3 rounded-xl bg-stone-900 border border-stone-800">
                <p className="font-semibold text-white text-[11px]">White-Glove Express Cargo</p>
                <p className="text-[10px] text-stone-400 mt-0.5">Insured doorstep dispatch across India & UAE Emirates.</p>
              </div>
            </div>
          </div>
        </div>

        {/* Bottom Bar */}
        <div className="mt-8 flex flex-col sm:flex-row items-center justify-between gap-4 text-xs text-stone-500">
          <p>© {new Date().getFullYear()} VELMIRA ATELIER PRIVÉ. All rights reserved.</p>

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
