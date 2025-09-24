// Test WordPress upload without server
const { WordPressUploader } = require('./lib/wordpressUploader.js');
require('dotenv').config({ path: '.env.local' });

async function testWordPress() {
  try {
    console.log('🔍 Testing WordPress Connection...');
    console.log('Site URL:', process.env.WORDPRESS_SITE_URL);
    console.log('Username:', process.env.WORDPRESS_USERNAME);
    console.log('Password set:', !!process.env.WORDPRESS_PASSWORD);
    
    const uploader = new WordPressUploader();
    const result = await uploader.testConnection();
    
    console.log('✅ Test Result:', result);
    
    if (result.success) {
      console.log('🎉 WordPress connection successful!');
    } else {
      console.log('❌ WordPress connection failed:', result.message);
    }
    
  } catch (error) {
    console.error('💥 Test error:', error.message);
  }
}

testWordPress();