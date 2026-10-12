import React from "react";

 function CartItem({ item, onRemoveItem, onIncrement, onDecrement }){
    return(
        <div>
            <p>{item.name} -  Quantity: {item.quantity}</p>
             <button onClick={() => onDecrement(item.id)}>-</button>
             <button onClick={() => onIncrement(item.id)}>+</button>
            <button onClick={() => onRemoveItem(item.id)}>Remove from Cart</button>
        </div>
    );
 }

 export default CartItem;