import React from 'react';

function CartSummary({ items }) {
    const totalItems = items.reduce((sum, item) => sum + item.quantity, 0);
    return (
        <div>
            <h2>Cart Summary</h2>
            <p>Total Items: {totalItems}</p>
        </div>
    );
}

export default CartSummary;