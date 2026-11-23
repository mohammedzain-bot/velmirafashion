import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import {
  BarChart3,
  Package,
  ShoppingBag,
  Users,
  AlertTriangle,
  Plus,
  Trash2,
  Edit2,
  Check,
  X,
  TrendingUp,
  DollarSign,
  ArrowUpRight,
  Truck,
  Sparkles,
  Search,
  Filter
} from 'lucide-react';
import { useShop } from '../context/ShopContext';
import { Product, Order, CategoryType } from '../types';

export const AdminDashboardPage: React.FC = () => {
  const {
    products,
    orders,
    addProduct,
    updateProduct,
    deleteProduct,
    updateStock,
    updateOrderStatus
  } = useShop();

  const [activeTab, setActiveTab] = useState<'analytics' | 'products' | 'orders' | 'inventory' | 'customers'>('analytics');

  // Search & Filter within Admin Tables
  const [productSearch, setProductSearch] = useState('');
  const [orderSearch, setOrderSearch] = useState('');
  const [orderStatusFilter, setOrderStatusFilter] = useState('All');

  // Product Add/Edit Modal
  const [isProductModalOpen, setIsProductModalOpen] = useState(false);
  const [editingProductId, setEditingProductId] = useState<string | null>(null);

  // Form State for Product Add / Edit
  const [formName, setFormName] = useState('');
  const [formBrand, setFormBrand] = useState('VELMIRA SIGNATURE');
  const [formCategory, setFormCategory] = useState<CategoryType>('Watches');
  const [formSubcategory, setFormSubcategory] = useState('Automatic Chronographs');
  const [formOriginalPrice, setFormOriginalPrice] = useState(19999);
  const [formDiscountedPrice, setFormDiscountedPrice] = useState(9999);
  const [formStock, setFormStock] = useState(10);
  const [formSizes, setFormSizes] = useState('40mm, 42mm');
  const [formColors, setFormColors] = useState('Midnight Black, Champagne Gold');
  const [formImageUrl, setFormImageUrl] = useState('');
  const [formDescription, setFormDescription] = useState('');
  const [formFabric, setFormFabric] = useState('316L Surgical Stainless Steel / Sapphire Crystal');
  const [formFit, setFormFit] = useState('Adjustable Butterfly Clasp');

  // Order Details Modal
  const [selectedOrder, setSelectedOrder] = useState<Order | null>(null);

  // Analytics Computations
  const totalRevenue = orders.reduce((sum, o) => (o.orderStatus !== 'Cancelled' ? sum + o.totalAmount : sum), 0);
  const totalOrdersCount = orders.length;
  const totalProductsCount = products.length;
  const lowStockItems = products.filter(p => p.stock <= 5);

  const openAddProductModal = () => {
    setEditingProductId(null);
    setFormName('');
    setFormBrand('VELMIRA SIGNATURE');
    setFormCategory('Watches');
    setFormSubcategory('Automatic Chronographs');
    setFormOriginalPrice(19999);
    setFormDiscountedPrice(9999);
    setFormStock(10);
    setFormSizes('40mm, 42mm');
    setFormColors('Midnight Black, Champagne Gold');
    setFormImageUrl('https://images.unsplash.com/photo-1522335789203-aabd1fc54bc9?auto=format&fit=crop&w=900&q=80');
    setFormDescription('Artisanal bespoke luxury timepiece designed with highest precision craftsmanship.');
    setFormFabric('316L Surgical Stainless Steel');
    setFormFit('Precision Clasp');
    setIsProductModalOpen(true);
  };

  const openEditProductModal = (prod: Product) => {
    setEditingProductId(prod.id);
    setFormName(prod.name);
    setFormBrand(prod.brand);
    setFormCategory(prod.category);
    setFormSubcategory(prod.subcategory);
    setFormOriginalPrice(prod.originalPrice);
    setFormDiscountedPrice(prod.discountedPrice);
    setFormStock(prod.stock);
    setFormSizes(prod.sizes.join(', '));
    setFormColors(prod.colors.map(c => c.name).join(', '));
    setFormImageUrl(prod.images[0]);
    setFormDescription(prod.description);
    setFormFabric(prod.fabric);
    setFormFit(prod.fit);
    setIsProductModalOpen(true);
  };

  const handleSaveProduct = async (e: React.FormEvent) => {
    e.preventDefault();

    const parsedSizes = formSizes.split(',').map(s => s.trim()).filter(Boolean);
    const parsedColors = formColors.split(',').map(c => ({
      name: c.trim(),
      hex: c.toLowerCase().includes('gold') ? '#D4AF37' : '#0F0F0F'
    })).filter(c => c.name);

    const discountPercentage = Math.round(
      ((formOriginalPrice - formDiscountedPrice) / formOriginalPrice) * 100
    );

    const payload: Partial<Product> = {
      name: formName,
      brand: formBrand,
      category: formCategory,
      subcategory: formSubcategory,
      originalPrice: Number(formOriginalPrice),
      discountedPrice: Number(formDiscountedPrice),
      discountPercentage,
      stock: Number(formStock),
      sizes: parsedSizes.length > 0 ? parsedSizes : ['Free Size'],
      colors: parsedColors.length > 0 ? parsedColors : [{ name: 'Standard', hex: '#D4AF37' }],
      images: [formImageUrl || 'https://images.unsplash.com/photo-1522335789203-aabd1fc54bc9?auto=format&fit=crop&w=900&q=80'],
      description: formDescription,
      fabric: formFabric,
      fit: formFit,
      occasion: 'Bespoke Luxury & Galas',
      care: 'Specialist Atelier Care Only',
      specifications: {
        'Craftsmanship': 'Handcrafted Luxury Atelier',
        'Material': '316L Steel & Top-Grain Leather',
        'Country of Origin': 'Switzerland & Italy'
      }
    };

    if (editingProductId) {
      await updateProduct(editingProductId, payload);
    } else {
      await addProduct(payload);
    }

    setIsProductModalOpen(false);
  };

  const filteredProductsTable = products.filter(p =>
    p.name.toLowerCase().includes(productSearch.toLowerCase()) ||
    p.brand.toLowerCase().includes(productSearch.toLowerCase()) ||
    p.category.toLowerCase().includes(productSearch.toLowerCase())
  );

  const filteredOrdersTable = orders.filter(o => {
    const matchesSearch =
      o.id.toLowerCase().includes(orderSearch.toLowerCase()) ||
      o.customerName.toLowerCase().includes(orderSearch.toLowerCase()) ||
      o.customerEmail.toLowerCase().includes(orderSearch.toLowerCase());
    const matchesStatus = orderStatusFilter === 'All' || o.orderStatus === orderStatusFilter;
    return matchesSearch && matchesStatus;
  });

  return (
    <div className="min-h-screen bg-[#F4F5F7] pb-16">
      {/* Top Admin Navbar */}
      <div className="bg-[#0F0F0F] text-white border-b border-stone-800">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-4 flex items-center justify-between">
          <div className="flex items-center space-x-3">
            <span className="font-cinzel text-xl font-bold tracking-widest text-white">
              VELMIRA
            </span>
            <span className="px-2 py-0.5 rounded bg-[#D4AF37] text-black font-mono font-bold text-[10px] uppercase">
              Admin Suite
            </span>
          </div>

          <div className="flex items-center space-x-4 text-xs">
            <Link to="/" className="text-stone-300 hover:text-white transition">
              Live Storefront
            </Link>
            <Link
              to="/dashboard"
              className="px-3 py-1.5 rounded-lg bg-stone-800 hover:bg-stone-700 text-stone-200 transition"
            >
              Customer Account
            </Link>
          </div>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pt-8">
        {/* Navigation Tabs */}
        <div className="flex space-x-2 border-b border-stone-300 pb-2 overflow-x-auto scrollbar-none mb-8">
          <button
            onClick={() => setActiveTab('analytics')}
            className={`px-4 py-2.5 rounded-xl text-xs font-bold uppercase tracking-wider flex items-center space-x-2 transition ${
              activeTab === 'analytics'
                ? 'bg-[#0F0F0F] text-[#D4AF37] shadow-sm'
                : 'text-stone-600 hover:text-black bg-white border border-stone-200'
            }`}
          >
            <BarChart3 className="w-4 h-4" />
            <span>Analytics & KPIs</span>
          </button>

          <button
            onClick={() => setActiveTab('products')}
            className={`px-4 py-2.5 rounded-xl text-xs font-bold uppercase tracking-wider flex items-center space-x-2 transition ${
              activeTab === 'products'
                ? 'bg-[#0F0F0F] text-[#D4AF37] shadow-sm'
                : 'text-stone-600 hover:text-black bg-white border border-stone-200'
            }`}
          >
            <ShoppingBag className="w-4 h-4" />
            <span>Product Catalog ({products.length})</span>
          </button>

          <button
            onClick={() => setActiveTab('orders')}
            className={`px-4 py-2.5 rounded-xl text-xs font-bold uppercase tracking-wider flex items-center space-x-2 transition ${
              activeTab === 'orders'
                ? 'bg-[#0F0F0F] text-[#D4AF37] shadow-sm'
                : 'text-stone-600 hover:text-black bg-white border border-stone-200'
            }`}
          >
            <Package className="w-4 h-4" />
            <span>Orders Management ({orders.length})</span>
          </button>

          <button
            onClick={() => setActiveTab('inventory')}
            className={`px-4 py-2.5 rounded-xl text-xs font-bold uppercase tracking-wider flex items-center space-x-2 transition ${
              activeTab === 'inventory'
                ? 'bg-[#0F0F0F] text-[#D4AF37] shadow-sm'
                : 'text-stone-600 hover:text-black bg-white border border-stone-200'
            }`}
          >
            <AlertTriangle className="w-4 h-4" />
            <span>Inventory & Stock ({lowStockItems.length} Low)</span>
          </button>

          <button
            onClick={() => setActiveTab('customers')}
            className={`px-4 py-2.5 rounded-xl text-xs font-bold uppercase tracking-wider flex items-center space-x-2 transition ${
              activeTab === 'customers'
                ? 'bg-[#0F0F0F] text-[#D4AF37] shadow-sm'
                : 'text-stone-600 hover:text-black bg-white border border-stone-200'
            }`}
          >
            <Users className="w-4 h-4" />
            <span>Customer Roster</span>
          </button>
        </div>

        {/* 1. TAB: ANALYTICS & KPIS */}
        {activeTab === 'analytics' && (
          <div className="space-y-8">
            {/* 4 Stat Cards */}
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-5">
              <div className="bg-white rounded-2xl p-6 border border-stone-200 shadow-xs">
                <div className="flex items-center justify-between text-stone-400">
                  <span className="text-xs font-bold uppercase tracking-wider">Total Revenue</span>
                  <div className="p-2 rounded-xl bg-amber-50 text-[#D4AF37]">
                    <DollarSign className="w-5 h-5" />
                  </div>
                </div>
                <div className="mt-3">
                  <h3 className="font-mono text-2xl font-bold text-stone-900">
                    ₹{totalRevenue.toLocaleString('en-IN')}
                  </h3>
                  <p className="text-[11px] text-emerald-700 font-semibold mt-1 flex items-center">
                    <TrendingUp className="w-3.5 h-3.5 mr-1" /> +24.8% vs last month
                  </p>
                </div>
              </div>

              <div className="bg-white rounded-2xl p-6 border border-stone-200 shadow-xs">
                <div className="flex items-center justify-between text-stone-400">
                  <span className="text-xs font-bold uppercase tracking-wider">Total Orders</span>
                  <div className="p-2 rounded-xl bg-stone-100 text-stone-800">
                    <Package className="w-5 h-5" />
                  </div>
                </div>
                <div className="mt-3">
                  <h3 className="font-mono text-2xl font-bold text-stone-900">
                    {totalOrdersCount}
                  </h3>
                  <p className="text-[11px] text-stone-500 mt-1">100% fulfilled without escalations</p>
                </div>
              </div>

              <div className="bg-white rounded-2xl p-6 border border-stone-200 shadow-xs">
                <div className="flex items-center justify-between text-stone-400">
                  <span className="text-xs font-bold uppercase tracking-wider">Active Catalog</span>
                  <div className="p-2 rounded-xl bg-stone-100 text-stone-800">
                    <ShoppingBag className="w-5 h-5" />
                  </div>
                </div>
                <div className="mt-3">
                  <h3 className="font-mono text-2xl font-bold text-stone-900">
                    {totalProductsCount} Products
                  </h3>
                  <p className="text-[11px] text-stone-500 mt-1">Across 8 luxury departments</p>
                </div>
              </div>

              <div className="bg-white rounded-2xl p-6 border border-stone-200 shadow-xs">
                <div className="flex items-center justify-between text-stone-400">
                  <span className="text-xs font-bold uppercase tracking-wider">Low Stock Alerts</span>
                  <div className="p-2 rounded-xl bg-red-50 text-red-600">
                    <AlertTriangle className="w-5 h-5" />
                  </div>
                </div>
                <div className="mt-3">
                  <h3 className="font-mono text-2xl font-bold text-red-700">
                    {lowStockItems.length} Silhouettes
                  </h3>
                  <p className="text-[11px] text-red-600 mt-1 font-semibold">Immediate re-order advised</p>
                </div>
              </div>
            </div>

            {/* Revenue breakdown & Recent Orders */}
            <div className="grid grid-cols-1 lg:grid-cols-12 gap-8">
              {/* Category Breakdown (7 cols) */}
              <div className="lg:col-span-7 bg-white rounded-2xl p-6 border border-stone-200 shadow-xs">
                <h3 className="font-cinzel text-base font-bold text-stone-900 mb-4">
                  Sales Contribution by Atelier Category
                </h3>
                <div className="space-y-4 text-xs">
                  <div>
                    <div className="flex justify-between mb-1">
                      <span className="font-semibold text-stone-800">Automatic Chronographs & Timepieces</span>
                      <span className="font-mono font-bold text-stone-900">48% (₹100,800)</span>
                    </div>
                    <div className="w-full bg-stone-100 h-2 rounded-full overflow-hidden">
                      <div className="bg-[#D4AF37] h-full rounded-full" style={{ width: '48%' }} />
                    </div>
                  </div>

                  <div>
                    <div className="flex justify-between mb-1">
                      <span className="font-semibold text-stone-800">Designer Leather Totes & Handbags</span>
                      <span className="font-mono font-bold text-stone-900">32% (₹67,200)</span>
                    </div>
                    <div className="w-full bg-stone-100 h-2 rounded-full overflow-hidden">
                      <div className="bg-stone-800 h-full rounded-full" style={{ width: '32%' }} />
                    </div>
                  </div>

                  <div>
                    <div className="flex justify-between mb-1">
                      <span className="font-semibold text-stone-800">Tourbillon & Complication Watches</span>
                      <span className="font-mono font-bold text-stone-900">12% (₹25,200)</span>
                    </div>
                    <div className="w-full bg-stone-100 h-2 rounded-full overflow-hidden">
                      <div className="bg-amber-600 h-full rounded-full" style={{ width: '12%' }} />
                    </div>
                  </div>

                  <div>
                    <div className="flex justify-between mb-1">
                      <span className="font-semibold text-stone-800">Clutches, Wallets & Travel Bags</span>
                      <span className="font-mono font-bold text-stone-900">8% (₹16,800)</span>
                    </div>
                    <div className="w-full bg-stone-100 h-2 rounded-full overflow-hidden">
                      <div className="bg-emerald-700 h-full rounded-full" style={{ width: '8%' }} />
                    </div>
                  </div>
                </div>
              </div>

              {/* Recent Orders quick list (5 cols) */}
              <div className="lg:col-span-5 bg-white rounded-2xl p-6 border border-stone-200 shadow-xs">
                <div className="flex items-center justify-between mb-4">
                  <h3 className="font-cinzel text-base font-bold text-stone-900">
                    Latest Consignments
                  </h3>
                  <button onClick={() => setActiveTab('orders')} className="text-xs text-[#C5A059] font-bold">
                    View All
                  </button>
                </div>
                <div className="divide-y divide-stone-100">
                  {orders.slice(0, 4).map(o => (
                    <div key={o.id} className="py-3 flex items-center justify-between text-xs">
                      <div>
                        <p className="font-mono font-bold text-stone-900">{o.id}</p>
                        <p className="text-stone-500">{o.customerName}</p>
                      </div>
                      <div className="text-right">
                        <span className="font-mono font-bold text-stone-900 block">
                          ₹{o.totalAmount.toLocaleString('en-IN')}
                        </span>
                        <span className="px-1.5 py-0.2 rounded text-[9px] font-bold uppercase bg-stone-100 text-stone-700">
                          {o.orderStatus}
                        </span>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </div>
        )}

        {/* 2. TAB: PRODUCT MANAGEMENT CRUD */}
        {activeTab === 'products' && (
          <div className="space-y-4">
            <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3">
              <div className="relative flex-1 max-w-md">
                <Search className="w-4 h-4 text-stone-400 absolute left-3 top-2.5" />
                <input
                  type="text"
                  placeholder="Search products by title, atelier, category..."
                  value={productSearch}
                  onChange={e => setProductSearch(e.target.value)}
                  className="w-full pl-9 pr-3 py-2 text-xs rounded-xl border border-stone-300 bg-white"
                />
              </div>

              <button
                onClick={openAddProductModal}
                className="px-4 py-2.5 rounded-xl bg-[#0F0F0F] text-[#D4AF37] font-bold text-xs uppercase tracking-wider flex items-center space-x-1.5 hover:bg-stone-800 shadow-sm"
              >
                <Plus className="w-4 h-4" />
                <span>Add New Couture Item</span>
              </button>
            </div>

            {/* Products Table */}
            <div className="bg-white rounded-2xl border border-stone-200 overflow-hidden shadow-xs">
              <div className="overflow-x-auto">
                <table className="w-full text-left text-xs">
                  <thead className="bg-[#FAFAF8] text-stone-800 border-b border-stone-200 font-semibold uppercase tracking-wider text-[11px]">
                    <tr>
                      <th className="p-3.5">Product & Atelier</th>
                      <th className="p-3.5">Category</th>
                      <th className="p-3.5 text-right">Selling Price</th>
                      <th className="p-3.5 text-right">M.R.P.</th>
                      <th className="p-3.5 text-center">Stock</th>
                      <th className="p-3.5 text-right">Actions</th>
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-stone-100 font-mono">
                    {filteredProductsTable.map(prod => (
                      <tr key={prod.id} className="hover:bg-amber-50/30">
                        <td className="p-3.5 font-sans">
                          <div className="flex items-center space-x-3">
                            <img
                              src={prod.images[0]}
                              alt={prod.name}
                              className="w-10 h-12 object-cover rounded-lg border border-stone-200 shrink-0"
                            />
                            <div>
                              <p className="font-bold text-stone-900 line-clamp-1">{prod.name}</p>
                              <p className="text-[10px] text-[#C5A059] uppercase font-bold font-cinzel">
                                {prod.brand}
                              </p>
                            </div>
                          </div>
                        </td>
                        <td className="p-3.5 font-sans text-stone-600">
                          <span className="px-2 py-0.5 rounded bg-stone-100 text-stone-700 text-[11px]">
                            {prod.category}
                          </span>
                        </td>
                        <td className="p-3.5 text-right font-bold text-stone-900">
                          ₹{prod.discountedPrice.toLocaleString('en-IN')}
                        </td>
                        <td className="p-3.5 text-right text-stone-400 line-through">
                          ₹{prod.originalPrice.toLocaleString('en-IN')}
                        </td>
                        <td className="p-3.5 text-center">
                          <span
                            className={`px-2 py-0.5 rounded text-[10px] font-bold ${
                              prod.stock <= 5
                                ? 'bg-red-100 text-red-800'
                                : 'bg-emerald-100 text-emerald-800'
                            }`}
                          >
                            {prod.stock} left
                          </span>
                        </td>
                        <td className="p-3.5 text-right">
                          <div className="flex items-center justify-end space-x-2">
                            <button
                              onClick={() => openEditProductModal(prod)}
                              className="p-1.5 rounded-lg border border-stone-200 text-stone-600 hover:text-black hover:bg-stone-50"
                              title="Edit"
                            >
                              <Edit2 className="w-3.5 h-3.5" />
                            </button>
                            <button
                              onClick={() => deleteProduct(prod.id)}
                              className="p-1.5 rounded-lg border border-stone-200 text-stone-400 hover:text-red-600 hover:bg-red-50"
                              title="Delete"
                            >
                              <Trash2 className="w-3.5 h-3.5" />
                            </button>
                          </div>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </div>
          </div>
        )}

        {/* 3. TAB: ORDER MANAGEMENT */}
        {activeTab === 'orders' && (
          <div className="space-y-4">
            <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3">
              <div className="relative flex-1 max-w-md">
                <Search className="w-4 h-4 text-stone-400 absolute left-3 top-2.5" />
                <input
                  type="text"
                  placeholder="Search by Order ID, Patron name, or email..."
                  value={orderSearch}
                  onChange={e => setOrderSearch(e.target.value)}
                  className="w-full pl-9 pr-3 py-2 text-xs rounded-xl border border-stone-300 bg-white"
                />
              </div>

              <div className="flex items-center space-x-2 text-xs">
                <span className="text-stone-500">Filter Status:</span>
                <select
                  value={orderStatusFilter}
                  onChange={e => setOrderStatusFilter(e.target.value)}
                  className="px-3 py-2 rounded-xl border border-stone-300 bg-white font-medium"
                >
                  <option value="All">All Statuses</option>
                  <option value="Placed">Placed</option>
                  <option value="Processing">Processing</option>
                  <option value="Shipped">Shipped</option>
                  <option value="Out for Delivery">Out for Delivery</option>
                  <option value="Delivered">Delivered</option>
                  <option value="Cancelled">Cancelled</option>
                </select>
              </div>
            </div>

            {/* Orders Table */}
            <div className="bg-white rounded-2xl border border-stone-200 overflow-hidden shadow-xs">
              <div className="overflow-x-auto">
                <table className="w-full text-left text-xs">
                  <thead className="bg-[#FAFAF8] text-stone-800 border-b border-stone-200 font-semibold uppercase tracking-wider text-[11px]">
                    <tr>
                      <th className="p-3.5">Order ID</th>
                      <th className="p-3.5">Patron</th>
                      <th className="p-3.5">Items</th>
                      <th className="p-3.5">Date</th>
                      <th className="p-3.5">Status</th>
                      <th className="p-3.5 text-right">Amount</th>
                      <th className="p-3.5 text-right">Update Status</th>
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-stone-100 font-mono">
                    {filteredOrdersTable.map(order => (
                      <tr key={order.id} className="hover:bg-amber-50/30">
                        <td className="p-3.5 font-bold text-stone-900">{order.id}</td>
                        <td className="p-3.5 font-sans">
                          <p className="font-semibold text-stone-900">{order.customerName}</p>
                          <p className="text-[10px] text-stone-500">{order.customerEmail}</p>
                        </td>
                        <td className="p-3.5 font-sans text-stone-600">
                          {order.items.length} {order.items.length === 1 ? 'item' : 'items'}
                        </td>
                        <td className="p-3.5 text-stone-500 font-sans text-[11px]">
                          {new Date(order.orderDate).toLocaleDateString('en-IN', { day: 'numeric', month: 'short' })}
                        </td>
                        <td className="p-3.5 font-sans">
                          <span
                            className={`px-2 py-0.5 rounded text-[10px] font-bold uppercase tracking-wider ${
                              order.orderStatus === 'Delivered'
                                ? 'bg-emerald-100 text-emerald-800'
                                : order.orderStatus === 'Shipped'
                                ? 'bg-blue-100 text-blue-800'
                                : order.orderStatus === 'Cancelled'
                                ? 'bg-red-100 text-red-800'
                                : 'bg-amber-100 text-amber-900'
                            }`}
                          >
                            {order.orderStatus}
                          </span>
                        </td>
                        <td className="p-3.5 text-right font-bold text-stone-900">
                          ₹{order.totalAmount.toLocaleString('en-IN')}
                        </td>
                        <td className="p-3.5 text-right font-sans">
                          <select
                            value={order.orderStatus}
                            onChange={e => updateOrderStatus(order.id, e.target.value as any)}
                            className="text-xs border border-stone-300 rounded-lg px-2 py-1 bg-white font-medium focus:outline-none focus:border-[#D4AF37]"
                          >
                            <option value="Placed">Placed</option>
                            <option value="Processing">Processing</option>
                            <option value="Shipped">Shipped</option>
                            <option value="Out for Delivery">Out for Delivery</option>
                            <option value="Delivered">Delivered</option>
                            <option value="Cancelled">Cancelled</option>
                          </select>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </div>
          </div>
        )}

        {/* 4. TAB: INVENTORY & STOCK */}
        {activeTab === 'inventory' && (
          <div className="space-y-4">
            <div className="bg-amber-50 border border-amber-200 p-4 rounded-xl text-xs text-amber-900 flex items-center justify-between">
              <div className="flex items-center space-x-2">
                <AlertTriangle className="w-5 h-5 text-amber-600 shrink-0" />
                <span>
                  <strong>Inventory Engine Active:</strong> Stock decreases automatically upon completed checkout orders. Items below 5 units trigger high priority restock alerts.
                </span>
              </div>
            </div>

            <div className="bg-white rounded-2xl border border-stone-200 overflow-hidden shadow-xs">
              <table className="w-full text-left text-xs">
                <thead className="bg-[#FAFAF8] text-stone-800 border-b border-stone-200 font-semibold uppercase tracking-wider text-[11px]">
                  <tr>
                    <th className="p-3.5">Product Title</th>
                    <th className="p-3.5">Category</th>
                    <th className="p-3.5">Current Stock</th>
                    <th className="p-3.5">Status</th>
                    <th className="p-3.5 text-right">Quick Stock Adjustment</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-stone-100 font-mono">
                  {products.map(prod => (
                    <tr key={prod.id} className="hover:bg-amber-50/20">
                      <td className="p-3.5 font-sans font-semibold text-stone-900">
                        {prod.name}
                      </td>
                      <td className="p-3.5 font-sans text-stone-600">{prod.category}</td>
                      <td className="p-3.5 font-bold text-stone-900 text-sm">{prod.stock}</td>
                      <td className="p-3.5 font-sans">
                        {prod.stock <= 5 ? (
                          <span className="px-2 py-0.5 rounded text-[10px] font-bold uppercase bg-red-100 text-red-800">
                            Low Stock Alert
                          </span>
                        ) : (
                          <span className="px-2 py-0.5 rounded text-[10px] font-bold uppercase bg-emerald-100 text-emerald-800">
                            Adequate Stock
                          </span>
                        )}
                      </td>
                      <td className="p-3.5 text-right">
                        <div className="inline-flex items-center space-x-1.5 bg-stone-100 p-1 rounded-lg">
                          <button
                            onClick={() => updateStock(prod.id, Math.max(0, prod.stock - 1))}
                            className="px-2 py-0.5 rounded bg-white text-stone-700 font-bold hover:bg-stone-200"
                          >
                            -1
                          </button>
                          <button
                            onClick={() => updateStock(prod.id, prod.stock + 5)}
                            className="px-2 py-0.5 rounded bg-stone-900 text-[#D4AF37] font-bold hover:bg-stone-800"
                          >
                            +5 Restock
                          </button>
                        </div>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        )}

        {/* 5. TAB: CUSTOMERS */}
        {activeTab === 'customers' && (
          <div className="bg-white rounded-2xl border border-stone-200 overflow-hidden shadow-xs">
            <div className="p-5 border-b border-stone-100">
              <h3 className="font-cinzel text-base font-bold text-stone-900">
                Registered VIP Patrons
              </h3>
            </div>
            <table className="w-full text-left text-xs">
              <thead className="bg-[#FAFAF8] text-stone-800 border-b border-stone-200 font-semibold uppercase tracking-wider text-[11px]">
                <tr>
                  <th className="p-3.5">Name</th>
                  <th className="p-3.5">Email</th>
                  <th className="p-3.5">Phone</th>
                  <th className="p-3.5">Membership</th>
                  <th className="p-3.5 text-right">Orders Placed</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-stone-100">
                <tr className="hover:bg-amber-50/20">
                  <td className="p-3.5 font-bold text-stone-900">Aarav Sharma</td>
                  <td className="p-3.5 text-stone-600">aarav.sharma@velmira.in</td>
                  <td className="p-3.5 text-stone-600 font-mono">+91 98765 43210</td>
                  <td className="p-3.5">
                    <span className="px-2 py-0.5 rounded bg-amber-100 text-amber-900 font-bold text-[10px] uppercase">
                      Privé Gold
                    </span>
                  </td>
                  <td className="p-3.5 text-right font-mono font-bold text-stone-900">{orders.length}</td>
                </tr>
              </tbody>
            </table>
          </div>
        )}
      </div>

      {/* PRODUCT ADD / EDIT MODAL */}
      {isProductModalOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/60 backdrop-blur-sm overflow-y-auto">
          <div className="relative w-full max-w-2xl bg-white rounded-2xl shadow-2xl border border-stone-200 my-8 overflow-hidden">
            <div className="bg-[#0F0F0F] text-white p-5 flex items-center justify-between">
              <h3 className="font-cinzel text-lg font-bold tracking-wide">
                {editingProductId ? 'Edit Couture Silhouette' : 'Add New Couture Silhouette'}
              </h3>
              <button
                onClick={() => setIsProductModalOpen(false)}
                className="p-1 rounded-full text-stone-400 hover:text-white"
              >
                <X className="w-5 h-5" />
              </button>
            </div>

            <form onSubmit={handleSaveProduct} className="p-6 space-y-4 text-xs max-h-[75vh] overflow-y-auto">
              <div>
                <label className="block font-semibold text-stone-700 mb-1">Product Title</label>
                <input
                  type="text"
                  required
                  value={formName}
                  onChange={e => setFormName(e.target.value)}
                  placeholder="e.g. Royal Chronograph Automatic 42mm"
                  className="w-full px-3 py-2 rounded-lg border border-stone-300"
                />
              </div>

              <div className="grid grid-cols-2 gap-3">
                <div>
                  <label className="block font-semibold text-stone-700 mb-1">Atelier Brand</label>
                  <select
                    value={formBrand}
                    onChange={e => setFormBrand(e.target.value)}
                    className="w-full px-3 py-2 rounded-lg border border-stone-300"
                  >
                    <option value="VELMIRA SIGNATURE">VELMIRA SIGNATURE</option>
                    <option value="VELMIRA COUTURE">VELMIRA COUTURE</option>
                    <option value="VALENTINO MILANO">VALENTINO MILANO</option>
                    <option value="MONTE CARLO ATELIER">MONTE CARLO ATELIER</option>
                    <option value="AURELIA LUXE">AURELIA LUXE</option>
                    <option value="ATELIER HORLOGERIE">ATELIER HORLOGERIE</option>
                  </select>
                </div>

                <div>
                  <label className="block font-semibold text-stone-700 mb-1">Category</label>
                  <select
                    value={formCategory}
                    onChange={e => setFormCategory(e.target.value as CategoryType)}
                    className="w-full px-3 py-2 rounded-lg border border-stone-300"
                  >
                    <option value="Watches">Watches</option>
                    <option value="Bags">Bags</option>
                    <option value="Men's Watches">Men's Watches</option>
                    <option value="Women's Watches">Women's Watches</option>
                    <option value="Leather Bags">Leather Bags</option>
                    <option value="Tote Bags">Tote Bags</option>
                    <option value="Clutches & Wallets">Clutches & Wallets</option>
                    <option value="New Arrivals">New Arrivals</option>
                    <option value="Sale">Sale</option>
                  </select>
                </div>
              </div>

              <div className="grid grid-cols-3 gap-3">
                <div>
                  <label className="block font-semibold text-stone-700 mb-1">Selling Price (₹)</label>
                  <input
                    type="number"
                    required
                    value={formDiscountedPrice}
                    onChange={e => setFormDiscountedPrice(Number(e.target.value))}
                    className="w-full px-3 py-2 rounded-lg border border-stone-300 font-mono"
                  />
                </div>
                <div>
                  <label className="block font-semibold text-stone-700 mb-1">Original M.R.P. (₹)</label>
                  <input
                    type="number"
                    required
                    value={formOriginalPrice}
                    onChange={e => setFormOriginalPrice(Number(e.target.value))}
                    className="w-full px-3 py-2 rounded-lg border border-stone-300 font-mono"
                  />
                </div>
                <div>
                  <label className="block font-semibold text-stone-700 mb-1">Stock Quantity</label>
                  <input
                    type="number"
                    required
                    value={formStock}
                    onChange={e => setFormStock(Number(e.target.value))}
                    className="w-full px-3 py-2 rounded-lg border border-stone-300 font-mono"
                  />
                </div>
              </div>

              <div>
                <label className="block font-semibold text-stone-700 mb-1">Image URL (High-Res)</label>
                <input
                  type="url"
                  required
                  value={formImageUrl}
                  onChange={e => setFormImageUrl(e.target.value)}
                  placeholder="https://images.unsplash.com/..."
                  className="w-full px-3 py-2 rounded-lg border border-stone-300"
                />
              </div>

              <div className="grid grid-cols-2 gap-3">
                <div>
                  <label className="block font-semibold text-stone-700 mb-1">Sizes (Comma-separated)</label>
                  <input
                    type="text"
                    value={formSizes}
                    onChange={e => setFormSizes(e.target.value)}
                    placeholder="S, M, L, XL"
                    className="w-full px-3 py-2 rounded-lg border border-stone-300"
                  />
                </div>
                <div>
                  <label className="block font-semibold text-stone-700 mb-1">Colors (Comma-separated)</label>
                  <input
                    type="text"
                    value={formColors}
                    onChange={e => setFormColors(e.target.value)}
                    placeholder="Midnight Black, Champagne Gold"
                    className="w-full px-3 py-2 rounded-lg border border-stone-300"
                  />
                </div>
              </div>

              <div>
                <label className="block font-semibold text-stone-700 mb-1">Description</label>
                <textarea
                  rows={2}
                  value={formDescription}
                  onChange={e => setFormDescription(e.target.value)}
                  className="w-full px-3 py-2 rounded-lg border border-stone-300"
                />
              </div>

              <div className="flex justify-end gap-2 pt-2 border-t border-stone-200">
                <button
                  type="button"
                  onClick={() => setIsProductModalOpen(false)}
                  className="px-4 py-2 rounded-lg bg-stone-100 text-stone-700 font-semibold"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  className="px-6 py-2 rounded-lg bg-[#0F0F0F] text-[#D4AF37] font-bold uppercase tracking-wider"
                >
                  Save Product
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
};
