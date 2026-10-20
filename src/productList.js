import React, { useState } from 'react';
import products, { categories } from './products';
import { formatPrice } from './cartMath';

function ProductList({ onAddItem, cartItems }) {
    const [category, setCategory] = useState('All');
    const shown = category === 'All' ? products : products.filter((p) => p.category === category);
    const quantityInCart = (id) => cartItems.find((item) => item.id === id)?.quantity || 0;

    return (
        <section className="products" aria-label="Products">
            <div className="filters" role="group" aria-label="Filter by category">
                {categories.map((c) => (
                    <button
                        key={c}
                        className={c === category ? 'filter active' : 'filter'}
                        aria-pressed={c === category}
                        onClick={() => setCategory(c)}
                    >
                        {c}
                    </button>
                ))}
            </div>
            <ul className="product-grid">
                {shown.map(product => (
                    <li key={product.id} className="product-card">
                        {product.image ? (
                            <img className="product-image" src={product.image} alt={product.name} loading="lazy" />
                        ) : (
                            <div className="product-icon" aria-hidden="true">{product.icon}</div>
                        )}
                        <h3>{product.name}</h3>
                        <p className="product-description">{product.description}</p>
                        {product.preview && (
                            <audio className="product-preview" controls preload="none" src={product.preview}
                                aria-label={`Preview ${product.name}`} />
                        )}
                        <div className="product-footer">
                            <span className="price">{formatPrice(product.price)}</span>
                            <button className="add-button" onClick={() => onAddItem(product)}>
                                {quantityInCart(product.id) ? `Add another (${quantityInCart(product.id)})` : 'Add to Cart'}
                            </button>
                        </div>
                        {product.digital && <span className="tag">Digital</span>}
                    </li>
                ))}
            </ul>
        </section>
    );
}

export default ProductList;
