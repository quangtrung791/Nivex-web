// Optimized database connection with pooling for better performance
import { Pool } from 'pg'

// Create a connection pool (singleton pattern)
let pool = null

function getPool() {
  if (!pool) {
    pool = new Pool({
      connectionString: process.env.DATABASE_URL,
      // Pool configuration for optimal performance
      max: 20, // Maximum number of clients in the pool
      min: 2, // Minimum number of clients in the pool
      idleTimeoutMillis: 30000, // Close idle clients after 30 seconds
      connectionTimeoutMillis: 2000, // Return error after 2 seconds if connection could not be established
      maxUses: 7500, // Close (and replace) a connection after it has been used this many times
    })

    // Handle pool errors
    // pool.on('error', (err) => {
    //   console.error('Unexpected error on idle client', err)
    // })
  }
  return pool
}

// Optimized query function using connection pool
async function query(text, params = []) {
  const pool = getPool()
  
  try {
    const result = await pool.query(text, params)
    
    
    return result.rows
  } catch (error) {
    // console.error("Database query error:", {
    //   message: error.message,
    //   code: error.code,
    //   query: text.substring(0, 100)
    // })
    // throw error
  }
}

// Graceful shutdown function
async function closePool() {
  if (pool) {
    await pool.end()
    pool = null
  }
}

// Health check function
// async function healthCheck() {
//   try {
//     const result = await query('SELECT 1 as health')
//     return result[0]?.health === 1
//   } catch (error) {
//     // console.error('Database health check failed:', error)
//     // return false
//   }
// }

export { query, closePool}
