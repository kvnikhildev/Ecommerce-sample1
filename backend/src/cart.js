import express from 'express';
import { query } from './db.js';
import { authRequired } from './middleware.js';

const router = express.Router();

// Get cart with product details
router.get('/', authRequired, async (req, res) => {
  const { rows } = await query(`
    select ci.product_id, ci.quantity, p.name, p.price_cents, p.image_url
    from cart_items ci
    join products p on p.id = ci.product_id
    where ci.user_id = $1
    order by ci.id asc
  `, [req.user.id]);
  res.json(rows);
});

// Add/update item
router.post('/', authRequired, async (req, res) => {
  const { product_id, quantity } = req.body || {};
  if (!product_id || !quantity || quantity <= 0) return res.status(400).json({ error: 'Invalid payload' });

  // ensure stock exists
  const prod = await query('select stock from products where id=$1', [product_id]);
  if (!prod.rowCount) return res.status(404).json({ error: 'Product not found' });
  if (quantity > prod.rows[0].stock) return res.status(400).json({ error: 'Not enough stock' });

  await query(`
    insert into cart_items(user_id, product_id, quantity)
    values ($1,$2,$3)
    on conflict (user_id, product_id)
    do update set quantity = excluded.quantity
  `, [req.user.id, product_id, quantity]);
  res.json({ ok: true });
});

// Remove item
router.delete('/:productId', authRequired, async (req, res) => {
  await query('delete from cart_items where user_id=$1 and product_id=$2', [req.user.id, req.params.productId]);
  res.json({ ok: true });
});

export default router;
