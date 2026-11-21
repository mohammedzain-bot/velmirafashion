import React, { createContext, useContext, useState, useEffect } from 'react';
import { User, Address } from '../types';

interface AuthContextType {
  user: User | null;
  isAdmin: boolean;
  login: (email: string, role?: 'customer' | 'admin') => void;
  loginAsDemoCustomer: () => void;
  loginAsDemoAdmin: () => void;
  logout: () => void;
  addAddress: (address: Omit<Address, 'id'>) => void;
  updateAddress: (id: string, address: Partial<Address>) => void;
  deleteAddress: (id: string) => void;
  setDefaultAddress: (id: string) => void;
  updateProfile: (profile: Partial<User>) => void;
}

const DEMO_CUSTOMER: User = {
  id: 'usr-1',
  name: 'Aarav Sharma',
  email: 'aarav.sharma@velmira.in',
  phone: '+91 98765 43210',
  role: 'customer',
  addresses: [
    {
      id: 'addr-1',
      fullName: 'Aarav Sharma',
      phone: '+91 98765 43210',
      country: 'India',
      addressLine1: 'Penthouse 14B, Oberoi Sky Heights',
      addressLine2: 'Lokhandwala Complex, Andheri West',
      landmark: 'Near Infiniti Mall',
      city: 'Mumbai',
      state: 'Maharashtra',
      pincode: '400053',
      addressType: 'Home',
      isDefault: true
    },
    {
      id: 'addr-2',
      fullName: 'Aarav Sharma (Office)',
      phone: '+91 98765 43210',
      country: 'India',
      addressLine1: 'Level 8, Maker Maxity, Bandra Kurla Complex',
      addressLine2: 'BKC East',
      landmark: 'Opposite Trident Hotel',
      city: 'Mumbai',
      state: 'Maharashtra',
      pincode: '400051',
      addressType: 'Work',
      isDefault: false
    }
  ],
  createdAt: '2026-01-01T10:00:00Z'
};

const DEMO_ADMIN: User = {
  id: 'usr-admin',
  name: 'Velmira Executive Admin',
  email: 'admin@velmira.com',
  phone: '+91 98200 11223',
  role: 'admin',
  addresses: [],
  createdAt: '2026-01-01T10:00:00Z'
};

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export const AuthProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [user, setUser] = useState<User | null>(() => {
    try {
      const saved = localStorage.getItem('velmira_auth_user');
      return saved ? JSON.parse(saved) : DEMO_CUSTOMER;
    } catch {
      return DEMO_CUSTOMER;
    }
  });

  useEffect(() => {
    if (user) {
      localStorage.setItem('velmira_auth_user', JSON.stringify(user));
    } else {
      localStorage.removeItem('velmira_auth_user');
    }
  }, [user]);

  const login = (email: string, role: 'customer' | 'admin' = 'customer') => {
    if (role === 'admin' || email.includes('admin')) {
      setUser(DEMO_ADMIN);
    } else {
      setUser({
        ...DEMO_CUSTOMER,
        email,
        name: email.split('@')[0].replace('.', ' ')
      });
    }
  };

  const loginAsDemoCustomer = () => {
    setUser(DEMO_CUSTOMER);
  };

  const loginAsDemoAdmin = () => {
    setUser(DEMO_ADMIN);
  };

  const logout = () => {
    setUser(null);
  };

  const addAddress = (addrData: Omit<Address, 'id'>) => {
    if (!user) return;
    const newAddr: Address = {
      ...addrData,
      id: `addr-${Date.now()}`,
      isDefault: user.addresses.length === 0 ? true : addrData.isDefault
    };

    let updatedAddresses = user.addresses;
    if (newAddr.isDefault) {
      updatedAddresses = updatedAddresses.map(a => ({ ...a, isDefault: false }));
    }
    updatedAddresses = [...updatedAddresses, newAddr];

    setUser({
      ...user,
      addresses: updatedAddresses
    });
  };

  const updateAddress = (id: string, addrData: Partial<Address>) => {
    if (!user) return;
    let updated = user.addresses.map(a => (a.id === id ? { ...a, ...addrData } : a));
    if (addrData.isDefault) {
      updated = updated.map(a => ({ ...a, isDefault: a.id === id }));
    }
    setUser({ ...user, addresses: updated });
  };

  const deleteAddress = (id: string) => {
    if (!user) return;
    const updated = user.addresses.filter(a => a.id !== id);
    if (updated.length > 0 && !updated.some(a => a.isDefault)) {
      updated[0].isDefault = true;
    }
    setUser({ ...user, addresses: updated });
  };

  const setDefaultAddress = (id: string) => {
    if (!user) return;
    const updated = user.addresses.map(a => ({
      ...a,
      isDefault: a.id === id
    }));
    setUser({ ...user, addresses: updated });
  };

  const updateProfile = (profile: Partial<User>) => {
    if (!user) return;
    setUser({ ...user, ...profile });
  };

  return (
    <AuthContext.Provider
      value={{
        user,
        isAdmin: user?.role === 'admin',
        login,
        loginAsDemoCustomer,
        loginAsDemoAdmin,
        logout,
        addAddress,
        updateAddress,
        deleteAddress,
        setDefaultAddress,
        updateProfile
      }}
    >
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => {
  const context = useContext(AuthContext);
  if (!context) throw new Error('useAuth must be used within AuthProvider');
  return context;
};
