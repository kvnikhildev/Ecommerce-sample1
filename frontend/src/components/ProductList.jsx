import React from 'react';

export default function ProductList({ products, onAdd }) {
  return (
    <div style={{ display:'grid', gridTemplateColumns:'repeat(auto-fill, minmax(220px,1fr))', gap:16, padding:16 }}>
      {products.map(p => (
        <div key={p.id} style={{ border:'1px solid #eee', borderRadius:8, padding:12 }}>
          <img src={p.image_url} alt={p.name} style={{ width:'100%', height:140, objectFit:'cover', borderRadius:6 }} />
          <h3>{p.name}</h3>
          <p style={{ minHeight:40 }}>{p.description}</p>
          <div style={{ display:'flex', justifyContent:'space-between', alignItems:'center' }}>
            <span>${(p.price_cents/100).toFixed(2)}</span>
            <button onClick={() => onAdd(p.id)}>Add</button>
          </div>
        </div>
      ))}
    </div>
  );
}
