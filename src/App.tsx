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
  
  // When refreshing the site, always start fresh from the beginning with the minimal VELMIRA intro
  const [showIntro, setShowIntro] = useState<boolean>(true);
  const [scrollProgress, setScrollProgress] = useState<number>(0);

  // Scroll to beginning on refresh and track sleek scroll progress bar
  useEffect(() => {
    if ('scrollRestoration' in history) {
      history.scrollRestoration = 'manual';
    }
    window.scrollTo({ top: 0, left: 0, behavior: 'instant' });

    const handleScroll = () => {
      const totalScroll = document.documentElement.scrollHeight - window.innerHeight;
      if (totalScroll > 0) {
        const progress = (window.scrollY / totalScroll) * 100;
        setScrollProgress(Math.min(100, Math.max(0, progress)));
      } else {
        setScrollProgress(0);
      }
    };

    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  // Scroll to top on route change
  useEffect(() => {
    window.scrollTo({ top: 0, left: 0, behavior: 'instant' });
  }, [location.pathname]);

  const handleIntroComplete = useCallback(() => {
    setShowIntro(false);
    // After intro finishes, check if country is selected
    const regionChosen = localStorage.getItem('velmira_region_chosen');
    if (!regionChosen) {
      setIsRegionModalOpen(true);
    }
  }, [setIsRegionModalOpen]);

  return (
    <div className="flex flex-col min-h-screen text-[#1A1A1A] bg-[#0A0A0A] selection:bg-[#D4AF37]/30 selection:text-white">
      {/* Sleek Modern Scrolling Bar Across the Website */}
      <div className="fixed top-0 left-0 right-0 h-[2.5px] z-[99999] bg-transparent pointer-events-none">
        <div 
          className="h-full bg-gradient-to-r from-[#B89736] via-[#D4AF37] to-[#FFF2B2] shadow-[0_0_10px_rgba(212,175,55,0.8)] transition-all duration-75 ease-out"
          style={{ width: `${scrollProgress}%` }}
        />
      </div>

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

      <main className="flex-1 pb-16 sm:pb-0 bg-[#0A0A0A]">
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
        <div className="min-h-screen bg-[#0A0A0A] text-white flex flex-col items-center justify-center p-6 text-center">
          <h2 className="font-cinzel text-2xl font-bold text-[#D4AF37] mb-2 tracking-widest">VELMIRA</h2>
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
            Reload Atelier
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
