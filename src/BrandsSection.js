import React, { useState } from 'react';
import brands, { brandCategories, shopLink, initials } from './brands';

function BrandsSection() {
    const [category, setCategory] = useState('All');
    const shown = category === 'All' ? brands : brands.filter((b) => b.category === category);

    return (
        <section className="brands" id="brands" aria-labelledby="brands-heading">
            <div className="brands-head">
                <h2 id="brands-heading">Brands I Rock</h2>
                <p>The brands I wear and trust. Shop them straight from here.</p>
            </div>

            <div className="filters" role="group" aria-label="Filter brands">
                {brandCategories.map((c) => (
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

            <ul className="brand-grid">
                {shown.map((brand) => (
                    <li key={brand.id} className="brand-card">
                        <div className="brand-badge" aria-hidden="true">{initials(brand.name)}</div>
                        <div className="brand-body">
                            <h3>{brand.name}</h3>
                            <p className="brand-category">{brand.category}</p>
                            {brand.note && <p className="brand-note">“{brand.note}”</p>}
                            {brand.promoCode && (
                                <p className="brand-code">Use code <strong>{brand.promoCode}</strong></p>
                            )}
                        </div>
                        <a
                            className="brand-shop"
                            href={shopLink(brand)}
                            target="_blank"
                            rel={brand.affiliateUrl ? 'sponsored noopener noreferrer' : 'noopener noreferrer'}
                        >
                            Shop {brand.name} ↗
                        </a>
                    </li>
                ))}
            </ul>

            <p className="disclosure">
                Some of these links may be affiliate links. If you buy through them, I may earn a small
                commission at no extra cost to you. I only feature brands I actually wear.
            </p>
        </section>
    );
}

export default BrandsSection;
