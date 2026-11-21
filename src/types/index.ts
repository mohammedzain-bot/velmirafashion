export type CategoryType = 
  | 'All'
  | 'Men' 
  | 'Women' 
  | 'Kids' 
  | 'Ethnic Wear' 
  | 'Western Wear' 
  | 'Footwear' 
  | 'Accessories' 
  | 'New Arrivals' 
  | 'Sale';

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
  originalPrice: number;
  discountedPrice: number;
  discountPercentage: number;
  rating: number;
  ratingCount: number;
  reviewCount: number;
  images: string[];
  sizes: string[];
  colors: ProductColor[];
  stock: number;
  isTrending?: boolean;
  isBestSeller?: boolean;
  isNewArrival?: boolean;
  isTopDeal?: boolean;
  description: string;
  fabric: string;
  fit: string;
  pattern: string;
  occasion: string;
  care: string;
  specifications: Record<string, string>;
  createdAt: string;
}

export interface Address {
  id: string;
  fullName: string;
  phone: string;
  addressLine1: string;
  addressLine2?: string;
  landmark?: string;
  city: string;
  state: string;
  pincode: string;
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
  id: string; // unique item id = productId + size + color
  productId: string;
  name: string;
  brand: string;
  image: string;
  size: string;
  color: string;
  price: number;
  originalPrice: number;
  quantity: number;
  maxStock: number;
}

export interface Coupon {
  code: string;
  discountType: 'percentage' | 'flat';
  value: number;
  minOrderValue: number;
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
  quantity: number;
}

export interface Order {
  id: string; // e.g. VEL-89123
  customerId: string;
  customerName: string;
  customerEmail: string;
  customerPhone: string;
  items: OrderItem[];
  shippingAddress: Address;
  paymentMethod: 'cod' | 'upi' | 'card' | 'netbanking';
  paymentStatus: 'pending' | 'completed' | 'failed';
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
