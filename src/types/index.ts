export type CategoryType = 
  | 'All'
  | 'Watches'
  | 'Chronograph'
  | 'Automatic'
  | 'Tourbillon'
  | 'Diver'
  | 'Skeleton'
  | 'Moonphase'
  | 'Classic Dress'
  | 'New Arrivals' 
  | 'Sale';

export type CurrencyType = 'INR' | 'AED';
export type CountryType = 'India' | 'UAE';

export interface ProductColor {
  name: string;
  hex: string;
}

export interface Review {
  id: string;
  productId: string;
  userName: string;
  userLocation: string;
  rating: number;
  title: string;
  comment: string;
  verifiedPurchase: boolean;
  helpfulCount: number;
  createdAt: string;
}

export interface Product {
  id: string;
  name: string;
  brand: string;
  category: CategoryType;
  subcategory: string;
  originalPrice: number; // in INR
  discountedPrice: number; // in INR
  priceAED: number; // in AED
  originalPriceAED: number; // in AED
  discountPercentage: number;
  rating: number;
  ratingCount: number;
  reviewCount: number;
  images: string[];
  sizes: string[]; // for watches: dial size e.g. 38mm, 40mm, 42mm, 44mm
  colors: ProductColor[];
  stock: number;
  isTrending?: boolean;
  isBestSeller?: boolean;
  isNewArrival?: boolean;
  isTopDeal?: boolean;
  description: string;
  fabric: string; // Case Material: 316L Surgical Steel, 18K Rose Gold PVD, Grade 5 Titanium, High-Tech Ceramic
  fit: string; // Case Dimension & Thickness
  pattern: string; // Dial Finish: Sunburst Guilloché, Openwork Skeleton, Enamel
  occasion: string;
  care: string;
  specifications: Record<string, string>;
  createdAt: string;
}

export interface Address {
  id: string;
  fullName: string;
  phone: string;
  country: CountryType;
  addressLine1: string;
  addressLine2?: string;
  landmark?: string;
  city: string;
  state: string; // State (India) or Emirate (UAE)
  pincode: string; // PIN Code (India) or Postal/Makani (UAE)
  addressType: 'Home' | 'Work' | 'Other';
  isDefault: boolean;
}

export interface User {
  id: string;
  name: string;
  email: string;
  phone: string;
  role: 'customer' | 'admin';
  addresses: Address[];
  createdAt: string;
}

export interface CartItem {
  id: string;
  productId: string;
  name: string;
  brand: string;
  image: string;
  size: string;
  color: string;
  price: number; // in INR
  originalPrice: number;
  priceAED: number;
  originalPriceAED: number;
  quantity: number;
  maxStock: number;
}

export interface Coupon {
  code: string;
  discountType: 'percentage' | 'flat';
  value: number; // in INR
  valueAED: number; // in AED
  minOrderValue: number;
  minOrderValueAED: number;
  maxDiscount?: number;
  description: string;
  expiryDate: string;
}

export interface TrackingEvent {
  status: string;
  title: string;
  location: string;
  timestamp: string;
  done: boolean;
}

export interface OrderItem {
  productId: string;
  name: string;
  brand: string;
  image: string;
  size: string;
  color: string;
  price: number;
  originalPrice: number;
  priceAED: number;
  quantity: number;
}

export interface Order {
  id: string;
  customerId: string;
  customerName: string;
  customerEmail: string;
  customerPhone: string;
  country: CountryType;
  currency: CurrencyType;
  items: OrderItem[];
  shippingAddress: Address;
  paymentMethod: 'whatsapp' | 'cod' | 'upi' | 'card' | 'netbanking';
  paymentStatus: 'pending' | 'completed' | 'whatsapp_order';
  orderStatus: 'Placed' | 'Processing' | 'Shipped' | 'Out for Delivery' | 'Delivered' | 'Cancelled';
  orderDate: string;
  estimatedDelivery: string;
  trackingNumber: string;
  courierPartner: string;
  trackingEvents: TrackingEvent[];
  subtotal: number;
  discount: number;
  couponCode?: string;
  couponDiscount: number;
  deliveryFee: number;
  totalAmount: number;
  subtotalAED?: number;
  totalAmountAED?: number;
  whatsappMessageSent?: boolean;
  returnRequested?: boolean;
  returnStatus?: 'none' | 'requested' | 'approved' | 'picked_up' | 'refunded';
  returnReason?: string;
}

export interface FilterState {
  category: CategoryType;
  subcategories: string[];
  brands: string[];
  minPrice: number;
  maxPrice: number;
  sizes: string[];
  colors: string[];
  minRating: number;
  minDiscount: number;
  inStockOnly: boolean;
  sortBy: 'relevance' | 'price-asc' | 'price-desc' | 'newest' | 'popularity' | 'rating';
  searchQuery: string;
}
