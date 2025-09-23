import { neon } from '@neondatabase/serverless'

const connectionString = process.env.DATABASE_URL || 'postgresql://nivex:pass123@localhost:5432/nivex?schema=public'

if (!connectionString) {
  throw new Error('DATABASE_URL environment variable is required')
}

const sql = neon(connectionString)

export default sql