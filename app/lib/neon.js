// Đơn giản hóa: chỉ sử dụng pg client cho cả local và production
// Neon serverless driver có thể gặp vấn đề với local PostgreSQL

async function createDbClient() {
  const { Client } = await import('pg');
  return new Client(process.env.DATABASE_URL);
}

async function query(text, params = []) {
  const client = await createDbClient();
  try {
    await client.connect();
    const result = await client.query(text, params);
    return result.rows;
  } finally {
    await client.end();
  }
}

export { query };