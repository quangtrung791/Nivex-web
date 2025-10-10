// Performance test script to compare old vs new database connection
import { query } from './app/lib/neon.js'

async function performanceTest() {
  console.log('🚀 Starting database performance test...\n')
  
  const testQueries = [
    'SELECT 1 as test',
    'SELECT COUNT(*) as total FROM knowledge',
    'SELECT * FROM knowledge LIMIT 10',
    'SELECT k.*, kt.name as topic FROM knowledge k LEFT JOIN knowledge_topics kt ON k.topic_id = kt.id LIMIT 5'
  ]
  
  for (let i = 0; i < testQueries.length; i++) {
    const queryText = testQueries[i]
    console.log(`Test ${i + 1}: ${queryText.substring(0, 50)}...`)
    
    const times = []
    
    // Run each query 5 times to get average
    for (let j = 0; j < 5; j++) {
      const start = Date.now()
      try {
        await query(queryText)
        const duration = Date.now() - start
        times.push(duration)
      } catch (error) {
        console.error(`❌ Query failed:`, error.message)
        break
      }
    }
    
    if (times.length > 0) {
      const avgTime = times.reduce((a, b) => a + b, 0) / times.length
      const minTime = Math.min(...times)
      const maxTime = Math.max(...times)
      
      console.log(`   ⏱️  Average: ${avgTime.toFixed(2)}ms`)
      console.log(`   🏃 Min: ${minTime}ms | Max: ${maxTime}ms`)
      console.log(`   📊 Times: [${times.join(', ')}]ms\n`)
    }
  }
  
  console.log('✅ Performance test completed!')
}

// Run the test
performanceTest().catch(console.error)
