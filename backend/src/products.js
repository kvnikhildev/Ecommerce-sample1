import express from "express";
import { query } from "./db.js";
const router = express.Router();

router.get("/", async (_req, res) => {
  const { rows } = await query("select * from products order by id asc");
  res.json(rows);
});

export default router;
