'use server'
import cloudinary from 'cloudinary'
import { revalidatePath } from 'next/cache'





export const createMessage = async (formData) => {
  await new Promise((resolve) => setTimeout(resolve, 250));

  const text = formData.get('text');
  const image = formData.get('image');
  const tagsA = text.split(',').map(tag => tag.trim());

  console.log('text', text)
  let uploadedImageUrl = null;

  if (image) {
    // Convert image to base64 or stream format
    const imageUploadResponse = await uploadImageToCloudinary(image, tagsA);
    uploadedImageUrl = imageUploadResponse.secure_url;
    console.log('Uploaded Image URL:', imageUploadResponse);
    revalidatePath('/categorie/All')
  }
};


export const uploadImageToCloudinary = async (imageFile) => {

  cloudinary.config({
    cloud_name: process.env.CLOUDINARY_CLOUD_NAME,
    api_key: process.env.CLOUDINARY_API_KEY,
    api_secret: process.env.API_SECRET,
    secure: true,
  });
  console.log('runing upload')

  try {
    // Convert the file to a buffer
    const buffer = await imageFile.arrayBuffer();
    const base64Image = Buffer.from(buffer).toString('base64');
    const imageDataUri = `data:${imageFile.type};base64,${base64Image}`;

    const resultUnsigned = await cloudinary.v2.uploader.unsigned_upload(imageDataUri, "library", {
      folder: "thumbnails", // Optional: specify a folder in Cloudinary
      asset_folder: "thumbnails", // Optional: specify a folder in Cloudinary"
    })

    return resultUnsigned.secure_url; // This will contain the secure_url among other data
  } catch (error) {
    console.error('Error uploading to Cloudinary:', error);
    throw error;
  }
};
