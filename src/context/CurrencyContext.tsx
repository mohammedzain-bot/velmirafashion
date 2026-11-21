import React, { createContext, useContext, useState, useEffect } from 'react';
import { CurrencyType, CountryType } from '../types';

interface CurrencyContextType {
  currency: CurrencyType;
  country: CountryType;
  setRegion: (country: CountryType) => void;
  formatPrice: (amountINR: number, amountAED?: number) => string;
  getPrice: (amountINR: number, amountAED?: number) => number;
  symbol: string;
}

const CurrencyContext = createContext<CurrencyContextType | undefined>(undefined);

const INR_PER_AED = 22.5;

export const CurrencyProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [country, setCountry] = useState<CountryType>(() => {
    try {
      const saved = localStorage.getItem('velmira_country');
      return (saved === 'UAE' ? 'UAE' : 'India') as CountryType;
    } catch {
      return 'India';
    }
  });

  const currency: CurrencyType = country === 'UAE' ? 'AED' : 'INR';
  const symbol = currency === 'AED' ? 'AED ' : '₹';

  useEffect(() => {
    localStorage.setItem('velmira_country', country);
  }, [country]);

  const setRegion = (newCountry: CountryType) => {
    setCountry(newCountry);
  };

  const getPrice = (amountINR: number, amountAED?: number): number => {
    if (currency === 'AED') {
      return amountAED || Math.round(amountINR / INR_PER_AED);
    }
    return amountINR;
  };

  const formatPrice = (amountINR: number, amountAED?: number): string => {
    const val = getPrice(amountINR, amountAED);
    return `${symbol}${val.toLocaleString('en-IN')}`;
  };

  return (
    <CurrencyContext.Provider
      value={{
        currency,
        country,
        setRegion,
        formatPrice,
        getPrice,
        symbol
      }}
    >
      {children}
    </CurrencyContext.Provider>
  );
};

export const useCurrency = () => {
  const context = useContext(CurrencyContext);
  if (!context) throw new Error('useCurrency must be used within CurrencyProvider');
  return context;
};
