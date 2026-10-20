import React, { useEffect, useState } from 'react';
import ProductList from './productList';
import CartItem from './CartItem';
import CartSummary from './CartSummary';
import { itemCount, formatPrice } from './cartMath';
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

  // Save the cart every time it changes
  useEffect(() => {
    try {
      localStorage.setItem(STORAGE_KEY, JSON.stringify(cartItems));
    } catch {
      // storage can be unavailable (private browsing); the cart still works for this visit
    }
  }, [cartItems]);

  const addItem = (product) => {
    const exists = cartItems.find(item => item.id === product.id);
    if (exists) {
      incrementQuantity(product.id);
    } else {
      setCartItems([...cartItems, { ...product, quantity: 1 }]);
    }
  };

  const removeItem = (itemId) => {
    setCartItems(cartItems.filter(item => item.id !== itemId));
  };

  const incrementQuantity = (itemId) => {
    setCartItems(cartItems.map(item =>
      item.id === itemId ? { ...item, quantity: item.quantity + 1 } : item
    ));
  };

  // going below 1 removes the item from the cart
  const decrementQuantity = (itemId) => {
    setCartItems(cartItems
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
        <ProductList onAddItem={addItem} cartItems={cartItems} />

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
    </div>
  );
}

export default App;
