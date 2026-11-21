import { Product, Coupon, Review } from '../types';

export const INITIAL_PRODUCTS: Product[] = [
  {
    id: 'prod-101',
    name: 'Royal Heritage Banarasi Katan Silk Saree with Zari Weave',
    brand: 'VELMIRA COUTURE',
    category: 'Ethnic Wear',
    subcategory: 'Sarees',
    originalPrice: 18999,
    discountedPrice: 8999,
    discountPercentage: 53,
    rating: 4.8,
    ratingCount: 1420,
    reviewCount: 388,
    images: [
      'https://images.unsplash.com/photo-1610030469983-98e550d6193c?auto=format&fit=crop&w=900&q=80',
      'https://images.unsplash.com/photo-1617627143750-d86bc21e42bb?auto=format&fit=crop&w=900&q=80',
      'https://images.unsplash.com/photo-1583391733956-3750e0ff4e8b?auto=format&fit=crop&w=900&q=80'
    ],
    sizes: ['Free Size'],
    colors: [
      { name: 'Royal Crimson Red', hex: '#8B0000' },
      { name: 'Champagne Gold', hex: '#D4AF37' },
      { name: 'Emerald Forest Green', hex: '#0B5345' }
    ],
    stock: 14,
    isTrending: true,
    isBestSeller: true,
    isTopDeal: true,
    description: 'Immerse in timeless elegance with this handcrafted Banarasi Katan Silk Saree. Featuring intricate gold floral kadwa jaal motifs and an opulent pallu woven by master artisans from Varanasi. Perfect for weddings, grand festivities, and regal evenings.',
    fabric: '100% Pure Katan Silk with Real Zari Border',
    fit: 'Classic Indian Drape',
    pattern: 'Intricate Floral Kadwa Jaal',
    occasion: 'Weddings, Receptions & Grand Festive',
    care: 'Dry Clean Only. Store wrapped in soft muslin cloth.',
    specifications: {
      'Saree Length': '5.5 meters',
      'Blouse Piece': '0.8 meters (Unstitched included)',
      'Weave Type': 'Banarasi Kadwa Handloom',
      'Border Detail': 'Broad Zari Woven Border',
      'Country of Origin': 'India'
    },
    createdAt: '2026-01-10T10:00:00Z'
  },
  {
    id: 'prod-102',
    name: 'Italian Tailored Double-Breasted Wool Blazer',
    brand: 'VELMIRA SIGNATURE',
    category: 'Men',
    subcategory: 'Blazers & Suits',
    originalPrice: 24999,
    discountedPrice: 12499,
    discountPercentage: 50,
    rating: 4.9,
    ratingCount: 890,
    reviewCount: 215,
    images: [
      'https://images.unsplash.com/photo-1507679799987-c73779587ccf?auto=format&fit=crop&w=900&q=80',
      'https://images.unsplash.com/photo-1594938298603-c8148c4dae35?auto=format&fit=crop&w=900&q=80',
      'https://images.unsplash.com/photo-1617137984095-74e4e5e3613f?auto=format&fit=crop&w=900&q=80'
    ],
    sizes: ['38R', '40R', '42R', '44R'],
    colors: [
      { name: 'Midnight Charcoal', hex: '#1E1E1E' },
      { name: 'Navy Blue', hex: '#0B1B3D' },
      { name: 'Camel Tan', hex: '#C19A6B' }
    ],
    stock: 9,
    isTrending: true,
    isBestSeller: true,
    description: 'Masterfully crafted from premium Italian super-120s virgin wool, this structured double-breasted blazer delivers sharp architectural silhouette with peak lapels, horn buttons, and cupro silk lining.',
    fabric: '100% Italian Super-120s Wool, Cupro Silk Lining',
    fit: 'Modern Slim Fit',
    pattern: 'Solid Structured Weave',
    occasion: 'Black Tie, Formal Galas & Executive Meetings',
    care: 'Specialist Dry Clean Only.',
    specifications: {
      'Closure': 'Double-Breasted 6x2 Horn Buttons',
      'Lapel': 'Satin Trimmed Peak Lapel',
      'Vents': 'Dual Side Vents',
      'Pockets': 'Jetted Chest Pocket & Flap Hip Pockets',
      'Country of Origin': 'Italy'
    },
    createdAt: '2026-01-12T10:00:00Z'
  },
  {
    id: 'prod-103',
    name: 'Silk Georgette Embroidered Designer Anarkali Gown',
    brand: 'VELMIRA COUTURE',
    category: 'Women',
    subcategory: 'Ethnic Wear',
    originalPrice: 21999,
    discountedPrice: 9899,
    discountPercentage: 55,
    rating: 4.7,
    ratingCount: 1105,
    reviewCount: 298,
    images: [
      'https://images.unsplash.com/photo-1566174053879-31528523f8ae?auto=format&fit=crop&w=900&q=80',
      'https://images.unsplash.com/photo-1595777457583-95e059d581b8?auto=format&fit=crop&w=900&q=80',
      'https://images.unsplash.com/photo-1515372039744-b8f02a3ae446?auto=format&fit=crop&w=900&q=80'
    ],
    sizes: ['XS', 'S', 'M', 'L', 'XL'],
    colors: [
      { name: 'Champagne Rose', hex: '#E8C5C8' },
      { name: 'Ivory Gold', hex: '#FFF8DC' },
      { name: 'Midnight Noir', hex: '#111111' }
    ],
    stock: 12,
    isTrending: true,
    isNewArrival: true,
    description: 'An ethereal floor-length Anarkali silhouette in pure silk georgette adorned with delicate zardozi needlework, pearl accents, and a scalloped organza dupatta with golden tassels.',
    fabric: 'Pure Silk Georgette & Sheer Organza',
    fit: 'Flared Regal Silhouette',
    pattern: 'Zardozi Hand Embroidery & Mukaish Detailing',
    occasion: 'Sangeet, Cocktail Evenings & Weddings',
    care: 'Dry Clean Only.',
    specifications: {
      'Flare': '4.5 meters Kalidar Gher',
      'Neckline': 'Sweetheart with Sheer Illusion',
      'Sleeves': 'Full Sheer Churidar Sleeves',
      'Included': 'Anarkali Gown, Churidar & Embellished Dupatta',
      'Country of Origin': 'India'
    },
    createdAt: '2026-02-01T10:00:00Z'
  },
  {
    id: 'prod-104',
    name: 'Pure Mulberry Silk Evening Slip Maxi Dress',
    brand: 'VALENTINO MILANO',
    category: 'Western Wear',
    subcategory: 'Dresses & Gowns',
    originalPrice: 15499,
    discountedPrice: 7499,
    discountPercentage: 52,
    rating: 4.9,
    ratingCount: 640,
    reviewCount: 182,
    images: [
      'https://images.unsplash.com/photo-1572804013309-59a88b7e92f1?auto=format&fit=crop&w=900&q=80',
      'https://images.unsplash.com/photo-1539008835657-9e8e9680c956?auto=format&fit=crop&w=900&q=80',
      'https://images.unsplash.com/photo-1502716119720-b23a93e5fe1b?auto=format&fit=crop&w=900&q=80'
    ],
    sizes: ['XS', 'S', 'M', 'L'],
    colors: [
      { name: 'Liquid Champagne', hex: '#F7E7CE' },
      { name: 'Emerald Velvet', hex: '#004B49' },
      { name: 'Onyx Black', hex: '#000000' }
    ],
    stock: 8,
    isTrending: true,
    isBestSeller: true,
    description: 'Crafted from 22-momme pure mulberry silk that skims your curves with effortless grace. Features an alluring cowl neckline, delicate adjustable spaghetti straps, and a sultry high side-slit.',
    fabric: '100% Grade 6A Mulberry Silk',
    fit: 'Bias-Cut Fluid Drape',
    pattern: 'Lustrous Solid Silk Sheen',
    occasion: 'Red Carpet, Black Tie, Romance & Fine Dining',
    care: 'Hand wash with silk detergent or dry clean.',
    specifications: {
      'Length': 'Floor Length (56 inches)',
      'Neckline': 'Draped Cowl',
      'Back Style': 'Criss-Cross Low Open Back',
      'Country of Origin': 'France'
    },
    createdAt: '2026-01-20T10:00:00Z'
  },
  {
    id: 'prod-105',
    name: 'Imperial Zardosi Silk Blend Sherwani Set with Stole',
    brand: 'VELMIRA COUTURE',
    category: 'Ethnic Wear',
    subcategory: 'Kurtas & Sherwanis',
    originalPrice: 32999,
    discountedPrice: 15999,
    discountPercentage: 51,
    rating: 4.9,
    ratingCount: 510,
    reviewCount: 144,
    images: [
      'https://images.unsplash.com/photo-1597983073493-88cd35cf93b0?auto=format&fit=crop&w=900&q=80',
      'https://images.unsplash.com/photo-1506794778202-cad84cf45f1d?auto=format&fit=crop&w=900&q=80',
      'https://images.unsplash.com/photo-1500648767791-00dcc994a43e?auto=format&fit=crop&w=900&q=80'
    ],
    sizes: ['38', '40', '42', '44'],
    colors: [
      { name: 'Royal Ivory & Antique Gold', hex: '#FFFFF0' },
      { name: 'Midnight Regal Blue', hex: '#191970' }
    ],
    stock: 6,
    isTrending: true,
    isBestSeller: true,
    description: 'Fit for the modern maharaja. This imperial sherwani features intricate hand-embroidered antique zardozi work along the mandarin collar, placket, and cuffs. Accompanied by silk churidar and hand-woven pashmina stole.',
    fabric: 'Raw Silk Blend with Pure Silk Lining',
    fit: 'Tailored Royal Fit',
    pattern: 'Hand Embroidered Antique Zardozi',
    occasion: 'Grooms, Royal Weddings & High Galas',
    care: 'Dry Clean Only.',
    specifications: {
      'Pieces': '3-Piece Set (Sherwani, Churidar, Stole)',
      'Buttons': '24K Gold Polish Handcrafted Buttons',
      'Collar': 'Royal Mandarin Collar',
      'Country of Origin': 'India'
    },
    createdAt: '2026-01-15T10:00:00Z'
  },
  {
    id: 'prod-106',
    name: 'Handcrafted Goodyear-Welted Leather Oxford Shoes',
    brand: 'MONTE CARLO ATELIER',
    category: 'Footwear',
    subcategory: 'Formal Shoes',
    originalPrice: 16999,
    discountedPrice: 8499,
    discountPercentage: 50,
    rating: 4.8,
    ratingCount: 780,
    reviewCount: 195,
    images: [
      'https://images.unsplash.com/photo-1533867617858-e7b97e060509?auto=format&fit=crop&w=900&q=80',
      'https://images.unsplash.com/photo-1614252235316-8c857d38b5f4?auto=format&fit=crop&w=900&q=80',
      'https://images.unsplash.com/photo-1549298916-b41d501d3772?auto=format&fit=crop&w=900&q=80'
    ],
    sizes: ['UK 7', 'UK 8', 'UK 9', 'UK 10', 'UK 11'],
    colors: [
      { name: 'Burnished Chestnut Tan', hex: '#8B4513' },
      { name: 'Deep Piano Black', hex: '#0A0A0A' },
      { name: 'Rich Oxblood Burgundy', hex: '#4A0E17' }
    ],
    stock: 15,
    isTrending: true,
    isTopDeal: true,
    description: 'Constructed using centuries-old Goodyear welt techniques in Florence, Italy. Cut from full-grain French calfskin with a hand-burnished patina finish and durable oak-bark tanned leather soles.',
    fabric: 'Full-Grain French Calfskin Leather',
    fit: 'Classic British E-Width',
    pattern: 'Perforated Toe Cap Brogue Detail',
    occasion: 'Corporate Leadership, Black Tie & Weddings',
    care: 'Condition with natural beeswax polish.',
    specifications: {
      'Construction': 'Goodyear Welted (Resoleable)',
      'Sole': 'Oak Bark Hand-Channelled Leather Sole',
      'Insole': 'Cushioned Vegetable-Tanned Leather',
      'Country of Origin': 'Italy'
    },
    createdAt: '2026-01-18T10:00:00Z'
  },
  {
    id: 'prod-107',
    name: 'Velmira Chrono Luxe Gold-Plated Automatic Watch',
    brand: 'VELMIRA SIGNATURE',
    category: 'Accessories',
    subcategory: 'Watches',
    originalPrice: 28999,
    discountedPrice: 13999,
    discountPercentage: 52,
    rating: 4.9,
    ratingCount: 920,
    reviewCount: 310,
    images: [
      'https://images.unsplash.com/photo-1522335789203-aabd1fc54bc9?auto=format&fit=crop&w=900&q=80',
      'https://images.unsplash.com/photo-1524805444758-089113d48a6d?auto=format&fit=crop&w=900&q=80',
      'https://images.unsplash.com/photo-1548036328-c9fa89d128fa?auto=format&fit=crop&w=900&q=80'
    ],
    sizes: ['41mm Dial'],
    colors: [
      { name: 'Champagne Gold & Sunburst Green', hex: '#2E8B57' },
      { name: 'Rose Gold & Obsidian Black', hex: '#111111' },
      { name: 'Silver Steel & Ice Blue', hex: '#B0E0E6' }
    ],
    stock: 11,
    isTrending: true,
    isBestSeller: true,
    description: 'A tribute to Swiss horological craftsmanship. Features an automatic 24-jewel movement with 42-hour power reserve, scratch-resistant sapphire crystal glass, 18K gold PVD plating, and genuine alligator-embossed leather strap.',
    fabric: '316L Surgical Stainless Steel, 18K Gold PVD, Sapphire Crystal',
    fit: 'Universal Wrist Adjustable Strap',
    pattern: 'Sunburst Guilloché Dial',
    occasion: 'Everyday Luxury & Formal Wear',
    care: '5 ATM Water Resistant (50 meters). Wipe with microfiber cloth.',
    specifications: {
      'Movement': 'Japanese Automatic Self-Winding (24 Jewels)',
      'Glass': 'Domed Anti-Reflective Sapphire Crystal',
      'Strap': 'Italian Alligator Embossed Full-Grain Leather',
      'Warranty': '2-Year International Guarantee',
      'Country of Origin': 'Switzerland'
    },
    createdAt: '2026-01-22T10:00:00Z'
  },
  {
    id: 'prod-108',
    name: 'Italian Saffiano Leather Structured Tote Handbag',
    brand: 'AURELIA LUXE',
    category: 'Accessories',
    subcategory: 'Bags',
    originalPrice: 19999,
    discountedPrice: 9499,
    discountPercentage: 53,
    rating: 4.8,
    ratingCount: 670,
    reviewCount: 160,
    images: [
      'https://images.unsplash.com/photo-1584917865442-de89df76afd3?auto=format&fit=crop&w=900&q=80',
      'https://images.unsplash.com/photo-1591561954557-26941169b49e?auto=format&fit=crop&w=900&q=80',
      'https://images.unsplash.com/photo-1566150905458-1bf1fc113f0d?auto=format&fit=crop&w=900&q=80'
    ],
    sizes: ['One Size (14" x 11" x 5")'],
    colors: [
      { name: 'Midnight Charcoal', hex: '#202020' },
      { name: 'Warm Cognac Brown', hex: '#9E5B32' },
      { name: 'Powder Ivory', hex: '#FFFFF0' }
    ],
    stock: 10,
    isTrending: true,
    isNewArrival: true,
    description: 'Handcrafted in Milan from scratch-resistant Saffiano calf leather. Accented with brushed champagne gold hardware, dedicated 14-inch padded laptop sleeve, and dual top-carry handles plus detachable shoulder strap.',
    fabric: '100% Saffiano Calfskin Leather with Micro-Suede Lining',
    fit: 'Structured Compartmentalized Tote',
    pattern: 'Crosshatch Textured Finish',
    occasion: 'Work, Executive Travel & Fine Dining',
    care: 'Wipe clean with soft damp cloth. Store in dustbag.',
    specifications: {
      'Hardware': 'Brushed Champagne 18K Gold Plated',
      'Compartments': '3 Main Compartments + Padded Laptop Sleeve',
      'Closure': 'Heavy-Duty Gold YKK Zip & Magnetic Snap',
      'Country of Origin': 'Italy'
    },
    createdAt: '2026-02-02T10:00:00Z'
  },
  {
    id: 'prod-109',
    name: 'Handcrafted French Lace Cocktail Dress with Scalloped Hem',
    brand: 'VALENTINO MILANO',
    category: 'Western Wear',
    subcategory: 'Dresses & Gowns',
    originalPrice: 17999,
    discountedPrice: 8299,
    discountPercentage: 54,
    rating: 4.7,
    ratingCount: 430,
    reviewCount: 98,
    images: [
      'https://images.unsplash.com/photo-1595777457583-95e059d581b8?auto=format&fit=crop&w=900&q=80',
      'https://images.unsplash.com/photo-1539008835657-9e8e9680c956?auto=format&fit=crop&w=900&q=80',
      'https://images.unsplash.com/photo-1572804013309-59a88b7e92f1?auto=format&fit=crop&w=900&q=80'
    ],
    sizes: ['XS', 'S', 'M', 'L'],
    colors: [
      { name: 'Midnight Jet Black', hex: '#050505' },
      { name: 'Champagne Blush', hex: '#FADBD8' }
    ],
    stock: 8,
    isNewArrival: true,
    description: 'Exquisite French Chantilly corded lace draped delicately over an ultra-soft nude silk lining. Featuring an elegant illusion boat neckline and eyelash-fringed scalloped hemline.',
    fabric: 'Authentic French Chantilly Lace with Mulberry Silk Lining',
    fit: 'Fitted Sheath Silhouette',
    pattern: 'Intricate Floral Corded Lace',
    occasion: 'Cocktail Soirées, Engagement Parties & Galas',
    care: 'Dry Clean Only.',
    specifications: {
      'Length': 'Midi (44 inches)',
      'Closure': 'Concealed Back Zip with Satin Buttons',
      'Sleeves': 'Elbow-Length Sheer Lace Sleeves',
      'Country of Origin': 'France'
    },
    createdAt: '2026-02-04T10:00:00Z'
  },
  {
    id: 'prod-110',
    name: 'Linen Silk Kurta & Churidhar Set with Nehru Jacket',
    brand: 'RAW MANGO',
    category: 'Men',
    subcategory: 'Kurtas & Sherwanis',
    originalPrice: 14999,
    discountedPrice: 6999,
    discountPercentage: 53,
    rating: 4.8,
    ratingCount: 790,
    reviewCount: 210,
    images: [
      'https://images.unsplash.com/photo-1617137984095-74e4e5e3613f?auto=format&fit=crop&w=900&q=80',
      'https://images.unsplash.com/photo-1507679799987-c73779587ccf?auto=format&fit=crop&w=900&q=80',
      'https://images.unsplash.com/photo-1594938298603-c8148c4dae35?auto=format&fit=crop&w=900&q=80'
    ],
    sizes: ['38', '40', '42', '44'],
    colors: [
      { name: 'Sage Mint Green', hex: '#9DC183' },
      { name: 'Mustard Gold', hex: '#FFDB58' },
      { name: 'Ivory Pearl', hex: '#FDFBF7' }
    ],
    stock: 18,
    isTrending: true,
    isTopDeal: true,
    description: 'Breathable organic Belgian linen blended with natural tussar silk. Includes a tailored Nehru bundi jacket with thread embroidery and mother-of-pearl buttons.',
    fabric: '70% Organic Linen, 30% Tussar Silk',
    fit: 'Comfort Classic Fit',
    pattern: 'Textured Slub Weave with Micro Embroidery',
    occasion: 'Festivals, Mehendi, Puja & Festive Gatherings',
    care: 'Gentle hand wash or dry clean.',
    specifications: {
      'Pieces': '3-Piece (Kurta, Churidar Pajama, Bundi Jacket)',
      'Collar': 'Mandarin Band Collar',
      'Buttons': 'Real Mother-of-Pearl',
      'Country of Origin': 'India'
    },
    createdAt: '2026-01-28T10:00:00Z'
  },
  {
    id: 'prod-111',
    name: 'Champagne Crystal Embellished Evening Stiletto Pumps',
    brand: 'VALENTINO MILANO',
    category: 'Footwear',
    subcategory: 'Heels & Pumps',
    originalPrice: 18999,
    discountedPrice: 9199,
    discountPercentage: 52,
    rating: 4.9,
    ratingCount: 520,
    reviewCount: 175,
    images: [
      'https://images.unsplash.com/photo-1543163521-1bf539c55dd2?auto=format&fit=crop&w=900&q=80',
      'https://images.unsplash.com/photo-1515347619252-60a4bf4fff4f?auto=format&fit=crop&w=900&q=80',
      'https://images.unsplash.com/photo-1533867617858-e7b97e060509?auto=format&fit=crop&w=900&q=80'
    ],
    sizes: ['EU 36', 'EU 37', 'EU 38', 'EU 39', 'EU 40'],
    colors: [
      { name: 'Champagne Gold Starlight', hex: '#E5C158' },
      { name: 'Diamond Silver Sheen', hex: '#C0C0C0' },
      { name: 'Midnight Onyx Black', hex: '#111111' }
    ],
    stock: 7,
    isTrending: true,
    isNewArrival: true,
    description: 'Turn heads at every step. Crafted from shimmering Italian satin crowned with Austrian crystal sunburst brooches. Designed with signature triple-layer memory foam cushioning for evening-long comfort.',
    fabric: 'Silk Satin Upper, Austrian Crystals, Calfskin Sole',
    fit: 'True to European Sizing',
    pattern: 'Sunburst Crystal Jewel Brooch',
    occasion: 'Weddings, Red Carpet & Black Tie Galas',
    care: 'Keep in satin dust pouch.',
    specifications: {
      'Heel Height': '3.5 inches (85mm) Stiletto',
      'Insole': 'Ergonomic Memory Cushion Footbed',
      'Toe Shape': 'Sleek Pointed Toe',
      'Country of Origin': 'Italy'
    },
    createdAt: '2026-02-05T10:00:00Z'
  },
  {
    id: 'prod-112',
    name: 'Little Prince Embroidered Silk Kurta & Dhoti Set',
    brand: 'VELMIRA COUTURE',
    category: 'Kids',
    subcategory: 'Ethnic Wear',
    originalPrice: 7999,
    discountedPrice: 3499,
    discountPercentage: 56,
    rating: 4.8,
    ratingCount: 380,
    reviewCount: 92,
    images: [
      'https://images.unsplash.com/photo-1519238263530-99bdd11df2ea?auto=format&fit=crop&w=900&q=80',
      'https://images.unsplash.com/photo-1503944570-2002dd42c66e?auto=format&fit=crop&w=900&q=80',
      'https://images.unsplash.com/photo-1622290291468-a28f7a7dc6a8?auto=format&fit=crop&w=900&q=80'
    ],
    sizes: ['2-3 Y', '4-5 Y', '6-7 Y', '8-9 Y'],
    colors: [
      { name: 'Royal Mustard & Gold', hex: '#E1A100' },
      { name: 'Royal Blue & Cream', hex: '#1E3A8A' }
    ],
    stock: 20,
    isTrending: true,
    isTopDeal: true,
    description: 'Dress your little prince in royal comfort. Handcrafted from hypoallergenic pure silk blend with soft 100% mulmul cotton lining to protect delicate skin.',
    fabric: 'Silk Blend with 100% Breathable Mulmul Cotton Lining',
    fit: 'Comfort Relaxed Fit with Elasticated Dhoti',
    pattern: 'Traditional Peacock Gota Patti Embroidery',
    occasion: 'Festivals, Weddings & Family Celebrations',
    care: 'Dry clean recommended.',
    specifications: {
      'Pieces': '2-Piece Set (Kurta and Ready-to-Wear Dhoti)',
      'Lining': 'Full Ultra-Soft Cotton Inner Lining',
      'Country of Origin': 'India'
    },
    createdAt: '2026-01-25T10:00:00Z'
  },
  {
    id: 'prod-113',
    name: 'Princess Floral Satin Gown with Tulle Ruffle Skirt',
    brand: 'AURELIA LUXE',
    category: 'Kids',
    subcategory: 'Dresses & Frocks',
    originalPrice: 8499,
    discountedPrice: 3999,
    discountPercentage: 53,
    rating: 4.9,
    ratingCount: 410,
    reviewCount: 115,
    images: [
      'https://images.unsplash.com/photo-1622290291468-a28f7a7dc6a8?auto=format&fit=crop&w=900&q=80',
      'https://images.unsplash.com/photo-1518831959646-742c3a14ebf7?auto=format&fit=crop&w=900&q=80',
      'https://images.unsplash.com/photo-1503944570-2002dd42c66e?auto=format&fit=crop&w=900&q=80'
    ],
    sizes: ['2-3 Y', '4-5 Y', '6-7 Y', '8-9 Y', '10-11 Y'],
    colors: [
      { name: 'Champagne Peach', hex: '#FFDAB9' },
      { name: 'Powder Lavender', hex: '#E6E6FA' },
      { name: 'Rose Petal Pink', hex: '#FFC0CB' }
    ],
    stock: 14,
    isNewArrival: true,
    isBestSeller: true,
    description: 'Every little girl’s dream dress. Features a duchess satin bodice embellished with 3D floral appliqués and pearls, flowing into a fairytale multi-tiered soft tulle skirt.',
    fabric: 'Duchess Satin with Multi-Layered Soft French Tulle',
    fit: 'Ball Gown Fit',
    pattern: '3D Organza Flowers & Pearl Waistband',
    occasion: 'Birthdays, Weddings & Parties',
    care: 'Dry Clean or Hand Wash with extra care.',
    specifications: {
      'Layers': '4-Tiered Volume Tulle with Cotton Underskirt',
      'Back Detail': 'Giant Satin Bow Tie at Back',
      'Country of Origin': 'India'
    },
    createdAt: '2026-02-06T10:00:00Z'
  },
  {
    id: 'prod-114',
    name: 'Pure Pashmina Kashmiri Cashmere Shawl with Tilla Embroidery',
    brand: 'RAW MANGO',
    category: 'Accessories',
    subcategory: 'Scarves & Shawls',
    originalPrice: 26999,
    discountedPrice: 12999,
    discountPercentage: 52,
    rating: 4.9,
    ratingCount: 610,
    reviewCount: 204,
    images: [
      'https://images.unsplash.com/photo-1608256246200-53e635b5b65f?auto=format&fit=crop&w=900&q=80',
      'https://images.unsplash.com/photo-1584917865442-de89df76afd3?auto=format&fit=crop&w=900&q=80',
      'https://images.unsplash.com/photo-1522335789203-aabd1fc54bc9?auto=format&fit=crop&w=900&q=80'
    ],
    sizes: ['200cm x 100cm'],
    colors: [
      { name: 'Antique Natural Ivory', hex: '#FFFFF0' },
      { name: 'Midnight Charcoal', hex: '#262626' },
      { name: 'Burgundy Crimson', hex: '#800020' }
    ],
    stock: 8,
    isTrending: true,
    isBestSeller: true,
    description: 'Woven from ultra-fine 12-micron Changthangi mountain goat fleece in Srinagar. Embellished with historic gold Tilla thread embroidery along the four-sided hashidar border.',
    fabric: '100% Certified Authentic Changthangi Pashmina',
    fit: 'Generous Wrap Size',
    pattern: 'Hand Tilla Golden Thread Needlework',
    occasion: 'Winter Galas, Weddings & Royal Heirloom Gifting',
    care: 'Dry Clean Only. Store with cedar balls.',
    specifications: {
      'Weave Type': 'Chashm-e-Bulbul Diamond Weave',
      'Certification': 'Geographical Indication (GI) Tagged',
      'Country of Origin': 'Kashmir, India'
    },
    createdAt: '2026-01-08T10:00:00Z'
  },
  {
    id: 'prod-115',
    name: 'Italian Suede Penny Loafers with Champagne Horsebit',
    brand: 'MONTE CARLO ATELIER',
    category: 'Footwear',
    subcategory: 'Casual & Loafers',
    originalPrice: 14999,
    discountedPrice: 7299,
    discountPercentage: 51,
    rating: 4.8,
    ratingCount: 540,
    reviewCount: 139,
    images: [
      'https://images.unsplash.com/photo-1614252235316-8c857d38b5f4?auto=format&fit=crop&w=900&q=80',
      'https://images.unsplash.com/photo-1533867617858-e7b97e060509?auto=format&fit=crop&w=900&q=80',
      'https://images.unsplash.com/photo-1549298916-b41d501d3772?auto=format&fit=crop&w=900&q=80'
    ],
    sizes: ['UK 7', 'UK 8', 'UK 9', 'UK 10'],
    colors: [
      { name: 'Tuscan Snuff Suede', hex: '#8F5438' },
      { name: 'Navy Blue Suede', hex: '#1C2833' },
      { name: 'Smoke Grey Suede', hex: '#707B7C' }
    ],
    stock: 12,
    isTrending: true,
    isTopDeal: true,
    description: 'The pinnacle of relaxed sophistication. Handcrafted in Tuscany from buttery soft calf suede with water-repellent treatment, Blake stitched leather soles with rubber grip inserts, and champagne gold horsebit hardware.',
    fabric: 'Water-Repellent Italian Calf Suede',
    fit: 'True to Size Loafer Fit',
    pattern: 'Champagne Gold Horsebit Hardware',
    occasion: 'Resort Wear, Yachting & Smart Casual Brunches',
    care: 'Clean with suede brass brush.',
    specifications: {
      'Hardware': 'Champagne Gold Electroplated Metal',
      'Construction': 'Blake Stitched',
      'Sole': 'Leather with Integrated Anti-Slip Rubber Pods',
      'Country of Origin': 'Italy'
    },
    createdAt: '2026-01-16T10:00:00Z'
  },
  {
    id: 'prod-116',
    name: 'Velmira Royal Zari Silk Embroidered Lehenga Set',
    brand: 'VELMIRA COUTURE',
    category: 'Sale',
    subcategory: 'Lehengas',
    originalPrice: 38999,
    discountedPrice: 16999,
    discountPercentage: 56,
    rating: 4.9,
    ratingCount: 890,
    reviewCount: 260,
    images: [
      'https://images.unsplash.com/photo-1583391733956-3750e0ff4e8b?auto=format&fit=crop&w=900&q=80',
      'https://images.unsplash.com/photo-1610030469983-98e550d6193c?auto=format&fit=crop&w=900&q=80',
      'https://images.unsplash.com/photo-1566174053879-31528523f8ae?auto=format&fit=crop&w=900&q=80'
    ],
    sizes: ['S', 'M', 'L', 'XL'],
    colors: [
      { name: 'Deep Royal Crimson', hex: '#800000' },
      { name: 'Champagne Ochre Gold', hex: '#D4AF37' }
    ],
    stock: 5,
    isTrending: true,
    isBestSeller: true,
    isTopDeal: true,
    description: 'A masterpiece bridal creation. 16-kali flared raw silk lehenga laden with heritage dabka, sequin, and gota work. Features dual dupattas: a regal velvet shoulder shawl and an airy sheer silk net head veil.',
    fabric: 'Heavy Raw Silk, Micro Velvet & Silk Net',
    fit: 'Bridal Flared Silhouette',
    pattern: 'Royal Architectural Mughal Jaal & Dabka Work',
    occasion: 'Bridal, Grand Sangeet & Reception',
    care: 'Dry Clean Only. Air dry in shade before storing.',
    specifications: {
      'Gher Flare': '6.2 meters Full Volume Flare',
      'Included': 'Lehenga Skirt, Embellished Blouse & Dual Dupattas',
      'Can-Can': 'Dual Layer Hard Net Can-Can Attached',
      'Country of Origin': 'India'
    },
    createdAt: '2026-01-05T10:00:00Z'
  }
];

export const INITIAL_COUPONS: Coupon[] = [
  {
    code: 'VELMIRA500',
    discountType: 'flat',
    value: 500,
    minOrderValue: 2999,
    description: 'Flat ₹500 OFF on orders above ₹2,999 for luxury shopping',
    expiryDate: '2026-12-31'
  },
  {
    code: 'FIRSTBUY',
    discountType: 'percentage',
    value: 15,
    minOrderValue: 1999,
    maxDiscount: 1500,
    description: '15% instant discount on your first purchase (up to ₹1,500)',
    expiryDate: '2026-12-31'
  },
  {
    code: 'GOLD1000',
    discountType: 'flat',
    value: 1000,
    minOrderValue: 6999,
    description: 'Flat ₹1,000 OFF on premium orders above ₹6,999',
    expiryDate: '2026-12-31'
  },
  {
    code: 'ROYAL20',
    discountType: 'percentage',
    value: 20,
    minOrderValue: 9999,
    maxDiscount: 3000,
    description: '20% OFF on high luxury orders above ₹9,999 (up to ₹3,000)',
    expiryDate: '2026-12-31'
  }
];

export const INITIAL_REVIEWS: Review[] = [
  {
    id: 'rev-1',
    productId: 'prod-101',
    userName: 'Priya Sundaram',
    userLocation: 'Bengaluru, Karnataka',
    rating: 5,
    title: 'Exceeded all expectations! Pure regal beauty',
    comment: 'The Banarasi Katan silk fabric is genuinely authentic. The zari has a refined champagne gold luster rather than a cheap shiny look. Wore it to my brother’s reception and received countless compliments!',
    verifiedPurchase: true,
    helpfulCount: 38,
    createdAt: '2026-02-02T14:30:00Z'
  },
  {
    id: 'rev-2',
    productId: 'prod-101',
    userName: 'Ananya Deshmukh',
    userLocation: 'Mumbai, Maharashtra',
    rating: 5,
    title: 'Heirloom quality packaging & drape',
    comment: 'Came packaged in a gorgeous velvet dust cover with an authenticity certificate. The drape is so fluid and comfortable. Flipkart-level fast delivery by Velmira!',
    verifiedPurchase: true,
    helpfulCount: 24,
    createdAt: '2026-02-10T09:15:00Z'
  },
  {
    id: 'rev-3',
    productId: 'prod-102',
    userName: 'Vikramaditya Roy',
    userLocation: 'New Delhi',
    rating: 5,
    title: 'Savile Row quality at Indian luxury price',
    comment: 'The tailoring on this double-breasted jacket is phenomenal. The shoulders have that exact Neapolitan soft roll and the super-120s wool breathes exceptionally well.',
    verifiedPurchase: true,
    helpfulCount: 41,
    createdAt: '2026-02-05T18:20:00Z'
  },
  {
    id: 'rev-4',
    productId: 'prod-107',
    userName: 'Sameer Mehra',
    userLocation: 'Hyderabad, Telangana',
    rating: 5,
    title: 'Substantial weight and accurate movement',
    comment: 'The automatic sweep second hand is silky smooth. The green sunburst dial catches the light in the most subtle luxury way. 10/10 purchase.',
    verifiedPurchase: true,
    helpfulCount: 19,
    createdAt: '2026-02-12T11:45:00Z'
  }
];
