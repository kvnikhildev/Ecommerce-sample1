import React from 'react';

export default function Navbar({ user, onLogout, onView }) {
  return (
    <nav style={{ padding: 12, borderBottom: '1px solid #ddd', display:'flex', gap:12 }}>
      <strong style={{ cursor:'pointer' }} onClick={() => onView('products')}>E‑Shop</strong>
      <button onClick={() => onView('cart')}>Cart</button>
      {user && <button onClick={() => onView('orders')}>Orders</button>}
      <div style={{ marginLeft:'auto' }}>
        {user ? (
          <>
            <span style={{ marginRight: 8 }}>Hi, {user.name}</span>
            <button onClick={onLogout}>Logout</button>
          </>
        ) : (
          <>
            <button onClick={() => onView('login')}>Login</button>
            <button onClick={() => onView('signup')}>Sign up</button>
          </>
        )}
      </div>
    </nav>
  );
}
