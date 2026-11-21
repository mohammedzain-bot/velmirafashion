import { Product, Coupon, Review } from '../types';

export const INITIAL_PRODUCTS: Product[] = [
  // 1. WATCH: Velmira Chrono Royal 41mm
  {
    id: 'prod-w1',
    name: 'Velmira Chrono Royal Automatic 41mm Emerald Sunburst Dial',
    brand: 'VELMIRA SIGNATURE',
    category: "Men's Watches",
    subcategory: 'Chronograph Watches',
    originalPrice: 28999,
    discountedPrice: 13999,
    originalPriceAED: 1290,
    priceAED: 620,
    discountPercentage: 52,
    rating: 4.9,
    ratingCount: 1420,
    reviewCount: 388,
    images: [
      'https://images.unsplash.com/photo-1522335789203-aabd1fc54bc9?auto=format&fit=crop&w=900&q=80',
      'https://images.unsplash.com/photo-1524805444758-089113d48a6d?auto=format&fit=crop&w=900&q=80',
      'https://images.unsplash.com/photo-1548036328-c9fa89d128fa?auto=format&fit=crop&w=900&q=80'
    ],
    sizes: ['41mm Dial'],
    colors: [
      { name: 'Champagne Gold & Sunburst Emerald', hex: '#2E8B57' },
      { name: 'Rose Gold & Obsidian Black', hex: '#111111' },
      { name: 'Silver Steel & Ice Blue', hex: '#B0E0E6' }
    ],
    stock: 8,
    isTrending: true,
    isBestSeller: true,
    isTopDeal: true,
    description: 'A masterpiece of Swiss precision and haute horology. Powered by an automatic 24-jewel self-winding movement with 42-hour power reserve. Features scratch-proof domed sapphire crystal, 18K champagne gold PVD coating, and genuine alligator-embossed Italian leather strap with double deployment clasp.',
    fabric: '316L Surgical Grade Stainless Steel, 18K Gold PVD, Sapphire Crystal',
    fit: '41mm Case Diameter • 11.2mm Thickness',
    pattern: 'Sunburst Guilloché Dial with Luminescent Gold Hands',
    occasion: 'Executive Boardrooms, Black Tie Galas & Everyday Luxury',
    care: '5 ATM Water Resistant (50 meters). Wipe with microfiber polishing cloth.',
    specifications: {
      'Movement': 'Japanese Miyota 9015 Automatic (28,800 vph)',
      'Glass': 'Domed Anti-Reflective Scratchproof Sapphire Crystal',
      'Power Reserve': '42 Hours Power Reserve',
      'Strap Material': 'Italian Full-Grain Alligator Embossed Leather',
      'Water Resistance': '5 ATM / 50 Meters',
      'Country of Origin': 'Switzerland & Italy'
    },
    createdAt: '2026-01-10T10:00:00Z'
  },

  // 2. BAG: Velmira Saffiano Executive Tote Bag
  {
    id: 'prod-b1',
    name: 'Italian Saffiano Leather Structured Executive Tote Bag',
    brand: 'AURELIA LUXE',
    category: 'Tote Bags',
    subcategory: 'Tote Bags',
    originalPrice: 19999,
    discountedPrice: 9499,
    originalPriceAED: 890,
    priceAED: 420,
    discountPercentage: 53,
    rating: 4.8,
    ratingCount: 890,
    reviewCount: 245,
    images: [
      'https://images.unsplash.com/photo-1584917865442-de89df76afd3?auto=format&fit=crop&w=900&q=80',
      'https://images.unsplash.com/photo-1591561954557-26941169b49e?auto=format&fit=crop&w=900&q=80',
      'https://images.unsplash.com/photo-1566150905458-1bf1fc113f0d?auto=format&fit=crop&w=900&q=80'
    ],
    sizes: ['Medium (14" × 11" × 5")', 'Large (16" × 12" × 6")'],
    colors: [
      { name: 'Midnight Onyx Black', hex: '#111111' },
      { name: 'Warm Cognac Tan', hex: '#9E5B32' },
      { name: 'Powder Ivory Cream', hex: '#FFFFF0' }
    ],
    stock: 12,
    isTrending: true,
    isBestSeller: true,
    description: 'Handcrafted in Milan from scratch-resistant Saffiano calf leather. Accented with brushed champagne gold hardware, dedicated 14-inch padded laptop compartment, and dual top-carry handles plus detachable leather shoulder strap.',
    fabric: '100% Saffiano Calfskin Leather with Micro-Suede Velvet Lining',
    fit: '14" Length × 11" Height × 5" Depth',
    pattern: 'Crosshatch Saffiano Textured Leather',
    occasion: 'Executive Business, Luxury Travel & Fine Dining',
    care: 'Wipe with soft damp cloth. Store wrapped in protective cotton dust cover.',
    specifications: {
      'Hardware': '18K Champagne Gold Electroplated Solid Brass',
      'Compartments': '3 Zip Sections + Padded 14" Laptop Pocket',
      'Closure': 'Heavy-Duty Gold YKK Zip & Magnetic Snap',
      'Strap Drop': '9" Handle Drop + 48" Detachable Shoulder Strap',
      'Country of Origin': 'Milan, Italy'
    },
    createdAt: '2026-01-12T10:00:00Z'
  },

  // 3. WATCH: Velmira Tourbillon Grand Complication
  {
    id: 'prod-w2',
    name: 'Velmira Tourbillon Grand Complication Rose Gold & Obsidian',
    brand: 'VELMIRA SIGNATURE',
    category: "Men's Watches",
    subcategory: 'Tourbillon Watches',
    originalPrice: 42999,
    discountedPrice: 21999,
    originalPriceAED: 1890,
    priceAED: 980,
    discountPercentage: 49,
    rating: 4.9,
    ratingCount: 610,
    reviewCount: 178,
    images: [
      'https://images.unsplash.com/photo-1509042239860-f550ce710b93?auto=format&fit=crop&w=900&q=80',
      'https://images.unsplash.com/photo-1522335789203-aabd1fc54bc9?auto=format&fit=crop&w=900&q=80',
      'https://images.unsplash.com/photo-1524805444758-089113d48a6d?auto=format&fit=crop&w=900&q=80'
    ],
    sizes: ['42mm Dial'],
    colors: [
      { name: '18K Rose Gold & Obsidian', hex: '#B76E79' },
      { name: 'Platinum Silver & Midnight Blue', hex: '#1C39BB' }
    ],
    stock: 5,
    isTrending: true,
    isNewArrival: true,
    description: 'An extraordinary triumph of mechanical horology. Features an open-heart flying tourbillon cage rotating at 6 o’clock, counteracting earth gravity to achieve pinpoint chronometric precision. Double sapphire crystal exhibition caseback.',
    fabric: 'Rose Gold PVD 316L Steel, Flying Tourbillon Cage, Sapphire Crystals',
    fit: '42mm Case Diameter • 12.5mm Height',
    pattern: 'Skeleton Open-Heart Tourbillon Guilloché',
    occasion: 'High Society Events, VIP Galas & Milestone Celebrations',
    care: 'Wind 25 times upon initial setup. Service every 3-5 years.',
    specifications: {
      'Movement': 'Manual-Wind Calibre V-800 Flying Tourbillon (28,800 vph)',
      'Complications': 'Tourbillon Escapement, 24-Hour Sun & Moon Indicator',
      'Power Reserve': '72 Hours Dual Barrel',
      'Strap': 'Genuine Louisiana Alligator Hand-Stitched Leather',
      'Country of Origin': 'Geneva, Switzerland'
    },
    createdAt: '2026-01-20T10:00:00Z'
  },

  // 4. BAG: Velmira Royal Kelly-Style Handbag
  {
    id: 'prod-b2',
    name: 'Velmira Royal Kelly-Style Top Handle Handbag in Full-Grain Calfskin',
    brand: 'VALENTINO MILANO',
    category: 'Leather Bags',
    subcategory: 'Top Handle Bags',
    originalPrice: 26999,
    discountedPrice: 12999,
    originalPriceAED: 1190,
    priceAED: 580,
    discountPercentage: 52,
    rating: 4.9,
    ratingCount: 780,
    reviewCount: 215,
    images: [
      'https://images.unsplash.com/photo-1591561954557-26941169b49e?auto=format&fit=crop&w=900&q=80',
      'https://images.unsplash.com/photo-1584917865442-de89df76afd3?auto=format&fit=crop&w=900&q=80',
      'https://images.unsplash.com/photo-1566150905458-1bf1fc113f0d?auto=format&fit=crop&w=900&q=80'
    ],
    sizes: ['28cm Kelly Size', '32cm Kelly Size'],
    colors: [
      { name: 'Heritage Tan Gold', hex: '#C19A6B' },
      { name: 'Emerald Forest Green', hex: '#0B5345' },
      { name: 'Pure Noir Black', hex: '#000000' }
    ],
    stock: 6,
    isTrending: true,
    isBestSeller: true,
    isTopDeal: true,
    description: 'The pinnacle of French luxury handbag design. Constructed using saddle-stitch craftsmanship from French Box Calfskin leather. Crowned with iconic turn-lock swivel clasp and functioning padlock with key clochette.',
    fabric: 'Full-Grain French Box Calfskin, Chevre Kidskin Inner Lining',
    fit: '28cm Base Length × 22cm Height × 11cm Width',
    pattern: 'Smooth Satin-Touch Natural Grain Calfskin',
    occasion: 'Weddings, VIP Luncheons, High Fashion Soirées',
    care: 'Condition with natural leather cream.',
    specifications: {
      'Closure': 'Turn-Lock Swivel with Clochette, Key & Working Lock',
      'Base': '4 Champagne Gold Protective Base Feet (Studs)',
      'Hardware': '24K Gold Electroplated Solid Brass',
      'Country of Origin': 'Paris, France'
    },
    createdAt: '2026-01-15T10:00:00Z'
  },

  // 5. WATCH: Velmira Diamond Bezel Lady Date 34mm
  {
    id: 'prod-w3',
    name: 'Velmira Diamond Bezel Lady Date 34mm Mother-of-Pearl & Rose Gold',
    brand: 'VELMIRA SIGNATURE',
    category: "Women's Watches",
    subcategory: 'Diamond Watches',
    originalPrice: 24999,
    discountedPrice: 11999,
    originalPriceAED: 1100,
    priceAED: 530,
    discountPercentage: 52,
    rating: 4.8,
    ratingCount: 920,
    reviewCount: 310,
    images: [
      'https://images.unsplash.com/photo-1523275335684-37898b6baf30?auto=format&fit=crop&w=900&q=80',
      'https://images.unsplash.com/photo-1524805444758-089113d48a6d?auto=format&fit=crop&w=900&q=80',
      'https://images.unsplash.com/photo-1522335789203-aabd1fc54bc9?auto=format&fit=crop&w=900&q=80'
    ],
    sizes: ['34mm Petite Dial'],
    colors: [
      { name: 'Rose Gold & Natural Mother-of-Pearl', hex: '#FFDAB9' },
      { name: 'Champagne Gold & Diamond Sunburst', hex: '#E5C158' }
    ],
    stock: 9,
    isTrending: true,
    isBestSeller: true,
    description: 'An enchanting jewel on your wrist. Set with 48 pavé Austrian crystal diamonds on the fluted bezel surrounding an iridescent natural oyster mother-of-pearl dial with date window cyclops magnifier.',
    fabric: '316L Stainless Steel, 18K Rose Gold PVD, Pavé Austrian Crystals',
    fit: '34mm Case Diameter • 10mm Thickness • Adjustable Jubilee Link',
    pattern: 'Natural Shimmering Mother-of-Pearl Dial',
    occasion: 'Weddings, Cocktail Galas & Everyday Glamour',
    care: '5 ATM Water Resistant. Wipe clean with velvet cloth.',
    specifications: {
      'Bezel': 'Fluted Bezel Set with 48 Hand-Selected Pavé Crystals',
      'Dial': 'Authentic Iridescent White Mother-of-Pearl',
      'Bracelet': 'Five-Piece Jubilee Style Solid Link Bracelet',
      'Crystal': 'Sapphire Crystal with 2.5x Date Magnifier Lens',
      'Country of Origin': 'Switzerland'
    },
    createdAt: '2026-01-25T10:00:00Z'
  },

  // 6. BAG: Velmira Quilted Velvet & Leather Evening Clutch
  {
    id: 'prod-b3',
    name: 'Velmira Quilted Velvet & Leather Evening Chain Flap Clutch',
    brand: 'VALENTINO MILANO',
    category: 'Clutches & Wallets',
    subcategory: 'Evening Clutches',
    originalPrice: 14999,
    discountedPrice: 6999,
    originalPriceAED: 660,
    priceAED: 310,
    discountPercentage: 53,
    rating: 4.9,
    ratingCount: 540,
    reviewCount: 165,
    images: [
      'https://images.unsplash.com/photo-1566150905458-1bf1fc113f0d?auto=format&fit=crop&w=900&q=80',
      'https://images.unsplash.com/photo-1591561954557-26941169b49e?auto=format&fit=crop&w=900&q=80',
      'https://images.unsplash.com/photo-1584917865442-de89df76afd3?auto=format&fit=crop&w=900&q=80'
    ],
    sizes: ['Compact (9" × 5.5" × 2.5")'],
    colors: [
      { name: 'Royal Velvet Noir', hex: '#0A0A0A' },
      { name: 'Champagne Rose Gold', hex: '#B76E79' },
      { name: 'Burgundy Wine Velvet', hex: '#4A0E17' }
    ],
    stock: 14,
    isTrending: true,
    isNewArrival: true,
    description: 'Sumptuous chevron-quilted Italian velvet paired with supple lambskin leather trim. Features an elegant sliding champagne gold gourmette chain that transitions effortlessly from shoulder bag to evening clutch.',
    fabric: 'Heavy Silk Velvet, Lambskin Leather Trim, Silk Satin Lining',
    fit: '9" Width × 5.5" Height × 2.5" Depth',
    pattern: 'Chevron Diagonal Quilted Velvet',
    occasion: 'Red Carpet, Operas, Cocktail Soirées & Receptions',
    care: 'Keep in satin pouch. Brush gently with soft velvet brush.',
    specifications: {
      'Strap': 'Sliding Champagne Gold Curb Chain (Drop: 12" to 22")',
      'Closure': 'Magnetic Interlocking Flap Lock',
      'Interior': 'Card Slots, Zip Pocket & Lip Gloss Holder',
      'Country of Origin': 'Florence, Italy'
    },
    createdAt: '2026-02-01T10:00:00Z'
  },

  // 7. WATCH: Velmira Submariner Diver 300M
  {
    id: 'prod-w4',
    name: 'Velmira Submariner Diver 300M Ceramic Bezel Ocean Deep Blue',
    brand: 'VELMIRA SIGNATURE',
    category: "Men's Watches",
    subcategory: 'Diver Watches',
    originalPrice: 31999,
    discountedPrice: 15499,
    originalPriceAED: 1420,
    priceAED: 690,
    discountPercentage: 51,
    rating: 4.9,
    ratingCount: 710,
    reviewCount: 220,
    images: [
      'https://images.unsplash.com/photo-1539185441755-769473a23570?auto=format&fit=crop&w=900&q=80',
      'https://images.unsplash.com/photo-1548036328-c9fa89d128fa?auto=format&fit=crop&w=900&q=80',
      'https://images.unsplash.com/photo-1522335789203-aabd1fc54bc9?auto=format&fit=crop&w=900&q=80'
    ],
    sizes: ['41mm Case'],
    colors: [
      { name: 'Deep Ocean Blue & Silver Steel', hex: '#0B3C5D' },
      { name: 'Hulk Emerald Green Bezel', hex: '#1E4B35' },
      { name: 'Stealth Matte Black & Ceramic', hex: '#1A1A1A' }
    ],
    stock: 7,
    isTrending: true,
    isTopDeal: true,
    description: 'Built for oceanic depths and executive elegance. Engineered with unidirectional 120-click scratchproof ceramic bezel, helium escape valve, SuperLumiNova BGW9 blue luminescence, and screw-down crown rated for 300 meters.',
    fabric: '316L Solid Surgical Steel, High-Tech Zirconia Ceramic Bezel',
    fit: '41mm Case Diameter • 13mm Depth • Solid Oyster Bracelet',
    pattern: 'Sunray Lacquered Dial with Maxi Luminescent Markers',
    occasion: 'Scuba Diving, Yachting, Boardroom & Resort Living',
    care: 'Rinse with fresh water after saltwater diving.',
    specifications: {
      'Water Resistance': '30 ATM / 300 Meters / 1000 Feet',
      'Bezel': 'Unidirectional 120-Click High-Gloss Ceramic Bezel',
      'Luminescence': 'Swiss Super-LumiNova BGW9 (Glows Ocean Blue)',
      'Crown': 'Triple-Lock Screw-Down Waterproof Crown',
      'Country of Origin': 'Switzerland'
    },
    createdAt: '2026-01-18T10:00:00Z'
  },

  // 8. BAG: Velmira Grand Voyage Leather Weekender Duffle
  {
    id: 'prod-b4',
    name: 'Velmira Grand Voyage Full-Grain Leather Weekender Duffle Bag',
    brand: 'MONTE CARLO ATELIER',
    category: 'Leather Bags',
    subcategory: 'Travel & Duffles',
    originalPrice: 29999,
    discountedPrice: 14499,
    originalPriceAED: 1330,
    priceAED: 640,
    discountPercentage: 51,
    rating: 4.9,
    ratingCount: 580,
    reviewCount: 190,
    images: [
      'https://images.unsplash.com/photo-1553062407-98eeb64c6a62?auto=format&fit=crop&w=900&q=80',
      'https://images.unsplash.com/photo-1584917865442-de89df76afd3?auto=format&fit=crop&w=900&q=80',
      'https://images.unsplash.com/photo-1591561954557-26941169b49e?auto=format&fit=crop&w=900&q=80'
    ],
    sizes: ['50cm Carry-On (20" × 11" × 10")'],
    colors: [
      { name: 'Antique Burnished Cognac', hex: '#8F5438' },
      { name: 'Midnight Charcoal Black', hex: '#1C1C1C' }
    ],
    stock: 5,
    isTrending: true,
    isBestSeller: true,
    description: 'The definitive private aviation and weekend getaway companion. Handcrafted in Florence from thick vegetable-tanned Tuscan saddle leather that develops a magnificent rich patina with every journey. Compliant with international flight cabin carry-on rules.',
    fabric: 'Vegetable-Tanned Tuscan Saddle Leather, Heavy Cotton Canvas Lining',
    fit: '20" Length × 11" Height × 10" Width (Carry-On Approved)',
    pattern: 'Hand-Burnished Antique Leather Patina',
    occasion: 'Private Jet Travel, Weekend Escapes, Luxury Resort Getaways',
    care: 'Treat twice yearly with natural beeswax leather balsam.',
    specifications: {
      'Capacity': '42 Liters Storage Volume',
      'Shoe Compartment': 'Side Zipped Waterproof Shoe Tunnel',
      'Zippers': 'Oversized Solid Brass Two-Way YKK Zippers',
      'Strap': 'Heavy Padded Adjustable Leather Shoulder Strap',
      'Country of Origin': 'Tuscany, Italy'
    },
    createdAt: '2026-01-22T10:00:00Z'
  },

  // 9. WATCH: Velmira Skeleton Horizon Automatic
  {
    id: 'prod-w5',
    name: 'Velmira Skeleton Horizon Automatic Sapphire Exhibition Case',
    brand: 'VELMIRA SIGNATURE',
    category: "Men's Watches",
    subcategory: 'Skeleton Watches',
    originalPrice: 34999,
    discountedPrice: 16999,
    originalPriceAED: 1550,
    priceAED: 750,
    discountPercentage: 51,
    rating: 4.8,
    ratingCount: 490,
    reviewCount: 140,
    images: [
      'https://images.unsplash.com/photo-1524805444758-089113d48a6d?auto=format&fit=crop&w=900&q=80',
      'https://images.unsplash.com/photo-1522335789203-aabd1fc54bc9?auto=format&fit=crop&w=900&q=80',
      'https://images.unsplash.com/photo-1509042239860-f550ce710b93?auto=format&fit=crop&w=900&q=80'
    ],
    sizes: ['42mm Case'],
    colors: [
      { name: 'Matte Gunmetal & 18K Gold Gearwork', hex: '#4A4A4A' },
      { name: 'Silver Steel & Cobalt Blue Hands', hex: '#002366' }
    ],
    stock: 4,
    isNewArrival: true,
    isTopDeal: true,
    description: 'A captivating celebration of mechanical transparency. Both the front and rear crystals are cut from anti-reflective sapphire, revealing the intricate heartbeat of the balance wheel, escapement, and skeletonized bridges coated in satin ruthenium.',
    fabric: 'Surgical Stainless Steel, Skeleton Ruthenium Bridges, Dual Sapphire',
    fit: '42mm Diameter • 11.5mm Thickness',
    pattern: 'Fully Skeletonized Open-Architecture Movement',
    occasion: 'Architectural Galas, Tech Leadership, Black Tie Events',
    care: 'Self-winds with wrist motion. Manual winding auxiliary supported.',
    specifications: {
      'Movement': 'Skeletonized Automatic Calibre V-42 (21,600 vph)',
      'Jewels': '24 Ruby Synthetic Jewels',
      'Crystals': 'Dual Front & Exhibition Caseback Sapphire Crystals',
      'Band': 'Integrated Solid Link Bracelet with Butterfly Clasp',
      'Country of Origin': 'Switzerland'
    },
    createdAt: '2026-02-04T10:00:00Z'
  },

  // 10. BAG: Velmira Parisian Monogram Crossbody Flap Bag
  {
    id: 'prod-b5',
    name: 'Velmira Parisian Monogram Flap Crossbody Bag with Gold Lock',
    brand: 'AURELIA LUXE',
    category: 'Leather Bags',
    subcategory: 'Crossbody Bags',
    originalPrice: 17999,
    discountedPrice: 8499,
    originalPriceAED: 800,
    priceAED: 380,
    discountPercentage: 53,
    rating: 4.8,
    ratingCount: 630,
    reviewCount: 185,
    images: [
      'https://images.unsplash.com/photo-1590874103328-eac38a683ce7?auto=format&fit=crop&w=900&q=80',
      'https://images.unsplash.com/photo-1584917865442-de89df76afd3?auto=format&fit=crop&w=900&q=80',
      'https://images.unsplash.com/photo-1591561954557-26941169b49e?auto=format&fit=crop&w=900&q=80'
    ],
    sizes: ['Medium (10" × 7" × 3.5")'],
    colors: [
      { name: 'Monogram Brown & Tan Calfskin', hex: '#654321' },
      { name: 'Monogram Noir & Gold Hardware', hex: '#1E1E1E' }
    ],
    stock: 11,
    isTrending: true,
    isBestSeller: true,
    description: 'Chic Parisian aesthetics reimagined. Embellished with the subtle Velmira interlocking crest monogram on coated canvas with vegetable-tanned cowhide leather piping and a secure brushed champagne gold push-lock closure.',
    fabric: 'Luxury Coated Canvas with Natural Cowhide Vachetta Leather Trim',
    fit: '10" Width × 7" Height × 3.5" Depth',
    pattern: 'Subtle Velmira Crest Monogram with Contrast Stitching',
    occasion: 'Brunch, High-Street Shopping, Travel & City Strolls',
    care: 'Clean canvas with mild soap; avoid soaking the vachetta leather.',
    specifications: {
      'Strap': 'Adjustable Leather & Gold Chain Crossbody Strap (21" drop)',
      'Closure': 'Heavy Gold S-Lock with Push-Button Mechanism',
      'Interior': 'Two Main Compartments + Zipped Central Divider',
      'Country of Origin': 'France'
    },
    createdAt: '2026-01-28T10:00:00Z'
  },

  // 11. WATCH: Velmira Petite Roman Classic
  {
    id: 'prod-w6',
    name: 'Velmira Petite Roman Classic Champagne Dial Alligator Leather Strap',
    brand: 'VALENTINO MILANO',
    category: "Women's Watches",
    subcategory: 'Classic Watches',
    originalPrice: 18999,
    discountedPrice: 8999,
    originalPriceAED: 840,
    priceAED: 400,
    discountPercentage: 53,
    rating: 4.9,
    ratingCount: 520,
    reviewCount: 160,
    images: [
      'https://images.unsplash.com/photo-1522335789203-aabd1fc54bc9?auto=format&fit=crop&w=900&q=80',
      'https://images.unsplash.com/photo-1523275335684-37898b6baf30?auto=format&fit=crop&w=900&q=80',
      'https://images.unsplash.com/photo-1524805444758-089113d48a6d?auto=format&fit=crop&w=900&q=80'
    ],
    sizes: ['32mm Dial'],
    colors: [
      { name: 'Champagne Gold & Tan Alligator Leather', hex: '#D4AF37' },
      { name: 'Silver Steel & Burgundy Red Leather', hex: '#800020' }
    ],
    stock: 10,
    isTrending: true,
    isTopDeal: true,
    description: 'Understated Parisian and Milanese grace. Features traditional painted Roman numerals, blued steel sword hands, an engraved cabochon sapphire crown, and an ultra-slim 7mm profile that slips effortlessly under silk cuffs.',
    fabric: '316L Stainless Steel, 18K Yellow Gold PVD, Blue Cabochon Crown',
    fit: '32mm Case Diameter • Ultra-Thin 7.2mm Profile',
    pattern: 'Champagne Lacquered Dial with Roman Numerals',
    occasion: 'Cocktails, Afternoon High Tea & Formal Galas',
    care: 'Water resistant to 3 ATM (splash resistant).',
    specifications: {
      'Movement': 'Swiss Ronda High-Precision Quartz Movement',
      'Crown': 'Set with Synthetic Blue Cabochon Spinel Gemstone',
      'Hands': 'Heat-Blued Steel Sword-Shaped Hands',
      'Strap': 'Handmade Italian Alligator Grain Calf Leather',
      'Country of Origin': 'Switzerland'
    },
    createdAt: '2026-02-05T10:00:00Z'
  },

  // 12. BAG: Velmira Continental Zip-Around Saffiano Wallet
  {
    id: 'prod-b6',
    name: 'Velmira Continental Zip-Around Saffiano Leather Long Wallet',
    brand: 'AURELIA LUXE',
    category: 'Clutches & Wallets',
    subcategory: 'Wallets & Cardholders',
    originalPrice: 9999,
    discountedPrice: 4499,
    originalPriceAED: 450,
    priceAED: 200,
    discountPercentage: 55,
    rating: 4.8,
    ratingCount: 430,
    reviewCount: 110,
    images: [
      'https://images.unsplash.com/photo-1584917865442-de89df76afd3?auto=format&fit=crop&w=900&q=80',
      'https://images.unsplash.com/photo-1591561954557-26941169b49e?auto=format&fit=crop&w=900&q=80',
      'https://images.unsplash.com/photo-1566150905458-1bf1fc113f0d?auto=format&fit=crop&w=900&q=80'
    ],
    sizes: ['Continental (7.8" × 4.1" × 1.0")'],
    colors: [
      { name: 'Onyx Piano Black', hex: '#0F0F0F' },
      { name: 'Blush Powder Rose', hex: '#FFC0CB' },
      { name: 'Rich Emerald Green', hex: '#0B5345' }
    ],
    stock: 18,
    isTrending: true,
    isBestSeller: true,
    description: 'The definitive luxury leather wallet. Holds up to 12 credit cards, international passports, smartphone, and bills with an all-around solid gold YKK zipper and RFID identity protection lining.',
    fabric: 'Waterproof Saffiano Calfskin with RFID Blocking Core',
    fit: '7.8" Length × 4.1" Height × 1.0" Width',
    pattern: 'Durable Crosshatch Saffiano Leather',
    occasion: 'Daily Luxury, Travel & Evening Organizing',
    care: 'Wipe clean with dry lint-free cloth.',
    specifications: {
      'Card Slots': '12 Credit Card Slots + Central Zipped Coin Pocket',
      'Protection': 'Certified RFID Blocking Security Shield',
      'Hardware': 'Champagne Gold Heavy YKK Zipper with Leather Pull',
      'Country of Origin': 'Milan, Italy'
    },
    createdAt: '2026-02-06T10:00:00Z'
  }
];

export const INITIAL_COUPONS: Coupon[] = [
  {
    code: 'VELMIRA500',
    discountType: 'flat',
    value: 500,
    valueAED: 25,
    minOrderValue: 2999,
    minOrderValueAED: 130,
    description: 'Flat ₹500 (AED 25) OFF on luxury orders above ₹2,999 (AED 130)',
    expiryDate: '2026-12-31'
  },
  {
    code: 'FIRSTBUY',
    discountType: 'percentage',
    value: 15,
    valueAED: 15,
    minOrderValue: 1999,
    minOrderValueAED: 90,
    maxDiscount: 1500,
    description: '15% instant discount on your first order (up to ₹1,500 / AED 70)',
    expiryDate: '2026-12-31'
  },
  {
    code: 'DUBAI100',
    discountType: 'flat',
    value: 2250,
    valueAED: 100,
    minOrderValue: 6999,
    minOrderValueAED: 300,
    description: 'Flat AED 100 (₹2,250) OFF on UAE & Indian orders over AED 300',
    expiryDate: '2026-12-31'
  }
];

export const INITIAL_REVIEWS: Review[] = [
  {
    id: 'rev-1',
    productId: 'prod-w1',
    userName: 'Hamdan Al Maktoum',
    userLocation: 'Dubai, UAE',
    rating: 5,
    title: 'Exquisite Emerald Dial & Heavy 18K Gold Finish',
    comment: 'Ordered through WhatsApp to Dubai. Arrived within 48 hours in a magnificent piano-lacquered wooden box. The automatic sweep movement is silent and accurate. Truly royal.',
    verifiedPurchase: true,
    helpfulCount: 42,
    createdAt: '2026-02-12T14:30:00Z'
  },
  {
    id: 'rev-2',
    productId: 'prod-b1',
    userName: 'Kavita Singhania',
    userLocation: 'Mumbai, India',
    rating: 5,
    title: 'Milanese leather quality on par with Prada',
    comment: 'The Saffiano crosshatch leather is completely scratch-resistant. Fits my 14-inch MacBook Pro and travel essentials with ease. The WhatsApp concierge was so polite and helpful!',
    verifiedPurchase: true,
    helpfulCount: 31,
    createdAt: '2026-02-15T09:15:00Z'
  },
  {
    id: 'rev-3',
    productId: 'prod-w2',
    userName: 'Rashid Al Nuaimi',
    userLocation: 'Abu Dhabi, UAE',
    rating: 5,
    title: 'Mesmerizing flying tourbillon movement',
    comment: 'A true collector’s timepiece. The rotating tourbillon cage at 6 o’clock is a work of pure art. Excellent communication from Velmira dispatch team over WhatsApp.',
    verifiedPurchase: true,
    helpfulCount: 28,
    createdAt: '2026-02-18T18:20:00Z'
  }
];
