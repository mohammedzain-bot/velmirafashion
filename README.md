# VELMIRA FASHION — Premium Haute Couture E-Commerce Platform

A production-grade, full-stack luxury fashion e-commerce marketplace named **VELMIRA FASHION**, inspired by the shopping experience and layout architecture of Flipkart, but crafted with a bespoke, high-end fashion visual identity.

---

## 🌟 Brand Identity & Visual Language

- **Brand Name**: VELMIRA FASHION
- **Palette**: Deep Black (`#0F0F0F`), Warm White (`#FAFAF8`), Champagne Gold (`#D4AF37` / `#C5A059`), Soft Neutral Grey (`#F8F9FA`), Dark Charcoal (`#1A1A1A`)
- **Typography**: Cinzel, Playfair Display & Plus Jakarta Sans
- **Experience**: Clean, mobile-first responsive, micro-animations, skeleton feedback, toast notifications, and interactive modals.

---

## 🚀 Key Features & Architectural Modules

### 1. Flipkart-Inspired Top Navigation & Category Ribbon
- **Top Announcement Bar**: White-glove delivery alerts, voucher codes, direct quick-links to Live Order Tracking & Admin Suite.
- **Center Smart Search**: Real-time autocomplete suggestions, matching products preview, and trending fashion search queries.
- **Interactive Header**: Profile menu, Wishlist badge counter, Shopping Bag drawer with live badge.
- **Horizontal Category Ribbon**: Men, Women, Kids, Ethnic Wear, Western Wear, Footwear, Accessories, New Arrivals, Sale with animated status pills.

### 2. Homepage & Showcases
- **Hero Lifestyle Slider**: "STYLE THAT DEFINES YOU" carousel with high-resolution fashion photography, smooth transitions, autoplay, pause-on-hover, and CTA buttons.
- **Trust Assurance Strip**: 100% Genuine Luxury, 7-Day Doorstep Returns, Free Express Air Cargo, Dedicated Concierge.
- **Curated Featured Categories**: Women's Couture, Men's Sartorial, Ethnic Collection, Formal Bespoke, Footwear.
- **Dynamic Flash Deals Event**: Live countdown clock for limited-time trunk sales.
- **Horizontal Product Sliders**: Trending In Haute Couture, Velmira Best Sellers, Fresh Runway Arrivals.
- **Personalized Recommendation Grid**: Flipkart-style responsive card grid with secondary image on hover, star rating pills, size previews, and instant Add to Bag.

### 3. Comprehensive Product Listing & Dynamic Filtering
- **Left Sidebar Filters**: Department, Subcategory, Atelier Brand, Price Range Slider (up to ₹50,000), Size Pills, Rating Radios (4★ & above), Discount Filters (50%+, 40%+, 20%+), and In-Stock Only toggle.
- **Instant Sorting**: Relevance, Price: Low to High, Price: High to Low, Newest First, Popularity, Highest Customer Rated.
- **Active Filter Badges**: Single-click tag dismissal and "Reset All" functionality.

### 4. Product Details Experience
- **Multi-Angle Gallery**: High-resolution thumbnails with main zoomable preview.
- **Atelier Specifications**: Silk composition, weave type, lining, silhouette fit, occasion, and garment care.
- **Size Selector & Interactive Size Guide**: Measurements in both Inches and Centimeters for Apparel and Footwear.
- **Color & Quantity Selectors**: Stock availability counter with low-stock urgency alerts.
- **Indian PIN Code Delivery Checker**: Instant delivery date calculation (e.g., Mumbai 400053) and Cash on Delivery availability indicator.
- **Patron Reviews & Interactive Review Form**: Star rating breakdown, verified buyer badges, and real-time review submission.
- **Related Silhouettes Carousel**: Recommends similar garments from the same atelier category.

### 5. Shopping Bag & Coupon Engine
- **Slide-out Bag Drawer & Dedicated Bag Page**: Real-time quantity adjustment, size modification, and item removal.
- **Free Delivery Progress Meter**: Visual progress towards the ₹999 threshold for complimentary express delivery.
- **Promotional Coupon Engine**: Supports codes like `VELMIRA500` (Flat ₹500 OFF) and `FIRSTBUY` (15% OFF) with instant validation.
- **Flipkart-Style Price Breakdown**: Total M.R.P., M.R.P. Discount, Coupon Savings, Express Shipping, and Final Payable Amount.

### 6. Multi-Step Checkout Flow
- **Step 1: Customer Profile**: Verify name, email, and primary mobile number.
- **Step 2: Delivery Address**: Choose between saved addresses or add new addresses with PIN code lookup.
- **Step 3: Order Summary**: Review quantities, sizes, and price breakdown.
- **Step 4: Payment Options**:
  - Instant UPI (GPay, PhonePe, Paytm, BHIM with UPI ID input)
  - Credit / Debit Cards (Visa, MasterCard, RuPay with 3D Secure simulation)
  - Net Banking (HDFC, ICICI, SBI, Axis Bank)
  - Cash on Delivery (COD)

### 7. Post-Order & Customer Dashboard
- **Order Confirmation Page**: Celebratory confetti animation, unique Order Reference ID (`VEL-XXXXXX`).
- **Live Visual Consignment Stepper**: Order Confirmed ➔ Quality Inspection ➔ BlueDart Air Cargo Dispatched ➔ Out for Delivery ➔ Doorstep Handover.
- **Downloadable / Printable Tax Invoice**: Comprehensive GST invoice with GSTIN, HSN breakdown, CGST/SGST tax calculations, and authorized signatory stamp.
- **Customer Account Suite**:
  - Profile Management
  - My Orders history with live status tags
  - Curated Wishlist with 1-click Move to Bag
  - Saved Address book management
  - 7-Day Returns & Refund management

### 8. Admin Management Portal (`/admin`)
- **Executive Analytics**: Total Sales (₹), Total Orders, Active Catalog Count, Low Stock Alerts, and Department Contribution graphs.
- **Product Management CRUD**: Add new couture items, edit existing garments, delete items, manage prices and stock.
- **Order Management**: Real-time status updates (Placed, Processing, Shipped, Out for Delivery, Delivered, Cancelled).
- **Inventory Engine**: Real-time inventory deduction upon confirmed orders, quick stock adjustment, and low-stock alerts.
- **Customer Roster**: Registered VIP patrons and their total order metrics.

---

## 🛠️ Tech Stack & Architecture

- **Frontend**: React 18, TypeScript, Vite, Tailwind CSS v4, Lucide Icons, React Router v7
- **Animations & Interactivity**: Canvas Confetti, smooth image hover transitions
- **Backend API**: Node.js & Express REST API (`server/index.js`)
- **Data Persistence**: Persistent JSON database engine in `server/data/` (products, orders, coupons, users) with automated browser cache synchronization

---

## 💻 Running Locally

### 1. Install Dependencies
```bash
npm install
```

### 2. Start Full-Stack App (Backend API + Frontend)
```bash
npm run dev
```
- **Storefront URL**: `http://localhost:5173`
- **Backend REST API**: `http://localhost:5000`
- **Admin Portal**: `http://localhost:5173/admin`
- **Customer Dashboard**: `http://localhost:5173/dashboard`

---

## 👑 Demo Credentials
- **Customer Demo**: Click "Instant Customer Login" on the login modal to log in as **Aarav Sharma**.
- **Admin Demo**: Click "Instant Admin Login" on the login modal or navigate directly to `/admin`.
