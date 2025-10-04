import fs from 'fs';
import pkg from 'pg';
import dotenv from 'dotenv';
dotenv.config();
const { Pool } = pkg;

const pool = new Pool({ connectionString: process.env.DATABASE_URL });

export async function query(text, params) {
  const client = await pool.connect();
  try {
    const res = await client.query(text, params);
    return res;
  } finally {
    client.release();
  }
}

async function runSqlFile(path) {
  const sql = fs.readFileSync(new URL(path, import.meta.url));
  await query(sql.toString());
}

if (process.argv[2] === 'init') {
  runSqlFile('./schema.sql').then(() => {
    console.log('DB initialized');
    process.exit(0);
  }).catch(err => { console.error(err); process.exit(1); });
}

if (process.argv[2] === 'seed') {
  runSqlFile('./seed.sql').then(() => {
    console.log('DB seeded');
    process.exit(0);
  }).catch(err => { console.error(err); process.exit(1); });
}
async function connectWithRetry(retries = 5, delay = 2000) {
  while (retries) {
    try {
      const client = await pool.connect();
      client.release();
      console.log('✅ Connected to PostgreSQL');
      return;
    } catch (err) {
      console.error(`❌ DB connection failed. Retrying in ${delay / 1000}s...`);
      retries--;
      await new Promise(res => setTimeout(res, delay));
    }
  }
  console.error('❌ Could not connect to PostgreSQL after multiple attempts');
  process.exit(1);
}

connectWithRetry(); // Call this at the bottom of db.js

