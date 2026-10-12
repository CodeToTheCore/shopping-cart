import { render, screen, fireEvent } from '@testing-library/react';
import App from './App';

test('adds a product to the cart and counts quantity', () => {
  render(<App />);
  const addButtons = screen.getAllByText('Add to Cart');
  fireEvent.click(addButtons[0]);
  fireEvent.click(addButtons[0]);
  expect(screen.getByText(/Product 1 - +Quantity: 2/)).toBeInTheDocument();
  expect(screen.getByText('Total Items: 2')).toBeInTheDocument();
});
