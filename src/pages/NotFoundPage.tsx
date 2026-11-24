import React from 'react';
import { Link } from 'react-router-dom';
import { Compass, ArrowRight } from 'lucide-react';

export const NotFoundPage: React.FC = () => {
  return (
    <div className="min-h-[70vh] flex flex-col items-center justify-center p-8 text-center bg-[#FFFFFF] text-[#111111] font-sans">
      <div className="w-16 h-16 bg-[#F8F8F8] border border-neutral-200 flex items-center justify-center text-[#111111] mb-6">
        <Compass className="w-8 h-8" />
      </div>
      <h1 className="font-serif text-4xl font-bold text-[#111111]">404</h1>
      <h2 className="font-serif text-lg font-bold text-[#111111] mt-2 uppercase tracking-wider">
        Watch Not Found
      </h2>
      <p className="text-xs text-[#777777] mt-2 max-w-sm mx-auto leading-relaxed">
        The luxury timepiece or collection page you are seeking may have been relocated.
      </p>
      <Link
        to="/"
        className="mt-8 inline-flex items-center space-x-2 px-8 py-3 bg-[#111111] text-white font-medium text-xs uppercase tracking-widest hover:bg-neutral-800 transition"
      >
        <span>Return to Boutique</span>
        <ArrowRight className="w-4 h-4" />
      </Link>
    </div>
  );
};