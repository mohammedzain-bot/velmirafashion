import React, { createContext, useContext, useState, useEffect } from 'react';
import { CartItem, Product, Coupon } from '../types';
import { apiService } from '../services/api';

interface CartContextType {
  cart: CartItem[];
  addToCart: (product: Product, size: string, color: string, quantity?: number) => void;
  removeFromCart: (itemId: string) => void;
  updateQuantity: (itemId: string, newQty: number) => void;
  updateItemSize: (itemId: string, newSize: string) => void;
  clearCart: () => void;
  totalItemsCount: number;
  totalMRP: number;
  subtotal: number;
  mrpDiscount: number;
  deliveryFee: number;
  appliedCoupon: Coupon | null;
  couponDiscount: number;
  finalTotal: number;
  freeDeliveryThreshold: number;
  freeDeliveryRemaining: number;
  applyCoupon: (code: string) => Promise<{ success: boolean; message: string }>;
  removeCoupon: () => void;
  isCartDrawerOpen: boolean;
  setIsCartDrawerOpen: (open: boolean) => void;
}

const CartContext = createContext<CartContextType | undefined>(undefined);

const FREE_DELIVERY_THRESHOLD = 999;
const STANDARD_DELIVERY_FEE = 149;

export const CartProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [cart, setCart] = useState<CartItem[]>(() => {
    try {
      const saved = localStorage.getItem('velmira_cart');
      if (saved) return JSON.parse(saved);
    } catch {
      // fallback
    }
    // Default starter item for instant interactive feel
    return [
      {
        id: 'prod-101-Free Size-Royal Crimson Red',
        productId: 'prod-101',
        name: 'Royal Heritage Banarasi Katan Silk Saree with Zari Weave',
        brand: 'VELMIRA COUTURE',
        image: 'https://images.unsplash.com/photo-1610030469983-98e550d6193c?auto=format&fit=crop&w=900&q=80',
        size: 'Free Size',
        color: 'Royal Crimson Red',
        price: 8999,
        originalPrice: 18999,
        quantity: 1,
        maxStock: 14
      }
    ];
  });

  const [appliedCoupon, setAppliedCoupon] = useState<Coupon | null>(() => {
    try {
      const saved = localStorage.getItem('velmira_applied_coupon');
      return saved ? JSON.parse(saved) : null;
    } catch {
      return null;
    }
  });

  const [isCartDrawerOpen, setIsCartDrawerOpen] = useState(false);

  useEffect(() => {
    localStorage.setItem('velmira_cart', JSON.stringify(cart));
  }, [cart]);

  useEffect(() => {
    if (appliedCoupon) {
      localStorage.setItem('velmira_applied_coupon', JSON.stringify(appliedCoupon));
    } else {
      localStorage.removeItem('velmira_applied_coupon');
    }
  }, [appliedCoupon]);

  const addToCart = (product: Product, size: string, color: string, quantity = 1) => {
    const selectedSize = size || (product.sizes[0] || 'Free Size');
    const selectedColor = color || (product.colors[0]?.name || 'Standard');
    const itemId = `${product.id}-${selectedSize}-${selectedColor}`;

    setCart(prev => {
      const existing = prev.find(item => item.id === itemId);
      if (existing) {
        const newQty = Math.min(existing.quantity + quantity, product.stock);
        return prev.map(item => (item.id === itemId ? { ...item, quantity: newQty } : item));
      } else {
        const newItem: CartItem = {
          id: itemId,
          productId: product.id,
          name: product.name,
          brand: product.brand,
          image: product.images[0],
          size: selectedSize,
          color: selectedColor,
          price: product.discountedPrice,
          originalPrice: product.originalPrice,
          quantity: Math.min(quantity, product.stock),
          maxStock: product.stock
        };
        return [newItem, ...prev];
      }
    });

    setIsCartDrawerOpen(true);
  };

  const removeFromCart = (itemId: string) => {
    setCart(prev => prev.filter(item => item.id !== itemId));
  };

  const updateQuantity = (itemId: string, newQty: number) => {
    if (newQty <= 0) {
      removeFromCart(itemId);
      return;
    }
    setCart(prev =>
      prev.map(item => {
        if (item.id === itemId) {
          return { ...item, quantity: Math.min(newQty, item.maxStock || 10) };
        }
        return item;
      })
    );
  };

  const updateItemSize = (itemId: string, newSize: string) => {
    setCart(prev =>
      prev.map(item => {
        if (item.id === itemId) {
          const newId = `${item.productId}-${newSize}-${item.color}`;
          return { ...item, id: newId, size: newSize };
        }
        return item;
      })
    );
  };

  const clearCart = () => {
    setCart([]);
    setAppliedCoupon(null);
  };

  // Calculations
  const totalItemsCount = cart.reduce((sum, item) => sum + item.quantity, 0);
  const totalMRP = cart.reduce((sum, item) => sum + item.originalPrice * item.quantity, 0);
  const subtotal = cart.reduce((sum, item) => sum + item.price * item.quantity, 0);
  const mrpDiscount = totalMRP - subtotal;
  const deliveryFee = subtotal >= FREE_DELIVERY_THRESHOLD || cart.length === 0 ? 0 : STANDARD_DELIVERY_FEE;
  const freeDeliveryRemaining = Math.max(0, FREE_DELIVERY_THRESHOLD - subtotal);

  // Coupon discount calculation
  let couponDiscount = 0;
  if (appliedCoupon && subtotal >= appliedCoupon.minOrderValue) {
    if (appliedCoupon.discountType === 'flat') {
      couponDiscount = appliedCoupon.value;
    } else {
      couponDiscount = Math.round((subtotal * appliedCoupon.value) / 100);
      if (appliedCoupon.maxDiscount && couponDiscount > appliedCoupon.maxDiscount) {
        couponDiscount = appliedCoupon.maxDiscount;
      }
    }
  }

  const finalTotal = Math.max(0, subtotal - couponDiscount + deliveryFee);

  const applyCoupon = async (code: string) => {
    const res = await apiService.validateCoupon(code, subtotal);
    if (res.valid) {
      const coupons = await apiService.getCoupons();
      const match = coupons.find(c => c.code.toUpperCase() === code.toUpperCase().trim());
      if (match) {
        setAppliedCoupon(match);
        return { success: true, message: res.message };
      }
    }
    return { success: false, message: res.message };
  };

  const removeCoupon = () => {
    setAppliedCoupon(null);
  };

  return (
    <CartContext.Provider
      value={{
        cart,
        addToCart,
        removeFromCart,
        updateQuantity,
        updateItemSize,
        clearCart,
        totalItemsCount,
        totalMRP,
        subtotal,
        mrpDiscount,
        deliveryFee,
        appliedCoupon,
        couponDiscount,
        finalTotal,
        freeDeliveryThreshold: FREE_DELIVERY_THRESHOLD,
        freeDeliveryRemaining,
        applyCoupon,
        removeCoupon,
        isCartDrawerOpen,
        setIsCartDrawerOpen
      }}
    >
      {children}
    </CartContext.Provider>
  );
};

export const useCart = () => {
  const context = useContext(CartContext);
  if (!context) throw new Error('useCart must be used within CartProvider');
  return context;
};
