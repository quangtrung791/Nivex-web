// Quick test after updating Application Password
const fetch = require('node-fetch');

// You'll need to update this with your actual Application Password
const WORDPRESS_SITE_URL = 'https://learningchain.vn';
const WORDPRESS_USERNAME = 'admin';
// Replace with your Application Password after creating it
const WORDPRESS_PASSWORD = 'YOUR_APPLICATION_PASSWORD_HERE';

async function quickTest() {
  console.log('🔍 Testing new Application Password...');
  
  try {
    const response = await fetch(`${WORDPRESS_SITE_URL}/wp-json/wp/v2/users/me`, {
      headers: {
        'Authorization': `Basic ${Buffer.from(`${WORDPRESS_USERNAME}:${WORDPRESS_PASSWORD}`).toString('base64')}`,
      }
    });
    
    if (response.ok) {
      const user = await response.json();
      console.log('✅ Authentication successful!');
      console.log('👤 User:', user.name);
      console.log('🎯 ID:', user.id);
      console.log('🔑 Capabilities:', Object.keys(user.capabilities || {}));
    } else {
      console.log('❌ Still failing:', response.status);
      console.log('Error:', await response.text());
    }
  } catch (error) {
    console.error('💥 Error:', error.message);
  }
}

quickTest();