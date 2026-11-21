import React, { useState, useEffect } from 'react';
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

  const handleIntroComplete = () => {
    try {
      sessionStorage.setItem('velmira_has_seen_intro', 'true');
    } catch {
      // ignore
    }
    setShowIntro(false);
    setIsRegionModalOpen(true);
  };

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

export function App() {
  return (
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
  );
}

export default App;
