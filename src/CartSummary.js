import React, { useState } from 'react';
import { cartTotals, itemCount, formatPrice, FREE_SHIPPING_MIN, needsShipping, PROMO_CODES } from './cartMath';

function CartSummary({ items, onCheckout }) {
    const [codeInput, setCodeInput] = useState('');
    const [promoCode, setPromoCode] = useState('');
    const [promoMessage, setPromoMessage] = useState('');
    const totals = cartTotals(items, promoCode);
    const totalItems = itemCount(items);
    const toFreeShipping = FREE_SHIPPING_MIN - (totals.subtotal - totals.discount);

    function applyCode(event) {
        event.preventDefault();
        if (PROMO_CODES[codeInput.trim().toUpperCase()]) {
            setPromoCode(codeInput);
            setPromoMessage('Code applied!');
        } else {
            setPromoCode('');
            setPromoMessage('That code is not valid.');
        }
    }

    return (
        <div className="summary">
            <h2>Cart Summary</h2>
            <p>Total Items: {totalItems}</p>
            <dl>
                <div><dt>Subtotal</dt><dd>{formatPrice(totals.subtotal)}</dd></div>
                {totals.discount > 0 && <div className="discount"><dt>Discount</dt><dd>-{formatPrice(totals.discount)}</dd></div>}
                <div><dt>Shipping</dt><dd>{totals.shipping ? formatPrice(totals.shipping) : 'Free'}</dd></div>
                <div><dt>Tax</dt><dd>{formatPrice(totals.tax)}</dd></div>
                <div className="total"><dt>Total</dt><dd>{formatPrice(totals.total)}</dd></div>
            </dl>
            {needsShipping(items) && toFreeShipping > 0 && (
                <p className="hint">Add {formatPrice(toFreeShipping)} more for free shipping</p>
            )}
            <form className="promo" onSubmit={applyCode}>
                <label htmlFor="promo">Promo code</label>
                <div>
                    <input id="promo" value={codeInput} onChange={(e) => setCodeInput(e.target.value)} placeholder="Try CORE10" />
                    <button type="submit">Apply</button>
                </div>
                {promoMessage && <p className="promo-message" role="status">{promoMessage}</p>}
            </form>
            <button className="checkout" onClick={() => onCheckout(totals.total)}>
                Checkout · {formatPrice(totals.total)}
            </button>
        </div>
    );
}

export default CartSummary;
