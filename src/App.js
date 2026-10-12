import React, { useState } from 'react';
import ProductList from './productList';
import CartItem from './CartItem';
import CartSummary from './CartSummary';

function App() {
  const [cartItems, setCartItems] = useState([]);

  const addItem = (product) => {
    const exists = cartItems.find(item => item.id === product.id);
    if (exists) {
      setCartItems(cartItems.map(item =>
        item.id === product.id ? { ...item, quantity: item.quantity + 1 } : item
      ));
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

  const decrementQuantity = (itemId) => {
    setCartItems(cartItems.map(item =>
      item.id === itemId && item.quantity > 1 ? { ...item, quantity: item.quantity - 1 } : item
    ));
  };

  return (
    <div className="App">
      <h1>Shopping Cart</h1>
      <ProductList onAddItem={addItem} />
      <div>
        {cartItems.map(item => (
          <CartItem 
            key={item.id} 
            item={item} 
            onRemoveItem={removeItem} 
            onIncrement={incrementQuantity} 
            onDecrement={decrementQuantity} />
        ))}
      </div>
      <CartSummary items={cartItems} />
    </div>
  );
}

export default App;