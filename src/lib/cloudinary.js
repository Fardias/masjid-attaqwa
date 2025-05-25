export const uploadToCloudinary = async (file) => {
  try {
    const formData = new FormData();
    formData.append('file', file);
    formData.append('upload_preset', process.env.NEXT_PUBLIC_CLOUDINARY_UPLOAD_PRESET);

    const response = await fetch(
      `https://api.cloudinary.com/v1_1/${process.env.NEXT_PUBLIC_CLOUDINARY_CLOUD_NAME}/image/upload`,
      {
        method: 'POST',
        body: formData,
      }
    );

    const data = await response.json();
    if (!response.ok) {
      throw new Error(data.error?.message || 'Upload failed');
    }
    return data.secure_url;
  } catch (error) {
    console.error('Error uploading to Cloudinary:', error);
    throw error;
  }
};

export const deleteFromCloudinary = async (publicId) => {
  try {
    const response = await fetch(
      `/api/cloudinary/delete?publicId=${encodeURIComponent(publicId)}`,
      {
        method: 'DELETE',
      }
    );

    if (!response.ok) {
      const data = await response.json();
      throw new Error(data.error || 'Delete failed');
    }

    return await response.json();
  } catch (error) {
    console.error('Error deleting from Cloudinary:', error);
    throw error;
  }
}; 