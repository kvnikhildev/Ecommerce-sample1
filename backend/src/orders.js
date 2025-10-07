import express from "express";
import { query } from "./db.js";
import { authRequired } from "./middleware.js";

const router = express.Router();

router.get("/", authRequired, async (req, res) => {
  const { rows } = await query("select * from orders where user_id=$1 order by created_at desc", [req.user.id]);
  res.json(rows);
});

router.post("/checkout", authRequired, async (req, res) => {
  // get cart
  const cart = await query(`
    select ci.product_id, ci.quantity, p.price_cents, p.stock
    from cart_items ci join products p on p.id = ci.product_id
    where ci.user_id = $1
  `, [req.user.id]);

  if (cart.rowCount === 0) return res.status(400).json({ error: "Cart is empty" });

  // ensure stock & compute total
  let total = 0;
  for (const row of cart.rows) {
    if (row.quantity > row.stock) return res.status(400).json({ error: "Insufficient stock for an item" });
    total += row.price_cents * row.quantity;
  }

  try {
    await query("begin");
    const orderRes = await query(
      "insert into orders(user_id, total_cents) values ($1,$2) returning id",
      [req.user.id, total]
    );
    const orderId = orderRes.rows[0].id;

    for (const row of cart.rows) {
      await query(
        "insert into order_items(order_id, product_id, quantity, price_cents) values ($1,$2,$3,$4)",
        [orderId, row.product_id, row.quantity, row.price_cents]
      );
      await query("update products set stock = stock - $1 where id=$2", [row.quantity, row.product_id]);
    }

    await query("delete from cart_items where user_id=$1", [req.user.id]);

    await query("commit");
    res.json({ ok: true, order_id: orderId, total_cents: total });
  } catch (e) {
    await query("rollback");
    res.status(500).json({ error: "Checkout failed" });
  }
});

export default router;
