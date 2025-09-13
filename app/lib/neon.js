// Đơn giản hóa: chỉ sử dụng pg client cho cả local và production
// Neon serverless driver có thể gặp vấn đề với local PostgreSQL

async function createDbClient() {
  const { Client } = await import('pg');
  return new Client(process.env.DATABASE_URL);
}

async function query(text, params = []) {
  console.log("Database query:", { text, params }); // Debug log
  
  const client = await createDbClient();
  try {
    await client.connect();
    console.log("Database connected successfully"); // Debug log
    
    const result = await client.query(text, params);
    console.log("Query result:", { rowCount: result.rowCount, rows: result.rows }); // Debug log
    
    return result.rows;
  } catch (error) {
    console.error("Database query error:", {
      message: error.message,
      code: error.code,
      detail: error.detail
    });
    throw error;
  } finally {
    await client.end();
    console.log("Database connection closed"); // Debug log
  }
}

export { query };