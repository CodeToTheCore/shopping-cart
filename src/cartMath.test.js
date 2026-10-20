import { cartTotals, itemCount, subtotal, formatPrice } from './cartMath';

const vinyl = { id: 1, price: 2999, quantity: 1 };
const beats = { id: 2, price: 1999, quantity: 2, digital: true };
const hoodie = { id: 4, price: 5500, quantity: 1 };

test('counts items and adds up prices in cents', () => {
  expect(itemCount([vinyl, beats])).toBe(3);
  expect(subtotal([vinyl, beats])).toBe(6997);
});

test('charges shipping under $50 and not over', () => {
  expect(cartTotals([vinyl]).shipping).toBe(599);
  expect(cartTotals([hoodie]).shipping).toBe(0);
});

test('digital-only orders never pay shipping', () => {
  expect(cartTotals([{ ...beats, quantity: 1 }]).shipping).toBe(0);
});

test('adds NYC sales tax and builds the total', () => {
  const t = cartTotals([vinyl]);
  expect(t.tax).toBe(266); // 2999 * 0.08875, rounded
  expect(t.total).toBe(2999 + 599 + 266);
});

test('CORE10 takes 10% off, ignores case, and rejects bad codes', () => {
  expect(cartTotals([hoodie], 'core10').discount).toBe(550);
  expect(cartTotals([hoodie], 'FAKE').discount).toBe(0);
});

test('formats cents as dollars', () => {
  expect(formatPrice(2999)).toBe('$29.99');
  expect(formatPrice(0)).toBe('$0.00');
});
