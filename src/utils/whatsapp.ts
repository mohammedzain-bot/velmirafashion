import { CartItem, Product, Address, CurrencyType } from '../types';

export const OFFICIAL_WHATSAPP_NUMBER = '+971 55 678 7854';
export const WHATSAPP_RAW_NUMBER = '971556787854';

export interface WhatsAppOrderDetails {
  orderId?: string;
  customerName: string;
  customerPhone: string;
  customerEmail?: string;
  shippingAddress: Address;
  items: Array<{
    name: string;
    brand: string;
    size: string;
    color: string;
    quantity: number;
    price: number;
    priceAED?: number;
  }>;
  subtotal: number;
  deliveryFee: number;
  couponDiscount?: number;
  totalAmount: number;
  currency: CurrencyType;
  paymentMethod?: string;
  notes?: string;
}

export function formatWhatsAppOrderMessage(data: WhatsAppOrderDetails): string {
  const isAED = data.currency === 'AED';
  const currencySymbol = isAED ? 'AED ' : '₹';
  const countryFlag = data.shippingAddress.country === 'UAE' ? '🇦🇪 UAE' : '🇮🇳 INDIA';

  let msg = `👑 *VELMIRA — HAUTE HORLOGERIE ORDER* 👑\n`;
  msg += `━━━━━━━━━━━━━━━━━━━━━━\n`;
  if (data.orderId) {
    msg += `🔖 *Order ID:* ${data.orderId}\n`;
  }
  msg += `📅 *Date:* ${new Date().toLocaleDateString('en-IN', { day: 'numeric', month: 'short', year: 'numeric', hour: '2-digit', minute: '2-digit' })}\n`;
  msg += `🌍 *Region:* ${countryFlag}\n\n`;

  msg += `👤 *CUSTOMER DETAILS:*\n`;
  msg += `• *Name:* ${data.customerName}\n`;
  msg += `• *WhatsApp Mobile:* ${data.customerPhone}\n`;
  if (data.customerEmail) {
    msg += `• *Email:* ${data.customerEmail}\n`;
  }
  msg += `\n📍 *DELIVERY ADDRESS:*\n`;
  msg += `${data.shippingAddress.addressLine1}\n`;
  if (data.shippingAddress.addressLine2) {
    msg += `${data.shippingAddress.addressLine2}\n`;
  }
  msg += `${data.shippingAddress.city}, ${data.shippingAddress.state}\n`;
  msg += `*Postal / PIN / Makani:* ${data.shippingAddress.pincode}\n`;
  msg += `*Country:* ${data.shippingAddress.country}\n\n`;

  msg += `⌚ *ORDERED TIMEPIECES:*\n`;
  msg += `━━━━━━━━━━━━━━━━━━━━━━\n`;

  data.items.forEach((item, idx) => {
    const itemPrice = isAED && item.priceAED ? item.priceAED : item.price;
    const itemTotal = itemPrice * item.quantity;
    msg += `${idx + 1}. *${item.name}*\n`;
    msg += `   • Brand: ${item.brand}\n`;
    msg += `   • Model/Size: ${item.size} | Shade: ${item.color}\n`;
    msg += `   • Qty: ${item.quantity} × ${currencySymbol}${itemPrice.toLocaleString('en-IN')}\n`;
    msg += `   • Item Total: *${currencySymbol}${itemTotal.toLocaleString('en-IN')}*\n\n`;
  });

  msg += `━━━━━━━━━━━━━━━━━━━━━━\n`;
  msg += `💰 *ORDER FINANCIAL SUMMARY:*\n`;
  msg += `• Subtotal: ${currencySymbol}${data.subtotal.toLocaleString('en-IN')}\n`;
  if (data.couponDiscount && data.couponDiscount > 0) {
    msg += `• Voucher Discount: -${currencySymbol}${data.couponDiscount.toLocaleString('en-IN')}\n`;
  }
  msg += `• White-Glove Shipping: ${data.deliveryFee === 0 ? 'FREE' : `${currencySymbol}${data.deliveryFee}`}\n`;
  msg += `• *FINAL PAYABLE:* *${currencySymbol}${data.totalAmount.toLocaleString('en-IN')}*\n\n`;

  if (data.paymentMethod) {
    msg += `💳 *Preferred Payment:* ${data.paymentMethod.toUpperCase()}\n`;
  }
  if (data.notes) {
    msg += `📝 *Client Note:* ${data.notes}\n`;
  }

  msg += `\n✨ *Velmira Dispatch Team:* Please confirm availability & dispatch tracking for this order!`;

  return msg;
}

export function openWhatsAppOrder(data: WhatsAppOrderDetails): void {
  const message = formatWhatsAppOrderMessage(data);
  const encodedText = encodeURIComponent(message);
  const whatsappUrl = `https://wa.me/${WHATSAPP_RAW_NUMBER}?text=${encodedText}`;
  window.open(whatsappUrl, '_blank');
}

export function openDirectProductWhatsApp(product: Product, size: string, color: string, currency: CurrencyType): void {
  const isAED = currency === 'AED';
  const price = isAED ? (product.priceAED || Math.round(product.discountedPrice / 22.5)) : product.discountedPrice;
  const symbol = isAED ? 'AED ' : '₹';
  const country = isAED ? '🇦🇪 UAE' : '🇮🇳 India';

  let msg = `👑 *VELMIRA — HAUTE HORLOGERIE INQUIRY / ORDER* 👑\n\n`;
  msg += `Hello Velmira Dispatch Concierge, I would like to order this timepiece:\n\n`;
  msg += `⌚ *Timepiece:* ${product.name}\n`;
  msg += `🏷️ *Atelier Brand:* ${product.brand}\n`;
  msg += `📐 *Selected Size / Spec:* ${size || product.sizes[0]}\n`;
  msg += `🎨 *Selected Shade / Dial:* ${color || product.colors[0]?.name}\n`;
  msg += `💰 *Price:* ${symbol}${price.toLocaleString('en-IN')}\n`;
  msg += `📍 *Delivery Region:* ${country}\n\n`;
  msg += `Please send me the ordering details and delivery timeline to my location.`;

  const encodedText = encodeURIComponent(msg);
  window.open(`https://wa.me/${WHATSAPP_RAW_NUMBER}?text=${encodedText}`, '_blank');
}
