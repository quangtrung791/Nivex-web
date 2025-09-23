# Cloudinary Setup Guide for Nivex Web

## Overview
This guide will help you set up Cloudinary integration for image uploads in the admin panel. Cloudinary provides reliable cloud storage and automatic image optimization.

## Step 1: Create Cloudinary Account

1. Go to [https://cloudinary.com/](https://cloudinary.com/)
2. Sign up for a free account (includes 25GB storage and 25 credits monthly)
3. After signup, you'll be taken to your dashboard

## Step 2: Get API Credentials

From your Cloudinary dashboard, you'll find:

```
Cloud Name: your_cloud_name
API Key: your_api_key  
API Secret: your_api_secret
```

## Step 3: Update Environment Variables

Replace the placeholder values in your `.env.local` file:

```bash
# Cloudinary configuration for image uploads
CLOUDINARY_CLOUD_NAME=your_actual_cloud_name
CLOUDINARY_API_KEY=your_actual_api_key
CLOUDINARY_API_SECRET=your_actual_api_secret
```

**Important:** 
- Never commit these credentials to version control
- For Vercel deployment, add these as environment variables in your Vercel project settings

## Step 4: Vercel Environment Variables

1. Go to your Vercel project dashboard
2. Navigate to Settings → Environment Variables
3. Add these three variables:
   - `CLOUDINARY_CLOUD_NAME`
   - `CLOUDINARY_API_KEY`
   - `CLOUDINARY_API_SECRET`

## Step 5: Test the Integration

1. Start your development server: `npm run dev`
2. Go to `/admin` and login
3. Try creating a new course with an image upload
4. The image should now upload to Cloudinary

## Features Included

### Image Upload
- ✅ Automatic file type validation (JPEG, PNG, GIF, WebP)
- ✅ File size limit (5MB)
- ✅ Unique filename generation
- ✅ Automatic image optimization
- ✅ Responsive image transformations (max 800x600)

### Production Benefits
- ✅ Fast global CDN delivery
- ✅ Automatic format optimization (WebP when supported)
- ✅ Image compression without quality loss
- ✅ Reliable cloud storage
- ✅ No server filesystem dependencies

### Development vs Production
- **Development**: Uses local filesystem for faster development
- **Production**: Uses Cloudinary for reliable cloud storage

## Folder Structure
Images are organized in Cloudinary as:
```
nivex-courses/
  └── your_image_name_timestamp.jpg
```

## Troubleshooting

### Common Issues:
1. **Upload fails**: Check environment variables are set correctly
2. **Images not displaying**: Verify Cloudinary URLs are accessible
3. **Slow uploads**: Check your internet connection and Cloudinary status

### Debug Mode:
Check browser console and server logs for detailed error messages.

### Support:
- Cloudinary Documentation: [https://cloudinary.com/documentation](https://cloudinary.com/documentation)
- Next.js Integration: [https://cloudinary.com/documentation/nextjs_integration](https://cloudinary.com/documentation/nextjs_integration)

## Security Notes
- API credentials are server-side only (not exposed to clients)
- Images are stored in a dedicated folder structure
- Automatic malware scanning by Cloudinary
- HTTPS delivery by default