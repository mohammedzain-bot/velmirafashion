import React, { createContext, useContext, useState, useEffect } from 'react';
import { Product, Order, Review, FilterState, CategoryType } from '../types';
import { apiService } from '../services/api';

const DEFAULT_FILTER_STATE: FilterState = {
  category: 'All',
  subcategories: [],
  brands: [],
  minPrice: 0,
  maxPrice: 50000,
  sizes: [],
  colors: [],
  minRating: 0,
  minDiscount: 0,
  inStockOnly: false,
  sortBy: 'relevance',
  searchQuery: ''
};

interface ShopContextType {
  products: Product[];
  isLoading: boolean;
  filters: FilterState;
  setFilters: React.Dispatch<React.SetStateAction<FilterState>>;
  resetFilters: () => void;
  filteredProducts: Product[];
  categories: CategoryType[];
  allBrands: string[];
  allSubcategories: string[];
  allSizes: string[];
  orders: Order[];
  refreshProducts: () => Promise<void>;
  refreshOrders: () => Promise<void>;
  addProduct: (product: Partial<Product>) => Promise<Product>;
  updateProduct: (id: string, product: Partial<Product>) => Promise<Product>;
  deleteProduct: (id: string) => Promise<boolean>;
  updateStock: (id: string, newStock: number) => Promise<boolean>;
  placeOrder: (orderData: Partial<Order>) => Promise<Order>;
  updateOrderStatus: (id: string, status: Order['orderStatus']) => Promise<Order>;
  requestReturn: (id: string, reason: string) => Promise<Order>;
  getReviewsForProduct: (productId: string) => Promise<Review[]>;
  submitReview: (review: Omit<Review, 'id' | 'createdAt' | 'helpfulCount'>) => Promise<Review>;
}

const ShopContext = createContext<ShopContextType | undefined>(undefined);

export const ShopProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [products, setProducts] = useState<Product[]>([]);
  const [orders, setOrders] = useState<Order[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [filters, setFilters] = useState<FilterState>(DEFAULT_FILTER_STATE);

  const refreshProducts = async () => {
    try {
      const data = await apiService.getProducts();
      setProducts(data);
    } catch (err) {
      console.error('Failed to fetch products:', err);
    } finally {
      setIsLoading(false);
    }
  };

  const refreshOrders = async () => {
    try {
      const data = await apiService.getOrders();
      setOrders(data);
    } catch (err) {
      console.error('Failed to fetch orders:', err);
    }
  };

  useEffect(() => {
    refreshProducts();
    refreshOrders();
  }, []);

  const resetFilters = () => {
    setFilters(DEFAULT_FILTER_STATE);
  };

  // Derive filter options dynamically from current catalog
  const categories: CategoryType[] = [
    'All',
    'Men',
    'Women',
    'Kids',
    'Ethnic Wear',
    'Western Wear',
    'Footwear',
    'Accessories',
    'New Arrivals',
    'Sale'
  ];

  const allBrands = Array.from(new Set(products.map(p => p.brand))).filter(Boolean);
  const allSubcategories = Array.from(new Set(products.map(p => p.subcategory))).filter(Boolean);
  const allSizes = Array.from(new Set(products.flatMap(p => p.sizes))).filter(Boolean);

  // Dynamic filter and sorting logic
  const filteredProducts = products.filter(product => {
    // Category match
    if (filters.category !== 'All') {
      if (filters.category === 'New Arrivals') {
        if (!product.isNewArrival) return false;
      } else if (filters.category === 'Sale') {
        if (!product.isTopDeal && product.discountPercentage < 50 && product.category !== 'Sale') return false;
      } else if (product.category !== filters.category) {
        return false;
      }
    }

    // Search query match
    if (filters.searchQuery.trim()) {
      const q = filters.searchQuery.toLowerCase();
      const match =
        product.name.toLowerCase().includes(q) ||
        product.brand.toLowerCase().includes(q) ||
        product.category.toLowerCase().includes(q) ||
        product.subcategory.toLowerCase().includes(q) ||
        product.description.toLowerCase().includes(q);
      if (!match) return false;
    }

    // Subcategory match
    if (filters.subcategories.length > 0) {
      if (!filters.subcategories.includes(product.subcategory)) return false;
    }

    // Brand match
    if (filters.brands.length > 0) {
      if (!filters.brands.includes(product.brand)) return false;
    }

    // Price range match
    if (product.discountedPrice < filters.minPrice || product.discountedPrice > filters.maxPrice) {
      return false;
    }

    // Sizes match
    if (filters.sizes.length > 0) {
      const hasSize = product.sizes.some(s => filters.sizes.includes(s));
      if (!hasSize) return false;
    }

    // Rating match
    if (filters.minRating > 0 && product.rating < filters.minRating) {
      return false;
    }

    // Discount match
    if (filters.minDiscount > 0 && product.discountPercentage < filters.minDiscount) {
      return false;
    }

    // In-Stock only
    if (filters.inStockOnly && product.stock <= 0) {
      return false;
    }

    return true;
  }).sort((a, b) => {
    switch (filters.sortBy) {
      case 'price-asc':
        return a.discountedPrice - b.discountedPrice;
      case 'price-desc':
        return b.discountedPrice - a.discountedPrice;
      case 'newest':
        return new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime();
      case 'popularity':
      case 'rating':
        return b.rating - a.rating;
      case 'relevance':
      default:
        return 0;
    }
  });

  // Admin Actions
  const addProduct = async (product: Partial<Product>) => {
    const created = await apiService.addProduct(product);
    await refreshProducts();
    return created;
  };

  const updateProduct = async (id: string, updates: Partial<Product>) => {
    const updated = await apiService.updateProduct(id, updates);
    await refreshProducts();
    return updated;
  };

  const deleteProduct = async (id: string) => {
    const res = await apiService.deleteProduct(id);
    await refreshProducts();
    return res;
  };

  const updateStock = async (id: string, newStock: number) => {
    const res = await apiService.updateProductStock(id, newStock);
    await refreshProducts();
    return res;
  };

  // Order Actions
  const placeOrder = async (orderData: Partial<Order>) => {
    const created = await apiService.createOrder(orderData);
    await refreshOrders();
    await refreshProducts(); // stock updated
    return created;
  };

  const updateOrderStatus = async (id: string, status: Order['orderStatus']) => {
    const updated = await apiService.updateOrderStatus(id, status);
    await refreshOrders();
    return updated;
  };

  const requestReturn = async (id: string, reason: string) => {
    const updated = await apiService.requestReturn(id, reason);
    await refreshOrders();
    return updated;
  };

  const getReviewsForProduct = async (productId: string) => {
    return apiService.getReviews(productId);
  };

  const submitReview = async (review: Omit<Review, 'id' | 'createdAt' | 'helpfulCount'>) => {
    return apiService.addReview(review);
  };

  return (
    <ShopContext.Provider
      value={{
        products,
        isLoading,
        filters,
        setFilters,
        resetFilters,
        filteredProducts,
        categories,
        allBrands,
        allSubcategories,
        allSizes,
        orders,
        refreshProducts,
        refreshOrders,
        addProduct,
        updateProduct,
        deleteProduct,
        updateStock,
        placeOrder,
        updateOrderStatus,
        requestReturn,
        getReviewsForProduct,
        submitReview
      }}
    >
      {children}
    </ShopContext.Provider>
  );
};

export const useShop = () => {
  const context = useContext(ShopContext);
  if (!context) throw new Error('useShop must be used within ShopProvider');
  return context;
};
