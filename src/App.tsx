import React, { useState, useEffect, useCallback } from 'react';
import { BrowserRouter as Router, Routes, Route, useLocation } from 'react-router-dom';
import { AuthProvider } from './context/AuthContext';
import { WishlistProvider } from './context/WishlistContext';
import { CartProvider } from './context/CartContext';
import { ShopProvider } from './context/ShopContext';
import { CurrencyProvider, useCurrency } from './context/CurrencyContext';

import { Navbar } from './components/Navbar';
import { CategoryBar } from './components/CategoryBar';
import { CartDrawer } from './components/CartDrawer';
import { Footer } from './components/Footer';
import { MobileBottomNav } from './components/MobileBottomNav';
import { VelmiraIntroLoader } from './components/VelmiraIntroLoader';
import { RegionSelectModal } from './components/RegionSelectModal';

import { HomePage } from './pages/HomePage';
import { ProductListingPage } from './pages/ProductListingPage';
import { ProductDetailPage } from './pages/ProductDetailPage';
import { CartPage } from './pages/CartPage';
import { CheckoutPage } from './pages/CheckoutPage';
import { OrderConfirmationPage } from './pages/OrderConfirmationPage';
import { CustomerDashboardPage } from './pages/CustomerDashboardPage';
import { AdminDashboardPage } from './pages/AdminDashboardPage';
import { NotFoundPage } from './pages/NotFoundPage';

const AppLayout: React.FC = () => {
  const location = useLocation();
  const isAdmin = location.pathname.startsWith('/admin');
  const isCheckout = location.pathname.startsWith('/checkout');

  const { isRegionModalOpen, setIsRegionModalOpen } = useCurrency();
  const [showIntro, setShowIntro] = useState<boolean>(() => {
    try {
      return !sessionStorage.getItem('velmira_has_seen_intro');
    } catch {
      return false;
    }
  });

  useEffect(() => {
    // If the intro was already seen in this session but region hasn't been chosen yet
    if (!showIntro) {
      const regionChosen = localStorage.getItem('velmira_region_chosen');
      if (!regionChosen) {
        setIsRegionModalOpen(true);
      }
    }
  }, [showIntro, setIsRegionModalOpen]);

  const handleIntroComplete = useCallback(() => {
    try {
      sessionStorage.setItem('velmira_has_seen_intro', 'true');
    } catch {
      // ignore
    }
    setShowIntro(false);
    setIsRegionModalOpen(true);
  }, [setIsRegionModalOpen]);

  return (
    <div className="flex flex-col min-h-screen text-[#1A1A1A] bg-[#F8F9FA]">
      {/* 1. Initial Splash / Loading Page with Letter-by-Letter Animation */}
      {showIntro && !isAdmin && (
        <VelmiraIntroLoader onComplete={handleIntroComplete} />
      )}

      {/* 2. Destination Pop-up Modal: Are you shopping from INDIA or UAE? */}
      <RegionSelectModal
        isOpen={isRegionModalOpen && !showIntro}
        onClose={() => setIsRegionModalOpen(false)}
      />

      {!isCheckout && <Navbar />}
      {!isAdmin && !isCheckout && <CategoryBar />}

      <main className="flex-1 pb-16 sm:pb-0">
        <Routes>
          <Route path="/" element={<HomePage />} />
          <Route path="/products" element={<ProductListingPage />} />
          <Route path="/products/:id" element={<ProductDetailPage />} />
          <Route path="/cart" element={<CartPage />} />
          <Route path="/checkout" element={<CheckoutPage />} />
          <Route path="/order-confirmation/:id" element={<OrderConfirmationPage />} />
          <Route path="/dashboard" element={<CustomerDashboardPage />} />
          <Route path="/admin" element={<AdminDashboardPage />} />
          <Route path="*" element={<NotFoundPage />} />
        </Routes>
      </main>

      <CartDrawer />
      {!isCheckout && <Footer />}
      {!isCheckout && !isAdmin && <MobileBottomNav />}
    </div>
  );
};

interface ErrorBoundaryState {
  hasError: boolean;
  error?: Error;
}

class ErrorBoundary extends React.Component<{ children: React.ReactNode }, ErrorBoundaryState> {
  constructor(props: { children: React.ReactNode }) {
    super(props);
    this.state = { hasError: false };
  }

  static getDerivedStateFromError(error: Error): ErrorBoundaryState {
    return { hasError: true, error };
  }

  componentDidCatch(error: Error, errorInfo: React.ErrorInfo) {
    console.error('Velmira App Error:', error, errorInfo);
  }

  render() {
    if (this.state.hasError) {
      return (
        <div className="min-h-screen bg-[#0F0F0F] text-white flex flex-col items-center justify-center p-6 text-center">
          <h2 className="font-cinzel text-2xl font-bold text-[#D4AF37] mb-2">VELMIRA</h2>
          <p className="text-xs text-stone-300 max-w-sm mb-6">
            Something went wrong while loading the page.
          </p>
          <button
            onClick={() => {
              try {
                sessionStorage.clear();
              } catch {}
              window.location.href = '/';
            }}
            className="px-6 py-2.5 rounded-full bg-[#D4AF37] text-black font-cinzel text-xs font-bold tracking-widest uppercase hover:bg-[#c5a059] transition"
          >
            Reload Boutique
          </button>
        </div>
      );
    }
    return this.props.children;
  }
}

export function App() {
  return (
    <ErrorBoundary>
      <Router>
        <CurrencyProvider>
          <AuthProvider>
            <WishlistProvider>
              <CartProvider>
                <ShopProvider>
                  <AppLayout />
                </ShopProvider>
              </CartProvider>
            </WishlistProvider>
          </AuthProvider>
        </CurrencyProvider>
      </Router>
    </ErrorBoundary>
  );
}

export default App;
