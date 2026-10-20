import { render, screen, fireEvent } from '@testing-library/react';
import BrandsSection from './BrandsSection';
import brands, { shopLink, initials } from './brands';

test('shows all 12 brands with a shop link and filters by category', () => {
  render(<BrandsSection />);
  expect(screen.getAllByRole('link', { name: /^Shop / })).toHaveLength(12);
  fireEvent.click(screen.getByRole('button', { name: 'Footwear' }));
  const names = screen.getAllByRole('heading', { level: 3 }).map((h) => h.textContent);
  expect(names).toEqual(expect.arrayContaining(['New Balance', 'Timberland', 'Ewing Athletics']));
  expect(names).not.toContain('Columbia');
});

test('shop links open the brand site in a new tab and are tagged as coming from my store', () => {
  render(<BrandsSection />);
  const link = screen.getByRole('link', { name: 'Shop Timberland ↗' });
  expect(link).toHaveAttribute('target', '_blank');
  expect(link.getAttribute('href')).toContain('timberland.com');
  expect(link.getAttribute('href')).toContain('utm_source=codetothecore');
});

test('an affiliate link replaces the normal link once I have one', () => {
  const brand = { ...brands[0], affiliateUrl: 'https://partner.example.com/track?id=core' };
  expect(shopLink(brand)).toMatch(/^https:\/\/partner\.example\.com\/track\?id=core&utm_source=codetothecore/);
});

test('shows the affiliate disclosure and no store listings', () => {
  render(<BrandsSection />);
  expect(screen.getByText(/may earn a small commission/)).toBeInTheDocument();
  expect(screen.queryByText(/Iman Sports|Blue Jeans NYC/)).not.toBeInTheDocument();
});

test('initials skip "The"', () => {
  expect(initials('The North Face')).toBe('NF');
  expect(initials('BKYS')).toBe('BK');
});
