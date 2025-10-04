import React from 'react';

export default function Orders({ orders }) {
  return (
    <div style={{ padding:16 }}>
      <h2>Your Orders</h2>
      {orders.length === 0 ? <p>No orders yet.</p> : (
        <ul>
          {orders.map(o => (
            <li key={o.id}>Order #{o.id} — ${ (o.total_cents/100).toFixed(2) } — {new Date(o.created_at).toLocaleString()}</li>
          ))}
        </ul>
      )}
    </div>
  );
}
