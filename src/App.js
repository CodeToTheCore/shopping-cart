import React, { useEffect, useState } from 'react';
import ProductList from './productList';
import CartItem from './CartItem';
import CartSummary from './CartSummary';
import BrandsSection from './BrandsSection';
import { itemCount, formatPrice, subtotal } from './cartMath';
import './App.css';

const STORAGE_KEY = 'core-cart';

// Load the saved cart so it's still there after a page refresh
function loadCart() {
  try {
    return JSON.parse(localStorage.getItem(STORAGE_KEY)) || [];
  } catch {
    return [];
  }
}

function App() {
  const [cartItems, setCartItems] = useState(loadCart);
  const [orderTotal, setOrderTotal] = useState(null);

  // only one audio preview plays at a time
  useEffect(() => {
    const pauseOthers = (event) => {
      document.querySelectorAll('audio').forEach((audio) => {
        if (audio !== event.target) audio.pause();
      });
    };
    document.addEventListener('play', pauseOthers, true);
    return () => document.removeEventListener('play', pauseOthers, true);
  }, []);

  // Save the cart every time it changes
  useEffect(() => {
    try {
      localStorage.setItem(STORAGE_KEY, JSON.stringify(cartItems));
    } catch {
      // storage can be unavailable (private browsing); the cart still works for this visit
    }
  }, [cartItems]);

  // Each update uses the latest cart (prev), so fast clicks never overwrite each other
  const addItem = (product) => {
    setCartItems(prev => prev.some(item => item.id === product.id)
      ? prev.map(item => item.id === product.id ? { ...item, quantity: item.quantity + 1 } : item)
      : [...prev, { ...product, quantity: 1 }]
    );
  };

  const removeItem = (itemId) => {
    setCartItems(prev => prev.filter(item => item.id !== itemId));
  };

  const incrementQuantity = (itemId) => {
    setCartItems(prev => prev.map(item =>
      item.id === itemId ? { ...item, quantity: item.quantity + 1 } : item
    ));
  };

  // going below 1 removes the item from the cart
  const decrementQuantity = (itemId) => {
    setCartItems(prev => prev
      .map(item => item.id === itemId ? { ...item, quantity: item.quantity - 1 } : item)
      .filter(item => item.quantity > 0)
    );
  };

  const checkout = (total) => {
    setOrderTotal(total);
    setCartItems([]);
  };

  return (
    <div className="App">
      <header className="store-header">
        <div>
          <h1>Code To The Core <span>Merch</span></h1>
          <p>Music, beats, and gear from CoreTheProducer</p>
        </div>
        <nav className="store-nav" aria-label="Store sections">
          <a href="#products">Merch</a>
          <a href="#brands">Brands I Rock</a>
        </nav>
        <a href="#cart" className="cart-count" aria-label={`Cart, ${itemCount(cartItems)} items`}>
          🛒 {itemCount(cartItems)}
        </a>
      </header>

      {orderTotal !== null && (
        <div className="confirmation" role="status">
          <p>✅ Order placed! Your total was {formatPrice(orderTotal)}. (Demo store, so no payment was taken.)</p>
          <button onClick={() => setOrderTotal(null)}>Keep shopping</button>
        </div>
      )}

      <main className="layout">
        <div className="shop-column">
          <ProductList onAddItem={addItem} cartItems={cartItems} />
          <BrandsSection />
        </div>

        <aside className="cart" id="cart" aria-label="Shopping cart">
          <h2>Your Cart</h2>
          {cartItems.length === 0 ? (
            <p className="empty">Your cart is empty. Add something you love!</p>
          ) : (
            <>
              <ul className="cart-list">
                {cartItems.map(item => (
                  <CartItem
                    key={item.id}
                    item={item}
                    onRemoveItem={removeItem}
                    onIncrement={incrementQuantity}
                    onDecrement={decrementQuantity} />
                ))}
              </ul>
              <CartSummary items={cartItems} onCheckout={checkout} />
            </>
          )}
        </aside>
      </main>

      {/* phones and small windows: the cart is below the products, so keep the total in view */}
      {cartItems.length > 0 && (
        <a href="#cart" className="cart-bar">
          <span>🛒 {itemCount(cartItems)} {itemCount(cartItems) === 1 ? 'item' : 'items'}</span>
          <span>Subtotal {formatPrice(subtotal(cartItems))} · View cart</span>
        </a>
      )}
    </div>
  );
}

export default App;
