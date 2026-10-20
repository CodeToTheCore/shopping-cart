import { render, screen, fireEvent, within, act } from '@testing-library/react';
import App from './App';

beforeEach(() => localStorage.clear());

test('adds products, changes quantity, and updates the total', () => {
  render(<App />);
  const vinylCard = screen.getByText('Core Classics Vinyl LP').closest('li');
  fireEvent.click(within(vinylCard).getByText('Add to Cart'));
  fireEvent.click(within(vinylCard).getByText('Add another (1)'));

  const cart = screen.getByRole('complementary', { name: 'Shopping cart' });
  expect(within(cart).getByText('Total Items: 2')).toBeInTheDocument();
  expect(within(cart).getByText('$59.98', { selector: '.line-total' })).toBeInTheDocument();

  // going below 1 removes the item
  fireEvent.click(within(cart).getByLabelText('Remove one Core Classics Vinyl LP'));
  fireEvent.click(within(cart).getByLabelText('Remove one Core Classics Vinyl LP'));
  expect(within(cart).getByText(/Your cart is empty/)).toBeInTheDocument();
});

test('filters products by category', () => {
  render(<App />);
  fireEvent.click(screen.getByRole('button', { name: 'Apparel' }));
  expect(screen.getByText('Logo Hoodie')).toBeInTheDocument();
  expect(screen.queryByText('Core Classics Vinyl LP')).not.toBeInTheDocument();
});

test('applies a promo code and checks out', () => {
  render(<App />);
  fireEvent.click(within(screen.getByText('Logo Hoodie').closest('li')).getByText('Add to Cart'));
  fireEvent.change(screen.getByLabelText('Promo code'), { target: { value: 'CORE10' } });
  fireEvent.click(screen.getByText('Apply'));
  expect(screen.getByText('-$5.50')).toBeInTheDocument();

  fireEvent.click(screen.getByText(/Checkout/));
  expect(screen.getByText(/Order placed!/)).toBeInTheDocument();
  expect(screen.getByText(/Your cart is empty/)).toBeInTheDocument();
});

test('remembers the cart after a refresh', () => {
  const { unmount } = render(<App />);
  fireEvent.click(within(screen.getByText('Studio Tee').closest('li')).getByText('Add to Cart'));
  unmount();
  render(<App />);
  expect(screen.getByText('🛒 1')).toBeInTheDocument();
});

test('fast clicks on different products keep every item', () => {
  render(<App />);
  const [first, second, third] = screen.getAllByText('Add to Cart');
  act(() => {
    first.click();
    second.click();
    third.click();
  });
  const cart = screen.getByRole('complementary', { name: 'Shopping cart' });
  expect(within(cart).getByText('Total Items: 3')).toBeInTheDocument();
});
