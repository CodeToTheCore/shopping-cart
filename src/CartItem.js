import React from "react";
import { formatPrice } from "./cartMath";

function CartItem({ item, onRemoveItem, onIncrement, onDecrement }){
    return(
        <li className="cart-item">
            <span className="cart-icon" aria-hidden="true">{item.icon}</span>
            <div className="cart-details">
                <p className="cart-name">{item.name}</p>
                <p className="cart-price">{formatPrice(item.price)} each</p>
                <div className="quantity">
                    <button aria-label={`Remove one ${item.name}`} onClick={() => onDecrement(item.id)}>-</button>
                    <span aria-label="Quantity">{item.quantity}</span>
                    <button aria-label={`Add one ${item.name}`} onClick={() => onIncrement(item.id)}>+</button>
                </div>
            </div>
            <div className="cart-right">
                <p className="line-total">{formatPrice(item.price * item.quantity)}</p>
                <button className="remove" onClick={() => onRemoveItem(item.id)}>Remove</button>
            </div>
        </li>
    );
}

export default CartItem;
