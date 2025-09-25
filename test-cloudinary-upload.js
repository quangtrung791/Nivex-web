// Test Cloudinary upload after updating credentials
const fetch = require('node-fetch');
const FormData = require('form-data');

async function testCloudinaryUpload() {
  try {
    console.log('🔍 Testing Cloudinary upload...');
    
    // Create a tiny test image buffer
    const testImageBuffer = Buffer.from([
      0x89, 0x50, 0x4e, 0x47, 0x0d, 0x0a, 0x1a, 0x0a,
      0x00, 0x00, 0x00, 0x0d, 0x49, 0x48, 0x44, 0x52,
      0x00, 0x00, 0x00, 0x01, 0x00, 0x00, 0x00, 0x01,
      0x08, 0x06, 0x00, 0x00, 0x00, 0x1f, 0x15, 0xc4,
      0x89, 0x00, 0x00, 0x00, 0x0a, 0x49, 0x44, 0x41,
      0x54, 0x78, 0x9c, 0x63, 0x00, 0x01, 0x00, 0x00,
      0x05, 0x00, 0x01, 0x0d, 0x0a, 0x2d, 0xb4, 0x00,
      0x00, 0x00, 0x00, 0x49, 0x45, 0x4e, 0x44, 0xae,
      0x42, 0x60, 0x82
    ]);
    
    const formData = new FormData();
    formData.append('file', testImageBuffer, {
      filename: 'test-cloudinary.png',
      contentType: 'image/png'
    });

    console.log('📤 Sending request to upload API...');
    
    const response = await fetch('http://localhost:3001/api/upload/images', {
      method: 'POST',
      body: formData,
      headers: formData.getHeaders()
    });

    console.log('📊 Response status:', response.status);
    
    const result = await response.json();
    
    console.log('📄 Full response:', JSON.stringify(result, null, 2));
    
    if (result.success) {
      console.log('✅ Upload successful!');
      console.log('🔗 Image URL:', result.url);
      console.log('📝 Source:', result.source);
      
      if (result.source === 'cloudinary') {
        console.log('🎉 Cloudinary working!');
      } else {
        console.log(`ℹ️ Used fallback: ${result.source}`);
      }
    } else {
      console.log('❌ Upload failed:', result.error);
    }
    
  } catch (error) {
    console.error('💥 Test error:', error.message);
  }
}

testCloudinaryUpload();