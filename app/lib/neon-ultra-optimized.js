// Ultra-optimized database connection with caching and prepared statements
import { Pool } from 'pg'

// Create a connection pool (singleton pattern)
let pool = null
const queryCache = new Map() // Simple query result cache
const CACHE_TTL = 5 * 60 * 1000 // 5 minutes cache

function getPool() {
  if (!pool) {
    pool = new Pool({
      connectionString: process.env.DATABASE_URL,
      max: 20, // Maximum number of clients in the pool
      min: 2, // Minimum number of clients in the pool
      idleTimeoutMillis: 30000, // Close idle clients after 30 seconds
      connectionTimeoutMillis: 2000, // Return error after 2 seconds if connection could not be established
      maxUses: 7500, // Close (and replace) a connection after it has been used this many times
      // Additional optimizations
      allowExitOnIdle: true,
      statement_timeout: 30000, // 30 seconds statement timeout
      query_timeout: 30000, // 30 seconds query timeout
    })

    // Handle pool errors
    pool.on('error', (err) => {
    })
  }
  return pool
}

// Generate cache key for queries
function getCacheKey(text, params) {
  return `${text}:${JSON.stringify(params)}`
}

// Check if query result is cached and still valid
function getCachedResult(cacheKey) {
  const cached = queryCache.get(cacheKey)
  if (cached && Date.now() - cached.timestamp < CACHE_TTL) {
    return cached.data
  }
  if (cached) {
    queryCache.delete(cacheKey) // Remove expired cache
  }
  return null
}

// Cache query result
function setCachedResult(cacheKey, data) {
  queryCache.set(cacheKey, {
    data,
    timestamp: Date.now()
  })
}

// Ultra-optimized query function with caching
async function query(text, params = [], options = {}) {
  const { 
    useCache = false, 
    cacheKey = null,
    timeout = 30000 
  } = options
  
  // Check cache first for read queries
  if (useCache) {
    const key = cacheKey || getCacheKey(text, params)
    const cached = getCachedResult(key)
    if (cached) {
      return cached
    }
  }

  const pool = getPool()
  
  try {
    const start = Date.now()
    
    // Use prepared statement for better performance
    const result = await pool.query({
      text,
      values: params,
      rowMode: 'array' // Faster for large result sets
    })
    
    const duration = Date.now() - start
    
    
    // Cache result if caching is enabled
    if (useCache && result.rows.length > 0) {
      const key = cacheKey || getCacheKey(text, params)
      setCachedResult(key, result.rows)
    }
    
    return result.rows
  } catch (error) {
    // console.error("Database query error:", {
    //   message: error.message,
    //   code: error.code,
    //   query: text.substring(0, 100),
    //   params: params.length > 0 ? params.slice(0, 3) : 'none'
    // })
    // throw error
  }
}

// Optimized query for read operations with caching
async function queryCached(text, params = [], cacheKey = null) {
  return query(text, params, { useCache: true, cacheKey })
}

// Optimized query for write operations (no caching)
async function queryWrite(text, params = []) {
  return query(text, params, { useCache: false })
}

// Batch query execution for better performance
async function batchQuery(queries) {
  const pool = getPool()
  const client = await pool.connect()
  
  try {
    const results = []
    await client.query('BEGIN')
    
    for (const { text, params } of queries) {
      const result = await client.query(text, params)
      results.push(result.rows)
    }
    
    await client.query('COMMIT')
    return results
  } catch (error) {
    await client.query('ROLLBACK')
    throw error
  } finally {
    client.release()
  }
}

// Clear cache
function clearCache() {
  queryCache.clear()
}

// Get cache stats
function getCacheStats() {
  return {
    size: queryCache.size,
    keys: Array.from(queryCache.keys()).map(key => key.substring(0, 50))
  }
}

// Graceful shutdown function
async function closePool() {
  if (pool) {
    await pool.end()
    pool = null
  }
  clearCache()
}

// Health check function
// async function healthCheck() {
//   try {
//     const result = await query('SELECT 1 as health, NOW() as timestamp')
//     return {
//       healthy: result[0]?.health === 1,
//       timestamp: result[0]?.timestamp,
//       poolStats: pool ? {
//         totalCount: pool.totalCount,
//         idleCount: pool.idleCount,
//         waitingCount: pool.waitingCount
//       } : null
//     }
//   } catch (error) {
//     // console.error('Database health check failed:', error)
//     // return { healthy: false, error: error.message }
//   }
// }

export { 
  query, 
  queryCached, 
  queryWrite, 
  batchQuery, 
  clearCache, 
  getCacheStats, 
  closePool
}
