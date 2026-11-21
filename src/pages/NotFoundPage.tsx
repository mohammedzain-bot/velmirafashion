import React from 'react';
import { Link } from 'react-router-dom';
import { Compass, ArrowRight } from 'lucide-react';

export const NotFoundPage: React.FC = () => {
  return (
    <div className="min-h-[70vh] flex flex-col items-center justify-center p-8 text-center bg-[#F8F9FA]">
      <div className="w-20 h-20 rounded-full bg-stone-100 flex items-center justify-center text-[#D4AF37] mb-6">
        <Compass className="w-10 h-10" />
      </div>
      <h1 className="font-cinzel text-4xl font-extrabold text-stone-900">404</h1>
      <h2 className="font-cinzel text-xl font-bold text-stone-800 mt-2">
        Silhouette Not Found
      </h2>
      <p className="text-xs text-stone-500 mt-2 max-w-sm mx-auto leading-relaxed">
        The luxury page or collection you are seeking may have been relocated or is part of a previous season.
      </p>
      <Link
        to="/"
        className="mt-8 inline-flex items-center space-x-2 px-8 py-3 rounded-full bg-[#0F0F0F] text-[#D4AF37] font-bold text-xs uppercase tracking-widest hover:bg-stone-800 transition shadow-md"
      >
        <span>Return to Grand Salon</span>
        <ArrowRight className="w-4 h-4" />
      </Link>
    </div>
  );
};
