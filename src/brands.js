// Brands I Rock: brands I wear and recommend. I partner with the brand companies directly, not stores.
//
// To start earning a commission on a brand:
//   1. Join its affiliate program (look for "Affiliates" in the brand's website footer),
//      or ask a smaller brand directly for a partner deal.
//   2. Paste the tracking link they give you into affiliateUrl.
//   3. If they give you a discount code for shoppers, put it in promoCode.
// Until then, the button links to the brand's normal site (no commission).
//
// note: a sentence in my own words about why I like the brand (fill these in)

const brands = [
  { id: 1, name: 'Cult of Individuality', category: 'Streetwear & Denim', url: 'https://cultofindividuality.com' },
  { id: 2, name: 'BKYS', category: 'Streetwear & Denim', url: 'https://www.premiumloungeny.com/pages/bkys' },
  { id: 3, name: 'Smoke Rise NY', category: 'Streetwear & Denim', url: 'https://smokeriseny.com' },
  { id: 4, name: 'The North Face', category: 'Outerwear', url: 'https://www.thenorthface.com' },
  { id: 5, name: 'Columbia', category: 'Outerwear', url: 'https://www.columbia.com' },
  { id: 6, name: 'Pelle Pelle', category: 'Outerwear', url: 'https://pellepelle.com' },
  { id: 7, name: 'New Balance', category: 'Footwear', url: 'https://www.newbalance.com' },
  { id: 8, name: 'Timberland', category: 'Footwear', url: 'https://www.timberland.com' },
  { id: 9, name: 'NBA Gear', category: 'Sports', url: 'https://store.nba.com' },
  { id: 10, name: 'G-Star Raw', category: 'Streetwear & Denim', url: 'https://www.g-star.com' },
  { id: 11, name: 'Ewing Athletics', category: 'Footwear', url: 'https://shop.ewingathletics.com' },
  // TODO: confirm Voyage Studio's website. voyagestudio.com wasn't responding on Oct 20, 2026
  { id: 12, name: 'Voyage Studio', category: 'Streetwear & Denim', url: 'https://www.voyagestudio.com' },
  { id: 13, name: 'Nike', category: 'Footwear', url: 'https://www.nike.com' },
  { id: 14, name: 'Avirex', category: 'Outerwear', url: 'https://www.avirex.com' },
].map((brand) => ({ affiliateUrl: null, promoCode: null, note: '', ...brand }));

export const brandCategories = ['All', ...new Set(brands.map((b) => b.category))];

// The link the "Shop" button uses. Tags it so the brand's own analytics show
// visitors came from my store, which is proof to show when pitching a partnership.
export function shopLink(brand) {
  const link = new URL(brand.affiliateUrl || brand.url);
  link.searchParams.set('utm_source', 'codetothecore');
  link.searchParams.set('utm_medium', 'referral');
  link.searchParams.set('utm_campaign', 'brands-i-rock');
  return link.toString();
}

// two-letter badge for the brand card (no copied logos)
export function initials(name) {
  const words = name.replace(/^The /, '').split(/\s+/);
  // one word (like BKYS) gets its first two letters
  return (words.length === 1 ? words[0].slice(0, 2) : words.map((w) => w[0]).join('').slice(0, 2)).toUpperCase();
}

export default brands;
