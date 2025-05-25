import { NextResponse } from 'next/server';

export async function DELETE(request) {
  try {
    const { searchParams } = new URL(request.url);
    const publicId = searchParams.get('publicId');

    if (!publicId) {
      return NextResponse.json(
        { error: 'Public ID is required' },
        { status: 400 }
      );
    }

    const timestamp = Math.round(new Date().getTime() / 1000);
    const signature = require('crypto')
      .createHash('sha1')
      .update(`public_id=${publicId}&timestamp=${timestamp}${process.env.CLOUDINARY_API_SECRET}`)
      .digest('hex');

    const formData = new FormData();
    formData.append('public_id', publicId);
    formData.append('timestamp', timestamp);
    formData.append('api_key', process.env.NEXT_PUBLIC_CLOUDINARY_API_KEY);
    formData.append('signature', signature);

    const response = await fetch(
      `https://api.cloudinary.com/v1_1/${process.env.NEXT_PUBLIC_CLOUDINARY_CLOUD_NAME}/image/destroy`,
      {
        method: 'POST',
        body: formData,
      }
    );

    const data = await response.json();
    if (!response.ok) {
      throw new Error(data.error?.message || 'Delete failed');
    }

    return NextResponse.json(data);
  } catch (error) {
    console.error('Error deleting from Cloudinary:', error);
    return NextResponse.json(
      { error: error.message || 'Failed to delete image' },
      { status: 500 }
    );
  }
} 