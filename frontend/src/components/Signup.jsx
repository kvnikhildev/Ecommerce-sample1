import React, { useState } from 'react';

export default function Signup({ onSubmit }) {
  const [name, setName] = useState('Alice');
  const [email, setEmail] = useState('alice@example.com');
  const [password, setPassword] = useState('secret123');
  return (
    <form onSubmit={e=>{ e.preventDefault(); onSubmit({ name, email, password }); }} style={{ padding:16, maxWidth:360 }}>
      <h2>Sign up</h2>
      <input placeholder="Name" value={name} onChange={e=>setName(e.target.value)} style={{ width:'100%', margin:'6px 0' }}/>
      <input placeholder="Email" value={email} onChange={e=>setEmail(e.target.value)} style={{ width:'100%', margin:'6px 0' }}/>
      <input placeholder="Password" type="password" value={password} onChange={e=>setPassword(e.target.value)} style={{ width:'100%', margin:'6px 0' }}/>
      <button type="submit">Create account</button>
    </form>
  );
}
