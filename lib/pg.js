import { Pool } from 'pg'

// Use DATABASE_URL from env; fallback to local dev connection
const DEFAULT_URL = 'postgresql://nivex:pass123@localhost:5432/nivex'
const connectionString = process.env.DATABASE_URL?.replace(/\?schema=.+$/, '') || DEFAULT_URL

// For local postgres, SSL is typically disabled
const pool = new Pool({ connectionString, ssl: false })

export async function query(text, params) {
  const client = await pool.connect()
  try {
    const res = await client.query(text, params)
    return res
  } finally {
    client.release()
  }
}

export default { query }