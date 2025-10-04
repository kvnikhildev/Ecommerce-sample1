import React from 'react';

export default function Cart({ items, onRemove, onCheckout }) {
  const total = items.reduce((s,i)=>s + i.price_cents*i.quantity, 0);
  return (
    <div style={{ padding:16 }}>
      <h2>Your Cart</h2>
      {items.length === 0 ? <p>Empty.</p> : (
        <>
          <ul>
            {items.map(i => (
              <li key={i.product_id} style={{ margin:'8px 0' }}>
                {i.name} × {i.quantity} — ${((i.price_cents*i.quantity)/100).toFixed(2)}
                <button style={{ marginLeft:8 }} onClick={() => onRemove(i.product_id)}>Remove</button>
              </li>
            ))}
          </ul>
          <h3>Total: ${ (total/100).toFixed(2) }</h3>
          <button onClick={onCheckout}>Checkout</button>
        </>
      )}
    </div>
  );
}
