import React, { useEffect, useState } from 'react';
import Navbar from './components/Navbar.jsx';
import ProductList from './components/ProductList.jsx';
import Cart from './components/Cart.jsx';
import Login from './components/Login.jsx';
import Signup from './components/Signup.jsx';
import Orders from './components/Orders.jsx';
import * as api from './api.js';

export default function App() {
  const [view, setView] = useState('products');
  const [user, setUser] = useState(() => {
    const stored = localStorage.getItem('user');
    return stored ? JSON.parse(stored) : null;
  });
  const [products, setProducts] = useState([]);
  const [cart, setCart] = useState([]);
  const [orders, setOrders] = useState([]);

  useEffect(() => { api.getProducts().then(setProducts); }, []);
  useEffect(() => { if (user) api.getCart().then(setCart); }, [user]);

  function saveAuth({ token, user }) {
    localStorage.setItem('token', token);
    localStorage.setItem('user', JSON.stringify(user));
    setUser(user);
    setView('products');
  }

  async function handleAdd(productId) {
    if (!user) { setView('login'); return; }
    await api.addToCart(productId, 1);
    setCart(await api.getCart());
  }

  async function handleRemove(productId) {
    await api.removeFromCart(productId);
    setCart(await api.getCart());
  }

  async function handleCheckout() {
    const res = await api.checkout();
    if (res.ok) {
      setCart([]);
      setOrders(await api.getOrders());
      setView('orders');
    } else {
      alert(res.error || 'Checkout failed');
    }
  }

  async function goOrders() {
    setOrders(await api.getOrders());
    setView('orders');
  }

  return (
    <>
      <Navbar user={user} onLogout={() => { localStorage.clear(); setUser(null); setCart([]); }} onView={(v)=>{ v==='orders' ? goOrders() : setView(v); }} />
      {view === 'products' && <ProductList products={products} onAdd={handleAdd} />}
      {view === 'cart' && <Cart items={cart} onRemove={handleRemove} onCheckout={handleCheckout} />}
      {view === 'login' && <Login onSubmit={async (creds)=>{ const res = await api.login(creds); res.token ? saveAuth(res) : alert(res.error); }} />}
      {view === 'signup' && <Signup onSubmit={async (data)=>{ const res = await api.register(data); res.token ? saveAuth(res) : alert(res.error); }} />}
      {view === 'orders' && <Orders orders={orders} />}
    </>
  );
}
