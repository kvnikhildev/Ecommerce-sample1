import express from "express";
import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";
import { query } from "./db.js";

const router = express.Router();

router.post("/register", async (req, res) => {
  const { name, email, password } = req.body || {};
  if (!name || !email || !password) return res.status(400).json({ error: "Missing fields" });
  const hash = await bcrypt.hash(password, 10);
  try {
    const { rows } = await query(
      "insert into users(name,email,password_hash) values ($1,$2,$3) returning id,name,email",
      [name, email, hash]
    );
    const user = rows[0];
    const token = jwt.sign({ id: user.id, email: user.email }, process.env.JWT_SECRET, { expiresIn: "7d" });
    res.json({ token, user });
  } catch (e) {
    if (e.code === "23505") return res.status(409).json({ error: "Email already used" });
    res.status(500).json({ error: "Registration failed" });
  }
});

router.post("/login", async (req, res) => {
  const { email, password } = req.body || {};
  const { rows } = await query("select * from users where email=$1", [email]);
  const user = rows[0];
  if (!user) return res.status(401).json({ error: "Invalid credentials" });
  const ok = await bcrypt.compare(password, user.password_hash);
  if (!ok) return res.status(401).json({ error: "Invalid credentials" });
  const token = jwt.sign({ id: user.id, email: user.email }, process.env.JWT_SECRET, { expiresIn: "7d" });
  res.json({ token, user: { id: user.id, name: user.name, email: user.email } });
});

export default router;
