'use server'
import cloudinary from 'cloudinary'
import { uploadImageToCloudinary } from './cloudinary-actions';
import Books from '../models/Books';
import { connectToDB } from '../mongoose';
// import Users from "@/libs/models/User";
// import Tags from "@/libs/models/Tag";
// import { connectToDB } from "@/libs/mongoose";
// import Websites from '@/libs/models/Website';



export const addnewcinema = async (formData, bookCldinfo, selectedClothing) => {
    const title = formData.get('title');
    const autor = formData.get('autor');
    const image = formData.get('image');
    const language = formData.get('language');
    const condition = formData.get('condition');
    const summary = formData.get('summary');
    let coverurl

    console.log(333, image.size)
    if (image.size === 0) {
        coverurl  = bookCldinfo.secure_url.replace(".pdf", ".jpg");
        console.log(616, coverurl)
    } else {
        coverurl = await uploadImageToCloudinary(image);
    }


    const bookpublic_id = bookCldinfo.public_id
    const booksecureUrl = bookCldinfo.secure_url
    const bookpages = bookCldinfo.pages
    const booksize = bookCldinfo.bytes
    const genres = selectedClothing

    await connectToDB(); // Ensure database connection

    if (coverurl) {
        try {
            // Wait for the image to be uploaded to Cloudinary
            try {
                // After successful image upload, create the user in MongoDB
                const newUser = await Books.create({
                    title: title,
                    author: autor,
                    coverurl: coverurl, // Save the Cloudinary image URL
                    language: language, // Save the link
                    condition: condition, // Save the link
                    summary: summary, // Save the link
                    genres: genres, // Save the link
                    bookdata: {
                        public_id: bookpublic_id, // Save the link
                        secure_url: booksecureUrl, // Save the link
                        pages: bookpages, //
                        size: booksize, //
                    }

                });

                console.log('New user created:', newUser);

                return true; // Return the newly created user
            } catch (err) {
                console.log('Error creating user:', err.message);
                return null; // Handle the error accordingly
            }

        } catch (err) {
            console.log('Error uploading image to Cloudinary:', err.message);
            return null; // Handle image upload failure accordingly
        }
    } else if (image) {

    }

    console.log('Form data:', title, desc);


};