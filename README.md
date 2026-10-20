# Code To The Core Merch Store (React Shopping Cart)

A React merch store for my music brand, Code To The Core. I built the first version in March 2025 at Pursuit to practice lifting state up and passing callbacks as props, and expanded it into a full store in October 2026.

**Live demo:** https://codetothecore.github.io/shopping-cart/

## Features

- **8 products** (vinyl, beat packs, apparel, a mix session) with category filters
- **Brands I Rock:** 12 brands I wear, filtered by category, each with a Shop button to the brand's own site. Links are tagged so brands can see the visitors I send them, and they switch to affiliate links as partnerships come through (see [BRAND-PARTNERS.md](BRAND-PARTNERS.md)).
- **Hear before you buy:** voice-tagged previews of my beats on the Beat Pack and Sample Pack, plus real cover art and photos
- **Cart:** add items, change quantities (going below 1 removes the item), remove items
- **Live totals:** subtotal, NYC sales tax, shipping (free over $50, and never for digital-only orders), and the total
- **Promo codes:** try `CORE10` for 10% off
- **Saved cart:** the cart is kept in `localStorage`, so it survives a refresh
- **Checkout:** shows an order confirmation (demo store, no payment)
- **Responsive:** the cart sits beside the products on desktop. On phones the products shrink to compact rows, and a cart bar stays at the bottom of the screen with the item count and subtotal

### How the money math works

All prices are stored in **cents** (whole numbers). In JavaScript, `0.1 + 0.2` is `0.30000000000000004`, so storing dollars as decimals causes rounding bugs. The math lives in [`src/cartMath.js`](src/cartMath.js), separate from the UI, which makes it easy to test.

## Built with

React 19, Create React App, React Testing Library

## Run it locally

```bash
npm install
npm start
```

Run the tests with `npm test` (10 tests covering the cart math and the full add, update, promo, and checkout flow).
