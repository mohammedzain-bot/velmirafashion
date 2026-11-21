import React, { useState } from 'react';
import { X, Lock, Mail, User as UserIcon, Phone, ShieldCheck, ArrowRight, Sparkles } from 'lucide-react';
import { useAuth } from '../context/AuthContext';

interface AuthModalProps {
  isOpen: boolean;
  onClose: () => void;
  defaultMode?: 'login' | 'register';
}

export const AuthModal: React.FC<AuthModalProps> = ({ isOpen, onClose, defaultMode = 'login' }) => {
  const { login, loginAsDemoCustomer, loginAsDemoAdmin } = useAuth();
  const [mode, setMode] = useState<'login' | 'register'>(defaultMode);
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [name, setName] = useState('');
  const [phone, setPhone] = useState('');
  const [error, setError] = useState('');

  if (!isOpen) return null;

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!email || !password) {
      setError('Please fill in all required fields');
      return;
    }
    login(email);
    onClose();
  };

  const handleDemoCustomer = () => {
    loginAsDemoCustomer();
    onClose();
  };

  const handleDemoAdmin = () => {
    loginAsDemoAdmin();
    onClose();
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/60 backdrop-blur-sm animate-in fade-in duration-200">
      <div className="relative w-full max-w-md bg-white rounded-2xl shadow-2xl border border-stone-200 overflow-hidden">
        {/* Header Ribbon */}
        <div className="bg-[#0F0F0F] text-white p-6 relative">
          <button
            onClick={onClose}
            className="absolute top-4 right-4 p-1 rounded-full text-stone-400 hover:text-white hover:bg-stone-800 transition"
          >
            <X className="w-5 h-5" />
          </button>
          <div className="flex items-center space-x-2 text-[#D4AF37] mb-1">
            <Sparkles className="w-4 h-4" />
            <span className="text-xs uppercase tracking-widest font-semibold">Velmira Privé Access</span>
          </div>
          <h3 className="font-cinzel text-2xl font-bold tracking-wide text-white">
            {mode === 'login' ? 'Welcome Back' : 'Create Your Account'}
          </h3>
          <p className="text-xs text-stone-300 mt-1">
            {mode === 'login'
              ? 'Access your luxury wishlist, track orders & exclusive preview sales'
              : 'Join the circle of bespoke luxury and fashion excellence'}
          </p>
        </div>

        {/* Tab switch */}
        <div className="flex border-b border-stone-200 bg-[#FAFAF8]">
          <button
            onClick={() => { setMode('login'); setError(''); }}
            className={`flex-1 py-3 text-xs font-semibold uppercase tracking-wider transition ${
              mode === 'login'
                ? 'text-[#0F0F0F] border-b-2 border-[#D4AF37] bg-white'
                : 'text-stone-400 hover:text-stone-700'
            }`}
          >
            Sign In
          </button>
          <button
            onClick={() => { setMode('register'); setError(''); }}
            className={`flex-1 py-3 text-xs font-semibold uppercase tracking-wider transition ${
              mode === 'register'
                ? 'text-[#0F0F0F] border-b-2 border-[#D4AF37] bg-white'
                : 'text-stone-400 hover:text-stone-700'
            }`}
          >
            Register
          </button>
        </div>

        <div className="p-6">
          {/* Quick Demo Access Bar */}
          <div className="mb-5 p-3.5 rounded-xl bg-amber-50/80 border border-amber-200/80">
            <p className="text-[11px] font-semibold text-amber-900 mb-2 uppercase tracking-wide flex items-center">
              <ShieldCheck className="w-3.5 h-3.5 mr-1 text-[#D4AF37]" /> Instant 1-Click Demo Login:
            </p>
            <div className="grid grid-cols-2 gap-2">
              <button
                type="button"
                onClick={handleDemoCustomer}
                className="px-3 py-2 text-xs font-medium rounded-lg bg-white border border-amber-300 text-stone-800 hover:bg-amber-100/50 shadow-xs text-left"
              >
                <div className="font-semibold text-stone-900">Customer Demo</div>
                <div className="text-[10px] text-stone-500">Aarav Sharma</div>
              </button>
              <button
                type="button"
                onClick={handleDemoAdmin}
                className="px-3 py-2 text-xs font-medium rounded-lg bg-[#0F0F0F] text-amber-300 hover:bg-stone-800 shadow-xs text-left"
              >
                <div className="font-semibold text-amber-300">Admin Portal</div>
                <div className="text-[10px] text-stone-400">Store Director</div>
              </button>
            </div>
          </div>

          {error && (
            <div className="mb-4 p-2.5 rounded-lg bg-red-50 text-red-700 text-xs border border-red-200">
              {error}
            </div>
          )}

          <form onSubmit={handleSubmit} className="space-y-4">
            {mode === 'register' && (
              <>
                <div>
                  <label className="block text-xs font-semibold text-stone-700 uppercase tracking-wider mb-1">
                    Full Name
                  </label>
                  <div className="relative">
                    <UserIcon className="absolute left-3 top-3 w-4 h-4 text-stone-400" />
                    <input
                      type="text"
                      required
                      placeholder="e.g. Princess Aaliyah"
                      value={name}
                      onChange={e => setName(e.target.value)}
                      className="w-full pl-9 pr-3 py-2 text-sm rounded-lg border border-stone-300 focus:outline-none focus:border-[#D4AF37] focus:ring-1 focus:ring-[#D4AF37]"
                    />
                  </div>
                </div>

                <div>
                  <label className="block text-xs font-semibold text-stone-700 uppercase tracking-wider mb-1">
                    Phone Number
                  </label>
                  <div className="relative">
                    <Phone className="absolute left-3 top-3 w-4 h-4 text-stone-400" />
                    <input
                      type="tel"
                      required
                      placeholder="+91 98765 43210"
                      value={phone}
                      onChange={e => setPhone(e.target.value)}
                      className="w-full pl-9 pr-3 py-2 text-sm rounded-lg border border-stone-300 focus:outline-none focus:border-[#D4AF37] focus:ring-1 focus:ring-[#D4AF37]"
                    />
                  </div>
                </div>
              </>
            )}

            <div>
              <label className="block text-xs font-semibold text-stone-700 uppercase tracking-wider mb-1">
                Email Address
              </label>
              <div className="relative">
                <Mail className="absolute left-3 top-3 w-4 h-4 text-stone-400" />
                <input
                  type="email"
                  required
                  placeholder="client@velmira.com"
                  value={email}
                  onChange={e => setEmail(e.target.value)}
                  className="w-full pl-9 pr-3 py-2 text-sm rounded-lg border border-stone-300 focus:outline-none focus:border-[#D4AF37] focus:ring-1 focus:ring-[#D4AF37]"
                />
              </div>
            </div>

            <div>
              <label className="block text-xs font-semibold text-stone-700 uppercase tracking-wider mb-1">
                Password
              </label>
              <div className="relative">
                <Lock className="absolute left-3 top-3 w-4 h-4 text-stone-400" />
                <input
                  type="password"
                  required
                  placeholder="••••••••"
                  value={password}
                  onChange={e => setPassword(e.target.value)}
                  className="w-full pl-9 pr-3 py-2 text-sm rounded-lg border border-stone-300 focus:outline-none focus:border-[#D4AF37] focus:ring-1 focus:ring-[#D4AF37]"
                />
              </div>
            </div>

            <button
              type="submit"
              className="w-full py-3 px-4 rounded-xl bg-[#0F0F0F] text-[#D4AF37] hover:bg-stone-800 font-semibold text-xs uppercase tracking-widest shadow-md transition-all flex items-center justify-center space-x-2"
            >
              <span>{mode === 'login' ? 'Sign In Securely' : 'Complete Registration'}</span>
              <ArrowRight className="w-4 h-4" />
            </button>
          </form>
        </div>
      </div>
    </div>
  );
};
