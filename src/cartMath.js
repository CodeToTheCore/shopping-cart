// All the money math for the cart, kept separate from the UI so it is easy to test.
// Every amount is in cents.

export const TAX_RATE = 0.08875;            // NYC sales tax
export const FREE_SHIPPING_MIN = 5000;      // free shipping on $50+
export const SHIPPING_COST = 599;           // $5.99 otherwise
export const PROMO_CODES = { CORE10: 0.1 }; // 10% off

export function itemCount(items) {
  return items.reduce((sum, item) => sum + item.quantity, 0);
}

export function subtotal(items) {
  return items.reduce((sum, item) => sum + item.price * item.quantity, 0);
}

// Digital items (beats, samples, sessions) don't need shipping
export function needsShipping(items) {
  return items.some((item) => !item.digital);
}

export function cartTotals(items, promoCode = '') {
  const sub = subtotal(items);
  const discountRate = PROMO_CODES[promoCode.trim().toUpperCase()] || 0;
  const discount = Math.round(sub * discountRate);
  const afterDiscount = sub - discount;
  const shipping = !needsShipping(items) || afterDiscount >= FREE_SHIPPING_MIN ? 0 : SHIPPING_COST;
  const tax = Math.round(afterDiscount * TAX_RATE);
  return { subtotal: sub, discount, shipping, tax, total: afterDiscount + shipping + tax };
}

export function formatPrice(cents) {
  return (cents / 100).toLocaleString('en-US', { style: 'currency', currency: 'USD' });
}
