import React, { useState } from 'react';

export default function Login({ onSubmit }) {
  const [email, setEmail] = useState('alice@example.com');
  const [password, setPassword] = useState('secret123');
  return (
    <form onSubmit={e=>{ e.preventDefault(); onSubmit({ email, password }); }} style={{ padding:16, maxWidth:360 }}>
      <h2>Login</h2>
      <input placeholder="Email" value={email} onChange={e=>setEmail(e.target.value)} style={{ width:'100%', margin:'6px 0' }}/>
      <input placeholder="Password" type="password" value={password} onChange={e=>setPassword(e.target.value)} style={{ width:'100%', margin:'6px 0' }}/>
      <button type="submit">Login</button>
    </form>
  );
}
