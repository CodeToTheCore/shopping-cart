import React from 'react';

function ProductList({ onAddItem}) {
    const products = [{ id: 1, name: 'Product 1'}, {id: 2, name: 'Product 2'}];
    return (
    <ul>
        {products.map(product => (
            <li key={product.id}>
                {product.name}
                <button onClick={() => onAddItem(product)}>Add to Cart</button>
            </li>
        ))}
    </ul>
    );
}

export default ProductList;