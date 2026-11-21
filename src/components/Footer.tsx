import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { Mail, Phone, MapPin, Sparkles, Check, ArrowRight } from 'lucide-react';

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
              <span>Velmira Privé Newsletter</span>
            </div>
            <h3 className="font-cinzel text-xl sm:text-2xl font-bold text-white tracking-wide">
              Receive Invitations to Private Runway Previews
            </h3>
            <p className="text-xs text-stone-400 mt-2">
              Subscribe to unlock 15% off your maiden purchase and complimentary seasonal lookbooks.
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

        {/* 4-Column Links Grid */}
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
                Haute Couture & Living
              </span>
            </Link>
            <p className="text-xs text-stone-400 leading-relaxed max-w-sm">
              Velmira Fashion is an independent luxury fashion house that marries timeless Indian handloom craftsmanship with European sartorial silhouettes. Dedicated to discerning connoisseurs across the globe.
            </p>
            <div className="space-y-2 text-xs text-stone-400 pt-2">
              <div className="flex items-center space-x-2">
                <MapPin className="w-4 h-4 text-[#D4AF37] shrink-0" />
                <span>Atelier Velmira, Nariman Point, Mumbai 400021, India</span>
              </div>
              <div className="flex items-center space-x-2">
                <Phone className="w-4 h-4 text-[#D4AF37] shrink-0" />
                <span>+91 (022) 8000-VELMIRA / +91 98200 11223</span>
              </div>
              <div className="flex items-center space-x-2">
                <Mail className="w-4 h-4 text-[#D4AF37] shrink-0" />
                <span>concierge@velmira.com</span>
              </div>
            </div>
          </div>

          {/* Categories */}
          <div>
            <h4 className="font-cinzel text-xs font-bold text-white uppercase tracking-widest mb-4">
              Collections
            </h4>
            <ul className="space-y-2 text-xs text-stone-400">
              <li>
                <Link to="/products?category=Ethnic%20Wear" className="hover:text-[#D4AF37] transition">
                  Royal Ethnic & Sarees
                </Link>
              </li>
              <li>
                <Link to="/products?category=Men" className="hover:text-[#D4AF37] transition">
                  Men's Sartorial Blazers
                </Link>
              </li>
              <li>
                <Link to="/products?category=Women" className="hover:text-[#D4AF37] transition">
                  Evening Silk Gowns
                </Link>
              </li>
              <li>
                <Link to="/products?category=Footwear" className="hover:text-[#D4AF37] transition">
                  Goodyear Leather Footwear
                </Link>
              </li>
              <li>
                <Link to="/products?category=Accessories" className="hover:text-[#D4AF37] transition">
                  Horology & Saffiano Bags
                </Link>
              </li>
              <li>
                <Link to="/products?category=New%20Arrivals" className="hover:text-[#D4AF37] transition text-amber-300">
                  New Season Runway
                </Link>
              </li>
            </ul>
          </div>

          {/* Client Concierge */}
          <div>
            <h4 className="font-cinzel text-xs font-bold text-white uppercase tracking-widest mb-4">
              Client Concierge
            </h4>
            <ul className="space-y-2 text-xs text-stone-400">
              <li>
                <Link to="/dashboard?tab=orders" className="hover:text-[#D4AF37] transition">
                  Track Live Consignment
                </Link>
              </li>
              <li>
                <Link to="/dashboard?tab=returns" className="hover:text-[#D4AF37] transition">
                  7-Day Returns & Exchanges
                </Link>
              </li>
              <li>
                <Link to="/dashboard?tab=addresses" className="hover:text-[#D4AF37] transition">
                  White-Glove Delivery Info
                </Link>
              </li>
              <li>
                <Link to="/dashboard?tab=profile" className="hover:text-[#D4AF37] transition">
                  Personal Stylist Booking
                </Link>
              </li>
              <li>
                <Link to="/admin" className="hover:text-[#D4AF37] transition text-amber-400">
                  Admin Management Portal
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
              <div className="p-2.5 rounded-lg bg-stone-900 border border-stone-800">
                <p className="font-semibold text-white text-[11px]">100% Genuine Certified</p>
                <p className="text-[10px] text-stone-400 mt-0.5">Authentic Silk Mark & GI-Tagged textiles.</p>
              </div>
              <div className="p-2.5 rounded-lg bg-stone-900 border border-stone-800">
                <p className="font-semibold text-white text-[11px]">Express Air Cargo</p>
                <p className="text-[10px] text-stone-400 mt-0.5">Dispatched via BlueDart Luxury Express.</p>
              </div>
            </div>
          </div>
        </div>

        {/* Bottom Bar & Payments */}
        <div className="mt-8 flex flex-col sm:flex-row items-center justify-between gap-4 text-xs text-stone-500">
          <p>© {new Date().getFullYear()} VELMIRA FASHION PRIVÉ LTD. All rights reserved.</p>

          <div className="flex items-center space-x-3 text-[10px] uppercase font-mono tracking-wider">
            <span className="px-2 py-0.5 rounded bg-stone-900 border border-stone-800 text-stone-300">UPI / GPay</span>
            <span className="px-2 py-0.5 rounded bg-stone-900 border border-stone-800 text-stone-300">Visa</span>
            <span className="px-2 py-0.5 rounded bg-stone-900 border border-stone-800 text-stone-300">Mastercard</span>
            <span className="px-2 py-0.5 rounded bg-stone-900 border border-stone-800 text-stone-300">RuPay</span>
            <span className="px-2 py-0.5 rounded bg-stone-900 border border-stone-800 text-stone-300">Cash on Delivery</span>
          </div>
        </div>
      </div>
    </footer>
  );
};
