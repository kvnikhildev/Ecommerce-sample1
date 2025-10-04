const API = 'http://localhost:4000/api';

function authHeader() {
  const token = localStorage.getItem('token');
  return token ? { Authorization: `Bearer ${token}` } : {};
}

export async function getProducts() {
  const r = await fetch(`${API}/products`);
  return r.json();
}

export async function register(data) {
  const r = await fetch(`${API}/auth/register`, { method: 'POST', headers: { 'Content-Type': 'application/json' }, body: JSON.stringify(data) });
  return r.json();
}

export async function login(data) {
  const r = await fetch(`${API}/auth/login`, { method: 'POST', headers: { 'Content-Type': 'application/json' }, body: JSON.stringify(data) });
  return r.json();
}

export async function getCart() {
  const r = await fetch(`${API}/cart`, { headers: { ...authHeader() } });
  return r.json();
}

export async function addToCart(product_id, quantity) {
  const r = await fetch(`${API}/cart`, { method: 'POST', headers: { 'Content-Type': 'application/json', ...authHeader() }, body: JSON.stringify({ product_id, quantity }) });
  return r.json();
}

export async function removeFromCart(productId) {
  const r = await fetch(`${API}/cart/${productId}`, { method: 'DELETE', headers: { ...authHeader() } });
  return r.json();
}

export async function checkout() {
  const r = await fetch(`${API}/orders/checkout`, { method: 'POST', headers: { ...authHeader() } });
  return r.json();
}

export async function getOrders() {
  const r = await fetch(`${API}/orders`, { headers: { ...authHeader() } });
  return r.json();
}
